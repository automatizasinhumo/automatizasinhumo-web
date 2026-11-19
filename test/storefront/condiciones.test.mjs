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

// Frases cortas: lo que hay entre signos de puntuación fuertes. Un salto de línea que
// continúa la frase (la línea siguiente empieza en minúscula) no la corta: en un .astro
// «Si en 14 días no hace lo que dice la ficha,\n te devolvemos…» es una sola frase.
function frases(texto) {
  return texto
    .replace(/\s*\n\s*(?=[a-záéíóúñü])/g, ' ')
    .split(/(?<=[.!?¿\n])|(?=[¿])/)
    .map((f) => f.trim())
    .filter(Boolean);
}

// Plazos escritos con cifra o con letra («siete días»).
const NUMEROS = { un: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, veinte: 20, treinta: 30 };
const PLAZO = new RegExp(`(?<![\\wáéíóúñ])(\\d+|${Object.keys(NUMEROS).join('|')})\\s*días(?! hábiles)`, 'gi');
function plazos(frase) {
  return [...frase.matchAll(PLAZO)].map((m) => (/^\d+$/.test(m[1]) ? Number(m[1]) : NUMEROS[m[1].toLowerCase()]));
}

const fuentes = [...archivos('src'), 'manual/catalogo/seed.sql'].map((p) => [p, readFileSync(p, 'utf8')]);

function dias(regex) {
  const hallazgos = [];
  for (const [p, texto] of fuentes) {
    for (const f of frases(texto)) {
      if (!regex.test(f)) continue;
      for (const n of plazos(f)) hallazgos.push({ p, f: f.slice(0, 160), n });
    }
  }
  return hallazgos;
}

describe('lectura de frases y plazos', () => {
  it('une la frase partida en dos líneas del código', () => {
    const [f] = frases('Si en 14 días no hace lo que dice la ficha,\n      te devolvemos el dinero.');
    expect(f).toContain('te devolvemos el dinero');
    expect(plazos(f)).toEqual([14]);
  });
  it('lee los plazos escritos con letra', () => {
    expect(plazos('durante los siete días siguientes')).toEqual([7]);
    expect(plazos('durante los ocho días siguientes')).toEqual([8]);
    expect(plazos('en 3 días hábiles')).toEqual([]);
  });
});

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
