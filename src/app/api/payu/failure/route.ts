import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { order, paymentAttempt } from "@/db/schema";
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

    await db
      .update(paymentAttempt)
      .set({
        status: "failure",
        error: payload.error_Message || "Payment failed",
        gatewayTxnId: payload.mihpayid,
        rawResponse: payload,
        updatedAt: new Date(),
      })
      .where(eq(paymentAttempt.id, attempt.id));

    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL!;
    const orderNum = orderRow?.orderNumber || "unknown";

    return NextResponse.redirect(
      `${redirectUrl}/checkout/failed?order=${orderNum}&reason=${encodeURIComponent(
        payload.error_Message || "Payment was declined or cancelled"
      )}`,
      { status: 303 }
    );
  } catch {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL!}/checkout`
    );
  }
}
