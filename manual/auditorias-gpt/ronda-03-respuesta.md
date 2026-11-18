Ronda 3/25 — Del pago a la entrega

Verificado: código del commit 5fbeaf3. Las correcciones principales están implementadas. No he podido comprobar visualmente el staging: el navegador ha devuelto un error de acceso en las cinco URL. Los hallazgos siguientes proceden del código, no de una sesión de compra ejecutada.

1. Auditoría priorizada

Prioridad

	

URL

	

Hallazgo y cambio concreto




P0

	

/empezar/web-boda-rsvp?pedido=...

	

El lateral sigue mostrando «Si te gusta, pagas» y «Si no, no pagas nada» incluso para un pedido pagado. Sustituir por «Ya has pagado. Revisamos tus datos, preparamos el trabajo, te lo enseñamos y te lo entregamos tras tu aprobación».




P0

	

/order/<token>

	

La página sigue ofreciendo «Envíanos tus datos» aunque el cliente ya los haya enviado. Falta relacionar estructuralmente pedido y solicitud para conocer su progreso. Tras enviarlos, mostrar «Datos recibidos · Estamos preparando tu encargo».




P0

	

/empezar/estado?id=...

	

El seguimiento existente todavía incluye el paso «Pago» y «Todavía no has pagado nada», incluso para solicitudes vinculadas a compras. Diferenciar seguimiento de prueba gratuita y pedido pagado.




P1

	

/empezar/web-boda-rsvp?pedido=otk_falso

	

El código muestra correctamente el aviso ámbar y continúa como prueba gratis. Mejor separar las decisiones: «Revisar mi pedido» y «Solicitar muestra gratuita», evitando que un comprador con un enlace incorrecto crea que debe empezar otra vez.




P1

	

/

	

Conviven «Vista previa en 24–72 h» y tarjetas que prometen «Entrega en 24 h». Aclarar qué plazo corresponde a la primera revisión y cuál a la entrega definitiva.




P1

	

/products/web-boda-rsvp

	

Los textos comunes siguen indicando que, después de pagar, el cliente lo recibe «funcionando», aunque haya elegido «Plantilla + guía». Sustituir por «Recibes el resultado según la modalidad contratada».




P1

	

/pay/<token>

	

Queda «Pay [importe]» en el botón del pago simulado. Cambiar por «Confirmar pedido de prueba · Sin cobro». También «Email para la confirmación» por «Correo de confirmación».




P2

	

/cart

	

«Por unidad» y el aviso del pago demo ya están traducidos en el código. No detecto otra incidencia textual importante. Falta comprobación visual.




P2

	

/categories/bodas

	

La introducción nueva está correctamente incorporada. No detecto problemas textuales en ella.




P2

	

/empezar/gracias

	

El estado visual se elige mediante ?tipo=pedido. Conviene obtenerlo de la solicitud guardada en D1, para que una URL modificada no muestre una confirmación engañosa.

Decisión principal: no invertiría ahora en rediseñar carrito o categorías. El trabajo prioritario está en unir los estados de las solicitudes con los pedidos y evitar mensajes contradictorios después de pagar.

2. Cinco correos listos para utilizar

Los campos entre {{ }} son variables que deberá rellenar el sistema. Los correos están redactados para compras reales; en staging debe identificarse el pedido demo como una simulación sin cobro.

P0 — Correo 1. Pedido confirmado
Pedido {{pedido}} confirmado · Automatiza sin humo
Enviar
Destinatarios

Hola, {{nombre}}:

Hemos registrado tu pedido {{pedido}} de {{servicio}}.

Modalidad: {{modalidad}}
Total: {{importe}}

Siguiente paso: envíanos los datos que necesitamos para prepararlo.

Puedes hacerlo aquí: {{url_pedido}}

No necesitas volver a pagar.

Un saludo,
David
Automatiza sin humo

P0 — Correo 2. Datos recibidos
Ya tenemos tus datos · {{servicio}}
Enviar
Destinatarios

Hola, {{nombre}}:

Hemos recibido los datos de tu {{servicio}}. Gracias.

Revisaré la información y, si está completa, tendrás una primera versión en 24–72 horas laborables.

Si falta algo, te escribiré por este mismo correo.

Puedes consultar el estado aquí: {{url_seguimiento}}

Un saludo,
David

P1 — Correo 3. Muestra o trabajo listo para revisar
Tu {{servicio}} está listo para revisar
Enviar
Destinatarios

Hola, {{nombre}}:

Ya puedes revisar tu {{servicio}}:

{{url_revision}}

Échale un vistazo y responde a este correo para decirme si te encaja o qué cambiarías.

Tienes incluida una ronda de ajustes sobre lo acordado.

{{siguiente_paso}}

Un saludo,
David

La variable {{siguiente_paso}} debe ser distinta según el recorrido: para prueba gratuita, «Si te gusta, te enviaré el enlace para contratarlo»; para compra pagada, «Cuando lo apruebes, prepararé la entrega definitiva. No tienes que volver a pagar».

P1 — Correo 4. Falta información
Nos falta un detalle para preparar tu {{servicio}}
Enviar
Destinatarios

Hola, {{nombre}}:

He revisado tu solicitud y me falta lo siguiente para continuar:

{{datos_pendientes}}

Puedes responder directamente a este correo con la información.

Si todavía no la tienes, dímelo y vemos cómo seguir.

El plazo de preparación empezará cuando tengamos los datos necesarios.

Gracias,
David

P1 — Correo 5. Entregado y cómo pedir cambios
Tu {{servicio}} está entregado · {{pedido}}
Enviar
Destinatarios

Hola, {{nombre}}:

Tu {{servicio}} ya está entregado.

Accede o descarga tu trabajo aquí:
{{url_entrega}}

También encontrarás las instrucciones para utilizarlo.

Si necesitas algún ajuste sobre lo acordado, responde a este correo durante los próximos 7 días. Tienes una ronda incluida.

Gracias por confiar en Automatiza sin humo.

Un saludo,
David

3. Estados del pedido visibles para el cliente

Propongo exactamente cinco estados en /order/<token>. Son estados operativos nuevos: no están implementados todavía como un seguimiento unificado del pedido.

Estado

	

Texto exacto para mostrar




1. Pendiente de datos

	

«Tu pedido está confirmado. Necesitamos tus datos para empezar». Botón: Enviar mis datos.




2. En preparación

	

«Ya tenemos tus datos y estamos preparando tu encargo. Te avisaremos cuando puedas revisarlo».




3. Listo para revisar

	

«Tu primera versión está lista. Revísala y dinos si la apruebas o necesitas ajustes». Botón: Ver mi trabajo.




4. Ajustes finales

	

«Hemos recibido tus cambios y estamos aplicándolos. Te avisaremos cuando estén listos».




5. Entregado

	

«Tu trabajo está entregado. Puedes acceder a él y consultar las instrucciones». Botón: Acceder a mi entrega.

Regla de funcionamiento: si el cliente aprueba la primera versión sin cambios, se pasa directamente del estado 3 al 5. Si falta información, se mantiene el estado correspondiente con un aviso destacado «Necesitamos información para continuar», sin crear un sexto estado.

La página del pedido debería mostrar también la fecha del último cambio y un enlace para contactar.

4. Regla única de plazos y revisiones

P1 — Texto propuesto para todas las fichas:

Vista previa en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes solicitada en los 7 días siguientes a la vista previa. Entrega definitiva según el plazo indicado en cada servicio, tras tu aprobación.

Así quedan diferenciados el tiempo de preparación, los cambios incluidos y la entrega final. Es una propuesta de condiciones comerciales que habría que adoptar y cumplir de forma uniforme, no una garantía ya verificada.

5. Qué implementaría primero

P0: vincular cada solicitud al pedido y a su línea de servicio en D1, con un estado de producción persistente.

P0: actualizar /order/<token> cuando los datos ya estén enviados, y adaptar /empezar/estado para compras pagadas.

P0: corregir el lateral de /empezar/ para que nunca vuelva a ofrecer pagar después de una compra.

P1: automatizar los cinco correos a partir de transiciones reales de estado, evitando duplicados.

P1: implantar la regla única de plazos y revisiones y corregir el último botón en inglés.

Veredicto de la ronda 3: la validación del pago y la modalidad ha mejorado. La principal carencia pendiente es el seguimiento posterior: actualmente existen pedido, solicitud y seguimiento, pero todavía no funcionan como una única experiencia de entrega para el cliente.

La ronda 4 debería centrarse en comprobar esa integración y la calidad de los mensajes cuando el cliente responde, solicita cambios o da su aprobación.