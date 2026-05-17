export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function PriceTag({ value, className }: { value: number; className?: string }) {
  return <span className={className}>{formatPrice(value)}</span>;
}
