import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { cartItem } from "@/db/schema";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(cartItem).where(eq(cartItem.id, id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Failed to remove item" },
      { status: 500 }
    );
  }
}
