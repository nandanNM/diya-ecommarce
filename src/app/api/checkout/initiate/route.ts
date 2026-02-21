import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import {
  cart,
  cartItem,
  order,
  orderItem,
  orderShippingAddress,
  paymentAttempt,
  productVariant,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { checkoutInitiateSchema } from "@/lib/validations";
import { payuService } from "@/services/payu.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = checkoutInitiateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid request data",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { shippingDetails, isDirect, variantId, quantity } = validation.data;

    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id ?? null;

    let lineItems: {
      productId: string;
      variantId: string;
      price: number;
      quantity: number;
    }[] = [];

    let existingCartId: string | null = null;

    if (isDirect && variantId) {
      const [row] = await db
        .select({
          price: productVariant.price,
          productId: productVariant.productId,
        })
        .from(productVariant)
        .where(eq(productVariant.id, variantId))
        .limit(1);

      if (!row) {
        return NextResponse.json(
          { message: "Variant not found" },
          { status: 404 }
        );
      }

      lineItems = [
        {
          productId: row.productId,
          variantId,
          price: Number(row.price ?? 0),
          quantity: quantity ?? 1,
        },
      ];
    } else {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get("diya-cart-sessionId")?.value;

      let existingCart;
      if (userId) {
        existingCart = await db.query.cart.findFirst({
          where: eq(cart.userId, userId),
        });
      } else if (sessionId) {
        existingCart = await db.query.cart.findFirst({
          where: eq(cart.sessionId, sessionId),
        });
      }

      if (!existingCart) {
        return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      existingCartId = existingCart.id;

      const items = await db
        .select({
          productId: cartItem.productId,
          variantId: cartItem.variantId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        })
        .from(cartItem)
        .where(eq(cartItem.cartId, existingCart.id));

      if (!items.length) {
        return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
      }

      lineItems = items.map((i) => ({
        productId: i.productId,
        variantId: i.variantId ?? "",
        price: Number(i.price),
        quantity: i.quantity,
      }));
    }

    const subtotalAmount = lineItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const txnid = `txn_${uuidv7()}`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orderRow, attemptRow } = await db.transaction(async (tx) => {
      const [newOrder] = await tx
        .insert(order)
        .values({
          id: uuidv7(),
          orderNumber: `ORD-${Date.now()}-${Math.floor(
            1000 + Math.random() * 9000
          )}`,
          userId,
          status: "pending",
          paymentStatus: "pending",
          subtotal: subtotalAmount.toFixed(2),
          total: subtotalAmount.toFixed(2),
        })
        .returning();

      await tx.insert(orderItem).values(
        lineItems.map((item) => ({
          id: uuidv7(),
          orderId: newOrder.id,
          productId: item.productId,
          variantId: item.variantId || null,
          quantity: item.quantity,
          price: item.price.toFixed(2),
          snapshot: { price: item.price, quantity: item.quantity },
        }))
      );

      await tx.insert(orderShippingAddress).values({
        id: uuidv7(),
        orderId: newOrder.id,
        fullName: shippingDetails.fullName,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        addressLine1: shippingDetails.addressLine1,
        addressLine2: shippingDetails.addressLine2 || null,
        city: shippingDetails.city,
        state: shippingDetails.state,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      });

      const [newAttempt] = await tx
        .insert(paymentAttempt)
        .values({
          id: uuidv7(),
          orderId: newOrder.id,
          txnid,
          gateway: "payu",
          amount: subtotalAmount.toFixed(2),
          status: "pending",
        })
        .returning();

      return { orderRow: newOrder, attemptRow: newAttempt };
    });

    const payuParams = {
      key: process.env.PAYU_MERCHANT_KEY!,
      txnid,
      amount: subtotalAmount.toFixed(2),
      productinfo: `Order ${orderRow.orderNumber}`,
      firstname: shippingDetails.fullName.split(" ")[0],
      email: shippingDetails.email,
      phone: shippingDetails.phone,
    };

    const salt = process.env.PAYU_MERCHANT_SALT!;
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    const payload = payuService.buildPayload(payuParams, salt, {
      surl: `${redirectUrl}/api/payu/success`,
      furl: `${redirectUrl}/api/payu/failure`,
      payuUrl: process.env.NEXT_PUBLIC_PAYU_URL!,
    });

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { message: "Failed to initiate checkout" },
      { status: 500 }
    );
  }
}
