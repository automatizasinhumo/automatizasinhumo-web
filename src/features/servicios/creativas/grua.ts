import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Keystone» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): constructora sobre fondo de obra oscuro con retícula de
 * plano, titular enorme en mayúsculas (Big Shoulders), cotas y rótulos en monoespaciada (IBM Plex
 * Mono), naranja de seguridad y el alzado de la grúa y el edificio por plantas. Reescrito para el
 * contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript); el dibujo es el de la
 * plantilla, con los rótulos en español y los id prefijados.
 */

/** Sin foto: alzado técnico de la grúa torre y el edificio por plantas, con cotas (de «Keystone»). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 560 600" fill="none" stroke="#dcdad3" stroke-width="1.6" aria-hidden="true" focusable="false"><rect x="116" y="432" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="206" y="432" width="78" height="48" fill="#f15a0f" fill-opacity=".85"/><rect x="296" y="432" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="116" y="372" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="206" y="372" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="296" y="372" width="78" height="48" fill="#f15a0f" fill-opacity=".85"/><rect x="116" y="312" width="78" height="48" fill="#f15a0f" fill-opacity=".85"/><rect x="206" y="312" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="296" y="312" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="116" y="252" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="206" y="252" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><rect x="296" y="252" width="78" height="48" fill="#ecebe6" fill-opacity=".07"/><path pathLength="1" d="M110 540V180"/><path pathLength="1" d="M200 540V180"/><path pathLength="1" d="M290 540V180"/><path pathLength="1" d="M380 540V240"/><path pathLength="1" d="M98 480H392"/><path pathLength="1" d="M98 420H392"/><path pathLength="1" d="M98 360H392"/><path pathLength="1" d="M98 300H392" stroke="#f15a0f" stroke-width="3"/><path pathLength="1" d="M98 240H392"/><path pathLength="1" d="M98 180H300"/><path pathLength="1" d="M200 240 290 180M290 240 200 180" stroke-dasharray="1" opacity=".55"/><path pathLength="1" d="M500 540V96M520 540V96"/><path pathLength="1" d="M500 540 520 500 500 460 520 420 500 380 520 340 500 300 520 260 500 220 520 180 500 140 520 100" opacity=".6"/><path pathLength="1" d="M150 96H556M150 84H556M150 96 160 84M200 96 210 84M250 96 260 84M300 96 310 84M350 96 360 84M400 96 410 84M450 96 460 84M540 96 550 84"/><path pathLength="1" d="M510 96V40M510 40 160 90M510 40 556 84"/><path pathLength="1" d="M248 96V214" stroke-dasharray="1"/><rect x="208" y="214" width="80" height="12" fill="#f15a0f"/><path pathLength="1" d="M228 214l20-16 20 16" stroke="#f15a0f"/><rect x="528" y="98" width="26" height="22" fill="#f15a0f"/><path pathLength="1" d="M110 568H380M104 574l12-12M374 574l12-12M110 552v24M380 552v24" stroke="#a19e95"/><path pathLength="1" d="M56 540V180M50 546l12-12M50 186l12-12M48 540h20M48 180h20" stroke="#a19e95"/><path pathLength="1" d="M30 540H540" stroke-width="2.5"/><path pathLength="1" d="M44 542l-12 12" opacity=".4"/><path pathLength="1" d="M69 542l-12 12" opacity=".4"/><path pathLength="1" d="M94 542l-12 12" opacity=".4"/><path pathLength="1" d="M119 542l-12 12" opacity=".4"/><path pathLength="1" d="M144 542l-12 12" opacity=".4"/><path pathLength="1" d="M169 542l-12 12" opacity=".4"/><path pathLength="1" d="M194 542l-12 12" opacity=".4"/><path pathLength="1" d="M219 542l-12 12" opacity=".4"/><path pathLength="1" d="M244 542l-12 12" opacity=".4"/><path pathLength="1" d="M269 542l-12 12" opacity=".4"/><path pathLength="1" d="M294 542l-12 12" opacity=".4"/><path pathLength="1" d="M319 542l-12 12" opacity=".4"/><path pathLength="1" d="M344 542l-12 12" opacity=".4"/><path pathLength="1" d="M369 542l-12 12" opacity=".4"/><path pathLength="1" d="M394 542l-12 12" opacity=".4"/><path pathLength="1" d="M419 542l-12 12" opacity=".4"/><path pathLength="1" d="M444 542l-12 12" opacity=".4"/><path pathLength="1" d="M469 542l-12 12" opacity=".4"/><path pathLength="1" d="M494 542l-12 12" opacity=".4"/><path pathLength="1" d="M519 542l-12 12" opacity=".4"/><g font-family="ash-plex-mono, ui-monospace, monospace" font-size="11" letter-spacing=".08em" fill="#c4c1b8"><rect x="208" y="560" width="74" height="16" fill="#121314"/><text x="245" y="572" text-anchor="middle">27 000</text><g transform="rotate(-90 56 360)"><rect x="18" y="352" width="76" height="16" fill="#121314"/><text x="56" y="364" text-anchor="middle">21 600</text></g><text x="402" y="484">P01 +3,60</text><text x="402" y="424">P02 +7,20</text><text x="402" y="364">P03 +10,80</text><text x="402" y="304">P04 +14,40</text><text x="160" y="76">PLUMA 52 M / 6 T EN PUNTA</text><text x="300" y="222" fill="#ff7a2e">VIGA LAMINADA V-14</text></g></svg>`;

export const grua: Diseno = {
  id: 'grua',
  nombre: 'Grúa',
  descripcion: 'Obra sobre fondo oscuro con retícula de plano, titular enorme, cotas en monoespaciada y naranja de seguridad. Para reformas, construcción, carpintería y estructuras.',
  color: '#c2410c',
  fondoClaro: '#f3f2ee',
  fondoOscuro: '#141414',
  fuentes: ['ash-big-shoulders', 'ash-plex-mono', 'ash-archivo'],
  titulo: "'ash-big-shoulders', 'Arial Narrow', Impact, system-ui, sans-serif",
  texto: "'ash-archivo', system-ui, sans-serif",
  servicios: 4,
  galeria: 3,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'galeria', 'sobre', 'opiniones', 'zonas', 'horario', 'preguntas', 'contacto'],
  sectores: ['reformas'],
  palabras: ['reforma', 'construc', 'obra', 'albañil', 'carpinter', 'estructura', 'rehabilita'],
  titulos: { servicios: 'Qué construimos', galeria: 'Obras terminadas', sobre: 'La empresa', opiniones: 'Clientes', zonas: 'Trabajamos en', horario: 'Horario de oficina', preguntas: 'Antes de empezar la obra', contacto: 'Pide presupuesto' },
  muestra: {
    negocio: 'Construcciones Albar',
    sector: 'Reformas y construcción',
    lema: 'Reformas integrales, rehabilitación y obra nueva con un solo jefe de obra, plazos por escrito y la obra limpia cada tarde.',
    servicios: [
      { nombre: 'Reforma integral de vivienda', precio: 'desde 450 €/m²', texto: 'Proyecto, licencia, demolición, instalaciones y acabados con un único interlocutor.' },
      { nombre: 'Rehabilitación de fachadas', precio: 'a medida', texto: 'Andamio, saneado, aislamiento por el exterior y pintura.' },
      { nombre: 'Cocinas y baños', precio: 'desde 6.500 €', texto: 'En dos a tres semanas, con plato de ducha a ras de suelo.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const z = c.zonas.slice(0, 3).map(esc).join(' · ');
    const cinta = `<div class="w-cinta" aria-hidden="true"><div class="w-in w-cinta-in"><span>Obra n.º 01</span>${z ? `<span>${z}</span>` : ''}<span>Plano A-01</span></div></div>`;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    return `<header class="w-cab w-cab-grua${c.foto ? '' : ' w-sin-foto'}">${cinta}<div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-grua{--w-fondo:#f3f2ee;--w-papel:#fff;--w-tinta:#141414;--w-obra:#141414;--w-linea:#dcdad3;--w-naranja:#f15a0f;--w-suave:#4b4a46;--w-borde:#d6d3ca;--w-panel:#e8e6df;--w-r:0;--w-esp:24px;--w-reticula:linear-gradient(#ffffff0d 1px,#0000 1px) 0 0/32px 32px,linear-gradient(90deg,#ffffff0d 1px,#0000 1px) 0 0/32px 32px}
.w-d-grua .w-nav{background:var(--w-obra);color:#f3f2ee;border-bottom:1px solid #ffffff1f}
.w-d-grua .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:800;text-transform:uppercase;letter-spacing:.03em}
.w-d-grua .w-nav .w-boton{color:#f3f2ee;border-color:#ffffff59}
.w-d-grua .w-nav .w-boton-lleno{background:var(--w-naranja);color:#141414;border-color:var(--w-naranja)}
.w-d-grua .w-boton{border-radius:0;border-width:2px;font:500 .9rem/1 'ash-plex-mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}
.w-d-grua .w-cab{background:var(--w-reticula),var(--w-obra);color:#f3f2ee;padding-top:0;padding-bottom:clamp(34px,6cqw,86px)}
.w-d-grua .w-cinta{border-bottom:1px solid #ffffff1f;font:500 .74rem/1.2 'ash-plex-mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#b9b6ad}
.w-d-grua .w-cinta-in{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 20px;padding-block:10px}
.w-d-grua .w-cinta span:first-child{color:var(--w-naranja)}
.w-d-grua .w-cab-in{display:grid;gap:clamp(28px,5cqw,60px);align-items:end;padding-top:clamp(30px,6cqw,80px)}
.w-d-grua .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,24px)}
.w-d-grua .w-sector{display:inline-flex;align-items:center;gap:10px;margin:0;font:500 .8rem/1.2 'ash-plex-mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:var(--w-naranja)}
.w-d-grua .w-sector::before{content:"";width:28px;height:2px;background:currentColor}
.w-d-grua .w-cab h1{font-size:min(clamp(3.2rem,11cqw,7.6rem),var(--w-h1-tope,99em));font-weight:800;line-height:.86;text-transform:uppercase;letter-spacing:-.005em;overflow-wrap:break-word;text-wrap:balance;color:#f3f2ee}
.w-d-grua .w-cab .w-lema-bloque{font-size:clamp(1.02rem,2cqw,1.2rem);line-height:1.6;color:#c9c6bd;max-width:46ch}
.w-d-grua .w-cab .w-boton{min-height:54px;padding-inline:24px;color:#f3f2ee;border-color:#f3f2ee;background:transparent}
.w-d-grua .w-cab .w-boton-lleno{background:var(--w-naranja);color:#141414;border-color:var(--w-naranja)}
.w-d-grua .w-cab-vis{min-width:0;width:100%;max-width:30rem;justify-self:center}
.w-d-grua .w-cab-vis .w-ilus{display:block;width:100%;height:auto;aspect-ratio:14/15}
.w-d-grua .w-cab-foto{margin:0;border:1px solid #ffffff33;padding:10px}
.w-d-grua .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-grua .w-sec h2{font-weight:800;font-size:clamp(2.4rem,7cqw,4.2rem);line-height:.9;text-transform:uppercase}
.w-d-grua .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-grua .w-s-4>li{border-bottom:1px solid var(--w-tinta)}
.w-d-grua .w-s-4>li::before{content:counter(servicio,decimal-leading-zero);font:500 1rem 'ash-plex-mono',ui-monospace,monospace;color:var(--w-ct)}
.w-d-grua .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:800;font-size:1.7rem;text-transform:uppercase;letter-spacing:.01em}
.w-d-grua .w-precio{font-family:'ash-plex-mono',ui-monospace,monospace;font-weight:500}
.w-d-grua .w-galeria img{border-radius:0}
.w-d-grua .w-opinion{background:var(--w-papel);border:1px solid var(--w-tinta);border-left:6px solid var(--w-naranja);border-radius:0}
.w-d-grua .w-zonas>li{border:1px solid var(--w-tinta);border-radius:0;font:500 .86rem 'ash-plex-mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em}
.w-d-grua .w-c-2 .w-contacto-cta{background:var(--w-reticula),var(--w-obra);color:#f3f2ee;border-radius:0;border-top:6px solid var(--w-naranja)}
.w-d-grua .w-c-2 .w-contacto-grande a{color:var(--w-naranja);text-decoration:none}
.w-d-grua .w-c-2 .w-contacto-cta .w-boton{color:#f3f2ee;border-color:#f3f2ee;background:transparent}
.w-d-grua .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-naranja);color:#141414;border-color:var(--w-naranja)}
@media (prefers-reduced-motion:no-preference){
  .w-d-grua .w-cab-vis .w-ilus :is(path,line,polyline,rect):not([stroke-dasharray]){stroke-dasharray:1400;animation:w-trazo 2.4s ease-out both}
  @keyframes w-trazo{from{stroke-dashoffset:1400}to{stroke-dashoffset:0}}
}
@container (max-width:559px){
  .w-d-grua .w-cinta span:last-child{display:none}
}
@container (min-width:820px){
  .w-d-grua .w-cab-in{grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr)}
  .w-d-grua .w-cab-vis{justify-self:end}
}
`,
};
