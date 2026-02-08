import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const cardVariants = cva(
  "group relative aspect-3/4 w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out",
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface ProductCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  imageUrl: string;
  category: string;
  href?: string;
  onLike?: (e: React.MouseEvent) => void;
  isLiked?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { className, imageUrl, category, href, onLike, isLiked = false, ...props },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(cardVariants({ className }))} {...props}>
        <img
          src={imageUrl}
          alt={category}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />

        {/* Subtle Bottom Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Like Button */}
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            onLike?.(e);
          }}
          className="absolute top-3 right-3 z-20 rounded-full bg-white/10 p-2 backdrop-blur-md transition-all hover:bg-white/30 active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 text-white",
              isLiked && "fill-red-500 text-red-500"
            )}
          />
        </button> */}

        <div className="absolute bottom-4 left-4 z-10">
          <a
            href={href || "#"}
            className="text-md relative inline-block py-1 font-bold tracking-[0.15em] text-white transition-colors duration-300"
          >
            {category}
            <span
              className={cn(
                "absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:w-full"
              )}
            />
          </a>
        </div>
      </div>
    );
  }
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
