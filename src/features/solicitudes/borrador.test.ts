import { describe, expect, it } from 'vitest';
import { CADUCA_MS, crearBorrador, firmaFormulario, guardable, leerBorrador } from './borrador';

describe('firma de las preguntas', () => {
  it('un borrador solo vuelve al mismo formulario (mismo orden y etiquetas)', () => {
    const f = firmaFormulario(['Nombre del bar', 'Horario']);
    const raw = crearBorrador({ campo_0: 'La Tasca', campo_1: '9-14' }, 1000, f);
    expect(leerBorrador(raw, 2000, f)?.campos).toEqual({ campo_0: 'La Tasca', campo_1: '9-14' });
    // Reordenadas: campo_0 sería ahora «Horario» → se descarta entero.
    expect(leerBorrador(raw, 2000, firmaFormulario(['Horario', 'Nombre del bar']))).toBeNull();
    expect(leerBorrador(raw, 2000, firmaFormulario(['Nombre del bar', 'Horarios']))).toBeNull();
    // Borrador antiguo sin firma en un formulario con preguntas: también fuera.
    expect(leerBorrador(crearBorrador({ campo_0: 'x' }, 1000), 2000, f)).toBeNull();
  });
});

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
