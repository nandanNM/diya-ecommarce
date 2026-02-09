"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "SIDRA SULTAN",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    text: "The Tote bag is so beautiful and it elevated my beach outfits effortlessly. It is a must have accessory for any beach lover.",
    rating: 5,
  },
  {
    id: 2,
    name: "AKANKSHA MAHESHWARI",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    text: "Ordered the water hyacinth tray and some wooden candles and everything is so beautiful. Really impressed with the quality of your products. Loved curating these sustainable products.",
    rating: 5,
  },
  {
    id: 3,
    name: "GURLEEN KANG",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    text: "The interwoven basket is so unique and versatile. Its very beautiful and I loved styling it.",
    rating: 5,
  },
  {
    id: 4,
    name: "TANYA KAUR",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    text: "We did a bulk order with them for their versatile trays and scented candles. Must say, really love the quality of your products. We always get compliments especially for the wooden candles. Hope to keep working with you in the future.",
    rating: 5,
  },
  {
    id: 5,
    name: "PRIYA SHARMA",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    text: "Absolutely in love with the handcrafted decor pieces. They add such warmth to my living space.",
    rating: 5,
  },
  {
    id: 6,
    name: "EISHA SINGH",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    text: "I have mostly all pieces from F&F's candle collection. Absolutely love your products, the candles smell so amazing. My room smells like a little haven where I can just retire with these wholesome fragrances satisfying my soul.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [direction, setDirection] = React.useState(1); // 1 = next (right to left), -1 = prev (left to right)

  // Infinite loop navigation
  const handlePrevious = () => {
    setDirection(-1); // Moving left to right
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setDirection(1); // Moving right to left
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleImageClick = (index:number) => {
    if (index === currentIndex) return;
    // Determine direction based on which side was clicked
    const diff = index - currentIndex;
    if (diff > 0 || diff < -TESTIMONIALS.length / 2) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurrentIndex(index);
  };

  // Get visible items (center + 2 on each side)
  const getVisibleItems = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + TESTIMONIALS.length) % TESTIMONIALS.length;
      visible.push({ index, position: i });
    }
    return visible;
  };

  // Calculate image properties based on position
  const getImageProps = (position:number) => {
    const absPos = Math.abs(position);
    
    if (position === 0) {
      return {
        scale: 1,
        opacity: 1,
        zIndex: 50,
        blur: 0,
      };
    } else if (absPos === 1) {
      return {
        scale: 0.7,
        opacity: 0.75,
        zIndex: 40,
        blur: 0,
      };
    } else {
      return {
        scale: 0.55,
        opacity: 0.5,
        zIndex: 30,
        blur: 1,
      };
    }
  };

  return (
    <section className="w-full bg-[#FAFAF8] py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-center mb-12 md:mb-20 text-[28px] md:text-[36px] font-light text-[#2D2D2D] tracking-wide">
          Testimonials
        </h2>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Ghost Navigation Arrows */}
          <motion.button
            onClick={handlePrevious}
            initial={false}
            animate={{ 
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute left-1 md:left-4 lg:left-8 top-[70px] md:top-[100px] -translate-y-1/2 z-[60] w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" strokeWidth={2.5} />
          </motion.button>

          <motion.button
            onClick={handleNext}
            initial={false}
            animate={{ 
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute right-1 md:right-4 lg:right-8 top-[70px] md:top-[100px] -translate-y-1/2 z-[60] w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95 transition-all duration-300"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" strokeWidth={2.5} />
          </motion.button>

          {/* Carousel Images */}
          <div className="relative h-[140px] md:h-[200px] flex items-center justify-center mb-10 md:mb-16 overflow-visible">
            <div className="relative flex items-center justify-center gap-3 md:gap-6">
              <AnimatePresence initial={false} custom={direction}>
                {getVisibleItems().map(({ index, position }) => {
                  const { scale, opacity, zIndex, blur } = getImageProps(position);
                  const isActive = position === 0;
                  const testimonial = TESTIMONIALS[index];
                  
                  // Calculate slide distance based on position with proper spacing
                  const getSlideX = (pos:number) => {
                    const mobileSpacing = 130;
                    const desktopSpacing = 180;
                    // Use average for responsive behavior
                    const spacing = 155;
                    return pos * spacing;
                  };
                  
                  return (
                    <motion.button
                      key={`${testimonial.id}-${index}`}
                      onClick={() => handleImageClick(index)}
                      custom={direction}
                      initial={{
                        x: direction > 0 ? 500 : -500,
                        scale: 0.4,
                        opacity: 0,
                      }}
                      animate={{
                        x: getSlideX(position),
                        scale: scale,
                        opacity: opacity,
                        filter: blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
                      }}
                      exit={{
                        x: direction > 0 ? -500 : 500,
                        scale: 0.4,
                        opacity: 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 28,
                        mass: 0.8,
                      }}
                      className={cn(
                        "absolute overflow-hidden focus:outline-none cursor-pointer",
                        "w-[110px] h-[110px] md:w-[160px] md:h-[160px]",
                        "rounded-[32px] md:rounded-[44px]",
                        isActive && "ring-2 md:ring-4 ring-blue-100/70 ring-offset-2 md:ring-offset-4 shadow-xl md:shadow-2xl"
                      )}
                      style={{
                        zIndex: zIndex,
                      }}
                      whileHover={{ opacity: 1.05 }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 110px, 160px"
                        priority={isActive}
                      />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Testimonial Content with AnimatePresence */}
          <div className="mt-6 md:mt-8 flex flex-col items-center px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{ 
                  opacity: 0, 
                  x: direction > 0 ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  x: direction > 0 ? -100 : 100 
                }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="flex flex-col items-center w-full"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-5 md:mb-7">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: "backOut"
                      }}
                    >
                      <Star
                        className={cn(
                          "w-4 h-4 md:w-5 md:h-5",
                          i < TESTIMONIALS[currentIndex].rating
                            ? "fill-[#FFB800] text-[#FFB800]"
                            : "fill-gray-300 text-gray-300"
                        )}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <div className="min-h-[100px] md:min-h-[130px] flex items-center justify-center overflow-hidden">
                  <p className="text-center max-w-2xl text-[15px] md:text-[17px] lg:text-[19px] font-normal leading-relaxed text-[#3D3D3D] mb-6 md:mb-8 px-2 md:px-8">
                    {TESTIMONIALS[currentIndex].text}
                  </p>
                </div>

                {/* Divider Line */}
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 48, opacity: 1 }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                  className="h-[1px] bg-gray-300 mb-4 md:mb-5"
                />

                {/* Author Name */}
                <cite className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] md:tracking-[0.25em] text-[#2D2D2D] uppercase not-italic">
                  {TESTIMONIALS[currentIndex].name}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
