import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jinchenlab.com',
  integrations: [sitemap()],
  server: { port: Number(process.env.PORT) || 4321, host: true },
  vite: {
    css: { devSourcemap: true },
  },
});
