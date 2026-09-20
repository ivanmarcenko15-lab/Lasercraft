import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Order confirmed",
};

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <div className="card-surface space-y-4 p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold">
          <IconCheck size={28} />
        </div>
        <h1 className="font-serif text-2xl text-charcoal">Thank you!</h1>
        <p className="text-charcoal/70">
          Your payment was successful. We will start preparing your personalised
          order shortly. A confirmation email will arrive from Stripe.
        </p>
        {searchParams.session_id && (
          <p className="break-all text-xs text-charcoal/40">
            Session: {searchParams.session_id}
          </p>
        )}
        <Link href="/shop" className="btn-gold inline-flex">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
