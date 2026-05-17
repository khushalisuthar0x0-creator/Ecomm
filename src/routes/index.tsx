import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ateliér — Considered goods for everyday rituals" },
      {
        name: "description",
        content:
          "Shop apparel, home, and accessories made by people who care. New season pieces, slow-made and built to last.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-6 lg:pt-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Autumn — Winter 26
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              The quiet things,<br />done well.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              A short, considered collection of apparel, home, and accessories — sourced
              from small makers and built to outlast the season.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop the collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=80"
                alt="Editorial photograph of the new season collection"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">Shop by category</h2>
          <Link to="/products" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {categories.map((c) => {
            const cover = products.find((p) => p.category === c.id)?.images[0];
            return (
              <Link
                key={c.id}
                to="/products"
                search={{ category: c.id } as never}
                className="group relative block overflow-hidden"
              >
                <div className="aspect-[4/5] bg-secondary">
                  <img src={cover} alt={c.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/90 px-4 py-3 backdrop-blur">
                  <span className="font-display text-xl">{c.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">Top sellers</h2>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo strip */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            { t: "Slow-made", d: "Produced in small batches by independent ateliers." },
            { t: "Free shipping", d: "Complimentary worldwide shipping on orders over $150." },
            { t: "Lifetime repair", d: "We repair what we sell, for as long as you own it." },
          ].map((b) => (
            <div key={b.t}>
              <h3 className="font-display text-xl">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
