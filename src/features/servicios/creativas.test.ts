import { describe, expect, it } from 'vitest';
import { cssWebDe, DISENOS, documentoWeb, PLANTILLAS_WEB, renderWeb, TITULOS_GENERICOS, validarWeb, type DatosWeb } from './webs';

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

  it.each(DISENOS.map((x) => [x.id]))('%s reconoce el sector de su propia muestra (no la trata como ajena)', (id) => {
    const x = DISENOS.find((d) => d.id === id)!;
    expect(x.sectores.length + (x.palabras?.length ?? 0)).toBeGreaterThan(0);
    const html = renderWeb(datos({ plantilla: id, ...x.muestra, foto: '' }));
    expect(html).not.toContain('w-ilus-sector');
  });

  it.each(DISENOS.map((x) => [x.id]))('%s fuera de su sector: ni su dibujo ni sus títulos, sí el icono del sector', (id) => {
    const x = DISENOS.find((d) => d.id === id)!;
    const ajeno = x.sectores.includes('dental') ? 'Taller mecánico' : 'Clínica dental';
    const html = renderWeb(datos({ plantilla: id, ...x.muestra, sector: ajeno, foto: '' }));
    expect(html).toContain('w-ilus-sector');
    for (const t of Object.values(x.titulos ?? {})) if (!Object.values(TITULOS_GENERICOS).includes(t)) expect(html).not.toContain(`>${t}</h2>`);
  });

  it.each([
    ['hornada', 'Reparación de pantallas'],
    ['expediente', 'Obrador de panadería'],
    ['agenda', 'Salón de eventos'],
    ['lamina', 'Diseño gráfico'],
    ['serena', 'Estudio de yoga'],
    ['vinetas', 'Ludoteca infantil'],
    ['escaparate', 'Clínica dental'],
  ])('%s no se queda con su dibujo para «%s» (palabra corta o de otro sector)', (id, sector) => {
    const html = renderWeb(datos({ plantilla: id, ...DISENOS.find((d) => d.id === id)!.muestra, sector, foto: '' }));
    expect(html).toContain('w-ilus-sector');
  });

  it.each(['Peluquería perruna', 'Guardería de perros', 'Hotel felino'])('viñetas sigue siendo suyo para «%s»', (sector) => {
    const html = renderWeb(datos({ plantilla: 'vinetas', ...DISENOS.find((d) => d.id === 'vinetas')!.muestra, sector, foto: '' }));
    expect(html).not.toContain('w-ilus-sector');
  });

  it('escaparate fuera de su sector quita también el jarrón y la bolsa', () => {
    const x = DISENOS.find((d) => d.id === 'escaparate')!;
    const propio = renderWeb(datos({ plantilla: 'escaparate', ...x.muestra, foto: '' }));
    const ajeno = renderWeb(datos({ plantilla: 'escaparate', ...x.muestra, sector: 'Clínica dental', foto: '' }));
    expect(propio).toMatch(/w-hueco-c">\s*<svg/);
    expect(ajeno).toContain('<div class="w-hueco w-hueco-d"></div>');
    expect(ajeno).not.toMatch(/w-hueco-c">\s*<svg/);
  });

  it('sin sector reconocible pone la inicial del negocio, y con foto no sustituye nada', () => {
    const sin = renderWeb(datos({ plantilla: 'agenda', negocio: 'Zeta Viajes', sector: 'Agencia de viajes', foto: '' }));
    expect(sin).toMatch(/w-ilus-sector[^]*>Z<\/text>/);
    const con = renderWeb(datos({ plantilla: 'agenda', negocio: 'Zeta Viajes', sector: 'Agencia de viajes', foto: 'data:image/png;base64,AAAA' }));
    expect(con).not.toContain('w-ilus-sector');
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
