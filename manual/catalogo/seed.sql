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
INSERT INTO categories (name, slug, public_id) VALUES ('Webs para tu negocio', 'webs', 'cat_36fyjxzkrw');
INSERT INTO categories (name, slug, public_id) VALUES ('Restaurantes y bares', 'hosteleria', 'cat_qx5937kk7b');
INSERT INTO categories (name, slug, public_id) VALUES ('Reservas y citas', 'reservas', 'cat_jx668ft614');
INSERT INTO categories (name, slug, public_id) VALUES ('Bodas y eventos', 'bodas', 'cat_j85m8srck1');
INSERT INTO categories (name, slug, public_id) VALUES ('Tarjetas, página de enlaces y CV', 'identidad', 'cat_bppyzq0xsd');
INSERT INTO categories (name, slug, public_id) VALUES ('Formularios y captación', 'captacion', 'cat_h00kwwqtbv');
INSERT INTO categories (name, slug, public_id) VALUES ('Bots e IA', 'bots', 'cat_axz99b81wg');
INSERT INTO categories (name, slug, public_id) VALUES ('Automatizaciones', 'automatizaciones', 'cat_1by5wtp36r');
INSERT INTO categories (name, slug, public_id) VALUES ('Enlaces, QR y analítica', 'enlaces', 'cat_dg9j0bbv6m');
INSERT INTO categories (name, slug, public_id) VALUES ('Tiendas y productos digitales', 'tiendas', 'cat_pmbg3kb9sc');
INSERT INTO categories (name, slug, public_id) VALUES ('Portales y webs editables', 'portales', 'cat_xgffxvdrjw');
INSERT INTO categories (name, slug, public_id) VALUES ('Documentos, PDF e IA', 'documentos', 'cat_mk106fra47');
INSERT INTO categories (name, slug, public_id) VALUES ('Contenido y redes', 'contenido', 'cat_kykrhx1j2c');
INSERT INTO categories (name, slug, public_id) VALUES ('Planes mensuales', 'planes', 'cat_f889dgxpd9');
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de una página para tu negocio', 'Tu negocio en internet con una sola página clara: quién eres, qué ofreces y cómo contactarte.

## Qué recibes
- Web de una página adaptada a móvil
- Hasta 6 servicios
- Botones de llamada y WhatsApp
- Horario, dirección y mapa
- Espacio para tus fotos
- En «Te lo montamos»: publicada en una dirección gratuita o en tu dominio si ya lo tienes

## No incluye
- Compra del dominio
- Correo corporativo
- Sistema de reservas
- Tienda online
- Textos legales
- Mantenimiento continuo

## Campos que rellenas
- Nombre del negocio
- Sector
- Hasta 6 servicios (con precio, si quieres mostrarlo)
- Teléfono y WhatsApp
- Dirección y horario
- ¿Tienes logo y fotos? (hasta 8; te diremos cómo enviarlas)

## Ejemplo
> Peluquería Lola: portada con foto, lista de servicios con precios, botón «Pide cita por WhatsApp» y mapa.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'web-una-pagina', 'Modalidad', 0, 'prod_pv3z0zenn8', datetime('2026-01-01', '-0 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-una-pagina' AND c.slug='webs';
UPDATE products SET image_key='productos/web-una-pagina.jpg' WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-una-pagina.jpg', 0, 'pimg_v27teqvrma' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/spa-salon.png', 1, 'pimg_s43pv3ssz3' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/business-template.png', 2, 'pimg_g7fwe7d9fv' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/product-launch.png', 3, 'pimg_0gc6ske6hw' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-eventos.png', 4, 'pimg_d152t2r4d5' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'web-una-pagina-diy', 0, 1, 'var_q47vd909gz' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'web-una-pagina-pro', 1, 1, 'var_4eqzhf9t3v' FROM products WHERE slug='web-una-pagina';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web corporativa de hasta 5 páginas', 'Inicio, servicios, sobre nosotros, opiniones y contacto. Para empresas que necesitan algo más que una tarjeta.

## Qué recibes
- Hasta 5 páginas con un diseño adaptado a tu marca
- Formulario de contacto conectado a tu correo
- SEO básico: títulos, descripciones y sitemap
- En «Te lo montamos»: publicada con certificado SSL

## No incluye
- Redacción completa de los textos desde cero
- Garantía de posición en Google
- Compra del dominio
- Tienda online
- Mantenimiento continuo

## Campos que rellenas
- Datos de la empresa
- Páginas que quieres (hasta 5)
- Textos de cada página (te ayudamos a ordenarlos)
- ¿Tienes logo, colores y fotos? (te diremos cómo enviarlos)
- Correo donde recibir los contactos

## Ejemplo
> Asesoría García: página por servicio (fiscal, laboral, contable), equipo, testimonios y formulario.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'web-corporativa-5-secciones', 'Modalidad', 0, 'prod_gqzj4pwkfe', datetime('2026-01-01', '-1 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-corporativa-5-secciones' AND c.slug='webs';
UPDATE products SET image_key='productos/web-corporativa-5-secciones.jpg' WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-corporativa-5-secciones.jpg', 0, 'pimg_v64znwzr99' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/consulting-firm.png', 1, 'pimg_nkyh0mkvyj' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/creative-agency.png', 2, 'pimg_9dft04ktpp' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/atelier.png', 3, 'pimg_00hpdxr44w' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ironworks.png', 4, 'pimg_gca9kfjjgc' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-negocio.png', 5, 'pimg_r6hq03zt3j' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-bootstrap.png', 6, 'pimg_szgpt1mp68' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-corporativa-5-secciones-diy', 0, 1, 'var_0mfnj4bqw9' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-corporativa-5-secciones-pro', 1, 1, 'var_y05t97b56e' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web para inmobiliaria', 'Escaparate de inmuebles con fichas, fotos y contacto directo con el agente.

## Qué recibes
- Hasta 12 inmuebles con filtros básicos (precio, zona, habitaciones)
- Ficha por inmueble con hasta 10 fotos
- Página de hasta 2 agentes
- Formulario para pedir información o una visita

## No incluye
- Panel para dar de alta inmuebles después de la entrega
- Sincronización con portales inmobiliarios
- Reserva automática de visitas (el formulario solicita la visita, no la confirma)
- Compra del dominio

## Campos que rellenas
- Nombre de la agencia
- Inmuebles (hasta 12: precio, m², habitaciones)
- Agentes (hasta 2)
- Zona de trabajo
- ¿Tienes las fotos de los inmuebles? (te diremos cómo enviarlas)

## Ejemplo
> Inmobiliaria Costa: 12 pisos en venta con fotos, botón «Quiero visitarlo» y WhatsApp del agente.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 29900, 'eur', 999, 1, 'web-inmobiliaria', 'Modalidad', 0, 'prod_3s51hs9108', datetime('2026-01-01', '-2 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-inmobiliaria' AND c.slug='webs';
UPDATE products SET image_key='productos/web-inmobiliaria.jpg' WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-inmobiliaria.jpg', 0, 'pimg_psbanab16a' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/real-estate-agency.png', 1, 'pimg_asp4n8z9w8' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/vacation-rental.png', 2, 'pimg_0rm55qff95' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'web-inmobiliaria-diy', 0, 1, 'var_r149fv47dx' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'web-inmobiliaria-pro', 1, 1, 'var_v1t52w14ek' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Portfolio editable para profesionales', 'Para fotógrafos, diseñadores, arquitectos o autónomos: cambias textos y fotos desde un panel privado, sin tocar código.

## Qué recibes
- Portfolio con hasta 8 proyectos y galería
- Panel privado para editar textos y fotos
- Formulario de contacto
- Alojamiento en un plan gratuito, siempre que sus condiciones lo permitan

## No incluye
- Tienda o venta de fotos
- Compra del dominio
- Edición o retoque de fotografías
- Mantenimiento continuo

## Campos que rellenas
- Nombre y profesión
- Proyectos (hasta 8: título y descripción)
- Biografía
- Redes sociales
- ¿Tienes las fotos de los proyectos? (te diremos cómo enviarlas)

## Ejemplo
> Marta, fotógrafa: 8 reportajes, sobre mí, tarifas y contacto. Ella sube los nuevos trabajos desde el móvil.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'portfolio-editable', 'Modalidad', 0, 'prod_zmyzwxggf9', datetime('2026-01-01', '-3 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portfolio-editable' AND c.slug='webs';
UPDATE products SET image_key='productos/portfolio-editable.jpg' WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portfolio-editable.jpg', 0, 'pimg_dybp5b2gzr' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/portfolio-template.png', 1, 'pimg_a5537zp3h7' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 2, 'pimg_01ss4khqvm' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/architect-portfolio.png', 3, 'pimg_4rvt48yzxf' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'portfolio-editable-diy', 0, 1, 'var_ma49dwhcxf' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'portfolio-editable-pro', 1, 1, 'var_scksr7y0h8' FROM products WHERE slug='portfolio-editable';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web rápida con blog', 'Web ligera con blog para publicar artículos fácilmente y dar a conocer lo que haces.

## Qué recibes
- Web + blog con categorías
- Diseño ligero y rápido de cargar
- Sitemap y RSS
- Guía para añadir artículos tú mismo
- En «Te lo montamos»: hasta 3 artículos que nos facilites, ya publicados

## No incluye
- Redacción de artículos
- Garantía de posición en Google
- Compra del dominio
- Mantenimiento continuo

## Campos que rellenas
- Temática
- Logo y colores
- Primeros temas del blog
- Artículos que ya tengas escritos (hasta 3)

## Ejemplo
> Clínica de fisioterapia con blog «Ejercicios para la espalda» que sus pacientes consultan y comparten.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'web-blog-astro', 'Modalidad', 0, 'prod_7hs8p75fsz', datetime('2026-01-01', '-4 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-blog-astro' AND c.slug='webs';
UPDATE products SET image_key='productos/web-blog-astro.jpg' WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-blog-astro.jpg', 0, 'pimg_dvkejvp45v' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 1, 'pimg_f3exk9d5vh' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-blog-astro-diy', 0, 1, 'var_sv1676tv0c' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'web-blog-astro-pro', 1, 1, 'var_59m8f4kq0b' FROM products WHERE slug='web-blog-astro';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web para taller con reserva de citas', 'Taller mecánico, de bicis o de reparación: servicios, precios orientativos y reserva de cita online.

## Qué recibes
- Web con hasta 6 servicios y precios orientativos
- Calendario de citas (1 taller, 1 calendario, 1 profesional)
- Aviso de cada cita por correo
- Mapa y horario

## No incluye
- Agenda para varios empleados
- Cobro de la cita por adelantado
- Avisos por SMS
- Compra del dominio

## Campos que rellenas
- Nombre del taller
- Servicios y duración (hasta 6)
- Horario y huecos disponibles
- Días festivos o de cierre
- Con cuánta antelación se puede reservar
- ¿Tienes fotos del taller? (te diremos cómo enviarlas)

## Ejemplo
> Talleres Pérez: «Cambio de aceite – 45 min – desde 59 €» y el cliente reserva el hueco del jueves.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'web-taller', 'Modalidad', 0, 'prod_y0hnqajbqm', datetime('2026-01-01', '-5 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-taller' AND c.slug='webs';
UPDATE products SET image_key='productos/web-taller.jpg' WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-taller.jpg', 0, 'pimg_zjbgc6bwn1' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/auto-repair.png', 1, 'pimg_cyg5yyhhsv' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plumber-home-services.png', 2, 'pimg_qrfwy34naa' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cleaning-company.png', 3, 'pimg_tr21ea4pen' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-taller-diy', 0, 1, 'var_3pw4eamfwr' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-taller-pro', 1, 1, 'var_qpx1je76s1' FROM products WHERE slug='web-taller';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Carta digital con código QR', 'Tu carta en el móvil del cliente con un QR en la mesa. Cambias tú los precios cuando quieras desde el móvil, sin coste y sin reimprimir.

## Qué recibes
- Carta digital por secciones
- QR listo para imprimir
- Alérgenos e idiomas
- Cambios ilimitados de precios

## No incluye
- Impresión física de cartas o códigos QR
- Fotografía profesional de los platos
- Rediseños completos de la carta
- Traducciones profesionales a nuevos idiomas
- Integración con TPV o sistemas de caja

## Campos que rellenas
- Nombre del local
- Platos (nombre, precio, alérgenos)
- Fotos (opcional)
- Idiomas

## Ejemplo
> Bar La Esquina: QR en cada mesa → carta con tapas, raciones y bebidas, en español e inglés.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'carta-qr', 'Modalidad', 0, 'prod_z4ae4fwa82', datetime('2026-01-01', '-6 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-qr' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-qr.jpg' WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-qr.jpg', 0, 'pimg_c7k3zw1pay' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_yhpg94ksfx' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 2, 'pimg_jsvd7wz9rr' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cafe-coffee-shop.png', 3, 'pimg_1as444ava6' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/bar-lounge.png', 4, 'pimg_nx1mvzkmcj' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'carta-qr-diy', 0, 1, 'var_4sy4pcm12z' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'carta-qr-pro', 1, 1, 'var_ym6v90a728' FROM products WHERE slug='carta-qr';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Carta QR con pedidos por WhatsApp', 'El cliente elige en la carta, añade al carrito y el pedido te llega por WhatsApp ya escrito.

## Qué recibes
- Carta con carrito
- Pedido enviado a tu WhatsApp
- Opción recoger / a domicilio
- Sin comisiones por pedido

## No incluye
- Cobro online con tarjeta o Bizum
- Repartidores y gestión física de entregas
- Integración con TPV o impresoras de cocina
- Respuesta automática con inteligencia artificial
- Campañas publicitarias para atraer pedidos

## Campos que rellenas
- Carta y precios
- Número de WhatsApp
- Zona y coste de envío
- Horario de pedidos

## Ejemplo
> Pizzería Nápoles: el cliente pide 2 pizzas y te llega «2× Margarita, recoger 21:00» al WhatsApp.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'carta-pedidos-whatsapp', 'Modalidad', 0, 'prod_ew0chd7g22', datetime('2026-01-01', '-7 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-pedidos-whatsapp' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-pedidos-whatsapp.jpg' WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-pedidos-whatsapp.jpg', 0, 'pimg_n024g6majs' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_26y4jtpnx7' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'carta-pedidos-whatsapp-diy', 0, 1, 'var_6cak9c01f9' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'carta-pedidos-whatsapp-pro', 1, 1, 'var_dx6w9ddz9c' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Reservas de mesa online', 'Sistema propio de reservas sin pagar comisión por comensal a plataformas.

## Qué recibes
- Página de reservas
- Panel para ver y confirmar reservas
- Avisos al cliente
- Control de aforo por turno

## No incluye
- Integración con TPV o programas de hostelería
- Costes de SMS u otros servicios externos
- Gestión presencial de mesas y camareros
- Cobro de señales o depósitos con tarjeta
- Personal para atender o confirmar reservas

## Campos que rellenas
- Turnos y aforo
- Mesas
- Días de cierre
- Correo o teléfono de avisos

## Ejemplo
> Restaurante El Puerto: el cliente reserva para 4 el sábado a las 14:30 y tú lo ves en el panel.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'reservas-restaurante', 'Modalidad', 0, 'prod_rpfhg88epj', datetime('2026-01-01', '-8 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-restaurante' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/reservas-restaurante.jpg' WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-restaurante.jpg', 0, 'pimg_7y533ftwzk' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 1, 'pimg_dd1n8feev5' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/pizza-delivery.png', 2, 'pimg_g6v38c9dc7' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'reservas-restaurante-diy', 0, 1, 'var_pgj2mpj7vq' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'reservas-restaurante-pro', 1, 1, 'var_2aj7mkewjb' FROM products WHERE slug='reservas-restaurante';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Asistente IA que toma pedidos', 'Un asistente que contesta dudas de la carta y toma pedidos por chat, 24 horas.

## Qué recibes
- Asistente entrenado con tu carta
- Respuestas sobre alérgenos y horarios
- Pedido resumido para cocina
- Informe de preguntas frecuentes

## No incluye
- Consumo de la API de inteligencia artificial
- Comisiones de pasarelas de pago externas
- Integración con TPV o impresoras de cocina
- Revisión profesional de alérgenos y composición
- Atención humana y resolución de reclamaciones

## Campos que rellenas
- Carta completa
- Preguntas frecuentes
- Horarios y zonas
- Canal (web, Telegram o WhatsApp)

## Ejemplo
> «¿Tenéis algo sin gluten?» → el asistente recomienda 3 platos y apunta el pedido.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 29900, 'eur', 999, 1, 'asistente-ia-pedidos', 'Modalidad', 0, 'prod_9txhgqr547', datetime('2026-01-01', '-9 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='asistente-ia-pedidos' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/asistente-ia-pedidos.jpg' WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/asistente-ia-pedidos.jpg', 0, 'pimg_1zwwb8vv8x' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/food-truck.png', 1, 'pimg_e76b2bwjxf' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 2, 'pimg_6b6pgxjd9m' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'asistente-ia-pedidos-diy', 0, 1, 'var_wp065k32e1' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'asistente-ia-pedidos-pro', 1, 1, 'var_agwtjx78y7' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Página de citas tipo Calendly', 'Comparte un enlace y tus clientes reservan hueco en tu agenda. Sin cuotas por usuario.

## Qué recibes
- Página de reserva con tus huecos
- Tipos de cita (15, 30, 60 min…)
- Confirmación y recordatorio por email
- Enlace para tu web, Instagram o firma

## No incluye
- Cobros online o depósitos por reserva
- Costes de SMS o WhatsApp Business API
- Sincronización con calendarios no indicados
- Gestión de historiales clínicos
- Dominio personalizado y su renovación

## Campos que rellenas
- Tipos de cita y duración
- Horario disponible
- Correo de avisos
- Preguntas previas al cliente

## Ejemplo
> Coach Ana: enlace «Reserva tu sesión de 30 min» en su Instagram; las citas caen solas en su agenda.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 7900, 'eur', 999, 1, 'pagina-citas', 'Modalidad', 0, 'prod_gvtfr6gpds', datetime('2026-01-01', '-10 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pagina-citas' AND c.slug='reservas';
UPDATE products SET image_key='productos/pagina-citas.jpg' WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pagina-citas.jpg', 0, 'pimg_1cqzzg4rd1' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/physiotherapy.png', 1, 'pimg_8ezkg9s7b8' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/dental-clinic.png', 2, 'pimg_179pn823px' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/nutritionist.png', 3, 'pimg_2ak1cxy06w' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'pagina-citas-diy', 0, 1, 'var_xp2505xzs0' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'pagina-citas-pro', 1, 1, 'var_r5y8z617yq' FROM products WHERE slug='pagina-citas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Reservas para peluquería, estética o clínica', 'Motor de reservas por servicio y profesional, con ficha de cliente.

## Qué recibes
- Reserva por servicio y profesional
- Ficha e historial de clientes
- Recordatorios
- Widget para tu web

## No incluye
- TPV, facturación o cobro de los servicios
- Costes de SMS o mensajería de terceros
- Historia clínica o gestión de datos sanitarios
- Programas de nóminas y comisiones del personal
- Campañas de captación y publicidad

## Campos que rellenas
- Servicios, duración y precio
- Profesionales y horarios
- Política de cancelación

## Ejemplo
> Centro Bella: «Manicura con Laura – martes 17:00 – 25 €», con recordatorio el día antes.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 19900, 'eur', 999, 1, 'reservas-salon', 'Modalidad', 0, 'prod_d57cdkg9nr', datetime('2026-01-01', '-11 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-salon' AND c.slug='reservas';
UPDATE products SET image_key='productos/reservas-salon.jpg' WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-salon.jpg', 0, 'pimg_9be3g97wf1' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/spa-salon.png', 1, 'pimg_qace7y9nhc' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/yoga-studio.png', 2, 'pimg_6pg0e0wvw4' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/gym-fitness.png', 3, 'pimg_mmdkhx8788' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'reservas-salon-diy', 0, 1, 'var_zzftdxr4td' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'reservas-salon-pro', 1, 1, 'var_33yta3z4am' FROM products WHERE slug='reservas-salon';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de boda con confirmación de asistencia', 'Toda la información de la boda en una web y los invitados confirman asistencia y menú.

## Qué recibes
- Web con historia, programa, cómo llegar y alojamiento
- Formulario de confirmación de asistencia con menú y alergias
- Lista de confirmados descargable
- Preguntas frecuentes

## No incluye
- Dominio personalizado y su renovación
- Fotografía o vídeo profesional de la boda
- Invitaciones impresas y gastos de imprenta
- Envío postal de invitaciones
- Organización presencial del evento

## Campos que rellenas
- Nombres y fecha
- Lugar de ceremonia y banquete
- Programa del día
- Fotos
- Opciones de menú

## Ejemplo
> Lucía & Pablo: 140 invitados confirman desde el móvil y descargáis el Excel para el catering.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'web-boda-rsvp', 'Modalidad', 0, 'prod_s16zt0x74z', datetime('2026-01-01', '-12 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-boda-rsvp' AND c.slug='bodas';
UPDATE products SET image_key='productos/web-boda-rsvp.jpg' WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-boda-rsvp.jpg', 0, 'pimg_4s7hhc0e06' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 1, 'pimg_b6kn5p7ehb' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/wedding.png', 2, 'pimg_hbehqb8rxm' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-blush.png', 3, 'pimg_7qr68b2x41' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-midnight.png', 4, 'pimg_bgnzp06eyd' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'web-boda-rsvp-diy', 0, 1, 'var_ctccjg4pyx' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-boda-rsvp-pro', 1, 1, 'var_526yycrm9v' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Invitación digital animada', 'Invitación para enviar por WhatsApp: cuenta atrás, ubicación y botón para confirmar.

## Qué recibes
- Invitación web animada
- Cuenta atrás
- Botón de mapa y confirmación
- Enlace para compartir

## No incluye
- Impresión de invitaciones en papel
- Dominio personalizado y su renovación
- Fotografía o vídeo profesional
- Envíos masivos mediante SMS de pago
- Animaciones de vídeo hechas desde cero

## Campos que rellenas
- Tipo de evento
- Nombres
- Fecha, hora y lugar
- Foto o estilo

## Ejemplo
> Bautizo de Hugo: enlace por WhatsApp con foto, cuenta atrás y «Confirmo asistencia».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'invitacion-digital', 'Modalidad', 0, 'prod_0wnch4zjw1', datetime('2026-01-01', '-13 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='invitacion-digital' AND c.slug='bodas';
UPDATE products SET image_key='productos/invitacion-digital.jpg' WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/invitacion-digital.jpg', 0, 'pimg_7d44c6dqak' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/weekend-itinerary.png', 1, 'pimg_75jnqbtvsj' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-sage.png', 2, 'pimg_f4v15y5j8n' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'invitacion-digital-diy', 0, 1, 'var_z4jv5rkxs4' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'invitacion-digital-pro', 1, 1, 'var_ztgshfq9zv' FROM products WHERE slug='invitacion-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Galería privada de fotos del evento', 'Álbum privado con enlace: los invitados ven y suben sus fotos, tú las descargas todas.

## Qué recibes
- Galería privada con enlace
- Subida de fotos de invitados
- Favoritas y descarga
- Panel de administración

## No incluye
- Fotógrafo o videógrafo para el evento
- Impresión de fotografías o álbumes
- Retoque profesional de las imágenes
- Almacenamiento adicional de pago
- Conservación indefinida sin alojamiento activo

## Campos que rellenas
- Nombre del evento
- Fotos iniciales
- Contraseña o enlace privado

## Ejemplo
> Tras la boda, 300 fotos de invitados reunidas en un solo álbum privado.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **69 €** | **149 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 6900, 'eur', 999, 1, 'galeria-privada-evento', 'Modalidad', 0, 'prod_mspdv4vdje', datetime('2026-01-01', '-14 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='galeria-privada-evento' AND c.slug='bodas';
UPDATE products SET image_key='productos/galeria-privada-evento.jpg' WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/galeria-privada-evento.jpg', 0, 'pimg_v76d8zw6v1' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 1, 'pimg_fhdxzf5ckh' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 6900, 999, 'galeria-privada-evento-diy', 0, 1, 'var_grz9fmnvnw' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'galeria-privada-evento-pro', 1, 1, 'var_kzj8ngpdmq' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Gestión de invitados y plano de mesas', 'Lista de invitados, confirmaciones, llamadas pendientes y plano de mesas en PDF.

## Qué recibes
- Panel de invitados
- Seguimiento de confirmaciones
- Plano de mesas imprimible
- Exportación a Excel

## No incluye
- Impresión física de planos y tarjetas
- Servicio presencial de organización de mesas
- Costes de SMS o plataformas de mensajería
- Integración con programas externos no indicados
- Gestión de proveedores y pagos del evento

## Campos que rellenas
- Lista de invitados
- Número de mesas y capacidad
- Restricciones (quién no con quién)

## Ejemplo
> Plano de 15 mesas generado en PDF para el restaurante a partir de las confirmaciones.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 7900, 'eur', 999, 1, 'gestion-invitados-mesas', 'Modalidad', 0, 'prod_qcbpdzgjdp', datetime('2026-01-01', '-15 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='gestion-invitados-mesas' AND c.slug='bodas';
UPDATE products SET image_key='productos/gestion-invitados-mesas.jpg' WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/gestion-invitados-mesas.jpg', 0, 'pimg_bg3k208njd' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 1, 'pimg_4md4xam94d' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/registry-template.png', 2, 'pimg_7z817q58n8' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'gestion-invitados-mesas-diy', 0, 1, 'var_pm9kngbcsm' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'gestion-invitados-mesas-pro', 1, 1, 'var_s2j86nkqkz' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tarjeta de visita digital con QR', 'Tu tarjeta en el móvil: un QR y el cliente guarda tu contacto con un toque.

## Qué recibes
- Tarjeta web personal
- Botón «Guardar contacto» (vCard)
- QR para imprimir
- Enlaces a redes y WhatsApp

## No incluye
- Impresión de tarjetas físicas
- Tarjetas NFC o dispositivos físicos
- Dominio personalizado y su renovación
- Diseño de un logotipo nuevo
- Campañas publicitarias o captación de contactos

## Campos que rellenas
- Nombre y cargo
- Foto
- Teléfono, email y web
- Redes sociales

## Ejemplo
> Javier, comercial: enseña el QR en una feria y el contacto queda guardado en el móvil del cliente.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'tarjeta-digital', 'Modalidad', 0, 'prod_j021nz6hke', datetime('2026-01-01', '-16 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tarjeta-digital' AND c.slug='identidad';
UPDATE products SET image_key='productos/tarjeta-digital.jpg' WHERE slug='tarjeta-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tarjeta-digital.jpg', 0, 'pimg_w9121dqbmd' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'tarjeta-digital-diy', 0, 1, 'var_qkm880jvdn' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'tarjeta-digital-pro', 1, 1, 'var_g0t44r63tc' FROM products WHERE slug='tarjeta-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Página de enlaces para tu bio con estadísticas', 'Tu alternativa a Linktree, en tu dominio y sin cuota mensual, con clics medidos.

## Qué recibes
- Página de enlaces con tu marca
- Estadísticas de clics
- Bloques de vídeo, formulario y productos
- Panel para editar

## No incluye
- Dominio personalizado y su renovación
- Comisiones de pagos de plataformas externas
- Tienda online con cobro y gestión de pedidos
- Producción de vídeos y fotografías
- Publicidad en Instagram, TikTok o Google

## Campos que rellenas
- Nombre o marca
- Foto / logo
- Enlaces con su texto
- Colores

## Ejemplo
> Creadora de recetas: enlace en Instagram con su libro, YouTube y newsletter, y sabe cuál funciona.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'link-in-bio', 'Modalidad', 0, 'prod_qexe7mfa5k', datetime('2026-01-01', '-17 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='link-in-bio' AND c.slug='identidad';
UPDATE products SET image_key='productos/link-in-bio.jpg' WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/link-in-bio.jpg', 0, 'pimg_ymfbqqtdac' FROM products WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/link-in-bio.png', 1, 'pimg_ddsfw5sd3e' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'link-in-bio-diy', 0, 1, 'var_kzbdnsyxw8' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'link-in-bio-pro', 1, 1, 'var_1xyaj8h7g0' FROM products WHERE slug='link-in-bio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Currículum profesional en PDF que pasa los filtros de empresas', 'CV preparado para pasar los filtros automáticos de selección, en PDF y Word.

## Qué recibes
- CV en PDF y Word
- Plantilla a elegir
- Palabras clave para pasar los filtros automáticos de selección
- Versión web opcional

## No incluye
- Fotografía profesional para el currículum
- Traducción profesional a otros idiomas
- Carta de presentación personalizada
- Versión web si no se contrata como opcional
- Garantía de entrevistas o contratación

## Campos que rellenas
- Experiencia
- Formación
- Habilidades
- Puesto al que aspiras

## Ejemplo
> Elena, enfermera: CV de 1 página con las palabras clave de la oferta del hospital.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'cv-profesional', 'Modalidad', 0, 'prod_4mkgycmnyq', datetime('2026-01-01', '-18 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='cv-profesional' AND c.slug='identidad';
UPDATE products SET image_key='productos/cv-profesional.jpg' WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/cv-profesional.jpg', 0, 'pimg_ap1gsrzgk4' FROM products WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/resume-cv.png', 1, 'pimg_jcb8by614g' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'cv-profesional-diy', 0, 1, 'var_z6x76tcv1b' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'cv-profesional-pro', 1, 1, 'var_yct4hwst1h' FROM products WHERE slug='cv-profesional';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Muro de opiniones de clientes', 'Recoge opiniones con un enlace, apruébalas y muéstralas en tu web.

## Qué recibes
- Formulario para dejar opinión
- Panel para aprobar
- Muro/widget para tu web
- Opiniones con foto y estrellas

## No incluye
- Compra o generación de opiniones de clientes
- Importación automática desde cualquier plataforma
- Campañas de captación de reseñas
- Moderación manual continua por nuestro equipo
- Dominio personalizado y su renovación

## Campos que rellenas
- Nombre del negocio
- Preguntas para el cliente
- Web donde insertarlo

## Ejemplo
> Academia de inglés: tras cada curso envía el enlace y las mejores opiniones salen en su portada.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **119 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'muro-testimonios', 'Modalidad', 0, 'prod_e6fh1yehs1', datetime('2026-01-01', '-19 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='muro-testimonios' AND c.slug='identidad';
UPDATE products SET image_key='productos/muro-testimonios.jpg' WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/muro-testimonios.jpg', 0, 'pimg_ytk34kqr0r' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_z1v2ymw4fk' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'muro-testimonios-diy', 0, 1, 'var_j3mgyw1cpc' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 11900, 999, 'muro-testimonios-pro', 1, 1, 'var_ddr3530qez' FROM products WHERE slug='muro-testimonios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Formulario de contacto con aviso al móvil', 'Cada mensaje de tu web te llega al instante por Telegram o email, con antispam.

## Qué recibes
- Formulario listo para tu web
- Aviso por Telegram y/o email
- Protección antispam
- Histórico de mensajes

## No incluye
- Envío de SMS o llamadas telefónicas
- Integración con CRM no especificados
- Campañas de email marketing
- Dominio y alojamiento de una web completa
- Gestión humana de los mensajes recibidos

## Campos que rellenas
- Campos del formulario
- Canal de aviso
- Web donde va

## Ejemplo
> Fontanero: «Nueva consulta: fuga en cocina, Calle Mayor 3» le llega al Telegram en 2 segundos.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'formulario-aviso-telegram', 'Modalidad', 0, 'prod_jf6b9z7q44', datetime('2026-01-01', '-20 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='formulario-aviso-telegram' AND c.slug='captacion';
UPDATE products SET image_key='productos/formulario-aviso-telegram.jpg' WHERE slug='formulario-aviso-telegram';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/formulario-aviso-telegram.jpg', 0, 'pimg_pfbad1azgy' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'formulario-aviso-telegram-diy', 0, 1, 'var_wm2e1hde06' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'formulario-aviso-telegram-pro', 1, 1, 'var_2ey9skvs7c' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Lista de espera con referidos', 'Para lanzamientos: la gente se apunta, comparte su enlace y sube puestos en la lista.

## Qué recibes
- Página de lista de espera
- Enlace de referido por persona
- Ranking y exportación
- Correo de bienvenida

## No incluye
- Publicidad para captar inscritos
- Envíos de newsletters periódicas
- Costes de proveedores externos de email
- Integración con CRM no indicados
- Premios o incentivos para los referidos

## Campos que rellenas
- Nombre del producto
- Fecha de lanzamiento
- Premio por referidos

## Ejemplo
> Nueva app de recetas: 1.200 apuntados antes de abrir, 40 % llegados por referidos.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 7900, 'eur', 999, 1, 'lista-espera', 'Modalidad', 0, 'prod_qzb0e1528w', datetime('2026-01-01', '-21 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='lista-espera' AND c.slug='captacion';
UPDATE products SET image_key='productos/lista-espera.jpg' WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/lista-espera.jpg', 0, 'pimg_p6na4p6tpc' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/coming-soon.png', 1, 'pimg_w83cywjy8b' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/webinar-signup.png', 2, 'pimg_zwd0tdck4r' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'lista-espera-diy', 0, 1, 'var_rvd0j71y4t' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'lista-espera-pro', 1, 1, 'var_1qqpqsdnds' FROM products WHERE slug='lista-espera';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Avisos automáticos por varios canales', 'Cualquier evento de tus herramientas (pago, formulario, pedido) avisa a Slack, Telegram, Discord o email.

## Qué recibes
- Bandeja de eventos
- Reglas de aviso por canal
- Histórico consultable

## No incluye
- Costes de SMS, WhatsApp API u otros canales
- Integraciones no contempladas en la configuración
- Atención humana cuando llega un aviso
- Resolución automática del problema notificado
- Envíos ilimitados en servicios externos de pago

## Campos que rellenas
- Herramientas que envían eventos
- Canales de aviso
- Qué eventos interesan

## Ejemplo
> Cada venta de la tienda manda «🎉 Nueva venta 49 €» al grupo de Telegram del equipo.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **59 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 5900, 'eur', 999, 1, 'avisos-multicanal', 'Modalidad', 0, 'prod_ahqjj0jsht', datetime('2026-01-01', '-22 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='avisos-multicanal' AND c.slug='captacion';
UPDATE products SET image_key='productos/avisos-multicanal.jpg' WHERE slug='avisos-multicanal';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/avisos-multicanal.jpg', 0, 'pimg_k7nwn73fgt' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 5900, 999, 'avisos-multicanal-diy', 0, 1, 'var_smcad5sxej' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'avisos-multicanal-pro', 1, 1, 'var_9nznd8fqen' FROM products WHERE slug='avisos-multicanal';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Bot de Telegram con IA', 'Un asistente con IA en Telegram para tu negocio o comunidad, con tus instrucciones.

## Qué recibes
- Bot de Telegram publicado
- Personalidad e instrucciones a medida
- Control de quién puede usarlo
- Alojamiento sin servidor

## No incluye
- Consumo de la API de OpenAI u otros modelos
- Integración con ERP o CRM externos
- Entrenamiento de un modelo de IA propio
- Supervisión humana permanente de respuestas
- Atención mediante WhatsApp u otros canales

## Campos que rellenas
- Nombre del bot
- Para qué sirve
- Instrucciones/tono
- Usuarios permitidos

## Ejemplo
> Gimnasio: bot que responde horarios, tarifas y ejercicios a los socios a cualquier hora.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'bot-telegram-chatgpt', 'Modalidad', 0, 'prod_q63f0mb3tr', datetime('2026-01-01', '-23 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-chatgpt' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-chatgpt.jpg' WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-chatgpt.jpg', 0, 'pimg_cx53xt8r8j' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'bot-telegram-chatgpt-diy', 0, 1, 'var_7e8pya7x99' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'bot-telegram-chatgpt-pro', 1, 1, 'var_6sgvg5t4v9' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Bot de Telegram con menús y pedidos', 'Bot con botones: catálogo, reservas, avisos y pedidos, conectado a tu hoja de cálculo.

## Qué recibes
- Bot con menús de botones
- Conexión con Google Sheets
- Avisos programados
- Panel de mensajes

## No incluye
- Integraciones adicionales a Google Sheets
- Consumo de servicios externos de pago
- Pasarelas de pago y sus comisiones
- Atención humana de los mensajes recibidos
- Desarrollo de una aplicación móvil propia

## Campos que rellenas
- Opciones del menú
- Datos (productos, horarios)
- Quién recibe los pedidos

## Ejemplo
> Panadería: el cliente pulsa «Encargar», elige pan y hora, y el pedido cae en la hoja del obrador.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'bot-telegram-medida', 'Modalidad', 0, 'prod_gw27ysda25', datetime('2026-01-01', '-24 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-medida' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-medida.jpg' WHERE slug='bot-telegram-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-medida.jpg', 0, 'pimg_6n23xs233f' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'bot-telegram-medida-diy', 0, 1, 'var_qnkjb76m4b' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'bot-telegram-medida-pro', 1, 1, 'var_f2xkwqzp1k' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('CRM de WhatsApp para tu equipo', 'Bandeja compartida de WhatsApp: varios agentes, contactos, embudo de ventas y envíos masivos.

## Qué recibes
- Bandeja compartida
- Contactos y etiquetas
- Embudo de oportunidades
- Difusiones

## No incluye
- Tarifas de WhatsApp Business Platform o proveedores
- Costes de plantillas y mensajes de pago
- Obtención del consentimiento de los contactos
- Compra de bases de datos de clientes
- Integración con ERP o programas no indicados
- Personal para atender las conversaciones

## Campos que rellenas
- Números de WhatsApp Business
- Agentes
- Etapas de venta

## Ejemplo
> Autoescuela: 3 personas atienden el mismo WhatsApp y nadie responde dos veces al mismo alumno.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **699 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 29900, 'eur', 999, 1, 'crm-whatsapp', 'Modalidad', 0, 'prod_4fd25f3sda', datetime('2026-01-01', '-25 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='crm-whatsapp' AND c.slug='bots';
UPDATE products SET image_key='productos/crm-whatsapp.jpg' WHERE slug='crm-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/crm-whatsapp.jpg', 0, 'pimg_mf7z757553' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'crm-whatsapp-diy', 0, 1, 'var_gnkj7ksxz5' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 69900, 999, 'crm-whatsapp-pro', 1, 1, 'var_dj67z82hem' FROM products WHERE slug='crm-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Captación de clientes automática', 'Formulario → hoja de cálculo → email de bienvenida → aviso a tu móvil. Sin copiar y pegar.

## Qué recibes
- Flujo n8n importado y probado
- Registro en Google Sheets
- Correo automático al cliente
- Aviso a Telegram

## No incluye
- Publicidad para conseguir visitantes o contactos
- Cuotas de n8n, servidor o servicios externos
- Compra de bases de datos de potenciales clientes
- Integraciones distintas de las indicadas
- Gestión comercial humana de los contactos

## Campos que rellenas
- Formulario de origen
- Hoja de destino
- Texto del email
- Canal de aviso

## Ejemplo
> Academia: cada interesado queda en la hoja, recibe el temario y tú te enteras al momento.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'auto-captacion-leads', 'Modalidad', 0, 'prod_gk628v891f', datetime('2026-01-01', '-26 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-captacion-leads' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-captacion-leads.jpg' WHERE slug='auto-captacion-leads';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-captacion-leads.jpg', 0, 'pimg_j2d2jy0cj5' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'auto-captacion-leads-diy', 0, 1, 'var_j9s7wj06d0' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-captacion-leads-pro', 1, 1, 'var_43zxek0z1v' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Facturas recibidas a hoja de cálculo', 'Las facturas que llegan al email se leen solas y se apuntan en tu hoja: proveedor, fecha, importe, IVA.

## Qué recibes
- Flujo que vigila tu email
- Extracción automática de datos
- Hoja de cálculo ordenada
- Copia del PDF en tu nube

## No incluye
- Programa de contabilidad o presentación de impuestos
- Revisión contable manual de cada factura
- Garantía de extracción perfecta en PDFs difíciles
- Cuotas de OCR, IA o servicios externos
- Conexión con ERP no especificados

## Campos que rellenas
- Correo donde llegan las facturas
- Hoja de destino
- Campos a extraer

## Ejemplo
> Autónomo: a final de trimestre tiene todas las facturas apuntadas para la gestoría.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'auto-facturas', 'Modalidad', 0, 'prod_dk9nw95m0e', datetime('2026-01-01', '-27 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-facturas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-facturas.jpg' WHERE slug='auto-facturas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-facturas.jpg', 0, 'pimg_p44ep2grdw' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'auto-facturas-diy', 0, 1, 'var_fhj8rsqghp' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-facturas-pro', 1, 1, 'var_t3tqj879me' FROM products WHERE slug='auto-facturas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Resumen semanal de reseñas', 'Cada lunes recibes un resumen con IA de lo que dicen tus clientes: lo bueno, lo malo y qué responder.

## Qué recibes
- Flujo semanal programado
- Resumen con IA
- Borradores de respuesta
- Envío por email o Telegram

## No incluye
- Publicación automática de respuestas a reseñas
- Costes de API de inteligencia artificial
- Eliminación de reseñas negativas
- Campañas para conseguir nuevas opiniones
- Gestión de reclamaciones de clientes

## Campos que rellenas
- Dónde están tus reseñas
- Correo o Telegram de destino

## Ejemplo
> Hotel rural: «Esta semana 12 reseñas, 2 quejas por el wifi», con respuesta sugerida.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'auto-resenas', 'Modalidad', 0, 'prod_g6m3rk25ay', datetime('2026-01-01', '-28 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-resenas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-resenas.jpg' WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-resenas.jpg', 0, 'pimg_mrk5z7kc24' FROM products WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_b7yhwns6hx' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'auto-resenas-diy', 0, 1, 'var_9adjkmsvjr' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-resenas-pro', 1, 1, 'var_a6d30gabw4' FROM products WHERE slug='auto-resenas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Una automatización a elegir del catálogo', 'Elige entre más de 280 flujos probados (Gmail, WhatsApp, Notion, Drive, IA…) y lo dejamos funcionando con tus cuentas.

## Qué recibes
- Flujo instalado y conectado
- Prueba con datos reales
- Guía de uso de 1 página

## No incluye
- Instalación de varios flujos distintos
- Cuotas de servicios externos utilizados
- Desarrollo de integraciones no contempladas
- Mantenimiento y vigilancia continua del flujo
- Cambios importantes de funcionamiento posteriores

## Campos que rellenas
- Qué tarea repetitiva quieres quitarte
- Herramientas que usas
- Accesos (te guiamos)

## Ejemplo
> Guardar adjuntos de Gmail en Drive por cliente, o publicar en redes lo que subes al blog.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'auto-plantilla-medida', 'Modalidad', 0, 'prod_xddgmabd64', datetime('2026-01-01', '-29 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-plantilla-medida' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-plantilla-medida.jpg' WHERE slug='auto-plantilla-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-plantilla-medida.jpg', 0, 'pimg_74qq3xmafv' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'auto-plantilla-medida-diy', 0, 1, 'var_2x318t5seg' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-plantilla-medida-pro', 1, 1, 'var_e07d6z2w4a' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tareas programadas en la nube', 'Procesos que se ejecutan solos cada hora/día: copias, informes, sincronizaciones, recordatorios.

## Qué recibes
- Proceso en la nube con reintentos
- Registro de ejecuciones
- Aviso si algo falla

## No incluye
- Desarrollo de nuevas tareas no contratadas
- Cuotas de API y aplicaciones de terceros
- Atención humana permanente a incidencias
- Garantía de disponibilidad del 100 %
- Gestión continuada fuera del mantenimiento contratado

## Campos que rellenas
- Qué hay que hacer
- Cada cuánto
- Origen y destino de los datos

## Ejemplo
> Cada noche se copian los pedidos del día a la hoja de contabilidad y se envía el total por email.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 19900, 'eur', 999, 1, 'auto-tareas-programadas', 'Modalidad', 0, 'prod_gzm3q1d9ae', datetime('2026-01-01', '-30 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-tareas-programadas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-tareas-programadas.jpg' WHERE slug='auto-tareas-programadas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-tareas-programadas.jpg', 0, 'pimg_v6xcczh9ze' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'auto-tareas-programadas-diy', 0, 1, 'var_bxxwcgsjwy' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'auto-tareas-programadas-pro', 1, 1, 'var_f1kt3gszq6' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Acortador de enlaces con tu dominio', 'Enlaces cortos de marca (tunegocio.es/oferta) con estadísticas de clics y QR.

## Qué recibes
- Acortador en tu dominio
- Estadísticas por enlace
- QR por enlace
- Panel de gestión

## No incluye
- Compra del dominio y su renovación
- Diseño o impresión de flyers y carteles
- Campañas de publicidad para generar clics
- Integración con herramientas de analítica no indicadas

## Campos que rellenas
- Dominio o subdominio
- Primeros enlaces

## Ejemplo
> Campaña de flyers con tunegocio.es/verano: sabes cuántos escanearon el QR y desde dónde.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'acortador-enlaces', 'Modalidad', 0, 'prod_c90k565k6c', datetime('2026-01-01', '-31 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='acortador-enlaces' AND c.slug='enlaces';
UPDATE products SET image_key='productos/acortador-enlaces.jpg' WHERE slug='acortador-enlaces';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/acortador-enlaces.jpg', 0, 'pimg_p9f7zasga3' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'acortador-enlaces-diy', 0, 1, 'var_ryfjcyp4an' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'acortador-enlaces-pro', 1, 1, 'var_k851vp50hf' FROM products WHERE slug='acortador-enlaces';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pack de códigos QR para campañas', 'QR en vector listos para imprenta, con enlace editable y medición.

## Qué recibes
- Hasta 10 QR en SVG/PNG
- Enlaces editables después de imprimir
- Medición de escaneos

## No incluye
- Más de 10 códigos QR en el pack inicial
- Impresión de pegatinas, carteles o soportes
- Dominio personalizado y su renovación
- Publicidad para conseguir escaneos
- Identificación personal de quien escanea

## Campos que rellenas
- Destinos de cada QR
- Colores / logo

## Ejemplo
> QR en escaparate, carta y tarjetas, cada uno medido por separado.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1900, 'eur', 999, 1, 'qr-campanas', 'Modalidad', 0, 'prod_8yzpe14pwe', datetime('2026-01-01', '-32 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='qr-campanas' AND c.slug='enlaces';
UPDATE products SET image_key='productos/qr-campanas.jpg' WHERE slug='qr-campanas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/qr-campanas.jpg', 0, 'pimg_hbqqerq31t' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'qr-campanas-diy', 0, 1, 'var_d3ype0shvc' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'qr-campanas-pro', 1, 1, 'var_79bva8bg28' FROM products WHERE slug='qr-campanas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Analítica web sin cookies', 'Sabe cuántas visitas tienes y de dónde vienen, sin banner de cookies molesto.

## Qué recibes
- Panel de analítica privado
- Instalación en tu web
- Informe mensual por email (con plan)

## No incluye
- Informe mensual sin el plan correspondiente
- Auditoría legal completa de privacidad y RGPD
- Integración con herramientas no indicadas
- Gestión de campañas publicitarias
- Garantía de identificar a todos los visitantes

## Campos que rellenas
- Web(s) a medir
- Correo para informes

## Ejemplo
> Tienda local: «este mes 2.300 visitas, 40 % desde Instagram, la página más vista es Ofertas».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'analitica-sin-cookies', 'Modalidad', 0, 'prod_6g912a3yvz', datetime('2026-01-01', '-33 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='analitica-sin-cookies' AND c.slug='enlaces';
UPDATE products SET image_key='productos/analitica-sin-cookies.jpg' WHERE slug='analitica-sin-cookies';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/analitica-sin-cookies.jpg', 0, 'pimg_mzj8yg5q9j' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'analitica-sin-cookies-diy', 0, 1, 'var_0d0ajemwhn' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'analitica-sin-cookies-pro', 1, 1, 'var_2d28ack7s0' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tienda de productos digitales', 'Vende ebooks, plantillas, cursos o presets: el cliente paga y descarga al momento.

## Qué recibes
- Tienda con pago online
- Entrega automática del archivo
- Panel de pedidos
- Correos de compra

## No incluye
- Comisiones de Stripe u otras pasarelas de pago
- Dominio personalizado y su renovación
- Creación de los productos digitales que vendas
- Asesoramiento fiscal y redacción de textos legales
- Publicidad y captación de compradores
- Atención al cliente y gestión de devoluciones

## Campos que rellenas
- Productos y precios
- Archivos a entregar
- Cuenta de cobro (Stripe)

## Ejemplo
> Diseñadora vende packs de plantillas de Canva a 9 € con descarga instantánea.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 29900, 'eur', 999, 1, 'tienda-productos-digitales', 'Modalidad', 0, 'prod_668s8tsgjk', datetime('2026-01-01', '-34 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-productos-digitales' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-productos-digitales.jpg' WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-productos-digitales.jpg', 0, 'pimg_8p0mf7y89y' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ebook-download.png', 1, 'pimg_m3c9r7693v' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tienda-descargas.png', 2, 'pimg_vadjxswf7f' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'tienda-productos-digitales-diy', 0, 1, 'var_bcw37ab2qs' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'tienda-productos-digitales-pro', 1, 1, 'var_hkz76wqw35' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tienda online completa', 'Catálogo, variantes, carrito, pagos, envíos y panel de pedidos. Sin comisiones de plataforma.

## Qué recibes
- Tienda con tu marca
- Pagos con tarjeta
- Gestión de stock y envíos
- Panel de administración

## No incluye
- Comisiones de pasarelas de pago
- Gastos de mensajería y transporte de pedidos
- Fotografía profesional de productos
- Redacción jurídica de textos legales y condiciones
- Carga masiva de catálogos no presupuestados
- Campañas de publicidad y posicionamiento continuo

## Campos que rellenas
- Productos, variantes y fotos
- Tarifas de envío
- Datos legales
- Cuenta de cobro

## Ejemplo
> Tienda de cerámica artesana con 40 productos, envío a península y aviso de cada venta.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **499 €** | **999 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 49900, 'eur', 999, 1, 'tienda-online', 'Modalidad', 0, 'prod_4qwfngv5wg', datetime('2026-01-01', '-35 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-online' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-online.jpg' WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-online.jpg', 0, 'pimg_jf6r9y5xjx' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/fashion-store.png', 1, 'pimg_3m768c9m4j' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cosmetics-skincare-store.png', 2, 'pimg_pnx4mwmxw3' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/single-product-store.png', 3, 'pimg_j8k6m9y8bm' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 49900, 999, 'tienda-online-diy', 0, 1, 'var_s2hxx2p166' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99900, 999, 'tienda-online-pro', 1, 1, 'var_fsqxn3pw0v' FROM products WHERE slug='tienda-online';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Marketplace de productos digitales', 'Plataforma donde varios creadores venden plantillas, presets o cursos y tú cobras comisión.

## Qué recibes
- Marketplace multivendedor
- Previsualizaciones
- Pagos y descargas protegidas
- Panel de vendedores

## No incluye
- Comisiones de Stripe Connect y otros proveedores
- Verificación legal y fiscal de cada vendedor
- Creación de los productos de los vendedores
- Moderación humana continua del catálogo
- Gestión fiscal y reparto contable de ingresos
- Publicidad para atraer vendedores y compradores

## Campos que rellenas
- Nombre y nicho
- Comisión
- Categorías
- Primeros vendedores

## Ejemplo
> Marketplace de plantillas de Notion para estudiantes con 15 creadores.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **699 €** | **1299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 69900, 'eur', 999, 1, 'marketplace-plantillas', 'Modalidad', 0, 'prod_d2acs016sh', datetime('2026-01-01', '-36 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='marketplace-plantillas' AND c.slug='tiendas';
UPDATE products SET image_key='productos/marketplace-plantillas.jpg' WHERE slug='marketplace-plantillas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/marketplace-plantillas.jpg', 0, 'pimg_c6k8qxa5kw' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 69900, 999, 'marketplace-plantillas-diy', 0, 1, 'var_en9q69yr0v' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 129900, 999, 'marketplace-plantillas-pro', 1, 1, 'var_za0ka3mk23' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Portal de clientes para agencias y autónomos', 'Tus clientes entran con su usuario y ven proyectos, archivos, facturas y avances.

## Qué recibes
- Portal con tu marca
- Proyectos y tareas
- Archivos compartidos
- Facturas y presupuestos

## No incluye
- Integración con programas contables externos
- Firma electrónica avanzada o certificada
- Licencias de herramientas externas de pago
- Gestión humana de proyectos y clientes
- Dominio personalizado y su renovación

## Campos que rellenas
- Logo y colores
- Clientes y proyectos iniciales
- Servicios que facturas

## Ejemplo
> Estudio de diseño: el cliente ve «Logo – fase 2 de 3» y descarga las propuestas.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 29900, 'eur', 999, 1, 'portal-cliente', 'Modalidad', 0, 'prod_gp46f74q1q', datetime('2026-01-01', '-37 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portal-cliente' AND c.slug='portales';
UPDATE products SET image_key='productos/portal-cliente.jpg' WHERE slug='portal-cliente';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portal-cliente.jpg', 0, 'pimg_ypxs8tjbmv' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 29900, 999, 'portal-cliente-diy', 0, 1, 'var_r70m017xb9' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'portal-cliente-pro', 1, 1, 'var_13g0pq5wzn' FROM products WHERE slug='portal-cliente';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web a medida con editor visual completo', 'Web con editor visual: cambias textos, imágenes y secciones arrastrando, como en Wix, pero tuya.

## Qué recibes
- Web con editor visual
- Bloques prediseñados
- Formación de 30 min
- Alojamiento propio

## No incluye
- Dominio personalizado y su renovación
- Redacción profesional de todos los contenidos
- Fotografía y vídeo profesional
- Integraciones avanzadas no presupuestadas
- Mantenimiento y cambios hechos por nuestro equipo
- Campañas de SEO o publicidad continuadas

## Campos que rellenas
- Secciones que necesitas
- Contenido inicial
- Quién la editará

## Ejemplo
> Asociación cultural: la junta cambia la agenda de actividades cada semana sin depender de nadie.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **399 €** | **799 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 39900, 'eur', 999, 1, 'web-editable-visual', 'Modalidad', 0, 'prod_97djtwf4zm', datetime('2026-01-01', '-38 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-editable-visual' AND c.slug='portales';
UPDATE products SET image_key='productos/web-editable-visual.jpg' WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-editable-visual.jpg', 0, 'pimg_5bsmx0t53x' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/editor-bloques.png', 1, 'pimg_6g3fqyyg9a' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 39900, 999, 'web-editable-visual-diy', 0, 1, 'var_yk1e9ntn3n' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 79900, 999, 'web-editable-visual-pro', 1, 1, 'var_7y0db9kqsn' FROM products WHERE slug='web-editable-visual';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Mantenimiento web (mes)', 'Nos ocupamos de que tu web siga funcionando: copias, actualizaciones y pequeños cambios.

## Qué recibes
- Copias de seguridad
- Actualizaciones de seguridad
- 30 min de cambios al mes
- Vigilancia de caídas

## No incluye
- Cambios que superen los 30 minutos mensuales
- Rediseño completo o creación de nuevas páginas
- Dominio y alojamiento si se contratan aparte
- Licencias de plugins o herramientas de terceros
- Nuevas funciones o integraciones complejas
- Recuperación de daños ajenos al servicio contratado

## Campos que rellenas
- Web a mantener
- Accesos (te guiamos)

## Ejemplo
> Cambiar el horario de verano o subir la nueva carta: nos lo mandas y está hecho.

**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1900, 'eur', 999, 1, 'plan-mantenimiento-web', NULL, 0, 'prod_5ytqwnxnsd', datetime('2026-01-01', '-39 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-mantenimiento-web' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-mantenimiento-web.jpg' WHERE slug='plan-mantenimiento-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-mantenimiento-web.jpg', 0, 'pimg_azhvckg2ae' FROM products WHERE slug='plan-mantenimiento-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Alojamiento + dominio gestionado (mes)', 'Tu web publicada con candado de seguridad (https) y tu dominio, sin preocuparte de renovaciones.

## Qué recibes
- Alojamiento rápido con SSL
- Gestión del dominio
- Correo de reenvío

## No incluye
- Diseño o creación de la página web
- Buzón de correo completo: solo reenvío
- Dominios adicionales o extensiones especiales
- Mantenimiento de contenidos de la web
- Licencias de programas y plugins de pago
- Servidores dedicados o recursos exclusivos

## Campos que rellenas
- Dominio deseado
- Web a alojar

## Ejemplo
> tunegocio.es apuntando a tu web, renovado cada año sin que tengas que hacer nada.

**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 900, 'eur', 999, 1, 'plan-hosting-dominio', NULL, 0, 'prod_9hqh0z3t1y', datetime('2026-01-01', '-40 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-hosting-dominio' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-hosting-dominio.jpg' WHERE slug='plan-hosting-dominio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-hosting-dominio.jpg', 0, 'pimg_3pt1vgdnca' FROM products WHERE slug='plan-hosting-dominio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Automatizaciones vigiladas (mes)', 'Mantenemos tus automatizaciones en marcha: si una falla, la arreglamos antes de que lo notes.

## Qué recibes
- Servidor n8n/Activepieces gestionado
- Vigilancia de errores
- 1 flujo nuevo pequeño al mes

## No incluye
- Más de un flujo nuevo pequeño al mes
- Desarrollo de automatizaciones complejas
- Consumo de API de IA o servicios de terceros
- Licencias externas de aplicaciones conectadas
- Gestión humana de los resultados de cada flujo

## Campos que rellenas
- Automatizaciones actuales
- Canal de aviso

## Ejemplo
> El token de Google caduca un viernes por la noche: lo renovamos y el flujo sigue.

**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'plan-automatizaciones', NULL, 0, 'prod_jywv1chmke', datetime('2026-01-01', '-41 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-automatizaciones' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-automatizaciones.jpg' WHERE slug='plan-automatizaciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-automatizaciones.jpg', 0, 'pimg_9g7yzdbzd1' FROM products WHERE slug='plan-automatizaciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Auditoría web exprés', 'Informe claro de velocidad, SEO, móvil y accesibilidad de tu web, con lo que hay que arreglar primero.

## Qué recibes
- Informe PDF de 5–8 páginas
- Lista priorizada de mejoras
- Presupuesto cerrado para arreglarlo

## No incluye
- Aplicación de las mejoras detectadas
- Rediseño o programación de la web
- Compra de herramientas y licencias externas
- Campañas de SEO o publicidad
- Seguimiento mensual después de la auditoría

## Campos que rellenas
- URL de la web
- Objetivo (más ventas, más llamadas…)

## Ejemplo
> «Tu web tarda 6 s en móvil por 3 imágenes de 4 MB: arreglarlo sube las llamadas».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'auditoria-web', NULL, 0, 'prod_jkyp2f083a', datetime('2026-01-01', '-42 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auditoria-web' AND c.slug='planes';
UPDATE products SET image_key='productos/auditoria-web.jpg' WHERE slug='auditoria-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auditoria-web.jpg', 0, 'pimg_c0dzvd3m81' FROM products WHERE slug='auditoria-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Aviso si tu web se cae + página de estado', 'Comprobamos tu web cada minuto y te avisamos al móvil si deja de funcionar, con una página pública de estado.

## Qué recibes
- Vigilancia cada 60 s de webs, tiendas o reservas
- Aviso por Telegram o email
- Página de estado con tu logo
- Informe mensual de disponibilidad

## No incluye
- Reparación de las averías detectadas
- Alojamiento o mantenimiento de la web vigilada
- Atención humana de urgencias
- Garantía de disponibilidad del 100 %
- Costes de canales de aviso externos de pago

## Campos que rellenas
- Webs a vigilar (URLs)
- Canal de aviso (Telegram / email)
- Logo

## Ejemplo
> La tienda de Ana cae un sábado a las 23:10; a las 23:11 le llega «tienda caída» al Telegram con la hora y el error, y ya puede avisar a quien le mantiene la web.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'vigilancia-caidas', 'Modalidad', 0, 'prod_hv31gp1rt6', datetime('2026-01-01', '-43 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-caidas' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-caidas.jpg' WHERE slug='vigilancia-caidas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-caidas.jpg', 0, 'pimg_6xkzrqx0b4' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'vigilancia-caidas-diy', 0, 1, 'var_j7aygxck26' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'vigilancia-caidas-pro', 1, 1, 'var_hcqazxm3j7' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Generador de facturas y presupuestos con tu marca', 'Rellenas cliente y conceptos, y sale una factura o presupuesto en PDF con tu logo, IVA calculado y numeración.

## Qué recibes
- Generador web propio (tuyo, sin cuotas)
- Plantilla con tu logo y datos fiscales
- Descarga en PDF y envío por email
- Guía de uso de 1 página

## No incluye
- Asesoramiento fiscal o contable
- Adaptación a VeriFactu o factura electrónica
- Presentación de impuestos ante Hacienda
- Integración con programas contables externos
- Cuotas de servicios de email externos, si se usan

## Campos que rellenas
- Razón social y NIF
- Logo y colores
- Tipos de IVA / IRPF que usas
- Formato de numeración

## Ejemplo
> Electricista autónomo: «Presupuesto P-2026-014 · cambio de cuadro · 380 € + IVA» enviado al cliente en 2 minutos desde el móvil.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 7900, 'eur', 999, 1, 'facturas-presupuestos', 'Modalidad', 0, 'prod_bxsx4ndenh', datetime('2026-01-01', '-44 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='facturas-presupuestos' AND c.slug='documentos';
UPDATE products SET image_key='productos/facturas-presupuestos.jpg' WHERE slug='facturas-presupuestos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/facturas-presupuestos.jpg', 0, 'pimg_y6crpj1tva' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 7900, 999, 'facturas-presupuestos-diy', 0, 1, 'var_b64p05t86m' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'facturas-presupuestos-pro', 1, 1, 'var_kvwrkbgrxn' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Diplomas y certificados en PDF automáticos', 'Para academias, cursos y eventos: subes la lista de alumnos y cada uno recibe su certificado personalizado.

## Qué recibes
- Plantilla de diploma con tu diseño
- Generación masiva desde una hoja de cálculo
- Envío automático por email
- Código QR de verificación

## No incluye
- Acreditación oficial de cursos o formaciones
- Impresión y envío postal de diplomas
- Costes de plataformas externas de email
- Firma electrónica cualificada o certificada
- Integración con plataformas educativas no indicadas

## Campos que rellenas
- Logo y firma
- Texto del certificado
- Hoja con nombres, correos y horas
- Correo remitente

## Ejemplo
> Academia de inglés: 120 alumnos terminan el curso y en 5 minutos cada uno tiene su diploma con QR en el correo.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **229 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'certificados-automaticos', 'Modalidad', 0, 'prod_n4x1tk4vtz', datetime('2026-01-01', '-45 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='certificados-automaticos' AND c.slug='documentos';
UPDATE products SET image_key='productos/certificados-automaticos.jpg' WHERE slug='certificados-automaticos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/certificados-automaticos.jpg', 0, 'pimg_6fd66m13bv' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'certificados-automaticos-diy', 0, 1, 'var_nf95t46jbr' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 22900, 999, 'certificados-automaticos-pro', 1, 1, 'var_ajww1bgqsh' FROM products WHERE slug='certificados-automaticos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Transcripción automática de audios y reuniones', 'Mandas un audio o una grabación y recibes el texto y un resumen con tareas. Funciona con audios de WhatsApp.

## Qué recibes
- Carpeta o bot donde dejar los audios
- Texto completo en español
- Resumen con puntos y tareas
- Copia en Google Docs o email

## No incluye
- Costes de IA o transcripción de terceros
- Traducción profesional a otros idiomas
- Corrección humana palabra por palabra
- Identificación garantizada de todos los hablantes
- Grabación presencial de reuniones
- Transcripción fiable de audios ininteligibles

## Campos que rellenas
- Dónde te llegan los audios (WhatsApp, Telegram, carpeta)
- Dónde quieres el texto
- Idioma principal

## Ejemplo
> Gestoría: reenvía al bot la nota de voz del cliente y recibe «Pide cita para la renta, trae 3 nóminas».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **149 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'transcripcion-audios', 'Modalidad', 0, 'prod_117jj2y39k', datetime('2026-01-01', '-46 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='transcripcion-audios' AND c.slug='documentos';
UPDATE products SET image_key='productos/transcripcion-audios.jpg' WHERE slug='transcripcion-audios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/transcripcion-audios.jpg', 0, 'pimg_f0fde2ahr0' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'transcripcion-audios-diy', 0, 1, 'var_6v6cxzyrbg' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'transcripcion-audios-pro', 1, 1, 'var_d6f8nqgfrz' FROM products WHERE slug='transcripcion-audios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Chat con IA en tu web que responde con tus datos', 'Un asistente en tu web que contesta horarios, precios y dudas frecuentes usando tu información, y te pasa los contactos.

## Qué recibes
- Chat en tu web o en una página propia
- Entrenado con tus textos, PDFs y preguntas frecuentes
- Aviso cuando alguien deja sus datos
- Panel para revisar conversaciones

## No incluye
- Consumo de la API de OpenAI u otros proveedores
- Atención humana en directo
- Garantía de respuestas siempre correctas
- Entrenamiento de un modelo exclusivo desde cero
- Integración con CRM no contemplados
- Asesoramiento legal sobre tratamiento de datos

## Campos que rellenas
- Web donde va el chat
- Documentos o FAQ
- Tono (cercano / formal)
- Correo o Telegram para avisos

## Ejemplo
> Clínica dental: «¿Abrís el sábado?» → «Sí, de 10 a 14. ¿Te reservo una revisión?» y llega el contacto al móvil.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 19900, 'eur', 999, 1, 'chat-ia-web', 'Modalidad', 0, 'prod_7ydh66gv8v', datetime('2026-01-01', '-47 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='chat-ia-web' AND c.slug='bots';
UPDATE products SET image_key='productos/chat-ia-web.jpg' WHERE slug='chat-ia-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/chat-ia-web.jpg', 0, 'pimg_8e0h9de11x' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'chat-ia-web-diy', 0, 1, 'var_t2r0x3m8ze' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'chat-ia-web-pro', 1, 1, 'var_nhqj0r1s0e' FROM products WHERE slug='chat-ia-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Centro de ayuda o manual para tus clientes', 'Una web de ayuda con buscador para que tus clientes resuelvan dudas solos: guías, preguntas frecuentes y tutoriales.

## Qué recibes
- Web de documentación con buscador
- Menú lateral por temas
- Modo claro/oscuro y versión móvil
- Fácil de ampliar escribiendo textos

## No incluye
- Redacción completa de los artículos de ayuda
- Traducción profesional a otros idiomas
- Servicio humano de atención al cliente
- Gestión de tickets o incidencias
- Dominio personalizado y su renovación

## Campos que rellenas
- Nombre del producto o servicio
- Temas y preguntas
- Capturas o vídeos
- Logo y colores

## Ejemplo
> Software de reservas para gimnasios: «Cómo cancelar una clase», «Cómo cambiar la tarifa»… y bajan los emails de soporte.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'centro-ayuda', 'Modalidad', 0, 'prod_hq37rtaass', datetime('2026-01-01', '-48 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='centro-ayuda' AND c.slug='portales';
UPDATE products SET image_key='productos/centro-ayuda.jpg' WHERE slug='centro-ayuda';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/centro-ayuda.jpg', 0, 'pimg_162bb8rcde' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'centro-ayuda-diy', 0, 1, 'var_c675wqhc6m' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'centro-ayuda-pro', 1, 1, 'var_b3w88hgpsk' FROM products WHERE slug='centro-ayuda';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Boletín de email propio sin cuotas por contacto', 'Tu propio sistema de newsletter: formulario de alta, plantillas y envíos programados, sin pagar por cada suscriptor.

## Qué recibes
- Servidor de newsletter configurado
- Formulario de alta para tu web
- Plantilla de email con tu marca
- Doble confirmación y baja (RGPD)

## No incluye
- Cuota de alojamiento y envío de emails externos
- Redacción periódica de boletines
- Compra o captación de suscriptores
- Garantía de entrega en todas las bandejas de entrada
- Revisión jurídica de los textos de privacidad
- Publicidad y campañas de captación

## Campos que rellenas
- Nombre del boletín
- Logo y colores
- Contactos actuales (si tienes)
- Frecuencia de envío

## Ejemplo
> Librería de barrio: cada lunes «Novedades de la semana» a 2.300 suscriptores sin cuota mensual por contactos.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 14900, 'eur', 999, 1, 'newsletter-propia', 'Modalidad', 0, 'prod_xrzh1d2vk3', datetime('2026-01-01', '-49 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='newsletter-propia' AND c.slug='captacion';
UPDATE products SET image_key='productos/newsletter-propia.jpg' WHERE slug='newsletter-propia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/newsletter-propia.jpg', 0, 'pimg_9am00vbg83' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 14900, 999, 'newsletter-propia-diy', 0, 1, 'var_g04fsnadjn' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'newsletter-propia-pro', 1, 1, 'var_4qd5xh8aty' FROM products WHERE slug='newsletter-propia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Configuración técnica del aviso de cookies', 'Instalamos un aviso de cookies que no carga la analítica ni los píxeles hasta que el visitante acepta.

## Qué recibes
- Aviso de cookies con aceptar, rechazar y configurar
- Bloqueo técnico de hasta 2 herramientas de seguimiento hasta que se aceptan
- En «Te lo montamos»: instalado en tu web

## No incluye
- Asesoramiento jurídico
- Redacción de textos legales
- Garantía de cumplimiento normativo

## Campos que rellenas
- Dirección de la web
- Herramientas de seguimiento que usas (hasta 2, por ejemplo Analytics o el píxel de Meta)

## Ejemplo
> Tienda con píxel de Meta: el píxel ya no se carga hasta que el cliente pulsa «Aceptar».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 0, 'banner-cookies-rgpd', 'Modalidad', 0, 'prod_thetrzyfvw', datetime('2026-01-01', '-50 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='banner-cookies-rgpd' AND c.slug='webs';
UPDATE products SET image_key='productos/banner-cookies-rgpd.jpg' WHERE slug='banner-cookies-rgpd';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/banner-cookies-rgpd.jpg', 0, 'pimg_2c719vg6y0' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'banner-cookies-rgpd-diy', 0, 1, 'var_067parscpv' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'banner-cookies-rgpd-pro', 1, 1, 'var_0b9acq4x6m' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Añade un segundo idioma a tu web', 'Añadimos un segundo idioma a tu web, con selector de idioma y direcciones propias para cada versión.

## Qué recibes
- Hasta 3 páginas o 1.500 palabras en el idioma elegido
- Selector de idioma
- Etiquetas hreflang para los buscadores
- Revisión humana de los textos clave

## No incluye
- Más de 3 páginas o 1.500 palabras
- Garantía de posición en buscadores
- Traducción jurada
- Traducción de contenidos que publiques después

## Campos que rellenas
- Dirección de la web
- Idioma
- Páginas que quieres traducir (hasta 3)
- Textos que no se traducen (marcas, platos…)

## Ejemplo
> Restaurante en Sevilla con la carta y las reservas también en inglés para los turistas.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 9900, 'eur', 999, 1, 'web-multidioma', 'Modalidad', 0, 'prod_a5j1bfatsj', datetime('2026-01-01', '-51 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-multidioma' AND c.slug='webs';
UPDATE products SET image_key='productos/web-multidioma.jpg' WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-multidioma.jpg', 0, 'pimg_zkv2bvg8ry' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/hotel-resort.png', 1, 'pimg_359nm6bs80' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tour-guide.png', 2, 'pimg_cp18xw5s65' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 9900, 999, 'web-multidioma-diy', 0, 1, 'var_m03y0m1sz0' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-multidioma-pro', 1, 1, 'var_sb52w2e6gd' FROM products WHERE slug='web-multidioma';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Ficha de Google de tu negocio optimizada', 'Que te encuentren en Google Maps: ficha completa, categorías correctas, fotos, horarios y enlace de reseñas.

## Qué recibes
- Ficha revisada y completada
- Categorías y servicios optimizados
- Enlace y QR para pedir reseñas
- Checklist mensual de publicaciones

## No incluye
- Publicidad de pago en Google Ads
- Garantía de aparecer primero en Google Maps
- Fotografía profesional del establecimiento
- Publicación mensual de contenidos por nuestro equipo
- Compra o generación de reseñas
- Aprobación garantizada de la ficha por Google

## Campos que rellenas
- Nombre y dirección del negocio
- Servicios principales
- 5–10 fotos
- Acceso a la ficha (te guiamos)

## Ejemplo
> Fisioterapeuta en Valencia: aparece en «fisio cerca de mí» con 40 fotos, horario y botón de cita.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'ficha-google', 'Modalidad', 0, 'prod_fajwzwpx0t', datetime('2026-01-01', '-52 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='ficha-google' AND c.slug='captacion';
UPDATE products SET image_key='productos/ficha-google.jpg' WHERE slug='ficha-google';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/ficha-google.jpg', 0, 'pimg_r1gdzn3efs' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'ficha-google-diy', 0, 1, 'var_w4vker4gv2' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'ficha-google-pro', 1, 1, 'var_nqke82kyyq' FROM products WHERE slug='ficha-google';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Fotos de producto con fondo blanco automático', 'Subes las fotos hechas con el móvil y te devolvemos las imágenes recortadas, con fondo blanco y tamaño para tu tienda.

## Qué recibes
- Hasta 50 fotos recortadas (ampliable)
- Fondo blanco o de color
- Tamaños para web, Amazon e Instagram
- Carpeta compartida para nuevas tandas

## No incluye
- Más de 50 fotos en el lote inicial
- Sesión fotográfica o desplazamiento al negocio
- Retoque artístico o fotomontajes complejos
- Modelos humanos para mostrar productos
- Garantía de aprobación en plataformas externas

## Campos que rellenas
- Fotos (carpeta o zip)
- Color de fondo
- Medidas que necesitas

## Ejemplo
> Tienda de cerámica: 36 fotos hechas en la mesa de la cocina, listas para la web en una tarde.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'fotos-producto-fondo', 'Modalidad', 0, 'prod_ercd1rwy60', datetime('2026-01-01', '-53 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='fotos-producto-fondo' AND c.slug='tiendas';
UPDATE products SET image_key='productos/fotos-producto-fondo.jpg' WHERE slug='fotos-producto-fondo';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/fotos-producto-fondo.jpg', 0, 'pimg_db2j1s9e2a' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'fotos-producto-fondo-diy', 0, 1, 'var_p2kj60v4dq' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'fotos-producto-fondo-pro', 1, 1, 'var_wx6se0a6sx' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Firma de email profesional', 'Firma con tu foto o logo, cargo, teléfono, redes y aviso legal, que se ve bien en Gmail, Outlook y móvil.

## Qué recibes
- Firma HTML probada en Gmail y Outlook
- Versión para todo tu equipo
- Guía de instalación en 2 minutos

## No incluye
- Diseño de un logotipo corporativo nuevo
- Compra de dominios y cuentas de correo
- Licencias de Gmail, Outlook u otros programas
- Campañas de email marketing
- Seguimiento estadístico de aperturas y clics

## Campos que rellenas
- Nombre y cargo de cada persona
- Logo o foto
- Teléfono y web
- Redes sociales

## Ejemplo
> Despacho de 6 abogados: misma firma para todos, con logo, teléfono directo y enlace de cita.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1900, 'eur', 999, 1, 'firma-email', 'Modalidad', 0, 'prod_z2faz5bj72', datetime('2026-01-01', '-54 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='firma-email' AND c.slug='identidad';
UPDATE products SET image_key='productos/firma-email.jpg' WHERE slug='firma-email';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/firma-email.jpg', 0, 'pimg_n1vdwamp2j' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'firma-email-diy', 0, 1, 'var_tjj5z4qahc' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'firma-email-pro', 1, 1, 'var_g75aqzgxy0' FROM products WHERE slug='firma-email';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pizarra online privada para tu equipo', 'Una pizarra colaborativa propia para esquemas, planos de local o diagramas, con tu dominio y sin cuentas de terceros.

## Qué recibes
- Pizarra colaborativa publicada en tu dominio
- Bibliotecas de iconos para tu sector
- Exportación a PNG y PDF

## No incluye
- Dominio personalizado y su renovación
- Videollamadas o chat de voz integrados
- Integración con Jira, Trello u otros gestores
- Diseño técnico o arquitectónico certificado
- Asistencia humana para organizar proyectos

## Campos que rellenas
- Subdominio deseado
- Uso principal (planos, esquemas, clases)
- Logo

## Ejemplo
> Reformas López dibuja con el cliente la cocina nueva en la tablet y le manda el PDF al terminar.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 4900, 'eur', 999, 1, 'pizarra-planos', 'Modalidad', 0, 'prod_wbby59743p', datetime('2026-01-01', '-55 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pizarra-planos' AND c.slug='documentos';
UPDATE products SET image_key='productos/pizarra-planos.jpg' WHERE slug='pizarra-planos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pizarra-planos.jpg', 0, 'pimg_wexmnwdc2w' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 4900, 999, 'pizarra-planos-diy', 0, 1, 'var_15mgvbwy89' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'pizarra-planos-pro', 1, 1, 'var_b1gevx55bz' FROM products WHERE slug='pizarra-planos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Vigilancia de precios de la competencia (mes)', 'Te avisamos por email o Telegram cuando un competidor cambia el precio, se queda sin stock o vuelve a tenerlo.

## Qué recibes
- Hasta 25 productos vigilados
- Aviso por email o Telegram
- Historial de precios de cada producto
- Cambio de la lista cuando quieras

## No incluye
- Más de 25 productos vigilados simultáneamente
- Acceso a webs privadas o protegidas
- Garantía de detectar precios ocultos
- Cambio automático de tus precios de venta
- Análisis de rentabilidad o estrategia comercial

## Campos que rellenas
- Enlaces de los productos
- Precio a partir del cual avisar
- Frecuencia (diaria, cada hora)
- Correo o Telegram

## Ejemplo
> Tienda de bicis: «La Orbea X de la competencia ha bajado de 1.299 € a 1.149 €» llega al móvil a las 9:00.

**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1200, 'eur', 999, 1, 'vigilancia-precios', NULL, 0, 'prod_hvqt9gp4wq', datetime('2026-01-01', '-56 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-precios' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-precios.jpg' WHERE slug='vigilancia-precios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-precios.jpg', 0, 'pimg_mqgz57qr8j' FROM products WHERE slug='vigilancia-precios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Aviso de cambios en webs que te interesan (mes)', 'Vigilamos boletines oficiales, licitaciones, convocatorias o webs de proveedores y te avisamos cuando cambian.

## Qué recibes
- Hasta 15 páginas vigiladas
- Solo te avisa si cambia la parte que te importa
- Resumen del cambio en el aviso

## No incluye
- Más de 15 páginas vigiladas simultáneamente
- Acceso a páginas privadas sin permisos
- Vigilancia en tiempo real de cada segundo
- Modificación automática de las webs vigiladas
- Garantía ante bloqueos del sitio de origen

## Campos que rellenas
- Páginas a vigilar
- Qué parte vigilar (p. ej. «tabla de convocatorias»)
- Frecuencia
- Correo o Telegram

## Ejemplo
> Gestoría: aviso cada vez que el ayuntamiento publica una nueva ayuda para autónomos.

**Plazo:** puesta en marcha en 24–72 horas laborables desde que recibimos los datos necesarios; después, servicio mensual.

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 900, 'eur', 999, 1, 'aviso-cambios-web', NULL, 0, 'prod_7xt87bppvp', datetime('2026-01-01', '-57 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='aviso-cambios-web' AND c.slug='planes';
UPDATE products SET image_key='productos/aviso-cambios-web.jpg' WHERE slug='aviso-cambios-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/aviso-cambios-web.jpg', 0, 'pimg_szfyvdv1fv' FROM products WHERE slug='aviso-cambios-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Etiquetas con código de barras listas para imprimir', 'Nos pasas tu lista de productos y recibes un PDF con las etiquetas (código de barras, nombre y precio) al tamaño de tu papel.

## Qué recibes
- PDF con hasta 100 etiquetas (ampliable)
- Códigos CODE128 o EAN-13
- Tamaño adaptado a tu hoja o impresora
- Plantilla para volver a generarlas tú

## No incluye
- Más de 100 etiquetas en la entrega inicial
- Impresión de etiquetas, papel o consumibles
- Impresora de etiquetas o lector de códigos
- Compra o asignación oficial de códigos GS1
- Integración con TPV o programas de inventario

## Campos que rellenas
- Lista de referencias (Excel o CSV)
- Nombre y precio de cada producto
- Tamaño de etiqueta / hoja
- Unidades por referencia

## Ejemplo
> Artesana de jabones: 40 referencias con código, nombre y PVP en hojas A4 de 24 etiquetas.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1900, 'eur', 999, 1, 'etiquetas-codigo-barras', 'Modalidad', 0, 'prod_2td2f3j41s', datetime('2026-01-01', '-58 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='etiquetas-codigo-barras' AND c.slug='tiendas';
UPDATE products SET image_key='productos/etiquetas-codigo-barras.jpg' WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/etiquetas-codigo-barras.jpg', 0, 'pimg_vnc8xsm388' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'etiquetas-codigo-barras-diy', 0, 1, 'var_f1afv5p8bm' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'etiquetas-codigo-barras-pro', 1, 1, 'var_549ey8291s' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Reduce el peso de las imágenes de tu web', 'Tus fotos pesadas, convertidas a WebP o AVIF con el tamaño justo, para que pesen menos sin perder calidad visible.

## Qué recibes
- Hasta 100 imágenes optimizadas
- Formato WebP o AVIF + copia JPG
- Nombres de archivo descriptivos
- Informe de peso antes y después
- En «Te lo montamos»: sustituimos hasta 10 imágenes en tu web

## No incluye
- Garantía de velocidad de carga
- Retoque o edición de fotos
- Sustituir más de 10 imágenes en la web

## Campos que rellenas
- Cuántas imágenes son, más o menos
- Formato deseado
- Ancho máximo
- Calidad (alta o equilibrada)

## Ejemplo
> Casa rural: 60 fotos de 5 MB sacadas con la cámara, convertidas a WebP de 1600 px listas para la galería.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **14 €** | **39 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información (en este servicio, optimizamos 2 de tus imágenes para que veas el resultado). Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1400, 'eur', 999, 1, 'optimizar-imagenes', 'Modalidad', 0, 'prod_m7dma279bg', datetime('2026-01-01', '-59 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='optimizar-imagenes' AND c.slug='webs';
UPDATE products SET image_key='productos/optimizar-imagenes.jpg' WHERE slug='optimizar-imagenes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/optimizar-imagenes.jpg', 0, 'pimg_sk9aha23hf' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1400, 999, 'optimizar-imagenes-diy', 0, 1, 'var_4711re49a9' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 3900, 999, 'optimizar-imagenes-pro', 1, 1, 'var_p5awa9h19f' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Tu logo en vectorial y en todos los tamaños', 'Tu logo limpio en SVG y en todos los formatos que te pedirán: web, redes, favicon, imprenta y fondo oscuro.

## Qué recibes
- SVG optimizado
- PNG en 6 tamaños
- Favicon e icono de app
- Versión en blanco para fondos oscuros

## No incluye
- Creación de un logotipo nuevo desde cero
- Rediseño completo de la identidad de marca
- Registro de marca y trámites de propiedad industrial
- Impresión de tarjetas, rótulos o merchandising
- Ilustración manual de detalles inexistentes

## Campos que rellenas
- Logo actual (el mejor archivo que tengas)
- Colores corporativos
- Dónde lo vas a usar

## Ejemplo
> Peluquería con el logo solo en una foto del cartel: recibe el SVG, el favicon y la versión blanca para Instagram.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 1900, 'eur', 999, 1, 'logo-vectorial', 'Modalidad', 0, 'prod_agfbf5q3wa', datetime('2026-01-01', '-60 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='logo-vectorial' AND c.slug='identidad';
UPDATE products SET image_key='productos/logo-vectorial.jpg' WHERE slug='logo-vectorial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/logo-vectorial.jpg', 0, 'pimg_bzrd1fsrgg' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 1900, 999, 'logo-vectorial-diy', 0, 1, 'var_qxq8s4454x' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'logo-vectorial-pro', 1, 1, 'var_qw5ac9r6qp' FROM products WHERE slug='logo-vectorial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Limpieza de listados de clientes y productos', 'Ese Excel lleno de duplicados, mayúsculas mezcladas y teléfonos con formatos distintos, ordenado y listo para importar.

## Qué recibes
- Archivo limpio sin duplicados exactos
- Columnas unificadas (nombres, teléfonos, emails)
- Informe de lo que se ha corregido
- Formato listo para tu CRM o tienda

## No incluye
- Investigación manual de datos incorrectos
- Eliminación garantizada de duplicados no exactos
- Obtención de emails o teléfonos que falten
- Integración automática con CRM o tiendas
- Mantenimiento periódico de la base de datos

## Campos que rellenas
- Archivo (Excel o CSV)
- Columna que identifica cada registro
- Columnas que quieres conservar
- Programa al que lo vas a importar

## Ejemplo
> Autoescuela: 3 hojas de alumnos de distintos años unidas en una sola, sin repetidos, lista para el email de bienvenida.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'limpieza-csv', 'Modalidad', 0, 'prod_bpz6bsedxv', datetime('2026-01-01', '-61 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='limpieza-csv' AND c.slug='documentos';
UPDATE products SET image_key='productos/limpieza-csv.jpg' WHERE slug='limpieza-csv';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/limpieza-csv.jpg', 0, 'pimg_e0m78fsa9n' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'limpieza-csv-diy', 0, 1, 'var_cmxs2qsps0' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'limpieza-csv-pro', 1, 1, 'var_pnmszzcp5e' FROM products WHERE slug='limpieza-csv';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Plantilla de inventario a medida en Excel', 'Un Excel con tus productos y categorías que avisa en rojo cuando algo baja del mínimo y calcula lo que vale tu stock.

## Qué recibes
- Excel con tus productos y categorías
- Alertas de stock mínimo
- Valoración del inventario
- Hoja de entradas y salidas

## No incluye
- Recuento físico del inventario en el almacén
- Integración con TPV, ERP o lectores de códigos
- Actualización diaria por nuestro equipo
- Licencias de Microsoft Excel, si se necesitan
- Auditoría contable o certificación de existencias

## Campos que rellenas
- Categorías
- Lista de productos
- Stock mínimo de cada uno
- Coste y precio de venta

## Ejemplo
> Bar de barrio: la hoja marca en rojo «tónica: quedan 6» antes de hacer el pedido del lunes.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'plantilla-inventario', 'Modalidad', 0, 'prod_642rvxq0yy', datetime('2026-01-01', '-62 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plantilla-inventario' AND c.slug='documentos';
UPDATE products SET image_key='productos/plantilla-inventario.jpg' WHERE slug='plantilla-inventario';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plantilla-inventario.jpg', 0, 'pimg_fynntregxe' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'plantilla-inventario-diy', 0, 1, 'var_pbtej5yd5s' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'plantilla-inventario-pro', 1, 1, 'var_4v4tz79s80' FROM products WHERE slug='plantilla-inventario';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Informe con gráficos a partir de tu Excel', 'Nos mandas tus datos de ventas, socios o visitas y recibes un PDF claro con gráficos listo para presentar.

## Qué recibes
- PDF con hasta 10 gráficos
- Resumen en una página
- Plantilla para repetirlo cada mes

## No incluye
- Más de 10 gráficos en el informe inicial
- Recopilación de datos que no se hayan facilitado
- Corrección manual de datos de origen incorrectos
- Elaboración mensual del informe por nuestro equipo
- Panel interactivo conectado en tiempo real

## Campos que rellenas
- Archivo de datos
- Qué quieres medir
- Periodo
- Logo y colores

## Ejemplo
> Asociación de vecinos: informe anual de cuotas y actividades para la asamblea, con logo y 6 gráficos.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'informe-graficos', 'Modalidad', 0, 'prod_npr5t3es1s', datetime('2026-01-01', '-63 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='informe-graficos' AND c.slug='documentos';
UPDATE products SET image_key='productos/informe-graficos.jpg' WHERE slug='informe-graficos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/informe-graficos.jpg', 0, 'pimg_1533yvs0ew' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'informe-graficos-diy', 0, 1, 'var_nsvs80gnpn' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'informe-graficos-pro', 1, 1, 'var_vh5zqwespb' FROM products WHERE slug='informe-graficos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Dossier comercial en PDF con tu marca', 'Un PDF de 4 páginas para mandar por email o WhatsApp: quién eres, qué ofreces, por qué tú y cómo contratarte.

## Qué recibes
- PDF de 4 páginas con tu marca
- Versión ligera para WhatsApp
- Archivo editable para actualizar precios

## No incluye
- Páginas adicionales a las 4 contratadas
- Impresión física y gastos de imprenta
- Fotografía profesional de productos o instalaciones
- Traducción profesional a otros idiomas
- Distribución del dossier a potenciales clientes

## Campos que rellenas
- Nombre comercial y logo
- Servicios y precios
- Por qué elegirte (3 razones)
- Datos de contacto

## Ejemplo
> Fotógrafo de bodas: dossier con 3 packs, fotos de muestra y botón de WhatsApp para pedir fecha.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'dossier-comercial', 'Modalidad', 0, 'prod_12bb8dpt3n', datetime('2026-01-01', '-64 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='dossier-comercial' AND c.slug='documentos';
UPDATE products SET image_key='productos/dossier-comercial.jpg' WHERE slug='dossier-comercial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/dossier-comercial.jpg', 0, 'pimg_z0vqnzxh2a' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'dossier-comercial-diy', 0, 1, 'var_9sy69qn9qw' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'dossier-comercial-pro', 1, 1, 'var_meqg7cpnxq' FROM products WHERE slug='dossier-comercial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Diagramas de procesos y organigramas', 'Nos explicas cómo funciona tu proceso o tu equipo y te devolvemos diagramas claros en SVG, PNG y PDF.

## Qué recibes
- Hasta 5 diagramas
- Formatos SVG, PNG y PDF
- Archivo de texto para editarlos tú

## No incluye
- Más de 5 diagramas en la entrega inicial
- Auditoría o consultoría de procesos empresariales
- Implantación de los procesos dibujados
- Licencias de programas externos de pago
- Certificación técnica o legal de los diagramas

## Campos que rellenas
- Pasos del proceso o personas del equipo
- Decisiones o responsables
- Orientación (horizontal / vertical)
- Colores

## Ejemplo
> Clínica dental: el circuito del paciente, de la llamada a la factura, en un diagrama colgado en recepción.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'diagramas-procesos', 'Modalidad', 0, 'prod_hqbzt5trmb', datetime('2026-01-01', '-65 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='diagramas-procesos' AND c.slug='documentos';
UPDATE products SET image_key='productos/diagramas-procesos.jpg' WHERE slug='diagramas-procesos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/diagramas-procesos.jpg', 0, 'pimg_k04g9qnmf1' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'diagramas-procesos-diy', 0, 1, 'var_7n21rb9r2k' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'diagramas-procesos-pro', 1, 1, 'var_ms9tpkrvgw' FROM products WHERE slug='diagramas-procesos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Descripciones de producto escritas con IA y revisadas', 'Títulos y descripciones de venta para tu tienda, con tus palabras clave, revisados por una persona antes de entregarlos.

## Qué recibes
- 20 títulos y descripciones (ampliable)
- Palabras clave para Google
- Archivo CSV listo para importar
- Guía de tono para las siguientes

## No incluye
- Más de 20 productos en el lote inicial
- Fotografía profesional de productos
- Traducción profesional a otros idiomas
- Publicación manual de fichas en cada plataforma
- Garantía de posicionamiento en Google
- Campañas de publicidad de los productos

## Campos que rellenas
- Catálogo (nombre y características)
- Público al que vendes
- Tono (cercano, técnico, premium)
- Palabras clave

## Ejemplo
> Tienda de té: «Rooibos vainilla 100 g · sin teína, para después de cenar» en lugar de «Té rojo 100g».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 2900, 'eur', 999, 1, 'descripciones-producto-ia', 'Modalidad', 0, 'prod_f26s0xkbgz', datetime('2026-01-01', '-66 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='descripciones-producto-ia' AND c.slug='contenido';
UPDATE products SET image_key='productos/descripciones-producto-ia.jpg' WHERE slug='descripciones-producto-ia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/descripciones-producto-ia.jpg', 0, 'pimg_n8sey6aes7' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 2900, 999, 'descripciones-producto-ia-diy', 0, 1, 'var_hen2exhz53' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'descripciones-producto-ia-pro', 1, 1, 'var_gzgn4wnxt7' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Pack de carruseles para Instagram y LinkedIn', 'Diez carruseles con tu marca generados desde tus textos, en PNG listos para subir y con la plantilla para repetir.

## Qué recibes
- 10 carruseles de 5–8 diapositivas
- Plantilla con tus colores y tipografías
- Textos de publicación sugeridos
- Regeneración desde una hoja de cálculo

## No incluye
- Más de 10 carruseles en el pack inicial
- Carruseles de más de 8 diapositivas
- Grabación y edición de vídeos o reels
- Publicación y programación en redes sociales
- Publicidad de pago y gestión de campañas
- Fotografía profesional o sesiones de estudio

## Campos que rellenas
- Temas o textos
- Tono
- Colores y logo
- Red principal

## Ejemplo
> Nutricionista: «5 desayunos en 5 minutos», un carrusel por semana durante dos meses y medio.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 3900, 'eur', 999, 1, 'carruseles-redes', 'Modalidad', 0, 'prod_vp89b3xk6h', datetime('2026-01-01', '-67 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carruseles-redes' AND c.slug='contenido';
UPDATE products SET image_key='productos/carruseles-redes.jpg' WHERE slug='carruseles-redes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carruseles-redes.jpg', 0, 'pimg_djthj3ksks' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 3900, 999, 'carruseles-redes-diy', 0, 1, 'var_fdttfbxn3x' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'carruseles-redes-pro', 1, 1, 'var_h2xa3wrgz6' FROM products WHERE slug='carruseles-redes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web WordPress de hasta 5 páginas', 'Si prefieres WordPress: instalada en tu alojamiento, con tema ligero, tus páginas y formulario de contacto.

## Qué recibes
- WordPress instalado en tu alojamiento web
- Hasta 5 páginas con tus textos y fotos
- Formulario de contacto
- Copias de seguridad según lo que ofrezca tu alojamiento
- Vídeo de 10 minutos para editarla tú

## No incluye
- Dominio ni alojamiento (se contratan aparte)
- Mantenimiento continuo
- Blog
- Redacción de textos legales

## Campos que rellenas
- ¿Tienes dominio y alojamiento? (si no, te recomendamos uno)
- Textos de las páginas (hasta 5)
- Textos legales (los aportas tú)
- ¿Tienes logo y fotos? (te diremos cómo enviarlos)
- Colores

## Ejemplo
> Academia de música: inicio, profesores, horarios, precios y contacto; la dueña cambia los horarios ella misma.

**¿WordPress o la web corporativa?** La corporativa no necesita alojamiento de pago ni actualizaciones; WordPress te conviene si ya lo conoces o quieres editarla con su panel.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **549 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 24900, 'eur', 999, 1, 'web-wordpress', 'Modalidad', 0, 'prod_q6aa8a4tbk', datetime('2026-01-01', '-68 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-wordpress' AND c.slug='webs';
UPDATE products SET image_key='productos/web-wordpress.jpg' WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-wordpress.jpg', 0, 'pimg_kek5y8se2d' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/corporate-company.png', 1, 'pimg_s29gtrj593' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 2, 'pimg_kkb4r3az3g' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 24900, 999, 'web-wordpress-diy', 0, 1, 'var_97rrm0a3f9' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 54900, 999, 'web-wordpress-pro', 1, 1, 'var_fx1a7szzs6' FROM products WHERE slug='web-wordpress';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Web de 4 páginas que editas arrastrando bloques', 'Tu web en un editor visual muy sencillo: cambias textos, fotos y secciones arrastrando, sin tocar código ni pagar cuota.

## Qué recibes
- Editor visual instalado y configurado
- Web inicial de 4 páginas con tus datos
- Bloques de tu sector listos para usar
- Formación de 30 minutos

## No incluye
- Más de 4 páginas en la web inicial
- Dominio personalizado y su renovación
- Redacción profesional de contenidos completos
- Fotografía y vídeo profesional
- Mantenimiento y modificaciones por nuestro equipo
- SEO continuado y campañas de publicidad

## Campos que rellenas
- Sector
- Páginas que necesitas
- Logo, colores y fotos
- Dominio

## Ejemplo
> Tienda de muebles: monta ella misma la página de ofertas de enero arrastrando el bloque «producto destacado».

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 19900, 'eur', 999, 1, 'web-arrastrar-soltar', 'Modalidad', 0, 'prod_75sg58cjg8', datetime('2026-01-01', '-69 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-arrastrar-soltar' AND c.slug='portales';
UPDATE products SET image_key='productos/web-arrastrar-soltar.jpg' WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-arrastrar-soltar.jpg', 0, 'pimg_frh4y6cxjk' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/editor-bloques.png', 1, 'pimg_38qa2ycpnf' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 19900, 999, 'web-arrastrar-soltar-diy', 0, 1, 'var_x7kms3f2k4' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-arrastrar-soltar-pro', 1, 1, 'var_f6ja6nh18h' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id, created_at) VALUES ('Plataforma para tu agencia: clientes, webs y CRM', 'Para agencias y autónomos: un panel donde cada cliente tiene su web, su portal y su ficha en el CRM, con cobros automáticos.

## Qué recibes
- Panel multi-cliente propio
- Portal privado para cada cliente
- CRM con fichas y tareas
- Cobros recurrentes con Stripe (con tus claves)

## No incluye
- Comisiones de Stripe por pagos y suscripciones
- Dominio personalizado y su renovación
- Licencias y consumo de servicios externos
- Gestión fiscal o contable de los cobros
- Captación comercial de clientes para la agencia
- Mantenimiento y ampliaciones futuras no contratadas

## Campos que rellenas
- Nombre de la agencia y logo
- Servicios que vendes
- Primeros clientes a dar de alta
- Dominio

## Ejemplo
> Diseñadora freelance con 12 clientes: cada uno entra a su portal, ve facturas y pide cambios sin escribir al WhatsApp personal.

**Plazo:** primera versión en 24–72 horas laborables desde que recibimos los datos necesarios. Incluye una ronda de ajustes que puedes solicitar durante los 7 días siguientes a la primera versión. Entrega definitiva tras tu aprobación.

## Plantilla + guía o te lo montamos
**Te lo montamos:** nos encargamos de poner en funcionamiento lo incluido y te pasamos el enlace. **Plantilla + guía:** te lo entregamos preparado con tus datos y con una guía paso a paso para publicarlo tú.

| | Plantilla + guía | Te lo montamos |
|---|---|---|
| Precio | **490 €** | **990 €** |
| Preparado con tus datos | Sí | Sí |
| Guía paso a paso para publicarlo | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Ronda de ajustes | Sí | Sí |

## Cómo funciona
**Compra directa:** pagas, nos mandas tus datos (2-3 minutos), te enseñamos la primera versión y, tras la ronda de ajustes, te lo entregamos.

**Muestra gratis:** pulsa **Empieza gratis**, rellena los campos y te enviamos una muestra limitada con parte de tu información. Si te gusta, lo contratas; si no, no pagas nada.

_Te atiende David Porto Díaz, una persona real que responde a tus dudas._
', 49000, 'eur', 999, 1, 'plataforma-agencia', 'Modalidad', 0, 'prod_4zm8vpr4g8', datetime('2026-01-01', '-70 minutes'));
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plataforma-agencia' AND c.slug='portales';
UPDATE products SET image_key='productos/plataforma-agencia.jpg' WHERE slug='plataforma-agencia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plataforma-agencia.jpg', 0, 'pimg_bex51zezxy' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Plantilla + guía (la publicas tú)', 49000, 999, 'plataforma-agencia-diy', 0, 1, 'var_sjmx6h3whw' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99000, 999, 'plataforma-agencia-pro', 1, 1, 'var_xmqt785nf7' FROM products WHERE slug='plataforma-agencia';
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
', 1, 'standard', 'page_eskjga6zf7');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Preguntas frecuentes', 'preguntas-frecuentes', '## Precio y pago

### ¿El precio de la ficha es el que pago al final?
Sí. El precio de cada ficha es el precio final, sin recargos, y recibes factura del pedido. Cada ficha indica si es **pago único** o una cuota mensual.

### ¿Tengo que pagar antes?
Tú eliges. Puedes **contratarlo directamente** con tarjeta (si en 7 días no hace lo que dice la ficha, te devolvemos el dinero) o pulsar **Empieza gratis**, ver una vista previa con tus datos y pagar solo si te gusta.

### ¿Hay costes ocultos o cuotas mensuales?
Los servicios de pago único no tienen cuota con nosotros. Si hay costes externos (por ejemplo, el dominio o una suscripción de pago de otra empresa), la ficha los indica en **Qué no incluye** antes de comprar. Las cuotas solo existen si contratas un plan mensual, y son opcionales.

### ¿Emitís factura?
Sí, cada compra lleva su factura.

### ¿Y si pago y no hace lo que promete la ficha?
Si en 7 días desde la entrega el servicio no hace lo que describe su ficha, te devolvemos el importe. Las condiciones completas están en [Condiciones de contratación](/pages/condiciones).

## Plazos y lo que necesitas

### ¿Cuánto tarda?
La primera versión llega en 24–72 horas laborables desde que recibimos los datos necesarios; el plazo de cada servicio aparece en su ficha.

### ¿Qué tengo que darte?
Solo lo que pide el formulario de la ficha: tarda 2-3 minutos. Lo que no tengas, lo marcas y seguimos.

### ¿Y si no tengo textos o fotos?
Marca «no lo tengo» en el campo y te proponemos textos e imágenes libres de derechos.

### ¿Puedo verlo antes de pagar?
Sí, con **Empieza gratis**: te enviamos una vista previa con tus datos y pagas solo si te gusta. Si no te convence, no pagas nada.

## Propiedad, dominio y correo

### ¿De quién es la web o la automatización?
Tuya. Te entregamos todos los accesos a tu nombre, junto con el enlace y una guía de uso.

### ¿Está incluido el dominio?
La compra del dominio no está incluida en los servicios de pago único: lo indica cada ficha. Puedes usar el dominio que ya tienes o registrar uno nuevo, por ejemplo en Cloudflare Registrar, a precio de coste. Si prefieres no ocuparte de renovaciones, el plan [Alojamiento + dominio gestionado](/products/plan-hosting-dominio) lo hace por ti.

### ¿Tengo que pagar alojamiento?
Depende del servicio, y la ficha lo dice. Muchos funcionan sin alojamiento de pago; los que lo necesitan (por ejemplo, WordPress) lo indican en **Qué no incluye**.

### ¿Incluye correo con mi dominio?
El correo corporativo no está incluido en las webs; cada ficha lo indica. El plan [Alojamiento + dominio gestionado](/products/plan-hosting-dominio) incluye un correo de reenvío.

## Cambios y después de la entrega

### ¿Puedo pedir cambios?
Sí. Tienes una ronda de ajustes incluida, que puedes solicitar durante los siete días siguientes a la entrega.

### ¿Y si quiero cambiar algo más adelante?
Los cambios posteriores se hacen con el plan de [mantenimiento](/products/plan-mantenimiento-web) (incluye 30 minutos de cambios al mes) o por horas.

### ¿Quién me ayuda si tengo dudas o algo falla?
Con **Te lo montamos**, te atendemos por email y WhatsApp; con **Plantilla + guía**, por email. Si quieres que alguien vigile que tu web sigue funcionando, el plan de [mantenimiento](/products/plan-mantenimiento-web) incluye copias de seguridad, actualizaciones y aviso de caídas.

### ¿Puedo cancelar un plan mensual?
Sí, en cualquier momento. El servicio sigue activo hasta el final del periodo pagado.

## Sobre nosotros

### ¿Es solo para empresas?
No. También para particulares: webs de boda, cumpleaños, viajes, asociaciones, currículums o tu proyecto personal.

### ¿Hay alguien al otro lado?
Sí. Detrás hay una persona, David Porto Díaz, que te responde cualquier duda.
', 1, 'standard', 'page_1h25b7gqtk');
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
', 1, 'standard', 'page_8d926q2az2');
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
- **[100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)** · diseño de ejemplo · servicio: [Web corporativa de hasta 5 páginas](/products/web-corporativa-5-secciones)
- **[Plantillas de estilo clásico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)** · diseño de ejemplo · servicio: [Web corporativa de hasta 5 páginas](/products/web-corporativa-5-secciones)
- **[Editor de bloques: pruébalo en el navegador](https://automatizasinhumo-demos.davidpd89.workers.dev/editor-bloques/)** · demo interactiva · servicio: [Web a medida con editor visual completo](/products/web-editable-visual)

Con tus textos, fotos y colores queda así en 2-10 días. Contrátalo directamente o pruébalo gratis y paga solo si te gusta.

¿No ves tu caso? [Cuéntanos qué necesitas](/pages/contacto).
', 1, 'standard', 'page_mg5ep4c7ca');
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
- Email: [davidportodiaz@gmail.com](mailto:davidportodiaz@gmail.com)
- Respondemos en menos de 24 horas laborables.

_Si ya sabes qué quieres, entra en su ficha: contrátalo directamente o pulsa **Empieza gratis** y paga solo si te gusta._
', 1, 'standard', 'page_43par7c597');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Aviso legal', 'aviso-legal', '## Aviso legal

En cumplimiento de la Ley 34/2002 (LSSI-CE):

- **Titular**: David Porto Díaz (persona física)
- **Web**: automatizasinhumo.com
- **Email**: davidportodiaz@gmail.com
- Los datos fiscales completos se facilitan en la factura de cada pedido.

### Objeto
Este sitio ofrece la venta de servicios digitales (webs, automatizaciones y herramientas) a precio cerrado.

### Propiedad intelectual
Los textos y el diseño de este sitio pertenecen al titular. Cada entrega respeta las licencias de los componentes de terceros que incluya.

### Responsabilidad
El titular no se hace responsable del uso que terceros hagan de los servicios entregados ni de los contenidos que el cliente aporte.
', 1, 'standard', 'page_5gfsa9t7jp');
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
', 1, 'standard', 'page_3rmrry9g7a');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Privacidad', 'privacidad', '## Política de privacidad

- **Responsable**: David Porto Díaz, davidportodiaz@gmail.com
- **Finalidad**: gestionar pedidos, entregar los servicios y responder consultas.
- **Base legal**: ejecución del contrato y consentimiento.
- **Conservación**: el tiempo necesario y los plazos legales de facturación.
- **Destinatarios**: proveedores necesarios para prestar el servicio (alojamiento en Cloudflare, pasarela de pago, email). No vendemos datos.
- **Derechos**: acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a davidportodiaz@gmail.com. Puedes reclamar ante la AEPD (aepd.es).
', 1, 'standard', 'page_mrgf0v9v8a');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cookies', 'cookies', '## Política de cookies

Este sitio solo usa **cookies técnicas** imprescindibles (carrito y sesión de tu cuenta). No usamos cookies de publicidad ni de seguimiento de terceros, por eso no te mostramos un banner de consentimiento.

Si en el futuro añadimos analítica, será sin cookies o con tu consentimiento previo.
', 1, 'standard', 'page_4805nve9xk');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'catalog', NULL, 'Servicios', 0, 'nav_a7ptbzzvhn');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='webs'), 'Webs', 1, 'nav_z4xm9t3xk2');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='automatizaciones'), 'Automatizaciones', 2, 'nav_3ck2vpfk2m');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='como-funciona'), 'Cómo funciona', 3, 'nav_wd9tpp2v08');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='demos'), 'Demos', 4, 'nav_6jygms5kb8');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'home', NULL, 'Inicio', 0, 'nav_reqh21j8fd');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='hosteleria'), 'Restaurantes y bares', 1, 'nav_6w6qd8gsyf');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='reservas'), 'Reservas y citas', 2, 'nav_11y55nwk6d');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bodas'), 'Bodas y eventos', 3, 'nav_f9wj6czkj9');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='identidad'), 'Tarjetas, página de enlaces y CV', 4, 'nav_vq91ztg1j7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='captacion'), 'Formularios y captación', 5, 'nav_s261vsc1pd');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bots'), 'Bots e IA', 6, 'nav_84psfr6qec');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='enlaces'), 'Enlaces, QR y analítica', 7, 'nav_5x3r1bxzxy');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='tiendas'), 'Tiendas y productos digitales', 8, 'nav_xgm9q4kdmm');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='portales'), 'Portales y webs editables', 9, 'nav_n3hp86gdar');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='documentos'), 'Documentos, PDF e IA', 10, 'nav_j2r0pfazs3');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='contenido'), 'Contenido y redes', 11, 'nav_7efwk743ng');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='planes'), 'Planes mensuales', 12, 'nav_tw90nwbaqg');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='preguntas-frecuentes'), 'Preguntas frecuentes', 13, 'nav_e2wf7b1718');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='herramientas-recomendadas'), 'Herramientas recomendadas', 14, 'nav_jxx0rzyahr');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='contacto'), 'Contacto', 15, 'nav_dj0ynvxkf4');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='aviso-legal'), 'Aviso legal', 16, 'nav_9re40r7p8w');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='condiciones'), 'Condiciones de contratación', 17, 'nav_2rhbqp6yxs');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='privacidad'), 'Privacidad', 18, 'nav_ghkg8f71yr');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='cookies'), 'Cookies', 19, 'nav_wfx14gyfez');
INSERT INTO settings (key, value) VALUES ('store_name', 'Automatiza sin humo') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement', 'Contrátalo directamente con garantía de 7 días o pruébalo gratis · Te atiende una persona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement_href', '/pages/como-funciona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
