import { create } from "zustand";
import { persist } from "zustand/middleware";
import { productById } from "@/data/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (productId, quantity = 1) =>
        set((s) => {
          const existing = s.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            };
          }
          return { items: [...s.items, { productId, quantity }] };
        }),
      removeFromCart: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((s) => ({
          items:
            quantity <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "cart-store" },
  ),
);

export const selectCartCount = (s: { items: CartItem[] }) =>
  s.items.reduce((n, i) => n + i.quantity, 0);

export const selectCartSubtotal = (s: { items: CartItem[] }) =>
  s.items.reduce((sum, i) => {
    const p = productById(i.productId);
    return sum + (p ? p.price * i.quantity : 0);
  }, 0);
