"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

export default function HeroSlider() {
  const images = ["./hero-1.jpg", "./hero-2.jpg"];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col items-center justify-center"
      >
        <motion.p className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-center text-xl font-bold text-transparent md:text-6xl">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="relative mx-auto mt-4 rounded-full border border-emerald-500/20 bg-emerald-300/10 px-4 py-2 text-center text-white backdrop-blur-sm">
          <span>Join now →</span>
          <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
