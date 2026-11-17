# Página de citas tipo Calendly

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Reservas y citas |
| Precio | Lo montas tú 79 € · Te lo montamos 179 € |
| Plazo publicado | 48 h |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB) |
| Base | CCCrafts/punctual |

**Qué es:** Comparte un enlace y tus clientes reservan hueco en tu agenda. Sin cuotas por usuario.

**Ejemplo:** Coach Ana: enlace «Reserva tu sesión de 30 min» en su Instagram; las citas caen solas en su agenda.

## 1. Qué le pides al cliente

- Tipos de cita y duración
- Horario disponible
- Email de avisos
- Preguntas previas al cliente

**Accesos:**
- Email de avisos
- Opcional: Google Calendar para sincronizar

Email listo para mandar:

```text
Asunto: Tu pedido «Página de citas tipo Calendly»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Tipos de cita y duración
- Horario disponible
- Email de avisos
- Preguntas previas al cliente

Y además (te guiamos paso a paso si no sabes cómo):
- Email de avisos
- Opcional: Google Calendar para sincronizar

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs pagina-citas` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto pagina-citas («Página de citas tipo Calendly») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: CCCrafts/punctual. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB).
Campos del cliente:
- Tipos de cita y duración: <...>
- Horario disponible: <...>
- Email de avisos: <...>
- Preguntas previas al cliente: <...>
Accesos que ya me ha dado el cliente:
- Email de avisos: <sí/no>
- Opcional: Google Calendar para sincronizar: <sí/no>
Tiene que quedar: Página de reserva con tus huecos; Tipos de cita (15, 30, 60 min…); Confirmación y recordatorio por email; Enlace para tu web, Instagram o firma.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs pagina-citas tu`.

## 3. Qué entregas

- [ ] Página de reserva con tus huecos
- [ ] Tipos de cita (15, 30, 60 min…)
- [ ] Confirmación y recordatorio por email
- [ ] Enlace para tu web, Instagram o firma
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Página de citas tipo Calendly

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Página de reserva con tus huecos
- Tipos de cita (15, 30, 60 min…)
- Confirmación y recordatorio por email
- Enlace para tu web, Instagram o firma

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [Fisioterapia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/physiotherapy/)
- Demo: [Clínica dental](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/dental-clinic/)
- Demo: [Nutricionista](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/nutritionist/)
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) · MIT
