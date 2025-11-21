import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./",
    plugins: [react()],

    server: {
      host: true,
      port: 3000,

      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,   // pakai dari .env
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },

        "/minio": {
          target: env.VITE_MINIO_URL,      // pakai dari .env
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/minio/, ""),
        },
      },
    },

    build: {
      chunkSizeWarningLimit: 1500, // optional, no error
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react';
              if (id.includes('react-router')) return 'router';
              if (id.includes('lucide-react')) return 'icons';
              return 'vendor'; // untuk modul-modul lain
            }
          },
        },
      },
    }
  };
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