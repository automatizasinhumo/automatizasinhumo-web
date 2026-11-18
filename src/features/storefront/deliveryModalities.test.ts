import { describe, expect, it } from 'vitest';
import { classifyDeliveryModalities } from './deliveryModalities';

describe('classifyDeliveryModalities', () => {
  it('uses distinct variants for the template and setup modalities', () => {
    const variants = [
      { id: 'one', label: 'Plantilla y te lo montamos' },
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
});
