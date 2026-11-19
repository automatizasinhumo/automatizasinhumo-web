/**
 * Decisión del cliente sobre su vista previa sin intervención humana: el correo de
 * revisión lleva un enlace firmado (HMAC con AUTH_SECRET, como el magic link) a
 * /empezar/revision, donde el cliente pulsa «Aprobar» o escribe sus cambios.
 *
 * El enlace solo abre la página (GET no cambia nada: los escáneres de correo que
 * abren enlaces no aprueban por el cliente). La decisión va en un POST y solo
 * avanza la solicitud si sigue esperando respuesta.
 */

import type { D1Database } from '@cloudflare/workers-types';
import { signToken, verifyToken } from '../auth/token';

/** Vida del enlace: cubre la revisión, el recordatorio y la espera con margen. */
export const TTL_DECISION = 30 * 24 * 3600;
const PREFIJO = 'decision:';
const DIA = 86400;

/** Estados en los que el cliente todavía puede decidir. */
export const ESPERANDO_DECISION = ['vista_previa_enviada', 'en_espera_cliente'] as const;
export const MAX_CAMBIOS = 2000;

export type Firmador = (publicId: string) => Promise<string | null>;

/**
 * Firmador de enlaces para un origen. Sin secreto u origen https devuelve null y los
 * correos se quedan con «responde a este correo». La caducidad se redondea al día para
 * que el cuerpo del correo sea estable entre reintentos del mismo día.
 */
export function firmadorDecision(origin: string | null | undefined, secret: string | null | undefined, ahora = Date.now()): Firmador | null {
  const o = (origin ?? '').replace(/\/+$/, '');
  if (!secret || !/^https:\/\/[^\s/]+$/.test(o)) return null;
  const base = Math.floor(ahora / 1000 / DIA) * DIA;
  return async (publicId) => `${o}/empezar/revision?t=${await signToken(PREFIJO + publicId, secret, TTL_DECISION, base)}`;
}

/** Id de la solicitud del enlace, o null si es falso, de otro uso o caducado. */
export async function leerDecision(token: string | null | undefined, secret: string | null | undefined, ahora = Date.now()): Promise<string | null> {
  if (!secret || !token || token.length > 300) return null;
  const p = await verifyToken(token, secret, Math.floor(ahora / 1000));
  return p?.startsWith(PREFIJO) ? p.slice(PREFIJO.length) : null;
}

export type Accion = 'aprobar' | 'cambios';

/**
 * Registra la decisión si la solicitud sigue esperándola (UPDATE condicional: un doble
 * envío o una decisión de David entre medias no se pisan). Lo escrito por el cliente se
 * antepone a la nota para que Admin lo vea sin perder lo anterior.
 */
export async function decidir(db: D1Database, publicId: string, accion: Accion, cambios: string): Promise<boolean> {
  const texto = cambios.trim().slice(0, MAX_CAMBIOS);
  if (accion === 'cambios' && !texto) return false;
  const nota = accion === 'aprobar' ? 'Aprobada por el cliente desde el enlace del correo.' : `Cambios pedidos por el cliente:\n${texto}`;
  const r = await db
    .prepare(
      `UPDATE solicitudes SET estado = ?, nota = ? || COALESCE(char(10) || char(10) || nota, ''), updated_at = datetime('now')
       WHERE public_id = ? AND estado IN (${ESPERANDO_DECISION.map(() => '?').join(', ')})`,
    )
    .bind(accion === 'aprobar' ? 'aprobada' : 'cambios_pedidos', nota, publicId, ...ESPERANDO_DECISION)
    .run();
  return (r.meta?.changes ?? 0) > 0;
}
