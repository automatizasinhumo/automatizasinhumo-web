import { describe, expect, it } from 'vitest';
import { contentTerms, termPrefixes } from '../products/search';
import { stemSpanishTerm } from './stemmer';

describe('stemSpanishTerm', () => {
  it('trata igual la palabra con y sin tilde', () => {
    expect(stemSpanishTerm('facturacion')).toBe(stemSpanishTerm('facturación'));
    expect(stemSpanishTerm('automatizaciones')).toBe(stemSpanishTerm('automatización'));
    expect(stemSpanishTerm('transcripcion')).toBe(stemSpanishTerm('transcripción'));
    expect(stemSpanishTerm('papeleria')).toBe(stemSpanishTerm('papelería'));
    expect(stemSpanishTerm('peluquerias')).toBe(stemSpanishTerm('peluquerías'));
    expect(stemSpanishTerm('fotografia')).toBe(stemSpanishTerm('fotografía'));
  });
});

describe('termPrefixes', () => {
  it('añade el singular cuando Snowball deja el plural entero', () => {
    expect(termPrefixes('webs')).toContain('web');
  });
  it('no repite prefijos que ya cubre otro más corto', () => {
    const prefixes = termPrefixes('asistencia');
    expect(prefixes.every((p, i) => prefixes.every((q, j) => i === j || !p.startsWith(q)))).toBe(true);
  });
});

describe('contentTerms', () => {
  it('quita las palabras vacías', () => {
    expect(contentTerms('fotos de la boda')).toEqual(['fotos', 'boda']);
  });
  it('si todo son palabras vacías, se queda con ellas', () => {
    expect(contentTerms('de la')).toEqual(['de', 'la']);
  });
  it('reconoce las palabras vacías con tilde', () => {
    expect(contentTerms('cómo web')).toEqual(['web']);
    expect(contentTerms('qué web')).toEqual(['web']);
  });
});
