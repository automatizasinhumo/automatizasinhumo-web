import { describe, expect, it } from 'vitest';
import { pasoSectorRapido } from './estudioWeb';

describe('casilla rápida de sector', () => {
  it('al teclear copia el valor sin confirmar', () => {
    expect(pasoSectorRapido('', 'Fonta', false)).toEqual({ asignar: true, confirmar: false });
  });
  it('input → change: confirma aunque el input ya hubiera copiado el valor (rellena los textos)', () => {
    expect(pasoSectorRapido('Fontanería', 'Fontanería', true)).toEqual({ asignar: false, confirmar: true });
  });
  it('sin cambios ni confirmación no hace nada', () => {
    expect(pasoSectorRapido('Bar', 'Bar', false)).toEqual({ asignar: false, confirmar: false });
  });
});
