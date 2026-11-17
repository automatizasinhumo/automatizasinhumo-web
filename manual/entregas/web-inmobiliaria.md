# Web para inmobiliaria

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 299 € · Te lo montamos 599 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | arjoonarora/real-estate-website-template (demo inmobiliaria) |

**Qué es:** Escaparate de inmuebles con fichas, fotos y contacto directo con el agente.

**Ejemplo:** Inmobiliaria Costa: 12 pisos en venta con fotos, botón «Quiero visitarlo» y WhatsApp del agente.

## 1. Qué le pides al cliente

- Nombre de la agencia
- Inmuebles (precio, m², habitaciones, fotos)
- Agentes
- Zona de trabajo

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Web para inmobiliaria»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre de la agencia
- Inmuebles (precio, m², habitaciones, fotos)
- Agentes
- Zona de trabajo

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-inmobiliaria` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-inmobiliaria («Web para inmobiliaria») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: arjoonarora/real-estate-website-template (demo inmobiliaria). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre de la agencia: <...>
- Inmuebles (precio, m², habitaciones, fotos): <...>
- Agentes: <...>
- Zona de trabajo: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Listado de inmuebles con filtros; Ficha por inmueble con galería; Página de agentes; Formulario de consulta.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-inmobiliaria tu`.

## 3. Qué entregas

- [ ] Listado de inmuebles con filtros
- [ ] Ficha por inmueble con galería
- [ ] Página de agentes
- [ ] Formulario de consulta
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web para inmobiliaria

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Listado de inmuebles con filtros
- Ficha por inmueble con galería
- Página de agentes
- Formulario de consulta

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Web inmobiliaria con buscador](https://automatizasinhumo-demos.davidpd89.workers.dev/inmobiliaria/)
- Demo: [Agencia inmobiliaria](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/real-estate-agency/)
- Demo: [Alquiler vacacional](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/vacation-rental/)
- [arjoonarora/real-estate-website-template](https://github.com/arjoonarora/real-estate-website-template) · MIT
