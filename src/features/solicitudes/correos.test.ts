import { describe, expect, it } from 'vitest';
import { ESTADOS } from './index';
import { TIPOS_CORREO, correoDeEstado, correoHtml, prepararCorreo } from './correos';

const base = { nombre: 'Ana López', servicio: 'Carta digital con QR', esPedido: true, enlace: 'https://ejemplo.com/v1' };

describe('correos al cliente', () => {
  it('todas las plantillas salen con datos completos y firmadas', () => {
    for (const t of TIPOS_CORREO) {
      const c = prepararCorreo(t, { ...base, datosPendientes: 'Logo en PNG' });
      expect(c.ok).toBe(true);
      if (c.ok) {
        expect(c.texto).toContain('— David');
        expect(c.texto).not.toMatch(/\{\{|undefined|null/);
        expect(c.texto).toContain('Ana');
        expect(c.texto).not.toContain('López');
      }
    }
  });

  it('«Falta información» no se envía sin datos pendientes', () => {
    expect(prepararCorreo('falta_informacion', { ...base, datosPendientes: '  ' }).ok).toBe(false);
  });

  it('revisión y entrega exigen enlace', () => {
    expect(prepararCorreo('revision', { ...base, enlace: '' }).ok).toBe(false);
    expect(prepararCorreo('entregado', { ...base, enlace: 'javascript:alert(1)' }).ok).toBe(false);
  });

  it('la prueba gratis no promete entrega sin pago; el pedido no pide pagar otra vez', () => {
    const prueba = prepararCorreo('revision', { ...base, esPedido: false });
    const pedido = prepararCorreo('revision', base);
    expect(prueba.ok && prueba.texto).toContain('no pagas nada');
    expect(pedido.ok && pedido.texto).toContain('No tienes que volver a pagar');
  });

  it('el silencio nunca aprueba', () => {
    const c = prepararCorreo('espera', base);
    expect(c.ok && c.texto).toContain('ni lo daré por aprobado sin tu confirmación');
  });

  it('cada estado con aviso tiene su correo', () => {
    expect(correoDeEstado('vista_previa_enviada')).toBe('revision');
    expect(correoDeEstado('cambios_pedidos')).toBe('cambios_recibidos');
    expect(correoDeEstado('en_espera_cliente')).toBe('espera');
    expect(correoDeEstado('entregada')).toBe('entregado');
    expect(correoDeEstado('nueva')).toBeNull();
    for (const e of ESTADOS) correoDeEstado(e);
  });

  it('el HTML escapa y enlaza', () => {
    const h = correoHtml('Hola <b>x</b>\n\nVer https://a.com/x');
    expect(h).toContain('&lt;b&gt;');
    expect(h).toContain('<a href="https://a.com/x">');
  });
});
