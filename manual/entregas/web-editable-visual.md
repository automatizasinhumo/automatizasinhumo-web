# Web que editas arrastrando bloques

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Portales y webs editables |
| Precio | Lo montas tú 399 € · Te lo montamos 799 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Editor GrapesJS/Puck sobre Workers |
| Base | puckeditor/puck (MIT) |

**Qué es:** Web con editor visual: cambias textos, imágenes y secciones arrastrando, como en Wix, pero tuya.

**Ejemplo:** Asociación cultural: la junta cambia la agenda de actividades cada semana sin depender de nadie.

## 1. Qué le pides al cliente

- Secciones que necesitas
- Contenido inicial
- Quién la editará

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Web que editas arrastrando bloques»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Secciones que necesitas
- Contenido inicial
- Quién la editará

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-editable-visual` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-editable-visual («Web que editas arrastrando bloques») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: puckeditor/puck (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Editor GrapesJS/Puck sobre Workers.
Campos del cliente:
- Secciones que necesitas: <...>
- Contenido inicial: <...>
- Quién la editará: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Web con editor visual; Bloques prediseñados; Formación de 30 min; Alojamiento propio.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-editable-visual tu`.

## 3. Qué entregas

- [ ] Web con editor visual
- [ ] Bloques prediseñados
- [ ] Formación de 30 min
- [ ] Alojamiento propio
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web que editas arrastrando bloques

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web con editor visual
- Bloques prediseñados
- Formación de 30 min
- Alojamiento propio

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Meridian (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/meridian/)
- Demo: [Northstar (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/northstar/)
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) · NOASSERTION
- [puckeditor/puck](https://github.com/puckeditor/puck) · MIT
- [givanz/VvvebJs](https://github.com/givanz/VvvebJs) · Apache-2.0
- [webstudio-is/webstudio](https://github.com/webstudio-is/webstudio) · AGPL-3.0
