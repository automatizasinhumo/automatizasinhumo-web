# Analítica web sin cookies

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Enlaces, QR y analítica |
| Precio | Lo montas tú 49 € · Te lo montamos 99 € |
| Plazo publicado | 24 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Cloudflare Web Analytics (gratis, sin cookies) |
| Base | umami-software/umami (MIT) |

**Qué es:** Sabe cuántas visitas tienes y de dónde vienen, sin banner de cookies molesto.

**Ejemplo:** Tienda local: «este mes 2.300 visitas, 40 % desde Instagram, la página más vista es Ofertas».

## 1. Qué le pides al cliente

- Web(s) a medir
- Email para informes

**Accesos:**
- Acceso para pegar un script en su web

Email listo para mandar:

```text
Asunto: Tu pedido «Analítica web sin cookies»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Web(s) a medir
- Email para informes

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso para pegar un script en su web

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs analitica-sin-cookies` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto analitica-sin-cookies («Analítica web sin cookies») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: umami-software/umami (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Cloudflare Web Analytics (gratis, sin cookies).
Campos del cliente:
- Web(s) a medir: <...>
- Email para informes: <...>
Accesos que ya me ha dado el cliente:
- Acceso para pegar un script en su web: <sí/no>
Tiene que quedar: Panel de analítica privado; Instalación en tu web; Informe mensual por email (con plan).
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs analitica-sin-cookies tu`.

## 3. Qué entregas

- [ ] Panel de analítica privado
- [ ] Instalación en tu web
- [ ] Informe mensual por email (con plan)
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Analítica web sin cookies

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Panel de analítica privado
- Instalación en tu web
- Informe mensual por email (con plan)

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [umami-software/umami](https://github.com/umami-software/umami) · MIT
