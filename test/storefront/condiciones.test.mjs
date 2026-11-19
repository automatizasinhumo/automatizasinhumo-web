// Contrato: garantía, ajustes y plazos dicen lo mismo en toda la web (R15-06).
// Recorre los textos públicos (src y el catálogo) y comprueba que toda frase que habla
// de devolución, garantía o ronda de ajustes usa el mismo número de días que las
// condiciones. Si cambia la política, se cambia aquí y la prueba señala cada sitio.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const GARANTIA_DIAS = 7;
const AJUSTES_DIAS = 7;

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return archivos(p);
    return /\.(astro|ts|md|json)$/.test(n) && !/\.test\./.test(n) ? [p] : [];
  });
}

// Frases cortas: lo que hay entre signos de puntuación fuertes.
function frases(texto) {
  return texto.split(/(?<=[.!?¿\n])|(?=[¿])/).map((f) => f.trim()).filter(Boolean);
}

const fuentes = [...archivos('src'), 'manual/catalogo/seed.sql'].map((p) => [p, readFileSync(p, 'utf8')]);

function dias(regex) {
  const hallazgos = [];
  for (const [p, texto] of fuentes) {
    for (const f of frases(texto)) {
      if (!regex.test(f)) continue;
      for (const m of f.matchAll(/(\d+)\s*días(?! hábiles)/g)) hallazgos.push({ p, f: f.slice(0, 160), n: Number(m[1]) });
    }
  }
  return hallazgos;
}

describe('condiciones coherentes', () => {
  it('la garantía de devolución usa siempre el mismo plazo', () => {
    const h = dias(/devol(vemos|ución)[^.]*dinero|garant[ií]a de devoluci|Devolución en|devolvemos el importe/i);
    expect(h.length).toBeGreaterThan(3);
    expect(h.filter((x) => x.n !== GARANTIA_DIAS)).toEqual([]);
  });

  it('la ronda de ajustes usa siempre el mismo plazo', () => {
    const h = dias(/ronda de ajustes|ajustes que puedes solicitar/i);
    expect(h.length).toBeGreaterThan(0);
    expect(h.filter((x) => x.n !== AJUSTES_DIAS)).toEqual([]);
  });
});
