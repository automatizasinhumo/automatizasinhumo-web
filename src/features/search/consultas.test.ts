import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Miniflare } from 'miniflare';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createFtsSearch } from './fts';

/**
 * Consultas reales de clientes contra el catálogo real (todas las migraciones y
 * manual/catalogo/seed.sql). Cada consulta lista las fichas aceptables como primer
 * resultado. Un cambio de orden, de vocabulario o de catálogo que empeore una de
 * ellas falla aquí, no en staging.
 */
const CONSULTAS: Array<[string, string[]]> = [
  ['quiero que me pidan cita', ['pagina-citas', 'reservas-salon', 'web-taller']],
  ['necesito una web para mi bar', ['carta-qr', 'carta-pedidos-whatsapp', 'reservas-restaurante', 'web-una-pagina']],
  ['que me paguen online', ['tienda-online', 'tienda-productos-digitales']],
  ['quiero vender por internet', ['tienda-online', 'tienda-productos-digitales', 'marketplace-plantillas']],
  ['hacer facturas', ['facturas-presupuestos', 'auto-facturas']],
  ['enviar newsletter', ['newsletter-propia']],
  ['reservar mesa', ['reservas-restaurante']],
  ['tienda online', ['tienda-online']],
  ['web para dentista', ['reservas-salon', 'pagina-citas', 'web-una-pagina']],
  ['carta del restaurante', ['carta-qr', 'carta-pedidos-whatsapp']],
  ['web para abogado', ['web-corporativa-5-secciones', 'web-una-pagina']],
  ['formulario de inscripción', ['formulario-aviso-telegram', 'lista-espera']],
  ['agenda online', ['pagina-citas', 'reservas-salon']],
  ['boda', ['web-boda-rsvp', 'invitacion-digital', 'galeria-privada-evento', 'gestion-invitados-mesas']],
  ['currículum', ['cv-profesional']],
  ['traducir mi web', ['web-multidioma']],
  ['mi web va lenta', ['optimizar-imagenes', 'auditoria-web']],
  ['chatbot para mi web', ['chat-ia-web']],
  ['reseñas de google', ['auto-resenas', 'ficha-google', 'muro-testimonios']],
  ['quiero que me llamen', ['formulario-aviso-telegram', 'web-una-pagina']],
];

/** Parte un fichero SQL en sentencias: respeta cadenas y los BEGIN … END de los triggers. */
function sentencias(sql: string): string[] {
  const out: string[] = [];
  let actual = '';
  let enCadena = false;
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i];
    if (!enCadena && c === '-' && sql[i + 1] === '-') {
      while (i < sql.length && sql[i] !== '\n') i++;
      actual += '\n';
      continue;
    }
    if (c === "'") enCadena = !enCadena;
    actual += c;
    if (c === ';' && !enCadena) {
      const t = actual.trim();
      if (/^CREATE\s+TRIGGER/i.test(t) && !/\bEND\s*;$/i.test(t)) continue;
      if (t !== ';') out.push(t);
      actual = '';
    }
  }
  if (actual.trim()) out.push(actual.trim());
  return out;
}

let miniflare: Miniflare;
let search: ReturnType<typeof createFtsSearch>;
const raiz = join(__dirname, '..', '..', '..');

describe('consultas reales contra el catálogo', () => {
  beforeAll(async () => {
    miniflare = new Miniflare({
      modules: true,
      script: 'export default { fetch() { return new Response("ok") } }',
      compatibilityDate: '2026-07-20',
      d1Databases: ['DB'],
    });
    const db = await miniflare.getD1Database('DB');
    const dir = join(raiz, 'migrations');
    const ficheros = readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
    for (const f of [...ficheros.map((m) => join(dir, m)), join(raiz, 'manual', 'catalogo', 'seed.sql')]) {
      const lote = sentencias(readFileSync(f, 'utf8')).map((s) => db.prepare(s));
      if (lote.length) await db.batch(lote);
    }
    search = createFtsSearch(db);
  }, 180_000);

  afterAll(async () => {
    await miniflare?.dispose();
  });

  it.each(CONSULTAS)('«%s» da primero una ficha adecuada', async (consulta, aceptables) => {
    const { products } = await search.search(consulta, { limit: 3 });
    expect(aceptables, `primeras: ${products.map((p) => p.slug).join(', ')}`).toContain(products[0]?.slug);
  });
});
