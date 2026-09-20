import Stripe from "stripe";

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, {
    apiVersion: "2026-08-26.dahlia",
  });
}

export function getBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
