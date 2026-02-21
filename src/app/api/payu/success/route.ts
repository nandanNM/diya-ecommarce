import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import { cart, cartItem, order, payment, paymentAttempt } from "@/db/schema";
import { payuCallbackSchema } from "@/lib/validations";
import { payuService } from "@/services/payu.service";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const validation = payuCallbackSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid callback data" },
        { status: 400 }
      );
    }

    const payload = validation.data;
    const salt = process.env.PAYU_MERCHANT_SALT!;

    const isValid = payuService.verifyHash(payload, salt);
    if (!isValid) {
      return NextResponse.json(
        { message: "Hash verification failed" },
        { status: 400 }
      );
    }

    const attempt = await db.query.paymentAttempt.findFirst({
      where: eq(paymentAttempt.txnid, payload.txnid),
    });

    if (!attempt) {
      return NextResponse.json(
        { message: "Attempt not found" },
        { status: 404 }
      );
    }

    const orderRow = await db.query.order.findFirst({
      where: eq(order.id, attempt.orderId),
    });

    if (!orderRow) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    if (orderRow.paymentStatus !== "paid") {
      await db.transaction(async (tx) => {
        await tx
          .update(paymentAttempt)
          .set({
            status: "success",
            gatewayTxnId: payload.mihpayid,
            mode: payload.mode,
            rawResponse: payload,
            updatedAt: new Date(),
          })
          .where(eq(paymentAttempt.id, attempt.id));

        await tx
          .update(order)
          .set({
            paymentStatus: "paid",
            status: "processing",
            updatedAt: new Date(),
          })
          .where(eq(order.id, orderRow.id));

        await tx.insert(payment).values({
          id: uuidv7(),
          orderId: orderRow.id,
          userId: orderRow.userId,
          gateway: "payu",
          gatewayTransactionId: payload.mihpayid,
          amount: payload.amount,
          currency: "INR",
          status: "paid",
          paymentMethod: payload.mode,
          metadata: payload,
        });

        if (orderRow.userId) {
          const userCart = await tx.query.cart.findFirst({
            where: eq(cart.userId, orderRow.userId),
          });
          if (userCart) {
            await tx.delete(cartItem).where(eq(cartItem.cartId, userCart.id));
          }
        } else {
          // guest cart cleanup
          const cookieStore = await cookies();
          const sessionId = cookieStore.get("diya-cart-sessionId")?.value;
          if (sessionId) {
            const guestCart = await tx.query.cart.findFirst({
              where: eq(cart.sessionId, sessionId),
            });
            if (guestCart) {
              await tx
                .delete(cartItem)
                .where(eq(cartItem.cartId, guestCart.id));
            }
          }
        }
      });
    }

    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL!;

    if (!orderRow.userId && orderRow.guestOrderToken) {
      const res = NextResponse.redirect(
        `${redirectUrl}/guest/orders?order=${orderRow.orderNumber}`,
        { status: 303 }
      );
      (await cookies()).set(
        "diya-guest-order-token",
        orderRow.guestOrderToken,
        {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        }
      );
      return res;
    }

    return NextResponse.redirect(
      `${redirectUrl}/orders?order=${orderRow.orderNumber}&success=1`,
      { status: 303 }
    );
  } catch {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL!}/orders`);
  }
}
