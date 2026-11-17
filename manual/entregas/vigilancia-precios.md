# Vigilancia de precios de la competencia (mes)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 12 € |
| Plazo publicado | Mensual |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker con Cron Trigger |
| Base | dgtlmoon/changedetection.io (Apache-2.0) |

**Qué es:** Te avisamos por email o Telegram cuando un competidor cambia el precio, se queda sin stock o vuelve a tenerlo.

**Ejemplo:** Tienda de bicis: «La Orbea X de la competencia ha bajado de 1.299 € a 1.149 €» llega al móvil a las 9:00.

## 1. Qué le pides al cliente

- Enlaces de los productos
- Precio a partir del cual avisar
- Frecuencia (diaria, cada hora)
- Email o Telegram

**Accesos:**
- Bot de Telegram (token del cliente con @BotFather)

Email listo para mandar:

```text
Asunto: Tu pedido «Vigilancia de precios de la competencia (mes)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Enlaces de los productos
- Precio a partir del cual avisar
- Frecuencia (diaria, cada hora)
- Email o Telegram

Y además (te guiamos paso a paso si no sabes cómo):
- Bot de Telegram (token del cliente con @BotFather)

En cuanto lo tengamos, el plazo es de Mensual.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs vigilancia-precios` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto vigilancia-precios («Vigilancia de precios de la competencia (mes)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: dgtlmoon/changedetection.io (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker con Cron Trigger.
Campos del cliente:
- Enlaces de los productos: <...>
- Precio a partir del cual avisar: <...>
- Frecuencia (diaria, cada hora): <...>
- Email o Telegram: <...>
Accesos que ya me ha dado el cliente:
- Bot de Telegram (token del cliente con @BotFather): <sí/no>
Tiene que quedar: Hasta 25 productos vigilados; Aviso por email o Telegram; Historial de precios de cada producto; Cambio de la lista cuando quieras.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

## 3. Qué entregas

- [ ] Hasta 25 productos vigilados
- [ ] Aviso por email o Telegram
- [ ] Historial de precios de cada producto
- [ ] Cambio de la lista cuando quieras
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Vigilancia de precios de la competencia (mes)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Hasta 25 productos vigilados
- Aviso por email o Telegram
- Historial de precios de cada producto
- Cambio de la lista cuando quieras

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) · Apache-2.0
