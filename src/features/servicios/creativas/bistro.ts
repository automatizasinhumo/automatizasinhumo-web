import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Adorno de carta clásica (filete con rombo central), para separar títulos y la portada. */
const ADORNO = `<svg class="w-adorno" viewBox="0 0 240 24" aria-hidden="true" focusable="false"><path d="M0 12h96M144 12h96" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M120 2l10 10-10 10-10-10z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="120" cy="12" r="2.6" fill="currentColor"/><circle cx="102" cy="12" r="1.8" fill="currentColor"/><circle cx="138" cy="12" r="1.8" fill="currentColor"/></svg>`;

/** Sin foto: bodegón en línea (copa, plato con cubiertos, ramita de olivo). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 420 300" aria-hidden="true" focusable="false">
<g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
<circle cx="200" cy="190" r="78"/><circle cx="200" cy="190" r="56"/>
<path d="M92 120v46a12 12 0 0 0 12 12v76M84 120v32M100 120v32"/>
<path d="M308 118c18 0 22 30 22 60v76M316 178h14"/>
<path d="M352 60h44l-4 44a18 18 0 0 1-36 0zM374 122v62M356 184h36"/>
<path d="M30 60c40 6 70 30 84 66" class="rama"/>
</g>
<g class="hoja"><ellipse cx="54" cy="58" rx="16" ry="6" transform="rotate(20 54 58)"/><ellipse cx="78" cy="78" rx="16" ry="6" transform="rotate(50 78 78)"/><ellipse cx="66" cy="96" rx="16" ry="6" transform="rotate(-10 66 96)"/><ellipse cx="98" cy="100" rx="14" ry="5" transform="rotate(70 98 100)"/></g>
<circle cx="374" cy="88" r="10" class="vino"/>
</svg>`;

export const bistro: Diseno = {
  id: 'bistro',
  nombre: 'Bistró',
  descripcion: 'La web como una carta de toda la vida: marco doble, platos con precio en línea y adornos. Para restaurantes, bares y cafeterías.',
  color: '#793c37',
  fondoClaro: '#f6ecd8',
  fondoOscuro: '#3b2522',
  capa: { acabado: 'papel' },
  fuentes: ['ash-cormorant', 'ash-dm-sans'],
  titulo: "'ash-cormorant', 'Cormorant Garamond', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 2,
  galeria: 3,
  opiniones: 3,
  contacto: 3,
  orden: ['servicios', 'galeria', 'sobre', 'opiniones', 'horario', 'preguntas', 'contacto'],
  titulos: { servicios: 'La carta', galeria: 'De la cocina', sobre: 'La casa', opiniones: 'Quien ya vino', horario: 'Cuándo abrimos', contacto: 'Reservas' },
  muestra: {
    negocio: 'Casa Amparo',
    sector: 'Cocina de mercado',
    lema: 'Guisos de siempre, producto del día y sobremesa sin prisa.',
    servicios: [
      { nombre: 'Menú del día', precio: '14 €', texto: 'Primero, segundo, postre y bebida.' },
      { nombre: 'Pulpo á feira', precio: '18 €', texto: 'Con cachelos y pimentón de La Vera.' },
      { nombre: 'Arroz de marisco', precio: '22 €', texto: 'Mínimo dos personas.' },
      { nombre: 'Tarta de queso', precio: '6 €', texto: '' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const primera = c.horario[0];
    return `<header class="w-cab w-cab-bistro"><div class="w-in w-cab-in"><div class="w-carta"><div class="w-carta-in">
${sector(c)}${ADORNO}<h1>${esc(d.negocio)}</h1>${ADORNO}
${lema(c)}${c.bloqueAcciones}
${primera ? `<p class="w-cab-dato">${esc(primera[0] ? `${primera[0]} · ${primera[1]}` : primera[1])}</p>` : ''}
</div></div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-bistro{--w-fondo:#fff7e8;--w-tinta:#3b2522;--w-suave:#6b4f48;--w-borde:#e3cfb1;--w-panel:#f6ecd8;--w-oliva:#788264;--w-r:2px;--w-esp:24px}
.w-d-bistro .w-cab{padding-block:clamp(28px,6cqw,80px);background:var(--w-panel)}
.w-d-bistro .w-cab-in{display:grid;gap:clamp(24px,5cqw,56px);align-items:center}
.w-d-bistro .w-carta{background:var(--w-fondo);padding:10px;border:1px solid var(--w-tinta);box-shadow:0 24px 50px -28px #3b252280}
.w-d-bistro .w-carta-in{border:3px double var(--w-tinta);padding:clamp(26px,5cqw,56px) clamp(18px,4cqw,44px);text-align:center;display:grid;justify-items:center;gap:clamp(12px,1.8cqw,20px)}
.w-d-bistro .w-adorno{width:min(220px,60%);color:var(--w-ct)}
.w-d-bistro .w-sector{font-family:var(--w-ft-texto);font-size:.78rem;font-weight:600;letter-spacing:.32em;text-transform:uppercase;color:var(--w-suave)}
.w-d-bistro .w-cab h1{font-size:clamp(2.8rem,9.5cqw,6.4rem);font-weight:500;font-style:italic;line-height:.95;letter-spacing:-.01em;text-wrap:balance}
.w-d-bistro .w-cab .w-lema{font-family:var(--w-ft-titulo);font-size:clamp(1.15rem,2.4cqw,1.5rem);max-width:30ch;color:var(--w-suave)}
.w-d-bistro .w-acciones{justify-content:center}
.w-d-bistro .w-boton{border-radius:2px;letter-spacing:.06em;text-transform:uppercase;font-size:.85rem;font-weight:600}
.w-d-bistro .w-cab .w-cab-dato{font-size:.82rem;letter-spacing:.2em;text-transform:uppercase;color:var(--w-suave)}
.w-d-bistro .w-cab-vis{color:var(--w-tinta);min-width:0}
.w-d-bistro .w-ilus{width:100%}
.w-d-bistro .w-ilus .hoja{fill:var(--w-oliva)}
.w-d-bistro .w-ilus .rama{stroke:var(--w-oliva)}
.w-d-bistro .w-ilus .vino{fill:var(--w-c)}
.w-d-bistro .w-cab-foto{margin:0;padding:12px;background:#fff;box-shadow:0 24px 50px -24px #3b252299;transform:rotate(2deg)}
.w-d-bistro .w-cab-foto img{width:100%;aspect-ratio:4/5;object-fit:cover}
.w-d-bistro .w-sec h2{text-align:center;font-size:clamp(2.2rem,6.5cqw,3.8rem);font-weight:500;font-style:italic}
.w-d-bistro .w-sec h2::before{content:"";display:block;width:180px;height:24px;margin:0 auto 10px;background:var(--w-ct);-webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 24'%3E%3Cpath d='M0 12h96M144 12h96' stroke='%23000' stroke-width='1.4' fill='none'/%3E%3Cpath d='M120 2l10 10-10 10-10-10z' stroke='%23000' stroke-width='1.4' fill='none'/%3E%3Ccircle cx='120' cy='12' r='3' /%3E%3C/svg%3E") center/contain no-repeat;mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 24'%3E%3Cpath d='M0 12h96M144 12h96' stroke='%23000' stroke-width='1.4' fill='none'/%3E%3Cpath d='M120 2l10 10-10 10-10-10z' stroke='%23000' stroke-width='1.4' fill='none'/%3E%3Ccircle cx='120' cy='12' r='3' /%3E%3C/svg%3E") center/contain no-repeat}
.w-d-bistro .w-sec h2::after{display:none}
.w-d-bistro .w-servicios-sec .w-in{max-width:820px}
.w-d-bistro :is(.w-s-2,.w-s-5)>li{border:0;padding:16px 0}
.w-d-bistro .w-servicio-cab{display:flex;align-items:baseline;gap:12px}
.w-d-bistro .w-servicio-cab h3{font-size:clamp(1.35rem,2.8cqw,1.75rem);font-weight:600}
.w-d-bistro .w-servicio-cab::after{content:"";order:1;flex:1;border-bottom:2px dotted var(--w-borde);transform:translateY(-5px)}
.w-d-bistro .w-precio{order:2;font-family:var(--w-ft-titulo);font-size:1.4rem;font-weight:600;color:var(--w-ct);background:none;padding:0}
.w-d-bistro .w-servicio p{font-style:italic;color:var(--w-suave)}
.w-d-bistro .w-galeria>li{border-radius:0;padding:8px;background:#fff;box-shadow:0 10px 24px -14px #3b252299}
.w-d-bistro .w-galeria>li:nth-child(odd){transform:rotate(-1.4deg)}
.w-d-bistro .w-galeria>li:nth-child(even){transform:rotate(1.2deg)}
.w-d-bistro .w-sobre{font-family:var(--w-ft-titulo);font-size:clamp(1.2rem,2.4cqw,1.45rem);max-width:60ch;margin-inline:auto;text-align:center}
.w-d-bistro .w-sobre p:first-child::first-letter{float:left;font-size:3.6em;line-height:.8;padding:6px 10px 0 0;color:var(--w-ct);font-style:italic}
.w-d-bistro .w-opinion{background:var(--w-fondo);border:1px solid var(--w-borde);border-radius:2px}
.w-d-bistro .w-opinion blockquote{font-family:var(--w-ft-titulo);font-style:italic;font-size:1.25rem}
.w-d-bistro .w-horario{margin-inline:auto;font-family:var(--w-ft-titulo);font-size:1.2rem}
.w-d-bistro .w-horario tr{border-bottom:1px dotted var(--w-borde)}
.w-d-bistro .w-horario tr:nth-child(even){background:transparent}
.w-d-bistro .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-bistro .w-contacto-grande{font-family:var(--w-ft-titulo);font-style:italic;font-weight:500}
@container (min-width:760px){
  .w-d-bistro .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
  .w-d-bistro .w-servicios-sec .w-s-2,.w-d-bistro .w-servicios-sec .w-s-5{column-count:2;column-gap:64px;display:block}
  .w-d-bistro :is(.w-s-2,.w-s-5)>li{break-inside:avoid}
}
`,
};
