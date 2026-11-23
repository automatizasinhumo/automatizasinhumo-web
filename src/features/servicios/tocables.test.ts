import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TOCABLES } from './estudioWeb';
import { EJEMPLO_WEB, PLANTILLAS_WEB, renderWeb } from './webs';

const foto = 'data:image/jpeg;base64,/9j/AAAA';
const completo = {
  ...EJEMPLO_WEB,
  foto,
  galeria: [foto],
  opiniones: [{ texto: 'Muy bien', autor: 'Ana' }],
  preguntas: [{ pregunta: '¿Abrís?', respuesta: 'Sí' }],
  zonas: 'Centro',
  horario: 'L-V 9-14',
  sobre: 'Somos dos',
  telefono: '600123456',
};
const hay = (html: string, sel: string) =>
  sel.split(',').some((parte) =>
    parte
      .trim()
      .split(/\s+/)
      .every((t) =>
        t.startsWith('#')
          ? html.includes(`id="${t.slice(1)}"`)
          : t.startsWith('.')
            ? new RegExp('class="[^"]*\\b' + t.slice(1) + '\\b').test(html)
            : html.includes(`<${t}`),
      ),
  );

describe('editar tocando', () => {
  const pagina = readFileSync(new URL('../../pages/servicios/web.astro', import.meta.url), 'utf8');
  it.each(TOCABLES.map((t) => [t[2], t[1]]))('el campo de %s existe en el editor (%s)', (_e, campo) => {
    expect(pagina).toContain(campo.replace(/^\[|\]$/g, ''));
  });
  it.each(TOCABLES.map((t) => [t[2], t[0]]))('%s aparece en alguna plantilla (%s)', (_e, vista) => {
    const algunas = PLANTILLAS_WEB.map((p) => renderWeb({ ...completo, plantilla: p.id }));
    expect(algunas.some((h) => hay(h, vista))).toBe(true);
  });
  it('la portada se puede tocar en todas las plantillas: nombre y frase', () => {
    for (const p of PLANTILLAS_WEB) {
      const h = renderWeb({ ...completo, plantilla: p.id });
      expect(hay(h, TOCABLES[0][0]), p.id).toBe(true);
      expect(hay(h, TOCABLES[2][0]), p.id).toBe(true);
    }
  });
});
