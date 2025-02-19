import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      js: "application/javascript",
      jsx: "application/javascript",
    },
    headers: {
      "Content-Type": "application/javascript",
    },
    port: 3000,
    proxy: {
      "/api": {
        target: "https://cg6gxs-5000.csb.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
