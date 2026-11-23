import { describe, expect, it } from 'vitest';
import {
  EJEMPLO_WEB,
  fichaNegocio,
  galeriaValida,
  MAX_FOTO_GALERIA_WEB,
  MAX_GALERIA_WEB,
  MAX_OPINIONES_WEB,
  MAX_PREGUNTAS_WEB,
  ordenWeb,
  renderWeb,
  SECCIONES_WEB,
  validarWeb,
  resolverCapa,
  CAPA_BASICA,
  type DatosWeb,
} from './webs';

const base = { negocio: 'Peluquería Marta', telefono: '600 123 456' };
const datos = (x: Record<string, unknown>): DatosWeb => {
  const r = validarWeb({ ...base, ...x });
  if (!r.ok) throw new Error(r.error);
  return r.datos;
};
const ids = SECCIONES_WEB.map((s) => s.id);

describe('ordenWeb', () => {
  it('sin orden guardado usa el de siempre', () => {
    expect(ordenWeb(undefined)).toEqual(ids);
    expect(ordenWeb('x')).toEqual(ids);
  });
  it('respeta el orden elegido, quita repetidos y desconocidos y añade lo que falte al final', () => {
    const r = ordenWeb(['contacto', 'opiniones', 'contacto', '<script>', 7]);
    expect(r.slice(0, 2)).toEqual(['contacto', 'opiniones']);
    expect([...r].sort()).toEqual([...ids].sort());
  });
});

describe('validarWeb: bloques nuevos', () => {
  it('lo guardado antes de los bloques sigue valiendo, con todo vacío', () => {
    const d = datos({});
    expect(d.opiniones).toEqual([]);
    expect(d.preguntas).toEqual([]);
    expect(d.zonas).toBe('');
    expect(d.reservas).toBe('');
    expect(d.opinionesUrl).toBe('');
    expect(d.orden).toEqual(ids);
  });
  it('descarta opiniones sin texto y preguntas sin respuesta, y limita cuántas', () => {
    const d = datos({
      opiniones: [{ texto: '', autor: 'Nadie' }, ...Array.from({ length: 9 }, (_, i) => ({ texto: `Muy bien ${i}`, autor: 'A' }))],
      preguntas: [{ pregunta: '¿Sin respuesta?', respuesta: '' }, ...Array.from({ length: 12 }, (_, i) => ({ pregunta: `¿P${i}?`, respuesta: 'Sí' }))],
    });
    expect(d.opiniones).toHaveLength(MAX_OPINIONES_WEB);
    expect(d.opiniones[0].texto).toBe('Muy bien 0');
    expect(d.preguntas).toHaveLength(MAX_PREGUNTAS_WEB);
    expect(d.preguntas[0].pregunta).toBe('¿P0?');
  });
  it('los enlaces de reservas y opiniones solo admiten http(s)', () => {
    const d = datos({ reservas: 'javascript:alert(1)', opinionesUrl: 'booksy.com/marta' });
    expect(d.reservas).toBe('');
    expect(d.opinionesUrl).toMatch(/^https:\/\/booksy\.com\/marta/);
  });
});

describe('renderWeb: bloques nuevos', () => {
  it('pinta las secciones en el orden elegido', () => {
    const html = renderWeb({ ...EJEMPLO_WEB, orden: ['preguntas', 'contacto', 'opiniones', 'servicios', 'sobre'] });
    const pos = (id: string) => html.indexOf(`id="${id}"`);
    expect(pos('preguntas')).toBeGreaterThan(0);
    expect(pos('preguntas')).toBeLessThan(pos('contacto'));
    expect(pos('contacto')).toBeLessThan(pos('opiniones'));
    expect(pos('servicios')).toBeLessThan(pos('sobre'));
  });
  it('preguntas en acordeón exclusivo y opiniones escapadas, sin secciones vacías', () => {
    const html = renderWeb(datos({ preguntas: [{ pregunta: '¿<b>?', respuesta: 'Sí' }], opiniones: [{ texto: '<img src=x>', autor: 'Ana' }] }));
    expect(html).toContain('<details class="w-dato w-pregunta" name="preguntas"><summary>¿&lt;b&gt;?</summary>');
    expect(html).not.toContain('<img src=x>');
    expect(html).not.toContain('id="sobre"');
    expect(renderWeb(datos({}))).not.toContain('id="opiniones"');
  });
  it('con enlace de reservas, «Reservar cita» es el botón principal y va también en la barra del móvil', () => {
    const html = renderWeb(datos({ reservas: 'https://booksy.com/marta', opiniones: [{ texto: 'Genial' }], opinionesUrl: 'https://g.page/marta' }));
    expect(html).toMatch(/<div class="w-acciones"><a class="w-boton w-boton-lleno" href="https:\/\/booksy\.com\/marta" rel="noopener">.*?Reservar cita<\/a><a class="w-boton" href="tel:/);
    expect(html).toContain('<nav class="w-barra" aria-label="Contactar">');
    expect(html).toContain('Ver todas las opiniones');
  });
  it('sin reservas, el principal sigue siendo llamar', () => {
    const html = renderWeb(datos({}));
    expect(html).toMatch(/<a class="w-boton w-boton-lleno" href="tel:600123456">/);
    expect(html).not.toContain('Reservar cita');
  });
});

describe('fichaNegocio: zonas', () => {
  it('las zonas atendidas van como areaServed', () => {
    const f = JSON.parse(fichaNegocio(datos({ zonas: 'Lugo, Outeiro de Rei;  Rábade ' }), 'https://x.es'));
    expect(f.areaServed).toEqual(['Lugo', 'Outeiro de Rei', 'Rábade']);
    expect(JSON.parse(fichaNegocio(datos({}), 'https://x.es')).areaServed).toBeUndefined();
  });
});

describe('galería', () => {
  const foto = (n: number) => `data:image/png;base64,${'A'.repeat(4 * n)}`;

  it('filtra fotos no válidas, quita repetidas y limita a MAX_GALERIA_WEB', () => {
    const grande = `data:image/png;base64,${'A'.repeat(MAX_FOTO_GALERIA_WEB)}`;
    const lista = [foto(1), foto(1), 'https://x.es/a.png', 'data:image/gif;base64,AAAA', grande, 7, ...[2, 3, 4, 5, 6, 7, 8].map(foto)];
    const g = galeriaValida(lista);
    expect(g).toHaveLength(MAX_GALERIA_WEB);
    expect(new Set(g).size).toBe(g.length);
    expect(g).not.toContain(grande);
    expect(g[0]).toBe(foto(1));
    expect(galeriaValida('no')).toEqual([]);
  });

  it('validarWeb conserva la galería válida', () => {
    expect(datos({ galeria: [foto(1), 'mala', foto(2)] }).galeria).toEqual([foto(1), foto(2)]);
  });

  it('la publicada sirve las fotos por ruta, con carga diferida', () => {
    const html = renderWeb(datos({ galeria: [foto(1), foto(2)] }), { galeria: '/w/x/galeria/' });
    expect(html).toContain('id="galeria"');
    expect(html).toContain('src="/w/x/galeria/0"');
    expect(html).toContain('src="/w/x/galeria/1"');
    expect(html).toContain('loading="lazy"');
    expect(html).not.toContain('data:image');
  });

  it('la vista previa usa la data URL y sin fotos no hay sección', () => {
    expect(renderWeb(datos({ galeria: [foto(1)] }))).toContain(`src="${foto(1)}"`);
    expect(renderWeb(datos({ galeria: [] }))).not.toContain('id="galeria"');
  });
});

describe('capa visual', () => {
  it('valida acabado, forma de foto y movimiento y deja auto lo desconocido o ausente', () => {
    expect(datos({}).acabado).toBe('auto');
    const d = datos({ acabado: 'relieve', formaFoto: 'arco', movimiento: 'vivo' });
    expect([d.acabado, d.formaFoto, d.movimiento]).toEqual(['relieve', 'arco', 'vivo']);
    const raro = datos({ acabado: '"><script>', formaFoto: 'x', movimiento: 1 });
    expect([raro.acabado, raro.formaFoto, raro.movimiento]).toEqual(['auto', 'auto', 'auto']);
  });
  it('resuelve: cliente, luego diseño, luego básica', () => {
    expect(resolverCapa({})).toEqual(CAPA_BASICA);
    expect(resolverCapa({}, { acabado: 'relieve' }).acabado).toBe('relieve');
    expect(resolverCapa({ acabado: 'liso' }, { acabado: 'relieve' }).acabado).toBe('liso');
  });
  it('las básicas salen con grano y aparición; liso quita el grano; quieto se pinta como clase', () => {
    const html = renderWeb(datos({}));
    expect(html).toContain('w-ac-papel');
    expect(html).toContain('w-mv-sutil');
    expect(html).toContain('class="w-grano"');
    const liso = renderWeb(datos({ acabado: 'liso', movimiento: 'quieto', formaFoto: 'organica' }));
    expect(liso).not.toContain('w-grano"');
    expect(liso).toContain('w-mv-quieto');
    expect(liso).toContain('w-ff-organica');
  });
  it('un diseño de autor aporta su capa cuando el cliente deja auto', () => {
    expect(renderWeb(datos({ plantilla: 'navaja' }))).toContain('w-ac-relieve');
    expect(renderWeb(datos({ plantilla: 'escaparate' }))).toContain('w-mv-vivo');
  });
});
