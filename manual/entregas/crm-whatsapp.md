# CRM de WhatsApp para tu equipo

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Bots e IA |
| Precio | Lo montas tú 299 € · Te lo montamos 699 € |
| Plazo publicado | 7 días |
| Nivel | **C · Proyecto por fases** (1–3 días de trabajo) |
| Dónde vive | Servidor del cliente o Worker + D1 |
| Base | thareekanvar/replyloom (MIT) |

**Qué es:** Bandeja compartida de WhatsApp: varios agentes, contactos, embudo de ventas y envíos masivos.

**Ejemplo:** Autoescuela: 3 personas atienden el mismo WhatsApp y nadie responde dos veces al mismo alumno.

## 1. Qué le pides al cliente

- Números de WhatsApp Business
- Agentes
- Etapas de venta

**Accesos:**
- WhatsApp Business API (Meta) del cliente

Email listo para mandar:

```text
Asunto: Tu pedido «CRM de WhatsApp para tu equipo»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Números de WhatsApp Business
- Agentes
- Etapas de venta

Y además (te guiamos paso a paso si no sabes cómo):
- WhatsApp Business API (Meta) del cliente

En cuanto lo tengamos, el plazo es de 7 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs crm-whatsapp` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto crm-whatsapp («CRM de WhatsApp para tu equipo») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel C.
Base: thareekanvar/replyloom (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Servidor del cliente o Worker + D1.
Campos del cliente:
- Números de WhatsApp Business: <...>
- Agentes: <...>
- Etapas de venta: <...>
Accesos que ya me ha dado el cliente:
- WhatsApp Business API (Meta) del cliente: <sí/no>
Tiene que quedar: Bandeja compartida; Contactos y etiquetas; Embudo de oportunidades; Difusiones.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Haz primero un plan de entrega por fases (máx. 3) y entrega la fase 1 funcionando.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs crm-whatsapp tu`.

## 3. Qué entregas

- [ ] Bandeja compartida
- [ ] Contactos y etiquetas
- [ ] Embudo de oportunidades
- [ ] Difusiones
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: CRM de WhatsApp para tu equipo

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Bandeja compartida
- Contactos y etiquetas
- Embudo de oportunidades
- Difusiones

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [thareekanvar/replyloom](https://github.com/thareekanvar/replyloom) · MIT
