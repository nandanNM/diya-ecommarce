import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface BuyNowButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  disabled?: boolean;
}

export default function BuyNowButton({ disabled }: BuyNowButtonProps) {
  return (
    <Button variant="outline" disabled={disabled}>
      Buy Now
    </Button>
  );
}
