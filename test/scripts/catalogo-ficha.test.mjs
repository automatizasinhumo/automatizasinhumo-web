// Ronda 18 (SectorContentGate): cada ficha responde a las preguntas que un cliente hace antes
// de comprar: precio, plazo, qué recibe, qué NO incluye, qué datos pide y un ejemplo real.
// Una ficha nueva sin alguno de esos bloques no llega a producción.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { productos } from '../../manual/catalogo/catalogo.mjs';

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
});
