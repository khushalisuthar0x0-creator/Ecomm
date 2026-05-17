import { Link } from "@tanstack/react-router";
import { ShoppingBag, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth";
import { useCartStore, selectCartCount } from "@/stores/cart";

export function Header() {
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const count = useCartStore(selectCartCount);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Ateliér
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Primary">
          <Link to="/" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground transition-colors" activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/products" activeProps={{ className: "text-foreground" }} className="text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isAuthed ? (
            <div className="hidden items-center gap-3 sm:flex">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="h-4 w-4" /> {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
              Sign in
            </Link>
          )}
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative ml-2 inline-flex h-10 w-10 items-center justify-center hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
