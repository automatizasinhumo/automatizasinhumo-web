// Puerta funcional de una demo o vista previa publicada: Chromium a 360, 390 y 1280 px con
// qa/funcional.mjs. Imprime un JSON {"problemas": [...]} y sale con 1 si hay alguno.
// La usa la fábrica (manual/fabrica/vistas-previas.py) antes de marcar «QA ok».
// Además (qa/contacto.mjs): teléfono, WhatsApp y correo bien escritos y, en el móvil, un botón
// de contacto en la primera pantalla. Con --publicar (la web ya en su dominio, no la vista
// previa, que va con noindex a propósito): sin noindex y con canonical a sí misma.
// uso: node qa/demo-funcional.mjs [--publicar] <url> [<url>...]
import { chromium } from 'playwright';
import { ANCHOS, revisarPagina } from './funcional.mjs';

const args = process.argv.slice(2);
const publicar = args.includes('--publicar');
const urls = args.filter((a) => !a.startsWith('--'));
if (!urls.length) {
  console.error('uso: node qa/demo-funcional.mjs [--publicar] <url> [<url>...]');
  process.exit(2);
}
// Problema -> anchos en que aparece: «JS: x (360, 390, 1280px)» en vez de tres líneas.
const vistos = new Map();
const br = await chromium.launch();
try {
  const comprobados = new Set();
  for (const ancho of ANCHOS) {
    const ctx = await br.newContext({
      viewport: { width: ancho, height: 800 },
      locale: 'es-ES',
    });
    for (const url of urls) {
      // Los enlaces se comprueban una vez (al primer ancho); el resto, en cada ancho.
      for (const p of await revisarPagina(ctx, url, { ancho, comprobados, primerClic: true, publicar })) vistos.set(p, [...(vistos.get(p) ?? []), ancho]);
    }
    await ctx.close();
  }
} finally {
  await br.close();
}
const problemas = [...vistos].map(([p, anchos]) => `${p} (${anchos.join(', ')}px)`);
console.log(JSON.stringify({ problemas }));
process.exit(problemas.length ? 1 : 0);
