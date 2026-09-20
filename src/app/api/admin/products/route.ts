import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllProductsAdmin } from "@/lib/catalogue";
import {
  HOSTED_DB_REQUIRED_MESSAGE,
  shouldUseSeedCatalogue,
} from "@/lib/db-mode";

export async function GET() {
  if (!(isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const products = await getAllProductsAdmin();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  if (!(isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (shouldUseSeedCatalogue()) {
    return NextResponse.json(
      { error: HOSTED_DB_REQUIRED_MESSAGE },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const slug = String(body.slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  const name = String(body.name || "").trim();
  const description = String(body.description || "").trim();
  const pricePence = Math.round(Number(body.pricePence));
  const category = String(body.category || "").trim();
  const material = String(body.material || "").trim();
  const imageUrl = body.imageUrl ? String(body.imageUrl).trim() : null;
  const active = body.active !== false && body.active !== "false";

  if (!slug || !name || !description || !category || !material) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(pricePence) || pricePence < 0) {
    return NextResponse.json({ error: "Invalid price." }, { status: 400 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const product = await prisma.product.create({
      data: {
        slug,
        name,
        description,
        pricePence,
        category,
        material,
        imageUrl,
        active,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create product (slug may already exist)." },
      { status: 400 }
    );
  }
}
