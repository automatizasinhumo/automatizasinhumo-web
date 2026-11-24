import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Handy» de Freeframe (licencia MIT, (c) 2026 Freeframe): azul marino y
 * amarillo de seguridad, la última palabra del nombre subrayada a rotulador, una franja de datos
 * bajo la portada, una banda oscura con los pasos para pedir el servicio y botones con sombra sólida.
 * Reescrito para el contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript) y con las
 * tipografías que ya sirve la web (Archivo y Manrope).
 */

/** Sin foto: una ventana recién limpiada con su brillo, la rasqueta, el pulverizador y destellos. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 560 600" aria-hidden="true" focusable="false">
<ellipse cx="280" cy="584" rx="236" ry="12" class="sombra"/>
<rect class="marco" x="70" y="40" width="380" height="440" rx="18"/>
<rect class="vidrio" x="96" y="66" width="152" height="182" rx="6"/>
<rect class="vidrio" x="272" y="66" width="152" height="182" rx="6"/>
<rect class="vidrio" x="96" y="272" width="152" height="182" rx="6"/>
<rect class="vidrio sucio" x="272" y="272" width="152" height="182" rx="6"/>
<g class="reflejo"><path d="M118 150l60-60M118 196l100-100M290 210l90-90M290 160l50-50M118 360l70-70"/></g>
<g class="espuma"><circle cx="318" cy="330" r="14"/><circle cx="344" cy="316" r="10"/><circle cx="366" cy="340" r="16"/><circle cx="392" cy="318" r="9"/><circle cx="340" cy="356" r="9"/></g>
<g class="rasqueta" transform="rotate(-14 350 410)"><rect class="hoja" x="288" y="392" width="124" height="16" rx="6"/><rect class="mango" x="342" y="408" width="16" height="74" rx="7"/></g>
<rect class="alfeizar" x="50" y="476" width="420" height="22" rx="8"/>
<g class="spray"><path class="bote" d="M418 580v-120c0-22 14-34 36-34h20c22 0 36 12 36 34v120a6 6 0 0 1-6 6h-80a6 6 0 0 1-6-6z"/><rect class="etiq" x="430" y="490" width="68" height="54" rx="6"/><path class="gatillo" d="M436 426v-36h56l26 20-16 10h-26v6z"/><path class="tubo" d="M500 400h28"/></g>
<g class="cubo"><path d="M72 580l-14-104h140l-14 104z"/><path class="asa" d="M66 476c0-54 124-54 124 0"/><path class="agua" d="M62 488h132"/></g>
<g class="destello"><path d="M500 120l9 25 25 9-25 9-9 25-9-25-25-9 25-9z"/><path d="M44 250l6 17 17 6-17 6-6 17-6-17-17-6 17-6z"/><path d="M200 300l5 13 13 5-13 5-5 13-5-13-13-5 13-5z"/></g>
</svg>`;

/** El nombre con su última palabra subrayada a rotulador (si es una sola palabra, entera). */
const conRotulador = (negocio: string, esc: (s: string) => string): string => {
  const limpio = negocio.trim();
  const corte = limpio.lastIndexOf(' ');
  const [antes, ultima] = corte < 0 ? ['', limpio] : [limpio.slice(0, corte + 1), limpio.slice(corte + 1)];
  return `${esc(antes)}<span class="w-rotulador">${esc(ultima)}</span>`;
};

export const brillo: Diseno = {
  id: 'brillo',
  nombre: 'Brillo',
  descripcion: 'Azul marino y amarillo, el nombre subrayado a rotulador y los pasos para pedir presupuesto. Para empresas de limpieza, mantenimiento y servicios a domicilio.',
  color: '#ffc21a',
  fondoClaro: '#f7f5f0',
  fondoOscuro: '#0f2a44',
  fuentes: ['ash-archivo', 'ash-manrope'],
  titulo: "'ash-archivo', 'Arial Narrow', system-ui, sans-serif",
  texto: "'ash-manrope', system-ui, sans-serif",
  servicios: 1,
  galeria: 1,
  opiniones: 1,
  contacto: 2,
  orden: ['servicios', 'opiniones', 'preguntas', 'galeria', 'zonas', 'horario', 'sobre', 'contacto'],
  titulos: { servicios: 'Qué limpiamos', galeria: 'Antes y después', opiniones: 'Lo que dicen nuestros clientes', preguntas: 'Antes de contratar', zonas: 'Dónde trabajamos', sobre: 'Quiénes somos' },
  muestra: {
    negocio: 'Limpiezas Brillo',
    sector: 'Limpieza de hogares y oficinas',
    lema: 'Personal de confianza, productos para cada superficie y presupuesto en el día.',
    zonas: 'Zaragoza, Utebo, Cuarte, Villanueva',
    servicios: [
      { nombre: 'Hogares', precio: '', texto: 'Limpieza periódica o puntual, por horas o por servicio.' },
      { nombre: 'Oficinas y locales', precio: '', texto: 'Antes de abrir o al cerrar, en el horario que te venga bien.' },
      { nombre: 'Comunidades', precio: '', texto: 'Portales, escaleras, ascensores y garajes.' },
      { nombre: 'Fin de obra', precio: '', texto: 'Quitamos polvo, restos de pintura y cemento para entrar a vivir.' },
    ],
    preguntas: [
      { pregunta: '¿Qué productos usáis?', respuesta: 'Los adecuados para cada superficie: madera, mármol, cristal o acero. Si prefieres los tuyos, los usamos.' },
      { pregunta: '¿Cómo calculáis el presupuesto?', respuesta: 'Según los metros, el tipo de limpieza y cada cuánto la quieres. Te lo damos el mismo día y sin compromiso.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    const primera = c.horario[0];
    const datos = [
      c.zonas.length ? `<li>${c.icono('zona')}<span>${c.zonas.map((z) => esc(z)).join(', ')}</span></li>` : '',
      primera ? `<li>${c.icono('reloj')}<span>${esc(primera[0] || 'Horario')}: ${esc(primera[1])}</span></li>` : '',
      c.tel ? `<li>${c.icono('tel')}<a href="${esc(c.tel)}">${esc(d.telefono)}</a></li>` : '',
    ].join('');
    const franja = datos ? `<div class="w-franja-datos"><ul class="w-in">${datos}</ul></div>` : '';
    return `<header class="w-cab w-cab-brillo${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${conRotulador(d.negocio, esc)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div>${franja}</header>`;
  },
  tras: (c) => {
    const pasos = [
      ['Nos cuentas qué necesitas', `${{ wa: 'Por WhatsApp', tel: 'Por teléfono', mail: 'Por correo', cita: 'Pide cita' }[c.principal?.[1] ?? 'mail'] ?? 'Escríbenos'}: qué hay que limpiar y cada cuánto.`],
      ['Te damos presupuesto', 'Claro y sin compromiso, el mismo día.'],
      ['Lo dejamos brillante', 'Y si algo no te convence, volvemos.'],
    ];
    return `<section class="w-pasos" aria-label="Cómo trabajamos"><div class="w-in"><p class="w-pasos-ante">Cómo trabajamos</p><ol>${pasos
      .map(([t, x]) => `<li><h3>${t}</h3><p>${x}</p></li>`)
      .join('')}</ol></div></section>`;
  },
  css: `
.w-d-brillo{--w-fondo:#f7f5f0;--w-papel:#fff;--w-tinta:#0f2a44;--w-suave:#4a5a6b;--w-borde:#dcd8cc;--w-panel:#eceae2;--w-marino:#0f2a44;--w-marino-2:#1b3d5f;--w-r:14px;--w-esp:24px;counter-reset:w-srv w-paso;background:var(--w-fondo);color:var(--w-tinta)}
.w-d-brillo .w-nav{background:var(--w-fondo);border-bottom:2px solid var(--w-tinta)}
.w-d-brillo .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:800;letter-spacing:-.02em}
.w-d-brillo .w-boton{border-radius:10px;font-weight:800;border:2px solid var(--w-tinta);color:var(--w-tinta);box-shadow:0 6px 0 -2px var(--w-tinta);transition:transform .15s,box-shadow .15s}
.w-d-brillo .w-boton:hover{transform:translateY(2px);box-shadow:0 3px 0 -1px var(--w-tinta)}
.w-d-brillo .w-boton-lleno{background:var(--w-c);color:var(--w-s)}
@media (prefers-reduced-motion:reduce){.w-d-brillo .w-boton{transition:none}.w-d-brillo .w-boton:hover{transform:none}}
.w-d-brillo .w-cab{position:relative;overflow:hidden;background:radial-gradient(40% 50% at 0 10%,color-mix(in srgb,var(--w-c) 22%,transparent),transparent 70%),var(--w-fondo)}
.w-d-brillo .w-cab-in{display:grid;gap:clamp(24px,5cqw,56px);align-items:center;padding-block:clamp(30px,6cqw,80px)}
.w-d-brillo .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-brillo .w-sector{font:800 .82rem/1.2 var(--w-ft-texto);letter-spacing:.14em;text-transform:uppercase;color:var(--w-suave)}
.w-d-brillo .w-cab h1{margin-bottom:.2em;font-size:min(clamp(2.6rem,7.4cqw,5.4rem),var(--w-h1-tope,99em));font-weight:800;line-height:1.02;letter-spacing:-.03em;overflow-wrap:break-word;text-wrap:balance}
.w-d-brillo .w-rotulador{position:relative;white-space:nowrap;z-index:0}
.w-d-brillo .w-rotulador::after{content:"";position:absolute;z-index:-1;left:-.06em;right:-.06em;bottom:.04em;height:.34em;border-radius:.2em .5em .3em .6em;background:var(--w-c);transform:rotate(-1.2deg)}
.w-d-brillo .w-cab .w-lema-bloque{font-size:clamp(1.08rem,2.2cqw,1.3rem);line-height:1.55;color:var(--w-suave);max-width:38ch}
.w-d-brillo .w-cab .w-boton{min-height:54px;padding-inline:24px}
.w-d-brillo .w-cab-vis{position:relative;min-width:0;max-width:30rem;width:100%;justify-self:center}
.w-d-brillo .w-ilus *{stroke:var(--w-marino);stroke-linejoin:round;stroke-linecap:round}
.w-d-brillo .w-ilus .sombra{fill:var(--w-marino);opacity:.12;stroke:none}
.w-d-brillo .w-ilus .marco{fill:#fff;stroke-width:4}
.w-d-brillo .w-ilus .vidrio{fill:#dcebf7;stroke-width:3}
.w-d-brillo .w-ilus .vidrio.sucio{fill:#cfd8de}
.w-d-brillo .w-ilus .reflejo path{fill:none;stroke:#fff;stroke-width:9;opacity:.9}
.w-d-brillo .w-ilus .espuma circle{fill:#fff;stroke-width:2}
.w-d-brillo .w-ilus .hoja{fill:var(--w-marino)}
.w-d-brillo .w-ilus .mango{fill:var(--w-c);stroke-width:3}
.w-d-brillo .w-ilus .alfeizar{fill:var(--w-marino-2);stroke-width:3}
.w-d-brillo .w-ilus .bote{fill:#3d8fd1;stroke-width:3}
.w-d-brillo .w-ilus .etiq{fill:#fff;stroke-width:2.4}
.w-d-brillo .w-ilus .gatillo{fill:var(--w-marino);stroke-width:3}
.w-d-brillo .w-ilus .tubo{fill:none;stroke-width:5}
.w-d-brillo .w-ilus .cubo path{fill:var(--w-c);stroke-width:3}
.w-d-brillo .w-ilus .cubo .asa,.w-d-brillo .w-ilus .cubo .agua{fill:none;stroke-width:4}
.w-d-brillo .w-ilus .destello path{fill:var(--w-c);stroke-width:2.6}
.w-d-brillo .w-cab-foto{margin:0;border-radius:var(--w-r);overflow:hidden;border:3px solid var(--w-tinta);box-shadow:12px 12px 0 var(--w-c)}
.w-d-brillo .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-brillo .w-franja-datos{border-top:2px solid var(--w-tinta);background:var(--w-papel)}
.w-d-brillo .w-franja-datos ul{display:flex;flex-wrap:wrap;gap:10px 28px;list-style:none;margin:0 auto;padding-block:14px;font-weight:700;font-size:.95rem}
.w-d-brillo .w-franja-datos li{display:inline-flex;align-items:center;gap:8px;min-width:0}
.w-d-brillo .w-franja-datos a{color:inherit}
.w-d-brillo .w-pasos{background:var(--w-marino);color:#fff;padding-block:clamp(36px,6cqw,72px)}
.w-d-brillo .w-pasos-ante{margin:0 0 18px;font:800 .82rem/1.2 var(--w-ft-texto);letter-spacing:.14em;text-transform:uppercase;color:var(--w-ct-oscuro)}
.w-d-brillo .w-pasos ol{display:grid;gap:18px;list-style:none;margin:0;padding:0}
.w-d-brillo .w-pasos li{counter-increment:w-paso;position:relative;padding:20px 20px 20px 74px;border:1.5px solid #ffffff2e;border-radius:var(--w-r);background:var(--w-marino-2)}
.w-d-brillo .w-pasos li::before{content:counter(w-paso);position:absolute;left:20px;top:18px;display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--w-c);color:var(--w-s);font:800 1.1rem var(--w-ft-titulo)}
.w-d-brillo .w-pasos h3{margin:0 0 4px;font:800 1.15rem/1.25 var(--w-ft-titulo);color:#fff}
.w-d-brillo .w-pasos p{margin:0;color:#d5dee8}
.w-d-brillo .w-sec h2{font-weight:800;font-size:clamp(1.9rem,5cqw,3rem);line-height:1.05;letter-spacing:-.025em}
.w-d-brillo .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-brillo .w-s-1>li{counter-increment:w-srv;position:relative;background:var(--w-papel);border:2px solid var(--w-tinta);border-radius:var(--w-r);box-shadow:0 6px 0 -2px var(--w-tinta)}
.w-d-brillo .w-s-1>li::before{content:"0" counter(w-srv);display:block;margin-bottom:10px;font:800 1.5rem/1 var(--w-ft-titulo);color:var(--w-ct)}
.w-d-brillo .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:800;font-size:1.25rem}
.w-d-brillo .w-galeria img{border-radius:var(--w-r);border:2px solid var(--w-tinta)}
.w-d-brillo .w-zonas>li{border:2px solid var(--w-tinta);border-radius:10px;background:var(--w-papel);font-weight:700}
.w-d-brillo .w-opinion{background:var(--w-papel);border:2px solid var(--w-tinta);border-radius:var(--w-r)}
.w-d-brillo .w-c-2 .w-contacto-cta{background:var(--w-marino);color:#fff;border-radius:calc(var(--w-r) + 6px)}
.w-d-brillo .w-c-2 .w-contacto-grande a{color:var(--w-ct-oscuro);text-decoration:none}
.w-d-brillo .w-c-2 .w-contacto-cta .w-boton{color:#fff;border-color:#fff;box-shadow:0 6px 0 -2px #000}
.w-d-brillo .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-c);color:var(--w-s);border-color:var(--w-c)}
@container (min-width:760px){
  .w-d-brillo .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
  .w-d-brillo .w-cab-vis{justify-self:end}
  .w-d-brillo .w-pasos ol{grid-template-columns:repeat(3,minmax(0,1fr))}
}
`,
};
