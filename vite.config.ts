import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/engine/vehicleDb')) {
            return 'vehicle-db';
          }
          if (id.includes('src/engine/clothingDb')) {
            return 'clothing-db';
          }
        }
      }
    }
  }
});
