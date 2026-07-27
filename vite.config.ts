import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("@supabase")) return "supabase";
            if (id.includes("@tanstack/react-query")) return "query";
            if (id.includes("@tanstack/react-router") || id.includes("@tanstack/react-start")) {
              return "router";
            }
            if (id.includes("lucide-react")) return "icons";
            if (id.includes("sonner")) return "toast";
            if (/node_modules[/\\](react-dom|scheduler)([/\\]|$)/.test(id)) return "react-vendor";
            if (/node_modules[/\\]react([/\\]|$)/.test(id)) return "react-vendor";
          },
        },
      },
    },
  },
});
