import { defineConfig } from 'astro/config';

// Tailwind se aplica con PostCSS (postcss.config.mjs); los estilos base
// (@tailwind base/components/utilities) están en src/styles/global.css,
// que importa el layout.
export default defineConfig({
  site: 'https://corodiatessaron.es',
  vite: {
    cacheDir: '/tmp/vite-diatessaron',
  },
});
