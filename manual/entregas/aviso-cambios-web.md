# Aviso de cambios en webs que te interesan (mes)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 9 € |
| Plazo publicado | Mensual |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker con Cron Trigger |
| Base | dgtlmoon/changedetection.io (Apache-2.0) |

**Qué es:** Vigilamos boletines oficiales, licitaciones, convocatorias o webs de proveedores y te avisamos cuando cambian.

**Ejemplo:** Gestoría: aviso cada vez que el ayuntamiento publica una nueva ayuda para autónomos.

## 1. Qué le pides al cliente

- Páginas a vigilar
- Qué parte vigilar (p. ej. «tabla de convocatorias»)
- Frecuencia
- Email o Telegram

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Aviso de cambios en webs que te interesan (mes)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Páginas a vigilar
- Qué parte vigilar (p. ej. «tabla de convocatorias»)
- Frecuencia
- Email o Telegram

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de Mensual.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs aviso-cambios-web` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto aviso-cambios-web («Aviso de cambios en webs que te interesan (mes)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: dgtlmoon/changedetection.io (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker con Cron Trigger.
Campos del cliente:
- Páginas a vigilar: <...>
- Qué parte vigilar (p. ej. «tabla de convocatorias»): <...>
- Frecuencia: <...>
- Email o Telegram: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Hasta 15 páginas vigiladas; Solo te avisa si cambia la parte que te importa; Resumen del cambio en el aviso.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

## 3. Qué entregas

- [ ] Hasta 15 páginas vigiladas
- [ ] Solo te avisa si cambia la parte que te importa
- [ ] Resumen del cambio en el aviso
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Aviso de cambios en webs que te interesan (mes)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Hasta 15 páginas vigiladas
- Solo te avisa si cambia la parte que te importa
- Resumen del cambio en el aviso

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) · Apache-2.0
