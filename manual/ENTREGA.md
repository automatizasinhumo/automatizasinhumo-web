# Entregas: cuánto se tarda y qué sale con un prompt (17-11-2026)

Idea: el cliente compra, rellena los campos y tú me pasas un prompt. Yo genero el resultado desde la plantilla, lo publico gratis en Cloudflare (`<cliente>.workers.dev` o Pages) y te devuelvo el enlace. Tú solo lo revisas y se lo envías.

## Niveles

| Nivel | Qué significa | Tu tiempo real | Productos |
|---|---|---|---|
| **A · Un prompt** | Plantilla estática + campos del cliente. La genero y la publico yo, sin cuentas del cliente. | 5–15 min (revisar y enviar) | web-una-pagina, portfolio-editable, link-in-bio, tarjeta-digital, cv-profesional, invitacion-digital, web-boda-rsvp\*, carta-qr, qr-campanas, firma-email, banner-cookies-rgpd, optimizar-imagenes, muro-testimonios, logo-vectorial, fotos-producto-fondo, etiquetas-codigo-barras, limpieza-csv, plantilla-inventario, informe-graficos, diagramas-procesos, dossier-comercial, descripciones-producto-ia, carruseles-redes, facturas-presupuestos, galeria-privada-evento, auditoria-web |
| **B · Prompt + cuentas del cliente** | Lo genero yo, pero hace falta un token o un acceso del cliente (bot de Telegram, Google, dominio, clave de IA). Se le manda una guía de 3 pasos. | 30–90 min, casi todo esperando al cliente | web-corporativa-5-secciones, web-blog-astro, web-inmobiliaria, web-taller, web-multidioma, pagina-citas, reservas-restaurante, carta-pedidos-whatsapp, formulario-aviso-telegram, lista-espera, avisos-multicanal, newsletter-propia, ficha-google, bot-telegram-chatgpt, chat-ia-web, auto-captacion-leads, auto-facturas, auto-resenas, auto-plantilla-medida, auto-tareas-programadas, acortador-enlaces, analitica-sin-cookies, vigilancia-caidas, vigilancia-precios, aviso-cambios-web, certificados-automaticos, transcripcion-audios, pizarra-planos, centro-ayuda, gestion-invitados-mesas, tienda-productos-digitales |
| **C · Proyecto** | Hay datos, pagos o integraciones del cliente. Con prompts sale el 80 %, pero el resto es trabajo. | 1–3 días | tienda-online, marketplace-plantillas, plataforma-agencia, portal-cliente, web-editable-visual, web-arrastrar-soltar, web-wordpress, crm-whatsapp, asistente-ia-pedidos, bot-telegram-medida, reservas-salon |

\* El formulario de RSVP usa el aviso a Telegram (nivel B) si el cliente quiere recibir las respuestas al momento. Sin eso es nivel A, con un enlace a WhatsApp o al email.

**Recomendación:** empuja en portada y en anuncios los productos de nivel A, que es donde está el margen sin trabajo. Los de nivel C pueden pasar a "bajo consulta" si un día te saturan.

## Plazos

Los plazos publicados (24 h, 48 h, 3–10 días) dejan margen de sobra. Un nivel A se puede entregar el mismo día.

## El prompt de entrega

Pega esto en Claude Code (en `C:\GIT\automatizasinhumo-demos`) con los datos del pedido:

```
Entrega del pedido <nº> · producto <slug> · modalidad <Lo montas tú | Te lo montamos>
Campos del cliente:
<pega aquí lo que rellenó en el pedido>
Haz: copia la demo de ese producto a clientes/<slug-cliente>/, sustituye textos, colores e imágenes con estos campos,
quita todo lo de demo, revisa móvil y accesibilidad, y publícala en un worker propio (<slug-cliente>).
Devuélveme el enlace, una captura y el texto del email para el cliente.
Si es "Lo montas tú", genera además un ZIP con la plantilla rellenada y la guía paso a paso.
```

- Para el nivel B, añade al prompt: "Prepara también la guía para que el cliente me pase <token/acceso>".
- Para el nivel C: "Haz un plan de entrega por fases y empieza por la fase 1".

## Qué falta para que sea del todo automático (en orden de valor)

1. **Webhook de pedido pagado → borrador de entrega:** cuando Stripe confirme el pago, un Worker guarda los campos y prepara el prompt de arriba ya relleno. Se monta junto con Stripe, al final.
2. **Carpeta `clientes/` en el repo de demos**, con un script `publicar.mjs <slug>` que despliega un worker por cliente. Gratis: Workers da 100k peticiones al día.
3. **Email de entrega** con la plantilla de Minshop: ya existe el email de pedido, solo falta añadir el enlace de entrega desde el admin.
