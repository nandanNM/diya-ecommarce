"use client";

import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function CheckoutFailedPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "N/A";
  const reason =
    searchParams.get("reason") || "Payment was declined or cancelled.";

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-destructive/20 shadow-lg">
        <CardHeader className="pb-2 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-destructive">
            Payment Failed
          </h1>
          <p className="mt-2 text-muted-foreground">
            Something went wrong while processing your payment.
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="rounded-lg bg-muted/50 p-4 text-sm">
            <div className="mb-2 flex justify-between">
              <span className="text-muted-foreground">Order ID:</span>
              <span className="font-mono font-medium">{orderNumber}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Reason:</span>
              <span className="text-destructive/80 italic">{reason}</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Don&apost worry, your items are still in your cart if you&aposd like
            to try again.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/checkout" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
