# Traspaso de sesión — Automatiza sin humo (17-11-2026)

## Pedido
- Seguir montando la tienda (`C:\GIT\automatizasinhumo`: Astro SSR + Cloudflare Workers + D1 + Tailwind v4, 71 servicios a precio cerrado).
- Mejorar el diseño, la UX y el SEO. Imágenes nítidas, sin plagio ni logos de terceros.
- Textos de marketing centrados en el resultado y el plazo. No decir nunca «código abierto».
- Mostrar el lado humano: atiende David Porto Díaz.
- «Empieza gratis»: el cliente paga después de ver la vista previa. Seguimiento para el cliente.
- Aplicar las ideas de la auditoría de ChatGPT, consultado en el navegador integrado sin iniciar sesión.

## Hecho (todo en staging y en origin/main)
- Último commit: `fb9f428` «Compra directa clara: demo en la ficha, doble camino y contacto humano». Staging: versión a2d6818b. Seed aplicado en D1 staging.
- **Ficha**: visor de demo dentro (iframe, `#demo`), bloque `#comprar` con garantía de 7 días y «¿Lo tienes que montar tú?». Datos en `src/data/demos-producto.json` (lo genera `manual/demos/gen-galeria.mjs`).
- **Un solo mensaje de pago** en portada, Cómo funciona, FAQ, pie, catálogo y barra de aviso: «Contrátalo directamente con garantía o pruébalo gratis».
- **Catálogo**: orden curado por datos (`created_at` escalonado en `gen-sql.mjs`), «desde 149 €», sin jerga (Cloudflare solo en privacidad y herramientas), carrito en español.
- **Tarjetas**: marco de color mientras carga la imagen (ya no se ven en blanco).
- **Contacto flotante** «¿Dudas? Habla con una persona» (sin JS, `<details>`): WhatsApp, Telegram y email en Admin → Ajustes (`save_contact`). Solo salen los canales rellenados; hoy no hay ninguno en staging, así que no se ve. Probado en móvil con un email temporal, ya borrado.
- **QA** (`qa/smoke.sh`, workflow `empleados-qa.yml`): ahora comprueba la ficha (compra + demo + iframe), el formulario y que la portada no tenga jerga. La ficha se añade a Lighthouse y pa11y.
- **Pruebas**: vitest 922 en verde; astro check 0 errores; smoke contra staging en verde.

## Falta
1. **David**: rellenar WhatsApp, Telegram y email en Admin → Ajustes (botón de contacto); conectar la pasarela (claves en Admin → Ajustes); MX del email; NIF y domicilio en el aviso legal; dominio de producción con `CANONICAL_ORIGIN`.
2. **Probar el flujo de pago completo** con Stripe en modo test: comprar → pedido → «Rellenar mis datos» → solicitud con «Pedido pagado».
3. **Admin → Solicitudes**: etiqueta destacada para las que traen «Pedido pagado».
4. **Imágenes**: `public/images/demos/editor-bloques.png` y repaso de `gen-imagenes.mjs`.
5. Comparador antes/después y contador de proyectos, cuando haya datos reales.

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
