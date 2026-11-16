// node manual/catalogo/gen-sql.mjs > manual/catalogo/seed.sql
// Sustituye el catálogo demo de Minshop por el catálogo de servicios.
import { readFileSync } from 'node:fs';
import { randomInt } from 'node:crypto';
import { categorias, productos, paginas } from './catalogo.mjs';
import { DEMOS, DEMOS_URL, demosDe } from '../demos/demos.mjs';

const here = new URL('.', import.meta.url);
const meta = new Map();
for (const line of readFileSync(new URL('repos_meta.csv', here), 'utf8').split(/\r?\n/).slice(1)) {
  const [name, desc, lic, home, stars] = line.split(';');
  if (name) meta.set(name.toLowerCase(), { lic, home, stars });
}

const ALPHA = '0123456789abcdefghjkmnpqrstvwxyz';
const pid = (p) => `${p}_${Array.from({ length: 10 }, () => ALPHA[randomInt(32)]).join('')}`;
const q = (s) => (s == null ? 'NULL' : `'${String(s).replace(/'/g, "''")}'`);

const licNota = (lic) => {
  if (!lic || lic === 'NONE' || lic === 'NOASSERTION') return 'sin licencia clara: solo referencia de diseño';
  if (/AGPL|GPL/.test(lic)) return `${lic}: uso con condiciones (código abierto si se distribuye)`;
  return `${lic}: libre para uso comercial`;
};

function descripcion(p) {
  const l = [];
  l.push(p.resumen, '');
  l.push('### Qué recibes', ...p.recibes.map((x) => `- ${x}`), '');
  l.push('### Campos que rellenas', ...p.campos.map((x) => `- ${x}`), '');
  l.push('### Ejemplo', `> ${p.ejemplo}`, '');
  const demos = demosDe(p.slug);
  if (demos.length) l.push('### Demo en vivo', ...demos.map((d) => `- [${d.titulo}](${d.url})`), '');
  l.push(`**Plazo:** ${p.plazo}`, '');
  if (p.p.length === 2) {
    l.push('### Modalidades',
      `- **Lo montas tú** (${p.p[0]} €): plantilla + guía paso a paso.`,
      `- **Te lo montamos** (${p.p[1]} €): lo publicamos con tus datos.`, '');
  }
  if (p.repos.length) {
    l.push('### Base técnica (código abierto)');
    for (const r of p.repos) {
      const m = meta.get(r.toLowerCase());
      const demo = m?.home && /^https?:/.test(m.home) ? ` · [demo](${m.home})` : '';
      l.push(`- [${r}](https://github.com/${r}) — ${licNota(m?.lic)}${demo}`);
    }
    l.push('');
  }
  return l.join('\n');
}

const out = [];
out.push('-- Generado por manual/catalogo/gen-sql.mjs. No editar a mano.');
// Borra el catálogo demo. No toca pedidos: si hubiera, el DELETE de products
// fallaría por la FK de order_items y no se borraría nada a ciegas.
for (const t of ['product_extras', 'product_images', 'product_variants', 'product_categories', 'products', 'categories', 'menu_items', 'page_media', 'pages'])
  out.push(`DELETE FROM ${t};`);

// Categorías
for (const c of categorias)
  out.push(`INSERT INTO categories (name, slug, public_id) VALUES (${q(c.nombre)}, ${q(c.slug)}, ${q(pid('cat'))});`);

// Productos
for (const p of productos) {
  const varios = p.p.length === 2;
  out.push(`INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES (${q(p.nombre)}, ${q(descripcion(p))}, ${p.p[0] * 100}, 'eur', 999, 1, ${q(p.slug)}, ${varios ? q('Modalidad') : 'NULL'}, 0, ${q(pid('prod'))});`);
  out.push(`INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug=${q(p.slug)} AND c.slug=${q(p.cat)};`);
  // Portada PNG estática (public/images/productos, generada por gen-imagenes.mjs)
  const img = `productos/${p.slug}.png`;
  out.push(`UPDATE products SET image_key=${q(img)} WHERE slug=${q(p.slug)};`);
  out.push(`INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, ${q(img)}, 0, ${q(pid('pimg'))} FROM products WHERE slug=${q(p.slug)};`);
  if (varios) {
    [['Lo montas tú (plantilla + guía)', p.p[0]], ['Te lo montamos', p.p[1]]].forEach(([label, eur], i) =>
      out.push(`INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, ${q(label)}, ${eur * 100}, 999, ${q(`${p.slug}-${i ? 'pro' : 'diy'}`)}, ${i}, 1, ${q(pid('var'))} FROM products WHERE slug=${q(p.slug)};`));
  }
}

// Páginas
const lista = DEMOS.map(([slug, , t, prod]) => `- **[${t}](${DEMOS_URL}/${slug}/)** · servicio: [${productos.find((x) => x.slug === prod)?.nombre ?? prod}](/products/${prod})`).join('\n');
for (const pg of paginas)
  out.push(`INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES (${q(pg.titulo)}, ${q(pg.slug)}, ${q(pg.md.replace('DEMOS_LISTA', lista))}, 1, 'standard', ${q(pid('page'))});`);

// Menú
let pos = 0;
const nav = (loc, type, targetSql, label) =>
  out.push(`INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES (${q(loc)}, ${q(type)}, ${targetSql}, ${q(label)}, ${pos++}, ${q(pid('nav'))});`);
nav('header', 'catalog', 'NULL', 'Todos los servicios');
for (const c of categorias.filter((c) => c.menu === 'header'))
  nav('header', 'category', `(SELECT id FROM categories WHERE slug=${q(c.slug)})`, c.nombre);
for (const pg of paginas.filter((p) => p.menu === 'header'))
  nav('header', 'page', `(SELECT id FROM pages WHERE slug=${q(pg.slug)})`, pg.titulo);
pos = 0;
nav('footer', 'home', 'NULL', 'Inicio');
for (const c of categorias.filter((c) => c.menu === 'footer'))
  nav('footer', 'category', `(SELECT id FROM categories WHERE slug=${q(c.slug)})`, c.nombre);
for (const pg of paginas.filter((p) => p.menu === 'footer'))
  nav('footer', 'page', `(SELECT id FROM pages WHERE slug=${q(pg.slug)})`, pg.titulo);

// Ajustes
const set = (k, v) => out.push(`INSERT INTO settings (key, value) VALUES (${q(k)}, ${q(v)}) ON CONFLICT(key) DO UPDATE SET value=excluded.value;`);
set('store_name', 'Automatiza sin humo');
set('announcement', 'Webs y automatizaciones a precio cerrado · Eliges, rellenas campos y lo recibes funcionando');
set('announcement_href', '/pages/como-funciona');

process.stdout.write(out.join('\n') + '\n');
