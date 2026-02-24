import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify("https://paydeya-backend.onrender.com"),
  },
  server: {
    proxy: {
      "/api": {
        target: "https://paydeya-backend.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (urlPath) => urlPath.replace(/^\/api/, "/api"),
      },
    },
  },
});
