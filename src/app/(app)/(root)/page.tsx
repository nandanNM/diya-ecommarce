import HeroSlider from "@/components/hero-slider";
import OurImpact from "@/components/our-impact";
import ShopPage from "@/components/shop-page";
import Testimonials from "@/components/testimonials";
import TrustBadges from "@/components/trust-badges";

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
