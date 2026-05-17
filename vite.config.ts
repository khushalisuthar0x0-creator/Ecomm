import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    server: {
      allowedHosts: [
        "velvet-cart-suite.onrender.com",
        ".onrender.com", // optional: any *.onrender.com preview URL
      ],
    },
  },
});