# Carta QR con pedidos por WhatsApp

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Restaurantes y bares |
| Precio | Lo montas tú 99 € · Te lo montamos 199 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | Shahabuddin-mahar/whatsapp-restaurant-qr-menu (demo carta-whatsapp) |

**Qué es:** El cliente elige en la carta, añade al carrito y el pedido te llega por WhatsApp ya escrito.

**Ejemplo:** Pizzería Nápoles: el cliente pide 2 pizzas y te llega «2× Margarita, recoger 21:00» al WhatsApp.

## 1. Qué le pides al cliente

- Carta y precios
- Número de WhatsApp
- Zona y coste de envío
- Horario de pedidos

**Accesos:**
- Número de WhatsApp que recibirá los pedidos

Email listo para mandar:

```text
Asunto: Tu pedido «Carta QR con pedidos por WhatsApp»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Carta y precios
- Número de WhatsApp
- Zona y coste de envío
- Horario de pedidos

Y además (te guiamos paso a paso si no sabes cómo):
- Número de WhatsApp que recibirá los pedidos

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs carta-pedidos-whatsapp` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto carta-pedidos-whatsapp («Carta QR con pedidos por WhatsApp») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: Shahabuddin-mahar/whatsapp-restaurant-qr-menu (demo carta-whatsapp). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Carta y precios: <...>
- Número de WhatsApp: <...>
- Zona y coste de envío: <...>
- Horario de pedidos: <...>
Accesos que ya me ha dado el cliente:
- Número de WhatsApp que recibirá los pedidos: <sí/no>
Tiene que quedar: Carta con carrito; Pedido enviado a tu WhatsApp; Opción recoger / a domicilio; Sin comisiones por pedido.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs carta-pedidos-whatsapp tu`.

## 3. Qué entregas

- [ ] Carta con carrito
- [ ] Pedido enviado a tu WhatsApp
- [ ] Opción recoger / a domicilio
- [ ] Sin comisiones por pedido
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Carta QR con pedidos por WhatsApp

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Carta con carrito
- Pedido enviado a tu WhatsApp
- Opción recoger / a domicilio
- Sin comisiones por pedido

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)
- [Shahabuddin-mahar/whatsapp-restaurant-qr-menu](https://github.com/Shahabuddin-mahar/whatsapp-restaurant-qr-menu) · MIT
