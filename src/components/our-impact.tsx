import React from "react";
import { cn } from "@/lib/utils";

const OurImpact = () => {
  return (
    <section className="w-full overflow-hidden bg-background py-12 md:py-24">
      {/* 18px padding based on your mobile inspector */}
      <div className="mx-auto max-w-7xl px-[18px]">
        <div className="relative flex flex-col items-center md:flex-row md:items-start">
          {/* --- Image Section: Two Images --- */}
          <div className="relative z-0 flex w-full gap-3 md:w-[60%] md:gap-4">
            {/* Left Image (Smaller/Staggered) */}
            <div className="w-1/2 rounded-sm bg-card p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:mt-12 md:w-[45%]">
              <img
                src="https://images.unsplash.com/photo-1770059706518-ece8f7264055?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Artisan weaving"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
            </div>

            {/* Right Image (Main/Higher) */}
            <div className="w-1/2 rounded-sm bg-card p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.1)] md:w-[50%]">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800"
                alt="Artisan group"
                className="aspect-[3/4] w-full rounded-sm object-cover"
              />
            </div>
          </div>

          {/* --- Text Card Section --- */}
          <div
            className={cn(
              "relative z-10 border border-border/50 bg-card",
              "w-[94%] md:w-[45%]",
              "p-8 md:p-16",
              "rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
              // Mobile: Overlaps bottom | Desktop: Overlaps right side
              "mt-[-40px] md:mt-24 md:-ml-28",
              "self-center"
            )}
          >
            <h3 className="mb-5 text-2xl font-medium tracking-tight text-foreground md:text-[32px]">
              Our Impact
            </h3>

            <p className="mb-10 text-[14px] leading-relaxed font-light tracking-wide text-muted-foreground md:text-[15px]">
              Handcrafted with love, our eco-friendly bamboo and cane products
              empower north east women artisans while caring for the earth.
            </p>

            <a
              href="#"
              className="group relative inline-block text-[11px] font-bold tracking-[0.25em] text-foreground uppercase"
            >
              Learn More
              <span className="absolute -bottom-1.5 left-0 h-[1.2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpact;
