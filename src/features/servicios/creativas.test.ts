import { describe, expect, it } from 'vitest';
import { cssWebDe, DISENOS, documentoWeb, PLANTILLAS_WEB, renderWeb, validarWeb, type DatosWeb } from './webs';

const datos = (x: Record<string, unknown>): DatosWeb => {
  const r = validarWeb({ negocio: 'Taller Ana & Co', telefono: '600 123 456', ...x });
  if (!r.ok) throw new Error(r.error);
  return r.datos;
};

describe('diseños de autor', () => {
  it('cada diseño está en el catálogo como familia «autor» y las básicas siguen detrás', () => {
    const autor = PLANTILLAS_WEB.filter((p) => p.familia === 'autor').map((p) => p.id);
    expect(autor).toEqual(DISENOS.map((x) => x.id));
    expect(PLANTILLAS_WEB.some((p) => p.familia === 'basica')).toBe(true);
    expect(PLANTILLAS_WEB.findIndex((p) => p.familia === 'basica')).toBe(autor.length);
  });

  it.each(DISENOS.map((x) => [x.id]))('%s pinta su portada, barra fija y títulos propios escapando el texto', (id) => {
    const x = DISENOS.find((d) => d.id === id)!;
    const html = renderWeb(datos({ plantilla: id, letra: 'diseno', ...x.muestra, negocio: 'Taller <Ana> & Co' }));
    expect(html).toMatch(new RegExp(`class="w w-d w-d-${id} w-ac-[a-z]+ w-ff-[a-z]+ w-mv-[a-z]+"`));
    expect(html).toContain('class="w-nav"');
    expect(html).toContain('Taller &lt;Ana&gt; &amp; Co');
    expect(html).not.toContain('<Ana>');
    expect(html).toContain(`--w-ft-titulo:${x.titulo.replaceAll("'", '&#39;')}`);
  });

  it.each(DISENOS.map((x) => [x.id]))('%s declara en «fuentes» toda familia ash-* que usa (si no, sale con la del sistema)', (id) => {
    const x = DISENOS.find((d) => d.id === id)!;
    const usadas = new Set([x.titulo, x.texto, x.css].join(' ').match(/ash-[a-z0-9-]+(?=')/g) ?? []);
    for (const f of usadas) expect(x.fuentes, `${id} usa ${f}`).toContain(f);
  });

  // Un nombre compuesto largo («Martínez-Fernández-Rodríguez») tiene que poder partirse en el h1:
  // si una pieza decorativa del nombre lleva nowrap, desborda la cabecera en móvil.
  it.each(DISENOS.map((x) => [x.id]))('%s deja partir el nombre del h1 en varias líneas', (id) => {
    const x = DISENOS.find((d) => d.id === id)!;
    const html = renderWeb(datos({ plantilla: id, letra: 'diseno', ...x.muestra, negocio: 'Limpiezas Martínez-Fernández-Rodríguez' }));
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
    for (const [, clases] of h1.matchAll(/class="([^"]+)"/g)) {
      for (const cl of clases!.split(/\s+/)) {
        for (const [, regla] of x.css.matchAll(new RegExp(`\\.${cl}(?![\\w-])[^{]*\\{([^}]*)\\}`, 'g'))) {
          expect(regla, `${id} .${cl}`).not.toMatch(/white-space:\s*nowrap/);
        }
      }
    }
  });

  it('con otra letra el diseño usa esa letra y no la suya', () => {
    const html = renderWeb(datos({ plantilla: 'pulso', letra: 'clasica' }));
    expect(html).not.toContain('ash-anton');
  });

  it('una básica con la letra «del diseño» no rompe: usa la del sistema', () => {
    const html = renderWeb(datos({ plantilla: PLANTILLAS_WEB.find((p) => p.familia === 'basica')!.id, letra: 'diseno' }));
    expect(html).not.toContain('w-d-');
    expect(html).toContain('--w-ft-titulo:system-ui');
  });

  it('cssWebDe solo incluye el CSS del diseño elegido', () => {
    const css = cssWebDe('bistro');
    expect(css).toContain('.w-d-bistro');
    expect(css).not.toContain('.w-d-pulso');
    expect(cssWebDe(PLANTILLAS_WEB.find((p) => p.familia === 'basica')!.id)).not.toContain('.w-d-bistro');
  });

  it('el documento publicado carga solo las fuentes del diseño y con su letra', () => {
    const doc = documentoWeb(datos({ plantilla: 'indice', letra: 'diseno' }), 'https://x.es', 'https://tienda.es');
    expect(doc).toContain("font-family:'ash-dm-serif'");
    expect(doc).toContain('https://tienda.es/fonts/web/');
    expect(doc).toContain('rel="preload"');
    expect(doc).not.toContain("font-family:'ash-anton'");
    const otra = documentoWeb(datos({ plantilla: 'indice', letra: 'clasica' }), 'https://x.es', 'https://tienda.es');
    expect(otra).not.toContain('@font-face');
  });
});
