"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { IconCheck } from "./Icons";

export function AddToCartForm({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    addItem(product, qty, note || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <form onSubmit={handleAdd} className="space-y-5">
      {product.personalisable && (
        <div>
          <label
            htmlFor="personalisation"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/70"
          >
            Personalisation notes
          </label>
          <textarea
            id="personalisation"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. House number 28, Oakwood Road — or names, dates, logo notes…"
            className="input-field resize-y"
          />
          <p className="mt-1.5 text-xs text-charcoal/50">
            Tell us exactly what to engrave or cut. We will confirm artwork
            before production.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="qty"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/70"
          >
            Quantity
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="input-field w-24"
          />
        </div>
        <button type="submit" className="btn-gold min-w-[180px]">
          {added ? (
            <>
              <IconCheck size={18} /> Added to cart
            </>
          ) : (
            "Add to cart"
          )}
        </button>
      </div>
    </form>
  );
}
