import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your LaseCraft shopping cart.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="section-eyebrow mb-2">Basket</p>
      <h1 className="section-title mb-8">Your cart</h1>
      <CartView />
    </div>
  );
}
