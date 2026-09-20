"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminProductActions({
  id,
  active,
  name,
}: {
  id: string;
  active: boolean;
  name: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function deactivate() {
    if (!confirm(`Deactivate “${name}”? It will be hidden from the shop.`)) {
      return;
    }
    setBusy(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: false }),
    });
    setBusy(false);
    router.refresh();
  }

  async function activate() {
    setBusy(true);
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: true }),
    });
    setBusy(false);
    router.refresh();
  }

  async function remove() {
    if (
      !confirm(
        `Delete “${name}”? If it has order history it will be deactivated instead.`
      )
    ) {
      return;
    }
    setBusy(true);
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Link
        href={`/admin/products/${id}`}
        className="text-xs font-semibold uppercase tracking-wider text-gold hover:underline"
      >
        Edit
      </Link>
      {active ? (
        <button
          type="button"
          disabled={busy}
          onClick={deactivate}
          className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-charcoal"
        >
          Deactivate
        </button>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={activate}
          className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 hover:text-charcoal"
        >
          Activate
        </button>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={remove}
        className="text-xs font-semibold uppercase tracking-wider text-red-700/70 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  );
}
