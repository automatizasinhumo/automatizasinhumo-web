# Invitación digital animada

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bodas y eventos |
| Precio | Lo montas tú 39 € · Te lo montamos 89 € |
| Plazo publicado | 24 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demo boda-sage (Poison675, MIT) |

**Qué es:** Invitación para enviar por WhatsApp: cuenta atrás, ubicación y botón para confirmar.

**Ejemplo:** Bautizo de Hugo: enlace por WhatsApp con foto, cuenta atrás y «Confirmo asistencia».

## 1. Qué le pides al cliente

- Tipo de evento
- Nombres
- Fecha, hora y lugar
- Foto o estilo

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Invitación digital animada»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Tipo de evento
- Nombres
- Fecha, hora y lugar
- Foto o estilo

En cuanto lo tengamos, el plazo es de 24 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs invitacion-digital` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto invitacion-digital («Invitación digital animada») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demo boda-sage (Poison675, MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Tipo de evento: <...>
- Nombres: <...>
- Fecha, hora y lugar: <...>
- Foto o estilo: <...>
Tiene que quedar: Invitación web animada; Cuenta atrás; Botón de mapa y confirmación; Enlace para compartir.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs invitacion-digital tu`.

## 3. Qué entregas

- [ ] Invitación web animada
- [ ] Cuenta atrás
- [ ] Botón de mapa y confirmación
- [ ] Enlace para compartir
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Invitación digital animada

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Invitación web animada
- Cuenta atrás
- Botón de mapa y confirmación
- Enlace para compartir

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Web de boda · estilo Sage Garden](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-sage/)
- Demo: [Itinerario de fin de semana](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/weekend-itinerary/)
- [Poison675/free-wedding-website-templates](https://github.com/Poison675/free-wedding-website-templates) · ¿?
- [clentebanks/wedding-invitation](https://github.com/clentebanks/wedding-invitation) · NOASSERTION
