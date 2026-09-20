import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice, getCategory } from "@/data/products";
import { ProductIcon } from "./Icons";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group card-surface flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-gold"
    >
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(145deg, #0a0a0a 0%, ${product.accent}33 55%, #1a1a1a 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.35), transparent 50%)",
          }}
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-charcoal/60 text-gold shadow-gold backdrop-blur-sm transition group-hover:scale-105">
          <ProductIcon name={product.icon} size={40} />
        </div>
        {product.personalisable && (
          <span className="absolute left-3 top-3 rounded-sm bg-gold/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-charcoal">
            Personalise
          </span>
        )}
        <span className="absolute bottom-3 right-3 rounded-sm bg-cream/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-charcoal">
          {product.material}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          {category?.name}
        </p>
        <h3 className="font-serif text-lg leading-snug text-charcoal group-hover:text-gold-dark">
          {product.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-charcoal/65">
          {product.shortDescription}
        </p>
        <p className="pt-1 text-base font-semibold text-charcoal">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
