"use client";

import {
  ChevronLeft,
  MapPin,
  Percent,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import { useState } from "react";

import CheckoutForm from "@/components/forms/checkout-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartSummary } from "@/hooks/useCartSummary";
import { cn } from "@/lib/utils";
import type { AddressFormValues } from "@/lib/validations";
import useCartStore from "@/store/useCartStore";

export default function Checkout() {
  const { items } = useCartStore();
  const { subtotal: cartSubtotal } = useCartSummary();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleAddressSubmit = async (values: AddressFormValues) => {
    setIsProcessing(true);
    // TODO: Process checkout with address values
    console.log("Address submitted:", values);
    // Navigate to payment or process order
    setIsProcessing(false);
  };

  const handleApplyCoupon = () => {
    // TODO: Validate coupon code with API
    // For now, just apply it if not empty
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.trim().toUpperCase());
      setCouponCode("");
      setCouponError("");
    } else {
      setCouponError("Please enter a coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  // TODO: Calculate discount based on applied coupon from API
  const discount = appliedCoupon ? cartSubtotal * 0.1 : 0; // Example: 10% off

  // TODO: Calculate shipping based on address/cart weight
  const shipping = 0; // Free shipping for now

  const total = cartSubtotal - discount + shipping;

  return (
    <div className="bg-liner-to-b min-h-screen from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 transition-all hover:gap-3"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Cart</span>
            </Button>
            <div className="h-8 w-px bg-border" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Checkout
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete your purchase securely
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Shipping Address Form */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-primary/20 shadow-sm">
              <CardHeader className="border-b bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">
                    Shipping Information
                  </h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CheckoutForm onSubmit={handleAddressSubmit} />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden border-primary/20 shadow-sm">
              <CardHeader className="border-b bg-primary/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-semibold">Order Summary</h3>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 p-4">
                {/* Order Items */}
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <ShoppingBag className="mb-2 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
                    {items.map((item) => {
                      const price =
                        item.product.priceData?.discountedPrice ??
                        item.product.priceData?.price ??
                        0;
                      const totalPrice = price * item.quantity;

                      return (
                        <div
                          key={item.cartItemId}
                          className="flex gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/50"
                        >
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-secondary">
                            <img
                              src={
                                item.product.media?.mainMedia?.image?.url ||
                                item.product.media?.items?.[0]?.image?.url ||
                                "/placeholder.png"
                              }
                              alt={item.product.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground shadow-sm">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                              <p className="line-clamp-2 text-sm leading-tight font-semibold">
                                {item.product.name}
                              </p>
                              {Object.keys(item.selectedOptions).length > 0 && (
                                <div className="mt-1 text-xs text-muted-foreground">
                                  {Object.entries(item.selectedOptions).map(
                                    ([key, value]) => (
                                      <span key={key} className="block">
                                        {key}: {value}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>
                                  {item.quantity} x ₹{price.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-primary">
                                  ₹{totalPrice.toFixed(2)}
                                </span>
                                {item.product.priceData?.discountedPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    ₹
                                    {(
                                      item.product.priceData.price! *
                                      item.quantity
                                    ).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Coupon Section */}
                {items.length > 0 && (
                  <div className="flex flex-col gap-3 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Tag className="h-4 w-4 text-primary" />
                      <span>Have a coupon?</span>
                    </div>
                    {!appliedCoupon ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={couponCode}
                            onChange={(e) =>
                              setCouponCode(e.target.value.toUpperCase())
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleApplyCoupon();
                              }
                            }}
                            className="flex-1 uppercase"
                          />
                          <Button
                            onClick={handleApplyCoupon}
                            className="bg-primary hover:bg-primary/90"
                            size="lg"
                          >
                            Apply
                          </Button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-destructive">
                            {couponError}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between rounded-lg border-2 border-green-500/20 bg-green-50 p-3 dark:bg-green-950/30">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <Percent className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-green-800 dark:text-green-200">
                              {appliedCoupon}
                            </span>
                            <span className="text-xs text-green-600 dark:text-green-400">
                              Coupon applied
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveCoupon}
                          className="h-8 w-8 p-0 text-green-600 hover:bg-green-100 hover:text-green-800 dark:text-green-400 dark:hover:bg-green-900 dark:hover:text-green-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Pricing Breakdown */}
                {items.length > 0 && (
                  <div className="flex flex-col gap-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ₹{cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600 dark:text-green-400">
                          Discount
                        </span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          -₹{discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span
                        className={cn(
                          "font-medium",
                          shipping === 0 && "text-green-600 dark:text-green-400"
                        )}
                      >
                        {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="text-base font-semibold">Total</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Badge Hare */}
          </div>
        </div>
      </div>
    </div>
  );
}
