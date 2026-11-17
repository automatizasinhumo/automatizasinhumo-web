# Auditoría web exprés

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Planes mensuales |
| Precio | 49 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Informe PDF con Lighthouse |
| Base | GoogleChrome/lighthouse (Apache-2.0) |

**Qué es:** Informe claro de velocidad, SEO, móvil y accesibilidad de tu web, con lo que hay que arreglar primero.

**Ejemplo:** «Tu web tarda 6 s en móvil por 3 imágenes de 4 MB: arreglarlo sube las llamadas».

## 1. Qué le pides al cliente

- URL de la web
- Objetivo (más ventas, más llamadas…)

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Auditoría web exprés»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- URL de la web
- Objetivo (más ventas, más llamadas…)

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs auditoria-web` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto auditoria-web («Auditoría web exprés») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: GoogleChrome/lighthouse (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Informe PDF con Lighthouse.
Campos del cliente:
- URL de la web: <...>
- Objetivo (más ventas, más llamadas…): <...>
Tiene que quedar: Informe PDF de 5–8 páginas; Lista priorizada de mejoras; Presupuesto cerrado para arreglarlo.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

## 3. Qué entregas

- [ ] Informe PDF de 5–8 páginas
- [ ] Lista priorizada de mejoras
- [ ] Presupuesto cerrado para arreglarlo
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Auditoría web exprés

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Informe PDF de 5–8 páginas
- Lista priorizada de mejoras
- Presupuesto cerrado para arreglarlo

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) · Apache-2.0
