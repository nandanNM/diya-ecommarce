"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "SAYONI NARJINARI",
    image: "https://ik.imagekit.io/codernandan/testimonial/sayoni.jpeg",
    text: "Pahli baarish ki khushboo ko is candle ne bilkul zinda kar diya hai. Jalate hi ek fresh, sukoon bhara aur cozy feel aata hai jo dil ko instantly calm kar deta hai. Truly a beautiful and soothing fragrance, perfect for relaxing moments.",
    rating: 5,
  },
  {
    id: 2,
    name: "SIDDARTH KUMAR",
    image: "https://ik.imagekit.io/codernandan/testimonial/sit.jpeg",
    text: "Always wanted a go-to product that could freshen my room instantly. I’m glad I stumbled upon these products...not only do they have beautiful aromas based on different flowers (great idea tbh), which I loved, but they also enhance the overall vibe cuz they’re cute candles, not artificial perfumes. Worth the money, I’d say. Go for it. ✌️",
    rating: 5,
  },
  {
    id: 3,
    name: "SHELLY RICHA LAKDA",
    image: "https://ik.imagekit.io/codernandan/testimonial/shelly.jpeg",
    text: "I was skeptical about 'Pahli Baarish'—like, how can you bottle the smell of mud? But WOW. It literally smells like the first rain in my village. I’ve bought Bath & Body Works before, but this feels more real? Maybe because it’s handmade.",
    rating: 5,
  },
  {
    id: 4,
    name: "RONIT PAL",
    image: "https://ik.imagekit.io/codernandan/testimonial/ronit.jpeg",
    text: "Honestly, I bought the Lavender one just to make my hostel room smell less... damp. But now it’s my permanent study buddy. I light it up during all-nighters, and it actually keeps me calm. The crackling sound is so satisfying when everything else is silent. 10/10 recommending to my wingmates.",
    rating: 4,
  },
  {
    id: 5,
    name: "INDRAJIT KUMAR SAU",
    image: "https://ik.imagekit.io/codernandan/testimonial/indra.jpeg",
    text: "The wooden wick is a game changer! It sounds like a tiny fireplace. I put on some lo-fi beats, light the Waadi candle, and my room feels like a hill station in Manali. If you want Sukoon, just buy it.",
    rating: 3,
  },
  {
    id: 6,
    name: "PIYUSH KUMAR",
    image: "https://ik.imagekit.io/codernandan/testimonial/piyush.jpeg",
    text: "I don't know what you guys put in 'Waadi' but it smells exactly like a pine forest. Instant stress buster after a long day of coding. Love that it's made by students, keep it up guys!.",
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
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const handleNext = () => {
    setDirection(1); // Moving right to left
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handleImageClick = (index: number) => {
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
      const index =
        (currentIndex + i + TESTIMONIALS.length) % TESTIMONIALS.length;
      visible.push({ index, position: i });
    }
    return visible;
  };

  // Calculate image properties based on position
  const getImageProps = (position: number) => {
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
    <section className="w-full overflow-hidden py-4 md:py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-[28px] font-light tracking-wide text-[#2D2D2D] md:mb-12 md:text-[36px]">
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
            className="absolute top-[70px] left-1 z-[60] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95 md:top-[100px] md:left-4 md:h-11 md:w-11 lg:left-8"
            style={{ pointerEvents: isHovered ? "auto" : "none" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft
              className="h-4 w-4 text-gray-700 md:h-5 md:w-5"
              strokeWidth={2.5}
            />
          </motion.button>

          <motion.button
            onClick={handleNext}
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-[70px] right-1 z-[60] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95 md:top-[100px] md:right-4 md:h-11 md:w-11 lg:right-8"
            style={{ pointerEvents: isHovered ? "auto" : "none" }}
            aria-label="Next testimonial"
          >
            <ChevronRight
              className="h-4 w-4 text-gray-700 md:h-5 md:w-5"
              strokeWidth={2.5}
            />
          </motion.button>

          {/* Carousel Images */}
          <div className="relative mb-10 flex h-[120px] items-center justify-center overflow-visible md:mb-16 md:h-[180px]">
            <div className="relative flex items-center justify-center gap-2 md:gap-4">
              <AnimatePresence initial={false} custom={direction}>
                {getVisibleItems().map(({ index, position }) => {
                  const { scale, opacity, zIndex, blur } =
                    getImageProps(position);
                  const isActive = position === 0;
                  const testimonial = TESTIMONIALS[index];

                  // Calculate slide distance based on position with proper spacing
                  const getSlideX = (pos: number) => {
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
                        filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
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
                        "absolute cursor-pointer overflow-hidden focus:outline-none",
                        "h-[90px] w-[90px] md:h-[120px] md:w-[120px]",
                        "rounded-[32px] md:rounded-[44px]",
                        isActive &&
                          "shadow-xl ring-2 ring-blue-100/70 ring-offset-2 md:shadow-2xl md:ring-4 md:ring-offset-4"
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
          <div className="mt-6 flex flex-col items-center px-4 md:mt-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction > 0 ? 100 : -100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? -100 : 100,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex w-full flex-col items-center"
              >
                {/* Rating Stars */}
                <div className="mb-5 flex gap-1 md:mb-7">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.05,
                        duration: 0.3,
                        ease: "backOut",
                      }}
                    >
                      <Star
                        className={cn(
                          "h-4 w-4 md:h-5 md:w-5",
                          i < TESTIMONIALS[currentIndex].rating
                            ? "fill-[#FFB800] text-[#FFB800]"
                            : "fill-gray-300 text-gray-300"
                        )}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <div className="flex min-h-[100px] items-center justify-center overflow-hidden md:min-h-[130px]">
                  <p className="mb-6 max-w-2xl px-2 text-center text-[15px] leading-relaxed font-normal text-[#3D3D3D] md:mb-8 md:px-8 md:text-[17px] lg:text-[19px]">
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
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="mb-4 h-[1px] bg-gray-300 md:mb-5"
                />

                {/* Author Name */}
                <cite className="text-[10px] font-medium tracking-[0.2em] text-[#2D2D2D] uppercase not-italic md:text-[11px] md:tracking-[0.25em]">
                  -- {TESTIMONIALS[currentIndex].name}
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
