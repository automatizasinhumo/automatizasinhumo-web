# Continuidad · 2026-11-18

- Rama: `copilot/c1-componentes`; PR [#9](https://github.com/automatizasinhumo/automatizasinhumo-web/pull/9).
- Cambios: tamaño responsive para imágenes destacadas; el loader informa fallos D1 y la portada aplica `Cache-Control: no-store`; clasificación parcial de modalidades; mensaje de modalidades visible aunque la compra esté desactivada.
- Verificaciones: `npm run check` sin errores (3 hints preexistentes); pruebas dirigidas 31/31; suite completa con timeout ampliado 949/949.
- Incidencia: `npm test` con timeout predeterminado falló en el test de frontera por superar 5 s (en la segunda ejecución solo falló un caso). No se reprodujeron fallos funcionales con el timeout ampliado.
- Pendiente: `npm run verify` falló en la integración D1; hay que volver a ejecutarlo y confirmar el resultado.
