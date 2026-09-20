import { NextRequest, NextResponse } from "next/server";
import { shouldUseSeedCatalogue } from "@/lib/db-mode";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  let event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else if (webhookSecret && !signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    } else {
      // Local stub: accept unverified JSON when secret not set
      event = JSON.parse(body);
    }
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    if (shouldUseSeedCatalogue()) {
      // No persistent order store on seed/Vercel mode — acknowledge only.
      return NextResponse.json({ received: true, persisted: false });
    }

    const session = event.data.object as {
      id?: string;
      metadata?: { orderId?: string };
    };
    const orderId = session.metadata?.orderId;

    try {
      const { prisma } = await import("@/lib/prisma");
      if (orderId && !orderId.startsWith("ephemeral-")) {
        await prisma.order.updateMany({
          where: { id: orderId },
          data: {
            status: "paid",
            stripeSessionId: session.id || undefined,
          },
        });
      } else if (session.id) {
        await prisma.order.updateMany({
          where: { stripeSessionId: session.id },
          data: { status: "paid" },
        });
      }
    } catch (err) {
      console.warn("[webhook] Could not update order status.", err);
    }
  }

  return NextResponse.json({ received: true });
}
