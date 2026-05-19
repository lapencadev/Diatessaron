# Guía de mantenimiento — Coro Diatessaron Web

## Desarrollo local

```bash
cd web
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist
npm run preview   # previsualiza el build estático
```

---

## Actualizar contenido

### Conciertos · `src/components/Conciertos.astro`

Edita el objeto `programa` al principio del archivo:

```js
const programa = {
  titulo: 'NOMBRE DEL PROGRAMA',
  subtitulo: 'Subtítulo',
  descripcion: 'Descripción del programa...',
  director: 'Nombre Apellidos',
  cartelPrincipal: '/images/carteles/nombre-cartel.jpg',
  fechas: [
    {
      fechaISO: 'YYYY-MM-DD',   // formato exacto para el archivado automático
      fechaTexto: 'Sáb 30 de mayo',
      hora: '20:00 h',          // null si no hay hora confirmada
      lugar: 'Nombre del lugar',
      ciudad: 'Ciudad',
      entradas: 'https://...',  // null si la entrada es libre
    },
  ],
};
```

> Las fechas pasadas se marcan automáticamente en gris. Cuando todas hayan pasado, la sección muestra "Próximamente".

Para añadir el cartel: copia el archivo a `public/images/carteles/` y actualiza `cartelPrincipal`.

---

### Historial de programas · `src/components/Timeline.astro`

Edita el array `entradas`. Cada entrada tiene esta forma:

```js
{
  año: 2024,
  titulo: 'NOMBRE DEL PROGRAMA',
  descripcion: 'Descripción breve.',
  destacado: false,   // true para años especiales (fundación, aniversarios, premios)
  dossier: null,      // o ruta a un PDF: '/dossiers/programa-2024.pdf'
},
```

---

### Vídeos · `src/components/Videos.astro`

Edita el array `videos` — solo necesitas el ID del vídeo de YouTube:

```js
{ id: 'YOUTUBE_VIDEO_ID', titulo: 'Título del vídeo' }
```

El ID es la parte final de la URL: `youtube.com/watch?v=`**`ESTE_ES_EL_ID`**

---

### Galería · `src/components/Galeria.astro`

1. Copia las fotos a `public/images/galeria/`
2. Añade las rutas en el array `fotos`:

```js
{ src: '/images/galeria/nombre.jpg', alt: 'Descripción de la foto' }
```

---

### Redes sociales · `src/components/RedesSociales.astro`

Actualiza los enlaces e iconos si cambian los perfiles.

---

## Estructura de archivos

```
web/
├── public/
│   ├── logo.png
│   └── images/
│       ├── galeria/        ← fotos de la galería
│       └── carteles/       ← carteles de conciertos
└── src/
    ├── components/         ← un archivo por sección
    ├── layouts/
    │   └── Layout.astro    ← HTML base, SEO, fuentes
    ├── pages/
    │   └── index.astro     ← monta todas las secciones
    └── styles/
        └── global.css      ← colores, animaciones, utilidades
```

---

## Paleta de colores

| Variable Tailwind | Hex | Uso |
|---|---|---|
| `coro-gold` | `#C9A84C` | Dorado — títulos, acentos |
| `coro-dark` | `#0D0D0D` | Negro — fondo principal |
| `coro-gray` | `#1A1A2E` | Gris oscuro — fondo secciones alternas |
| `coro-light` | `#F5F0E8` | Crema — texto |

---

## Variables de entorno

Copia `.env.example` a `.env` y rellena los valores antes de desarrollar en local.  
En producción se configuran en **Netlify → Site configuration → Environment variables**.

| Variable | Descripción |
|---|---|
| `PUBLIC_EMAILJS_SERVICE_ID` | ID del servicio de EmailJS |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | ID de la plantilla de EmailJS |
| `PUBLIC_EMAILJS_PUBLIC_KEY` | Clave pública de EmailJS |

---

## Despliegue

El sitio se despliega automáticamente en Netlify cuando se hace push a `main`.

El formulario de contacto guarda cada envío en **Netlify → Forms** y manda una notificación por email a **corodiatessaron.rrss@gmail.com** mediante EmailJS.
