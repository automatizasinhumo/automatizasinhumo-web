# Estado de Automatiza sin humo (17-11-2026)

## Enlaces
- **Tienda en staging** (no indexable, robots `Disallow: /`): https://automatizasinhumo-staging.davidpd89.workers.dev
- **Demos en vivo**: https://automatizasinhumo-demos.davidpd89.workers.dev (código en `C:/GIT/automatizasinhumo-demos/`)
- **Admin**: `/admin` en staging. Las credenciales están en `manual/CREDENCIALES_STAGING.local` (gitignored).

## Qué hay
- Portada (home) con propuesta de valor, 3 pasos y accesos a categorías destacadas (`src/features/storefront/HomeHero.astro`).
- 71 productos tipo "barra de pan" en 14 categorías (pestañas del menú), cada uno con precio fijo, plazo, campos, ejemplo y dos modalidades (Lo montas tú / Te lo montamos).
- Páginas: Cómo funciona, Preguntas frecuentes, Herramientas recomendadas, Demos, Contacto, Aviso legal, Condiciones, Privacidad y Cookies.
- Tienda, emails y buscador en español. Moneda EUR.
- SEO: títulos y descripciones por producto, canonical, JSON-LD (Organization y Product), sitemap.xml, llms.txt, imagen social `og-default.png` y una portada PNG por producto (también og:image).
- Tests: 906/906 en verde (`npx vitest run`).

## Marca (aplicada el 17-11-2026)
- Idea: "taller digital contemporáneo, no startup de IA". Paleta: papel #F5F7F4, tinta #172D2D, verde #176B5A, terracota #B34A28 (contrastes AA comprobados).
- Tipos autoalojados (licencia OFL, sin Google Fonts, por el RGPD): Space Grotesk para titulares y logo, IBM Plex Sans para el texto. Están en `public/fonts/`.
- Dónde está cada cosa:
  - Tokens de color, fuente y radio: `src/themes/default/tokens.css`.
  - Texturas y componentes (retícula de puntos `.fondo-tecnico`, `.tarjeta`, `.etiqueta`, botones píldora): `src/styles/overrides.css`.
  - Logo con la "A" en flecha: `src/components/Logo.astro`.
- Favicon, apple-touch-icon y la imagen social `og-default.png` salen de `node manual/catalogo/gen-marca.mjs`.
- La portada muestra un collage de capturas reales de plantillas. Las fichas tienen galería con capturas de sus demos (`public/images/demos/`, que `gen-sql.mjs` enlaza solo si existe el PNG).
- En las 100 plantillas de demos se ha quitado la barra promocional del autor original, como pide la propia plantilla (licencia MIT, se conserva el crédito en el código).

## Fuente del catálogo
`manual/catalogo/catalogo.mjs` → `node manual/catalogo/gen-sql.mjs > manual/catalogo/seed.sql` → aplicar a D1:

    npx wrangler d1 execute automatizasinhumo-staging-db --remote --config .instances/automatizasinhumo-staging.wrangler.jsonc --file manual/catalogo/seed.sql

Portadas de producto: `node manual/catalogo/gen-imagenes.mjs` (SVG + PNG en `public/images/productos/`; después hay que desplegar).

Las licencias de los repos base salen de `manual/catalogo/repos_meta.csv`. Los repos sin licencia solo sirven de referencia y nunca se publican como demo.

## Desplegar staging

    cp wrangler.jsonc "$TMP/wrangler.jsonc.orig" && cp .instances/automatizasinhumo-staging.wrangler.jsonc wrangler.jsonc && npx astro build && npx wrangler deploy; cp "$TMP/wrangler.jsonc.orig" wrangler.jsonc

## Pendiente de David (antes de producción)
1. **Datos legales**: rellenar `[NOMBRE O RAZÓN SOCIAL]`, `[NIF]` y `[DIRECCIÓN]` en aviso legal, condiciones y privacidad (`catalogo.mjs`) y volver a generar y aplicar el seed.
2. **Dominio**: crear una config de producción con la ruta `automatizasinhumo.com` y la variable `CANONICAL_ORIGIN=https://automatizasinhumo.com`. Sin ella, robots y canonical usan el origen de la petición y en workers.dev se bloquea todo a propósito.
3. **Pagos**: conectar Stripe desde el admin con tus claves (no lo he hecho: no introduzco datos de pago).
4. **R2** (subir fotos desde el admin): pulsar tú "Add R2 subscription" en dash.cloudflare.com → R2. Ahora funciona sin R2.
5. **Afiliados**: darte de alta en los programas (Hostinger, Raiola, Webempresa, Kinsta, Elementor, MailerLite/Brevo, GetResponse, Systeme.io, Holded) y cambiar los nombres de "Herramientas recomendadas" por tus enlaces.
6. Opcional: proteger staging con Cloudflare Access (Zero Trust). Hoy no está enlazado ni indexado.
