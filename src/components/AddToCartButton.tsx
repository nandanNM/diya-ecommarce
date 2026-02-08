import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  disabled?: boolean;
  className?: string;
}

export default function AddToCartButton({ disabled, className }: AddToCartButtonProps) {
  return (
    <Button disabled={disabled} className={className}>
      Add to Cart
    </Button>
  );
}
