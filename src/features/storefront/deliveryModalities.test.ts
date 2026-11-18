import { describe, expect, it } from 'vitest';
import { classifyDeliveryModalities } from './deliveryModalities';

describe('classifyDeliveryModalities', () => {
  it('recognises the two catalogue labels', () => {
    const variants = [
      { id: 'one', label: 'Plantilla + guía (la publicas tú)' },
      { id: 'two', label: 'Te lo montamos' },
    ];

    expect(classifyDeliveryModalities(variants)).toEqual({
      template: variants[0],
      setup: variants[1],
    });
  });

  it('leaves an unavailable modality null', () => {
    expect(classifyDeliveryModalities([{ id: 1, label: 'Plantilla + guía' }])).toEqual({
      template: { id: 1, label: 'Plantilla + guía' },
      setup: null,
    });
  });

  it('does not guess ambiguous labels', () => {
    const variants = [
      { id: 1, label: 'Plantilla y te lo montamos' },
      { id: 2, label: 'Te lo montamos sin plantilla' },
      { id: 3, label: 'Plantilla premium (no te lo montamos)' },
      { id: 4, label: 'Plantilla + guía (solo con montaje)' },
    ];

    expect(classifyDeliveryModalities(variants)).toEqual({ template: null, setup: null });
  });
});
