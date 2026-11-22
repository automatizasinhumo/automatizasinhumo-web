// Formato de los datos de contacto del CV: lo que «Revisa» avisa como mal escrito (sin bloquear).
import { describe, expect, it } from 'vitest';
import { correoValido, telefonoValido, webValida } from '../../src/features/servicios/cv';

describe('formato de contacto', () => {
  it('correo', () => {
    for (const v of ['', 'ana@correo.es', 'ana.perez+cv@sub.dominio.com']) expect(correoValido(v), v).toBe(true);
    for (const v of ['esto-no-es-un-correo', 'ana@', 'ana@correo', 'ana @correo.es', '@correo.es', 'ana@correo.e']) expect(correoValido(v), v).toBe(false);
  });
  it('teléfono', () => {
    for (const v of ['', '612 345 678', '+34 600 123 456', '(+34) 912-345-678']) expect(telefonoValido(v), v).toBe(true);
    for (const v of ['llámame', '1234', '+34 600 abc 456', '1'.repeat(16)]) expect(telefonoValido(v), v).toBe(false);
  });
  it('web', () => {
    for (const v of ['', 'anaperez.es', 'https://anaperez.es/portfolio', 'http://www.ana.com']) expect(webValida(v), v).toBe(true);
    for (const v of ['javascript:alert(1)', 'data:text/html,hola', 'mi web', 'anaperez', 'ftp://ana.es']) expect(webValida(v), v).toBe(false);
  });
});
