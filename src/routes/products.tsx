import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

interface Search {
  category?: Category;
  sort?: "featured" | "price-asc" | "price-desc" | "name";
  maxPrice?: number;
}

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: (search.category as Category) || undefined,
    sort: (search.sort as Search["sort"]) || "featured",
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop all — Ateliér" },
      { name: "description", content: "Browse the full Ateliér collection — apparel, home, and accessories." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [maxPrice, setMaxPrice] = useState<number>(search.maxPrice ?? 500);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.category) list = list.filter((p) => p.category === search.category);
    list = list.filter((p) => p.price <= maxPrice);
    switch (search.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return list;
  }, [search.category, search.sort, maxPrice]);

  const setCategory = (c?: Category) =>
    navigate({ search: (prev: Search): Search => ({ ...prev, category: c }) });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 border-b border-border pb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The collection</p>
        <h1 className="font-display text-4xl sm:text-5xl">Shop all</h1>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <aside className="space-y-8 text-sm">
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider">Category</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCategory(undefined)}
                  className={`text-left hover:text-foreground ${!search.category ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                >
                  All
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setCategory(c.id)}
                    className={`text-left hover:text-foreground ${search.category === c.id ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider">Max price</h2>
            <input
              type="range"
              min={40}
              max={500}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-foreground"
            />
            <p className="mt-1 text-muted-foreground tabular-nums">Up to ${maxPrice}</p>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider">Sort</h2>
            <select
              value={search.sort}
              onChange={(e) => navigate({ search: (p: Search): Search => ({ ...p, sort: e.target.value as Search["sort"] }) })}
              className="w-full border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <p className="mb-6 text-sm text-muted-foreground">{filtered.length} products</p>
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-muted-foreground">No products match these filters.</p>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
