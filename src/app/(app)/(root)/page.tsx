import OurImpact from "@/features/home/our-impact";
import ShopPage from "@/features/shop/components/shop-page";
import Testimonials from "@/features/home/testimonials";
import TrustBadges from "@/features/home/trust-badges";
import CTASection from "@/features/home/cta-section";

export default function Home() {
  return (
    <div className="max-w-7xl p-2 mx-auto">
      <CTASection
        title="Hand-Poured Nostalgia"
        subtitle="From the chaos of circuits to the calm of soy wax. We are a group of students making eco-friendly, wooden-wick candles that sound like a tiny fireplace and smell like home."
        actions={[
          {
            text: "Explore Collection",
            href: "/#collection",
            variant: "default",
          },
          {
            text: "Our Story",
            href: "/about-us",
            variant: "outline",
          },
        ]}
       
        images={[
          "https://ik.imagekit.io/codernandan/assets/cta-s1.jpeg",
          "https://ik.imagekit.io/codernandan/banner/diya-b1.png",
"https://ik.imagekit.io/codernandan/assets/cta-s2.jpg" 
       ]}
      />
      <ShopPage />
      <TrustBadges />
      <Testimonials />
      <OurImpact />
    </div>
  );
}
