# Web con blog rápida (SEO)

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 249 € · Te lo montamos 499 € |
| Plazo publicado | 4 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | lonestone/astro-template (MIT) |

**Qué es:** Web ultrarrápida con blog para posicionar en Google y publicar artículos fácilmente.

**Ejemplo:** Clínica de fisioterapia con blog «Ejercicios para la espalda» que atrae visitas desde Google.

## 1. Qué le pides al cliente

- Temática
- Palabras clave
- Logo y colores
- Primeros temas del blog

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Cuenta gratuita de GitHub para publicar artículos

Email listo para mandar:

```text
Asunto: Tu pedido «Web con blog rápida (SEO)»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Temática
- Palabras clave
- Logo y colores
- Primeros temas del blog

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Cuenta gratuita de GitHub para publicar artículos

En cuanto lo tengamos, el plazo es de 4 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-blog-astro` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-blog-astro («Web con blog rápida (SEO)») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: lonestone/astro-template (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Temática: <...>
- Palabras clave: <...>
- Logo y colores: <...>
- Primeros temas del blog: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
- Cuenta gratuita de GitHub para publicar artículos: <sí/no>
Tiene que quedar: Web + blog con categorías; Carga en menos de 1 segundo; Sitemap y RSS; 3 artículos iniciales (modalidad «Te lo montamos»).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-blog-astro tu`.

## 3. Qué entregas

- [ ] Web + blog con categorías
- [ ] Carga en menos de 1 segundo
- [ ] Sitemap y RSS
- [ ] 3 artículos iniciales (modalidad «Te lo montamos»)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web con blog rápida (SEO)

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Web + blog con categorías
- Carga en menos de 1 segundo
- Sitemap y RSS
- 3 artículos iniciales (modalidad «Te lo montamos»)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Blog personal](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/writer-blogger/)
- [lonestone/astro-template](https://github.com/lonestone/astro-template) · MIT
