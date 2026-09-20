import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  HOSTED_DB_REQUIRED_MESSAGE,
  shouldUseSeedCatalogue,
} from "@/lib/db-mode";

type Params = { params: { id: string } };

export async function PUT(req: NextRequest, { params }: Params) {
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

  const data: Record<string, unknown> = {};
  if (body.slug !== undefined) {
    data.slug = String(body.slug)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  if (body.name !== undefined) data.name = String(body.name).trim();
  if (body.description !== undefined)
    data.description = String(body.description).trim();
  if (body.pricePence !== undefined) {
    const pricePence = Math.round(Number(body.pricePence));
    if (!Number.isFinite(pricePence) || pricePence < 0) {
      return NextResponse.json({ error: "Invalid price." }, { status: 400 });
    }
    data.pricePence = pricePence;
  }
  if (body.category !== undefined) data.category = String(body.category).trim();
  if (body.material !== undefined) data.material = String(body.material).trim();
  if (body.imageUrl !== undefined) {
    data.imageUrl = body.imageUrl ? String(body.imageUrl).trim() : null;
  }
  if (body.active !== undefined) {
    data.active = body.active === true || body.active === "true";
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not update product." },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  if (shouldUseSeedCatalogue()) {
    return NextResponse.json(
      { error: HOSTED_DB_REQUIRED_MESSAGE },
      { status: 503 }
    );
  }

  try {
    const { prisma } = await import("@/lib/prisma");
    // Soft-delete / deactivate preferred; hard-delete if no order items
    const itemCount = await prisma.orderItem.count({
      where: { productId: params.id },
    });
    if (itemCount > 0) {
      const product = await prisma.product.update({
        where: { id: params.id },
        data: { active: false },
      });
      return NextResponse.json({
        product,
        deactivated: true,
        message: "Product has order history — deactivated instead of deleted.",
      });
    }
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ deleted: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not delete product." },
      { status: 400 }
    );
  }
}
