# Portal de clientes para agencias y freelancers

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Portales y webs editables |
| Precio | Lo montas tú 299 € · Te lo montamos 599 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Directus o Worker + D1 |
| Base | directus-labs/agency-os (MIT) |

**Qué es:** Tus clientes entran con su usuario y ven proyectos, archivos, facturas y avances.

**Ejemplo:** Estudio de diseño: el cliente ve «Logo – fase 2 de 3» y descarga las propuestas.

## 1. Qué le pides al cliente

- Logo y colores
- Clientes y proyectos iniciales
- Servicios que facturas

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Portal de clientes para agencias y freelancers»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Logo y colores
- Clientes y proyectos iniciales
- Servicios que facturas

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs portal-cliente` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto portal-cliente («Portal de clientes para agencias y freelancers») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: directus-labs/agency-os (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Directus o Worker + D1.
Campos del cliente:
- Logo y colores: <...>
- Clientes y proyectos iniciales: <...>
- Servicios que facturas: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Portal con tu marca; Proyectos y tareas; Archivos compartidos; Facturas y presupuestos.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs portal-cliente tu`.

## 3. Qué entregas

- [ ] Portal con tu marca
- [ ] Proyectos y tareas
- [ ] Archivos compartidos
- [ ] Facturas y presupuestos
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Portal de clientes para agencias y freelancers

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Portal con tu marca
- Proyectos y tareas
- Archivos compartidos
- Facturas y presupuestos

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [directus-labs/agency-os](https://github.com/directus-labs/agency-os) · MIT
- [Vibra-Labs/Atrium](https://github.com/Vibra-Labs/Atrium) · NOASSERTION
- [onlineprfoundation/pr-agency-platform](https://github.com/onlineprfoundation/pr-agency-platform) · NOASSERTION
