import codBadge from "@/assets/cod-badge.png";
import shippingBadge from "@/assets/shipping-badge.png";
import qualityBadge from "@/assets/quality-badge.png";
import Image from "next/image";
export default function TrustBadges() {
  const TRUST_BADGES = [
    { id: 1, name: "COD Available", image: codBadge },
    { id: 2, name: "Free Shipping", image: shippingBadge },
    { id: 3, name: "Premium Quality", image: qualityBadge },
  ];
  return (
    <section className="border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4.5">
        <div className="grid grid-cols-3 gap-12 md:gap-4">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <Image
                src={badge.image.src || badge.image}
                alt={badge.name}
                height={80}
                width={80}
                className="object-contain"
              />
              <p className="text-[11px] font-bold tracking-[0.2em] text-foreground uppercase">
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
