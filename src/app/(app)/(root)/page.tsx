import HeroSlider from "@/features/home/hero-slider";
import OurImpact from "@/features/home/our-impact";
import ShopPage from "@/features/shop/components/shop-page";
import Testimonials from "@/features/home/testimonials";
import TrustBadges from "@/features/home/trust-badges";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <ShopPage />
      <OurImpact />
      <Testimonials />
      <TrustBadges />
    </div>
  );
}
