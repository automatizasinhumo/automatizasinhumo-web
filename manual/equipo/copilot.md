# Tareas para GitHub Copilot (chat de VS Code, créditos gratuitos)

El agente de Copilot no se puede asignar desde GitHub en este repo, así que trabaja desde el chat de VS Code de David.

Funcionamiento:

1. David abre el chat de Copilot en modo **Agent** y pega: «Haz la primera tarea en estado PENDIENTE de `manual/equipo/copilot.md`».
2. Copilot crea la rama `copilot/<n>`, hace la tarea, abre una PR y cambia el estado de la tarea a `EN PR #<n>`.
3. CodeRabbit y la CI revisan la PR. Claude la revisa y la fusiona o la devuelve con comentarios.

Reglas para Copilot:
- Reutilizar código de repos públicos (MIT/Apache) en vez de escribirlo desde cero.
- Ficheros con CRLF.
- Textos visibles en español de España.
- Push solo a `origin`, nunca a `upstream`.
- No tocar `.instances/` ni `manual/CREDENCIALES_STAGING.local`.

## Cola

Las tareas salen del mapa de adopción (`manual/auditorias-gpt/ronda-07-respuesta.md`). Cada una dice qué clonar, qué copiar y dónde, y la prueba que demuestra que funciona.

<!-- TAREAS -->
