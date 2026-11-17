# Traspaso de sesión — Automatiza sin humo (17-11-2026)

## Pedido
- Seguir montando la tienda (`C:\GIT\automatizasinhumo`: Astro SSR + Cloudflare Workers + D1 + Tailwind v4, 71 servicios a precio cerrado).
- Mejorar el diseño, la UX y el SEO. Imágenes nítidas, sin plagio ni logos de terceros.
- Textos de marketing centrados en el resultado y el plazo. No decir nunca «código abierto».
- Mostrar el lado humano: atiende David Porto Díaz.
- «Empieza gratis»: el cliente paga después de ver la vista previa. Seguimiento para el cliente.
- Aplicar las ideas de la auditoría de ChatGPT, consultado en el navegador integrado sin iniciar sesión.

## Hecho (todo en staging y en origin/main)
- Último commit: `7db6059` «Ficha: qué no incluye; formulario por pasos con barra de progreso».
- **Ficha**:
  - Línea de tiempo «Pruébalo antes de pagar».
  - Bloques qué recibes / qué necesito / qué pasa después.
  - Plegable «Qué no incluye» (`src/themes/default/ProductDetail.astro`).
- **Formulario por pasos** `/empezar/<slug>` (`src/pages/empezar/[slug].astro`):
  - «Paso X de N» con barra de progreso.
  - Valida antes de avanzar; Enter avanza en vez de enviar.
  - Con `?error=consentimiento|mensaje` abre en el último paso.
  - Sin JavaScript se ve el formulario completo.
- **Solicitudes**:
  - Se guardan en D1 (tabla `solicitudes`) y se gestionan en Admin → Solicitudes.
  - El cliente sigue su estado en `/empezar/estado?id=S-XXXXXXXX`.
- **Cabecera móvil**: el nombre del logo pasa a `text-base` por debajo de 420 px. Comprobado sin scroll lateral a 399 px.
- **Pruebas**:
  - `npx vitest run`: 921 en verde.
  - `npx astro check`: 0 errores.
- El detalle completo está en `manual/ESTADO.md`.

## Falta
1. **Comparador antes/después** en la ficha, cuando haya un caso real. Siguiente paso: pedir a David capturas reales de un cliente.
2. **Contador de proyectos entregados**, cuando haya datos. Siguiente paso: sacarlo del recuento de `solicitudes` con estado `entregada`.
3. **Pendiente de David** (ver ESTADO.md): dominio de producción con `CANONICAL_ORIGIN`, conectar Stripe, alta en afiliados y, opcional, Cloudflare Access en staging.

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
