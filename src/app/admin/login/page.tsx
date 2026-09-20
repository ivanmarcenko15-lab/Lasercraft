"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <p className="section-eyebrow mb-2">Admin</p>
      <h1 className="section-title mb-2">Sign in</h1>
      <p className="mb-8 text-sm text-charcoal/60">
        Manage products and orders for the LaseCraft store.
      </p>
      <form onSubmit={onSubmit} className="card-surface space-y-5 p-6">
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoFocus
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
          />
        </div>
        {error && (
          <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        )}
        <button type="submit" className="btn-gold w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-charcoal/50">
        <Link href="/" className="text-gold hover:underline">
          ← Back to store
        </Link>
      </p>
    </div>
  );
}
