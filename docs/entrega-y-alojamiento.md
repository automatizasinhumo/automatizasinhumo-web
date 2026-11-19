# Entrega y alojamiento de lo que vendemos

Estado a 19/11/2026. Fuente: ronda 22 de GPT (`manual/auditorias-gpt/ronda-22-respuesta.md`, bloque G),
contrastada con `manual/fabrica/fabricar.py`. Este documento separa **lo que hay hoy** de **lo que
falta**: los textos de la FAQ del final solo se publican cuando su parte esté funcionando.

## 1. Cómo funciona hoy

| Paso | Qué pasa | Quién |
| --- | --- | --- |
| Vista previa | `fabricar.py` baja la plantilla demo, reescribe textos con Workers AI, pone nombre, correo y teléfono del cliente y despliega un Worker estático `web-<id>` con `wrangler deploy` | Automático (fábrica en local o en Actions) |
| Enlace | `https://web-<id>.davidpd89.workers.dev` | Automático |
| Dónde vive | En **nuestra** cuenta de Cloudflare, un Worker por cliente | — |
| Dominio propio, paquete descargable, traspaso | **No existe** | — |

La web dice «te entregamos el enlace publicado» y «ninguna cuota obligatoria». Eso es cierto hoy, pero
deja tres huecos sin respuesta: de quién es la web a largo plazo, cómo se pone el dominio del cliente y
qué se lleva si deja de trabajar con nosotros.

**Límite que obliga a cambiar el modelo:** el plan gratuito de Cloudflare admite 100 Workers por cuenta.
Un Worker por cliente se agota con 100 ventas. No se resuelve abriendo más cuentas.

## 2. Modelo propuesto

1. **Vista previa (antes de pagar):** un único Worker compartido con D1 y R2 que sirve todas las vistas
   previas por ruta, con versiones y vuelta atrás. No se escribe desde cero: se adopta uno de estos
   repos MIT y se prueba con 100 webs de ejemplo antes de elegir.
   - [raveli/agent2web](https://github.com/raveli/agent2web): multisitio sobre D1+R2, versiones,
     rollback, panel y API de publicación, más de 20 ficheros de test.
   - [t0saki/sitedrop](https://github.com/t0saki/sitedrop): publica un ZIP en una ruta con cambio
     atómico de versión. Trae `smoke.sh`, `conformance.sh` y CI.
   - [cloudflare/templates](https://github.com/cloudflare/templates) para piezas sueltas
     (`email-routing-template`, `d1-starter-sessions-api-template`, `chanfana-openapi-template`).
2. **Paquete de entrega (siempre, tras pagar):** un ZIP por pedido con la web lista para publicar, el
   código, los datos del negocio (BusinessManifest), la documentación, el resultado de QA y
   `checksums.sha256`. Se guarda en R2: 10 GB gratis.
3. **Publicación definitiva:** la opción preferida es la **cuenta gratuita de Cloudflare del cliente**,
   que así es dueño de alojamiento, dominio y estadísticas. La alternativa es GitHub Pages o Netlify con
   el mismo ZIP. Mientras el cliente prepara su cuenta sigue funcionando el enlace de nuestra vista
   previa.
4. **Dominio:** el dominio se añade como zona en la cuenta Cloudflare del cliente, y en el Worker se usa
   *Settings → Domains & Routes → Custom Domain*. Una vez autorizado, se automatiza con Wrangler o la API.
   Descartamos Cloudflare for SaaS: pide tarjeta y cobra 0,10 $ por cada hostname a partir del 101.

### Qué recibe el cliente según el producto

| Producto | Entrega |
| --- | --- |
| Web | Enlace + ZIP (`web/dist`, `src`, `public`), datos, guías (publicar, dominio, editar), QA y capturas |
| Automatización n8n | Workflow JSON exportado, diagrama, entradas y salidas, cuentas necesarias, prueba y cómo recuperarlo |
| Automatización Make/Zapier | Blueprint exportable (si la plataforma lo permite), lista de módulos y cuentas, capturas y prueba |
| Traducción | Ficheros traducidos, glosario, lista de páginas y, si estaba incluida, la configuración multidioma |
| Plantilla | ZIP editable, un ejemplo relleno e instrucciones |

Las claves de servicios externos se configuran siempre en la cuenta del cliente. El ZIP nunca lleva
contraseñas.

### Formularios, correo y analítica

| Elemento | Solución | Automático o manual |
| --- | --- | --- |
| Formularios | Worker + D1 en la cuenta del cliente; la prueba de entrega envía un contacto de ejemplo y comprueba que llega | Automatizable tras su autorización |
| Avisos | Correo verificado o bot de Telegram | Configuración inicial manual |
| Correo del dominio | Cloudflare Email Routing (reenvío a su correo) | Lo verifica el cliente |
| Estadísticas | Cloudflare Web Analytics en su cuenta | Automático tras configurar |
| Copias | ZIP versionado por pedido en R2 + historial de versiones | Automático |

## 3. Flujo de punta a punta

| Etapa | Automático (fábrica / Actions) | Manual (David o cliente) |
| --- | --- | --- |
| 1. Elección | Ficha con modalidades, precio y límites | El cliente elige |
| 2. Briefing | Guarda el BusinessManifest validado en D1 | El cliente aporta datos y fotos |
| 3. Fabricación | Plantilla → textos → versión privada | — |
| 4. QA | Visual, SEO, funcional, contenido | David solo si hay excepción |
| 5. Vista previa | Envía el enlace y registra los cambios pedidos | El cliente revisa |
| 6. Pago | Stripe confirma y actualiza el pedido | El cliente paga |
| 7. Empaquetado | ZIP, manifiestos, guías, checksum y copia en R2 | — |
| 8. Alojamiento | Enlace inicial o despliegue en la cuenta del cliente | El cliente autoriza su cuenta Cloudflare |
| 9. Dominio | Configura y verifica DNS y HTTPS | El cliente compra el dominio y cambia los DNS |
| 10. Validación | Enlaces, formulario que llega, canonical, robots, sitemap y analítica | David solo con bloqueos |
| 11. Entrega | URL, archivos, guías y QA en `/order/<token>` | El cliente confirma |

**Condición de entrega:** el pedido no se marca como entregado sin una URL accesible, el ZIP generado y
la prueba funcional en verde de cada parte contratada.

## 4. Textos para la FAQ (publicar solo cuando lo descrito esté activo)

**¿Dónde se aloja mi web?**
Si eliges «Te lo montamos», publicamos tu web y te damos un enlace para verla desde el primer día. Si
quieres, la pasamos a tu propia cuenta gratuita de Cloudflare: así el alojamiento, el dominio y las
estadísticas quedan a tu nombre. No hay cuota obligatoria.

**¿Qué recibo exactamente?**
El enlace de tu web funcionando y un archivo descargable con todo lo necesario para publicarla en
cualquier sitio: la web lista, sus textos e imágenes, una guía para publicarla y conectar tu dominio, y
el informe de pruebas que pasó antes de entregártela. En automatizaciones y traducciones recibes los
archivos exportados y la guía para usarlos.

**¿Puedo usar mi propio dominio?**
Sí. Te guiamos paso a paso para conectarlo, y si tu dominio está en Cloudflare lo conectamos nosotros
cuando nos des acceso. Tu correo actual no se toca.

**¿Y si quiero irme?**
La web es tuya. Tienes el archivo completo para publicarla en otro alojamiento cuando quieras, sin
permanencia ni penalización. Si está en tu cuenta de Cloudflare, no tienes que hacer nada: sigue
funcionando.

Hasta que exista el paquete, la FAQ solo puede decir lo cierto hoy: «te entregamos el enlace de tu
web publicada; si quieres usar tu dominio o llevártela, escríbenos y te lo preparamos».

## 5. Tareas

- [ ] Probar agent2web y sitedrop con 100 webs de ejemplo (aislamiento, caché, rollback, plan gratuito)
      y elegir uno. **[ahora]**
- [ ] `fabricar.py` genera el ZIP de entrega y lo sube a R2. **[ahora]**
- [ ] La guía `conectar-dominio.md` y despliegue en la cuenta del cliente con un token que da él.
      **[antes de producción]**
- [ ] Prueba de entrega: el formulario de ejemplo llega de verdad al destino. **[antes de producción]**
- [ ] Publicar los textos de la FAQ del apartado 4. **[antes de producción, cuando 1–3 estén en
      verde]**
