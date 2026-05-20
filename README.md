# Los Aldeanos — Archivo Digital y Museo Virtual

Sitio fan **no oficial** dedicado al legado público de **Los Aldeanos** (Al2 El Aldeano y El B). Archivo digital, timeline, discografía, letras, multimedia y comunidad — bilingüe (ES/EN).

> **Disclaimer:** No representamos a los artistas. Todos los enlaces dirigen a contenidos originales en plataformas de terceros.

## Stack (2026)

- **Next.js 16** (App Router, React 19, Turbopack, PPR `cacheComponents`)
- **TypeScript** (strict)
- **Tailwind CSS 4** + **shadcn/ui** + **Radix UI**
- **Framer Motion** + **GSAP-ready** + **Lenis** smooth scroll
- **React Three Fiber** — partículas y vinilo 3D en el hero
- **Embla Carousel** — carruseles de releases, videos y testimonios
- Contenido estático: **JSON + MDX** (`/content`)
- **Vercel** ready · SEO: Metadata API, sitemap, robots, JSON-LD

## Experiencia Museo Virtual

| Sección | Interactividad |
|---------|----------------|
| **Hero** | Partículas 3D, glitch en hover, botón La Aldea con ripple + sonido sutil |
| **Timeline** | Drag horizontal, scrubber, filtros Juntos/Al2/El B, panel detalle |
| **Discografía** | Grid + búsqueda, modal con vinilo girando y preview YouTube |
| **Multimedia** | Carrusel video hover-autoplay, galería masonry + lightbox |
| **Legado** | Mapa de nodos, flip cards de frases, testimonios carrusel |
| **UX global** | Loading screen, barra de lectura, back-to-top, dark/light toggle |

## Inicio rápido

```bash
git clone https://github.com/imrulo/losaldeanos.git
cd losaldeanos
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) → redirige a `/es`.

## Scripts

| Comando       | Descripción              |
|---------------|--------------------------|
| `pnpm dev`    | Desarrollo (Turbopack)   |
| `pnpm build`  | Build de producción      |
| `pnpm start`  | Servidor producción      |
| `pnpm lint`   | ESLint                   |

## Estructura del proyecto

```
src/
  app/[locale]/     # Rutas es | en
  components/       # UI, layout, home, etc.
  lib/              # i18n, content, SEO, search
content/
  es/ en/           # JSON + MDX
```

Ver **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** para añadir álbumes, timeline, letras y MDX.

## Rutas

| Ruta | Contenido |
|------|-----------|
| `/es`, `/en` | Homepage |
| `/[locale]/historia` | Timeline + biografías |
| `/[locale]/discografia` | Álbumes con filtros |
| `/[locale]/multimedia` | YouTube + galería |
| `/[locale]/letras` | Letras icónicas |
| `/[locale]/legado` | Impacto + testimonios |
| `/[locale]/comunidad` | Enlaces + formulario |
| `/[locale]/sobre` | Disclaimer y guía |

## Deploy en Vercel

1. Importa el repo en [vercel.com](https://vercel.com).
2. Framework: **Next.js** (auto-detectado).
3. Variables de entorno:
   - `NEXT_PUBLIC_SITE_URL=https://losaldeanos.com`
4. Deploy.

## Dominio custom en Cloudflare

1. En **Vercel** → Project → Settings → Domains → añade `losaldeanos.com` y `www`.
2. En **Cloudflare** DNS (sitio del dominio):
   - `CNAME` `@` → `cname.vercel-dns.com` (o el target que indique Vercel)
   - `CNAME` `www` → `cname.vercel-dns.com`
3. SSL/TLS: **Full (strict)**.
4. Redirect opcional `www` → apex en Cloudflare Rules o Vercel redirects.
5. `vercel.json` ya incluye headers de seguridad y caché para fuentes.

## Paleta de diseño

| Color | Hex | Uso |
|-------|-----|-----|
| Negro profundo | `#0A0A0A` | Fondo |
| Rojo cubano | `#C8102E` | Acento / energía |
| Dorado | `#F4A261` | Highlights legado |
| Verde calma | `#2A9D8F` | Reflexión |

## Escalar CMS

El proyecto está preparado para:

- **Sanity / Contentful** — reemplazar `content-data.ts` por fetch en build
- **Vercel KV** — newsletter y testimonios moderados
- Mantener MDX/JSON para flujo git-based sin CMS

## Créditos

- **Archivo Digital por [imrulo.eth](https://github.com/imrulo)**
- Hecho con amor para la comunidad aldeana ❤️
- © Obras: sus creadores originales

## Licencia

Código del sitio: MIT. Contenido musical y artístico: derechos de Los Aldeanos / sus sellos y plataformas.
