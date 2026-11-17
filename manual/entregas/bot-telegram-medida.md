# Bot de Telegram con menús y pedidos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bots e IA |
| Precio | Lo montas tú 249 € · Te lo montamos 499 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Worker de Cloudflare (o aiogram en un servidor gratuito) |
| Base | aiogram/aiogram (MIT) |

**Qué es:** Bot con botones: catálogo, reservas, avisos y pedidos, conectado a tu hoja de cálculo.

**Ejemplo:** Panadería: el cliente pulsa «Encargar», elige pan y hora, y el pedido cae en la hoja del obrador.

## 1. Qué le pides al cliente

- Opciones del menú
- Datos (productos, horarios)
- Quién recibe los pedidos

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Bot de Telegram con menús y pedidos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Opciones del menú
- Datos (productos, horarios)
- Quién recibe los pedidos

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs bot-telegram-medida` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto bot-telegram-medida («Bot de Telegram con menús y pedidos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: aiogram/aiogram (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare (o aiogram en un servidor gratuito).
Campos del cliente:
- Opciones del menú: <...>
- Datos (productos, horarios): <...>
- Quién recibe los pedidos: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Bot con menús de botones; Conexión con Google Sheets; Avisos programados; Panel de mensajes.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs bot-telegram-medida tu`.

## 3. Qué entregas

- [ ] Bot con menús de botones
- [ ] Conexión con Google Sheets
- [ ] Avisos programados
- [ ] Panel de mensajes
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Bot de Telegram con menús y pedidos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Bot con menús de botones
- Conexión con Google Sheets
- Avisos programados
- Panel de mensajes

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [aiogram/aiogram](https://github.com/aiogram/aiogram) · MIT
