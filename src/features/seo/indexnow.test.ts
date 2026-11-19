import { describe, expect, it } from 'vitest';
import { ficheroClave } from './indexnow';

const CLAVE = '3f1c9a7e2b8d4c6f';

describe('ficheroClave', () => {
  it('sirve la clave cuando el nombre coincide', () => expect(ficheroClave(CLAVE, CLAVE)).toBe(CLAVE));
  it('no sirve nada con otro nombre', () => expect(ficheroClave('robots', CLAVE)).toBeNull());
  it('no sirve nada sin clave configurada', () => {
    expect(ficheroClave(CLAVE, undefined)).toBeNull();
    expect(ficheroClave('', '')).toBeNull();
  });
  it('rechaza una clave fuera del formato del protocolo', () => expect(ficheroClave('corta', 'corta')).toBeNull());
});
