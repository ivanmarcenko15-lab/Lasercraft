"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export function CheckoutForm({ stripeConfigured }: { stripeConfigured: boolean }) {
  const { items, subtotal, clearCart, hydrated, itemCount } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!hydrated) {
    return (
      <div className="card-surface p-10 text-center text-charcoal/50">
        Loading…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="card-surface space-y-4 p-12 text-center">
        <p className="text-charcoal/70">Your cart is empty.</p>
        <Link href="/shop" className="btn-gold inline-flex">
          Browse products
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!stripeConfigured) {
      setError("Stripe not configured");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            personalisation: i.personalisation,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Checkout failed. Please try again.");
        setLoading(false);
        return;
      }
      if (data.url) {
        clearCart();
        window.location.href = data.url;
        return;
      }
      setError("No checkout URL returned.");
      setLoading(false);
    } catch {
      setError("Could not reach checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {!stripeConfigured && (
          <div className="rounded-sm border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <strong>Stripe not configured.</strong> Add{" "}
            <code className="text-xs">STRIPE_SECRET_KEY</code> and{" "}
            <code className="text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code>{" "}
            to your <code className="text-xs">.env</code> file to enable test
            payments. See <code className="text-xs">.env.example</code>.
          </div>
        )}

        <fieldset className="card-surface space-y-4 p-6">
          <legend className="font-serif text-xl text-charcoal">
            Contact details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                Full name
              </label>
              <input
                required
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Taylor"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
                Email
              </label>
              <input
                required
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <p className="text-xs text-charcoal/50">
            You will complete payment securely on Stripe Checkout. Delivery
            details are collected there.
          </p>
        </fieldset>

        {error && (
          <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}
      </div>

      <aside className="card-surface h-fit space-y-4 p-6">
        <h2 className="font-serif text-xl">Summary</h2>
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li
              key={`${item.productId}-${item.personalisation || ""}`}
              className="flex justify-between gap-3"
            >
              <span className="text-charcoal/70">
                {item.name} × {item.quantity}
              </span>
              <span className="shrink-0 font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="space-y-2 border-t border-cream-muted pt-4 text-sm">
          <div className="flex justify-between text-charcoal/70">
            <span>Subtotal ({itemCount})</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
        <button
          type="submit"
          className="btn-gold w-full"
          disabled={loading || !stripeConfigured}
        >
          {loading
            ? "Redirecting…"
            : stripeConfigured
              ? "Pay with Stripe"
              : "Stripe not configured"}
        </button>
        <Link href="/cart" className="block text-center text-sm text-gold hover:underline">
          Return to cart
        </Link>
      </aside>
    </form>
  );
}
