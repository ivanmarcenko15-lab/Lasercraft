import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { ProductIcon } from "@/components/Icons";
import { categories } from "@/data/products";
import { getFeaturedProducts } from "@/lib/catalogue";

const services = [
  { title: "Design", desc: "From sketch to production-ready artwork." },
  { title: "Cut", desc: "Clean, precise laser cutting in fine materials." },
  { title: "Engrave", desc: "Deep, lasting detail on wood, acrylic & leather." },
  { title: "Personalise", desc: "Names, dates, logos — made uniquely yours." },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="pointer-events-none absolute inset-0 bg-hero-pattern" />
        <div
          className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "#c9a227" }}
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="space-y-6">
            <p className="section-eyebrow text-gold">Ideas. Made Personal.</p>
            <h1 className="font-serif text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
              Your Design.
              <br />
              <span className="text-gold">Our Precision.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Personalised products for every occasion — laser cut and engraved
              in wood, acrylic and leather. Premium artisan craftsmanship from
              Gloucestershire, UK.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/shop" className="btn-gold">
                Shop the collection
              </Link>
              <Link
                href="/custom"
                className="btn-outline border-gold/60 text-gold hover:bg-gold hover:text-charcoal"
              >
                Custom enquiry
              </Link>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold/70">
              Natural Ideas Last Longer
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-full bg-gold/10 blur-2xl" />
            <Image
              src="/assets/logo.png"
              alt="LaseCraft circular wooden logo"
              width={480}
              height={480}
              className="relative mx-auto w-full drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-charcoal-soft">
        <div className="mx-auto grid max-w-7xl gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-charcoal-soft px-6 py-8 text-center"
            >
              <h3 className="font-serif text-xl text-gold">{s.title}</h3>
              <p className="mt-2 text-sm text-cream/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <TrustBar />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-eyebrow mb-2">Collections</p>
            <h2 className="section-title">Shop by category</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-gold hover:underline">
            Browse all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-sm border border-cream-muted bg-charcoal p-6 text-cream transition hover:shadow-gold"
            >
              <div
                className="absolute inset-0 opacity-40 transition group-hover:opacity-60"
                style={{
                  background: `linear-gradient(135deg, #0a0a0a, ${cat.accent}55)`,
                }}
              />
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  Explore
                </p>
                <h3 className="mt-2 font-serif text-2xl">{cat.name}</h3>
                <p className="mt-2 text-sm text-cream/65">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-cream-soft py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="section-eyebrow mb-2">Favourites</p>
            <h2 className="section-title">Featured pieces</h2>
            <p className="mx-auto mt-3 max-w-2xl text-charcoal/65">
              A selection of our most-loved personalised products — ready to
              customise for gifts, homes and businesses.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="section-eyebrow mb-2">Materials</p>
            <h2 className="section-title">Wood · Acrylic · Leather</h2>
            <p className="mt-4 text-charcoal/70 leading-relaxed">
              We work with carefully chosen materials that hold detail and age
              beautifully. Whether you need a weather-ready acrylic plaque, a
              warm oak keepsake or a soft leather accessory, every piece is cut
              and engraved with artisan care.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-charcoal/80">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Sustainable timber options including birch & oak plywood
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Clear, frosted and coloured acrylic for signage
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Genuine leather for wallets, tags and accessories
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["Wood", "Acrylic", "Leather"].map((m, i) => (
              <div
                key={m}
                className="flex aspect-[3/4] flex-col items-center justify-end rounded-sm border border-cream-muted p-4 text-center"
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(180deg,#3d2b1f,#8b6914)"
                      : i === 1
                        ? "linear-gradient(180deg,#1a2a32,#4a90a4)"
                        : "linear-gradient(180deg,#2a1810,#8b5a2b)",
                }}
              >
                <ProductIcon
                  name={i === 2 ? "tag" : i === 1 ? "sign" : "tree"}
                  size={28}
                  className="mb-3 text-cream/90"
                />
                <p className="font-serif text-lg text-cream">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="bg-charcoal text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="section-eyebrow text-gold">Bespoke</p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Turn your ideas into something special
          </h2>
          <p className="max-w-2xl text-cream/70">
            Have a logo, photo or sketch? Tell us what you need and we will
            design, cut and engrave a piece that is uniquely yours — for gifts,
            events or wholesale.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/custom" className="btn-gold">
              Start a custom order
            </Link>
            <Link
              href="/about"
              className="btn-outline border-gold/50 text-gold hover:bg-gold hover:text-charcoal"
            >
              About LaseCraft
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
