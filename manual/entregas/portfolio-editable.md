# Portfolio con panel para editarlo tú

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 179 € · Te lo montamos 349 € |
| Plazo publicado | 3 días |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática + panel de edición (Pages CMS o Decap, gratis con GitHub) |
| Base | satendragoswamii/portfolio-website-with-admin-panel (MIT) |

**Qué es:** Para fotógrafos, diseñadores, arquitectos o freelancers: cambias textos y fotos desde un panel, sin tocar código.

**Ejemplo:** Marta, fotógrafa: 8 reportajes, sobre mí, tarifas y contacto. Ella sube los nuevos trabajos desde el móvil.

## 1. Qué le pides al cliente

- Nombre y profesión
- Proyectos (título, fotos, descripción)
- Biografía
- Redes sociales

**Accesos:**
- Cuenta gratuita de GitHub del cliente si quiere editar él

Email listo para mandar:

```text
Asunto: Tu pedido «Portfolio con panel para editarlo tú»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre y profesión
- Proyectos (título, fotos, descripción)
- Biografía
- Redes sociales

Y además (te guiamos paso a paso si no sabes cómo):
- Cuenta gratuita de GitHub del cliente si quiere editar él

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs portfolio-editable` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto portfolio-editable («Portfolio con panel para editarlo tú») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: satendragoswamii/portfolio-website-with-admin-panel (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática + panel de edición (Pages CMS o Decap, gratis con GitHub).
Campos del cliente:
- Nombre y profesión: <...>
- Proyectos (título, fotos, descripción): <...>
- Biografía: <...>
- Redes sociales: <...>
Accesos que ya me ha dado el cliente:
- Cuenta gratuita de GitHub del cliente si quiere editar él: <sí/no>
Tiene que quedar: Portfolio con proyectos y galería; Panel de administración; Formulario de contacto; Alojamiento gratuito en Cloudflare.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs portfolio-editable tu`.

## 3. Qué entregas

- [ ] Portfolio con proyectos y galería
- [ ] Panel de administración
- [ ] Formulario de contacto
- [ ] Alojamiento gratuito en Cloudflare
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Portfolio con panel para editarlo tú

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Portfolio con proyectos y galería
- Panel de administración
- Formulario de contacto
- Alojamiento gratuito en Cloudflare

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Portfolio sencillo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/portfolio-template/)
- Demo: [Fotógrafo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/photographer-portfolio/)
- Demo: [Arquitecto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/architect-portfolio/)
- [satendragoswamii/portfolio-website-with-admin-panel](https://github.com/satendragoswamii/portfolio-website-with-admin-panel) · MIT
- [ShadmanArafin/open_portfolio](https://github.com/ShadmanArafin/open_portfolio) · MIT
