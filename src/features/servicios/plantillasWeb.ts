/**
 * Plantillas de la web de negocio: cada una es una composición (qué variante de cada sección y en
 * qué orden van los extras) más una identidad visual (tokens, decoración y titulares de sección).
 * El HTML lo genera `renderWeb` (webs.ts) a partir de estas variantes; aquí solo hay catálogo y CSS.
 *
 * Variantes (clases en el HTML):
 *  - portada  w-h-1 dividida · 2 inmersiva · 3 tipográfica · 4 servicio inmediato · 5 cartel · 6 editorial
 *  - servicios w-s-1 tarjetas · 2 tarifa · 3 destacado · 4 índice numerado · 5 compacto
 *  - galería  w-g-1 mosaico · 2 carril · 3 franjas alternas · 4 cuadrícula
 *  - opiniones w-o-1 cita protagonista · 2 cuadrícula · 3 carril
 *  - contacto w-c-1 dividido · 2 teléfono protagonista · 3 editorial · 4 visita
 * Las variantes se degradan con pocos datos (webs.ts: un servicio, sin precios, una opinión…).
 *
 * Añadir una plantilla: su entrada aquí y su bloque `.w-t-<id>` en IDENTIDADES. Nada más cambia.
 */

import { CSS_DISENOS, CSS_DISENOS_COMUN, DISENOS, disenoWeb } from './creativas';

export type ExtraWeb = 'zonas' | 'horario' | 'franja';

/** Básicas: el esqueleto común con variantes; se configuran a mano igual que los CV. */
const BASICAS = [
  {
    id: 'guardia', nombre: 'Guardia', descripcion: 'Teléfono enorme y zonas a la vista. Para urgencias y oficios: fontanería, cerrajería, grúas.',
    hero: 4, servicios: 5, galeria: 4, opiniones: 1, contacto: 2,
    orden: ['servicios', 'zonas', 'horario', 'opiniones', 'preguntas', 'galeria', 'sobre', 'franja', 'contacto'],
  },
  {
    id: 'obra', nombre: 'Obra', descripcion: 'Retícula y trabajos numerados. Para reformas, carpintería y estudios que enseñan lo que hacen.',
    hero: 1, servicios: 4, galeria: 1, opiniones: 2, contacto: 1,
    orden: ['galeria', 'servicios', 'sobre', 'zonas', 'opiniones', 'franja', 'preguntas', 'contacto'],
  },
  {
    id: 'salon', nombre: 'Salón', descripcion: 'Cálida y fotográfica, con tarifa de precios y cita a mano. Para peluquerías y estética.',
    hero: 1, servicios: 2, galeria: 1, opiniones: 1, contacto: 1,
    orden: ['servicios', 'galeria', 'opiniones', 'sobre', 'franja', 'horario', 'preguntas', 'contacto'],
  },
  {
    id: 'atelier', nombre: 'Atelier', descripcion: 'Editorial en papel crema y secciones numeradas. Para oficios con mimo y tiendas de autor.',
    hero: 6, servicios: 3, galeria: 3, opiniones: 1, contacto: 3,
    orden: ['sobre', 'servicios', 'galeria', 'opiniones', 'franja', 'preguntas', 'horario', 'contacto'],
  },
  {
    id: 'mesa', nombre: 'Mesa', descripcion: 'Como una carta: platos y precios con puntos guía, horario y reserva. Para restaurantes.',
    hero: 3, servicios: 2, galeria: 1, opiniones: 1, contacto: 4,
    orden: ['servicios', 'galeria', 'sobre', 'franja', 'horario', 'opiniones', 'preguntas', 'contacto'],
  },
  {
    id: 'barra', nombre: 'Barra', descripcion: 'Oscura y envolvente, con tu foto a pantalla completa. Para bares, coctelerías y música.',
    hero: 2, servicios: 2, galeria: 2, opiniones: 3, contacto: 4,
    orden: ['galeria', 'servicios', 'franja', 'horario', 'sobre', 'opiniones', 'preguntas', 'contacto'],
  },
  {
    id: 'clinica', nombre: 'Clínica', descripcion: 'Clara y de confianza, con servicios en tarjetas y cita fácil. Para salud y bienestar.',
    hero: 1, servicios: 1, galeria: 4, opiniones: 2, contacto: 4,
    orden: ['servicios', 'sobre', 'galeria', 'opiniones', 'preguntas', 'franja', 'horario', 'contacto'],
  },
  {
    id: 'consulta', nombre: 'Consulta', descripcion: 'Sobria, con mucho aire y titular grande. Para abogados, gestorías y asesorías.',
    hero: 3, servicios: 4, galeria: 4, opiniones: 1, contacto: 3,
    orden: ['sobre', 'servicios', 'preguntas', 'opiniones', 'galeria', 'horario', 'contacto'],
  },
  {
    id: 'aula', nombre: 'Aula', descripcion: 'Alegre y ordenada, con el curso estrella destacado y el horario. Para academias y clases.',
    hero: 5, servicios: 3, galeria: 4, opiniones: 2, contacto: 1,
    orden: ['servicios', 'horario', 'sobre', 'opiniones', 'franja', 'galeria', 'preguntas', 'contacto'],
  },
  {
    id: 'impulso', nombre: 'Impulso', descripcion: 'Oscura, enérgica y en mayúsculas. Para gimnasios, entrenadores y deporte.',
    hero: 2, servicios: 1, galeria: 2, opiniones: 3, contacto: 2,
    orden: ['servicios', 'sobre', 'galeria', 'opiniones', 'franja', 'horario', 'preguntas', 'contacto'],
  },
  {
    id: 'encuadre', nombre: 'Encuadre', descripcion: 'Mínima, para que tus fotos manden. Para fotografía, diseño y portfolios.',
    hero: 6, servicios: 4, galeria: 1, opiniones: 1, contacto: 3,
    orden: ['galeria', 'sobre', 'servicios', 'opiniones', 'franja', 'preguntas', 'contacto'],
  },
  {
    id: 'cartel', nombre: 'Cartel', descripcion: 'Bordes gruesos, sombras duras y titulares rotulados. Imposible pasarla por alto.',
    hero: 5, servicios: 3, galeria: 4, opiniones: 2, contacto: 1,
    orden: ['servicios', 'galeria', 'sobre', 'franja', 'opiniones', 'zonas', 'horario', 'preguntas', 'contacto'],
  },
] as const;

/** Ids de los diseños de autor (creativas/): cada uno con portada, ilustración y tipografía propias. */
export type IdDisenoWeb = 'agenda' | 'urgente' | 'bistro' | 'serena' | 'pulso' | 'indice' | 'navaja' | 'expediente' | 'vinetas' | 'postal';
export type IdPlantillaWeb = (typeof BASICAS)[number]['id'] | IdDisenoWeb;
export type FamiliaPlantilla = 'autor' | 'basica';

export interface PlantillaWeb {
  id: IdPlantillaWeb;
  nombre: string;
  descripcion: string;
  familia: FamiliaPlantilla;
  /** Portada de las básicas (w-h-N); 0 en los diseños de autor, que traen la suya. */
  hero: number;
  servicios: number;
  galeria: number;
  opiniones: number;
  contacto: number;
  orden: readonly string[];
}

/** Primero los diseños de autor, luego las básicas. */
export const PLANTILLAS_WEB: readonly PlantillaWeb[] = [
  ...DISENOS.map((x): PlantillaWeb => ({
    id: x.id as IdDisenoWeb,
    nombre: x.nombre,
    descripcion: x.descripcion,
    familia: 'autor',
    hero: 0,
    servicios: x.servicios,
    galeria: x.galeria,
    opiniones: x.opiniones,
    contacto: x.contacto,
    orden: x.orden,
  })),
  ...BASICAS.map((b): PlantillaWeb => ({ ...b, familia: 'basica' })),
];

/** Ids de la primera versión (solo CSS sobre un HTML único) → plantilla nueva más parecida. */
export const PLANTILLAS_ANTIGUAS: Readonly<Record<string, IdPlantillaWeb>> = {
  clara: 'consulta', banda: 'salon', noche: 'barra', partida: 'obra', revista: 'atelier', bento: 'aula',
  cristal: 'clinica', brutal: 'cartel', lateral: 'encuadre', poster: 'cartel', suave: 'salon', carta: 'mesa',
  tecnica: 'obra', degradado: 'impulso', minima: 'consulta', contraste: 'guardia', retro: 'mesa',
};

/** Id de plantilla válido (incluidos los antiguos, ya traducidos) o undefined. */
export function resolverPlantilla(v: unknown): IdPlantillaWeb | undefined {
  if (typeof v !== 'string') return undefined;
  return PLANTILLAS_WEB.find((p) => p.id === v)?.id ?? (Object.hasOwn(PLANTILLAS_ANTIGUAS, v) ? PLANTILLAS_ANTIGUAS[v] : undefined);
}

export const plantillaWeb = (id: string): PlantillaWeb =>
  PLANTILLAS_WEB.find((p) => p.id === resolverPlantilla(id)) ?? PLANTILLAS_WEB.find((p) => p.id === 'salon')!;

export { disenoWeb };

/** Base común: tokens, tipografía, botones, secciones, contacto, pie y barra fija del móvil. */
const BASE = `
.w{--w-ct:var(--w-ct-claro);--w-fondo:#fff;--w-tinta:#111827;--w-suave:#4b5563;--w-borde:#e5e7eb;--w-panel:#f9fafb;
  --w-r:12px;--w-sombra:none;--w-esp:20px;--w-h1:clamp(2.4rem,8cqi,4.6rem);
  position:relative;container-type:inline-size;background:var(--w-fondo);color:var(--w-tinta);
  font-family:var(--w-ft-texto);line-height:1.6;-webkit-font-smoothing:antialiased;overflow-wrap:anywhere}
.w *,.w *::before,.w *::after{box-sizing:border-box}
.w h1,.w h2,.w h3{font-family:var(--w-ft-titulo);line-height:1.15;margin:0;color:inherit}
.w p{margin:0}
.w img{display:block;max-width:100%}
.w :where(a){color:inherit}
.w :is(a,summary):focus-visible{outline:3px solid var(--w-c);outline-offset:3px}
.w :is(.w-servicios,.w-galeria,.w-opiniones,.w-preguntas,.w-contacto,.w-zonas){list-style:none;margin:0;padding:0}
.w-in{width:100%;max-width:1040px;margin:0 auto;padding:0 20px}
.w-ico{width:1.15em;height:1.15em;flex:none}
.w-sector{font-size:.8rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--w-ct)}
.w-boton{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:10px 20px;border-radius:999px;
  font-weight:600;text-decoration:none;border:2px solid var(--w-c);color:var(--w-ct);background:transparent}
.w-boton-lleno{background:var(--w-c);color:var(--w-s)}
.w-sec{padding:calc(var(--w-esp)*2.4) 0}
.w-sec h2{font-size:clamp(1.5rem,5cqi,2.1rem);margin-bottom:calc(var(--w-esp)*1.1);text-wrap:balance}
.w-sec h2::after{content:"";display:block;width:48px;height:4px;border-radius:4px;background:var(--w-c);margin-top:10px}
.w-sobre{max-width:44rem;font-size:1.05rem;color:var(--w-suave)}
.w-sobre p+p{margin-top:12px}
.w-dato{display:flex;gap:12px;align-items:flex-start;min-height:44px;padding:14px 16px;border-radius:var(--w-r);background:var(--w-panel);text-decoration:none}
.w-dato .w-ico{color:var(--w-ct);margin-top:3px}
.w-dato small{display:block;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-suave)}
a.w-dato:hover,a.w-dato:focus-visible{outline:2px solid var(--w-c);outline-offset:0}
.w-preguntas{display:grid;gap:12px;max-width:46rem}
.w-pregunta{display:block}
.w-pregunta summary{cursor:pointer;font-weight:600;list-style-position:outside;margin-left:1.1em}
.w-pregunta summary::marker{color:var(--w-ct)}
.w-respuesta{margin-top:8px;color:var(--w-suave)}
.w-respuesta p+p,.w-opinion blockquote p+p{margin-top:8px}
.w-mas{margin-top:14px}
.w-mas a{font-weight:600;color:var(--w-ct)}
.w-pie{padding:28px 0 36px;text-align:center;font-size:.85rem;color:var(--w-suave);border-top:1px solid var(--w-borde)}
.w-pie a{color:inherit}
.w-barra{display:none}
@container (max-width:640px){
  .w-barra{position:sticky;bottom:0;z-index:4;display:flex;gap:8px;padding:10px 12px;background:var(--w-fondo);border-top:1px solid var(--w-borde);box-shadow:0 -6px 18px rgb(0 0 0 / .08)}
  .w-barra .w-boton{flex:1 1 0;min-width:0;gap:6px;padding:10px 6px;font-size:.9rem;line-height:1.2;text-align:center;overflow-wrap:break-word;word-break:normal;hyphens:auto}
}
@container (max-width:380px){.w-barra .w-boton{flex-direction:column;gap:2px;padding:8px 4px;font-size:.85rem}}
.w-marca{position:absolute;inset:0;pointer-events:none;z-index:5;background-repeat:repeat}
`;

/** Variantes de sección (estructura). Solo container queries: la vista previa es un Shadow DOM estrecho. */
const VARIANTES = `
.w .w-cab{position:relative;isolation:isolate;overflow:hidden;padding-block:clamp(calc(var(--w-esp)*2),6cqw,calc(var(--w-esp)*4));background:var(--w-fondo);color:var(--w-tinta)}
.w .w-cab-in{display:grid;gap:clamp(var(--w-esp),4cqw,calc(var(--w-esp)*3));align-items:center}
.w .w-cab-txt{min-width:0;position:relative;z-index:2}
.w .w-cab-txt>*+*{margin-block-start:clamp(12px,2cqw,22px)}
.w .w-cab h1{font-size:var(--w-h1);line-height:1.04;letter-spacing:-.035em;text-wrap:balance}
.w .w-cab .w-lema{font-size:clamp(1.05rem,2.1cqw,1.35rem);line-height:1.5;max-width:55ch;color:var(--w-suave)}
.w .w-cab .w-cab-dato{display:flex;align-items:center;gap:8px;font-size:.92rem;color:var(--w-suave)}
.w .w-acciones{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
.w .w-cab-foto{position:relative;margin:0;min-width:0;overflow:hidden;border-radius:var(--w-r)}
.w .w-cab-foto img{width:100%;height:100%;aspect-ratio:4/3;object-fit:cover}
.w .w-h-1 .w-cab-foto{box-shadow:var(--w-sombra)}
.w .w-h-1.w-sin-foto .w-cab-txt{max-width:790px}
.w .w-h-2{min-height:450px;color:#fff;background:linear-gradient(#000b,#000b),repeating-linear-gradient(130deg,color-mix(in srgb,var(--w-c) 65%,#000) 0 3px,#171717 3px 35px)}
.w .w-h-2 .w-cab-in{min-height:clamp(350px,48cqw,650px);align-content:center}
.w .w-h-2 .w-cab-foto{position:absolute;inset:0;z-index:0;border-radius:0}
.w .w-h-2 .w-cab-foto img{position:absolute;inset:0;aspect-ratio:auto}
.w .w-h-2 .w-cab-foto::after{content:"";position:absolute;inset:0;background:rgb(0 0 0 / .72)}
.w .w-h-2 :is(.w-sector,.w-lema,.w-cab-dato){color:#fff}
.w .w-h-2 .w-cab-txt{max-width:750px}
.w .w-h-2 .w-acciones a:not(.w-boton-lleno){color:#fff}
.w .w-h-3 .w-cab-in{align-items:end}
.w .w-h-3 h1{font-size:clamp(3rem,11cqw,8.4rem);line-height:.94;letter-spacing:-.06em}
.w .w-h-3 .w-cab-foto{max-width:560px;transform:rotate(-2deg)}
.w .w-h-3.w-sin-foto .w-cab-txt{max-width:980px}
.w .w-h-4{background:radial-gradient(ellipse at 100% 0%,color-mix(in srgb,var(--w-c) 14%,var(--w-fondo)),transparent 55%),var(--w-fondo)}
.w .w-h-4 .w-cab-in{align-items:start}
.w .w-h-4 .w-acciones a[href^="tel:"]{font-family:var(--w-ft-titulo);font-size:clamp(1.4rem,5cqw,2.7rem);font-weight:800;line-height:1.1;min-height:56px;padding-inline:26px}
.w .w-h-4 .w-cab-dato{display:inline-flex;padding:10px 14px;border:1px solid var(--w-borde);border-radius:4px}
.w .w-h-5{background:linear-gradient(135deg,color-mix(in srgb,var(--w-c) 10%,var(--w-fondo)),var(--w-fondo) 55%)}
.w .w-h-5::after{content:"";position:absolute;right:-7%;top:-18%;width:min(58cqw,550px);aspect-ratio:1;border:clamp(12px,4cqw,42px) solid color-mix(in srgb,var(--w-c) 18%,transparent);border-radius:50%;pointer-events:none;z-index:0}
.w .w-h-5 h1{text-transform:uppercase;font-weight:900;letter-spacing:-.05em;font-size:clamp(2.6rem,9cqw,7.5rem)}
.w .w-h-5 .w-cab-foto{border-radius:0;transform:rotate(2deg);box-shadow:14px 14px 0 color-mix(in srgb,var(--w-c) 25%,var(--w-fondo))}
.w .w-h-6 .w-cab-in{border-top:1px solid var(--w-borde);padding-top:22px}
.w .w-h-6 .w-cab-txt::before{content:"";display:block;width:56px;height:2px;background:var(--w-c);margin-bottom:clamp(28px,5cqw,64px)}
.w .w-h-6 h1{font-weight:500;letter-spacing:-.045em}
.w .w-h-6 .w-cab-foto{border-radius:0}
.w .w-h-6 .w-cab-foto img{aspect-ratio:3/4}
.w .w-servicios{display:grid;gap:var(--w-esp);counter-reset:servicio}
.w .w-servicio{min-width:0}
.w .w-servicio-cab{display:flex;align-items:baseline;justify-content:space-between;gap:12px;min-width:0}
.w .w-servicio h3{font-size:clamp(1.1rem,2cqw,1.3rem);line-height:1.3}
.w .w-servicio p{margin-top:8px;line-height:1.55;color:var(--w-suave)}
.w .w-precio{flex:none;font-variant-numeric:tabular-nums;font-weight:750;white-space:nowrap;color:var(--w-ct)}
.w .w-s-1>li{padding:clamp(18px,3cqw,30px);border:1px solid var(--w-borde);border-radius:var(--w-r);background:var(--w-panel);box-shadow:var(--w-sombra)}
.w .w-s-2{gap:0}
.w .w-s-2>li{padding:18px 0;border-bottom:1px solid var(--w-borde)}
.w .w-s-2 h3{display:flex;align-items:baseline;gap:10px;flex:1;min-width:0}
.w .w-s-2 h3::after{content:"";min-width:12px;flex:1;border-bottom:2px dotted var(--w-borde)}
.w .w-s-2 .w-servicio p{max-width:65ch;margin-top:6px;font-size:.92rem}
.w .w-s-3{gap:12px}
.w .w-s-3>li{padding:18px;border:1px solid var(--w-borde);border-radius:var(--w-r)}
.w .w-s-3>li:first-child{padding:clamp(26px,4cqw,48px);background:var(--w-panel);border-inline-start:6px solid var(--w-c)}
.w .w-s-3>li:first-child h3{font-size:clamp(1.55rem,3cqw,2.6rem)}
.w .w-s-3[data-n="1"]{max-width:780px}
.w .w-s-4{gap:0}
.w .w-s-4>li{counter-increment:servicio;display:grid;grid-template-columns:55px minmax(0,1fr);gap:4px 16px;align-items:start;padding:22px 0;border-bottom:1px solid var(--w-borde)}
.w .w-s-4>li::before{content:counter(servicio,decimal-leading-zero);grid-row:span 2;font:800 1.45rem var(--w-ft-titulo);color:var(--w-ct)}
.w .w-s-4 .w-servicio p{grid-column:2;margin:0}
.w .w-s-5{gap:0}
.w .w-s-5>li{padding:14px 0;border-bottom:1px solid var(--w-borde)}
.w .w-s-5 h3{font-size:1.05rem}
.w .w-s-5 .w-servicio p{margin-top:4px;font-size:.9rem}
.w .w-galeria{display:grid;gap:12px}
.w .w-galeria>li{min-width:0;overflow:hidden;border-radius:var(--w-r);background:var(--w-panel)}
.w .w-galeria img{width:100%;height:100%;object-fit:cover;aspect-ratio:4/3}
.w .w-g-1{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:clamp(125px,25cqw,250px)}
.w .w-g-1>li:first-child{grid-column:1/-1}
.w .w-g-1 img{aspect-ratio:auto}
.w .w-g-1[data-n="1"]{grid-template-columns:1fr;grid-auto-rows:auto}
.w .w-g-1[data-n="1"] img{aspect-ratio:16/9;max-height:560px}
.w .w-g-1[data-n="2"]>li:first-child{grid-column:auto}
.w .w-g-1:is([data-n="4"],[data-n="6"])>li:last-child{grid-column:1/-1}
.w .w-g-2{grid-auto-flow:column;grid-auto-columns:minmax(220px,76%);overflow-x:auto;overscroll-behavior-inline:contain;scroll-snap-type:x mandatory;scroll-padding-inline:10px;padding:4px 2px 15px}
.w .w-g-2>li{scroll-snap-align:start}
.w .w-g-2 img{aspect-ratio:5/4}
.w .w-g-2[data-n="1"]{display:block;overflow:visible}
.w .w-g-3{gap:clamp(18px,4cqw,50px)}
.w .w-g-3>li:nth-child(odd){margin-inline-end:15%}
.w .w-g-3>li:nth-child(even){margin-inline-start:15%}
.w .w-g-3 img{aspect-ratio:16/9}
.w .w-g-4{grid-template-columns:repeat(2,minmax(0,1fr))}
.w .w-g-4 img{aspect-ratio:1}
.w .w-g-4[data-n="1"]{grid-template-columns:1fr;max-width:750px}
.w .w-g-4[data-n="1"] img{aspect-ratio:4/3}
.w .w-opiniones{display:grid;gap:clamp(12px,2cqw,22px)}
.w .w-opinion{min-width:0;padding:clamp(18px,3cqw,30px);background:var(--w-panel);border-radius:var(--w-r)}
.w .w-opinion blockquote{margin:0;font-size:clamp(1rem,1.8cqw,1.15rem);text-wrap:pretty}
.w .w-opinion blockquote::before{content:"“";display:block;font-family:var(--w-ft-titulo);font-size:2.6rem;line-height:.8;color:var(--w-ct)}
.w .w-autor{margin-top:14px;font-size:.88rem;font-weight:700;color:var(--w-ct)}
.w .w-o-1>li:first-child{padding:clamp(24px,6cqw,64px);background:color-mix(in srgb,var(--w-c) 7%,var(--w-panel));border-inline-start:4px solid var(--w-c)}
.w .w-o-1>li:first-child blockquote{font-family:var(--w-ft-titulo);font-size:clamp(1.3rem,3cqw,2.2rem);line-height:1.35;text-wrap:balance}
.w .w-o-2>li{border:1px solid var(--w-borde)}
.w .w-o-3{grid-auto-flow:column;grid-auto-columns:minmax(240px,82%);overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-inline:8px;padding:4px 2px 15px}
.w .w-o-3>li{scroll-snap-align:start}
.w .w-contacto-bloque{display:grid;gap:clamp(20px,4cqw,44px);align-items:start}
.w .w-contacto-cta,.w .w-contacto{min-width:0}
.w .w-contacto-cta .w-acciones{margin-top:0}
.w .w-contacto-grande{margin:0 0 20px;font:700 clamp(1.8rem,5cqw,3.6rem)/1.12 var(--w-ft-titulo);letter-spacing:-.035em}
.w .w-contacto-grande a{color:var(--w-ct);text-decoration-thickness:2px;text-underline-offset:.12em}
.w .w-contacto{display:grid}
.w .w-contacto>li{border-bottom:1px solid var(--w-borde)}
.w .w-contacto .w-dato{background:none;border-radius:0;padding:12px 0}
.w .w-c-1 .w-contacto{border-top:3px solid var(--w-tinta)}
.w .w-c-2 .w-contacto-cta{background:var(--w-c);color:var(--w-s);border-radius:var(--w-r);padding:clamp(24px,5cqw,52px)}
.w .w-c-2 .w-contacto-grande{font-size:clamp(2rem,7cqw,4.6rem)}
.w .w-c-2 .w-contacto-grande a{color:var(--w-s)}
.w .w-c-2 .w-contacto-cta .w-boton{color:var(--w-s);border-color:currentColor}
.w .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
.w .w-c-3{padding-top:clamp(22px,5cqw,60px);border-top:2px solid var(--w-tinta)}
.w .w-c-3 .w-contacto-grande{font-size:clamp(2.4rem,9cqw,6.5rem);font-weight:500;line-height:1}
.w .w-c-3 .w-contacto>li{border-bottom-style:dotted}
.w .w-c-4 .w-contacto{gap:10px}
.w .w-c-4 .w-contacto>li{background:var(--w-panel);border:1px solid var(--w-borde);border-radius:var(--w-r);padding:0 18px}
.w .w-c-4 .w-contacto>li:has(a[href*="maps"]){border-inline-start:5px solid var(--w-c)}
.w .w-zonas{display:flex;flex-wrap:wrap;gap:10px}
.w .w-zonas>li{border:1px solid var(--w-borde);border-radius:999px;padding:10px 16px;background:var(--w-panel);font-size:.95rem;font-weight:600}
.w .w-horario{width:100%;max-width:640px;border-collapse:collapse;font-variant-numeric:tabular-nums}
.w .w-horario :is(th,td){padding:14px 12px;border-bottom:1px solid var(--w-borde);vertical-align:top}
.w .w-horario th{text-align:left;font-weight:600}
.w .w-horario td{text-align:right}
.w .w-horario td[colspan]{text-align:left;color:var(--w-suave)}
.w .w-horario tr:nth-child(even){background:color-mix(in srgb,var(--w-c) 4%,var(--w-panel))}
.w .w-franja{background:var(--w-c);color:var(--w-s);padding-block:clamp(26px,5cqw,64px)}
.w .w-franja>.w-in{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px}
.w .w-franja p{flex:1 1 260px;font:700 clamp(1.45rem,3cqw,2.6rem)/1.15 var(--w-ft-titulo);text-wrap:balance}
.w .w-franja .w-boton{color:var(--w-s);border-color:currentColor}
.w .w-franja .w-boton-lleno{background:var(--w-s);color:var(--w-c);border-color:var(--w-s)}
@container (min-width:640px){
  .w .w-h-1:not(.w-sin-foto) .w-cab-in,.w .w-h-4:not(.w-sin-foto) .w-cab-in,.w .w-h-5:not(.w-sin-foto) .w-cab-in,.w .w-h-6:not(.w-sin-foto) .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w .w-h-3:not(.w-sin-foto) .w-cab-in{grid-template-columns:minmax(0,1.4fr) minmax(0,.6fr)}
  .w .w-s-1,.w .w-o-2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .w .w-s-3:not([data-n="1"]){grid-template-columns:repeat(2,minmax(0,1fr))}
  .w .w-s-3>li:first-child{grid-column:1/-1}
  .w .w-s-3[data-n="1"]>li:first-child{grid-column:auto}
  .w .w-g-1{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:clamp(120px,17cqw,220px)}
  .w .w-g-1>li:first-child{grid-column:span 2;grid-row:span 2}
  .w .w-g-1[data-n="1"]{grid-template-columns:1fr;grid-auto-rows:auto}
  .w .w-g-1[data-n="1"]>li:first-child{grid-column:1/-1;grid-row:auto}
  .w .w-g-1[data-n="2"]{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:clamp(200px,30cqw,360px)}
  .w .w-g-1[data-n="2"]>li:first-child{grid-column:auto;grid-row:auto}
  .w .w-g-1[data-n="3"]{grid-template-columns:repeat(3,minmax(0,1fr))}
  .w .w-g-1[data-n="4"]>li:last-child{grid-column:span 2}
  .w .w-g-1[data-n="5"]>li:nth-child(n+4){grid-column:span 1}
  .w .w-g-1[data-n="6"]>li:last-child{grid-column:span 2}
  .w .w-g-4{grid-template-columns:repeat(3,minmax(0,1fr))}
  .w .w-o-1{grid-template-columns:repeat(2,minmax(0,1fr))}
  .w .w-o-1>li:first-child{grid-column:1/-1}
  .w .w-c-1,.w .w-c-2,.w .w-c-4{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w .w-g-2{grid-auto-columns:minmax(300px,44%)}
  .w .w-o-3{grid-auto-columns:minmax(280px,44%)}
}
@container (min-width:960px){
  .w .w-s-1{grid-template-columns:repeat(3,minmax(0,1fr))}
  .w .w-s-1:is([data-n="2"],[data-n="4"]){grid-template-columns:repeat(2,minmax(0,1fr))}
  .w .w-s-3:not([data-n="1"]){grid-template-columns:repeat(3,minmax(0,1fr))}
  .w .w-s-3>li:first-child{grid-column:span 2}
  .w .w-s-3:is([data-n="2"],[data-n="4"],[data-n="6"])>li:first-child{grid-column:1/-1}
  .w .w-c-3{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr)}
  .w .w-h-1:not(.w-sin-foto) .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
}
@media (prefers-reduced-motion:reduce){.w .w-galeria,.w .w-opiniones{scroll-snap-type:none;scroll-behavior:auto}}
`;

/** Identidades: tokens, decoración y titulares de sección propios. Se distinguen con el mismo color y sin fotos. */
const OSCURO = '--w-ct:var(--w-ct-oscuro);--w-fondo:#0f172a;--w-tinta:#f1f5f9;--w-suave:#a3b1c6;--w-borde:#22304a;--w-panel:#111c33;';
const IDENTIDADES = `
.w-t-guardia{--w-r:4px;--w-esp:16px;--w-h1:clamp(2.4rem,7cqw,5.2rem)}
.w-t-guardia .w-h-4{background-image:repeating-linear-gradient(120deg,color-mix(in srgb,var(--w-c) 8%,transparent) 0 2px,transparent 2px 22px)}
.w-t-guardia .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-t-guardia .w-sec h2{font-weight:850;text-transform:uppercase;letter-spacing:-.02em;border-left:7px solid var(--w-c);padding:6px 0 6px 16px}
.w-t-guardia .w-sec h2::after{display:none}
.w-t-guardia .w-boton{border-radius:var(--w-r)}
.w-t-obra{--w-r:0px;--w-esp:24px;--w-h1:clamp(2.8rem,8cqw,6.5rem);counter-reset:w-seccion}
.w-t-obra .w-cab{background-image:linear-gradient(90deg,color-mix(in srgb,var(--w-c) 8%,transparent) 1px,transparent 1px),linear-gradient(color-mix(in srgb,var(--w-c) 8%,transparent) 1px,transparent 1px);background-size:42px 42px}
.w-t-obra .w-sec{counter-increment:w-seccion}
.w-t-obra .w-sec:nth-of-type(even){background:color-mix(in srgb,var(--w-c) 4%,var(--w-fondo))}
.w-t-obra .w-sec h2{text-transform:uppercase;letter-spacing:-.04em;border-top:2px solid var(--w-tinta);padding-top:16px}
.w-t-obra .w-sec h2::before{content:counter(w-seccion,decimal-leading-zero) " / ";font-size:.7em;color:var(--w-ct);letter-spacing:0}
.w-t-obra .w-sec h2::after{display:none}
.w-t-obra .w-boton{border-radius:0}
.w-t-salon{--w-r:20px;--w-sombra:0 12px 35px color-mix(in srgb,var(--w-tinta) 11%,transparent);--w-h1:clamp(2.6rem,7cqw,5.4rem)}
.w-t-salon .w-cab{background-image:radial-gradient(ellipse at 95% 5%,color-mix(in srgb,var(--w-c) 16%,transparent),transparent 55%)}
.w-t-salon .w-sec:nth-of-type(even){background:color-mix(in srgb,var(--w-c) 5%,var(--w-panel))}
.w-t-salon .w-sec h2{display:flex;align-items:center;gap:14px;font-weight:500;font-size:clamp(1.8rem,4cqw,2.8rem)}
.w-t-salon .w-sec h2::before{content:"";flex:none;width:14px;height:14px;border-radius:50%;background:var(--w-c);box-shadow:20px 0 0 color-mix(in srgb,var(--w-c) 40%,transparent)}
.w-t-salon .w-sec h2::before{margin-right:22px}
.w-t-salon .w-sec h2::after{display:none}
.w-t-atelier{--w-fondo:#fbf8f3;--w-panel:#f3ede3;--w-borde:#e2d8c8;--w-r:0px;--w-esp:26px;--w-h1:clamp(2.8rem,9cqw,6.8rem);counter-reset:w-seccion}
.w-t-atelier .w-sec{counter-increment:w-seccion}
.w-t-atelier .w-sec h2{font-size:.85rem;letter-spacing:.16em;text-transform:uppercase;font-family:var(--w-ft-texto);font-weight:700}
.w-t-atelier .w-sec h2::before{content:counter(w-seccion,decimal-leading-zero) " — ";color:var(--w-ct)}
.w-t-atelier .w-sec h2::after{width:100%;height:1px;border-radius:0;background:var(--w-borde);margin-top:14px}
.w-t-atelier .w-boton{border-radius:0}
.w-t-mesa{--w-r:2px;--w-esp:24px;--w-h1:clamp(3rem,8cqw,6.3rem)}
.w-t-mesa .w-cab{text-align:center;background-image:repeating-linear-gradient(0deg,color-mix(in srgb,var(--w-c) 6%,transparent) 0 1px,transparent 1px 30px)}
.w-t-mesa .w-cab .w-lema{margin-inline:auto}
.w-t-mesa .w-cab :is(.w-acciones,.w-cab-dato){justify-content:center}
.w-t-mesa .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-t-mesa .w-sec h2{display:flex;align-items:center;gap:16px;text-align:center;font-weight:400;font-size:clamp(1.8rem,3.5cqw,2.8rem)}
.w-t-mesa .w-sec h2::before,.w-t-mesa .w-sec h2::after{content:"";flex:1;min-width:10px;width:auto;height:1px;margin:0;border-radius:0;background:var(--w-borde)}
.w-t-mesa .w-s-2{max-width:760px;margin-inline:auto}
.w-t-barra{${OSCURO}--w-r:14px;--w-esp:22px;--w-h1:clamp(2.8rem,9cqw,6.5rem)}
.w-t-barra .w-sec:nth-of-type(even){background:radial-gradient(50rem 22rem at 100% 0%,color-mix(in srgb,var(--w-c) 16%,transparent),transparent)}
.w-t-barra .w-sec h2{text-transform:uppercase;letter-spacing:.08em;font-size:clamp(1.3rem,4cqw,1.9rem)}
.w-t-barra .w-sec h2::after{width:72px;height:3px;box-shadow:0 0 14px var(--w-c)}
.w-t-barra .w-boton{color:var(--w-tinta)}
.w-t-barra .w-boton-lleno{color:var(--w-s)}
.w-t-clinica{--w-r:16px;--w-sombra:0 8px 24px rgb(15 23 42 / .07);--w-panel:color-mix(in srgb,var(--w-c) 5%,#fff);--w-borde:color-mix(in srgb,var(--w-c) 14%,#e5e7eb)}
.w-t-clinica .w-cab{background:linear-gradient(180deg,color-mix(in srgb,var(--w-c) 9%,#fff),#fff)}
.w-t-clinica .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-t-clinica .w-sec:nth-of-type(even) .w-s-1>li{background:#fff}
.w-t-clinica .w-sec h2::after{width:32px;height:32px;border-radius:50%;margin:0 0 0 auto;display:none}
.w-t-clinica .w-sec h2::before{content:"";display:block;width:36px;height:6px;border-radius:6px;background:var(--w-c);margin-bottom:14px}
.w-t-consulta{--w-r:0px;--w-esp:28px;--w-h1:clamp(2.7rem,8cqw,6rem)}
.w-t-consulta .w-cab{background:linear-gradient(145deg,color-mix(in srgb,var(--w-c) 6%,var(--w-fondo)),var(--w-fondo) 65%)}
.w-t-consulta .w-sec:nth-of-type(even){background:color-mix(in srgb,var(--w-c) 3%,var(--w-panel))}
.w-t-consulta .w-sec h2{font-weight:400;font-size:clamp(1.9rem,4cqw,3rem);letter-spacing:-.02em}
.w-t-consulta .w-sec h2::after{width:70px;height:3px;border-radius:0;margin-top:18px}
.w-t-consulta .w-contacto-grande{font-weight:400}
.w-t-consulta .w-boton{border-radius:0}
.w-t-aula{--w-r:22px;--w-esp:22px;--w-panel:color-mix(in srgb,var(--w-c) 7%,#fff);--w-borde:color-mix(in srgb,var(--w-c) 18%,#e5e7eb)}
.w-t-aula .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-t-aula .w-sec:nth-of-type(even) :is(.w-s-3>li,.w-opinion){background:#fff}
.w-t-aula .w-sec h2{text-decoration:underline wavy var(--w-c) 3px;text-underline-offset:10px;text-decoration-skip-ink:none}
.w-t-aula .w-sec h2::after{display:none}
.w-t-impulso{${OSCURO}--w-r:6px;--w-esp:22px;--w-h1:clamp(2.8rem,10cqw,7rem)}
.w-t-impulso .w-cab h1,.w-t-impulso .w-sec h2{text-transform:uppercase;font-style:italic;font-weight:900;letter-spacing:-.03em}
.w-t-impulso .w-sec:nth-of-type(even){background:linear-gradient(160deg,color-mix(in srgb,var(--w-c) 14%,var(--w-fondo)),var(--w-fondo) 60%)}
.w-t-impulso .w-sec h2::after{width:88px;height:8px;border-radius:0;transform:skewX(-24deg)}
.w-t-impulso .w-s-1>li{border-top:4px solid var(--w-c)}
.w-t-impulso .w-boton{border-radius:var(--w-r);color:var(--w-tinta);text-transform:uppercase;letter-spacing:.04em}
.w-t-impulso .w-boton-lleno{color:var(--w-s)}
.w-t-encuadre{--w-r:0px;--w-esp:32px;--w-h1:clamp(2.4rem,7cqw,5.2rem)}
.w-t-encuadre .w-sec h2{font-family:var(--w-ft-texto);font-size:.8rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--w-suave)}
.w-t-encuadre .w-sec h2::after{width:100%;height:1px;border-radius:0;background:var(--w-borde)}
.w-t-encuadre .w-galeria{gap:4px}
.w-t-encuadre .w-boton{border-radius:0;border-width:1px}
.w-t-cartel{--w-r:0px;--w-sombra:6px 6px 0 var(--w-tinta);--w-borde:var(--w-tinta);--w-esp:22px}
.w-t-cartel .w-sec h2{display:inline-block;padding:2px 10px;background:linear-gradient(transparent 55%,color-mix(in srgb,var(--w-c) 45%,transparent) 55%);text-transform:uppercase;font-weight:900}
.w-t-cartel .w-sec h2::after{display:none}
.w-t-cartel :is(.w-s-3>li,.w-o-2>li,.w-galeria>li,.w-cab-foto){border:3px solid var(--w-tinta);box-shadow:var(--w-sombra)}
.w-t-cartel .w-boton{border-radius:0;border-width:3px;box-shadow:4px 4px 0 var(--w-tinta)}
.w-t-cartel .w-sec:nth-of-type(even){background:color-mix(in srgb,var(--w-c) 8%,var(--w-fondo))}
`;

const CSS_BASICAS = (BASE + VARIANTES + IDENTIDADES).replace(/\n\s*/g, '\n').trim();

/** CSS de todas las plantillas, con ámbito en `.w`: sirve igual en el estudio y en el Shadow DOM. */
export const CSS_WEB = `${CSS_BASICAS}\n${CSS_DISENOS}`;

/** CSS de la página publicada: lo común más solo el diseño de autor elegido (si lo es). */
export function cssWebDe(id: string): string {
  const x = disenoWeb(id);
  return x ? `${CSS_BASICAS}\n${CSS_DISENOS_COMUN}${x.css.replace(/\n\s*/g, '')}` : CSS_BASICAS;
}
