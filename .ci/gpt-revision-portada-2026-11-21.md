#### ChatGPT dijo:ChatGPT

# **Auditoría UX y sistema de diseño — Automatiza Sin Humo**

Investigación: 21 de noviembre de 2026 · Astro 7 + Tailwind v4 + Cloudflare Workers

**Conclusión:** conservaría la identidad visual, los componentes y las animaciones actuales. El problema principal no parece ser estético, sino comercial: la portada comunica que el servicio es moderno, pero todavía no demuestra suficientemente qué se compra, cuánto cuesta y qué recibe el cliente.

La mejora consiste en convertir una portada atractiva en una **portada que enseña, explica y conduce a una compra**, sin transformarla en una landing interminable.

He contrastado las propuestas con la investigación de Baymard actualizada el 13 de octubre de 2026, documentación técnica vigente y webs comerciales consultadas hoy. Baymard destaca especialmente la importancia de facilitar las rutas de descubrimiento por categorías, búsqueda y recomendaciones guiadas. 

![](https://www.google.com/s2/favicons?domain=https://baymard.com&sz=32)

Baymard

**Alcance de la verificación:** no he podido acceder directamente a la portada de automatizasinhumo.es ni al staging desde el navegador de consulta. Por tanto, las observaciones específicas de tu diseño parten de tu descripción; no son mediciones visuales realizadas hoy. Los beneficios de conversión propuestos son hipótesis para validar, no incrementos garantizados.

## **A. Las 10 mejoras con más impacto**

Ordenadas por combinación de impacto esperado, claridad y facilidad de implantación.

| Orden | Mejora | Impacto | Esfuerzo |
| --- | --- | --- | --- |
| 1 | CTA visible en la primera pantalla móvil | Muy alto | Muy bajo |
| 2 | Hero que diga exactamente qué vendéis | Muy alto | Bajo |
| 3 | Mostrar servicios con precios reales | Muy alto | Bajo |
| 4 | Galería de demos que se puedan abrir | Muy alto | Medio |
| 5 | Corregir el botón flotante Contacto | Alto | Muy bajo |
| 6 | Dar jerarquía a «Así funciona» | Alto | Bajo |
| 7 | Mostrar garantías operativas y pruebas verificables | Alto | Bajo |
| 8 | Añadir FAQ breve antes del CTA final | Medio-alto | Bajo |
| 9 | Unificar ritmo vertical, textos y botones | Alto | Bajo |
| 10 | Simplificar animaciones y reagrupar el pie | Medio | Bajo |

### **1. CTA móvil: que se pueda empezar sin desplazar**

Con 390 px de anchura, el orden de lectura debería ser:

1. Promesa principal.
2. Explicación de una o dos líneas.
3. Botón principal.
4. Enlace secundario.
5. Una vista parcial de la demo.

La maqueta completa de cafetería no debe aparecer antes del CTA.

**Cómo:** en móvil, reduce el espacio superior del hero a `2rem`, coloca las acciones inmediatamente después del subtítulo y deja la maqueta debajo. Las seis píldoras pueden pasar a una cuadrícula compacta o mostrarse bajo las acciones.

Objetivo de diseño: CTA principal visible en una pantalla de referencia de 390 × 844 px, y comprobación adicional a 390 × 667 px.

Referencia: [Tally](https://tally.so?utm_source=chatgpt.com) muestra su acción principal inmediatamente después de la promesa, con una explicación de fricción mínima. Consultado el 21/11/2026. 

![](https://www.google.com/s2/favicons?domain=https://tally.so&sz=32)

Unlimited Forms & Submissions

### **2. Explicar qué vendéis en cinco segundos**

El lema «Tu negocio, tu evento, tu idea, en marcha sin complicaciones» tiene personalidad, pero no identifica claramente el producto.

Mantendría el lema si os gusta y convertiría el subtítulo en una explicación comercial inequívoca.

**Versión A — más explícita, mi preferida**

> Creamos webs, tiendas, invitaciones, CV y automatizaciones para ti. Elige lo que necesitas, personalízalo y recibe tu resultado sin complicaciones.

**Versión B — más breve**

> Tu web, tienda, invitación o automatización, lista para ponerla en marcha. Precio cerrado y proceso automático.

La A explica mejor la amplitud del catálogo. La B es más contundente, pero deja menos claro cómo funciona el servicio.

Cambiaría también las acciones:

- Principal: **«Dime qué necesitas»**, hacia `/elige`.
- Secundaria: «Ver servicios y precios», hacia `/products`.

La navegación superior puede conservar «Haz el test», pero la acción dentro del hero debe expresar el beneficio.

Referencia: [Carrd](https://carrd.com/?utm_source=chatgpt.com) combina una promesa muy concreta con una vía inmediata para empezar. 

![](https://www.google.com/s2/favicons?domain=https://carrd.com&sz=32)

carrd.com

### **3. Mostrar precios desde la portada**

La ausencia de precios es especialmente llamativa porque «precio cerrado» es uno de vuestros principales argumentos.

Añadiría una sección de 3 servicios destacados, con datos procedentes del catálogo existente:

SERVICIOS DESTACADOS

## **Elige qué quieres poner en marcha**

Web de una página

Presencia online para tu negocio

Desde {precio real}

Ver detalles

Invitación digital

Comparte tu evento

Desde {precio real}

Ver detalles

Reservas online

Recibe reservas de clientes

Desde {precio real}

Ver detalles

Esquema de contenido, no propuesta de nuevos estilos. Los importes deben obtenerse del precio vigente de cada servicio.

Cada tarjeta debería incluir el precio mínimo real, la modalidad incluida en él, un beneficio específico y una acción hacia su ficha.

Si el precio mínimo corresponde solo a «Plantilla + guía», debe indicarse; no debe confundirse con «Te lo montamos».

**Referencia:** [Framer Pricing](https://www.framer.com/pricing?utm_source=chatgpt.com), consultada el 21/11/2026: precios visibles, distinción entre modalidades y prestaciones desglosadas. 

![](https://www.google.com/s2/favicons?domain=https://www.framer.com&sz=32)

framer.com

### **4. Añadir una galería de resultados**

La maqueta animada de cafetería sirve para captar atención. Una galería navegable sirve para evaluar la compra.

Crearía una sección titulada «Así puede quedar lo tuyo», con tres ejemplos iniciales:

![Kofi · Cafetería en Durango](https://images.openai.com/static-rsc-4/X7KovoPd8nOinemcyqmq4gGEU2aPNBKyRI_mEIxTxG7IOSDCas49tP-UmH_pPce_SvfaA1Lp4YRMDBmTmsj4RY0BLzDCBCWnJzStktydbJazOAd1dnqurUUD34sbTqfX77JlqIZkmV2SbV_P55lFQJLCBmluhGjfI-ApQEkN0sY?purpose=inline)

**Web para cafetería**

Vista previa de una web de negocio

![Terracotta Wedding Website Template: Boho Canva Invitation (digital) - Etsy Australia](https://images.openai.com/static-rsc-4/HPprXgODQI45-9qL4GQs0OftgeUnsZy9XRlRC10D2NQOqRMogqOAJSJdbbfxGJk4USI1_CoS58Vc7hv03MPw4St8XNqzp7OXBfkduw0OItWfy_5ArxBQXJRteV0-047_bK0q0iK0-4m-RmKPaZbAdOu1eQzOT099MBOex8VV2m0?purpose=inline)

**Invitación de boda**

Invitación digital de ejemplo

![Scheduling for Professional Services | Cal.com](https://images.openai.com/static-rsc-4/RZJEF_p9_QZG2uNwA8_4H2y95qfe0mLrMi6h4GXEu-OdwPwzd1sYmON9f6m-2bpxFKi4CBzLVPTx3fpP94F6OS0QBhZ7wWlouwCITZ8YnRhR9PAXwpXp2Cc-9bdrMgmme78K3CeA1Iodm8pf8sHx6iQLxJEaK5oBzZ0-yZNM9Bg?purpose=inline)

**Sistema de reservas**

Ejemplo de reserva online

Referencias visuales ilustrativas. Para la web definitiva usar capturas de vuestras propias demos, no estas imágenes externas.

Cada ejemplo tendrá una captura WebP, nombre del servicio, botón «Ver demo» y, opcionalmente, precio real.

Es mejor mostrar tres resultados distintos y utilizables que diez miniaturas decorativas.

**Cómo hacerlo sin mantenimiento:** generar las capturas desde Playwright durante el despliegue, guardarlas en assets estáticos y enlazar a las demos ya publicadas. Una propiedad `demoUrl` en cada producto basta para alimentarlo.

Referencias: [Durable](https://durable.com/?utm_source=chatgpt.com) utiliza ejemplos visuales por tipo de negocio; [Framer Marketplace](https://www.framer.com/marketplace/templates/?utm_source=chatgpt.com) organiza previews por categorías. Ambas revisadas el 21/11/2026. 

![](https://www.google.com/s2/favicons?domain=https://durable.com&sz=32)

Launch in minutes+1

### **5. Resolver el botón Contacto sin perder la funcionalidad**

El botón fijo que tapa el párrafo debe corregirse.

En móvil, priorizaría un icono flotante de 44–48 px que aparezca cuando el usuario haya superado el hero. En escritorio mantendría la píldora actual.

Usaría `IntersectionObserver` sobre un centinela colocado al final del hero, en vez de un evento `scroll` continuo.

El botón debe tener `aria-label="Contacto"` y quedar por encima del borde inferior seguro del móvil mediante `env(safe-area-inset-bottom)`.

### **6. Convertir «Así funciona» en una sección de verdad**

Una etiqueta de 12 px no comunica suficiente jerarquía para un bloque que explica la compra.

Cambiaría el encabezado por:

**Eyebrow:** ASÍ DE FÁCIL

**H2:** De tu idea al resultado, en tres pasos.

**Lead:** Sin llamadas ni presupuestos interminables.

Mantendría vuestros tres pasos actuales, pero verificaría que expliquen claramente la elección, la personalización y la entrega. Debajo añadiría un CTA discreto: «Empezar ahora».

Referencia: [Stripe Payment Links](https://stripe.com/payments/payment-links?utm_source=chatgpt.com) organiza un proceso en tres pasos sencillos antes de presentar información adicional. 

![](https://www.google.com/s2/favicons?domain=https://stripe.com&sz=32)

Simple Links to Accept Payments

### **7. Incorporar confianza sin inventar prueba social**

No añadiría testimonios ficticios, contadores de clientes ni logotipos ajenos.

En su lugar, mostraría tres garantías operativas comprobables:

- **Precio conocido antes de empezar.**
- **Vista previa para revisar el resultado**, donde el producto la ofrezca.
- **Proceso y estado del pedido consultables.**

Cuando existan valoraciones reales, se puede incorporar un bloque de testimonios. Hasta entonces, las demos reales son una prueba más útil que una valoración inventada.

### **8. FAQ compacta antes del cierre**

Añadiría cuatro preguntas:

- ¿Qué recibo exactamente?
- ¿Puedo ver el resultado antes de contratar?
- ¿Qué pasa si quiero cambiar algo?
- ¿Qué incluye el precio?

Usaría `<details>` y `<summary>` nativos, con borde discreto y un pequeño cambio de icono al abrir. Las respuestas deben proceder de las condiciones reales de cada modalidad.

Es un módulo pequeño, barato y reutilizable en fichas.

### **9. Corregir ritmo vertical y exceso decorativo**

No cambiaría las fuentes, la cuadrícula, el verde bosque ni la terracota.

Sí fijaría estas reglas:

- Una única línea destacada o gradiente dominante en el H1, evitando que todas compitan.
- Un espacio de sección consistente, sin huecos adicionales al encadenar componentes.
- Titulares H2 visibles, siempre por encima de los textos explicativos.
- Cards con la misma separación entre título, descripción y acción.
- Animaciones de entrada de 250–400 ms y un solo movimiento protagonista por zona.
- Una imagen estática inicial en la demo, para que la primera impresión no dependa de una animación.

La banda oscura debe seguir siendo un contraste visual importante, no competir con varias bandas de igual intensidad.

### **10. Un pie más fácil de explorar**

Agruparía los 20 enlaces existentes en cuatro columnas: Servicios, Cómo trabajamos, Recursos y Empresa/Contacto. En móvil, dos columnas o grupos verticales claros.

No hace falta eliminar enlaces. Basta con reducir el esfuerzo de búsqueda y normalizar el espaciado.

## **Orden recomendado de la nueva portada**

01

Hero compacto

Promesa + CTA + demo

02

Servicios destacados

3 opciones con precio

03

Demos reales

3 resultados navegables

04

Así funciona

3 pasos con titular

05

Garantías operativas

Qué puedes esperar

06

Preguntas frecuentes

4 respuestas breves

07

Banda oscura

CTA final

08

Pie agrupado

Navegación secundaria

Objetivo orientativo: pasar de una portada de unos 2.000 px a una de aproximadamente 3.000–3.600 px en escritorio, pero con mucha mayor densidad de información útil. Esa altura es una estimación de maquetación, no un requisito.

La altura total importa menos que el orden en que aparecen el CTA, el precio y las demostraciones.

## **B. Sistema de diseño: una única escala para todas las páginas**

El objetivo es dejar de decidir tamaños y separaciones cada vez que se crea una sección.

No sustituiría los tokens `--ds-*` existentes. Los ampliaría con **tokens semánticos** y expondría sus equivalentes en Tailwind v4 mediante `@theme inline`, que es el mecanismo oficial para conectar variables CSS y utilidades. 

![](https://www.google.com/s2/favicons?domain=https://tailwindcss.com&sz=32)

Tailwind CSS

### **B1. Escala tipográfica propuesta**

| Uso | Tamaño CSS | Interlineado |
| --- | --- | --- |
| Hero H1 | `clamp(2.45rem, 1.8rem + 3.3vw, 4.75rem)` | 1.06 |
| H2 de sección | `clamp(1.875rem, 1.3rem + 1.8vw, 3.25rem)` | 1.12 |
| H3 / tarjeta | `clamp(1.25rem, 1.05rem + .65vw, 1.625rem)` | 1.22 |
| Lead de sección | `clamp(1.0625rem, .99rem + .3vw, 1.25rem)` | 1.5 |
| Cuerpo | `1rem` | 1.6 |
| Texto secundario | `.875rem` | 1.5 |
| Eyebrow | `.75rem` | 1.4 |
| Botón | `1rem` | 1.25 |

Mantendría Space Grotesk en titulares y IBM Plex Sans en párrafos, botones y etiquetas.

Restricciones editoriales: H1 de 8–14 palabras cuando sea posible, H2 de una o dos líneas, leads de hasta 20–30 palabras y párrafos preferentemente de 55–75 caracteres de ancho máximo. Son objetivos de composición, no reglas rígidas.

### **B2. Espaciado, radios, sombras y contenedores**

| Token | Valor | Uso |
| --- | --- | --- |
| `--ds-section-y` | `clamp(3.5rem, 2.5rem + 3vw, 6.5rem)` | Separación vertical de secciones |
| `--ds-container-gutter` | `clamp(1rem, 2.5vw, 2rem)` | Margen lateral |
| `--ds-card-padding` | `clamp(1.25rem, 1rem + .8vw, 2rem)` | Interior de tarjetas |
| `--ds-grid-gap` | `clamp(1rem, .75rem + 1vw, 1.75rem)` | Hueco entre tarjetas |
| `--ds-content-gap` | `1rem` | Separación entre elementos |
| `--ds-heading-gap` | `2rem` | Entre cabecera y contenido |
| `--ds-container-page` | `76rem` | Anchura de página |
| `--ds-container-copy` | `42rem` | Texto largo |
| `--ds-container-lead` | `48rem` | Cabeceras centradas |
| `--ds-radius-button` | `.875rem` | Botones |
| `--ds-radius-card` | `1.25rem` | Tarjetas |
| `--ds-radius-modal` | `1.5rem` | Modales |
| `--ds-radius-pill` | `999px` | Píldoras |

Usaría solo dos niveles de sombra habituales: una sombra tenue para superficies y otra algo mayor para la maqueta protagonista. El borde luminoso actual se conserva para tarjetas destacadas, no para todas.

### **B3. CSS listo para incorporar**

Añadir estas definiciones al archivo de tokens, conservando vuestros colores y variables actuales.

CSS

```
:root {
  --ds-type-hero: clamp(2.45rem, 1.8rem + 3.3vw, 4.75rem);
  --ds-type-section: clamp(1.875rem, 1.3rem + 1.8vw, 3.25rem);
  --ds-type-card: clamp(1.25rem, 1.05rem + .65vw, 1.625rem);
  --ds-type-lead: clamp(1.0625rem, .99rem + .3vw, 1.25rem);
  --ds-type-body: 1rem;
  --ds-type-eyebrow: .75rem;

  --ds-section-y: clamp(3.5rem, 2.5rem + 3vw, 6.5rem);
  --ds-container-gutter: clamp(1rem, 2.5vw, 2rem);
  --ds-card-padding: clamp(1.25rem, 1rem + .8vw, 2rem);
  --ds-grid-gap: clamp(1rem, .75rem + 1vw, 1.75rem);
  --ds-content-gap: 1rem;
  --ds-heading-gap: 2rem;

  --ds-container-page: 76rem;
  --ds-container-copy: 42rem;
  --ds-container-lead: 48rem;

  --ds-radius-button: .875rem;
  --ds-radius-card: 1.25rem;
  --ds-radius-modal: 1.5rem;
  --ds-radius-pill: 999px;

  --ds-shadow-card:
    0 .5rem 1.625rem rgb(24 38 32 / .07);
  --ds-shadow-hero:
    0 1rem 3rem rgb(24 38 32 / .13);
}

@theme inline {
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "IBM Plex Sans", sans-serif;

  --text-hero: var(--ds-type-hero);
  --text-hero--line-height: 1.06;
  --text-section: var(--ds-type-section);
  --text-section--line-height: 1.12;
  --text-card-title: var(--ds-type-card);
  --text-card-title--line-height: 1.22;
  --text-lead: var(--ds-type-lead);
  --text-lead--line-height: 1.5;
  --text-body: var(--ds-type-body);
  --text-body--line-height: 1.6;
  --text-eyebrow: var(--ds-type-eyebrow);

  --spacing-section: var(--ds-section-y);
  --spacing-gutter: var(--ds-container-gutter);
  --spacing-card: var(--ds-card-padding);
  --spacing-cards: var(--ds-grid-gap);
  --spacing-content: var(--ds-content-gap);
  --spacing-section-head: var(--ds-heading-gap);

  --container-page: var(--ds-container-page);
  --container-copy: var(--ds-container-copy);
  --container-lead: var(--ds-container-lead);

  --radius-button: var(--ds-radius-button);
  --radius-card: var(--ds-radius-card);
  --radius-modal: var(--ds-radius-modal);
  --radius-pill: var(--ds-radius-pill);

  --shadow-card: var(--ds-shadow-card);
  --shadow-hero: var(--ds-shadow-hero);
}
```

Esto permite utilizar directamente `py-section`, `px-gutter`, `p-card`, `gap-cards`, `text-section`, `rounded-card` y `max-w-page`.

La correspondencia entre namespaces de variables y clases está documentada en Tailwind v4. 

![](https://www.google.com/s2/favicons?domain=https://tailwindcss.com&sz=32)

Tailwind CSS+2

### **B4. Una única plantilla** `Seccion.astro`

Todos los módulos nuevos —precios, demos, FAQ, testimonios— deberían reutilizar la misma estructura.

astro

`---
interface Props {
 id?: string;
 eyebrow: string;
 titulo: string;
 lead?: string;
 centrada?: boolean;
}

const {
 id, eyebrow, titulo, lead, centrada = false
} = Astro.props;

const tieneCTA = Astro.slots.has("cta");
---

<section id={id} class="py-section">
 <div class="mx-auto w-full max-w-page px-gutter">
 <header
 class:list={[
 "max-w-lead",
 centrada && "mx-auto text-center"
 ]}
 >
 <p class="text-eyebrow font-bold uppercase tracking-widest">
 {eyebrow}
 </p>

 <h2 class="mt-content font-display text-section">
 {titulo}
 </h2>

 {lead && (
 <p class="mt-content text-lead">
 {lead}
 </p>
 )}
 </header>

 <div class="mt-section-head">
 <slot />
 </div>

 {tieneCTA && (
 <div class="mt-section-head">
 <slot name="cta" />
 </div>
 )}
 </div>
</section>`

Por ejemplo, una sección de precios ya no decide individualmente anchura, padding, tipografía ni márgenes. Solo declara su contenido y reutiliza los componentes `Tarjeta` y `Boton` que ya tenéis.

**Regla de arquitectura:** `Seccion` controla la composición; `Tarjeta`, la superficie; `Boton`, la interacción. Ninguna ficha individual debería volver a establecer tamaños de referencia mediante valores arbitrarios.

### **B5. Hacer que CI imponga el sistema**

Usaría dos barreras complementarias.

**Primera: Stylelint para CSS de secciones nuevas.**

La regla oficial `declaration-property-value-allowed-list` permite restringir valores por propiedad. 

![](https://www.google.com/s2/favicons?domain=https://stylelint.io&sz=32)

Stylelint

Ejemplo de `stylelint.config.mjs`:

JavaScript

```
export default {
  rules: {
    "declaration-property-value-allowed-list": {
      "/^(font-size|border-radius|box-shadow|max-width|gap|padding|margin)(-.*)?$/": [
        "/^var\\(--ds-[\\w-]+\\)$/",
        "0",
        "auto",
        "none",
        "inherit"
      ]
    }
  }
};
```

Ejecutarlo únicamente contra el CSS de los componentes nuevos:

Bash

```
npx stylelint "src/components/sections/**/*.css"
```

Con esta política:

CSS

```
/* Correcto */
.tarjeta {
  padding: var(--ds-card-padding);
}

/* Falla el lint */
.tarjeta {
  padding: 27px;
}
```

Es una política deliberadamente estricta para propiedades de diseño. Los valores especiales necesarios se añaden expresamente a la lista permitida.

**Segunda: impedir utilidades Tailwind arbitrarias.**

Stylelint no analiza las clases utilizadas en el HTML de un `.astro`. Añadiría un control sobre los archivos de componentes nuevos que rechace clases como:

Texto sin formato

`py-[73px]
gap-[19px]
text-[37px]
rounded-[21px]
max-w-[1170px]`

Y que obligue a utilizar:

Texto sin formato

`py-section
gap-cards
text-section
rounded-card
max-w-page`

Para una aplicación estricta, el detector debe analizar los atributos `class` y `class:list` mediante el parser de Astro, no únicamente con `grep`. **No verificado:** la integración exacta de una regla personalizada con vuestro ESLint actual, porque no dispongo de su configuración.

El criterio de aceptación es sencillo: introducir `padding:27px` en el CSS controlado, o `py-[73px]` en un componente nuevo, debe provocar un error de CI.

No aplicaría este bloqueo retrospectivamente a todo el repositorio. Primero lo impondría sobre `src/components/sections/` y después ampliaría su alcance. Así se establece un estándar sin una migración masiva.

## **C. Tests automáticos baratos para todo el sitio**

Ya tenéis Playwright, Lighthouse, axe y varias herramientas de QA. No instalaría una segunda solución que duplique sus funciones.

Añadiría **cinco contratos visuales automáticos** que se ejecutarían sobre cada plantilla de página. Así, un fallo de espaciado, desbordamiento o contraste en un componente compartido se detecta antes de que afecte al resto.

| Test | Herramienta | Criterio para fallar CI | Frecuencia |
| --- | --- | --- | --- |
| Contraste | axe + Playwright | Violación automática de contraste | Cada PR |
| Desbordamiento | Playwright | Contenido fuera del viewport sin excepción declarada | Cada PR |
| Tamaños táctiles | Playwright | Controles principales inferiores a 44 × 44 px | Cada PR |
| Alineación | Playwright | Contenedores equivalentes desalineados más de 2 px | Cada PR |
| Regresión visual | Playwright screenshots | Diferencia superior al umbral aprobado | Cada PR |
| Estabilidad CLS | Lighthouse CI | CLS superior a 0,1 | Cada despliegue |

Las referencias para los valores de accesibilidad son W3C WCAG 2.2: el mínimo general de objetivo táctil es 24 × 24 CSS px, con excepciones; 44 × 44 es una exigencia de diseño más estricta que propongo para vuestros botones y controles principales. Para reflow, la referencia es 320 CSS px. 

![](https://www.google.com/s2/favicons?domain=https://www.w3.org&sz=32)

W3C+1

### **C1. Probar automáticamente las cinco anchuras**

Crearía `tests/visual/responsive.spec.ts`:

TypeScript

```
import { test, expect } from "@playwright/test";

const BASE = (
  process.env.TEST_BASE_URL ??
  "http://127.0.0.1:4321"
).replace(/\/$/, "");

const rutas = [
  "/",
  "/elige",
  "/products",
  "/pages/como-funciona",
  "/blog"
];

const anchuras = [320, 390, 768, 1366, 1920];

for (const ruta of rutas) {
  for (const width of anchuras) {
    test(`${ruta} sin desbordes a ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${BASE}${ruta}`, {
        waitUntil: "load"
      });

      // Evita falsos positivos de elementos entrando en pantalla.
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        `
      });

      const resultado = await page.evaluate(() => {
        const limite = document.documentElement.clientWidth;

        const desborde =
          document.documentElement.scrollWidth > limite + 2;

        const elementos = [
          ...document.querySelectorAll("body *")
        ].filter(el => {
          if (el.closest("[data-allow-overflow]")) return false;

          const style = getComputedStyle(el);
          if (
            style.display === "none" ||
            style.visibility === "hidden"
          ) return false;

          const r = el.getBoundingClientRect();

          return r.width > 0 &&
            (r.left < -2 || r.right > limite + 2);
        });

        return {
          desborde,
          elementos: elementos
            .slice(0, 10)
            .map(el => el.outerHTML.slice(0, 120))
        };
      });

      expect(resultado.desborde).toBe(false);
      expect(resultado.elementos).toEqual([]);
    });
  }
}
```

Los carriles horizontales intencionados pueden llevar `data-allow-overflow`. El test permite identificar el elemento responsable del fallo, en lugar de devolver únicamente «captura diferente».

Esta prueba detecta posiciones fuera del viewport; no garantiza que no existan elementos visualmente superpuestos o recortados dentro de contenedores con `overflow:hidden`. Eso se cubre con los snapshots.

### **C2. Probar zoom al 200 %**

Añadiría una pasada a 640 CSS px como aproximación al reflow de una ventana de 1.280 px ampliada al 200 %.

También conservaría la prueba de 320 px, equivalente al caso de 1.280 px con zoom al 400 % descrito por W3C. 

![](https://www.google.com/s2/favicons?domain=https://www.w3.org&sz=32)

W3C

No etiquetaría estos tests como «zoom real verificado»: Playwright permite modificar el viewport, pero eso no reproduce todas las particularidades del zoom del navegador. Los tests de reflow sí son automatizables y útiles para la mayoría de problemas de composición.

### **C3. Comprobar tamaños táctiles**

Añadiría `data-touch-target` al componente `Boton` y a los controles de icono, menú móvil, búsqueda y Contacto.

TypeScript

```
test("controles principales >= 44x44", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/`);

  const pequeños = await page.locator(
    "[data-touch-target]"
  ).evaluateAll(elements =>
    elements
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 &&
          (r.width < 44 || r.height < 44);
      })
      .map(el => el.outerHTML.slice(0, 120))
  );

  expect(pequeños).toEqual([]);
});
```

Así no necesitas analizar indiscriminadamente los enlaces de texto de artículos o del pie.

### **C4. Capturas de componentes, no de páginas enteras**

Esta sería una de las mejoras técnicas más rentables.

Añadiría un atributo estable a cada bloque:

astro

`<section data-ui="hero">...</section>
<section data-ui="servicios-destacados">...</section>
<section data-ui="demos">...</section>
<section data-ui="pasos">...</section>
<section data-ui="faq">...</section>`

Y usaría capturas de elementos individuales:

TypeScript

```
test("hero visual móvil", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/`);

  await page.evaluate(() => document.fonts.ready);

  await expect(
    page.locator('[data-ui="hero"]')
  ).toHaveScreenshot("hero-mobile.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.003
  });
});

test("tarjetas de servicios escritorio", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(`${BASE}/`);

  await page.evaluate(() => document.fonts.ready);

  await expect(
    page.locator('[data-ui="servicios-destacados"]')
  ).toHaveScreenshot("servicios-desktop.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.003
  });
});
```

Playwright soporta oficialmente `locator.toHaveScreenshot()`, comparación de diferencias y desactivación de animaciones durante la captura. 

![](https://www.google.com/s2/favicons?domain=https://playwright.dev&sz=32)

Playwright

**Ventaja para vosotros:** cuando se modifica `Tarjeta`, podéis generar una pequeña página de muestras que renderice todas sus variantes y comparar únicamente esas superficies. No hace falta revisar manualmente todas las fichas que la utilizan.

Las capturas de referencia deben generarse y versionarse en el mismo entorno de ejecución de CI, preferiblemente Linux con versión fija de navegador y fuentes.

### **C5. Contraste y alineación**

Para contraste, extendería vuestro test de axe existente con una comprobación específica sobre las variantes más delicadas: texto terracota sobre blanco, píldoras verdes, botones, etiquetas pequeñas y texto sobre gradientes.

Configuración:

TypeScript

```
import AxeBuilder from "@axe-core/playwright";

const resultado = await new AxeBuilder({ page })
  .withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21aa",
    "wcag22aa"
  ])
  .analyze();

expect(
  resultado.violations.filter(v => v.id === "color-contrast")
).toEqual([]);
```

Este enfoque se basa en la integración oficial de axe con Playwright. 

![](https://www.google.com/s2/favicons?domain=https://playwright.dev&sz=32)

Playwright

Para alineaciones usaría un atributo `data-layout="page"` en los contenedores interiores que deban compartir eje. Un test compara sus coordenadas `left` con una tolerancia de 2 px. Los bloques intencionadamente descentrados no deberían llevar ese atributo.

Así se pueden detectar desviaciones de rejilla incluso cuando las capturas completas son demasiado ruidosas.

### **C6. Umbral de CLS con Lighthouse CI**

Archivo `.lighthouserc.cjs`:

JavaScript

```
module.exports = {
  ci: {
    collect: {
      url: [
        `${process.env.TEST_BASE_URL ??
          "http://127.0.0.1:4321"}/`
      ],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        "cumulative-layout-shift": [
          "error",
          { maxNumericValue: 0.1 }
        ],
        "color-contrast": [
          "error",
          { minScore: 1 }
        ]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci"
    }
  }
};
```

Lighthouse CI permite bloquear un proceso según el valor numérico de una auditoría. El objetivo CLS ≤ 0,1 coincide con el umbral de experiencia buena de Core Web Vitals. 

![](https://www.google.com/s2/favicons?domain=https://github.com&sz=32)

GitHub+1

Es una medición de laboratorio; para verificar el CLS real de visitantes conviene contrastarla posteriormente con datos de campo.

### **C7. Coste y ejecución**

No añadiría servicios visuales de pago.

La nueva cadena sería:

1. Build

Astro + Tailwind v4

2. Tokens

Stylelint + regla de clases

3. Responsive

Playwright en 5 anchuras

4. Accesibilidad

axe + objetivos táctiles

5. Visual

Capturas por componente

6. Rendimiento

Lighthouse CI: CLS

En GitHub Actions, utilizaría los runners ya existentes y añadiría estas comprobaciones al job de QA. Para las pruebas repetibles usaría una instancia local o de pruebas con datos controlados, de modo que los robots de QA no generen tráfico innecesario contra el staging y D1.

## **D. Repositorios públicos que podéis reutilizar**

He comprobado los repositorios y su actividad pública a 21/11/2026. Las fechas son las del último commit visible en la rama principal según GitHub, no necesariamente las del último lanzamiento.

### **Comparativa**

| Repositorio | Secciones aprovechables | Stack / licencia | Último commit | Adaptación estimada |
| --- | --- | --- | --- | --- |
| [HyperUI](https://github.com/markmead/hyperui?utm_source=chatgpt.com) | Precios, FAQ, tarjetas, CTA, pies | HTML + Tailwind v4 · MIT | 19/11/2026 | Baja |
| [AstroWind](https://github.com/arthelokyo/astrowind?utm_source=chatgpt.com) | Hero, Bento, Gallery, Pricing, FAQs | Astro 7 + Tailwind v4 · MIT | 12/09/2026 | Media |
| [Starwind UI](https://github.com/starwind-ui/starwind-ui?utm_source=chatgpt.com) | Accordion, botones, tarjetas y primitivas | Astro + Tailwind · MIT | 14/11/2026 | Baja |
| [Accessible Astro Starter](https://github.com/incluud/accessible-astro-starter?utm_source=chatgpt.com) | Hero, CTA, features, navegación | Astro 7 + Tailwind v4 · MIT | 21/11/2026 | Media |
| [Astroplate](https://github.com/zeon-studio/astroplate?utm_source=chatgpt.com) | Patrones de landing y componentes de contenido | Astro 7 + Tailwind v4 · MIT | 28/07/2026 | Media |
| [Flowbite](https://github.com/themesberg/flowbite?utm_source=chatgpt.com) | FAQ, pricing, CTA y componentes de interfaz | Tailwind · MIT | 27/06/2026 | Media |

Las licencias y tecnologías se han contrastado con los propios repositorios; las versiones de Astro y Tailwind de las plantillas se han comprobado también en sus `package.json`. 

![](https://www.google.com/s2/favicons?domain=https://github.com&sz=32)

GitHub+5

### **Los tres más útiles en vuestro caso**

![HyperUI: 226 Free Tailwind CSS Components | Tailkits](https://images.openai.com/static-rsc-4/ZtxJBIZXZvmV42DQNMZbDAzHPz5kRR5MJRItqRxdBDX4UozzrP19mALPWoh6oj-Ha5QROxEMK7MtNElAQmw_35wmMPD-0VwfcgT2a6dCIVn6IDQPGVgDfsUMBCiUIMZkDbxnbE4FFSqG9YN8bJ5J9oL1Hj-jLKXu1h3AmwQW3lU?purpose=inline)

**1.** [**HyperUI Marketing**](https://hyperui.dev/components/marketing/?utm_source=chatgpt.com)

La opción más barata para copiar marcado. La biblioteca ofrece ocho variantes de precios, seis de FAQ, tarjetas, secciones, CTA y pies. No exige instalar React ni cambiar de arquitectura.

Copiaría primero el FAQ y las tarjetas de precios, sustituyendo sus clases de apariencia por vuestros tokens. 

![](https://www.google.com/s2/favicons?domain=https://hyperui.dev&sz=32)

HyperUI

![GitHub - arthelokyo/astrowind: ⭕️ AstroWind: A free template using Astro v6 and Tailwind CSS v4. Astro starter theme. · GitHub](https://images.openai.com/static-rsc-4/r58e6ALmMjjTCHggq0SY_0qAe-JOGmO3kadFDduj6dzpV2wSae7GaypAk2uowtRMsKdvKnUxwEnFIYI5r_sbOP6buh8A0duo2ONfKSB4Do-7-HIdhiMDPfXlUPZr6RbCntHROjUgJYNnVC6-F0zJR-rtke9cLJi0auRoeML1JJA?purpose=inline)

**2.** [**AstroWind Widgets**](https://github.com/arthelokyo/astrowind/tree/main/src/components/widgets?utm_source=chatgpt.com)

Es el mejor repositorio para secciones Astro completas. He verificado en su código la existencia de `Bento.astro`, `Gallery.astro`, `Pricing.astro`, `FAQs.astro` y varias versiones de `Hero`.

Adaptaría `Bento`, `Gallery` y `FAQs`. No reemplazaría vuestro hero actual. Los widgets dependen de componentes internos de AstroWind, por lo que hay que sustituir esos imports por los de vuestro sistema. 

![](https://www.google.com/s2/favicons?domain=https://github.com&sz=32)

GitHub

![Starwind UI](https://images.openai.com/static-rsc-4/H-Ul5duP2PYvKw5ihajkjj_EHKTpmS7vcJBZYtloHCYXgK-_Zxf2sF3btsCfo_RX-FjLCUvYeSTfn9H-eeh8bByaXWwPOgaNhk1ef3AQdP5QEwRqL0e5QXngBFe6joOe-uLU8cXTlSfTivOx0NmZkXm478o-ObCvFzBKJuIKjCY?purpose=inline)

**3.** [**Starwind UI**](https://starwind.dev/?utm_source=chatgpt.com)

Para componentes interactivos que queréis normalizar, especialmente Accordion y botones. Su arquitectura permite trabajar con componentes fuente y comportamiento compartido sin introducir React en páginas Astro.

La versión 3.6 se anunció el 5 de noviembre de 2026, con mejoras de tamaño de JavaScript y correcciones de formularios y foco. 

![](https://www.google.com/s2/favicons?domain=https://starwind.dev&sz=32)

starwind.dev

### **Qué copiaría exactamente**

| Módulo | Fuente | Acción |
| --- | --- | --- |
| Hero | Actual | Conservar y comprimir en móvil |
| Bento de servicios | AstroWind `Bento.astro` | Adaptar a `Tarjeta` |
| Galería de demos | AstroWind `Gallery.astro` | Sustituir imágenes por demos reales |
| Precios | HyperUI Pricing | Alimentar desde catálogo |
| FAQ | AstroWind `FAQs.astro` | Reutilizar la estructura nativa `<details>` |
| CTA final | Actual | Conservar |
| Pie | HyperUI Footers | Tomar agrupación y espaciado, no apariencia |
| Controles interactivos | Starwind UI | Reutilizar primitivas existentes |

**No verificado:** que estos módulos puedan integrarse sin ningún ajuste con los estilos globales concretos de vuestra web. Sí están verificados sus archivos, las tecnologías generales y las licencias. Las horas reales de adaptación dependen de los imports, las clases y el estado de los componentes actuales.

## **Plan de implantación recomendado**

## **Fases de trabajo**

Estimaciones

|  |  |  |
| --- | --- | --- |
| **P0** | Hero móvil, texto comercial, botón Contacto, titular de «Así funciona» | 2–4 h |
| **P1** | Tarjetas con precios, galería de tres demos, FAQ | 5–10 h |
| **P1** | Tokens semánticos y componente `Seccion` | 3–6 h |
| **P2** | Lint de tokens, pruebas responsive y snapshots | 4–8 h |
| **P2** | Footer, microinteracciones, comprobación de alineaciones | 2–4 h |

Estimación de ingeniería para cambios localizados; no son tiempos medidos sobre vuestro repositorio.

Mi orden sería **P0 → precios y demos → sistema de diseño → tests → últimos retoques**. No intentaría mejorar todas las páginas a la vez.

La portada debe convertirse en la página de referencia. Cuando sus secciones, tokens y componentes pasen los tests, esos mismos módulos se reutilizan en `/elige`, `/products`, las fichas y «Cómo funciona».

Para medir si funcionan los cambios, registraría al menos cuatro eventos sin añadir consultas D1 por clic: visitas a la portada, clics hacia `/elige`, aperturas de demos y visitas a fichas desde la portada. Compararía tasas por sesión entre la versión anterior y la nueva, separando móvil y escritorio. El volumen de tráfico determinará cuándo las diferencias son concluyentes.

**Decisión final:** si solo se aprueban tres trabajos ahora, elegiría mejorar el primer pantallazo móvil, mostrar precios y añadir demos navegables. Son los que más directamente responden a las preguntas del comprador: «¿Qué hacéis?», «¿Cuánto cuesta?» y «¿Qué voy a recibir?». El sistema de tokens y los tests son los que permitirán mantener esa claridad cuando el catálogo y la web sigan creciendo.
