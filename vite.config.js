import { defineConfig } from 'vite';
import react from '@vitejs.plugin-react';

export default defineConfig({
  base: '/Veterinaria/', 
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [
        'node_modules/',
        'src/main.jsx',
        '*.config.js',
        'setupTest.js',
      ],
    },
  },
});