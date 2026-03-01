import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // Keep react-helmet-async bundled for SSR so its HelmetProvider context works
    noExternal: ['react-helmet-async'],
  },
});
