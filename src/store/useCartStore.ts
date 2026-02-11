import { Product } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateId = () => Math.random().toString(36).substring(2, 9);


export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    quantity?: number,
    selectedOptions?: Record<string, string>
  ) => void;
  removeItem: (cartItemId: string) => void;
  deleteCartProduct: (cartItemId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, selectedOptions = {}) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product._id === product._id &&
              JSON.stringify(item.selectedOptions) ===
                JSON.stringify(selectedOptions)
          );

          if (existingItemIndex > -1) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          } else {
            return {
              items: [
                ...state.items,
                {
                  product,
                  quantity,
                  selectedOptions,
                  cartItemId: generateId(),
                },
              ],
            };
          }
        }),
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.cartItemId === cartItemId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total +
            (item.product.priceData?.discountedPrice ??
              item.product.priceData?.price ??
              0) *
              item.quantity,
          0
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price =
            item.product.priceData?.discountedPrice ??
            item.product.priceData?.price ??
            0;
          return total + price * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    {
      name: "cart-store",
      version: 1,
      migrate: (persistedState: any, version) => {
        if (version === 0 || version === undefined) {
          persistedState.items = persistedState.items.map((item: CartItem) => ({
            ...item,
            cartItemId: item.cartItemId || generateId(),
            selectedOptions: item.selectedOptions || {},
          }));
        }
        return persistedState as CartState;
      },
    }
  )
);

export default useCartStore;
