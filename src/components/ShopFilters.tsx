"use client";

import Link from "next/link";
import { categories } from "@/data/products";

export function ShopFilters({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
          !active
            ? "bg-charcoal text-cream"
            : "border border-cream-muted bg-white text-charcoal/70 hover:border-gold hover:text-gold-dark"
        }`}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/shop?category=${c.slug}`}
          className={`rounded-sm px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
            active === c.slug
              ? "bg-charcoal text-cream"
              : "border border-cream-muted bg-white text-charcoal/70 hover:border-gold hover:text-gold-dark"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
