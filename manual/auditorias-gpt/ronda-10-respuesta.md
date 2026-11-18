<!-- Ronda 10 de GPT (18/11/2026), chat https://chatgpt.com/g/g-p-6afb191fd7e08191a093ea57adc7d51d/c/6afdb0d5-7938-83eb-bd53-6b8e8b3b5a99. Las tareas C12-C16 adoptadas están en manual/equipo/copilot.md (C13 ajustada para no repetir C11). -->

# **Ronda 10 — Auditoría SEO y conversión**

**Fecha:** 18 de noviembre de 2026
**Proyecto:** [davidpd89/automatizasinhumo-web](https://github.com/davidpd89/automatizasinhumo-web), rama `main`.

## **1. Alcance y diagnóstico**

**Resultado principal:** la tienda ya tiene una base SEO técnica razonable, pero todavía necesita convertir su catálogo en respuestas concretas a búsquedas comerciales como «cuánto cuesta una web para mi peluquería». La prioridad es publicar páginas orientadas a esas búsquedas, controlar qué URLs pueden indexarse y comprobar automáticamente que los precios y metadatos publicados son correctos.

**Limitación de la auditoría:** he consultado el repositorio mediante el conector de GitHub y he intentado abrir [staging](https://automatizasinhumo-staging.davidpd89.workers.dev), su `robots.txt` y su `sitemap.xml`. El acceso externo al staging ha fallado. Por tanto, los hallazgos siguientes están **comprobados en el código de** `main`, no mediante una inspección del HTML servido ni una prueba visual real. No atribuyo puntuaciones Lighthouse, tiempos LCP o defectos de móvil que no haya podido medir.

También hay una discrepancia documental:

- [La cola de Copilot](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/equipo/copilot.md) contiene **C1–C6**, todas pendientes; no aparecen C7–C11.
- Está disponible [la respuesta de la ronda 7](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/auditorias-gpt/ronda-07-respuesta.md), pero **las respuestas de las rondas 8 y 9 no están en las rutas indicadas de** `main`. No puedo garantizar que ninguna propuesta coincida con esas dos rondas ausentes.

### **Qué está bien y no debe reconstruirse**

| Elemento | Estado comprobado | Evidencia |
| --- | --- | --- |
| Títulos, descripciones y canonical | Implementados en el layout; las fichas tienen metadatos propios. | [Layout.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/layouts/Layout.astro), [productDetail.ts](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/productDetail.ts) |
| Open Graph y Twitter Cards | Implementados, con imagen social y `og:locale=es_ES`. | [Layout.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/layouts/Layout.astro) |
| Datos estructurados | Existen `Organization`, `Product` con `Offer`, `FAQPage` y `HowTo`. | [Layout.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/layouts/Layout.astro), [productDetail.ts](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/productDetail.ts), [ComoFunciona.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/ComoFunciona.astro) |
| Sitemap y robots | Sitemap dinámico con productos, categorías y páginas publicadas. Staging bloqueado intencionadamente. | [sitemap.xml.ts](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/sitemap.xml.ts), [robots.txt.ts](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/robots.txt.ts) |
| URLs duplicadas | `/product/…` y `/category/…` redirigen con 301; `/products` canoniza hacia `/` cuando procede. | [product/[slug].astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/product/%5Bslug%5D.astro), [products/index.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/products/index.astro) |
| Formulario comercial | Flujo por pasos, precios vinculados al producto, validaciones y alternativa sin JavaScript. | [empezar/[slug].astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/empezar/%5Bslug%5D.astro) |
| Seguimiento de solicitudes | Ya incorpora `X-Robots-Tag: noindex`; no requiere una corrección adicional. | [empezar/estado.astro](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/empezar/estado.astro) |

**Tres decisiones SEO importantes:**

- **No activar la indexación de staging.** En [ESTADO.md](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/ESTADO.md) figura pendiente el dominio de producción y `CANONICAL_ORIGIN=https://automatizasinhumo.com`. El bloqueo de `workers.dev` es correcto.
- **No añadir** `hreflang` **por añadirlo.** Actualmente la tienda está en español (`<html lang="es">`). Solo hace falta `hreflang` cuando existan versiones regionales o lingüísticas alternativas reales. [Referencia: Google](https://developers.google.com/search/docs/specialty/international/localized-versions).
- **No perseguir resultados enriquecidos FAQ/HowTo.** Google retiró los resultados FAQ el **7 de mayo de 2026** y los HowTo en 2023. Las preguntas frecuentes siguen siendo útiles para vender, pero no justifican más inversión técnica en esos formatos. 

## **2. Tabla de hallazgos priorizados**

Las estrellas y fechas de los repositorios se han comprobado mediante GitHub el 18/11/2026. Las fechas corresponden al último commit consultado en su rama principal.

| Hallazgo | Evidencia: URL y observación | Impacto | Repositorio o herramienta que adoptar | Ficheros a tocar | Prueba de aceptación |
| --- | --- | --- | --- | --- | --- |
| **1. Páginas transaccionales potencialmente indexables en producción** | [`/search`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/search.astro) construye títulos a partir de cada consulta. [`/empezar/gracias`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/empezar/gracias.astro) y [`/empezar/[slug]`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/empezar/%5Bslug%5D.astro) usan el layout general. Este solo añade `noindex` automáticamente a `workers.dev`. **Excepción ya correcta:** `/empezar/estado` lleva `X-Robots-Tag: noindex`. | **Alto** | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) · MIT · **1.015 ★** · [27/09/2026](https://github.com/janreges/siteone-crawler/commit/f3d967b190a77ff5f816b7ddab74c1a778d9dbaf). | `src/layouts/Layout.astro`; `src/pages/search.astro`; `src/pages/empezar/[slug].astro`; `src/pages/empezar/gracias.astro`. | En producción, rutas transaccionales `noindex`; fichas, categorías y páginas comerciales indexables. No modificar la protección existente de staging. |
| **2. No hay una comprobación automática de la apertura SEO de producción** | [`robots.txt.ts`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/robots.txt.ts) bloquea correctamente `workers.dev`, pero [`ESTADO.md`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/ESTADO.md) deja pendiente configurar el dominio definitivo y `CANONICAL_ORIGIN`. | **Alto** | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) · MIT · **1.015 ★** · [27/09/2026](https://github.com/janreges/siteone-crawler/commit/f3d967b190a77ff5f816b7ddf74710686)¹. [CLI documentada](https://crawler.siteone.io/configuration/command-line-options/). | `.github/workflows/seo-crawl.yml`; configuración de producción, cuando exista. | Staging: `Disallow: /` y `noindex`. Producción: canonical del dominio real, sitemap del mismo dominio y páginas comerciales rastreables. La CI bloquea una producción `noindex` por error. |
| **3. Falta** `BreadcrumbList`**; la oferta de servicios solo usa** `Product` | [`productDetail.ts`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/productDetail.ts) genera `Product`/`Offer`. No construye `Service` ni `BreadcrumbList`. Google documenta específicamente el marcado de [migas de pan](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb). | **Medio-alto** | [jdevalk/seo-graph](https://github.com/jdevalk/seo-graph) · MIT · **50 ★** · [08/07/2026](https://github.com/jdevalk/seo-graph/commit/c33eb1e120c620970042e28f1332fc90c30125e6). | `src/features/seo/breadcrumbs.ts`; `src/features/seo/schema.ts`; `src/pages/products/[slug].astro`; `src/pages/categories/[slug].astro`. | JSON-LD válido; migas coherentes con navegación real; `Service` describe el trabajo ofertado y `Product` conserva los paquetes comprables y precios correctos. |
| **4. Sitemap sin fechas de modificación ni verificación de canonical** | [`sitemap.xml.ts`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/sitemap.xml.ts) emite `loc`, sin `lastmod`. Las páginas D1 tienen `updated_at`, pero [`listPublishedPages`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/pages/db.ts) no lo devuelve. Google pide fechas **reales**, no la fecha de cada despliegue.  developers.google.com | **Medio-alto** | [ekalinin/sitemap.js](https://github.com/ekalinin/sitemap.js) · MIT · **1.709 ★** · [19/10/2026](https://github.com/ekalinin/sitemap.js/commit/15cce38b75f43119978381c0fcbcf7fd2f5d2fe9). | `src/pages/sitemap.xml.ts`; `src/features/pages/db.ts`; `qa/seo/sitemap.mjs`. | XML válido, URLs únicas, HTTP 200, canonical coincidente. `lastmod` solo donde exista una fecha verificable. |
| **5. Las búsquedas por oficio y precio carecen de una página específica** | La portada utiliza un mensaje generalista y enlaces al catálogo: [`HomeHero.astro`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/HomeHero.astro). No hay rutas `src/pages/webs/[sector].astro` ni `src/pages/blog/` en el árbol consultado. **Ya está encargado en C2: no repetir.** | **Alto** | [ScrewFast](https://github.com/mearashadowfax/ScrewFast) · MIT · **1.441 ★** · [18/11/2026](https://github.com/mearashadowfax/ScrewFast/commit/d95d0272b85984193f838bb258ba91599753c1b3). **Adopción pendiente C2**, no nueva. | Los previstos en [C2](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/equipo/copilot.md): `src/pages/webs/[sector].astro`, `src/pages/blog/` y sitemap. | Cada sector responde a una búsqueda distinta y presenta precio, ejemplo, plazo, límites y CTA que conduce al servicio correspondiente. |
| **6. Los precios destacados en portada están escritos a mano** | [`HomeHero.astro`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/HomeHero.astro) contiene importes fijos —por ejemplo, 149 € y 349 €— y el literal «71 servicios». El catálogo y el formulario consultan precios de D1. No he confirmado una discrepancia actual, pero existe riesgo de desajuste. | **Alto** | [fulldotdev/ui](https://github.com/fulldotdev/ui), ya seleccionado en **C1**. No incorporar otra biblioteca comercial. | `src/features/storefront/HomeHero.astro`; componentes previstos en C1. | Cambiar el precio de un producto en D1 y comprobar que portada, ficha, formulario y marcado `Offer` reflejan el mismo importe sin editar cuatro lugares. |
| **7. Falta prueba social comercial comprobable** | La portada muestra ventajas, demos y garantía, pero no consta un bloque verificable de clientes o proyectos entregados en [`HomeHero.astro`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/HomeHero.astro). Los canales humanos siguen pendientes de configuración según [`ESTADO.md`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/ESTADO.md). | **Alto** | **No adoptar un generador de reseñas.** Reutilizar los componentes comerciales de C1 cuando existan testimonios reales. Una herramienta no puede crear evidencia empresarial auténtica. | `HomeHero.astro`; `src/features/storefront/sections/`, cuando haya casos autorizados. Ajustes de contacto en Admin. | Mostrar una referencia real con permiso o ningún testimonio. Correo/teléfono de contacto operativos; no inventar contadores ni valoraciones. |
| **8. Las categorías comparten descripción SEO genérica** | [`categories/[slug].astro`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/pages/categories/%5Bslug%5D.astro) pasa el título de categoría, pero no una descripción específica al layout. Este recurre a su texto general. | **Medio** | [ScrewFast](https://github.com/mearashadowfax/ScrewFast) · MIT · **1.441 ★** · [18/11/2026](https://github.com/mearashadowfax/ScrewFast/commit/d95d0272b85984193f838bb258ba91599753c1b3). Reutilizar la centralización de metadatos prevista en C2. | `src/pages/categories/[slug].astro`; `src/features/storefront/introCategorias.ts`. | Cinco categorías representativas con descripción distinta, útil y coherente con sus servicios. |
| **9. Velocidad y presentación móvil: resultado no verificable en esta auditoría** | [`HomeHero.astro`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/src/features/storefront/HomeHero.astro) carga varias imágenes iniciales con `loading="eager"`. También declara dimensiones, lo cual es positivo. No he podido ejecutar una medición real del staging. | **Medio, pendiente de medir** | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) · MIT · **1.015 ★** · [27/09/2026](https://github.com/janreges/siteone-crawler/commit/f3d967b190a77ff5f816b7ddab74c1a778d9dbaf). Complementa, no reemplaza, Lighthouse CI. | `.github/workflows/seo-crawl.yml`; `HomeHero.astro` solo si las métricas lo justifican. | Auditoría real a 360 y 1280 px, ausencia de desplazamiento horizontal, imágenes sin errores y comparación con el informe Lighthouse existente. |

¹ El enlace válido al commit de SiteOne es [27/09/2026](https://github.com/janreges/siteone-crawler/commit/f3d967b190a77ff5f816b7ddab74c1a778d9dbaf).

### **Contenido que debe captar búsquedas**

Estas páginas pertenecen a **C2**, no a C12–C16. Lo importante es fijar el enfoque comercial antes de redactarlas.

| Consulta objetivo en España | Página que debe responder | Contenido diferenciador y conversión |
| --- | --- | --- |
| «Cuánto cuesta una web para mi peluquería» | `/webs/peluquerias` | Dos modalidades y precios reales, demo, reservas si están incluidas y botón «Pedir mi vista previa». |
| «Precio web para fontanero» | `/webs/fontaneros` | Contacto telefónico, servicios, zona atendida, ejemplo móvil y precio cerrado. |
| «Página web para restaurante precio» | `/webs/restaurantes` | Comparación entre web, carta QR y reservas; señalar qué se paga por separado. |
| «Web para abogado cuánto cuesta» | `/webs/abogados` | Estructura profesional, contacto, límites de contenido y cumplimiento aplicable, sin prometer posicionamiento. |
| «Página web para fisioterapeuta con citas» | `/webs/fisioterapeutas` | Demo de solicitud/reserva, límites de la herramienta y modalidades. |

No generaría páginas del tipo `/webs/peluquerias/madrid`, `/webs/peluquerias/valencia`, etc., mediante combinaciones automáticas. Solo cuando haya una diferencia local verificable y contenido propio. La documentación de Google prioriza contenido útil y desaconseja las páginas creadas principalmente para captar variantes de búsquedas sin aportar valor: [políticas de spam de Google](https://developers.google.com/search/docs/essentials/spam-policies).

**Sobre** `LocalBusiness`**:** no lo añadiría ahora. El negocio que vende las webs es Automatiza Sin Humo; sus clientes potenciales no se convierten en sucursales de la tienda. Para las fichas, `Organization` y `Service` tienen más sentido. Google requiere una dirección física real para su formato `LocalBusiness`, que no debe inventarse. 

## **3. Empleados SEO nuevos para GitHub Actions**

Los ejecutores estándar de GitHub Actions son gratuitos en repositorios públicos. 

| Empleado | Herramienta verificada | Qué hace | Integración exacta | Condición o límite |
| --- | --- | --- | --- | --- |
| **SEO Crawl Gate** | [SiteOne Crawler](https://github.com/janreges/siteone-crawler) · MIT · 1.015 ★ · [27/09/2026](https://github.com/janreges/siteone-crawler/commit/f3d967b190a77ff5f816b7ddab74c1a778d9dbaf) | Rastreo SEO: títulos, OG, canonical, errores, recursos, robots y regresiones. | Descargar el binario Linux de sus [releases](https://github.com/janreges/siteone-crawler/releases); ejecutar `--url=... --ci --ci-min-seo=... --ci-junit-file=...` en `.github/workflows/seo-crawl.yml`. En staging usar `--ignore-robots-txt` **solo para las comprobaciones internas**. [Parámetros oficiales](https://crawler.siteone.io/configuration/command-line-options/). | No tratar el `noindex` intencionado de staging como un defecto de producción. No sustituye las métricas reales de usuarios. |
| **JSON-LD Inspector** | [jdevalk/seo-graph](https://github.com/jdevalk/seo-graph) · MIT · 50 ★ · [08/07/2026](https://github.com/jdevalk/seo-graph/commit/c33eb1e120c620970042e28f1332fc90c30125e6) | Detecta JSON inválido, entidades sin tipo y discrepancias estructurales. | Adoptar el CLI documentado en [`packages/seo-graph-scanner/README.md`](https://github.com/jdevalk/seo-graph/blob/main/packages/seo-graph-scanner/README.md): `npx seo-graph-scan <sitemap> --no-recommend --json`, con informe en Actions. | El autor lo identifica como **prototipo**. No comprueba todos los requisitos de Google por tipo. Inicialmente informativo; bloquear solo errores inequívocos. |
| **Sitemap Integrity** | [sitemap.js](https://github.com/ekalinin/sitemap.js) · MIT · 1.709 ★ · [19/10/2026](https://github.com/ekalinin/sitemap.js/commit/15cce38b75f43119978381c0fcbcf7fd2f5d2fe9) | Valida XML y compara las URLs publicadas con sus canonical. | Adoptar [`examples/parse-existing-xml.js`](https://github.com/ekalinin/sitemap.js/blob/master/examples/parse-existing-xml.js) y el paquete `sitemap`; ejecutar comprobaciones en `qa/seo/sitemap.mjs` desde `.github/workflows/seo-sitemap.yml`. | No sustituir el sitemap SSR basado en D1 por un sitemap estático generado durante el build. |
| **IndexNow Publisher** | [bojieyang/indexnow-action](https://github.com/bojieyang/indexnow-action) · MIT · 65 ★ · [26/05/2026](https://github.com/bojieyang/indexnow-action/commit/38ddfbd93579a8a44c0dee662121bf9d51098f71) | Notifica URLs nuevas o modificadas a buscadores participantes. | `uses: bojieyang/indexnow-action@v3` en `.github/workflows/seo-indexnow.yml`, con `sitemap-location`, `key` desde GitHub Secrets y archivo de verificación publicado en el dominio. [Entradas de la acción](https://github.com/bojieyang/indexnow-action/blob/main/action.yml). | **Solo producción**. Por defecto exige `lastmod`; el sitemap actual no lo tiene. IndexNow **no equivale a comunicar URLs a Google**. [Protocolo](https://www.indexnow.org/faq). |
| **Search Console Reporter** | [google-api-python-client](https://github.com/googleapis/google-api-python-client) · Apache-2.0 · 8.976 ★ · [17/11/2026](https://github.com/googleapis/google-api-python-client/commit/354d888f9a923f5317ba81a2eba16c43a037c65b) | Informe semanal de clics, impresiones, CTR y posición por consulta, página y dispositivo. | Copiar y adaptar [`samples/searchconsole/search_analytics_api_sample.py`](https://github.com/googleapis/google-api-python-client/blob/main/samples/searchconsole/search_analytics_api_sample.py) a `scripts/seo/search-console.py`; programar `.github/workflows/seo-search-console.yml` y guardar JSON/CSV como artefacto privado del workflow. | Necesita propiedad verificada y autorización `webmasters.readonly`; la API es gratuita con cuotas. El ejemplo original usa OAuth interactivo: adaptarlo a credenciales aptas para CI, nunca subirlas al repositorio.  developers.google.com   developers.google.com |

**Orden de activación:** SEO Crawl Gate, JSON-LD Inspector y Sitemap Integrity pueden prepararse ahora. IndexNow y Search Console deben permanecer deshabilitados hasta que exista el dominio de producción correctamente configurado y verificado.

## **4. Cola de Copilot: C12–C16**

Bloques preparados para incorporar a [`manual/equipo/copilot.md`](https://github.com/davidpd89/automatizasinhumo-web/blob/main/manual/equipo/copilot.md). Las tareas nuevas no sustituyen C1 ni C2.

### **C12 · Control de indexación y rastreo real — PENDIENTE · P0**

**Adopción:** [janreges/siteone-crawler](https://github.com/janreges/siteone-crawler), MIT, 1.015 ★, último commit 27/09/2026.

**Copiar/adoptar:**

- [`siteone-crawler/.github/workflows/ci.yml`](https://github.com/janreges/siteone-crawler/blob/main/.github/workflows/ci.yml) como estructura de workflow → `.github/workflows/seo-crawl.yml`, sustituyendo las tareas de compilación de Rust por la ejecución del **binario oficial publicado**.
- Usar sus opciones `--ci`, `--ci-junit-file`, `--ci-max-404` y `--ignore-robots-txt` según la [documentación](https://crawler.siteone.io/configuration/command-line-options/).

**Modificar:** `src/layouts/Layout.astro`, `src/pages/search.astro`, `src/pages/empezar/[slug].astro` y `src/pages/empezar/gracias.astro` para controlar explícitamente `noindex` en páginas transaccionales. No tocar el `X-Robots-Tag` correcto de `/empezar/estado`.

**Prueba:** staging sigue bloqueado a buscadores; producción no; `/search?q=peluqueria` y `/empezar/gracias?id=...` no indexables; `/products/web-una-pagina` indexable; informe JUnit adjunto a la ejecución.

### **C13 · Service y Breadcrumb sin duplicar los metadatos actuales — PENDIENTE · P1**

**Adopción:** [jdevalk/seo-graph](https://github.com/jdevalk/seo-graph), MIT, 50 ★, último commit 08/07/2026.

**Copiar:**

- [`packages/astro-seo-graph/src/breadcrumbs.ts`](https://github.com/jdevalk/seo-graph/blob/main/packages/astro-seo-graph/src/breadcrumbs.ts) → `src/features/seo/breadcrumbs.ts`.
- Adoptar mediante el paquete publicado la lógica de [`packages/seo-graph-core/src/pieces/breadcrumb.ts`](https://github.com/jdevalk/seo-graph/blob/main/packages/seo-graph-core/src/pieces/breadcrumb.ts), en lugar de copiar el fichero aislado y dejar sus dependencias sin resolver.
- Adaptar los casos de [`packages/astro-seo-graph/test/breadcrumbs.test.ts`](https://github.com/jdevalk/seo-graph/blob/main/packages/astro-seo-graph/test/breadcrumbs.test.ts) → `src/features/seo/breadcrumbs.test.ts`.

**Modificar:** `src/features/storefront/productDetail.ts`, `src/pages/products/[slug].astro` y `src/pages/categories/[slug].astro`. Mantener `Organization` y `Product/Offer`; incorporar `BreadcrumbList` y una descripción semántica `Service` donde proceda.

**Prueba:** ninguna URL de breadcrumb es ficticia; el último elemento coincide con la página; JSON-LD parseable; los precios de `Offer` coinciden con D1; ninguna reseña o valoración inventada.

### **C14 · Sitemap verificable y control canonical — PENDIENTE · P1**

**Adopción:** [ekalinin/sitemap.js](https://github.com/ekalinin/sitemap.js), MIT, 1.709 ★, último commit 19/10/2026.

**Copiar:**

- [`examples/parse-existing-xml.js`](https://github.com/ekalinin/sitemap.js/blob/master/examples/parse-existing-xml.js) → `qa/seo/sitemap.mjs`, adaptando su lectura de XML a las aserciones del proyecto.
- Reutilizar la biblioteca para el XML de `src/pages/sitemap.xml.ts`, **sin reemplazar la obtención dinámica desde D1**.

**Modificar:** `src/pages/sitemap.xml.ts`, `src/features/pages/db.ts`, `src/pages/sitemap.xml.test.ts` y `.github/workflows/seo-sitemap.yml`.

**Prueba:** sitemap válido; sin duplicados ni URLs privadas; todas las URLs resuelven 200 y su canonical coincide; se incluyen las rutas de C2 **cuando estén publicadas**. Usar `updated_at` de las páginas para `lastmod` cuando refleje un cambio significativo; no confundir `created_at` de productos con su fecha de modificación.

### **C15 · IndexNow solo tras publicar en el dominio definitivo — PENDIENTE · P2 · Depende de C14 y producción**

**Adopción:** [bojieyang/indexnow-action](https://github.com/bojieyang/indexnow-action), MIT, 65 ★, último commit 26/05/2026.

**Copiar/adoptar:**

- [`action.yml`](https://github.com/bojieyang/indexnow-action/blob/main/action.yml) como contrato de entradas.
- [`src/sitemap-filter.ts`](https://github.com/bojieyang/indexnow-action/blob/main/src/sitemap-filter.ts) y [`src/sitemap-submitter.ts`](https://github.com/bojieyang/indexnow-action/blob/main/src/sitemap-submitter.ts) **mediante la acción publicada**, sin volver a desarrollar su implementación.

**Crear/configurar:** `.github/workflows/seo-indexnow.yml` y el archivo público de verificación de clave en el dominio definitivo. Clave almacenada como secreto de Actions; no codificada en YAML. Activación solo después de un despliegue de producción correcto.

**Prueba:** el archivo de clave devuelve 200 desde `automatizasinhumo.com`; una URL modificada recibe respuesta aceptada por IndexNow; staging y dominios ajenos jamás se envían. Si no hay `lastmod` fiable ni lista de cambios, no notificar masivamente el sitemap por defecto.

### **C16 · Informe semanal de oportunidades orgánicas — PENDIENTE · P2 · Depende de Search Console verificado**

**Adopción:** [googleapis/google-api-python-client](https://github.com/googleapis/google-api-python-client), Apache-2.0, 8.976 ★, último commit 17/11/2026.

**Copiar:**

- [`samples/searchconsole/search_analytics_api_sample.py`](https://github.com/googleapis/google-api-python-client/blob/main/samples/searchconsole/search_analytics_api_sample.py) → `scripts/seo/search-console.py`, conservando las consultas de análisis y sustituyendo la autorización interactiva antigua por una autorización de solo lectura compatible con Actions.

**Crear:** `.github/workflows/seo-search-console.yml`.

**Salida:** `informes/seo/search-console-AAAA-MM-DD.csv` como artefacto de Actions, con consultas, URLs, clics, impresiones, CTR, posición y desglose móvil. Un apartado identifica consultas de intención comercial —«precio», «cuánto cuesta», «web peluquería», «web restaurante»— con impresiones y pocos clics.

**Prueba:** consulta autenticada únicamente a la propiedad propia; informe generado con datos reales; ausencia de permisos produce un error claro, no cifras simuladas; ninguna credencial aparece en logs ni commits.

## **5. Decisiones de ejecución**

| Prioridad | Decisión |
| --- | --- |
| **P0** | Configurar dominio real y comprobar que **solo producción** queda indexable. Corregir la indexabilidad de búsquedas y páginas de confirmación. |
| **P1** | Ejecutar **C1 y C2**, ya pendientes: comparación comercial y páginas de precios por sector. Son las tareas más directamente relacionadas con captar al dueño de una peluquería o un restaurante. |
| **P1** | Ejecutar C12–C14 para detectar regresiones técnicas y mejorar el marcado sin duplicar el sistema SEO actual. |
| **P1, gestión comercial** | Configurar el contacto humano y aportar ejemplos de encargos reales autorizados. No publicar testimonios o cifras de clientes ficticios. |
| **P2** | Activar C15 y C16 cuando el dominio esté publicado y verificado. |

**Conclusión:** no compraría herramientas SEO ni instalaría otro framework completo. La combinación de **SiteOne Crawler + seo-graph + sitemap.js + IndexNow + Search Console**, reutilizando el código comercial ya encargado en C1/C2, cubre los huecos identificados con servicios y repositorios gratuitos. El resultado buscado no es multiplicar páginas, sino que cada búsqueda sectorial relevante conduzca a **una respuesta de precio concreta, una demo real y una acción de contratación clara**.

## Fe de erratas (revisión de CodeRabbit, 18/11/2026)

- El escáner se ejecuta con `npx --package=@jdevalk/seo-graph-scanner seo-graph-scan`.
- El repo es público: los artefactos de Actions los puede descargar cualquiera. El informe de Search Console solo publica cifras agregadas.
- C13 no añade marcado; valida el que pone C11.
