import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/** Sin foto: alzado de una casa con cotas, como en un plano de proyecto. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 440 340" aria-hidden="true" focusable="false">
<g class="linea" fill="none" stroke-linejoin="round">
<path d="M70 300V150l120-90 120 90v150z"/><path d="M40 300h360"/>
<rect x="110" y="190" width="50" height="50"/><path d="M135 190v50M110 215h50"/>
<rect x="220" y="200" width="50" height="100"/><circle cx="260" cy="252" r="4"/>
<path d="M250 98V60h26v58"/>
</g>
<g class="cota" fill="none"><path d="M70 322h240M70 314v16M310 314v16"/><path d="M342 150v150M334 150h16M334 300h16"/></g>
<text x="190" y="338" class="txt" text-anchor="middle">8,40 m</text><text x="362" y="230" class="txt">4,20</text>
<path class="acento" d="M190 60l120 90H70z" opacity=".22"/>
<circle cx="380" cy="60" r="26" class="linea" fill="none"/><path class="acento" d="M380 38l8 22h-16z"/><text x="380" y="98" class="txt" text-anchor="middle">N</text>
</svg>`;

export const expediente: Diseno = {
  id: 'expediente',
  nombre: 'Expediente',
  descripcion: 'Plano de proyecto: cuadrícula técnica, cajetín con los datos y partidas numeradas. Para reformas, construcción, electricistas y fontaneros.',
  color: '#ba6547',
  fondoClaro: '#e9e2d5',
  fondoOscuro: '#323838',
  fuentes: ['ash-big-shoulders', 'ash-archivo'],
  titulo: "'ash-big-shoulders', 'Arial Narrow', sans-serif",
  texto: "'ash-archivo', system-ui, sans-serif",
  servicios: 4,
  galeria: 3,
  opiniones: 2,
  contacto: 4,
  orden: ['servicios', 'galeria', 'zonas', 'opiniones', 'sobre', 'horario', 'preguntas', 'contacto'],
  titulos: { servicios: 'Partidas', galeria: 'Obras terminadas', zonas: 'Dónde trabajamos', opiniones: 'Clientes', sobre: 'La empresa', contacto: 'Pide presupuesto' },
  muestra: {
    negocio: 'Reformas Duero',
    sector: 'Reformas integrales',
    lema: 'Presupuesto cerrado por escrito, un solo interlocutor y la obra limpia cada tarde.',
    zonas: 'Valladolid, Laguna de Duero, Arroyo, Simancas',
    servicios: [
      { nombre: 'Reforma de baño', precio: 'desde 5.900 €', texto: 'Plato de ducha, alicatado, sanitarios y fontanería nueva en 10 días.' },
      { nombre: 'Reforma de cocina', precio: 'desde 8.500 €', texto: 'Muebles, encimera, electricidad y gas certificados.' },
      { nombre: 'Reforma integral', precio: 'presupuesto cerrado', texto: 'Proyecto, licencias y dirección de obra para pisos y casas.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const fila = (k: string, v: string) => (v ? `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>` : '');
    const cajetin = `<dl class="w-cajetin">${fila('Proyecto', d.sector)}${fila('Zona', c.zonas[0] ?? '')}${fila('Contacto', d.telefono || d.whatsapp || d.email)}${fila('Escala', '1:50')}</dl>`;
    return `<header class="w-cab w-cab-expediente"><div class="w-in w-cab-in"><div class="w-cab-txt">
<p class="w-ref" aria-hidden="true">Ref. 01 · Alzado</p><h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, `<div class="w-lamina">${ILUSTRACION}</div>`)}${cajetin}</div></div></header>`;
  },
  css: `
.w-d-expediente{--w-fondo:#e9e2d5;--w-tinta:#282d2d;--w-suave:#4b5050;--w-borde:#c7bfae;--w-panel:#f3eee4;--w-grafito:#282d2d;--w-r:2px;--w-esp:22px;--w-reja:color-mix(in srgb,var(--w-tinta) 9%,transparent)}
.w-d-expediente .w-cuerpo{background-image:linear-gradient(var(--w-reja) 1px,transparent 1px),linear-gradient(90deg,var(--w-reja) 1px,transparent 1px);background-size:24px 24px}
.w-d-expediente .w-nav{background:var(--w-grafito);color:#f3eee4;border-bottom:0}
.w-d-expediente .w-nav-marca{text-transform:uppercase;letter-spacing:.06em;font-weight:800}
.w-d-expediente .w-cab{background:transparent;padding-block:clamp(30px,6cqw,80px)}
.w-d-expediente .w-cab-in{display:grid;gap:clamp(24px,4cqw,52px);align-items:end}
.w-d-expediente .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,22px)}
.w-d-expediente .w-ref{font:600 .78rem/1 var(--w-ft-texto);letter-spacing:.2em;text-transform:uppercase;color:var(--w-suave)}
.w-d-expediente .w-ref::before{content:"";display:inline-block;width:28px;height:2px;margin-right:10px;vertical-align:middle;background:var(--w-c)}
.w-d-expediente .w-cab h1{--w-em-letra:.9;font-weight:800;font-size:min(clamp(3.4rem,13cqw,9.5rem),var(--w-h1-tope,99em));line-height:.86;letter-spacing:-.01em;text-transform:uppercase}
.w-d-expediente .w-cab .w-lema{max-width:42ch;color:var(--w-suave)}
.w-d-expediente .w-boton{border-radius:2px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:.88rem}
.w-d-expediente .w-cab-vis{display:grid;gap:0;border:2px solid var(--w-tinta);background:var(--w-panel)}
.w-d-expediente .w-lamina{padding:clamp(14px,3cqw,28px)}
.w-d-expediente .w-cab-foto{border-radius:0}
.w-d-expediente .w-ilus .linea{stroke:var(--w-tinta);stroke-width:3}
.w-d-expediente .w-ilus .cota{stroke:var(--w-c);stroke-width:2}
.w-d-expediente .w-ilus .acento{fill:var(--w-c)}
.w-d-expediente .w-ilus .txt{fill:var(--w-tinta);font:600 13px var(--w-ft-texto)}
.w-d-expediente .w-cajetin{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));margin:0;border-top:2px solid var(--w-tinta)}
.w-d-expediente .w-cajetin>div{padding:10px 14px;border-right:1px solid var(--w-borde);border-bottom:1px solid var(--w-borde);min-width:0}
.w-d-expediente .w-cajetin dt{font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--w-suave)}
.w-d-expediente .w-cajetin dd{margin:2px 0 0;font-weight:600;overflow-wrap:anywhere}
.w-d-expediente .w-sec{border-top:2px solid var(--w-tinta)}
.w-d-expediente .w-sec h2{display:flex;align-items:baseline;gap:14px;font-weight:800;font-size:clamp(2.2rem,6.5cqw,4.2rem);line-height:.9;text-transform:uppercase}
.w-d-expediente .w-sec h2::before{content:"§";font-weight:400;color:var(--w-ct)}
.w-d-expediente .w-sec h2::after{display:none}
.w-d-expediente .w-s-4>li{grid-template-columns:72px minmax(0,1fr);background:var(--w-panel);padding:22px;margin-bottom:10px;border:1px solid var(--w-borde);border-left:4px solid var(--w-c)}
.w-d-expediente .w-s-4>li::before{font-size:2.2rem;font-weight:800;color:var(--w-ct)}
.w-d-expediente .w-servicio h3{text-transform:uppercase;font-weight:800;font-size:clamp(1.4rem,2.8cqw,1.8rem);letter-spacing:.01em}
.w-d-expediente .w-precio{font-family:var(--w-ft-texto);font-size:.95rem}
.w-d-expediente .w-galeria>li{border:2px solid var(--w-tinta);border-radius:0}
.w-d-expediente .w-zonas>li{border-radius:2px;border:2px solid var(--w-tinta);background:var(--w-panel);text-transform:uppercase;letter-spacing:.06em;font-size:.85rem}
.w-d-expediente .w-zonas>li::before{content:"◎ ";color:var(--w-ct)}
.w-d-expediente .w-opiniones-sec,.w-d-expediente .w-contacto-sec{background:var(--w-grafito);color:#f3eee4;--w-tinta:#f3eee4;--w-suave:#c5c9c6;--w-borde:#4c5353;--w-panel:#323838;--w-ct:var(--w-ct-oscuro);--w-reja:rgb(255 255 255 / .05);background-image:linear-gradient(var(--w-reja) 1px,transparent 1px),linear-gradient(90deg,var(--w-reja) 1px,transparent 1px);background-size:24px 24px}
.w-d-expediente .w-opinion{border-radius:0;border:1px solid var(--w-borde)}
.w-d-expediente .w-autor{text-transform:uppercase;letter-spacing:.12em}
.w-d-expediente .w-c-4 .w-contacto>li{border-radius:0}
.w-d-expediente .w-contacto-grande{font-weight:800;text-transform:uppercase}
@container (min-width:760px){
  .w-d-expediente .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w-d-expediente .w-cab h1{font-size:min(clamp(3.4rem,7.6cqw,6.6rem),var(--w-h1-tope,99em))}
  .w-d-expediente .w-s-4{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;display:grid}
  .w-d-expediente .w-s-4>li{margin:0}
  .w-d-expediente .w-s-4[data-n="1"],.w-d-expediente .w-s-4[data-n="3"]>li:first-child{grid-column:1/-1}
  .w-d-expediente .w-c-4{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
}
`,
};
