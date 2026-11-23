import type { Diseno } from './tipos';

/** Iniciales para el monograma (máx. 2 letras de las palabras con significado). */
const iniciales = (n: string) =>
  n
    .split(/\s+/)
    .map((w) => w.replace(/[^\p{L}]/gu, ''))
    .filter(Boolean)
    .filter((w) => w.length > 2 || /^[A-ZÁÉÍÓÚÑ]/.test(w))
    .filter((w) => !/^(de|del|la|las|los|y|e|&)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('') || n.slice(0, 1).toUpperCase();

export const indice: Diseno = {
  id: 'indice',
  nombre: 'Índice',
  descripcion: 'Sobria y con autoridad: monograma, índice numerado y servicios como un sumario. Para asesorías, abogados, gestorías y consultoras.',
  color: '#b18b67',
  fondoClaro: '#ece5d6',
  fondoOscuro: '#182d42',
  fuentes: ['ash-dm-serif', 'ash-instrument-sans'],
  titulo: "'ash-dm-serif', Georgia, serif",
  texto: "'ash-instrument-sans', system-ui, sans-serif",
  servicios: 5,
  galeria: 2,
  opiniones: 3,
  contacto: 1,
  orden: ['servicios', 'sobre', 'opiniones', 'preguntas', 'horario', 'galeria', 'contacto'],
  titulos: { servicios: 'Áreas de trabajo', sobre: 'El despacho', opiniones: 'Clientes', preguntas: 'Consultas frecuentes', galeria: 'La oficina' },
  muestra: {
    negocio: 'Ferreiro Asesores',
    sector: 'Asesoría fiscal y laboral',
    lema: 'Impuestos, nóminas y contabilidad, explicados claro y a tiempo.',
    servicios: [
      { nombre: 'Fiscal', precio: '', texto: 'Declaraciones, IVA trimestral y planificación.' },
      { nombre: 'Laboral', precio: '', texto: 'Nóminas, contratos y seguros sociales.' },
      { nombre: 'Contable', precio: '', texto: 'Libros, cuentas anuales y cierre.' },
      { nombre: 'Autónomos', precio: '', texto: 'Alta, cuotas y cuota fija mensual.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const titulos: [string, string][] = (
      [
        ['servicios', d.servicios.length > 0],
        ['sobre', Boolean(d.sobre)],
        ['opiniones', d.opiniones.length > 0],
        ['preguntas', d.preguntas.length > 0],
        ['contacto', true],
      ] as const
    )
      .filter(([, hay]) => hay)
      .map(([id]) => [id, c.titulo(id)]);
    const indice = `<ol class="w-sumario">${titulos.map(([id, t], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${esc(t)}</a></li>`).join('')}</ol>`;
    return `<header class="w-cab w-cab-indice"><div class="w-in w-cab-in"><div class="w-cab-txt">
<p class="w-sello-mono" aria-hidden="true"><span>${esc(iniciales(d.negocio))}</span></p>
${d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : ''}<h1>${esc(d.negocio)}</h1>
${d.lema ? `<p class="w-lema">${esc(d.lema)}</p>` : ''}${c.bloqueAcciones}
</div><div class="w-cab-vis">${c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : ''}<nav class="w-cab-indice-nav" aria-label="Índice">${indice}</nav></div></div></header>`;
  },
  css: `
.w-d-indice{--w-fondo:#f5f1e8;--w-tinta:#182d42;--w-suave:#4c5a68;--w-borde:#dcd3c2;--w-panel:#ece5d6;--w-navy:#182d42;--w-r:4px;--w-esp:22px;counter-reset:w-srv}
.w-d-indice .w-cab{padding-block:clamp(36px,7cqw,100px);background:var(--w-navy);color:#f5f1e8;--w-ct:var(--w-ct-oscuro)}
.w-d-indice .w-cab-in{display:grid;gap:clamp(28px,5cqw,64px);align-items:center}
.w-d-indice .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,24px)}
.w-d-indice .w-sello-mono{display:grid;place-items:center;width:84px;height:84px;border-radius:50%;border:1.5px solid var(--w-c);outline:1px solid color-mix(in srgb,var(--w-c) 50%,transparent);outline-offset:5px}
.w-d-indice .w-sello-mono span{font:400 2rem/1 var(--w-ft-titulo);color:var(--w-ct);letter-spacing:.04em}
.w-d-indice .w-sector{font-size:.8rem;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:var(--w-ct)}
.w-d-indice .w-cab h1{font-weight:400;font-size:clamp(2.6rem,8cqw,5.6rem);line-height:1;letter-spacing:-.015em;text-wrap:balance}
.w-d-indice .w-cab .w-lema{font-size:clamp(1.05rem,2cqw,1.3rem);max-width:38ch;color:#d4d9df}
.w-d-indice .w-cab .w-boton{color:#f5f1e8;border-radius:2px}
.w-d-indice .w-cab .w-boton-lleno{color:var(--w-s)}
.w-d-indice .w-cab-vis{min-width:0;display:grid;gap:22px}
.w-d-indice .w-cab-foto{margin:0;border:1px solid color-mix(in srgb,var(--w-c) 60%,transparent);padding:8px}
.w-d-indice .w-cab-foto img{width:100%;aspect-ratio:3/2;object-fit:cover;filter:saturate(.8)}
.w-d-indice .w-sumario{list-style:none;margin:0;padding:0;border-top:1px solid #ffffff30}
.w-d-indice .w-sumario a{display:flex;gap:18px;align-items:baseline;padding:16px 4px;border-bottom:1px solid #ffffff30;text-decoration:none;font:400 clamp(1.2rem,2.4cqw,1.6rem) var(--w-ft-titulo);transition:padding .2s}
.w-d-indice .w-sumario a:hover{padding-left:14px;color:var(--w-c)}
.w-d-indice .w-sumario span{font:600 .8rem var(--w-ft-texto);letter-spacing:.14em;color:var(--w-c)}
.w-d-indice .w-sec h2{font-weight:400;font-size:clamp(2rem,5.4cqw,3.4rem);letter-spacing:-.01em;padding-bottom:16px;border-bottom:1px solid var(--w-borde)}
.w-d-indice .w-sec h2::after{display:none}
.w-d-indice .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-indice .w-servicios>li{counter-increment:w-srv;display:grid;grid-template-columns:auto 1fr;column-gap:20px;border:0;border-bottom:1px solid var(--w-borde);border-radius:0;padding:20px 0;background:transparent}
.w-d-indice .w-servicios>li::before{content:"§ " counter(w-srv);grid-row:span 2;font:400 1.5rem/1.2 var(--w-ft-titulo);color:var(--w-ct)}
.w-d-indice .w-servicio h3{font-weight:400;font-size:clamp(1.3rem,2.6cqw,1.7rem)}
.w-d-indice .w-servicio p{grid-column:2}
.w-d-indice .w-sobre{font-size:1.1rem;max-width:62ch}
.w-d-indice .w-sobre p:first-child{font:400 clamp(1.4rem,3cqw,1.9rem)/1.35 var(--w-ft-titulo)}
.w-d-indice .w-opinion{border-radius:0;border:0;border-top:2px solid var(--w-c);background:transparent}
.w-d-indice .w-opinion blockquote{font-family:var(--w-ft-titulo);font-size:1.2rem}
.w-d-indice .w-boton{border-radius:2px;letter-spacing:.04em}
.w-d-indice .w-horario tr:nth-child(even){background:transparent}
.w-d-indice .w-contacto-grande{font-family:var(--w-ft-titulo);font-weight:400}
@container (min-width:760px){
  .w-d-indice .w-cab-in{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)}
  .w-d-indice .w-servicios{display:grid;grid-template-columns:1fr 1fr;column-gap:56px}
}
`,
};
