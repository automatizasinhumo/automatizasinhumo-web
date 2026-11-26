import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Handy» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): servicios del hogar en azul marino y amarillo sol sobre
 * papel, titular ancho (Archivo) con la última palabra resaltada en amarillo, botón amarillo con
 * el presupuesto, foto enmarcada en blanco con una tarjeta de aviso flotante y la ilustración de
 * la furgoneta y los dos técnicos. Reescrito para el contrato de diseños de autor (HTML + CSS con
 * ámbito, sin JavaScript); la ilustración es la de la plantilla, sin el rótulo de su marca.
 */

/** Sin foto: la furgoneta de servicio y dos técnicos delante de dos casas (de «Handy»). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 1200 900" aria-hidden="true" focusable="false"><rect width="1200" height="900" fill="#dbe9f4"/><circle cx="980" cy="170" r="70" fill="#fff4cc"/><path d="M0 620 Q300 560 600 600 T1200 590 V900 H0 Z" fill="#cfe3c7"/><path d="M0 700 Q300 660 600 690 T1200 680 V900 H0 Z" fill="#b8d6ad"/><rect x="327.0" y="345.5" width="27.900000000000002" height="62.0" fill="#a33b2c"/><rect x="110" y="454.0" width="310.0" height="186.0" fill="#f2e8d8"/><path d="M88.3 457.1 L265.0 330.0 L441.7 457.1 Z" fill="#a33b2c"/><rect x="237.10000000000002" y="531.5" width="55.800000000000004" height="108.5" rx="4.65" fill="#7a4a2b"/><circle cx="282.05" cy="587.3" r="4.03" fill="#ffc21a"/><rect x="147.2" y="497.4" width="55.800000000000004" height="49.6" rx="3.1" fill="#fff6d6"/><path d="M175.10000000000002 497.4 v49.6 M147.2 522.2 h55.800000000000004" stroke="#f2e8d8" stroke-width="4.65"/><rect x="327.0" y="497.4" width="55.800000000000004" height="49.6" rx="3.1" fill="#fff6d6"/><path d="M354.9 497.4 v49.6 M327.0 522.2 h55.800000000000004" stroke="#f2e8d8" stroke-width="4.65"/><rect x="240.2" y="385.8" width="49.6" height="37.2" rx="18.6" fill="#fff6d6"/><rect x="874.0" y="441.0" width="19.8" height="44.0" fill="#1d4268"/><rect x="720" y="518.0" width="220.00000000000003" height="132.0" fill="#ffffff"/><path d="M704.6 520.2 L830.0 430.0 L955.4 520.2 Z" fill="#1d4268"/><rect x="810.2" y="573.0" width="39.6" height="77.0" rx="3.3000000000000003" fill="#2c6e8f"/><circle cx="842.1" cy="612.6" r="2.8600000000000003" fill="#ffc21a"/><rect x="746.4" y="548.8" width="39.6" height="35.2" rx="2.2" fill="#fff6d6"/><path d="M766.2 548.8 v35.2 M746.4 566.4 h39.6" stroke="#ffffff" stroke-width="3.3000000000000003"/><rect x="874.0" y="548.8" width="39.6" height="35.2" rx="2.2" fill="#fff6d6"/><path d="M893.8 548.8 v35.2 M874.0 566.4 h39.6" stroke="#ffffff" stroke-width="3.3000000000000003"/><rect x="812.4" y="469.6" width="35.2" height="26.400000000000002" rx="13.200000000000001" fill="#fff6d6"/><rect x="0" y="720" width="1200" height="180" fill="#9aa7b2"/><path d="M0 805 H1200" stroke="#fff" stroke-width="6" stroke-dasharray="48 36"/><g transform="translate(560 790) scale(1.35)"><ellipse cx="150" cy="4" rx="150" ry="9" fill="#0f2a44" opacity=".14"/><path d="M10 -24 V-118 Q10 -132 24 -132 H196 Q214 -132 226 -116 L262 -72 Q276 -66 284 -58 Q292 -50 292 -38 V-24 Z" fill="#fff"/><path d="M10 -62 H292 V-46 H10 Z" fill="#ffc21a"/><path d="M206 -120 H222 L254 -78 H206 Z" fill="#dbe9f4"/><path d="M14 -24 H290" stroke="#0f2a44" stroke-width="3"/><circle cx="70" cy="-20" r="24" fill="#0f2a44"/><circle cx="70" cy="-20" r="10" fill="#c9d3dd"/><circle cx="232" cy="-20" r="24" fill="#0f2a44"/><circle cx="232" cy="-20" r="10" fill="#c9d3dd"/><rect x="280" y="-50" width="10" height="8" rx="2" fill="#ffe08a"/></g><g transform="translate(420 790) scale(1.25)"><ellipse cx="0" cy="2" rx="34" ry="6" fill="#0f2a44" opacity=".14"/><rect x="-18" y="-70" width="14" height="70" rx="6" fill="#2b3f55"/><rect x="4" y="-70" width="14" height="70" rx="6" fill="#2b3f55"/><path d="M-26 -72 Q-26 -128 0 -132 Q26 -128 26 -72 Z" fill="#0f2a44"/><rect x="-26" y="-92" width="52" height="8" fill="#ffc21a"/><circle cx="0" cy="-148" r="17" fill="#c98d6b"/><path d="M-18 -152 Q-18 -172 0 -172 Q18 -172 18 -152 Z" fill="#ffc21a"/><rect x="-2" y="-156" width="26" height="6" rx="3" fill="#ffc21a"/><path d="M26 -120 L44 -84" stroke="#0f2a44" stroke-width="12" stroke-linecap="round"/><rect x="36" y="-86" width="28" height="22" rx="3" fill="#c0392b"/><rect x="44" y="-92" width="12" height="8" rx="2" fill="none" stroke="#c0392b" stroke-width="3"/></g><g transform="translate(1040 790) scale(1.1)"><ellipse cx="0" cy="2" rx="34" ry="6" fill="#0f2a44" opacity=".14"/><rect x="-18" y="-70" width="14" height="70" rx="6" fill="#2b3f55"/><rect x="4" y="-70" width="14" height="70" rx="6" fill="#2b3f55"/><path d="M-26 -72 Q-26 -128 0 -132 Q26 -128 26 -72 Z" fill="#2c6e8f"/><rect x="-26" y="-92" width="52" height="8" fill="#ffc21a"/><circle cx="0" cy="-148" r="17" fill="#8d5b3e"/><path d="M-18 -152 Q-18 -172 0 -172 Q18 -172 18 -152 Z" fill="#ffc21a"/><rect x="-2" y="-156" width="26" height="6" rx="3" fill="#ffc21a"/><path d="M26 -120 L44 -84" stroke="#2c6e8f" stroke-width="12" stroke-linecap="round"/><rect x="36" y="-86" width="28" height="22" rx="3" fill="#c0392b"/><rect x="44" y="-92" width="12" height="8" rx="2" fill="none" stroke="#c0392b" stroke-width="3"/></g></svg>`;

export const furgoneta: Diseno = {
  id: 'furgoneta',
  nombre: 'Furgoneta',
  descripcion: 'Servicios a domicilio en azul marino y amarillo sol, titular ancho resaltado, foto enmarcada con tarjeta de aviso y la furgoneta ilustrada. Para fontaneros, electricistas, cerrajeros y mantenimiento.',
  color: '#1d4268',
  fondoClaro: '#eef4fa',
  fondoOscuro: '#0f2a44',
  fuentes: ['ash-archivo', 'ash-public-sans'],
  titulo: "'ash-archivo', 'Arial Narrow', system-ui, sans-serif",
  texto: "'ash-public-sans', system-ui, sans-serif",
  servicios: 2,
  galeria: 3,
  opiniones: 1,
  contacto: 2,
  orden: ['servicios', 'zonas', 'opiniones', 'galeria', 'sobre', 'horario', 'preguntas', 'contacto'],
  sectores: ['fontaneria', 'electricidad'],
  palabras: ['fontaner', 'electric', 'cerrajer', 'calefacc', 'caldera', 'aire acondicionado', 'mantenimiento', 'manitas', 'avería'],
  titulos: { servicios: 'Qué arreglamos', zonas: 'Dónde vamos', opiniones: 'Vecinos que ya nos llamaron', galeria: 'Trabajos recientes', sobre: 'Quiénes somos', horario: 'Horario', preguntas: 'Preguntas frecuentes', contacto: 'Pide presupuesto' },
  muestra: {
    negocio: 'Reparaciones Faro',
    sector: 'Fontanería y electricidad',
    lema: 'Fontanería, electricidad y calefacción con un solo equipo del barrio: precio cerrado antes de empezar y franja de llegada de dos horas.',
    servicios: [
      { nombre: 'Fugas y desatascos', precio: 'desde 45 €', texto: 'Localización de la fuga, reparación y limpieza al terminar.' },
      { nombre: 'Cuadros e instalaciones eléctricas', precio: 'desde 60 €', texto: 'Diferenciales, enchufes, boletín y adecuación de viviendas antiguas.' },
      { nombre: 'Calderas y termos', precio: 'desde 70 €', texto: 'Revisión, reparación y sustitución con retirada del equipo viejo.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    const partes = d.negocio.trim().split(/\s+/);
    const ult = partes.pop() ?? '';
    const h1 = partes.length ? `${esc(partes.join(' '))} <span>${esc(ult)}</span>` : `<span>${esc(ult)}</span>`;
    const h = c.horario[0];
    const z = c.zonas.slice(0, 3).map(esc).join(', ');
    const linea2 = h ? esc(h[0] ? `${h[0]}: ${h[1]}` : h[1]) : z;
    const aviso = c.grande ? `<div class="w-aviso"><span class="w-punto" aria-hidden="true"></span><p><strong>${c.grande}</strong>${linea2 ? `<span>${linea2}</span>` : ''}</p></div>` : '';
    const zonas = z ? `<p class="w-cubre">${c.icono('zona')}<span>Vamos a ${z}</span></p>` : '';
    return `<header class="w-cab w-cab-furgoneta${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${h1}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}${zonas}
</div><div class="w-cab-vis"><div class="w-marco">${fotoO(c, ILUSTRACION)}</div>${aviso}</div></div></header>`;
  },
  css: `
.w-d-furgoneta{--w-fondo:#f7f5f0;--w-papel:#fff;--w-tinta:#0f2a44;--w-suave:#4a5a6b;--w-borde:#dbe7f3;--w-panel:#eef4fa;--w-marino:#1d4268;--w-sol:#ffc21a;--w-sol-h:#f0ab00;--w-r:18px;--w-esp:24px}
.w-d-furgoneta .w-nav{background:var(--w-papel);border-bottom:1px solid var(--w-borde)}
.w-d-furgoneta .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:800;letter-spacing:-.01em;color:var(--w-tinta)}
.w-d-furgoneta .w-boton{border-radius:12px;border-width:2px;font-weight:700;border-color:var(--w-tinta);color:var(--w-tinta);background:var(--w-papel)}
.w-d-furgoneta .w-boton-lleno{background:var(--w-sol);color:var(--w-tinta);border-color:var(--w-sol);box-shadow:0 6px 16px -8px #0f2a4499}
.w-d-furgoneta .w-boton-lleno:hover{background:var(--w-sol-h);border-color:var(--w-sol-h)}
.w-d-furgoneta .w-cab{position:relative;overflow:hidden;background:radial-gradient(28rem 28rem at -6rem 6rem,#ffc21a33,#0000 70%),var(--w-fondo);padding-block:clamp(36px,6cqw,84px)}
.w-d-furgoneta .w-cab-in{display:grid;gap:clamp(34px,5cqw,56px);align-items:center}
.w-d-furgoneta .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,24px)}
.w-d-furgoneta .w-sector{margin:0;font:700 .82rem/1.2 var(--w-ft-texto);letter-spacing:.12em;text-transform:uppercase;color:var(--w-marino)}
.w-d-furgoneta .w-cab h1{font-size:min(clamp(2.8rem,7.6cqw,4.6rem),var(--w-h1-tope,99em));font-weight:800;line-height:1.02;letter-spacing:-.02em;overflow-wrap:break-word;text-wrap:balance;color:var(--w-tinta)}
.w-d-furgoneta .w-cab h1 span{background:linear-gradient(#0000 62%,#ffc21acc 62%,#ffc21acc 92%,#0000 92%);-webkit-box-decoration-break:clone;box-decoration-break:clone}
.w-d-furgoneta .w-cab .w-lema-bloque{font-size:clamp(1.06rem,2.1cqw,1.22rem);line-height:1.6;color:var(--w-suave);max-width:46ch}
.w-d-furgoneta .w-cab .w-boton{min-height:54px;padding-inline:24px}
.w-d-furgoneta .w-cubre{display:flex;align-items:center;gap:8px;font-size:.95rem;color:var(--w-suave)}
.w-d-furgoneta .w-cubre svg{flex:none;width:18px;height:18px;color:var(--w-marino)}
.w-d-furgoneta .w-cab-vis{position:relative;min-width:0;width:100%;max-width:38rem;justify-self:center;padding-bottom:28px}
.w-d-furgoneta .w-marco{overflow:hidden;border:4px solid #fff;border-radius:2rem;box-shadow:0 26px 50px -22px #0f2a4466;background:#dbe9f4}
.w-d-furgoneta .w-marco .w-ilus{display:block;width:100%;height:auto;aspect-ratio:4/3}
.w-d-furgoneta .w-cab-foto{margin:0}
.w-d-furgoneta .w-cab-foto img{width:100%;aspect-ratio:4/3;object-fit:cover}
.w-d-furgoneta .w-aviso{position:absolute;left:-8px;bottom:0;display:flex;align-items:center;gap:12px;max-width:min(88%,22rem);padding:14px 16px;border-radius:1rem;background:#fff;box-shadow:0 18px 36px -16px #0f2a4440}
.w-d-furgoneta .w-aviso p{margin:0;font-size:.9rem;line-height:1.35;color:var(--w-suave)}
.w-d-furgoneta .w-aviso strong{display:block;color:var(--w-tinta)}
.w-d-furgoneta .w-aviso strong a{color:inherit}
.w-d-furgoneta .w-aviso span:not(.w-punto){display:block}
.w-d-furgoneta .w-punto{flex:none;width:12px;height:12px;border-radius:50%;background:#10b981;box-shadow:0 0 0 0 #10b98199}
.w-d-furgoneta .w-sec h2{font-weight:800;font-size:clamp(2rem,5cqw,2.8rem);line-height:1.08;letter-spacing:-.02em}
.w-d-furgoneta .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-furgoneta .w-s-2>li{background:var(--w-papel);border:1px solid var(--w-borde);border-top:4px solid var(--w-sol);border-radius:var(--w-r)}
.w-d-furgoneta .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:800;font-size:1.3rem;letter-spacing:-.01em}
.w-d-furgoneta .w-galeria img{border-radius:var(--w-r)}
.w-d-furgoneta .w-opinion{background:var(--w-papel);border:1px solid var(--w-borde);border-radius:var(--w-r)}
.w-d-furgoneta .w-zonas>li{border:1px solid var(--w-borde);border-radius:999px;background:var(--w-papel);font-weight:600;color:var(--w-tinta)}
.w-d-furgoneta .w-c-2 .w-contacto-cta{background:var(--w-tinta);color:#fff;border-radius:2rem}
.w-d-furgoneta .w-c-2 .w-contacto-grande a{color:var(--w-sol)}
.w-d-furgoneta .w-c-2 .w-contacto-cta .w-boton{color:#fff;border-color:#ffffff80;background:transparent}
.w-d-furgoneta .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-sol);color:var(--w-tinta);border-color:var(--w-sol)}
@media (prefers-reduced-motion:no-preference){
  .w-d-furgoneta .w-punto{animation:w-aviso 1.8s ease-out infinite}
  @keyframes w-aviso{to{box-shadow:0 0 0 12px #10b98100}}
}
@container (min-width:800px){
  .w-d-furgoneta .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr)}
  .w-d-furgoneta .w-cab-vis{justify-self:end}
  .w-d-furgoneta .w-aviso{left:-28px}
}
`,
};
