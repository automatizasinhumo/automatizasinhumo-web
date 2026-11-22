// Prueba de combinaciones de la plantilla personalizable: cada diseño × cada forma (17), rotando color,
// color de acento, intensidad, posición, sombreado y fondo para que cada valor salga muchas veces.
// Cada combinación se compara con el mismo diseño sin decoración:
//  1. el PDF se genera sin error,
//  2. no cambia el número de páginas (la decoración no empuja el texto),
//  3. no cambia el texto (la decoración no añade ni quita palabras para un lector de PDF),
//  4. ningún texto legible sin decoración se vuelve ilegible: contraste < 3:1 dentro de su caja en la
//     primera página pintada (así se ve si una forma, un sombreado o un fondo tapan el texto).
// Todo con pdf.js: el texto y sus cajas en Node, los píxeles en el navegador (el mismo pintarPdf de la
// vista previa). Sale con código 1 si alguna combinación falla.
// Uso: con el sitio arrancado (npx astro dev), desde cv-estudio/:
//   npm run combinaciones -- [http://localhost:4321] [diseño,diseño…]    (todos: unos 9 minutos)
import { chromium } from 'playwright-core';

const BASE = (process.argv[2] ?? 'http://localhost:4321').replace(/\/$/, '');
const SOLO = process.argv[3]?.split(',').filter(Boolean);
const COLORES = ['#176b5a', '#1e3a8a', '#c2185b', '#111827', '#e0b84a', '#7c3aed'];
const INTENSIDADES = [0.2, 0.5, 0.8, 1];
const POSICIONES = ['arriba', 'abajo', 'ambas'];
const SOMBREADOS = ['ninguno', 'cabecera', 'pie', 'ambos', 'diagonal'];
const FONDOS = ['blanco', 'papel', 'gris', 'tinte'];
/** Ancho en píxeles al que se pinta la primera página para medir el contraste. */
const ANCHO = 1200;
const CONTRASTE_MIN = 3;

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

/** Páginas, texto completo y cajas de los textos de la primera página (en puntos, origen arriba a la izquierda). */
async function leer(bytes) {
  const tarea = pdfjs.getDocument({ data: bytes, useSystemFonts: true });
  const doc = await tarea.promise;
  const textos = [];
  let cajas = [];
  let anchoPt = 0;
  for (let n = 1; n <= doc.numPages; n++) {
    const pag = await doc.getPage(n);
    const { items } = await pag.getTextContent();
    textos.push(...items.map((it) => it.str));
    if (n === 1) {
      const v = pag.getViewport({ scale: 1 });
      anchoPt = v.width;
      cajas = items
        .filter((it) => it.str.trim() && it.width > 0)
        .map((it) => {
          const alto = it.height || Math.hypot(it.transform[2], it.transform[3]);
          const [x, y] = [it.transform[4], it.transform[5]];
          return { texto: it.str.trim(), x0: x, x1: x + it.width, y0: v.height - y - alto * 0.8, y1: v.height - y + alto * 0.15 };
        });
    }
  }
  const paginas = doc.numPages;
  await tarea.destroy();
  return { paginas, texto: textos.join(' ').replace(/\s+/g, ' ').trim(), cajas, anchoPt };
}

const navegador = process.env.CHROMIUM ? await chromium.launch({ executablePath: process.env.CHROMIUM }) : await chromium.launch().catch(() => chromium.launch({ channel: 'msedge' }));
const pagina = await navegador.newPage();
await pagina.goto(`${BASE}/servicios/cv/`, { waitUntil: 'networkidle' });
await pagina.waitForFunction(() => !!window.CvEstudio, null, { timeout: 120000 });
const { plantillas, formas } = await pagina.evaluate(() => ({ plantillas: window.CvEstudio.plantillas.map((p) => p.id), formas: Object.keys(window.CvEstudio.formas) }));

/** En el navegador: pinta la primera página de cada PDF y devuelve, por PDF, qué cajas no llegan al contraste mínimo. */
const medirContraste = (lote) =>
  pagina.evaluate(
    async ({ lote, ANCHO, CONTRASTE_MIN }) => {
      const lin = (c) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const LUM = Array.from({ length: 256 }, (_, i) => lin(i));
      const caja = document.createElement('div');
      document.body.append(caja);
      const out = [];
      for (const { b64, cajas, anchoPt } of lote) {
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        await window.CvEstudio.pintarPdf(new Blob([bytes], { type: 'application/pdf' }), caja, { ancho: ANCHO, maxPaginas: 1 });
        const lienzo = caja.querySelector('canvas');
        const { width, height } = lienzo;
        const px = lienzo.getContext('2d').getImageData(0, 0, width, height).data;
        const k = width / anchoPt;
        const malas = [];
        cajas.forEach((c, i) => {
          const x0 = Math.max(0, Math.floor(c.x0 * k)), x1 = Math.min(width - 1, Math.ceil(c.x1 * k));
          const y0 = Math.max(0, Math.floor(c.y0 * k)), y1 = Math.min(height - 1, Math.ceil(c.y1 * k));
          let min = 1, max = 0;
          for (let y = y0; y <= y1; y++)
            for (let x = x0; x <= x1; x++) {
              const j = (y * width + x) * 4;
              const l = 0.2126 * LUM[px[j]] + 0.7152 * LUM[px[j + 1]] + 0.0722 * LUM[px[j + 2]];
              if (l < min) min = l;
              if (l > max) max = l;
            }
          if (max >= min && (max + 0.05) / (min + 0.05) < CONTRASTE_MIN) malas.push(`${i}:${c.texto}`);
        });
        out.push(malas);
      }
      caja.remove();
      return out;
    },
    { lote, ANCHO, CONTRASTE_MIN },
  );

const fallos = [];
let k = 0;
let total = 0;
for (const plantilla of plantillas.filter((p) => !SOLO || SOLO.includes(p))) {
  const combis = formas.map((forma) => {
    const n = k++;
    return {
      forma,
      color: COLORES[n % COLORES.length],
      color2: COLORES[(n + 2) % COLORES.length],
      intensidad: INTENSIDADES[Math.floor(n / 4) % INTENSIDADES.length],
      posicion: POSICIONES[n % POSICIONES.length],
      sombreado: SOMBREADOS[n % SOMBREADOS.length],
      fondo: FONDOS[n % FONDOS.length],
    };
  });
  // Los PDF salen del navegador en base64, un diseño por viaje: el primero sin decoración.
  const pdfs = await pagina.evaluate(
    async ({ plantilla, combis }) => {
      const b64 = (blob) =>
        new Promise((ok) => {
          const r = new FileReader();
          r.onload = () => ok(String(r.result).split(',')[1]);
          r.readAsDataURL(blob);
        });
      const m = window.CvEstudio;
      const out = [{ b64: await b64(await m.crearPdf({ datos: null, plantilla, muestra: true, decoracion: null })) }];
      for (const d of combis) {
        try {
          out.push({ b64: await b64(await m.crearPdf({ datos: null, plantilla, muestra: true, color: d.color, decoracion: d })) });
        } catch (e) {
          out.push({ error: String(e?.message ?? e) });
        }
      }
      return out;
    },
    { plantilla, combis },
  );
  const lote = [];
  for (const p of pdfs) if (p.b64) Object.assign(p, await leer(Uint8Array.from(Buffer.from(p.b64, 'base64'))));
  // El contraste se mide con las cajas del diseño sin decoración: son las palabras que deben seguir leyéndose.
  const [base] = pdfs;
  for (const p of pdfs) if (p.b64) lote.push({ b64: p.b64, cajas: base.cajas, anchoPt: base.anchoPt });
  const malas = await medirContraste(lote);
  const malasBase = new Set(malas[0]);
  let m = 1;
  combis.forEach((d, i) => {
    total++;
    const quien = `${plantilla} · ${d.forma} (${d.posicion}, sombreado ${d.sombreado}, fondo ${d.fondo}, ${d.color}/${d.color2}, ${d.intensidad})`;
    const r = pdfs[i + 1];
    if (!r.b64) return fallos.push(`${quien}: no se genera (${r.error})`);
    const nuevas = malas[m++].filter((w) => !malasBase.has(w));
    if (r.paginas !== base.paginas) fallos.push(`${quien}: ${r.paginas} páginas (sin decoración, ${base.paginas})`);
    if (r.texto !== base.texto) fallos.push(`${quien}: el texto cambia respecto al diseño sin decoración`);
    if (nuevas.length) fallos.push(`${quien}: ${nuevas.length} texto(s) dejan de leerse: ${nuevas.slice(0, 5).map((w) => `«${w.split(':').slice(1).join(':')}»`).join(', ')}`);
  });
  process.stdout.write(`${plantilla} `);
}
await navegador.close();
console.log(`\ncombinaciones: ${total}; con fallo: ${fallos.length}`);
if (fallos.length) {
  console.error(fallos.join('\n'));
  process.exit(1);
}
console.log('✓ todas las combinaciones se generan, conservan páginas y texto, y se leen');
