"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useInitiatePayment } from "@/hooks/checkout";
import type { GuestShippingValues } from "@/lib/validations";
import { guestShippingSchema } from "@/lib/validations";

import LoadingButton from "../ui/loading-button";

interface CheckoutFormProps {
  selectedAddress?: GuestShippingValues | null;
  prefillEmail?: string;
  // Checkout data
  cartId?: string;
  isDirect?: boolean;
  variantId?: string;
  quantity?: number;
  couponCode?: string;
  total?: number;
}

export default function CheckoutForm({
  selectedAddress,
  prefillEmail,
  cartId,
  isDirect,
  variantId,
  quantity,
  couponCode,
  total,
}: CheckoutFormProps) {
  const [error, setError] = useState<string>("");
  const mutation = useInitiatePayment();

  const form = useForm<GuestShippingValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(guestShippingSchema) as any,
    defaultValues: {
      fullName: "",
      email: prefillEmail ?? "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });

  useEffect(() => {
    if (selectedAddress) {
      form.reset(selectedAddress);
    }
  }, [selectedAddress, form]);

  useEffect(() => {
    if (prefillEmail && !form.getValues("email")) {
      form.setValue("email", prefillEmail);
    }
  }, [prefillEmail, form]);

  function handleSubmit(values: GuestShippingValues) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = { shippingDetails: values };

    if (isDirect && variantId) {
      payload.isDirect = true;
      payload.variantId = variantId;
      payload.quantity = quantity;
    } else if (cartId) {
      payload.cartId = cartId;
    }

    if (couponCode) {
      payload.couponCode = couponCode;
    }

    mutation.mutate(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <Input placeholder="123 Main Street" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 2 (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Apartment, suite, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/Vilage</FormLabel>
                <FormControl>
                  <Input placeholder="Mumbai" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Maharashtra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code</FormLabel>
                <FormControl>
                  <Input placeholder="400001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          loading={mutation.isPending}
          className="w-full"
          size="lg"
          type="submit"
        >
          {total ? `Pay ₹${total.toFixed(2)}` : "Continue to Payment"}
        </LoadingButton>
      </form>
    </Form>
  );
}
