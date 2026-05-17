import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { productById, products } from "@/data/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/product/ProductCard";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { ProtectedAction } from "@/components/common/ProtectedAction";
import { formatPrice } from "@/components/common/PriceTag";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = productById(params.id);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Ateliér` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.images[0] },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-sm underline">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-wider text-muted-foreground">
        <Link to="/products" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div className="lg:pt-4">
          <h1 className="font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm">Quantity</span>
            <QuantityStepper value={qty} onChange={setQty} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ProtectedAction productId={product.id} quantity={qty} variant="addToCart" size="lg" buttonVariant="outline" className="sm:flex-1">
              Add to cart
            </ProtectedAction>
            <ProtectedAction productId={product.id} quantity={qty} variant="buyNow" size="lg" className="sm:flex-1">
              Buy now
            </ProtectedAction>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div>
              <dt className="font-semibold text-foreground">Shipping</dt>
              <dd>Free over $150</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Returns</dt>
              <dd>30 days, no questions</dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl sm:text-3xl">You may also like</h2>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
