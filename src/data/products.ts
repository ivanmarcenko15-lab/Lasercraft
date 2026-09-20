/** Minimal product row from Prisma or the seed catalogue. */
export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePence: number;
  category: string;
  material: string;
  imageUrl?: string | null;
  active: boolean;
};

export type CategorySlug =
  | "address-plaques"
  | "key-holders"
  | "personalised-gifts"
  | "signs-logo-plaques"
  | "home-decor"
  | "wedding-event"
  | "personalised-accessories"
  | "business-wholesale"
  | "custom-designs";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  accent: string;
}

/** Display product used by shop UI (mapped from Prisma Product). */
export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  pricePence: number;
  category: CategorySlug;
  material: "Wood" | "Acrylic" | "Leather" | "Slate" | "Mixed" | string;
  personalisable: boolean;
  featured?: boolean;
  accent: string;
  icon: string;
  imageUrl?: string | null;
  active: boolean;
}

export const categories: Category[] = [
  {
    slug: "address-plaques",
    name: "Address Plaques",
    description: "Elegant house numbers and street-name plaques for every façade.",
    accent: "#c9a227",
  },
  {
    slug: "key-holders",
    name: "Key Holders",
    description: "Wall-mounted holders that welcome you home in style.",
    accent: "#a68520",
  },
  {
    slug: "personalised-gifts",
    name: "Personalised Gifts",
    description: "Thoughtful engraved gifts for birthdays, anniversaries and more.",
    accent: "#d4af37",
  },
  {
    slug: "signs-logo-plaques",
    name: "Signs & Logo Plaques",
    description: "Business signs and branded plaques cut with precision.",
    accent: "#b8962a",
  },
  {
    slug: "home-decor",
    name: "Home Decor",
    description: "Artisan wall art and décor pieces for modern homes.",
    accent: "#c9a227",
  },
  {
    slug: "wedding-event",
    name: "Wedding & Event Items",
    description: "Bespoke signage and keepsakes for your special day.",
    accent: "#d4af37",
  },
  {
    slug: "personalised-accessories",
    name: "Personalised Accessories",
    description: "Wallets, tags and everyday items made personal.",
    accent: "#a68520",
  },
  {
    slug: "business-wholesale",
    name: "Business & Wholesale",
    description: "Branded merchandise and bulk orders for trade clients.",
    accent: "#b8962a",
  },
  {
    slug: "custom-designs",
    name: "Custom Designs",
    description: "Bring any idea — portrait, logo or pattern — to life.",
    accent: "#c9a227",
  },
];

const FEATURED_SLUGS = new Set([
  "oakwood-road-address-plaque",
  "mountain-key-holder",
  "adventure-awaits-tumbler",
  "acrylic-business-sign",
  "tree-of-life-wall-art",
  "mr-mrs-wedding-sign",
  "dad-leather-wallet",
  "pet-portrait-slate",
]);

const NON_PERSONALISABLE = new Set([
  "tree-of-life-wall-art",
  "geometric-wall-panel",
]);

const ICON_BY_CATEGORY: Record<string, string> = {
  "address-plaques": "home",
  "key-holders": "key",
  "personalised-gifts": "gift",
  "signs-logo-plaques": "sign",
  "home-decor": "tree",
  "wedding-event": "heart",
  "personalised-accessories": "tag",
  "business-wholesale": "box",
  "custom-designs": "paw",
};

const ACCENT_BY_MATERIAL: Record<string, string> = {
  Acrylic: "#c9a227",
  Slate: "#6b6b6b",
  Wood: "#a68520",
  Leather: "#8b5a2b",
  Mixed: "#c9a227",
};

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

export function formatPricePence(pence: number): string {
  return formatPrice(pence / 100);
}

function shortFromDescription(description: string): string {
  const first = description.split(/(?<=\.)\s+/)[0]?.trim();
  if (first && first.length > 10 && first.length < 160) return first;
  return description.slice(0, 120).trim() + (description.length > 120 ? "…" : "");
}

export function mapDbProduct(p: ProductRow): Product {
  const category = p.category as CategorySlug;
  const cat = getCategory(category);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: shortFromDescription(p.description),
    description: p.description,
    price: p.pricePence / 100,
    pricePence: p.pricePence,
    category,
    material: p.material,
    personalisable: !NON_PERSONALISABLE.has(p.slug),
    featured: FEATURED_SLUGS.has(p.slug),
    accent:
      ACCENT_BY_MATERIAL[p.material] ||
      cat?.accent ||
      "#c9a227",
    icon:
      p.slug === "bespoke-commission"
        ? "spark"
        : p.slug === "pet-portrait-slate"
          ? "paw"
          : ICON_BY_CATEGORY[category] || "spark",
    imageUrl: p.imageUrl,
    active: p.active,
  };
}
