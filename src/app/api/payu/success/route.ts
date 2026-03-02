import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import {
  media,
  order,
  orderItem,
  orderShippingAddress,
  payment,
  paymentAttempt,
  product,
  productVariant,
  shipment,
} from "@/db/schema";
import { delhiveryService } from "@/services/delhivery.service";
import { mailService } from "@/services/mail.service";
import { payuService } from "@/services/payu.service";
import type { PayuCallback } from "@/types/payu";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as PayuCallback;
    const salt = process.env.PAYU_MERCHANT_SALT!;

    const isValidHash = payuService.verifyResponseHash(data, salt);

    if (!isValidHash) {
      return NextResponse.redirect(
        new URL(
          "/orders?payment=invalid",
          process.env.NEXT_PUBLIC_SITE_URL
        ).toString(),
        303
      );
    }

    //  Find Payment Attempt & Order
    const attempt = await db.query.paymentAttempt.findFirst({
      where: eq(paymentAttempt.txnId, data.txnid),
    });

    if (!attempt) {
      return NextResponse.redirect(
        new URL(
          "/orders?payment=notfound",
          process.env.NEXT_PUBLIC_SITE_URL
        ).toString(),
        303
      );
    }

    const orderRow = await db.query.order.findFirst({
      where: eq(order.id, attempt.orderId),
    });

    if (!orderRow) {
      return NextResponse.redirect(
        new URL(
          "/orders?payment=notfound",
          process.env.NEXT_PUBLIC_SITE_URL
        ).toString(),
        303
      );
    }

    // Process Success
    if (data.status === "success") {
      await db.transaction(async (tx) => {
        // Update payment attempt
        await tx
          .update(paymentAttempt)
          .set({
            status: data.status,
            gatewayTxnId: data.mihpayid ?? null,
            mode: data.mode ?? null,
            metaData: data,
            updatedAt: new Date(),
          })
          .where(eq(paymentAttempt.id, attempt.id));

        // Update order status
        await tx
          .update(order)
          .set({
            paymentStatus: "paid",
            status: "processing",
          })
          .where(eq(order.id, attempt.orderId));

        // Create formal payment record
        await tx.insert(payment).values({
          id: uuidv7(),
          orderId: attempt.orderId,
          userId: orderRow.userId, // Using userId from orderRow
          gateway: "payu",
          gatewayTransactionId: data.mihpayid,
          amount: data.amount,
          status: "paid",
          paymentMethod: data.mode,
          metadata: data,
        });
      });
    }

    // Send Order Confirmation Email
    if (data.status === "success" && orderRow) {
      const items = await db
        .select({
          id: orderItem.id,
          quantity: orderItem.quantity,
          price: orderItem.price,
          productId: orderItem.productId,
          variantId: orderItem.variantId,
          productName: product.name,
          productSlug: product.slug,
          productImage: media.url,
          variantSku: productVariant.sku,
          variantOptions: productVariant.optionValues,
        })
        .from(orderItem)
        .leftJoin(product, eq(orderItem.productId, product.id))
        .leftJoin(productVariant, eq(orderItem.variantId, productVariant.id))
        .leftJoin(
          media,
          and(
            eq(product.id, media.refId),
            eq(media.refType, "product"),
            eq(media.position, 0)
          )
        )
        .where(eq(orderItem.orderId, orderRow.id));

      const shippingAddr = await db.query.orderShippingAddress.findFirst({
        where: eq(orderShippingAddress.orderId, orderRow.id),
      });

      // create shipment
      if (shippingAddr) {
        const { data: deliveryPackage, success } =
          await delhiveryService.createShipment({
            pickup_location: { name: process.env.DELHIVERY_WAREHOSE_NAME! },
            shipments: [
              {
                name: shippingAddr.fullName,
                add: `${shippingAddr.addressLine1}${shippingAddr.addressLine2 ? `, ${shippingAddr.addressLine2}` : ""}`,
                pin: shippingAddr.postalCode,
                city: shippingAddr.city,
                state: shippingAddr.state,
                country: "India",
                phone: shippingAddr.phone,
                order: orderRow.orderNumber,
                payment_mode: "Prepaid",
                weight: "500",
                shipping_mode: "Surface",
                products_desc: items
                  .map((i) => i.productName)
                  .join(", ")
                  .substring(0, 100),
                total_amount: orderRow.total,
                cod_amount: "0",
                quantity: items
                  .reduce((acc, i) => acc + i.quantity, 0)
                  .toString(),
              },
            ],
          });
        if (success) {
          await db.insert(shipment).values({
            orderId: orderRow.id,
            addressId: shippingAddr.id,
            carrier: "Delhivery",
            trackingNumber: deliveryPackage.waybill,
            trackingUrl: `https://www.delhivery.com/track/package/${deliveryPackage.waybill}`,
            status: "ordered",
            shippedAt: new Date(),
            notes:
              deliveryPackage.message +
              `Upload WBN: ${deliveryPackage.upload_wbn}`,
            metadata: deliveryPackage,
          });
        } // TODO: if not sucess than send a emil to create manuly for admin
      }
      // send order receipt email
      await mailService.sendOrderReceipt(
        {
          ...orderRow,
          items: items.map((i) => ({
            id: i.id,
            name: i.productName || "Product",
            slug: i.productSlug,
            image: i.productImage,
            sku: i.variantSku,
            selectedOptions: i.variantOptions,
            quantity: i.quantity,
            price: i.price,
            shippingCost: orderRow.shippingCost ?? "0.00",
          })),
          shippingAddress: shippingAddr ?? null,
        },
        data.email
      );
    }

    const destinationUrl = new URL(
      "/checkout/success",
      process.env.NEXT_PUBLIC_SITE_URL
    );
    destinationUrl.searchParams.set("orderId", attempt.orderId);

    const res = NextResponse.redirect(destinationUrl.toString(), 303);

    if (orderRow.guestOrderToken) {
      res.cookies.set("diya-sessionId", orderRow.guestOrderToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return res;
  } catch (error) {
    console.error("PAYU_SUCCESS_CALLBACK_ERROR:", error);
    return NextResponse.redirect(
      new URL(
        "/orders?payment=error",
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString(),
      303
    );
  }
}
