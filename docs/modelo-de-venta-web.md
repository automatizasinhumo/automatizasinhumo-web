# Qué vendemos cuando vendemos una web: alojamiento, dominio y propiedad

Estado a 19/11/2026. Este documento complementa `docs/entrega-y-alojamiento.md`, que explica el *cómo
técnico*. Aquí se decide **qué se vende**: dónde vive la web, quién es el dueño y cómo entra el dominio
en el precio. Cada decisión lleva su fuente. Lo que no está confirmado aparece como **[por verificar]**.

## 1. Cómo lo hace el mercado (España, 2026)

| Modelo | Quién lo usa | Qué paga el cliente | ¿De quién es la web? |
| --- | --- | --- | --- |
| **Pago único y entrega en propiedad** | Freelance | 300–1.500 € una vez; después dominio (10–20 €/año) y alojamiento (60–200 €/año) a su nombre | Del cliente |
| **Pago único y mantenimiento** | Agencias | 1.500–10.000 € más 30–100 €/mes de mantenimiento; la agencia aloja | Suele ser del cliente, pero vive en el servidor de la agencia |
| **Cuota (web por suscripción, Wix y similares)** | Plataformas y algunas agencias | Una cuota mensual | **No es del cliente**: si se va, la pierde |

Fuentes: [cronoshare](https://www.cronoshare.com/cuanto-cuesta/pagina-web),
[ontopmarketing](https://www.ontopmarketing.es/blog/cuanto-cuesta-una-pagina-web/),
[solidaweb](https://solidaweb.com/es/blog/cuanto-cuesta-mantener-una-pagina-web),
[takum](https://takum.io/cuanto-cuesta-una-pagina-web-espana/).

Hay tres prácticas comunes a todos los modelos serios:
- El **dominio va a nombre del cliente** (es el titular), aunque lo gestione el proveedor.
- El precio de **renovación** se dice desde el principio.
- El cliente tiene **acceso de administrador** al registrador y al alojamiento.

Nuestros precios están en la parte baja del modelo freelance: de 99 € (boda) a 299 € (inmobiliaria).
La web ya promete que el servicio es «tuyo, sin cuota». Además, `introCategorias.ts` dice «publicadas
con tu dominio», y **hoy eso no es verdad**: no hay dominio en el producto. Hay que cumplirlo (apartado 3)
o cambiar el texto.

## 2. ¿Dónde vive la web vendida? Respuesta: en la cuenta del cliente

David preguntó: «si la pagan y no tienen mantenimiento, ¿qué sentido tiene tenerla en mi Cloudflare?».
Ninguno, y además hay razones para que no viva allí:

1. **Los límites gratuitos son por cuenta y se comparten.** El plan gratuito admite
   [100 Workers por cuenta](https://developers.cloudflare.com/workers/platform/limits) y
   **100.000 peticiones al día para todo lo que tengamos**. Hoy el staging ya gasta unas 38.000. Los
   ficheros estáticos no cuentan
   ([son gratis e ilimitados](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations)),
   pero el formulario de contacto sí: es un Worker. Un cliente con un pico de visitas podría tumbar el
   formulario de todos los demás y el nuestro.
2. **Observability y el resto de cupos diarios también son de la cuenta.** El 19/11 ya llegamos al 75 %
   (ver la PR #74).
3. **Propiedad y responsabilidad.** Si la web vive en nuestra cuenta, seguimos dependiendo de ella y el
   cliente de nosotros: es el modelo «cuota» sin cobrar la cuota. Un incidente en nuestra cuenta, como un
   bloqueo o un error de facturación, afectaría a todos los clientes.
4. **Al cliente le sale gratis.** Una cuenta gratuita de Cloudflare cuesta 0 €. Así su alojamiento es
   gratis para siempre, mientras que el alojamiento compartido típico cuesta 60–200 €/año. Es un argumento
   de venta.

**Modelo propuesto (llave en mano):**

| Fase | Dónde vive | Cuánto dura |
| --- | --- | --- |
| Vista previa antes de pagar | En **nuestra** cuenta, en el Worker compartido de vistas previas | Hasta que pague o caduque (30 días) |
| Entrega | En la **cuenta gratuita de Cloudflare del cliente**. El cliente nos invita como miembro y desplegamos con su autorización | Para siempre; el cliente puede quitarnos el acceso cuando quiera |
| Cliente que no quiere cuenta | Alojamiento puente en nuestra cuenta, con fecha de fin (por ejemplo, 12 meses incluidos) y aviso antes de que acabe | Temporal y escrito en las condiciones |

El alta de la cuenta del cliente **no se puede automatizar** sin ser partner de Cloudflare: la tiene que
crear el cliente con su correo. Para un cliente que no es técnico, eso exige una guía de 5 minutos con
capturas, o hacerlo juntos en una llamada. Después de la invitación, el despliegue sí es automático.
**[por verificar]** Que un miembro invitado con un token de API pueda desplegar Workers y conectar un
dominio. Se prueba con una segunda cuenta nuestra antes de prometerlo.

## 3. El dominio: incluido siempre, con precio variable

Coincido con David: **la web se vende con dominio**, salvo que el cliente ya tenga uno. Quien compra una
web normalmente no sabe registrar un dominio.

**Reglas:**
- **El titular es el cliente.** Para `.es` lo exige el registro: se piden el NIF/NIE y se validan los
  datos del titular
  ([OVHcloud, validación del titular](https://docs.ovhcloud.com/en/guides/web-cloud/domains/domain-verify-holder)).
  Nosotros figuramos como contacto técnico.
- **Precio = coste real del primer año + un margen fijo pequeño.** Antes de pagar se muestra también la
  **renovación anual**, que la paga el cliente desde su cuenta.
- **Disponibilidad comprobada antes de cobrar.** Si el nombre está cogido o es *premium*, el formulario
  ofrece alternativas (`.es`, `.com`, con guion, con ciudad) con su precio, y el cliente elige.
- **Elegibilidad antes de ofrecerlo.** `.cat` solo vale para webs en catalán o relacionadas con la
  cultura catalana ([OVHcloud, `.cat`](https://www.ovhcloud.com/en/domains/tld/cat/)), y los geográficos tienen
  sus propias reglas. El formulario solo propone un TLD si el cliente cumple sus condiciones.
- El registro es **no reembolsable**. Solo se registra después de que el cliente confirme nombre y precio.

**¿Con qué registrador? (automatizable)**

| Opción | Ventaja | Problema |
| --- | --- | --- |
| [Registrar API de Cloudflare](https://blog.cloudflare.com/registrar-api-beta/) (beta desde abril de 2026) | Buscar, comprobar y registrar por API, **a precio de coste sin margen**, en el mismo sitio que el alojamiento | Beta: todavía no hay renovaciones, traslados ni cambio de contactos por API. Cobra en la tarjeta de la cuenta que registra. **No admite `.es`, `.eu`, `.cat` ni los geográficos** (`.madrid`, `.barcelona`, `.gal`, `.eus`): comprobado el 19/11/2026 en los datos de su [página de TLD](https://www.cloudflare.com/tld-policies/) (376 TLD; los de dos letras son `ai`, `ca`, `cc`, `co`, `fm`, `io`, `mx`, `nz`, `tv`, `uk` y `us`) |
| [API de dominios de OVHcloud](https://help.ovhcloud.com/csm/en-domain-names-api-order?id=kb_article_view&sysparm_article=KB0051563) | Admite `.es`, valida la elegibilidad del titular en el propio pedido y tiene API estable | Otra cuenta y otro proveedor. El traslado de un `.es` tarda de 7 a 9 días |

**Flujo propuesto: el primer año lo compramos nosotros y lo entregamos**

Así se cumple «dominio incluido» y el cliente **paga el registro una sola vez, dentro de nuestro precio**.
Ningún registrador le cobra el primer año aparte, porque el pedido sale de nuestra cuenta con nuestra tarjeta.

| TLD | Registro (año 1) | Entrega | Renovación (año 2 y siguientes) |
| --- | --- | --- | --- |
| `.com`, `.net` y otros admitidos por Cloudflare | Con la Registrar API, **en nuestra cuenta de Cloudflare**, después de que el cliente confirme y pague. Cada registro envía los datos del cliente como contacto titular (`contacts.registrant`): sin ese campo, la API usa el contacto por defecto de la cuenta, que es el nuestro, y el cliente no sería el titular hasta el traslado | [Traslado entre cuentas](https://developers.cloudflare.com/registrar/account-options/inter-account-transfer/) a la cuenta del cliente. Cloudflare solo lo permite **cuando el dominio lleva más de 10 días registrado**; las dos partes lo confirman y después queda bloqueado 30 días. Mientras tanto la web se ve en la vista previa y el dominio se conecta el día del traslado | La paga el cliente desde su cuenta, con su método de pago |
| `.es`, `.eu`, `.cat` y geográficos | En **nuestra cuenta de OVHcloud**, con el cliente como **titular** (NIF/NIE validado) | Se pasan los contactos **administrativo y de facturación** a la cuenta de OVHcloud del cliente (gratis). Solo el contacto administrativo puede gestionar el dominio; nosotros nos quedamos como contacto técnico mientras haga falta | La paga el cliente desde su cuenta de OVHcloud. Si no quiere otra cuenta, puede trasladarlo a otro registrador cuando quiera |

**[por verificar]** El cambio de contactos de OVHcloud por API y lo que tarda; el precio exacto de cada TLD
en las dos API; que la Registrar API de Cloudflare (beta) acepte `contacts.registrant` en el alta, como dice
su [documentación](https://developers.cloudflare.com/registrar/registrar-api/).

Si el cliente ya tiene dominio, no se registra nada: se conecta el suyo.

## 4. Qué compra exactamente el cliente

| Incluido en el precio | Lo paga el cliente aparte | Opcional |
| --- | --- | --- |
| La web hecha, publicada en su cuenta, con su dominio conectado, HTTPS y el formulario probado. **El primer año del dominio**, a coste más margen, una sola vez | La renovación anual del dominio, desde su cuenta del registrador | Mantenimiento mensual, si quiere que hagamos cambios |
| El ZIP con todo el código y los textos (ver `entrega-y-alojamiento.md`) | — | Alojamiento puente en nuestra cuenta, con fecha de fin |
| Una ronda de cambios y la garantía (como dicen las Condiciones) | — | — |

Con esto, «es tuyo, sin cuota» pasa a ser verdad del todo: el dominio está a su nombre, el alojamiento es
gratis en su cuenta y tiene una copia completa.

## 5. Tareas

- [x] Cambiar «publicadas con tu dominio» (`introCategorias.ts`) por algo cierto hoy (esta PR).
- [x] Comprobar qué TLD admite Cloudflare Registrar: `.com`, `.net`, `.org`, `.dev` y similares, sí; `.es`,
      `.eu`, `.cat` y geográficos, no (van por OVHcloud). Falta anotar precios desde la API con un token propio.
- [ ] **[ahora]** Prueba con una segunda cuenta nuestra: invitación como miembro, token, despliegue del
      Worker y conexión de un dominio.
- [ ] **[antes de producción]** Comprobación de dominio en el formulario: elegibilidad del TLD,
      disponibilidad, precio y renovación de 2–3 alternativas. La fecha de entrega cuenta los 10 días antes del traslado.
- [ ] **[antes de producción]** Guía «Crea tu cuenta gratuita de Cloudflare e invítanos», con capturas. Para
      poder recibir el dominio y renovarlo, la cuenta del cliente necesita: un perfil de facturación con un
      método de pago válido, un contacto de registro por defecto y aceptar el Domain Registration Agreement
      en *Registrar*. Los mismos requisitos valen para nuestra cuenta, que registra el primer año.
- [ ] **[antes de producción]** Guía de OVHcloud para `.es`: crear la cuenta y aceptar los contactos
      administrativo y de facturación.
- [ ] **[antes de producción]** Condiciones: titularidad del dominio, quién paga la renovación, fin del
      alojamiento puente y no reembolso del dominio.
- [ ] **[antes de producción]** Cuenta de OVHcloud con la API para `.es`, con el sandbox si existe.
