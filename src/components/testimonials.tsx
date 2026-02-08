"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "SIDRA SULTAN",
    image: "https://images.unsplash.com/photo-1590739225017-e8515d4c2f14?q=80&w=400",
    text: "The Tote bag is so beautiful and it elevated my beach outfits effortlessly. It is a must have accessory for any beach lover.",
    rating: 5,
  },
  {
    id: 2,
    name: "AKANKSHA MAHESHWARI",
    image: "https://images.unsplash.com/photo-1615485020227-bc15f3760e6b?q=80&w=400",
    text: "Ordered the water hyacinth tray and some wooden candles and everything is so beautiful. Really impressed with the quality of your products. Loved curating these sustainable products.",
    rating: 5,
  },
  {
    id: 3,
    name: "GURLEEN KANG",
    image: "https://images.unsplash.com/photo-1615651773118-98e7f28f5419?q=80&w=400",
    text: "The interwoven basket is so unique and versatile. Its very beautiful and I loved styling it.",
    rating: 5,
  },
  {
    id: 4,
    name: "TANYA KAUR",
    image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?q=80&w=400",
    text: "We did a bulk order with them for their versatile trays and scented candles. Must say, really love the quality of your products. We always get compliments especially for the wooden candles. Hope to keep working with you in the future.",
    rating: 5,
  },
  {
    id: 5,
    name: "PRIYA SHARMA",
    image: "https://images.unsplash.com/photo-1616486701797-0f33f61038ec?q=80&w=400",
    text: "Absolutely in love with the handcrafted decor pieces. They add such warmth to my living space.",
    rating: 5,
  },
];

export default function TestimonialsClean() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-center mb-12 text-[32px] font-light text-[#2D2D2D]">
          Testimonials
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-[60px] md:top-[80px] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            aria-label="Previous testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-[60px] md:top-[80px] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            aria-label="Next testimonial"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="flex items-center">
              {TESTIMONIALS.map((testimonial, index) => {
                const isActive = index === current;
                const offset = Math.abs(index - current);
                
                return (
                  <CarouselItem
                    key={testimonial.id}
                    className="basis-1/5 md:basis-[12%] flex justify-center"
                  >
                    <button
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "relative overflow-hidden transition-all duration-500 ease-out focus:outline-none",
                        isActive
                          ? "w-32 h-32 md:w-40 md:h-40 rounded-[44px] opacity-100 scale-100 ring-4 ring-blue-100/60 ring-offset-4"
                          : offset === 1
                          ? "w-20 h-20 md:w-28 md:h-28 rounded-3xl opacity-60 scale-95"
                          : "w-16 h-16 md:w-20 md:h-20 rounded-2xl opacity-40 scale-90"
                      )}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 128px, 160px"
                      />
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>

          {/* Testimonial Content */}
          <div className="mt-16 flex flex-col items-center">
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-colors duration-500",
                    i < TESTIMONIALS[current].rating
                      ? "fill-[#FFB800] text-[#FFB800]"
                      : "fill-gray-300 text-gray-300"
                  )}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-center max-w-2xl text-[16px] md:text-[18px] font-normal leading-relaxed text-[#3D3D3D] mb-7 px-8 transition-opacity duration-500">
              {TESTIMONIALS[current].text}
            </p>

            {/* Divider Line */}
            <div className="w-12 h-[1px] bg-gray-300 mb-4" />

            {/* Author Name */}
            <cite className="text-[11px] font-medium tracking-[0.25em] text-[#2D2D2D] uppercase not-italic">
              {TESTIMONIALS[current].name}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
