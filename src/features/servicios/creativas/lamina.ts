import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: habitación isométrica (suelo, dos muros, ventana, mesa y lámpara) en línea fina. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 400 320" aria-hidden="true" focusable="false">
<path d="M200 300L40 210V90l160 92z" class="muro"/>
<path d="M200 300l160-90V90L200 182z" class="muro2"/>
<path d="M200 182L40 90l160-80 160 80z" class="suelo"/>
<g class="linea" fill="none" stroke-linejoin="round">
<path d="M200 300L40 210V90l160 92 160-92v120z"/><path d="M200 182v118"/>
<path d="M70 132l60 34v-50l-60-34z"/><path d="M100 99v50M70 132l60-16"/>
<path d="M232 228l70-40v-26l-70 40z"/><path d="M240 223v34M294 193v34"/>
<path d="M300 140v-44M286 96h28l-6-20h-16z"/>
</g>
<path d="M292 76h16l6 20h-28z" class="acento"/>
<g class="cota" fill="none"><path d="M24 96v110M18 96h12M18 206h12"/><path d="M216 312l136-76"/></g>
</svg>`;

export const lamina: Diseno = {
  id: 'lamina',
  nombre: 'Lámina técnica',
  descripcion: 'Plano de arquitecto: retícula, mucho espacio en blanco, cotas y servicios numerados en columnas. Para arquitectura, interiorismo, reformas e ingeniería.',
  color: '#8a6d45',
  fondoClaro: '#e8e4d8',
  fondoOscuro: '#303637',
  capa: { acabado: 'papel' },
  fuentes: ['ash-manrope', 'ash-plex-mono'],
  titulo: "'ash-manrope', 'Helvetica Neue', sans-serif",
  texto: "'ash-manrope', system-ui, sans-serif",
  servicios: 4,
  galeria: 3,
  opiniones: 1,
  contacto: 3,
  orden: ['servicios', 'galeria', 'sobre', 'opiniones', 'zonas', 'preguntas', 'contacto'],
  titulos: { servicios: 'Servicios', galeria: 'Proyectos', sobre: 'Estudio', opiniones: 'Clientes', zonas: 'Ámbito', contacto: 'Hablemos de tu proyecto' },
  muestra: {
    negocio: 'Estudio Cota',
    sector: 'Arquitectura e interiorismo',
    lema: 'Reformas integrales y vivienda unifamiliar. Proyecto, licencias y dirección de obra con un único interlocutor.',
    zonas: 'Valencia y área metropolitana',
    servicios: [
      { nombre: 'Reforma integral', precio: 'desde 450 €/m²', texto: 'Diseño, presupuesto cerrado y obra llave en mano.' },
      { nombre: 'Proyecto de vivienda', precio: '', texto: 'Anteproyecto, básico y de ejecución, con licencia.' },
      { nombre: 'Interiorismo', precio: 'desde 35 €/m²', texto: 'Distribución, materiales, iluminación y mobiliario.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-lamina"><div class="w-in w-cab-in"><div class="w-cab-txt">
<p class="w-rotulo" aria-hidden="true"><span>Hoja 01/01</span><span>E 1:50</span></p>
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-lamina{--w-fondo:#f2f0e9;--w-tinta:#303637;--w-suave:#555b5c;--w-borde:#cfcabb;--w-panel:#e8e4d8;--w-grafito:#303637;--w-r:0px;--w-esp:26px;--w-mono:'ash-plex-mono',ui-monospace,monospace;--w-ret:rgb(48 54 55 / .07)}
.w-d-lamina .w-cuerpo{background:linear-gradient(var(--w-ret) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,var(--w-ret) 1px,transparent 1px) 0 0/48px 48px,var(--w-fondo)}
.w-d-lamina .w-nav-marca{font-weight:800;letter-spacing:-.02em;text-transform:uppercase}
.w-d-lamina .w-nav ul a{font-family:var(--w-mono);font-size:.78rem;letter-spacing:.08em;text-transform:uppercase}
.w-d-lamina .w-cab{background:transparent;padding-block:clamp(36px,8cqw,120px)}
.w-d-lamina .w-cab-in{display:grid;gap:clamp(28px,5cqw,72px);align-items:end}
.w-d-lamina .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,24px)}
.w-d-lamina .w-rotulo{display:inline-flex;border:1px solid var(--w-tinta)}
.w-d-lamina .w-rotulo span{padding:6px 12px;font:500 .72rem/1 var(--w-mono);letter-spacing:.12em;text-transform:uppercase}
.w-d-lamina .w-rotulo span+span{border-left:1px solid var(--w-tinta)}
.w-d-lamina .w-sector{font-family:var(--w-mono);color:var(--w-ct);letter-spacing:.14em}
.w-d-lamina .w-cab h1{font-weight:300;font-size:min(clamp(3rem,11cqw,8rem),var(--w-h1-tope,99em));line-height:.9;letter-spacing:-.05em}
.w-d-lamina .w-cab .w-lema{max-width:36ch;color:var(--w-suave);padding-left:18px;border-left:2px solid var(--w-c)}
.w-d-lamina .w-boton{border-radius:0;font-weight:700;letter-spacing:.02em}
.w-d-lamina .w-cab-vis{position:relative;padding:18px;border:1px solid var(--w-borde);background:rgb(255 255 255 / .55)}
.w-d-lamina .w-cab-vis::before{content:"A";position:absolute;top:-1px;right:-1px;width:30px;height:30px;display:grid;place-items:center;background:var(--w-grafito);color:#f2f0e9;font:500 .8rem var(--w-mono)}
.w-d-lamina .w-ilus .muro{fill:#e8e4d8}
.w-d-lamina .w-ilus .muro2{fill:#dcd6c6}
.w-d-lamina .w-ilus .suelo{fill:#f8f6f0}
.w-d-lamina .w-ilus .linea{stroke:var(--w-grafito);stroke-width:1.6}
.w-d-lamina .w-ilus .acento{fill:var(--w-c)}
.w-d-lamina .w-ilus .cota{stroke:var(--w-c);stroke-width:1.2;stroke-dasharray:4 4}
.w-d-lamina .w-cab-foto{filter:grayscale(.25)}
.w-d-lamina .w-cab-foto img{border-radius:0}
.w-d-lamina .w-sec h2{font-weight:300;font-size:clamp(2.4rem,7cqw,4.8rem);letter-spacing:-.05em}
.w-d-lamina .w-sec h2::after{width:100%;max-width:220px;height:1px;border-radius:0;background:var(--w-tinta);margin-top:18px}
.w-d-lamina .w-s-4>li{border-bottom-color:var(--w-borde)}
.w-d-lamina .w-s-4>li::before{font-family:var(--w-mono);font-weight:500;font-size:.9rem;color:var(--w-ct)}
.w-d-lamina .w-servicio h3{font-weight:600;font-size:clamp(1.3rem,2.6cqw,1.7rem);letter-spacing:-.02em}
.w-d-lamina .w-precio{font-family:var(--w-mono);font-size:.86rem;color:var(--w-ct)}
.w-d-lamina .w-galeria>li{border-radius:0;outline:1px solid var(--w-borde);outline-offset:6px}
.w-d-lamina .w-galeria img{border-radius:0}
.w-d-lamina .w-sobre-sec{background:var(--w-panel)}
.w-d-lamina .w-opiniones-sec{background:var(--w-grafito);color:#f2f0e9;--w-fondo:#303637;--w-tinta:#f2f0e9;--w-suave:#c9cbc6;--w-borde:#4c5354;--w-panel:#303637;--w-ct:var(--w-ct-oscuro)}
.w-d-lamina .w-o-1>li:first-child{background:transparent;border-inline-start-color:var(--w-c)}
.w-d-lamina .w-opinion blockquote{font-weight:300;font-size:clamp(1.2rem,2.6cqw,1.7rem);letter-spacing:-.01em}
.w-d-lamina .w-autor{font-family:var(--w-mono);font-size:.76rem;letter-spacing:.12em;text-transform:uppercase}
.w-d-lamina .w-zonas>li{border-radius:0;background:transparent;border:1px solid var(--w-tinta);font-family:var(--w-mono);font-size:.8rem}
.w-d-lamina .w-pregunta{border-radius:0}
.w-d-lamina .w-contacto-grande{font-weight:300;letter-spacing:-.04em}
.w-d-lamina .w-pie{font-family:var(--w-mono);font-size:.74rem;letter-spacing:.08em;text-transform:uppercase}
@container (min-width:760px){
  .w-d-lamina .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
  .w-d-lamina .w-s-4{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 32px}
  .w-d-lamina .w-s-4>li{grid-template-columns:1fr;border-bottom:0;border-top:1px solid var(--w-tinta)}
  .w-d-lamina .w-s-4>li::before{grid-row:auto}
  .w-d-lamina .w-s-4 .w-servicio p{grid-column:1}
}
`,
};
