import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PendingAction {
  type: "addToCart" | "buyNow";
  productId: string;
  quantity: number;
}

interface User {
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  pendingAction: PendingAction | null;
  redirectUrl: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setPendingAction: (action: PendingAction, redirectUrl?: string) => void;
  consumePendingAction: () => PendingAction | null;
  clearRedirect: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      pendingAction: null,
      redirectUrl: null,
      login: async (email) => {
        // mock — accept any credentials
        await new Promise((r) => setTimeout(r, 300));
        set({
          user: { email, name: email.split("@")[0] },
          isAuthenticated: true,
        });
      },
      register: async (name, email) => {
        await new Promise((r) => setTimeout(r, 300));
        set({ user: { email, name }, isAuthenticated: true });
      },
      logout: () =>
        set({ user: null, isAuthenticated: false, pendingAction: null, redirectUrl: null }),
      setPendingAction: (action, redirectUrl) =>
        set({ pendingAction: action, redirectUrl: redirectUrl ?? null }),
      consumePendingAction: () => {
        const a = get().pendingAction;
        set({ pendingAction: null });
        return a;
      },
      clearRedirect: () => {
        const r = get().redirectUrl;
        set({ redirectUrl: null });
        return r;
      },
    }),
    { name: "auth-store" },
  ),
);
