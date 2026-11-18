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

### C1 · Componentes comerciales Astro (mapa ronda 07, adopción 8) — PENDIENTE
Clona fulldotdev/ui (MIT) y konstantinWDK/astro-components (MIT) en una carpeta temporal fuera del repo. Copia:
- fulldotdev/ui/src/components/blocks/services-1.astro -> src/features/storefront/sections/ServiciosPorNecesidad.astro
- fulldotdev/ui/src/components/blocks/pricing-1.astro -> src/features/storefront/sections/ComparativaModalidades.astro
- konstantinWDK/astro-components/src/components/lib/cards/PricingCompareMiniCard.astro -> src/features/storefront/sections/TarjetaComparacion.astro
Adáptalos a los tokens y clases Tailwind v4 del tema actual (sin añadir dependencias nuevas salvo que sean imprescindibles), con datos del catálogo real. Úsalos en la portada y en las fichas donde la comparación aporte información. Prueba: `npx astro build` sin errores y capturas a 360 y 1280 px de la portada y de tres fichas, adjuntas a la PR.

### C2 · Blog y páginas por sector en el sitemap (mapa ronda 07, adopción 9) — PENDIENTE
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
Lista: https://sonarcloud.io/project/issues?id=davidpd89_automatizasinhumo-web&resolved=false&types=BUG,VULNERABILITY
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

