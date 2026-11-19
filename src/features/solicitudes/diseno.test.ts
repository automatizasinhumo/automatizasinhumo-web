import { describe, expect, it } from 'vitest';
import demos from '../../data/demos-producto.json';
import { disenoElegido, disenosDe, plantillaDeUrl } from './diseno';

describe('diseño elegido', () => {
  it('saca la ruta de plantilla de la URL de la demo y descarta galerías y rutas raras', () => {
    expect(
      plantillaDeUrl(
        'https://demos.example/plantillas-negocio/health-fitness/spa-salon/',
      ),
    ).toBe('plantillas-negocio/health-fitness/spa-salon');
    expect(plantillaDeUrl('https://demos.example/apps/agenda/')).toBeNull();
    expect(plantillaDeUrl('no es url')).toBeNull();
    expect(
      disenosDe('web-una-pagina').some(
        (d) => d.plantilla === 'plantillas-eventos',
      ),
    ).toBe(false);
  });

  it('solo acepta un diseño que el servicio enseña', () => {
    const [slug] =
      Object.entries(demos).find(([s]) => disenosDe(s).length > 0) ?? [];
    expect(slug).toBeTruthy();
    const d = disenosDe(slug!)[0];
    expect(disenoElegido(slug!, d.plantilla)).toEqual(d);
    expect(disenoElegido(slug!, 'plantillas-otra/cosa')).toBeNull();
    expect(disenoElegido('no-existe', d.plantilla)).toBeNull();
    expect(disenoElegido(slug!, null)).toBeNull();
  });
});
