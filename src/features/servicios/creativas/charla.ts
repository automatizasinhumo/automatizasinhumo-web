import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Lingua» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): academia de idiomas con el aula dibujada en trazo grueso,
 * bocadillos de saludo en seis idiomas con sombra plana, letra Young Serif y Lexend. Reescrito
 * para el contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript); el aula es la de
 * la plantilla y los bocadillos van dentro de la ilustración, así que con otro sector no salen.
 */

const BOCADILLOS: readonly [string, string][] = [
  ['es', '¡Hola!'],
  ['fr', 'Bonjour !'],
  ['it', 'Ciao!'],
  ['de', 'Hallo!'],
  ['ja', 'Konnichiwa!'],
  ['pt', 'Olá!'],
];

/** Sin foto: el aula de «Lingua» con los saludos alrededor. */
const ILUSTRACION = `<div class="w-aula"><svg class="w-ilus" viewBox="0 0 1200 1000" aria-hidden="true" focusable="false"><rect width="1200" height="1000" fill="#f3ecdd"/><rect x="660" y="90" width="420" height="330" rx="18" fill="#e4e7fb" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M870 90v330M660 255h420" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="980" cy="180" r="40" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M120 300h400" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="140" y="186" width="26" height="110" rx="4" fill="#2f3fb0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="172" y="200" width="22" height="96" rx="4" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="200" y="176" width="30" height="120" rx="4" fill="#e25c3c" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="236" y="206" width="20" height="90" rx="4" fill="#2f9a68" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="262" y="192" width="26" height="104" rx="4" fill="#c24b8e" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="330" y="216" width="90" height="80" rx="10" fill="#ffffff" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M346 244h58M346 266h36" stroke="#1c1f3a" stroke-width="6" stroke-linecap="round"/><path d="M1080 760c-30-40-20-90 0-110 20 20 30 70 0 110zM1080 760c-50-10-70-50-62-80 30 4 56 40 62 80zM1080 760c50-10 70-50 62-80-30 4-56 40-62 80z" fill="#2f9a68" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M1040 760h80l-10 70h-60z" fill="#e25c3c" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><g transform="translate(300 560) scale(1.0666666666666667)"><path d="M-68 -10C-72 -70 -40 -86 0 -86S72 -70 68 -10L74 96H-74z" fill="#3a2418" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-120 200C-120 120 -70 90 0 90S120 120 120 200z" fill="#2f3fb0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-26 92 0 126 26 92" fill="none" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-20 50v44c0 12 40 12 40 0V50" fill="#c98b62" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="-58" cy="4" rx="11" ry="15" fill="#c98b62" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="58" cy="4" rx="11" ry="15" fill="#c98b62" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="58" ry="66" fill="#c98b62" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="-60" cy="26" r="7" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="60" cy="26" r="7" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-60 -6C-62 -58 -32 -72 0 -72S58 -60 60 -10C40 -30 18 -44 -6 -46 -26 -38 -42 -26 -60 -6z" fill="#3a2418" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="-21" cy="6" r="5.5" fill="#1c1f3a"/><circle cx="21" cy="6" r="5.5" fill="#1c1f3a"/><path d="M-16 34C-8 44 8 44 16 34" fill="none" stroke="#1c1f3a" stroke-width="5" stroke-linecap="round"/><circle cx="-34" cy="24" r="8" fill="#e25c3c" opacity=".25"/><circle cx="34" cy="24" r="8" fill="#e25c3c" opacity=".25"/></g><g transform="translate(560 520) scale(1.0666666666666667)"><path d="M-120 200C-120 120 -70 90 0 90S120 120 120 200z" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-26 92 0 126 26 92" fill="none" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-20 50v44c0 12 40 12 40 0V50" fill="#5e3a26" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="-58" cy="4" rx="11" ry="15" fill="#5e3a26" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="58" cy="4" rx="11" ry="15" fill="#5e3a26" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="58" ry="66" fill="#5e3a26" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-56 -20C-54 -58 -26 -68 0 -68S54 -58 56 -20C44 -40 24 -48 0 -48S-44 -40 -56 -20z" fill="#151515" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="-21" cy="6" r="5.5" fill="#1c1f3a"/><circle cx="21" cy="6" r="5.5" fill="#1c1f3a"/><path d="M-16 34C-8 44 8 44 16 34" fill="none" stroke="#1c1f3a" stroke-width="5" stroke-linecap="round"/><circle cx="-34" cy="24" r="8" fill="#e25c3c" opacity=".25"/><circle cx="34" cy="24" r="8" fill="#e25c3c" opacity=".25"/></g><g transform="translate(820 560) scale(1.0666666666666667)"><path d="M-68 -14C-70 -72 -38 -84 0 -84S70 -72 68 -14L70 30H-70z" fill="#a99377" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-120 200C-120 120 -70 90 0 90S120 120 120 200z" fill="#2f9a68" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-20 50v44c0 12 40 12 40 0V50" fill="#efc7a0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="-58" cy="4" rx="11" ry="15" fill="#efc7a0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="58" cy="4" rx="11" ry="15" fill="#efc7a0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><ellipse cx="0" cy="0" rx="58" ry="66" fill="#efc7a0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M-62 10C-64 -56 -32 -72 0 -72S64 -56 62 10C54 -16 38 -34 10 -40 -18 -34 -46 -20 -62 10z" fill="#a99377" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><circle cx="-21" cy="6" r="5.5" fill="#1c1f3a"/><circle cx="21" cy="6" r="5.5" fill="#1c1f3a"/><path d="M-16 34C-8 44 8 44 16 34" fill="none" stroke="#1c1f3a" stroke-width="5" stroke-linecap="round"/><circle cx="-34" cy="24" r="8" fill="#e25c3c" opacity=".25"/><circle cx="34" cy="24" r="8" fill="#e25c3c" opacity=".25"/><g fill="none" stroke="#1c1f3a" stroke-width="4.5"><circle cx="-21" cy="6" r="14"/><circle cx="21" cy="6" r="14"/><path d="M-7 6h14M-35 4l-20-4M35 4l20-4"/></g></g><ellipse cx="560" cy="860" rx="500" ry="120" fill="#ffffff" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M250 790h44v44a10 10 0 0 1-10 10h-24a10 10 0 0 1-10-10z" fill="#e25c3c" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M294 800h8a10 10 0 0 1 0 20h-8" fill="none" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M840 800h44v44a10 10 0 0 1-10 10h-24a10 10 0 0 1-10-10z" fill="#2f3fb0" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M884 810h8a10 10 0 0 1 0 20h-8" fill="none" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M470 820l90-30 90 30-90 30z" fill="#f6bf3f" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M560 790v60" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="150" y="330" width="220" height="96" rx="20" fill="#fde3da" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M172 426l-6 22 18-22" fill="#fde3da" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M170 370h180M170 388h108" stroke="#1c1f3a" stroke-width="6" stroke-linecap="round"/><rect x="470" y="270" width="200" height="96" rx="20" fill="#ffffff" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M492 366l-6 22 18-22" fill="#ffffff" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M490 310h160M490 328h96" stroke="#1c1f3a" stroke-width="6" stroke-linecap="round"/><rect x="760" y="330" width="220" height="96" rx="20" fill="#d6efe1" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M946 426l12 22 6-22" fill="#d6efe1" stroke="#1c1f3a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><path d="M780 370h180M780 388h108" stroke="#1c1f3a" stroke-width="6" stroke-linecap="round"/></svg>${BOCADILLOS.map(([t, s]) => `<span class="w-bocadillo w-tono-${t}" lang="${t}" aria-hidden="true">${s}</span>`).join('')}</div>`;

export const charla: Diseno = {
  id: 'charla',
  nombre: 'Charla',
  descripcion: 'Aula dibujada en trazo grueso y bocadillos de saludo en seis idiomas. Para academias de idiomas, profesores particulares y escuelas de lenguas.',
  color: '#2f3fb0',
  fondoClaro: '#f3ecdd',
  fondoOscuro: '#1c1f3a',
  fuentes: ['ash-young-serif', 'ash-lexend'],
  titulo: "'ash-young-serif', 'Cooper Black', Georgia, serif",
  texto: "'ash-lexend', system-ui, sans-serif",
  servicios: 3,
  galeria: 2,
  opiniones: 3,
  contacto: 3,
  orden: ['servicios', 'sobre', 'opiniones', 'horario', 'galeria', 'preguntas', 'zonas', 'contacto'],
  sectores: ['academia'],
  palabras: ['idioma', 'ingles', 'frances', 'aleman', 'italiano', 'portugues', 'lenguas', 'english'],
  titulos: { servicios: 'Cursos', sobre: 'Cómo enseñamos', opiniones: 'Lo cuentan nuestros alumnos', horario: 'Horario de secretaría', galeria: 'Nuestras aulas', preguntas: 'Antes de matricularte', zonas: 'Dónde damos clase', contacto: 'Pide tu prueba de nivel' },
  muestra: {
    negocio: 'Academia Babel',
    sector: 'Academia de idiomas',
    lema: 'Inglés, francés y alemán en grupos de seis. Prueba de nivel gratis y clase de muestra antes de pagar.',
    servicios: [
      { nombre: 'Inglés general', precio: 'desde 65 € al mes', texto: 'Dos clases a la semana, de A1 a C1, en grupos reducidos.' },
      { nombre: 'Preparación de exámenes', precio: 'desde 80 € al mes', texto: 'Cambridge, EOI y DELF con simulacros y corrección de redacciones.' },
      { nombre: 'Clases particulares', precio: 'desde 22 € la hora', texto: 'Presenciales u online, al ritmo que necesites.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    return `<header class="w-cab w-cab-charla${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-charla{--w-fondo:#fbf8f1;--w-papel:#fff;--w-tinta:#1c1f3a;--w-suave:#4b4f6e;--w-borde:#1c1f3a;--w-panel:#f3ecdd;--w-suave-c:#e4e7fb;--w-tomate:#e25c3c;--w-sol:#f6bf3f;--w-menta:#bfe5d1;--w-r:18px;--w-esp:24px}
.w-d-charla .w-nav{background:var(--w-fondo);border-bottom:2px solid var(--w-tinta)}
.w-d-charla .w-nav-marca{font-family:var(--w-ft-titulo)}
.w-d-charla .w-boton{border-radius:14px;border:2px solid var(--w-tinta);font-weight:600;box-shadow:4px 4px 0 var(--w-tinta)}
.w-d-charla .w-boton:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--w-tinta)}
.w-d-charla .w-cab{background:var(--w-fondo);padding-bottom:clamp(34px,6cqw,80px)}
.w-d-charla .w-cab-in{display:grid;gap:clamp(30px,5cqw,64px);align-items:center;padding-top:clamp(34px,6cqw,84px)}
.w-d-charla .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-charla .w-sector{display:inline-block;margin:0;padding:6px 14px;border:2px solid var(--w-tinta);border-radius:999px;background:var(--w-menta);font:600 .82rem/1.2 var(--w-ft-texto)}
.w-d-charla .w-cab h1{font-size:min(clamp(2.6rem,7cqw,4.6rem),var(--w-h1-tope,99em));font-weight:400;line-height:1.02;letter-spacing:-.01em;overflow-wrap:break-word;text-wrap:balance}
.w-d-charla .w-cab .w-lema-bloque{font-size:clamp(1.05rem,2.1cqw,1.25rem);line-height:1.6;color:var(--w-suave);max-width:42ch}
.w-d-charla .w-cab .w-boton{min-height:52px;padding-inline:24px}
.w-d-charla .w-cab-vis{position:relative;min-width:0;width:100%;max-width:36rem;justify-self:center;padding:22px 18px}
.w-d-charla .w-aula{position:relative}
.w-d-charla .w-aula .w-ilus{display:block;width:100%;height:auto;aspect-ratio:6/5;border:3px solid var(--w-tinta);border-radius:28px;background:var(--w-panel)}
.w-d-charla .w-bocadillo{position:absolute;padding:8px 14px;border:2px solid var(--w-tinta);border-radius:16px;box-shadow:4px 4px 0 var(--w-tinta);font:400 clamp(.95rem,2.4cqw,1.2rem)/1 var(--w-ft-titulo);white-space:nowrap}
.w-d-charla .w-tono-es{left:2%;top:4%;background:#fde3da;color:#962e15;transform:rotate(-4deg)}
.w-d-charla .w-tono-fr{right:3%;top:0;background:#e1e5fb;color:#2a389a;transform:rotate(3deg)}
.w-d-charla .w-tono-it{right:-3%;top:46%;background:#d6efe1;color:#1b6542}
.w-d-charla .w-tono-de{left:-4%;top:52%;background:#fcefc5;color:#714b04;transform:rotate(-3deg)}
.w-d-charla .w-tono-ja{left:14%;bottom:-4%;background:#f5e0ee;color:#80285d;transform:rotate(2deg)}
.w-d-charla .w-tono-pt{right:12%;bottom:2%;background:#d5edf2;color:#155e6b;transform:rotate(-2deg)}
.w-d-charla .w-cab-foto{margin:0}
.w-d-charla .w-cab-foto img{width:100%;aspect-ratio:6/5;object-fit:cover;border:3px solid var(--w-tinta);border-radius:28px}
.w-d-charla .w-sec h2{font-weight:400;font-size:clamp(1.9rem,5cqw,3rem);line-height:1.05}
.w-d-charla .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-charla .w-servicio,.w-d-charla .w-opinion{background:var(--w-papel);border:2px solid var(--w-tinta);border-radius:var(--w-r);box-shadow:5px 5px 0 var(--w-tinta)}
.w-d-charla .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:400}
.w-d-charla .w-opinion:nth-child(3n+1){background:#fde3da}
.w-d-charla .w-opinion:nth-child(3n+2){background:#e1e5fb}
.w-d-charla .w-opinion:nth-child(3n){background:#d6efe1}
.w-d-charla .w-galeria img{border:2px solid var(--w-tinta);border-radius:var(--w-r)}
.w-d-charla .w-zonas>li{border:2px solid var(--w-tinta);border-radius:999px;background:var(--w-suave-c);font-weight:600}
@container (min-width:760px){
  .w-d-charla .w-cab-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .w-d-charla .w-cab-vis{justify-self:end}
}
`,
};
