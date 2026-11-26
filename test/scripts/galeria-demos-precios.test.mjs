// La galería /pages/demos copia nombre, precio y plazo del catálogo al generarse
// (manual/demos/gen-galeria.mjs). Si el catálogo cambia y no se regenera, la galería anuncia
// precios viejos (26/11: «Web de una página desde 149 € · 48 h» cuando ya era 49 € al momento).
// Este contrato lo impide para todos los productos, no solo los de autoservicio.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { productos } from '../../manual/catalogo/catalogo.mjs';

const galeria = JSON.parse(readFileSync(new URL('../../src/data/galeria-demos.json', import.meta.url), 'utf8'));
const porSlug = new Map(productos.map((p) => [p.slug, p]));

describe('galería de demos al día con el catálogo', () => {
  it.each(galeria.items.map((d) => [d.img, d]))('%s', (_, d) => {
    const p = porSlug.get(d.producto);
    expect(p, `producto ${d.producto} no está en el catálogo`).toBeTruthy();
    expect({ nombre: d.nombre, precio: d.precio, plazo: d.plazo, cat: d.cat }, 'regenera con: node manual/demos/gen-galeria.mjs').toEqual({
      nombre: p.nombre,
      precio: p.p[0],
      plazo: p.plazo,
      cat: p.cat,
    });
  });
});
