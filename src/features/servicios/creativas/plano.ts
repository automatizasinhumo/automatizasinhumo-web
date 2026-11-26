import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Garage» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): hoja de revisión de taller sobre amarillo con rayado de
 * huella, rótulo estrecho (Saira Extra Condensed), cifras técnicas (Chakra Petch), esquinas
 * cortadas y el dibujo técnico del coche con sus ocho puntos de revisión. Reescrito para el
 * contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript); el dibujo es el de la
 * plantilla, con la cota en metros y los id prefijados.
 */

/** Sin foto: el alzado técnico del turismo con ocho puntos de revisión (de «Garage»). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 640 320" aria-hidden="true" focusable="false"><defs><g id="plano-wheel"><circle r="42" fill="#121316"/><circle r="34" fill="none" stroke="#545961" stroke-width="2" stroke-dasharray="2 5"/><circle r="27" fill="#fff" stroke="#121316" stroke-width="3"/><circle r="19" fill="none" stroke="#121316" stroke-width="1.5" stroke-dasharray="3 3"/><path d="M0-9V-25M8.6-2.8 23.8-7.7M5.3 7.3l9.4 12.9M-5.3 7.3l-9.4 12.9M-8.6-2.8-23.8-7.7" stroke="#121316" stroke-width="4" stroke-linecap="round"/><circle r="7" fill="#121316"/></g></defs><g fill="none" stroke="#121316" stroke-linecap="round" stroke-linejoin="round"><path d="M36 14v22M604 14v22" stroke-width="1.5"/><path d="M40 25h560" stroke-width="1.5"/><path d="m40 25 10-5v10Zm560 0-10-5v10Z" fill="#121316" stroke-width="1"/></g><rect x="276" y="14" width="88" height="22" fill="#fff"/><text x="320" y="30" text-anchor="middle" font-family="ash-chakra-petch, monospace" font-size="15" font-weight="600" fill="#121316">4,10 M</text><g stroke="#121316" stroke-linecap="round" stroke-linejoin="round"><path d="M36 232V200Q38 182 58 177L170 160Q205 154 240 148L318 102Q326 96 340 96H512Q528 96 536 106L584 158Q600 166 602 186L604 232H548A58 58 0 0 0 432 232H208A58 58 0 0 0 92 232Z" fill="#fff" stroke-width="3.5"/><path d="M262 150 322 108Q328 104 338 104H420V150Z" fill="#121316" fill-opacity=".14" stroke-width="2.5"/><path d="M432 104H508Q518 104 526 112L560 150H432Z" fill="#121316" fill-opacity=".14" stroke-width="2.5"/><path d="M250 156V226M426 102V226M562 152 548 214" fill="none" stroke-width="2"/><path d="M60 192Q330 178 598 182" fill="none" stroke-width="1.5"/><path d="M208 224H432" fill="none" stroke-width="1.5"/><path d="M370 164h24M468 164h24" fill="none" stroke-width="4"/><path d="M40 188 88 180 92 192 44 198Z" fill="#ffd21f" stroke-width="2.5"/><path d="M588 162 600 180 590 184Z" fill="#c01b14" stroke-width="2"/><path d="M268 146l14-12 10 4-6 12Z" fill="#fff" stroke-width="2.5"/><path d="M38 212h22M38 220h22" fill="none" stroke-width="2"/><path d="M560 234h30v7h-30Z" fill="#fff" stroke-width="2.5"/></g><use href="#plano-wheel" x="150" y="242"/><use href="#plano-wheel" x="490" y="242"/><path d="M8 286H632" stroke="#121316" stroke-width="2.5"/><path d="M20 296l10-10M44 296l10-10M68 296l10-10M92 296l10-10M116 296l10-10M140 296l10-10M164 296l10-10M188 296l10-10M212 296l10-10M236 296l10-10M260 296l10-10M284 296l10-10M308 296l10-10M332 296l10-10M356 296l10-10M380 296l10-10M404 296l10-10M428 296l10-10M452 296l10-10M476 296l10-10M500 296l10-10M524 296l10-10M548 296l10-10M572 296l10-10M596 296l10-10" stroke="#121316" stroke-width="1.5"/><g stroke="#121316" stroke-width="1.5" stroke-dasharray="4 3" fill="none"><path d="M66 186 30 128"/><path d="M290 128 262 66"/><path d="M386 134 392 66"/><path d="M490 242 566 304"/><path d="M118 270 54 306"/><path d="M170 214 214 306"/><path d="M590 238 622 262"/></g><g font-family="ash-chakra-petch, monospace" font-size="15" font-weight="600" text-anchor="middle"><g fill="#121316"><circle cx="30" cy="118" r="14"/><circle cx="258" cy="56" r="14"/><circle cx="392" cy="56" r="14"/><circle cx="330" cy="206" r="14"/><circle cx="570" cy="306" r="14"/><circle cx="48" cy="306" r="14"/><circle cx="220" cy="306" r="14"/><circle cx="624" cy="268" r="14"/></g><g fill="#ffd21f"><text x="30" y="123">1</text><text x="258" y="61">2</text><text x="392" y="61">3</text><text x="330" y="211">4</text><text x="570" y="311">5</text><text x="48" y="311">6</text><text x="220" y="311">7</text><text x="624" y="273">8</text></g></g></svg>`;

const PUNTOS = ['Luces', 'Limpiaparabrisas', 'Cinturones', 'Carrocería', 'Frenos', 'Neumáticos', 'Suspensión', 'Emisiones'];

export const plano: Diseno = {
  id: 'plano',
  nombre: 'Plano',
  descripcion: 'Hoja de revisión sobre amarillo, rótulo estrecho y el dibujo técnico del coche con sus puntos numerados. Para talleres mecánicos, ITV y neumáticos.',
  color: '#17803a',
  fondoClaro: '#e9e7e0',
  fondoOscuro: '#121316',
  fuentes: ['ash-saira-extra-condensed', 'ash-chakra-petch', 'ash-dm-sans'],
  titulo: "'ash-saira-extra-condensed', 'Arial Narrow', Impact, system-ui, sans-serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 4,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'horario', 'galeria', 'opiniones', 'sobre', 'zonas', 'preguntas', 'contacto'],
  sectores: ['taller'],
  palabras: ['taller', 'mecánic', 'neumátic', 'chapa', 'itv', 'automoción', 'coche'],
  titulos: { servicios: 'Lo que revisamos', horario: 'Horario del taller', galeria: 'En el foso', sobre: 'El taller', opiniones: 'Clientes', zonas: 'Recogemos el coche en', preguntas: 'Antes de traer el coche', contacto: 'Pide cita o precio' },
  muestra: {
    negocio: 'Talleres Bielas',
    sector: 'Taller mecánico',
    lema: 'Revisiones, frenos y mantenimiento con el precio por escrito antes de tocar una llave. Si encontramos algo más, te llamamos primero.',
    servicios: [
      { nombre: 'Revisión pre-ITV', precio: '35 €', texto: 'Los ocho puntos que mira la ITV, con informe y foto de cada uno.' },
      { nombre: 'Cambio de aceite y filtros', precio: 'desde 69 €', texto: 'Aceite del fabricante, filtro de aceite, aire y habitáculo.' },
      { nombre: 'Pastillas de freno', precio: 'desde 89 €', texto: 'Eje delantero o trasero, con revisión de discos y líquido.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector"><span class="w-placa-e" aria-hidden="true">E</span><span>${esc(d.sector)}</span></p>` : '';
    const leyenda = c.foto || c.ajeno
      ? ''
      : `<ol class="w-plano-ley">${PUNTOS.map((p) => `<li>${p}</li>`).join('')}</ol>`;
    return `<header class="w-cab w-cab-plano${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis"><div class="w-plano">${c.ajeno ? '' : '<p class="w-plano-cab" aria-hidden="true"><span>Hoja 01</span><span>Esc. 1:25</span><span>Puntos de revisión</span></p>'}${fotoO(c, ILUSTRACION)}${leyenda}</div></div></div></header>`;
  },
  tras: (c) => {
    const h = c.horario[0];
    if (!h && !c.tel) return '';
    return `<div class="w-franja"><div class="w-in w-franja-in">${h ? `<p>${c.icono('reloj')}<span>${c.esc(h[0] || 'Abrimos')}: ${c.esc(h[1])}</span></p>` : ''}${c.tel ? `<p>${c.icono('tel')}<span>${c.grande}</span></p>` : ''}</div></div>`;
  },
  css: `
.w-d-plano{--w-fondo:#f3f2ee;--w-papel:#fff;--w-tinta:#121316;--w-suave:#44474e;--w-borde:#d4d2cb;--w-panel:#e9e7e0;--w-placa:#ffd21f;--w-placa-h:#f0bf00;--w-acero:#545961;--w-r:0;--w-esp:24px;--w-corte:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.w-d-plano .w-nav{background:var(--w-tinta);color:#fff;border-bottom:0}
.w-d-plano .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:800;text-transform:uppercase;letter-spacing:.02em}
.w-d-plano .w-nav .w-boton{color:#fff;border-color:#b9bcc2}
.w-d-plano .w-nav .w-boton-lleno{background:var(--w-placa);color:var(--w-tinta);border-color:var(--w-placa)}
.w-d-plano .w-boton{border-radius:0;border-width:2px;font:800 1.05rem/1 var(--w-ft-titulo);text-transform:uppercase;letter-spacing:.04em;clip-path:var(--w-corte)}
.w-d-plano .w-cab{background-color:var(--w-placa);background-image:repeating-linear-gradient(115deg,#0000 0 10px,#12131614 10px 16px);color:var(--w-tinta);padding-block:clamp(30px,6cqw,80px)}
.w-d-plano .w-cab-in{display:grid;gap:clamp(28px,5cqw,56px);align-items:center}
.w-d-plano .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-plano .w-sector{display:inline-flex;align-items:stretch;margin:0;border:2px solid var(--w-tinta);border-radius:5px;background:var(--w-placa);overflow:hidden;color:var(--w-tinta);font:800 1rem/1 var(--w-ft-titulo);text-transform:uppercase;letter-spacing:.06em}
.w-d-plano .w-sector>span:last-child{padding:7px 12px}
.w-d-plano .w-placa-e{display:grid;place-items:end center;width:24px;padding-bottom:5px;background:#1d4fa3;color:#fff;font:600 .72rem 'ash-chakra-petch',monospace}
.w-d-plano .w-cab h1{font-size:min(clamp(3rem,10cqw,6.6rem),var(--w-h1-tope,99em));font-weight:800;line-height:.9;text-transform:uppercase;letter-spacing:0;overflow-wrap:break-word;text-wrap:balance}
.w-d-plano .w-cab .w-lema-bloque{font-size:clamp(1.05rem,2.1cqw,1.22rem);line-height:1.6;color:#2c2f35;max-width:46ch}
.w-d-plano .w-cab .w-boton{min-height:54px;padding-inline:24px;color:var(--w-tinta);border-color:var(--w-tinta);background:transparent}
.w-d-plano .w-cab .w-boton-lleno{background:var(--w-tinta);color:var(--w-placa);border-color:var(--w-tinta)}
.w-d-plano .w-cab-vis{min-width:0;width:100%;max-width:38rem;justify-self:center}
.w-d-plano .w-plano{background:var(--w-papel);border:2px solid var(--w-tinta);padding:clamp(12px,2cqw,20px);clip-path:var(--w-corte);box-shadow:inset 0 0 0 1px var(--w-papel)}
.w-d-plano .w-plano-cab{display:flex;justify-content:space-between;gap:10px;margin:0 0 8px;padding-bottom:8px;border-bottom:2px solid var(--w-tinta);font:600 .74rem/1.2 'ash-chakra-petch',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}
.w-d-plano .w-plano .w-ilus{display:block;width:100%;height:auto;aspect-ratio:2/1}
.w-d-plano .w-plano-ley{display:grid;grid-template-columns:repeat(auto-fill,minmax(10.5em,1fr));gap:4px 14px;margin:8px 0 0;padding:10px 0 0;border-top:2px solid var(--w-tinta);list-style:none;counter-reset:w-punto;font-size:.86rem}
.w-d-plano .w-plano-ley li{counter-increment:w-punto}
.w-d-plano .w-plano-ley li::before{content:counter(w-punto) " ";font:600 .86rem 'ash-chakra-petch',monospace}
.w-d-plano .w-cab-foto{margin:0}
.w-d-plano .w-cab-foto img{width:100%;aspect-ratio:3/2;object-fit:cover}
.w-d-plano .w-franja{background:var(--w-tinta);color:#fff;font:600 .95rem/1.3 'ash-chakra-petch',ui-monospace,monospace;letter-spacing:.06em}
.w-d-plano .w-franja-in{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 24px;padding-block:14px}
.w-d-plano .w-franja p{display:inline-flex;align-items:center;gap:10px;margin:0}
.w-d-plano .w-franja .w-ico{color:var(--w-placa)}
.w-d-plano .w-franja a{color:var(--w-placa);text-decoration:none}
.w-d-plano .w-sec h2{font-weight:800;font-size:clamp(2.2rem,6cqw,3.6rem);line-height:.95;text-transform:uppercase}
.w-d-plano .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-plano .w-s-4>li{grid-template-columns:44px minmax(0,1fr);border-bottom:2px solid var(--w-tinta)}
.w-d-plano .w-s-4>li::before{display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--w-tinta);color:var(--w-placa);content:counter(servicio);font:600 1rem 'ash-chakra-petch',monospace}
.w-d-plano .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:800;font-size:1.5rem;text-transform:uppercase;letter-spacing:.01em}
.w-d-plano .w-precio{font-family:'ash-chakra-petch',monospace;font-weight:600}
.w-d-plano .w-galeria img{border:2px solid var(--w-tinta);border-radius:0;clip-path:var(--w-corte)}
.w-d-plano .w-opinion{background:var(--w-papel);border:2px solid var(--w-tinta);border-radius:0;clip-path:var(--w-corte)}
.w-d-plano .w-zonas>li{border:2px solid var(--w-tinta);border-radius:5px;background:var(--w-placa);color:var(--w-tinta);font:800 1rem var(--w-ft-titulo);text-transform:uppercase;letter-spacing:.05em}
.w-d-plano .w-c-2 .w-contacto-cta{background-color:var(--w-placa);background-image:repeating-linear-gradient(115deg,#0000 0 10px,#12131614 10px 16px);color:var(--w-tinta);border:2px solid var(--w-tinta);border-radius:0}
.w-d-plano .w-c-2 .w-contacto-grande a{color:var(--w-tinta)}
.w-d-plano .w-c-2 .w-contacto-cta .w-boton{color:var(--w-tinta);border-color:var(--w-tinta);background:transparent}
.w-d-plano .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-tinta);color:var(--w-placa)}
@container (min-width:860px){
  .w-d-plano .w-cab-in{grid-template-columns:minmax(0,1fr) minmax(0,1.05fr)}
  .w-d-plano .w-cab-vis{justify-self:end}
}
`,
};
