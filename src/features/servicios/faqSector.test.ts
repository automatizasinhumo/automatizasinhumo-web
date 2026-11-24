import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import sectores from '../../data/sectores.json';
import { faqJsonLd, preguntasSector } from './faqSector';

describe('preguntas frecuentes por sector', () => {
  it.each(sectores.map((s) => [s.label]))('%s tiene preguntas con su nombre y FAQPage con el mismo texto', (label) => {
    const ps = preguntasSector(label);
    expect(ps.length).toBeGreaterThanOrEqual(5);
    expect(ps[0].pregunta).toContain(label.toLowerCase());
    const ld = faqJsonLd(ps);
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity.map((q) => q.name)).toEqual(ps.map((p) => p.pregunta));
    expect(ld.mainEntity.every((q) => q.acceptedAnswer.text.length > 20)).toBe(true);
  });
  it('la página de sector pinta las preguntas y publica el FAQPage', () => {
    const pagina = readFileSync(new URL('../../pages/webs/[sector].astro', import.meta.url), 'utf8');
    expect(pagina).toContain('preguntasSector(sector.label)');
    expect(pagina).toContain('faqJsonLd(preguntas)');
    expect(pagina).toMatch(/<details/);
  });
});
