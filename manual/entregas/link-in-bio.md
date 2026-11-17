# Link-in-bio propio con estadísticas

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 39 € · Te lo montamos 99 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demo plantillas-negocio/landing-pages/link-in-bio |

**Qué es:** Tu alternativa a Linktree, en tu dominio y sin cuota mensual, con clics medidos.

**Ejemplo:** Creadora de recetas: enlace en Instagram con su libro, YouTube y newsletter, y sabe cuál funciona.

## 1. Qué le pides al cliente

- Nombre o marca
- Foto / logo
- Enlaces con su texto
- Colores

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Link-in-bio propio con estadísticas»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre o marca
- Foto / logo
- Enlaces con su texto
- Colores

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs link-in-bio` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto link-in-bio («Link-in-bio propio con estadísticas») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demo plantillas-negocio/landing-pages/link-in-bio. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Nombre o marca: <...>
- Foto / logo: <...>
- Enlaces con su texto: <...>
- Colores: <...>
Tiene que quedar: Página de enlaces con tu marca; Estadísticas de clics; Bloques de vídeo, formulario y productos; Panel para editar.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs link-in-bio tu`.

## 3. Qué entregas

- [ ] Página de enlaces con tu marca
- [ ] Estadísticas de clics
- [ ] Bloques de vídeo, formulario y productos
- [ ] Panel para editar
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Link-in-bio propio con estadísticas

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Página de enlaces con tu marca
- Estadísticas de clics
- Bloques de vídeo, formulario y productos
- Panel para editar

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Página de enlaces](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/link-in-bio/)
- [MrDemonWolf/linkden](https://github.com/MrDemonWolf/linkden) · MIT
- [Mrbarnx/Open-Link-Hub](https://github.com/Mrbarnx/Open-Link-Hub) · MIT
- [dimasmong/MoBio](https://github.com/dimasmong/MoBio) · MIT
