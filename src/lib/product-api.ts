import { MOCK_PRODUCTS } from "@/data/products";
import { Product } from "@/lib/types";

export function getProductBySlugMock(slug: string): Promise<Product | null> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
      resolve(product || null);
    }, 500);
  });
}

export function getAllProductsMock(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 500);
  });
}
