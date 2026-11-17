# Formulario de contacto con aviso al móvil

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Formularios y captación |
| Precio | Lo montas tú 39 € · Te lo montamos 89 € |
| Plazo publicado | 24 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare que reenvía el formulario |
| Base | investblog/contact-relay |

**Qué es:** Cada mensaje de tu web te llega al instante por Telegram o email, con antispam.

**Ejemplo:** Fontanero: «Nueva consulta: fuga en cocina, Calle Mayor 3» le llega al Telegram en 2 segundos.

## 1. Qué le pides al cliente

- Campos del formulario
- Canal de aviso
- Web donde va

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Formulario de contacto con aviso al móvil»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Campos del formulario
- Canal de aviso
- Web donde va

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs formulario-aviso-telegram` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto formulario-aviso-telegram («Formulario de contacto con aviso al móvil») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: investblog/contact-relay. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare que reenvía el formulario.
Campos del cliente:
- Campos del formulario: <...>
- Canal de aviso: <...>
- Web donde va: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Formulario listo para tu web; Aviso por Telegram y/o email; Protección antispam; Histórico de mensajes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs formulario-aviso-telegram tu`.

## 3. Qué entregas

- [ ] Formulario listo para tu web
- [ ] Aviso por Telegram y/o email
- [ ] Protección antispam
- [ ] Histórico de mensajes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Formulario de contacto con aviso al móvil

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Formulario listo para tu web
- Aviso por Telegram y/o email
- Protección antispam
- Histórico de mensajes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [investblog/contact-relay](https://github.com/investblog/contact-relay) · MIT
- [BohdanPetryshyn/formzero](https://github.com/BohdanPetryshyn/formzero) · MIT
