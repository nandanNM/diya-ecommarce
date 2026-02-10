import { useCartCheckout } from "@/hooks/checkout";
import LoadingButton from "@/components/ui/loading-button";
import { ButtonProps } from "@/components/ui/button";

export default function CheckoutButton(props: ButtonProps) {
  const { startCheckoutFlow, pending } = useCartCheckout();

  return (
    <LoadingButton onClick={startCheckoutFlow} loading={pending} {...props}>
      Checkout
    </LoadingButton>
  );
}
