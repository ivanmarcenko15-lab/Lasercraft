import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { isStripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout for LaseCraft via Stripe.",
};

export default function CheckoutPage() {
  const stripeConfigured = isStripeConfigured();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="section-eyebrow mb-2">Checkout</p>
      <h1 className="section-title mb-8">Complete your order</h1>
      <CheckoutForm stripeConfigured={stripeConfigured} />
    </div>
  );
}
