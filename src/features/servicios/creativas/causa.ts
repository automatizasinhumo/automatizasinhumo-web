import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Nonprofit» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): asociación con cielo de atardecer, mar verde azulado,
 * titular en Fraunces y una tarjeta flotante con la primera acción. Reescrito para el contrato de
 * diseños de autor (HTML + CSS con ámbito, sin JavaScript); la ilustración es la de la plantilla,
 * con los id prefijados.
 */

/** Sin foto: el paisaje al atardecer de «Nonprofit». */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs><linearGradient id="causa-hero-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde3c2"/><stop offset="1" stop-color="#f6b48a"/></linearGradient><radialGradient id="causa-hero-glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3dc" stop-opacity=".9"/><stop offset="1" stop-color="#fff3dc" stop-opacity="0"/></radialGradient></defs><rect width="1400" height="1000" fill="url(#causa-hero-sky)"/><circle cx="941" cy="235" r="320" fill="url(#causa-hero-glow)"/><circle cx="941" cy="235" r="90" fill="#fff3dc"/><path d="M596 114 q8 -8 16 0 q8 -8 16 0" stroke="#c97c5a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/><path d="M515 173 q8 -8 16 0 q8 -8 16 0" stroke="#c97c5a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/><path d="M181 201 q8 -8 16 0 q8 -8 16 0" stroke="#c97c5a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/><path d="M0 560.0 C280.0 440.0 489.99999999999994 500.0 700.0 470.0 S1190.0 400.0 1400 500.0 V1000 H0 Z" fill="#e7a77c" opacity=".8"/><path d="M0 640.0 C350.0 560.0 630.0 660.0 910.0 600.0 S1260.0 580.0 1400 620.0 V1000 H0 Z" fill="#c97c5a"/><g transform="translate(178.2935144483563 616.7268860548304) scale(0.7203315000635125)"><path d="M0 0 C2 -30 -4 -50 -16 -64 M0 -30 C8 -44 18 -54 26 -60" stroke="#5b3a22" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-14" cy="-70" rx="34" ry="10" fill="#2f6b4f"/><ellipse cx="22" cy="-64" rx="26" ry="8" fill="#2f6b4f"/></g><g transform="translate(764.319539777146 602.3644202431595) scale(0.8827268470965399)"><path d="M0 0 C2 -30 -4 -50 -16 -64 M0 -30 C8 -44 18 -54 26 -60" stroke="#5b3a22" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="-14" cy="-70" rx="34" ry="10" fill="#2f6b4f"/><ellipse cx="22" cy="-64" rx="26" ry="8" fill="#2f6b4f"/></g><path d="M0 700.0 C420.0 660.0 840.0 740.0 1400 690.0 V1000 H0 Z" fill="#b96a48"/><path d="M532.0 1000 C588.0 880.0 840.0 860.0 868.0 780.0 C896.0 720.0 1050.0 720.0 1204.0 730.0 C1120.0 780.0 1092.0 860.0 1120.0 1000 Z" fill="#36a59b"/><path d="M700.0 1000 C756.0 920.0 924.0 880.0 952.0000000000001 800.0" stroke="#1a8a81" stroke-width="17" fill="none" opacity=".6" stroke-linecap="round"/><path d="M968 800 h56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M897 840 h56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M887 880 h56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M770 920 h56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><path d="M887 960 h56" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55"/><rect x="220.0" y="750.0" width="120" height="70" rx="10" fill="#e9dcc6"/><rect x="220.0" y="750.0" width="120" height="16" rx="6" fill="#d3c2a5"/><rect x="274.0" y="650.0" width="12" height="110" rx="4" fill="#0d5955"/><path d="M280.0 660.0 h70 v14" stroke="#0d5955" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M350.0 680.0 q-4 18 0 34 q4 -16 0 -34" fill="#6cc4bb"/><path d="M230.0 670.0 l-40 26" stroke="#0d5955" stroke-width="10" stroke-linecap="round"/><g transform="translate(541.5 934.3) scale(-1 1)"><rect x="-18.3" y="-68.0" width="13.1" height="68.0" rx="6.5" fill="#4a2a16"/><rect x="5.2" y="-68.0" width="13.1" height="68.0" rx="6.5" fill="#4a2a16"/><path d="M-26.2 -193.6 Q0 -209.3 26.2 -193.6 L44.5 -57.6 Q0 -44.5 -44.5 -57.6 Z" fill="#1a8a81"/><path d="M23.5 -183.1 Q41.9 -143.9 36.6 -109.9" stroke="#4a2a16" stroke-width="13.1" stroke-linecap="round" fill="none"/><path d="M-23.5 -183.1 Q-41.9 -143.9 -36.6 -109.9" stroke="#4a2a16" stroke-width="13.1" stroke-linecap="round" fill="none"/><rect x="-7.8" y="-214.5" width="15.7" height="20.9" fill="#4a2a16"/><circle cx="0" cy="-232.8" r="23.5" fill="#4a2a16"/><rect x="-52.3" y="-130.8" width="20.9" height="26.2" rx="3.9" fill="#fff" opacity=".9"/></g><g transform="translate(604.7 937.1)"><rect x="-18.4" y="-68.3" width="13.1" height="68.3" rx="6.6" fill="#b97d4f"/><rect x="5.3" y="-68.3" width="13.1" height="68.3" rx="6.6" fill="#b97d4f"/><path d="M-26.3 -194.3 Q0 -210.1 26.3 -194.3 L44.6 -57.8 Q0 -44.6 -44.6 -57.8 Z" fill="#f7c873"/><path d="M23.6 -183.8 Q42.0 -144.4 36.8 -110.3" stroke="#b97d4f" stroke-width="13.1" stroke-linecap="round" fill="none"/><path d="M-23.6 -183.8 Q-42.0 -144.4 -36.8 -110.3" stroke="#b97d4f" stroke-width="13.1" stroke-linecap="round" fill="none"/><rect x="-7.9" y="-215.3" width="15.8" height="21.0" fill="#b97d4f"/><circle cx="0" cy="-233.7" r="23.6" fill="#b97d4f"/><path d="M-26.3 -236.3 Q-28.9 -273.1 0 -273.1 Q31.5 -273.1 26.3 -236.3 Q0 -249.4 -26.3 -236.3 Z" fill="#c9771a"/></g><g transform="translate(671.1 947.7)"><rect x="-17.6" y="-65.5" width="12.6" height="65.5" rx="6.3" fill="#8a5530"/><rect x="5.0" y="-65.5" width="12.6" height="65.5" rx="6.3" fill="#8a5530"/><path d="M-25.2 -186.5 Q0 -201.6 25.2 -186.5 L42.8 -55.4 Q0 -42.8 -42.8 -55.4 Z" fill="#0d5955"/><path d="M22.7 -176.4 Q40.3 -138.6 35.3 -105.8" stroke="#8a5530" stroke-width="12.6" stroke-linecap="round" fill="none"/><path d="M-22.7 -176.4 Q-40.3 -138.6 -35.3 -105.8" stroke="#8a5530" stroke-width="12.6" stroke-linecap="round" fill="none"/><rect x="-7.6" y="-206.6" width="15.1" height="20.2" fill="#8a5530"/><circle cx="0" cy="-224.3" r="22.7" fill="#8a5530"/><path d="M-25.2 -226.8 Q-27.7 -262.1 0 -262.1 Q30.2 -262.1 25.2 -226.8 Q0 -239.4 -25.2 -226.8 Z" fill="#f2b04a"/></g><g transform="translate(924.8 958.8) scale(-1 1)"><rect x="-17.6" y="-65.4" width="12.6" height="65.4" rx="6.3" fill="#7a4a2a"/><rect x="5.0" y="-65.4" width="12.6" height="65.4" rx="6.3" fill="#7a4a2a"/><path d="M-25.2 -186.1 Q0 -201.2 25.2 -186.1 L42.8 -55.3 Q0 -42.8 -42.8 -55.3 Z" fill="#f7c873"/><path d="M22.6 -176.1 Q40.2 -138.3 35.2 -105.6" stroke="#7a4a2a" stroke-width="12.6" stroke-linecap="round" fill="none"/><path d="M-22.6 -176.1 Q-40.2 -138.3 -35.2 -105.6" stroke="#7a4a2a" stroke-width="12.6" stroke-linecap="round" fill="none"/><rect x="-7.5" y="-206.2" width="15.1" height="20.1" fill="#7a4a2a"/><circle cx="0" cy="-223.9" r="22.6" fill="#7a4a2a"/><rect x="-50.3" y="-125.8" width="20.1" height="25.2" rx="3.8" fill="#fff" opacity=".9"/></g></svg>`;

export const causa: Diseno = {
  id: 'causa',
  nombre: 'Causa',
  descripcion: 'Atardecer, mar verde azulado y una tarjeta con la acción principal. Para asociaciones, fundaciones, ONG, protectoras y voluntariado.',
  color: '#0d5955',
  fondoClaro: '#f3ebdd',
  fondoOscuro: '#16302f',
  fuentes: ['ash-fraunces', 'ash-dm-sans'],
  titulo: "'ash-fraunces', 'Iowan Old Style', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 2,
  galeria: 1,
  opiniones: 1,
  contacto: 1,
  orden: ['servicios', 'sobre', 'galeria', 'opiniones', 'zonas', 'horario', 'preguntas', 'contacto'],
  sectores: [],
  palabras: ['asociac', 'fundacion', 'ong', 'voluntar', 'protectora', 'solidari', 'benefic', 'vecinal'],
  titulos: { servicios: 'Qué hacemos', sobre: 'Quiénes somos', galeria: 'En marcha', opiniones: 'Quien ya colabora', zonas: 'Dónde estamos', horario: 'Cuándo encontrarnos', preguntas: 'Preguntas frecuentes', contacto: 'Súmate' },
  muestra: {
    negocio: 'Asociación Mar de Fondo',
    sector: 'Asociación sin ánimo de lucro',
    lema: 'Limpiamos la costa, enseñamos en los colegios y devolvemos cada euro en acciones que se ven.',
    servicios: [
      { nombre: 'Hazte voluntario', precio: '', texto: 'Una mañana al mes en las limpiezas de playa, con todo el material.' },
      { nombre: 'Hazte socio', precio: 'desde 5 € al mes', texto: 'Tu cuota paga talleres en colegios y la recogida de redes de pesca.' },
      { nombre: 'Empresas', precio: '', texto: 'Jornadas de voluntariado para equipos y patrocinio de acciones.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    const s = d.servicios?.[0];
    const tarjeta = s ? `<div class="w-tarjeta"><p class="w-tarjeta-t">${esc(s.nombre)}</p>${s.texto ? `<p>${esc(s.texto)}</p>` : ''}</div>` : '';
    return `<header class="w-cab w-cab-causa${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis"><div class="w-ventana">${fotoO(c, ILUSTRACION)}</div>${tarjeta}</div></div></header>`;
  },
  tras: () => '<div class="w-ola" aria-hidden="true"></div>',
  css: `
.w-d-causa{--w-fondo:#fbf7f0;--w-papel:#fffdf9;--w-tinta:#16302f;--w-suave:#4d6461;--w-borde:#e6dccb;--w-panel:#f3ebdd;--w-mar:#0d5955;--w-mar-claro:#6cc4bb;--w-sol:#f2b04a;--w-arcilla:#d96c4a;--w-r:22px;--w-esp:24px}
.w-d-causa .w-nav{background:var(--w-fondo);border-bottom:1px solid var(--w-borde)}
.w-d-causa .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:600}
.w-d-causa .w-boton{border-radius:999px;font-weight:700}
.w-d-causa .w-boton-lleno{box-shadow:0 12px 24px -14px #0d5955e6}
.w-d-causa .w-cab{position:relative;overflow:hidden;background:radial-gradient(60% 70% at 100% 0,#fde3c2,transparent 70%),var(--w-fondo);padding-bottom:clamp(34px,6cqw,80px)}
.w-d-causa .w-cab-in{display:grid;gap:clamp(30px,5cqw,64px);align-items:center;padding-top:clamp(34px,6cqw,84px)}
.w-d-causa .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-causa .w-sector{display:inline-flex;align-items:center;gap:10px;margin:0;padding:6px 14px;border-radius:999px;background:#d7efeb;color:var(--w-mar);font:700 .8rem/1.2 var(--w-ft-texto);letter-spacing:.06em}
.w-d-causa .w-sector::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--w-arcilla)}
.w-d-causa .w-cab h1{font-size:min(clamp(2.7rem,7.2cqw,5.2rem),var(--w-h1-tope,99em));font-weight:600;line-height:.98;letter-spacing:-.02em;color:var(--w-tinta);overflow-wrap:break-word;text-wrap:balance}
.w-d-causa .w-cab .w-lema-bloque{font-size:clamp(1.08rem,2.2cqw,1.3rem);line-height:1.6;color:var(--w-suave);max-width:42ch}
.w-d-causa .w-cab .w-boton{min-height:52px;padding-inline:26px}
.w-d-causa .w-cab-vis{position:relative;min-width:0;width:100%;max-width:38rem;justify-self:center;padding-bottom:34px}
.w-d-causa .w-ventana{overflow:hidden;border-radius:36px 36px 36px 120px;box-shadow:0 30px 60px -34px #16302fcc}
.w-d-causa .w-ventana .w-ilus{display:block;width:100%;height:auto;aspect-ratio:7/5}
.w-d-causa .w-cab-foto{margin:0}
.w-d-causa .w-cab-foto img{width:100%;aspect-ratio:7/5;object-fit:cover}
.w-d-causa .w-tarjeta{position:absolute;right:-4px;bottom:0;max-width:70%;padding:14px 18px;background:var(--w-papel);border-radius:18px;border-left:6px solid var(--w-sol);box-shadow:0 20px 40px -22px #16302fb3}
.w-d-causa .w-tarjeta p{margin:0;font-size:.92rem;line-height:1.4;color:var(--w-suave)}
.w-d-causa .w-tarjeta .w-tarjeta-t{font:600 1.15rem/1.2 var(--w-ft-titulo);color:var(--w-tinta);margin-bottom:4px}
.w-d-causa .w-ola{height:42px;background:var(--w-panel);-webkit-mask:radial-gradient(28px 22px at 50% 0,#0000 98%,#000) 0 0/56px 100%;mask:radial-gradient(28px 22px at 50% 0,#0000 98%,#000) 0 0/56px 100%}
.w-d-causa .w-sec h2{font-weight:600;font-size:clamp(1.9rem,5cqw,3rem);line-height:1.05;letter-spacing:-.015em}
.w-d-causa .w-sec:nth-of-type(odd){background:var(--w-panel)}
.w-d-causa .w-servicio{background:var(--w-papel);border-radius:var(--w-r);border:1px solid var(--w-borde)}
.w-d-causa .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:600;color:var(--w-mar)}
.w-d-causa .w-galeria img{border-radius:var(--w-r)}
.w-d-causa .w-opinion{background:var(--w-papel);border-radius:var(--w-r);border-top:5px solid var(--w-mar-claro)}
.w-d-causa .w-zonas>li{border-radius:999px;background:#d7efeb;color:var(--w-mar);font-weight:600}
@container (min-width:760px){
  .w-d-causa .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr)}
  .w-d-causa .w-cab-vis{justify-self:end}
}
`,
};
