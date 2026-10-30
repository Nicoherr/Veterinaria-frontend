import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/Veterinaria-frontend/' : '/',
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