"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Mail,
  RefreshCw,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import kyInstance from "@/lib/ky";
import type { PaymentAttempt } from "@/types/payment";

export default function CheckoutFailedPage() {
  const searchParams = useSearchParams();
  const txnId = searchParams.get("txnId");
  const orderId = searchParams.get("orderId") || "N/A";

  const { data: attempt } = useQuery({
    queryKey: ["payment-attempt", txnId],
    queryFn: () =>
      kyInstance.get(`/api/payments/attempts/${txnId}`).json<PaymentAttempt>(),
    enabled: !!txnId,
  });

  const reason =
    attempt?.error ||
    searchParams.get("reason") ||
    "Payment was declined by the bank or cancelled by user.";

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <Card className="relative overflow-hidden border-destructive/20 shadow-2xl">
          <div className="absolute top-0 left-0 h-1.5 w-full bg-destructive sm:h-2" />

          <CardHeader className="pt-10 pb-4 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-destructive sm:text-4xl">
              Payment Failed
            </h1>
            <p className="mt-3 text-lg font-medium text-muted-foreground">
              We couldn&apos;t process your transaction.
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6 sm:px-10">
            <div className="space-y-4 rounded-2xl border border-primary/5 bg-muted/50 p-6 shadow-inner">
              <div className="flex items-center justify-between border-b border-primary/5 pb-3">
                <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                  Order Reference
                </span>
                <span className="rounded-md border bg-background px-3 py-1 font-mono font-bold text-foreground shadow-sm">
                  {orderId}
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-destructive/80 uppercase">
                  <AlertTriangle className="h-4 w-4" />
                  Failure Reason
                </div>
                <div className="rounded-xl border border-destructive/10 bg-destructive/5 p-4">
                  <p className="leading-relaxed font-medium text-foreground/90 italic">
                    &quot;{reason}&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center">
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                Your items are still reserved in your cart. You can try another
                payment method or contact us if you need help.
              </p>

              <div className="flex justify-center gap-6 pt-2">
                <div className="flex flex-col items-center gap-1 opacity-60">
                  <Smartphone className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase">
                    App Support
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-60">
                  <Mail className="h-5 w-5" />
                  <span className="text-[10px] font-bold uppercase">
                    Email Help
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 border-t bg-primary/2 p-6 sm:p-10">
            <Button
              asChild
              className="h-14 w-full text-lg font-black shadow-lg shadow-destructive/20 transition-all hover:scale-[1.02]"
              size="lg"
              variant="destructive"
            >
              <Link href="/checkout" className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Retry Payment
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-12 w-full font-semibold text-muted-foreground hover:text-foreground"
              size="lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Shop
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
