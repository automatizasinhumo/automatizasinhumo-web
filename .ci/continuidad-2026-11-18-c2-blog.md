# Continuidad C2 — 2026-11-18

- Rama: `copilot/c2-blog`; push solo a `origin`.
- Cambios: vistas y utilidades de blog adaptadas de ScrewFast, tres artículos, cinco páginas sectoriales y rutas nuevas en el sitemap. Cada fichero copiado lleva la atribución solicitada; la licencia MIT está en `licenses/ScrewFast-MIT.txt`.
- Precios: las páginas sectoriales leen el producto activo de D1 con la moneda y el formateador del catálogo; las demos salen de `src/data/demos-producto.json`.
- Verificaciones: `npx astro build` pasó; `npm run check` terminó con 0 errores y 3 hints en ficheros ajenos al cambio; las pruebas dirigidas pasaron (8/8). Se comprobaron títulos/descripciones únicos, los 5 sectores, las 3 entradas en sitemap y las rutas compiladas.
- Fallos y límites: el primer Vitest no arrancó porque faltaban dependencias; `npm ci` las restauró. `npm ci` informó de 16 vulnerabilidades altas en el árbol, no modificadas en esta tarea. La vista local redirigió a `/admin/setup`, por lo que no se pudo hacer una captura útil; no se completó el setup local.
- Pendiente: checks remotos de análisis de la PR en estado `pending`; revisión visual cuando haya un almacén local configurado.
- PR: [#19](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/19), «C2: blog y páginas por sector (adaptado de ScrewFast)».
- Referencia de código: [ScrewFast](https://github.com/mearashadowfax/ScrewFast), licencia MIT.
