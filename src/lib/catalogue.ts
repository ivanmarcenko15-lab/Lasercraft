import {
  mapDbProduct,
  type CategorySlug,
  type Product,
} from "@/data/products";
import {
  SEED_PRODUCTS,
  getSeedProductById,
  getSeedProductBySlug,
  type SeedProductRow,
} from "@/data/seed-catalogue";
import { shouldUseSeedCatalogue } from "@/lib/db-mode";

function mapSeed(row: SeedProductRow): Product {
  return mapDbProduct(row);
}

async function withPrismaFallback<T>(
  prismaFn: () => Promise<T>,
  seedFn: () => T
): Promise<T> {
  if (shouldUseSeedCatalogue()) return seedFn();
  try {
    return await prismaFn();
  } catch (err) {
    console.warn(
      "[catalogue] Prisma unavailable — falling back to seed catalogue.",
      err
    );
    return seedFn();
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  return withPrismaFallback(
    async () => {
      const { prisma } = await import("@/lib/prisma");
      const rows = await prisma.product.findMany({
        where: { active: true },
        orderBy: { createdAt: "asc" },
      });
      return rows.map(mapDbProduct);
    },
    () => SEED_PRODUCTS.filter((p) => p.active).map(mapSeed)
  );
}

export async function getAllProductsAdmin() {
  return withPrismaFallback(
    async () => {
      const { prisma } = await import("@/lib/prisma");
      return prisma.product.findMany({ orderBy: { createdAt: "asc" } });
    },
    () => SEED_PRODUCTS.map((p) => ({ ...p }))
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  return withPrismaFallback(
    async () => {
      const { prisma } = await import("@/lib/prisma");
      const row = await prisma.product.findFirst({
        where: { slug, active: true },
      });
      return row ? mapDbProduct(row) : null;
    },
    () => {
      const row = getSeedProductBySlug(slug);
      return row ? mapSeed(row) : null;
    }
  );
}

export async function getProductById(id: string) {
  return withPrismaFallback(
    async () => {
      const { prisma } = await import("@/lib/prisma");
      return prisma.product.findUnique({ where: { id } });
    },
    () => getSeedProductById(id) ?? null
  );
}

/** Lookup for checkout: seed or DB, by id (and seed also accepts bare slug). */
export async function resolveProductForCheckout(productId: string): Promise<{
  id: string;
  name: string;
  pricePence: number;
  active: boolean;
} | null> {
  if (shouldUseSeedCatalogue()) {
    const byId = getSeedProductById(productId);
    if (byId) return byId;
    const bySlug = getSeedProductBySlug(productId);
    if (bySlug) return bySlug;
    // Also accept seed-<slug> already handled; try stripping prefix
    if (productId.startsWith("seed-")) {
      const slug = productId.slice("seed-".length);
      return getSeedProductBySlug(slug) ?? null;
    }
    return null;
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const product = await prisma.product.findFirst({
      where: { id: productId, active: true },
    });
    if (product) return product;
  } catch (err) {
    console.warn("[checkout] Prisma lookup failed, trying seed.", err);
  }

  const seed =
    getSeedProductById(productId) || getSeedProductBySlug(productId);
  return seed ?? null;
}

export async function getProductsByCategory(
  category: CategorySlug | string
): Promise<Product[]> {
  return withPrismaFallback(
    async () => {
      const { prisma } = await import("@/lib/prisma");
      const rows = await prisma.product.findMany({
        where: { active: true, category },
        orderBy: { createdAt: "asc" },
      });
      return rows.map(mapDbProduct);
    },
    () =>
      SEED_PRODUCTS.filter((p) => p.active && p.category === category).map(
        mapSeed
      )
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getActiveProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 8);
}
