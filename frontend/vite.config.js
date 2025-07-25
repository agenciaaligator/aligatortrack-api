import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React project. Tailwind will scan files in src
// to generate the appropriate classes. Modify this file if you need
// additional plugins or configuration options.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});