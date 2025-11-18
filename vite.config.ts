import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './',
  plugins: [react()],
  
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://minio-s3.radarku.online",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  
  build: {
    chunkSizeWarningLimit: 1000,
  },
});

// npm install --save-dev @types/node
// npx vite build --mode production

/*
*  HANDLE : this
// npm install --save-dev rollup-plugin-visualizer

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
*/