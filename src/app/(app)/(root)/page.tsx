import OurImpact from "@/features/home/our-impact";
import ShopPage from "@/features/shop/components/shop-page";
import Testimonials from "@/features/home/testimonials";
import TrustBadges from "@/features/home/trust-badges";
import CTASection from "@/features/home/cta-section";

export default function Home() {
  return (
    <div className="max-w-7xl p-2 mx-auto">
      <CTASection
        title="Learn with Diya"
        subtitle="Diya is a platform that helps students learn and grow. We offer a variety of courses and resources to help you succeed."
        actions={[
          {
            text: "Get Started",
            href: "/courses",
            variant: "default",
          },
          {
            text: "Learn More",
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
