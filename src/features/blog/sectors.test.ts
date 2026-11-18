import { describe, expect, it } from 'vitest';
import { demosForService, SECTORS } from './sectors';

describe('sector pages', () => {
  it('have unique titles and descriptions for all requested sectors', () => {
    expect(SECTORS).toHaveLength(5);
    expect(new Set(SECTORS.map((sector) => sector.title)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description.slice(0, 160))).size).toBe(5);
  });

  it('links every sector to published service slugs and real demos', () => {
    for (const sector of SECTORS) {
      expect(sector.serviceSlugs.length).toBeGreaterThan(0);
      for (const slug of sector.serviceSlugs) {
        const demos = demosForService(slug);
        expect(demos.length).toBeGreaterThan(0);
        expect(demos[0].url).toMatch(/^https:\/\//);
      }
    }
  });
});
