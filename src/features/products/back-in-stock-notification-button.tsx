import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";

interface BackInStockNotificationButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({}: BackInStockNotificationButtonProps) {
  return (
    <Button variant="secondary" disabled>
      Notify When Available
    </Button>
  );
}
