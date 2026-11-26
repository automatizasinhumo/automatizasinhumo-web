import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: tres fotogramas abstractos (horizonte, retrato y luz) sobre la tira de película. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 480 220" aria-hidden="true" focusable="false">
<rect width="480" height="220" class="pelicula"/>
<g class="perfo"><rect x="10" y="10" width="14" height="10" rx="2"/><rect x="50" y="10" width="14" height="10" rx="2"/><rect x="90" y="10" width="14" height="10" rx="2"/><rect x="130" y="10" width="14" height="10" rx="2"/><rect x="170" y="10" width="14" height="10" rx="2"/><rect x="210" y="10" width="14" height="10" rx="2"/><rect x="250" y="10" width="14" height="10" rx="2"/><rect x="290" y="10" width="14" height="10" rx="2"/><rect x="330" y="10" width="14" height="10" rx="2"/><rect x="370" y="10" width="14" height="10" rx="2"/><rect x="410" y="10" width="14" height="10" rx="2"/><rect x="450" y="10" width="14" height="10" rx="2"/>
<rect x="10" y="200" width="14" height="10" rx="2"/><rect x="50" y="200" width="14" height="10" rx="2"/><rect x="90" y="200" width="14" height="10" rx="2"/><rect x="130" y="200" width="14" height="10" rx="2"/><rect x="170" y="200" width="14" height="10" rx="2"/><rect x="210" y="200" width="14" height="10" rx="2"/><rect x="250" y="200" width="14" height="10" rx="2"/><rect x="290" y="200" width="14" height="10" rx="2"/><rect x="330" y="200" width="14" height="10" rx="2"/><rect x="370" y="200" width="14" height="10" rx="2"/><rect x="410" y="200" width="14" height="10" rx="2"/><rect x="450" y="200" width="14" height="10" rx="2"/></g>
<rect x="16" y="32" width="140" height="156" class="cuadro"/><path d="M16 138l40-30 34 22 30-34 36 30v62H16z" class="sombra"/><circle cx="118" cy="70" r="16" class="acento"/>
<rect x="170" y="32" width="140" height="156" class="cuadro"/><circle cx="240" cy="96" r="30" class="sombra"/><path d="M190 188q0-58 50-58t50 58z" class="sombra"/>
<rect x="324" y="32" width="140" height="156" class="cuadro"/><path d="M324 32h140L394 188z" class="luz"/><rect x="380" y="150" width="28" height="38" class="acento"/>
</svg>`;

export const fotograma: Diseno = {
  id: 'fotograma',
  nombre: 'Fotograma 36',
  descripcion: 'Carrete de película: fondo negro, tira de fotogramas que se desliza con el dedo, perforaciones y numeración. Para fotógrafos, vídeo, bodas y estudios creativos.',
  color: '#e5483b',
  fondoClaro: '#f1eee6',
  fondoOscuro: '#1f1f1f',
  fuentes: ['ash-space-grotesk', 'ash-plex-mono'],
  titulo: "'ash-space-grotesk', 'Helvetica Neue', sans-serif",
  texto: "'ash-space-grotesk', system-ui, sans-serif",
  servicios: 4,
  galeria: 2,
  opiniones: 1,
  contacto: 2,
  orden: ['galeria', 'servicios', 'opiniones', 'sobre', 'zonas', 'preguntas', 'contacto'],
  sectores: ['fotografia'],
  palabras: ['video', 'film', 'boda'],
  titulos: { galeria: 'Contactos', servicios: 'Sesiones', opiniones: 'Revelado', sobre: 'Detrás de la cámara', zonas: 'Dónde disparo', contacto: 'Reserva fecha' },
  muestra: {
    negocio: 'Lucía Grano',
    sector: 'Fotografía de bodas y retrato',
    lema: 'Fotografía documental, sin poses forzadas. Entrego la galería completa en tres semanas.',
    zonas: 'Galicia, Asturias y destino',
    servicios: [
      { nombre: 'Boda completa', precio: 'desde 1.600 €', texto: 'Desde los preparativos hasta el baile, con galería online.' },
      { nombre: 'Sesión de retrato', precio: '180 €', texto: 'Una hora en exterior o estudio, 25 fotos editadas.' },
      { nombre: 'Reportaje de empresa', precio: 'desde 350 €', texto: 'Equipo, espacio y producto para web y redes.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-fotograma"><div class="w-in w-cab-in"><div class="w-cab-txt">
<p class="w-rollo" aria-hidden="true"><span>ISO 400</span><span>36 EXP</span><span>F/2.8</span></p>
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  tras: () => `<div class="w-cinta" aria-hidden="true"><span>▶ 01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span><span>08</span></div>`,
  css: `
.w-d-fotograma{--w-fondo:#141414;--w-tinta:#f1eee6;--w-suave:#bdb9b0;--w-borde:#343434;--w-panel:#1f1f1f;--w-papel:#f1eee6;--w-r:0px;--w-esp:22px;--w-ct:var(--w-ct-oscuro);--w-mono:'ash-plex-mono',ui-monospace,monospace}
.w-d-fotograma .w-cuerpo{background:radial-gradient(rgb(255 255 255 / .05) 1px,transparent 1.2px) 0 0/4px 4px,var(--w-fondo);color:var(--w-tinta)}
.w-d-fotograma .w-nav-marca{font-weight:700;letter-spacing:-.02em}
.w-d-fotograma .w-nav ul a{font-family:var(--w-mono);font-size:.8rem;text-transform:uppercase;letter-spacing:.1em}
.w-d-fotograma .w-cab{background:transparent;padding-block:clamp(30px,6cqw,90px) clamp(20px,3cqw,40px)}
.w-d-fotograma .w-cab-in{display:grid;gap:clamp(24px,4cqw,52px);align-items:end}
.w-d-fotograma .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,22px)}
.w-d-fotograma .w-rollo{display:flex;flex-wrap:wrap;gap:8px}
.w-d-fotograma .w-rollo span{padding:4px 10px;border:1px solid var(--w-borde);font:500 .72rem/1 var(--w-mono);letter-spacing:.14em;color:var(--w-suave)}
.w-d-fotograma .w-rollo span:first-child{border-color:var(--w-c);color:var(--w-ct)}
.w-d-fotograma .w-sector{font-family:var(--w-mono);color:var(--w-suave);letter-spacing:.16em}
.w-d-fotograma .w-cab h1{font-weight:700;font-size:min(clamp(3.2rem,12cqw,9rem),var(--w-h1-tope,99em));line-height:.86;letter-spacing:-.05em}
.w-d-fotograma .w-cab .w-lema{max-width:40ch;color:var(--w-suave)}
.w-d-fotograma .w-boton{border-radius:0;font-weight:600;text-transform:uppercase;letter-spacing:.06em;font-size:.88rem}
.w-d-fotograma .w-cab-foto{border:10px solid #000;box-shadow:0 0 0 1px var(--w-borde)}
.w-d-fotograma .w-ilus .pelicula{fill:#000}
.w-d-fotograma .w-ilus .perfo{fill:var(--w-papel);opacity:.85}
.w-d-fotograma .w-ilus .cuadro{fill:#2a2826}
.w-d-fotograma .w-ilus .sombra{fill:#4a4640}
.w-d-fotograma .w-ilus .luz{fill:#8a8378;opacity:.55}
.w-d-fotograma .w-ilus .acento{fill:var(--w-c)}
.w-d-fotograma .w-cinta{display:flex;gap:0;overflow:hidden;padding:14px 0;background:#000;border-block:1px solid var(--w-borde);font:500 .72rem/1 var(--w-mono);letter-spacing:.2em;color:#e9b44c;white-space:nowrap;background-image:radial-gradient(circle at 50% 3px,var(--w-papel) 2px,transparent 2.5px),radial-gradient(circle at 50% calc(100% - 3px),var(--w-papel) 2px,transparent 2.5px);background-size:24px 100%;background-repeat:repeat-x}
.w-d-fotograma .w-cinta span{flex:1 0 140px;text-align:center}
.w-d-fotograma .w-sec{border-top:1px solid var(--w-borde)}
.w-d-fotograma .w-sec h2{font-weight:700;font-size:clamp(2.4rem,7cqw,4.6rem);letter-spacing:-.04em}
.w-d-fotograma .w-sec h2::before{content:"● REC";display:block;margin-bottom:10px;font:500 .72rem/1 var(--w-mono);letter-spacing:.2em;color:var(--w-ct)}
.w-d-fotograma .w-sec h2::after{display:none}
.w-d-fotograma .w-g-2{counter-reset:foto;gap:10px;padding:26px 12px;background:#000;background-image:linear-gradient(90deg,var(--w-papel) 0 12px,transparent 12px 26px),linear-gradient(90deg,var(--w-papel) 0 12px,transparent 12px 26px);background-size:26px 8px;background-position:0 8px,0 calc(100% - 8px);background-repeat:repeat-x}
.w-d-fotograma .w-g-2>li{counter-increment:foto;position:relative;border-radius:0}
.w-d-fotograma .w-g-2>li::after{content:counter(foto,decimal-leading-zero) "A";position:absolute;left:8px;bottom:-20px;font:500 .66rem/1 var(--w-mono);letter-spacing:.14em;color:#e9b44c}
.w-d-fotograma .w-g-2 img{border-radius:0;filter:saturate(.85) contrast(1.05)}
.w-d-fotograma .w-s-4>li{border-bottom-color:var(--w-borde)}
.w-d-fotograma .w-s-4>li::before{font-family:var(--w-mono);font-weight:500;font-size:1rem}
.w-d-fotograma .w-servicio h3{font-weight:700;font-size:clamp(1.4rem,3cqw,2rem);letter-spacing:-.02em}
.w-d-fotograma .w-precio{font-family:var(--w-mono);color:var(--w-ct)}
.w-d-fotograma .w-opiniones-sec{color:#141414;--w-fondo:#f1eee6;--w-tinta:#141414;--w-suave:#4a4741;--w-borde:#d6d1c4;--w-panel:#f1eee6;--w-ct:var(--w-ct-claro);background:var(--w-papel)}
.w-d-fotograma .w-opiniones-sec .w-sec{border:0}
.w-d-fotograma .w-o-1>li:first-child{background:#fff;border-inline-start-color:var(--w-c)}
.w-d-fotograma .w-autor{font-family:var(--w-mono);text-transform:uppercase;letter-spacing:.12em;font-size:.78rem}
.w-d-fotograma .w-zonas>li{border-radius:0;border:1px solid var(--w-borde);background:transparent;font-family:var(--w-mono);font-size:.8rem;text-transform:uppercase;letter-spacing:.1em}
.w-d-fotograma .w-pregunta{border-radius:0}
.w-d-fotograma .w-c-2 .w-contacto-cta{border-radius:0}
.w-d-fotograma .w-contacto-grande{font-weight:700;letter-spacing:-.03em}
.w-d-fotograma .w-pie{font-family:var(--w-mono);font-size:.75rem;letter-spacing:.08em}
@container (min-width:760px){
  .w-d-fotograma .w-cab-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .w-d-fotograma .w-g-2{grid-auto-columns:minmax(300px,38%)}
  .w-d-fotograma .w-s-4{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0 28px}
  .w-d-fotograma .w-s-4>li{grid-template-columns:1fr;border-bottom:0;border-top:1px solid var(--w-borde)}
  .w-d-fotograma .w-s-4>li::before{grid-row:auto}
  .w-d-fotograma .w-s-4 .w-servicio p{grid-column:1}
}
`,
};
