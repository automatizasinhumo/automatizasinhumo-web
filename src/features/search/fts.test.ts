import { Miniflare } from 'miniflare';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createFtsSearch } from './fts';

const BODAS = [
  'web-boda-rsvp',
  'invitacion-digital',
  'galeria-privada-evento',
  'gestion-invitados-mesas',
].sort();

const CATEGORIES = [
  { id: 1, slug: 'bodas', name: 'Bodas y eventos' },
  { id: 2, slug: 'reservas', name: 'Reservas' },
  { id: 3, slug: 'documentos', name: 'Documentos' },
  { id: 4, slug: 'automatizaciones', name: 'Automatizaciones' },
  { id: 5, slug: 'contacto', name: 'Contacto' },
];

// [slug, nombre, descripción, categoría]
const PRODUCTS = (
  [
    ['web-boda-rsvp', 'Web de boda con confirmación de asistencia', 'Toda la información de la boda en una web.', 'bodas'],
    ['invitacion-digital', 'Invitación digital animada', 'Invitación web para enviar por WhatsApp y confirmar asistencia.', 'bodas'],
    ['galeria-privada-evento', 'Galería privada de fotos del evento', 'Álbum privado para una boda con las fotos de los invitados.', 'bodas'],
    ['gestion-invitados-mesas', 'Gestión de invitados y plano de mesas', 'Lista de invitados, confirmaciones y plano de mesas.', 'bodas'],
    ['reservas-salon', 'Reservas para peluquería, estética o clínica', 'Motor de reservas por servicio y profesional.', 'reservas'],
    ['dossier-comercial', 'Dossier comercial en PDF', 'Un dossier con información útil para organizar bodas.', 'documentos'],
    ['avisos-automaticos', 'Avisos automáticos por varios canales', 'Cualquier evento de tus herramientas avisa al equipo.', 'automatizaciones'],
    ['diplomas-eventos', 'Diplomas para eventos', 'Crea diplomas para los asistentes a cada evento.', 'documentos'],
    ['correo-contacto', 'Correo de contacto', 'Dirección para recibir consultas de clientes.', 'contacto'],
    ['newsletter-email', 'Newsletter por email', 'Envía boletines y novedades a tus clientes.', 'contacto'],
  ] as const
).map(([slug, name, description, category]) => ({ slug, name, description, category }));

let miniflare: Miniflare;
let search: ReturnType<typeof createFtsSearch>;

describe('buscador FTS en D1', () => {
  beforeAll(async () => {
    miniflare = new Miniflare({
      modules: true,
      script: 'export default { fetch() { return new Response("ok") } }',
      compatibilityDate: '2026-07-20',
      d1Databases: ['DB'],
    });

    const db = await miniflare.getD1Database('DB');
    await db.exec(
      'CREATE TABLE products (id INTEGER PRIMARY KEY, slug TEXT NOT NULL, name TEXT NOT NULL, description TEXT, active INTEGER NOT NULL DEFAULT 1)',
    );
    await db.exec('CREATE TABLE categories (id INTEGER PRIMARY KEY, slug TEXT NOT NULL, name TEXT NOT NULL)');
    await db.exec(
      'CREATE TABLE product_categories (product_id INTEGER NOT NULL, category_id INTEGER NOT NULL)',
    );
    await db.exec('CREATE VIRTUAL TABLE products_fts USING fts5(name, description)');

    await db.batch([
      ...CATEGORIES.map((category) =>
        db
          .prepare('INSERT INTO categories (id, slug, name) VALUES (?, ?, ?)')
          .bind(category.id, category.slug, category.name),
      ),
      ...PRODUCTS.flatMap((product, index) => {
        const id = index + 1;
        const category = CATEGORIES.find((item) => item.slug === product.category);
        if (!category) throw new Error(`Categoría desconocida: ${product.category}`);
        return [
          db
            .prepare(
              'INSERT INTO products (id, slug, name, description, active) VALUES (?, ?, ?, ?, 1)',
            )
            .bind(id, product.slug, product.name, product.description),
          db
            .prepare('INSERT INTO products_fts (rowid, name, description) VALUES (?, ?, ?)')
            .bind(id, product.name, product.description),
          db
            .prepare('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)')
            .bind(id, category.id),
        ];
      }),
    ]);
    search = createFtsSearch(db);
  }, 120_000);

  afterAll(async () => {
    await miniflare?.dispose();
  });

  it.each(['bodas', 'boda', 'web para bodas', 'eventos'])(
    'muestra primero los cuatro productos de bodas al buscar «%s»',
    async (query) => {
      const { products } = await search.search(query, { limit: 8 });
      expect(products.slice(0, 4).map((product) => product.slug).sort()).toEqual(BODAS);
    },
  );

  it('encuentra el producto de peluquería con el plural acentuado', async () => {
    const { products } = await search.search('peluquerías');
    expect(products[0]?.slug).toBe('reservas-salon');
  });

  it('suma sinónimos aunque haya coincidencias literales', async () => {
    const { products } = await search.search('correo');
    expect(products.map((product) => product.slug)).toEqual(
      expect.arrayContaining(['correo-contacto', 'newsletter-email']),
    );
  });
});
