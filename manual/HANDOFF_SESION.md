# Traspaso de sesión — Automatiza sin humo (17-11-2026)

## Pedido
- Seguir montando la tienda (`C:\GIT\automatizasinhumo`: Astro SSR + Cloudflare Workers + D1 + Tailwind v4, 71 servicios a precio cerrado).
- Mejorar el diseño, la UX y el SEO. Imágenes nítidas, sin plagio ni logos de terceros.
- Textos de marketing centrados en el resultado y el plazo. No decir nunca «código abierto».
- Mostrar el lado humano: atiende David Porto Díaz.
- «Empieza gratis»: el cliente paga después de ver la vista previa. Seguimiento para el cliente.
- Aplicar las ideas de la auditoría de ChatGPT, consultado en el navegador integrado sin iniciar sesión.

## Hecho (todo en staging y en origin/main)
- Último commit: `e8f45a7` «Compra directa visible y datos tras el pago; modalidad «Plantilla + guía»». Staging: versión 963cbb24. Seed aplicado en D1 staging.
- **Ficha** (`src/themes/default/ProductDetail.astro`): dos opciones visibles.
  - Opción 1 · Compra directa: el formulario de compra («Añadir al carrito» / «Contratar ahora»). Es la principal.
  - Opción 2 · Empieza gratis: botón secundario (con borde) que lleva a la vista previa sin tarjeta.
- **Tras pagar** (`src/pages/order/[token].astro`): página en español con la tarjeta «Siguiente paso · Envíanos tus datos». Enlaza a `/empezar/<slug>?pedido=<ref>`.
- **Formulario con `?pedido=`**: textos de pedido pagado. El número se guarda en la solicitud como campo «Pedido pagado» (sin cambiar el esquema). El email al cliente y el aviso a David («Datos de pedido pagado») cambian en consecuencia.
- **Modalidades**: «Lo montas tú» pasa a llamarse «Plantilla + guía» (la publicas tú). La otra sigue siendo «Te lo montamos».
- **Demos**: galería «Demos en vivo» con filtro por categoría. Etiquetas «Demo interactiva» y «Diseño de ejemplo», en lugar de Brightline/Meridian.
- **Pruebas**: `npx vitest run` 922 en verde (nuevo test del n.º de pedido); `npx astro check` 0 errores.

## Falta
1. **Probar el flujo de pago completo** cuando David conecte Stripe en modo test: comprar → página del pedido → «Rellenar mis datos» → solicitud con «Pedido pagado» en Admin. No se ha podido probar sin pago.
2. **Admin → Solicitudes**: destacar con una etiqueta las que traen «Pedido pagado» (hoy se ven como un campo más).
3. **Imágenes**: retomar `public/images/demos/editor-bloques.png` y revisar las imágenes de producto en `gen-imagenes.mjs`.
4. **Comparador antes/después** y **contador de proyectos entregados**, cuando haya casos y datos reales.
5. **Pendiente de David** (ver ESTADO.md): dominio de producción con `CANONICAL_ORIGIN`, conectar Stripe, alta en afiliados y, opcional, Cloudflare Access en staging.

## Estado vivo
- Rama `main` limpia y subida a `origin`. Repo: `davidpd89/automatizasinhumo-web`.
- **Staging**: https://automatizasinhumo-staging.davidpd89.workers.dev
- **Desplegar staging** (desde la raíz del repo, en Git Bash):

      cp wrangler.jsonc "$TMP/wrangler.jsonc.orig" && cp .instances/automatizasinhumo-staging.wrangler.jsonc wrangler.jsonc && npx astro build > "$TMP/build.log" 2>&1 && npx wrangler deploy 2>&1 | grep "Version ID"; cp "$TMP/wrangler.jsonc.orig" wrangler.jsonc

- **Si una página sale sin estilos justo después de desplegar**: recarga con `?v=N`. Si sigue igual, compara el hash de `Layout.*.css` en `dist/server/entry.mjs` con el de `dist/client/_astro/`.

## Reglas del proyecto
- **Repos**:
  - No tocar `davidpd89/saas-automation-lab` (producción).
  - `C:\GIT\new-website` es de solo lectura.
  - Push solo a `origin main`, nunca a `upstream` (ddyy/minshop).
  - Con `gh`, siempre `-R davidpd89/automatizasinhumo-web`.
  - Sin `git stash`.
- **Datos y dinero**:
  - Nunca mostrar secretos (están en `manual/CREDENCIALES_STAGING.local`).
  - Nada de pagos, planes de pago ni tarjetas.
  - Datos personales: el nombre sí, la dirección no.
- **Repos de terceros**:
  - Clonar en un directorio vacío y no ejecutarlos nunca.
  - Copiar solo estáticos.
  - Los repos sin licencia son solo de referencia. Excluido Kahaan83.
- **Herramientas**:
  - No molestar a Edge en el puerto 9241.
  - En Git Bash, prefijar cada comando con `cd /c/GIT/automatizasinhumo && ...`.
  - Los ficheros usan CRLF.
  - Los componentes del tema no pueden usar `Astro.url`.
- **Commits**: terminan con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
