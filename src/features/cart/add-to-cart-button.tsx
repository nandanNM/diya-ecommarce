import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import useCartStore from "@/store/useCartStore";

interface AddToCartButtonProps extends ButtonProps {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton
      className={cn("flex gap-2 rounded-md py-6", className)}
      onClick={() => {
        setLoading(true);
        // Simulate a small delay for better UX
        setTimeout(() => {
          addItem(product, quantity, selectedOptions);
          setLoading(false);
          toast.success("Item added to cart");
        }, 200);
      }}
      loading={loading}
      {...props}
    >
      <ShoppingCartIcon />
      Add to cart
    </LoadingButton>
  );
}
