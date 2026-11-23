import type { Diseno } from './tipos';

/** Sin foto: kettlebell y pesa en bloque con líneas de velocidad. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 420 380" aria-hidden="true" focusable="false">
<g class="vel" stroke-linecap="round"><path d="M20 120h120M40 160h90M10 200h110M50 240h70"/></g>
<g class="kb"><path d="M230 70a60 60 0 0 1 60 60v8h-26v-8a34 34 0 0 0-68 0v8h-26v-8a60 60 0 0 1 60-60z"/><circle cx="230" cy="238" r="98"/></g>
<text x="230" y="262" text-anchor="middle" class="kg">24</text>
<g class="pesa"><rect x="300" y="300" width="100" height="16" rx="4"/><rect x="292" y="282" width="18" height="52" rx="4"/><rect x="390" y="282" width="18" height="52" rx="4"/></g>
</svg>`;

export const pulso: Diseno = {
  id: 'pulso',
  nombre: 'Pulso',
  descripcion: 'Energía de cartel: titular gigante, diagonales, cinta en movimiento y números enormes. Para gimnasios, entrenadores, deporte y baile.',
  color: '#d5f035',
  fondoClaro: '#e4e4e4',
  fondoOscuro: '#1a1a1a',
  fuentes: ['ash-anton', 'ash-manrope'],
  titulo: "'ash-anton', Impact, 'Arial Narrow', sans-serif",
  texto: "'ash-manrope', system-ui, sans-serif",
  servicios: 4,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'galeria', 'horario', 'opiniones', 'sobre', 'preguntas', 'contacto'],
  titulos: { servicios: 'Entrena', galeria: 'Sala', horario: 'Horario', opiniones: 'Socios', sobre: 'Nosotros', contacto: 'Empieza hoy' },
  muestra: {
    negocio: 'Box Norte',
    sector: 'Entrenamiento funcional',
    lema: 'Grupos pequeños, técnica de verdad y nadie entrena solo.',
    servicios: [
      { nombre: 'Funcional', precio: '45 €/mes', texto: 'Clases de 50 minutos en grupos de 10.' },
      { nombre: 'Halterofilia', precio: '55 €/mes', texto: 'Técnica de arrancada y dos tiempos.' },
      { nombre: 'Entreno personal', precio: '30 €', texto: 'Sesión individual con plan propio.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-pulso"><div class="w-in w-cab-in"><div class="w-cab-txt">
${d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : ''}<h1><span>${esc(d.negocio)}</span><span class="w-eco" aria-hidden="true">${esc(d.negocio)}</span></h1>
${d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : ''}${c.bloqueAcciones}
</div><div class="w-cab-vis">${c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : ILUSTRACION}</div></div></header>`;
  },
  tras: (c) => {
    const nombres = c.d.servicios.map((s) => s.nombre).filter(Boolean);
    if (nombres.length < 2) return '';
    const fila = nombres.map((n) => `<span>${c.esc(n)}</span>`).join('');
    return `<div class="w-cinta" aria-hidden="true"><div class="w-cinta-in">${fila}${fila}${fila}${fila}</div></div>`;
  },
  css: `
.w-d-pulso{--w-fondo:#efefef;--w-tinta:#111;--w-suave:#3d3d3d;--w-borde:#cfcfcf;--w-panel:#e4e4e4;--w-negro:#111;--w-r:0px;--w-esp:22px;counter-reset:w-srv}
.w-d-pulso .w-nav{background:var(--w-negro);color:#fff}
.w-d-pulso .w-nav .w-boton{color:#fff}
.w-d-pulso .w-nav .w-boton-lleno{color:var(--w-s)}
.w-d-pulso .w-cab{position:relative;overflow:hidden;background:var(--w-negro);color:#fff;padding-block:clamp(40px,7cqw,100px) clamp(70px,10cqw,140px);clip-path:polygon(0 0,100% 0,100% calc(100% - 6cqw),0 100%)}
.w-d-pulso .w-cab::before{content:"";position:absolute;right:-12cqw;top:-10%;width:52cqw;height:130%;background:var(--w-c);transform:skewX(-14deg);opacity:.95}
.w-d-pulso .w-cab-in{position:relative;display:grid;gap:clamp(24px,4cqw,48px);align-items:end}
.w-d-pulso .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-pulso .w-sector{display:inline-block;background:var(--w-c);color:var(--w-s);padding:4px 10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;font-size:.8rem}
.w-d-pulso .w-cab h1{position:relative;margin-bottom:.12em;overflow-wrap:normal;hyphens:auto;font-weight:400;font-size:clamp(3.4rem,15cqw,11rem);line-height:.86;text-transform:uppercase;letter-spacing:-.01em;text-wrap:balance}
.w-d-pulso .w-cab h1 .w-eco{position:absolute;left:.06em;top:.06em;z-index:-1;color:transparent;-webkit-text-stroke:2px var(--w-c)}
.w-d-pulso .w-cab .w-lema{font-size:clamp(1.08rem,2.2cqw,1.4rem);font-weight:600;max-width:32ch;color:#e6e6e6}
.w-d-pulso .w-boton{border-radius:0;text-transform:uppercase;letter-spacing:.08em;font-weight:800;color:#fff;border-width:2px}
.w-d-pulso .w-boton-lleno{color:var(--w-s)}
.w-d-pulso .w-barra .w-boton:not(.w-boton-lleno){color:var(--w-tinta);border-color:var(--w-tinta)}
@container (max-width:759px){.w-d-pulso .w-cab-vis{max-width:240px;justify-self:end}}
.w-d-pulso .w-cab-vis{min-width:0;position:relative}
.w-d-pulso .w-ilus{width:100%}
.w-d-pulso .w-ilus .vel{stroke:#fff;stroke-width:10}
.w-d-pulso .w-ilus .kb{fill:var(--w-negro)}
.w-d-pulso .w-ilus .kg{font:400 70px var(--w-ft-titulo);fill:var(--w-c)}
.w-d-pulso .w-ilus .pesa{fill:#fff}
.w-d-pulso .w-cab-foto{margin:0;clip-path:polygon(8% 0,100% 0,92% 100%,0 100%);filter:grayscale(1) contrast(1.15)}
.w-d-pulso .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-pulso .w-cinta{margin-top:-3cqw;position:relative;transform:rotate(-2deg);background:var(--w-c);color:var(--w-s);overflow:hidden;white-space:nowrap;border-block:3px solid var(--w-negro)}
.w-d-pulso .w-cinta-in{display:inline-flex;gap:28px;padding:12px 0;font:400 clamp(1.4rem,3.4cqw,2.2rem) var(--w-ft-titulo);text-transform:uppercase}
.w-d-pulso .w-cinta span::after{content:"✦";margin-left:28px}
@media (prefers-reduced-motion:no-preference){.w-d-pulso .w-cinta-in{animation:w-cinta-p 22s linear infinite}}
@keyframes w-cinta-p{to{transform:translateX(-50%)}}
.w-d-pulso .w-sec h2{font-weight:400;text-transform:uppercase;font-size:clamp(2.8rem,10cqw,6rem);line-height:.9}
.w-d-pulso .w-sec h2::after{display:none}
.w-d-pulso .w-sec:nth-of-type(even){background:var(--w-negro);color:#fff;--w-suave:#cfcfcf;--w-borde:#333;--w-panel:#1a1a1a;--w-ct:var(--w-ct-oscuro)}
.w-d-pulso .w-servicios>li{counter-increment:w-srv;position:relative;border-radius:0;border:0;border-top:3px solid currentColor;padding-top:clamp(56px,8cqw,90px);background:transparent}
.w-d-pulso .w-servicios>li::before{content:counter(w-srv,decimal-leading-zero);position:absolute;top:6px;left:0;font:400 clamp(3.4rem,8cqw,5.4rem)/1 var(--w-ft-titulo);color:transparent;-webkit-text-stroke:2px currentColor}
.w-d-pulso .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:400;text-transform:uppercase;font-size:clamp(1.5rem,3cqw,2rem)}
.w-d-pulso .w-precio{background:var(--w-c);color:var(--w-s);border-radius:0;font-weight:800}
.w-d-pulso .w-galeria>li{border-radius:0;filter:grayscale(.6)}
.w-d-pulso .w-opinion{border-radius:0;border:0;border-left:6px solid var(--w-c);background:transparent}
.w-d-pulso .w-horario th{text-transform:uppercase;letter-spacing:.06em}
.w-d-pulso .w-horario tr:nth-child(even){background:transparent}
.w-d-pulso .w-contacto-cta{border-radius:0;background:var(--w-c);color:var(--w-s)}
.w-d-pulso .w-contacto-cta .w-boton{color:var(--w-s);border-color:var(--w-s)}
.w-d-pulso .w-contacto-cta .w-boton-lleno{background:var(--w-negro);color:#fff;border-color:var(--w-negro)}
.w-d-pulso .w-contacto-grande{font-family:var(--w-ft-titulo);font-weight:400}
.w-d-pulso .w-contacto-grande a{color:inherit}
@container (min-width:760px){
  .w-d-pulso .w-cab-in{grid-template-columns:minmax(0,1.35fr) minmax(0,.65fr)}
}
`,
};
