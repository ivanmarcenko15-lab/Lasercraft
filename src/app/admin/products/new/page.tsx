import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  HOSTED_DB_REQUIRED_MESSAGE,
  shouldUseSeedCatalogue,
} from "@/lib/db-mode";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  if (!(isAdminAuthenticated())) redirect("/admin/login");

  if (shouldUseSeedCatalogue()) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="section-eyebrow mb-2">Products</p>
        <h1 className="section-title mb-4">Add product</h1>
        <div className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-charcoal">
          {HOSTED_DB_REQUIRED_MESSAGE}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="section-eyebrow mb-2">Products</p>
      <h1 className="section-title mb-8">Add product</h1>
      <ProductForm mode="create" />
    </div>
  );
}
