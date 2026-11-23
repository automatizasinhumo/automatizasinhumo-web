import type { Diseno } from './tipos';

/** Sin foto: paisaje de costa con sol, montes y casa blanca, como la cara de una postal. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 480 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<rect width="480" height="320" class="cielo"/>
<circle cx="350" cy="110" r="46" class="sol"/>
<path d="M0 210l90-70 70 40 90-90 110 90 60-30 60 40v130H0z" class="monte"/>
<path d="M0 250q120-30 240 0t240 0v70H0z" class="mar"/>
<path d="M30 266q30-8 60 0M180 282q30-8 60 0M330 270q30-8 60 0" class="ola" fill="none"/>
<g class="casa"><path d="M110 236v-44l32-24 32 24v44z"/><rect x="134" y="210" width="16" height="26" class="hueco"/><rect x="118" y="198" width="10" height="10" class="hueco"/></g>
</svg>`;

/** Sello postal con borde dentado y matasellos con el sector. */
const sello = (texto: string) =>
  `<div class="w-sellos" aria-hidden="true"><span class="w-sello-postal"><svg viewBox="0 0 60 70"><path d="M30 14c-9 0-16 8-16 18 0 13 16 26 16 26s16-13 16-26c0-10-7-18-16-18zm0 24a6 6 0 1 1 0-12 6 6 0 0 1 0 12z"/></svg></span><span class="w-matasellos">${texto}</span></div>`;

export const postal: Diseno = {
  id: 'postal',
  nombre: 'Postal',
  descripcion: 'Postal de viaje: foto con sello y matasellos, recuerdos en polaroid y reseñas escritas a mano. Para casas rurales, apartamentos y hostales.',
  color: '#ce7657',
  fondoClaro: '#f5e5cc',
  fondoOscuro: '#316f86',
  fuentes: ['ash-playfair', 'ash-dm-sans'],
  titulo: "'ash-playfair', Georgia, serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 3,
  galeria: 1,
  opiniones: 3,
  contacto: 1,
  orden: ['galeria', 'servicios', 'opiniones', 'sobre', 'zonas', 'preguntas', 'horario', 'contacto'],
  titulos: { servicios: 'Habitaciones', galeria: 'Así es', opiniones: 'Desde el libro de visitas', sobre: 'La casa', zonas: 'Qué hay cerca', horario: 'Llegadas y salidas', contacto: 'Reserva directa' },
  muestra: {
    negocio: 'Casa del Faro',
    sector: 'Casa rural · Asturias',
    lema: 'Cinco habitaciones frente al Cantábrico, desayuno casero y el pueblo a diez minutos andando.',
    zonas: 'Playa de Torimbia a 2 km, Llanes a 8 km, Picos de Europa a 40 minutos',
    servicios: [
      { nombre: 'Habitación con vistas al mar', precio: 'desde 95 €/noche', texto: 'Cama de 160, balcón y desayuno incluido.' },
      { nombre: 'Habitación del jardín', precio: 'desde 75 €/noche', texto: 'Planta baja, acceso directo al jardín.' },
      { nombre: 'Casa entera', precio: 'desde 480 €/noche', texto: 'Hasta 12 personas, cocina equipada y barbacoa.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-postal"><div class="w-in"><div class="w-tarjeta">
<div class="w-cara">${c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : ILUSTRACION}<p class="w-saludo" aria-hidden="true">Recuerdos de ${esc(d.negocio)}</p></div>
<div class="w-dorso"><div class="w-cab-txt">${sello(esc(d.sector || d.negocio))}
${d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : ''}<h1>${esc(d.negocio)}</h1>
${d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : ''}${c.bloqueAcciones}
</div></div></div></div></header>`;
  },
  css: `
.w-d-postal{--w-fondo:#fbf3e6;--w-tinta:#21363f;--w-suave:#4d5d63;--w-borde:#e2cfae;--w-panel:#f5e5cc;--w-mar:#316f86;--w-r:6px;--w-esp:24px}
.w-d-postal .w-nav{background:color-mix(in srgb,var(--w-fondo) 92%,transparent)}
.w-d-postal .w-nav-marca{font-style:italic;font-weight:600}
.w-d-postal .w-cab{padding-block:clamp(26px,5cqw,72px);background:linear-gradient(180deg,var(--w-panel),var(--w-fondo))}
.w-d-postal .w-tarjeta{display:grid;background:#fffdf8;border-radius:6px;box-shadow:0 2px 0 var(--w-borde),0 30px 60px -34px rgb(33 54 63 / .55);transform:rotate(-.6deg);overflow:hidden}
.w-d-postal .w-cara{position:relative;min-height:240px;background:var(--w-mar)}
.w-d-postal .w-cara .w-ilus,.w-d-postal .w-cara .w-cab-foto{position:absolute;inset:0;margin:0}
.w-d-postal .w-cara .w-ilus,.w-d-postal .w-cab-foto,.w-d-postal .w-cab-foto img{width:100%;height:100%;border-radius:0;aspect-ratio:auto;object-fit:cover}
.w-d-postal .w-ilus .cielo{fill:#a9d3de}
.w-d-postal .w-ilus .sol{fill:#f6c66b}
.w-d-postal .w-ilus .monte{fill:#5f8f6b}
.w-d-postal .w-ilus .mar{fill:var(--w-mar)}
.w-d-postal .w-ilus .ola{stroke:#fffdf8;stroke-width:4;stroke-linecap:round;opacity:.7}
.w-d-postal .w-ilus .casa{fill:#fffdf8}
.w-d-postal .w-ilus .hueco{fill:var(--w-c)}
.w-d-postal .w-saludo{position:absolute;left:16px;bottom:14px;padding:6px 14px;background:#fffdf8;color:var(--w-tinta);font:italic 600 clamp(1rem,2.4cqw,1.35rem) var(--w-ft-titulo);border-radius:3px;transform:rotate(-2deg);box-shadow:0 6px 14px -8px rgb(0 0 0 / .5)}
.w-d-postal .w-dorso{position:relative;padding:clamp(22px,4cqw,48px);background:repeating-linear-gradient(#fffdf8 0 37px,var(--w-borde) 37px 38px)}
.w-d-postal .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,20px)}
.w-d-postal .w-sellos{float:right;display:flex;flex-direction:column;align-items:center;gap:6px;margin:0 0 10px 14px}
.w-d-postal .w-sello-postal{display:grid;place-items:center;width:72px;height:86px;background:var(--w-c);border:6px dotted #fffdf8;outline:1px solid var(--w-borde);box-shadow:0 4px 10px -6px rgb(0 0 0 / .4)}
.w-d-postal .w-sello-postal svg{width:40px;fill:#fffdf8}
.w-d-postal .w-matasellos{display:grid;place-items:center;width:92px;aspect-ratio:1;margin-top:-34px;margin-left:-60px;border:2px solid var(--w-mar);border-radius:50%;color:var(--w-mar);font:700 .58rem/1.2 var(--w-ft-texto);letter-spacing:.12em;text-transform:uppercase;text-align:center;padding:12px;transform:rotate(-14deg);opacity:.85}
.w-d-postal .w-sector{color:var(--w-ct)}
.w-d-postal .w-cab h1{font-weight:700;font-size:clamp(2.6rem,8cqw,5.6rem);line-height:.98;letter-spacing:-.02em}
.w-d-postal .w-cab .w-lema{font-family:var(--w-ft-titulo);font-style:italic;font-size:clamp(1.1rem,2.2cqw,1.4rem);line-height:1.6;max-width:34ch}
.w-d-postal .w-boton{border-radius:4px;font-weight:600}
.w-d-postal .w-sec h2{font-weight:600;font-size:clamp(2rem,5.5cqw,3.6rem);letter-spacing:-.02em}
.w-d-postal .w-sec h2::after{width:70px;height:10px;border-radius:0;background:repeating-linear-gradient(90deg,var(--w-c) 0 10px,transparent 10px 14px,var(--w-mar) 14px 24px,transparent 24px 28px)}
.w-d-postal .w-galeria>li{padding:10px 10px 34px;border-radius:2px;background:#fffdf8;box-shadow:0 18px 30px -20px rgb(33 54 63 / .6)}
.w-d-postal .w-galeria>li:nth-child(odd){transform:rotate(-1.4deg)}
.w-d-postal .w-galeria>li:nth-child(even){transform:rotate(1.2deg)}
.w-d-postal .w-galeria img{border-radius:1px}
.w-d-postal .w-s-3>li{border-radius:6px;background:#fffdf8}
.w-d-postal .w-s-3>li:first-child{border-inline-start:0;border-top:6px solid var(--w-c);background:var(--w-panel)}
.w-d-postal .w-servicio h3{font-weight:600}
.w-d-postal .w-opiniones-sec{background:var(--w-mar);color:#fffdf8;--w-fondo:#316f86;--w-tinta:#fffdf8;--w-suave:#d9ebf0;--w-borde:#5a93a8;--w-ct:var(--w-ct-oscuro)}
.w-d-postal .w-opinion{background:#fffdf8;color:var(--w-mar);border-radius:2px;transform:rotate(-1deg);--w-ct:var(--w-ct-claro)}
.w-d-postal .w-opinion:nth-child(even){transform:rotate(1deg)}
.w-d-postal .w-opinion blockquote{font-family:var(--w-ft-titulo);font-style:italic;color:#21363f;line-height:1.6;background:repeating-linear-gradient(transparent 0 1.55em,#e8dcc6 1.55em calc(1.55em + 1px))}
.w-d-postal .w-autor::before{content:"— "}
.w-d-postal .w-zonas>li{border-radius:4px;background:#fffdf8}
.w-d-postal .w-zonas>li::before{content:"✈ ";color:var(--w-ct)}
.w-d-postal .w-c-1 .w-contacto{border-top-color:var(--w-mar)}
@container (min-width:760px){
  .w-d-postal .w-tarjeta{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
  .w-d-postal .w-dorso{border-left:2px dashed var(--w-borde)}
  .w-d-postal .w-c-1{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
}
`,
};
