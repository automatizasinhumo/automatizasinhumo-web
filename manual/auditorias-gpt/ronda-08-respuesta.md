ChatGPT dijo:
Auditoría de huecos y automatización — Ronda 08

Proyecto: Automatiza Sin Humo
Repositorio: davidpd89/automatizasinhumo-web
Rama auditada: main
Fecha: 18 de noviembre de 2026

1. Diagnóstico ejecutivo

La tienda tiene una base comercial y técnica considerablemente más avanzada que su sistema de producción automática.

Ya dispone de 71 servicios, catálogo en D1, compra directa, formularios de solicitud, seguimiento de pedidos, Stripe integrado, demos publicadas, fábrica inicial y varias capas de QA.

Sin embargo, todavía no puede funcionar como un negocio autónomo de principio a fin. El problema principal no es la ausencia de un constructor de webs nuevo, sino la falta de conexión operativa entre los sistemas existentes.

Los bloqueos más importantes son:

Fabricación: manual/fabrica/vistas-previas.py y fabricar.py todavía dependen del entorno local, aunque su traslado a GitHub Actions está en curso.

Revisión: no existe un recorrido completo de aprobación y solicitud de modificaciones que el cliente pueda gestionar por sí mismo.

Pago posterior a la muestra: la aprobación todavía no genera automáticamente el cobro asociado a la versión correcta.

Entrega: falta asegurar que se publica y entrega exactamente la versión aprobada y pagada.

Operación comercial: dominio, archivos del cliente, facturas, soporte, reseñas, renovaciones y seguimiento de conversiones no forman un circuito completamente automatizado.

Una limitación importante del objetivo gratuito

La arquitectura puede funcionar sin infraestructura de pago recurrente dentro de ciertas cuotas, pero no permite prometer capacidad ilimitada.

La documentación oficial vigente establece:

Recurso

	

Límite o condición




Cloudflare Workers Free

	

100 Workers por cuenta




Solicitudes Workers

	

100.000 al día




CPU por petición

	

10 ms




Cron Triggers

	

5 por cuenta




D1 Free

	

10 bases de datos; 5 GB totales




Cloudflare Email Routing

	

Disponible gratuitamente




Cloudflare Email Sending a destinatarios arbitrarios

	

Requiere Workers Paid




Workers for Platforms

	

Requiere suscripción de pago

Fuentes: Cloudflare Workers, D1, Email Service y Workers for Platforms. 
Cloudflare Workers docs
+3

Esto afecta directamente a la estrategia de publicar un Worker por cliente: sin cambiar de arquitectura, habrá que controlar el número de clientes, la cuota de fabricación y los recursos consumidos. El cobro por Stripe tampoco está exento de comisiones por transacción, aunque no necesite una suscripción mensual.

La auditoría distingue entre automatización implementada, automatización asignada pero pendiente y funcionalidad todavía inexistente. No considera completada una tarea únicamente porque exista un PR o una guía.

2. Mapa de automatización real

La siguiente tabla refleja lo que existe en main, no lo que se pretende incorporar en las PR abiertas.

Área

	

Estado actual y dependencia

	

Fichero o ruta




Captación

	

Parcial. Hay catálogo, demos, buscador y SEO básico. No hay todavía un embudo de artículos sectoriales, recursos descargables y conversión medida. C2 está asignada.

	

src/features/storefront/HomeHero.astro, src/pages/search.astro, src/pages/sitemap.xml.ts




Ficha comercial

	

Bastante completa. Precio, modalidades, plazo, límites, galería y demo. Faltan resultados verificables, reseñas reales y ejemplos de trabajos entregados.

	

src/themes/default/ProductDetail.astro, src/features/storefront/catalog.ts




Solicitud

	

Automatización parcial. Valida el formulario, guarda D1 y puede enviar confirmación. No desencadena por sí misma la fabricación.

	

src/pages/empezar/[slug].astro, src/pages/api/solicitudes.ts, migrations/0040_solicitudes.sql




Vista previa

	

Depende del PC actualmente. Existe generación con IA y publicación automática, pero requiere la instalación local, las demos externas y una tarea de Windows. Su migración a Actions está en curso.

	

manual/fabrica/vistas-previas.py, manual/fabrica/fabricar.py, manual/demos/demos.mjs




Revisión y cambios

	

Manual. El cliente consulta el estado, pero no puede aprobar una versión ni solicitar una revisión estructurada y autenticada.

	

src/pages/empezar/estado.astro, src/pages/admin/solicitudes.astro




Pago

	

Parcial. El checkout directo y el webhook existen; falta la conexión aprobación → checkout → solicitud concreta. También falta una prueba completa de Stripe en modo test. C5 asignada.

	

src/pages/api/checkout.ts, src/features/payments/stripe.ts, src/features/orders/recordWebhook.ts




Entrega

	

Parcial. Minshop permite descargar productos digitales, pero la entrega de la web fabricada no está ligada automáticamente a la versión aprobada. C6 asignada.

	

src/pages/order/[token].astro, manual/ENTREGA.md, manual/fabrica/fabricar.py




Dominio

	

Manual o condicionado. Falta configurar el dominio de producción y el alta automática de dominios de clientes que ya estén bajo una zona Cloudflare controlada. Comprar o delegar un dominio ajeno no es autónomo ni gratuito.

	

wrangler.jsonc, src/pages/robots.txt.ts, manual/ESTADO.md




Correo

	

Parcial. Hay adaptador Resend y bandeja de salida para pedidos. Los correos de revisión todavía se envían desde Admin; los recordatorios de C3 no están integrados en main.

	

src/features/email/resend.ts, src/features/email/outbox.ts, src/pages/admin/solicitudes.astro, src/worker.ts




Soporte

	

Humano. Existe contacto por correo, WhatsApp o Telegram si se configura. No hay tickets estructurados, clasificación automática, historial vinculado al pedido ni centro de ayuda completo.

	

src/layouts/Layout.astro, src/pages/account/index.astro




Renovaciones y suscripciones

	

No implementadas para los servicios. Hay ventas unitarias, pero no ciclo de alta, renovación, pausa, cancelación o renovación fallida de mantenimiento web.

	

src/features/payments/stripe.ts, src/features/orders/db.ts, migrations/




Facturas

	

No se acredita emisión automática. La ficha promete «Factura incluida», pero lo verificado es gestión de pedidos, correos y exportación CSV; no hay un generador de facturas por pedido.

	

src/themes/default/ProductDetail.astro, src/pages/admin/orders/export.csv.ts, src/features/email/orderConfirmation.ts




Reseñas

	

No hay un circuito verificable. No se observa solicitud posentrega, validación de pedido, publicación y retirada de reseñas. Las opiniones del catálogo de demos son ejemplos, no pruebas de clientes reales.

	

manual/demos/build-demos.mjs, src/features/storefront/HomeHero.astro




Analítica

	

Parcial. Se guardan UTM y procedencia de solicitudes, pero no hay una visión completa de visitas → demo → solicitud → aprobación → pago → entrega.

	

src/features/solicitudes/index.ts, src/pages/api/solicitudes.ts, wrangler.jsonc




QA

	

Sólido para la tienda; incompleto para cada entrega. Existen Verify, Lighthouse, pa11y, axe, Playwright, comprobación de enlaces y análisis de seguridad. La puerta Python de las webs generadas es más limitada y no cubre toda la interacción visual y funcional.

	

.github/workflows/verify.yml, empleados-qa.yml, empleados-semanales.yml, manual/fabrica/vistas-previas.py

Tres distinciones que evitan duplicar trabajo

Primera: C2, C3, C5 y C6 ya tienen tareas concretas en manual/equipo/copilot.md; no deben encargarse de nuevo bajo otro nombre. C1 está en el PR #9. C4 pertenece a la corrección de SonarCloud. Estos trabajos son dependencias, no nuevas adopciones de esta ronda.

Segunda: el producto de prueba gratuito y la compra directa tienen caminos distintos. El primero necesita aprobación previa; el segundo ya puede vincular una solicitud a un pedido pagado mediante src/features/solicitudes/pedido.ts. La automatización debe conservar ambos recorridos.

Tercera: los 71 servicios no tienen el mismo grado de automatizabilidad. manual/ENTREGA.md distingue entregas sencillas, integraciones que requieren cuentas del cliente y proyectos complejos. No es razonable declarar los 71 servicios totalmente autónomos por automatizar las páginas estáticas. Los que exijan accesos externos, decisiones particulares o desarrollos a medida necesitan un circuito de excepciones, o deben dejar de venderse como entregas inmediatas.

3. Diferencias frente a los líderes

La comparación comercial deja tres modelos de referencia.

Referencia comprobada

	

Qué resuelve especialmente bien

	

Hueco relevante en Automatiza Sin Humo




B12

	

Generación de webs, captación de datos, comunicación, pagos, facturas y gestión comercial conectadas. 
B12
+1

	

No basta con generar una web: hay que cerrar también el proceso administrativo.




10Web

	

Generación de sitios multipágina, edición posterior, SEO, rendimiento y análisis de conversiones. 
Agentic Website Builder

	

La fábrica actual modifica plantillas, pero no ofrece un ciclo completo de edición y medición después de publicar.




ManyPixels

	

Cola de solicitudes, entregas, revisiones, archivos y comunicación dentro de un mismo espacio. 
Managing your design requests
+1

	

El seguimiento actual informa del estado, pero todavía no permite gestionar el trabajo.




Framer Marketplace

	

Navegación por sector, diseño, popularidad y precio, con vistas previas claras. 
Framer Marketplace

	

El catálogo es amplio, pero falta una selección más orientada a resultados y pruebas reales de calidad.

Auditoría competitiva por capa

Capa

	

Lo que conviene mejorar

	

Prioridad




Diseño comercial

	

Mostrar con claridad una web terminada, una demo y el resultado de un proyecto real; no confundirlos.

	

P1




SEO técnico

	

Mantener lo que ya funciona y añadir datos estructurados específicos por servicio; verificar títulos, canonicals y sitemap de cada web entregada.

	

P1




Experiencia de uso

	

Adjuntar materiales al solicitar, consultar una entrega, recibirla, revisar diferencias y contactar sin intercambiar cadenas de emails.

	

P0




Rendimiento

	

Medir visitantes reales, no únicamente pruebas Lighthouse; vigilar también los Workers publicados para clientes.

	

P1




Accesibilidad

	

Aplicar la misma exigencia que ya tiene la tienda a cada plantilla resultante y a los nuevos formularios.

	

P0




Confianza

	

Pedir reseñas a compradores reales y mostrar proyectos terminados con su autorización.

	

P1




Frontend

	

Centro de ayuda, carga de archivos, histórico de proyectos y secciones de confianza.

	

P1




Backend

	

Recepción de soporte, facturación, suscripciones, analítica, dominios y monitorización sin depender de una sesión local.

	

P0–P2

La principal conclusión competitiva es que la experiencia de gestión posterior a la primera vista previa está menos desarrollada que el escaparate. Incorporar otra portada o un nuevo catálogo de plantillas no resolvería esa diferencia.

4. Repositorios nuevos verificados

Estos candidatos no forman parte de las diez adopciones de la ronda 07. Los datos proceden de la API de GitHub consultada el 18/11/2026, incluyendo el último commit de la rama principal, no simplemente la última fecha de actividad del repositorio.

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Aplicación




pqina/filepond

	

MIT

	

16.397

	

11/11/2026

	

Subida accesible de archivos




pdfme/pdfme

	

MIT

	

5.073

	

01/11/2026

	

Facturas PDF




benvinegar/counterscale

	

MIT

	

2.210

	

04/10/2026

	

Analítica sin cookies




withastro/starlight

	

MIT

	

9.614

	

17/11/2026

	

Ayuda y presentación de testimonios




cloudflare/cloudflare-typescript

	

Apache-2.0

	

835

	

05/11/2026

	

Asociación de dominios a Workers




webbertakken/email-worker

	

MIT

	

78

	

16/11/2026

	

Recepción y tratamiento de correo




upptime/upptime

	

MIT

	

17.207

	

18/11/2026

	

Vigilancia de webs publicadas




kpdecker/jsdiff

	

BSD-3-Clause

	

9.222

	

18/11/2026

	

Comparación de versiones




sindresorhus/p-limit

	

MIT

	

2.943

	

18/09/2026

	

Control de concurrencia




google/schema-dts

	

Apache-2.0

	

1.263

	

01/11/2026

	

Tipado de datos estructurados SEO




cloudflare/templates

	

MIT

	

2.179

	

17/11/2026

	

Clientes y servicios recurrentes con D1




stripe-samples/subscription-use-cases

	

MIT

	

909

	

01/05/2026

	

Suscripciones Stripe

La última fecha de commit es una señal de mantenimiento, pero no demuestra por sí sola que una integración funcione con Astro 7 y Workers Free. Por eso cada adopción incluye una prueba de descarte: si la pieza exige rehacer la arquitectura o pagar infraestructura, no se fuerza su incorporación.

He descartado expresamente tres caminos: sustituir Minshop por otro e-commerce, instalar una plataforma pesada de soporte con otra base de datos y contratar Workers for Platforms para ampliar el número de sitios. Ninguno cumple bien la relación entre esfuerzo, coste y aprovechamiento del código que ya existe.

5. Las 12 adopciones prioritarias

Ordenadas por impacto esperado en ventas y eliminación de trabajo manual, comparado con el esfuerzo. Son nuevas respecto a la ronda 07. Cada tarea debe ejecutarse en una rama independiente y rechazarse si exige una adaptación sustancial.

1. Recibir fotografías, logotipos y documentos sin pedirlos por correo

Prioridad: P0 · Esfuerzo bajo-medio
Repositorio: pqina/filepond

Clonar y copiar: dist/filepond.min.js y dist/filepond.min.css → public/vendor/filepond/.

Integrar en: src/pages/empezar/[slug].astro.

Almacenamiento: conectar con src/features/storage/r2.ts mediante un endpoint autenticado de archivos de solicitud en src/pages/api/solicitudes/.

Adaptación: aceptar únicamente los tipos y tamaños admitidos, asociar cada archivo a la solicitud correcta y dejarlo privado en R2.

Prueba: crear una solicitud con tres imágenes, verificar los tres objetos en R2 y comprobar que otro cliente no puede acceder a ellos. Repetir con archivo excesivo, formato rechazado y carga interrumpida.

Por qué va primero: el proyecto indica expresamente que actualmente pide los archivos después por correo. Ese intercambio manual impide terminar muchas entregas aunque la fábrica funcione.

FilePond tiene pruebas y soporte de teclado, móvil, arrastrar y soltar y subidas asíncronas. La integración no debe introducir un servicio externo para almacenar archivos.

2. Emitir automáticamente la factura PDF de cada venta

Prioridad: P0 · Esfuerzo medio
Repositorio: pdfme/pdfme

Clonar y copiar: playground/public/template-assets/invoice-white/template.json → manual/facturas/plantilla.json.

Motor adoptado: packages/generator/src/generate.ts, preferiblemente mediante el paquete oficial @pdfme/generator, sin copiar a mano sus dependencias internas.

Integrar con: src/features/orders/recordWebhook.ts y el almacenamiento privado existente en R2.

Adaptación: alimentar la plantilla con los importes y datos persistidos del pedido pagado. Ejecutar la generación en GitHub Actions si el motor supera el presupuesto de CPU de Workers Free.

Prueba: pago confirmado → un PDF asociado al pedido; repetición del webhook → ninguna factura duplicada; reembolso o pago fallido → comportamiento coherente con el estado del pedido.

Por qué: la ficha promete una factura, pero el código consultado no acredita que se genere. No debe confundirse el email de confirmación con el documento de facturación.

La plantilla del repositorio incluye importes y campos de ejemplo. No deben conservarse en las facturas emitidas.

3. Saber qué páginas, demos y solicitudes generan ventas

Prioridad: P1 · Esfuerzo bajo-medio
Repositorio: benvinegar/counterscale

Clonar y reutilizar: packages/tracker/src/index.ts, src/tracker.ts y src/lib/track.ts del paquete tracker.

Destino: integración del script en src/layouts/Layout.astro; backend Counterscale desplegado aparte, sin reemplazar Minshop.

Adaptación: diferenciar visitas a fichas, demos y formularios. Relacionar después los UTM ya guardados en src/features/solicitudes/index.ts con solicitudes y pagos agregados.

Prueba: simular diez visitas, tres aperturas de demo, dos solicitudes y un pago; comprobar que los eventos aparecen y que el panel no cuenta dos ventas por el mismo webhook.

Counterscale se presenta como instalable en Cloudflare Free y capaz de registrar hasta unas 50.000 visitas de página al día en ese plan. 
Self-Hosted Web Analytics for Cloudflare

Alcance: mide el comportamiento web; el embudo comercial completo exige aprovechar también los estados fiables de D1. No debe enviarse información personal ni identificadores sensibles a eventos públicos.

4. Incorporar reseñas verificadas y casos reales

Prioridad: P1 · Esfuerzo bajo-medio
Repositorio: withastro/starlight

Clonar y copiar: docs/src/components/testimonial.astro y docs/src/components/testimonial-grid.astro → src/features/storefront/sections/Resena.astro y Resenas.astro.

Destino: portada y fichas, usando datos de reseñas vinculadas a pedidos entregados.

Adaptación: sustituir imágenes y citas fijas por datos verificables de D1; añadir una solicitud de opinión posentrega utilizando el sistema de correo que ya existe.

Prueba: un pedido entregado puede generar una reseña publicada; uno inexistente no; una opinión retirada desaparece de la tienda.

El componente original de Starlight usa imágenes y algunas variables CSS propias, que deben eliminarse o sustituirse por tokens existentes.

Condición comercial: si todavía no hay clientes reales, no mostrar testimonios ficticios. Los textos de manual/demos/build-demos.mjs solo pertenecen a una demostración.

5. Vincular automáticamente dominios que ya estén en Cloudflare

Prioridad: P1 · Esfuerzo medio
Repositorio: cloudflare/cloudflare-typescript

Clonar y adoptar: src/resources/workers/domains.ts, mediante el SDK oficial para no duplicar su cliente HTTP.

Destino del adaptador: src/features/dominios/; conexión con el registro de despliegues que creará C6.

Adaptación: asociar un hostname autorizado con el Worker correcto, registrar el resultado y actualizar la URL de entrega solo después de verificarla.

Prueba: vincular un subdominio propio de prueba, verificar respuesta HTTP, contenido correcto y canonical; repetir el alta y comprobar que no se duplica.

Cloudflare puede crear los registros y certificados de un Custom Domain si el dominio ya pertenece a una zona Cloudflare gestionada. 
Cloudflare Workers docs

Límite: esta adopción no compra dominios, no consigue acceso al DNS de terceros y no automatiza un cambio de proveedor sin intervención del titular.

6. Automatizar la recepción y clasificación inicial del soporte por correo

Prioridad: P1 · Esfuerzo medio
Repositorio: webbertakken/email-worker

Clonar y copiar: src/email.ts y sus pruebas src/email.test.ts → módulo de recepción en src/features/soporte/; adaptar el punto de entrada de src/index.ts.

Destino de los mensajes: una tabla de comunicaciones de soporte en D1, relacionada cuando sea posible con una solicitud o un pedido.

Adaptación: sustituir el envío original a Discord por persistencia en D1 y notificación con el sistema existente; mantener la extracción de asunto y contenido y el tratamiento de errores.

Prueba: correo de cliente conocido → comunicación registrada una sola vez; remitente desconocido → entrada sin vincular, no acceso a pedidos; envío duplicado → no crea dos tickets.

El repositorio ya implementa recepción de correo en Workers, análisis y pruebas. No es un helpdesk completo: aporta la recepción, no la resolución automática de incidencias. El proyecto necesitará un estado de ticket y una respuesta operativa.

Para correo entrante, Cloudflare Email Routing sí está disponible en Free. Para respuestas salientes a clientes, conviene mantener el adaptador Resend existente. 
Cloudflare Email Service docs

7. Vigilar automáticamente las webs entregadas

Prioridad: P1 · Esfuerzo bajo
Repositorio: upptime/upptime

Clonar y copiar: .upptimerc.yml, .github/workflows/uptime.yml y .github/workflows/response-time.yml a un repositorio público separado de monitorización, no directamente al workflow principal de la tienda.

Origen de URLs: entregas publicadas y aprobadas, procedentes del registro de C6.

Adaptación: generar la lista de webs activas y retirar las desactivadas; no publicar URLs de pruebas privadas ni datos de clientes.

Prueba: añadir una URL de prueba funcional y otra que devuelva error; verificar que el monitor distingue ambas y produce un registro de incidencia.

Upptime ya ejecuta comprobaciones programadas mediante GitHub Actions. Conviene conservar su configuración propia en lugar de modificar indiscriminadamente los workflows generados.

Beneficio: transforma el soporte reactivo en detección de caídas. No garantiza que el contenido esté correcto; solo comprueba disponibilidad y las respuestas configuradas.

8. Mostrar diferencias entre versiones de una web

Prioridad: P1 · Esfuerzo bajo
Repositorio: kpdecker/jsdiff

Clonar y reutilizar: src/diff/word.ts y src/diff/line.ts mediante el paquete oficial diff.

Destino: src/features/solicitudes/ y un componente de comparación dentro del seguimiento del proyecto.

Adaptación: comparar el texto extraído de dos versiones persistidas por C6, no el HTML completo como único indicador.

Prueba: modificar únicamente el horario y un precio de una web; la comparación debe resaltar esas diferencias, conservar la versión aprobada y no autorizar por sí misma una nueva entrega.

El repositorio dispone de pruebas específicas en test/diff/word.js y test/diff/line.js.

Dependencia: ejecutar después de C6. No sustituye la aprobación ni el control de versiones; los hace comprensibles para el cliente.

9. Evitar que una ráfaga de solicitudes desborde la fábrica

Prioridad: P1 · Esfuerzo bajo
Repositorio: sindresorhus/p-limit

Clonar y reutilizar: index.js y index.d.ts, preferiblemente mediante el paquete p-limit con sus dependencias declaradas.

Destino: orquestación de trabajos de la fábrica en GitHub Actions, junto a manual/fabrica/vistas-previas.py.

Adaptación: limitar las tareas simultáneas de fabricación, traducción o comprobación, y registrar cuáles quedan pendientes.

Prueba: presentar diez trabajos con concurrencia máxima de dos y verificar que nunca se ejecutan tres simultáneamente; un fallo no debe perder los restantes.

Precisión técnica: p-limit regula la concurrencia de un proceso. No impide que dos ejecuciones distintas de Actions fabriquen el mismo pedido. Eso exige una reclamación atómica del trabajo en D1, que debe quedar cubierta al trasladar la fábrica.

Tampoco amplía las cuotas de Cloudflare: ayuda a no consumirlas de forma descontrolada.

10. Añadir datos estructurados específicos por servicio

Prioridad: P2 · Esfuerzo bajo
Repositorio: google/schema-dts

Clonar y adoptar: packages/schema-dts-lib/index.ts y los tipos del paquete schema-dts.

Destino: src/features/seo/ y los datos JSON-LD de src/layouts/Layout.astro.

Adaptación: completar el esquema existente con Service, Offer y BreadcrumbList cuando los datos reales de la ficha permitan hacerlo.

Prueba: una ficha con datos completos genera JSON-LD válido y sin precios inventados; la portada conserva sus datos estructurados actuales; npx astro build termina correctamente.

No se trata de añadir SEO desde cero. La web ya tiene canonical, OG, sitemap y datos estructurados generales. Es un refinamiento del catálogo.

11. Crear un centro de ayuda reutilizable

Prioridad: P2 · Esfuerzo bajo-medio
Repositorio: withastro/starlight

Clonar y copiar: docs/src/components/link-card.astro y docs/src/components/media-card.astro → src/features/ayuda/.

Destino: páginas /ayuda/, usando el sistema de páginas y layouts que Minshop ya tiene.

Adaptación: categorías de ayuda vinculadas a temas recurrentes: qué incluye una web, qué archivos enviar, cómo revisar la muestra, publicar, dominios, cambios y entrega.

Prueba: todas las páginas de ayuda tienen navegación funcional, enlaces internos correctos, contenidos en español y accesibilidad en verde.

Starlight completo es más potente, pero sus componentes internos están acoplados a su propio tema. La tarea barata es copiar las tarjetas reutilizables, no instalar un segundo sitio Astro dentro de Minshop.

Esta adopción reduce consultas repetitivas. No garantiza soporte autónomo cuando el cliente plantea un problema fuera de las respuestas documentadas.

12. Incorporar un mantenimiento recurrente sin duplicar el sistema de pagos

Prioridad: P2 por ahora · Esfuerzo medio
Repositorios: stripe-samples/subscription-use-cases y cloudflare/templates

Clonar y reutilizar de Stripe: fixed-price-subscriptions/server/nextjs/app/api/create-subscription/route.ts, subscriptions/route.ts, cancel-subscription/route.ts y webhook/route.ts.

Copiar de Cloudflare: saas-admin-template/migrations/0002_create_subscriptions.sql, 0003_create_user_subscriptions.sql y src/lib/services/customer_subscription.ts.

Destino: src/features/suscripciones/, src/pages/account/ y las siguientes migraciones libres después de C6.

Adaptación: conservar src/features/payments/stripe.ts como integración central; utilizar los ejemplos para añadir únicamente alta, estado, renovación y cancelación de una modalidad recurrente.

Prueba: alta de mantenimiento en Stripe test → suscripción activa; renovación confirmada → nuevo periodo; webhook repetido → una operación; cancelación → no se crea otro periodo. Los servicios de pago único siguen funcionando exactamente igual.

Los ejemplos de Stripe están mantenidos por la propia organización, aunque su última modificación en la rama principal fue en mayo.

No priorizaría vender cuotas de mantenimiento hasta tener automatizados los controles de disponibilidad, la gestión de incidencias y la entrega inicial.

6. Orden de ejecución y dependencias

Las doce tareas anteriores no sustituyen la cola que ya existe. La secuencia de implantación correcta sería:

Primero

Cerrar lo asignado: traslado de la fábrica a GitHub Actions, C3, C5 y C6; confirmar C1/PR #9, C2 y C4 antes de dar por cerrada la ronda anterior.

Esto desbloquea fabricación sin PC, correo automático, pago posterior a aprobación y entrega de una versión determinada.

Después

Adopciones 1–4: archivos, facturas, analítica y reseñas reales.

Mejoran el recorrido del cliente y permiten demostrar qué está vendiendo de verdad.

Operación

Adopciones 5–9: dominios, correo de soporte, monitorización, comparación de versiones y control de capacidad.

Reducen incidencias y trabajo manual sin sustituir los sistemas principales.

Expansión

Adopciones 10–12: SEO específico, autoservicio de ayuda y suscripciones.

Son útiles, pero no compensan dejar incompleta la cadena de venta y entrega.

7. Huecos que ninguna de estas adopciones elimina completamente
Capacidad de crecimiento

Un Worker por cliente permite empezar con una arquitectura sencilla, pero el límite de 100 Workers en el plan gratuito convierte esa estrategia en un techo operativo. Parte de esa cuota se consume también con la tienda, las demos y los servicios auxiliares. 
Cloudflare Workers docs

Antes de acercarse al límite, debe evaluarse una arquitectura que sirva varias webs estáticas desde un Worker compartido y almacenamiento R2, con resolución por hostname. No doy esa migración por una tarea barata ni afirmo haber encontrado un repositorio permisivo que pueda copiarse tal cual para sustituir el sistema actual. Requiere una prueba de arquitectura independiente.

Servicios que necesitan terceros

Una web de presentación puede salir de una plantilla. Una integración con el WhatsApp, la agenda, el bot o las credenciales privadas de un cliente no siempre puede activarse sin su colaboración.

La solución comercial no es prometer automatización absoluta, sino diferenciar en el catálogo los servicios que tienen entrega automática de aquellos que necesitan una acción del comprador. Las instrucciones de manual/ENTREGA.md ya permiten hacer esa clasificación.

Cuotas de los servicios gratuitos

El adaptador Resend existe y ofrece una salida compatible con Workers Free. Su plan gratuito anuncia 3.000 emails mensuales y un máximo de 100 diarios. La recepción de archivos puede utilizar la cuota gratuita de R2, actualmente 10 GB-mes en almacenamiento estándar. 
Resend
+1

Deben incorporarse contadores que permitan detener nuevas entregas automáticas cuando no haya capacidad suficiente, en lugar de aceptar pedidos que después dependan de una intervención manual.

Pruebas que siguen pendientes

Esta auditoría comprueba código, rutas, repositorios, licencias, estrellas y fechas de commit mediante GitHub y contrasta capacidades públicas mediante búsqueda web. No equivale a haber desplegado los doce candidatos en staging ni a haber ejecutado sus pruebas dentro de Minshop.

La condición de aceptación de cada PR debe ser doble: que pase su prueba específica y que no rompa npm run verify ni el recorrido de compra existente.

Veredicto

No cambiaría Minshop ni volvería a buscar una tienda base.

La inversión técnica más rentable es terminar las conexiones entre solicitud, fábrica, revisión, pago y entrega. Después, las adopciones con mayor retorno probable son subida de archivos, facturación, analítica de conversión y reseñas verificadas.

El objetivo de operación gratuita es viable a escala limitada y con productos adecuados para automatización, no como garantía de capacidad ilimitada o de ausencia absoluta de excepciones humanas.

La siguiente ronda debería empezar únicamente cuando la fábrica funcione en GitHub Actions sin depender del PC y una solicitud de prueba complete el circuito hasta la entrega, con el pago confirmado y la versión correcta.