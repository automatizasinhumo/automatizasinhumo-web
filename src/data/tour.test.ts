import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PASOS_TOUR } from './tour';

function astros(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? astros(p) : p.endsWith('.astro') ? [p] : [];
  });
}

describe('manifiesto del tour', () => {
  // Cada tema es una web aparte: se cuenta lo común (fuera de src/themes) más un tema.
  const leer = (ps: string[]) => ps.map((p) => readFileSync(p, 'utf8')).join('\n');
  const enTemas = /[\\/]themes[\\/]/;
  const comunes = leer(astros('src').filter((p) => !enTemas.test(p)));
  const temas = readdirSync('src/themes').filter((n) => statSync(join('src/themes', n)).isDirectory());
  const fuentesDe = (t: string) => comunes + '\n' + leer(astros(join('src/themes', t)));

  it('ids únicos y en minúsculas con guiones', () => {
    const ids = PASOS_TOUR.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it('cada paso tiene un único bloque data-tour en las plantillas', () => {
    for (const t of temas) {
      const fuentes = fuentesDe(t);
      for (const { id } of PASOS_TOUR) {
        const n = fuentes.split(`data-tour="${id}"`).length - 1;
        // default lleva el tour entero; otro tema puede no traer un bloque, pero nunca dos.
        if (t === 'default') expect(n, `${t}: ${id}`).toBe(1);
        else expect(n, `${t}: ${id}`).toBeLessThanOrEqual(1);
      }
    }
  });

  it('textos breves para que el globo quepa en móvil', () => {
    for (const p of PASOS_TOUR) {
      expect(p.titulo.length, p.id).toBeLessThanOrEqual(40);
      expect(p.texto.length, p.id).toBeLessThanOrEqual(140);
    }
  });
});
