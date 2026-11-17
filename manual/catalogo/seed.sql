-- Generado por manual/catalogo/gen-sql.mjs. No editar a mano.
DELETE FROM product_extras;
DELETE FROM product_images;
DELETE FROM product_variants;
DELETE FROM product_categories;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM menu_items;
DELETE FROM page_media;
DELETE FROM pages;
INSERT INTO categories (name, slug, public_id) VALUES ('Webs para tu negocio', 'webs', 'cat_kcwk9q9ze5');
INSERT INTO categories (name, slug, public_id) VALUES ('Restaurantes y bares', 'hosteleria', 'cat_jcc5129esm');
INSERT INTO categories (name, slug, public_id) VALUES ('Reservas y citas', 'reservas', 'cat_d313v6vxt4');
INSERT INTO categories (name, slug, public_id) VALUES ('Bodas y eventos', 'bodas', 'cat_91zgbaz49v');
INSERT INTO categories (name, slug, public_id) VALUES ('Tarjetas, página de enlaces y CV', 'identidad', 'cat_pvn39pka00');
INSERT INTO categories (name, slug, public_id) VALUES ('Formularios y captación', 'captacion', 'cat_zndby3z0gr');
INSERT INTO categories (name, slug, public_id) VALUES ('Bots e IA', 'bots', 'cat_jneacrbzgm');
INSERT INTO categories (name, slug, public_id) VALUES ('Automatizaciones', 'automatizaciones', 'cat_scz7g9x663');
INSERT INTO categories (name, slug, public_id) VALUES ('Enlaces, QR y analítica', 'enlaces', 'cat_mk4w1em1fb');
INSERT INTO categories (name, slug, public_id) VALUES ('Tiendas y productos digitales', 'tiendas', 'cat_5xxnmzt5n0');
INSERT INTO categories (name, slug, public_id) VALUES ('Portales y webs editables', 'portales', 'cat_q17xqanb8h');
INSERT INTO categories (name, slug, public_id) VALUES ('Documentos, PDF e IA', 'documentos', 'cat_0c9d9e9g39');
INSERT INTO categories (name, slug, public_id) VALUES ('Contenido y redes', 'contenido', 'cat_va2bpvq4cv');
INSERT INTO categories (name, slug, public_id) VALUES ('Planes mensuales', 'planes', 'cat_4bvqw0x7w1');
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de una página para tu negocio', 'Tu negocio en internet con una sola página clara: quién eres, qué ofreces, cómo contactarte.

## Qué recibes
- Web de una página adaptada a móvil
- Botón de WhatsApp y llamada
- Mapa y horario
- Publicada con tu dominio (o uno gratuito)

## Campos que rellenas
- Nombre del negocio
- Sector
- Logo (opcional)
- 3–6 servicios con precio
- Teléfono / WhatsApp
- Dirección y horario
- 3–8 fotos

## Ejemplo
> Peluquería Lola: portada con foto, lista de servicios con precios, botón «Pide cita por WhatsApp» y mapa.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'web-una-pagina', 'Modalidad', 0, 'prod_jfney815m0', datetime('2026-01-01', '-0 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-una-pagina' AND c.slug='webs';
UPDATE products SET image_key='productos/web-una-pagina.jpg' WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-una-pagina.jpg', 0, 'pimg_ez3exmt0f8' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/spa-salon.png', 1, 'pimg_69qrwa67dg' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/business-template.png', 2, 'pimg_9jrz8gd4pk' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/product-launch.png', 3, 'pimg_t4a0vxketd' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-eventos.png', 4, 'pimg_ksstd2q5rv' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'web-una-pagina-diy', 0, 1, 'var_8txqd8etds' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'web-una-pagina-pro', 1, 1, 'var_mxz08cfy4e' FROM products WHERE slug='web-una-pagina';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web corporativa de 5 secciones', 'Inicio, servicios, sobre nosotros, opiniones y contacto. Para empresas que necesitan algo más que una tarjeta.

## Qué recibes
- 5 páginas con diseño a elegir entre +300 plantillas
- Formulario de contacto con aviso
- SEO básico (títulos, descripción, sitemap)
- Publicación y certificado SSL

## Campos que rellenas
- Datos de la empresa
- Textos de cada sección (o te los redactamos)
- Logo y colores
- Fotos
- Correo donde recibir contactos

## Ejemplo
> Asesoría García: página por servicio (fiscal, laboral, contable), equipo, testimonios y formulario.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **449 €** | **899 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 44900, 'eur', 999, 1, 'web-corporativa-5-secciones', 'Modalidad', 0, 'prod_mq3jahbf22', datetime('2026-01-01', '-1 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-corporativa-5-secciones' AND c.slug='webs';
UPDATE products SET image_key='productos/web-corporativa-5-secciones.jpg' WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-corporativa-5-secciones.jpg', 0, 'pimg_0ngdhp4sjg' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/consulting-firm.png', 1, 'pimg_9gmwscrvrm' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/creative-agency.png', 2, 'pimg_d263bn23gq' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/atelier.png', 3, 'pimg_tfyj628qxe' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ironworks.png', 4, 'pimg_ab8txhk81a' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-negocio.png', 5, 'pimg_hbybnatyza' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-bootstrap.png', 6, 'pimg_hsn98rb9mq' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 44900, 999, 'web-corporativa-5-secciones-diy', 0, 1, 'var_c1vqz17bpf' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 89900, 999, 'web-corporativa-5-secciones-pro', 1, 1, 'var_851yb969ac' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web para inmobiliaria', 'Escaparate de inmuebles con fichas, fotos y contacto directo con el agente.

## Qué recibes
- Listado de inmuebles con filtros
- Ficha por inmueble con galería
- Página de agentes
- Formulario de consulta

## Campos que rellenas
- Nombre de la agencia
- Inmuebles (precio, m², habitaciones, fotos)
- Agentes
- Zona de trabajo

## Ejemplo
> Inmobiliaria Costa: 12 pisos en venta con fotos, botón «Quiero visitarlo» y WhatsApp del agente.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 29900, 'eur', 999, 1, 'web-inmobiliaria', 'Modalidad', 0, 'prod_gwg6zbd8sj', datetime('2026-01-01', '-2 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-inmobiliaria' AND c.slug='webs';
UPDATE products SET image_key='productos/web-inmobiliaria.jpg' WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-inmobiliaria.jpg', 0, 'pimg_f9n1hakqvt' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/real-estate-agency.png', 1, 'pimg_q1nkwppc0j' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/vacation-rental.png', 2, 'pimg_x6chw4p1fd' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'web-inmobiliaria-diy', 0, 1, 'var_4wpjz2w2f1' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'web-inmobiliaria-pro', 1, 1, 'var_mxrh1mfm36' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Portfolio con panel para editarlo tú', 'Para fotógrafos, diseñadores, arquitectos o autónomos: cambias textos y fotos desde un panel, sin tocar código.

## Qué recibes
- Portfolio con proyectos y galería
- Panel de administración
- Formulario de contacto
- Alojamiento gratuito, sin cuota

## Campos que rellenas
- Nombre y profesión
- Proyectos (título, fotos, descripción)
- Biografía
- Redes sociales

## Ejemplo
> Marta, fotógrafa: 8 reportajes, sobre mí, tarifas y contacto. Ella sube los nuevos trabajos desde el móvil.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **179 €** | **349 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 17900, 'eur', 999, 1, 'portfolio-editable', 'Modalidad', 0, 'prod_hxbnakbvxt', datetime('2026-01-01', '-3 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portfolio-editable' AND c.slug='webs';
UPDATE products SET image_key='productos/portfolio-editable.jpg' WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portfolio-editable.jpg', 0, 'pimg_4rcb8hs5pj' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/portfolio-template.png', 1, 'pimg_phxew7wfwn' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 2, 'pimg_0n0e7p7hv3' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/architect-portfolio.png', 3, 'pimg_dzwr721jd0' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 17900, 999, 'portfolio-editable-diy', 0, 1, 'var_r4x2zg07k0' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'portfolio-editable-pro', 1, 1, 'var_kvawaq3k0x' FROM products WHERE slug='portfolio-editable';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web con blog rápida', 'Web ultrarrápida con blog para posicionar en Google y publicar artículos fácilmente.

## Qué recibes
- Web + blog con categorías
- Carga en menos de 1 segundo
- Sitemap y RSS
- 3 artículos iniciales (modalidad «Te lo montamos»)

## Campos que rellenas
- Temática
- Palabras clave
- Logo y colores
- Primeros temas del blog

## Ejemplo
> Clínica de fisioterapia con blog «Ejercicios para la espalda» que atrae visitas desde Google.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 24900, 'eur', 999, 1, 'web-blog-astro', 'Modalidad', 0, 'prod_5s6c8b3qe5', datetime('2026-01-01', '-4 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-blog-astro' AND c.slug='webs';
UPDATE products SET image_key='productos/web-blog-astro.jpg' WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-blog-astro.jpg', 0, 'pimg_v8a6y2rjk9' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 1, 'pimg_eqn9vp0gtv' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-blog-astro-diy', 0, 1, 'var_xaa6wd3zsb' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'web-blog-astro-pro', 1, 1, 'var_y8kmy5p53k' FROM products WHERE slug='web-blog-astro';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web para taller con cita previa', 'Taller mecánico, de bicis o de reparación: servicios, precios orientativos y cita online.

## Qué recibes
- Web con servicios y precios
- Calendario de citas
- Aviso de cada cita por email
- Mapa y horario

## Campos que rellenas
- Nombre del taller
- Servicios y duración
- Horario y huecos disponibles
- Fotos del taller

## Ejemplo
> Talleres Pérez: «Cambio de aceite – 45 min – desde 59 €» y el cliente reserva el hueco del jueves.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 24900, 'eur', 999, 1, 'web-taller', 'Modalidad', 0, 'prod_dnnfqhbq9n', datetime('2026-01-01', '-5 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-taller' AND c.slug='webs';
UPDATE products SET image_key='productos/web-taller.jpg' WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-taller.jpg', 0, 'pimg_v7zffaywr5' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/auto-repair.png', 1, 'pimg_p25d8dyg71' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plumber-home-services.png', 2, 'pimg_9zxgcmrsc0' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cleaning-company.png', 3, 'pimg_dcqcnzfz9k' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-taller-diy', 0, 1, 'var_rwf5dn2qwp' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-taller-pro', 1, 1, 'var_qm94nq3kv1' FROM products WHERE slug='web-taller';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Carta digital con código QR', 'Tu carta en el móvil del cliente con un QR en la mesa. Cambias tú los precios cuando quieras desde el móvil, sin coste y sin reimprimir.

## Qué recibes
- Carta digital por secciones
- QR listo para imprimir
- Alérgenos e idiomas
- Cambios ilimitados de precios

## Campos que rellenas
- Nombre del local
- Platos (nombre, precio, alérgenos)
- Fotos (opcional)
- Idiomas

## Ejemplo
> Bar La Esquina: QR en cada mesa → carta con tapas, raciones y bebidas, en español e inglés.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'carta-qr', 'Modalidad', 0, 'prod_shhbqwj9kc', datetime('2026-01-01', '-6 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-qr' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-qr.jpg' WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-qr.jpg', 0, 'pimg_4n84qnqsrb' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_bbxaz411rz' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 2, 'pimg_anp0b2c0g4' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cafe-coffee-shop.png', 3, 'pimg_fbcn866mp1' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/bar-lounge.png', 4, 'pimg_n34h488ma1' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'carta-qr-diy', 0, 1, 'var_kp1v6wfk3s' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'carta-qr-pro', 1, 1, 'var_qezjgxtgc7' FROM products WHERE slug='carta-qr';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Carta QR con pedidos por WhatsApp', 'El cliente elige en la carta, añade al carrito y el pedido te llega por WhatsApp ya escrito.

## Qué recibes
- Carta con carrito
- Pedido enviado a tu WhatsApp
- Opción recoger / a domicilio
- Sin comisiones por pedido

## Campos que rellenas
- Carta y precios
- Número de WhatsApp
- Zona y coste de envío
- Horario de pedidos

## Ejemplo
> Pizzería Nápoles: el cliente pide 2 pizzas y te llega «2× Margarita, recoger 21:00» al WhatsApp.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'carta-pedidos-whatsapp', 'Modalidad', 0, 'prod_s60kc7spgz', datetime('2026-01-01', '-7 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-pedidos-whatsapp' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-pedidos-whatsapp.jpg' WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-pedidos-whatsapp.jpg', 0, 'pimg_3f1q2m7y6j' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_4kmpfg9edq' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'carta-pedidos-whatsapp-diy', 0, 1, 'var_deek1k3knh' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'carta-pedidos-whatsapp-pro', 1, 1, 'var_ghcca5qcnd' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Reservas de mesa online', 'Sistema propio de reservas sin pagar comisión por comensal a plataformas.

## Qué recibes
- Página de reservas
- Panel para ver y confirmar reservas
- Avisos al cliente
- Control de aforo por turno

## Campos que rellenas
- Turnos y aforo
- Mesas
- Días de cierre
- Correo o teléfono de avisos

## Ejemplo
> Restaurante El Puerto: el cliente reserva para 4 el sábado a las 14:30 y tú lo ves en el panel.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'reservas-restaurante', 'Modalidad', 0, 'prod_7q9jxbzdaf', datetime('2026-01-01', '-8 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-restaurante' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/reservas-restaurante.jpg' WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-restaurante.jpg', 0, 'pimg_2tng2jez2a' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 1, 'pimg_n6b9w40j19' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/pizza-delivery.png', 2, 'pimg_t6bqdn16pp' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'reservas-restaurante-diy', 0, 1, 'var_qd58eyd41n' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'reservas-restaurante-pro', 1, 1, 'var_h5g290z435' FROM products WHERE slug='reservas-restaurante';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Asistente IA que toma pedidos', 'Un asistente que contesta dudas de la carta y toma pedidos por chat, 24 horas.

## Qué recibes
- Asistente entrenado con tu carta
- Respuestas sobre alérgenos y horarios
- Pedido resumido para cocina
- Informe de preguntas frecuentes

## Campos que rellenas
- Carta completa
- Preguntas frecuentes
- Horarios y zonas
- Canal (web, Telegram o WhatsApp)

## Ejemplo
> «¿Tenéis algo sin gluten?» → el asistente recomienda 3 platos y apunta el pedido.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 29900, 'eur', 999, 1, 'asistente-ia-pedidos', 'Modalidad', 0, 'prod_8syqm4vf63', datetime('2026-01-01', '-9 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='asistente-ia-pedidos' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/asistente-ia-pedidos.jpg' WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/asistente-ia-pedidos.jpg', 0, 'pimg_tm9vttc322' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/food-truck.png', 1, 'pimg_w6ecmkcyq4' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 2, 'pimg_kp4bc5hxn2' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'asistente-ia-pedidos-diy', 0, 1, 'var_pw4m9emyrh' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'asistente-ia-pedidos-pro', 1, 1, 'var_f8qzkbwgj0' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Página de citas tipo Calendly', 'Comparte un enlace y tus clientes reservan hueco en tu agenda. Sin cuotas por usuario.

## Qué recibes
- Página de reserva con tus huecos
- Tipos de cita (15, 30, 60 min…)
- Confirmación y recordatorio por email
- Enlace para tu web, Instagram o firma

## Campos que rellenas
- Tipos de cita y duración
- Horario disponible
- Correo de avisos
- Preguntas previas al cliente

## Ejemplo
> Coach Ana: enlace «Reserva tu sesión de 30 min» en su Instagram; las citas caen solas en su agenda.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 7900, 'eur', 999, 1, 'pagina-citas', 'Modalidad', 0, 'prod_57y9w1j9zb', datetime('2026-01-01', '-10 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pagina-citas' AND c.slug='reservas';
UPDATE products SET image_key='productos/pagina-citas.jpg' WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pagina-citas.jpg', 0, 'pimg_r007d9s3fm' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/physiotherapy.png', 1, 'pimg_t3przmff1n' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/dental-clinic.png', 2, 'pimg_8gjnkwywy7' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/nutritionist.png', 3, 'pimg_56vcbwaf1t' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'pagina-citas-diy', 0, 1, 'var_mwa7e9h1my' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'pagina-citas-pro', 1, 1, 'var_tesf21thxg' FROM products WHERE slug='pagina-citas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Reservas para peluquería, estética o clínica', 'Motor de reservas por servicio y profesional, con ficha de cliente.

## Qué recibes
- Reserva por servicio y profesional
- Ficha e historial de clientes
- Recordatorios
- Widget para tu web

## Campos que rellenas
- Servicios, duración y precio
- Profesionales y horarios
- Política de cancelación

## Ejemplo
> Centro Bella: «Manicura con Laura – martes 17:00 – 25 €», con recordatorio el día antes.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 19900, 'eur', 999, 1, 'reservas-salon', 'Modalidad', 0, 'prod_s824yd5mcn', datetime('2026-01-01', '-11 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-salon' AND c.slug='reservas';
UPDATE products SET image_key='productos/reservas-salon.jpg' WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-salon.jpg', 0, 'pimg_dgxmjktvge' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/spa-salon.png', 1, 'pimg_djw9m4mzk3' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/yoga-studio.png', 2, 'pimg_jhsaard6bg' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/gym-fitness.png', 3, 'pimg_ywc07djts9' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'reservas-salon-diy', 0, 1, 'var_pycg3eqd6b' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'reservas-salon-pro', 1, 1, 'var_h5bvtkcxcg' FROM products WHERE slug='reservas-salon';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de boda con confirmación de asistencia', 'Toda la información de la boda en una web y los invitados confirman asistencia y menú.

## Qué recibes
- Web con historia, programa, cómo llegar y alojamiento
- Formulario de confirmación de asistencia con menú y alergias
- Lista de confirmados descargable
- Preguntas frecuentes

## Campos que rellenas
- Nombres y fecha
- Lugar de ceremonia y banquete
- Programa del día
- Fotos
- Opciones de menú

## Ejemplo
> Lucía & Pablo: 140 invitados confirman desde el móvil y descargáis el Excel para el catering.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'web-boda-rsvp', 'Modalidad', 0, 'prod_280htfxhq8', datetime('2026-01-01', '-12 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-boda-rsvp' AND c.slug='bodas';
UPDATE products SET image_key='productos/web-boda-rsvp.jpg' WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-boda-rsvp.jpg', 0, 'pimg_10ww300fwg' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 1, 'pimg_tmjjvdde4t' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/wedding.png', 2, 'pimg_1fptpa2djy' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-blush.png', 3, 'pimg_j5dts3jrkx' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-midnight.png', 4, 'pimg_ck9svbn8rg' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'web-boda-rsvp-diy', 0, 1, 'var_z2y19wrfym' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-boda-rsvp-pro', 1, 1, 'var_nm4mbw0gwx' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Invitación digital animada', 'Invitación para enviar por WhatsApp: cuenta atrás, ubicación y botón para confirmar.

## Qué recibes
- Invitación web animada
- Cuenta atrás
- Botón de mapa y confirmación
- Enlace para compartir

## Campos que rellenas
- Tipo de evento
- Nombres
- Fecha, hora y lugar
- Foto o estilo

## Ejemplo
> Bautizo de Hugo: enlace por WhatsApp con foto, cuenta atrás y «Confirmo asistencia».

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'invitacion-digital', 'Modalidad', 0, 'prod_chd6m4pm64', datetime('2026-01-01', '-13 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='invitacion-digital' AND c.slug='bodas';
UPDATE products SET image_key='productos/invitacion-digital.jpg' WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/invitacion-digital.jpg', 0, 'pimg_nhm9eg8k01' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/weekend-itinerary.png', 1, 'pimg_ndvgcfyh53' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-sage.png', 2, 'pimg_48acawpmh4' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'invitacion-digital-diy', 0, 1, 'var_mtevw3mg67' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'invitacion-digital-pro', 1, 1, 'var_pamahxt723' FROM products WHERE slug='invitacion-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Galería privada de fotos del evento', 'Álbum privado con enlace: los invitados ven y suben sus fotos, tú las descargas todas.

## Qué recibes
- Galería privada con enlace
- Subida de fotos de invitados
- Favoritas y descarga
- Panel de administración

## Campos que rellenas
- Nombre del evento
- Fotos iniciales
- Contraseña o enlace privado

## Ejemplo
> Tras la boda, 300 fotos de invitados reunidas en un solo álbum privado.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **69 €** | **149 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 6900, 'eur', 999, 1, 'galeria-privada-evento', 'Modalidad', 0, 'prod_gqcx48vc37', datetime('2026-01-01', '-14 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='galeria-privada-evento' AND c.slug='bodas';
UPDATE products SET image_key='productos/galeria-privada-evento.jpg' WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/galeria-privada-evento.jpg', 0, 'pimg_wtb77bk3bp' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 1, 'pimg_6e797w3z9a' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 6900, 999, 'galeria-privada-evento-diy', 0, 1, 'var_dfk303awbr' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'galeria-privada-evento-pro', 1, 1, 'var_qps36xt3sx' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Gestión de invitados y plano de mesas', 'Lista de invitados, confirmaciones, llamadas pendientes y plano de mesas en PDF.

## Qué recibes
- Panel de invitados
- Seguimiento de confirmaciones
- Plano de mesas imprimible
- Exportación a Excel

## Campos que rellenas
- Lista de invitados
- Número de mesas y capacidad
- Restricciones (quién no con quién)

## Ejemplo
> Plano de 15 mesas generado en PDF para el restaurante a partir de las confirmaciones.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 7900, 'eur', 999, 1, 'gestion-invitados-mesas', 'Modalidad', 0, 'prod_hfjhqmjnnf', datetime('2026-01-01', '-15 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='gestion-invitados-mesas' AND c.slug='bodas';
UPDATE products SET image_key='productos/gestion-invitados-mesas.jpg' WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/gestion-invitados-mesas.jpg', 0, 'pimg_w120dkm9v9' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 1, 'pimg_jzdet8a368' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/registry-template.png', 2, 'pimg_t2a69we752' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'gestion-invitados-mesas-diy', 0, 1, 'var_dxg0412vkg' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'gestion-invitados-mesas-pro', 1, 1, 'var_9p8mccgbgz' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tarjeta de visita digital con QR', 'Tu tarjeta en el móvil: un QR y el cliente guarda tu contacto con un toque.

## Qué recibes
- Tarjeta web personal
- Botón «Guardar contacto» (vCard)
- QR para imprimir
- Enlaces a redes y WhatsApp

## Campos que rellenas
- Nombre y cargo
- Foto
- Teléfono, email y web
- Redes sociales

## Ejemplo
> Javier, comercial: enseña el QR en una feria y el contacto queda guardado en el móvil del cliente.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'tarjeta-digital', 'Modalidad', 0, 'prod_651wfk5khx', datetime('2026-01-01', '-16 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tarjeta-digital' AND c.slug='identidad';
UPDATE products SET image_key='productos/tarjeta-digital.jpg' WHERE slug='tarjeta-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tarjeta-digital.jpg', 0, 'pimg_hyjmgkr00c' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'tarjeta-digital-diy', 0, 1, 'var_33kt1q3474' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'tarjeta-digital-pro', 1, 1, 'var_5ttj5z30tz' FROM products WHERE slug='tarjeta-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Página de enlaces para tu bio con estadísticas', 'Tu alternativa a Linktree, en tu dominio y sin cuota mensual, con clics medidos.

## Qué recibes
- Página de enlaces con tu marca
- Estadísticas de clics
- Bloques de vídeo, formulario y productos
- Panel para editar

## Campos que rellenas
- Nombre o marca
- Foto / logo
- Enlaces con su texto
- Colores

## Ejemplo
> Creadora de recetas: enlace en Instagram con su libro, YouTube y newsletter, y sabe cuál funciona.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'link-in-bio', 'Modalidad', 0, 'prod_p380kbg6ha', datetime('2026-01-01', '-17 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='link-in-bio' AND c.slug='identidad';
UPDATE products SET image_key='productos/link-in-bio.jpg' WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/link-in-bio.jpg', 0, 'pimg_bghd274tbg' FROM products WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/link-in-bio.png', 1, 'pimg_hxamjpgf3z' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'link-in-bio-diy', 0, 1, 'var_c6xg4a499j' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'link-in-bio-pro', 1, 1, 'var_m2g9bt79cs' FROM products WHERE slug='link-in-bio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Currículum profesional en PDF que pasa los filtros de empresas', 'CV preparado para pasar los filtros automáticos de selección, en PDF y Word.

## Qué recibes
- CV en PDF y Word
- Plantilla a elegir
- Palabras clave para pasar los filtros automáticos de selección
- Versión web opcional

## Campos que rellenas
- Experiencia
- Formación
- Habilidades
- Puesto al que aspiras

## Ejemplo
> Elena, enfermera: CV de 1 página con las palabras clave de la oferta del hospital.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'cv-profesional', 'Modalidad', 0, 'prod_5ba50nb19g', datetime('2026-01-01', '-18 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='cv-profesional' AND c.slug='identidad';
UPDATE products SET image_key='productos/cv-profesional.jpg' WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/cv-profesional.jpg', 0, 'pimg_3xy9na6f2e' FROM products WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/resume-cv.png', 1, 'pimg_rwtaybr8pg' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'cv-profesional-diy', 0, 1, 'var_3z1qcnj9vx' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'cv-profesional-pro', 1, 1, 'var_b62vgtx22x' FROM products WHERE slug='cv-profesional';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Muro de opiniones de clientes', 'Recoge opiniones con un enlace, apruébalas y muéstralas en tu web.

## Qué recibes
- Formulario para dejar opinión
- Panel para aprobar
- Muro/widget para tu web
- Opiniones con foto y estrellas

## Campos que rellenas
- Nombre del negocio
- Preguntas para el cliente
- Web donde insertarlo

## Ejemplo
> Academia de inglés: tras cada curso envía el enlace y las mejores opiniones salen en su portada.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **119 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'muro-testimonios', 'Modalidad', 0, 'prod_zwchb5rs68', datetime('2026-01-01', '-19 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='muro-testimonios' AND c.slug='identidad';
UPDATE products SET image_key='productos/muro-testimonios.jpg' WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/muro-testimonios.jpg', 0, 'pimg_nv2np7j6br' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_9eyx5dkb1e' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'muro-testimonios-diy', 0, 1, 'var_dnpd04zjhb' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 11900, 999, 'muro-testimonios-pro', 1, 1, 'var_ycd6zc141p' FROM products WHERE slug='muro-testimonios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Formulario de contacto con aviso al móvil', 'Cada mensaje de tu web te llega al instante por Telegram o email, con antispam.

## Qué recibes
- Formulario listo para tu web
- Aviso por Telegram y/o email
- Protección antispam
- Histórico de mensajes

## Campos que rellenas
- Campos del formulario
- Canal de aviso
- Web donde va

## Ejemplo
> Fontanero: «Nueva consulta: fuga en cocina, Calle Mayor 3» le llega al Telegram en 2 segundos.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'formulario-aviso-telegram', 'Modalidad', 0, 'prod_fqvx3vp652', datetime('2026-01-01', '-20 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='formulario-aviso-telegram' AND c.slug='captacion';
UPDATE products SET image_key='productos/formulario-aviso-telegram.jpg' WHERE slug='formulario-aviso-telegram';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/formulario-aviso-telegram.jpg', 0, 'pimg_2vvgvcf5m0' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'formulario-aviso-telegram-diy', 0, 1, 'var_z61cssxxm4' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'formulario-aviso-telegram-pro', 1, 1, 'var_rkaeas9gx2' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Lista de espera con referidos', 'Para lanzamientos: la gente se apunta, comparte su enlace y sube puestos en la lista.

## Qué recibes
- Página de lista de espera
- Enlace de referido por persona
- Ranking y exportación
- Correo de bienvenida

## Campos que rellenas
- Nombre del producto
- Fecha de lanzamiento
- Premio por referidos

## Ejemplo
> Nueva app de recetas: 1.200 apuntados antes de abrir, 40 % llegados por referidos.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 7900, 'eur', 999, 1, 'lista-espera', 'Modalidad', 0, 'prod_6z4n8ttem0', datetime('2026-01-01', '-21 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='lista-espera' AND c.slug='captacion';
UPDATE products SET image_key='productos/lista-espera.jpg' WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/lista-espera.jpg', 0, 'pimg_j5ghma2rdp' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/coming-soon.png', 1, 'pimg_xx5x5s5y5j' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/webinar-signup.png', 2, 'pimg_eq9kv9szda' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'lista-espera-diy', 0, 1, 'var_zkqw6zt4ej' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'lista-espera-pro', 1, 1, 'var_7k84z4rjks' FROM products WHERE slug='lista-espera';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Avisos automáticos por varios canales', 'Cualquier evento de tus herramientas (pago, formulario, pedido) avisa a Slack, Telegram, Discord o email.

## Qué recibes
- Bandeja de eventos
- Reglas de aviso por canal
- Histórico consultable

## Campos que rellenas
- Herramientas que envían eventos
- Canales de aviso
- Qué eventos interesan

## Ejemplo
> Cada venta de la tienda manda «🎉 Nueva venta 49 €» al grupo de Telegram del equipo.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **59 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 5900, 'eur', 999, 1, 'avisos-multicanal', 'Modalidad', 0, 'prod_wbgf15x2t1', datetime('2026-01-01', '-22 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='avisos-multicanal' AND c.slug='captacion';
UPDATE products SET image_key='productos/avisos-multicanal.jpg' WHERE slug='avisos-multicanal';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/avisos-multicanal.jpg', 0, 'pimg_de5qw39mfd' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 5900, 999, 'avisos-multicanal-diy', 0, 1, 'var_4a7z9dhsrz' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'avisos-multicanal-pro', 1, 1, 'var_t4cvqrsen2' FROM products WHERE slug='avisos-multicanal';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Bot de Telegram con IA', 'Un asistente con IA en Telegram para tu negocio o comunidad, con tus instrucciones.

## Qué recibes
- Bot de Telegram publicado
- Personalidad e instrucciones a medida
- Control de quién puede usarlo
- Alojamiento sin servidor

## Campos que rellenas
- Nombre del bot
- Para qué sirve
- Instrucciones/tono
- Usuarios permitidos

## Ejemplo
> Gimnasio: bot que responde horarios, tarifas y ejercicios a los socios a cualquier hora.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'bot-telegram-chatgpt', 'Modalidad', 0, 'prod_k0gq6cse56', datetime('2026-01-01', '-23 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-chatgpt' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-chatgpt.jpg' WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-chatgpt.jpg', 0, 'pimg_hm2ydkaczc' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'bot-telegram-chatgpt-diy', 0, 1, 'var_7fhc40qwvj' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'bot-telegram-chatgpt-pro', 1, 1, 'var_matmgmed52' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Bot de Telegram con menús y pedidos', 'Bot con botones: catálogo, reservas, avisos y pedidos, conectado a tu hoja de cálculo.

## Qué recibes
- Bot con menús de botones
- Conexión con Google Sheets
- Avisos programados
- Panel de mensajes

## Campos que rellenas
- Opciones del menú
- Datos (productos, horarios)
- Quién recibe los pedidos

## Ejemplo
> Panadería: el cliente pulsa «Encargar», elige pan y hora, y el pedido cae en la hoja del obrador.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 24900, 'eur', 999, 1, 'bot-telegram-medida', 'Modalidad', 0, 'prod_c1s2j820m3', datetime('2026-01-01', '-24 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-medida' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-medida.jpg' WHERE slug='bot-telegram-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-medida.jpg', 0, 'pimg_pstdfmesyv' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'bot-telegram-medida-diy', 0, 1, 'var_e5516eq5vv' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'bot-telegram-medida-pro', 1, 1, 'var_4akhpqkrjc' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('CRM de WhatsApp para tu equipo', 'Bandeja compartida de WhatsApp: varios agentes, contactos, embudo de ventas y envíos masivos.

## Qué recibes
- Bandeja compartida
- Contactos y etiquetas
- Embudo de oportunidades
- Difusiones

## Campos que rellenas
- Números de WhatsApp Business
- Agentes
- Etapas de venta

## Ejemplo
> Autoescuela: 3 personas atienden el mismo WhatsApp y nadie responde dos veces al mismo alumno.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **699 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 29900, 'eur', 999, 1, 'crm-whatsapp', 'Modalidad', 0, 'prod_d4s4ph31bp', datetime('2026-01-01', '-25 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='crm-whatsapp' AND c.slug='bots';
UPDATE products SET image_key='productos/crm-whatsapp.jpg' WHERE slug='crm-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/crm-whatsapp.jpg', 0, 'pimg_ypps947a2p' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'crm-whatsapp-diy', 0, 1, 'var_7sfp8bwx1f' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 69900, 999, 'crm-whatsapp-pro', 1, 1, 'var_bkjgbktwp4' FROM products WHERE slug='crm-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Captación de clientes automática', 'Formulario → hoja de cálculo → email de bienvenida → aviso a tu móvil. Sin copiar y pegar.

## Qué recibes
- Flujo n8n importado y probado
- Registro en Google Sheets
- Correo automático al cliente
- Aviso a Telegram

## Campos que rellenas
- Formulario de origen
- Hoja de destino
- Texto del email
- Canal de aviso

## Ejemplo
> Academia: cada interesado queda en la hoja, recibe el temario y tú te enteras al momento.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'auto-captacion-leads', 'Modalidad', 0, 'prod_b9p1htegec', datetime('2026-01-01', '-26 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-captacion-leads' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-captacion-leads.jpg' WHERE slug='auto-captacion-leads';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-captacion-leads.jpg', 0, 'pimg_8tc0pje6p7' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'auto-captacion-leads-diy', 0, 1, 'var_7ft02jntym' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-captacion-leads-pro', 1, 1, 'var_6gavh7jzwn' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Facturas recibidas a hoja de cálculo', 'Las facturas que llegan al email se leen solas y se apuntan en tu hoja: proveedor, fecha, importe, IVA.

## Qué recibes
- Flujo que vigila tu email
- Extracción automática de datos
- Hoja de cálculo ordenada
- Copia del PDF en tu nube

## Campos que rellenas
- Correo donde llegan las facturas
- Hoja de destino
- Campos a extraer

## Ejemplo
> Autónomo: a final de trimestre tiene todas las facturas apuntadas para la gestoría.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'auto-facturas', 'Modalidad', 0, 'prod_feepshfkw3', datetime('2026-01-01', '-27 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-facturas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-facturas.jpg' WHERE slug='auto-facturas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-facturas.jpg', 0, 'pimg_xee341hfg5' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'auto-facturas-diy', 0, 1, 'var_849bhstxje' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-facturas-pro', 1, 1, 'var_sdpggbngqs' FROM products WHERE slug='auto-facturas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Resumen semanal de reseñas', 'Cada lunes recibes un resumen con IA de lo que dicen tus clientes: lo bueno, lo malo y qué responder.

## Qué recibes
- Flujo semanal programado
- Resumen con IA
- Borradores de respuesta
- Envío por email o Telegram

## Campos que rellenas
- Dónde están tus reseñas
- Correo o Telegram de destino

## Ejemplo
> Hotel rural: «Esta semana 12 reseñas, 2 quejas por el wifi», con respuesta sugerida.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'auto-resenas', 'Modalidad', 0, 'prod_j06zjvmjq6', datetime('2026-01-01', '-28 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-resenas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-resenas.jpg' WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-resenas.jpg', 0, 'pimg_nwz9h84e8z' FROM products WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_nnb89851rz' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'auto-resenas-diy', 0, 1, 'var_r8gz6hhea3' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-resenas-pro', 1, 1, 'var_4nm5sdtrj5' FROM products WHERE slug='auto-resenas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Una automatización a elegir del catálogo', 'Elige entre más de 280 flujos probados (Gmail, WhatsApp, Notion, Drive, IA…) y lo dejamos funcionando con tus cuentas.

## Qué recibes
- Flujo instalado y conectado
- Prueba con datos reales
- Guía de uso de 1 página

## Campos que rellenas
- Qué tarea repetitiva quieres quitarte
- Herramientas que usas
- Accesos (te guiamos)

## Ejemplo
> Guardar adjuntos de Gmail en Drive por cliente, o publicar en redes lo que subes al blog.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'auto-plantilla-medida', 'Modalidad', 0, 'prod_qwgcvtgfz0', datetime('2026-01-01', '-29 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-plantilla-medida' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-plantilla-medida.jpg' WHERE slug='auto-plantilla-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-plantilla-medida.jpg', 0, 'pimg_pw9qfg7274' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'auto-plantilla-medida-diy', 0, 1, 'var_23d0a8qycs' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-plantilla-medida-pro', 1, 1, 'var_s6b7w4bvk6' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tareas programadas en la nube', 'Procesos que se ejecutan solos cada hora/día: copias, informes, sincronizaciones, recordatorios.

## Qué recibes
- Proceso en la nube con reintentos
- Registro de ejecuciones
- Aviso si algo falla

## Campos que rellenas
- Qué hay que hacer
- Cada cuánto
- Origen y destino de los datos

## Ejemplo
> Cada noche se copian los pedidos del día a la hoja de contabilidad y se envía el total por email.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 19900, 'eur', 999, 1, 'auto-tareas-programadas', 'Modalidad', 0, 'prod_3g7gsxx5y5', datetime('2026-01-01', '-30 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-tareas-programadas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-tareas-programadas.jpg' WHERE slug='auto-tareas-programadas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-tareas-programadas.jpg', 0, 'pimg_x0bdaabeac' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'auto-tareas-programadas-diy', 0, 1, 'var_sfkzbqx2tj' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'auto-tareas-programadas-pro', 1, 1, 'var_g4py8jd4k6' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Acortador de enlaces con tu dominio', 'Enlaces cortos de marca (tunegocio.es/oferta) con estadísticas de clics y QR.

## Qué recibes
- Acortador en tu dominio
- Estadísticas por enlace
- QR por enlace
- Panel de gestión

## Campos que rellenas
- Dominio o subdominio
- Primeros enlaces

## Ejemplo
> Campaña de flyers con tunegocio.es/verano: sabes cuántos escanearon el QR y desde dónde.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'acortador-enlaces', 'Modalidad', 0, 'prod_6q27rvx1ne', datetime('2026-01-01', '-31 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='acortador-enlaces' AND c.slug='enlaces';
UPDATE products SET image_key='productos/acortador-enlaces.jpg' WHERE slug='acortador-enlaces';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/acortador-enlaces.jpg', 0, 'pimg_97pf6ddsbs' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'acortador-enlaces-diy', 0, 1, 'var_w9kg6hsnvq' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'acortador-enlaces-pro', 1, 1, 'var_3sh9xh3pqw' FROM products WHERE slug='acortador-enlaces';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pack de códigos QR para campañas', 'QR en vector listos para imprenta, con enlace editable y medición.

## Qué recibes
- Hasta 10 QR en SVG/PNG
- Enlaces editables después de imprimir
- Medición de escaneos

## Campos que rellenas
- Destinos de cada QR
- Colores / logo

## Ejemplo
> QR en escaparate, carta y tarjetas, cada uno medido por separado.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1900, 'eur', 999, 1, 'qr-campanas', 'Modalidad', 0, 'prod_8rh1rsqygm', datetime('2026-01-01', '-32 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='qr-campanas' AND c.slug='enlaces';
UPDATE products SET image_key='productos/qr-campanas.jpg' WHERE slug='qr-campanas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/qr-campanas.jpg', 0, 'pimg_by7j95ncew' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'qr-campanas-diy', 0, 1, 'var_1q7etdp0rj' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'qr-campanas-pro', 1, 1, 'var_bd84sbz9dt' FROM products WHERE slug='qr-campanas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Analítica web sin cookies', 'Sabe cuántas visitas tienes y de dónde vienen, sin banner de cookies molesto.

## Qué recibes
- Panel de analítica privado
- Instalación en tu web
- Informe mensual por email (con plan)

## Campos que rellenas
- Web(s) a medir
- Correo para informes

## Ejemplo
> Tienda local: «este mes 2.300 visitas, 40 % desde Instagram, la página más vista es Ofertas».

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'analitica-sin-cookies', 'Modalidad', 0, 'prod_vbqsch714s', datetime('2026-01-01', '-33 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='analitica-sin-cookies' AND c.slug='enlaces';
UPDATE products SET image_key='productos/analitica-sin-cookies.jpg' WHERE slug='analitica-sin-cookies';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/analitica-sin-cookies.jpg', 0, 'pimg_p8n52s6gp5' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'analitica-sin-cookies-diy', 0, 1, 'var_dt0mckynvt' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'analitica-sin-cookies-pro', 1, 1, 'var_zwwv5hhjwg' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tienda de productos digitales', 'Vende ebooks, plantillas, cursos o presets: el cliente paga y descarga al momento.

## Qué recibes
- Tienda con pago online
- Entrega automática del archivo
- Panel de pedidos
- Correos de compra

## Campos que rellenas
- Productos y precios
- Archivos a entregar
- Cuenta de cobro (Stripe)

## Ejemplo
> Diseñadora vende packs de plantillas de Canva a 9 € con descarga instantánea.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 29900, 'eur', 999, 1, 'tienda-productos-digitales', 'Modalidad', 0, 'prod_4pcycdensg', datetime('2026-01-01', '-34 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-productos-digitales' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-productos-digitales.jpg' WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-productos-digitales.jpg', 0, 'pimg_cxf2s8evsq' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ebook-download.png', 1, 'pimg_v1hwxchn4e' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tienda-descargas.png', 2, 'pimg_c87kccegzt' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'tienda-productos-digitales-diy', 0, 1, 'var_pwme1dxqyc' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'tienda-productos-digitales-pro', 1, 1, 'var_3f09yjwd3v' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tienda online completa', 'Catálogo, variantes, carrito, pagos, envíos y panel de pedidos. Sin comisiones de plataforma.

## Qué recibes
- Tienda con tu marca
- Pagos con tarjeta
- Gestión de stock y envíos
- Panel de administración

## Campos que rellenas
- Productos, variantes y fotos
- Tarifas de envío
- Datos legales
- Cuenta de cobro

## Ejemplo
> Tienda de cerámica artesana con 40 productos, envío a península y aviso de cada venta.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **499 €** | **999 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 49900, 'eur', 999, 1, 'tienda-online', 'Modalidad', 0, 'prod_df55arjvbj', datetime('2026-01-01', '-35 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-online' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-online.jpg' WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-online.jpg', 0, 'pimg_vd7ey22j5t' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/fashion-store.png', 1, 'pimg_6qjse60qy6' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cosmetics-skincare-store.png', 2, 'pimg_pnd3jggpa5' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/single-product-store.png', 3, 'pimg_wq9gchrq8y' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 49900, 999, 'tienda-online-diy', 0, 1, 'var_hs8kz853mm' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99900, 999, 'tienda-online-pro', 1, 1, 'var_xj3jg1favk' FROM products WHERE slug='tienda-online';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Marketplace de productos digitales', 'Plataforma donde varios creadores venden plantillas, presets o cursos y tú cobras comisión.

## Qué recibes
- Marketplace multivendedor
- Previsualizaciones
- Pagos y descargas protegidas
- Panel de vendedores

## Campos que rellenas
- Nombre y nicho
- Comisión
- Categorías
- Primeros vendedores

## Ejemplo
> Marketplace de plantillas de Notion para estudiantes con 15 creadores.

**Plazo:** vista previa en 24-72 h laborables; entrega en 10 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **699 €** | **1299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 69900, 'eur', 999, 1, 'marketplace-plantillas', 'Modalidad', 0, 'prod_5p0vv7nthf', datetime('2026-01-01', '-36 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='marketplace-plantillas' AND c.slug='tiendas';
UPDATE products SET image_key='productos/marketplace-plantillas.jpg' WHERE slug='marketplace-plantillas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/marketplace-plantillas.jpg', 0, 'pimg_52decg0mx5' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 69900, 999, 'marketplace-plantillas-diy', 0, 1, 'var_hmc2wghfv9' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 129900, 999, 'marketplace-plantillas-pro', 1, 1, 'var_a0fmary3c0' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Portal de clientes para agencias y autónomos', 'Tus clientes entran con su usuario y ven proyectos, archivos, facturas y avances.

## Qué recibes
- Portal con tu marca
- Proyectos y tareas
- Archivos compartidos
- Facturas y presupuestos

## Campos que rellenas
- Logo y colores
- Clientes y proyectos iniciales
- Servicios que facturas

## Ejemplo
> Estudio de diseño: el cliente ve «Logo – fase 2 de 3» y descarga las propuestas.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 29900, 'eur', 999, 1, 'portal-cliente', 'Modalidad', 0, 'prod_01pbrb8eyv', datetime('2026-01-01', '-37 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portal-cliente' AND c.slug='portales';
UPDATE products SET image_key='productos/portal-cliente.jpg' WHERE slug='portal-cliente';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portal-cliente.jpg', 0, 'pimg_47y2ne48mt' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'portal-cliente-diy', 0, 1, 'var_jkn9rnfmmv' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'portal-cliente-pro', 1, 1, 'var_34v4jajmsp' FROM products WHERE slug='portal-cliente';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web a medida con editor visual completo', 'Web con editor visual: cambias textos, imágenes y secciones arrastrando, como en Wix, pero tuya.

## Qué recibes
- Web con editor visual
- Bloques prediseñados
- Formación de 30 min
- Alojamiento propio

## Campos que rellenas
- Secciones que necesitas
- Contenido inicial
- Quién la editará

## Ejemplo
> Asociación cultural: la junta cambia la agenda de actividades cada semana sin depender de nadie.

**Plazo:** vista previa en 24-72 h laborables; entrega en 7 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **399 €** | **799 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 39900, 'eur', 999, 1, 'web-editable-visual', 'Modalidad', 0, 'prod_ea229qapg5', datetime('2026-01-01', '-38 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-editable-visual' AND c.slug='portales';
UPDATE products SET image_key='productos/web-editable-visual.jpg' WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-editable-visual.jpg', 0, 'pimg_1tmrmvh16q' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/editor-bloques.png', 1, 'pimg_pczd8k75n0' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 39900, 999, 'web-editable-visual-diy', 0, 1, 'var_4gbk2yfjey' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 79900, 999, 'web-editable-visual-pro', 1, 1, 'var_g9jg3s8w1g' FROM products WHERE slug='web-editable-visual';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Mantenimiento web (mes)', 'Nos ocupamos de que tu web siga funcionando: copias, actualizaciones y pequeños cambios.

## Qué recibes
- Copias de seguridad
- Actualizaciones de seguridad
- 30 min de cambios al mes
- Vigilancia de caídas

## Campos que rellenas
- Web a mantener
- Accesos (te guiamos)

## Ejemplo
> Cambiar el horario de verano o subir la nueva carta: nos lo mandas y está hecho.

**Plazo:** puesta en marcha en 24-72 h laborables; después, servicio mensual.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1900, 'eur', 999, 1, 'plan-mantenimiento-web', NULL, 0, 'prod_92aspje3m3', datetime('2026-01-01', '-39 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-mantenimiento-web' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-mantenimiento-web.jpg' WHERE slug='plan-mantenimiento-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-mantenimiento-web.jpg', 0, 'pimg_bw5n569nqv' FROM products WHERE slug='plan-mantenimiento-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Alojamiento + dominio gestionado (mes)', 'Tu web publicada con candado de seguridad (https) y tu dominio, sin preocuparte de renovaciones.

## Qué recibes
- Alojamiento rápido con SSL
- Gestión del dominio
- Correo de reenvío

## Campos que rellenas
- Dominio deseado
- Web a alojar

## Ejemplo
> tunegocio.es apuntando a tu web, renovado cada año sin que tengas que hacer nada.

**Plazo:** puesta en marcha en 24-72 h laborables; después, servicio mensual.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 900, 'eur', 999, 1, 'plan-hosting-dominio', NULL, 0, 'prod_e6d3k96va3', datetime('2026-01-01', '-40 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-hosting-dominio' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-hosting-dominio.jpg' WHERE slug='plan-hosting-dominio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-hosting-dominio.jpg', 0, 'pimg_68afxrxd52' FROM products WHERE slug='plan-hosting-dominio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Automatizaciones vigiladas (mes)', 'Mantenemos tus automatizaciones en marcha: si una falla, la arreglamos antes de que lo notes.

## Qué recibes
- Servidor n8n/Activepieces gestionado
- Vigilancia de errores
- 1 flujo nuevo pequeño al mes

## Campos que rellenas
- Automatizaciones actuales
- Canal de aviso

## Ejemplo
> El token de Google caduca un viernes por la noche: lo renovamos y el flujo sigue.

**Plazo:** puesta en marcha en 24-72 h laborables; después, servicio mensual.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'plan-automatizaciones', NULL, 0, 'prod_jf3d4mp22q', datetime('2026-01-01', '-41 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-automatizaciones' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-automatizaciones.jpg' WHERE slug='plan-automatizaciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-automatizaciones.jpg', 0, 'pimg_1sk5cyke6t' FROM products WHERE slug='plan-automatizaciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Auditoría web exprés', 'Informe claro de velocidad, SEO, móvil y accesibilidad de tu web, con lo que hay que arreglar primero.

## Qué recibes
- Informe PDF de 5–8 páginas
- Lista priorizada de mejoras
- Presupuesto cerrado para arreglarlo

## Campos que rellenas
- URL de la web
- Objetivo (más ventas, más llamadas…)

## Ejemplo
> «Tu web tarda 6 s en móvil por 3 imágenes de 4 MB: arreglarlo sube las llamadas».

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'auditoria-web', NULL, 0, 'prod_nas11aeang', datetime('2026-01-01', '-42 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auditoria-web' AND c.slug='planes';
UPDATE products SET image_key='productos/auditoria-web.jpg' WHERE slug='auditoria-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auditoria-web.jpg', 0, 'pimg_q5czwfjfh3' FROM products WHERE slug='auditoria-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Aviso si tu web se cae + página de estado', 'Comprobamos tu web cada minuto y te avisamos al móvil si deja de funcionar, con una página pública de estado.

## Qué recibes
- Vigilancia cada 60 s de webs, tiendas o reservas
- Aviso por Telegram o email
- Página de estado con tu logo
- Informe mensual de disponibilidad

## Campos que rellenas
- Webs a vigilar (URLs)
- Canal de aviso (Telegram / email)
- Logo

## Ejemplo
> La tienda de Ana cae un sábado a las 23:10; a las 23:11 le llega «tienda caída» al Telegram y lo arreglamos.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'vigilancia-caidas', 'Modalidad', 0, 'prod_bbv46rbee3', datetime('2026-01-01', '-43 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-caidas' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-caidas.jpg' WHERE slug='vigilancia-caidas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-caidas.jpg', 0, 'pimg_kyydz5phax' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'vigilancia-caidas-diy', 0, 1, 'var_v0va1x3331' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'vigilancia-caidas-pro', 1, 1, 'var_g9vk72tk3s' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Generador de facturas y presupuestos con tu marca', 'Rellenas cliente y conceptos, y sale una factura o presupuesto en PDF con tu logo, IVA calculado y numeración.

## Qué recibes
- Generador web propio (tuyo, sin cuotas)
- Plantilla con tu logo y datos fiscales
- Descarga en PDF y envío por email
- Guía de uso de 1 página

## Campos que rellenas
- Razón social y NIF
- Logo y colores
- Tipos de IVA / IRPF que usas
- Formato de numeración

## Ejemplo
> Electricista autónomo: «Presupuesto P-2026-014 · cambio de cuadro · 380 € + IVA» enviado al cliente en 2 minutos desde el móvil.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 7900, 'eur', 999, 1, 'facturas-presupuestos', 'Modalidad', 0, 'prod_5bw4sz45vr', datetime('2026-01-01', '-44 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='facturas-presupuestos' AND c.slug='documentos';
UPDATE products SET image_key='productos/facturas-presupuestos.jpg' WHERE slug='facturas-presupuestos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/facturas-presupuestos.jpg', 0, 'pimg_d1cyszdqpg' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'facturas-presupuestos-diy', 0, 1, 'var_mwbg69pakr' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'facturas-presupuestos-pro', 1, 1, 'var_dn74b0bha6' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Diplomas y certificados en PDF automáticos', 'Para academias, cursos y eventos: subes la lista de alumnos y cada uno recibe su certificado personalizado.

## Qué recibes
- Plantilla de diploma con tu diseño
- Generación masiva desde una hoja de cálculo
- Envío automático por email
- Código QR de verificación

## Campos que rellenas
- Logo y firma
- Texto del certificado
- Hoja con nombres, correos y horas
- Correo remitente

## Ejemplo
> Academia de inglés: 120 alumnos terminan el curso y en 5 minutos cada uno tiene su diploma con QR en el correo.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **229 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'certificados-automaticos', 'Modalidad', 0, 'prod_41b6st524a', datetime('2026-01-01', '-45 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='certificados-automaticos' AND c.slug='documentos';
UPDATE products SET image_key='productos/certificados-automaticos.jpg' WHERE slug='certificados-automaticos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/certificados-automaticos.jpg', 0, 'pimg_b098j8c7gp' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'certificados-automaticos-diy', 0, 1, 'var_r9y7tftwfd' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 22900, 999, 'certificados-automaticos-pro', 1, 1, 'var_18b7sp9vj0' FROM products WHERE slug='certificados-automaticos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Transcripción automática de audios y reuniones', 'Mandas un audio o una grabación y recibes el texto y un resumen con tareas. Funciona con audios de WhatsApp.

## Qué recibes
- Carpeta o bot donde dejar los audios
- Texto completo en español
- Resumen con puntos y tareas
- Copia en Google Docs o email

## Campos que rellenas
- Dónde te llegan los audios (WhatsApp, Telegram, carpeta)
- Dónde quieres el texto
- Idioma principal

## Ejemplo
> Gestoría: reenvía al bot la nota de voz del cliente y recibe «Pide cita para la renta, trae 3 nóminas».

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **149 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'transcripcion-audios', 'Modalidad', 0, 'prod_f0c7k3p2b2', datetime('2026-01-01', '-46 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='transcripcion-audios' AND c.slug='documentos';
UPDATE products SET image_key='productos/transcripcion-audios.jpg' WHERE slug='transcripcion-audios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/transcripcion-audios.jpg', 0, 'pimg_3wvbq3frj2' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'transcripcion-audios-diy', 0, 1, 'var_jnydbhvchv' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'transcripcion-audios-pro', 1, 1, 'var_y66436wg02' FROM products WHERE slug='transcripcion-audios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Chat con IA en tu web que responde con tus datos', 'Un asistente en tu web que contesta horarios, precios y dudas frecuentes usando tu información, y te pasa los contactos.

## Qué recibes
- Chat en tu web o en una página propia
- Entrenado con tus textos, PDFs y preguntas frecuentes
- Aviso cuando alguien deja sus datos
- Panel para revisar conversaciones

## Campos que rellenas
- Web donde va el chat
- Documentos o FAQ
- Tono (cercano / formal)
- Correo o Telegram para avisos

## Ejemplo
> Clínica dental: «¿Abrís el sábado?» → «Sí, de 10 a 14. ¿Te reservo una revisión?» y llega el contacto al móvil.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 19900, 'eur', 999, 1, 'chat-ia-web', 'Modalidad', 0, 'prod_gm7szynwp2', datetime('2026-01-01', '-47 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='chat-ia-web' AND c.slug='bots';
UPDATE products SET image_key='productos/chat-ia-web.jpg' WHERE slug='chat-ia-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/chat-ia-web.jpg', 0, 'pimg_fpbv6040m5' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'chat-ia-web-diy', 0, 1, 'var_npgxz5meb4' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'chat-ia-web-pro', 1, 1, 'var_t7225pps1h' FROM products WHERE slug='chat-ia-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Centro de ayuda o manual para tus clientes', 'Una web de ayuda con buscador para que tus clientes resuelvan dudas solos: guías, preguntas frecuentes y tutoriales.

## Qué recibes
- Web de documentación con buscador
- Menú lateral por temas
- Modo claro/oscuro y versión móvil
- Fácil de ampliar escribiendo textos

## Campos que rellenas
- Nombre del producto o servicio
- Temas y preguntas
- Capturas o vídeos
- Logo y colores

## Ejemplo
> Software de reservas para gimnasios: «Cómo cancelar una clase», «Cómo cambiar la tarifa»… y bajan los emails de soporte.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'centro-ayuda', 'Modalidad', 0, 'prod_phkkj47efe', datetime('2026-01-01', '-48 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='centro-ayuda' AND c.slug='portales';
UPDATE products SET image_key='productos/centro-ayuda.jpg' WHERE slug='centro-ayuda';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/centro-ayuda.jpg', 0, 'pimg_428bbby8ac' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'centro-ayuda-diy', 0, 1, 'var_pjx2b04mac' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'centro-ayuda-pro', 1, 1, 'var_stw3z5szf9' FROM products WHERE slug='centro-ayuda';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Boletín de email propio sin cuotas por contacto', 'Tu propio sistema de newsletter: formulario de alta, plantillas y envíos programados, sin pagar por cada suscriptor.

## Qué recibes
- Servidor de newsletter configurado
- Formulario de alta para tu web
- Plantilla de email con tu marca
- Doble confirmación y baja (RGPD)

## Campos que rellenas
- Nombre del boletín
- Logo y colores
- Contactos actuales (si tienes)
- Frecuencia de envío

## Ejemplo
> Librería de barrio: cada lunes «Novedades de la semana» a 2.300 suscriptores sin cuota mensual por contactos.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 14900, 'eur', 999, 1, 'newsletter-propia', 'Modalidad', 0, 'prod_nd4a3etjws', datetime('2026-01-01', '-49 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='newsletter-propia' AND c.slug='captacion';
UPDATE products SET image_key='productos/newsletter-propia.jpg' WHERE slug='newsletter-propia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/newsletter-propia.jpg', 0, 'pimg_2jm12v60h2' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'newsletter-propia-diy', 0, 1, 'var_v9cgp5nmq1' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'newsletter-propia-pro', 1, 1, 'var_r2kv4943ze' FROM products WHERE slug='newsletter-propia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Banner de cookies legal y textos RGPD', 'Pon tu web en regla: banner de cookies que bloquea de verdad hasta que el usuario acepta, y textos legales base.

## Qué recibes
- Banner de cookies con aceptar / rechazar / configurar
- Bloqueo real de analítica y píxeles
- Plantillas de aviso legal, privacidad y cookies
- Instalado en tu web (modalidad «Te lo montamos»)

## Campos que rellenas
- URL de la web
- Datos del titular
- Herramientas que usas (Analytics, Meta…)

## Ejemplo
> Tienda con píxel de Meta: el píxel ya no se carga hasta que el cliente pulsa «Aceptar».

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'banner-cookies-rgpd', 'Modalidad', 0, 'prod_ph1tnr3pct', datetime('2026-01-01', '-50 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='banner-cookies-rgpd' AND c.slug='webs';
UPDATE products SET image_key='productos/banner-cookies-rgpd.jpg' WHERE slug='banner-cookies-rgpd';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/banner-cookies-rgpd.jpg', 0, 'pimg_8hh3rqmrmp' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'banner-cookies-rgpd-diy', 0, 1, 'var_my3pfabv3c' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'banner-cookies-rgpd-pro', 1, 1, 'var_8dwn9c81v2' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tu web en inglés (u otro idioma)', 'Añadimos un segundo idioma a tu web con selector, URLs propias y SEO para que te encuentren turistas y clientes de fuera.

## Qué recibes
- Versión completa en el idioma elegido
- Selector de idioma
- Etiquetas hreflang para Google
- Revisión humana de textos clave

## Campos que rellenas
- URL de la web
- Idioma
- Textos que no se traducen (marcas, platos…)

## Ejemplo
> Restaurante en Sevilla con carta y reservas en inglés: el turista que busca «tapas Seville» llega a una web que entiende y reserva.

**Plazo:** vista previa en 24-72 h laborables; entrega en 4 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 9900, 'eur', 999, 1, 'web-multidioma', 'Modalidad', 0, 'prod_cdrhd3t8j5', datetime('2026-01-01', '-51 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-multidioma' AND c.slug='webs';
UPDATE products SET image_key='productos/web-multidioma.jpg' WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-multidioma.jpg', 0, 'pimg_fcrj73h5xd' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/hotel-resort.png', 1, 'pimg_y2vr5pnhxv' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tour-guide.png', 2, 'pimg_6egy1j4qpn' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'web-multidioma-diy', 0, 1, 'var_qg553q5za3' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-multidioma-pro', 1, 1, 'var_0tw20fpp03' FROM products WHERE slug='web-multidioma';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Ficha de Google de tu negocio optimizada', 'Que te encuentren en Google Maps: ficha completa, categorías correctas, fotos, horarios y enlace de reseñas.

## Qué recibes
- Ficha revisada y completada
- Categorías y servicios optimizados
- Enlace y QR para pedir reseñas
- Checklist mensual de publicaciones

## Campos que rellenas
- Nombre y dirección del negocio
- Servicios principales
- 5–10 fotos
- Acceso a la ficha (te guiamos)

## Ejemplo
> Fisioterapeuta en Valencia: aparece en «fisio cerca de mí» con 40 fotos, horario y botón de cita.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'ficha-google', 'Modalidad', 0, 'prod_5cmqfztq2n', datetime('2026-01-01', '-52 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='ficha-google' AND c.slug='captacion';
UPDATE products SET image_key='productos/ficha-google.jpg' WHERE slug='ficha-google';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/ficha-google.jpg', 0, 'pimg_qy1htta57s' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'ficha-google-diy', 0, 1, 'var_s3z15kaqy8' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'ficha-google-pro', 1, 1, 'var_4ptawx9bc3' FROM products WHERE slug='ficha-google';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Fotos de producto con fondo blanco automático', 'Subes las fotos hechas con el móvil y te devolvemos las imágenes recortadas, con fondo blanco y tamaño para tu tienda.

## Qué recibes
- Hasta 50 fotos recortadas (ampliable)
- Fondo blanco o de color
- Tamaños para web, Amazon e Instagram
- Carpeta compartida para nuevas tandas

## Campos que rellenas
- Fotos (carpeta o zip)
- Color de fondo
- Medidas que necesitas

## Ejemplo
> Tienda de cerámica: 36 fotos hechas en la mesa de la cocina, listas para la web en una tarde.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'fotos-producto-fondo', 'Modalidad', 0, 'prod_g5kpmshscx', datetime('2026-01-01', '-53 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='fotos-producto-fondo' AND c.slug='tiendas';
UPDATE products SET image_key='productos/fotos-producto-fondo.jpg' WHERE slug='fotos-producto-fondo';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/fotos-producto-fondo.jpg', 0, 'pimg_2zkxeshgpm' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'fotos-producto-fondo-diy', 0, 1, 'var_270qsmt8yj' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'fotos-producto-fondo-pro', 1, 1, 'var_q9cwf6gsbs' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Firma de email profesional', 'Firma con tu foto o logo, cargo, teléfono, redes y aviso legal, que se ve bien en Gmail, Outlook y móvil.

## Qué recibes
- Firma HTML probada en Gmail y Outlook
- Versión para todo tu equipo
- Guía de instalación en 2 minutos

## Campos que rellenas
- Nombre y cargo de cada persona
- Logo o foto
- Teléfono y web
- Redes sociales

## Ejemplo
> Despacho de 6 abogados: misma firma para todos, con logo, teléfono directo y enlace de cita.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1900, 'eur', 999, 1, 'firma-email', 'Modalidad', 0, 'prod_k55vz0btnz', datetime('2026-01-01', '-54 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='firma-email' AND c.slug='identidad';
UPDATE products SET image_key='productos/firma-email.jpg' WHERE slug='firma-email';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/firma-email.jpg', 0, 'pimg_k6vz8dfd65' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'firma-email-diy', 0, 1, 'var_pwbvc51ve3' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'firma-email-pro', 1, 1, 'var_2ppb442ka9' FROM products WHERE slug='firma-email';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pizarra online privada para tu equipo', 'Una pizarra colaborativa propia para esquemas, planos de local o diagramas, con tu dominio y sin cuentas de terceros.

## Qué recibes
- Pizarra colaborativa publicada en tu dominio
- Bibliotecas de iconos para tu sector
- Exportación a PNG y PDF

## Campos que rellenas
- Subdominio deseado
- Uso principal (planos, esquemas, clases)
- Logo

## Ejemplo
> Reformas López dibuja con el cliente la cocina nueva en la tablet y le manda el PDF al terminar.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 4900, 'eur', 999, 1, 'pizarra-planos', 'Modalidad', 0, 'prod_82z5xrt7ah', datetime('2026-01-01', '-55 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pizarra-planos' AND c.slug='documentos';
UPDATE products SET image_key='productos/pizarra-planos.jpg' WHERE slug='pizarra-planos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pizarra-planos.jpg', 0, 'pimg_9rh580r6t1' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'pizarra-planos-diy', 0, 1, 'var_dsmy2fscfj' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'pizarra-planos-pro', 1, 1, 'var_xpj5xm6yv4' FROM products WHERE slug='pizarra-planos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Vigilancia de precios de la competencia (mes)', 'Te avisamos por email o Telegram cuando un competidor cambia el precio, se queda sin stock o vuelve a tenerlo.

## Qué recibes
- Hasta 25 productos vigilados
- Aviso por email o Telegram
- Historial de precios de cada producto
- Cambio de la lista cuando quieras

## Campos que rellenas
- Enlaces de los productos
- Precio a partir del cual avisar
- Frecuencia (diaria, cada hora)
- Correo o Telegram

## Ejemplo
> Tienda de bicis: «La Orbea X de la competencia ha bajado de 1.299 € a 1.149 €» llega al móvil a las 9:00.

**Plazo:** puesta en marcha en 24-72 h laborables; después, servicio mensual.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1200, 'eur', 999, 1, 'vigilancia-precios', NULL, 0, 'prod_0wjhcby0e3', datetime('2026-01-01', '-56 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-precios' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-precios.jpg' WHERE slug='vigilancia-precios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-precios.jpg', 0, 'pimg_q161y9xd4c' FROM products WHERE slug='vigilancia-precios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Aviso de cambios en webs que te interesan (mes)', 'Vigilamos boletines oficiales, licitaciones, convocatorias o webs de proveedores y te avisamos cuando cambian.

## Qué recibes
- Hasta 15 páginas vigiladas
- Solo te avisa si cambia la parte que te importa
- Resumen del cambio en el aviso

## Campos que rellenas
- Páginas a vigilar
- Qué parte vigilar (p. ej. «tabla de convocatorias»)
- Frecuencia
- Correo o Telegram

## Ejemplo
> Gestoría: aviso cada vez que el ayuntamiento publica una nueva ayuda para autónomos.

**Plazo:** puesta en marcha en 24-72 h laborables; después, servicio mensual.

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 900, 'eur', 999, 1, 'aviso-cambios-web', NULL, 0, 'prod_9903d2pwqv', datetime('2026-01-01', '-57 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='aviso-cambios-web' AND c.slug='planes';
UPDATE products SET image_key='productos/aviso-cambios-web.jpg' WHERE slug='aviso-cambios-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/aviso-cambios-web.jpg', 0, 'pimg_zaz8en8tqw' FROM products WHERE slug='aviso-cambios-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Etiquetas con código de barras listas para imprimir', 'Nos pasas tu lista de productos y recibes un PDF con las etiquetas (código de barras, nombre y precio) al tamaño de tu papel.

## Qué recibes
- PDF con hasta 100 etiquetas (ampliable)
- Códigos CODE128 o EAN-13
- Tamaño adaptado a tu hoja o impresora
- Plantilla para volver a generarlas tú

## Campos que rellenas
- Lista de referencias (Excel o CSV)
- Nombre y precio de cada producto
- Tamaño de etiqueta / hoja
- Unidades por referencia

## Ejemplo
> Artesana de jabones: 40 referencias con código, nombre y PVP en hojas A4 de 24 etiquetas.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1900, 'eur', 999, 1, 'etiquetas-codigo-barras', 'Modalidad', 0, 'prod_zc13y99mhj', datetime('2026-01-01', '-58 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='etiquetas-codigo-barras' AND c.slug='tiendas';
UPDATE products SET image_key='productos/etiquetas-codigo-barras.jpg' WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/etiquetas-codigo-barras.jpg', 0, 'pimg_mvr8amhgr9' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'etiquetas-codigo-barras-diy', 0, 1, 'var_en8gg5a7x3' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'etiquetas-codigo-barras-pro', 1, 1, 'var_9cze5bzzn2' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Optimización de imágenes para tu web', 'Tus fotos pesadas, convertidas a WebP o AVIF con el tamaño justo: la web carga más rápido sin perder calidad visible.

## Qué recibes
- Hasta 100 imágenes optimizadas
- Formato WebP o AVIF + copia JPG
- Nombres de archivo amigables para SEO
- Informe de peso antes / después

## Campos que rellenas
- Imágenes (carpeta o zip)
- Formato deseado
- Ancho máximo
- Calidad (alta / equilibrada)

## Ejemplo
> Casa rural: 60 fotos de 5 MB sacadas con la cámara, convertidas a WebP de 1600 px listas para la galería.

**Plazo:** vista previa en 24-72 h laborables; entrega en 24 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **14 €** | **39 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1400, 'eur', 999, 1, 'optimizar-imagenes', 'Modalidad', 0, 'prod_spdg49438r', datetime('2026-01-01', '-59 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='optimizar-imagenes' AND c.slug='webs';
UPDATE products SET image_key='productos/optimizar-imagenes.jpg' WHERE slug='optimizar-imagenes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/optimizar-imagenes.jpg', 0, 'pimg_djh4qg1hxw' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1400, 999, 'optimizar-imagenes-diy', 0, 1, 'var_zy7v0zw3jk' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 3900, 999, 'optimizar-imagenes-pro', 1, 1, 'var_tgv7b4zv7m' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tu logo en vectorial y en todos los tamaños', 'Tu logo limpio en SVG y en todos los formatos que te pedirán: web, redes, favicon, imprenta y fondo oscuro.

## Qué recibes
- SVG optimizado
- PNG en 6 tamaños
- Favicon e icono de app
- Versión en blanco para fondos oscuros

## Campos que rellenas
- Logo actual (el mejor archivo que tengas)
- Colores corporativos
- Dónde lo vas a usar

## Ejemplo
> Peluquería con el logo solo en una foto del cartel: recibe el SVG, el favicon y la versión blanca para Instagram.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 1900, 'eur', 999, 1, 'logo-vectorial', 'Modalidad', 0, 'prod_41nvq7qxb1', datetime('2026-01-01', '-60 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='logo-vectorial' AND c.slug='identidad';
UPDATE products SET image_key='productos/logo-vectorial.jpg' WHERE slug='logo-vectorial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/logo-vectorial.jpg', 0, 'pimg_nha7z7fd2k' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'logo-vectorial-diy', 0, 1, 'var_nnxqyvb7a9' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'logo-vectorial-pro', 1, 1, 'var_kaa88gfjmr' FROM products WHERE slug='logo-vectorial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Limpieza de listados de clientes y productos', 'Ese Excel lleno de duplicados, mayúsculas mezcladas y teléfonos con formatos distintos, ordenado y listo para importar.

## Qué recibes
- Archivo limpio sin duplicados exactos
- Columnas unificadas (nombres, teléfonos, emails)
- Informe de lo que se ha corregido
- Formato listo para tu CRM o tienda

## Campos que rellenas
- Archivo (Excel o CSV)
- Columna que identifica cada registro
- Columnas que quieres conservar
- Programa al que lo vas a importar

## Ejemplo
> Autoescuela: 3 hojas de alumnos de distintos años unidas en una sola, sin repetidos, lista para el email de bienvenida.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'limpieza-csv', 'Modalidad', 0, 'prod_3sdfeee0h4', datetime('2026-01-01', '-61 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='limpieza-csv' AND c.slug='documentos';
UPDATE products SET image_key='productos/limpieza-csv.jpg' WHERE slug='limpieza-csv';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/limpieza-csv.jpg', 0, 'pimg_6s28bhgdyz' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'limpieza-csv-diy', 0, 1, 'var_mb70tezb0h' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'limpieza-csv-pro', 1, 1, 'var_ex4hn15jdv' FROM products WHERE slug='limpieza-csv';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Plantilla de inventario a medida en Excel', 'Un Excel con tus productos y categorías que avisa en rojo cuando algo baja del mínimo y calcula lo que vale tu stock.

## Qué recibes
- Excel con tus productos y categorías
- Alertas de stock mínimo
- Valoración del inventario
- Hoja de entradas y salidas

## Campos que rellenas
- Categorías
- Lista de productos
- Stock mínimo de cada uno
- Coste y precio de venta

## Ejemplo
> Bar de barrio: la hoja marca en rojo «tónica: quedan 6» antes de hacer el pedido del lunes.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'plantilla-inventario', 'Modalidad', 0, 'prod_t09nv9ah2t', datetime('2026-01-01', '-62 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plantilla-inventario' AND c.slug='documentos';
UPDATE products SET image_key='productos/plantilla-inventario.jpg' WHERE slug='plantilla-inventario';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plantilla-inventario.jpg', 0, 'pimg_gzk6xw48b9' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'plantilla-inventario-diy', 0, 1, 'var_cv069xv527' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'plantilla-inventario-pro', 1, 1, 'var_0c6jef87k0' FROM products WHERE slug='plantilla-inventario';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Informe con gráficos a partir de tu Excel', 'Nos mandas tus datos de ventas, socios o visitas y recibes un PDF claro con gráficos listo para presentar.

## Qué recibes
- PDF con hasta 10 gráficos
- Resumen en una página
- Plantilla para repetirlo cada mes

## Campos que rellenas
- Archivo de datos
- Qué quieres medir
- Periodo
- Logo y colores

## Ejemplo
> Asociación de vecinos: informe anual de cuotas y actividades para la asamblea, con logo y 6 gráficos.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'informe-graficos', 'Modalidad', 0, 'prod_133bz0yw52', datetime('2026-01-01', '-63 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='informe-graficos' AND c.slug='documentos';
UPDATE products SET image_key='productos/informe-graficos.jpg' WHERE slug='informe-graficos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/informe-graficos.jpg', 0, 'pimg_md8zwx1ytn' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'informe-graficos-diy', 0, 1, 'var_7kdqf1xw7w' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'informe-graficos-pro', 1, 1, 'var_p96b49pkx1' FROM products WHERE slug='informe-graficos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Dossier comercial en PDF con tu marca', 'Un PDF de 4 páginas para mandar por email o WhatsApp: quién eres, qué ofreces, por qué tú y cómo contratarte.

## Qué recibes
- PDF de 4 páginas con tu marca
- Versión ligera para WhatsApp
- Archivo editable para actualizar precios

## Campos que rellenas
- Nombre comercial y logo
- Servicios y precios
- Por qué elegirte (3 razones)
- Datos de contacto

## Ejemplo
> Fotógrafo de bodas: dossier con 3 packs, fotos de muestra y botón de WhatsApp para pedir fecha.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'dossier-comercial', 'Modalidad', 0, 'prod_t138t9xc2f', datetime('2026-01-01', '-64 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='dossier-comercial' AND c.slug='documentos';
UPDATE products SET image_key='productos/dossier-comercial.jpg' WHERE slug='dossier-comercial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/dossier-comercial.jpg', 0, 'pimg_zzcbgsdm4k' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'dossier-comercial-diy', 0, 1, 'var_my4ewynepv' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'dossier-comercial-pro', 1, 1, 'var_pqzy4c237r' FROM products WHERE slug='dossier-comercial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Diagramas de procesos y organigramas', 'Nos explicas cómo funciona tu proceso o tu equipo y te devolvemos diagramas claros en SVG, PNG y PDF.

## Qué recibes
- Hasta 5 diagramas
- Formatos SVG, PNG y PDF
- Archivo de texto para editarlos tú

## Campos que rellenas
- Pasos del proceso o personas del equipo
- Decisiones o responsables
- Orientación (horizontal / vertical)
- Colores

## Ejemplo
> Clínica dental: el circuito del paciente, de la llamada a la factura, en un diagrama colgado en recepción.

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'diagramas-procesos', 'Modalidad', 0, 'prod_21jaapk53b', datetime('2026-01-01', '-65 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='diagramas-procesos' AND c.slug='documentos';
UPDATE products SET image_key='productos/diagramas-procesos.jpg' WHERE slug='diagramas-procesos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/diagramas-procesos.jpg', 0, 'pimg_e6dnjh6tzw' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'diagramas-procesos-diy', 0, 1, 'var_tawfg7nty7' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'diagramas-procesos-pro', 1, 1, 'var_hbnqws084n' FROM products WHERE slug='diagramas-procesos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Descripciones de producto escritas con IA y revisadas', 'Títulos y descripciones de venta para tu tienda, con tus palabras clave, revisados por una persona antes de entregarlos.

## Qué recibes
- 20 títulos y descripciones (ampliable)
- Palabras clave para Google
- Archivo CSV listo para importar
- Guía de tono para las siguientes

## Campos que rellenas
- Catálogo (nombre y características)
- Público al que vendes
- Tono (cercano, técnico, premium)
- Palabras clave

## Ejemplo
> Tienda de té: «Rooibos vainilla 100 g · sin teína, para después de cenar» en lugar de «Té rojo 100g».

**Plazo:** vista previa en 24-72 h laborables; entrega en 48 h desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 2900, 'eur', 999, 1, 'descripciones-producto-ia', 'Modalidad', 0, 'prod_wveqer5xny', datetime('2026-01-01', '-66 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='descripciones-producto-ia' AND c.slug='contenido';
UPDATE products SET image_key='productos/descripciones-producto-ia.jpg' WHERE slug='descripciones-producto-ia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/descripciones-producto-ia.jpg', 0, 'pimg_f2kkk8zqxd' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'descripciones-producto-ia-diy', 0, 1, 'var_4bzam7xbf5' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'descripciones-producto-ia-pro', 1, 1, 'var_f5z4cphwpa' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pack de carruseles para Instagram y LinkedIn', 'Diez carruseles con tu marca generados desde tus textos, en PNG listos para subir y con la plantilla para repetir.

## Qué recibes
- 10 carruseles de 5–8 diapositivas
- Plantilla con tus colores y tipografías
- Textos de publicación sugeridos
- Regeneración desde una hoja de cálculo

## Campos que rellenas
- Temas o textos
- Tono
- Colores y logo
- Red principal

## Ejemplo
> Nutricionista: «5 desayunos en 5 minutos», un carrusel por semana durante dos meses y medio.

**Plazo:** vista previa en 24-72 h laborables; entrega en 3 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 3900, 'eur', 999, 1, 'carruseles-redes', 'Modalidad', 0, 'prod_1j8aa8vcpa', datetime('2026-01-01', '-67 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carruseles-redes' AND c.slug='contenido';
UPDATE products SET image_key='productos/carruseles-redes.jpg' WHERE slug='carruseles-redes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carruseles-redes.jpg', 0, 'pimg_fr64y57qet' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'carruseles-redes-diy', 0, 1, 'var_wbaf86vq6c' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'carruseles-redes-pro', 1, 1, 'var_jeac0ba9x6' FROM products WHERE slug='carruseles-redes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web WordPress llave en mano', 'Si prefieres WordPress: instalada, con tema ligero, tus páginas, formulario, copias automáticas y seguridad básica.

## Qué recibes
- WordPress instalado en tu alojamiento web
- 5 páginas con tus textos y fotos
- Formulario de contacto y aviso legal
- Copias de seguridad y actualizaciones automáticas
- Vídeo de 10 minutos para editarla tú

## Campos que rellenas
- Dominio y alojamiento web (o te recomendamos uno)
- Textos de las 5 páginas
- Logo y fotos
- Colores

## Ejemplo
> Academia de música: inicio, profesores, horarios, precios y contacto; la dueña cambia los horarios ella misma.

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **549 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 24900, 'eur', 999, 1, 'web-wordpress', 'Modalidad', 0, 'prod_2z9sa68jt1', datetime('2026-01-01', '-68 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-wordpress' AND c.slug='webs';
UPDATE products SET image_key='productos/web-wordpress.jpg' WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-wordpress.jpg', 0, 'pimg_qnfb5w67a3' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/corporate-company.png', 1, 'pimg_ex7bf1jgw8' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 2, 'pimg_rtbxrm3pfw' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-wordpress-diy', 0, 1, 'var_fp05w5x6n4' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 54900, 999, 'web-wordpress-pro', 1, 1, 'var_67wb30ke24' FROM products WHERE slug='web-wordpress';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de 4 páginas que editas arrastrando bloques', 'Tu web en un editor visual muy sencillo: cambias textos, fotos y secciones arrastrando, sin tocar código ni pagar cuota.

## Qué recibes
- Editor visual instalado y configurado
- Web inicial de 4 páginas con tus datos
- Bloques de tu sector listos para usar
- Formación de 30 minutos

## Campos que rellenas
- Sector
- Páginas que necesitas
- Logo, colores y fotos
- Dominio

## Ejemplo
> Tienda de muebles: monta ella misma la página de ofertas de enero arrastrando el bloque «producto destacado».

**Plazo:** vista previa en 24-72 h laborables; entrega en 5 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 19900, 'eur', 999, 1, 'web-arrastrar-soltar', 'Modalidad', 0, 'prod_m1g4vskrjs', datetime('2026-01-01', '-69 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-arrastrar-soltar' AND c.slug='portales';
UPDATE products SET image_key='productos/web-arrastrar-soltar.jpg' WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-arrastrar-soltar.jpg', 0, 'pimg_10g4qac8ks' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/editor-bloques.png', 1, 'pimg_z03ca84077' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'web-arrastrar-soltar-diy', 0, 1, 'var_3mt3a0bn26' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-arrastrar-soltar-pro', 1, 1, 'var_mxkfbsxhcd' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Plataforma para tu agencia: clientes, webs y CRM', 'Para agencias y autónomos: un panel donde cada cliente tiene su web, su portal y su ficha en el CRM, con cobros automáticos.

## Qué recibes
- Panel multi-cliente propio
- Portal privado para cada cliente
- CRM con fichas y tareas
- Cobros recurrentes con Stripe (con tus claves)

## Campos que rellenas
- Nombre de la agencia y logo
- Servicios que vendes
- Primeros clientes a dar de alta
- Dominio

## Ejemplo
> Diseñadora freelance con 12 clientes: cada uno entra a su portal, ve facturas y pide cambios sin escribir al WhatsApp personal.

**Plazo:** vista previa en 24-72 h laborables; entrega en 10 días desde que la apruebas.

## Plantilla + guía o te lo montamos
Si te gusta la vista previa, pagas y te lo entregamos: publicado (**Te lo montamos**) o con la guía para publicarlo tú (**Plantilla + guía**).

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **490 €** | **990 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes antes de entregar | Sí | Sí |
| Después de la entrega | Dudas por email | Ajustes sobre lo pedido |

## Cómo funciona
**Si lo contratas directamente:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos el resultado y, tras una ronda de ajustes, te lo entregamos.

**Si prefieres probar antes:** pulsa **Empieza gratis**, rellena los campos y te enviamos una vista previa con tus datos. Si te gusta, pagas; si no, no pagas nada.

_Detrás hay una persona, David Porto Díaz, que te responde cualquier duda._
', 49000, 'eur', 999, 1, 'plataforma-agencia', 'Modalidad', 0, 'prod_e6ag4821t4', datetime('2026-01-01', '-70 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plataforma-agencia' AND c.slug='portales';
UPDATE products SET image_key='productos/plataforma-agencia.jpg' WHERE slug='plataforma-agencia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plataforma-agencia.jpg', 0, 'pimg_5rcrzsvkk3' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 49000, 999, 'plataforma-agencia-diy', 0, 1, 'var_bb3r7h3pr4' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99000, 999, 'plataforma-agencia-pro', 1, 1, 'var_j5yy1ggaa8' FROM products WHERE slug='plataforma-agencia';
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cómo funciona', 'como-funciona', '## Servicios digitales como barras de pan

Cada servicio es un producto cerrado: **precio fijo, plazo fijo y una lista de campos** que rellenas tú. Nada de reuniones eternas ni presupuestos a medida.

### 1. Eliges
Busca tu servicio por pestaña (webs, hostelería, reservas, bodas, bots, automatizaciones…). Cada ficha te dice qué recibes, un ejemplo real y el plazo.

### 2. Lo contratas o lo pruebas gratis
Dos formas de empezar:
- **Contrátalo directamente**: pagas con tarjeta en la ficha y después nos mandas tus datos (2-3 minutos). Si en 7 días no hace lo que dice la ficha, te devolvemos el dinero.
- **Pruébalo gratis**: pulsas **Empieza gratis**, rellenas los datos y no pagas nada todavía.

Si no tienes algo (textos, fotos), lo marcas y seguimos.

### 3. Ves el resultado antes de la entrega
Te enviamos una vista previa con tus datos en 24-72 h laborables. Si empezaste gratis, pagas solo si te gusta.

### 4. Lo recibes funcionando
Publicamos el servicio con tus datos y te enviamos el enlace y una guía corta de uso. Detrás hay una persona, David Porto Díaz, que te responde cualquier duda.

## Dos modalidades

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Qué recibes | Plantilla + guía paso a paso | Servicio publicado con tus datos |
| Para quién | Quien quiere ahorrar y se maneja | Quien quiere olvidarse |
| Soporte | Por email | Por email y WhatsApp |

## Sin humo
- **Es tuyo**: accesos a tu nombre y sin cuotas obligatorias.
- Puedes probar gratis antes de pagar, o contratarlo directamente con garantía.
- Si en 7 días no está como te prometimos, te devolvemos el dinero.
', 1, 'standard', 'page_cg7b3kzxse');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Preguntas frecuentes', 'preguntas-frecuentes', '## ¿De quién es la web o la automatización?
Tuya. Te entregamos todos los accesos a tu nombre.

## ¿Tengo que pagar antes?
Tú eliges. Puedes **contratarlo directamente** con tarjeta (si en 7 días no hace lo que dice la ficha, te devolvemos el dinero) o pulsar **Empieza gratis**, ver una vista previa con tus datos y pagar solo si te gusta.

## ¿Es solo para empresas?
No. También para particulares: webs de boda, cumpleaños, viajes, asociaciones, currículums o tu proyecto personal.

## ¿Hay alguien al otro lado?
Sí. David Porto Díaz atiende cada pedido en persona y responde a cualquier duda.

## ¿Hay cuotas mensuales?
No son obligatorias. Muchos servicios funcionan gratis, sin cuota. Si prefieres que lo mantengamos, tienes los **Planes mensuales**.

## ¿Y si no tengo textos o fotos?
Marca «no lo tengo» en el campo y te proponemos textos e imágenes libres de derechos.

## ¿Puedo pedir cambios?
Sí. Todo incluye una ronda de ajustes antes de la entrega. Después, con **Te lo montamos** tienes ajustes sobre lo pedido; con **Plantilla + guía**, resolvemos tus dudas por email. Para cambios nuevos, el plan de mantenimiento.

## ¿Cuánto tarda?
El plazo aparece en cada ficha y cuenta desde que recibimos los campos completos.

## ¿Emitís factura?
Sí, cada compra lleva su factura.
', 1, 'standard', 'page_pavk0655kw');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Herramientas recomendadas', 'herramientas-recomendadas', '## Herramientas que usamos y recomendamos

Lo que montamos funciona con estas herramientas. Algunas tienen plan gratuito y otras son de pago; te decimos cuál conviene en cada caso. Algunos enlaces pueden ser de afiliado: a ti no te cuesta más y nos ayuda a mantener precios bajos.

### Alojamiento y dominios
- **Cloudflare**: hosting gratuito de webs estáticas, DNS, SSL y protección. Es donde publicamos casi todo.
- **Registro de dominios**: Cloudflare Registrar (a precio de coste) u otro registrador que prefieras.

### Email y avisos
- **Brevo** o **MailerLite**: boletines y emails automáticos con plan gratuito.
- **GetResponse**: email marketing con embudos y webinars.
- **Telegram**: avisos instantáneos gratis desde formularios, reservas y pedidos.

### Automatización y embudos
- **n8n**: automatizaciones que se pueden alojar sin cuota.
- **Make**: automatizaciones visuales con plan gratuito.
- **Systeme.io**: embudos de venta, cursos y emails en una sola herramienta, con plan gratuito.

### Diseño y contenido
- **Canva**: imágenes y cartas para redes.
- **Elementor**: maquetador visual si tu web es WordPress.
- **Unsplash / Pexels**: fotos libres de derechos.

### Alojamiento web tradicional (si necesitas WordPress o correo con tu dominio)
- **Raiola Networks** y **Webempresa**: hosting en España con soporte en español.
- **Hostinger**: hosting y correo económicos.
- **Kinsta**: hosting WordPress gestionado para webs con mucho tráfico.
- **SiteGround** y **Cloudways**: hosting gestionado con buen soporte y copias diarias.
- **WP Rocket**: caché para que un WordPress cargue rápido sin tocar código.

### Redes sociales
- **Metricool**: programa publicaciones y mide resultados de todas tus redes desde un panel.

### Facturación y gestión
- **Holded** o **Quipu**: facturación, gastos e impuestos para autónomos y pymes.

### Pagos
- **Stripe**: cobros con tarjeta, Bizum vía TPV de tu banco si lo prefieres.

_Si quieres que configuremos alguna, está incluido en «Te lo montamos»._
', 1, 'standard', 'page_gggpc7xmhy');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Demos en vivo', 'demos', '## Mira lo que recibes antes de comprar

Hay dos tipos. Las **demos interactivas** se pueden usar ya (editar una web, pedir de una carta…) con datos de ejemplo. Los **diseños de ejemplo** enseñan estilos: tu versión lleva tus textos, fotos y colores, en español.

- **[Web de boda · estilo Blush](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-blush/)** · diseño de ejemplo · servicio: [Web de boda con confirmación de asistencia](/products/web-boda-rsvp)
- **[Web de boda · estilo Midnight Gold](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-midnight/)** · diseño de ejemplo · servicio: [Web de boda con confirmación de asistencia](/products/web-boda-rsvp)
- **[Web de boda · estilo Sage Garden](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-sage/)** · diseño de ejemplo · servicio: [Invitación digital animada](/products/invitacion-digital)
- **[Tienda de descargas digitales](https://automatizasinhumo-demos.davidpd89.workers.dev/tienda-descargas/)** · diseño de ejemplo · servicio: [Tienda de productos digitales](/products/tienda-productos-digitales)
- **[Web inmobiliaria con buscador](https://automatizasinhumo-demos.davidpd89.workers.dev/inmobiliaria/)** · diseño de ejemplo · servicio: [Web para inmobiliaria](/products/web-inmobiliaria)
- **[Plantillas: restaurante, negocio, portfolio, invitaciones…](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/)** · diseño de ejemplo · servicio: [Web de una página para tu negocio](/products/web-una-pagina)
- **[Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)** · demo interactiva · servicio: [Carta QR con pedidos por WhatsApp](/products/carta-pedidos-whatsapp)
- **[Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)** · demo interactiva · servicio: [Muro de opiniones de clientes](/products/muro-testimonios)
- **[100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)** · diseño de ejemplo · servicio: [Web corporativa de 5 secciones](/products/web-corporativa-5-secciones)
- **[Plantillas de estilo clásico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)** · diseño de ejemplo · servicio: [Web corporativa de 5 secciones](/products/web-corporativa-5-secciones)
- **[Editor de bloques: pruébalo en el navegador](https://automatizasinhumo-demos.davidpd89.workers.dev/editor-bloques/)** · demo interactiva · servicio: [Web a medida con editor visual completo](/products/web-editable-visual)

Con tus textos, fotos y colores queda así en 2-10 días. Contrátalo directamente o pruébalo gratis y paga solo si te gusta.

¿No ves tu caso? [Cuéntanos qué necesitas](/pages/contacto).
', 1, 'standard', 'page_9c56263jxf');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Contacto', 'contacto', '## Habla con una persona

Te atiende **David Porto Díaz**, que monta y entrega cada servicio. Sin bots ni centralitas: te responde una persona en menos de 24 horas laborables. Da igual que seas empresa, autónomo o particular (una boda, un cumpleaños, una asociación…).

**[Escríbenos con el formulario](/empezar/consulta)**: tardas un minuto.

Si quieres afinar, cuéntanos:

1. **Quién eres**: tu negocio o tu proyecto personal.
2. **Qué quieres conseguir**: más reservas, vender online, ahorrar tiempo, una web para tu evento…
3. **Qué tienes ya**: web, dominio, redes, herramientas.
4. **Para cuándo** lo necesitas.
5. **Presupuesto** aproximado.

### Dónde escribirnos
- Formulario: [/empezar/consulta](/empezar/consulta)
- Email: [hola@automatizasinhumo.com](mailto:hola@automatizasinhumo.com)
- Respondemos en menos de 24 horas laborables.

_Si ya sabes qué quieres, entra en su ficha: contrátalo directamente o pulsa **Empieza gratis** y paga solo si te gusta._
', 1, 'standard', 'page_h8gq286rzm');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Aviso legal', 'aviso-legal', '## Aviso legal

En cumplimiento de la Ley 34/2002 (LSSI-CE):

- **Titular**: David Porto Díaz (persona física)
- **Web**: automatizasinhumo.com
- **Email**: hola@automatizasinhumo.com
- Los datos fiscales completos se facilitan en la factura de cada pedido.

### Objeto
Este sitio ofrece la venta de servicios digitales (webs, automatizaciones y herramientas) a precio cerrado.

### Propiedad intelectual
Los textos y el diseño de este sitio pertenecen al titular. Cada entrega respeta las licencias de los componentes de terceros que incluya.

### Responsabilidad
El titular no se hace responsable del uso que terceros hagan de los servicios entregados ni de los contenidos que el cliente aporte.
', 1, 'standard', 'page_pxyxsgrqfn');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Condiciones de contratación', 'condiciones', '## Condiciones de contratación

### Precio y pago
El precio de cada ficha es el precio final, sin recargos. Puedes empezar gratis: rellenas los datos, te enviamos una vista previa y solo pagas si la apruebas. Recibes factura del pedido.

### Entrega
El plazo de cada ficha cuenta desde que recibimos los campos completos del formulario (o desde el pago, si empezaste con la vista previa). Entregamos por email el enlace, los accesos y una guía de uso.

### Cambios
Cada servicio incluye una ronda de cambios sobre lo entregado. Cambios posteriores, con plan de mantenimiento o por horas.

### Garantía y devoluciones
Si en 7 días desde la entrega el servicio no hace lo que describe su ficha, te devolvemos el importe. Al tratarse de contenido digital personalizado, una vez entregado y aceptado no aplica el derecho de desistimiento (art. 103 TRLGDCU).

### Planes mensuales
Se pueden cancelar en cualquier momento; el servicio sigue activo hasta el final del periodo pagado.
', 1, 'standard', 'page_2d18jjsk1f');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Privacidad', 'privacidad', '## Política de privacidad

- **Responsable**: David Porto Díaz, hola@automatizasinhumo.com
- **Finalidad**: gestionar pedidos, entregar los servicios y responder consultas.
- **Base legal**: ejecución del contrato y consentimiento.
- **Conservación**: el tiempo necesario y los plazos legales de facturación.
- **Destinatarios**: proveedores necesarios para prestar el servicio (alojamiento en Cloudflare, pasarela de pago, email). No vendemos datos.
- **Derechos**: acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@automatizasinhumo.com. Puedes reclamar ante la AEPD (aepd.es).
', 1, 'standard', 'page_p88a5m42df');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cookies', 'cookies', '## Política de cookies

Este sitio solo usa **cookies técnicas** imprescindibles (carrito y sesión de tu cuenta). No usamos cookies de publicidad ni de seguimiento de terceros, por eso no te mostramos un banner de consentimiento.

Si en el futuro añadimos analítica, será sin cookies o con tu consentimiento previo.
', 1, 'standard', 'page_g0ny5380y7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'catalog', NULL, 'Servicios', 0, 'nav_pb7mt8jrc6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='webs'), 'Webs', 1, 'nav_9h77dwz50y');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='automatizaciones'), 'Automatizaciones', 2, 'nav_pq4jy3sheh');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='como-funciona'), 'Cómo funciona', 3, 'nav_b16a85yrgp');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='demos'), 'Demos', 4, 'nav_h52ke70mqg');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'home', NULL, 'Inicio', 0, 'nav_95aswbp5xv');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='hosteleria'), 'Restaurantes y bares', 1, 'nav_eew0cfe5m6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='reservas'), 'Reservas y citas', 2, 'nav_dx0hrrgnge');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bodas'), 'Bodas y eventos', 3, 'nav_bp2jftc3q7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='identidad'), 'Tarjetas, página de enlaces y CV', 4, 'nav_zsj3zh80t7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='captacion'), 'Formularios y captación', 5, 'nav_pdaa0gz6d3');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bots'), 'Bots e IA', 6, 'nav_7qggwncz5q');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='enlaces'), 'Enlaces, QR y analítica', 7, 'nav_dhd3q6w68p');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='tiendas'), 'Tiendas y productos digitales', 8, 'nav_bmgt1dn42d');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='portales'), 'Portales y webs editables', 9, 'nav_222hm20h76');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='documentos'), 'Documentos, PDF e IA', 10, 'nav_3j5tq8m4vw');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='contenido'), 'Contenido y redes', 11, 'nav_1n4v64gavf');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='planes'), 'Planes mensuales', 12, 'nav_4t9fjxkpwj');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='preguntas-frecuentes'), 'Preguntas frecuentes', 13, 'nav_c7db4jn9yg');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='herramientas-recomendadas'), 'Herramientas recomendadas', 14, 'nav_m1bgszzfva');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='contacto'), 'Contacto', 15, 'nav_tevsbq4h9d');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='aviso-legal'), 'Aviso legal', 16, 'nav_zayh1e8hbr');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='condiciones'), 'Condiciones de contratación', 17, 'nav_3dyzxd041s');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='privacidad'), 'Privacidad', 18, 'nav_5vj31he4z5');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='cookies'), 'Cookies', 19, 'nav_f2rq6snc6d');
INSERT INTO settings (key, value) VALUES ('store_name', 'Automatiza sin humo') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement', 'Contrátalo directamente con garantía de 7 días o pruébalo gratis · Te atiende una persona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement_href', '/pages/como-funciona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
