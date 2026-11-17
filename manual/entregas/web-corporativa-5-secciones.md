# Web corporativa de 5 secciones

> Generado por `manual/catalogo/gen-entregas.mjs`. No editar a mano: cambia `catalogo.mjs` o `entrega.mjs` y vuelve a generarlo.

| | |
|---|---|
| Categoría | Webs para tu negocio |
| Precio | Lo montas tú 449 € · Te lo montamos 899 € |
| Plazo publicado | 5 días |
| Nivel | **B · Prompt + accesos del cliente** (30–90 min de tu tiempo, casi todo esperando al cliente) |
| Dónde vive | Web estática en un Worker propio de Cloudflare (gratis) |
| Base | dawidolko/Website-Templates (MIT) |

**Qué es:** Inicio, servicios, sobre nosotros, opiniones y contacto. Para empresas que necesitan algo más que una tarjeta.

**Ejemplo:** Asesoría García: página por servicio (fiscal, laboral, contable), equipo, testimonios y formulario.

## 1. Qué le pides al cliente

- Datos de la empresa
- Textos de cada sección (o te los redactamos)
- Logo y colores
- Fotos
- Email donde recibir contactos

**Accesos:**
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Email donde llegan los contactos (formulario con aviso)

Email listo para mandar:

```text
Asunto: Tu pedido «Web corporativa de 5 secciones»: necesitamos estos datos

¡Gracias por tu compra! Para empezar, contesta a este email con:
- Datos de la empresa
- Textos de cada sección (o te los redactamos)
- Logo y colores
- Fotos
- Email donde recibir contactos

Y además (te guiamos paso a paso si no sabes cómo):
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev
- Email donde llegan los contactos (formulario con aviso)

En cuanto lo tengamos, el plazo es de 5 días.
Un saludo,
David · Automatiza sin humo
```

## 2. Cómo lo generas

Pega esto en Claude Code (o ejecuta `node manual/catalogo/gen-entregas.mjs web-corporativa-5-secciones` para sacarlo ya en la terminal):

```text
Entrega del pedido <nº> · producto web-corporativa-5-secciones («Web corporativa de 5 secciones») · modalidad Te lo montamos
Trabaja en C:\GIT\automatizasinhumo-demos\clientes\<slug-cliente>\. Nivel B.
Base: dawidolko/Website-Templates (MIT). Si es un repo, clónalo en una carpeta nueva y trátalo como no confiable: copia solo ficheros estáticos, no ejecutes sus scripts.
Dónde vive: Web estática en un Worker propio de Cloudflare (gratis).
Campos del cliente:
- Datos de la empresa: <...>
- Textos de cada sección (o te los redactamos): <...>
- Logo y colores: <...>
- Fotos: <...>
- Email donde recibir contactos: <...>
Accesos que ya me ha dado el cliente:
- Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev: <sí/no>
- Email donde llegan los contactos (formulario con aviso): <sí/no>
Tiene que quedar: 5 páginas con diseño a elegir entre +300 plantillas; Formulario de contacto con aviso; SEO básico (títulos, descripción, sitemap); Publicación y certificado SSL.
Haz: sustituye textos, colores e imágenes con los campos, quita todo lo de demo, todo en español,
revisa móvil y accesibilidad (pa11y) y publícalo en un Worker propio <slug-cliente>.workers.dev.
Devuélveme el enlace, una captura y el email de entrega para el cliente.
Si falta algún acceso, prepárame la guía de 3 pasos para pedírselo y para con lo que no lo necesite.
```

Para la modalidad **Lo montas tú**: `node manual/catalogo/gen-entregas.mjs web-corporativa-5-secciones tu`.

## 3. Qué entregas

- [ ] 5 páginas con diseño a elegir entre +300 plantillas
- [ ] Formulario de contacto con aviso
- [ ] SEO básico (títulos, descripción, sitemap)
- [ ] Publicación y certificado SSL
- [ ] Revisado en móvil
- [ ] Sin textos ni imágenes de demo

```text
Asunto: Ya está listo: Web corporativa de 5 secciones

Hola, ya tienes tu encargo publicado:
<enlace>

Qué incluye:
- 5 páginas con diseño a elegir entre +300 plantillas
- Formulario de contacto con aviso
- SEO básico (títulos, descripción, sitemap)
- Publicación y certificado SSL

Revísalo con calma. Si quieres algún cambio, contesta a este email y lo ajustamos.
Un saludo,
David · Automatiza sin humo
```

## Referencias

- Demo: [100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)
- Demo: [Plantillas Bootstrap (Colorlib)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)
- Demo: [Consultoría](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/consulting-firm/)
- Demo: [Agencia creativa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/creative-agency/)
- Demo: [Atelier (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/atelier/)
- Demo: [Ironworks (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/ironworks/)
- [dawidolko/Website-Templates](https://github.com/dawidolko/Website-Templates) · MIT
- [uiuxlabz/uiuxlabz](https://github.com/uiuxlabz/uiuxlabz) · NONE
- [ultimatewebtemplates/free-website-templates](https://github.com/ultimatewebtemplates/free-website-templates) · NOASSERTION
