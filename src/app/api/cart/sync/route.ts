import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { v7 as uuidv7 } from "uuid";

import { db } from "@/db";
import { cart, cartItem } from "@/db/schema";
import { auth } from "@/lib/auth";
import { cartSyncSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = cartSyncSchema.safeParse(body);
    if (!result.success) {
      return Response.json(
        { error: "Invalid request data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { localItems } = result.data;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return Response.json(
        { error: "Unauthorized", details: "You must be logged in." },
        { status: 401 }
      );
    }

    // Find or create cart
    let [userCart] = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, session.user.id))
      .limit(1);

    if (!userCart) {
      [userCart] = await db
        .insert(cart)
        .values({
          id: uuidv7(),
          userId: session.user.id,
        })
        .returning();
    }

    //  Sync logic
    // Create map of existing items for quick lookup
    const variantIds = localItems
      .map((item) => item.variantId)
      .filter((id): id is string => !!id);

    const existingItems =
      variantIds.length > 0
        ? await db
            .select()
            .from(cartItem)
            .where(
              and(
                eq(cartItem.cartId, userCart.id),
                inArray(cartItem.variantId, variantIds)
              )
            )
        : [];
    const existingMap = new Map(
      existingItems.map((item) => [item.variantId, item])
    );

    // Prepare bulk updates & inserts
    const updates = [];
    const inserts = [];

    for (const item of localItems) {
      const existing = existingMap.get(item.variantId || null);

      if (existing) {
        updates.push(
          db
            .update(cartItem)
            .set({
              quantity: existing.quantity + item.quantity,
            })
            .where(eq(cartItem.id, existing.id))
        );
      } else {
        inserts.push({
          id: uuidv7(),
          cartId: userCart.id,
          productId: item.product._id,
          variantId: item.variantId ?? null,
          quantity: item.quantity,
          price: item.product.priceData.discountedPrice.toString(),
          snapshot: item.product,
        });
      }
    }

    // Execute updates
    await Promise.all(updates);

    if (inserts.length > 0) {
      await db.insert(cartItem).values(inserts);
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Sync failed" }, { status: 500 });
  }
}
