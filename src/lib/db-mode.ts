/**
 * Decide whether to serve the in-memory seed catalogue instead of Prisma.
 *
 * SQLite file DBs are not writable/usable on Vercel serverless. Prefer seed
 * when running on Vercel, when DATABASE_URL is missing, or when it points at
 * a local file: SQLite path (unusable on serverless).
 */
export function shouldUseSeedCatalogue(): boolean {
  if (process.env.VERCEL === "1") return true;

  const url = process.env.DATABASE_URL?.trim();
  if (!url) return true;

  // file: SQLite is fine locally; on serverless it is unusable even if set
  if (url.startsWith("file:") && process.env.VERCEL) return true;

  return false;
}

export const HOSTED_DB_REQUIRED_MESSAGE =
  "Product mutations require a hosted database. On Vercel, SQLite is not available — configure a remote DATABASE_URL (e.g. Postgres) or manage the seed catalogue in code.";
