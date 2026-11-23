import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: libro abierto con lápiz y flecha dibujada, como un apunte en el margen. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 360 260" aria-hidden="true" focusable="false">
<g class="trazo" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M40 200V70q60-20 140 10 80-30 140-10v130q-60-20-140 10-80-30-140-10z" class="libro"/>
<path d="M180 80v130"/><path d="M70 100q40-8 80 6M70 126q40-8 80 6M70 152q40-8 80 6M210 106q40-14 80-6M210 132q40-14 80-6"/>
</g>
<g class="lapiz"><path d="M250 40l70-24 8 22-70 24z" class="cuerpo"/><path d="M250 40l-14 18 22 4z" class="punta"/><path d="M320 16l8 22 12-4-8-22z" class="goma"/></g>
<path class="flecha" d="M300 236q30-30 10-70m-14 10l14-10 8 16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const cuaderno: Diseno = {
  id: 'cuaderno',
  nombre: 'Cuaderno de clase',
  descripcion: 'Cuaderno escolar: hoja cuadriculada, cursos en fichas con esquina doblada, subrayados a rotulador y notas en el margen. Para academias, clases particulares, idiomas y autoescuelas.',
  color: '#3659b5',
  fondoClaro: '#fff0b9',
  fondoOscuro: '#22305e',
  capa: { acabado: 'papel' },
  fuentes: ['ash-bricolage', 'ash-dm-sans'],
  titulo: "'ash-bricolage', 'Trebuchet MS', sans-serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 1,
  opiniones: 3,
  contacto: 2,
  orden: ['servicios', 'horario', 'opiniones', 'galeria', 'sobre', 'zonas', 'preguntas', 'contacto'],
  titulos: { servicios: 'Cursos', horario: 'Horario de clases', opiniones: 'Lo que dicen los alumnos', galeria: 'El aula', sobre: 'Quiénes somos', zonas: 'Dónde damos clase', contacto: 'Reserva tu prueba de nivel' },
  muestra: {
    negocio: 'Academia Pizarra',
    sector: 'Refuerzo escolar e idiomas',
    lema: 'Grupos de seis alumnos como máximo, seguimiento semanal a las familias y primera clase gratis.',
    zonas: 'Centro, Ensanche y online',
    servicios: [
      { nombre: 'Primaria', precio: '60 €/mes', texto: 'Deberes y técnicas de estudio, dos tardes por semana.' },
      { nombre: 'ESO y Bachillerato', precio: '85 €/mes', texto: 'Matemáticas, física y química con exámenes de prueba.' },
      { nombre: 'Inglés B1–C1', precio: '70 €/mes', texto: 'Preparación de Cambridge con profesores nativos.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-cuaderno"><div class="w-in w-cab-in"><div class="w-cab-txt w-hoja">
${sector(c)}<h1><span class="w-subrayado">${esc(d.negocio)}</span></h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}${c.zonas[0] ? `<p class="w-nota">Clases en ${esc(c.zonas[0])}</p>` : ''}</div></div></header>`;
  },
  css: `
.w-d-cuaderno{--w-fondo:#fffcf5;--w-tinta:#1f2a4a;--w-suave:#4a5470;--w-borde:#d8dcea;--w-panel:#fff0b9;--w-azul:#22305e;--w-margen:clamp(30px,5cqw,52px);--w-r:6px;--w-esp:22px;--w-reja:color-mix(in srgb,var(--w-c) 13%,transparent)}
.w-d-cuaderno .w-cuerpo{background-image:linear-gradient(var(--w-reja) 1px,transparent 1px),linear-gradient(90deg,var(--w-reja) 1px,transparent 1px);background-size:22px 22px}
.w-d-cuaderno .w-nav-marca{font-weight:800}
.w-d-cuaderno .w-cab{background:transparent;padding-block:clamp(26px,5cqw,70px)}
.w-d-cuaderno .w-cab-in{display:grid;gap:clamp(30px,4cqw,48px);align-items:center}
.w-d-cuaderno .w-hoja{position:relative;padding:clamp(22px,4cqw,44px) clamp(22px,4cqw,44px) clamp(26px,4cqw,48px) calc(var(--w-margen) + clamp(14px,2cqw,24px));border-radius:4px;box-shadow:0 22px 40px -30px rgb(31 42 74 / .55);background:linear-gradient(90deg,transparent calc(var(--w-margen) - 1px),#e8909a calc(var(--w-margen) - 1px) calc(var(--w-margen) + 1px),transparent 0),#fff}
.w-d-cuaderno .w-hoja::after{content:"";position:absolute;right:0;bottom:0;width:46px;height:46px;background:linear-gradient(315deg,var(--w-fondo) 50%,#e6e1d2 50%);border-radius:0 0 4px 0}
.w-d-cuaderno .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,20px)}
.w-d-cuaderno .w-sector{display:inline-block;padding:4px 12px;background:var(--w-panel);color:var(--w-tinta);transform:rotate(-1.5deg)}
.w-d-cuaderno .w-cab h1{font-weight:800;font-size:clamp(2.4rem,6.6cqw,5rem);line-height:.95;letter-spacing:-.03em;overflow-wrap:break-word;text-wrap:balance}
.w-d-cuaderno .w-subrayado{background:linear-gradient(transparent 62%,color-mix(in srgb,var(--w-c) 30%,transparent) 62% 90%,transparent 90%);-webkit-box-decoration-break:clone;box-decoration-break:clone}
.w-d-cuaderno .w-cab .w-lema{max-width:40ch;color:var(--w-suave)}
.w-d-cuaderno .w-boton{border-radius:10px;font-weight:700}
.w-d-cuaderno .w-cab-vis{position:relative}
.w-d-cuaderno .w-ilus .trazo{stroke:var(--w-tinta);stroke-width:4}
.w-d-cuaderno .w-ilus .libro{fill:#fff}
.w-d-cuaderno .w-ilus .cuerpo{fill:#f6c84c}
.w-d-cuaderno .w-ilus .punta{fill:var(--w-tinta)}
.w-d-cuaderno .w-ilus .goma{fill:#e8909a}
.w-d-cuaderno .w-ilus .flecha{stroke:var(--w-c);stroke-width:4}
.w-d-cuaderno .w-cab-foto{border:8px solid #fff;box-shadow:0 16px 30px -20px rgb(0 0 0 / .5);transform:rotate(1.5deg)}
.w-d-cuaderno .w-nota{position:absolute;left:4%;bottom:-10px;padding:10px 16px;background:var(--w-panel);color:var(--w-tinta);font:700 1.05rem var(--w-ft-titulo);transform:rotate(-4deg);box-shadow:0 10px 18px -12px rgb(0 0 0 / .5)}
.w-d-cuaderno .w-nota::before{content:"";position:absolute;left:50%;top:-10px;width:56px;height:18px;margin-left:-28px;background:color-mix(in srgb,var(--w-c) 22%,#fff);opacity:.85;transform:rotate(3deg)}
.w-d-cuaderno .w-sec h2{font-weight:800;font-size:clamp(2rem,5.5cqw,3.4rem);letter-spacing:-.02em}
.w-d-cuaderno .w-sec h2::after{width:110px;height:10px;background:none;border-bottom:4px solid var(--w-c);border-radius:0 0 60% 40%/0 0 100% 100%}
.w-d-cuaderno .w-s-1>li{position:relative;background:#fff;border:1px solid var(--w-borde);border-top:8px solid var(--w-c);border-radius:4px;box-shadow:0 14px 26px -22px rgb(31 42 74 / .6);clip-path:polygon(0 0,100% 0,100% calc(100% - 26px),calc(100% - 26px) 100%,0 100%)}
.w-d-cuaderno .w-s-1>li:nth-child(3n+2){border-top-color:#f6c84c}
.w-d-cuaderno .w-s-1>li:nth-child(3n){border-top-color:#e8909a}
.w-d-cuaderno .w-servicio h3{font-weight:800;font-size:1.35rem}
.w-d-cuaderno .w-precio{display:inline-block;padding:2px 10px;background:var(--w-panel);color:var(--w-tinta);font-weight:700;transform:rotate(-2deg)}
.w-d-cuaderno .w-horario{background:#fff;border:2px solid var(--w-tinta);border-radius:6px;overflow:hidden;border-collapse:separate}
.w-d-cuaderno .w-opinion{background:var(--w-panel);border:0;border-radius:2px;transform:rotate(-1deg);box-shadow:0 12px 20px -16px rgb(0 0 0 / .5)}
.w-d-cuaderno .w-opinion:nth-child(even){transform:rotate(1.2deg);background:#fff}
.w-d-cuaderno .w-galeria>li{border:8px solid #fff;box-shadow:0 14px 24px -18px rgb(0 0 0 / .5)}
.w-d-cuaderno .w-zonas>li{border-radius:999px;background:#fff;border:2px dashed var(--w-c)}
.w-d-cuaderno .w-contacto-sec{color:#fffcf5;--w-fondo:#22305e;--w-tinta:#fffcf5;--w-suave:#d3dbf3;--w-borde:#40508a;--w-panel:#22305e;--w-ct:var(--w-ct-oscuro);--w-reja:rgb(255 255 255 / .06);background:linear-gradient(var(--w-reja) 1px,transparent 1px) 0 0/22px 22px,linear-gradient(90deg,var(--w-reja) 1px,transparent 1px) 0 0/22px 22px,var(--w-azul)}
@container (min-width:760px){
  .w-d-cuaderno .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w-d-cuaderno .w-s-1{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  .w-d-cuaderno .w-s-1>li:nth-child(even){transform:rotate(1deg) translateY(14px)}
  .w-d-cuaderno .w-s-1>li:nth-child(odd){transform:rotate(-.8deg)}
}
`,
};
