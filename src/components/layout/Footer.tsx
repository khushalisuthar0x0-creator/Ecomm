import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <div className="font-display text-2xl">Ateliér</div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Considered goods for everyday rituals — sourced and made by people who care.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All products</Link></li>
            <li><Link to="/products" search={{ category: "apparel" } as never} className="hover:text-foreground">Apparel</Link></li>
            <li><Link to="/products" search={{ category: "home" } as never} className="hover:text-foreground">Home</Link></li>
            <li><Link to="/products" search={{ category: "accessories" } as never} className="hover:text-foreground">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Journal</li>
            <li>Stockists</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Help</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Care guide</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} Ateliér. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  );
}
