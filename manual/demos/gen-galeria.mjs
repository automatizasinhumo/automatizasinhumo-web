// node manual/demos/gen-galeria.mjs
// Escribe src/data/galeria-demos.json: una entrada por demo con captura real,
// agrupada por categoría del catálogo. La usa la página /pages/demos.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { categorias, productos } from '../catalogo/catalogo.mjs';
import { demosDe } from './demos.mjs';

const ROOT = new URL('../../', import.meta.url);
const vistos = new Set();
const items = [];
for (const p of productos) {
  for (const d of demosDe(p.slug)) {
    const img = new URL(d.url).pathname.split('/').filter(Boolean).pop();
    if (!img || vistos.has(img) || !existsSync(new URL(`public/images/demos/${img}.png`, ROOT))) continue;
    vistos.add(img);
    items.push({ img, url: d.url, titulo: d.titulo, tipo: d.tipo, producto: p.slug, nombre: p.nombre, precio: p.p[0], plazo: p.plazo, cat: p.cat });
  }
}
// Primero lo que se puede tocar.
items.sort((a, b) => (b.tipo === 'interactiva') - (a.tipo === 'interactiva'));
const cats = categorias.filter((c) => items.some((i) => i.cat === c.slug)).map((c) => ({ slug: c.slug, nombre: c.corto ?? c.nombre }));
mkdirSync(new URL('src/data/', ROOT), { recursive: true });
writeFileSync(fileURLToPath(new URL('src/data/galeria-demos.json', ROOT)), JSON.stringify({ cats, items }, null, 1) + '\n');
// Visor de la ficha: demos por servicio, primero lo que se puede tocar.
const porProducto = {};
for (const p of productos) {
  const ds = demosDe(p.slug);
  if (ds.length) porProducto[p.slug] = [...ds.filter((d) => d.tipo === 'interactiva'), ...ds.filter((d) => d.tipo !== 'interactiva')];
}
writeFileSync(fileURLToPath(new URL('src/data/demos-producto.json', ROOT)), JSON.stringify(porProducto, null, 1) + '\n');
console.error(`${items.length} demos con captura en ${cats.length} categorías`);
