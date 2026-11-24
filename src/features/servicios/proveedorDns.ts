/**
 * Dónde tiene el cliente su dominio, para decirle el camino exacto en su panel al cambiar los
 * servidores DNS (en vez de «busca Nameservers»). Se deduce de los NS actuales, consultados por
 * DNS sobre HTTPS. Identifica al operador DNS, que casi siempre es el registrador en dominios
 * recién comprados; si no se reconoce, el estudio deja las instrucciones genéricas.
 */
export interface ProveedorDns {
  id: string;
  nombre: string;
  /** Recorrido en su panel hasta los servidores DNS. */
  ruta: string;
}

const LISTA: (ProveedorDns & { ns: RegExp })[] = [
  { id: 'ionos', nombre: 'IONOS', ns: /\.ui-dns\.(com|de|org|biz)$/, ruta: 'Dominios y SSL → tu dominio → Servidores de nombres → Usar servidores de nombres personalizados' },
  { id: 'godaddy', nombre: 'GoDaddy', ns: /\.domaincontrol\.com$/, ruta: 'Mis productos → Dominios → tu dominio → DNS → Servidores de nombres → Cambiar → Usaré mis propios servidores' },
  { id: 'hostinger', nombre: 'Hostinger', ns: /\.(dns-parking\.com|hostinger\.[a-z.]+)$/, ruta: 'Dominios → Administrar → DNS / Nameservers → Cambiar nameservers' },
  { id: 'ovh', nombre: 'OVHcloud', ns: /\.ovh\.(net|com|ca)$|\.anycast\.me$/, ruta: 'Web Cloud → Nombres de dominio → tu dominio → Servidores DNS → Modificar servidores DNS' },
  { id: 'dondominio', nombre: 'DonDominio', ns: /\.dondominio\.(com|net|org)$/, ruta: 'Dominios → tu dominio → Servidores DNS → Personalizados' },
  { id: 'arsys', nombre: 'Arsys', ns: /\.arsys\.(es|net)$|\.dns\.arsys\./, ruta: 'Panel de control → Dominios → tu dominio → Servidores DNS → Modificar' },
  { id: 'cdmon', nombre: 'cdmon', ns: /\.cdmon\.(net|com)$/, ruta: 'Dominios → tu dominio → Gestión DNS → Cambiar servidores DNS' },
  { id: 'namecheap', nombre: 'Namecheap', ns: /\.registrar-servers\.com$/, ruta: 'Domain List → Manage → Nameservers → Custom DNS' },
  { id: 'strato', nombre: 'Strato', ns: /\.(rzone|stratoserver)\.de$|\.strato\.(de|es)$/, ruta: 'Dominios → Gestionar dominio → Servidores de nombres → Usar otros' },
  { id: 'squarespace', nombre: 'Squarespace (antes Google Domains)', ns: /\.(googledomains\.com|squarespacedns\.com)$/, ruta: 'Dominios → tu dominio → DNS → Servidores de nombres → Usar servidores personalizados' },
  { id: 'wix', nombre: 'Wix', ns: /\.wixdns\.net$/, ruta: 'Dominios → ⋯ junto al dominio → Gestionar registros DNS → Servidores de nombres' },
];

export function proveedorDeNs(ns: readonly string[]): ProveedorDns | null {
  const limpios = ns.map((n) => n.toLowerCase().replace(/\.$/, ''));
  const p = LISTA.find((x) => limpios.some((n) => x.ns.test(n)));
  return p ? { id: p.id, nombre: p.nombre, ruta: p.ruta } : null;
}

/** NS actuales por DNS sobre HTTPS (Cloudflare). [] si no responde: nunca rompe la petición. */
export async function nsActuales(dominio: string, f: typeof fetch = fetch): Promise<string[]> {
  try {
    const u = new URL('https://cloudflare-dns.com/dns-query');
    u.searchParams.set('name', dominio);
    u.searchParams.set('type', 'NS');
    const r = await f(u, { headers: { accept: 'application/dns-json' }, signal: AbortSignal.timeout(3000) });
    if (!r.ok) return [];
    const j = (await r.json()) as { Answer?: { type: number; data: string }[] };
    return (j.Answer ?? []).filter((a) => a.type === 2).map((a) => a.data.toLowerCase().replace(/\.$/, ''));
  } catch {
    return [];
  }
}
