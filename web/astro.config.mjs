import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://corodiatessaron.es',
  vite: {
    cacheDir: '/tmp/vite-diatessaron',
  },
});
