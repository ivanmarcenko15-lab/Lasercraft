/**
 * Decide whether to serve the in-memory seed catalogue instead of Prisma.
 *
 * Seed catalogue ONLY when DATABASE_URL is missing/empty or starts with
 * `file:` (legacy SQLite). Postgres/Neon URLs (`postgres://` /
 * `postgresql://`) use Prisma — including on Vercel.
 */
export function shouldUseSeedCatalogue(): boolean {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return true;
  if (url.startsWith("file:")) return true;
  // postgres:// or postgresql:// (Neon pooled, etc.) → Prisma
  return false;
}

export const HOSTED_DB_REQUIRED_MESSAGE =
  "Product mutations require a hosted database. Set DATABASE_URL to a Neon/Postgres connection string (postgresql://…) — seed/file: mode is read-only for catalogue mutations.";
