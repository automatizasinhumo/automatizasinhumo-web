import { describe, expect, it } from 'vitest';
import { CADUCA_MS, crearBorrador, guardable, leerBorrador } from './borrador';

describe('borrador del formulario', () => {
  it('no guarda campos ocultos, antispam ni consentimiento', () => {
    expect(guardable('nombre', 'text')).toBe(true);
    expect(guardable('mensaje', 'textarea')).toBe(true);
    expect(guardable('slug', 'text')).toBe(false);
    expect(guardable('web', 'text')).toBe(false);
    expect(guardable('consentimiento', 'checkbox')).toBe(false);
    expect(guardable('otro', 'hidden')).toBe(false);
  });

  it('ida y vuelta, solo campos con contenido', () => {
    const raw = crearBorrador({ nombre: 'Ana', email: '', mensaje: 'Hola', envio: 'x' }, 1000);
    expect(leerBorrador(raw, 2000)).toEqual({ t: 1000, campos: { nombre: 'Ana', mensaje: 'Hola' } });
    expect(crearBorrador({ nombre: '  ' }, 1000)).toBeNull();
  });

  it('caducado, roto o manipulado no se aplica', () => {
    const raw = crearBorrador({ nombre: 'Ana' }, 0);
    expect(leerBorrador(raw, CADUCA_MS + 1)).toBeNull();
    expect(leerBorrador('{', 0)).toBeNull();
    expect(leerBorrador(null, 0)).toBeNull();
    expect(leerBorrador(JSON.stringify({ t: 0, campos: { web: 'spam', slug: 'x', n: 3 } }), 0)).toBeNull();
  });
});
