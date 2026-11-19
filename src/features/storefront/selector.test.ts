import { describe, expect, it } from 'vitest';
import demosPorProducto from '../../data/demos-producto.json';
import { SECTORS } from '../blog/sectors';
import { empezarHref, MODALIDADES, OBJETIVOS, recomendar } from './selector';

const q = (s: string) => new URLSearchParams(s);

describe('selector «Dime qué necesitas»', () => {
  it('cada objetivo apunta a servicios que existen en el catálogo de demos', () => {
    for (const objetivo of OBJETIVOS) {
      expect(objetivo.servicios.length).toBeGreaterThan(0);
      for (const slug of objetivo.servicios) expect(Object.keys(demosPorProducto)).toContain(slug);
    }
    expect(new Set(OBJETIVOS.map((o) => o.id)).size).toBe(OBJETIVOS.length);
    expect(MODALIDADES.map((m) => m.id).sort()).toEqual(['guia', 'pro']);
  });

  it('sin respuestas válidas no recomienda nada', () => {
    expect(recomendar(q(''))).toBeNull();
    expect(recomendar(q('objetivo=inventado&oficio=astronautas'))).toBeNull();
  });

  it('con oficio, antepone el servicio del objetivo que ese oficio ya usa', () => {
    const r = recomendar(q('objetivo=citas&oficio=fisioterapeutas'));
    expect(r?.servicios[0]).toBe('pagina-citas');
    expect(r?.sector?.slug).toBe('fisioterapeutas');
  });

  it('solo con oficio, recomienda los servicios del oficio', () => {
    const sector = SECTORS[0];
    expect(recomendar(q(`oficio=${sector.slug}`))?.servicios).toEqual(sector.serviceSlugs);
  });

  it('la modalidad «listo» preselecciona «Te lo montamos» en Empieza gratis', () => {
    const r = recomendar(q('objetivo=llamadas&modalidad=pro'));
    expect(empezarHref('web-una-pagina', r?.modalidad)).toBe('/empezar/web-una-pagina?modalidad=pro');
    expect(empezarHref('web-una-pagina', undefined)).toBe('/empezar/web-una-pagina');
  });

  it('sin modalidad en la URL, el enlace usa la misma que marca el formulario', () => {
    const r = recomendar(q('objetivo=llamadas'));
    expect(r?.modalidad?.id).toBe('pro');
    expect(empezarHref('web-una-pagina', r?.modalidad)).toBe('/empezar/web-una-pagina?modalidad=pro');
  });
});
