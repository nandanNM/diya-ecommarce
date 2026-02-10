import { Suspense } from "react";
import { FeaturedCarousel } from "./featured-carousel";
import { FeaturedCarouselSkeleton } from "./FeaturedCarouselSkeleton";
import { ALL_PRODUCTS } from "@/data/products";
import { delay } from "@/lib/utils";

async function getFeaturedProducts() {
  // Simulate network delay to demonstrate Suspense
  await delay(2000);
  return ALL_PRODUCTS;
}

export async function FeaturedProductsSection() {
  const featuredProducts = await getFeaturedProducts();

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <Suspense fallback={<FeaturedCarouselSkeleton />}>
      <FeaturedCarousel products={featuredProducts} />
    </Suspense>
  );
}
