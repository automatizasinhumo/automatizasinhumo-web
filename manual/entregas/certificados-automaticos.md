# Diplomas y certificados en PDF automáticos

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 99 € · Te lo montamos 229 € |
| Plazo publicado | 3 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker que genera PDF (pdfme) y los envía |
| Base | pdfme/pdfme (MIT) |

**Qué es:** Para academias, cursos y eventos: subes la lista de alumnos y cada uno recibe su certificado personalizado.

**Ejemplo:** Academia de inglés: 120 alumnos terminan el curso y en 5 minutos cada uno tiene su diploma con QR en el correo.

## 1. Qué le pides al cliente

- Logo y firma
- Texto del certificado
- Hoja con nombres, emails y horas
- Email remitente

**Accesos:**
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email)
- Email remitente (Brevo gratis)

Email listo para mandar:

```text
Asunto: Tu pedido «Diplomas y certificados en PDF automáticos»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Logo y firma
- Texto del certificado
- Hoja con nombres, emails y horas
- Email remitente

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email)
- Email remitente (Brevo gratis)

En cuanto lo tengamos, el plazo es de 3 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs certificados-automaticos` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto certificados-automaticos («Diplomas y certificados en PDF automáticos») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: pdfme/pdfme (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker que genera PDF (pdfme) y los envía.
Campos del cliente:
- Logo y firma: <...>
- Texto del certificado: <...>
- Hoja con nombres, emails y horas: <...>
- Email remitente: <...>
Accesos que ya me ha dado el cliente:
- Acceso de editor a su Hoja de Google o Drive (comparte con tu email): <sí/no>
- Email remitente (Brevo gratis): <sí/no>
Tiene que quedar: Plantilla de diploma con tu diseño; Generación masiva desde una hoja de cálculo; Envío automático por email; Código QR de verificación.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs certificados-automaticos tu`.

## 3. Qué entregas

- [ ] Plantilla de diploma con tu diseño
- [ ] Generación masiva desde una hoja de cálculo
- [ ] Envío automático por email
- [ ] Código QR de verificación
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Diplomas y certificados en PDF automáticos

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Plantilla de diploma con tu diseño
- Generación masiva desde una hoja de cálculo
- Envío automático por email
- Código QR de verificación

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [pdfme/pdfme](https://github.com/pdfme/pdfme) · MIT
