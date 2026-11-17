import { describe, expect, it } from 'vitest';
import { modalidadDeEtiqueta } from './pedido';

describe('modalidadDeEtiqueta', () => {
  it('traduce la etiqueta de la variante pagada a la modalidad del formulario', () => {
    expect(modalidadDeEtiqueta('Plantilla + guía (la publicas tú)')).toBe('Plantilla + guía');
    expect(modalidadDeEtiqueta('Te lo montamos')).toBe('Te lo montamos');
    expect(modalidadDeEtiqueta(null)).toBeNull();
    expect(modalidadDeEtiqueta('Otra')).toBe('Otra');
  });
});
