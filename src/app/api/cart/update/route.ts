import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { cartItem } from "@/db/schema";
import { updateCartItemSchema } from "@/lib/validations";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const result = updateCartItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    const { itemId, newQuantity } = result.data;

    await db
      .update(cartItem)
      .set({ quantity: newQuantity })
      .where(eq(cartItem.id, itemId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to update item" },
      { status: 500 }
    );
  }
}
