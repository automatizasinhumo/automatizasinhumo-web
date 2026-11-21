# Continuidad 2026-11-21 · Método de diseño y portada

## Cambios (rama portada-metodo-diseno)
- tokens.css: escala única de h1 (`--ds-texto-h1`), cabecera de página, `--ds-toque` (2,75 rem); regla `.page-shell h1:not(.h1-portada)`.
- Home: sin chip de bombilla; sección «Así funciona» con título.
- Header/footer: controles táctiles ≥40 px; pie agrupado (Servicios / Ayuda / Legal / Empresa).
- Botón flotante Contacto: solo icono en móvil, sin CSS en línea (CSP).
- Servicios: h1 sigue la escala común.
- `scripts/check-tokens-diseno.mjs` + base (`npm run tokens:check`, dentro de `verify`): límite que solo baja.
- `qa/contrato-diseno.mjs`: desborde, h1 común, columna común y controles táctiles en 6 rutas × 5 anchos. Se ejecuta en el job `portada-limpia` de desplegar-staging contra el Worker limpio.

## Verificado
- Local: vitest 239/239 (PowerShell), contrato OK en build local, tokens:check OK (50/50).
- GPT consultado: `.ci/gpt-revision-portada-2026-11-21.md` (no pudo abrir la web).

## Pendiente / sin verificar
- CI del PR y contrato contra staging tras desplegar; regenerar capturas qa-visual (`actualizar=true`) tras revisar el diff.
- Footer agrupado: comprobar en staging con enlaces reales.
- Móvil 390 local: reconfirmar icono Contacto/hero.
- Margen de sección aún dispar (0/36/52/56/104 px): migrar páginas a `Seccion`; bajar la base del ratchet.
- Hero demo en inglés («Good coffee…»).

## Para el FINAL (decidido por David)
- Precios «desde» en portada y galería de demos con capturas reales.
- FAQ/garantías solo como desplegable, en /servicios o al final, no en portada.
- Ajuste de contenidos y texto del pie.
- Anteriores: semilla de `web-una-pagina` (49 € provisional) y gen-update en producción; R2 para fotos; hostnames propios; más plantillas web y extras automáticos.
