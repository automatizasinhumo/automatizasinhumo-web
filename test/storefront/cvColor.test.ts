import { describe, expect, it } from 'vitest';
import { colorLegible, contraste, contrasteConBlanco, CONTRASTE_TEXTO, mezclar, TINTE_DISENO } from '../../cv-estudio/src/color';

describe('colorLegible', () => {
  it('deja igual los colores que ya se leen sobre blanco', () => {
    for (const c of ['#176b5a', '#1e3a8a', '#c2185b', '#111827', '#7c3aed']) expect(colorLegible(c)).toBe(c);
  });
  it('oscurece los claros hasta el contraste AA sin cambiar el tono', () => {
    for (const c of ['#e0b84a', '#ffff00', '#7dd3fc', '#ffffff']) {
      const r = colorLegible(c);
      expect(contrasteConBlanco(r)).toBeGreaterThanOrEqual(CONTRASTE_TEXTO);
      if (c !== '#ffffff') {
        const [a, b] = [c, r].map((h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)));
        expect(b[0] / b[1]).toBeCloseTo(a[0] / a[1], 1);
      }
    }
  });
  it('tiene en cuenta un fondo tintado que depende del propio color (barra lateral sobre decoración)', () => {
    const fondo = mezclar(mezclar('#ffffff', '#7c3aed', 0.12), '#7c3aed', 0.37);
    const fondoDe = (c: string) => mezclar(fondo, c, TINTE_DISENO);
    const r = colorLegible('#7c3aed', fondoDe);
    expect(contraste('#7c3aed', fondoDe('#7c3aed'))).toBeLessThan(CONTRASTE_TEXTO);
    expect(contraste(r, fondoDe(r))).toBeGreaterThanOrEqual(CONTRASTE_TEXTO);
  });
  it('mezclar y contraste dan los valores de referencia', () => {
    expect(mezclar('#ffffff', '#000000', 0.5)).toBe('#808080');
    expect(contraste('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });
});
