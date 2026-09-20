import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/AddToCartForm";
import { ProductCard } from "@/components/ProductCard";
import { ProductIcon } from "@/components/Icons";
import { formatPrice, getCategory } from "@/data/products";
import { getProductBySlug, getProductsByCategory } from "@/lib/catalogue";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-8 text-xs uppercase tracking-wider text-charcoal/50">
        <Link href="/shop" className="hover:text-gold">
          Shop
        </Link>
        <span className="mx-2">/</span>
        {category && (
          <>
            <Link
              href={`/shop?category=${category.slug}`}
              className="hover:text-gold"
            >
              {category.name}
            </Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-charcoal/80">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-cream-muted"
          style={{
            background: `linear-gradient(145deg, #0a0a0a 0%, ${product.accent}40 50%, #1a1a1a 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 40% 30%, rgba(212,175,55,0.4), transparent 55%)",
            }}
          />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-gold/50 bg-charcoal/50 text-gold shadow-gold backdrop-blur">
            <ProductIcon name={product.icon} size={72} />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] uppercase tracking-wider text-cream/80">
            <span className="rounded-sm bg-charcoal/70 px-2 py-1">
              {product.material}
            </span>
            {product.personalisable && (
              <span className="rounded-sm bg-gold px-2 py-1 font-semibold text-charcoal">
                Personalisable
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="section-eyebrow mb-2">{category?.name}</p>
          <h1 className="font-serif text-3xl text-charcoal md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gold-dark">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/70">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 border-y border-cream-muted py-5 text-sm text-charcoal/75">
            <li>
              <strong className="text-charcoal">Material:</strong>{" "}
              {product.material}
            </li>
            <li>
              <strong className="text-charcoal">Services:</strong> Design · Cut ·
              Engrave · Personalise
            </li>
            <li>
              <strong className="text-charcoal">Made in:</strong> Gloucestershire,
              UK
            </li>
          </ul>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-8">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
