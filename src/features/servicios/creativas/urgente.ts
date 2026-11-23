import type { Diseno } from './tipos';

/** Sin foto: plano de tuberías y cableado con una llave inglesa, en trazo técnico. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 480 420" aria-hidden="true" focusable="false">
<defs><pattern id="w-urg-rejilla" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0v24" fill="none" class="rej"/></pattern></defs>
<rect width="480" height="420" fill="url(#w-urg-rejilla)"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round" class="tubo">
<path d="M-10 300H140a30 30 0 0 0 30-30V120a30 30 0 0 1 30-30h290"/>
<path d="M-10 350H260a30 30 0 0 0 30-30V200h200"/>
</g>
<g class="union"><rect x="152" y="180" width="36" height="26" rx="4"/><rect x="272" y="236" width="36" height="26" rx="4"/><rect x="330" y="77" width="26" height="26" rx="4"/></g>
<g fill="none" stroke-linecap="round" class="cable"><path d="M40 40c60 0 60 60 120 60s60-60 120-60 60 60 120 60"/><path d="M40 70c60 0 60 60 120 60"/></g>
<g transform="rotate(-35 360 300)" class="llave"><path d="M300 288h110v24H300z"/><path d="M410 276a36 36 0 1 1 0 48l18-10v-28z"/></g>
<circle cx="140" cy="300" r="7" class="punto"/><circle cx="290" cy="200" r="7" class="punto"/>
</svg>`;

export const urgente: Diseno = {
  id: 'urgente',
  nombre: 'Urgente',
  descripcion: 'Teléfono siempre a mano, zonas y trabajos en mosaico. Para fontanería, electricidad, cerrajería y reparaciones.',
  color: '#f6c64b',
  fondoClaro: '#eef2f6',
  fondoOscuro: '#172b42',
  fuentes: ['ash-archivo-black', 'ash-archivo'],
  titulo: "'ash-archivo-black', 'Arial Black', system-ui, sans-serif",
  texto: "'ash-archivo', system-ui, sans-serif",
  servicios: 1,
  galeria: 4,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'zonas', 'opiniones', 'galeria', 'horario', 'preguntas', 'sobre', 'contacto'],
  titulos: { servicios: 'Qué arreglamos', zonas: 'Dónde llegamos', galeria: 'Trabajos hechos', sobre: 'Quiénes somos' },
  muestra: {
    negocio: 'Fontanería Ríos',
    sector: 'Fontanería y calefacción',
    lema: 'Fugas, atascos y calderas. Llegamos hoy.',
    zonas: 'Vigo, Redondela, Cangas, Moaña',
    servicios: [
      { nombre: 'Fugas y averías', precio: '', texto: 'Localizamos la fuga y la reparamos sin romper de más.' },
      { nombre: 'Desatascos', precio: '', texto: 'Fregaderos, baños y bajantes.' },
      { nombre: 'Calderas', precio: '', texto: 'Revisión, puesta en marcha y reparación.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const zonas = c.zonas.length
      ? `<p class="w-cab-zonas">${c.icono('zona')}<span>${c.zonas.map((z) => esc(z)).join('<i aria-hidden="true"> / </i>')}</span></p>`
      : '';
    return `<header class="w-cab w-cab-urgente${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${d.sector ? `<p class="w-sector"><span class="w-luz" aria-hidden="true"></span>${esc(d.sector)}</p>` : ''}<h1>${esc(d.negocio)}</h1>
${d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : ''}${c.bloqueAcciones}${zonas}
</div><div class="w-cab-vis">${c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : ILUSTRACION}</div></div></header>`;
  },
  // Cinta superior con el teléfono, antes incluso de la portada (va dentro del header en el DOM: ver tras).
  tras: (c) =>
    c.zonas.length > 2
      ? `<div class="w-cinta" aria-hidden="true"><div class="w-cinta-in">${Array.from({ length: 2 }, () => c.zonas.map((z) => `<span>${c.esc(z)}</span>`).join('')).join('')}</div></div>`
      : '',
  css: `
.w-d-urgente{--w-fondo:#fafbfc;--w-tinta:#172b42;--w-suave:#4a5a6e;--w-borde:#d8dfe7;--w-panel:#eef2f6;--w-navy:#172b42;--w-r:6px;--w-esp:22px;counter-reset:w-srv}
.w-d-urgente .w-nav{background:var(--w-navy);color:#fff;border-bottom:4px solid var(--w-c)}
.w-d-urgente .w-nav .w-boton{color:#fff}
.w-d-urgente .w-nav .w-boton-lleno{color:var(--w-s)}
.w-d-urgente .w-cab{position:relative;overflow:hidden;background:var(--w-navy);color:#fff;padding-block:clamp(36px,6cqw,90px)}
.w-d-urgente .w-cab::before{content:"";position:absolute;inset:auto 0 0 0;height:14px;background:repeating-linear-gradient(-45deg,var(--w-c) 0 18px,var(--w-navy) 18px 36px)}
.w-d-urgente .w-cab-in{display:grid;gap:clamp(26px,5cqw,56px);align-items:center}
.w-d-urgente .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,24px)}
.w-d-urgente .w-sector{display:inline-flex;align-items:center;gap:10px;padding:6px 12px;border:1px solid #ffffff40;border-radius:4px;color:#fff;font-weight:600;letter-spacing:.1em}
.w-d-urgente .w-luz{width:10px;height:10px;border-radius:50%;background:var(--w-c);box-shadow:0 0 0 4px color-mix(in srgb,var(--w-c) 30%,transparent)}
@media (prefers-reduced-motion:no-preference){.w-d-urgente .w-luz{animation:w-late 1.6s ease-in-out infinite}}
@keyframes w-late{50%{box-shadow:0 0 0 9px transparent}}
.w-d-urgente .w-cab h1{font-size:clamp(2.4rem,7.6cqw,5.2rem);overflow-wrap:normal;hyphens:auto;line-height:.95;letter-spacing:-.02em;text-transform:uppercase;text-wrap:balance}
.w-d-urgente .w-cab .w-lema{font-size:clamp(1.1rem,2.3cqw,1.45rem);color:#d6dee8;max-width:36ch}
.w-d-urgente .w-cab .w-boton{color:#fff;border-radius:6px}
.w-d-urgente .w-cab .w-boton-lleno{color:var(--w-s)}
.w-d-urgente .w-cab .w-boton{min-height:56px;padding-inline:24px}
.w-d-urgente .w-cab .w-acciones a[href^="tel:"]{font-family:var(--w-ft-titulo);font-size:1.15rem;letter-spacing:.02em}
.w-d-urgente .w-cab-zonas{display:flex;gap:10px;align-items:flex-start;font-weight:600;color:#fff}
.w-d-urgente .w-cab-zonas .w-ico{color:var(--w-c)}
.w-d-urgente .w-cab-zonas i{font-style:normal;color:var(--w-c)}
.w-d-urgente .w-cab-vis{min-width:0}
.w-d-urgente .w-ilus{border:1px solid #ffffff2a;border-radius:8px;background:#1d3550}
.w-d-urgente .w-ilus .rej{stroke:#ffffff14}
.w-d-urgente .w-ilus .tubo{stroke:#d6dee8;stroke-width:16}
.w-d-urgente .w-ilus .union{fill:var(--w-c)}
.w-d-urgente .w-ilus .cable{stroke:var(--w-c);stroke-width:5;stroke-dasharray:2 12}
.w-d-urgente .w-ilus .llave{fill:#fff}
.w-d-urgente .w-ilus .punto{fill:var(--w-c)}
.w-d-urgente .w-cab-foto{border-radius:8px;border:6px solid var(--w-c);margin:0;overflow:hidden}
.w-d-urgente .w-cab-foto img{width:100%;aspect-ratio:4/3;object-fit:cover}
.w-d-urgente .w-cinta{overflow:hidden;background:var(--w-c);color:var(--w-s);font:400 1.05rem var(--w-ft-titulo);text-transform:uppercase;white-space:nowrap}
.w-d-urgente .w-cinta-in{display:inline-flex;gap:38px;padding:12px 0}
.w-d-urgente .w-cinta span::after{content:"●";margin-left:38px;font-size:.6em;vertical-align:middle}
@media (prefers-reduced-motion:no-preference){.w-d-urgente .w-cinta-in{animation:w-cinta 26s linear infinite}}
@keyframes w-cinta{to{transform:translateX(-50%)}}
.w-d-urgente .w-sec h2{display:flex;align-items:center;gap:14px;text-transform:uppercase;font-size:clamp(1.7rem,5cqw,3rem);letter-spacing:-.01em}
.w-d-urgente .w-sec h2::before{content:"";flex:none;width:18px;height:18px;background:var(--w-c);transform:rotate(45deg)}
.w-d-urgente .w-sec h2::after{display:none}
.w-d-urgente .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-urgente .w-s-1>li{counter-increment:w-srv;position:relative;background:#fff;border:2px solid var(--w-tinta);border-radius:6px;box-shadow:6px 6px 0 var(--w-tinta)}
.w-d-urgente .w-s-1>li::before{content:counter(w-srv,decimal-leading-zero);display:block;font:400 2.4rem/1 var(--w-ft-titulo);color:var(--w-c);-webkit-text-stroke:1.5px var(--w-tinta);margin-bottom:12px}
.w-d-urgente .w-s-1>li:first-child{background:var(--w-c);color:var(--w-s)}
.w-d-urgente .w-s-1>li:first-child::before{color:var(--w-s);-webkit-text-stroke:0}
.w-d-urgente .w-s-1>li:first-child :is(p,.w-precio){color:inherit}
.w-d-urgente .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:400;text-transform:uppercase;letter-spacing:.01em}
.w-d-urgente .w-zonas>li{border:2px solid var(--w-tinta);border-radius:4px;background:#fff;font-weight:700}
.w-d-urgente .w-zonas>li::before{content:"● ";color:var(--w-ct)}
.w-d-urgente .w-opinion{background:#fff;border:1px solid var(--w-borde)}
.w-d-urgente .w-opinion blockquote::before{content:"★★★★★";font:400 1rem var(--w-ft-texto);letter-spacing:.2em;color:#b7791f;margin-bottom:10px}
.w-d-urgente .w-c-2 .w-contacto-cta{background:var(--w-navy);color:#fff;border-radius:8px;border-bottom:10px solid var(--w-c)}
.w-d-urgente .w-c-2 .w-contacto-grande a{color:var(--w-c);text-decoration:none;font-weight:400}
.w-d-urgente .w-c-2 .w-contacto-cta .w-boton{color:#fff;border-color:#fff}
.w-d-urgente .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-c);color:var(--w-s);border-color:var(--w-c)}
@container (min-width:760px){
  .w-d-urgente .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w-d-urgente .w-s-1>li:first-child{grid-row:span 2;display:flex;flex-direction:column;justify-content:flex-end}
  .w-d-urgente .w-s-1>li:first-child h3{font-size:clamp(1.6rem,3cqw,2.4rem)}
}
`,
};
