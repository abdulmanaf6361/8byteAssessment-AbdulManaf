import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests starting with /api to backend server
      "/api": {
        target: "https://www.scifyx.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
