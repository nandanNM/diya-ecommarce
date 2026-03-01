"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CheckCircle2, Loader2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import kyInstance from "@/lib/ky";
import { formatCurrency } from "@/lib/utils";
import type { Order } from "@/types/order";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkout-order", orderId],
    queryFn: () =>
      kyInstance.get(`/api/orders/${orderId}`).json<{ order: Order }>(),
    enabled: !!orderId,
  });

  useEffect(() => {
    // Optionally trigger confetti or other success effects here
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
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <div className="text-center">
        <div className="group mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-transform hover:scale-110">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Thank you for your order!
        </h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">
          We&apos;ve received your payment and our team is already working on
          your request.
        </p>
        <div className="mt-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Order #{order.orderNumber}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <Card className="overflow-hidden border-primary/10 bg-card/50 shadow-md backdrop-blur-sm">
          <CardHeader className="bg-primary/5 px-6 py-3">
            <h2 className="text-sm font-bold tracking-wider text-muted-foreground uppercase">
              Order Summary
            </h2>
          </CardHeader>
          <CardContent className="divide-y divide-primary/5 p-0">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-5 transition-colors hover:bg-primary/5"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-primary/5 bg-muted">
                  <Image
                    src={item.image || "/placeholder.png"}
                    alt={item.name || "Product Image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Qty: {item.quantity} • {formatCurrency(Number(item.price))}
                  </p>
                  {item.selectedOptions &&
                    Object.keys(item.selectedOptions).length > 0 && (
                      <div className="mt-1 flex gap-2">
                        {Object.entries(item.selectedOptions).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="rounded-full border bg-muted px-2 py-0.5 text-[10px]"
                            >
                              {key}: {String(value)}
                            </span>
                          )
                        )}
                      </div>
                    )}
                </div>
                <p className="font-mono text-sm font-bold text-foreground">
                  {formatCurrency(Number(item.price) * item.quantity)}
                </p>
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex flex-col gap-2 bg-muted/30 p-6">
            <div className="flex w-full justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(Number(order.subtotal))}</span>
            </div>
            {Number(order.discount) > 0 && (
              <div className="flex w-full justify-between text-sm font-medium text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(Number(order.discount))}</span>
              </div>
            )}
            <div className="flex w-full justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {Number(order.shippingCost) === 0
                  ? "FREE"
                  : formatCurrency(Number(order.shippingCost))}
              </span>
            </div>
            <div className="mt-2 flex w-full items-center justify-between border-t border-primary/10 pt-4">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="font-mono text-2xl font-black text-primary">
                {formatCurrency(Number(order.total))}
              </span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="text-md h-12 flex-1 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
            size="lg"
          >
            <Link href="/" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-md h-12 flex-1 border-primary/20 hover:bg-primary/5"
            size="lg"
          >
            <Link href="/orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              View Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
