"use client";
import { Product as ProductType } from "@/lib/types";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import IKImage from "./ik-image";
import AddToCartButton from "@/features/cart/add-to-cart-button";

interface ProductProps {
  product: ProductType;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.items?.[0]?.image?.url || "/placeholder.jpg";
  const mainAlt = product.media?.items?.[0]?.image?.altText || product.name;

  return (
    <Link href={`/products/${product.slug}`} className="group block space-y-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <IKImage
          src={mainImage}
          alt={mainAlt}
          width={700}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.ribbon && (
          <span className="absolute left-2 top-2 bg-black px-2 py-1 text-xs font-medium text-white">
            {product.ribbon}
          </span>
        )}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-all duration-300 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 px-4">
           <AddToCartButton
            product={product}
            selectedOptions={{}}
            quantity={1}
            className="w-full"
            size="sm"
          />
        </div>
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium uppercase leading-tight tracking-wide">
          {product.name}
        </h3>
        {product.priceData?.formatted && (
          <div className="flex gap-2">
            {product.priceData.price !== product.priceData.discountedPrice && (
                <span className="text-muted-foreground line-through">
                {product.priceData.formatted.price}
                </span>
            )}
            <span className="font-medium">
              {product.priceData.formatted.discountedPrice}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
