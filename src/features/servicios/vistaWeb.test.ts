import { describe, expect, it } from 'vitest';
import { d1 } from './d1Prueba';
import { DIAS_VISTA, guardarVista, jsonLimitado, leerVista, MAX_BYTES_VISTA, validarBorrador } from './vistaWeb';
import { documentoVista, EJEMPLO_WEB, validarWeb } from './webs';

const HOY = new Date('2026-11-24T10:00:00Z');
const base = () => d1(['0053_webs_borradores.sql']);
const datos = () => {
  const v = validarWeb({ ...EJEMPLO_WEB, telefono: '600123456' });
  if (!v.ok) throw new Error(v.error);
  return v.datos;
};

describe('vista compartible', () => {
  it('guarda y devuelve el borrador por su id', async () => {
    const db = base();
    const id = await guardarVista(db, datos(), HOY);
    expect(id).toMatch(/^[a-z2-9]{12}$/);
    expect((await leerVista(db, id!, HOY))?.negocio).toBe(datos().negocio);
  });

  it('un borrador sin contacto se puede enseñar; otros errores no', () => {
    const r = validarBorrador({ ...EJEMPLO_WEB, telefono: '', whatsapp: '', email: '' });
    expect(r.ok).toBe(true);
    expect(r.ok && r.datos.email).toBe('');
    expect(validarBorrador({ ...EJEMPLO_WEB, negocio: '' }).ok).toBe(false);
  });

  it('caduca y se purga a los 30 días; ids raros no consultan', async () => {
    const db = base();
    const viejo = await guardarVista(db, datos(), new Date(HOY.getTime() - (DIAS_VISTA + 1) * 86_400_000));
    expect(await leerVista(db, viejo!, HOY)).toBeNull();
    await guardarVista(db, datos(), HOY);
    expect(db.sql.prepare('SELECT count(*) n FROM webs_borradores').get()).toEqual({ n: 1 });
    expect(await leerVista(db, "x' OR 1=1 --", HOY)).toBeNull();
  });

  it('rechaza borradores enormes', async () => {
    expect(await guardarVista(base(), { ...datos(), sobre: 'x'.repeat(MAX_BYTES_VISTA) }, HOY)).toBeNull();
  });

  it('el documento lleva marca de agua y noindex', () => {
    const h = documentoVista(datos());
    expect(h).toContain('noindex');
    expect(h).toContain('class="w-marca"');
    expect(h).toContain('/servicios/web');
  });
  it('corta el cuerpo por bytes reales aunque mienta el Content-Length', async () => {
    const flujo = (n: number) => new Request('https://x/', { method: 'POST', body: new ReadableStream({ start(c) { c.enqueue(new Uint8Array(n).fill(32)); c.enqueue(new TextEncoder().encode('{}')); c.close(); } }), duplex: 'half' } as RequestInit);
    expect(await jsonLimitado(flujo(50), 40)).toBe('grande');
    expect(await jsonLimitado(flujo(10), 40)).toEqual({});
    expect(await jsonLimitado(new Request('https://x/', { method: 'POST', body: 'no json' }), 40)).toBeNull();
  });
});
