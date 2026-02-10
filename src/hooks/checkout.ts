import useCartStore from "@/store/useCartStore";
import { useState } from "react";

export function useCartCheckout() {
  const { resetCart } = useCartStore();

  const [pending, setPending] = useState(false);

  async function startCheckoutFlow() {
    setPending(true);

    try {
      // Simulate checkout delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resetCart();
      alert("Checkout successful! (Mocked)");
      setPending(false);
    } catch (error) {
      setPending(false);
      console.error(error);
      alert("Failed to load checkout. Please try again.");
    }
  }

  return { startCheckoutFlow, pending };
}

export function useQuickCheckout() {
  const [pending, setPending] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function startCheckoutFlow(values: any) {
    setPending(true);
    console.log("Quick checkout values", values);

    try {
      // Simulate checkout delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Quick checkout successful! (Mocked)");
      setPending(false);
    } catch (error) {
      setPending(false);
      console.error(error);
      alert("Failed to load checkout. Please try again.");
    }
  }
  return { startCheckoutFlow, pending };
}
