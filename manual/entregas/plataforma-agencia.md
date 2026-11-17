# Plataforma para tu agencia: clientes, webs y CRM

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Portales y webs editables |
| Precio | Lo montas tú 490 € · Te lo montamos 990 € |
| Plazo publicado | 10 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Directus o Worker + D1 |
| Base | SimplerDevelopment/SimplerDevelopment (Apache-2.0) |

**Qué es:** Para agencias y freelancers: un panel donde cada cliente tiene su web, su portal y su ficha en el CRM, con cobros automáticos.

**Ejemplo:** Diseñadora freelance con 12 clientes: cada uno entra a su portal, ve facturas y pide cambios sin escribir al WhatsApp personal.

## 1. Qué le pides al cliente

- Nombre de la agencia y logo
- Servicios que vendes
- Primeros clientes a dar de alta
- Dominio

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Plataforma para tu agencia: clientes, webs y CRM»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre de la agencia y logo
- Servicios que vendes
- Primeros clientes a dar de alta
- Dominio

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 10 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs plataforma-agencia` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto plataforma-agencia («Plataforma para tu agencia: clientes, webs y CRM») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: SimplerDevelopment/SimplerDevelopment (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Directus o Worker + D1.
Campos del cliente:
- Nombre de la agencia y logo: <...>
- Servicios que vendes: <...>
- Primeros clientes a dar de alta: <...>
- Dominio: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Panel multi-cliente propio; Portal privado para cada cliente; CRM con fichas y tareas; Cobros recurrentes con Stripe (con tus claves).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs plataforma-agencia tu`.

## 3. Qué entregas

- [ ] Panel multi-cliente propio
- [ ] Portal privado para cada cliente
- [ ] CRM con fichas y tareas
- [ ] Cobros recurrentes con Stripe (con tus claves)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Plataforma para tu agencia: clientes, webs y CRM

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Panel multi-cliente propio
- Portal privado para cada cliente
- CRM con fichas y tareas
- Cobros recurrentes con Stripe (con tus claves)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Agencia de marketing](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/digital-marketing-agency/)
- [SimplerDevelopment/SimplerDevelopment](https://github.com/SimplerDevelopment/SimplerDevelopment) · Apache-2.0
- [directus-labs/agency-os](https://github.com/directus-labs/agency-os) · MIT
