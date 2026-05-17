import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, type LoginValues } from "@/lib/schemas";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { productById } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Search {
  redirect?: string;
}

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: (s.redirect as string) || undefined,
  }),
  beforeLoad: ({ search }) => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: search.redirect ?? "/" });
    }
  },
  head: () => ({ meta: [{ title: "Sign in — Ateliér" }] }),
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const login = useAuthStore((s) => s.login);
  const pending = useAuthStore((s) => s.pendingAction);
  const consumePendingAction = useAuthStore((s) => s.consumePendingAction);
  const addToCart = useCartStore((s) => s.addToCart);
  const pendingProduct = pending ? productById(pending.productId) : null;

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (v: LoginValues) => {
    try {
      await login(v.email, v.password);
      const p = consumePendingAction();
      if (p) addToCart(p.productId, p.quantity);
      toast.success("Welcome back");
      navigate({ to: p ? "/checkout" : (search.redirect ?? "/") });
    } catch {
      toast.error("Could not sign in");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-display text-4xl">Sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/register" search={search} className="underline">Create an account</Link>.
      </p>

      {pendingProduct && (
        <div className="mt-6 border-l-2 border-accent bg-secondary/60 px-4 py-3 text-sm">
          Sign in to finish adding <span className="font-semibold">{pendingProduct.name}</span> to your cart.
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="current-password" {...form.register("password")} />
          {form.formState.errors.password && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Demo: any valid email + 8-char password works.
        </p>
      </form>
    </div>
  );
}
