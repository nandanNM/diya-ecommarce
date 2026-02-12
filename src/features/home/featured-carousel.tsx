"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/types";
import Image from "next/image";

interface FeaturedCarouselProps {
  products: Product[];
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Subtle gradient orbs using shadcn colors */}
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tl from-accent/20 to-transparent blur-3xl" />

      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {products.map((product, index) => (
            <CarouselItem key={product._id} className="pl-0">
              <FeaturedSlide product={product} isActive={index === current} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Stylish navigation arrows */}
        <CarouselPrevious className="left-6 h-12 w-12 border-border bg-background/80 backdrop-blur-xl transition-all hover:scale-110 hover:bg-accent sm:left-10" />
        <CarouselNext className="right-6 h-12 w-12 border-border bg-background/80 backdrop-blur-xl transition-all hover:scale-110 hover:bg-accent sm:right-10" />
      </Carousel>

      {/* Modern progress bar indicators */}
      {count > 1 && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-10">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => scrollTo(index)}
              className="group relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  current === index
                    ? "w-12 bg-primary"
                    : "w-8 bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                )}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface FeaturedSlideProps {
  product: Product;
  isActive: boolean;
}

function FeaturedSlide({ product, isActive }: FeaturedSlideProps) {
  const mainImage =
    product.media?.items?.[0]?.image?.url ||
    product.media?.mainMedia?.image?.url;

  return (
    <div className="relative flex min-h-[500px] flex-col md:min-h-[550px] md:flex-row lg:min-h-[600px]">
      {/* Image Section - Left side (55% on desktop) */}
      <div className="relative h-80 w-full md:h-auto md:w-[55%]">
        <div className="absolute inset-0 overflow-hidden">
          {mainImage ? (
            <>
              <Image
                src={mainImage}
                alt={product.name ?? "Featured product"}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              {/* Overlay using shadcn colors */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/95" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:hidden" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section - Right side (45% on desktop) */}
      <div className="relative flex w-full flex-col justify-center px-8 py-12 md:w-[45%] md:px-12 lg:px-20">
        {/* Decorative elements */}
        {/* <div className="absolute left-0 top-12 h-px w-16 bg-gradient-to-r from-primary/50 to-transparent" /> */}

        {product.ribbon && (
          <div className="mb-6 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Badge
              variant="secondary"
              className="border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wider backdrop-blur-sm hover:bg-primary/20"
            >
              {product.ribbon}
            </Badge>
          </div>
        )}

        <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {product.name}
        </h2>

        {product.description && (
          <div
            className="mt-6 line-clamp-3 text-base leading-relaxed text-muted-foreground sm:text-lg"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}

        <div className="mt-8">
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-bold text-foreground lg:text-6xl">
              {formatCurrency(
                product.priceData?.price,
                product.priceData?.currency
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden px-8 py-6 text-base font-semibold"
          >
            <Link href={`/products/${product.slug}`}>
              <span className="relative z-10 flex items-center gap-2">
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base font-semibold"
          >
            <Link href={`/products/${product.slug}`}>Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
