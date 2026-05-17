import { useNavigate, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuthStore, type PendingAction } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

interface Props {
  productId: string;
  quantity?: number;
  variant?: "addToCart" | "buyNow";
  className?: string;
  size?: "default" | "sm" | "lg";
  buttonVariant?: "default" | "outline" | "secondary";
  children: ReactNode;
}

export function ProtectedAction({
  productId,
  quantity = 1,
  variant = "addToCart",
  className,
  size = "default",
  buttonVariant = "default",
  children,
}: Props) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthed = useAuthStore((s) => s.isAuthenticated);
  const setPendingAction = useAuthStore((s) => s.setPendingAction);
  const addToCart = useCartStore((s) => s.addToCart);

  const handleClick = () => {
    if (isAuthed) {
      addToCart(productId, quantity);
      if (variant === "buyNow") {
        navigate({ to: "/checkout" });
      } else {
        toast.success("Added to cart");
      }
      return;
    }
    const action: PendingAction = { type: variant, productId, quantity };
    setPendingAction(action, pathname);
    toast.message("Please sign in to continue", {
      description: "We'll add it to your cart right after.",
    });
    navigate({ to: "/login", search: { redirect: "/checkout" } });
  };

  return (
    <Button
      type="button"
      size={size}
      variant={buttonVariant}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
