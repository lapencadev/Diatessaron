// Tailwind 3 se procesa con PostCSS, que Astro (vía Vite) aplica a todo el CSS.
// Antes lo hacía la integración @astrojs/tailwind, que ya no tiene versión para Astro 6+.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
