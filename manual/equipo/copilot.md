# Tareas para GitHub Copilot (chat de VS Code, créditos gratuitos)

El agente de Copilot no se puede asignar desde GitHub en este repo, así que trabaja desde el chat de VS Code de David.

Funcionamiento:

1. David abre el chat de Copilot en modo **Agent** y pega: «Haz la primera tarea en estado PENDIENTE de `manual/equipo/copilot.md`».
2. Copilot crea la rama `copilot/<n>`, hace la tarea, abre una PR y cambia el estado de la tarea a `EN PR #<n>`.
3. CodeRabbit y la CI revisan la PR. Claude la revisa y la fusiona o la devuelve con comentarios.

Reglas para Copilot (la norma completa está en `.github/copilot-instructions.md`, que Copilot lee solo: **adoptar código público, no desarrollar**):
- Reutilizar código de repos públicos (MIT/Apache) en vez de escribirlo desde cero, conservando su aviso de copyright y su licencia: cabecera en cada fichero copiado y el texto completo en `licencias/<repo>.txt`.
- Ficheros con CRLF.
- Textos visibles en español de España.
- Push solo a `origin`, nunca a `upstream`.
- No tocar `.instances/` ni `manual/CREDENCIALES_STAGING.local`.
- Encargos baratos: copiar el componente del repo, cambiar textos y colores y conectarlo. Sin capturas, sin refactor y sin tests nuevos salvo que la tarea los pida (Claude revisa lo visual en staging). Si un componente exige mucha adaptación, se descarta y se busca otro repo que encaje mejor.

## Cola

Las tareas salen del mapa de adopción (`manual/auditorias-gpt/ronda-07-respuesta.md`). Cada una dice qué clonar, qué copiar y dónde, y la prueba que demuestra que funciona.

<!-- TAREAS -->

### C1 · Componentes comerciales Astro (mapa ronda 07, adopción 8) — HECHO (#9)
Clona fulldotdev/ui (MIT) y konstantinWDK/astro-components (MIT) en una carpeta temporal fuera del repo. Copia:
- fulldotdev/ui/src/components/blocks/services-1.astro -> src/features/storefront/sections/ServiciosPorNecesidad.astro
- fulldotdev/ui/src/components/blocks/pricing-1.astro -> src/features/storefront/sections/ComparativaModalidades.astro
- konstantinWDK/astro-components/src/components/lib/cards/PricingCompareMiniCard.astro -> src/features/storefront/sections/TarjetaComparacion.astro
Adáptalos a los tokens y clases Tailwind v4 del tema actual (sin añadir dependencias nuevas salvo que sean imprescindibles), con datos del catálogo real. Úsalos en la portada y en las fichas donde la comparación aporte información. Prueba: `npx astro build` sin errores y capturas a 360 y 1280 px de la portada y de tres fichas, adjuntas a la PR.

### C2 · Blog y páginas por sector en el sitemap (mapa ronda 07, adopción 9) — EN PR #19
Clona mearashadowfax/ScrewFast (MIT). Copia src/views/BlogIndexView.astro, src/views/BlogPostView.astro, src/components/ui/cards/CardBlog.astro, src/utils/content.ts y src/utils/metadata.ts a src/features/blog/ y src/features/seo/metadata.ts. Crea src/pages/blog/ y src/pages/webs/[sector].astro (peluquerías, fontaneros, restaurantes, abogados, fisioterapeutas) enlazando a los servicios y demos reales. Publica además tres artículos en el blog: «Cuánto cuesta una web para un negocio local», «Web o solo redes sociales» y «Qué necesita una web para salir en Google». Añade las rutas a src/pages/sitemap.xml.ts. Prueba: build sin errores; las cinco páginas de sector y los tres artículos con title y description únicos; todas las rutas aparecen en /sitemap.xml.

### C3 · Correo de vista previa y recordatorios automáticos (mapa ronda 07, adopción 4) — PENDIENTE
Hoy el envío de correos a clientes vive dentro de src/pages/admin/solicitudes.astro (bloque `accion === 'enviar'`: fila única en `notificaciones`, `getEmailProvider().send`, estado_envio). Tarea:
1. Extraer ese bloque, sin cambiar su comportamiento, a `src/features/solicitudes/envio.ts` → `enviarCorreoSolicitud(db, id, tipo, version, enlace, pendientes, reenviar)`. La página de Admin pasa a llamarla.
2. Añadir `sweepVistasPrevias(db)` en el mismo fichero y llamarla desde `runScheduledSweeps` de src/worker.ts (con su propio try/catch, como los demás sweeps). Debe hacer lo siguiente:
   - Solicitudes en `en_preparacion` cuya nota empiece por «Vista previa automática: https://» y contenga «QA ok» → enviar el correo `revision` (versión 1) con esa URL y pasarlas a `vista_previa_enviada` con `cambiarEstado`.
   - Solicitudes en `vista_previa_enviada` desde hace 3 días o más, sin correo `recordatorio` → enviar el `recordatorio`.
   - Solicitudes en `vista_previa_enviada` desde hace 7 días o más → pasarlas a `en_espera_cliente` y enviar el correo `espera`.
   Límite de 20 por pasada. Es idempotente gracias a la clave única de `notificaciones`.
3. Tests con vitest junto a los existentes (correos.test.ts como modelo): no envía dos veces el mismo correo; no envía sin «QA ok»; las fechas de 3 y 7 días se cumplen.
Prueba: `npx vitest run src/features/solicitudes` en verde y `npx astro build` sin errores.

### C4 · Hallazgos reales de SonarCloud en main — EN PR #15
Lista: https://sonarcloud.io/project/issues?id=automatizasinhumo_automatizasinhumo-web&resolved=false&types=BUG,VULNERABILITY
Arregla solo estos, con el cambio mínimo y sin cambiar comportamiento:
- css:S8778 (5): `@import` después de otras reglas → moverlos al principio del fichero.
- S2871 (4, js/ts): `.sort()` sin comparador → `(a, b) => a.localeCompare(b, 'es')` o resta numérica.
- typescript:S3923 (2): condicional que devuelve lo mismo en ambas ramas → simplificar.
- plsql:NullComparison (2): `= NULL` → `IS NULL`.
- python:S8904 (1) y typescript:S6324 (1).
- jssecurity S5145/S5144/S8476 en `src/`: sanear lo que llega del usuario antes de registrarlo o de usarlo en un fetch (lista de hosts permitidos).
No toques las migraciones con DELETE sin WHERE (son a propósito) ni los avisos de `npx` en workflows o scripts.
Prueba: `npx vitest run` y `npx astro build` en verde; en la PR, la puerta de Sonar en verde.

### C5 · Aprobación → pago sin enlace a mano (mapa ronda 07, adopción 5) — PENDIENTE (después de C3)
Detalle en `manual/auditorias-gpt/ronda-07-respuesta.md`, apartado 10.5. Clona stripe-samples/checkout-one-time-payments (MIT) y copia `.github/workflows/ci_e2e.yml` → `.github/workflows/recorrido-cliente.yml`, adaptado.
Añade un botón «Aprobar y pagar» en `src/pages/empezar/estado.astro` (o en la página autenticada) que registre la versión aprobada, cree la sesión de pago con `createCheckout` (flujo existente de Stripe) y redirija a la URL que devuelve; `/pay/[publicId]` solo sirve para pagos demo o Lightning y no admite el ID de la solicitud. Reutiliza `src/features/payments/stripe.ts`, `src/pages/api/webhook/[provider].ts` y `src/features/orders/recordWebhook.ts`; no escribas otro checkout.
Prueba (Stripe en modo test): aprobación → checkout → webhook pagado → estado actualizado; un webhook repetido no duplica el pedido; un pago fallido no desbloquea la entrega.

### C6 · Versiones de la entrega (mapa ronda 07, adopción 6) — PENDIENTE (después de C5)
Detalle en el apartado 10.6. Usa como base `MoBio/migrations/0002_draft_publishing.sql` (dimasmong/MoBio, MIT) para `migrations/0043_solicitudes_versiones.sql` (si el número ya existe, el siguiente libre): URL de vista previa, versión aprobada, URL definitiva e historial de despliegues. La entrega solo se activa con el pago confirmado (o con una compra directa ya pagada).
Prueba: versión 1 aprobada y pagada; después, una versión 2 sin aprobar; la entrega sigue siendo la versión 1.

### C7 · Archivos del cliente con FilePond (ronda 08, adopción 1) — PENDIENTE (después de C3)
Clona pqina/filepond (MIT). Copia `dist/filepond.min.js` y `dist/filepond.min.css` a `public/vendor/filepond/` con su licencia. Úsalo en el formulario de `src/pages/empezar/[slug].astro` para que el cliente suba fotos, logotipo y documentos. Los archivos van a R2 privado con `src/features/storage/r2.ts`, a través de un endpoint en `src/pages/api/solicitudes/` asociado a la solicitud. Solo imágenes y PDF, hasta 10 MB cada uno.
Prueba: una solicitud con tres imágenes deja tres objetos en R2; un archivo demasiado grande o de formato no admitido se rechaza; otra solicitud no puede leerlos.

### C8 · Factura PDF automática con pdfme (ronda 08, adopción 2) — PENDIENTE (después de C5)
Usa el paquete oficial `@pdfme/generator` (pdfme/pdfme, MIT) y copia `playground/public/template-assets/invoice-white/template.json` a `manual/facturas/plantilla.json`, sin los datos de ejemplo. Genera la factura del pedido pagado desde `src/features/orders/recordWebhook.ts` y guárdala en R2 privado. Los pedidos con `payment_method = 'demo'` no generan factura. Si supera la CPU de Workers Free, genérala en un workflow de Actions. La marca «factura pendiente» se escribe en el mismo `batch` de D1 que guarda el pedido pagado y se quita al guardar el PDF; el cron existente del Worker reintenta los pedidos marcados (una sola factura por pedido, clave = id del pedido).
Prueba: pago confirmado → un PDF; webhook repetido → sin factura duplicada; pago fallido → sin factura; pedido demo → sin factura; fallo al generar → el cron la crea en la siguiente pasada; proceso cortado entre guardar el pedido y generar el PDF → el pedido queda marcado y el cron la crea.

### C9 · Analítica propia con Counterscale (ronda 08, adopción 3) — PENDIENTE
Despliega benvinegar/counterscale (MIT) como Worker aparte, siguiendo su README. Añade su tracker a `src/layouts/Layout.astro` con eventos de ficha, demo y formulario, sin datos personales.
Prueba: diez visitas, tres demos y dos formularios simulados aparecen en el panel.

### C10 · Monitor de webs entregadas con Upptime (ronda 08, adopción 7) — PENDIENTE (después de C6)
Crea con la plantilla upptime/upptime (MIT) un repo público aparte, `automatizasinhumo-estado`. La lista de URL se genera solo con las entregas publicadas, nunca con vistas previas ni datos de clientes.
Prueba: una URL que funciona y otra que da error; el monitor abre una incidencia solo para la segunda.

### C11 · Datos estructurados por servicio con schema-dts (ronda 08, adopción 10) — PENDIENTE
Usa el paquete `schema-dts` (google/schema-dts, Apache-2.0) para tipar el JSON-LD de `src/layouts/Layout.astro` y añadir Service, Offer y BreadcrumbList en las fichas, solo con datos reales del catálogo.
Prueba: `npx astro build` en verde; el JSON-LD de tres fichas pasa el validador de schema.org y no lleva precios inventados.

### C12 · Rastreo SEO en CI con SiteOne Crawler y noindex en páginas de trámite (ronda 10, hallazgos 1-2) — PENDIENTE
Usa el binario oficial `siteone-crawler-v2.5.1-linux-x64.tar.gz` de las releases de janreges/siteone-crawler (MIT); toma su `.github/workflows/ci.yml` solo como molde para crear `.github/workflows/seo-crawl.yml` (semanal + `workflow_dispatch`, contra staging con `--ignore-robots-txt`, `--ci`, `--ci-max-404=0` y `--ci-junit-file`). Añade `noindex` explícito en `src/pages/search.astro`, `src/pages/empezar/[slug].astro` y `src/pages/empezar/gracias.astro` mediante una prop `noindex` de `src/layouts/Layout.astro`. No toques el `X-Robots-Tag` de `src/pages/empezar/estado.astro`.
Prueba: `/search?q=peluqueria` y `/empezar/gracias` llevan `noindex`; `/products/web-una-pagina` no; el informe JUnit se sube como artefacto y un 404 interno hace fallar el job.

### C13 · Inspector de JSON-LD en CI con seo-graph (ronda 10, empleado 2) — PENDIENTE (después de C11)
Usa el escáner de jdevalk/seo-graph (MIT), paquete `@jdevalk/seo-graph-scanner` (`npx --package=@jdevalk/seo-graph-scanner seo-graph-scan`), en un job nuevo de `.github/workflows/seo-crawl.yml` que revise la portada, una categoría y tres fichas del staging. No añade marcado: Service, Offer y BreadcrumbList los pone C11; aquí solo se validan.
Prueba: un JSON-LD roto a propósito hace fallar el job; ninguna miga apunta a una URL inexistente; los precios de Offer coinciden con D1.

### C14 · Sitemap con lastmod y comprobación de canonical con sitemap.js (ronda 10, hallazgo 4) — PENDIENTE
Usa el paquete `sitemap` (ekalinin/sitemap.js, MIT). Copia `examples/parse-existing-xml.js` a `qa/seo/sitemap.mjs` y adáptalo para leer `/sitemap.xml` del staging, pedir cada URL y comparar su canonical. Añade `lastmod` en `src/pages/sitemap.xml.ts` con el `updated_at` de las páginas (`src/features/pages/db.ts`), sin cambiar la lectura dinámica desde D1. Workflow `.github/workflows/seo-sitemap.yml`, semanal.
Prueba: sitemap válido, sin duplicados ni URLs privadas; todas responden 200 y su canonical coincide con la URL; `src/pages/sitemap.xml.test.ts` cubre `lastmod`.

### C15 · IndexNow al desplegar en el dominio definitivo (ronda 10, empleado 4) — PENDIENTE (después de C14 y del dominio de producción)
Usa la acción publicada `bojieyang/indexnow-action` (MIT), fijada por SHA, en `.github/workflows/seo-indexnow.yml` tras un despliegue de producción correcto. La clave va en un secreto de Actions y su fichero de verificación en `public/`. Solo se envían URLs de `automatizasinhumo.com` cambiadas según `lastmod`.
Prueba: el fichero de clave responde 200 en producción; staging nunca se envía; una URL cambiada recibe respuesta aceptada.

### C16 · Informe semanal de Search Console (ronda 10, empleado 5) — PENDIENTE (después de verificar el dominio en Search Console)
Copia `samples/searchconsole/search_analytics_api_sample.py` de googleapis/google-api-python-client (Apache-2.0) a `scripts/seo/search-console.py`, con cuenta de servicio de solo lectura en un secreto de Actions. Workflow `.github/workflows/seo-search-console.yml`, semanal. El repo es público y cualquiera puede descargar sus artefactos: no sube el CSV, solo publica en el resumen del job las cifras agregadas (consultas, páginas, clics, impresiones, CTR, posición, móvil) y resume en el job las consultas comerciales («precio», «cuánto cuesta», «web peluquería»…) con muchas impresiones y pocos clics.
Prueba: sin permisos falla con un mensaje claro y sin cifras inventadas; ninguna credencial aparece en el log.

### C17 · Buscador que entiende plurales y variantes con un lematizador Snowball (simulación boda 18/11) — PENDIENTE
Hoy «bodas» solo devuelve «Dossier comercial en PDF», y «eventos» devuelve avisos y diplomas. La búsqueda literal en FTS5 encuentra algo, así que nunca llegan a aplicarse los sinónimos de `src/features/search/sinonimos.ts`. Adopta `snowball-stemmers` (ISC, mazko/jssnowball, algoritmo Snowball oficial para español). En `src/features/search/fts.ts`, cada término de la consulta y del índice pasa por el lematizador español y la consulta usa prefijos FTS5 (`bod*`). Los sinónimos se suman siempre a la consulta, en vez de usarse solo cuando no hay resultados.
Prueba (vitest con la D1 de pruebas): «bodas», «boda», «web para bodas» y «eventos» devuelven primero los cuatro productos de la categoría `bodas`; «peluquerías» devuelve el producto de peluquería.

### C18 · Buscador visible en móvil (simulación boda 18/11) — PENDIENTE
A 390 px, `input[name=q]` existe pero está oculto y no hay ningún botón que lo muestre. En la cabecera de `src/layouts/Layout.astro`, añade un botón con lupa y el texto oculto «Buscar» que despliega el formulario `/search`. Usa el patrón de disclosure de la WAI-ARIA APG (`aria-expanded`/`aria-controls`) con el componente de C1, sin librerías nuevas.
Prueba (Playwright a 390 px): la lupa es visible, el campo recibe el foco al pulsarla y Enter lleva a `/search?q=`.

### C19 · Todo lo que ve el cliente, en español, con un test que lo vigile (simulación boda 18/11) — EN PR #31
`/express` está en inglés: «Express checkout», «Buy now», «Checkout», «Qty», «← Back», «Pay with card», «Demo checkout», «Simulated — places a real test order, no charge» y «Please choose a …». Hay más textos en inglés en `ProductPurchaseForm.astro` y en `src/themes/*/ProductDetail.astro`, y conviene revisar también `cart.astro` y `pay/[publicId].astro`.
1) Traduce todos esos textos al español de España. El método de pago de demostración se llama «Pago de prueba (sin cargo)».
2) Adopta `franc-min` (MIT, wooorm/franc) en `tests/idioma.test.ts`. El test recorre el HTML generado de las páginas públicas (todas salvo `/admin`), extrae el texto visible y falla si algún bloque de más de 20 caracteres no se detecta como `spa`. La lista de excepciones vive en el propio test y debe ser corta: marcas, nombres propios y código. Como `franc` no distingue idiomas en textos cortos, el test también falla si en botones, `label`, `option`, `th`, `title` o `aria-label` aparece alguna palabra de una lista corta de palabras en inglés: `Buy`, `Checkout`, `Qty`, `Back`, `Pay`, `Cart`, `Total`, `Remove`, `Continue`, `Submit`, `Skip to content`.
Prueba: el test falla en main antes de traducir y pasa después.

### C20 · Demos traducidas de verdad (simulación boda 18/11) — PENDIENTE (después de C19 y C21)
Las demos de `automatizasinhumo-demos` tienen calcos y restos en inglés:
- «Joyfully accepts», «Skip to content»;
- «Carne de carne - costilla lenta», «Vamos a casar»;
- lugares extranjeros (Harare, Cotswolds);
- `mailto:rsvp@example.com`.
Pasa el detector de C19 por el HTML de cada demo con un script en `scripts/demos/idioma.mjs` que se lanza en el workflow de las demos.
Lo que falle se vuelve a adaptar con la misma función `reescribir()` de `manual/fabrica/vistas-previas.py`, con un pedido de ejemplo español por sector: nombres, lugares y correos de España. Así no hay que traducir nada a mano.
Prueba: el script falla con la demo actual de boda y pasa tras regenerarla.

### C21 · La fábrica adapta cada página entera, no frase a frase (simulación boda 18/11) — PENDIENTE
La vista previa de prueba S-88D5JKWC salió así:
- «Lucía y Pablo & Lucía y Pablo»: la plantilla trae los dos nombres en nodos separados y la IA rellena cada uno con la pareja;
- «Respuesta de Sábado 12 de junio»;
- «© Prueba Claude»: en el pie sale la persona de contacto en lugar del negocio o evento.
En `reescribir()`, manda junto a cada lote las frases vecinas, en orden y con la ruta del nodo, y añade al prompt la regla «un dato del pedido aparece una sola vez por bloque». El pie toma el nombre del negocio o evento, y la persona de contacto solo si no hay ninguno.
Prueba (`pytest`, con la IA simulada): un pedido de boda no produce el mismo valor en dos nodos hermanos, y el pie no contiene el nombre de contacto si hay nombre de evento.

## Huecos de arquitectura (los resuelve Claude, no Copilot)

- **Límite de 100 Workers:** cada vista previa crea un Worker `web-<id>`. Antes de llegar al límite hay que servir todas las vistas previas desde un único Worker con R2, por ruta o por hostname. Se buscará un repo que lo haga (ronda 09).
- **Reclamación atómica en D1:** la fábrica marca la solicitud después de fabricarla. Mientras convivan la tarea de Windows y Actions, una solicitud puede fabricarse dos veces. Al activar Actions se desactiva la tarea de Windows.
