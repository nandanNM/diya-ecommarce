"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { IntegratedOrderTicket } from "@/components/checkout/integrated-order-ticket";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import kyInstance from "@/lib/ky";
import type { Order } from "@/types/order";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkout-order", orderId],
    queryFn: () =>
      kyInstance.get(`/api/orders/${orderId}`).json<{ order: Order }>(),
    enabled: !!orderId,
  });

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };
    return () => {
      window.onpopstate = null;
    };
  }, []);

  if (!orderId) {
    return (
      <div className="mt-20 flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-md py-10 text-center">
          <CardContent>
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 font-medium text-muted-foreground">
              Preparing your order summary...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-20 flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4">
          <div className="h-48 w-full animate-pulse rounded-xl bg-muted" />
          <div className="h-32 w-full animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    );
  }

  if (isError || !data?.order) {
    return (
      <div className="mt-20 flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-md border-destructive/20 py-10 text-center shadow-lg">
          <CardContent>
            <p className="text-xl font-bold text-destructive">
              Order Not Found
            </p>
            <p className="mt-2 text-muted-foreground">
              We couldn&apos;t retrieve your order details. Don&apos;t worry,
              your payment was successful!
            </p>
            <Button asChild className="mt-6" variant="outline">
              <Link href="/orders">Go to My Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { order } = data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="flex flex-col items-center">
        <IntegratedOrderTicket order={order} className="mb-2 shadow-2xl" />

        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <Button asChild className="text-md w-full shadow-lg" size="lg">
            <Link href="/" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-20 flex min-h-[70vh] items-center justify-center px-4">
          <Card className="w-full max-w-md py-10 text-center">
            <CardContent>
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 font-medium text-muted-foreground">
                Loading order details...
              </p>
            </CardContent>
          </Card>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
