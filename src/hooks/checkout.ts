import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import kyInstance from "@/lib/ky";
import { findVariant } from "@/lib/utils";
import type { AddToCartValues } from "@/types/cart";
import type { DirectCheckoutSession } from "@/types/checkout";

export function useCartCheckout() {
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Checkout successful! (Mocked)");
      setPending(false);
    } catch {
      setPending(false);
      toast.error("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickCheckout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      product,
      selectedOptions,
      quantity,
    }: AddToCartValues) => {
      const variantId = findVariant(product, selectedOptions)?._id ?? null;

      return kyInstance
        .post("/api/checkout/direct", {
          json: {
            productId: product._id,
            variantId,
            quantity,
          },
        })
        .json<DirectCheckoutSession>();
    },

    onSuccess(data) {
      const item = data?.items?.[0];

      if (!item) return;

      router.push(
        `/checkout?type=direct&variantId=${item.variantId}&qty=${item.quantity}`
      );
    },

    onError() {
      toast.error("Failed to start quick checkout. Please try again.");
    },
  });
}
