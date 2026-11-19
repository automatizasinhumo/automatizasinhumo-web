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
});
