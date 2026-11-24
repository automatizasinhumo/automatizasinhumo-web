import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Garage» de Freeframe (licencia MIT, (c) sus autores): antetítulo como
 * placa de matrícula, esquinas cortadas, franja de cuadros y lámina de revisión con puntos numerados.
 * Reescrito para el contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript).
 */

/** Sin foto: lámina técnica de un coche de perfil con los puntos de revisión numerados. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 480 360" aria-hidden="true" focusable="false">
<defs><pattern id="w-mat-rejilla" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" class="rej"/></pattern></defs>
<rect width="480" height="360" fill="url(#w-mat-rejilla)"/>
<g fill="none" stroke-linejoin="round" stroke-linecap="round" class="coche">
<path d="M40 238V206c0-10 6-16 16-18l62-12 52-46c8-7 16-10 28-10h112c12 0 20 4 28 12l40 44 50 8c12 2 20 10 20 22v32"/>
<path d="M150 176l40-38h74v38zM282 138h40l36 38h-76z"/>
<path d="M40 238h48M168 238h148M396 238h48"/>
</g>
<g class="rueda"><circle cx="128" cy="240" r="34"/><circle cx="356" cy="240" r="34"/></g>
<g class="llanta"><circle cx="128" cy="240" r="13"/><circle cx="356" cy="240" r="13"/></g>
<path d="M24 290H456" class="suelo"/>
<g class="cota"><path d="M128 300v20M356 300v20M128 312h228"/></g>
<g class="punto"><circle cx="78" cy="196" r="15"/><circle cx="356" cy="240" r="15"/><circle cx="236" cy="157" r="15"/><circle cx="430" cy="214" r="15"/></g>
<g class="num" text-anchor="middle"><text x="78" y="201">1</text><text x="356" y="245">2</text><text x="236" y="162">3</text><text x="430" y="219">4</text></g>
</svg>`;

export const matricula: Diseno = {
  id: 'matricula',
  nombre: 'Matrícula',
  descripcion: 'Placa de matrícula, franja de boxes y lámina de revisión. Para talleres, neumáticos, chapa y motos.',
  color: '#ffd21f',
  fondoClaro: '#e9e7e0',
  fondoOscuro: '#121316',
  fuentes: ['ash-big-shoulders', 'ash-archivo', 'ash-dm-mono'],
  titulo: "'ash-big-shoulders', 'Arial Narrow', system-ui, sans-serif",
  texto: "'ash-archivo', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'horario', 'opiniones', 'galeria', 'zonas', 'preguntas', 'sobre', 'contacto'],
  titulos: { servicios: 'En el box', horario: 'Horario del taller', galeria: 'Del taller', sobre: 'El taller', opiniones: 'Lo que dicen' },
  muestra: {
    negocio: 'Talleres Lago',
    sector: 'Taller mecánico',
    lema: 'Presupuesto antes de tocar tu coche.',
    servicios: [
      { nombre: 'Revisión y aceite', precio: '', texto: 'Aceite, filtros y 30 puntos revisados.' },
      { nombre: 'Pre-ITV', precio: '', texto: 'Lo dejamos listo para pasar la inspección.' },
      { nombre: 'Frenos y neumáticos', precio: '', texto: 'Pastillas, discos y cambio de ruedas.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const placa = d.sector ? `<p class="w-sector w-placa"><span class="w-placa-e" aria-hidden="true">E</span><span>${esc(d.sector)}</span></p>` : '';
    const primera = c.horario[0];
    const estado = primera || c.tel
      ? `<dl class="w-estado">${primera ? `<div><dt>${c.icono('reloj')}${esc(primera[0] || 'Horario')}</dt><dd>${esc(primera[1])}</dd></div>` : ''}${c.tel ? `<div><dt>${c.icono('tel')}Llámanos</dt><dd>${c.grande}</dd></div>` : ''}</dl>`
      : '';
    return `<header class="w-cab w-cab-matricula${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${placa}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div>${estado ? `<div class="w-in">${estado}</div>` : ''}</header>`;
  },
  tras: () => '<div class="w-cuadros" aria-hidden="true"></div>',
  css: `
.w-d-matricula{--w-fondo:#f3f2ee;--w-tinta:#121316;--w-suave:#545961;--w-borde:#d4d2cb;--w-panel:#e9e7e0;--w-negro:#121316;--w-asfalto:#1c1e22;--w-metal:#2c2f35;--w-r:0;--w-esp:22px;--w-corte:14px;counter-reset:w-srv}
.w-d-matricula .w-nav{background:var(--w-negro);color:#fff;border-bottom:0}
.w-d-matricula .w-nav .w-boton{color:#fff}
.w-d-matricula .w-nav .w-boton-lleno{color:var(--w-s)}
.w-d-matricula .w-nav-marca{text-transform:uppercase;font-weight:800;letter-spacing:.02em}
.w-d-matricula :is(.w-servicio,.w-cab-foto,.w-ilus,.w-opinion){clip-path:polygon(var(--w-corte) 0,100% 0,100% calc(100% - var(--w-corte)),calc(100% - var(--w-corte)) 100%,0 100%,0 var(--w-corte))}
.w-d-matricula .w-boton{border-radius:0;text-transform:uppercase;letter-spacing:.06em;font-weight:700}
.w-d-matricula .w-cab{position:relative;background:var(--w-asfalto);color:#fff;padding-block:clamp(34px,6cqw,84px) 0}
.w-d-matricula .w-cab-in{display:grid;gap:clamp(26px,5cqw,56px);align-items:center;padding-bottom:clamp(28px,4cqw,48px)}
.w-d-matricula .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-matricula .w-placa{display:inline-flex;align-items:stretch;background:#fff;color:#121316;border:2px solid #121316;border-radius:5px;box-shadow:0 0 0 2px #fff;overflow:hidden;font:500 .95rem/1 'ash-dm-mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.14em}
.w-d-matricula .w-placa>span:last-child{padding:9px 14px}
.w-d-matricula .w-placa-e{display:grid;place-items:end center;width:26px;padding-bottom:6px;background:#1f4fb8;color:#fff;font-size:.75rem;letter-spacing:0}
.w-d-matricula .w-cab h1{--w-em-letra:.82;margin-bottom:.3em;font-size:min(clamp(2.6rem,8cqw,6rem),var(--w-h1-tope,99em));font-weight:800;line-height:.9;text-transform:uppercase;letter-spacing:-.005em;overflow-wrap:break-word;text-wrap:balance}
.w-d-matricula .w-cab .w-lema-bloque{display:inline;box-decoration-break:clone;-webkit-box-decoration-break:clone;background:var(--w-negro);color:var(--w-c);padding:.18em .45em;font:700 clamp(1.15rem,2.6cqw,1.7rem)/1.6 var(--w-ft-titulo);text-transform:uppercase;letter-spacing:.02em}
.w-d-matricula .w-cab .w-lema-bloque+*{margin-top:clamp(22px,3cqw,30px)}
.w-d-matricula .w-cab .w-boton{color:#fff;border-color:#b9bcc2;min-height:54px;padding-inline:24px}
.w-d-matricula .w-cab .w-boton-lleno{color:var(--w-s);border-color:var(--w-c)}
.w-d-matricula .w-cab-vis{min-width:0}
.w-d-matricula .w-ilus{background:var(--w-metal)}
.w-d-matricula .w-ilus .rej{stroke:#ffffff10}
.w-d-matricula .w-ilus .coche{stroke:#b9bcc2;stroke-width:4}
.w-d-matricula .w-ilus .rueda{fill:#121316;stroke:#b9bcc2;stroke-width:4}
.w-d-matricula .w-ilus .llanta{fill:#545961}
.w-d-matricula .w-ilus .suelo{stroke:#545961;stroke-width:2;stroke-dasharray:6 6}
.w-d-matricula .w-ilus .cota{fill:none;stroke:var(--w-c);stroke-width:2}
.w-d-matricula .w-ilus .punto{fill:var(--w-c)}
.w-d-matricula .w-ilus .num{fill:#121316;font:700 15px 'ash-dm-mono',ui-monospace,monospace}
.w-d-matricula .w-cab-foto{margin:0;border-bottom:8px solid var(--w-c)}
.w-d-matricula .w-cab-foto img{width:100%;aspect-ratio:4/3;object-fit:cover}
.w-d-matricula .w-estado{display:grid;gap:2px;margin:0;background:var(--w-negro);border-top:3px solid var(--w-c)}
.w-d-matricula .w-estado>div{padding:14px 18px}
.w-d-matricula .w-estado dt{display:flex;align-items:center;gap:8px;color:#b9bcc2;font:500 .78rem 'ash-dm-mono',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.14em}
.w-d-matricula .w-estado dt .w-ico{color:var(--w-c)}
.w-d-matricula .w-estado dd{margin:4px 0 0;font:700 clamp(1.15rem,2.4cqw,1.5rem) var(--w-ft-titulo);text-transform:uppercase}
.w-d-matricula .w-estado dd a{color:var(--w-c);text-decoration:none}
.w-d-matricula .w-cuadros{height:12px;background:conic-gradient(#121316 25%,var(--w-c) 0 50%,#121316 0 75%,var(--w-c) 0) 0 0/12px 12px}
.w-d-matricula .w-sec h2{text-transform:uppercase;font-weight:800;font-size:clamp(1.9rem,5.4cqw,3.4rem);line-height:.95;letter-spacing:-.005em}
.w-d-matricula .w-sec h2::after{content:"";display:block;width:64px;height:8px;margin-top:12px;background:var(--w-c)}
.w-d-matricula .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-matricula .w-s-1>li{counter-increment:w-srv;position:relative;background:#fff;border:0;border-left:6px solid var(--w-c);border-radius:0}
.w-d-matricula .w-s-1>li::before{content:"P-" counter(w-srv,decimal-leading-zero);display:block;margin-bottom:10px;font:500 .8rem 'ash-dm-mono',ui-monospace,monospace;letter-spacing:.16em;color:var(--w-suave)}
.w-d-matricula .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:800;text-transform:uppercase;font-size:1.45rem;letter-spacing:.01em}
.w-d-matricula .w-horario{font-family:'ash-dm-mono',ui-monospace,monospace}
.w-d-matricula .w-horario th{font-family:var(--w-ft-titulo);text-transform:uppercase;font-weight:700}
.w-d-matricula .w-zonas>li{border:2px solid var(--w-tinta);border-radius:0;background:#fff;font-weight:700;text-transform:uppercase}
.w-d-matricula .w-opinion{background:#fff;border:0;border-top:4px solid var(--w-tinta)}
.w-d-matricula .w-c-2 .w-contacto-cta{background:var(--w-negro);color:#fff;border-radius:0;border-bottom:12px solid var(--w-c)}
.w-d-matricula .w-c-2 .w-contacto-grande a{color:var(--w-ct-oscuro);text-decoration:none}
.w-d-matricula .w-c-2 .w-contacto-cta .w-boton{color:#fff;border-color:#fff}
.w-d-matricula .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-c);color:var(--w-s);border-color:var(--w-c)}
@container (min-width:760px){
  .w-d-matricula .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
  .w-d-matricula .w-estado{grid-template-columns:repeat(auto-fit,minmax(0,1fr))}
}
`,
};
