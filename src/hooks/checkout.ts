import { useState } from "react";
import { toast } from "sonner";

import useCartStore from "@/store/useCartStore";

export function useCartCheckout() {
  const { resetCart } = useCartStore();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetCart();
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
  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);
    try {
      // Simulate checkout delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Quick checkout successful! (Mocked)");
      setPending(false);
    } catch {
      setPending(false);
      toast.error("Failed to load checkout. Please try again.");
    }
  }
  return { startCheckoutFlow, pending };
}
