# Repos públicos de referencia (verificados el 17-11-2026 con `gh api`)

ChatGPT propuso la lista. De cada repo se comprobó la licencia, el último push y si está archivado. Solo se copian ficheros estáticos o patrones; nunca se ejecuta código de estos repos. Si se copia código MIT/Apache, se conserva su aviso de licencia.

| Repo | Licencia | Último push | Qué tomar |
|---|---|---|---|
| fulldotdev/ui | MIT | 2026-11 | Bloques Astro nativos: secciones, precios, tipografía. **Primera fuente para el rediseño de la portada.** |
| konstantinWDK/astro-components | MIT | 2026-11 | Hero, bento grid, tabla de precios, testimonios, CTA y FAQ como secciones completas |
| bejamas/ui | MIT | 2026-11 | Botones, tarjetas y diálogos estilo shadcn sin JS |
| hfournier/astro-components | MIT | 2026-11 | Patrones de teclado y foco, y pruebas con axe (0 estrellas: úsalo solo como idea) |
| njbSaab/astro-njx-store | MIT | 2026-09 | Catálogo con el contenido comercial en config: se parece a nuestro `catalogo.mjs` |
| digity-studio/astro-medusa-starter | MIT | 2026-10 | Ficha de producto, carrito y confirmación de pedido |
| jonasmerlin/astro-seo | MIT | 2026-08 | Lista de metas (canonical, OG, Twitter): sirve para revisar nuestro Layout |
| GoogleChrome/web-vitals | Apache-2.0 | 2026-11 | Medir LCP, INP y CLS reales (con el beacon de Cloudflare Web Analytics, gratis) |
| fauziralpiandi/astrogent | MIT | 2025-10 | Bloque de "pasos del proceso" para la página Cómo funciona |
| rampstackco/saas-landing-theme | MIT | 2026-08 | Contraste y tokens de una landing comercial |
| themesberg/landwind | MIT | 2024-08 (parado) | Solo la estructura de conversión: logos → beneficios → precios → FAQ → CTA |
| ascorbic/unpic-img | **sin licencia en la API** | — | Solo referencia |
| northsoon-studio/phosphor-icons-astro | **NOASSERTION** | — | Solo referencia. Para iconos usa directamente Phosphor (MIT) |

## Ya cubierto en la tienda

- JSON-LD `Product` + `Offer` en cada ficha y `Organization` en el layout.
- Sitemap, robots, llms.txt y OG por defecto.
- Lighthouse, pa11y y lychee corren en CI (`.github/workflows/empleados-qa.yml`).

## Siguiente mejora de diseño propuesta

1. Portada con la secuencia de landwind (beneficios → 3 productos de nivel A → cómo funciona en 3 pasos → FAQ corta → CTA), maquetada con bloques de fulldotdev/ui.
2. Tabla comparativa "Lo montas tú / Te lo montamos" en la ficha, a partir de la tabla de precios de konstantinWDK.
3. No merece la pena añadir FAQPage JSON-LD: Google casi no muestra ya esos resultados enriquecidos.
