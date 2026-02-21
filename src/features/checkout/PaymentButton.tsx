"use client";

import { useMutation } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

import { redirectToPayU } from "@/components/forms/payU-form";
import LoadingButton from "@/components/ui/loading-button";
import kyInstance from "@/lib/ky";
import type { CheckoutInitiateValues } from "@/lib/validations";
import type { PayUInitiateResponse } from "@/types/checkout";

interface PaymentButtonProps {
  shippingDetails: CheckoutInitiateValues["shippingDetails"];
  isDirect?: boolean;
  variantId?: string;
  quantity?: number;
  cartId?: string;
  couponCode?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export default function PaymentButton({
  shippingDetails,
  isDirect,
  variantId,
  quantity,
  cartId,
  couponCode,
  disabled,
  className,
  label = "Pay with PayU",
}: PaymentButtonProps) {
  const mutation = useMutation({
    mutationFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: Record<string, any> = { shippingDetails };

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

      return kyInstance
        .post("/api/checkout/initiate", { json: payload })
        .json<PayUInitiateResponse>();
    },
    onSuccess: (data) => {
      redirectToPayU(data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const msg = error?.response
        ? "Checkout initiation failed. Please try again."
        : "Network error. Please check your connection.";
      toast.error(msg);
    },
  });

  const handlePay = () => {
    if (
      !shippingDetails.fullName ||
      !shippingDetails.email ||
      !shippingDetails.phone
    ) {
      toast.error("Please fill in all shipping details first.");
      return;
    }
    mutation.mutate();
  };

  return (
    <LoadingButton
      onClick={handlePay}
      loading={mutation.isPending}
      disabled={disabled || mutation.isPending}
      className={className}
    >
      <CreditCard className="mr-2 h-4 w-4" />
      {label}
    </LoadingButton>
  );
}
