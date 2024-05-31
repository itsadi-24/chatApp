import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // the target is gonna be prefixed when we hit api
        target: 'http://localhost:3000',
      },
    },
  },
});
