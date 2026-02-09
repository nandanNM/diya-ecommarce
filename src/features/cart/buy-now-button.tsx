import { useQuickCheckout as useQuickBuy } from "@/hooks/checkout";
import { cn } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";
import LoadingButton from "@/components/ui/loading-button";
import { ButtonProps } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface BuyNowButtonProps extends ButtonProps {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

export default function BuyNowButton({
  product,
  quantity,
  selectedOptions,
  className,
  ...props
}: BuyNowButtonProps) {
  const { startCheckoutFlow, pending } = useQuickBuy();

  return (
    <LoadingButton
      onClick={() => startCheckoutFlow({ product, quantity, selectedOptions })}
      loading={pending}
      variant="secondary"
      className={cn("flex gap-3", className)}
      {...props}
    >
      <CreditCardIcon />
      Buy now
    </LoadingButton>
  );
}
