import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = isAdminAuthenticated();

  return (
    <div className="min-h-screen bg-cream">
      {authed && (
        <div className="border-b border-gold/30 bg-charcoal text-cream">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/admin" className="font-serif text-lg text-gold">
                LaseCraft Admin
              </Link>
              <nav className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider">
                <Link href="/admin" className="text-cream/80 hover:text-gold">
                  Dashboard
                </Link>
                <Link
                  href="/admin/products/new"
                  className="text-cream/80 hover:text-gold"
                >
                  Add product
                </Link>
                <Link href="/shop" className="text-cream/80 hover:text-gold">
                  View shop
                </Link>
              </nav>
            </div>
            <AdminLogoutButton />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
