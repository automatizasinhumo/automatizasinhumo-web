/**
 * Vista compartible del estudio web: el borrador (sin pagar) se guarda con un id aleatorio y se
 * sirve en /vista/<id> con marca de agua y sin indexar, para enseñarlo a un socio o a la familia
 * antes de comprar. Caduca a los 30 días.
 */
import { validarWeb, type DatosWeb, type ResultadoWeb } from './webs';

export const DIAS_VISTA = 30;
/** Fotos incluidas: por encima de esto no se guarda (el estudio ya reduce las fotos). */
export const MAX_BYTES_VISTA = 3_000_000;
const ALFABETO = 'abcdefghijkmnpqrstuvwxyz23456789';
const ID = /^[a-z2-9]{12}$/;

export function idVista(): string {
  const b = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(b, (x) => ALFABETO[x % ALFABETO.length]).join('');
}

/** Como validarWeb, pero un borrador aún puede no tener contacto. */
export function validarBorrador(x: unknown): ResultadoWeb {
  const v = validarWeb(x);
  if (v.ok || v.error !== 'contacto') return v;
  const r = validarWeb({ ...(x as object), email: 'borrador@ejemplo.es' });
  return r.ok ? { ok: true, datos: { ...r.datos, email: '' } } : r;
}

export async function guardarVista(db: D1Database, datos: DatosWeb, ahora = new Date()): Promise<string | null> {
  const json = JSON.stringify(datos);
  if (json.length > MAX_BYTES_VISTA) return null;
  const id = idVista();
  const limite = new Date(ahora.getTime() - DIAS_VISTA * 86_400_000).toISOString().slice(0, 19).replace('T', ' ');
  await db.batch([
    db.prepare('DELETE FROM webs_borradores WHERE creado < ?').bind(limite),
    db.prepare('INSERT INTO webs_borradores (id, datos, creado) VALUES (?, ?, ?)').bind(id, json, ahora.toISOString().slice(0, 19).replace('T', ' ')),
  ]);
  return id;
}

export async function leerVista(db: D1Database, id: string, ahora = new Date()): Promise<DatosWeb | null> {
  if (!ID.test(id)) return null;
  const limite = new Date(ahora.getTime() - DIAS_VISTA * 86_400_000).toISOString().slice(0, 19).replace('T', ' ');
  const r = await db.prepare('SELECT datos FROM webs_borradores WHERE id = ? AND creado >= ?').bind(id, limite).first<{ datos: string }>();
  if (!r) return null;
  // Se vuelve a validar al leer: lo guardado nunca se pinta sin pasar por el mismo filtro.
  const v = validarBorrador(JSON.parse(r.datos));
  return v.ok ? v.datos : null;
}
