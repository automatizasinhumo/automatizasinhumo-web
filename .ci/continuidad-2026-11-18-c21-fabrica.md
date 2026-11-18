# C21: contexto de página en la fábrica

## Cambios

- `manual/fabrica/fabricar.py`: cada lote conserva el orden de la página e incluye ruta del nodo y textos vecinos; la instrucción limita la repetición de datos por bloque. El nombre público prioriza negocio o evento y usa el contacto solo como respaldo.
- `manual/fabrica/vistas-previas.py`: distingue el nombre de negocio/evento del contacto al formar el pedido y al validar la vista previa.
- `manual/fabrica/test_fabricar.py`: dos pruebas unittest nuevas con IA simulada; reutiliza el workflow de pruebas ya fusionado.

## Verificación

- `python -m unittest discover -s manual/fabrica -v`: 11 pruebas aprobadas (9 existentes y 2 nuevas).
- `python -m py_compile manual/fabrica/fabricar.py manual/fabrica/vistas-previas.py manual/fabrica/test_fabricar.py`: correcto.
- `git diff --check`: sin errores.
- Los cuatro ficheros cambiados tienen finales CRLF.
- En `automatizasinhumo`, `main` se actualizó con `git switch main` y `git pull origin main`; avance rápido de `7b7d670` a `89f62e5`. Después se rebasó C21 sobre `027e09f`, donde se fusionó #34. Rama C21: `copilot/c21-contexto-fabrica`.
- PR #34 fusionada: https://github.com/automatizasinhumo/automatizasinhumo-web/pull/34.
- PR C21 #39, abierta contra `main`: https://github.com/automatizasinhumo/automatizasinhumo-web/pull/39.
- Checks remotos de #39: aprobados; `scorecard` se omitió. Ejecución: https://github.com/automatizasinhumo/automatizasinhumo-web/actions/runs/44368903846.

## Fallos y pendientes

- El workspace inicial `web-escritor` estaba sucio y divergía de `origin/main`; el pull fast-forward no era posible. No se modificó ese trabajo y se limpió el worktree temporal que se había creado allí.
- Las pruebas usan pedidos sintéticos y una IA simulada; no se leyeron ni subieron pedidos reales ni vistas previas.
- Sin cambios pendientes; la PR queda abierta para revisión, sin fusionarla.
