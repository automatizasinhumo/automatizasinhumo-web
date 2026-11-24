import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';
import { mensajeDeTema } from '../search/sinResultados';
import { CAMINOS_CV } from './cv';
import { aspectoAlElegir, ASESORIA_WEB, disenoWeb, PLANTILLAS_WEB, CAMINOS_WEB, PASOS_WEB, pasosDelCamino, pasoVecino } from './webs';

const web = load(readFileSync(new URL('../../pages/servicios/web.astro', import.meta.url), 'utf8'));
const cv = load(readFileSync(new URL('../../pages/servicios/cv.astro', import.meta.url), 'utf8'));
const codigo = readFileSync(new URL('./estudioWeb.ts', import.meta.url), 'utf8');

describe('la web empieza igual que el CV', () => {
  it('mismos tres caminos, en el mismo orden', () => {
    expect(CAMINOS_WEB.map((c) => c.id)).toEqual(CAMINOS_CV.map((c) => c.id));
    expect(CAMINOS_WEB.map((c) => c.etiqueta)).toEqual(CAMINOS_CV.map((c) => c.etiqueta));
  });

  it('el primer paso pregunta «¿Cómo quieres…?» y lo primero que se ve son los caminos', () => {
    for (const $ of [web, cv]) {
      const paso = $('section[data-paso]').first();
      expect(paso.find('h2').text()).toMatch(/^¿Cómo quieres tu (web|CV)\?$/);
      expect(paso.children('fieldset').first().is('.caminos')).toBe(true);
      expect(paso.find('.caminos input[name="camino"]').length).toBe(1); // uno por camino, dentro del map
    }
  });

  it('con «te la hacemos» solo queda la tarjeta de asesoría con su enlace', () => {
    const paso = web('section[data-paso="plantilla"]');
    const asesoria = paso.find('[data-solo-camino="asesoria"]');
    expect(asesoria.find("a").attr("href")).toMatch(/ASESORIA_(WEB|CV).enlace/);
    expect(ASESORIA_WEB.enlace).toBe("/empezar/consulta?tema=web");
    // Galería, recomendados y «Siguiente» quedan ocultos en ese camino.
    const resto = paso.find('[data-oculto-en="asesoria"]');
    expect(resto.find('input[name="plantilla"]').length).toBeGreaterThan(0);
    expect(resto.find('[data-siguiente]').length).toBe(1);
    expect(mensajeDeTema('web')).not.toBe('');
  });

  it('«tal cual» invita a diseñar la suya y su «Siguiente» va a publicar', () => {
    const datos = web('section[data-paso="datos"]');
    expect(datos.find('[data-solo-camino="plantilla"] [data-a-camino="personaliza"]').length).toBe(1);
    expect(datos.find('[data-siguiente] [data-solo-camino="plantilla"]').text()).toContain('publica');
    expect(datos.find('[data-siguiente] [data-solo-camino="personaliza"]').text()).toContain('estilo');
  });

  it('el estudio aplica el camino (mismos atributos que el CV) y lo guarda', () => {
    expect(codigo).toContain("el.dataset.soloCamino !== estado.camino");
    expect(codigo).toContain("el.dataset.ocultoEn === estado.camino");
    expect(codigo).toMatch(/camino: CaminoWeb;/);
  });
});

describe('pasos por camino', () => {
  const todos = PASOS_WEB.map((p) => p.id);
  it('«a tu gusto» recorre todos; «tal cual» se salta el estilo; la asesoría no pasa del primero', () => {
    expect(pasosDelCamino('personaliza')).toEqual(todos);
    expect(pasosDelCamino('plantilla')).toEqual(todos.filter((p) => p !== 'personaliza'));
    expect(pasosDelCamino('asesoria')).toEqual([todos[0]]);
  });
  it('Siguiente y Atrás siguen el camino', () => {
    expect(pasoVecino('plantilla', 'datos', 1)).toBe('publica');
    expect(pasoVecino('plantilla', 'publica', -1)).toBe('datos');
    expect(pasoVecino('personaliza', 'datos', 1)).toBe('personaliza');
    expect(pasoVecino('personaliza', 'publica', 1)).toBe('');
    expect(pasoVecino('asesoria', 'plantilla', 1)).toBe('');
  });
  it('desde un paso que el camino no recorre, se sigue por el más cercano', () => {
    expect(pasoVecino('plantilla', 'personaliza', 1)).toBe('publica');
    expect(pasoVecino('plantilla', 'personaliza', -1)).toBe('datos');
  });

  it('de un diseño de autor a una básica vuelven el color y la letra por defecto', () => {
    const autor = PLANTILLAS_WEB.find((p) => disenoWeb(p.id))!;
    const basica = PLANTILLAS_WEB.find((p) => !disenoWeb(p.id))!;
    const def = { color: '#123456', letra: 'sistema' };
    const tras = aspectoAlElegir(autor.id, def, def);
    expect(tras).toEqual({ color: disenoWeb(autor.id)!.color, letra: 'diseno' });
    expect(aspectoAlElegir(basica.id, tras, def)).toEqual(def);
    // Si el cliente ya eligió su letra y color, cambiar entre básicas no los toca.
    const propio = { color: '#abcdef', letra: 'serif' };
    expect(aspectoAlElegir(basica.id, propio, def)).toEqual(propio);
  });
});
