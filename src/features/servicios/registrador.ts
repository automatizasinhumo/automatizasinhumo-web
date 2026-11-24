/**
 * Compra del dominio por API, sin pasos a mano: Cloudflare Registrar (API de registro, 2026).
 *
 * - `cotizarDominios`: disponibilidad y precio real (POST /accounts/{id}/registrar/domain-check).
 * - `registrarDominio`: registro a nombre del cliente (POST /registrations), con renovación automática
 *   y datos del titular ocultos en el WHOIS cuando la extensión lo permite.
 * - `estadoRegistro`: el registro puede ser asíncrono (202); el cron consulta su estado.
 *
 * El dominio registrado usa los DNS de Cloudflare de nuestra cuenta, así que la conexión a la web
 * (dominios.ts) no necesita que el cliente toque nada. Cloudflare no registra `.es`, `.eu` ni `.cat`:
 * esos los marca `registrable: false` y el estudio deja la vía de conectar uno propio.
 *
 * Se activa con CF_REGISTRAR_ACTIVO=1 (la cuenta necesita su perfil de facturación y el contacto por
 * defecto de Registrar). CF_DOMINIO_PRECIO_MAX (USD, por defecto 15) limita lo que se ofrece: el dominio
 * propio va aparte de la web, a su coste más un margen (precioDominioEur). La dirección /w/negocio sí va incluida.
 */
import { ErrorCloudflare, type ConfigDominios } from './dominios';

export interface ConfigRegistrador extends ConfigDominios {
  /** Precio máximo por año (USD) de los dominios que se ofrecen (aparte de la web). */
  precioMax: number;
}

export function configRegistrador(
  cfg: ConfigDominios | null,
  e: { CF_REGISTRAR_ACTIVO?: string; CF_DOMINIO_PRECIO_MAX?: string },
): ConfigRegistrador | null {
  if (!cfg || e.CF_REGISTRAR_ACTIVO !== '1') return null;
  const max = Number(e.CF_DOMINIO_PRECIO_MAX);
  return { ...cfg, precioMax: Number.isFinite(max) && max > 0 ? max : 15 };
}

/** Cambio de referencia y margen con los que se muestra el dominio propio en euros. */
export const EUR_POR_USD = 0.92;
export const MARGEN_DOMINIO_EUR = 5;

/**
 * Precio al cliente del dominio propio (euros/año, entero): coste real del registro convertido
 * a euros más nuestro margen, redondeado al alza. Se toma el mayor entre alta y renovación,
 * para que el precio anunciado no suba al renovar. null si no hay precio.
 */
export function precioDominioEur(registro: number | null, renovacion: number | null = null): number | null {
  const base = Math.max(registro ?? NaN, renovacion ?? -Infinity);
  if (!Number.isFinite(base) || base <= 0) return null;
  return Math.ceil(base * EUR_POR_USD + MARGEN_DOMINIO_EUR);
}

const API = 'https://api.cloudflare.com/client/v4';

async function reg<T>(cfg: ConfigDominios, ruta: string, init: RequestInit = {}, f: typeof fetch = fetch): Promise<{ status: number; result: T }> {
  const r = await f(`${API}/accounts/${cfg.cuenta}/registrar${ruta}`, {
    ...init,
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json', ...(init.headers as Record<string, string> | undefined) },
  });
  const j = (await r.json().catch(() => null)) as { success?: boolean; result?: T; errors?: { code: number; message: string }[] } | null;
  if (!j?.success) {
    const errores = j?.errors ?? [];
    throw new ErrorCloudflare(errores.map((x) => x.code), errores.map((x) => x.message).join('; ') || `HTTP ${r.status}`, r.status);
  }
  return { status: r.status, result: j.result as T };
}

// ---------- Cotización ----------

export interface Cotizacion {
  dominio: string;
  /** Se puede registrar ya, por API, a precio estándar y dentro del máximo que ofrecemos. */
  incluido: boolean;
  precio: number | null;
  renovacion: number | null;
  moneda: string | null;
  /** Por qué no: 'extension' (Cloudflare no la vende), 'ocupado', 'premium' o 'caro'. */
  motivo: 'extension' | 'ocupado' | 'premium' | 'caro' | null;
}

interface CheckCf {
  domains: {
    name: string;
    registrable: boolean;
    tier?: 'standard' | 'premium';
    reason?: string;
    pricing?: { currency: string; registration_cost: string; renewal_cost: string };
  }[];
}

const MOTIVOS: Record<string, Cotizacion['motivo']> = {
  extension_not_supported_via_api: 'extension',
  extension_not_supported: 'extension',
  extension_disallows_registration: 'extension',
  domain_premium: 'premium',
  domain_unavailable: 'ocupado',
};

/** Disponibilidad y precio de hasta 20 dominios. Los que Cloudflare no devuelve quedan como «extension». */
export async function cotizarDominios(cfg: ConfigRegistrador, dominios: string[], f: typeof fetch = fetch): Promise<Cotizacion[]> {
  const lista = [...new Set(dominios)].slice(0, 20);
  if (!lista.length) return [];
  let res: CheckCf;
  try {
    res = (await reg<CheckCf>(cfg, '/domain-check', { method: 'POST', body: JSON.stringify({ domains: lista }) }, f)).result;
  } catch (e) {
    // 1008: ninguna extensión de la lista se vende por API (p. ej., solo .es).
    if (e instanceof ErrorCloudflare && e.codigos.includes(1008)) res = { domains: [] };
    else throw e;
  }
  return lista.map((dominio) => {
    const x = res.domains.find((d) => d.name.toLowerCase() === dominio);
    if (!x) return { dominio, incluido: false, precio: null, renovacion: null, moneda: null, motivo: 'extension' };
    const precio = x.pricing ? Number(x.pricing.registration_cost) : null;
    const renovacion = x.pricing ? Number(x.pricing.renewal_cost) : null;
    let motivo: Cotizacion['motivo'] = null;
    if (!x.registrable) motivo = MOTIVOS[x.reason ?? ''] ?? 'ocupado';
    else if (x.tier === 'premium') motivo = 'premium';
    else if (precio === null || !Number.isFinite(precio) || precio > cfg.precioMax || (renovacion ?? 0) > cfg.precioMax) motivo = 'caro';
    return { dominio, incluido: motivo === null, precio, renovacion, moneda: x.pricing?.currency ?? null, motivo };
  });
}

// ---------- Titular ----------

export interface Titular {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  calle: string;
  ciudad: string;
  provincia: string;
  cp: string;
  pais: string;
}

export const CAMPOS_TITULAR = ['nombre', 'empresa', 'email', 'telefono', 'calle', 'ciudad', 'provincia', 'cp', 'pais'] as const;

/** Países admitidos en el formulario (prefijo telefónico). */
export const PREFIJOS: Record<string, string> = { ES: '34', PT: '351', FR: '33', AD: '376', IT: '39', DE: '49', GB: '44', IE: '353', MX: '52', AR: '54', CO: '57', CL: '56', PE: '51', US: '1' };

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

/**
 * Datos del titular tal como los pide el registro (teléfono en formato «+34.612345678»), o el
 * nombre del primer campo que falta o no vale, para que el estudio lo señale.
 */
export function validarTitular(x: unknown): { ok: true; titular: Titular } | { ok: false; campo: (typeof CAMPOS_TITULAR)[number] } {
  const o = (x && typeof x === 'object' ? x : {}) as Record<string, unknown>;
  const pais = (texto(o.pais, 2) || 'ES').toUpperCase();
  const t: Titular = {
    nombre: texto(o.nombre, 120),
    empresa: texto(o.empresa, 120),
    email: texto(o.email, 200).toLowerCase(),
    telefono: '',
    calle: texto(o.calle, 200),
    ciudad: texto(o.ciudad, 100),
    provincia: texto(o.provincia, 100),
    cp: texto(o.cp, 12),
    pais,
  };
  if (t.nombre.length < 3 || !/\s/.test(t.nombre)) return { ok: false, campo: 'nombre' };
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(t.email)) return { ok: false, campo: 'email' };
  const prefijo = PREFIJOS[pais];
  if (!prefijo) return { ok: false, campo: 'pais' };
  let tel = texto(o.telefono, 30).replace(/[\s().-]/g, '').replace(/^00/, '+');
  if (tel.startsWith(`+${prefijo}`)) tel = tel.slice(prefijo.length + 1);
  if (!/^\d{6,14}$/.test(tel) || (pais === 'ES' && !/^[6-9]\d{8}$/.test(tel))) return { ok: false, campo: 'telefono' };
  t.telefono = `+${prefijo}.${tel}`;
  if (t.calle.length < 4) return { ok: false, campo: 'calle' };
  if (t.ciudad.length < 2) return { ok: false, campo: 'ciudad' };
  if (t.provincia.length < 2) return { ok: false, campo: 'provincia' };
  if (pais === 'ES' ? !/^\d{5}$/.test(t.cp) : t.cp.length < 3) return { ok: false, campo: 'cp' };
  return { ok: true, titular: t };
}

// ---------- Registro ----------

export type EstadoRegistroCf = 'pending' | 'in_progress' | 'action_required' | 'blocked' | 'succeeded' | 'failed';

export interface RegistroCf {
  state: EstadoRegistroCf;
  completed: boolean;
  error?: { code?: string | number; message?: string };
  context?: { action?: unknown };
}

/**
 * Registra el dominio a nombre del titular. Asíncrono: no espera a que termine (el cron consulta
 * `estadoRegistro`). Un 202 no se repite: la fila en D1 se crea antes para que no haya dos compras.
 */
export async function registrarDominio(cfg: ConfigRegistrador, dominio: string, t: Titular, f: typeof fetch = fetch): Promise<RegistroCf> {
  const cuerpo = {
    domain_name: dominio,
    auto_renew: true,
    privacy_mode: 'redaction',
    contacts: {
      registrant: {
        email: t.email,
        phone: t.telefono,
        postal_info: {
          name: t.nombre,
          ...(t.empresa ? { organization: t.empresa } : {}),
          address: { street: t.calle, city: t.ciudad, state: t.provincia, postal_code: t.cp, country_code: t.pais },
        },
      },
    },
  };
  const r = await reg<RegistroCf>(cfg, '/registrations', { method: 'POST', body: JSON.stringify(cuerpo), headers: { Prefer: 'respond-async' } }, f);
  return r.result;
}

export const estadoRegistro = async (cfg: ConfigDominios, dominio: string, f: typeof fetch = fetch) =>
  (await reg<RegistroCf>(cfg, `/registrations/${encodeURIComponent(dominio)}/registration-status`, {}, f)).result;
