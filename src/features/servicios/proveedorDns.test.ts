import { describe, expect, it } from 'vitest';
import { nsActuales, proveedorDeNs } from './proveedorDns';

describe('proveedor del dominio por sus NS', () => {
  it.each([
    [['ns1045.ui-dns.com', 'ns1088.ui-dns.de'], 'ionos'],
    [['ns51.domaincontrol.com.'], 'godaddy'],
    [['ns1.dns-parking.com'], 'hostinger'],
    [['dns200.anycast.me', 'ns200.anycast.me'], 'ovh'],
    [['dns1.registrar-servers.com'], 'namecheap'],
  ])('%j → %s', (ns, id) => {
    expect(proveedorDeNs(ns)?.id).toBe(id);
  });
  it('no se deja engañar por nombres parecidos ni inventa', () => {
    expect(proveedorDeNs(['ns1.fakedomaincontrol.com.evil.net'])).toBeNull();
    expect(proveedorDeNs(['ns1.miempresa.es'])).toBeNull();
    expect(proveedorDeNs([])).toBeNull();
  });
  it('lee los NS por DNS sobre HTTPS y no rompe si falla', async () => {
    const ok = (async () => new Response(JSON.stringify({ Answer: [{ type: 2, data: 'NS1.UI-DNS.COM.' }, { type: 5, data: 'x' }] }))) as unknown as typeof fetch;
    expect(await nsActuales('ana.es', ok)).toEqual(['ns1.ui-dns.com']);
    const roto = (async () => { throw new Error('red'); }) as unknown as typeof fetch;
    expect(await nsActuales('ana.es', roto)).toEqual([]);
  });
});
