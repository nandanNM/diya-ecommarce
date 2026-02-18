/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";

import { ProductCard } from "@/features/products/product-card";
import type { HomeProduct } from "@/types/product";

interface ShopPageProps {
  products: HomeProduct[];
}
// const CATEGORIES = [
//   {
//     id: 1,
//     name: "Mogra",
//     slug: "mogra",
//     image: "https://ik.imagekit.io/codernandan/product/mogra/mogra-s1.jpeg",
//   },
//   {
//     id: 2,
//     name: "Waadi",
//     slug: "waadi",
//     image: "https://ik.imagekit.io/codernandan/product/waadi/waadi-s1.jpeg",
//   },
//   {
//     id: 3,
//     name: "Pahli Baarish",
//     slug: "pahli-baarish",
//     image:
//       "https://ik.imagekit.io/codernandan/product/pahli-baarish/pahli-baarish-s1.jpeg",
//   },
//   {
//     id: 4,
//     name: "Saada",
//     slug: "saada",
//     image: "https://ik.imagekit.io/codernandan/product/saada/saada-s1.jpeg",
//   },
//   {
//     id: 5,
//     name: "Parijaat",
//     slug: "parijaat",
//     image:
//       "https://ik.imagekit.io/codernandan/product/parijaat/parijaat-s1.jpeg",
//   },
//   {
//     id: 6,
//     name: "Lavender",
//     slug: "lavender",
//     image:
//       "https://ik.imagekit.io/codernandan/product/lavender/lavender-s1.jpeg",
//   },
// ];

export default function ShopPage({ products }: ShopPageProps) {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="collections" className="w-full overflow-hidden py-4 md:py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-[28px] font-light tracking-wide text-[#2D2D2D] md:mb-12 md:text-[36px]">
          Shop By Category
        </h2>
        <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              category={item.name.split("(")[0]}
              imageUrl={item.imageUrl}
              href={`/products/${item.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
