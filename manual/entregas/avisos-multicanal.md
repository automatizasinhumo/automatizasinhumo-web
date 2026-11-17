# Avisos automáticos multicanal (webhooks)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Formularios y captación |
| Precio | Lo montas tú 59 € · Te lo montamos 129 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare (webhooks) |
| Base | bts-io/hookforms-cloud (MIT) |

**Qué es:** Cualquier evento de tus herramientas (pago, formulario, pedido) avisa a Slack, Telegram, Discord o email.

**Ejemplo:** Cada venta de la tienda manda «🎉 Nueva venta 49 €» al grupo de Telegram del equipo.

## 1. Qué le pides al cliente

- Herramientas que envían eventos
- Canales de aviso
- Qué eventos interesan

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)
- Accesos a las herramientas que mandan eventos

Email listo para mandar:

```text
Asunto: Tu pedido «Avisos automáticos multicanal (webhooks)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Herramientas que envían eventos
- Canales de aviso
- Qué eventos interesan

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)
- Accesos a las herramientas que mandan eventos

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs avisos-multicanal` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto avisos-multicanal («Avisos automáticos multicanal (webhooks)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: bts-io/hookforms-cloud (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare (webhooks).
Campos del cliente:
- Herramientas que envían eventos: <...>
- Canales de aviso: <...>
- Qué eventos interesan: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
- Accesos a las herramientas que mandan eventos: <sí/no>
Tiene que quedar: Bandeja de eventos; Reglas de aviso por canal; Histórico consultable.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs avisos-multicanal tu`.

## 3. Qué entregas

- [ ] Bandeja de eventos
- [ ] Reglas de aviso por canal
- [ ] Histórico consultable
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Avisos automáticos multicanal (webhooks)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Bandeja de eventos
- Reglas de aviso por canal
- Histórico consultable

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [bts-io/hookforms-cloud](https://github.com/bts-io/hookforms-cloud) · MIT
