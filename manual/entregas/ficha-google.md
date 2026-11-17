# Ficha de Google de tu negocio optimizada

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Formularios y captación |
| Precio | Lo montas tú 49 € · Te lo montamos 129 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Google Business Profile |
| Base | plantilla propia (ningún repo base tiene licencia libre) |

**Qué es:** Que te encuentren en Google Maps: ficha completa, categorías correctas, fotos, horarios y enlace de reseñas.

**Ejemplo:** Fisioterapeuta en Valencia: aparece en «fisio cerca de mí» con 40 fotos, horario y botón de cita.

## 1. Qué le pides al cliente

- Nombre y dirección del negocio
- Servicios principales
- 5–10 fotos
- Acceso a la ficha (te guiamos)

**Accesos:**
- Acceso de gestor a su ficha de Google

Email listo para mandar:

```text
Asunto: Tu pedido «Ficha de Google de tu negocio optimizada»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Nombre y dirección del negocio
- Servicios principales
- 5–10 fotos
- Acceso a la ficha (te guiamos)

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso de gestor a su ficha de Google

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs ficha-google` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto ficha-google («Ficha de Google de tu negocio optimizada») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: plantilla propia (ningún repo base tiene licencia libre). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Google Business Profile.
Campos del cliente:
- Nombre y dirección del negocio: <...>
- Servicios principales: <...>
- 5–10 fotos: <...>
- Acceso a la ficha (te guiamos): <...>
Accesos que ya me ha dado el cliente:
- Acceso de gestor a su ficha de Google: <sí/no>
Tiene que quedar: Ficha revisada y completada; Categorías y servicios optimizados; Enlace y QR para pedir reseñas; Checklist mensual de publicaciones.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs ficha-google tu`.

## 3. Qué entregas

- [ ] Ficha revisada y completada
- [ ] Categorías y servicios optimizados
- [ ] Enlace y QR para pedir reseñas
- [ ] Checklist mensual de publicaciones
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Ficha de Google de tu negocio optimizada

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Ficha revisada y completada
- Categorías y servicios optimizados
- Enlace y QR para pedir reseñas
- Checklist mensual de publicaciones

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

