import type { Diseno } from './tipos';
import { sector, lema } from './piezas';

/** Objetos del escaparate cuando no hay foto: lámpara, jarrón, bolsa y regalo. */
const OBJETO = {
  lampara: `<svg class="w-obj" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="M36 54l14-34h20l14 34z" class="a"/><path d="M60 54v42M42 100h36" class="l" fill="none"/><circle cx="60" cy="62" r="5" class="b"/></svg>`,
  jarron: `<svg class="w-obj" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="M48 22h24v10q16 12 16 36 0 30-28 30T32 68q0-24 16-36z" class="a"/><path d="M40 62h40" class="l" fill="none"/><path d="M60 22q-4-12 4-18M60 22q8-10 18-10" class="l" fill="none"/></svg>`,
  bolsa: `<svg class="w-obj" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><path d="M28 40h64l-6 62H34z" class="a"/><path d="M46 46V34a14 14 0 0 1 28 0v12" class="l" fill="none"/></svg>`,
  regalo: `<svg class="w-obj" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><rect x="24" y="48" width="72" height="54" class="a"/><rect x="20" y="36" width="80" height="16" class="b"/><path d="M60 36v66" class="l" fill="none"/><path d="M60 36q-26-24-24-4 2 6 24 4 22 2 24-4 2-20-24 4z" class="l" fill="none"/></svg>`,
};

export const escaparate: Diseno = {
  id: 'escaparate',
  nombre: 'Escaparate',
  descripcion: 'Escaparate de tienda en cuadrícula de huecos de distintos tamaños, con productos destacados y precio. Para tiendas de barrio, decoración, regalos, moda y comercio local.',
  color: '#f08a50',
  fondoClaro: '#e7defa',
  fondoOscuro: '#232026',
  capa: { movimiento: 'vivo' },
  fuentes: ['ash-syne', 'ash-manrope'],
  titulo: "'ash-syne', 'Trebuchet MS', sans-serif",
  texto: "'ash-manrope', system-ui, sans-serif",
  servicios: 1,
  galeria: 1,
  opiniones: 3,
  contacto: 2,
  orden: ['servicios', 'galeria', 'opiniones', 'sobre', 'horario', 'preguntas', 'contacto'],
  sectores: ['tienda'],
  palabras: ['decoracion', 'regalo', 'moda', 'boutique'],
  titulos: { servicios: 'Lo más buscado', galeria: 'En la tienda', opiniones: 'Clientas y clientes', sobre: 'La tienda', horario: 'Abrimos', contacto: 'Pregúntanos' },
  muestra: {
    negocio: 'Nido Concept',
    sector: 'Decoración y regalo',
    lema: 'Cerámica, textiles y lámparas de pequeños talleres. Te lo guardamos y lo envolvemos para regalo.',
    servicios: [
      { nombre: 'Jarrón de gres', precio: '32 €', texto: 'Hecho a mano en Talavera, cada uno distinto.' },
      { nombre: 'Lámpara de lino', precio: '68 €', texto: 'Pantalla de lino lavado y base de roble.' },
      { nombre: 'Caja regalo', precio: 'desde 25 €', texto: 'La montamos contigo, con tarjeta escrita a mano.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const top = d.servicios.find((s) => s.nombre.trim());
    const destacado = top
      ? `<div class="w-hueco w-hueco-dest"><span class="w-etiqueta">Destacado</span><p class="w-dest-nombre">${esc(top.nombre)}</p>${top.precio ? `<p class="w-dest-precio">${esc(top.precio)}</p>` : ''}</div>`
      : `<div class="w-hueco w-hueco-dest">${OBJETO.regalo}</div>`;
    const visual = c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : c.ilustracion(OBJETO.lampara);
    return `<header class="w-cab w-cab-escaparate"><div class="w-in"><div class="w-bento">
<div class="w-hueco w-hueco-txt">${sector(c)}<h1>${esc(d.negocio)}</h1>${lema(c)}${c.bloqueAcciones}</div>
<div class="w-hueco w-hueco-vis">${visual}</div>
${destacado}
<div class="w-hueco w-hueco-c">${OBJETO.jarron}</div>
<div class="w-hueco w-hueco-d">${OBJETO.bolsa}</div>
<div class="w-hueco w-hueco-e" aria-hidden="true"><span>Nuevo</span></div>
</div></div></header>`;
  },
  css: `
.w-d-escaparate{--w-fondo:#f7f3ff;--w-tinta:#232026;--w-suave:#4e4856;--w-borde:#d6cbee;--w-panel:#e7defa;--w-negro:#232026;--w-crema:#fff4e6;--w-r:22px;--w-esp:22px}
.w-d-escaparate .w-nav-marca{font-weight:800;letter-spacing:-.02em}
.w-d-escaparate .w-cab{background:transparent;padding-block:clamp(20px,4cqw,56px)}
.w-d-escaparate .w-bento{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.w-d-escaparate .w-hueco{position:relative;display:grid;place-items:center;min-height:150px;border-radius:var(--w-r);background:var(--w-panel);overflow:hidden}
.w-d-escaparate .w-hueco-txt{grid-template-columns:minmax(0,1fr);grid-column:1/-1;place-items:start;align-content:end;gap:14px;padding:clamp(22px,4cqw,44px);background:#fff;border:1px solid var(--w-borde)}
.w-d-escaparate .w-sector{color:var(--w-ct)}
.w-d-escaparate .w-cab h1{font-weight:800;font-size:min(clamp(2.2rem,5cqw,4rem),var(--w-h1-tope,99em));line-height:.92;letter-spacing:-.04em;overflow-wrap:break-word;text-wrap:balance}
.w-d-escaparate .w-cab .w-lema{max-width:38ch;color:var(--w-suave)}
.w-d-escaparate .w-boton{border-radius:999px;font-weight:700}
.w-d-escaparate .w-hueco-vis{grid-column:1/-1;min-height:220px;background:var(--w-crema)}
.w-d-escaparate .w-hueco-vis .w-cab-foto{position:absolute;inset:0;margin:0;border-radius:0}
.w-d-escaparate .w-hueco-vis .w-cab-foto img{width:100%;height:100%;aspect-ratio:auto;object-fit:cover;border-radius:0}
.w-d-escaparate .w-hueco-dest{place-items:start;align-content:space-between;padding:18px;background:var(--w-negro);color:#f7f3ff}
.w-d-escaparate .w-etiqueta{padding:4px 10px;border-radius:999px;background:var(--w-c);color:var(--w-s);font-size:.72rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.w-d-escaparate .w-dest-nombre{margin:0;font:800 1.25rem/1.1 var(--w-ft-titulo)}
.w-d-escaparate .w-dest-precio{margin:0;font-weight:800;font-size:1.6rem}
.w-d-escaparate .w-hueco-c{background:var(--w-c)}
.w-d-escaparate .w-hueco-e{background:repeating-linear-gradient(45deg,var(--w-panel) 0 14px,#fff 14px 28px)}
.w-d-escaparate .w-hueco-e span{padding:10px 18px;border-radius:999px;background:var(--w-negro);color:#f7f3ff;font:800 1rem var(--w-ft-titulo);transform:rotate(-8deg)}
.w-d-escaparate .w-obj{width:min(140px,70%);height:auto}
.w-d-escaparate .w-hueco-vis .w-obj{width:min(200px,55%)}
.w-d-escaparate .w-obj .a{fill:var(--w-c)}
.w-d-escaparate .w-obj .b{fill:var(--w-negro)}
.w-d-escaparate .w-obj .l{stroke:var(--w-negro);stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
.w-d-escaparate .w-hueco-c .w-obj .a{fill:#fff}
.w-d-escaparate .w-hueco-dest .w-obj .a{fill:var(--w-panel)}
.w-d-escaparate .w-hueco-dest .w-obj .l{stroke:#f7f3ff}
.w-d-escaparate .w-sec h2{font-weight:800;font-size:clamp(2.2rem,6.5cqw,4.2rem);letter-spacing:-.04em;line-height:.95}
.w-d-escaparate .w-sec h2::after{width:44px;height:44px;border-radius:50%;margin-top:14px}
.w-d-escaparate .w-s-1>li{border:0;background:#fff;border-radius:var(--w-r);padding:22px;box-shadow:0 1px 0 var(--w-borde)}
.w-d-escaparate .w-s-1>li:first-child{background:var(--w-panel)}
.w-d-escaparate .w-servicio h3{font-weight:800;font-size:1.3rem;letter-spacing:-.02em}
.w-d-escaparate .w-precio{display:inline-block;padding:4px 12px;border-radius:999px;background:var(--w-negro);color:#f7f3ff;font-weight:800}
.w-d-escaparate .w-galeria>li{border-radius:var(--w-r)}
.w-d-escaparate .w-galeria img{border-radius:var(--w-r)}
.w-d-escaparate .w-opinion{background:#fff;border:0;border-radius:var(--w-r)}
.w-d-escaparate .w-horario{background:#fff;border-radius:var(--w-r);overflow:hidden}
.w-d-escaparate .w-pregunta{border-radius:16px}
.w-d-escaparate .w-contacto-sec{background:var(--w-negro);color:#f7f3ff;--w-fondo:#232026;--w-tinta:#f7f3ff;--w-suave:#cfc8da;--w-borde:#433d4a;--w-panel:#232026;--w-ct:var(--w-ct-oscuro)}
.w-d-escaparate .w-c-2 .w-contacto-cta{border-radius:var(--w-r)}
@container (min-width:760px){
  .w-d-escaparate .w-bento{grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(3,minmax(150px,auto))}
  .w-d-escaparate .w-hueco-txt{grid-column:1/3;grid-row:1/3}
  .w-d-escaparate .w-hueco-vis{grid-column:3/5;grid-row:1/2;min-height:0}
  .w-d-escaparate .w-hueco-dest{grid-column:3/4;grid-row:2/4}
  .w-d-escaparate .w-hueco-c{grid-column:4/5;grid-row:2/4}
  .w-d-escaparate .w-hueco-d{grid-column:1/2;grid-row:3/4}
  .w-d-escaparate .w-hueco-e{grid-column:2/3;grid-row:3/4}
  .w-d-escaparate .w-s-1{grid-template-columns:repeat(6,minmax(0,1fr))}
  .w-d-escaparate .w-s-1>li{grid-column:span 2}
  .w-d-escaparate .w-s-1>li:first-child{grid-column:span 4;grid-row:span 2}
  .w-d-escaparate .w-s-1[data-n="1"]>li:first-child{grid-column:1/-1}
}
`,
};
