# Estado de Automatiza sin humo (17-11-2026)

## Enlaces
- **Tienda en staging** (no indexable, robots `Disallow: /`): https://automatizasinhumo-staging.davidpd89.workers.dev
- **Demos en vivo**: https://automatizasinhumo-demos.davidpd89.workers.dev (código en `C:/GIT/automatizasinhumo-demos/`)
- **Admin**: `/admin` en staging. Las credenciales están en `manual/CREDENCIALES_STAGING.local` (gitignored).

## Qué hay
- Portada (home) con propuesta de valor, 3 pasos y accesos a categorías destacadas (`src/features/storefront/HomeHero.astro`).
- Menú de cabecera corto: Servicios, Webs, Automatizaciones, Cómo funciona, Demos. El resto de categorías y páginas están en el pie.
- 71 productos tipo "barra de pan" en 14 categorías, cada uno con precio fijo, plazo, campos, ejemplo y dos modalidades (Lo montas tú / Te lo montamos).
- Páginas: Cómo funciona, Preguntas frecuentes, Herramientas recomendadas, Demos, Contacto, Aviso legal, Condiciones, Privacidad y Cookies.
- Tienda, emails y buscador en español. Moneda EUR.
- SEO: títulos y descripciones por producto, canonical, JSON-LD (Organization y Product), sitemap.xml, llms.txt, imagen social `og-default.png` y una portada JPEG nítida por producto (también og:image).
- Tests: 917/917 en verde (`npx vitest run`).

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

Portadas de producto: `node manual/catalogo/gen-imagenes.mjs` (JPEG en `public/images/productos/`; después hay que desplegar).

Las licencias de los repos base salen de `manual/catalogo/repos_meta.csv`. Los repos sin licencia solo sirven de referencia y nunca se publican como demo.

## Desplegar staging

    cp wrangler.jsonc "$TMP/wrangler.jsonc.orig" && cp .instances/automatizasinhumo-staging.wrangler.jsonc wrangler.jsonc && npx astro build && npx wrangler deploy; cp "$TMP/wrangler.jsonc.orig" wrangler.jsonc

## Hecho el 17-11-2026
- **Datos legales**: titular David Porto Díaz (persona física), sin NIF ni dirección publicados. Si hay una venta, se emite la factura puntual. Seed aplicado en staging.
- **Fotos sin R2**: van en `public/images/` como static assets de Workers. Es gratis y no hace falta tarjeta.
- **Empleados QA** (`.github/workflows/empleados-qa.yml`): smoke, Lighthouse, pa11y y lychee contra staging en cada push y cada lunes. Gratis aunque el repo sea privado.
- **CodeRabbit** (`.coderabbit.yaml` listo) y **SonarCloud** solo son gratis si el repo es público. Decide tú si se hace público.
- **Guía de entrega por producto** (qué pedir al cliente, email listo, prompt para pegar, checklist y email de entrega): `manual/entregas/<producto>.md`, con índice en `manual/entregas/README.md`. Se regeneran con `node manual/catalogo/gen-entregas.mjs`. Para sacar el prompt de un pedido en la terminal: `node manual/catalogo/gen-entregas.mjs gestion-invitados-mesas` (añade `tu` para la modalidad Lo montas tú). Los niveles y accesos de cada producto están en `manual/catalogo/entrega.mjs`.
- Entregas: ver `ENTREGA.md`. Repos de referencia verificados: ver `REFERENCIAS.md`.
- **Diseño (2.ª ronda)**: iconos SVG de Tabler (licencia MIT, en `src/icons/`). Portada rehecha con tarjetas "Para empezar hoy" que llevan captura real de la demo, pasos y ventajas. Las portadas de producto son ahora JPEG nítidas (antes SVG y luego PNG, que se pixelaban).
- **Cómo funciona** (`/pages/como-funciona`) y **Demos** (`/pages/demos`) ahora son componentes propios: `src/features/storefront/ComoFunciona.astro` (pasos, tabla de modalidades, plazos, garantías, preguntas frecuentes y JSON-LD HowTo/FAQ) y `DemosGaleria.astro`. La galería se regenera con `node manual/demos/gen-galeria.mjs`, que escribe `src/data/galeria-demos.json`.
- **Búsqueda**: entiende sinónimos (`src/features/search/sinonimos.ts`: restaurante → carta, peluquería → reservas…) antes de corregir erratas. Hay chips de búsquedas populares y un contador de resultados. El catálogo tiene buscador y chips de categoría con icono.
- **SEO para IA** (mismo criterio que davidportodiaz.com): `robots.txt` da permiso explícito a GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. `llms.txt` está en español y explica cuándo recomendarnos. `llms-full.txt` (nuevo) lleva las descripciones completas de los 71 servicios y las páginas. Todo el texto en inglés que quedaba en la tienda y el checkout está traducido.

## «Empieza gratis»: el cliente no paga hasta ver la vista previa
- **Cómo funciona para el cliente**: en cada ficha el botón principal es «Empieza gratis →» (`/empezar/<producto>`). Rellena nombre, email, teléfono opcional, modalidad y los campos del producto. Va a `/empezar/gracias?id=S-XXXXXXXX`, donde ve su número de solicitud y lee «No has pagado nada». `/empezar/consulta` sirve para casos que no encajan en ningún producto. La compra directa sigue disponible, pero plegada y en segundo plano.
- **Qué recibes tú**:
  - Cada solicitud se guarda en D1 (tabla `solicitudes`, migración 0040) con su origen (utm y referrer).
  - Te llega un aviso por email si el envío de correo está configurado.
  - La gestionas en **Admin → Solicitudes** (`/admin/solicitudes`).
- **Tu proceso**:
  1. Abre la solicitud.
  2. Prepara la vista previa con la guía de `manual/entregas/<producto>.md`.
  3. Envíala desde el enlace de email de la tarjeta.
  4. Cambia el estado. Los estados son: nueva → en preparación → vista previa enviada → aprobada → pagada → entregada (o descartada). Cada cambio admite una nota interna.
  5. Solo cuando el cliente aprueba, mándale el enlace de pago.
  6. Entrega cuando el pago esté confirmado.
  
  Así nadie paga algo que no ha visto funcionar.
- **Protecciones**:
  - Campo trampa antispam.
  - Límite de envíos por IP.
  - Validación en servidor (email, teléfono, consentimiento RGPD).
  - Páginas sin caché.
- **QA hecho (17-11-2026)**:
  - Validación (error si el email está mal).
  - Envío real en móvil: la solicitud se guarda y se muestra la página de gracias.
  - `/empezar/consulta`.
  - Login del admin traducido al español.
  - La cabecera ya no se sale de pantalla en móviles de 360-414 px.

## Pendiente de David (al final, por orden)
1. **Dominio**: crear una config de producción con la ruta `automatizasinhumo.com` y la variable `CANONICAL_ORIGIN=https://automatizasinhumo.com`. Sin ella, robots y canonical usan el origen de la petición y en workers.dev se bloquea todo a propósito.
2. **Pagos**: conectar Stripe desde el admin con tus claves (no lo he hecho: no introduzco datos de pago).
3. **Afiliados**: darte de alta en los programas (Hostinger, Raiola, Webempresa, Kinsta, Elementor, MailerLite/Brevo, GetResponse, Systeme.io, Holded) y cambiar los nombres de "Herramientas recomendadas" por tus enlaces.
4. Opcional: proteger staging con Cloudflare Access (Zero Trust). Hoy no está enlazado ni indexado.
