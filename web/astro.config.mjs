import { defineConfig } from 'astro/config';

// Tailwind se aplica con PostCSS (postcss.config.mjs); los estilos base
// (@tailwind base/components/utilities) están en src/styles/global.css,
// que importa el layout.
export default defineConfig({
  site: 'https://corodiatessaron.es',
  // Astro 7 quita por defecto los espacios entre elementos en línea (p. ej. «en <span>Molina</span>»
  // pasaba a verse «enMolina»). true mantiene el comportamiento de Astro 6.
  compressHTML: true,
  vite: {
    cacheDir: '/tmp/vite-diatessaron',
  },
});
