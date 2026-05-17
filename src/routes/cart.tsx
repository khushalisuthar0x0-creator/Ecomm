import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useCartStore, selectCartSubtotal } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { productById } from "@/data/products";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/components/common/PriceTag";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Ateliér" }] }),
  component: CartPage,
});

function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const subtotal = useCartStore(selectCartSubtotal);
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 12) : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!isAuthed) {
      navigate({ to: "/login", search: { redirect: "/checkout" } });
      return;
    }
    navigate({ to: "/checkout" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-16 border border-border py-20 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-block text-sm underline">Continue shopping →</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => {
              const p = productById(item.productId);
              if (!p) return null;
              return (
                <li key={item.productId} className="flex gap-4 py-6 sm:gap-6">
                  <Link to="/product/$id" params={{ id: p.id }} className="block w-24 shrink-0 sm:w-32">
                    <div className="aspect-[4/5] overflow-hidden bg-secondary">
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to="/product/$id" params={{ id: p.id }} className="font-display text-lg hover:underline">
                          {p.name}
                        </Link>
                        <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">{p.category}</p>
                      </div>
                      <span className="tabular-nums">{formatPrice(p.price * item.quantity)}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <QuantityStepper value={item.quantity} onChange={(n) => updateQuantity(p.id, n)} />
                      <button
                        type="button"
                        onClick={() => removeFromCart(p.id)}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit border border-border p-6">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatPrice(total)}</dd></div>
            </dl>
            <Button size="lg" className="mt-6 w-full" onClick={handleCheckout}>
              {isAuthed ? "Checkout" : "Sign in to checkout"}
            </Button>
            <Link to="/products" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
