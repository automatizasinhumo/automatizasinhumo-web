/**
 * Capa visual común a todas las plantillas (básicas y de autor): tres mandos que el cliente elige
 * sin tocar código y que dan relieve a la web en vez de dejarla plana.
 *  - Acabado: liso, papel (grano fino) o relieve (grano, sombras duras y titular subrayado).
 *  - Forma de la foto de portada: la del diseño, recta, inclinada, en arco u orgánica.
 *  - Movimiento: quieto, sutil (aparición al hacer scroll) o vivo (además, tarjetas que responden).
 * «auto» deja lo que trae el diseño (`Diseno.capa`) o, en las básicas, CAPA_BASICA.
 * Solo CSS: sin JavaScript en la página publicada, y nunca con opacidad (capturas y contraste estables).
 */
export const ACABADOS_WEB = [
  { id: 'auto', nombre: 'El del diseño', descripcion: 'Como lo pensó el diseñador' },
  { id: 'liso', nombre: 'Liso', descripcion: 'Limpio, sin textura' },
  { id: 'papel', nombre: 'Papel', descripcion: 'Grano fino, como impreso' },
  { id: 'relieve', nombre: 'Relieve', descripcion: 'Sombras marcadas y titular subrayado' },
] as const;
export const FORMAS_FOTO_WEB = [
  { id: 'auto', nombre: 'La del diseño', descripcion: 'Como viene en la plantilla' },
  { id: 'recta', nombre: 'Recta', descripcion: 'Rectángulo sin giros' },
  { id: 'inclinada', nombre: 'Inclinada', descripcion: 'Cortes en diagonal' },
  { id: 'arco', nombre: 'Arco', descripcion: 'Como una ventana' },
  { id: 'organica', nombre: 'Orgánica', descripcion: 'Forma suave e irregular' },
] as const;
export const MOVIMIENTOS_WEB = [
  { id: 'auto', nombre: 'El del diseño', descripcion: 'Aparición suave al bajar' },
  { id: 'quieto', nombre: 'Quieto', descripcion: 'Nada se mueve' },
  { id: 'sutil', nombre: 'Sutil', descripcion: 'Las secciones suben al aparecer' },
  { id: 'vivo', nombre: 'Vivo', descripcion: 'Además, tarjetas y fotos responden al pasar' },
] as const;

export type IdAcabadoWeb = (typeof ACABADOS_WEB)[number]['id'];
export type IdFormaFotoWeb = (typeof FORMAS_FOTO_WEB)[number]['id'];
export type IdMovimientoWeb = (typeof MOVIMIENTOS_WEB)[number]['id'];
export interface CapaWeb {
  acabado: IdAcabadoWeb;
  formaFoto: IdFormaFotoWeb;
  movimiento: IdMovimientoWeb;
}
export type CapaResuelta = { acabado: Exclude<IdAcabadoWeb, 'auto'>; formaFoto: IdFormaFotoWeb; movimiento: Exclude<IdMovimientoWeb, 'auto'> };

export const CAPA_POR_DEFECTO: CapaWeb = { acabado: 'auto', formaFoto: 'auto', movimiento: 'auto' };
/** Las básicas nacen con grano fino y aparición suave: ya no salen planas. */
export const CAPA_BASICA: CapaResuelta = { acabado: 'papel', formaFoto: 'auto', movimiento: 'sutil' };

const elegir = <T extends string>(v: T, diseno: T | undefined, base: T): T => (v !== 'auto' ? v : (diseno ?? base));

/** Lo que de verdad se pinta: lo elegido por el cliente, o lo del diseño, o lo de las básicas. */
export function resolverCapa(c: Partial<CapaWeb>, diseno?: Partial<CapaResuelta>): CapaResuelta {
  return {
    acabado: elegir((c.acabado ?? 'auto') as IdAcabadoWeb, diseno?.acabado, CAPA_BASICA.acabado) as CapaResuelta['acabado'],
    formaFoto: elegir((c.formaFoto ?? 'auto') as IdFormaFotoWeb, diseno?.formaFoto, CAPA_BASICA.formaFoto),
    movimiento: elegir((c.movimiento ?? 'auto') as IdMovimientoWeb, diseno?.movimiento, CAPA_BASICA.movimiento) as CapaResuelta['movimiento'],
  };
}

/** Clases para el contenedor `.w` (siempre ids validados: nunca texto del cliente). */
export const clasesCapa = (r: CapaResuelta) => ` w-ac-${r.acabado} w-ff-${r.formaFoto} w-mv-${r.movimiento}`;
/** Capa de grano, encima del contenido y debajo de la barra fija y de la marca de agua. */
export const granoCapa = (r: CapaResuelta) => (r.acabado === 'liso' ? '' : '<div class="w-grano" aria-hidden="true"></div>');

const RUIDO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.4 -.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const TARJETAS = ':is(.w-s-1>li,.w-s-2>li,.w-s-3>li,.w-s-4>li,.w-s-5>li,.w-opinion,.w-galeria>li)';
const FOTO = '.w-cab:not(.w-h-2) .w-cab-foto';

export const CSS_CAPA = `
.w-grano{position:absolute;inset:0;pointer-events:none;z-index:4;background-image:${RUIDO};background-size:180px;mix-blend-mode:multiply;opacity:var(--w-grano,.16)}
.w.w-ac-relieve{--w-grano:.22}
.w.w-ac-relieve ${TARJETAS}{box-shadow:6px 6px 0 color-mix(in srgb,var(--w-c) 60%,var(--w-tinta))}
.w.w-ac-relieve .w-cab-foto{box-shadow:10px 10px 0 color-mix(in srgb,var(--w-c) 60%,var(--w-tinta))}
.w.w-ac-relieve .w-boton-lleno{box-shadow:4px 4px 0 var(--w-tinta)}
.w.w-ac-relieve .w-cab h1{text-decoration:underline;text-decoration-color:color-mix(in srgb,var(--w-c) 55%,transparent);text-decoration-thickness:.14em;text-underline-offset:.06em;text-decoration-skip-ink:none}
.w.w-ff-recta ${FOTO}{transform:none;border-radius:0;clip-path:none}
.w.w-ff-inclinada ${FOTO}{transform:none;border-radius:0;clip-path:polygon(9% 0,100% 0,91% 100%,0 100%)}
.w.w-ff-arco ${FOTO}{transform:none;border-radius:999px 999px 0 0;overflow:hidden}
.w.w-ff-organica ${FOTO}{transform:none;border-radius:62% 38% 46% 54%/48% 56% 44% 52%;overflow:hidden}
.w:is(.w-ff-recta,.w-ff-inclinada,.w-ff-arco,.w-ff-organica) ${FOTO} img{border-radius:0}
.w.w-ac-relieve:is(.w-ff-inclinada,.w-ff-arco,.w-ff-organica) .w-cab-foto{box-shadow:none}
.w.w-mv-quieto *{animation:none!important;transition:none!important}
@media (prefers-reduced-motion:no-preference){
  .w.w-mv-vivo ${TARJETAS}{transition:transform .25s ease,box-shadow .25s ease}
  .w.w-mv-vivo .w-galeria img,.w.w-mv-vivo .w-cab-foto img{transition:transform .6s ease}
  .w.w-mv-vivo .w-boton{transition:transform .2s ease}
  @media (hover:hover){
    .w.w-mv-vivo ${TARJETAS}:hover{transform:translateY(-6px) rotate(-.6deg)}
    .w.w-mv-vivo .w-galeria>li:hover img,.w.w-mv-vivo .w-cab-foto:hover img{transform:scale(1.06)}
    .w.w-mv-vivo .w-boton:hover{transform:translateY(-2px)}
  }
  @supports (animation-timeline:view()){
    .w:is(.w-mv-sutil,.w-mv-vivo) .w-sec .w-in>*{animation:w-sube linear both;animation-timeline:view();animation-range:entry 0% entry 40%}
    .w.w-mv-vivo .w-sec .w-in>*{animation-name:w-entra}
  }
}
@keyframes w-sube{from{transform:translateY(26px)}}
@keyframes w-entra{from{transform:translateY(48px) scale(.96)}}
`;
