# Coro Diatessaron — Web

Stack: **Astro 4** + **Tailwind CSS** + **Netlify**

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist
npm run preview   # previsualiza el build
```

## Estructura

```
src/
├── components/
│   ├── Nav.astro          ← Navegación sticky responsive
│   ├── Hero.astro         ← Portada con logo y CTAs
│   ├── Conciertos.astro   ← ⭐ EDITAR AQUÍ los conciertos
│   ├── Videos.astro       ← ⭐ EDITAR AQUÍ los vídeos de YouTube
│   ├── Galeria.astro      ← ⭐ EDITAR AQUÍ las fotos
│   ├── SobreNosotros.astro
│   ├── RedesSociales.astro
│   ├── Contacto.astro     ← Formulario Netlify Forms
│   └── Footer.astro
├── layouts/
│   └── Layout.astro       ← HTML base, SEO, fuentes
├── pages/
│   └── index.astro        ← Monta todos los componentes
└── styles/
    └── global.css         ← Colores y utilidades globales
public/
├── logo.png               ← ⭐ PONER AQUÍ el logo
└── images/
    └── galeria/           ← ⭐ PONER AQUÍ las fotos
```

## Cómo añadir contenido

### Nuevo concierto
Edita el array `proximos` o `pasados` en `src/components/Conciertos.astro`.

### Nuevo vídeo
Edita el array `videos` en `src/components/Videos.astro` — solo necesitas el ID de YouTube.

### Fotos de galería
1. Copia las fotos a `public/images/galeria/`
2. Añade las rutas en el array `fotos` de `src/components/Galeria.astro`

### Logo
Copia el logo como `public/logo.png`

## Despliegue en Netlify

1. Sube el proyecto a GitHub
2. En Netlify: New site → Import from Git → selecciona el repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Netlify detecta el formulario automáticamente en el primer deploy

## Dominio
Cuando compres `corodiatessaron.es` (o similar), en Netlify → Domain settings → Add custom domain.

## Colores (Tailwind)
- `coro-gold`: #C9A84C (dorado)
- `coro-dark`: #0D0D0D (negro)
- `coro-gray`: #1A1A2E (gris oscuro)
- `coro-light`: #F5F0E8 (crema)
