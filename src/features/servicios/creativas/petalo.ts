import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Bloom» de Freeframe (licencia MIT, (c) 2026 Freeframe): lujo tranquilo
 * en ciruela, rosa empolvado y salvia; titular serif de alto contraste con el final en cursiva, un
 * arco con el retrato ilustrado y hojas, una tarjeta flotante con el horario y tarjetas de
 * tratamiento con icono en círculo. Reescrito para el contrato de diseños de autor (HTML + CSS con
 * ámbito, sin JavaScript) y con las tipografías que ya sirve la web (Playfair Display y Outfit).
 */

/** Sin foto: el retrato en arco de Bloom, con hojas de salvia y destellos. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 600 640" aria-hidden="true" focusable="false">
<defs><linearGradient id="w-petalo-pelo" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#3b2418"/><stop offset=".5" stop-color="#9a5b3a"/><stop offset="1" stop-color="#e7b27c"/></linearGradient></defs>
<path class="arco" d="M60 640V280a240 240 0 0 1 480 0v360z"/>
<circle class="sol" cx="390" cy="190" r="62"/>
<path class="ropa" d="M120 640C150 530 210 470 300 470S460 530 480 640Z"/>
<path class="piel-2" d="M262 380h76v110c0 20-76 20-76 0z"/>
<path fill="url(#w-petalo-pelo)" d="M232 260C226 180 270 140 318 140C380 140 420 190 410 270C430 340 470 420 500 520C440 560 380 520 360 470C350 420 340 370 340 330Z"/>
<path class="piel" d="M250 250C246 200 280 166 320 166C360 166 386 196 384 250C386 300 360 350 316 356C278 362 252 320 250 250Z"/>
<path fill="url(#w-petalo-pelo)" d="M246 232C248 176 292 150 330 154C372 158 398 192 394 236C372 198 340 184 304 188C278 192 258 208 246 232Z"/>
<path class="ojo" d="M290 262q10 6 20 0"/>
<path class="boca" d="M296 316q14 8 28 0"/>
<path class="brillo" d="M392 230C420 300 430 380 470 470"/>
<g class="hojas"><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(70 470) rotate(-30) scale(1.4)"/><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(96 420) rotate(-60) scale(1.1)"/><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(58 530) rotate(10) scale(1.2)"/><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(480 120) rotate(140) scale(1.1)"/><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(510 170) rotate(170) scale(1.3)"/><path d="M0 0C14-30 46-40 70-34C60-8 30 8 0 0Z" transform="translate(470 210) rotate(120) scale(.9)"/></g>
<g class="motas"><circle cx="150" cy="220" r="4"/><circle cx="450" cy="300" r="3"/><circle cx="180" cy="330" r="2.5"/><circle cx="420" cy="420" r="3"/></g>
</svg>`;

/** El nombre con sus últimas palabras en cursiva y color (la mitad final, al menos una). */
const conCursiva = (negocio: string, esc: (s: string) => string): string => {
  const palabras = negocio.trim().split(/\s+/);
  if (palabras.length < 2) return `<em>${esc(palabras[0] ?? '')}</em>`;
  const corte = Math.ceil(palabras.length / 2);
  return `${esc(palabras.slice(0, corte).join(' '))} <em>${esc(palabras.slice(corte).join(' '))}</em>`;
};

export const petalo: Diseno = {
  id: 'petalo',
  nombre: 'Pétalo',
  descripcion: 'Lujo tranquilo: ciruela y rosa empolvado, titular serif con cursiva, retrato en arco y tratamientos en tarjetas. Para centros de estética, uñas, spa y masajes.',
  color: '#7a3e5b',
  fondoClaro: '#f3e4dd',
  fondoOscuro: '#2a2127',
  fuentes: ['ash-playfair', 'ash-outfit'],
  titulo: "'ash-playfair', 'Bodoni 72', Didot, Georgia, serif",
  texto: "'ash-outfit', system-ui, sans-serif",
  servicios: 1,
  galeria: 1,
  opiniones: 1,
  contacto: 2,
  orden: ['servicios', 'opiniones', 'galeria', 'preguntas', 'horario', 'sobre', 'contacto'],
  titulos: { servicios: 'Tratamientos', galeria: 'Nuestro espacio', opiniones: 'Lo que nos dicen', preguntas: 'Antes de tu cita', sobre: 'Quiénes somos' },
  muestra: {
    negocio: 'Estética Pétalo',
    sector: 'Facial · Manos · Depilación · Masaje',
    lema: 'Citas sin prisas, productos amables con tu piel y un rato solo para ti.',
    servicios: [
      { nombre: 'Facial Pétalo', precio: 'desde 45 €', texto: 'Doble limpieza, exfoliación suave, masaje y mascarilla según tu piel.' },
      { nombre: 'Manicura semipermanente', precio: 'desde 22 €', texto: 'Forma, cutículas y esmaltado que aguanta dos semanas.' },
      { nombre: 'Depilación', precio: 'desde 8 €', texto: 'Con cera tibia, por zonas y sin tirones.' },
      { nombre: 'Masaje relajante', precio: 'desde 40 €', texto: 'Cincuenta minutos con aceites templados para soltar tensión.' },
    ],
    opiniones: [
      { texto: 'La hora más tranquila del mes. La piel me brilló días y nadie intentó venderme doce cremas.', autor: 'Marta S.' },
      { texto: 'Por fin una manicura que dura. Te atienden con calma y te explican todo.', autor: 'Lucía R.' },
    ],
    preguntas: [
      { pregunta: '¿Tengo que preparar algo antes del facial?', respuesta: 'Ven sin maquillaje si puedes. Si tienes alguna alergia o tomas medicación, dínoslo al pedir cita.' },
      { pregunta: '¿Puedo cambiar mi cita?', respuesta: 'Sí, avísanos con un día de antelación y te buscamos otro hueco.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    const primera = c.horario[0];
    const tarjeta = primera
      ? `<div class="w-flota"><p class="w-flota-ante">Abrimos</p><p class="w-flota-dia">${esc(primera[0] || 'Horario')}</p><p class="w-flota-hora">${esc(primera[1])}</p></div>`
      : '';
    return `<header class="w-cab w-cab-petalo${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${conCursiva(d.negocio, esc)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}${tarjeta}</div></div></header>`;
  },
  tras: (c) => {
    const via = ({ wa: 'por WhatsApp', tel: 'por teléfono', mail: 'por correo', cita: 'en la agenda' } as Record<string, string>)[c.principal?.[1] ?? 'mail'] ?? '';
    const pasos = [
      ['Pide tu cita', `Elige el tratamiento y el día ${via}`.trim() + '.'],
      ['Hablamos antes', 'Unos minutos para conocer tu piel y lo que buscas.'],
      ['Te vas con pautas', 'Te contamos cómo cuidarte en casa hasta la próxima.'],
    ];
    return `<section class="w-ritual" aria-label="Tu primera visita"><div class="w-in"><p class="w-ritual-ante">Tu primera visita</p><ol>${pasos
      .map(([t, x]) => `<li><h3>${t}</h3><p>${x}</p></li>`)
      .join('')}</ol></div></section>`;
  },
  css: `
.w-d-petalo{--w-fondo:#faf6f2;--w-papel:#fffdfb;--w-tinta:#2a2127;--w-suave:#685a5f;--w-borde:#e3d3ca;--w-panel:#f3e4dd;--w-salvia:#5a6954;--w-oro:#a5804f;--w-r:22px;--w-esp:24px;counter-reset:w-paso;background:var(--w-fondo);color:var(--w-tinta)}
.w-d-petalo .w-nav{background:color-mix(in srgb,var(--w-fondo) 92%,transparent);border-bottom:1px solid var(--w-borde)}
.w-d-petalo .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:600;letter-spacing:.01em}
.w-d-petalo .w-boton{border-radius:999px;font-weight:500;letter-spacing:.02em;border:1px solid var(--w-tinta);color:var(--w-tinta);background:transparent;transition:background-color .2s,color .2s}
.w-d-petalo .w-boton:hover{background:var(--w-tinta);color:var(--w-fondo)}
.w-d-petalo .w-boton-lleno{background:var(--w-c);border-color:var(--w-c);color:var(--w-s)}
.w-d-petalo .w-boton-lleno:hover{background:var(--w-tinta);border-color:var(--w-tinta);color:var(--w-fondo)}
@media (prefers-reduced-motion:reduce){.w-d-petalo .w-boton{transition:none}}
.w-d-petalo .w-cab{position:relative;overflow:hidden;background:radial-gradient(60% 80% at 80% 0,var(--w-panel),transparent 70%),var(--w-fondo)}
.w-d-petalo .w-cab-in{display:grid;gap:clamp(28px,5cqw,64px);align-items:center;padding-block:clamp(32px,6cqw,96px)}
.w-d-petalo .w-cab-txt>*+*{margin-top:clamp(16px,2.2cqw,26px)}
.w-d-petalo .w-sector{font:500 .78rem/1.4 var(--w-ft-texto);letter-spacing:.22em;text-transform:uppercase;color:var(--w-suave)}
.w-d-petalo .w-cab h1{font-size:min(clamp(2.7rem,11cqw,5.5rem),var(--w-h1-tope,99em));font-weight:500;line-height:1.02;letter-spacing:-.015em;overflow-wrap:break-word;text-wrap:balance}
.w-d-petalo .w-cab h1 em{display:block;font-style:italic;color:var(--w-ct)}
.w-d-petalo .w-cab .w-lema-bloque{font-size:clamp(1.06rem,2.1cqw,1.22rem);line-height:1.65;color:var(--w-suave);max-width:40ch}
.w-d-petalo .w-cab .w-boton{min-height:52px;padding-inline:26px}
.w-d-petalo .w-cab-vis{position:relative;min-width:0;max-width:32rem;width:100%;justify-self:center}
.w-d-petalo .w-ilus .arco{fill:var(--w-panel)}
.w-d-petalo .w-ilus .sol{fill:var(--w-oro);opacity:.35}
.w-d-petalo .w-ilus .ropa{fill:var(--w-c)}
.w-d-petalo .w-ilus .piel{fill:#efc4a4}
.w-d-petalo .w-ilus .piel-2{fill:#d9a988}
.w-d-petalo .w-ilus .ojo{fill:none;stroke:var(--w-tinta);stroke-width:3;stroke-linecap:round}
.w-d-petalo .w-ilus .boca{fill:none;stroke:#b5535f;stroke-width:4.5;stroke-linecap:round}
.w-d-petalo .w-ilus .brillo{fill:none;stroke:#fff;stroke-width:7;opacity:.25;stroke-linecap:round}
.w-d-petalo .w-ilus .hojas path{fill:var(--w-salvia);opacity:.8}
.w-d-petalo .w-ilus .motas circle{fill:#fff;opacity:.7}
.w-d-petalo .w-cab-foto{margin:0;border-radius:999px 999px var(--w-r) var(--w-r);overflow:hidden}
.w-d-petalo .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-petalo .w-flota{position:absolute;left:-4px;bottom:8%;padding:14px 18px;border-radius:16px;background:color-mix(in srgb,var(--w-papel) 95%,transparent);box-shadow:0 18px 40px -24px rgb(42 33 39/.45)}
.w-d-petalo .w-flota p{margin:0}
.w-d-petalo .w-flota-ante{font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--w-suave)}
.w-d-petalo .w-flota-dia{margin-top:2px!important;font:500 1.12rem/1.25 var(--w-ft-titulo)}
.w-d-petalo .w-flota-hora{font-size:.9rem;color:var(--w-suave)}
.w-d-petalo .w-ritual{background:var(--w-papel);border-block:1px solid var(--w-borde);padding-block:clamp(36px,6cqw,72px)}
.w-d-petalo .w-ritual-ante{margin:0 0 22px;font:500 .78rem/1.4 var(--w-ft-texto);letter-spacing:.22em;text-transform:uppercase;color:var(--w-ct)}
.w-d-petalo .w-ritual ol{display:grid;gap:22px;list-style:none;margin:0;padding:0}
.w-d-petalo .w-ritual li{counter-increment:w-paso;padding-top:18px;border-top:1px solid var(--w-borde)}
.w-d-petalo .w-ritual li::before{content:counter(w-paso,upper-roman);display:block;margin-bottom:6px;font:italic 500 1.5rem/1 var(--w-ft-titulo);color:var(--w-ct)}
.w-d-petalo .w-ritual h3{margin:0 0 4px;font:500 1.3rem/1.25 var(--w-ft-titulo)}
.w-d-petalo .w-ritual p{margin:0;color:var(--w-suave)}
.w-d-petalo .w-sec h2{font-weight:500;font-size:clamp(2rem,5cqw,3.1rem);line-height:1.08;letter-spacing:-.01em}
.w-d-petalo .w-sec:nth-of-type(even){background:color-mix(in srgb,var(--w-panel) 55%,var(--w-fondo))}
.w-d-petalo .w-s-1>li{background:var(--w-papel);border:1px solid var(--w-borde);border-radius:var(--w-r);box-shadow:0 18px 40px -30px rgb(42 33 39/.35)}
.w-d-petalo .w-s-1>li::before{content:"";display:block;width:44px;height:44px;margin-bottom:18px;border-radius:50%;background:radial-gradient(circle at 50% 50%,var(--w-c) 0 5px,transparent 6px),var(--w-panel)}
.w-d-petalo .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:500;font-size:1.45rem}
.w-d-petalo .w-galeria img{border-radius:var(--w-r)}
.w-d-petalo .w-opinion{background:var(--w-papel);border:1px solid var(--w-borde);border-radius:var(--w-r)}
.w-d-petalo .w-opinion blockquote,.w-d-petalo .w-opinion p:first-child{font-family:var(--w-ft-titulo);font-size:1.15rem;line-height:1.45}
.w-d-petalo .w-c-2 .w-contacto-cta{background:var(--w-c);color:var(--w-s);border-radius:calc(var(--w-r) + 10px)}
.w-d-petalo .w-c-2 .w-contacto-grande a{color:inherit}
.w-d-petalo .w-c-2 .w-contacto-cta .w-boton{color:var(--w-s);border-color:currentColor}
.w-d-petalo .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-fondo);color:var(--w-tinta);border-color:var(--w-fondo)}
@container (min-width:760px){
  .w-d-petalo .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,1fr)}
  .w-d-petalo .w-cab-vis{justify-self:end}
  .w-d-petalo .w-ritual ol{grid-template-columns:repeat(3,minmax(0,1fr));gap:36px}
}
`,
};
