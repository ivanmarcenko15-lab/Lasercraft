import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getProductById } from "@/lib/catalogue";
import {
  HOSTED_DB_REQUIRED_MESSAGE,
  shouldUseSeedCatalogue,
} from "@/lib/db-mode";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  if (!(isAdminAuthenticated())) redirect("/admin/login");

  if (shouldUseSeedCatalogue()) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="section-eyebrow mb-2">Products</p>
        <h1 className="section-title mb-4">Edit product</h1>
        <div className="rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-charcoal">
          {HOSTED_DB_REQUIRED_MESSAGE}
        </div>
      </div>
    );
  }

  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="section-eyebrow mb-2">Products</p>
      <h1 className="section-title mb-8">Edit product</h1>
      <ProductForm
        mode="edit"
        initial={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          description: product.description,
          pricePence: product.pricePence,
          category: product.category,
          material: product.material,
          imageUrl: product.imageUrl,
          active: product.active,
        }}
      />
    </div>
  );
}
