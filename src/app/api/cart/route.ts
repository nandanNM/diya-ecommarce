import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { cart, cartItem, product, productVariant } from "@/db/schema";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { auth } from "@/lib/auth";
import type { CartItem as FrontendCartItem } from "@/types/cart";
import type { Product as FrontendProduct } from "@/types/product";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("diya-cart-sessionId")?.value;
    let existingCart;

    if (userId) {
      existingCart = await db.query.cart.findFirst({
        where: eq(cart.userId, userId),
      });
    } else if (sessionId) {
      existingCart = await db.query.cart.findFirst({
        where: eq(cart.sessionId, sessionId),
      });
    }

    if (!existingCart) {
      return NextResponse.json({ cart: null });
    }
    const items = await db
      .select({
        id: cartItem.id,
        productId: cartItem.productId,
        variantId: cartItem.variantId,
        quantity: cartItem.quantity,
        price: cartItem.price,
        snapshot: cartItem.snapshot,
        product: product,
        variant: productVariant,
      })
      .from(cartItem)
      .leftJoin(product, eq(cartItem.productId, product.id))
      .leftJoin(productVariant, eq(cartItem.variantId, productVariant.id))
      .where(eq(cartItem.cartId, existingCart.id));

    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );

    const frontendItems: FrontendCartItem[] = await Promise.all(
      items.map(async (item) => {
        const rawProduct = item.product as typeof product.$inferSelect | null;

        // Try to reuse the same enrichment logic used for product pages
        let enrichedProduct: FrontendProduct | null = null;
        if (rawProduct?.slug) {
          enrichedProduct = await getProductBySlug(rawProduct.slug);
        }

        // Fallback: minimal product shape that still satisfies the storefront type
        const safeProduct: FrontendProduct =
          enrichedProduct ??
          ({
            _id: item.productId,
            name: rawProduct?.name ?? "",
            slug: rawProduct?.slug ?? "",
            visible: rawProduct?.isActive ?? true,
            description: rawProduct?.description ?? undefined,
            priceData: {
              currency: rawProduct?.currency ?? "INR",
              price: Number(item.price),
              discountedPrice: Number(item.price),
            },
          } as FrontendProduct);

        return {
          cartItemId: item.id,
          product: safeProduct,
          variantId: item.variantId ?? undefined,
          quantity: item.quantity,
          selectedOptions:
            (
              item.variant as
                | { optionValues?: Record<string, string> }
                | null
                | undefined
            )?.optionValues ?? {},
        };
      })
    );

    return NextResponse.json({
      cart: {
        id: existingCart.id,
        userId: existingCart.userId,
        sessionId: existingCart.sessionId,
        items: frontendItems,
        subtotal,
        total: subtotal,
        createdAt: existingCart.createdAt,
        updatedAt: existingCart.updatedAt,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
