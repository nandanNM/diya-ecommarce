import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import { order, payment, paymentAttempt } from "@/db/schema";
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
        `${process.env.NEXT_PUBLIC_SITE_URL}/orders?payment=invalid`
      );
    }

    //  Find Payment Attempt & Order
    const attempt = await db.query.paymentAttempt.findFirst({
      where: eq(paymentAttempt.txnId, data.txnid),
    });

    if (!attempt) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/orders?payment=notfound`
      );
    }

    const orderRow = await db.query.order.findFirst({
      where: eq(order.id, attempt.orderId),
    });

    if (!orderRow) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/orders?payment=notfound`
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
            rawResponse: data,
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

    const res = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?orderId=${attempt.orderId}`
    );

    if (orderRow.guestOrderToken) {
      res.cookies.set("diya-sessionId", orderRow.guestOrderToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return res;
  } catch {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/orders?payment=error`
    );
  }
}
