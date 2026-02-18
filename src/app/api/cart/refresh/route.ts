import { inArray } from "drizzle-orm";

import db from "@/db";
import { productVariant } from "@/db/schema";
import { cartRefreshSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const body = await req.json();
  const result = cartRefreshSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: "Invalid request data", details: result.error.format() },
      { status: 400 }
    );
  }

  const { items } = result.data;

  const variantIds = items
    .map((i) => i.variantId)
    .filter((id): id is string => !!id);

  if (variantIds.length === 0) {
    return Response.json({ updatedItems: [] });
  }

  // Fetch latest price and stock
  const latestVariants = await db
    .select({
      id: productVariant.id,
      price: productVariant.price,
      stockQuantity: productVariant.stockQuantity,
    })
    .from(productVariant)
    .where(inArray(productVariant.id, variantIds));

  const updatedItems = items.map((localItem) => {
    const dbVariant = latestVariants.find((v) => v.id === localItem.variantId);

    if (!dbVariant) {
      return { ...localItem, isAvailable: false };
    }

    return {
      ...localItem,
      isAvailable: dbVariant.stockQuantity > 0,
      currentPrice: dbVariant.price,
      maxAvailable: dbVariant.stockQuantity,
    };
  });

  return Response.json({ updatedItems });
}
