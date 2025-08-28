import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-notesapp.radarku.online",
        changeOrigin: true,
        secure: false, // kalau pakai self-signed SSL, tambahkan ini
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
