# Firma de email profesional

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 19 € · Te lo montamos 49 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Firma con tu foto o logo, cargo, teléfono, redes y aviso legal, que se ve bien en Gmail, Outlook y móvil.

**Ejemplo:** Despacho de 6 abogados: misma firma para todos, con logo, teléfono directo y enlace de cita.

## 1. Qué le pides al cliente

- Nombre y cargo de cada persona
- Logo o foto
- Teléfono y web
- Redes sociales

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Firma de email profesional»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre y cargo de cada persona
- Logo o foto
- Teléfono y web
- Redes sociales

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs firma-email` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto firma-email («Firma de email profesional») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Nombre y cargo de cada persona: <...>
- Logo o foto: <...>
- Teléfono y web: <...>
- Redes sociales: <...>
Tiene que quedar: Firma HTML probada en Gmail y Outlook; Versión para todo tu equipo; Guía de instalación en 2 minutos.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs firma-email tu`.

## 3. Qué entregas

- [ ] Firma HTML probada en Gmail y Outlook
- [ ] Versión para todo tu equipo
- [ ] Guía de instalación en 2 minutos
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Firma de email profesional

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Firma HTML probada en Gmail y Outlook
- Versión para todo tu equipo
- Guía de instalación en 2 minutos

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

