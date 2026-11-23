import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { documentoWeb, EJEMPLO_WEB, PLANTILLAS_WEB, validarWeb, type DatosWeb } from '../../src/features/servicios/webs';

const ORIGEN = 'http://qa.local';
const ANCHOS = [390, 768, 1280] as const;
const PUBLIC = new URL('../../public/', import.meta.url);

/** Datos que rompen maquetas: nombre largo con palabras largas, muchos servicios y textos extensos. */
const CASOS: Record<string, Partial<DatosWeb>> = {
  ejemplo: {},
  largo: {
    negocio: 'Talleres y Reparaciones Hermanos Gil Fernández',
    sector: 'Electrodomésticos y climatización',
    lema: 'Reparamos lavadoras, frigoríficos, hornos y aires acondicionados de todas las marcas en el día, con garantía por escrito de seis meses.',
    servicios: Array.from({ length: 8 }, (_, i) => ({
      nombre: `Reparación de electrodomésticos ${i + 1}`,
      precio: 'desde 1.250,00 €',
      texto: 'Diagnóstico a domicilio, presupuesto cerrado antes de empezar y piezas originales con garantía.',
    })),
  },
  corto: { negocio: 'Xo', sector: 'Bar', lema: 'Ven.', servicios: [] },
};

async function abrir(pg: Page, plantilla: string, caso: Partial<DatosWeb>) {
  await pg.route(`${ORIGEN}/**`, async (r) => {
    const ruta = new URL(r.request().url()).pathname.slice(1);
    try {
      await r.fulfill({ body: await readFile(new URL(ruta, PUBLIC)), contentType: ruta.endsWith('.woff2') ? 'font/woff2' : undefined });
    } catch {
      await r.fulfill({ status: 404, body: '' });
    }
  });
  const v = validarWeb({ ...EJEMPLO_WEB, ...caso, plantilla });
  if (!v.ok) throw new Error(`datos de prueba no válidos: ${v.error}`);
  const d = v.datos;
  const html = documentoWeb(d, `${ORIGEN}/w/qa`, ORIGEN);
  await pg.goto(`${ORIGEN}/__qa__`).catch(() => {});
  await pg.setContent(html, { waitUntil: 'load' });
  // fonts.ready puede resolverse antes de que se pidan las fuentes: se cargan todas a la vez y se
  // exige que ninguna falle (si una cae a la de sistema, la geometría medida no es la real).
  const rotas = await pg.evaluate(async () => {
    await Promise.all([...document.fonts].map((f) => f.load().catch(() => null)));
    await document.fonts.ready;
    return [...document.fonts].filter((f) => f.status !== 'loaded').map((f) => `${f.family} ${f.weight} ${f.style}`);
  });
  if (rotas.length) throw new Error(`fuentes sin cargar: ${rotas.join(', ')}`);
}

/** Palabras de titulares que ocupan más de una línea (Range.getClientRects por palabra). */
function partidas(pg: Page) {
  return pg.evaluate(() => {
    // Giros y animaciones de entrada inclinan las cajas: se mide la maqueta sin transformar.
    const quieto = document.createElement('style');
    quieto.textContent = '*{transform:none!important;rotate:none!important;scale:none!important;translate:none!important;animation:none!important}';
    document.head.append(quieto);
    const fallos: string[] = [];
    const seg = new Intl.Segmenter('es', { granularity: 'word' });
    for (const h of document.querySelectorAll<HTMLElement>('h1,h2,h3')) {
      const lh = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize) * 1.2;
      const tw = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        for (const w of seg.segment(n.textContent ?? '')) {
          if (!w.isWordLike) continue;
          // En h2/h3 de tarjetas estrechas una palabra de 15+ letras («electrodomésticos») puede no caber
          // ni encogida: se admite que baje partida (con guion donde el navegador separa) antes que desbordar.
          if (h.tagName !== 'H1' && [...w.segment].length >= 15) continue;
          const r = document.createRange();
          r.setStart(n, w.index);
          r.setEnd(n, w.index + w.segment.length);
          const tops: number[] = [];
          for (const x of r.getClientRects()) if (x.width > 0 && !tops.some((t) => Math.abs(t - x.top) < Math.max(6, lh * 0.4))) tops.push(x.top);
          if (tops.length > 1) fallos.push(`${h.tagName} «${w.segment}» en ${tops.length} líneas`);
        }
      }
    }
    quieto.remove();
    return fallos;
  });
}

/** Desborde horizontal del documento o de la raíz de la web. */
function desborde(pg: Page) {
  return pg.evaluate(() => {
    const w = document.documentElement.clientWidth;
    const fuera = [...document.querySelectorAll<HTMLElement>('.w *')]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        if (r.width === 0 || r.right <= w + 1) return false;
        for (let p = e.parentElement; p; p = p.parentElement) {
          const o = getComputedStyle(p);
          if (o.overflowX !== 'visible' || o.clipPath !== 'none') return false;
        }
        return true;
      })
      .slice(0, 3)
      .map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')}`);
    const h1 = document.querySelector<HTMLElement>('.w-cab h1');
    const tam = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 99;
    const col = h1?.parentElement?.getBoundingClientRect().width ?? 999;
    return { doc: document.documentElement.scrollWidth - w, fuera, tam, col };
  });
}

for (const p of PLANTILLAS_WEB) {
  for (const [nombre, caso] of Object.entries(CASOS)) {
    test(`${p.id} · ${nombre}`, async ({ page }) => {
      const errores: string[] = [];
      for (const ancho of ANCHOS) {
        await page.setViewportSize({ width: ancho, height: 900 });
        await abrir(page, p.id, caso);
        const d = await desborde(page);
        if (d.doc > 1) errores.push(`${ancho}px: la página desborda ${d.doc}px`);
        if (d.fuera.length) errores.push(`${ancho}px: se sale ${d.fuera.join(', ')}`);
        // El tope por palabra larga encoge el titular, pero nunca hasta dejarlo pequeño ni aplastar su columna.
        if (d.tam < 26) errores.push(`${ancho}px: titular de ${d.tam}px`);
        if (d.col < 200) errores.push(`${ancho}px: columna del titular de ${Math.round(d.col)}px`);
        for (const f of await partidas(page)) errores.push(`${ancho}px: palabra partida ${f}`);
      }
      expect(errores).toEqual([]);
    });
  }
}
