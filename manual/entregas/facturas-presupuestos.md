# Generador de facturas y presupuestos con tu marca

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Documentos, PDF e IA |
| Precio | Lo montas tú 79 € · Te lo montamos 179 € |
| Plazo publicado | 48 h |
| Nivel | **A · Un prompt** (5–15 min de tu tiempo; se entrega el mismo día) |
| Dónde vive | Invoify estático en Workers |
| Base | al1abb/invoify |

**Qué es:** Rellenas cliente y conceptos, y sale una factura o presupuesto en PDF con tu logo, IVA calculado y numeración.

**Ejemplo:** Electricista autónomo: «Presupuesto P-2026-014 · cambio de cuadro · 380 € + IVA» enviado al cliente en 2 minutos desde el móvil.

## 1. Qué le pides al cliente

- Razón social y NIF
- Logo y colores
- Tipos de IVA / IRPF que usas
- Formato de numeración

No hace falta ninguna cuenta ni acceso del cliente.

Email listo para mandar:

```text
Asunto: Tu pedido «Generador de facturas y presupuestos con tu marca»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Razón social y NIF
- Logo y colores
- Tipos de IVA / IRPF que usas
- Formato de numeración

En cuanto lo tengamos, el plazo es de 48 h.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs facturas-presupuestos` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto facturas-presupuestos («Generador de facturas y presupuestos con tu marca») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel A.
Base: al1abb/invoify. Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Invoify estático en Workers.
Campos del cliente:
- Razón social y NIF: <...>
- Logo y colores: <...>
- Tipos de IVA / IRPF que usas: <...>
- Formato de numeración: <...>
Tiene que quedar: Generador web propio (tuyo, sin cuotas); Plantilla con tu logo y datos fiscales; Descarga en PDF y envío por email; Guía de uso de 1 página.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs facturas-presupuestos tu`.

## 3. Qué entregas

- [ ] Generador web propio (tuyo, sin cuotas)
- [ ] Plantilla con tu logo y datos fiscales
- [ ] Descarga en PDF y envío por email
- [ ] Guía de uso de 1 página
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Generador de facturas y presupuestos con tu marca

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- Generador web propio (tuyo, sin cuotas)
- Plantilla con tu logo y datos fiscales
- Descarga en PDF y envío por email
- Guía de uso de 1 página

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- [al1abb/invoify](https://github.com/al1abb/invoify) · MIT
