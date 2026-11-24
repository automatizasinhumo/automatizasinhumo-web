// node manual/catalogo/gen-update.mjs [slug ...] > update.sql
// Actualiza nombre, descripción, precio, activo y precio de modalidades de los
// servicios que ya existen, sin DELETE: sirve en entornos con pedidos (la FK de
// order_items impide el seed completo). Sin slugs, actualiza todo el catálogo.
// Los autoservicios llevan además sus ids públicos de autoservicio.json: el estudio mete en el
// carrito esos ids, y si la D1 tiene otros el carrito los descarta y sale vacío (pasó en staging,
// 22/11). El despliegue de staging lo aplica siempre (desplegar-staging.yml).
// Un servicio nuevo del catálogo se inserta si falta (producto, categoría y portada): antes solo
// había UPDATE y las altas (p. ej. cv-linkedin, 24/11) no llegaban a ningún entorno ya sembrado.
import { productos } from './catalogo.mjs';
import { descripcion } from './descripcion.mjs';
import { pid } from './ids.mjs';

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const slugs = process.argv.slice(2);
const lista = slugs.length ? productos.filter((p) => slugs.includes(p.slug)) : productos;
if (slugs.length && lista.length !== slugs.length) {
  console.error('Slug desconocido:', slugs.filter((s) => !productos.some((p) => p.slug === s)).join(', '));
  process.exit(1);
}
const out = ['-- Generado por manual/catalogo/gen-update.mjs. No editar a mano.'];
for (const p of lista) {
  const orden = productos.indexOf(p);
  const img = `productos/${p.slug}.jpg`;
  out.push(`INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, image_key, created_at) SELECT ${q(p.nombre)}, ${q(descripcion(p))}, ${p.p[0] * 100}, 'eur', 999, ${p.activo === false ? 0 : 1}, ${q(p.slug)}, NULL, 0, ${q(p.auto?.producto ?? pid('prod', p.slug))}, ${q(img)}, datetime('2026-01-01', '-${orden} minutes') WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug=${q(p.slug)});`);
  out.push(`INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug=${q(p.slug)} AND c.slug=${q(p.cat)} AND NOT EXISTS (SELECT 1 FROM product_categories pc WHERE pc.product_id=p.id);`);
  out.push(`INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, ${q(img)}, 0, ${q(pid('pimg', `${p.slug}:${img}`))} FROM products WHERE slug=${q(p.slug)} AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id=products.id);`);
  out.push(`UPDATE products SET name=${q(p.nombre)}, description=${q(descripcion(p))}, price_cents=${p.p[0] * 100}, active=${p.activo === false ? 0 : 1} WHERE slug=${q(p.slug)};`);
  if (p.auto) {
    // Autoservicio: sus modalidades salen de autoservicio.json; se crean si faltan y las
    // genéricas (diy/pro) se desactivan sin borrarlas (pueden tener pedidos).
    out.push(`UPDATE product_variants SET active=0 WHERE sku IN (${q(`${p.slug}-diy`)}, ${q(`${p.slug}-pro`)});`);
    out.push(`UPDATE products SET public_id=${q(p.auto.producto)} WHERE slug=${q(p.slug)} AND public_id IS NOT ${q(p.auto.producto)};`);
    out.push(`UPDATE products SET variant_label=${p.auto.variantes ? q('Modalidad') : 'NULL'} WHERE slug=${q(p.slug)};`);
    (p.auto.variantes ?? []).forEach((v, i) => {
      out.push(`INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, ${q(v.etiqueta)}, ${v.precio}, 999, ${q(v.sku)}, ${i}, 1, ${q(v.id)} FROM products WHERE slug=${q(p.slug)} AND NOT EXISTS (SELECT 1 FROM product_variants WHERE sku=${q(v.sku)});`);
      out.push(`UPDATE product_variants SET label=${q(v.etiqueta)}, price_cents=${v.precio}, position=${i}, active=1, public_id=${q(v.id)} WHERE sku=${q(v.sku)};`);
    });
  } else if (p.p.length === 2)
    p.p.forEach((eur, i) => out.push(`UPDATE product_variants SET price_cents=${eur * 100} WHERE sku=${q(`${p.slug}-${i ? 'pro' : 'diy'}`)};`));
}
process.stdout.write(out.join('\n') + '\n');
