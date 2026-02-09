"use client";
import React, { useState } from "react";
import { ProductCard } from "@/features/products/product-card";

const CATEGORIES = [
  {
    id: 1,
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800",
  },
  {
    id: 2,
    name: "Home Decor & Storage",
    image:
      "https://images.unsplash.com/photo-1534349762230-e0caa72a045d?q=80&w=800",
  },
  {
    id: 3,
    name: "Lamps",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800",
  },
  {
    id: 4,
    name: "Dining",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=800",
  },
  {
    id: 5,
    name: "Candles",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800",
  },
  {
    id: 6,
    name: "Planters",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800",
  },
];

export default function ShopPage() {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Mobile-First Container with 18px padding based on your screenshot */}
      <div className="mx-auto max-w-7xl px-4.5 py-8">
        {/* Header Navigation - Hidden on very small screens or tightened */}
        <div className="mb-6 flex justify-center gap-4 border-b border-border pb-4 text-[9px] font-bold tracking-[0.2em] text-muted-foreground uppercase md:gap-12">
          <span>Sustainable</span>
          <span>Timeless</span>
          <span>Handcrafted</span>
        </div>

        <h1 className="mb-8 text-center text-xl font-medium text-foreground">
          Shop By Category
        </h1>

        {/* 2-Column Grid for Mobile, 3-Column for Desktop */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {CATEGORIES.map((item) => (
            <ProductCard
              key={item.id}
              category={item.name}
              imageUrl={item.image}
              isLiked={liked.includes(item.id)}
              onLike={() => toggleLike(item.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
