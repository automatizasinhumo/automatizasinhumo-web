import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: lámina de herbario con tres plantas (amapola, helecho y eucalipto) y etiqueta. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 360 420" aria-hidden="true" focusable="false">
<rect x="8" y="8" width="344" height="404" class="papel"/>
<g class="tallo" fill="none" stroke-linecap="round">
<path d="M90 380q-6-120 10-230"/><path d="M180 380q0-150-8-290"/><path d="M270 380q10-110-6-200"/>
</g>
<g class="hoja">
<path d="M92 300q-34-10-40-40 32 4 40 40zM96 250q30-14 46-44-34 0-46 44z"/>
<path d="M174 330q-26-6-36-28 26 0 36 28zM176 290q-26-6-36-28 26 0 36 28zM176 250q-26-6-36-28 26 0 36 28zM174 210q-22-6-30-26 22 0 30 26zM176 330q26-6 36-28-26 0-36 28zM176 290q26-6 36-28-26 0-36 28zM176 250q26-6 36-28-26 0-36 28zM174 210q22-6 30-26-22 0-30 26z"/>
<ellipse cx="250" cy="300" rx="14" ry="20"/><ellipse cx="286" cy="264" rx="14" ry="20"/><ellipse cx="252" cy="226" rx="12" ry="18"/><ellipse cx="282" cy="196" rx="11" ry="16"/>
</g>
<g class="flor"><circle cx="100" cy="136" r="22"/><circle cx="82" cy="150" r="16"/><circle cx="118" cy="152" r="16"/></g>
<circle cx="100" cy="146" r="7" class="centro"/>
<rect x="196" y="346" width="138" height="48" class="etiqueta"/>
<path d="M206 362h90M206 378h60" class="raya" fill="none"/>
</svg>`;

export const herbario: Diseno = {
  id: 'herbario',
  nombre: 'Herbario',
  descripcion: 'Cuaderno de botánica: lámina ilustrada, etiquetas de herbario y tarjetas verticales. Para floristerías, viveros, cosmética natural y herbolarios.',
  color: '#df654d',
  fondoClaro: '#efe3cc',
  fondoOscuro: '#2e5743',
  capa: { acabado: 'papel' },
  fuentes: ['ash-fraunces', 'ash-dm-sans', 'ash-dm-mono'],
  titulo: "'ash-fraunces', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 3,
  opiniones: 2,
  contacto: 1,
  orden: ['servicios', 'galeria', 'sobre', 'opiniones', 'horario', 'zonas', 'preguntas', 'contacto'],
  titulos: { servicios: 'Del taller', galeria: 'Temporada', sobre: 'Nuestra historia', opiniones: 'Cartas de clientes', horario: 'Horario', zonas: 'Entregamos en', contacto: 'Encarga tu ramo' },
  muestra: {
    negocio: 'Flor de Sal',
    sector: 'Floristería y vivero',
    lema: 'Ramos de temporada con flor local, plantas de interior y talleres de los sábados. Entrega en el día.',
    zonas: 'Cádiz, San Fernando y El Puerto',
    servicios: [
      { nombre: 'Ramo de temporada', precio: 'desde 30 €', texto: 'Flor de productores andaluces, envuelto en papel kraft.' },
      { nombre: 'Plantas de interior', precio: 'desde 12 €', texto: 'Con maceta de barro y ficha de cuidados.' },
      { nombre: 'Flores para bodas', precio: '', texto: 'Ramo, prendidos y centros. Te visitamos en el sitio.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-herbario"><div class="w-in w-cab-in"><div class="w-cab-txt">
<p class="w-ficha" aria-hidden="true">Lám. I — Familia ${esc(d.negocio)}</p>
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-herbario{--w-fondo:#f9f1e3;--w-tinta:#1f3329;--w-suave:#4b5a50;--w-borde:#dccdb1;--w-panel:#efe3cc;--w-verde:#2e5743;--w-r:4px;--w-esp:24px;--w-mono:'ash-dm-mono',ui-monospace,monospace}
.w-d-herbario .w-cuerpo{background:radial-gradient(circle at 90% 0,rgb(46 87 67 / .08),transparent 40%),var(--w-fondo)}
.w-d-herbario .w-nav-marca{font-style:italic;font-weight:600}
.w-d-herbario .w-cab{background:transparent;padding-block:clamp(28px,6cqw,84px)}
.w-d-herbario .w-cab-in{display:grid;gap:clamp(24px,5cqw,64px);align-items:center}
.w-d-herbario .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,22px)}
.w-d-herbario .w-ficha{display:inline-block;padding:6px 12px;border:1px solid var(--w-verde);font:500 .74rem/1.2 var(--w-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--w-verde)}
.w-d-herbario .w-sector{color:var(--w-ct);font-family:var(--w-mono);letter-spacing:.12em}
.w-d-herbario .w-cab h1{font-weight:500;font-style:italic;font-size:clamp(3rem,11cqw,7.6rem);line-height:.9;letter-spacing:-.03em;color:var(--w-verde)}
.w-d-herbario .w-cab .w-lema{max-width:38ch;font-size:clamp(1.05rem,2cqw,1.25rem);color:var(--w-suave)}
.w-d-herbario .w-boton{border-radius:999px;font-weight:600}
.w-d-herbario .w-cab-vis{max-width:440px;width:100%;justify-self:center;transform:rotate(2deg)}
.w-d-herbario .w-ilus{filter:drop-shadow(0 24px 30px rgb(31 51 41 / .25))}
.w-d-herbario .w-ilus .papel{fill:#fffaf0;stroke:var(--w-borde);stroke-width:2}
.w-d-herbario .w-ilus .tallo{stroke:var(--w-verde);stroke-width:3}
.w-d-herbario .w-ilus .hoja{fill:#5f8a6e}
.w-d-herbario .w-ilus .flor{fill:var(--w-c)}
.w-d-herbario .w-ilus .centro{fill:var(--w-tinta)}
.w-d-herbario .w-ilus .etiqueta{fill:var(--w-panel);stroke:var(--w-verde);stroke-width:1.5}
.w-d-herbario .w-ilus .raya{stroke:var(--w-suave);stroke-width:2}
.w-d-herbario .w-cab-foto{border:12px solid #fffaf0;box-shadow:0 24px 40px -28px rgb(31 51 41 / .6);border-radius:220px 220px 4px 4px;overflow:hidden}
.w-d-herbario .w-cab-foto img{border-radius:0}
.w-d-herbario .w-sec h2{font-weight:500;font-style:italic;font-size:clamp(2.2rem,6cqw,4rem);letter-spacing:-.02em;color:var(--w-verde)}
.w-d-herbario .w-sec h2::after{width:64px;height:14px;border-radius:0;background:radial-gradient(ellipse 7px 4px,var(--w-verde) 90%,transparent) 0 50%/16px 14px repeat-x}
.w-d-herbario .w-s-1>li{counter-increment:lamina;position:relative;padding:22px 22px 26px;background:#fffaf0;border:1px solid var(--w-borde);border-radius:140px 140px 4px 4px;text-align:center;padding-top:64px}
.w-d-herbario .w-s-1{counter-reset:lamina}
.w-d-herbario .w-s-1>li::before{content:"N.º " counter(lamina,decimal-leading-zero);position:absolute;top:26px;left:50%;transform:translateX(-50%);font:500 .72rem/1 var(--w-mono);letter-spacing:.14em;color:var(--w-suave)}
.w-d-herbario .w-servicio h3{font-family:var(--w-ft-titulo);font-style:italic;font-weight:500;font-size:1.5rem;color:var(--w-verde)}
.w-d-herbario .w-precio{font-family:var(--w-mono);color:var(--w-ct)}
.w-d-herbario .w-galeria>li{border-radius:200px 200px 6px 6px;overflow:hidden}
.w-d-herbario .w-galeria>li:nth-child(even){border-radius:6px 6px 200px 200px}
.w-d-herbario .w-sobre-sec{background:var(--w-panel)}
.w-d-herbario .w-sobre p:first-child::first-letter{float:left;font:italic 500 4.2em/.8 var(--w-ft-titulo);margin:6px 10px 0 0;color:var(--w-verde)}
.w-d-herbario .w-opiniones-sec{background:var(--w-verde);color:#f9f1e3;--w-fondo:#2e5743;--w-tinta:#f9f1e3;--w-suave:#cfdccf;--w-borde:#4d7562;--w-panel:#2e5743;--w-ct:var(--w-ct-oscuro)}
.w-d-herbario .w-opiniones-sec h2{color:#f9f1e3}
.w-d-herbario .w-opinion{background:transparent;border:1px solid var(--w-borde);border-radius:4px}
.w-d-herbario .w-opinion blockquote{font-family:var(--w-ft-titulo);font-style:italic;font-size:1.15rem}
.w-d-herbario .w-autor{font-family:var(--w-mono);font-size:.8rem;letter-spacing:.1em;text-transform:uppercase}
.w-d-herbario .w-horario{font-family:var(--w-mono);font-size:.92rem}
.w-d-herbario .w-zonas>li{border-radius:999px;background:#fffaf0;border:1px solid var(--w-borde)}
.w-d-herbario .w-zonas>li::before{content:"❀ ";color:var(--w-ct)}
.w-d-herbario .w-c-1 .w-contacto{border-top-color:var(--w-verde)}
@container (min-width:760px){
  .w-d-herbario .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w-d-herbario .w-s-1{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));align-items:start}
  .w-d-herbario .w-s-1>li:nth-child(even){margin-top:46px}
  .w-d-herbario .w-c-1{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
}
`,
};
