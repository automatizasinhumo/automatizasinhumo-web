Auditoría sénior — Ronda 1 de 25
Hay problemas importantes antes del lanzamiento

Fecha: 17 de noviembre de 2026
Web auditada: Automatiza sin humo — staging

He podido acceder al contenido público de la portada, /search, /pages/demos, /cart, cuatro fichas principales, cuatro formularios de prueba gratuita, varias demos externas y páginas informativas y legales. También he abierto imágenes reales del catálogo.

La auditoría permite comprobar textos, enlaces, imágenes individuales y respuestas HTML. No equivale a una sesión completa con navegador gráfico: no he podido ejecutar los botones de compra ni completar el pago, y /checkout no ha sido accesible mediante el navegador disponible. No consideraré estos límites de comprobación como errores demostrados de la web.

1. Problemas P0 — Máxima prioridad
P0.1. El precio anunciado y el servicio completamente montado generan expectativas distintas

URL: /products/web-una-pagina, /products/carta-qr, /products/web-boda-rsvp y resto de fichas con modalidades

La portada promete servicios resueltos «sin complicaciones», pero los precios destacados corresponden a la opción en la que el comprador debe publicar su propia plantilla.

Servicio

	

Precio anunciado

	

Montado y funcionando




Web de una página

	

149 €

	

349 €




Carta QR

	

49 €

	

129 €




Web de boda

	

99 €

	

249 €




Gestión de invitados

	

79 €

	

179 €

Esto no significa que los precios sean incorrectos. El problema es la percepción del comprador: podría descubrir que la opción que imaginaba cuesta más del doble. 
Automatiza sin humo
+3

Cambio concreto: mostrar ambos precios directamente en las tarjetas, especialmente en portada, y dejar de utilizar únicamente «desde».

Propuesta de texto:

Web de una página

Tu negocio en internet, preparado con tus datos.

Plantilla para publicar tú

149 €

Te la entregamos funcionando

349 €

Puedes ver una muestra gratis antes de decidir.

Alternativa B, más compacta: «Desde 149 € para publicar tú · 349 € lista para usar».

Recomiendo la primera para la ficha y la segunda para las tarjetas del catálogo.

P0.2. Algunas demos enseñan un producto diferente o poco representativo de lo que se vende

URL: /pages/demos y fichas enlazadas

He confirmado estos casos:

Carta digital con QR: su demo interactiva muestra un restaurante llamado Urban Grill & Cafe, íntegramente en inglés, que utiliza rupias pakistaníes (PKR). Además, incorpora pedidos por WhatsApp, función comercializada por separado.

Web de boda: varios ejemplos están en inglés, con localizaciones extranjeras, información de plantilla y enlaces a proveedores externos.

Gestión de invitados y plano de mesas: la imagen destacada muestra un formulario de confirmación de asistencia. No demuestra la funcionalidad principal: organizar invitados y distribuir mesas.

Web de una página: algunos ejemplos muestran páginas de proveedores de plantillas gratuitas, con enlaces para descargarlas.

Los ejemplos se presentan expresamente como muestras, y se advierte que el resultado final será personalizado y en español. Esa aclaración ayuda, pero no elimina la fricción comercial. 
Restaurant QR Menu & WhatsApp Order
+4

Cambio concreto: antes de dirigir tráfico a la web, dar prioridad a cuatro demos comerciales completas y en español: peluquería, carta QR, boda y gestión de invitados.

Cada demo debería tener datos españoles ficticios, euros, funciones acordes con el precio anunciado y una acción clara para volver a la ficha. Los enlaces a repositorios o proveedores originales no deberían competir visualmente con la contratación.

No hace falta rehacer las 51 demos inicialmente. Sí asegurar que las cuatro principales representan fielmente lo que se entrega.

P0.3. La información legal y las condiciones de compra necesitan correcciones

URLs: /pages/aviso-legal y /pages/condiciones

El aviso legal identifica al titular y facilita el correo electrónico, pero no muestra domicilio ni NIF. Indica que los datos fiscales completos se proporcionarán en la factura.

El artículo 10 de la LSSI exige que determinados datos identificativos, incluidos domicilio y NIF, sean accesibles desde la web. También exige claridad sobre impuestos aplicables. 
Automatiza sin humo
+1

Cambio: completar el aviso legal antes de aceptar pagos reales, sin esperar a emitir una factura.

También revisaría la frase que afirma que no existe derecho de desistimiento una vez entregado y aceptado el contenido personalizado. La regulación distingue entre servicios, bienes personalizados y contenidos digitales, con condiciones específicas para determinadas excepciones. La redacción actual es demasiado general. 
Automatiza sin humo
+1

Esto requiere una revisión jurídica antes del lanzamiento, no únicamente un retoque de estilo.

P0.4. Los plazos y los ajustes incluidos no se comunican de forma consistente

URLs: /, /pages/como-funciona, /pages/preguntas-frecuentes y /products/web-una-pagina

En portada aparece «Listos en 24–48 h». Sin embargo, la ficha de la web anuncia una vista previa en 24–72 horas laborables y una entrega posterior de 48 horas desde la aprobación.

Además, las condiciones generales hablan de una ronda de cambios, mientras que «Te lo montamos» promete ajustes posteriores sin delimitar claramente el plazo. 
Automatiza sin humo
+3

Sustituir el reclamo de portada por:

Vista previa en 24–72 horas laborables. Entrega desde 24 horas tras aprobarla, según el servicio.

Y establecer una regla común para las 71 fichas: cuántas revisiones incluye cada modalidad, durante cuánto tiempo pueden solicitarse y qué se considera un cambio adicional.

P0.5. Compra, pago y pedido: comprobación funcional pendiente y bloqueante

URLs: /cart, /checkout, /empezar/web-una-pagina?pedido=...

No he podido verificar el recorrido de compra completo. El carrito vacío sí responde correctamente, pero la navegación disponible no permite accionar «Añadir al carrito» ni «Contratar ahora» como lo haría un comprador.

Antes de lanzar, estos son los criterios de aceptación imprescindibles:

Seleccionar modalidad, añadir al carrito y conservar el precio elegido.

Poder modificar o eliminar el artículo sin perder el resto del carrito.

Completar el checkout de demostración sin cobro.

Crear un número de pedido único y mostrar una confirmación.

Llevar al comprador a /empezar/<servicio>?pedido=..., con el servicio y la modalidad correctos.

Diferenciar visualmente un pedido ya contratado de una solicitud de prueba gratuita.

Enviar los datos, obtener confirmación y registrar la solicitud para su entrega.

En particular, el formulario posterior al pago debería comenzar así:

Pedido confirmado

Siguiente paso: envíanos tus datos

Ya hemos registrado tu pedido de Web de una página. Solo necesitamos algunos datos para prepararla.

Pedido: ASH-000123 · Modalidad: Te lo montamos

No tienes que volver a pagar.

Recibirás una confirmación al terminar el formulario.

Es una propuesta de diseño, no una pantalla que haya podido comprobar en staging.

2. Problemas P1 — Conversión, navegación y comprensión

Paso y URL exacta

	

Problema observado

	

Cambio concreto




Portada /

	

Se presentan 71 servicios y numerosas categorías, pero las necesidades particulares no destacan en la navegación principal.

	

Introducir accesos «Tengo un negocio» y «Estoy organizando un evento», con 3–4 servicios destacados para cada público.




Buscador /search

	

El titular pregunta «¿Qué necesita tu negocio?», aunque también se vende a particulares.

	

Cambiarlo por «¿Qué necesitas resolver?» y ofrecer accesos a bodas, cumpleaños y proyectos personales.




Resultados /search?q=boda

	

Entre los tres resultados aparece «Dossier comercial en PDF con tu marca», poco pertinente para esa búsqueda.

	

Clasificar por intención y categoría antes de recurrir a coincidencias textuales.




Resultados /search?q=reservas

	

Aparecen servicios poco pertinentes, como una web en otro idioma y un aviso de caída de webs.

	

Priorizar reservas de mesa, citas, peluquerías y páginas de cita previa.




Ficha /products/web-una-pagina

	

Repite el proceso de compra y prueba varias veces; la demo aparece después de mucho contenido.

	

Colocar precio, modalidad, demo y dos CTA principales al principio. Dejar las explicaciones extensas más abajo.




Demos /pages/demos

	

Hay 51 ejemplos, con una mezcla de funcionalidades y diseños.

	

Añadir filtros claramente diferenciados: «Funcionan y puedo probarlos» y «Solo muestran un diseño».




Prueba gratis /empezar/web-boda-rsvp

	

El formulario muestra «Precio cerrado desde 99 €», aunque permite elegir modalidades de distinto precio.

	

Mostrar el importe exacto correspondiente a la modalidad seleccionada.




Carrito /cart

	

El estado vacío únicamente ofrece «Seguir mirando».

	

Añadir «Ver los servicios más solicitados» y «Explorar bodas y eventos».

Los problemas de relevancia del buscador están comprobados en las respuestas públicas. La interacción dinámica de modalidades y filtros necesita pruebas adicionales. 
Automatiza sin humo
+3

P1.1. Mejorar la jerarquía de las fichas

Ahora la explicación de «Plantilla + guía», las dos formas de empezar, las condiciones, la tabla comparativa y el funcionamiento ocupan bastante contenido antes de que el comprador llegue a las demos. 
Automatiza sin humo

Yo reorganizaría las fichas en este orden:

Nombre, resultado que consigue y precio de ambas modalidades.

Demo principal visible.

Selección de modalidad y botones «Comprar directamente» / «Pedir prueba gratis».

Tres beneficios y plazo de entrega.

Qué incluye, qué no incluye y preguntas frecuentes.

La información existente es suficiente para explicar la mayoría de productos. No hace falta escribir más: hay que reducir la repetición y mejorar el orden.

P1.2. Corregir una promesa que no se cumple en todo el catálogo

En portada y en «Cómo funciona» se afirma que cada ficha tiene una demo que el visitante puede probar. Sin embargo, la ficha de Avisos automáticos multicanal no presenta una demo interactiva. 
Automatiza sin humo
+1

Opción A: ofrecer una demo funcional para todos los servicios donde tenga sentido.

Opción B: utilizar «Puedes explorar ejemplos reales de nuestros servicios y probar muchas de sus funciones antes de contratar».

Recomiendo B a corto plazo, mientras se construyen demos específicas para los servicios prioritarios.

3. Textos en inglés, jerga y correcciones de redacción

No he detectado faltas ortográficas graves en las páginas comerciales examinadas. Sí hay terminología poco accesible y algunas expresiones mejorables.

URL

	

Texto actual

	

Sustitución




/search

	

«¿Qué necesita tu negocio?»

	

«¿Qué necesitas resolver?»




/pages/demos

	

«Las demos interactivas se usan ya»

	

«Las demos interactivas se pueden probar»




/products/web-boda-rsvp

	

«Formulario RSVP»

	

«Formulario para confirmar asistencia»




/products/avisos-multicanal

	

«Webhooks»

	

«Avisos automáticos entre aplicaciones»; término técnico dentro




/products/web-una-pagina

	

«Hosting de pago»

	

«Alojamiento web de pago»




/search?q=facturas

	

«Freelancers»

	

«Profesionales independientes»




/products/curriculum-ats

	

«ATS»

	

«Currículum preparado para sistemas de selección»




Formularios /empezar/...

	

«Email»

	

«Correo electrónico»




Varias páginas

	

«2-3 minutos» y «24-72 h»

	

Unificar como «2–3 minutos» y «24–72 h»

Demos externas: he comprobado inglés en las muestras de peluquería, boda y carta QR, así como dólares y rupias en algunos ejemplos. No son errores de traducción de la tienda, pero sí afectan a la percepción de un producto que se vende a clientes españoles. 
Alma Spa
+3

4. Imágenes y tarjetas del catálogo

He abierto cinco imágenes principales y varias imágenes adicionales de las galerías. Las examinadas se cargan correctamente y no presentan una pixelación evidente a su tamaño original.

El problema principal no es la resolución, sino la representatividad comercial.

Web de una página

La imagen principal es una captura de cafetería en inglés. El producto tiene otras demos, pero la primera impresión podría contextualizarse mejor.

Carta QR

La imagen utiliza una carta extranjera con importes en PKR y bloques sin fotos de platos. Sustituir por una carta española en euros.

Gestión de invitados

Se muestra un formulario RSVP en vez de un organizador de mesas. Crear una captura de un panel real con invitados ficticios.

Avisos multicanal

La imagen es una tarjeta con icono, plazo y prestaciones. Es genérica: preferible ilustrar el recorrido «pedido recibido → aviso en Telegram».

No puedo afirmar cuántas tarjetas de los 71 servicios carecen de imagen: para eso falta una inspección visual de todas las páginas del catálogo. Tampoco puedo certificar cómo se ven las miniaturas a escala móvil.

Recomendación: mantener una imagen comercial coherente por servicio y añadir, en aquellos que tengan interfaz, al menos una captura del resultado real.

5. Menús, filtros, buscador e iconos
P1 — Navegación principal

El menú actual prioriza «Servicios», «Webs», «Automatizaciones», «Cómo funciona» y «Demos». Las bodas y los restaurantes quedan en categorías y enlaces secundarios.

Propondría esta estructura:

Servicios

Negocios

Bodas y eventos

Ver demos

Cómo funciona

No eliminaría las 14 categorías, pero las organizaría dentro del catálogo por objetivos del comprador. Por ejemplo: «Quiero una web», «Necesito reservas», «Quiero ahorrar tareas» y «Organizo un evento».

P1 — Filtros y búsqueda

Además de las categorías actuales, añadiría filtros por precio, por modalidad («Lo publicamos por ti») y por disponibilidad de demo.

El buscador debería favorecer sinónimos e intenciones. «Pedir cita» tendría que encontrar peluquerías y sistemas de reservas, aunque la ficha no repita exactamente esas palabras.

P2 — Iconos y accesibilidad

El HTML extraído muestra botones representados solo por ×, como el cierre del carrito. No he verificado sus nombres accesibles reales ni el orden de tabulación. Recomiendo comprobar que tengan etiquetas como «Cerrar carrito», que el foco sea visible y que los iconos de búsqueda y carrito incluyan nombres accesibles y, cuando proceda, contador de artículos.

6. Qué falta para que un particular compre con confianza

La web ya explica que atiende una persona, que hay prueba gratuita y que los precios son cerrados. Es una base válida. Faltan elementos que demuestren esas promesas.

P1 — Prueba social verificable. Incluir dos o tres casos terminados, con autorización del cliente cuando corresponda. Si todavía no hay clientes públicos, utilizar proyectos demostrativos claramente etiquetados; no inventar opiniones.

P1 — Presentación de quién presta el servicio. Una fotografía profesional, una explicación de su papel y un contacto visible reducen la sensación de comprar a una tienda anónima. No hace falta una biografía extensa.

P1 — Privacidad para bodas y eventos. Explicar quién puede ver las confirmaciones, cómo se protege la lista de invitados, durante cuánto tiempo se conservan los datos y cómo se eliminan. Especialmente importante si se recopilan alergias o necesidades alimentarias. La política actual es bastante genérica. 
Automatiza sin humo

P1 — Costes externos. Cada servicio debería indicar expresamente si necesita dominio, alojamiento o herramientas de pago. No basta con una exclusión genérica: el consumidor tiene que conocer qué puede costarle mantenerlo.

P2 — Entrega tangible. Mostrar capturas de un ejemplo de email de entrega, el panel que recibirá el cliente y una guía breve de uso.

En bodas, además, convendría explicar cuánto tiempo se mantiene publicada la web después del evento y qué sucede con las respuestas de los invitados.

7. SEO — Diagnóstico inicial

P1. Los títulos HTML de las cuatro fichas inspeccionadas identifican el servicio y la marca, lo cual es correcto. La estructura general permite llegar a los productos mediante enlaces de catálogo y categorías.

Las mejoras con mayor potencial serían ampliar los textos específicos de cada categoría, reforzar los enlaces internos entre servicios relacionados y evitar que las 71 fichas dependan principalmente de una estructura explicativa casi idéntica.

P1. Antes del lanzamiento hay que verificar los canonical, las metadescripciones, los datos estructurados de servicios y precios, el sitemap y las reglas de indexación. No he podido inspeccionar esas etiquetas ni los encabezados HTTP.

Como staging es público, también debe comprobarse que no se indexe accidentalmente y que la web definitiva sí pueda indexarse cuando se publique.

P2. Medir LCP, CLS e INP en móvil y escritorio. No dispongo de mediciones reales de rendimiento, por lo que no asigno puntuaciones de Core Web Vitals.

8. Top 10 cambios por impacto y esfuerzo

Prioridad propuesta. Impacto y esfuerzo estimados; no son resultados de experimentos de conversión.

#

	

Cambio

	

Prioridad

	

Impacto

	

Esfuerzo




1

	

Mostrar los dos precios y aclarar quién publica cada servicio

	

P0

	

Muy alto

	

Bajo




2

	

Validar el recorrido de pago, pedido y envío de datos

	

P0

	

Muy alto

	

Medio




3

	

Sustituir las cuatro demos principales por ejemplos en español fieles al producto

	

P0

	

Muy alto

	

Medio/alto




4

	

Corregir información legal, desistimiento y condiciones

	

P0

	

Muy alto

	

Medio




5

	

Unificar plazos, revisiones y garantía

	

P0

	

Alto

	

Bajo




6

	

Reorganizar fichas: demo y modalidades antes de explicaciones largas

	

P1

	

Alto

	

Medio




7

	

Mejorar búsqueda y relevancia de resultados

	

P1

	

Alto

	

Medio




8

	

Dar acceso visible a bodas y particulares desde la portada y el menú

	

P1

	

Alto

	

Bajo




9

	

Mostrar precio exacto, modalidad y confirmación en /empezar/

	

P1

	

Alto

	

Medio




10

	

Añadir identidad personal, ejemplos verificables y costes externos claros

	

P1

	

Alto

	

Bajo/medio

Veredicto de la ronda 1

El principal problema no es la falta de catálogo ni de explicaciones. Es la distancia entre lo que el visitante cree que está comprando y lo que cada modalidad entrega. El segundo problema es que algunas demos no representan con suficiente fidelidad el producto anunciado.

No añadiría más servicios en esta fase. Priorizaría claridad de precios, cuatro demos comerciales sólidas y un recorrido de compra comprobado de principio a fin.

Para la ronda 2, la siguiente auditoría con más valor sería la del embudo transaccional completo: selección de modalidad, carrito, checkout de demostración, creación del pedido y formulario posterior. Es la parte crítica que todavía no ha podido certificarse funcionalmente.