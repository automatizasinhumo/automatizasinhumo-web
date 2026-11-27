import { describe, expect, it } from 'vitest';
import { d1 } from './d1Prueba';
import { publicarPagina } from './paginas';
import {
  CAMPO_TRAMPA,
  correoDueno,
  correoMensaje,
  formularioWeb,
  guardarMensaje,
  leerSello,
  mensajesDeCliente,
  numeroWhatsApp,
  paginaRespuesta,
  respuestasMensaje,
  selloFormulario,
  validarMensaje,
} from './mensajesWeb';
import { documentoWeb, EJEMPLO_WEB } from './webs';
import { rateLimitBucket } from '../auth/rateLimit';

const SECRETO = 'secreto-de-prueba-con-entropia-suficiente';
const T0 = Date.parse('2026-11-27T10:00:00Z');
const PEDIDOS = `CREATE TABLE orders (id INTEGER PRIMARY KEY, public_id TEXT UNIQUE, email TEXT);`;
const MIGRACIONES = ['0048_paginas_publicadas.sql', '0051_paginas_versiones.sql', '0054_webs_mensajes.sql', '0057_mensajes_seguimiento.sql'];

const form = (campos: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(campos)) f.set(k, v);
  return f;
};

describe('sello del formulario', () => {
  it('vale para su web, pasados unos segundos, y devuelve la vuelta firmada', async () => {
    const s = await selloFormulario('lola', 'https://lola.es/', SECRETO, T0);
    expect(await leerSello(s, 'lola', SECRETO, T0 + 10_000)).toEqual({ vuelta: 'https://lola.es/' });
  });

  it('rechaza el envío inmediato, otra web, otro secreto, uno manipulado y uno caducado', async () => {
    const s = await selloFormulario('lola', 'https://x.es/w/lola', SECRETO, T0);
    expect(await leerSello(s, 'lola', SECRETO, T0 + 1000)).toEqual({ error: 'rapido' });
    expect(await leerSello(s, 'otra', SECRETO, T0 + 10_000)).toEqual({ error: 'sello' });
    expect(await leerSello(s, 'lola', 'otro-secreto', T0 + 10_000)).toEqual({ error: 'sello' });
    expect(await leerSello(s.replace(/.$/, (c) => (c === 'a' ? 'b' : 'a')), 'lola', SECRETO, T0 + 10_000)).toEqual({ error: 'sello' });
    expect(await leerSello(s, 'lola', SECRETO, T0 + 3 * 86_400_000)).toEqual({ error: 'sello' });
    expect(await leerSello('', 'lola', SECRETO, T0)).toEqual({ error: 'sello' });
  });

  it('sin secreto no hay formulario', async () => {
    expect(await formularioWeb('lola', '/w/lola/mensaje', 'https://x.es/w/lola', undefined)).toBeUndefined();
  });
});

describe('validación del mensaje', () => {
  it('acepta email o teléfono y limpia espacios', () => {
    expect(validarMensaje(form({ nombre: '  Ana   Pérez ', contacto: '600 123 456', mensaje: '  Hola,\r\n\r\n\r\n¿tenéis cita?  ' }))).toEqual({
      ok: true,
      mensaje: { nombre: 'Ana Pérez', contacto: '600 123 456', texto: 'Hola,\n\n¿tenéis cita?' },
    });
    expect(validarMensaje(form({ contacto: 'ana@x.es', mensaje: 'Quiero presupuesto' })).ok).toBe(true);
  });

  it('rechaza la trampa rellena, un contacto inválido y un mensaje vacío', () => {
    expect(validarMensaje(form({ [CAMPO_TRAMPA]: 'http://spam', contacto: 'ana@x.es', mensaje: 'Hola hola' }))).toEqual({ ok: false, error: 'trampa' });
    expect(validarMensaje(form({ contacto: 'no', mensaje: 'Hola hola' }))).toEqual({ ok: false, error: 'contacto' });
    expect(validarMensaje(form({ contacto: '------', mensaje: 'Hola hola' }))).toEqual({ ok: false, error: 'contacto' });
    expect(validarMensaje(form({ contacto: '(.) 1 2', mensaje: 'Hola hola' }))).toEqual({ ok: false, error: 'contacto' });
    expect(validarMensaje(form({ contacto: 'ana@x.es', mensaje: ' ' }))).toEqual({ ok: false, error: 'texto' });
  });

  it('corta los campos largos', () => {
    const v = validarMensaje(form({ nombre: 'n'.repeat(500), contacto: 'ana@x.es', mensaje: 'm'.repeat(5000) }));
    expect(v.ok && [v.mensaje.nombre.length, v.mensaje.texto.length]).toEqual([100, 2000]);
  });
});

describe('guardado y área de cliente', () => {
  it('guarda el mensaje, encuentra al dueño por su pedido y solo se lo enseña a él', async () => {
    const db = d1(MIGRACIONES, PEDIDOS);
    db.sql.exec(`INSERT INTO orders (id, public_id, email) VALUES (1, 'ord_a', 'ana@x.es'), (2, 'ord_b', 'otro@x.es')`);
    const web = await publicarPagina(db, 'web', 'ord_a', 'Peluquería Ana', { negocio: 'Peluquería Ana', email: 'hola@ana.es' });
    await publicarPagina(db, 'web', 'ord_b', 'Bar Otro', { negocio: 'Bar Otro' });
    await guardarMensaje(db, web, { nombre: 'Luis', contacto: 'luis@x.es', texto: '¿Abrís el sábado?' });
    expect(await correoDueno(db, web)).toEqual({ email: 'ana@x.es', negocio: 'Peluquería Ana' });
    const ms = await mensajesDeCliente(db, 'ana@x.es');
    expect(ms).toHaveLength(1);
    expect(ms[0]).toMatchObject({ slug: web, nombre: 'Luis', contacto: 'luis@x.es', texto: '¿Abrís el sábado?' });
    expect(await mensajesDeCliente(db, 'otro@x.es')).toEqual([]);
    expect(await correoDueno(db, 'no-existe')).toBeNull();
  });

  it('el correo al dueño lleva el mensaje escapado y el enlace a su bandeja', () => {
    const c = correoMensaje('ana@x.es', 'Peluquería Ana', { nombre: '<b>Luis</b>', contacto: 'luis@x.es', texto: 'Hola <script>' }, 'https://t.es/account', 'Automatiza sin humo', 'id1');
    expect(c).toMatchObject({ to: 'ana@x.es', idempotencyKey: 'web-mensaje/id1' });
    expect(c.subject).toContain('Peluquería Ana');
    expect(c.html).toContain('&lt;script&gt;');
    expect(c.html).not.toContain('<script>');
    expect(c.text).toContain('https://t.es/account');
  });

  it('con correo, «Responder» va a quien escribió; con teléfono, no hay Reply-To', () => {
    const conCorreo = correoMensaje('ana@x.es', '', { nombre: 'Luis', contacto: 'luis@x.es', texto: 'Hola hola' }, 'https://t.es/account', 'T');
    expect(conCorreo.replyTo).toBe('luis@x.es');
    const conTelefono = correoMensaje('ana@x.es', '', { nombre: 'Luis', contacto: '600 123 456', texto: 'Hola hola' }, 'https://t.es/account', 'T');
    expect(conTelefono).not.toHaveProperty('replyTo');
  });
});

describe('respuestas rápidas del panel', () => {
  it('número de WhatsApp: móvil español sin prefijo, con +, con 00; fijo sin prefijo no', () => {
    expect(numeroWhatsApp('600 123 456')).toBe('34600123456');
    expect(numeroWhatsApp('+34 600-12-34-56')).toBe('34600123456');
    expect(numeroWhatsApp('0044 7911 123456')).toBe('447911123456');
    expect(numeroWhatsApp('912 345 678')).toBeNull();
    expect(numeroWhatsApp('+12')).toBeNull();
  });

  it('correo: mailto con asunto y el mensaje citado', () => {
    const [r, ...resto] = respuestasMensaje({ nombre: 'Luis', contacto: 'luis+x@x.es', texto: 'Hola\n¿cita?' }, 'Bar Lola');
    expect(resto).toEqual([]);
    expect(r!.tipo).toBe('correo');
    const u = new URL(r!.href);
    expect(u.protocol).toBe('mailto:');
    expect(decodeURIComponent(u.pathname)).toBe('luis+x@x.es');
    expect(u.searchParams.get('subject')).toBe('Re: tu mensaje a Bar Lola');
    expect(u.searchParams.get('body')).toContain('Hola Luis, gracias por escribir a Bar Lola.');
    expect(u.searchParams.get('body')).toContain('> Hola\n> ¿cita?');
  });

  it('teléfono: WhatsApp con saludo y llamar; un fijo solo llamar', () => {
    const r = respuestasMensaje({ nombre: '', contacto: '600 123 456', texto: 'Hola hola' }, '');
    expect(r.map((x) => x.tipo)).toEqual(['whatsapp', 'llamar']);
    expect(new URL(r[0]!.href).searchParams.get('text')).toBe('Hola, gracias por escribir. ');
    expect(r[0]!.href.startsWith('https://wa.me/34600123456?')).toBe(true);
    expect(r[1]!.href).toBe('tel:600123456');
    expect(respuestasMensaje({ nombre: '', contacto: '912 345 678', texto: 'Hola hola' }, '').map((x) => x.tipo)).toEqual(['llamar']);
  });
});

describe('formulario en la web publicada', () => {
  it('sale con el sello y la acción solo cuando se le pasa, sin JavaScript', async () => {
    const formulario = await formularioWeb('lola', '/w/lola/mensaje', 'https://x.es/w/lola', SECRETO, T0);
    const con = documentoWeb(EJEMPLO_WEB, 'https://x.es/w/lola', '', '', '', formulario);
    expect(con).toContain('<form class="w-form" method="post" action="/w/lola/mensaje"');
    expect(con).toContain(`name="${CAMPO_TRAMPA}" tabindex="-1"`);
    expect(con).toContain(`name="sello" value="${formulario!.sello}"`);
    expect(con).not.toMatch(/<script(?! type="application\/ld\+json")/);
    expect(documentoWeb(EJEMPLO_WEB, 'https://x.es/w/lola')).not.toContain('<form');
  });

  it('el envío tiene límite por IP', () => {
    expect(rateLimitBucket('POST', '/w/lola/mensaje')).toBe('checkout');
    expect(rateLimitBucket('POST', '/w/lola/mensaje/')).toBe('checkout');
    expect(rateLimitBucket('GET', '/w/lola/mensaje')).toBeNull();
    expect(rateLimitBucket('POST', '/w/lola/otra/mensaje')).toBeNull();
  });

  it('la respuesta escapa la vuelta', () => {
    expect(paginaRespuesta(true, 'https://x.es/"><b>')).toContain('href="https://x.es/&quot;&gt;&lt;b&gt;"');
  });
});
