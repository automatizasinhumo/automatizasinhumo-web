# Boletín de email propio sin cuotas por contacto

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Formularios y captación |
| Precio | Lo montas tú 149 € · Te lo montamos 299 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Brevo o MailerLite (capa gratuita) con formulario en su web |
| Base | knadh/listmonk (AGPL-3.0) |

**Qué es:** Tu propio sistema de newsletter: formulario de alta, plantillas y envíos programados, sin pagar por cada suscriptor.

**Ejemplo:** Librería de barrio: cada lunes «Novedades de la semana» a 2.300 suscriptores sin cuota mensual por contactos.

## 1. Qué le pides al cliente

- Nombre del boletín
- Logo y colores
- Contactos actuales (si tienes)
- Frecuencia de envío

**Accesos:**
- Cuenta gratuita de Brevo o MailerLite del cliente
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Boletín de email propio sin cuotas por contacto»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del boletín
- Logo y colores
- Contactos actuales (si tienes)
- Frecuencia de envío

Y además (te guiamos paso a paso si no sabes cómo):
- Cuenta gratuita de Brevo o MailerLite del cliente
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs newsletter-propia` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto newsletter-propia («Boletín de email propio sin cuotas por contacto») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: knadh/listmonk (AGPL-3.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Brevo o MailerLite (capa gratuita) con formulario en su web.
Campos del cliente:
- Nombre del boletín: <...>
- Logo y colores: <...>
- Contactos actuales (si tienes): <...>
- Frecuencia de envío: <...>
Accesos que ya me ha dado el cliente:
- Cuenta gratuita de Brevo o MailerLite del cliente: <sí/no>
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Servidor de newsletter configurado; Formulario de alta para tu web; Plantilla de email con tu marca; Doble confirmación y baja (RGPD).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs newsletter-propia tu`.

## 3. Qué entregas

- [ ] Servidor de newsletter configurado
- [ ] Formulario de alta para tu web
- [ ] Plantilla de email con tu marca
- [ ] Doble confirmación y baja (RGPD)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Boletín de email propio sin cuotas por contacto

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Servidor de newsletter configurado
- Formulario de alta para tu web
- Plantilla de email con tu marca
- Doble confirmación y baja (RGPD)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [knadh/listmonk](https://github.com/knadh/listmonk) · AGPL-3.0
