# Lista de espera con referidos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Formularios y captación |
| Precio | Lo montas tú 79 € · Te lo montamos 179 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | Metareignity/waitlist-cloudflare |

**Qué es:** Para lanzamientos: la gente se apunta, comparte su enlace y sube puestos en la lista.

**Ejemplo:** Nueva app de recetas: 1.200 apuntados antes de abrir, 40 % llegados por referidos.

## 1. Qué le pides al cliente

- Nombre del producto
- Fecha de lanzamiento
- Premio por referidos

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

Email listo para mandar:

```text
Asunto: Tu pedido «Lista de espera con referidos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre del producto
- Fecha de lanzamiento
- Premio por referidos

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs lista-espera` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto lista-espera («Lista de espera con referidos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: Metareignity/waitlist-cloudflare. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Nombre del producto: <...>
- Fecha de lanzamiento: <...>
- Premio por referidos: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
Tiene que quedar: Página de lista de espera; Enlace de referido por persona; Ranking y exportación; Email de bienvenida.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs lista-espera tu`.

## 3. Qué entregas

- [ ] Página de lista de espera
- [ ] Enlace de referido por persona
- [ ] Ranking y exportación
- [ ] Email de bienvenida
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Lista de espera con referidos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Página de lista de espera
- Enlace de referido por persona
- Ranking y exportación
- Email de bienvenida

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Próximamente](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/coming-soon/)
- Demo: [Inscripción a webinar](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/webinar-signup/)
- [d4mr/0list](https://github.com/d4mr/0list) · MIT
- [Metareignity/waitlist-cloudflare](https://github.com/Metareignity/waitlist-cloudflare) · MIT
