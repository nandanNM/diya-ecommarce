import DiscountBadge from "@/components/common/discount-badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product, Variant } from "@/types/product";

interface ProductPriceProps {
  product: Product;
  selectedVariant: Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;

  if (!priceData) return null;

  const hasDiscount = priceData.discountedPrice !== priceData.price;

  return (
    <div className="flex items-center gap-2.5 text-xl font-bold">
      <span className={cn(hasDiscount && "text-muted-foreground line-through")}>
        {priceData.formatted?.price}
      </span>
      {hasDiscount && <span>{priceData.formatted?.discountedPrice}</span>}
      {hasDiscount &&
        (product.discount ? (
          <DiscountBadge data={product.discount} />
        ) : (
          <Badge className="bg-destructive">
            -
            {Math.round(
              (1 - priceData.discountedPrice / priceData.price) * 100
            )}
            %
          </Badge>
        ))}
    </div>
  );
}
