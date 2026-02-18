import type { QueryKey } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { findVariantId } from "@/lib/find-variant";
import kyInstance from "@/lib/ky";
import type { UpdateCartItemQuantityValues } from "@/lib/validations";
import type { AddToCartValues, Cart } from "@/types/cart";
const queryKey: QueryKey = ["cart"];

export function useCart(initialData: Cart | null) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await kyInstance
        .get("/api/cart")
        .json<{ cart: Cart | null }>();
      return response.cart;
    },
    initialData,
  });
}
export function useAddItemToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      product,
      selectedOptions,
      quantity,
    }: AddToCartValues) => {
      const variantId = findVariantId(product, selectedOptions);

      return kyInstance
        .post("/api/cart/add", {
          json: {
            productId: product._id,
            variantId,
            quantity,
          },
        })
        .json<{ message: string }>();
    },

    onSuccess() {
      toast("Item added to cart");
      queryClient.invalidateQueries({ queryKey });
    },

    onError() {
      toast("Failed to add item to cart. Please try again.");
    },
  });
}
export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: UpdateCartItemQuantityValues) => {
      return kyInstance
        .patch("/api/cart/update", { json: values })
        .json<{ success: boolean }>();
    },

    onMutate: async ({ itemId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<Cart | null>(queryKey);

      if (previousCart) {
        // Optimistically update quantity
        const updatedItems = previousCart.items.map((item) =>
          item.cartItemId === itemId ? { ...item, quantity: newQuantity } : item
        );

        // Recalculate subtotal using cached product price data
        const subtotal = updatedItems.reduce((acc, item) => {
          const price =
            item.product.priceData?.discountedPrice ??
            item.product.priceData?.price ??
            0;
          return acc + price * item.quantity;
        }, 0);

        queryClient.setQueryData<Cart | null>(queryKey, {
          ...previousCart,
          items: updatedItems,
          subtotal,
          total: subtotal,
        });
      }

      return { previousCart };
    },

    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKey, context.previousCart);
      }
      toast.error("Failed to update quantity");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      return kyInstance
        .delete(`/api/cart/remove/${itemId}`)
        .json<{ message: string }>();
    },

    onMutate: async (itemId) => {
      await queryClient.cancelQueries({ queryKey });

      const previousCart = queryClient.getQueryData<Cart | null>(queryKey);

      if (previousCart) {
        // Optimistically remove item
        const updatedItems = previousCart.items.filter(
          (item) => item.cartItemId !== itemId
        );

        // Recalculate subtotal using cached product price data
        const subtotal = updatedItems.reduce((acc, item) => {
          const price =
            item.product.priceData?.discountedPrice ??
            item.product.priceData?.price ??
            0;
          return acc + price * item.quantity;
        }, 0);

        queryClient.setQueryData<Cart | null>(queryKey, {
          ...previousCart,
          items: updatedItems,
          subtotal,
          total: subtotal,
        });
      }

      return { previousCart };
    },

    onError: (_, __, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(queryKey, context.previousCart);
      }
      toast.error("Failed to remove item");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return kyInstance.delete("/api/cart/clear").json();
    },

    onSuccess: () => {
      queryClient.setQueryData(queryKey, null);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
