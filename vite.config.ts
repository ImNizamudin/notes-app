import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: './',
    plugins: [
      react(),
      ...(mode === 'analyze' 
        ? [visualizer({ 
            open: true,
            filename: 'dist/stats.html'
          })] 
        : []
      )
    ],
    
    server: mode === 'development' ? {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    } : undefined,
    
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-quill')) return 'quill';
              if (id.includes('highlight.js')) return 'highlight';
              if (id.includes('react')) return 'react';
              if (id.includes('lucide-react')) return 'lucide';
              return 'vendor';
            }
          },
        },
      },
    },
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