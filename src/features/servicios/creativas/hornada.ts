import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Crumb» de Freeframe (licencia MIT, (c) 2026 Freeframe): obrador de
 * barrio en crema y mora, escaparate en arco con el pan del día, etiquetas escritas a mano, costuras
 * punteadas y una cinta de horario arriba. Reescrito para el contrato de diseños de autor (HTML + CSS
 * con ámbito, sin JavaScript) y con las tipografías que ya sirve la web (Fraunces y DM Sans).
 */

/** Sin foto: el escaparate en arco con una hogaza, una barra, un cruasán y una tarta, y su etiqueta. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 560 640" aria-hidden="true" focusable="false">
<ellipse cx="280" cy="626" rx="246" ry="11" class="sombra"/>
<path class="marco" d="M30 620V292a250 250 0 0 1 500 0v328Z"/>
<path class="vidrio" d="M62 606V292a218 218 0 0 1 436 0v314Z"/>
<path class="abanico" d="M62 292a218 218 0 0 1 436 0Z"/>
<g class="radios"><path d="M280 292L75 217M280 292L113 152M280 292L171 103M280 292L242 77M280 292L318 77M280 292L389 103M280 292L447 152M280 292L485 217"/></g>
<path class="linea" d="M62 292h436"/><circle class="cubo" cx="280" cy="292" r="26"/>
<g class="vapor"><path d="M118 336c-6-9 6-12 0-22"/><path d="M140 332c-6-9 6-12 0-22"/><path d="M162 336c-6-9 6-12 0-22"/></g>
<path class="hogaza" d="M84 440c-2-38 28-66 62-66s64 28 62 66c-1 16-26 20-62 20s-61-4-62-20z"/>
<path class="greña" d="M106 420c18-22 54-26 80-10"/>
<g transform="rotate(-20 300 410)"><rect class="barra" x="226" y="392" width="150" height="38" rx="19"/><g class="greña"><path d="M246 404q11-11 22-3"/><path d="M276 404q11-11 22-3"/><path d="M306 404q11-11 22-3"/><path d="M336 404q11-11 22-3"/></g></g>
<path class="hogaza oscura" d="M372 460v-44c0-28 26-38 54-38s54 10 54 38v44a4 4 0 0 1-4 4H376a4 4 0 0 1-4-4z"/>
<rect class="balda" x="62" y="464" width="436" height="16" rx="4"/>
<g class="cruasan"><path d="M96 576c0-14 14-22 27-17l8 24c-14 8-35 7-35-7z"/><path d="M218 576c0-14-14-22-27-17l-8 24c14 8 35 7 35-7z"/><path d="M118 557c5-13 17-18 27-17l3 46c-9 2-18 1-24-2z"/><path d="M196 557c-5-13-17-18-27-17l-3 46c9 2 18 1 24-2z"/><path d="M143 541c7-11 23-11 30 0l1 46c-9 3-23 3-32 0z"/></g>
<g class="tarta"><rect x="300" y="520" width="150" height="72" rx="6"/><rect class="relleno" x="301" y="542" width="148" height="6"/><rect class="relleno" x="301" y="566" width="148" height="6"/><ellipse class="nata" cx="375" cy="520" rx="75" ry="13"/><g class="fruta"><circle cx="340" cy="517" r="6"/><circle cx="362" cy="512" r="6"/><circle cx="386" cy="518" r="6"/><circle cx="408" cy="513" r="6"/></g></g>
<rect class="balda" x="62" y="592" width="436" height="16" rx="4"/>
<g class="etiqueta" transform="rotate(5 430 300)"><path class="hilo" d="M430 268v10"/><path d="M380 278h96l9 20-9 20h-96z"/><text x="426" y="303" text-anchor="middle">Recién hecho</text></g>
<g class="sello" transform="rotate(-10 92 250)"><circle cx="92" cy="250" r="54"/><circle class="pespunte" cx="92" cy="250" r="44"/><text x="92" y="246" text-anchor="middle" class="sello-a">HORNO</text><text x="92" y="268" text-anchor="middle" class="sello-b">de barrio</text></g>
</svg>`;

export const hornada: Diseno = {
  id: 'hornada',
  nombre: 'Hornada',
  descripcion: 'Crema y mora, escaparate en arco con el pan del día y etiquetas a mano. Para panaderías, pastelerías, obradores y cafeterías de barrio.',
  color: '#74305a',
  fondoClaro: '#f3e7d5',
  fondoOscuro: '#3a2620',
  fuentes: ['ash-fraunces', 'ash-dm-sans'],
  titulo: "'ash-fraunces', 'Iowan Old Style', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'galeria', 'horario', 'opiniones', 'sobre', 'preguntas', 'zonas', 'contacto'],
  titulos: { servicios: 'Del obrador', horario: 'Cuándo abrimos', galeria: 'El mostrador', sobre: 'Nuestra historia', opiniones: 'Lo que dicen en el barrio', preguntas: 'Antes de encargar' },
  muestra: {
    negocio: 'Horno San Blas',
    sector: 'Panadería y pastelería',
    lema: 'Pan de masa madre y bollería hecha al amanecer. Encarga hoy y recógelo mañana.',
    servicios: [
      { nombre: 'Pan de masa madre', precio: '', texto: 'Hogazas de fermentación lenta, cocidas cada mañana.' },
      { nombre: 'Bollería y dulces', precio: '', texto: 'Cruasanes, napolitanas y el dulce de temporada.' },
      { nombre: 'Tartas por encargo', precio: '', texto: 'Para cumpleaños y celebraciones, con 48 h de antelación.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const primera = c.horario[0];
    const cinta = primera || c.tel
      ? `<div class="w-cinta"><div class="w-in w-cinta-in">${primera ? `<p>${c.icono('reloj')}<span>${esc(primera[0] || 'Horario')}: ${esc(primera[1])}</span></p>` : ''}${c.tel ? `<p class="w-cinta-tel">${c.icono('tel')}<span>Encargos: ${c.grande}</span></p>` : ''}</div></div>`
      : '';
    const ante = d.sector ? `<p class="w-sector w-mano">${esc(d.sector)}</p>` : '';
    return `<header class="w-cab w-cab-hornada${c.foto ? '' : ' w-sin-foto'}">${cinta}<div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  tras: () => '<div class="w-costura" aria-hidden="true"></div>',
  css: `
.w-d-hornada{--w-fondo:#fbf5ec;--w-papel:#fffdf8;--w-tinta:#3a2620;--w-suave:#6c574a;--w-borde:#e7d6bf;--w-panel:#f3e7d5;--w-mora-claro:#f3dce7;--w-mantequilla:#f9e8b2;--w-corteza:#b9733c;--w-r:26px;--w-esp:24px;counter-reset:w-srv}
.w-d-hornada .w-nav{background:var(--w-fondo);border-bottom:2px dashed var(--w-borde)}
.w-d-hornada .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:600;letter-spacing:-.01em}
.w-d-hornada .w-boton{border-radius:999px;font-weight:700}
.w-d-hornada .w-boton-lleno{box-shadow:0 10px 22px -12px #561f42e6}
.w-d-hornada .w-cab{position:relative;overflow:hidden;background:radial-gradient(55% 60% at 100% 0,var(--w-mora-claro),transparent 70%),radial-gradient(45% 55% at 0 100%,var(--w-mantequilla),transparent 70%),var(--w-fondo);padding-bottom:clamp(30px,5cqw,64px)}
.w-d-hornada .w-cinta{background:var(--w-tinta);color:var(--w-papel);font-size:.92rem;font-weight:500}
.w-d-hornada .w-cinta-in{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 22px;padding-block:9px}
.w-d-hornada .w-cinta p{display:inline-flex;align-items:center;gap:8px;margin:0}
.w-d-hornada .w-cinta .w-ico{color:var(--w-mantequilla)}
.w-d-hornada .w-cinta a{color:inherit}
.w-d-hornada .w-cab-in{display:grid;gap:clamp(24px,5cqw,56px);align-items:center;padding-top:clamp(30px,6cqw,80px)}
.w-d-hornada .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-hornada .w-mano{display:inline-block;transform:rotate(-2deg);font:italic 500 clamp(1.25rem,2.6cqw,1.6rem)/1.1 var(--w-ft-titulo);color:var(--w-c);letter-spacing:0;text-transform:none}
.w-d-hornada .w-cab h1{--w-em-letra:.9;margin-bottom:.2em;font-size:min(clamp(2.6rem,7.6cqw,5.6rem),var(--w-h1-tope,99em));font-weight:500;line-height:1.04;letter-spacing:-.02em;overflow-wrap:break-word;text-wrap:balance;padding-bottom:.18em;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12' preserveAspectRatio='none'%3E%3Cpath d='M2 8c14-6 22 4 36-1s24-5 38 0 26 3 42-3' fill='none' stroke='%23e9a9a0' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E") 0 100%/min(9ch,70%) .22em no-repeat}
.w-d-hornada .w-cab .w-lema-bloque{font-size:clamp(1.1rem,2.3cqw,1.35rem);line-height:1.55;color:var(--w-suave);max-width:36ch}
.w-d-hornada .w-cab .w-boton{min-height:54px;padding-inline:26px}
.w-d-hornada .w-cab-vis{position:relative;min-width:0;max-width:30rem;width:100%;justify-self:center}
.w-d-hornada .w-ilus{display:block;width:100%;height:auto}
.w-d-hornada .w-ilus *{stroke:#3a2620;stroke-linejoin:round;stroke-linecap:round}
.w-d-hornada .w-ilus .sombra{fill:#3a2620;opacity:.1;stroke:none}
.w-d-hornada .w-ilus .marco{fill:var(--w-mora-claro);stroke-width:3}
.w-d-hornada .w-ilus .vidrio{fill:#fdf4e6;stroke-width:2.6}
.w-d-hornada .w-ilus .abanico{fill:#fbe9c2;stroke:none}
.w-d-hornada .w-ilus .radios path{stroke-width:1.6;opacity:.35}
.w-d-hornada .w-ilus .linea{stroke-width:2.6}
.w-d-hornada .w-ilus .cubo{fill:#fdf4e6;stroke-width:2.4}
.w-d-hornada .w-ilus .vapor path{fill:none;stroke:#c98a4b;stroke-width:3.4}
.w-d-hornada .w-ilus .hogaza{fill:#c98744;stroke-width:2.4}
.w-d-hornada .w-ilus .hogaza.oscura{fill:#7b4a2b}
.w-d-hornada .w-ilus .greña,.w-d-hornada .w-ilus .greña path{fill:none;stroke:#f6e6ca;stroke-width:5}
.w-d-hornada .w-ilus .barra{fill:#d08f4a;stroke-width:2.4}
.w-d-hornada .w-ilus .balda{fill:#c98a4b;stroke-width:2.6}
.w-d-hornada .w-ilus .cruasan path{fill:#d8954a;stroke-width:2.2}
.w-d-hornada .w-ilus .cruasan path:nth-child(5){fill:#e6ad5f}
.w-d-hornada .w-ilus .tarta rect{fill:#f3d38b;stroke-width:2.2}
.w-d-hornada .w-ilus .tarta .relleno{fill:#c2334d;stroke:none}
.w-d-hornada .w-ilus .nata{fill:#fff6e8;stroke-width:2.2}
.w-d-hornada .w-ilus .fruta circle{fill:var(--w-c);stroke-width:1.2}
.w-d-hornada .w-ilus .etiqueta path{fill:var(--w-papel);stroke-width:2}
.w-d-hornada .w-ilus .etiqueta .hilo{fill:none;stroke-width:1.4}
.w-d-hornada .w-ilus text{stroke:none;fill:#3a2620}
.w-d-hornada .w-ilus .etiqueta text{font:italic 600 19px var(--w-ft-titulo);fill:var(--w-c)}
.w-d-hornada .w-ilus .sello circle{fill:var(--w-mantequilla);stroke-width:2.6}
.w-d-hornada .w-ilus .sello .pespunte{fill:none;stroke-width:1.4;stroke-dasharray:4 5}
.w-d-hornada .w-ilus .sello-a{font:800 13px var(--w-ft-texto);letter-spacing:3px}
.w-d-hornada .w-ilus .sello-b{font:italic 600 17px var(--w-ft-titulo);fill:var(--w-c)}
.w-d-hornada .w-cab-foto{margin:0;border-radius:999px 999px var(--w-r) var(--w-r);overflow:hidden;border:3px solid var(--w-tinta);box-shadow:0 0 0 10px var(--w-mora-claro),0 24px 50px -20px #3a26208c}
.w-d-hornada .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-hornada .w-costura{height:2px;background:linear-gradient(90deg,var(--w-borde) 55%,transparent 0) 0 0/12px 2px repeat-x}
.w-d-hornada .w-sec h2{font-weight:500;font-size:clamp(1.9rem,5cqw,3.1rem);line-height:1.06;letter-spacing:-.015em}
.w-d-hornada .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-hornada .w-s-1>li{counter-increment:w-srv;position:relative;background:var(--w-papel);border:0;border-radius:var(--w-r);box-shadow:0 0 0 1px #3a262012,0 22px 40px -30px #3a26208c}
.w-d-hornada .w-s-1>li::before{content:"Nº " counter(w-srv);display:inline-block;margin-bottom:12px;padding:5px 12px;border-radius:999px;background:var(--w-mantequilla);color:#7a5a06;font:700 .8rem var(--w-ft-texto);letter-spacing:.08em}
.w-d-hornada .w-s-1>li:nth-child(3n+2)::before{background:var(--w-mora-claro);color:#561f42}
.w-d-hornada .w-s-1>li:nth-child(3n)::before{background:#dfe8cb;color:#43602a}
.w-d-hornada .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:600;font-size:1.3rem}
.w-d-hornada .w-galeria img{border-radius:var(--w-r)}
.w-d-hornada .w-zonas>li{border:1.5px dashed #3a262040;border-radius:999px;background:var(--w-papel);font-weight:600}
.w-d-hornada .w-opinion{background:var(--w-papel);border:1.5px dashed #3a262040;border-radius:var(--w-r)}
.w-d-hornada .w-c-2 .w-contacto-cta{background:var(--w-tinta);color:var(--w-papel);border-radius:calc(var(--w-r) + 6px)}
.w-d-hornada .w-c-2 .w-contacto-grande a{color:var(--w-ct-oscuro);text-decoration:none}
.w-d-hornada .w-c-2 .w-contacto-cta .w-boton{color:var(--w-papel);border-color:var(--w-papel)}
.w-d-hornada .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-papel);color:var(--w-tinta);border-color:var(--w-papel)}
@container (min-width:760px){
  .w-d-hornada .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
  .w-d-hornada .w-cab-vis{justify-self:end}
}
`,
};
