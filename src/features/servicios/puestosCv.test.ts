import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DISENOS_ATS, DISENOS_CV, disenoDesdeEnlace, miniaturaCv } from './cv';
import { disenosDePuesto, enlaceEstudioCv, PUESTOS_CV, puestoCv } from './puestosCv';

describe('páginas de currículum por puesto', () => {
  it('slugs únicos y limpios; title, description y h1 propios de cada puesto', () => {
    const unicos = (k: 'slug' | 'title' | 'description' | 'h1' | 'perfil') => new Set(PUESTOS_CV.map((p) => p[k])).size;
    for (const k of ['slug', 'title', 'description', 'h1', 'perfil'] as const) expect(unicos(k)).toBe(PUESTOS_CV.length);
    for (const p of PUESTOS_CV) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.title.length).toBeLessThanOrEqual(70);
      expect(p.description.length).toBeGreaterThan(80);
      expect(p.description.length).toBeLessThanOrEqual(160);
      expect(p.consejos.length).toBeGreaterThanOrEqual(4);
      expect(p.preguntas.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('los tres diseños de cada puesto existen, leen bien un ATS y tienen miniatura', () => {
    const ids = new Set(DISENOS_CV.map((d) => d.id));
    for (const p of PUESTOS_CV) {
      expect(new Set(p.disenos).size).toBe(3);
      for (const id of p.disenos) {
        expect(ids.has(id), `${p.slug}: ${id}`).toBe(true);
        expect(DISENOS_ATS.has(id), `${p.slug}: ${id} no es ATS`).toBe(true);
        expect(existsSync(`public${miniaturaCv(id)}`), `${id} sin miniatura`).toBe(true);
      }
      expect(disenosDePuesto(p)).toHaveLength(3);
    }
  });

  it('el enlace al estudio lleva el diseño y el estudio lo reconoce (o lo ignora si no existe)', () => {
    const ids = new Set(DISENOS_CV.map((d) => d.id));
    const url = new URL(enlaceEstudioCv('onyx'), 'https://x.test');
    expect(url.pathname).toBe('/servicios/cv');
    expect(disenoDesdeEnlace(url.search, ids)).toBe('onyx');
    expect(disenoDesdeEnlace('?diseno=no-existe', ids)).toBeNull();
    expect(disenoDesdeEnlace('', ids)).toBeNull();
  });

  it('puestoCv busca por slug', () => {
    expect(puestoCv('camarero')?.nombre).toBe('Camarero');
    expect(puestoCv('nada')).toBeUndefined();
    expect(puestoCv(undefined)).toBeUndefined();
  });
});
