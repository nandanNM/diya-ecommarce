import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Product, Variant } from "../types/product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "INR"
) {
  return Intl.NumberFormat("en-IN", { style: "currency", currency }).format(
    Number(price)
  );
}

export function checkInStock(
  product: Product,
  selectedOptions: Record<string, string>
) {
  const variant = findVariant(product, selectedOptions);
  return variant ? variant.stock?.inStock : product.stock?.inStock;
}

export function findVariant(
  product: Product,
  selectedOptions: Record<string, string>
): Variant | null {
  if (!product.variants || product.variants.length === 0) return null;

  const choiceKeys = Object.keys(selectedOptions);

  const matched =
    choiceKeys.length === 0
      ? product.variants[0]
      : (product.variants.find((v) =>
          choiceKeys.every((key) => v.choices?.[key] === selectedOptions[key])
        ) ?? product.variants[0]);

  return matched ?? null;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
