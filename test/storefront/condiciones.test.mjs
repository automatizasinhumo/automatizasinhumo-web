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

// Plazos escritos con cifra o con letra («siete días»). Los «días hábiles» no se tiran:
// se marcan, porque garantía y ajustes son días naturales y «14 días hábiles» en una
// frase de devolución también contradice la política.
const NUMEROS = { un: 1, uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, veinte: 20, treinta: 30 };
const PLAZO = new RegExp(`(?<![\\wáéíóúñ])(\\d+|${Object.keys(NUMEROS).join('|')})\\s*días( hábiles)?`, 'gi');
function plazosDetalle(frase) {
  return [...frase.matchAll(PLAZO)].map((m) => ({
    n: /^\d+$/.test(m[1]) ? Number(m[1]) : NUMEROS[m[1].toLowerCase()],
    habiles: Boolean(m[2]),
  }));
}
/** Plazos en días naturales (lo que se compara con la política). */
function plazos(frase) {
  return plazosDetalle(frase).filter((x) => !x.habiles).map((x) => x.n);
}

const fuentes = [...archivos('src'), 'manual/catalogo/seed.sql'].map((p) => [p, readFileSync(p, 'utf8')]);

function diasEn(textos, regex) {
  const hallazgos = [];
  for (const [p, texto] of textos) {
    for (const f of frases(texto)) {
      if (!regex.test(f)) continue;
      for (const { n, habiles } of plazosDetalle(f)) hallazgos.push({ p, f: f.slice(0, 160), n, habiles });
    }
  }
  return hallazgos;
}
const dias = (regex) => diasEn(fuentes, regex);
// Un plazo incoherente: otro número, o el mismo en días hábiles (la política es en naturales).
const incoherentes = (h, esperado) => h.filter((x) => x.n !== esperado || x.habiles);
const GARANTIA = /devol(vemos|ución)[^.]*dinero|garant[ií]a de devoluci|Devolución en|devolvemos el importe/i;

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
  it('una devolución en días hábiles cuenta como incoherente', () => {
    const malo = diasEn([['x.md', 'Devolución en 14 días hábiles.']], GARANTIA);
    expect(incoherentes(malo, GARANTIA_DIAS)).toHaveLength(1);
    const malo7 = diasEn([['x.md', 'Devolución en 7 días hábiles.']], GARANTIA);
    expect(incoherentes(malo7, GARANTIA_DIAS)).toHaveLength(1);
    const bueno = diasEn([['x.md', 'Devolución en 7 días.']], GARANTIA);
    expect(bueno).toHaveLength(1);
    expect(incoherentes(bueno, GARANTIA_DIAS)).toEqual([]);
  });
});

describe('condiciones coherentes', () => {
  it('la garantía de devolución usa siempre el mismo plazo', () => {
    const h = dias(GARANTIA);
    expect(h.length).toBeGreaterThan(3);
    expect(incoherentes(h, GARANTIA_DIAS)).toEqual([]);
  });

  it('la ronda de ajustes usa siempre el mismo plazo', () => {
    const h = dias(/ronda de ajustes|ajustes que puedes solicitar/i);
    expect(h.length).toBeGreaterThan(0);
    expect(incoherentes(h, AJUSTES_DIAS)).toEqual([]);
  });
});
