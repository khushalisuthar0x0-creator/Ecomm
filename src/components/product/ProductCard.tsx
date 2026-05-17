import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { formatPrice } from "@/components/common/PriceTag";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
      preload="intent"
    >
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg leading-tight">{product.name}</h3>
        <span className="text-sm tabular-nums text-muted-foreground">
          {formatPrice(product.price)}
        </span>
      </div>
      <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
        {product.category}
      </p>
    </Link>
  );
}
