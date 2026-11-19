import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { describe, expect, it } from 'vitest';
import type { D1Database } from '@cloudflare/workers-types';
import { esBot, leerEvento, origenDe, pasosDe, pct, registrar, resumen, tipoDeRuta } from '.';

/** D1 mínimo sobre SQLite de Node con las migraciones reales: el SQL se ejecuta de verdad. */
function d1(): D1Database & { sql: DatabaseSync } {
  const sql = new DatabaseSync(':memory:');
  for (const m of ['0001_init.sql', '0040_solicitudes.sql', '0046_embudo.sql']) {
    sql.exec(readFileSync(new URL(`../../../migrations/${m}`, import.meta.url), 'utf8'));
  }
  const prep = (q: string, args: unknown[] = []) => {
    const st = sql.prepare(q);
    const a = args as (string | number | null)[];
    return {
      bind: (...nuevos: unknown[]) => prep(q, nuevos),
      first: async () => (st.get(...a) as unknown) ?? null,
      all: async () => ({ results: st.all(...a) }),
      run: async () => ({ meta: { changes: Number(st.run(...a).changes) } }),
      todo: () => st.all(...a),
    };
  };
  // batch como en D1: una transacción; si una sentencia falla, no queda nada.
  const batch = async (sts: { todo: () => unknown[] }[]) => {
    sql.exec('BEGIN');
    try {
      const out = sts.map((s) => ({ results: s.todo() }));
      sql.exec('COMMIT');
      return out;
    } catch (e) {
      sql.exec('ROLLBACK');
      throw e;
    }
  };
  return { sql, prepare: (q: string) => prep(q), batch } as unknown as D1Database & { sql: DatabaseSync };
}

const HOST = 'automatizasinhumo.es';
const hoy = () => new Date().toISOString().slice(0, 10);
const ev = (o: unknown) => leerEvento(JSON.stringify(o), HOST);

describe('esBot', () => {
  it('descarta robots, herramientas y peticiones sin UA', () => {
    expect(esBot(null)).toBe(true);
    expect(esBot('')).toBe(true);
    expect(esBot('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true);
    expect(esBot('Mozilla/5.0 HeadlessChrome/120')).toBe(true);
    expect(esBot('curl/8.4.0')).toBe(true);
    expect(esBot('Mozilla/5.0 (Windows NT 10.0) Chrome/131 Safari/537.36')).toBe(false);
  });
});

describe('origenDe', () => {
  it('clasifica el referrer', () => {
    expect(origenDe('', HOST, '')).toBe('directo');
    expect(origenDe('no es url', HOST, '')).toBe('directo');
    expect(origenDe('https://www.google.es/', HOST, '')).toBe('google');
    expect(origenDe('https://www.bing.com/search?q=x', HOST, '')).toBe('bing');
    expect(origenDe('https://chatgpt.com/', HOST, '')).toBe('asistente IA');
    expect(origenDe('https://l.instagram.com/', HOST, '')).toBe('redes');
    expect(origenDe('https://ejemplo.com/blog', HOST, '')).toBe('otra web');
  });
  it('la navegación interna no es entrada', () => {
    expect(origenDe(`https://${HOST}/products/x`, HOST, '')).toBe('');
    expect(origenDe(`https://${HOST}./`, HOST, '')).toBe('');
  });
  it('utm_source manda y se limpia', () => {
    expect(origenDe('https://www.google.es/', HOST, 'Newsletter<b>')).toBe('utm:newsletterb');
  });
  it('un dominio que solo contiene «google» no es Google', () => {
    expect(origenDe('https://google.ejemplo.com/', HOST, '')).toBe('otra web');
  });
});

describe('leerEvento', () => {
  it('rechaza cuerpos que no encajan', () => {
    expect(leerEvento('', HOST)).toBeNull();
    expect(leerEvento('{', HOST)).toBeNull();
    expect(leerEvento('[]', HOST)).toBeNull();
    expect(leerEvento('x'.repeat(3000), HOST)).toBeNull();
    expect(ev({ t: 'otro', p: '/' })).toBeNull();
    expect(ev({ t: 'vista', p: 'https://x/' })).toBeNull();
  });
  it('quita la query de la ruta y valida las notas', () => {
    const e = ev({ t: 'vitales', p: '/products/web?x=1', v: [{ n: 'LCP', r: 'good' }, { n: 'FID', r: 'good' }, { n: 'CLS', r: 'toString' }] });
    expect(e?.path).toBe('/products/web');
    expect(e?.vitales).toEqual([{ metrica: 'LCP', nota: 'good' }]);
  });
});

describe('pasosDe', () => {
  it('una entrada a una ficha cuenta entrada y ficha', () => {
    expect(pasosDe(ev({ t: 'vista', p: '/products/web-taller', r: 'https://www.google.com/' })!)).toEqual([
      { paso: 'entrada', origen: 'google', ficha: '' },
      { paso: 'ficha', origen: '', ficha: 'web-taller' },
    ]);
  });
  it('navegación interna al formulario solo cuenta empezar', () => {
    expect(pasosDe(ev({ t: 'vista', p: '/empezar/web-taller', r: `https://${HOST}/products/web-taller` })!)).toEqual([
      { paso: 'empezar', origen: '', ficha: 'web-taller' },
    ]);
  });
  it('la muestra solo cuenta en fichas y los slugs raros no pasan', () => {
    expect(pasosDe(ev({ t: 'muestra', p: '/' })!)).toEqual([]);
    expect(pasosDe(ev({ t: 'vista', p: '/products/<script>', r: `https://${HOST}/` })!)).toEqual([]);
  });
});

describe('registrar y resumen', () => {
  it('suma por día y cruza con solicitudes y pagos', async () => {
    const db = d1();
    const dia = hoy();
    await registrar(db, ev({ t: 'vista', p: '/products/web-taller', r: 'https://www.google.es/' })!, dia);
    await registrar(db, ev({ t: 'vista', p: '/products/web-taller', r: '' })!, dia);
    await registrar(db, ev({ t: 'muestra', p: '/products/web-taller' })!, dia);
    await registrar(db, ev({ t: 'vista', p: '/empezar/web-taller', r: `https://${HOST}/products/web-taller` })!, dia);
    await registrar(db, ev({ t: 'vitales', p: '/products/web-taller', v: [{ n: 'LCP', r: 'good' }, { n: 'CLS', r: 'poor' }] })!, dia);
    await registrar(db, ev({ t: 'vitales', p: '/products/otra', v: [{ n: 'LCP', r: 'needs-improvement' }] })!, dia);
    // Un día fuera del periodo no cuenta.
    await registrar(db, ev({ t: 'vista', p: '/', r: '' })!, '2000-01-01');
    db.sql.exec("INSERT INTO orders (amount_total_cents, status) VALUES (1000, 'paid'), (1000, 'pending')");

    const r = await resumen(db, 30);
    expect(r.pasos).toEqual({ entrada: 2, ficha: 2, muestra: 1, empezar: 1 });
    expect(r.pagos).toBe(1);
    expect(r.solicitudes).toBe(0);
    expect(r.origenes).toEqual([
      { origen: 'directo', n: 1 },
      { origen: 'google', n: 1 },
    ]);
    expect(r.fichas).toEqual([{ ficha: 'web-taller', ficha_n: 2, muestra_n: 1, empezar_n: 1 }]);
    expect(r.vitales).toEqual([
      { metrica: 'CLS', ruta: 'ficha', bueno: 0, mejorable: 0, malo: 1 },
      { metrica: 'LCP', ruta: 'ficha', bueno: 1, mejorable: 1, malo: 0 },
    ]);
  });

  it('un evento con varios pasos cuenta entero o no cuenta', async () => {
    const db = d1();
    // Se rompe la tabla a mitad: la vista externa de ficha suma entrada y ficha en un lote.
    db.sql.exec("CREATE TRIGGER romper BEFORE INSERT ON embudo WHEN NEW.paso = 'ficha' BEGIN SELECT RAISE(ABORT, 'x'); END");
    await expect(registrar(db, ev({ t: 'vista', p: '/products/web-taller', r: 'https://www.google.es/' })!, hoy())).rejects.toThrow();
    expect(db.sql.prepare('SELECT COUNT(*) AS n FROM embudo').get()).toEqual({ n: 0 });
  });
});

describe('utilidades', () => {
  it('tipoDeRuta y pct', () => {
    expect(tipoDeRuta('/')).toBe('inicio');
    expect(tipoDeRuta('/categories/webs')).toBe('listado');
    expect(tipoDeRuta('/empezar/x')).toBe('formulario');
    expect(tipoDeRuta('/legal')).toBe('otra');
    expect(pct(1, 3)).toBe('33 %');
    expect(pct(1, 0)).toBe('—');
  });
});
