"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  personalisation?: string;
  accent: string;
  material: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (
    product: Product,
    quantity?: number,
    personalisation?: string
  ) => void;
  removeItem: (productId: string, personalisation?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    personalisation?: string
  ) => void;
  clearCart: () => void;
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "lasecraft-cart";

function itemKey(productId: string, personalisation?: string) {
  return `${productId}::${personalisation?.trim() || ""}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, quantity = 1, personalisation?: string) => {
      const note = personalisation?.trim() || undefined;
      setItems((prev) => {
        const key = itemKey(product.id, note);
        const existing = prev.find(
          (i) => itemKey(i.productId, i.personalisation) === key
        );
        if (existing) {
          return prev.map((i) =>
            itemKey(i.productId, i.personalisation) === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            quantity,
            personalisation: note,
            accent: product.accent,
            material: product.material,
          },
        ];
      });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, personalisation?: string) => {
      const key = itemKey(productId, personalisation);
      setItems((prev) =>
        prev.filter((i) => itemKey(i.productId, i.personalisation) !== key)
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, personalisation?: string) => {
      const key = itemKey(productId, personalisation);
      if (quantity <= 0) {
        removeItem(productId, personalisation);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i.productId, i.personalisation) === key
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      hydrated,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      hydrated,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
