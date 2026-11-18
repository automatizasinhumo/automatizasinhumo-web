Ronda 2/25 — Auditoría del embudo transaccional

Staging: Automatiza sin humo
Fecha: 17 de noviembre de 2026

Alcance y limitaciones

He recorrido los enlaces públicos de los tres casos y comprobado el contenido que devuelve el navegador disponible. Hay una limitación importante: puedo abrir páginas y seguir enlaces, pero no ejecutar el JavaScript de la tienda, seleccionar opciones en un navegador gráfico ni enviar formularios. Por tanto, no puedo certificar que añadir al carrito, finalizar el pago o guardar solicitudes funcione.

También he encontrado una discrepancia: varias páginas recuperadas siguen mostrando textos anteriores a las modificaciones que has aplicado. Por ejemplo, el buscador todavía devuelve «¿Qué necesita tu negocio?» y algunas fichas mantienen «desde 49 €». Puede deberse a una versión anterior conservada por la herramienta de navegación. No voy a considerar esos textos regresiones confirmadas sin comprobar el HTML servido sin caché.

Las prioridades siguientes se centran en los fallos y riesgos específicos de este embudo. Excluyo la revisión legal, el dominio definitivo y los pagos reales, tal como has pedido.

Caso 1. Dueña de un bar que necesita una carta QR

Recorrido comprobado: portada → búsqueda → ficha → demo interactiva → prueba gratis

Paso

	

URL

	

Problema

	

Gravedad

	

Cambio concreto




1. Portada

	

/

	

La propuesta es clara, pero hay que distinguir entre comprar y empezar sin pagar. El mensaje «Sin pago por adelantado» puede interpretarse como aplicable también a la compra directa.

	

P1

	

«Tú eliges: contrata directamente o solicita una muestra gratis sin tarjeta».




2. Buscar carta

	

/search?q=carta

	

No he podido recuperar exactamente esta búsqueda. Sí he comprobado /search?q=carta+QR: devuelve la carta digital, un paquete de códigos QR y la carta con pedidos. La carta aparece correctamente en primer lugar.

	

P2

	

Mantener la carta digital en primer lugar para carta, carta QR, menú QR y código QR restaurante.




3. Ficha

	

/products/carta-qr

	

El bloque de compra precede a la demo. La dueña todavía no ha visto el producto cuando se le ofrecen los botones de contratación.

	

P1

	

Colocar una vista previa inmediatamente después del título y los precios. CTA: «Ver una carta de ejemplo».




4. Demo

	

/carta-whatsapp/ en el dominio de demos

	

La demo principal está íntegramente en inglés, utiliza PKR e incluye pedidos por WhatsApp, una función de otro producto.

	

P0

	

Usar como primera demo una carta sencilla de bar en español, con tapas, bebidas, alérgenos y precios en euros, sin pedidos.




5. Volver de la demo

	

Dominio de demos

	

El enlace del pie apunta al dominio público general, no a la ficha concreta de Carta QR. Se pierde el contexto del servicio.

	

P1

	

«Volver a Carta digital con QR» → /products/carta-qr.




6. Pedir prueba

	

/empezar/carta-qr

	

Es posible comenzar con pocos datos, pero no se explica mediante un ejemplo cómo introducir una carta completa ni qué ocurre si tiene muchos platos.

	

P1

	

«Puedes pegar aquí tu carta o escribir unos cuantos platos. Si la tienes en PDF o en fotos, te indicaremos cómo enviarla».




7. Elegir modalidad

	

/empezar/carta-qr

	

El texto explicativo dice que, tras pagar, «te lo entregamos funcionando», incluso si se escoge la modalidad para publicar uno mismo.

	

P1

	

«Si te gusta, pagas y recibes la plantilla preparada o la carta publicada, según la modalidad elegida».




8. Enviar solicitud

	

/empezar/carta-qr

	

La confirmación posterior al envío no se ha podido comprobar sin realizar una solicitud real.

	

P0, pendiente de QA

	

Mostrar página de éxito, identificador de solicitud y resumen de los siguientes pasos, sin volver a pedir el pago.

La demo de Carta QR es el problema más evidente de este recorrido. No es una cuestión estética: demuestra una funcionalidad adicional y una experiencia comercial distinta de la que la ficha está vendiendo por 49 € o 129 €. 
Automatiza sin humo
+3

Confirmación recomendada tras solicitar la prueba

Solicitud recibida

Ya tenemos los datos de tu carta QR

No has pagado nada. Revisaremos la información y te enviaremos una vista previa en 24–72 horas laborables.

Referencia: ASH-PRUEBA-001 · Carta digital con QR

Si necesitamos fotografías o más platos, te escribiremos al correo que has indicado.

Cuando veas la muestra, decidirás si quieres contratarla.

La referencia es ilustrativa. En producción debe utilizarse el identificador real generado por el sistema.

Hallazgo crítico adicional en el código del embudo

He contrastado el recorrido con el repositorio conectado davidpd89/automatizasinhumo-web (rama main). Esto permite precisar algo que la navegación pública no mostraba.

P0 — La confirmación de solicitud no distingue entre una prueba gratuita y un pedido pagado.

El formulario utiliza /api/solicitudes para ambos recorridos. Después de guardarlo redirige a:

/empezar/gracias?id=S-...

La página /empezar/gracias muestra siempre:

«No has pagado nada».

«Vista previa en 24–72 h laborables».

«Pagas solo si te gusta».

Esto es correcto para la dueña del bar que solicita una prueba, pero incorrecto para quien acaba de pagar una web de boda.

Cambio imprescindible: separar las confirmaciones en dos estados, prueba_gratis y pedido_pagado. En el segundo, mostrar «Ya hemos recibido los datos de tu pedido. No tienes que pagar de nuevo».

He comprobado también que existe una página de seguimiento en /empezar/estado?id=S-... y que el envío del formulario guarda la solicitud antes de intentar enviar el correo. Es una buena decisión técnica. No obstante, si falla el proveedor de correo, actualmente se continúa a la página de éxito: el sistema debe avisar internamente del fallo y permitir consultar la solicitud desde el panel.

P0 — Falta validar que el pedido indicado en el formulario sea realmente un pedido pagado.

En el código consultado, /empezar/<servicio>?pedido=... acepta un identificador con formato válido y cambia los textos a «Pedido pagado». El receptor /api/solicitudes no comprueba que ese identificador corresponda a un pedido existente y pagado antes de tratarlo como tal.

Esto permite generar una solicitud que se presenta como vinculada a una compra sin haber acreditado esa compra.

Corrección: resolver el pedido mediante un identificador de acceso válido, comprobar en D1 su estado de pago y relacionar la solicitud con ese pedido de forma inequívoca. Una solicitud con una referencia inexistente, no pagada o de otro servicio nunca debe clasificarse como pagada.

Estos dos puntos pasan por delante de las mejoras visuales del embudo.

Caso 2. Pareja que se casa y quiere comprar directamente

Recorrido: portada → Bodas y eventos → ficha → carrito → checkout de prueba → pedido → envío de datos

Paso

	

URL

	

Problema

	

Gravedad

	

Cambio concreto




1. Descubrimiento

	

/categories/bodas

	

La categoría contiene los cuatro servicios esperados, pero apenas explica la diferencia entre web de boda, invitación digital y gestión de invitados.

	

P2

	

Añadir una introducción: «Crea la web de vuestra boda, recoge confirmaciones y organiza a los invitados. Elige solo lo que necesitéis».




2. Elegir web

	

/products/web-boda-rsvp

	

La ficha permite elegir entre 99 € y 249 €, pero es esencial que la modalidad elegida acompañe al pedido hasta la entrega.

	

P0, pendiente de E2E

	

Incluir modalidad y precio en la línea del carrito, checkout, pedido confirmado y formulario posterior.




3. Añadir al carrito

	

/products/web-boda-rsvp

	

Existe el botón «Añadir al carrito». No he podido ejecutarlo en el navegador disponible. El código confirma un POST /api/cart que resuelve las variantes contra D1.

	

P0, pendiente de E2E

	

Comprobar que 249 € y «Te lo montamos» se mantienen al añadir la variante correspondiente.




4. Revisar carrito

	

/cart

	

El código incluye modificación de cantidad, eliminación y subtotal. Hay textos ingleses residuales, como «each», y otros mensajes de disponibilidad.

	

P1

	

«249 € por unidad», «Quitar» y todos los mensajes de error en español.




5. Ir a pagar

	

/api/checkout → /checkout?method=demo → /pay/<token>

	

En modo demo, /checkout genera automáticamente una operación pendiente y conduce a la pantalla de pago simulado. No presenta un paso ordinario de introducción de dirección.

	

P2

	

Es aceptable para productos digitales en staging, siempre que quede claro que es una simulación.




6. Antes de pagar

	

/pay/<token>

	

La pantalla de prueba incluye un botón «Pay [importe]», opciones «Decline» y campos simulados de tarjeta. Puede provocar dudas a un particular español.

	

P1

	

Botón: «Confirmar pedido de prueba · No se cobra nada». Traducir todos los resultados simulados.




7. Pedido confirmado

	

/order/<token>

	

El código crea una página con número de pedido, total y un bloque «Envíanos tus datos para empezar». Es el comportamiento buscado, pero no he podido ejecutarlo de extremo a extremo.

	

P1

	

Dar más protagonismo al botón «Rellenar los datos de nuestra boda».




8. Enviar datos

	

/empezar/web-boda-rsvp?pedido=...

	

La página permite escoger nuevamente la modalidad y, si no se especifica en la URL, preselecciona «Plantilla + guía». Aunque la pareja haya contratado la de 249 €.

	

P0

	

No permitir cambiar la modalidad pagada en este formulario. Mostrar «Modalidad contratada: Te lo montamos · 249 €».




9. Confirmación de datos

	

/empezar/gracias?id=...

	

La confirmación es idéntica a la prueba gratuita y afirma que no se ha pagado.

	

P0

	

Mensaje específico para pedidos pagados, sin ofrecer otro pago.

La ruta de pedido incorpora medidas correctas: utiliza un token de acceso para clientes no registrados, impide cachear la página y elimina el carrito cuando el pedido ya está confirmado. El problema es que esa vinculación segura se pierde al pasar del pedido al formulario de datos.

Cómo debe funcionar después del pago

Por el código consultado, el recorrido previsto es:

Pago simulado aprobado

Se crea un pedido marcado como demo, sin cobro.

Página del pedido

/order/<token> presenta el número, los artículos, el importe y «Envíanos tus datos para empezar».

Formulario de la web de boda

Se solicitan nombres, fecha, lugares, programa, fotografías y menús. El pedido debería determinar automáticamente la modalidad.

Confirmación

Se registra una solicitud en D1 y se intenta enviar un correo de confirmación.

Preparación y entrega

La ficha promete vista previa en 24–72 horas laborables y entrega en tres días desde su aprobación.

Los pasos están implementados como piezas independientes. Falta comprobar su integración completa y corregir la relación entre pedido y solicitud.

Propuesta de pantalla posterior al pago

Compra confirmada

Vamos a preparar vuestra web de boda

Web con confirmación de asistencia · Te lo montamos · 249 €

El pago ya está registrado. Para empezar necesitamos algunos detalles de vuestra boda.

Siguiente paso: enviadnos vuestros datos.

Podéis completar lo que tengáis y añadir el resto cuando os lo pidamos.

Recomiendo que esa pantalla muestre la fecha de boda, cuando se conozca, y que nunca afirme «ya está pagado» únicamente porque una URL contiene un parámetro pedido.

Caso 3. Particular que no sabe qué necesita

Recorrido: portada → «Cuéntanos qué necesitas» → /empezar/consulta

Paso

	

URL

	

Problema

	

Gravedad

	

Cambio concreto




1. Entrada

	

/

	

El botón «Cuéntanos qué necesitas» es apropiado y lleva a la consulta general.

	

P2

	

Mantenerlo. Añadir cerca «También para proyectos personales».




2. Primera impresión

	

/empezar/consulta

	

«David te responde con una propuesta, un precio cerrado y una vista previa» promete una muestra antes de saber si el proyecto es viable o qué servicio necesita.

	

P1

	

«Cuéntame qué necesitas. Te propondré una solución y su precio cerrado, sin compromiso. Si encaja, podremos preparar una muestra gratuita».




3. Información de contacto

	

/empezar/consulta

	

Nombre, correo y teléfono opcional son suficientes. No hace falta añadir más datos obligatorios.

	

P2

	

Mantener estos tres campos y aclarar que el teléfono es opcional.




4. Explicar necesidad

	

/empezar/consulta

	

El ejemplo del campo habla de una peluquería. No ayuda a alguien que prepara un cumpleaños, un regalo o una web personal.

	

P1

	

Placeholder: «Por ejemplo: quiero organizar un cumpleaños y que los invitados confirmen si vienen, pero no sé qué necesito».




5. Avanzar

	

/empezar/consulta

	

El código usa un formulario progresivo con botones «Siguiente» y «Atrás». No he podido verificar su funcionamiento en navegador gráfico.

	

P1, pendiente de E2E

	

Validar el paso actual antes de avanzar y conservar lo escrito cuando se retrocede o existe un error.




6. Después de enviar

	

/empezar/gracias?id=...

	

La confirmación promete la misma vista previa de 24–72 h que los servicios definidos. Puede ser un compromiso difícil de cumplir en consultas abiertas.

	

P1

	

Para consultas: «Hemos recibido tu idea. Revisaremos qué solución encaja y te responderemos antes de preparar una muestra».

La consulta general es bastante sencilla. No le añadiría un cuestionario comercial de diez preguntas. Bastaría con ofrecer tres ejemplos de proyectos personales bajo el campo libre.

Una mejora adicional sería indicar que no es necesario conocer términos técnicos: «Explícalo con tus palabras, aunque no sepas qué servicio elegir». 
Automatiza sin humo

4. Los 10 cambios con mayor impacto en conversión

Clasificación por impacto esperado y esfuerzo técnico. P0 también incluye riesgos de integridad de pedidos, aunque no sean problemas puramente comerciales.

Orden

	

Prioridad

	

Cambio

	

Impacto

	

Esfuerzo




1

	

P0

	

Validar y vincular en D1 cada solicitud posterior al pago con un pedido real, pagado y del mismo servicio

	

Crítico

	

Medio




2

	

P0

	

Bloquear la modalidad contratada en el formulario posterior al pago

	

Muy alto

	

Bajo/medio




3

	

P0

	

Separar confirmaciones de prueba gratis y compra pagada

	

Muy alto

	

Bajo




4

	

P0

	

Probar automáticamente todo el recorrido y la persistencia real de carrito, pedido y solicitud

	

Muy alto

	

Medio




5

	

P0

	

Sustituir la demo principal de carta QR por una muestra comercial fiel al servicio

	

Muy alto

	

Medio




6

	

P1

	

Mostrar la demo principal antes de pedir la compra

	

Alto

	

Medio




7

	

P1

	

Traducir la pantalla de pago demo y etiquetar claramente la ausencia de cobro

	

Alto

	

Bajo




8

	

P1

	

Permitir volver de cada demo directamente a su ficha

	

Alto

	

Bajo




9

	

P1

	

Diferenciar la respuesta a una consulta abierta de la entrega de una prueba personalizada

	

Medio/alto

	

Bajo




10

	

P1

	

Conservar la información del formulario ante errores y controlar los envíos duplicados

	

Alto

	

Medio

El primer cambio es el más importante: si el sistema permite que una referencia escrita en una URL determine por sí sola que alguien ha pagado, no se puede utilizar esa información como estado fiable del pedido.

Un segundo detalle técnico: el formulario con ?pedido= no recibe la modalidad desde /order/<token>. Para solucionarlo, no basta con añadir &modalidad=pro al enlace: ese parámetro también puede manipularse. La modalidad debe recuperarse del pedido guardado en D1.

5. Comprobaciones automáticas con Playwright

He revisado también los controles que ya tienes en GitHub.

Actualmente existen:

.github/workflows/verify.yml: pruebas unitarias, integración, compilación y comprobaciones generales.

.github/workflows/empleados-qa.yml: smoke, Lighthouse, accesibilidad y enlaces.

qa/smoke.sh: verifica respuestas HTTP y algunos textos.

Lo que falta es una suite E2E de comprador real, que seleccione una modalidad, compruebe el carrito, siga los formularios y verifique los estados posteriores. Los controles existentes no sustituyen esa prueba.

Matriz de pruebas E2E propuesta

Los selectores data-* indicados como existentes proceden del código de main. Los que identifico como nuevos deben añadirse. Algunos resultados esperados todavía requieren implementar las correcciones P0.

Caso 1 — Carta QR

ID

	

Prioridad

	

Selector o acción Playwright

	

Resultado esperado




E01

	

P0

	

/ → input[name="q"] → escribir carta → botón «Buscar»

	

Navega a /search?q=carta y aparece «Carta digital con código QR».




E02

	

P1

	

Primer resultado para carta

	

Carta digital aparece antes que los servicios de QR genéricos.




E03

	

P0

	

/products/carta-qr → input[name="variant_id"]

	

Se pueden seleccionar 49 € y 129 €. El precio seleccionado es coherente.




E04

	

P1

	

[data-demo-visor]

	

Existe una demo principal que se carga correctamente y no da error.




E05

	

P1

	

Demo principal

	

Muestra contenido en español y precios en euros. No anuncia pedidos por WhatsApp como funcionalidad de la carta básica.




E06

	

P0

	

Enlace «Empieza gratis»

	

Navega a /empezar/carta-qr y presenta el formulario correcto.




E07

	

P0

	

input[name="nombre"], input[name="email"] y consentimiento

	

No permite enviar nombre vacío, correo inválido o consentimiento sin marcar.




E08

	

P0

	

Enviar solicitud válida en entorno de pruebas aislado

	

Guarda exactamente una solicitud y redirige a /empezar/gracias?id=S-....




E09

	

P1

	

[data-solicitud-id] y [data-seguimiento]

	

Aparece la referencia y el seguimiento funciona.

Caso 2 — Compra de boda

ID

	

Prioridad

	

Selector o acción Playwright

	

Resultado esperado




E10

	

P1

	

/categories/bodas

	

Aparecen los cuatro servicios de la categoría.




E11

	

P0

	

/products/web-boda-rsvp → seleccionar «Te lo montamos»

	

Queda seleccionada la variante de 249 €.




E12

	

P0

	

Botón «Añadir al carrito» → /cart

	

El carrito conserva servicio, modalidad y precio de 249 €.




E13

	

P0

	

input[name="qty"] y botón «Actualizar»

	

La cantidad y el subtotal cambian correctamente.




E14

	

P0

	

Botón «Quitar»

	

El artículo desaparece y el subtotal se actualiza.




E15

	

P0

	

Añadir producto de nuevo → botón «Pago de prueba»

	

El método demo conduce al flujo /checkout → /pay/<token>, sin cobro.




E16

	

P1

	

Pantalla /pay/<token>

	

Indica claramente «No se cobra nada», muestra el importe y no contiene textos ingleses.




E17

	

P0

	

Confirmación de pago demo en base de datos de prueba

	

Se crea exactamente un pedido demo, con modalidad e importe correctos.




E18

	

P0

	

/order/<token> → [data-siguiente-paso]

	

Aparece «Envíanos tus datos para empezar» y enlace al servicio contratado.




E19

	

P0

	

/empezar/web-boda-rsvp?pedido=...

	

Identifica el pedido real, recupera «Te lo montamos» y no ofrece volver a pagar.




E20

	

P0

	

Sustituir pedido por un valor inexistente

	

No presenta el pedido como pagado ni permite asociar una solicitud a él.




E21

	

P0

	

Cambiar el slug por otro servicio distinto del comprado

	

Rechaza la asociación incorrecta.




E22

	

P0

	

Enviar datos del pedido pagado

	

Muestra una confirmación específica de pedido pagado, nunca «Pagas solo si te gusta».

Caso 3 — Consulta de particular

ID

	

Prioridad

	

Selector o acción Playwright

	

Resultado esperado




E23

	

P1

	

/ → enlace «Cuéntanos qué necesitas»

	

Navega a /empezar/consulta.




E24

	

P1

	

textarea[name="mensaje"]

	

Muestra ejemplos de proyectos personales y acepta una descripción libre.




E25

	

P0

	

[data-siguiente] y [data-atras]

	

Se puede avanzar y retroceder, y los datos introducidos permanecen.




E26

	

P0

	

Enviar con correo incorrecto o mensaje vacío

	

Se bloquea el envío, se muestra un error comprensible y no se crea una solicitud.




E27

	

P0

	

Enviar consulta válida en entorno aislado

	

Se crea una solicitud de tipo consulta general y aparece su referencia.




E28

	

P1

	

Simular fallo de D1 o error 500

	

Se muestra un error y no una confirmación falsa. Se permite reintentar sin perder los datos.

Cuatro pruebas adicionales obligatorias

Estas cubren problemas transversales que no se detectan solo visitando las páginas.

ID

	

Prioridad

	

Comprobación

	

Resultado esperado




E29

	

P0

	

Doble clic sobre envío y reintento de la misma operación

	

No se crean solicitudes ni pedidos duplicados; idempotencia del lado servidor.




E30

	

P0

	

Abrir una URL de otro pedido sin su token de acceso autorizado

	

No se exponen datos del comprador ni se concede acceso.




E31

	

P1

	

Fallo simulado del proveedor de correo

	

La solicitud sigue registrada y queda constancia del fallo de notificación.




E32

	

P1

	

Ejecutar los tres recorridos en móvil de 390 px

	

Botones visibles, formularios utilizables, sin desbordamiento horizontal ni elementos tapados.

Ejemplo de test Playwright adaptado a tu código

Este fragmento comprueba el recorrido de boda sin completar ningún pago. Utiliza los nombres y controles existentes en el repositorio; debe ejecutarse y validarse contra el despliegue actualizado.

TypeScript

import { test, expect } from '@playwright/test';

const BASE =
  'https://automatizasinhumo-staging.davidpd89.workers.dev';

test('Boda: la modalidad se conserva en el carrito', async ({ page }) => {
  await page.goto(`${BASE}/products/web-boda-rsvp`);

  await expect(
    page.getByRole('heading', {
      name: /web de boda con confirmación de asistencia/i
    })
  ).toBeVisible();

  await page.locator(
    'input[name="variant_id"]'
  ).last().check();

  await expect(
    page.locator('input[name="variant_id"]:checked')
  ).toHaveAttribute('data-price', '24900');

  await Promise.all([
    page.waitForResponse(r =>
      r.url().includes('/api/cart') &&
      r.request().method() === 'POST' &&
      r.status() < 400
    ),
    page.getByRole('button', {
      name: /añadir al carrito/i
    }).click()
  ]);

  await page.goto(`${BASE}/cart`);

  await expect(
    page.getByText('Web de boda con confirmación de asistencia')
  ).toBeVisible();

  await expect(
    page.getByText('Te lo montamos')
  ).toBeVisible();

  await expect(
    page.getByText(/249,00\s*€/)
  ).toBeVisible();
});

test('Consulta: el formulario exige datos válidos', async ({ page }) => {
  await page.goto(`${BASE}/empezar/consulta`);

  await expect(
    page.getByRole('heading', {
      name: 'Cuéntanos qué necesitas'
    })
  ).toBeVisible();

  await expect(
    page.locator('input[name="nombre"]')
  ).toHaveAttribute('required', '');

  await expect(
    page.locator('input[name="email"]')
  ).toHaveAttribute('type', 'email');

  await expect(
    page.locator('textarea[name="mensaje"]')
  ).toHaveAttribute('required', '');

  await expect(
    page.locator('input[name="consentimiento"]')
  ).toHaveAttribute('required', '');
});


El primer test debe adaptarse si cambia el comportamiento del formulario de carrito. No he ejecutado estos tests contra el staging, así que no afirmo que ya pasen.

Cómo integrarlo en GitHub Actions

Recomiendo añadir un trabajo embudo-e2e al sistema de QA que ya tienes, en lugar de duplicar Lighthouse y el resto de comprobaciones.

La instalación oficial de Playwright utiliza npm ci, npx playwright install --with-deps y npx playwright test. Para CI recomienda limitar el número de trabajadores y conservar trazas de los errores. 
Playwright

Comandos iniciales:

Bash

npm install -D @playwright/test
npx playwright install --with-deps chromium
npx playwright test --project=chromium


En GitHub Actions, utiliza ubuntu-latest, Node 22 y un solo trabajador. Lanza la suite después del despliegue a staging, no simplemente al hacer un push, para evitar comprobar una versión anterior.

Coste: GitHub Actions ofrece ejecutores estándar gratuitos para repositorios públicos. Como tu repositorio es privado, las ejecuciones consumen la cuota incluida en tu plan y podrían generar costes si se supera. Para esta suite pequeña debería ser posible mantener el consumo reducido, pero no puedo garantizar coste cero sin conocer el uso acumulado. 
GitHub Docs

Para los tests que confirmen pagos demo o envíen formularios, recomiendo una base D1 de pruebas separada y notificaciones de correo desactivadas o simuladas. No deben generar pedidos ni correos en el staging de uso comercial cada vez que se ejecuta GitHub Actions.

Cierre de la ronda 2

Estado de los tres recorridos

Validación disponible

Carta QR gratuita

	

Navegación y confirmación previstas verificadas. Envío real no ejecutado.




Compra de boda

	

Rutas y lógica inspeccionadas. Detectados dos problemas P0 en la asociación del pedido.




Consulta particular

	

Formulario y tratamiento previsto inspeccionados. Envío real no ejecutado.

La prioridad inmediata es corregir la asociación entre pedido, modalidad y solicitud, y después ejecutar E17–E22 con una D1 aislada. Son las pruebas que determinarán si el recorrido comercial funciona como un sistema único y no solo como varias páginas conectadas.

También aconsejo identificar el SHA exacto desplegado en staging para comprobar que coincide con el código que se está auditando. La discrepancia entre las mejoras que has indicado y algunos textos recuperados hace necesaria esa comprobación.

Para la siguiente ronda, el área con mayor valor sería la confirmación y entrega: qué ve el comprador después de dejar sus datos, qué recibe por correo, cómo se gestionan los estados del pedido y qué ocurre cuando falta información o se retrasa una entrega.