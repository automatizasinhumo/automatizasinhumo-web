import { describe, expect, it } from 'vitest';
import { SECTORS, servicesForSector } from './sectors';

describe('sector pages', () => {
  it('have unique titles and descriptions for all requested sectors', () => {
    expect(SECTORS).toHaveLength(5);
    expect(new Set(SECTORS.map((sector) => sector.title)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description)).size).toBe(5);
    expect(new Set(SECTORS.map((sector) => sector.description.slice(0, 160))).size).toBe(5);
  });

  it('links every sector to published services and demos with catalog prices', () => {
    for (const sector of SECTORS) {
      const services = servicesForSector(sector);
      expect(services.length).toBeGreaterThan(0);
      for (const service of services) {
        expect(service.price).toBeGreaterThan(0);
        expect(service.demos.length).toBeGreaterThan(0);
        expect(service.demos[0].url).toMatch(/^https:\/\//);
      }
    }
  });
});
