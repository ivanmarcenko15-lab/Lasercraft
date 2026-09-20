import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getAllProductsAdmin } from "@/lib/catalogue";
import {
  HOSTED_DB_REQUIRED_MESSAGE,
  shouldUseSeedCatalogue,
} from "@/lib/db-mode";
import { formatPricePence, getCategory } from "@/data/products";
import { AdminProductActions } from "@/components/admin/AdminProductActions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const seedMode = shouldUseSeedCatalogue();
  const products = await getAllProductsAdmin();

  let orders: {
    id: string;
    email: string;
    name: string;
    status: string;
    totalPence: number;
    createdAt: Date;
    items: {
      id: string;
      quantity: number;
      unitPence: number;
      personalisation: string | null;
      product: { name: string };
    }[];
  }[] = [];

  if (!seedMode) {
    try {
      const { prisma } = await import("@/lib/prisma");
      orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: { include: { product: true } } },
        take: 50,
      });
    } catch (err) {
      console.warn("[admin] Could not load orders.", err);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow mb-2">Dashboard</p>
          <h1 className="section-title">Products & orders</h1>
        </div>
        {!seedMode && (
          <Link href="/admin/products/new" className="btn-gold">
            Add product
          </Link>
        )}
      </div>

      {seedMode && (
        <div className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-charcoal">
          <strong className="text-gold-dark">Read-only catalogue.</strong>{" "}
          {HOSTED_DB_REQUIRED_MESSAGE}
        </div>
      )}

      <section>
        <h2 className="mb-4 font-serif text-2xl text-charcoal">
          Products ({products.length})
        </h2>
        <div className="overflow-x-auto card-surface">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-cream-muted bg-cream-soft text-xs uppercase tracking-wider text-charcoal/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-cream-muted last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-charcoal">{p.name}</div>
                    <div className="text-xs text-charcoal/45">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {getCategory(p.category)?.name || p.category}
                  </td>
                  <td className="px-4 py-3">{formatPricePence(p.pricePence)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        p.active
                          ? "bg-gold/20 text-gold-dark"
                          : "bg-charcoal/10 text-charcoal/50"
                      }`}
                    >
                      {p.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {seedMode ? (
                      <span className="text-xs text-charcoal/40">Seed only</span>
                    ) : (
                      <AdminProductActions
                        id={p.id}
                        active={p.active}
                        name={p.name}
                      />
                    )}
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-charcoal/50"
                  >
                    No products yet.{" "}
                    <Link href="/admin/products/new" className="text-gold hover:underline">
                      Add one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-2xl text-charcoal">
          Recent orders ({orders.length})
        </h2>
        <div className="space-y-4">
          {seedMode ? (
            <div className="card-surface p-8 text-center text-charcoal/50">
              Order history is unavailable without a hosted database. Stripe
              Checkout still works; paid sessions appear in the Stripe Dashboard.
            </div>
          ) : orders.length === 0 ? (
            <div className="card-surface p-8 text-center text-charcoal/50">
              No orders yet. Orders appear here after Stripe Checkout sessions
              are created.
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="card-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-charcoal">{order.name}</p>
                    <p className="text-sm text-charcoal/60">{order.email}</p>
                    <p className="mt-1 text-xs text-charcoal/40">
                      {new Date(order.createdAt).toLocaleString("en-GB", {
                        timeZone: "Europe/London",
                      })}{" "}
                      · {order.id.slice(0, 8)}…
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gold-dark">
                      {formatPricePence(order.totalPence)}
                    </p>
                    <span
                      className={`mt-1 inline-block rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : order.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-gold/20 text-gold-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <ul className="mt-3 space-y-1 border-t border-cream-muted pt-3 text-sm text-charcoal/70">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} × {item.quantity} —{" "}
                      {formatPricePence(item.unitPence * item.quantity)}
                      {item.personalisation
                        ? ` · “${item.personalisation}”`
                        : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
