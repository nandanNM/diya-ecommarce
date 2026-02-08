import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { Product, Variant } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}

export function checkInStock(
  product: Product,
  selectedOptions: Record<string, string>
) {
  const variant = findVariant(product, selectedOptions);
  return variant
    ? variant.stock?.inStock
    : product.stock?.inStock;
}

export function findVariant(
  product: Product,
  selectedOptions: Record<string, string>
) {
  if (!product.productOptions?.length) return null;
  
  // Since we don't have real variants in the mock data, 
  // we'll return a mock variable or null based on logic.
  // For now, let's just return a basic mock variant if stock exists.
  return {
      _id: "mock-variant-id",
      choices: selectedOptions,
      stock: product.stock,
      priceData: product.priceData,
      variant: {
          priceData: product.priceData
      }
  } as Variant;
}
