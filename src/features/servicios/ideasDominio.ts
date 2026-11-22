/**
 * Ideas de dominio para el cliente que aún no tiene uno: se sacan del nombre del negocio y de la
 * localidad, y se comprueba por DNS sobre HTTPS (Cloudflare 1.1.1.1) cuáles no están registrados.
 * Es una pista, no una reserva: el cliente lo compra en su registrador y vuelve a conectarlo.
 */

const SOCIEDAD = new Set(['sl', 'slu', 'sa', 'sll', 'cb', 'scp', 'sc', 'slne']);
const ARTICULOS = new Set(['el', 'la', 'los', 'las', 'de', 'del', 'y', 'e', 'en', 'a']);

function palabras(t: string): string[] {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/ñ/g, 'n')
    .split(/[^a-z0-9]+/)
    .filter((p) => p.length > 1 && !SOCIEDAD.has(p));
}

/** Localidad: el último trozo de la dirección tras la última coma, sin el código postal. */
function localidad(direccion: string): string {
  const trozos = direccion.split(',');
  if (trozos.length < 2) return '';
  return palabras(trozos[trozos.length - 1].replace(/\d+/g, ' ')).join('');
}

/** Hasta `max` candidatos (sin comprobar) en orden de preferencia. */
export function ideasDominio(negocio: string, direccion = '', max = 5): string[] {
  const p = palabras(negocio);
  if (!p.length) return [];
  const unido = p.join('');
  const corto = p.filter((x) => !ARTICULOS.has(x)).join('') || unido;
  const lugar = localidad(direccion);
  const bases = [corto, unido];
  const out: string[] = [];
  const poner = (d: string) => {
    const nombre = d.slice(0, d.lastIndexOf('.'));
    if (nombre.length >= 3 && nombre.length <= 50 && !out.includes(d)) out.push(d);
  };
  for (const b of bases) poner(`${b}.es`);
  for (const b of bases) poner(`${b}.com`);
  if (lugar && !corto.endsWith(lugar)) {
    poner(`${corto}${lugar}.es`);
    poner(`${corto}-${lugar}.es`);
  }
  poner(`${corto}online.es`);
  return out.slice(0, max);
}

/** true = sin registrar (NXDOMAIN), false = registrado, null = no se ha podido saber. */
export async function dominioLibre(d: string, f: typeof fetch = fetch): Promise<boolean | null> {
  try {
    const r = await f(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=NS`, {
      headers: { accept: 'application/dns-json' },
      signal: AbortSignal.timeout(3000),
    });
    if (!r.ok) return null;
    const j = (await r.json()) as { Status?: unknown };
    return j.Status === 3 ? true : j.Status === 0 ? false : null;
  } catch {
    return null;
  }
}

/** Candidatos que el DNS da por libres, en el mismo orden. */
export async function ideasLibres(negocio: string, direccion = '', f: typeof fetch = fetch): Promise<string[]> {
  const c = ideasDominio(negocio, direccion);
  const libres = await Promise.all(c.map((d) => dominioLibre(d, f)));
  return c.filter((_, i) => libres[i] === true);
}
