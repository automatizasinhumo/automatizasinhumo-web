/**
 * Cada diseño de web publicada, renderizado como lo sirve /w/<slug>, tiene que ser HTML válido
 * y pasar las reglas de accesibilidad de html-validate (MIT, https://html-validate.org):
 * etiquetas de los campos, textos alternativos, ids únicos, jerarquía de encabezados, enlaces
 * de teléfono que no se parten, etc. Se prueba cada diseño en cuatro casos: la web mínima (nombre
 * y teléfono), la de ejemplo completa con foto y galería, la muestra del propio diseño y
 * la web con el formulario de contacto.
 */
import { describe, expect, it } from 'vitest';
import { HtmlValidate, type ConfigData } from 'html-validate';
import { documentoWeb, EJEMPLO_WEB, validarWeb, type DatosWeb } from './webs';
import { PLANTILLAS_WEB } from './plantillasWeb';
import { disenoWeb } from './creativas';

const CONFIG: ConfigData = {
  extends: ['html-validate:recommended', 'html-validate:a11y'],
  rules: {
    // El HTML lo genera código: el estilo de comillas o de los atributos no cambia lo que ve nadie.
    'attr-quotes': 'off',
    'no-trailing-whitespace': 'off',
    'void-style': 'off',
    'attribute-boolean-style': 'off',
    'attribute-empty-style': 'off',
    // El CSS va en línea a propósito (la web es un solo documento sin peticiones extra).
    'no-inline-style': 'off',
    'long-title': 'off',
    // «<!doctype html>» en minúsculas es HTML5 válido.
    'doctype-style': 'off',
  },
};
const validador = new HtmlValidate(CONFIG);

const URL = 'https://tienda.test/w/ejemplo';
const TIENDA = 'https://tienda.test';

async function errores(html: string): Promise<string[]> {
  const r = await validador.validateString(html);
  return r.results.flatMap((x) => x.messages.map((m) => `${m.ruleId}: ${m.message} (${m.selector ?? `${m.line}:${m.column}`})`));
}

/** PNG de 1×1: basta para que se pinten la portada y la galería. */
const FOTO = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function datos(x: Record<string, unknown>): DatosWeb {
  const r = validarWeb(x);
  if (!r.ok) throw new Error(r.error);
  return r.datos;
}

describe('HTML de las webs publicadas', () => {
  for (const p of PLANTILLAS_WEB) {
    it(`${p.id}: válido y accesible`, async () => {
      const minima = datos({ negocio: 'Reparaciones Gil', telefono: '600 123 456', plantilla: p.id });
      const ejemplo: DatosWeb = { ...EJEMPLO_WEB, plantilla: p.id as DatosWeb['plantilla'] };
      const conFotos: DatosWeb = { ...ejemplo, foto: FOTO, galeria: [FOTO, FOTO] };
      const muestra: DatosWeb = { ...ejemplo, ...(disenoWeb(p.id)?.muestra ?? {}) };
      expect(await errores(documentoWeb(minima, URL, TIENDA)), 'mínima').toEqual([]);
      expect(await errores(documentoWeb(conFotos, URL, TIENDA, `${URL}/foto`, `${URL}/galeria/`)), 'ejemplo con foto y galería').toEqual([]);
      expect(await errores(documentoWeb(muestra, URL, TIENDA)), 'muestra del diseño').toEqual([]);
      const formulario = { accion: '/w/ejemplo/mensaje', sello: 'sello.de.prueba' };
      expect(await errores(documentoWeb(ejemplo, URL, TIENDA, '', '', formulario)), 'con formulario de contacto').toEqual([]);
    });
  }
});
