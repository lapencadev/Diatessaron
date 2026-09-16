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

Edita el array `conciertos` al principio del archivo. Cada entrada tiene esta forma:

```js
const conciertos = [
  {
    fechaISO: 'YYYY-MM-DD',     // formato exacto para el archivado automático
    fechaTexto: 'Sáb 30 de mayo',
    hora: '20:00 h',             // null si no hay hora confirmada
    lugar: 'Nombre del lugar',
    ciudad: 'Ciudad',
    entradas: 'https://...',     // null si la entrada es libre
    cartel: '/images/carteles/nombre-cartel.jpg',  // null si no hay cartel
  },
];
```

> Las fechas pasadas se marcan automáticamente en gris. Cuando todas hayan pasado, la sección muestra "Próximamente".

Para añadir un cartel: copia el archivo a `public/images/carteles/` y actualiza el campo `cartel`.

---

### Historial de programas · `src/components/Timeline.astro`

Edita el array `años`. Cada entrada tiene esta forma:

```js
{
  año: 2024,
  destacado: false,   // true para años especiales (fundación, aniversarios, premios)
  programa: {
    titulo: 'Nombre del programa',
    subtitulo: null,                  // o texto como '15º Aniversario' o la traducción del título
    fecha: 'Abril - Noviembre 2024',  // mes o rango de meses (null si se desconoce)
    lugar: 'Lugar 1 · Lugar 2',
    descripcion: 'Descripción breve.',
    video: null,                      // o URL completa de YouTube
    cartel: null,                     // o ruta a la imagen del cartel: '/images/carteles/programa-2024.jpg'
    dossier: null,                    // o ruta a un PDF: '/dossiers/programa-2024.pdf'
  },
  otros: [
    // premios, certámenes, colaboraciones y otros eventos del año (puede ser un array vacío)
    {
      tipo: 'premio',       // ver tipos disponibles abajo
      titulo: 'Título del evento',
      subtitulo: null,
      fecha: 'Noviembre 2024',
      lugar: 'Lugar',       // se muestra junto a la fecha al desplegar el año
      descripcion: 'Descripción breve.',
      video: null,
      dossier: null,
    },
  ],
},
```

**Cartel del programa principal:** solo el `programa` de cada año admite `cartel` (los eventos de `otros` no) — copia la imagen a `public/images/carteles/` y añade la ruta. Aparece como botón «Cartel» junto a «Vídeo» y «Dossier» al desplegar el año.

**Tipos de evento** (campo `tipo` de `otros`):

| Tipo | Icono | Uso |
|---|---|---|
| `premio` | ★ | Galardones obtenidos |
| `certamen` | ✦ | Participación en certámenes sin premio (finalista, invitados…) |
| `colaboracion` | ♦ | Conciertos junto a otras agrupaciones u orquestas |
| `intercambio` | ⇄ | Intercambios corales |
| `concierto` | ● | Otros conciertos y encuentros |

**Criterios de redacción** (fijados por el director):
- Su nombre siempre como **Tomeu Quetgles-Roca** (nombre artístico, con guion).
- Los títulos de programas en redonda, nunca en mayúsculas completas («Ver Sacrvm», no «VER SACRVM»).
- Los aniversarios del coro se cuentan desde el **primer concierto (marzo de 2011)**, no desde la fundación (2010).

---

### Vídeos · `src/components/Videos.astro`

La sección muestra un **reproductor destacado** y una **tira de miniaturas** deslizable. El vídeo de YouTube solo se carga cuando el visitante pulsa play — la página solo descarga miniaturas, así que se pueden añadir vídeos sin miedo a que pese.

Edita el array `videos`:

```js
{
  id: 'YOUTUBE_VIDEO_ID',
  titulo: 'Compositor: Obra',
  descripcion: 'Programa, lugar y fecha.',  // sin repetir el nombre del coro
}
```

- El ID es la parte final de la URL: `youtube.com/watch?v=`**`ESTE_ES_EL_ID`**
- El **primer vídeo** del array es el que aparece destacado al cargar la página.
- El orden de la lista es el de la tira: **de más reciente a más antiguo** (por fecha de concierto).
- Las miniaturas se obtienen automáticamente de YouTube; no hay que subir imágenes.
- Si el vídeo corresponde a un concierto del historial, enlázalo también en el campo `video` de esa entrada en `Timeline.astro` (aparecerá el botón «▶ Vídeo» al desplegar el año).

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

### Sobre nosotros · `src/components/SobreNosotros.astro`

El texto descriptivo del coro está escrito directamente en el HTML del componente.

**Fotos de las cuerdas (opcional):** aparecen debajo de las estadísticas solo si el array `cuerdas` tiene contenido — mientras esté vacío, ese bloque no se muestra.

1. Copia las fotos a `public/images/cuerdas/`
2. Añade cada una al array `cuerdas`:

```js
{ src: '/images/cuerdas/sopranos.jpg', label: 'Sopranos' }
```

---

### Formulario de contacto · `src/components/Contacto.astro`

Cada envío hace dos cosas: se guarda en **Netlify → Forms** y dispara una notificación por email vía **EmailJS**.

**Cambiar el correo de destino** 
- Notificación por email: [dashboard.emailjs.com](https://dashboard.emailjs.com) → Email Templates → plantilla → **Settings → «To Email»**.
- Si hay notificación también en Netlify: Site configuration → Forms → Form notifications.

**Protección antispam**:
- Campo *honeypot* oculto (`bot-field`): los bots que lo rellenan son descartados tanto por Netlify como por el script antes de llamar a EmailJS.
- Filtro Akismet automático de Netlify Forms.
- Longitud máxima en los campos (nombre 100, email 150, mensaje 3000 caracteres).
- Panel de EmailJS → Security, restringidos los envíos al dominio de la web.

Futuro refuerzo: reCAPTCHA de Netlify (`data-netlify-recaptcha`).

---

## Estructura de archivos

```
web/
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   └── images/
│       ├── galeria/        ← fotos de la galería
│       ├── carteles/       ← carteles de conciertos
│       └── rrss.jpg        ← imagen Open Graph / redes sociales
└── src/
    ├── components/         ← un archivo por sección
    ├── layouts/
    │   └── Layout.astro    ← HTML base, SEO, fuentes, Open Graph
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

## Despliegue - [![Netlify Status](https://api.netlify.com/api/v1/badges/f9a94b71-ee91-4de9-957d-f3c14b3b831d/deploy-status)](https://app.netlify.com/projects/corodiatessaron/deploys)

El sitio se despliega automáticamente en Netlify cuando se hace push a `main`.

El formulario de contacto guarda cada envío en **Netlify → Forms** y manda una notificación por email mediante EmailJS.
