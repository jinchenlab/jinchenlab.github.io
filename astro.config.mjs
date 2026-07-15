import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jinchenlab.com',
  server: { port: Number(process.env.PORT) || 4321, host: true },
  vite: {
    css: { devSourcemap: true },
  },
});
