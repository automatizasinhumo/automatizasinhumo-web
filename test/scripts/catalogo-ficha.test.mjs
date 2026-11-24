// Ronda 18 (SectorContentGate): cada ficha responde a las preguntas que un cliente hace antes
// de comprar: precio, plazo, qué recibe, qué NO incluye, qué datos pide y un ejemplo real.
// Una ficha nueva sin alguno de esos bloques no llega a producción.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import { productos } from '../../manual/catalogo/catalogo.mjs';
import { modalidades } from '../../manual/catalogo/ids.mjs';

const lista = (x, min, max = 99) => Array.isArray(x) && x.length >= min && x.length <= max && x.every((s) => typeof s === 'string' && s.trim());

describe('fichas del catálogo', () => {
  it('slugs únicos', () => {
    const slugs = productos.map((p) => p.slug);
    expect(slugs.filter((s, i) => slugs.indexOf(s) !== i)).toEqual([]);
  });

  it.each(productos.map((p) => [p.slug, p]))('%s responde a las preguntas de compra', (_, p) => {
    const faltan = [];
    if (!(Array.isArray(p.p) && p.p.length && p.p.every((n) => Number.isFinite(n) && n > 0))) faltan.push('precio');
    if (!p.plazo?.trim()) faltan.push('plazo');
    if (!p.resumen?.trim()) faltan.push('resumen');
    if (!lista(p.recibes, 3)) faltan.push('recibes (≥3)');
    if (!lista(p.noIncluye, 3, 6)) faltan.push('noIncluye (3-6)');
    if (!lista(p.campos, 1)) faltan.push('campos');
    if (!p.ejemplo?.trim()) faltan.push('ejemplo');
    expect(faltan).toEqual([]);
  });

  it('seed.sql está al día con catalogo.mjs', () => {
    const generado = execFileSync('node', ['manual/catalogo/gen-sql.mjs'], { encoding: 'utf8' });
    expect(generado.replace(/\r\n/g, '\n')).toBe(readFileSync('manual/catalogo/seed.sql', 'utf8').replace(/\r\n/g, '\n'));
  });

  it('gen-update da de alta los servicios que faltan, con su categoría y portada (no solo UPDATE)', () => {
    const sql = execFileSync('node', ['manual/catalogo/gen-update.mjs'], { encoding: 'utf8' });
    for (const p of productos) {
      const s = p.slug.replace(/'/g, "''");
      const fin = sql.indexOf(`WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug='${s}');`);
      expect(fin, p.slug).toBeGreaterThan(0);
      const alta = sql.slice(sql.lastIndexOf('INSERT INTO products', fin), fin);
      // Un autoservicio entra con el id público de autoservicio.json: es el que mete el estudio en el carrito.
      if (p.auto) expect(alta).toContain(`'${p.auto.producto}'`);
      expect(sql).toContain(`p.slug='${s}' AND c.slug='${p.cat}' AND NOT EXISTS`);
    }
  });

  it('gen-update sobre una D1 ya sembrada repone por completo los servicios que faltan (modalidades incluidas)', () => {
    const db = new DatabaseSync(':memory:');
    for (const f of readdirSync('migrations').filter((f) => f.endsWith('.sql')).sort()) db.exec(readFileSync(`migrations/${f}`, 'utf8'));
    db.exec(readFileSync('manual/catalogo/seed.sql', 'utf8'));
    const foto = (slug) => ({
      producto: db.prepare('SELECT public_id, variant_label, price_cents FROM products WHERE slug=?').get(slug),
      variantes: db.prepare('SELECT v.label, v.price_cents, v.sku, v.position, v.active, v.public_id FROM product_variants v JOIN products p ON p.id=v.product_id WHERE p.slug=? ORDER BY v.position').all(slug),
      categorias: db.prepare('SELECT c.slug FROM product_categories pc JOIN products p ON p.id=pc.product_id JOIN categories c ON c.id=pc.category_id WHERE p.slug=?').all(slug),
      imagenes: db.prepare("SELECT i.image_key FROM product_images i JOIN products p ON p.id=i.product_id WHERE p.slug=? AND i.position=0").all(slug),
    });
    // Un servicio con modalidades diy/pro, un autoservicio con modalidades y uno sin ellas.
    const quitar = [productos.find((p) => modalidades(p).length), productos.find((p) => p.auto?.variantes?.length), productos.find((p) => p.slug === 'cv-linkedin')];
    const antes = Object.fromEntries(quitar.map((p) => [p.slug, foto(p.slug)]));
    for (const { slug } of quitar) {
      for (const t of ['product_variants', 'product_categories', 'product_images']) db.prepare(`DELETE FROM ${t} WHERE product_id=(SELECT id FROM products WHERE slug=?)`).run(slug);
      db.prepare('DELETE FROM products WHERE slug=?').run(slug);
    }
    const sql = execFileSync('node', ['manual/catalogo/gen-update.mjs'], { encoding: 'utf8' });
    db.exec(sql);
    db.exec(sql); // repetirlo no duplica nada
    for (const p of quitar) {
      expect(foto(p.slug), p.slug).toEqual(antes[p.slug]);
      expect(antes[p.slug].variantes.length > 0, p.slug).toBe(p.slug !== 'cv-linkedin');
    }
  });
});
