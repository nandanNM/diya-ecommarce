import OurImpact from "@/features/home/our-impact";
import ShopPage from "@/features/shop/components/shop-page";
import Testimonials from "@/features/home/testimonials";
import TrustBadges from "@/features/home/trust-badges";
import { FeaturedProductsSection } from "@/features/home/featured-products-section";
import { Suspense } from "react";
import { FeaturedCarouselSkeleton } from "@/features/home/FeaturedCarouselSkeleton";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
      <ShopPage />
      <OurImpact />
      <Testimonials />
      <TrustBadges />
    </div>
  );
}
