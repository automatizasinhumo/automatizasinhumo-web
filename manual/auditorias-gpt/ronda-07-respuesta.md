ChatGPT dijo:
MAPA DE ADOPCIÓN — AUTOMATIZA SIN HUMO

Fecha de auditoría: 18 de noviembre de 2026
Repositorio: davidpd89/automatizasinhumo-web
Rama: main
Arquitectura objetivo: Astro 7 SSR + Cloudflare Workers + D1 + Stripe + Workers AI.

0. Diagnóstico y criterio de selección

La estrategia debe ser mejorar el sistema existente mediante adopciones parciales, no sustituir Minshop por otro comercio electrónico.

El repositorio ya contiene más funcionalidades de las que justificaría una reconstrucción. Los principales problemas están en la conexión entre sus componentes, la automatización efectiva de las entregas y la capacidad comercial de la tienda.

Qué debemos conservar

Sistema existente

	

Estado identificado

	

Decisión




Tienda Minshop, productos, categorías y variantes

	

Implementado

	

Conservar




Identidad visual propia, tres temas y componentes Astro

	

Implementado

	

Mejorar selectivamente




71 servicios y catálogo de plantillas

	

Implementado

	

Conservar y especializar




SEO básico: canonical, schema Product, sitemap, robots

	

Implementado

	

Ampliar, no duplicar




Formulario de solicitud por pasos

	

Implementado

	

Conservar




Seguimiento público de solicitudes

	

Implementado

	

Ampliar




Stripe, pedidos y webhooks

	

Infraestructura implementada; recorrido real de pago pendiente de validar

	

Integrar y probar




Fábrica de webs con Workers AI

	

Existe una primera implementación

	

Automatizar su orquestación




Correos transaccionales y cola de envío

	

Implementados

	

Ampliar por eventos




QA con Lighthouse, pa11y, lychee y Playwright

	

Implementada

	

Añadir pruebas de negocio




Publicación de webs en Workers independientes

	

Implementación disponible

	

Industrializar

Fuentes principales: manual/ESTADO.md, manual/ENTREGA.md y manual/EMPLEADOS.md.

Cuatro reglas para adoptar

Copiar funcionalidades, no aplicaciones enteras. Un sistema React/Next.js con PostgreSQL no debe sustituir módulos Astro/D1 que ya funcionan.

Preferir MIT o Apache-2.0, repositorios activos y componentes independientes. Las referencias comerciales sirven para estudiar recorridos, no para copiar código inaccesible.

Una única fuente de datos por proceso. Catálogo en el sistema actual, pedidos y solicitudes en D1, plantillas en la fábrica. Evitar bases de datos y paneles paralelos.

No llamar automático a lo que todavía necesita intervención. Cada adopción deberá acabar con una prueba reproducible, idealmente sin introducir pagos fijos.

Escala de prioridad

P0: impide vender, cobrar, producir o entregar sin intervención.

P1: mejora directamente conversión, calidad de las entregas o autonomía del cliente.

P2: aumenta captación, eficiencia o diferenciación, pero no bloquea el negocio.

La compatibilidad y el coste operativo pesan tanto como las estrellas de GitHub.

Alcance de la comprobación

He inspeccionado el árbol de main —855 archivos—, los módulos operativos principales, las migraciones, las instrucciones de entrega, la fábrica, las demos y el inventario manual/catalogo/repos_meta.csv. También he contrastado rutas de código, licencias, estrellas y últimos commits de los candidatos mediante GitHub.

Hay dos límites de verificación: la hoja Excel manual/02 · Plataforma de servicios digitales — repositorios, plantillas y hoja de ruta (16-11-2026).xlsx está localizada, pero no ha sido posible extraer su contenido binario; y el repositorio independiente de las demos, referenciado mediante C:/GIT/automatizasinhumo-demos, no está incluido en este repositorio. Por tanto, no afirmo haber auditado línea a línea los 855 archivos ni el código fuente de las plantillas externas. Las propuestas de fábrica quedan condicionadas a incorporar esa fuente al entorno de ejecución.

Las estrellas y fechas que siguen corresponden a la comprobación del 18/11/2026. «Último commit» significa el último commit de la rama predeterminada, no la fecha de actividad general del repositorio.

1. Diseño, tema y sistema de componentes de la tienda

Prioridad: P1 · Impacto en ventas: alto · Esfuerzo: bajo–medio.

Qué falta hoy

La tienda ya tiene una identidad visual específica, un sistema de temas y componentes comerciales propios. Se encuentran en:

src/themes/default/, junto a market/ y studio/.

src/features/storefront/HomeHero.astro.

src/themes/default/ProductDetail.astro.

src/styles/overrides.css.

No falta un diseño completo. Faltan componentes comerciales especializados que aprovechen el catálogo existente: comparación inmediata de las dos modalidades, escaparates por necesidad del negocio, ejemplos destacados con resultados concretos y una presentación visual consistente de las garantías y del proceso.

La portada actual ya explica el recorrido. Volver a copiar otro hero o repetir «Cómo funciona» añadiría complejidad sin resolver esa carencia.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Uso recomendado




fulldotdev/ui

	

MIT

	

620

	

26/10/2026

	

Bloques comerciales Astro




konstantinWDK/astro-components

	

MIT

	

17

	

14/11/2026

	

Comparaciones y secciones sectoriales




mearashadowfax/ScrewFast

	

MIT

	

1.441

	

18/11/2026

	

Referencia de composición comercial Astro

Qué copiar y dónde

Adopción principal: fulldotdev/ui.

Copiar:

Texto sin formato
fulldotdev/ui/src/components/blocks/services-1.astro
fulldotdev/ui/src/components/blocks/pricing-1.astro
fulldotdev/ui/src/components/blocks/faqs-1.astro

Destinos:

Texto sin formato
src/features/storefront/sections/ServiciosPorNecesidad.astro
src/features/storefront/sections/ComparativaModalidades.astro
src/features/storefront/sections/PreguntasDeCompra.astro

Las dependencias originales de los bloques están en src/components/ui/, especialmente las carpetas button/, card/, price/ y section/. Hay que copiar las dependencias necesarias o sustituirlas por los controles existentes, no trasplantar todo el sistema de UI.

Adaptación:

Conectar precios, modalidades y enlaces al modelo de producto existente; nunca mantener precios escritos dentro del componente.

Usar los tokens de src/themes/default/tokens.css.

Sustituir iconos externos por src/icons/ y src/components/Icono.astro.

Conservar los componentes actuales de compra y Stripe.

Evitar las funciones de facturación mensual/anual presentes en algunos bloques de precios: aquí se venden principalmente servicios de precio cerrado.

Alternativa más ligera: PricingCompareMiniCard.astro, para construir una comparación estática «Plantilla + guía» frente a «Te lo montamos».

Decisión: adoptar componentes aislados. No cambiar el tema global ni añadir React para rediseñar una tienda Astro que ya funciona.

Prueba de aceptación: tres fichas representativas, las dos modalidades y precios correctos; cero enlaces de compra rotos; sin desplazamiento horizontal a 360 px; Lighthouse y pruebas de tema existentes en verde.

2. SEO técnico y contenido por sector y ciudad

Prioridad: P1 · Impacto: muy alto a medio plazo · Esfuerzo: medio.

Qué falta hoy

Ya existen canonical, Open Graph, Organization, Product, Offer, sitemap y archivos para buscadores y asistentes. No hay justificación para instalar otro paquete SEO encima.

Los puntos de ampliación son:

src/layouts/Layout.astro: metadatos generales y Organization.

src/features/storefront/productDetail.ts: datos estructurados del producto.

src/pages/sitemap.xml.ts: actualmente enumera catálogo, categorías, productos y páginas publicadas.

src/pages/pages/[slug].astro: páginas de contenido general.

Faltan una arquitectura editorial de blog y páginas de búsqueda especializada, por ejemplo:

Texto sin formato
/webs/restaurantes/
/webs/peluquerias/
/webs/clinicas-dentales/
/webs/restaurantes/madrid/
/comparar/web-una-pagina-vs-web-corporativa/

Esas URL no deben generarse mediante combinaciones indiscriminadas de todos los servicios con todas las ciudades. Deben publicarse únicamente cuando exista contenido específico y demostrable: oferta, precio, ejemplo, necesidades del sector y diferencias reales.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Uso




ScrewFast

	

MIT

	

1.441

	

18/11/2026

	

Blog, metadatos y contenido estructurado




jonasmerlin/astro-seo

	

MIT

	

1.425

	

28/08/2026

	

Componentes SEO reutilizables




codrops/isle-thorne-collective

	

MIT

	

20

	

04/11/2026

	

Revista/blog editorial Astro

Qué copiar y dónde

De ScrewFast:

Texto sin formato
src/utils/metadata.ts
src/components/Meta.astro
src/content.config.ts
src/views/BlogIndexView.astro
src/views/BlogPostView.astro
src/components/ui/cards/CardBlog.astro
src/pages/blog/index.astro
src/pages/blog/[id].astro

Adaptar a:

Texto sin formato
src/features/seo/metadata.ts
src/features/blog/
src/content.config.ts
src/content/blog/
src/pages/blog/index.astro
src/pages/blog/[slug].astro

No copiar los metadatos globales de ScrewFast de forma indiscriminada: ya se renderizan en Layout.astro. Adoptar su generador centralizado de metadatos y el esquema BlogPosting, integrándolo con el layout existente.

Para páginas sectoriales, reutilizar la composición de BlogPostView.astro, pero emplear el catálogo real como fuente de servicios, precios y demos. El contenido específico debe permanecer separado de los productos, para no crear fichas duplicadas.

Destinos propuestos:

Texto sin formato
src/pages/webs/[sector].astro
src/pages/webs/[sector]/[ciudad].astro
src/pages/comparar/[slug].astro

En src/pages/sitemap.xml.ts, incorporar únicamente páginas publicadas y canónicas. Las páginas por ciudad no aprobadas deben quedar fuera del sitemap.

No adoptar: un segundo sistema de canonical u Open Graph de astro-seo. Sus ficheros src/SEO.astro y src/components/OpenGraphBasicTags.astro sirven para comparar cobertura y tomar funcionalidades concretas que falten.

Prueba de aceptación: cinco páginas sectoriales completas, una comparación y tres artículos. Todas deben responder 200, tener metadatos únicos, enlazar a productos activos, aparecer una sola vez en el sitemap y superar una comprobación automática de títulos, canonical y JSON-LD.

3. Experiencia del cliente: ficha → solicitud → vista previa → pago → entrega → cambios

Prioridad: P0 · Impacto: crítico · Esfuerzo: medio–alto.

Qué falta hoy

El recorrido está dividido entre módulos que ya funcionan individualmente:

Texto sin formato
src/pages/products/[slug].astro
src/pages/empezar/[slug].astro
src/pages/api/solicitudes.ts
src/pages/empezar/estado.astro
src/pages/pay/[publicId].astro
src/pages/order/[token].astro
src/pages/api/webhook/[provider].ts
src/pages/admin/solicitudes.astro

La principal brecha no es la interfaz. Es la coordinación.

Actualmente, manual/fabrica/vistas-previas.py puede construir una vista previa y guardar su URL en una nota de la solicitud. Sin embargo, su ejecución sigue dependiendo de lanzar el script, y la comunicación al cliente y los cambios de estado requieren acciones administrativas.

En src/pages/admin/solicitudes.astro, el estado y el correo son acciones separadas. src/pages/empezar/estado.astro permite consultar el progreso, pero no aprobar una versión ni enviar cambios.

También consta pendiente la prueba integral de Stripe en modo test.

Repositorios y referencia comercial

Fuente

	

Licencia

	

Estrellas

	

Último commit

	

Uso




stripe-samples/checkout-one-time-payments

	

MIT

	

1.063

	

08/06/2026

	

Recorrido de pago y pruebas




dimasmong/MoBio

	

MIT

	

0

	

04/11/2026

	

Separación borrador/publicado




10Web Agentic Website Builder

	

Referencia comercial

	

—

	

—

	

Plan → aprobación → generación → edición → publicación

10Web permite revisar y aprobar un plan antes de generar la web y, posteriormente, previsualizar, editar y publicar el resultado. Es un referente de experiencia de usuario, no una prueba de que su automatización interna pueda copiarse. 
10Web Help Center

Qué adoptar

De MoBio, copiar como base de adaptación:

Texto sin formato
migrations/0002_draft_publishing.sql

Destino:

Texto sin formato
migrations/0043_solicitudes_versiones.sql

No ejecutar literalmente la migración de MoBio: sus tablas pertenecen a otra aplicación. Aprovechar su separación entre versiones en preparación y publicadas para introducir versiones identificables asociadas a cada solicitud.

Del ejemplo de Stripe, tomar:

Texto sin formato
.github/workflows/ci_e2e.yml

Destino:

Texto sin formato
.github/workflows/recorrido-cliente.yml

La lógica de pago debe seguir en Minshop. Adaptar las pruebas al webhook existente, src/features/orders/recordWebhook.ts, a la relación entre pedido y solicitud, y a las pantallas de estado.

Recorrido objetivo

Paso

	

Acción automática

	

Acción reservada al cliente




1. Solicitud

	

Guardar datos, crear trabajo y confirmar recepción

	

Rellenar formulario




2. Preparación

	

Seleccionar plantilla, generar, desplegar y comprobar

	

Ninguna




3. Vista previa

	

Guardar URL y enviar enlace de revisión

	

Revisar resultado




4. Decisión

	

Registrar aprobación o cambios

	

Aprobar o solicitar ajustes




5. Pago

	

Crear o mostrar enlace del pedido y verificar webhook

	

Pagar




6. Entrega

	

Publicar la versión definitiva y enviar acceso

	

Recibir y utilizar




7. Cambios incluidos

	

Crear nueva revisión, generar y volver a comprobar

	

Concretar el cambio

En compra directa, se omite el cobro del paso 5 y el pago confirmado se utiliza como condición de entrega.

Punto fundamental: el silencio del cliente no equivale a aprobación. Automatizar el proceso no exige inventar una aprobación.

Prueba de aceptación: una solicitud de prueba llega desde el formulario hasta la entrega sin que un administrador tenga que copiar URL, cambiar estados manualmente ni enviar emails uno a uno. La aprobación y el pago siguen siendo acciones explícitas del cliente.

4. Fábrica de webs: plantillas, datos, IA, imágenes, dominios y publicación

Prioridad: P0 · Impacto: crítico · Esfuerzo: alto.

Qué falla hoy

La fábrica existe, pero depende de un entorno local muy concreto.

Archivos:

manual/fabrica/vistas-previas.py.

manual/fabrica/fabricar.py.

manual/fabrica/ejemplo-pedido.json.

manual/demos/demos.mjs.

El funcionamiento actual es real: copia una plantilla, adapta textos con Workers AI, sustituye datos de contacto y despliega un Worker estático.

Pero hay seis limitaciones verificables:

fabricar.py presupone por defecto C:/GIT/automatizasinhumo-demos. La fábrica no es reproducible en un agente remoto sin configurar ese repositorio.

La personalización trabaja principalmente sobre los nodos de texto de index.html; no hay un contrato estructurado para secciones, servicios, fotografías y llamadas a la acción.

Los datos incompletos pueden producir valores de relleno genéricos, como «España» para la localidad.

No existe en este flujo una selección y validación completa de las imágenes propias del cliente.

La URL de la web se obtiene de la salida de Wrangler y se conserva en el flujo de solicitud mediante una nota, no mediante un registro formal de despliegues y versiones.

Se eliminan etiquetas canonical y determinadas etiquetas Open Graph de la plantilla sin reconstruirlas después con la URL del cliente.

Además, cada cliente consume un Worker independiente, circunstancia que limita la capacidad de crecimiento gratuito.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Qué adoptar




cloudflare/wrangler-action

	

Apache-2.0

	

2.012

	

24/09/2026

	

Publicación desde GitHub Actions




cloudflare/workflows-starter

	

Apache-2.0

	

50

	

19/09/2025

	

Orquestación duradera de pasos




dimasmong/MoBio

	

MIT

	

0

	

04/11/2026

	

Despliegues aislados y validación previa

workflows-starter es una plantilla pequeña de Cloudflare, no una fábrica lista para usar; su antigüedad importa menos que su correspondencia con la API oficial, pero debe comprobarse con la versión instalada de Wrangler.

Qué copiar

De cloudflare/wrangler-action, tomar el patrón de:

Texto sin formato
.github/workflows/deploy.yml

Destino:

Texto sin formato
.github/workflows/fabrica-clientes.yml

Usar la acción oficial de Wrangler desde el workflow; no copiar el código interno de la acción dentro de la tienda.

De cloudflare/workflows-starter:

Texto sin formato
src/examples.ts
wrangler.jsonc

Adaptar a:

Texto sin formato
src/features/fabrica/workflow.ts
wrangler.jsonc

De MoBio:

Texto sin formato
scripts/deploy-instance.mjs

Destino:

Texto sin formato
manual/fabrica/deploy-instance.mjs

Reutilizar sus verificaciones de argumentos y su estrategia de configuración por instancia, adaptándolas al nombre del Worker y la carpeta generada por fabricar.py.

Arquitectura resultante
Texto sin formato
Solicitud guardada en D1
        |
        v
Trabajo de fábrica identificado por solicitud + versión
        |
        v
GitHub Actions: preparar Python, Node y plantillas
        |
        v
fabricar.py: copiar plantilla + adaptar con Workers AI
        |
        v
QA del sitio generado
        |
        v
Wrangler Action: publicar Worker de vista previa
        |
        v
Registrar URL, versión y resultado en D1
        |
        v
Enviar email de revisión
        |
        v
Aprobación + pago verificado
        |
        v
Promover la versión validada a entrega definitiva

Cloudflare Workflows puede coordinar estados, esperas y reintentos. No puede ejecutar directamente el proceso Python con subprocessos y Wrangler dentro de un Worker. Esa parte debe seguir en un ejecutor de CI o transformarse expresamente en otro tipo de aplicación; la adopción recomendada es CI, porque permite conservar fabricar.py.

Cuatro adaptaciones técnicas obligatorias

Plantillas con datos. Introducir un manifiesto por plantilla que indique qué campos son editables, qué componentes existen y qué imágenes necesitan sustitución. La lógica de selección puede seguir partiendo de manual/demos/demos.mjs; el objetivo es reducir la dependencia de reemplazos de texto heurísticos.

Imágenes. Mantener manual/catalogo/gen-imagenes.mjs para la tienda, pero separar imágenes del catálogo de los recursos del cliente. En las webs generadas, usar archivos proporcionados por el cliente o recursos previamente seleccionados de la plantilla; no inventar fotografías de su establecimiento.

Dominios. Conservar inicialmente *.workers.dev. Si el cliente aporta un dominio propio, ejecutar una comprobación de dominio y configurar la asociación correspondiente solo cuando esté preparado. No prometer creación automática de dominios gratuitos personalizados.

Publicación. Asignar nombres deterministas y reutilizar el Worker del cliente al actualizar versiones. Cada ajuste no debe crear un Worker adicional.

Límite de gratuidad comprobado

Cloudflare Workers Free permite actualmente 100 Workers por cuenta y 100.000 solicitudes al día, compartidas entre los Workers. Workers AI dispone de 10.000 neuronas gratuitas diarias. Workflows Free tiene una asignación de 3.000 pasos diarios. 
Cloudflare Workers docs
+2

Esto impone una conclusión operativa: con un Worker independiente por cliente, no existe capacidad gratuita ilimitada. Hay que reservar plazas para tienda, staging, demos y servicios internos, controlar el consumo de IA y evitar multiplicar Workers por cada versión de una misma web.

Prueba de aceptación: a partir de manual/fabrica/ejemplo-pedido.json, una ejecución limpia de CI genera la web, publica un Worker único, valida las rutas y devuelve un resultado estructurado. Repetir el mismo trabajo no duplica Workers; una nueva versión actualiza el existente.

5. Emails y seguimiento automático

Prioridad: P0 · Impacto: alto · Esfuerzo: bajo–medio.

Qué falta hoy

El sistema de correo está bastante desarrollado:

Texto sin formato
src/features/email/index.ts
src/features/email/cloudflare.ts
src/features/email/resend.ts
src/features/email/outbox.ts
src/features/email/outboxStore.ts
src/features/solicitudes/correos.ts
src/pages/admin/solicitudes.astro
migrations/0042_notificaciones.sql
src/worker.ts

Ya existen confirmaciones de pedido, una cola transaccional, reintentos y plantillas para revisar vistas previas, recordar, solicitar información y comunicar entregas.

El problema es que los correos específicos de solicitudes todavía dependen del botón «Enviar correo» del administrador. Tampoco existe un proceso programado que gestione íntegramente el recordatorio al tercer día o el aviso de espera al séptimo.

src/worker.ts ya dispone de un cron cada cinco minutos. No hace falta añadir otro Worker ni contratar un sistema externo de automatización.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Uso




CCCrafts/punctual

	

MIT

	

129

	

04/10/2026

	

Recordatorios programados sobre Workers




0xdps/emailflare

	

MIT

	

270

	

12/11/2026

	

Envío con plantillas e idempotencia

Qué copiar y adaptar

De Punctual:

Texto sin formato
src/adapters/scheduled.ts
src/core/email-templates.ts

Destinos:

Texto sin formato
src/features/solicitudes/scheduled.ts
src/features/solicitudes/correos.ts

Tomar la separación de tareas programadas, las ventanas de recordatorio y el aislamiento de errores. No copiar su sistema de reservas ni sus servicios de calendario.

De EmailFlare:

Texto sin formato
services/email-worker/src/emails.ts
services/email-worker/src/routes/send.ts

Destinos de integración:

Texto sin formato
src/features/email/layout.ts
src/features/email/outbox.ts

Adoptar la resolución de plantillas, los registros de envío y la comprobación de idempotencia. No desplegar EmailFlare entero: duplicaría la infraestructura de emails que Minshop ya posee.

Secuencias automáticas recomendadas

Evento

	

Correo

	

Condición




Solicitud recibida

	

Confirmación y seguimiento

	

Inmediato




Vista previa validada

	

Enlace de revisión

	

Una vez por versión




Sin respuesta

	

Recordatorio

	

A los 3 días




Sin respuesta prolongada

	

Aviso de espera

	

A los 7 días




Cliente solicita ajustes

	

Confirmación de cambios

	

Inmediato




Faltan datos

	

Petición concreta

	

Solo si se detecta un dato imprescindible




Pago confirmado y entrega lista

	

Entrega definitiva

	

Una vez por pedido y versión

Las notificaciones existentes en D1 deben seguir siendo el registro de envío. Conviene utilizar una clave compuesta por solicitud, tipo de evento y versión, conservando la posibilidad de reintentar errores sin duplicar envíos correctos.

Prueba de aceptación: simular un reloj avanzado tres y siete días. Deben generarse los avisos correspondientes una sola vez. Dos ejecuciones simultáneas del cron no deben enviar correos duplicados. Una solicitud ya aprobada no debe recibir recordatorios de aprobación.

6. Panel de cliente y peticiones de cambios

Prioridad: P1 · Impacto: muy alto · Esfuerzo: medio.

Qué falta hoy

Existen cuentas de cliente, autenticación mediante correo y consulta de pedidos:

Texto sin formato
src/pages/account/index.astro
src/pages/account/login.astro
src/features/auth/customer.ts
src/features/auth/session.ts
src/pages/empezar/estado.astro
src/features/solicitudes/index.ts

Sin embargo, la cuenta de cliente no unifica el pedido con la solicitud, la vista previa, la aprobación y los cambios.

La página pública de seguimiento expone correctamente poca información, pero tampoco permite realizar acciones. El cliente debe responder a un correo para aprobar o solicitar modificaciones.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Utilidad




dimasmong/MoBio

	

MIT

	

0

	

04/11/2026

	

Modelo de borradores, versiones y publicación




directus-labs/agency-os

	

MIT

	

991

	

08/11/2026

	

Referencia de organización de proyectos y actualizaciones




puckeditor/puck

	

MIT

	

13.729

	

17/11/2026

	

Editor visual, reservado para una fase posterior

Qué copiar

Primera adopción: MoBio.

Texto sin formato
migrations/0002_draft_publishing.sql

Adaptarlo al modelo actual de D1 para separar:

versión generada;

versión presentada al cliente;

versión aprobada;

versión publicada.

No copiar sus tablas profile o links literalmente, porque pertenecen a una aplicación de enlaces personales.

Agency OS sirve para estudiar el modelo de información y la relación entre proyectos, actualizaciones y clientes. Sus definiciones están en:

Texto sin formato
directus/template/src/content/os_projects.json
directus/template/src/content/os_project_updates.json
directus/template/src/content/os_tasks.json

No recomiendo copiar su panel Nuxt ni desplegar Directus. Eso introduciría otra aplicación, otra base de datos y un segundo sistema de autenticación.

Panel objetivo

Ampliar src/pages/account/index.astro y crear:

Texto sin formato
src/pages/account/solicitudes/index.astro
src/pages/account/solicitudes/[id].astro
src/pages/api/account/solicitudes/[id]/aprobar.ts
src/pages/api/account/solicitudes/[id]/cambios.ts

Debe mostrar el servicio contratado, su modalidad, estado, vista previa vigente, pago, entrega y cambios restantes.

El cliente podrá aprobar expresamente la versión, describir cambios o consultar el historial. Las acciones deben utilizar la sesión existente y comprobar la titularidad de la solicitud, no depender únicamente de conocer su identificador público.

No adoptar Puck todavía. Sus componentes, como apps/demo/config/blocks/CTA/index.tsx y FAQ/index.tsx, son adecuados para un editor visual React, pero añadirlo a una tienda Astro y a webs HTML generadas supone un proyecto considerable. Una petición de cambios mediante formulario resuelve antes el problema comercial.

Prueba de aceptación: dos cuentas distintas, dos solicitudes y una modificación. Cada cliente ve únicamente lo suyo; aprobar una versión registra su identificador; enviar cambios produce una nueva petición sin sobrescribir la versión previamente entregada.

7. QA automática: visual, enlaces, accesibilidad y E2E

Prioridad: P0 para la fábrica; P1 para ampliaciones de la tienda · Impacto: crítico · Esfuerzo: medio.

Qué falta hoy

Esta es una de las áreas donde menos conviene incorporar herramientas nuevas sin revisar lo existente.

Ya están instalados:

Texto sin formato
.github/workflows/verify.yml
.github/workflows/empleados-qa.yml
.github/workflows/empleados-semanales.yml
qa/smoke.sh
qa/navegadores.mjs
qa/urls-navegadores.txt
qa/htmlvalidate.json
lighthouserc.json

La cobertura incluye pruebas unitarias, integración, Lighthouse, accesibilidad, enlaces, validación HTML y navegadores.

La carencia real es que las pruebas se centran en la tienda y en URLs predeterminadas, no en cada web recién fabricada ni en el ciclo comercial completo.

Una web personalizada podría desplegarse con texto sin sustituir, enlaces a la plantilla original, una imagen rota o un formulario que apunta al negocio de demostración, aunque todas las pruebas de Minshop estén en verde.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Qué adoptar




microsoft/playwright

	

Apache-2.0

	

100.472

	

18/11/2026

	

Pruebas E2E y regresión visual




stripe-samples/checkout-one-time-payments

	

MIT

	

1.063

	

08/06/2026

	

Pruebas de compra




GoogleChrome/web-vitals

	

Apache-2.0

	

8.693

	

09/11/2026

	

Métricas reales de rendimiento

Qué copiar

De Playwright, adoptar la estructura de ejemplos en:

Texto sin formato
examples/todomvc/tests/

Destinos:

Texto sin formato
qa/e2e/solicitud.spec.ts
qa/e2e/aprobacion-pago.spec.ts
qa/e2e/entrega.spec.ts
qa/e2e/web-generada.spec.ts

Estos tests deben utilizar el proyecto existente. No hace falta crear otro framework de automatización, porque qa/navegadores.mjs ya utiliza Playwright.

Para regresión visual, añadir capturas de referencia con la funcionalidad nativa del ejecutor de Playwright, en lugar de incorporar un servicio externo de comparación.

De Stripe:

Texto sin formato
.github/workflows/ci_e2e.yml

Adaptar sus escenarios de checkout al flujo y los endpoints ya existentes.

De web-vitals, incorporar el paquete publicado, cuya implementación se encuentra en:

Texto sin formato
src/onLCP.ts
src/onINP.ts
src/onCLS.ts

Solo para medición posterior de producción. No es un sustituto de Lighthouse.

Nuevas comprobaciones obligatorias

Momento

	

Prueba que debe bloquear




Antes de enviar la vista previa

	

HTML carga, CSS carga, imágenes responden




Antes de enviar la vista previa

	

No quedan nombres, teléfonos ni enlaces de la demo




Antes de enviar la vista previa

	

Captura móvil y escritorio sin errores graves




Antes de enviar la vista previa

	

Enlaces y botones principales funcionan




Antes de entregar

	

Se está publicando la versión aprobada




Después de Stripe

	

Pedido pagado vinculado a la solicitud correcta




Después de publicar

	

URL definitiva devuelve 200 y contiene los datos correctos




Después de aplicar cambios

	

No se ha perdido contenido que el cliente no pidió modificar

La detección de textos no adaptados puede apoyarse en el inventario de valores de la plantilla original: no hace falta intentar resolver ese control exclusivamente mediante otra IA.

Prueba de aceptación: introducir deliberadamente una imagen rota, un enlace a la demo y una discrepancia entre versión aprobada y publicada. Las tres incidencias deben impedir la entrega automática.

8. Captación: blog, comparadores y lead magnets

Prioridad: P1–P2 · Impacto: alto a medio plazo · Esfuerzo: medio.

Qué falta hoy

El catálogo de 71 servicios ofrece muchas búsquedas potenciales, pero la arquitectura actual se centra en fichas de producto, categorías, demos y páginas generales.

Los archivos más relevantes son:

Texto sin formato
manual/catalogo/catalogo.mjs
src/pages/products/index.astro
src/pages/products/[slug].astro
src/pages/search.astro
src/pages/pages/[slug].astro
src/features/storefront/catalog.ts
src/features/search/sinonimos.ts

No existe un sistema editorial comparable al de un blog especializado, ni un conjunto formal de comparadores entre servicios. Tampoco hay un recorrido de captación que entregue automáticamente un recurso específico antes de solicitar una web.

El objetivo no debería ser publicar artículos genéricos sobre inteligencia artificial. La captación debe responder a problemas por los que un pequeño negocio ya está dispuesto a pagar.

Repositorios verificados

Repositorio

	

Licencia

	

Estrellas

	

Último commit

	

Uso




ScrewFast

	

MIT

	

1.441

	

18/11/2026

	

Blog y tarjetas editoriales




codrops/isle-thorne-collective

	

MIT

	

20

	

04/11/2026

	

Artículos y navegación editorial




fulldotdev/ui

	

MIT

	

620

	

26/10/2026

	

Bloques de recursos y llamadas a la acción

Qué copiar

De ScrewFast:

Texto sin formato
src/views/BlogIndexView.astro
src/views/BlogPostView.astro
src/components/ui/cards/CardBlog.astro
src/components/ui/cards/CardBlogRecent.astro
src/utils/content.ts

De Codrops, como alternativa de composición:

Texto sin formato
src/pages/journal/index.astro
src/pages/journal/[slug].astro
src/lib/journal.ts

No mezclar los dos motores de contenido. Elegir ScrewFast como base y, si interesa, extraer solo la presentación visual de Codrops.

De fulldotdev/ui:

Texto sin formato
src/components/blocks/services-1.astro
src/components/blocks/cta-1.astro

Reutilizarlos para colocar comparadores y llamadas a solicitar una muestra.

Primeras páginas que tienen sentido

Contenido

	

Intención de búsqueda

	

Conversión




Cuánto cuesta una web para un restaurante

	

Comparación de precios

	

Solicitud de carta QR o web




Web de peluquería con reservas

	

Solución sectorial

	

Demo de reservas




Web de una página frente a corporativa

	

Elegir modalidad

	

Comparador




Qué necesita una web para captar clientes

	

Investigación práctica

	

Checklist descargable




Ejemplos de webs para pequeños negocios

	

Inspiración con intención comercial

	

Galería de demos




Cómo llevar una carta de restaurante a QR

	

Problema concreto

	

Servicio de carta QR

El primer lead magnet puede ser un checklist para lanzar una web de negocio. Debe entregarse mediante el sistema de email ya instalado, registrar la procedencia de la solicitud y conducir al servicio pertinente.

No introduciría una plataforma de marketing adicional en esta fase. La tienda ya dispone de formularios, D1, emails y parámetros UTM.

Prueba de aceptación: un visitante llega a un artículo o comparador, abre una demo, solicita un recurso y recibe el correo correspondiente. El origen de la captación queda registrado y puede asociarse con una solicitud posterior.

9. Decisiones de arquitectura que afectan a todas las adopciones
Lo que no adoptaría

Candidato o enfoque

	

Decisión

	

Motivo




Sustituir Minshop por otro marketplace completo

	

Descartar

	

Rehace pagos, cuentas, catálogo y pedidos ya implementados




Instalar Directus + Nuxt para gestionar clientes

	

Descartar

	

Dos aplicaciones y dos modelos de datos




Instalar Puck ahora para editar todas las webs

	

Posponer

	

React y una capa nueva de renderizado/publicación




Añadir n8n como motor central

	

Descartar en esta fase

	

La orquestación necesaria puede resolverse dentro del entorno actual




Incorporar otro proveedor de email sin necesidad

	

Descartar

	

Minshop ya tiene adaptadores y cola




Cambiar completamente el tema de la tienda

	

Descartar

	

La carencia principal no es el tema global




Generar miles de páginas SEO automáticamente

	

Descartar

	

Se multiplicarían páginas sin información diferenciada




Crear un Worker nuevo por cada revisión

	

Descartar

	

Consume rápidamente el límite gratuito

Condiciones técnicas para operar sin costes fijos

La solución puede funcionar dentro de cuotas gratuitas, pero no debe presentarse como ilimitada. Además de los límites de Cloudflare ya señalados, conviene que un proceso de fabricación tenga un contador de consumo, un máximo de reintentos y una salida controlada cuando se agote la cuota de IA o de CI.

También hace falta una decisión práctica sobre dónde reside el código de las demos. Hoy se usa una carpeta local externa; para que la fábrica no dependa del ordenador de desarrollo, GitHub Actions necesita acceder a una fuente versionada de esas plantillas.

La primera alternativa es conservar el repositorio de demos independiente y hacer checkout de él durante la fabricación. No es necesario trasladar todas sus plantillas al repositorio de la tienda.

10. Las diez adopciones que ejecutaría, ordenadas por prioridad

Cada tarea está planteada para un agente de desarrollo. El agente debe trabajar en una rama independiente, conservar la lógica actual que ya funciona y finalizar con una prueba verificable. Las rutas nuevas son destinos propuestos; las rutas de origen corresponden a ficheros comprobados.

1. Hacer reproducible la fábrica en GitHub Actions

P0 · Impacto crítico · Esfuerzo medio.

Clonar: cloudflare/wrangler-action y dimasmong/MoBio.

Copiar:

Texto sin formato
cloudflare/wrangler-action/.github/workflows/deploy.yml
    → .github/workflows/fabrica-clientes.yml

MoBio/scripts/deploy-instance.mjs
    → manual/fabrica/deploy-instance.mjs

Adaptar: el workflow para preparar Python, BeautifulSoup, Node y Wrangler; incorporar la fuente versionada de demos mediante DEMOS_DIR; ejecutar manual/fabrica/fabricar.py con un JSON de pedido; validar el identificador del cliente; utilizar un nombre determinista de Worker; separar ejecución de prueba y publicación real.

Prueba: ejecutar manual/fabrica/ejemplo-pedido.json desde un runner limpio. Debe producir los mismos archivos sin depender de C:/GIT/. Una repetición debe desplegar sobre el mismo Worker, no crear otro.

Entregado cuando: el equipo pueda fabricar desde GitHub sin abrir una terminal local.

2. Conectar automáticamente la solicitud con la ejecución de la fábrica

P0 · Impacto crítico · Esfuerzo medio–alto.

Clonar: cloudflare/workflows-starter.

Copiar:

Texto sin formato
cloudflare/workflows-starter/src/examples.ts
    → src/features/fabrica/workflow.ts

cloudflare/workflows-starter/wrangler.jsonc
    → configuración de Workflows integrada en wrangler.jsonc

Adaptar: src/pages/api/solicitudes.ts para crear el trabajo tras guardar la solicitud; usar D1 como fuente de datos y estado; coordinar ejecución, reintentos y comunicación con el workflow de la tarea 1. El trabajo se identifica por solicitud + versión para impedir duplicados.

Prueba: enviar una solicitud por la web y comprobar que se crea un único trabajo. Repetir el evento y forzar un fallo temporal de publicación: debe reintentarse sin duplicar la web.

Entregado cuando: el formulario inicia realmente la producción y no necesita ejecutar vistas-previas.py a mano.

3. Añadir una puerta de calidad obligatoria a cada web generada

P0 · Impacto crítico · Esfuerzo medio.

Clonar: microsoft/playwright.

Copiar: el patrón de organización de examples/todomvc/tests/ y reutilizar qa/navegadores.mjs como base local.

Destinos:

Texto sin formato
qa/e2e/web-generada.spec.ts
qa/e2e/web-generada.visual.spec.ts
.github/workflows/fabrica-clientes.yml

Adaptar: lectura de la URL del Worker generado; comprobación de recursos, enlaces, contactos, textos de ejemplo y capturas a 360 y 1280 px. Incorporar las comprobaciones al job de fabricación antes de comunicar una vista previa.

Prueba: romper deliberadamente una imagen y dejar el teléfono de la plantilla. La entrega debe quedar bloqueada, con diagnóstico en el artefacto de CI.

Entregado cuando: ninguna web generada puede enviarse automáticamente sin pasar QA.

4. Automatizar el correo de vista previa y los recordatorios

P0 · Impacto alto · Esfuerzo bajo–medio.

Clonar: CCCrafts/punctual y 0xdps/emailflare.

Copiar:

Texto sin formato
punctual/src/adapters/scheduled.ts
    → src/features/solicitudes/scheduled.ts

emailflare/services/email-worker/src/emails.ts
    → referencia para src/features/email/layout.ts

Adaptar: mantener src/features/solicitudes/correos.ts y la tabla notificaciones; invocar el proceso desde el cron actual de src/worker.ts; enviar el enlace de revisión cuando la tarea 3 confirme calidad; programar avisos a los 3 y 7 días.

Prueba: simular 10 solicitudes, dos ejecuciones concurrentes y un fallo temporal del proveedor. Debe haber exactamente un envío válido por evento y versión, con reintentos para los fallos.

Entregado cuando: preparar una vista previa ya no obliga a entrar en Admin para enviar el correo.

5. Automatizar aprobación y vinculación del pago

P0 · Impacto crítico · Esfuerzo medio.

Clonar: stripe-samples/checkout-one-time-payments.

Copiar:

Texto sin formato
stripe-samples/checkout-one-time-payments/.github/workflows/ci_e2e.yml
    → .github/workflows/recorrido-cliente.yml

Adaptar: el formulario de aprobación sobre src/pages/empezar/estado.astro o una página autenticada; reutilizar /pay/[publicId], src/features/payments/stripe.ts, src/pages/api/webhook/[provider].ts y src/features/orders/recordWebhook.ts; registrar qué versión se aprobó.

Prueba: aprobación → checkout de prueba → webhook pagado → estado actualizado. Un webhook repetido no debe duplicar el pedido, y un pago fallido no debe desbloquear la entrega.

Entregado cuando: la aprobación produce el paso de pago correcto sin que nadie tenga que preparar el enlace a mano.

6. Versionar y publicar automáticamente la entrega definitiva

P0 · Impacto crítico · Esfuerzo medio.

Clonar: dimasmong/MoBio y cloudflare/wrangler-action.

Copiar:

Texto sin formato
MoBio/migrations/0002_draft_publishing.sql
    → base de migrations/0043_solicitudes_versiones.sql

MoBio/scripts/deploy-instance.mjs
    → reutilizar manual/fabrica/deploy-instance.mjs

Adaptar: separar URL de vista previa, versión aprobada y URL definitiva; mantener historial de despliegue; configurar canonical y Open Graph con la URL definitiva; activar la entrega únicamente cuando el pago esté confirmado o ya existiera compra directa pagada.

Prueba: generar versión 1, aprobarla y pagar; generar posteriormente una versión 2 no aprobada. La entrega debe seguir siendo la versión 1 hasta una nueva aprobación.

Entregado cuando: el cliente recibe automáticamente la versión exacta que aprobó.

7. Incorporar aprobación y solicitudes de cambios al panel existente

P1 · Impacto muy alto · Esfuerzo medio.

Clonar: dimasmong/MoBio. Utilizar directus-labs/agency-os solo como contraste del modelo de proyectos.

Copiar: el patrón de estados de MoBio/migrations/0002_draft_publishing.sql a la migración de versiones de la tarea 6.

Adaptar: src/pages/account/index.astro y src/features/auth/customer.ts para mostrar las solicitudes del cliente. Crear páginas para aprobar, pedir cambios y consultar versiones; conectar los cambios a la misma fábrica, con el límite de rondas establecido por el servicio.

Prueba: cliente A aprueba y cliente B solicita cambios. Verificar aislamiento de datos, correcta contabilización de la ronda incluida y generación de una versión nueva sin sobrescribir la anterior.

Entregado cuando: ningún cambio habitual requiere gestionar una cadena de correos manualmente.

8. Adoptar tres componentes comerciales Astro

P1 · Impacto alto · Esfuerzo bajo.

Clonar: fulldotdev/ui y konstantinWDK/astro-components.

Copiar:

Texto sin formato
fulldotdev/ui/src/components/blocks/services-1.astro
    → src/features/storefront/sections/ServiciosPorNecesidad.astro

fulldotdev/ui/src/components/blocks/pricing-1.astro
    → src/features/storefront/sections/ComparativaModalidades.astro

konstantinWDK/astro-components/src/components/lib/cards/PricingCompareMiniCard.astro
    → src/features/storefront/sections/TarjetaComparacion.astro

Adaptar: componentes y dependencias a los tokens actuales, datos de D1 y precios reales. Incorporar únicamente en las páginas donde la comparación aporte información nueva.

Prueba: comprobar visualmente portada y tres fichas en móvil y escritorio. El usuario debe poder distinguir modalidades, precio, qué recibe y siguiente acción sin leer toda la ficha.

Entregado cuando: la tienda vende mejor sin sustituir su diseño completo.

9. Incorporar blog y páginas sectoriales al sitemap

P1 · Impacto alto a medio plazo · Esfuerzo medio.

Clonar: mearashadowfax/ScrewFast.

Copiar:

Texto sin formato
src/views/BlogIndexView.astro
src/views/BlogPostView.astro
src/components/ui/cards/CardBlog.astro
src/utils/content.ts
src/utils/metadata.ts

Destinos:

Texto sin formato
src/features/blog/
src/features/seo/metadata.ts
src/pages/blog/
src/pages/webs/[sector].astro

Adaptar: contenido español, precio y catálogo reales, enlaces a demos, composición editorial y metadatos centralizados. Actualizar src/pages/sitemap.xml.ts para incluir las nuevas rutas válidas.

Prueba: publicar cinco páginas sectoriales y tres artículos. Comprobar metadatos únicos, enlaces internos, contenido específico, sitemap y ausencia de duplicaciones con las fichas de producto.

Entregado cuando: Google puede encontrar páginas orientadas a problemas sectoriales, además de las fichas de producto.

10. Publicar comparadores y un primer lead magnet automatizado

P2 · Impacto medio–alto · Esfuerzo bajo–medio.

Clonar: fulldotdev/ui y reutilizar la adopción de ScrewFast de la tarea 9.

Copiar:

Texto sin formato
fulldotdev/ui/src/components/blocks/pricing-1.astro
    → src/features/captacion/ComparadorServicios.astro

fulldotdev/ui/src/components/blocks/cta-1.astro
    → src/features/captacion/DescargaRecurso.astro

Adaptar: crear un comparador entre servicios existentes y un recurso descargable, por ejemplo «Checklist antes de contratar la web de tu negocio». Utilizar el proveedor de email de Minshop para entregarlo y D1 para registrar procedencia, sin incorporar un CRM externo.

Prueba: visitante desde URL con UTM → página comparativa → descarga solicitada → email entregado → enlace de servicio. Comprobar que el recurso llega una sola vez y que se conserva la atribución.

Entregado cuando: la captación genera solicitudes medibles sin trabajo administrativo.

Orden final de ejecución

Orden

	

Adopción

	

Prioridad

	

Impacto en ventas

	

Esfuerzo estimado




1

	

Fábrica reproducible en Actions

	

P0

	

Crítico

	

Medio




2

	

Solicitud que dispara producción

	

P0

	

Crítico

	

Medio–alto




3

	

QA por web fabricada

	

P0

	

Crítico

	

Medio




4

	

Correos y recordatorios automáticos

	

P0

	

Alto

	

Bajo–medio




5

	

Aprobación y pago conectados

	

P0

	

Crítico

	

Medio




6

	

Versiones y entrega definitiva

	

P0

	

Crítico

	

Medio




7

	

Portal de cambios y aprobación

	

P1

	

Muy alto

	

Medio




8

	

Componentes comerciales Astro

	

P1

	

Alto

	

Bajo




9

	

Blog y páginas sectoriales

	

P1

	

Alto a medio plazo

	

Medio




10

	

Comparadores y lead magnet

	

P2

	

Medio–alto

	

Bajo–medio

Resultado perseguido

Al completar las primeras siete adopciones, el recorrido objetivo sería:

El cliente solicita una web → la fábrica genera una versión → QA la valida → recibe la vista previa → aprueba o pide cambios → paga cuando corresponde → recibe la web definitiva → gestiona los ajustes incluidos desde su cuenta.

Las tres últimas adopciones actúan sobre la capacidad de convertir visitas y atraer nuevos clientes.

La mayor diferencia respecto a incorporar un constructor de webs completo es que ya tienes un producto, un catálogo, una tienda, una fábrica inicial y varias herramientas de QA. Reemplazarlos introduciría más riesgo que valor.

El siguiente salto no depende de encontrar otro repositorio con miles de estrellas. Depende de unir esos componentes con ejecución reproducible, estados persistentes, pruebas de aceptación y entregas automáticas.

Estado de esta entrega: mapa de adopción contrastado con código y fuentes públicas; no se ha modificado el repositorio, ejecutado un despliegue ni verificado experimentalmente el resultado de estas diez integraciones.