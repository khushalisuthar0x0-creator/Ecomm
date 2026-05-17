import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { checkoutSchema, type CheckoutValues } from "@/lib/schemas";
import { useCartStore, selectCartSubtotal } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { productById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/components/common/PriceTag";

export const Route = createFileRoute("/_authenticated/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Ateliér" }] }),
  component: Checkout,
});

function Checkout() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 12) : 0;
  const total = subtotal + shipping;

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    clear();
    toast.success("Order placed", { description: "Thanks for shopping with us." });
    navigate({ to: "/" });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Your cart is empty</h1>
        <Link to="/products" className="mt-6 inline-block text-sm underline">Browse the shop →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl sm:text-5xl">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <section>
            <h2 className="font-display text-2xl">Shipping</h2>
            <div className="mt-6 grid gap-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" {...form.register("fullName")} />
                {form.formState.errors.fullName && <p className="mt-1 text-xs text-destructive">{form.formState.errors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="address">Street address</Label>
                <Input id="address" {...form.register("address")} />
                {form.formState.errors.address && <p className="mt-1 text-xs text-destructive">{form.formState.errors.address.message}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...form.register("city")} />
                  {form.formState.errors.city && <p className="mt-1 text-xs text-destructive">{form.formState.errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input id="postalCode" {...form.register("postalCode")} />
                  {form.formState.errors.postalCode && <p className="mt-1 text-xs text-destructive">{form.formState.errors.postalCode.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...form.register("country")} />
                {form.formState.errors.country && <p className="mt-1 text-xs text-destructive">{form.formState.errors.country.message}</p>}
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Payment</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a demo — no payment will be processed.
            </p>
          </section>

          <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Placing order…" : `Place order — ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="h-fit border border-border p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-6 space-y-4">
            {items.map((i) => {
              const p = productById(i.productId);
              if (!p) return null;
              return (
                <li key={i.productId} className="flex gap-3">
                  <div className="h-16 w-14 shrink-0 overflow-hidden bg-secondary">
                    <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 justify-between gap-2 text-sm">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Qty {i.quantity}</p>
                    </div>
                    <span className="tabular-nums">{formatPrice(p.price * i.quantity)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatPrice(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
