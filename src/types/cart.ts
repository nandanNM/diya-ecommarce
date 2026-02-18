import type { Product } from "./product";

export interface CartItem {
  cartItemId: string;
  product: Product;
  variantId?: string;
  quantity: number;
  selectedOptions: Record<string, string>;
}

// Cart shape shared between backend API responses and frontend
export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string | null;
  items: CartItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

// Values used on the frontend when initiating an "add to cart"
export interface AddToCartValues {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}
