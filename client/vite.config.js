import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
    modulePreload: {
      resolveDependencies(filename, deps) {
        return deps.filter(
          (dep) => !dep.includes('vendor-charts') && !dep.includes('vendor-icons') && !dep.includes('Admin')
        );
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('simple-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs-2') || id.includes('@mui/x-charts')) {
              return 'vendor-charts';
            }
          }
        },
      },
    },
  },
});
