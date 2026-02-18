/* eslint-disable no-console */
import "dotenv/config";

import { v7 as uuidv7 } from "uuid";

import { ALL_PRODUCTS } from "@/data/products";
import { db } from "@/db";
import { category, media, product, productVariant } from "@/db/schema";

async function main() {
  console.log("🌱 Seeding database with Flickers & Flame products...");

  try {
    // 1️⃣ Upsert Category
    const [candleCategory] = await db
      .insert(category)
      .values({
        id: uuidv7(),
        name: "Candles",
        slug: "candles",
        description: "Hand-poured signature scents for your home.",
        isActive: true,
      })
      .onConflictDoUpdate({
        target: category.slug,
        set: {
          name: "Candles",
          isActive: true,
        },
      })
      .returning();

    // 2️⃣ Loop Products
    for (const item of ALL_PRODUCTS) {
      const [insertedProduct] = await db
        .insert(product)
        .values({
          name: item.name,
          slug: item.slug,
          description: item.description,
          basePrice: String(item.priceData?.price ?? 0),
          salePrice: item.priceData?.discountedPrice
            ? String(item.priceData.discountedPrice)
            : null,
          currency: item.priceData?.currency ?? "INR",
          brand: item.brand ?? "Flickers & Flame",
          ribbon: item.ribbon ?? null,
          isActive: true,
          isFeatured: false,
          categoryId: candleCategory.id,
          additionalInfoSections: item.additionalInfoSections ?? [],
          productOptions: item.productOptions
            ? item.productOptions.map((opt) => ({
                name: opt.name,
                optionType: String(opt.optionType), // Convert enum to string
                choices: opt.choices.map((choice) => ({
                  value: choice.value,
                  description: choice.description,
                  inStock: choice.inStock,
                  visible: choice.visible,
                })),
              }))
            : [],
        })
        .returning();

      const productId = insertedProduct.id;

      // 3️⃣ Insert Media
      if (item.media?.items?.length) {
        await db.insert(media).values(
          item.media.items.map((m, index) => ({
            id: uuidv7(),
            url: m.image?.url ?? "",
            altText: m.image?.altText ?? item.name,
            mediaType: "image" as const,
            refId: productId,
            refType: "product" as const,
            position: index,
          }))
        );
      }

      // 4️⃣ Insert Variants
      if (item.productOptions && item.productOptions.length > 0) {
        // Multiple variants (like SAADA color options)
        const option = item.productOptions[0];

        if (option.choices && option.choices.length > 0) {
          for (const choice of option.choices) {
            await db.insert(productVariant).values({
              id: uuidv7(),
              productId,
              sku: `${item.slug.toUpperCase()}-${choice.description
                .replace(/\s+/g, "-")
                .toUpperCase()}`,
              price: String(
                item.priceData?.discountedPrice ?? item.priceData?.price ?? 0
              ),
              costPrice: "150.00",
              stockQuantity: item.stock?.quantity ?? 10,
              trackInventory: true,
              optionValues: {
                [option.name]: choice.value,
              },
            });
          }
        }
      } else {
        // Single default variant
        await db.insert(productVariant).values({
          id: uuidv7(),
          productId,
          sku: `${item.slug.toUpperCase()}-STD`,
          price: String(
            item.priceData?.discountedPrice ?? item.priceData?.price ?? 0
          ),
          costPrice: "150.00",
          stockQuantity: item.stock?.quantity ?? 10,
          trackInventory: true,
          optionValues: {},
        });
      }
    }

    console.log("✅ Seeding complete! All products inserted.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

main();
