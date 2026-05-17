import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema, type RegisterValues } from "@/lib/schemas";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Search {
  redirect?: string;
}

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: (s.redirect as string) || undefined,
  }),
  beforeLoad: ({ search }) => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: search.redirect ?? "/" });
    }
  },
  head: () => ({ meta: [{ title: "Create account — Ateliér" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const register = useAuthStore((s) => s.register);
  const consumePendingAction = useAuthStore((s) => s.consumePendingAction);
  const addToCart = useCartStore((s) => s.addToCart);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (v: RegisterValues) => {
    try {
      await register(v.name, v.email, v.password);
      const p = consumePendingAction();
      if (p) addToCart(p.productId, p.quantity);
      toast.success("Account created");
      navigate({ to: p ? "/checkout" : (search.redirect ?? "/") });
    } catch {
      toast.error("Could not create account");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-display text-4xl">Create account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Already a member?{" "}
        <Link to="/login" search={search} className="underline">Sign in</Link>.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">8+ characters, including a number.</p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating…" : "Create account"}
        </Button>
      </form>
    </div>
  );
}
