# Mundo Mágico · Landing de fans de Harry Potter

Landing en Next.js (App Router) + TypeScript, en español, con tema oscuro y paleta granate / dorado / azul medianoche.
Sitio de fans no oficial.

## Empezar

```bash
npm install
cp .env.example .env.local   # y pon tu dominio real en NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

## Producción y auditorías

```bash
npm run build
npm start
```

Corre Lighthouse contra `npm start` (no contra `dev`) y usa tu dominio real con HTTPS para SEO Site Checkup.

## Estructura

```
src/
  app/          layout, page, robots, sitemap, manifest, icon y globals.css
  components/   secciones de la página y utilidades (JsonLd, RevealItem)
  data/         contenido tipado (libros, películas, casas, FAQ)
  lib/          configuración del sitio (URL, textos SEO)
  assets/       logo.png (se optimiza con next/image)
public/
  og.png        imagen para Open Graph y Twitter
```

## SEO incluido

- Metadata API: title, description, canonical, Open Graph, Twitter Cards y robots.
- JSON-LD: WebSite, WebPage y FAQPage generados desde `src/data/content.ts`.
- `robots.txt`, `sitemap.xml` y `manifest.webmanifest` generados por Next.
- Un solo `h1`, secciones semánticas, enlace "saltar al contenido" y foco visible.
- Sin fuentes externas ni librerías extra: solo fuentes del sistema y CSS propio.

## Pendiente por tu parte

- Cambiar `NEXT_PUBLIC_SITE_URL` por tu dominio real.
- Optimizar `src/assets/logo.png` y `public/og.png` si quieres bajar su peso (idealmente `og.png` a 1200×630).
