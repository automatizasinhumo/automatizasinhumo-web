# Plantillas de correos al cliente

Cinco correos para todo el recorrido, desde el pago hasta la entrega. Los campos `{{…}}` se rellenan a mano o los rellena el sistema.
Los envía David desde hola@ y van firmados «David · Automatiza sin humo».
Los correos 1 y 2 ya salen solos: el recibo del pedido y el aviso de «datos recibidos» los manda `/api/solicitudes`.
Los correos 3, 4 y 5 se mandan a mano al cambiar el estado en Admin → Solicitudes, hasta que se automaticen.

Estado del pedido que ve el cliente en `/order/<token>` y en `/empezar/estado`:

| Estado en admin | Lo que ve el cliente |
|---|---|
| (sin solicitud) | 1 · Pendiente de datos |
| nueva / en_preparacion | 2 · En preparación |
| vista_previa_enviada | 3 · Listo para revisar |
| aprobada / pagada | 4 · Ajustes finales |
| entregada | 5 · Entregado |

Si el cliente aprueba sin cambios, el pedido pasa directamente de `vista_previa_enviada` a `entregada`. Cuando falta información, el estado no cambia y se envía el correo 4.

Regla única de plazos: primera versión en 24-72 h laborables desde que tenemos los datos. Incluye una ronda de ajustes que el cliente puede pedir en los 7 días siguientes. La entrega definitiva llega tras su aprobación.

---

## 1. Pedido confirmado (automático: recibo)

**Asunto:** Pedido {{pedido}} confirmado · Automatiza sin humo

> Hola, {{nombre}}:
>
> Hemos registrado tu pedido {{pedido}} de {{servicio}}.
> Modalidad: {{modalidad}} · Total: {{importe}}
>
> Siguiente paso: envíanos los datos que necesitamos para prepararlo. Puedes hacerlo aquí: {{url_pedido}}
>
> No necesitas volver a pagar.
>
> Un saludo,
> David · Automatiza sin humo

## 2. Datos recibidos (automático)

**Asunto:** Ya tenemos tus datos · {{servicio}}

> Hola, {{nombre}}:
>
> Hemos recibido los datos de tu pedido {{pedido}}. Gracias. Revisamos la información y, si está completa, tendrás una primera versión en 24-72 h laborables.
>
> Si falta algo, te escribimos por este mismo correo. No tienes que volver a pagar.
>
> Puedes consultar el estado aquí: {{url_seguimiento}}

## 3. Listo para revisar (estado → vista_previa_enviada)

**Asunto:** Tu {{servicio}} está listo para revisar

> Hola, {{nombre}}:
>
> Ya puedes revisar tu {{servicio}}: {{url_revision}}
>
> Échale un vistazo y responde a este correo para decirme si te encaja o qué cambiarías. Tienes incluida una ronda de ajustes sobre lo acordado.
>
> {{siguiente_paso}}
>
> Un saludo,
> David

`{{siguiente_paso}}`:
- **Prueba gratis:** «Si te gusta, te enviaré el enlace para contratarlo. Si no, no pagas nada.»
- **Pedido pagado:** «Cuando lo apruebes, prepararé la entrega definitiva. No tienes que volver a pagar.»

## 4. Falta información (sin cambiar estado)

**Asunto:** Nos falta un detalle para preparar tu {{servicio}}

> Hola, {{nombre}}:
>
> He revisado tu solicitud y me falta lo siguiente para continuar:
>
> {{datos_pendientes}}
>
> Puedes responder directamente a este correo con la información. Si todavía no la tienes, dímelo y vemos cómo seguir.
>
> El plazo de preparación empezará cuando tengamos los datos necesarios.
>
> Gracias,
> David

## 5. Entregado (estado → entregada)

**Asunto:** Tu {{servicio}} está entregado · {{pedido}}

> Hola, {{nombre}}:
>
> Tu {{servicio}} ya está entregado. Accede o descárgalo aquí: {{url_entrega}}
>
> También encontrarás las instrucciones para utilizarlo.
>
> Si necesitas algún ajuste sobre lo acordado, responde a este correo durante los próximos 7 días. Tienes una ronda incluida.
>
> Gracias por confiar en Automatiza sin humo.
>
> Un saludo,
> David
