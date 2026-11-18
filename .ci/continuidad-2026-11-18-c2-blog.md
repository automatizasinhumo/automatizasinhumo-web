# Continuidad C2 — 2026-11-18

- Rama: `copilot/c2-blog`; push solo a `origin`.
- Cambios: vistas y utilidades de blog adaptadas de ScrewFast, tres artículos, cinco páginas sectoriales y rutas nuevas en el sitemap. Cada fichero copiado lleva la atribución solicitada; la licencia MIT está en `licenses/ScrewFast-MIT.txt`.
- Precios: las páginas sectoriales leen el producto activo de D1 con la moneda y el formateador del catálogo; las demos salen de `src/data/demos-producto.json`.
- Verificaciones: `npx astro build` pasó; `npm run check` terminó con 0 errores y 3 hints en ficheros ajenos al cambio; las pruebas dirigidas pasaron (8/8). Se comprobaron títulos/descripciones únicos, los 5 sectores, las 3 entradas en sitemap y las rutas compiladas.
- Fallos y límites: el primer Vitest no arrancó porque faltaban dependencias; `npm ci` las restauró. `npm ci` informó de 16 vulnerabilidades altas en el árbol, no modificadas en esta tarea. La vista local redirigió a `/admin/setup`, por lo que no se pudo hacer una captura útil; no se completó el setup local.
- Pendiente: checks remotos de análisis de la PR en estado `pending`; revisión visual cuando haya un almacén local configurado.
- PR: [#19](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/19), «C2: blog y páginas por sector (adaptado de ScrewFast)».
- Referencia de código: [ScrewFast](https://github.com/mearashadowfax/ScrewFast), licencia MIT.

## Seguimiento SonarCloud y CodeRabbit — 2026-11-18

- Cambios: datos de sectores movidos a `src/data/sectores.json`; colección del blog configurada con `glob`; productos ausentes o inactivos omitidos; enlaces de artículos condicionados a la actividad del producto; correcciones de encabezados, copyright, 404, canonical y sitemap. El frontmatter de pruebas se analiza con `yaml`, ya presente en `package-lock.json`.
- Verificaciones: pruebas afectadas (3 ficheros, 11/11); `npm run check` (0 errores, 0 advertencias y 3 sugerencias en ficheros ajenos); `npx astro build`; Worker compilado con D1 local migrada y sembrada. El Worker mostró 3 tarjetas en `/blog`, artículo 200, las tres URL del blog una vez en `/sitemap.xml`, 404/no-store, canonical sin barra y los fallbacks de producto/sector inactivo.
- D1 local: `seed.sql` no marca `setup_complete`; se activó solo en la base aislada de prueba para evitar la redirección. Wrangler se cerró y el estado temporal se eliminó.
- Fallos: una aserción intermedia esperaba `private, no-store` en vez del `no-store` efectivo; se ajustó y las verificaciones finales pasaron.
- Pendiente: checks remotos tras el push; los hilos de CodeRabbit quedan abiertos para resolución manual.
- PR: [#19](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/19).
