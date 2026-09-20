"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/products";

const MATERIALS = ["Wood", "Acrylic", "Leather", "Slate", "Mixed"];

export type ProductFormValues = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  pricePence: number;
  category: string;
  material: string;
  imageUrl?: string | null;
  active: boolean;
};

export function ProductForm({
  initial,
  mode,
}: {
  initial?: ProductFormValues;
  mode: "create" | "edit";
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<ProductFormValues>(
    initial || {
      slug: "",
      name: "",
      description: "",
      pricePence: 2500,
      category: categories[0].slug,
      material: "Wood",
      imageUrl: "",
      active: true,
    }
  );

  function update<K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      ...values,
      pricePence: Math.round(Number(values.pricePence)),
      imageUrl: values.imageUrl || null,
    };

    const url =
      mode === "create"
        ? "/api/admin/products"
        : `/api/admin/products/${values.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const pricePounds = (values.pricePence / 100).toFixed(2);

  return (
    <form onSubmit={onSubmit} className="card-surface mx-auto max-w-2xl space-y-5 p-6">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
          Name
        </label>
        <input
          required
          className="input-field"
          value={values.name}
          onChange={(e) => {
            update("name", e.target.value);
            if (mode === "create" && !initial?.slug) {
              update(
                "slug",
                e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "")
              );
            }
          }}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
          Slug
        </label>
        <input
          required
          className="input-field"
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
          Description
        </label>
        <textarea
          required
          rows={5}
          className="input-field resize-y"
          value={values.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Price (GBP)
          </label>
          <input
            required
            type="number"
            min={0}
            step="0.01"
            className="input-field"
            value={pricePounds}
            onChange={(e) =>
              update(
                "pricePence",
                Math.round(parseFloat(e.target.value || "0") * 100)
              )
            }
          />
          <p className="mt-1 text-xs text-charcoal/45">
            Stored as {values.pricePence} pence
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Material
          </label>
          <select
            className="input-field"
            value={values.material}
            onChange={(e) => update("material", e.target.value)}
          >
            {MATERIALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Category
          </label>
          <select
            className="input-field"
            value={values.category}
            onChange={(e) => update("category", e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Image URL (optional)
          </label>
          <input
            className="input-field"
            value={values.imageUrl || ""}
            onChange={(e) => update("imageUrl", e.target.value)}
            placeholder="/assets/…"
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal/80">
        <input
          type="checkbox"
          checked={values.active}
          onChange={(e) => update("active", e.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        Active (visible in shop)
      </label>
      {error && (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-gold" disabled={loading}>
          {loading
            ? "Saving…"
            : mode === "create"
              ? "Create product"
              : "Save changes"}
        </button>
        <button
          type="button"
          className="btn-outline border-charcoal/30 text-charcoal"
          onClick={() => router.push("/admin")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
