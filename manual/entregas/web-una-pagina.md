# Web de una página para tu negocio

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 149 € · Te lo montamos 349 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demo plantillas-eventos/landing-page-template o plantillas-negocio del sector |

**Qué es:** Tu negocio en internet con una sola página clara: quién eres, qué ofreces, cómo contactarte.

**Ejemplo:** Peluquería Lola: portada con foto, lista de servicios con precios, botón «Pide cita por WhatsApp» y mapa.

## 1. Qué le pides al cliente

- Nombre del negocio
- Sector
- Logo (opcional)
- 3–6 servicios con precio
- Teléfono / WhatsApp
- Dirección y horario
- 3–8 fotos

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Web de una página para tu negocio»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del negocio
- Sector
- Logo (opcional)
- 3–6 servicios con precio
- Teléfono / WhatsApp
- Dirección y horario
- 3–8 fotos

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-una-pagina` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-una-pagina («Web de una página para tu negocio») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demo plantillas-eventos/landing-page-template o plantillas-negocio del sector. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre del negocio: <...>
- Sector: <...>
- Logo (opcional): <...>
- 3–6 servicios con precio: <...>
- Teléfono / WhatsApp: <...>
- Dirección y horario: <...>
- 3–8 fotos: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Web de una página adaptada a móvil; Botón de WhatsApp y llamada; Mapa y horario; Publicada con tu dominio (o uno gratuito).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-una-pagina tu`.

## 3. Qué entregas

- [ ] Web de una página adaptada a móvil
- [ ] Botón de WhatsApp y llamada
- [ ] Mapa y horario
- [ ] Publicada con tu dominio (o uno gratuito)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web de una página para tu negocio

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web de una página adaptada a móvil
- Botón de WhatsApp y llamada
- Mapa y horario
- Publicada con tu dominio (o uno gratuito)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Plantillas: restaurante, negocio, portfolio, RSVP…](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/)
- Demo: [Landing de una página](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/landing-page-template/)
- Demo: [Negocio local](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/business-template/)
- Demo: [Lanzamiento de producto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/product-launch/)
- [ColorlibHQ/bootstrap-templates](https://github.com/ColorlibHQ/bootstrap-templates) · MIT
- [mmrahmanbappi/100-free-html-templates](https://github.com/mmrahmanbappi/100-free-html-templates) · MIT
- [micah-masuka/free-website-templates](https://github.com/micah-masuka/free-website-templates) · MIT
