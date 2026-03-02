import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { paymentAttempt } from "@/db/schema";
import { payuService } from "@/services/payu.service";
import type { PayuCallback } from "@/types/payu";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as PayuCallback;
    const salt = process.env.PAYU_MERCHANT_SALT!;

    // Verify Hash
    const isValidHash = payuService.verifyResponseHash(data, salt);

    if (!isValidHash) {
      return NextResponse.redirect(
        new URL(
          "/checkout?payment=invalid",
          process.env.NEXT_PUBLIC_SITE_URL
        ).toString(),
        303
      );
    }

    // Find and Update Payment Attempt
    const attempt = await db.query.paymentAttempt.findFirst({
      where: eq(paymentAttempt.txnId, data.txnid),
    });

    if (attempt) {
      await db
        .update(paymentAttempt)
        .set({
          status: data.status,
          gatewayTxnId: data.mihpayid ?? null,
          mode: data.mode ?? null,
          error: data.error_Message || data.error || "Payment failed",
          metaData: data,
          updatedAt: new Date(),
        })
        .where(eq(paymentAttempt.id, attempt.id));
    }

    const destinationUrl = new URL(
      "/checkout/failed",
      process.env.NEXT_PUBLIC_SITE_URL
    );
    destinationUrl.searchParams.set("txnId", data.txnid);
    destinationUrl.searchParams.set("orderId", attempt?.orderId || "");

    return NextResponse.redirect(destinationUrl.toString(), 303);
  } catch {
    return NextResponse.redirect(
      new URL(
        "/checkout?payment=error",
        process.env.NEXT_PUBLIC_SITE_URL
      ).toString(),
      303
    );
  }
}
