# Pack de carruseles para Instagram y LinkedIn

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Contenido y redes |
| Precio | Lo montas tú 39 € · Te lo montamos 99 € |
| Plazo publicado | 3 días |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Archivo entregado por email o enlace de descarga (sin servidor) |
| Base | puppeteer/puppeteer (Apache-2.0) |

**Qué es:** Diez carruseles con tu marca generados desde tus textos, en PNG listos para subir y con la plantilla para repetir.

**Ejemplo:** Nutricionista: «5 desayunos en 5 minutos», un carrusel por semana durante dos meses y medio.

## 1. Qué le pides al cliente

- Temas o textos
- Tono
- Colores y logo
- Red principal

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Pack de carruseles para Instagram y LinkedIn»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Temas o textos
- Tono
- Colores y logo
- Red principal

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs carruseles-redes` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto carruseles-redes («Pack de carruseles para Instagram y LinkedIn») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: puppeteer/puppeteer (Apache-2.0). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Archivo entregado por email o enlace de descarga (sin servidor).
Campos del cliente:
- Temas o textos: <...>
- Tono: <...>
- Colores y logo: <...>
- Red principal: <...>
Tiene que quedar: 10 carruseles de 5–8 diapositivas; Plantilla con tus colores y tipografías; Textos de publicación sugeridos; Regeneración desde una hoja de cálculo.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs carruseles-redes tu`.

## 3. Qué entregas

- [ ] 10 carruseles de 5–8 diapositivas
- [ ] Plantilla con tus colores y tipografías
- [ ] Textos de publicación sugeridos
- [ ] Regeneración desde una hoja de cálculo
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Pack de carruseles para Instagram y LinkedIn

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- 10 carruseles de 5–8 diapositivas
- Plantilla con tus colores y tipografías
- Textos de publicación sugeridos
- Regeneración desde una hoja de cálculo

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) · Apache-2.0
