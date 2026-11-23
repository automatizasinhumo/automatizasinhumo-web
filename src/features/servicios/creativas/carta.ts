import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: campana de servir con ramita de olivo, como el grabado de una carta antigua. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
<g class="trazo" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M60 170h200"/><path d="M80 170q0-80 80-80t80 80"/><path d="M160 90v-14"/><circle cx="160" cy="70" r="7"/>
<path d="M106 150q10-34 40-44"/><path d="M48 186h224"/>
</g>
<g class="hoja"><path d="M232 66q22-6 30 14-22 6-30-14z"/><path d="M252 44q22 2 22 24-22-2-22-24z"/><path d="M212 86q18-12 32 4-18 12-32-4z"/></g>
<path class="tallo" d="M200 104q30-30 70-68" fill="none"/>
</svg>`;

const ORLA = `<svg class="w-orla" viewBox="0 0 120 16" aria-hidden="true" focusable="false"><path d="M0 8h44M76 8h44"/><path d="M60 2l6 6-6 6-6-6z" class="rombo"/><circle cx="48" cy="8" r="2" class="rombo"/><circle cx="72" cy="8" r="2" class="rombo"/></svg>`;

export const carta: Diseno = {
  id: 'carta-impresa',
  nombre: 'Carta impresa',
  descripcion: 'Carta de restaurante de las de siempre: portada con marco y grabado, platos con precio y punteado, y reseñas como notas. Para restaurantes, cafeterías, tabernas y bares de tapas.',
  color: '#793c37',
  fondoClaro: '#f3e4c8',
  fondoOscuro: '#3b2523',
  capa: { acabado: 'papel' },
  fuentes: ['ash-cormorant', 'ash-dm-sans'],
  titulo: "'ash-cormorant', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 2,
  galeria: 4,
  opiniones: 2,
  contacto: 3,
  orden: ['servicios', 'galeria', 'horario', 'opiniones', 'sobre', 'preguntas', 'contacto'],
  titulos: { servicios: 'La carta', galeria: 'De la cocina', horario: 'Horario de cocina', opiniones: 'Notas de los comensales', sobre: 'La casa', contacto: 'Reservar mesa' },
  muestra: {
    negocio: 'Casa Remedios',
    sector: 'Cocina casera desde 1987',
    lema: 'Guisos de cuchara, pescado del día y postres de la abuela. Menú del día de lunes a viernes.',
    servicios: [
      { nombre: 'Menú del día', precio: '14,50 €', texto: 'Primero, segundo, postre, pan y bebida.' },
      { nombre: 'Fabada asturiana', precio: '12 €', texto: 'Con compango de la casa, los jueves.' },
      { nombre: 'Merluza a la gallega', precio: '18 €', texto: 'Con cachelos y ajada.' },
      { nombre: 'Arroz con leche', precio: '5 €', texto: 'Requemado al momento.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-carta"><div class="w-in"><div class="w-cubierta">
<div class="w-cubierta-txt">${sector(c)}${ORLA}<h1>${esc(d.negocio)}</h1>${ORLA}
${lema(c)}${c.bloqueAcciones}</div>
<div class="w-cubierta-vis">${fotoO(c, ILUSTRACION)}</div>
</div></div></header>`;
  },
  css: `
.w-d-carta-impresa{--w-fondo:#fff7e8;--w-tinta:#2f1d1b;--w-suave:#5e4a45;--w-borde:#dcc6a0;--w-panel:#f3e4c8;--w-oliva:#788264;--w-burdeos:#3b2523;--w-r:2px;--w-esp:24px}
.w-d-carta-impresa .w-cuerpo{background:radial-gradient(circle at 20% 10%,rgb(255 255 255 / .6),transparent 40%),var(--w-fondo)}
.w-d-carta-impresa .w-nav-marca{font-weight:700;font-size:1.35rem;letter-spacing:.02em}
.w-d-carta-impresa .w-cab{background:transparent;padding-block:clamp(26px,5cqw,70px)}
.w-d-carta-impresa .w-cubierta{display:grid;gap:clamp(18px,3cqw,36px);padding:clamp(30px,5cqw,64px);text-align:center;background:var(--w-panel);border:1px solid var(--w-tinta);outline:5px double var(--w-borde);outline-offset:-14px;box-shadow:0 30px 60px -40px rgb(47 29 27 / .6)}
.w-d-carta-impresa .w-cubierta-txt{display:grid;justify-items:center;gap:clamp(10px,2cqw,18px)}
.w-d-carta-impresa .w-sector{color:var(--w-ct);letter-spacing:.24em}
.w-d-carta-impresa .w-orla{width:min(220px,60%);stroke:var(--w-tinta);stroke-width:1.5;fill:none}
.w-d-carta-impresa .w-orla .rombo{fill:var(--w-c);stroke:none}
.w-d-carta-impresa .w-cab h1{font-weight:600;font-size:clamp(3rem,10cqw,7rem);line-height:.9;letter-spacing:-.01em;text-wrap:balance}
.w-d-carta-impresa .w-cab .w-lema{font-family:var(--w-ft-titulo);font-style:italic;font-size:clamp(1.15rem,2.4cqw,1.5rem);max-width:38ch;color:var(--w-suave)}
.w-d-carta-impresa .w-cab .w-acciones{justify-content:center}
.w-d-carta-impresa .w-cubierta-vis{max-width:420px;width:100%;justify-self:center}
.w-d-carta-impresa .w-ilus .trazo{stroke:var(--w-tinta);stroke-width:3}
.w-d-carta-impresa .w-ilus .hoja{fill:var(--w-oliva)}
.w-d-carta-impresa .w-ilus .tallo{stroke:var(--w-oliva);stroke-width:2.5}
.w-d-carta-impresa .w-cab-foto{border:1px solid var(--w-tinta);padding:8px;background:var(--w-fondo)}
.w-d-carta-impresa .w-boton{border-radius:999px;font-weight:600}
.w-d-carta-impresa .w-sec h2{text-align:center;font-weight:600;font-style:italic;font-size:clamp(2.3rem,6cqw,3.8rem)}
.w-d-carta-impresa .w-sec h2::after{margin-inline:auto;width:120px;height:8px;border-radius:0;background:radial-gradient(circle,var(--w-c) 3px,transparent 3.5px) center/16px 8px repeat-x}
.w-d-carta-impresa .w-s-2{max-width:760px;margin-inline:auto}
.w-d-carta-impresa .w-s-2>li{background:transparent;border:0;border-bottom:1px dashed var(--w-borde);border-radius:0;padding:16px 0}
.w-d-carta-impresa .w-servicio-cab{display:flex;align-items:baseline;gap:10px}
.w-d-carta-impresa .w-servicio-cab h3{font-size:clamp(1.35rem,2.6cqw,1.7rem);font-weight:700}
.w-d-carta-impresa .w-servicio-cab::after{content:"";flex:1;order:1;min-width:20px;border-bottom:2px dotted var(--w-suave);transform:translateY(-6px)}
.w-d-carta-impresa .w-servicio-cab .w-precio{order:2;font-family:var(--w-ft-titulo);font-size:1.4rem;font-weight:700;color:var(--w-ct)}
.w-d-carta-impresa .w-servicio p{font-style:italic;color:var(--w-suave)}
.w-d-carta-impresa .w-galeria>li{border-radius:50%;overflow:hidden;border:6px solid var(--w-panel);box-shadow:0 0 0 1px var(--w-borde)}
.w-d-carta-impresa .w-galeria img{aspect-ratio:1}
.w-d-carta-impresa .w-horario-sec{background:var(--w-panel)}
.w-d-carta-impresa .w-horario{max-width:560px;margin-inline:auto;font-family:var(--w-ft-titulo);font-size:1.2rem}
.w-d-carta-impresa .w-opinion{background:#fffdf6;border:1px solid var(--w-borde);border-radius:0;transform:rotate(-.8deg);box-shadow:0 12px 24px -18px rgb(47 29 27 / .6)}
.w-d-carta-impresa .w-opinion:nth-child(even){transform:rotate(.8deg)}
.w-d-carta-impresa .w-opinion blockquote{font-family:var(--w-ft-titulo);font-style:italic;font-size:1.2rem}
.w-d-carta-impresa .w-contacto-sec{background:var(--w-burdeos);color:#fff7e8;--w-fondo:#3b2523;--w-tinta:#fff7e8;--w-suave:#e8d6c6;--w-borde:#6a4a46;--w-panel:#3b2523;--w-ct:var(--w-ct-oscuro)}
.w-d-carta-impresa .w-contacto-grande{font-family:var(--w-ft-titulo);font-style:italic}
.w-d-carta-impresa .w-pie{text-align:center}
@container (min-width:760px){
  .w-d-carta-impresa .w-cubierta{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:center}
}
`,
};
