import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { describe, expect, it } from 'vitest';

const pagina = readFileSync(new URL('../../pages/servicios/cv.astro', import.meta.url), 'utf8');
const codigo = readFileSync(new URL('./estudioCv.ts', import.meta.url), 'utf8');
const $ = load(pagina);

describe('editor de CV: plantilla tal cual frente a diseñar', () => {
  it('letra, tamaño y espaciado solo se ven al diseñar', () => {
    const letra = $('[data-guia="letra"]');
    expect(letra.attr('data-solo-camino')).toBe('personaliza');
    expect(letra.is('[hidden]')).toBe(true);
    for (const n of ['letra', 'tamano', 'espaciado']) {
      expect($(`input[name="${n}"]`).closest('[data-solo-camino="personaliza"]').length, n).toBeGreaterThan(0);
    }
  });
  it('el PDF de plantilla no hereda letra, tamaño ni espaciado guardados', () => {
    for (const n of ['letra', 'tamano', 'espaciado']) expect(codigo).toContain(`${n}: personal ? estado.${n} : undefined`);
  });
  it('la paleta se presenta como tonalidad', () => {
    expect($('[data-solo-camino="personaliza"]').text()).toContain('Elige tu tonalidad');
  });
});

describe('importar un CV', () => {
  it('la ayuda de archivos solo vive en la ventana de «Usar mi CV actual»', () => {
    expect($('details.importar-ayuda').length).toBe(0);
    const dialogo = $('dialog[data-importar-dialogo]');
    expect(dialogo.length).toBe(1);
    expect(dialogo.find('input[type="file"][name="importar"]').length).toBe(1);
    expect($('button[data-abrir-importar]').text()).toContain('Usar mi CV actual');
    expect(codigo).toContain("'[data-importar-dialogo]')?.showModal()");
  });
});
