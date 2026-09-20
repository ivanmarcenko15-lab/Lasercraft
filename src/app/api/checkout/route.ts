import { NextRequest, NextResponse } from "next/server";
import { resolveProductForCheckout } from "@/lib/catalogue";
import { shouldUseSeedCatalogue } from "@/lib/db-mode";
import { getBaseUrl, getStripe, isStripeConfigured } from "@/lib/stripe";

type CartLine = {
  productId: string;
  quantity: number;
  personalisation?: string;
};

function ephemeralOrderId(): string {
  return `ephemeral-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  let body: {
    email?: string;
    name?: string;
    items?: CartLine[];
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = body.email?.trim();
  const name = body.name?.trim();
  const items = body.items;

  if (!email || !name || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Name, email and at least one cart item are required." },
      { status: 400 }
    );
  }

  const lineInputs: {
    productId: string;
    quantity: number;
    unitPence: number;
    personalisation?: string;
    name: string;
  }[] = [];

  for (const item of items) {
    const qty = Math.floor(Number(item.quantity) || 0);
    if (!item.productId || qty < 1) {
      return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
    }
    const product = await resolveProductForCheckout(item.productId);
    if (!product || !product.active) {
      return NextResponse.json(
        { error: `Product not found: ${item.productId}` },
        { status: 400 }
      );
    }
    lineInputs.push({
      productId: product.id,
      quantity: qty,
      unitPence: product.pricePence,
      personalisation: item.personalisation?.trim() || undefined,
      name: product.name,
    });
  }

  const totalPence = lineInputs.reduce(
    (sum, l) => sum + l.unitPence * l.quantity,
    0
  );

  const seedMode = shouldUseSeedCatalogue();
  let orderId = ephemeralOrderId();

  if (!seedMode) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const order = await prisma.order.create({
        data: {
          email,
          name,
          status: "pending",
          totalPence,
          items: {
            create: lineInputs.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
              unitPence: l.unitPence,
              personalisation: l.personalisation,
            })),
          },
        },
      });
      orderId = order.id;
    } catch (err) {
      console.warn(
        "[checkout] Could not persist order (continuing with Stripe session).",
        err
      );
      orderId = ephemeralOrderId();
    }
  }

  const baseUrl = getBaseUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineInputs.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: "gbp",
          unit_amount: l.unitPence,
          product_data: {
            name: l.name,
            description: l.personalisation
              ? `Personalisation: ${l.personalisation}`
              : undefined,
          },
        },
      })),
      metadata: {
        orderId,
        customerName: name,
      },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    if (!seedMode && !orderId.startsWith("ephemeral-")) {
      try {
        const { prisma } = await import("@/lib/prisma");
        await prisma.order.update({
          where: { id: orderId },
          data: { stripeSessionId: session.id },
        });
      } catch (err) {
        console.warn("[checkout] Could not store stripeSessionId.", err);
      }
    }

    return NextResponse.json({ url: session.url, orderId });
  } catch (err) {
    console.error("Stripe checkout error", err);
    if (!seedMode && !orderId.startsWith("ephemeral-")) {
      try {
        const { prisma } = await import("@/lib/prisma");
        await prisma.order.update({
          where: { id: orderId },
          data: { status: "failed" },
        });
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json(
      { error: "Could not create Stripe Checkout session." },
      { status: 500 }
    );
  }
}
