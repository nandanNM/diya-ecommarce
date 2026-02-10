"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { checkInStock, findVariant } from "@/lib/utils";
import { Product } from "@/lib/types";
import { BadgeInfo, Eye, InfoIcon, Minus, Plus, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import ProductMedia from "./ProductMedia";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import AddToCartButton from "@/features/cart/add-to-cart-button";
import BackInStockNotificationButton from "@/features/products/back-in-stock-notification-button";

import WhatsAppCheckoutButton from "@/features/cart/whatsapp-checkout-button";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Initial random value between 5 and 30
    setViewers(Math.floor(Math.random() * 25) + 5);

    const interval = setInterval(() => {
      // Update to a new random value between 5 and 30
      setViewers(Math.floor(Math.random() * 25) + 5);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
  );

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""]
    );
    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <ProductMedia
        media={
          !!selectedOptionsMedia?.length
            ? selectedOptionsMedia
            : product.media?.items
        }
      />
      <div className="basis-3/5 space-y-6">
        <div className="space-y-2">
           <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Fast Shipping Within 2 Working Days
          </div>
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge className="block w-fit">{product.ribbon}</Badge>}
        </div>

        <ProductPrice product={product} selectedVariant={selectedVariant} />
        
        {/* Viewers Count */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium animate-pulse">
          <Eye className="h-4 w-4" />
          <span>{viewers} people watching this product now!</span>
        </div>

        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        
        <div className="space-y-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || !inStock}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
              disabled={
                !inStock || (!!availableQuantity && quantity >= availableQuantity)
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
            {!!availableQuantity &&
              (availableQuantityExceeded || availableQuantity < 10) && (
                <span className="ml-2 text-sm text-destructive">
                  Only {availableQuantity} left in stock
                </span>
              )}
          </div>
        </div>

        {inStock ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row">
              <AddToCartButton
                className="flex-1"
                product={product}
                selectedOptions={selectedOptions}
                disabled={availableQuantityExceeded || quantity < 1}
                quantity={quantity}
              />
              {/* <BuyNowButton
                product={product}
                selectedOptions={selectedOptions}
                disabled={availableQuantityExceeded || quantity < 1}
                quantity={quantity}
                className="flex-1"
              /> */}
            </div>
            <WhatsAppCheckoutButton
              product={product}
              selectedOptions={selectedOptions}
              disabled={availableQuantityExceeded || quantity < 1}
              quantity={quantity}
              className="w-full"
            />
          </div>
        ) : (
          <BackInStockNotificationButton
            product={product}
            selectedOptions={selectedOptions}
          />
        )}
        <div className="mt-8 border-t pt-6">
             <div className="flex items-center gap-2 mb-4">
               <BadgeInfo className="h-5 w-5" />
               <span className="font-semibold text-lg">Description</span>
             </div>
            {product.description && (
            <div
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="prose dark:prose-invert text-sm text-muted-foreground leading-relaxed"
            />
            )}
        </div>

        {!!product.additionalInfoSections?.length && (
          <div className="space-y-1.5 text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
                 <Truck className="h-5 w-5" />
                 <span className="font-semibold text-lg">Shipping & Returns</span>
            </div>
            <Accordion type="multiple" className="w-full">
              {product.additionalInfoSections.map((section) => (
                <AccordionItem value={section.title || ""} key={section.title}>
                  <AccordionTrigger className="text-base">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                      className="prose dark:prose-invert text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
