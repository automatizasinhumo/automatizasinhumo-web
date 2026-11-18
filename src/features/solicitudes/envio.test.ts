import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it, vi } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import type { EmailProvider } from '../email/provider';
import { enviarNotificacion, enviarSeguimientos, enviarVistasPreviasListas } from './envio';

/** D1 mínimo sobre SQLite de Node con las migraciones reales: el SQL se ejecuta de verdad. */
function d1(): D1Database & { sql: DatabaseSync } {
  const sql = new DatabaseSync(':memory:');
  for (const m of ['0040_solicitudes.sql', '0041_solicitudes_pedido.sql', '0042_notificaciones.sql', '0043_notificaciones_reserva.sql']) {
    sql.exec(readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8'));
  }
  const prep = (q: string, args: unknown[] = []) => {
    const st = sql.prepare(q);
    const a = args as (string | number | null)[];
    const bound = {
      bind: (...nuevos: unknown[]) => prep(q, nuevos),
      first: async () => (st.get(...a) as unknown) ?? null,
      all: async () => ({ results: st.all(...a) }),
      run: async () => ({ meta: { changes: Number(st.run(...a).changes) } }),
    };
    return bound;
  };
  return { sql, prepare: (q: string) => prep(q) } as unknown as D1Database & { sql: DatabaseSync };
}

const URL_OK = 'https://vista-s-abc123.pages.dev';
function solicitud(db: ReturnType<typeof d1>, id: string, estado: string, nota: string | null, email = 'ana@example.es') {
  db.sql
    .prepare("INSERT INTO solicitudes (public_id, slug, producto, nombre, email, estado, nota) VALUES (?, 'web-peluqueria', 'Web para peluquería', 'Ana Pérez', ?, ?, ?)")
    .run(id, email, estado, nota);
}
const estado = (db: ReturnType<typeof d1>, id: string) =>
  (db.sql.prepare('SELECT estado FROM solicitudes WHERE public_id = ?').get(id) as { estado: string }).estado;
const notif = (db: ReturnType<typeof d1>, id: string) =>
  db.sql.prepare("SELECT estado_envio, intentos, error FROM notificaciones WHERE solicitud_public_id = ? AND tipo = 'revision'").get(id) as
    | { estado_envio: string; intentos: number; error: string | null }
    | undefined;

const correo = (falla = false) => {
  const send = vi.fn(async () => {
    if (falla) throw new Error('rebote');
  });
  return { send } satisfies EmailProvider;
};

describe('enviarVistasPreviasListas', () => {
  it('manda el correo de revisión con el enlace y pasa a «vista previa enviada»', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    const mail = correo();
    expect(await enviarVistasPreviasListas(db, mail)).toEqual({ enviadas: ['S-AAAAAA'], fallidas: [] });
    expect(mail.send).toHaveBeenCalledTimes(1);
    const msg = mail.send.mock.calls[0][0 as never] as { to: string; subject: string; text: string };
    expect(msg.to).toBe('ana@example.es');
    expect(msg.text).toContain(URL_OK);
    expect(msg.text).toContain('Hola, Ana:');
    expect(estado(db, 'S-AAAAAA')).toBe('vista_previa_enviada');
    expect(notif(db, 'S-AAAAAA')?.estado_envio).toBe('enviado');
  });

  it('no toca QA con problemas, fallos, otros estados ni notas reescritas', async () => {
    const db = d1();
    solicitud(db, 'S-BBBBBB', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA con problemas: x (revisar a mano)`);
    solicitud(db, 'S-CCCCCC', 'en_preparacion', 'Vista previa automática: falló (Error, revisar a mano)');
    solicitud(db, 'S-DDDDDD', 'cambios_pedidos', `Vista previa automática: ${URL_OK} · QA ok`);
    solicitud(db, 'S-EEEEEE', 'nueva', `Vista previa automática: http://inseguro.test · QA ok`);
    solicitud(db, 'S-FFFFFF', 'nueva', null);
    const mail = correo();
    expect(await enviarVistasPreviasListas(db, mail)).toEqual({ enviadas: [], fallidas: [] });
    expect(mail.send).not.toHaveBeenCalled();
    expect(estado(db, 'S-DDDDDD')).toBe('cambios_pedidos');
  });

  it('dos ticks seguidos no duplican el correo', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', `Vista previa automática: ${URL_OK} · QA ok`);
    const mail = correo();
    await enviarVistasPreviasListas(db, mail);
    await enviarVistasPreviasListas(db, mail);
    expect(mail.send).toHaveBeenCalledTimes(1);
  });

  it('si ya se envió a mano, solo avanza el estado', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    const mail = correo();
    expect(
      await enviarNotificacion(db, mail, { id: 'S-AAAAAA', tipo: 'revision', version: 1, email: 'ana@example.es', asunto: 'a', texto: 't' }),
    ).toEqual({ estado: 'enviado' });
    expect(await enviarVistasPreviasListas(db, mail)).toEqual({ enviadas: ['S-AAAAAA'], fallidas: [] });
    expect(mail.send).toHaveBeenCalledTimes(1);
    expect(estado(db, 'S-AAAAAA')).toBe('vista_previa_enviada');
  });

  it('un correo que falla se reintenta hasta 3 veces y deja la solicitud donde estaba', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    const mail = correo(true);
    for (let i = 0; i < 5; i++) await enviarVistasPreviasListas(db, mail);
    expect(mail.send).toHaveBeenCalledTimes(3);
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'error', intentos: 3, error: 'rebote' });
    expect(estado(db, 'S-AAAAAA')).toBe('en_preparacion');
    error.mockRestore();
  });

  it('sin proveedor de correo no gasta intentos', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    expect(await enviarVistasPreviasListas(db, null)).toEqual({ enviadas: [], fallidas: [] });
    expect(notif(db, 'S-AAAAAA')).toBeUndefined();
  });

  it('las agotadas no ocupan el límite de la pasada', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`, 'rebota@example.es');
    solicitud(db, 'S-BBBBBB', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    const send = vi.fn(async (m: { to: string }) => {
      if (m.to === 'rebota@example.es') throw new Error('rebote');
    });
    for (let i = 0; i < 3; i++) await enviarVistasPreviasListas(db, { send }, 1);
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'error', intentos: 3 });
    expect(await enviarVistasPreviasListas(db, { send }, 1)).toEqual({ enviadas: ['S-BBBBBB'], fallidas: [] });
    error.mockRestore();
  });

  it('una solicitud movida entre la lectura y la reserva no recibe el correo', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'en_preparacion', `Vista previa automática: ${URL_OK} · QA ok`);
    const mail = correo();
    const original = db.prepare.bind(db);
    let movida = false;
    // David la mueve justo antes de que el cron reserve el envío.
    (db as unknown as { prepare: (q: string) => unknown }).prepare = (q: string) => {
      if (!movida && q.includes("estado_envio = 'enviando', reservado_at")) {
        movida = true;
        db.sql.prepare("UPDATE solicitudes SET estado = 'cambios_pedidos' WHERE public_id = 'S-AAAAAA'").run();
      }
      return original(q);
    };
    expect(await enviarVistasPreviasListas(db, mail)).toEqual({ enviadas: [], fallidas: [] });
    expect(mail.send).not.toHaveBeenCalled();
    expect(notif(db, 'S-AAAAAA')?.estado_envio).toBe('pendiente');
  });
});

describe('enviarNotificacion', () => {
  const reservada = (db: ReturnType<typeof d1>, intentos: number, hora: string | null) =>
    db.sql
      .prepare(
        "INSERT INTO notificaciones (solicitud_public_id, tipo, version, asunto, cuerpo, estado_envio, intentos, reservado_at) VALUES ('S-AAAAAA', 'revision', 1, 'a', 't', 'enviando', ?, ?)",
      )
      .run(intentos, hora);

  it('una reserva caducada se reclama con la misma clave de idempotencia; una reciente no', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'a', texto: 't' };
    // El Worker murió tras reservar: fila en 'enviando' con el intento 1.
    reservada(db, 1, (db.sql.prepare("SELECT datetime('now', '-5 minutes') AS h").get() as { h: string }).h);
    const mail = correo();
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'ocupado' });
    db.sql.prepare("UPDATE notificaciones SET reservado_at = datetime('now', '-20 minutes')").run();
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'enviado' });
    const clave = (mail.send.mock.calls[0][0 as never] as { idempotencyKey: string }).idempotencyKey;
    expect(clave).toMatch(/^notif-\d+-1$/);
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'enviado', intentos: 1 });
  });

  it('una fila antigua en «enviando» sin hora de reserva se puede reclamar aunque agotara intentos', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    reservada(db, 2, null);
    const mail = correo();
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'a', texto: 't', maxIntentos: 2 };
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'enviado' });
  });

  it('al reclamar con otro enlace manda el correo actual con un intento nuevo, no el guardado', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    reservada(db, 1, (db.sql.prepare("SELECT datetime('now', '-20 minutes') AS h").get() as { h: string }).h);
    const mail = correo();
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'otro', texto: 'nuevo enlace' };
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'enviado' });
    expect(mail.send.mock.calls[0][0 as never]).toMatchObject({ subject: 'otro', text: 'nuevo enlace', idempotencyKey: expect.stringMatching(/-2$/) });
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'enviado', intentos: 2 });
  });

  it('una reserva caducada con otro enlace no pasa del máximo de intentos', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    reservada(db, 3, (db.sql.prepare("SELECT datetime('now', '-20 minutes') AS h").get() as { h: string }).h);
    const mail = correo();
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', maxIntentos: 3 };
    expect(await enviarNotificacion(db, mail, { ...e, asunto: 'otro', texto: 'nuevo enlace' })).toEqual({ estado: 'ocupado' });
    expect(mail.send).not.toHaveBeenCalled();
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'enviando', intentos: 3 });
    // La misma carga sí se recupera sin sumar intento: es el correo que quizá ya salió.
    expect(await enviarNotificacion(db, mail, { ...e, asunto: 'a', texto: 't' })).toEqual({ estado: 'enviado' });
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'enviado', intentos: 3 });
  });

  it('un envío lento cuya reserva reclamó otro no sobrescribe el resultado', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'a', texto: 't' };
    const lento = correo();
    lento.send.mockImplementationOnce(async () => {
      // Mientras tanto, la reserva caduca y otra petición la reclama y envía.
      db.sql.prepare("UPDATE notificaciones SET reservado_at = datetime('now', '-20 minutes')").run();
      expect(await enviarNotificacion(db, correo(), e)).toEqual({ estado: 'enviado' });
      throw new Error('timeout');
    });
    expect(await enviarNotificacion(db, lento, e)).toEqual({ estado: 'ocupado' });
    expect(notif(db, 'S-AAAAAA')).toMatchObject({ estado_envio: 'enviado', error: null });
  });

  it('con exigirNota no crea la fila si la solicitud ya se movió', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'cambios_pedidos', 'nota');
    const mail = correo();
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'a', texto: 't', exigirNota: 'nota' };
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'ocupado' });
    expect(notif(db, 'S-AAAAAA')).toBeUndefined();
    expect(mail.send).not.toHaveBeenCalled();
  });

  it('no reenvía uno enviado salvo con «reenviar»', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    const mail = correo();
    const e = { id: 'S-AAAAAA', tipo: 'revision' as const, version: 1, email: 'ana@example.es', asunto: 'a', texto: 't' };
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'enviado' });
    expect(await enviarNotificacion(db, mail, e)).toEqual({ estado: 'ocupado' });
    expect(await enviarNotificacion(db, mail, { ...e, reenviar: true })).toEqual({ estado: 'enviado' });
    expect(mail.send).toHaveBeenCalledTimes(2);
  });

  it('sin proveedor deja la fila en error con el motivo', async () => {
    const db = d1();
    solicitud(db, 'S-AAAAAA', 'nueva', null);
    const r = await enviarNotificacion(db, null, { id: 'S-AAAAAA', tipo: 'revision', version: 1, email: 'x@y.es', asunto: 'a', texto: 't' });
    expect(r).toEqual({ estado: 'error', error: 'No hay proveedor de correo configurado (Ajustes → Email).' });
  });
});

describe('enviarSeguimientos', () => {
  const T0 = new Date('2026-11-18T10:00:00Z');
  const dias = (n: number) => new Date(T0.getTime() + n * 24 * 3600 * 1000);
  const RESENA = 'https://g.page/r/resena';
  /** Solicitud a la que se envió `tipo` (versión `version`) en T0, en el estado que deja ese correo. */
  function enviada(db: ReturnType<typeof d1>, id: string, est: string, tipo = 'revision', version = 1, enlace = URL_OK) {
    if (!db.sql.prepare('SELECT 1 FROM solicitudes WHERE public_id = ?').get(id)) solicitud(db, id, est, null);
    db.sql
      .prepare(
        "INSERT INTO notificaciones (solicitud_public_id, tipo, version, asunto, cuerpo, estado_envio, intentos, enviado_at) VALUES (?, ?, ?, 'a', ?, 'enviado', 1, '2026-11-18 10:00:00')",
      )
      .run(id, tipo, version, `Hola. Revísalo aquí: ${enlace}\n\nGracias.`);
  }
  const tipos = (db: ReturnType<typeof d1>, id: string) =>
    (db.sql.prepare("SELECT tipo || ':' || version || ':' || estado_envio AS t FROM notificaciones WHERE solicitud_public_id = ? ORDER BY id").all(id) as {
      t: string;
    }[]).map((r) => r.t);

  it('recordatorio al día 3 con el enlace de la versión, una sola vez', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    const mail = correo();
    expect(await enviarSeguimientos(db, mail, dias(2.9), null)).toEqual({ enviadas: [], fallidas: [] });
    expect(await enviarSeguimientos(db, mail, dias(3), null)).toEqual({ enviadas: ['S-AAAAAA:recordatorio'], fallidas: [] });
    await enviarSeguimientos(db, mail, dias(4), null);
    expect(mail.send).toHaveBeenCalledTimes(1);
    expect((mail.send.mock.calls[0][0 as never] as { text: string }).text).toContain(URL_OK);
    expect(estado(db, 'S-AAAAAA')).toBe('vista_previa_enviada');
  });

  it('al día 7 manda la espera y la deja «en espera»; no manda ya el recordatorio', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    const mail = correo();
    expect((await enviarSeguimientos(db, mail, dias(8), null)).enviadas).toEqual(['S-AAAAAA:espera']);
    expect(estado(db, 'S-AAAAAA')).toBe('en_espera_cliente');
    await enviarSeguimientos(db, mail, dias(9), null);
    expect(tipos(db, 'S-AAAAAA')).toEqual(['revision:1:enviado', 'espera:1:enviado']);
  });

  it('una versión nueva vuelve a contar desde su envío', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    const mail = correo();
    await enviarSeguimientos(db, mail, dias(3), null);
    db.sql.prepare("UPDATE notificaciones SET enviado_at = '2026-11-22 10:00:00' WHERE tipo = 'revision'").run();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada', 'revision', 2, 'https://vista-v2.pages.dev');
    db.sql.prepare("UPDATE notificaciones SET enviado_at = '2026-11-22 10:00:00' WHERE version = 2").run();
    expect((await enviarSeguimientos(db, mail, dias(6), null)).enviadas).toEqual([]);
    expect((await enviarSeguimientos(db, mail, dias(7), null)).enviadas).toEqual(['S-AAAAAA:recordatorio']);
    expect((mail.send.mock.calls[1][0 as never] as { text: string }).text).toContain('https://vista-v2.pages.dev');
  });

  it('si el cliente respondió (David la movió) no sale nada', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'cambios_pedidos');
    enviada(db, 'S-BBBBBB', 'aprobada');
    const mail = correo();
    await enviarSeguimientos(db, mail, dias(10), RESENA);
    expect(mail.send).not.toHaveBeenCalled();
  });

  it('movida entre la lectura y el envío: ni correo ni cambio de estado', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    const mail = correo();
    const orig = db.prepare.bind(db);
    // La lectura ve «vista previa enviada»; justo después David la marca como aprobada.
    (db as { prepare: unknown }).prepare = (q: string) => {
      if (q.startsWith('INSERT INTO notificaciones')) db.sql.prepare("UPDATE solicitudes SET estado = 'aprobada'").run();
      return orig(q);
    };
    expect((await enviarSeguimientos(db, mail, dias(8), null)).enviadas).toEqual([]);
    expect(mail.send).not.toHaveBeenCalled();
    expect(estado(db, 'S-AAAAAA')).toBe('aprobada');
  });

  it('reseña a los 7 días de entregar, solo con resena_url', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'entregada', 'entregado');
    const mail = correo();
    expect((await enviarSeguimientos(db, mail, dias(30), null)).enviadas).toEqual([]);
    expect((await enviarSeguimientos(db, mail, dias(6), RESENA)).enviadas).toEqual([]);
    expect((await enviarSeguimientos(db, mail, dias(7), RESENA)).enviadas).toEqual(['S-AAAAAA:resena']);
    await enviarSeguimientos(db, mail, dias(8), RESENA);
    expect(mail.send).toHaveBeenCalledTimes(1);
    expect((mail.send.mock.calls[0][0 as never] as { text: string }).text).toContain(RESENA);
  });

  it('un fallo se reintenta hasta 3 veces y luego queda en Admin', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    const mail = correo(true);
    for (let k = 0; k < 5; k++) await enviarSeguimientos(db, mail, dias(3 + k * 0.01), null);
    expect(mail.send).toHaveBeenCalledTimes(3);
    expect(tipos(db, 'S-AAAAAA')).toEqual(['revision:1:enviado', 'recordatorio:1:error']);
  });

  it('sin proveedor de correo no hace nada', async () => {
    const db = d1();
    enviada(db, 'S-AAAAAA', 'vista_previa_enviada');
    expect(await enviarSeguimientos(db, null, dias(8), null)).toEqual({ enviadas: [], fallidas: [] });
    expect(estado(db, 'S-AAAAAA')).toBe('vista_previa_enviada');
  });
});
