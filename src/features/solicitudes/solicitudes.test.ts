import { describe, expect, it } from 'vitest';
import {
  ESTADOS,
  PASOS_CLIENTE,
  camposDeDescripcion,
  normalizarPublicId,
  nuevoPublicId,
  pasoCliente,
  validarSolicitud,
} from './index';

describe('solicitudes', () => {
  it('saca los campos de «### Campos que rellenas»', () => {
    const md = '## Algo\n\n### Campos que rellenas\n- **Nombre del negocio**\n- Teléfono\n\n### Otra\n- no';
    expect(camposDeDescripcion(md)).toEqual(['Nombre del negocio', 'Teléfono']);
  });

  it('valida email y consentimiento, y detecta el honeypot', () => {
    const f = new FormData();
    f.set('slug', 'carta-qr');
    f.set('nombre', 'Ana');
    f.set('email', 'mal');
    const r = validarSolicitud(f, []);
    expect(r.ok).toBe(false);
    f.set('web', 'bot');
    expect(validarSolicitud(f, [])).toEqual({ ok: true, spam: true });
  });

  it('los números públicos se reconocen en el seguimiento', () => {
    const id = nuevoPublicId();
    expect(normalizarPublicId(id)).toBe(id);
    expect(normalizarPublicId(` ${id.toLowerCase()} `)).toBe(id);
    expect(normalizarPublicId('1 OR 1=1')).toBeNull();
    expect(normalizarPublicId(null)).toBeNull();
  });

  it('cada estado interno cae en un paso del cliente (o cerrada)', () => {
    for (const e of ESTADOS) {
      const p = pasoCliente(e);
      expect(p).toBeGreaterThanOrEqual(e === 'descartada' ? -1 : 0);
      expect(p).toBeLessThan(PASOS_CLIENTE.length);
    }
    expect(pasoCliente('descartada')).toBe(-1);
    expect(pasoCliente('entregada')).toBe(PASOS_CLIENTE.length - 1);
  });
});
