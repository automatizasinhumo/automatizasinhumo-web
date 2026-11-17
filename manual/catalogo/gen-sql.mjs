// node manual/catalogo/gen-sql.mjs > manual/catalogo/seed.sql
// Sustituye el catálogo demo de Minshop por el catálogo de servicios.
import { existsSync } from 'node:fs';
import { randomInt } from 'node:crypto';
import { categorias, productos, paginas } from './catalogo.mjs';
import { DEMOS, DEMOS_URL, demosDe } from '../demos/demos.mjs';

const ALPHA = '0123456789abcdefghjkmnpqrstvwxyz';
const pid = (p) => `${p}_${Array.from({ length: 10 }, () => ALPHA[randomInt(32)]).join('')}`;
const q = (s) => (s == null ? 'NULL' : `'${String(s).replace(/'/g, "''")}'`);

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
    l.push('### Lo montas tú o te lo montamos',
      '| | Lo montas tú | Te lo montamos |',
      '|---|---|---|',
      `| Precio | **${p.p[0]} €** | **${p.p[1]} €** |`,
      '| Plantilla rellenada con tus datos | Sí | Sí |',
      '| Guía paso a paso para publicarla | Sí | No hace falta |',
      '| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |',
      `| Plazo | ${p.plazo} | ${p.plazo} |`,
      '| Ajustes tras la entrega | Dudas por email | Incluidos |', '');
  }
  l.push('### Pruébalo antes de pagar',
    '1. Pulsa **Empieza gratis** y rellena los campos (2-3 minutos).',
    '2. Te enviamos una vista previa con tus datos.',
    '3. Si te gusta, pagas y te lo entregamos funcionando. Si no, no pagas nada.',
    '',
    '_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._', '');
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
  // Portada JPEG estática (public/images/productos, generada por gen-imagenes.mjs)
  const img = `productos/${p.slug}.jpg`;
  out.push(`UPDATE products SET image_key=${q(img)} WHERE slug=${q(p.slug)};`);
  out.push(`INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, ${q(img)}, 0, ${q(pid('pimg'))} FROM products WHERE slug=${q(p.slug)};`);
  // Galería: capturas reales de las plantillas demo (public/images/demos/<último segmento>.png)
  const vistas = new Set();
  let n = 1;
  for (const d of demosDe(p.slug)) {
    const nombre = new URL(d.url).pathname.split('/').filter(Boolean).pop();
    const key = `demos/${nombre}.png`;
    if (!nombre || vistas.has(key) || !existsSync(new URL(`../../public/images/${key}`, import.meta.url))) continue;
    vistas.add(key);
    out.push(`INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, ${q(key)}, ${n++}, ${q(pid('pimg'))} FROM products WHERE slug=${q(p.slug)};`);
  }
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
nav('header', 'catalog', 'NULL', 'Servicios');
for (const c of categorias.filter((c) => c.menu === 'header'))
  nav('header', 'category', `(SELECT id FROM categories WHERE slug=${q(c.slug)})`, c.corto ?? c.nombre);
for (const pg of paginas.filter((p) => p.menu === 'header'))
  nav('header', 'page', `(SELECT id FROM pages WHERE slug=${q(pg.slug)})`, pg.corto ?? pg.titulo);
pos = 0;
nav('footer', 'home', 'NULL', 'Inicio');
for (const c of categorias.filter((c) => c.menu === 'footer'))
  nav('footer', 'category', `(SELECT id FROM categories WHERE slug=${q(c.slug)})`, c.nombre);
for (const pg of paginas.filter((p) => p.menu === 'footer'))
  nav('footer', 'page', `(SELECT id FROM pages WHERE slug=${q(pg.slug)})`, pg.titulo);

// Ajustes
const set = (k, v) => out.push(`INSERT INTO settings (key, value) VALUES (${q(k)}, ${q(v)}) ON CONFLICT(key) DO UPDATE SET value=excluded.value;`);
set('store_name', 'Automatiza sin humo');
set('announcement', 'Empieza gratis: ves la vista previa y pagas solo si te gusta · Te atiende una persona');
set('announcement_href', '/pages/como-funciona');

process.stdout.write(out.join('\n') + '\n');
