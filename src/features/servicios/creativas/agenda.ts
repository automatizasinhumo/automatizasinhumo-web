import type { Diseno } from './tipos';
import { sector, lema } from './piezas';

/** Ilustración sin foto: tijeras, peine y ondas de pelo dentro del arco. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 400 520" aria-hidden="true" focusable="false">
<rect width="400" height="520" class="f1"/>
<g fill="none" stroke-linecap="round" class="ondas">
<path d="M-20 470C90 400 60 300 170 250S330 150 420 40"/><path d="M-20 510C110 430 90 330 200 290S360 190 430 90"/><path d="M-20 430C70 370 40 270 140 215S300 110 400 0"/>
</g>
<g transform="rotate(-28 210 300)" class="tijera" fill="none" stroke-width="11" stroke-linecap="round">
<circle cx="150" cy="390" r="34"/><circle cx="250" cy="390" r="34"/>
<path d="M170 362 236 150M230 362 164 150"/>
</g>
<circle cx="225" cy="268" r="9" class="f2"/>
<g class="peine"><rect x="70" y="92" width="140" height="22" rx="8"/>${Array.from({ length: 11 }, (_, i) => `<rect x="${78 + i * 12}" y="112" width="6" height="${i % 2 ? 26 : 34}" rx="3"/>`).join('')}</g>
<path class="f2" d="M320 300l7 18 18 7-18 7-7 18-7-18-18-7 18-7zM88 210l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/>
</svg>`;

/** Sello circular con texto que gira (se queda quieto con movimiento reducido). */
const SELLO = `<svg class="w-sello" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><path id="w-agenda-giro" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs><text><textPath href="#w-agenda-giro">Pide tu cita · Pide tu cita · Pide tu cita ·</textPath></text><path d="M60 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/></svg>`;

export const agenda: Diseno = {
  id: 'agenda',
  nombre: 'Agenda',
  descripcion: 'Editorial y cálida, con arcos y tarifa elegante. Para peluquerías, estética y uñas.',
  color: '#c8665c',
  fondoClaro: '#efe3d8',
  fondoOscuro: '#442a3e',
  fuentes: ['ash-fraunces', 'ash-dm-sans'],
  titulo: "'ash-fraunces', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 2,
  galeria: 1,
  opiniones: 1,
  contacto: 1,
  orden: ['servicios', 'galeria', 'opiniones', 'sobre', 'horario', 'preguntas', 'contacto'],
  titulos: { servicios: 'Tarifas', galeria: 'Nuestro trabajo', sobre: 'El salón', opiniones: 'Lo que dicen' },
  muestra: {},
  cabecera: (c) => {
    const { d, esc } = c;
    const visual = c.foto ? `<div class="w-arco">${c.foto}</div>` : `<div class="w-arco">${ILUSTRACION}</div>`;
    const primera = c.horario[0];
    return `<header class="w-cab w-cab-agenda"><div class="w-in w-cab-in"><div class="w-cab-txt">
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
${primera ? `<p class="w-cab-dato">${c.icono('reloj')}<span>${esc(primera[0] ? `${primera[0]}: ${primera[1]}` : primera[1])}</span></p>` : ''}
</div><div class="w-cab-vis">${visual}${c.principal ? SELLO : ''}</div></div></header>`;
  },
  css: `
.w-d-agenda{--w-fondo:#f8f2ec;--w-tinta:#442a3e;--w-suave:#6c5466;--w-borde:#e4d3c7;--w-panel:#efe3d8;--w-r:28px;--w-esp:24px;counter-reset:w-sec}
.w-d-agenda .w-cab{padding-block:clamp(36px,7cqw,96px);background:radial-gradient(60cqw 40cqw at 95% 10%,color-mix(in srgb,var(--w-c) 18%,transparent),transparent 70%),var(--w-fondo)}
.w-d-agenda .w-cab-in{display:grid;gap:clamp(28px,5cqw,64px);align-items:center}
.w-d-agenda .w-cab-txt>*+*{margin-top:clamp(14px,2.2cqw,26px)}
.w-d-agenda .w-cab h1{font-size:min(clamp(3rem,10.5cqw,7.6rem),var(--w-h1-tope,99em));font-weight:380;line-height:.92;letter-spacing:-.045em;text-wrap:balance;font-variation-settings:"opsz" 144}
.w-d-agenda .w-sector{font-family:var(--w-ft-titulo);font-style:italic;font-weight:400;font-size:1.15rem;letter-spacing:0;text-transform:none;color:var(--w-ct)}
.w-d-agenda .w-sector::before{content:"— "}
.w-d-agenda .w-cab .w-lema{font-size:clamp(1.05rem,2cqw,1.3rem);max-width:34ch;color:var(--w-suave)}
.w-d-agenda .w-cab .w-cab-dato{display:inline-flex;gap:10px;align-items:center;padding:10px 16px;border:1px solid var(--w-borde);border-radius:999px;font-size:.92rem}
.w-d-agenda .w-cab-vis{position:relative;max-width:440px;width:100%;justify-self:center}
.w-d-agenda .w-arco{border-radius:999px 999px 24px 24px;overflow:hidden;aspect-ratio:4/5;background:var(--w-panel);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--w-tinta) 45%,transparent);outline:1px solid var(--w-borde);outline-offset:12px}
.w-d-agenda .w-arco img{width:100%;height:100%;object-fit:cover}
.w-d-agenda .w-ilus{width:100%;height:100%}
.w-d-agenda .w-ilus .f1{fill:color-mix(in srgb,var(--w-c) 22%,var(--w-panel))}
.w-d-agenda .w-ilus .f2{fill:var(--w-tinta)}
.w-d-agenda .w-ilus .ondas{stroke:var(--w-fondo);stroke-width:14;opacity:.8}
.w-d-agenda .w-ilus .tijera{stroke:var(--w-tinta)}
.w-d-agenda .w-ilus .peine{fill:var(--w-c)}
.w-d-agenda .w-sello{position:absolute;left:-18px;bottom:8%;width:clamp(96px,18cqw,128px);padding:6px;border-radius:50%;background:var(--w-c);fill:var(--w-s);font:600 11.5px var(--w-ft-texto);letter-spacing:.16em;text-transform:uppercase}
@media (prefers-reduced-motion:no-preference){.w-d-agenda .w-sello text{animation:w-giro 18s linear infinite;transform-origin:60px 60px}}
@keyframes w-giro{to{transform:rotate(360deg)}}
.w-d-agenda .w-boton{border-radius:999px;font-weight:600}
.w-d-agenda .w-sec{counter-increment:w-sec}
.w-d-agenda .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-agenda .w-sec h2{font-size:clamp(2.1rem,6cqw,4rem);font-weight:360;letter-spacing:-.035em;line-height:1}
.w-d-agenda .w-sec h2::before{content:counter(w-sec,decimal-leading-zero);display:block;margin-bottom:10px;font:italic 400 1rem var(--w-ft-titulo);color:var(--w-ct);letter-spacing:0}
.w-d-agenda .w-sec h2::after{display:none}
.w-d-agenda .w-s-2>li,.w-d-agenda .w-s-5>li{padding:22px 0}
.w-d-agenda .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:420;font-size:clamp(1.3rem,2.6cqw,1.7rem)}
.w-d-agenda .w-precio{font-family:var(--w-ft-titulo);font-style:italic;font-weight:500;font-size:1.3rem}
.w-d-agenda .w-galeria>li{border-radius:22px}
.w-d-agenda .w-galeria>li:nth-child(3n+1){border-radius:999px 999px 22px 22px}
.w-d-agenda .w-o-1>li:first-child{border:0;border-radius:40px;background:var(--w-fondo);text-align:center}
.w-d-agenda .w-o-1>li:first-child blockquote{font-weight:360;font-style:italic}
.w-d-agenda .w-opinion blockquote::before{font-size:4.5rem;margin:0 auto 6px}
.w-d-agenda .w-horario tr:nth-child(even){background:transparent}
.w-d-agenda .w-horario th{font-family:var(--w-ft-titulo);font-weight:450;font-size:1.1rem}
.w-d-agenda .w-contacto-grande{font-weight:380}
.w-d-agenda .w-c-1 .w-contacto{border-top-width:1px}
@container (min-width:720px){
  .w-d-agenda .w-cab-in{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}
  .w-d-agenda .w-s-2,.w-d-agenda .w-s-5{column-count:2;column-gap:56px;display:block}
  .w-d-agenda .w-s-2>li,.w-d-agenda .w-s-5>li{break-inside:avoid}
}
`,
};
