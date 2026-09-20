import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilters } from "@/components/ShopFilters";
import { categories, getCategory } from "@/data/products";
import {
  getActiveProducts,
  getProductsByCategory,
} from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse personalised laser-cut and engraved products from LaseCraft.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categorySlug = searchParams.category;
  const activeCategory = categorySlug ? getCategory(categorySlug) : undefined;
  const list = activeCategory
    ? await getProductsByCategory(activeCategory.slug)
    : await getActiveProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="section-eyebrow mb-2">Shop</p>
        <h1 className="section-title">
          {activeCategory ? activeCategory.name : "All products"}
        </h1>
        <p className="mt-3 max-w-2xl text-charcoal/65">
          {activeCategory
            ? activeCategory.description
            : "Personalised products for every occasion — filter by category to find the perfect piece."}
        </p>
      </div>

      <div className="mb-8">
        <ShopFilters active={activeCategory?.slug} />
      </div>

      <p className="mb-6 text-sm text-charcoal/50">
        Showing {list.length} product{list.length === 1 ? "" : "s"}
        {activeCategory ? ` in ${activeCategory.name}` : ""} · Prices in GBP
      </p>

      {list.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <p className="text-charcoal/60">No products in this category yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-14 rounded-sm border border-gold/30 bg-charcoal p-8 text-cream">
        <h2 className="font-serif text-2xl text-gold">Looking for wholesale?</h2>
        <p className="mt-2 max-w-2xl text-sm text-cream/70">
          We welcome trade and bulk orders across {categories.length} product
          lines. Share your brief on our custom enquiry form for volume pricing.
        </p>
      </div>
    </div>
  );
}
