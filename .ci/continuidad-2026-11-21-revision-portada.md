# Continuidad 21/11/2026: revisión de la portada (sin cambios de código)

## Hecho
- Capturas de https://automatizasinhumo-limpio.davidpd89.workers.dev a 1440 y 390 px: sin desbordes ni errores de consola. «Así funciona» en móvil se ve bien (el hueco en la captura completa era del scroll-driven).
- Medición en 6 páginas: el h1 y el ritmo vertical no son homogéneos (ver abajo).
- Consulta a GPT (High, búsqueda web): .ci/gpt-revision-portada-2026-11-21.md. GPT no pudo abrir la web; sus observaciones parten de mi descripción.

## Hallazgos medidos
- h1: 72 px/73 (/servicios), 48 px/60 (/elige, /blog, /servicios/web), 48 px/48 (/products). Portada: h1 de 16 px con spans escalados.
- Padding de sección: 0, 36, 52, 56, 104 px según página.
- 22-29 enlaces/botones por página con menos de 32 px de alto (pie sobre todo).
- «Así funciona» sin titular (eyebrow de 12 px). Botón «Contacto» tapa texto en móvil. Demo del hero en inglés.

## Pendiente
- Plan en PR pequeñas: (1) tokens semánticos + Seccion con eyebrow/titular/lead; (2) hero móvil con CTA en primera pantalla; (3) servicios con precio desde catálogo + galería de demos; (4) FAQ + garantías; (5) pie agrupado; (6) tests de contrato (desbordes 5 anchos, táctil, alineación) y lint de tokens solo en componentes nuevos.
- Decisión de David: orden y si se aprueba la portada más larga (~3000-3600 px).
