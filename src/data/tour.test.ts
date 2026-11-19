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
  const fuentes = astros('src').map((p) => readFileSync(p, 'utf8')).join('\n');

  it('ids únicos y en minúsculas con guiones', () => {
    const ids = PASOS_TOUR.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it('cada paso tiene un único bloque data-tour en las plantillas', () => {
    for (const { id } of PASOS_TOUR) {
      expect(fuentes.split(`data-tour="${id}"`).length - 1, id).toBe(1);
    }
  });

  it('textos breves para que el globo quepa en móvil', () => {
    for (const p of PASOS_TOUR) {
      expect(p.titulo.length, p.id).toBeLessThanOrEqual(40);
      expect(p.texto.length, p.id).toBeLessThanOrEqual(140);
    }
  });
});
