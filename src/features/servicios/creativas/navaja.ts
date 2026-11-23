import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: poste de barbero con su espiral y navaja abierta, en tinta de imprenta. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 400 500" aria-hidden="true" focusable="false">
<defs><clipPath id="w-navaja-poste"><rect x="150" y="70" width="100" height="330" rx="50"/></clipPath></defs>
<rect x="132" y="40" width="136" height="34" rx="10" class="tinta"/><rect x="132" y="396" width="136" height="34" rx="10" class="tinta"/>
<rect x="150" y="70" width="100" height="330" rx="50" class="papel"/>
<g clip-path="url(#w-navaja-poste)" class="raya">${Array.from({ length: 9 }, (_, i) => `<path d="M140 ${60 + i * 48}l120 -70v34l-120 70z"/>`).join('')}</g>
<rect x="150" y="70" width="100" height="330" rx="50" fill="none" class="borde"/>
<g transform="rotate(-24 300 420)" class="navaja"><rect x="230" y="404" width="150" height="26" rx="6" class="tinta"/><path d="M230 404h-90q-26 0-26 13t26 13h90z" class="hoja"/></g>
<path class="tinta" d="M70 150l7 18 18 7-18 7-7 18-7-18-18-7 18-7zM330 120l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/>
</svg>`;

export const navaja: Diseno = {
  id: 'navaja',
  nombre: 'Póster',
  descripcion: 'Cartel de barbería de siempre: letra condensada enorme, rayas del poste y tarifa en pizarra. Para barberías y peluquerías de caballero.',
  color: '#dc4a37',
  fondoClaro: '#e5dac6',
  fondoOscuro: '#24221f',
  capa: { acabado: 'relieve' },
  fuentes: ['ash-bebas', 'ash-archivo'],
  titulo: "'ash-bebas', Impact, 'Arial Narrow', sans-serif",
  texto: "'ash-archivo', system-ui, sans-serif",
  servicios: 2,
  galeria: 4,
  opiniones: 2,
  contacto: 3,
  orden: ['servicios', 'horario', 'galeria', 'opiniones', 'sobre', 'preguntas', 'contacto'],
  titulos: { servicios: 'Tarifa', galeria: 'Cortes de la casa', horario: 'Abrimos', opiniones: 'Clientes', sobre: 'La barbería', contacto: 'Pide tu turno' },
  muestra: {
    negocio: 'Barbería Tomás',
    sector: 'Barbería clásica',
    lema: 'Navaja, toalla caliente y conversación. Desde 1987 en el mismo sillón.',
    servicios: [
      { nombre: 'Corte clásico', precio: '14 €', texto: 'Tijera y máquina, lavado incluido.' },
      { nombre: 'Arreglo de barba', precio: '10 €', texto: 'Perfilado a navaja con toalla caliente.' },
      { nombre: 'Afeitado tradicional', precio: '16 €', texto: 'Brocha, jabón y aceite de cierre.' },
      { nombre: 'Corte + barba', precio: '22 €', texto: 'El servicio completo, con toalla caliente y masaje.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-navaja"><div class="w-in w-cab-in"><div class="w-cab-txt">
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  tras: (c) => {
    const nombres = c.d.servicios.map((s) => s.nombre).filter(Boolean).slice(0, 4);
    return `<div class="w-poste" aria-hidden="true"><div class="w-in">${nombres.map((n) => `<span>${c.esc(n)}</span>`).join('')}</div></div>`;
  },
  css: `
.w-d-navaja{--w-fondo:#efe6d6;--w-tinta:#181715;--w-suave:#4a443c;--w-borde:#cfc2ab;--w-panel:#e5dac6;--w-pizarra:#181715;--w-r:4px;--w-esp:22px}
.w-d-navaja .w-nav{background:var(--w-fondo);border-bottom:3px double var(--w-tinta)}
.w-d-navaja .w-nav-marca{font-size:1.6rem;font-weight:400;letter-spacing:.04em}
.w-d-navaja .w-cab{padding-block:clamp(34px,6cqw,84px);background:radial-gradient(circle at 20% 0%,#f6efe2,transparent 60%),var(--w-fondo);border-bottom:3px double var(--w-tinta)}
.w-d-navaja .w-cab-in{display:grid;gap:clamp(20px,4cqw,56px);align-items:center}
.w-d-navaja .w-cab-txt{text-align:center}
.w-d-navaja .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,22px)}
.w-d-navaja .w-sector{display:flex;align-items:center;gap:14px;justify-content:center;font-weight:700;letter-spacing:.3em;color:var(--w-tinta)}
.w-d-navaja .w-sector::before,.w-d-navaja .w-sector::after{content:"";flex:0 1 60px;height:2px;background:var(--w-tinta)}
.w-d-navaja .w-cab h1{--w-em-letra:.9;font-weight:400;font-size:min(clamp(4rem,17cqw,12.5rem),var(--w-h1-tope,99em));line-height:.84;letter-spacing:.01em;text-transform:uppercase;color:var(--w-tinta);text-shadow:4px 4px 0 var(--w-c)}
.w-d-navaja .w-cab .w-lema{margin-inline:auto;max-width:36ch;font-size:clamp(1.05rem,2cqw,1.25rem);color:var(--w-suave)}
.w-d-navaja .w-acciones{justify-content:center}
.w-d-navaja .w-boton{border-radius:4px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:.9rem;border-width:2px}
.w-d-navaja .w-boton-lleno{box-shadow:4px 4px 0 var(--w-tinta)}
.w-d-navaja .w-cab-vis{max-width:360px;width:100%;justify-self:center}
.w-d-navaja .w-cab-foto{border:3px solid var(--w-tinta);border-radius:4px;box-shadow:10px 10px 0 var(--w-c)}
.w-d-navaja .w-cab-foto img{aspect-ratio:4/5}
.w-d-navaja .w-ilus .tinta{fill:var(--w-tinta)}
.w-d-navaja .w-ilus .papel{fill:#fbf6ec}
.w-d-navaja .w-ilus .raya{fill:var(--w-c)}
.w-d-navaja .w-ilus .borde{stroke:var(--w-tinta);stroke-width:8}
.w-d-navaja .w-ilus .hoja{fill:#bdb4a4}
.w-d-navaja .w-poste{height:30px;overflow:hidden;background:repeating-linear-gradient(-45deg,var(--w-c) 0 22px,#fbf6ec 22px 44px,var(--w-tinta) 44px 66px,#fbf6ec 66px 88px);border-bottom:3px solid var(--w-tinta)}
.w-d-navaja .w-poste .w-in{display:none}
.w-d-navaja .w-sec h2{font-weight:400;font-size:clamp(2.6rem,8cqw,5rem);line-height:.9;text-transform:uppercase;letter-spacing:.02em;text-align:center}
.w-d-navaja .w-sec h2::after{width:120px;height:6px;margin:14px auto 0;border-radius:0;background:repeating-linear-gradient(-45deg,var(--w-c) 0 6px,transparent 6px 12px)}
.w-d-navaja .w-servicios-sec{background:var(--w-pizarra);color:#f4ede0;--w-suave:#c9c0b0;--w-borde:#4a4640;--w-panel:#24221f;--w-ct:var(--w-ct-oscuro)}
.w-d-navaja .w-servicios-sec .w-in{max-width:760px}
.w-d-navaja .w-servicios-sec h2{color:#f4ede0}
.w-d-navaja .w-s-2 h3,.w-d-navaja .w-s-5 h3{font-family:var(--w-ft-titulo);font-weight:400;font-size:clamp(1.7rem,4cqw,2.4rem);letter-spacing:.03em;text-transform:uppercase}
.w-d-navaja .w-s-2 h3::after{border-bottom:3px dotted var(--w-borde)}
.w-d-navaja .w-precio{font-family:var(--w-ft-titulo);font-weight:400;font-size:clamp(1.8rem,4cqw,2.6rem)}
.w-d-navaja .w-horario{margin-inline:auto;font-size:1.05rem}
.w-d-navaja .w-horario th{font-family:var(--w-ft-titulo);font-weight:400;font-size:1.5rem;letter-spacing:.04em;text-transform:uppercase}
.w-d-navaja .w-horario-sec .w-in{display:grid;justify-items:center}
.w-d-navaja .w-galeria>li{border:3px solid var(--w-tinta);border-radius:4px;filter:grayscale(.25) contrast(1.05)}
.w-d-navaja .w-opiniones-sec{background:var(--w-panel)}
.w-d-navaja .w-opinion{background:var(--w-fondo);border:2px solid var(--w-tinta);box-shadow:6px 6px 0 var(--w-tinta);border-radius:4px}
.w-d-navaja .w-autor{text-transform:uppercase;letter-spacing:.14em}
.w-d-navaja .w-contacto-sec{background:var(--w-pizarra);color:#f4ede0;--w-suave:#c9c0b0;--w-borde:#4a4640;--w-panel:#24221f;--w-tinta:#f4ede0;--w-ct:var(--w-ct-oscuro)}
.w-d-navaja .w-contacto-grande{font-weight:400;text-transform:uppercase}
.w-d-navaja .w-pie{border-top:3px double var(--w-tinta)}
@container (min-width:760px){
  .w-d-navaja .w-cab-in{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr)}
  .w-d-navaja .w-cab-txt{text-align:left}
  .w-d-navaja .w-sector{justify-content:flex-start}
  .w-d-navaja .w-sector::before{display:none}
  .w-d-navaja .w-cab .w-lema{margin-inline:0}
  .w-d-navaja .w-acciones{justify-content:flex-start}
  .w-d-navaja .w-poste .w-in{display:flex;gap:8px;justify-content:space-around;height:100%;align-items:center}
  .w-d-navaja .w-poste span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;background:var(--w-tinta);color:#fbf6ec;padding:0 12px;font:400 1.1rem/30px var(--w-ft-titulo);letter-spacing:.1em;text-transform:uppercase}
}
`,
};
