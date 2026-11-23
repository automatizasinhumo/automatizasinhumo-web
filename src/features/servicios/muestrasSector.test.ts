import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { fuentesMuestras, miniaturaMuestra, muestrasDeSector } from './muestrasSector';
import { resolverPlantilla } from './webs';
import sectores from '../../data/sectores.json';

const etiquetas = (sectores as { label: string }[]).map((s) => s.label);

describe('muestras por sector', () => {
  it.each(etiquetas)('%s tiene tres muestras con nombre de ejemplo y enlace al estudio válido', (label) => {
    const ms = muestrasDeSector(label);
    expect(ms).toHaveLength(3);
    for (const m of ms) {
      const u = new URL(m.enlace, 'https://x.test');
      expect(u.pathname).toBe('/servicios/web');
      expect(resolverPlantilla(u.searchParams.get('diseno'))).toBe(m.id);
      expect(u.searchParams.get('sector')).toBe(m.datos.sector);
      if (label !== 'Peluquerías') expect(m.datos.negocio).not.toBe('Peluquería Lola');
      expect(m.html).toContain(m.datos.negocio.replace('&', '&amp;'));
    }
  });
  it('las muestras de otros sectores no traen opiniones de peluquería', () => {
    for (const m of muestrasDeSector('Fontaneros')) expect(m.html).not.toMatch(/pelo|peinado/i);
  });
  it('un sector desconocido sigue teniendo muestras', () => {
    expect(muestrasDeSector('Cerrajería xyz').length).toBeGreaterThan(0);
  });
  it('la miniatura es Shadow DOM declarativo y las fuentes van fuera', () => {
    const ms = muestrasDeSector('Restaurantes');
    expect(miniaturaMuestra(ms[0]!)).toMatch(/^<template shadowrootmode="open"><style>/);
    expect(miniaturaMuestra(ms[0]!)).not.toContain('@font-face');
    expect(fuentesMuestras(ms)).toContain('@font-face');
  });
  it('el estudio aplica ?sector= y ?diseno=', () => {
    const js = readFileSync(new URL('./estudioWeb.ts', import.meta.url), 'utf8');
    expect(js).toContain("q.get('sector')");
    expect(js).toContain("resolverPlantilla(q.get('diseno')");
  });
});
