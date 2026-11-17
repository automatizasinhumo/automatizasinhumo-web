# Currículum profesional ATS en PDF

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Tarjetas, link-in-bio y CV |
| Precio | Lo montas tú 29 € · Te lo montamos 79 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | demo plantillas-negocio/portfolio/resume-cv |

**Qué es:** CV preparado para pasar los filtros automáticos de selección, en PDF y Word.

**Ejemplo:** Elena, enfermera: CV de 1 página con las palabras clave de la oferta del hospital.

## 1. Qué le pides al cliente

- Experiencia
- Formación
- Habilidades
- Puesto al que aspiras

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Currículum profesional ATS en PDF»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Experiencia
- Formación
- Habilidades
- Puesto al que aspiras

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs cv-profesional` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto cv-profesional («Currículum profesional ATS en PDF») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: demo plantillas-negocio/portfolio/resume-cv. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Experiencia: <...>
- Formación: <...>
- Habilidades: <...>
- Puesto al que aspiras: <...>
Tiene que quedar: CV en PDF y Word; Plantilla a elegir; Revisión de palabras clave ATS; Versión web opcional.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs cv-profesional tu`.

## 3. Qué entregas

- [ ] CV en PDF y Word
- [ ] Plantilla a elegir
- [ ] Revisión de palabras clave ATS
- [ ] Versión web opcional
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Currículum profesional ATS en PDF

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- CV en PDF y Word
- Plantilla a elegir
- Revisión de palabras clave ATS
- Versión web opcional

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Currículum web](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/resume-cv/)
- [gianfrancodemarco/resume-builder](https://github.com/gianfrancodemarco/resume-builder) · MIT
- [samuelbelo/cvfree](https://github.com/samuelbelo/cvfree) · MIT
- [akhil-dara/CVAurum](https://github.com/akhil-dara/CVAurum) · AGPL-3.0
