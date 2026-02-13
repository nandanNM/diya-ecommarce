/* eslint-disable no-console */
import "dotenv/config";

import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import { category, media, product, productVariant } from "@/db/schema";

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create the Main Category
  const [candleCategory] = await db
    .insert(category)
    .values({
      id: uuidv7(),
      name: "Candles",
      slug: "candles",
      description: "Hand-poured signature scents for your home.",
      isActive: true,
    })
    .returning();

  // 2. Data for your 6 Products
  const candleData = [
    {
      name: "Midnight Jasmine",
      price: "24.00",
      slug: "midnight-jasmine",
      ribbon: "New",
    },
    {
      name: "Ocean Breeze",
      price: "22.00",
      slug: "ocean-breeze",
      ribbon: null,
    },
    {
      name: "Vanilla Bean",
      price: "20.00",
      slug: "vanilla-bean",
      ribbon: "Best Seller",
    },
    {
      name: "Sandals & Spice",
      price: "25.00",
      slug: "sandals-spice",
      ribbon: null,
    },
    {
      name: "Spiced Apple",
      price: "22.00",
      slug: "spiced-apple",
      ribbon: null,
    },
    {
      name: "Lavender Fields",
      price: "24.00",
      slug: "lavender-fields",
      ribbon: "Featured",
    },
  ];

  for (const item of candleData) {
    const productId = uuidv7();

    // Insert Product
    await db.insert(product).values({
      id: productId,
      name: item.name,
      slug: item.slug,
      basePrice: item.price,
      categoryId: candleCategory.id,
      isActive: true,
      isFeatured: item.ribbon === "Featured",
      ribbon: item.ribbon,
    });

    // Insert Media (Unified Media Table)
    await db.insert(media).values({
      url: `https://images.unsplash.com/photo-example-${item.slug}`, // Placeholder
      mediaType: "image",
      refId: productId,
      refType: "product",
      position: 0,
    });

    // Insert a Default Variant (for Stock)
    await db.insert(productVariant).values({
      productId: productId,
      sku: `${item.slug.toUpperCase()}-001`,
      price: item.price,
      stockQuantity: 50,
      optionValues: { size: "Standard" },
    });
  }

  console.log("✅ Seeding complete! 6 products added.");
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
