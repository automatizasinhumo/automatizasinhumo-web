// Contrato «tarjetas iguales» (antes-de-produccion §3, P0): toda tarjeta del catálogo
// enseña qué resuelve, precio, modalidad, demo (si la hay) y CTA. La plantilla pinta lo que
// el modelo trae; esta prueba garantiza que los datos del catálogo lo traen para todos.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const seed = readFileSync('manual/catalogo/seed.sql', 'utf8');
const demos = JSON.parse(readFileSync('src/data/demos-producto.json', 'utf8'));

const literal = String.raw`'((?:[^']|'')*)'`;
const filaProducto = new RegExp(
  String.raw`INSERT INTO products \(name, description, price_cents, currency, stock, active, slug[^)]*\) VALUES \(` +
    `${literal}, ${literal}, (\\d+), '\\w+', \\d+, (\\d), ${literal}`,
  'g',
);
const productos = [...seed.matchAll(filaProducto)].map((m) => ({
  nombre: m[1],
  descripcion: m[2].replaceAll("''", "'"),
  precio: Number(m[3]),
  activo: m[4] === '1',
  slug: m[5],
}));
const variantes = new Map();
for (const m of seed.matchAll(
  new RegExp(String.raw`INSERT INTO product_variants [^;]*?SELECT id, ${literal}, (\d+), [^;]*?WHERE slug='([^']+)'`, 'g'),
)) {
  const lista = variantes.get(m[3]) ?? [];
  lista.push({ etiqueta: m[1].toLocaleLowerCase('es'), precio: Number(m[2]) });
  variantes.set(m[3], lista);
}
const activos = productos.filter((p) => p.activo);
const primerParrafo = (d) => d.split(/\r?\n\s*\r?\n/)[0].trim();

describe('tarjetas iguales en todo el catálogo', () => {
  it('lee el catálogo (si cambia el formato del seed, la prueba debe fallar, no pasar vacía)', () => {
    expect(activos.length).toBeGreaterThan(50);
  });

  it('todo servicio dice qué resuelve en su primer párrafo', () => {
    const malos = activos
      .filter((p) => {
        const r = primerParrafo(p.descripcion);
        return r.length < 30 || r.startsWith('#') || r.startsWith('-');
      })
      .map((p) => p.slug);
    expect(malos).toEqual([]);
  });

  it('todo servicio tiene precio', () => {
    expect(activos.filter((p) => !(p.precio > 0)).map((p) => p.slug)).toEqual([]);
  });

  it('modalidad clara: o plantilla y «te lo montamos» (más caro), o un servicio de precio único', () => {
    const malos = activos
      .filter((p) => {
        const v = variantes.get(p.slug);
        if (!v) return false; // precio único: «lo hacemos nosotros»
        const plantilla = v.find((x) => x.etiqueta.includes('plantilla') && !x.etiqueta.includes('te lo montamos'));
        const montaje = v.find((x) => x.etiqueta.includes('te lo montamos'));
        return !(plantilla && montaje && montaje.precio > plantilla.precio);
      })
      .map((p) => p.slug);
    expect(malos).toEqual([]);
  });

  it('cada demo publicada pertenece a un servicio que existe', () => {
    const slugs = new Set(productos.map((p) => p.slug));
    expect(Object.keys(demos).filter((s) => !slugs.has(s))).toEqual([]);
  });
});

// Toda lista de tarjetas pasa el precio máximo: sin él la tarjeta enseña un solo precio
// y esconde «Te lo montamos». El tipo lo exige; esto cubre los .astro, que no siempre se tipan.
function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return archivos(p);
    return /\.(astro|ts)$/.test(n) && !/\.test\./.test(n) ? [p] : [];
  });
}

describe('quien construye tarjetas pasa los dos precios', () => {
  it('toda llamada a buildProductCard lleva maxPriceCents', () => {
    const malos = [];
    for (const p of archivos('src')) {
      const texto = readFileSync(p, 'utf8');
      for (const m of texto.matchAll(/buildProductCard\(/g)) {
        if (/export function buildProductCard/.test(texto.slice(Math.max(0, m.index - 30), m.index + 20))) continue;
        // Una llamada cabe en unas líneas; sus opciones se pasan en el mismo literal o en un spread con nombre.
        const tramo = texto.slice(m.index, m.index + 400);
        if (!/maxPriceCents/.test(tramo)) malos.push(p);
      }
    }
    expect(malos).toEqual([]);
  });
});
