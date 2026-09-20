"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { ProductIcon } from "./Icons";

export function CartView() {
  const {
    items,
    subtotal,
    updateQuantity,
    removeItem,
    hydrated,
    itemCount,
  } = useCart();

  if (!hydrated) {
    return (
      <div className="card-surface p-10 text-center text-charcoal/50">
        Loading cart…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card-surface space-y-4 p-12 text-center">
        <p className="text-lg text-charcoal/70">Your cart is empty.</p>
        <Link href="/shop" className="btn-gold inline-flex">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.personalisation || ""}`}
            className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm text-gold"
              style={{
                background: `linear-gradient(145deg, #0a0a0a, ${item.accent}66)`,
              }}
            >
              <ProductIcon name="spark" size={28} />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${item.slug}`}
                className="font-serif text-lg text-charcoal hover:text-gold-dark"
              >
                {item.name}
              </Link>
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                {item.material}
              </p>
              {item.personalisation && (
                <p className="mt-1 text-sm text-charcoal/60">
                  <span className="font-medium text-charcoal">Note:</span>{" "}
                  {item.personalisation}
                </p>
              )}
              <p className="mt-1 font-semibold text-gold-dark">
                {formatPrice(item.price)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor={`qty-${item.productId}`}>
                Quantity
              </label>
              <input
                id={`qty-${item.productId}`}
                type="number"
                min={1}
                max={99}
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item.productId,
                    Number(e.target.value) || 1,
                    item.personalisation
                  )
                }
                className="input-field w-16 text-center"
              />
              <button
                type="button"
                onClick={() =>
                  removeItem(item.productId, item.personalisation)
                }
                className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="card-surface h-fit space-y-4 p-6">
        <h2 className="font-serif text-xl">Order summary</h2>
        <div className="flex justify-between text-sm text-charcoal/70">
          <span>
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between border-t border-cream-muted pt-4 text-base font-semibold">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="text-xs text-charcoal/45">
          Secure payment via Stripe Checkout. Shipping options appear at payment.
        </p>
        <Link href="/checkout" className="btn-gold w-full">
          Proceed to checkout
        </Link>
        <Link
          href="/shop"
          className="block text-center text-sm font-medium text-gold hover:underline"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
