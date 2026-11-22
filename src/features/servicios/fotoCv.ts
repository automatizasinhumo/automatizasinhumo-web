/**
 * Encuadre de la foto del CV: la foto subida se guarda reducida («base», solo en este navegador)
 * y lo que va al motor es un recorte cuadrado de ella, según cuánto se acerque y hacia dónde se
 * mueva. Así se puede reencuadrar cuantas veces se quiera sin perder calidad ni resubirla.
 */
export interface AjusteFoto {
  /** 1 = la foto entera cabe en el cuadrado; hasta 3 = acercada. */
  zoom: number;
  /** Centro del recorte en % del hueco que sobra (0 = izquierda/arriba, 50 = centro). */
  x: number;
  y: number;
}
export const AJUSTE_INICIAL: AjusteFoto = { zoom: 1, x: 50, y: 50 };
export const ZOOM_MAX = 3;
/** Lado de la base guardada y del recorte que va al PDF (sobra para una foto de ~3 cm). */
const LADO_BASE = 960;
const LADO_RECORTE = 480;

const limitar = (v: unknown, min: number, max: number, defecto: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : defecto;
};
export const normalizarAjuste = (a: Partial<AjusteFoto> | null | undefined): AjusteFoto => ({
  zoom: limitar(a?.zoom, 1, ZOOM_MAX, 1),
  x: limitar(a?.x, 0, 100, 50),
  y: limitar(a?.y, 0, 100, 50),
});

/**
 * Rectángulo de la foto (en sus píxeles) que llena el cuadrado. Con zoom 1 es el mayor cuadrado
 * que cabe (la foto «cubre» el hueco, como object-fit: cover); x/y lo desplazan por lo que sobra.
 */
export function recuadro(ancho: number, alto: number, ajuste: AjusteFoto) {
  const a = normalizarAjuste(ajuste);
  const lado = Math.min(ancho, alto) / a.zoom;
  return {
    sx: ((ancho - lado) * a.x) / 100,
    sy: ((alto - lado) * a.y) / 100,
    lado,
  };
}

function aJpeg(lienzo: HTMLCanvasElement, max: number): string {
  for (const q of [0.88, 0.78, 0.66, 0.52, 0.4]) {
    const url = lienzo.toDataURL('image/jpeg', q);
    if (url.length <= max) return url;
  }
  return '';
}
function lienzoBlanco(ancho: number, alto: number) {
  const lienzo = document.createElement('canvas');
  lienzo.width = Math.max(1, Math.round(ancho));
  lienzo.height = Math.max(1, Math.round(alto));
  const ctx = lienzo.getContext('2d')!;
  ctx.fillStyle = '#fff'; // JPEG sin transparencia: fondo blanco en vez de negro
  ctx.fillRect(0, 0, lienzo.width, lienzo.height);
  return { lienzo, ctx };
}

/** Reduce la foto subida a JPEG (lado mayor LADO_BASE): es la base que se reencuadra. */
export async function reducirBase(f: Blob, max: number): Promise<string> {
  const bmp = await createImageBitmap(f);
  const k = Math.min(1, LADO_BASE / Math.max(bmp.width, bmp.height));
  const { lienzo, ctx } = lienzoBlanco(bmp.width * k, bmp.height * k);
  ctx.drawImage(bmp, 0, 0, lienzo.width, lienzo.height);
  bmp.close();
  return aJpeg(lienzo, max);
}

const cache = new Map<string, Promise<ImageBitmap>>();
function abrir(base: string): Promise<ImageBitmap> {
  let p = cache.get(base);
  if (!p) {
    cache.clear();
    // Sin fetch(data:): la CSP de la tienda no deja conectar a data:. Se decodifica a mano.
    const m = /^data:(image\/(?:jpeg|png));base64,([A-Za-z0-9+/=]+)$/.exec(base);
    p = m
      ? createImageBitmap(new Blob([Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0))], { type: m[1] }))
      : Promise.reject(new Error('foto no válida'));
    cache.set(base, p);
  }
  return p;
}

/** Recorte cuadrado JPEG de la base según el ajuste: es lo que se guarda en el campo «foto». */
export async function recortar(base: string, ajuste: AjusteFoto, max: number): Promise<string> {
  const bmp = await abrir(base);
  const { sx, sy, lado } = recuadro(bmp.width, bmp.height, ajuste);
  const salida = Math.min(LADO_RECORTE, Math.round(lado)) || 1;
  const { lienzo, ctx } = lienzoBlanco(salida, salida);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bmp, sx, sy, lado, lado, 0, 0, salida, salida);
  return aJpeg(lienzo, max);
}
