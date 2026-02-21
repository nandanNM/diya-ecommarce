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
import type { GuestShippingValues } from "@/lib/validations";
import { guestShippingSchema } from "@/lib/validations";

import LoadingButton from "../ui/loading-button";

interface CheckoutFormProps {
  onSubmit?: (values: GuestShippingValues) => void;
  renderSubmit?: (values: GuestShippingValues) => React.ReactNode;
  selectedAddress?: GuestShippingValues | null;
  isProcessing?: boolean;
  prefillEmail?: string;
}

export default function CheckoutForm({
  onSubmit,
  renderSubmit,
  selectedAddress,
  isProcessing,
  prefillEmail,
}: CheckoutFormProps) {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

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

  // eslint-disable-next-line react-hooks/incompatible-library
  const currentValues = form.watch();

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
    if (!onSubmit) return;
    startTransition(async () => {
      try {
        onSubmit(values);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
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
                <FormLabel>City</FormLabel>
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

        {renderSubmit ? (
          renderSubmit(currentValues)
        ) : (
          <LoadingButton
            loading={isPending || !!isProcessing}
            className="w-full"
            size="lg"
            type="submit"
          >
            Continue to Payment
          </LoadingButton>
        )}
      </form>
    </Form>
  );
}
