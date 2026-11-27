import { describe, expect, it } from 'vitest';
import { HtmlValidate, type ConfigData } from 'html-validate';
import { MAX_CARTA_WEB, precioNumero, seccionesCarta, validarCarta } from './cartaWeb';
import { cartelCarta, menuSchema, paginaCarta } from './paginaCarta';
import { documentoWeb, EJEMPLO_WEB, fichaNegocio, renderWeb, validarWeb, type DatosWeb } from './webs';

const CONFIG: ConfigData = {
  extends: ['html-validate:recommended', 'html-validate:a11y'],
  rules: {
    'attr-quotes': 'off',
    'no-trailing-whitespace': 'off',
    'void-style': 'off',
    'attribute-boolean-style': 'off',
    'attribute-empty-style': 'off',
    'no-inline-style': 'off',
    'long-title': 'off',
    'doctype-style': 'off',
  },
};
const validador = new HtmlValidate(CONFIG);
async function errores(html: string): Promise<string[]> {
  const r = await validador.validateString(html);
  return r.results.flatMap((x) => x.messages.map((m) => `${m.ruleId}: ${m.message} (${m.selector ?? `${m.line}:${m.column}`})`));
}

function datos(x: Record<string, unknown>): DatosWeb {
  const r = validarWeb({ negocio: 'Bar Gil', telefono: '600 123 456', ...x });
  if (!r.ok) throw new Error(r.error);
  return r.datos;
}

const CARTA = [
  { seccion: 'Entrantes', nombre: 'Croquetas', precio: '9,50 €', texto: 'Caseras', alergenos: 'leche,gluten,huevos', dietas: '' },
  { seccion: '', nombre: 'Ensalada <b>', precio: 'desde 7 €', texto: '', alergenos: [], dietas: ['vegano', 'vegetariano'] },
  { seccion: 'Postres', nombre: 'Tarta', precio: '5 €', texto: '', alergenos: ['frutos_cascara', 'inventado'], dietas: 'sin_gluten' },
];

describe('validarCarta', () => {
  it('acepta alérgenos en lista o separados por comas, sin repetidos ni desconocidos, en el orden oficial', () => {
    const c = validarCarta(CARTA);
    expect(c[0]!.alergenos).toEqual(['gluten', 'huevos', 'leche']);
    expect(c[1]!.dietas).toEqual(['vegetariano', 'vegano']);
    expect(c[2]!.alergenos).toEqual(['frutos_cascara']);
    expect(c[2]!.dietas).toEqual(['sin_gluten']);
  });
  it('la sección vacía hereda la anterior; la primera, «Carta»', () => {
    expect(validarCarta(CARTA).map((p) => p.seccion)).toEqual(['Entrantes', 'Entrantes', 'Postres']);
    expect(validarCarta([{ nombre: 'Café' }])[0]!.seccion).toBe('Carta');
  });
  it('descarta platos sin nombre, basura y lo que pasa del máximo', () => {
    expect(validarCarta([{ precio: '3 €' }, null, 'x', { nombre: ' ' }])).toEqual([]);
    expect(validarCarta('no')).toEqual([]);
    expect(validarCarta(Array.from({ length: MAX_CARTA_WEB + 5 }, (_, i) => ({ nombre: `P${i}` })))).toHaveLength(MAX_CARTA_WEB);
  });
  it('secciones con id de ancla único', () => {
    const s = seccionesCarta(validarCarta([{ seccion: 'Café', nombre: 'a' }, { seccion: 'café', nombre: 'b' }, { seccion: '¡!', nombre: 'c' }]));
    expect(s.map((x) => x.id)).toEqual(['c-cafe', 'c-cafe-2', 'c-seccion']);
  });
});

describe('precioNumero', () => {
  it.each([
    ['9,50 €', '9.50'],
    ['12 €', '12.00'],
    ['1.200,00', '1200.00'],
    ['3.5 EUR', '3.50'],
    ['desde 9 €', undefined],
    ['S/M', undefined],
    ['', undefined],
  ])('%s → %s', (p, n) => expect(precioNumero(p)).toBe(n));
});

describe('página de la carta', () => {
  const d = datos({ carta: CARTA, direccion: 'Rúa Nova 1, Lugo' });
  const url = 'https://tienda.test/w/bar-gil/carta';
  it('HTML válido y accesible, con y sin varias secciones', async () => {
    expect(await errores(paginaCarta(d, url, '/w/bar-gil'))).toEqual([]);
    expect(await errores(paginaCarta(datos({ carta: [{ nombre: 'Café', precio: '1,20 €' }] }), url))).toEqual([]);
    // «Tapas» y «Tapas t»: la sección de una y el encabezado de la otra no pueden compartir id.
    expect(await errores(paginaCarta(datos({ carta: [{ seccion: 'Tapas', nombre: 'Bravas' }, { seccion: 'Tapas t', nombre: 'Oreja' }] }), url))).toEqual([]);
  });
  it('escapa el texto y la leyenda solo trae los alérgenos usados', () => {
    const html = paginaCarta(d, url);
    expect(html).toContain('Ensalada &lt;b&gt;');
    expect(html).not.toContain('Ensalada <b>');
    expect(html).toContain('Frutos de cáscara');
    expect(html).not.toContain('Altramuces');
  });
  it('JSON-LD: oferta solo con precio claro y dietas solo si se declaran', () => {
    const m = menuSchema(d, url) as { hasMenuSection: { hasMenuItem: Record<string, unknown>[] }[] };
    const [croquetas, ensalada] = m.hasMenuSection[0]!.hasMenuItem;
    expect(croquetas!.offers).toMatchObject({ price: '9.50', priceCurrency: 'EUR' });
    expect(croquetas!.suitableForDiet).toBeUndefined();
    expect(ensalada!.offers).toBeUndefined();
    expect(JSON.stringify(ensalada!.suitableForDiet)).toContain('VeganDiet');
  });
  it('el cartel lleva el QR de la carta y no se indexa', async () => {
    const html = cartelCarta(d, url);
    expect(html).toContain('<svg');
    expect(html).toContain('noindex');
    expect(await errores(html)).toEqual([]);
  });
});

describe('enlace a la carta en la web', () => {
  it('solo aparece si hay platos', () => {
    expect(renderWeb({ ...EJEMPLO_WEB, carta: [] })).not.toContain('Ver la carta');
    expect(renderWeb({ ...EJEMPLO_WEB, carta: validarCarta(CARTA) }, { carta: '/w/x/carta' })).toContain('href="/w/x/carta"');
  });
  it('la ficha del negocio declara hasMenu con la URL de la carta', () => {
    const d = datos({ carta: CARTA });
    expect(JSON.parse(fichaNegocio(d, 'https://x.es', 'https://x.es/carta')).hasMenu).toBe('https://x.es/carta');
    expect(JSON.parse(fichaNegocio(d, 'https://x.es')).hasMenu).toBeUndefined();
  });
  it('la web con carta sigue siendo HTML válido', async () => {
    const d = datos({ carta: CARTA });
    expect(await errores(documentoWeb(d, 'https://t.test/w/x', 'https://t.test', undefined, undefined, undefined, undefined, 'https://t.test/w/x/carta'))).toEqual([]);
  });
});
