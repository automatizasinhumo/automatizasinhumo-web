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
INSERT INTO categories (name, slug, public_id) VALUES ('Webs para tu negocio', 'webs', 'cat_ceadz97x3b');
INSERT INTO categories (name, slug, public_id) VALUES ('Restaurantes y bares', 'hosteleria', 'cat_wzb3fx57rj');
INSERT INTO categories (name, slug, public_id) VALUES ('Reservas y citas', 'reservas', 'cat_84swdetghk');
INSERT INTO categories (name, slug, public_id) VALUES ('Bodas y eventos', 'bodas', 'cat_4pwze86dx8');
INSERT INTO categories (name, slug, public_id) VALUES ('Tarjetas, link-in-bio y CV', 'identidad', 'cat_ctqrm5q7nq');
INSERT INTO categories (name, slug, public_id) VALUES ('Formularios y captación', 'captacion', 'cat_sv210mx4xf');
INSERT INTO categories (name, slug, public_id) VALUES ('Bots e IA', 'bots', 'cat_s6b1vzs1y1');
INSERT INTO categories (name, slug, public_id) VALUES ('Automatizaciones', 'automatizaciones', 'cat_36jq11dcyq');
INSERT INTO categories (name, slug, public_id) VALUES ('Enlaces, QR y analítica', 'enlaces', 'cat_cz0dg79map');
INSERT INTO categories (name, slug, public_id) VALUES ('Tiendas y productos digitales', 'tiendas', 'cat_esp3096fpq');
INSERT INTO categories (name, slug, public_id) VALUES ('Portales y webs editables', 'portales', 'cat_zg59w39abb');
INSERT INTO categories (name, slug, public_id) VALUES ('Documentos, PDF e IA', 'documentos', 'cat_jh98wrtcqv');
INSERT INTO categories (name, slug, public_id) VALUES ('Contenido y redes', 'contenido', 'cat_skgdngfxbv');
INSERT INTO categories (name, slug, public_id) VALUES ('Planes mensuales', 'planes', 'cat_wazyjv056p');
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web de una página para tu negocio', 'Tu negocio en internet con una sola página clara: quién eres, qué ofreces, cómo contactarte.

### Qué recibes
- Web de una página adaptada a móvil
- Botón de WhatsApp y llamada
- Mapa y horario
- Publicada con tu dominio (o uno gratuito)

### Campos que rellenas
- Nombre del negocio
- Sector
- Logo (opcional)
- 3–6 servicios con precio
- Teléfono / WhatsApp
- Dirección y horario
- 3–8 fotos

### Ejemplo
> Peluquería Lola: portada con foto, lista de servicios con precios, botón «Pide cita por WhatsApp» y mapa.

### Demo en vivo
- [Plantillas: restaurante, negocio, portfolio, RSVP…](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/)
- [Landing de una página](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/landing-page-template/)
- [Negocio local](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/business-template/)
- [Lanzamiento de producto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/product-launch/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [ColorlibHQ/bootstrap-templates](https://github.com/ColorlibHQ/bootstrap-templates) — MIT: libre para uso comercial · [demo](https://uicookies.com/)
- [mmrahmanbappi/100-free-html-templates](https://github.com/mmrahmanbappi/100-free-html-templates) — MIT: libre para uso comercial · [demo](https://mmrahmanbappi.github.io/100-free-html-templates/)
- [micah-masuka/free-website-templates](https://github.com/micah-masuka/free-website-templates) — MIT: libre para uso comercial · [demo](https://micah-masuka.github.io/free-website-templates/)
', 14900, 'eur', 999, 1, 'web-una-pagina', 'Modalidad', 0, 'prod_2y397bxr9z');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-una-pagina' AND c.slug='webs';
UPDATE products SET image_key='productos/web-una-pagina.png' WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-una-pagina.png', 0, 'pimg_8rg0zwv9b1' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-eventos.png', 1, 'pimg_1cgd4ns52b' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/landing-page-template.png', 2, 'pimg_sx2s3n0mfn' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/business-template.png', 3, 'pimg_8tgprqtr0x' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/product-launch.png', 4, 'pimg_fyvrm3s1fv' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'web-una-pagina-diy', 0, 1, 'var_be49rkyecg' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'web-una-pagina-pro', 1, 1, 'var_tvy2kddj77' FROM products WHERE slug='web-una-pagina';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web corporativa de 5 secciones', 'Inicio, servicios, sobre nosotros, opiniones y contacto. Para empresas que necesitan algo más que una tarjeta.

### Qué recibes
- 5 páginas con diseño a elegir entre +300 plantillas
- Formulario de contacto con aviso
- SEO básico (títulos, descripción, sitemap)
- Publicación y certificado SSL

### Campos que rellenas
- Datos de la empresa
- Textos de cada sección (o te los redactamos)
- Logo y colores
- Fotos
- Email donde recibir contactos

### Ejemplo
> Asesoría García: página por servicio (fiscal, laboral, contable), equipo, testimonios y formulario.

### Demo en vivo
- [100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)
- [Plantillas Bootstrap (Colorlib)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)
- [Consultoría](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/consulting-firm/)
- [Agencia creativa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/creative-agency/)
- [Atelier (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/atelier/)
- [Ironworks (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/ironworks/)

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **449 €** | **899 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [dawidolko/Website-Templates](https://github.com/dawidolko/Website-Templates) — MIT: libre para uso comercial · [demo](https://templateswebsite.dawidolko.pl)
- [uiuxlabz/uiuxlabz](https://github.com/uiuxlabz/uiuxlabz) — sin licencia clara: solo referencia de diseño · [demo](https://uiuxlabz.github.io/uiuxlabz/)
- [ultimatewebtemplates/free-website-templates](https://github.com/ultimatewebtemplates/free-website-templates) — sin licencia clara: solo referencia de diseño · [demo](https://ultimatewebtemplates.com)
', 44900, 'eur', 999, 1, 'web-corporativa-5-secciones', 'Modalidad', 0, 'prod_2xxypgxae6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-corporativa-5-secciones' AND c.slug='webs';
UPDATE products SET image_key='productos/web-corporativa-5-secciones.png' WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-corporativa-5-secciones.png', 0, 'pimg_y0a3wnmb9w' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-negocio.png', 1, 'pimg_v29ykmwkqk' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-bootstrap.png', 2, 'pimg_2kqrghkkw8' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/consulting-firm.png', 3, 'pimg_yy4at7bsrq' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/creative-agency.png', 4, 'pimg_rrfck1h7fw' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/atelier.png', 5, 'pimg_980gk0ejy0' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ironworks.png', 6, 'pimg_hnfhzb08y2' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 44900, 999, 'web-corporativa-5-secciones-diy', 0, 1, 'var_r1bkc3v0s2' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 89900, 999, 'web-corporativa-5-secciones-pro', 1, 1, 'var_jzm57vws9d' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web para inmobiliaria', 'Escaparate de inmuebles con fichas, fotos y contacto directo con el agente.

### Qué recibes
- Listado de inmuebles con filtros
- Ficha por inmueble con galería
- Página de agentes
- Formulario de consulta

### Campos que rellenas
- Nombre de la agencia
- Inmuebles (precio, m², habitaciones, fotos)
- Agentes
- Zona de trabajo

### Ejemplo
> Inmobiliaria Costa: 12 pisos en venta con fotos, botón «Quiero visitarlo» y WhatsApp del agente.

### Demo en vivo
- [Web inmobiliaria con buscador](https://automatizasinhumo-demos.davidpd89.workers.dev/inmobiliaria/)
- [Agencia inmobiliaria](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/real-estate-agency/)
- [Alquiler vacacional](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/vacation-rental/)

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [arjoonarora/real-estate-website-template](https://github.com/arjoonarora/real-estate-website-template) — MIT: libre para uso comercial
', 29900, 'eur', 999, 1, 'web-inmobiliaria', 'Modalidad', 0, 'prod_tkvja31n70');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-inmobiliaria' AND c.slug='webs';
UPDATE products SET image_key='productos/web-inmobiliaria.png' WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-inmobiliaria.png', 0, 'pimg_jtrbvtr0d8' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/real-estate-agency.png', 1, 'pimg_wjakpjfyte' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/vacation-rental.png', 2, 'pimg_ma3fhgse53' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'web-inmobiliaria-diy', 0, 1, 'var_cb359c8nk9' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'web-inmobiliaria-pro', 1, 1, 'var_760n3j60tt' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Portfolio con panel para editarlo tú', 'Para fotógrafos, diseñadores, arquitectos o freelancers: cambias textos y fotos desde un panel, sin tocar código.

### Qué recibes
- Portfolio con proyectos y galería
- Panel de administración
- Formulario de contacto
- Alojamiento gratuito en Cloudflare

### Campos que rellenas
- Nombre y profesión
- Proyectos (título, fotos, descripción)
- Biografía
- Redes sociales

### Ejemplo
> Marta, fotógrafa: 8 reportajes, sobre mí, tarifas y contacto. Ella sube los nuevos trabajos desde el móvil.

### Demo en vivo
- [Portfolio sencillo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/portfolio-template/)
- [Fotógrafo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/photographer-portfolio/)
- [Arquitecto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/architect-portfolio/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **179 €** | **349 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [satendragoswamii/portfolio-website-with-admin-panel](https://github.com/satendragoswamii/portfolio-website-with-admin-panel) — MIT: libre para uso comercial · [demo](https://satendragoswami.satendragoshwami.workers.dev)
- [ShadmanArafin/open_portfolio](https://github.com/ShadmanArafin/open_portfolio) — MIT: libre para uso comercial · [demo](https://getopenportfolio.vercel.app)
', 17900, 'eur', 999, 1, 'portfolio-editable', 'Modalidad', 0, 'prod_jqs2hrwxh1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portfolio-editable' AND c.slug='webs';
UPDATE products SET image_key='productos/portfolio-editable.png' WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portfolio-editable.png', 0, 'pimg_wbb2twwxj3' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/portfolio-template.png', 1, 'pimg_kadtyfehxg' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 2, 'pimg_0ck0ctsx28' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/architect-portfolio.png', 3, 'pimg_ab19vjr462' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 17900, 999, 'portfolio-editable-diy', 0, 1, 'var_g7w3h7qpb5' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'portfolio-editable-pro', 1, 1, 'var_qqwyxqp5n0' FROM products WHERE slug='portfolio-editable';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web con blog rápida (SEO)', 'Web ultrarrápida con blog para posicionar en Google y publicar artículos fácilmente.

### Qué recibes
- Web + blog con categorías
- Carga en menos de 1 segundo
- Sitemap y RSS
- 3 artículos iniciales (modalidad «Te lo montamos»)

### Campos que rellenas
- Temática
- Palabras clave
- Logo y colores
- Primeros temas del blog

### Ejemplo
> Clínica de fisioterapia con blog «Ejercicios para la espalda» que atrae visitas desde Google.

### Demo en vivo
- [Blog personal](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/writer-blogger/)

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [lonestone/astro-template](https://github.com/lonestone/astro-template) — MIT: libre para uso comercial
', 24900, 'eur', 999, 1, 'web-blog-astro', 'Modalidad', 0, 'prod_td1813kx19');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-blog-astro' AND c.slug='webs';
UPDATE products SET image_key='productos/web-blog-astro.png' WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-blog-astro.png', 0, 'pimg_wk6qcs01j8' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 1, 'pimg_jmrwgsrr6z' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-blog-astro-diy', 0, 1, 'var_0817hb09zp' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'web-blog-astro-pro', 1, 1, 'var_3jwsctcb1b' FROM products WHERE slug='web-blog-astro';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web para taller con cita previa', 'Taller mecánico, de bicis o de reparación: servicios, precios orientativos y cita online.

### Qué recibes
- Web con servicios y precios
- Calendario de citas
- Aviso de cada cita por email
- Mapa y horario

### Campos que rellenas
- Nombre del taller
- Servicios y duración
- Horario y huecos disponibles
- Fotos del taller

### Ejemplo
> Talleres Pérez: «Cambio de aceite – 45 min – desde 59 €» y el cliente reserva el hueco del jueves.

### Demo en vivo
- [Taller mecánico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/auto-repair/)
- [Fontanería](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/plumber-home-services/)
- [Limpiezas](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/local-services/cleaning-company/)

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **449 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [MohamadTaher/mechanic-shop](https://github.com/MohamadTaher/mechanic-shop) — sin licencia clara: solo referencia de diseño
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) — MIT: libre para uso comercial · [demo](https://punctual.sh)
', 24900, 'eur', 999, 1, 'web-taller', 'Modalidad', 0, 'prod_r88ywv46v8');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-taller' AND c.slug='webs';
UPDATE products SET image_key='productos/web-taller.png' WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-taller.png', 0, 'pimg_mz08pcxms0' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/auto-repair.png', 1, 'pimg_k1meajnx5q' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plumber-home-services.png', 2, 'pimg_a88na25pas' FROM products WHERE slug='web-taller';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cleaning-company.png', 3, 'pimg_bx34bh5bsd' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-taller-diy', 0, 1, 'var_ah6qa26kpp' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-taller-pro', 1, 1, 'var_kfprb6x626' FROM products WHERE slug='web-taller';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Carta digital con código QR', 'Tu carta en el móvil del cliente con un QR en la mesa. Cambias precios cuando quieras, sin reimprimir.

### Qué recibes
- Carta digital por secciones
- QR listo para imprimir
- Alérgenos e idiomas
- Cambios ilimitados de precios

### Campos que rellenas
- Nombre del local
- Platos (nombre, precio, alérgenos)
- Fotos (opcional)
- Idiomas

### Ejemplo
> Bar La Esquina: QR en cada mesa → carta con tapas, raciones y bebidas, en español e inglés.

### Demo en vivo
- [Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)
- [Restaurante](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/restaurant/)
- [Cafetería](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/cafe-coffee-shop/)
- [Bar de copas](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/bar-lounge/)

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [dumbuk12/qr-menu-guide](https://github.com/dumbuk12/qr-menu-guide) — MIT: libre para uso comercial
- [investblog/qr-generator](https://github.com/investblog/qr-generator) — MIT: libre para uso comercial
- [kirollosfayezh/tabla-qr-menu-saas](https://github.com/kirollosfayezh/tabla-qr-menu-saas) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'carta-qr', 'Modalidad', 0, 'prod_q4bkt20xhb');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-qr' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-qr.png' WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-qr.png', 0, 'pimg_fcsnmdnhhx' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_eqr2wj7tbr' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 2, 'pimg_a4vezkytmk' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cafe-coffee-shop.png', 3, 'pimg_3b3rdd126f' FROM products WHERE slug='carta-qr';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/bar-lounge.png', 4, 'pimg_sdysgbg0c2' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'carta-qr-diy', 0, 1, 'var_nebsp92gtp' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'carta-qr-pro', 1, 1, 'var_2c39m4yk7k' FROM products WHERE slug='carta-qr';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Carta QR con pedidos por WhatsApp', 'El cliente elige en la carta, añade al carrito y el pedido te llega por WhatsApp ya escrito.

### Qué recibes
- Carta con carrito
- Pedido enviado a tu WhatsApp
- Opción recoger / a domicilio
- Sin comisiones por pedido

### Campos que rellenas
- Carta y precios
- Número de WhatsApp
- Zona y coste de envío
- Horario de pedidos

### Ejemplo
> Pizzería Nápoles: el cliente pide 2 pizzas y te llega «2× Margarita, recoger 21:00» al WhatsApp.

### Demo en vivo
- [Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Shahabuddin-mahar/whatsapp-restaurant-qr-menu](https://github.com/Shahabuddin-mahar/whatsapp-restaurant-qr-menu) — MIT: libre para uso comercial · [demo](https://shahabuddin-mahar.github.io/whatsapp-restaurant-qr-menu/)
', 9900, 'eur', 999, 1, 'carta-pedidos-whatsapp', 'Modalidad', 0, 'prod_8t08ebbbcw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-pedidos-whatsapp' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/carta-pedidos-whatsapp.png' WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carta-pedidos-whatsapp.png', 0, 'pimg_h82h13ybn0' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 1, 'pimg_jkqaxfxedv' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'carta-pedidos-whatsapp-diy', 0, 1, 'var_yh69rg9k04' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'carta-pedidos-whatsapp-pro', 1, 1, 'var_k5p5ms9qtx' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Reservas de mesa online', 'Sistema propio de reservas sin pagar comisión por comensal a plataformas.

### Qué recibes
- Página de reservas
- Panel para ver y confirmar reservas
- Avisos al cliente
- Control de aforo por turno

### Campos que rellenas
- Turnos y aforo
- Mesas
- Días de cierre
- Email / teléfono de avisos

### Ejemplo
> Restaurante El Puerto: el cliente reserva para 4 el sábado a las 14:30 y tú lo ves en el panel.

### Demo en vivo
- [Web de restaurante](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/restaurant/)
- [Pizzería a domicilio](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/pizza-delivery/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [RamtinBabaei/quickdine-platform](https://github.com/RamtinBabaei/quickdine-platform) — MIT: libre para uso comercial
', 14900, 'eur', 999, 1, 'reservas-restaurante', 'Modalidad', 0, 'prod_qzbyfe3m2m');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-restaurante' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/reservas-restaurante.png' WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-restaurante.png', 0, 'pimg_105rdfbm9z' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/restaurant.png', 1, 'pimg_qhzz1dyb15' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/pizza-delivery.png', 2, 'pimg_cm8xtjdm2s' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'reservas-restaurante-diy', 0, 1, 'var_vcvz8e4ran' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'reservas-restaurante-pro', 1, 1, 'var_18cvsjj34z' FROM products WHERE slug='reservas-restaurante';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Asistente IA que toma pedidos', 'Un asistente que contesta dudas de la carta y toma pedidos por chat, 24 horas.

### Qué recibes
- Asistente entrenado con tu carta
- Respuestas sobre alérgenos y horarios
- Pedido resumido para cocina
- Informe de preguntas frecuentes

### Campos que rellenas
- Carta completa
- Preguntas frecuentes
- Horarios y zonas
- Canal (web, Telegram o WhatsApp)

### Ejemplo
> «¿Tenéis algo sin gluten?» → el asistente recomienda 3 platos y apunta el pedido.

### Demo en vivo
- [Food truck](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/restaurant/food-truck/)
- [Carta con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [thisyourei/fastfood-ai-assistant](https://github.com/thisyourei/fastfood-ai-assistant) — sin licencia clara: solo referencia de diseño
- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) — MIT: libre para uso comercial · [demo](https://chatgpt-telegram-workers.tbxark.workers.dev)
', 29900, 'eur', 999, 1, 'asistente-ia-pedidos', 'Modalidad', 0, 'prod_49wm5ycv0b');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='asistente-ia-pedidos' AND c.slug='hosteleria';
UPDATE products SET image_key='productos/asistente-ia-pedidos.png' WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/asistente-ia-pedidos.png', 0, 'pimg_0bp0mcq83b' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/food-truck.png', 1, 'pimg_5p5easjv8p' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/carta-whatsapp.png', 2, 'pimg_acp1qvvxva' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'asistente-ia-pedidos-diy', 0, 1, 'var_d77hep2e7q' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'asistente-ia-pedidos-pro', 1, 1, 'var_fak8q5gajx' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Página de citas tipo Calendly', 'Comparte un enlace y tus clientes reservan hueco en tu agenda. Sin cuotas por usuario.

### Qué recibes
- Página de reserva con tus huecos
- Tipos de cita (15, 30, 60 min…)
- Confirmación y recordatorio por email
- Enlace para tu web, Instagram o firma

### Campos que rellenas
- Tipos de cita y duración
- Horario disponible
- Email de avisos
- Preguntas previas al cliente

### Ejemplo
> Coach Ana: enlace «Reserva tu sesión de 30 min» en su Instagram; las citas caen solas en su agenda.

### Demo en vivo
- [Fisioterapia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/physiotherapy/)
- [Clínica dental](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/dental-clinic/)
- [Nutricionista](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/nutritionist/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) — MIT: libre para uso comercial · [demo](https://punctual.sh)
', 7900, 'eur', 999, 1, 'pagina-citas', 'Modalidad', 0, 'prod_h5gf0r7vex');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pagina-citas' AND c.slug='reservas';
UPDATE products SET image_key='productos/pagina-citas.png' WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pagina-citas.png', 0, 'pimg_btmcqtb0jp' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/physiotherapy.png', 1, 'pimg_1z6bwbvvmm' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/dental-clinic.png', 2, 'pimg_kjcqafnpvv' FROM products WHERE slug='pagina-citas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/nutritionist.png', 3, 'pimg_de0kmrtsyd' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'pagina-citas-diy', 0, 1, 'var_4t6xqv03qk' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'pagina-citas-pro', 1, 1, 'var_gm3h5t4kjd' FROM products WHERE slug='pagina-citas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Reservas para peluquería, estética o clínica', 'Motor de reservas por servicio y profesional, con ficha de cliente.

### Qué recibes
- Reserva por servicio y profesional
- Ficha e historial de clientes
- Recordatorios
- Widget para tu web

### Campos que rellenas
- Servicios, duración y precio
- Profesionales y horarios
- Política de cancelación

### Ejemplo
> Centro Bella: «Manicura con Laura – martes 17:00 – 25 €», con recordatorio el día antes.

### Demo en vivo
- [Peluquería y spa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/spa-salon/)
- [Estudio de yoga](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/yoga-studio/)
- [Gimnasio](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/health-fitness/gym-fitness/)

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Salora-Software/Salora](https://github.com/Salora-Software/Salora) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://docs.salora.app/docs)
- [nabinbabuuranw/palo](https://github.com/nabinbabuuranw/palo) — MIT: libre para uso comercial · [demo](https://palo.sites.tab.bot/)
', 19900, 'eur', 999, 1, 'reservas-salon', 'Modalidad', 0, 'prod_y6bjqb2stn');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-salon' AND c.slug='reservas';
UPDATE products SET image_key='productos/reservas-salon.png' WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/reservas-salon.png', 0, 'pimg_9rwy2w81w8' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/spa-salon.png', 1, 'pimg_hnd9cn6a7e' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/yoga-studio.png', 2, 'pimg_6yaga90veg' FROM products WHERE slug='reservas-salon';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/gym-fitness.png', 3, 'pimg_4wvg4gqy5y' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'reservas-salon-diy', 0, 1, 'var_793fbdvt87' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'reservas-salon-pro', 1, 1, 'var_ev0cpx1mcs' FROM products WHERE slug='reservas-salon';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web de boda con confirmación de asistencia', 'Toda la información de la boda en una web y los invitados confirman asistencia y menú.

### Qué recibes
- Web con historia, programa, cómo llegar y alojamiento
- Formulario RSVP con menú y alergias
- Lista de confirmados descargable
- Preguntas frecuentes

### Campos que rellenas
- Nombres y fecha
- Lugar de ceremonia y banquete
- Programa del día
- Fotos
- Opciones de menú

### Ejemplo
> Lucía & Pablo: 140 invitados confirman desde el móvil y descargáis el Excel para el catering.

### Demo en vivo
- [Web de boda · estilo Blush](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-blush/)
- [Web de boda · estilo Midnight Gold](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-midnight/)
- [Solo confirmación de asistencia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/rsvp-only/)
- [Boda clásica](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/events-community/wedding/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Holojerm/nuxt-wedding-template](https://github.com/Holojerm/nuxt-wedding-template) — MIT: libre para uso comercial · [demo](https://nuxt-wedding-template.jeremy-ettlinger.workers.dev)
- [kbichave/wedding-invite](https://github.com/kbichave/wedding-invite) — ISC: libre para uso comercial
- [zachspiel/wedding-rsvp](https://github.com/zachspiel/wedding-rsvp) — MIT: libre para uso comercial · [demo](https://zachandsedona.com)
- [sotomaque/wedding-website](https://github.com/sotomaque/wedding-website) — sin licencia clara: solo referencia de diseño · [demo](https://theceremony.app)
- [1molehayo/wedding-website-builder](https://github.com/1molehayo/wedding-website-builder) — GPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://igbeyawowa.app)
', 9900, 'eur', 999, 1, 'web-boda-rsvp', 'Modalidad', 0, 'prod_ebz83be8cd');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-boda-rsvp' AND c.slug='bodas';
UPDATE products SET image_key='productos/web-boda-rsvp.png' WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-boda-rsvp.png', 0, 'pimg_4awnbw18ej' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-blush.png', 1, 'pimg_ng71fdxvr1' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-midnight.png', 2, 'pimg_5nqv1fcr1c' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 3, 'pimg_ghy6k7bvm2' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/wedding.png', 4, 'pimg_9svk7p6xj5' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'web-boda-rsvp-diy', 0, 1, 'var_m1hny0b3kd' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-boda-rsvp-pro', 1, 1, 'var_jehw60f4ky' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Invitación digital animada', 'Invitación para enviar por WhatsApp: cuenta atrás, ubicación y botón para confirmar.

### Qué recibes
- Invitación web animada
- Cuenta atrás
- Botón de mapa y confirmación
- Enlace para compartir

### Campos que rellenas
- Tipo de evento
- Nombres
- Fecha, hora y lugar
- Foto o estilo

### Ejemplo
> Bautizo de Hugo: enlace por WhatsApp con foto, cuenta atrás y «Confirmo asistencia».

### Demo en vivo
- [Web de boda · estilo Sage Garden](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-sage/)
- [Itinerario de fin de semana](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/weekend-itinerary/)

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Poison675/free-wedding-website-templates](https://github.com/Poison675/free-wedding-website-templates) — sin licencia clara: solo referencia de diseño
- [clentebanks/wedding-invitation](https://github.com/clentebanks/wedding-invitation) — sin licencia clara: solo referencia de diseño
', 3900, 'eur', 999, 1, 'invitacion-digital', 'Modalidad', 0, 'prod_2xncvp0wxg');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='invitacion-digital' AND c.slug='bodas';
UPDATE products SET image_key='productos/invitacion-digital.png' WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/invitacion-digital.png', 0, 'pimg_hacn4cqq7w' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/boda-sage.png', 1, 'pimg_m7vkq4493h' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/weekend-itinerary.png', 2, 'pimg_mfz6zmgpkr' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'invitacion-digital-diy', 0, 1, 'var_fwz8xvwtf5' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'invitacion-digital-pro', 1, 1, 'var_k4j5vssbac' FROM products WHERE slug='invitacion-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Galería privada de fotos del evento', 'Álbum privado con enlace: los invitados ven y suben sus fotos, tú las descargas todas.

### Qué recibes
- Galería privada con enlace
- Subida de fotos de invitados
- Favoritas y descarga
- Panel de administración

### Campos que rellenas
- Nombre del evento
- Fotos iniciales
- Contraseña o enlace privado

### Ejemplo
> Tras la boda, 300 fotos de invitados reunidas en un solo álbum privado.

### Demo en vivo
- [Galería de fotógrafo](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/photographer-portfolio/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **69 €** | **149 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [t0ma5/tinygallery](https://github.com/t0ma5/tinygallery) — MIT: libre para uso comercial · [demo](https://tinygallery.pages.dev)
- [BartekBis/wedding-website](https://github.com/BartekBis/wedding-website) — sin licencia clara: solo referencia de diseño
', 6900, 'eur', 999, 1, 'galeria-privada-evento', 'Modalidad', 0, 'prod_p1txqyegsy');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='galeria-privada-evento' AND c.slug='bodas';
UPDATE products SET image_key='productos/galeria-privada-evento.png' WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/galeria-privada-evento.png', 0, 'pimg_zs6xvgwjkz' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/photographer-portfolio.png', 1, 'pimg_q9x4g4f8r8' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 6900, 999, 'galeria-privada-evento-diy', 0, 1, 'var_d33jtsqqb5' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'galeria-privada-evento-pro', 1, 1, 'var_kzg120y09e' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Gestión de invitados y plano de mesas', 'Lista de invitados, confirmaciones, llamadas pendientes y plano de mesas en PDF.

### Qué recibes
- Panel de invitados
- Seguimiento de confirmaciones
- Plano de mesas imprimible
- Exportación a Excel

### Campos que rellenas
- Lista de invitados
- Número de mesas y capacidad
- Restricciones (quién no con quién)

### Ejemplo
> Plano de 15 mesas generado en PDF para el restaurante a partir de las confirmaciones.

### Demo en vivo
- [Confirmación de asistencia](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/rsvp-only/)
- [Lista de regalos](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/templates/registry-template/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [inonalfa/wedding-rsvp-seating](https://github.com/inonalfa/wedding-rsvp-seating) — MIT: libre para uso comercial
- [JacobStephens2/wedding-platform](https://github.com/JacobStephens2/wedding-platform) — MIT: libre para uso comercial · [demo](https://wedding.stephens.page)
', 7900, 'eur', 999, 1, 'gestion-invitados-mesas', 'Modalidad', 0, 'prod_72j50tme60');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='gestion-invitados-mesas' AND c.slug='bodas';
UPDATE products SET image_key='productos/gestion-invitados-mesas.png' WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/gestion-invitados-mesas.png', 0, 'pimg_nrpj42np9d' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/rsvp-only.png', 1, 'pimg_dvnbk7814g' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/registry-template.png', 2, 'pimg_ckvwjk1zvk' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'gestion-invitados-mesas-diy', 0, 1, 'var_rfdn1f72eh' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'gestion-invitados-mesas-pro', 1, 1, 'var_kdpp08n0tx' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tarjeta de visita digital con QR', 'Tu tarjeta en el móvil: un QR y el cliente guarda tu contacto con un toque.

### Qué recibes
- Tarjeta web personal
- Botón «Guardar contacto» (vCard)
- QR para imprimir
- Enlaces a redes y WhatsApp

### Campos que rellenas
- Nombre y cargo
- Foto
- Teléfono, email y web
- Redes sociales

### Ejemplo
> Javier, comercial: enseña el QR en una feria y el contacto queda guardado en el móvil del cliente.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Kahaan83/digital-cards](https://github.com/Kahaan83/digital-cards) — MIT: libre para uso comercial · [demo](https://digital-cards-lemon.vercel.app)
', 2900, 'eur', 999, 1, 'tarjeta-digital', 'Modalidad', 0, 'prod_9r950sgbm8');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tarjeta-digital' AND c.slug='identidad';
UPDATE products SET image_key='productos/tarjeta-digital.png' WHERE slug='tarjeta-digital';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tarjeta-digital.png', 0, 'pimg_767mda8v9e' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'tarjeta-digital-diy', 0, 1, 'var_2yrcwtf5eb' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'tarjeta-digital-pro', 1, 1, 'var_02v5zp34qg' FROM products WHERE slug='tarjeta-digital';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Link-in-bio propio con estadísticas', 'Tu alternativa a Linktree, en tu dominio y sin cuota mensual, con clics medidos.

### Qué recibes
- Página de enlaces con tu marca
- Estadísticas de clics
- Bloques de vídeo, formulario y productos
- Panel para editar

### Campos que rellenas
- Nombre o marca
- Foto / logo
- Enlaces con su texto
- Colores

### Ejemplo
> Creadora de recetas: enlace en Instagram con su libro, YouTube y newsletter, y sabe cuál funciona.

### Demo en vivo
- [Página de enlaces](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/link-in-bio/)

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [MrDemonWolf/linkden](https://github.com/MrDemonWolf/linkden) — MIT: libre para uso comercial · [demo](https://mrdemonwolf.github.io/linkden/)
- [Mrbarnx/Open-Link-Hub](https://github.com/Mrbarnx/Open-Link-Hub) — MIT: libre para uso comercial
- [dimasmong/MoBio](https://github.com/dimasmong/MoBio) — MIT: libre para uso comercial · [demo](https://github.com/dimasmong/MoBio)
', 3900, 'eur', 999, 1, 'link-in-bio', 'Modalidad', 0, 'prod_dt271ff9z1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='link-in-bio' AND c.slug='identidad';
UPDATE products SET image_key='productos/link-in-bio.png' WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/link-in-bio.png', 0, 'pimg_hrex7e69pj' FROM products WHERE slug='link-in-bio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/link-in-bio.png', 1, 'pimg_bwfkdda44n' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'link-in-bio-diy', 0, 1, 'var_gw916xx2d2' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'link-in-bio-pro', 1, 1, 'var_f3v9h00840' FROM products WHERE slug='link-in-bio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Currículum profesional ATS en PDF', 'CV preparado para pasar los filtros automáticos de selección, en PDF y Word.

### Qué recibes
- CV en PDF y Word
- Plantilla a elegir
- Revisión de palabras clave ATS
- Versión web opcional

### Campos que rellenas
- Experiencia
- Formación
- Habilidades
- Puesto al que aspiras

### Ejemplo
> Elena, enfermera: CV de 1 página con las palabras clave de la oferta del hospital.

### Demo en vivo
- [Currículum web](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/resume-cv/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [gianfrancodemarco/resume-builder](https://github.com/gianfrancodemarco/resume-builder) — MIT: libre para uso comercial · [demo](https://resume-builder.gianfrancodemarco.dev/)
- [samuelbelo/cvfree](https://github.com/samuelbelo/cvfree) — MIT: libre para uso comercial
- [akhil-dara/CVAurum](https://github.com/akhil-dara/CVAurum) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://cvaurum.com)
', 2900, 'eur', 999, 1, 'cv-profesional', 'Modalidad', 0, 'prod_vqk13wrfcf');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='cv-profesional' AND c.slug='identidad';
UPDATE products SET image_key='productos/cv-profesional.png' WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/cv-profesional.png', 0, 'pimg_dtsfgnd4tg' FROM products WHERE slug='cv-profesional';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/resume-cv.png', 1, 'pimg_w7mfhvwa3j' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'cv-profesional-diy', 0, 1, 'var_wxjb7r8028' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'cv-profesional-pro', 1, 1, 'var_7zm7jabx3q' FROM products WHERE slug='cv-profesional';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Muro de opiniones de clientes', 'Recoge opiniones con un enlace, apruébalas y muéstralas en tu web.

### Qué recibes
- Formulario para dejar opinión
- Panel para aprobar
- Muro/widget para tu web
- Opiniones con foto y estrellas

### Campos que rellenas
- Nombre del negocio
- Preguntas para el cliente
- Web donde insertarlo

### Ejemplo
> Academia de inglés: tras cada curso envía el enlace y las mejores opiniones salen en su portada.

### Demo en vivo
- [Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **119 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [jhodges3401-code/kudoshelf-lite](https://github.com/jhodges3401-code/kudoshelf-lite) — MIT: libre para uso comercial · [demo](https://jhodges3401-code.github.io/kudoshelf-demo/)
- [AnandSundar/Kindwords](https://github.com/AnandSundar/Kindwords) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'muro-testimonios', 'Modalidad', 0, 'prod_v8cwnf6aeg');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='muro-testimonios' AND c.slug='identidad';
UPDATE products SET image_key='productos/muro-testimonios.png' WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/muro-testimonios.png', 0, 'pimg_pyh7cssq78' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_ph3rr33h55' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'muro-testimonios-diy', 0, 1, 'var_qy9h3rz080' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 11900, 999, 'muro-testimonios-pro', 1, 1, 'var_h6dg5kbgn1' FROM products WHERE slug='muro-testimonios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Formulario de contacto con aviso al móvil', 'Cada mensaje de tu web te llega al instante por Telegram o email, con antispam.

### Qué recibes
- Formulario listo para tu web
- Aviso por Telegram y/o email
- Protección antispam
- Histórico de mensajes

### Campos que rellenas
- Campos del formulario
- Canal de aviso
- Web donde va

### Ejemplo
> Fontanero: «Nueva consulta: fuga en cocina, Calle Mayor 3» le llega al Telegram en 2 segundos.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **89 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [investblog/contact-relay](https://github.com/investblog/contact-relay) — MIT: libre para uso comercial · [demo](https://301.st)
- [BohdanPetryshyn/formzero](https://github.com/BohdanPetryshyn/formzero) — MIT: libre para uso comercial
', 3900, 'eur', 999, 1, 'formulario-aviso-telegram', 'Modalidad', 0, 'prod_281chax5v8');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='formulario-aviso-telegram' AND c.slug='captacion';
UPDATE products SET image_key='productos/formulario-aviso-telegram.png' WHERE slug='formulario-aviso-telegram';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/formulario-aviso-telegram.png', 0, 'pimg_pbp3vse971' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'formulario-aviso-telegram-diy', 0, 1, 'var_30ce54gmne' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'formulario-aviso-telegram-pro', 1, 1, 'var_tkf0wzvxe4' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Lista de espera con referidos', 'Para lanzamientos: la gente se apunta, comparte su enlace y sube puestos en la lista.

### Qué recibes
- Página de lista de espera
- Enlace de referido por persona
- Ranking y exportación
- Email de bienvenida

### Campos que rellenas
- Nombre del producto
- Fecha de lanzamiento
- Premio por referidos

### Ejemplo
> Nueva app de recetas: 1.200 apuntados antes de abrir, 40 % llegados por referidos.

### Demo en vivo
- [Próximamente](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/coming-soon/)
- [Inscripción a webinar](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/webinar-signup/)

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [d4mr/0list](https://github.com/d4mr/0list) — MIT: libre para uso comercial · [demo](https://0list.d4mr.com)
- [Metareignity/waitlist-cloudflare](https://github.com/Metareignity/waitlist-cloudflare) — MIT: libre para uso comercial · [demo](https://waitlist.metareignity.com)
', 7900, 'eur', 999, 1, 'lista-espera', 'Modalidad', 0, 'prod_mxmkf49p7p');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='lista-espera' AND c.slug='captacion';
UPDATE products SET image_key='productos/lista-espera.png' WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/lista-espera.png', 0, 'pimg_79kfa3txps' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/coming-soon.png', 1, 'pimg_q8qhfnbnbn' FROM products WHERE slug='lista-espera';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/webinar-signup.png', 2, 'pimg_hagj38qavb' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'lista-espera-diy', 0, 1, 'var_8nfnrxxgny' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'lista-espera-pro', 1, 1, 'var_k9jj5csmmz' FROM products WHERE slug='lista-espera';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Avisos automáticos multicanal (webhooks)', 'Cualquier evento de tus herramientas (pago, formulario, pedido) avisa a Slack, Telegram, Discord o email.

### Qué recibes
- Bandeja de eventos
- Reglas de aviso por canal
- Histórico consultable

### Campos que rellenas
- Herramientas que envían eventos
- Canales de aviso
- Qué eventos interesan

### Ejemplo
> Cada venta de la tienda manda «🎉 Nueva venta 49 €» al grupo de Telegram del equipo.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **59 €** | **129 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [bts-io/hookforms-cloud](https://github.com/bts-io/hookforms-cloud) — MIT: libre para uso comercial · [demo](https://oss.hookforms.com)
', 5900, 'eur', 999, 1, 'avisos-multicanal', 'Modalidad', 0, 'prod_r5akb3v5cw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='avisos-multicanal' AND c.slug='captacion';
UPDATE products SET image_key='productos/avisos-multicanal.png' WHERE slug='avisos-multicanal';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/avisos-multicanal.png', 0, 'pimg_366shdj48w' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 5900, 999, 'avisos-multicanal-diy', 0, 1, 'var_n9t23r0ar6' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'avisos-multicanal-pro', 1, 1, 'var_bxg7n4h5pt' FROM products WHERE slug='avisos-multicanal';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Bot de Telegram con IA', 'Un asistente con IA en Telegram para tu negocio o comunidad, con tus instrucciones.

### Qué recibes
- Bot de Telegram publicado
- Personalidad e instrucciones a medida
- Control de quién puede usarlo
- Alojamiento sin servidor

### Campos que rellenas
- Nombre del bot
- Para qué sirve
- Instrucciones/tono
- Usuarios permitidos

### Ejemplo
> Gimnasio: bot que responde horarios, tarifas y ejercicios a los socios a cualquier hora.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) — MIT: libre para uso comercial · [demo](https://chatgpt-telegram-workers.tbxark.workers.dev)
', 9900, 'eur', 999, 1, 'bot-telegram-chatgpt', 'Modalidad', 0, 'prod_prb2z1jmyt');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-chatgpt' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-chatgpt.png' WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-chatgpt.png', 0, 'pimg_xqmr6avzwa' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'bot-telegram-chatgpt-diy', 0, 1, 'var_8tdcnzvffn' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'bot-telegram-chatgpt-pro', 1, 1, 'var_mfrpjv7nm9' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Bot de Telegram con menús y pedidos', 'Bot con botones: catálogo, reservas, avisos y pedidos, conectado a tu hoja de cálculo.

### Qué recibes
- Bot con menús de botones
- Conexión con Google Sheets
- Avisos programados
- Panel de mensajes

### Campos que rellenas
- Opciones del menú
- Datos (productos, horarios)
- Quién recibe los pedidos

### Ejemplo
> Panadería: el cliente pulsa «Encargar», elige pan y hora, y el pedido cae en la hoja del obrador.

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **499 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [aiogram/aiogram](https://github.com/aiogram/aiogram) — MIT: libre para uso comercial · [demo](https://aiogram.dev)
', 24900, 'eur', 999, 1, 'bot-telegram-medida', 'Modalidad', 0, 'prod_cg0ma4pbfm');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-medida' AND c.slug='bots';
UPDATE products SET image_key='productos/bot-telegram-medida.png' WHERE slug='bot-telegram-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/bot-telegram-medida.png', 0, 'pimg_0kmphgfm1w' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'bot-telegram-medida-diy', 0, 1, 'var_g65gx92xta' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'bot-telegram-medida-pro', 1, 1, 'var_w3n1dysqrq' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('CRM de WhatsApp para tu equipo', 'Bandeja compartida de WhatsApp: varios agentes, contactos, embudo de ventas y envíos masivos.

### Qué recibes
- Bandeja compartida
- Contactos y etiquetas
- Embudo de oportunidades
- Difusiones

### Campos que rellenas
- Números de WhatsApp Business
- Agentes
- Etapas de venta

### Ejemplo
> Autoescuela: 3 personas atienden el mismo WhatsApp y nadie responde dos veces al mismo alumno.

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **699 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [thareekanvar/replyloom](https://github.com/thareekanvar/replyloom) — MIT: libre para uso comercial
', 29900, 'eur', 999, 1, 'crm-whatsapp', 'Modalidad', 0, 'prod_r9y8w67ebw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='crm-whatsapp' AND c.slug='bots';
UPDATE products SET image_key='productos/crm-whatsapp.png' WHERE slug='crm-whatsapp';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/crm-whatsapp.png', 0, 'pimg_6y9jqa9hym' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'crm-whatsapp-diy', 0, 1, 'var_55cz3hr5ha' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 69900, 999, 'crm-whatsapp-pro', 1, 1, 'var_a8tgt8vht8' FROM products WHERE slug='crm-whatsapp';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Captación de clientes automática', 'Formulario → hoja de cálculo → email de bienvenida → aviso a tu móvil. Sin copiar y pegar.

### Qué recibes
- Flujo n8n importado y probado
- Registro en Google Sheets
- Email automático al cliente
- Aviso a Telegram

### Campos que rellenas
- Formulario de origen
- Hoja de destino
- Texto del email
- Canal de aviso

### Ejemplo
> Academia: cada interesado queda en la hoja, recibe el temario y tú te enteras al momento.

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [yusizer/n8n-lead-automation](https://github.com/yusizer/n8n-lead-automation) — sin licencia clara: solo referencia de diseño · [demo](https://portfolio-site-jade-beta.vercel.app/projects/n8n-lead-automation.html)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
', 14900, 'eur', 999, 1, 'auto-captacion-leads', 'Modalidad', 0, 'prod_rry684pm56');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-captacion-leads' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-captacion-leads.png' WHERE slug='auto-captacion-leads';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-captacion-leads.png', 0, 'pimg_3vkr0ggaeg' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-captacion-leads-diy', 0, 1, 'var_mbg7tsdr1z' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-captacion-leads-pro', 1, 1, 'var_gj8vemj9xz' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Facturas recibidas a hoja de cálculo', 'Las facturas que llegan al email se leen solas y se apuntan en tu hoja: proveedor, fecha, importe, IVA.

### Qué recibes
- Flujo que vigila tu email
- Extracción automática de datos
- Hoja de cálculo ordenada
- Copia del PDF en tu nube

### Campos que rellenas
- Email donde llegan las facturas
- Hoja de destino
- Campos a extraer

### Ejemplo
> Autónomo: a final de trimestre tiene todas las facturas apuntadas para la gestoría.

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) — sin licencia clara: solo referencia de diseño
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
', 14900, 'eur', 999, 1, 'auto-facturas', 'Modalidad', 0, 'prod_3z41zv94ae');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-facturas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-facturas.png' WHERE slug='auto-facturas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-facturas.png', 0, 'pimg_564h2whgp1' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-facturas-diy', 0, 1, 'var_cfdmchncgp' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-facturas-pro', 1, 1, 'var_8hqzc84kw3' FROM products WHERE slug='auto-facturas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Resumen semanal de reseñas', 'Cada lunes recibes un resumen con IA de lo que dicen tus clientes: lo bueno, lo malo y qué responder.

### Qué recibes
- Flujo semanal programado
- Resumen con IA
- Borradores de respuesta
- Envío por email o Telegram

### Campos que rellenas
- Dónde están tus reseñas
- Email/Telegram de destino

### Ejemplo
> Hotel rural: «Esta semana 12 reseñas, 2 quejas por el wifi», con respuesta sugerida.

### Demo en vivo
- [Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) — sin licencia clara: solo referencia de diseño
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
', 9900, 'eur', 999, 1, 'auto-resenas', 'Modalidad', 0, 'prod_6qfrmxgksw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-resenas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-resenas.png' WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-resenas.png', 0, 'pimg_s1z6hyqefs' FROM products WHERE slug='auto-resenas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/testimonios.png', 1, 'pimg_1frtmre3e7' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-resenas-diy', 0, 1, 'var_b52ap0nrg2' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-resenas-pro', 1, 1, 'var_nrdntddjsc' FROM products WHERE slug='auto-resenas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Una automatización a elegir del catálogo', 'Elige entre más de 280 flujos probados (Gmail, WhatsApp, Notion, Drive, IA…) y lo dejamos funcionando con tus cuentas.

### Qué recibes
- Flujo instalado y conectado
- Prueba con datos reales
- Guía de uso de 1 página

### Campos que rellenas
- Qué tarea repetitiva quieres quitarte
- Herramientas que usas
- Accesos (te guiamos)

### Ejemplo
> Guardar adjuntos de Gmail en Drive por cliente, o publicar en redes lo que subes al blog.

### Demo en vivo
- [Catálogo de 100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **199 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
- [activepieces/activepieces](https://github.com/activepieces/activepieces) — sin licencia clara: solo referencia de diseño · [demo](https://www.activepieces.com)
- [automatisch/automatisch](https://github.com/automatisch/automatisch) — sin licencia clara: solo referencia de diseño · [demo](https://automatisch.io)
', 9900, 'eur', 999, 1, 'auto-plantilla-medida', 'Modalidad', 0, 'prod_qww54k09v1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-plantilla-medida' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-plantilla-medida.png' WHERE slug='auto-plantilla-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-plantilla-medida.png', 0, 'pimg_v7d0shnqdm' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-negocio.png', 1, 'pimg_09cnfxzz9s' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-plantilla-medida-diy', 0, 1, 'var_qqgg2ph8zf' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-plantilla-medida-pro', 1, 1, 'var_1pnmsvj1wy' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tareas programadas en la nube', 'Procesos que se ejecutan solos cada hora/día: copias, informes, sincronizaciones, recordatorios.

### Qué recibes
- Proceso en Cloudflare con reintentos
- Registro de ejecuciones
- Aviso si algo falla

### Campos que rellenas
- Qué hay que hacer
- Cada cuánto
- Origen y destino de los datos

### Ejemplo
> Cada noche se copian los pedidos del día a la hoja de contabilidad y se envía el total por email.

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **399 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [cloudflare/workflows-starter](https://github.com/cloudflare/workflows-starter) — Apache-2.0: libre para uso comercial · [demo](https://developers.cloudflare.com/workflows/)
', 19900, 'eur', 999, 1, 'auto-tareas-programadas', 'Modalidad', 0, 'prod_spr2brkg7e');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-tareas-programadas' AND c.slug='automatizaciones';
UPDATE products SET image_key='productos/auto-tareas-programadas.png' WHERE slug='auto-tareas-programadas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auto-tareas-programadas.png', 0, 'pimg_7khpv1znej' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'auto-tareas-programadas-diy', 0, 1, 'var_tdjr6b3zjn' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'auto-tareas-programadas-pro', 1, 1, 'var_j8den7sden' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Acortador de enlaces con tu dominio', 'Enlaces cortos de marca (tunegocio.es/oferta) con estadísticas de clics y QR.

### Qué recibes
- Acortador en tu dominio
- Estadísticas por enlace
- QR por enlace
- Panel de gestión

### Campos que rellenas
- Dominio o subdominio
- Primeros enlaces

### Ejemplo
> Campaña de flyers con tunegocio.es/verano: sabes cuántos escanearon el QR y desde dónde.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [miantiao-me/Sink](https://github.com/miantiao-me/Sink) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://Sink.Cool)
- [botnick/shortlink](https://github.com/botnick/shortlink) — sin licencia clara: solo referencia de diseño
', 4900, 'eur', 999, 1, 'acortador-enlaces', 'Modalidad', 0, 'prod_c01a54y18x');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='acortador-enlaces' AND c.slug='enlaces';
UPDATE products SET image_key='productos/acortador-enlaces.png' WHERE slug='acortador-enlaces';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/acortador-enlaces.png', 0, 'pimg_29kqv7txh7' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'acortador-enlaces-diy', 0, 1, 'var_kbeteb8559' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'acortador-enlaces-pro', 1, 1, 'var_74q0yd55wm' FROM products WHERE slug='acortador-enlaces';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Pack de códigos QR para campañas', 'QR en vector listos para imprenta, con enlace editable y medición.

### Qué recibes
- Hasta 10 QR en SVG/PNG
- Enlaces editables después de imprimir
- Medición de escaneos

### Campos que rellenas
- Destinos de cada QR
- Colores / logo

### Ejemplo
> QR en escaparate, carta y tarjetas, cada uno medido por separado.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [investblog/qr-generator](https://github.com/investblog/qr-generator) — MIT: libre para uso comercial
', 1900, 'eur', 999, 1, 'qr-campanas', 'Modalidad', 0, 'prod_fcdn0emd2q');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='qr-campanas' AND c.slug='enlaces';
UPDATE products SET image_key='productos/qr-campanas.png' WHERE slug='qr-campanas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/qr-campanas.png', 0, 'pimg_72ypc2r6g5' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'qr-campanas-diy', 0, 1, 'var_fnvkkbcct2' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'qr-campanas-pro', 1, 1, 'var_5veaah0ztz' FROM products WHERE slug='qr-campanas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Analítica web sin cookies', 'Sabe cuántas visitas tienes y de dónde vienen, sin banner de cookies molesto.

### Qué recibes
- Panel de analítica privado
- Instalación en tu web
- Informe mensual por email (con plan)

### Campos que rellenas
- Web(s) a medir
- Email para informes

### Ejemplo
> Tienda local: «este mes 2.300 visitas, 40 % desde Instagram, la página más vista es Ofertas».

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **99 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [umami-software/umami](https://github.com/umami-software/umami) — MIT: libre para uso comercial · [demo](https://umami.is)
', 4900, 'eur', 999, 1, 'analitica-sin-cookies', 'Modalidad', 0, 'prod_cmxjxqsygr');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='analitica-sin-cookies' AND c.slug='enlaces';
UPDATE products SET image_key='productos/analitica-sin-cookies.png' WHERE slug='analitica-sin-cookies';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/analitica-sin-cookies.png', 0, 'pimg_68j4az5eag' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'analitica-sin-cookies-diy', 0, 1, 'var_t7a5hrbqq1' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'analitica-sin-cookies-pro', 1, 1, 'var_xpn10z3833' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tienda de productos digitales', 'Vende ebooks, plantillas, cursos o presets: el cliente paga y descarga al momento.

### Qué recibes
- Tienda con pago online
- Entrega automática del archivo
- Panel de pedidos
- Emails de compra

### Campos que rellenas
- Productos y precios
- Archivos a entregar
- Cuenta de cobro (Stripe)

### Ejemplo
> Diseñadora vende packs de plantillas de Canva a 9 € con descarga instantánea.

### Demo en vivo
- [Tienda de descargas digitales](https://automatizasinhumo-demos.davidpd89.workers.dev/tienda-descargas/)
- [Descarga de ebook](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/landing-pages/ebook-download/)

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [ddyy/minshop](https://github.com/ddyy/minshop) — sin licencia clara: solo referencia de diseño
- [Vojislav77/digital-downloads-website](https://github.com/Vojislav77/digital-downloads-website) — MIT: libre para uso comercial · [demo](https://vojislav77.github.io/digital-downloads-website/)
- [fengyiqicoder/astro-ai-shop](https://github.com/fengyiqicoder/astro-ai-shop) — MIT: libre para uso comercial · [demo](https://fengyiqicoder.github.io/astro-ai-shop/)
- [Paymug/paymug](https://github.com/Paymug/paymug) — sin licencia clara: solo referencia de diseño · [demo](https://paymug.co)
', 29900, 'eur', 999, 1, 'tienda-productos-digitales', 'Modalidad', 0, 'prod_23g4qd259f');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-productos-digitales' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-productos-digitales.png' WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-productos-digitales.png', 0, 'pimg_vhpnef8eng' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tienda-descargas.png', 1, 'pimg_88f7gas00w' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/ebook-download.png', 2, 'pimg_ms9cnsfw6n' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'tienda-productos-digitales-diy', 0, 1, 'var_trwnby0ban' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'tienda-productos-digitales-pro', 1, 1, 'var_24kzv5nzj4' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tienda online completa', 'Catálogo, variantes, carrito, pagos, envíos y panel de pedidos. Sin comisiones de plataforma.

### Qué recibes
- Tienda con tu marca
- Pagos con tarjeta
- Gestión de stock y envíos
- Panel de administración

### Campos que rellenas
- Productos, variantes y fotos
- Tarifas de envío
- Datos legales
- Cuenta de cobro

### Ejemplo
> Tienda de cerámica artesana con 40 productos, envío a península y aviso de cada venta.

### Demo en vivo
- [Tienda de moda](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/fashion-store/)
- [Cosmética](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/cosmetics-skincare-store/)
- [Tienda de un producto](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/ecommerce/single-product-store/)

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **499 €** | **999 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [ddyy/minshop](https://github.com/ddyy/minshop) — sin licencia clara: solo referencia de diseño
- [russellkmoore/mercora](https://github.com/russellkmoore/mercora) — MIT: libre para uso comercial · [demo](https://voltique.russellkmoore.me)
', 49900, 'eur', 999, 1, 'tienda-online', 'Modalidad', 0, 'prod_36gd4gtgaw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-online' AND c.slug='tiendas';
UPDATE products SET image_key='productos/tienda-online.png' WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/tienda-online.png', 0, 'pimg_x38v3120an' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/fashion-store.png', 1, 'pimg_v0w5ms2hbh' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/cosmetics-skincare-store.png', 2, 'pimg_d5bqbcb1na' FROM products WHERE slug='tienda-online';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/single-product-store.png', 3, 'pimg_3gkq8tb0qn' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 49900, 999, 'tienda-online-diy', 0, 1, 'var_4nwzww0j5e' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99900, 999, 'tienda-online-pro', 1, 1, 'var_y041rakskw' FROM products WHERE slug='tienda-online';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Marketplace de productos digitales', 'Plataforma donde varios creadores venden plantillas, presets o cursos y tú cobras comisión.

### Qué recibes
- Marketplace multivendedor
- Previsualizaciones
- Pagos y descargas protegidas
- Panel de vendedores

### Campos que rellenas
- Nombre y nicho
- Comisión
- Categorías
- Primeros vendedores

### Ejemplo
> Marketplace de plantillas de Notion para estudiantes con 15 creadores.

**Plazo:** 10 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **699 €** | **1299 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 10 días | 10 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Kylelau339/digital-sales-platform](https://github.com/Kylelau339/digital-sales-platform) — MIT: libre para uso comercial
- [w4seemdev/Templix](https://github.com/w4seemdev/Templix) — sin licencia clara: solo referencia de diseño · [demo](https://templix-peach.vercel.app)
- [playlikeboy/scriptly.store](https://github.com/playlikeboy/scriptly.store) — sin licencia clara: solo referencia de diseño · [demo](https://scriptly.store)
- [vignesh-gupta/digibee-marketplace](https://github.com/vignesh-gupta/digibee-marketplace) — MIT: libre para uso comercial · [demo](https://digibee.vigneshgupta.tech/)
', 69900, 'eur', 999, 1, 'marketplace-plantillas', 'Modalidad', 0, 'prod_y78gx7qdrf');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='marketplace-plantillas' AND c.slug='tiendas';
UPDATE products SET image_key='productos/marketplace-plantillas.png' WHERE slug='marketplace-plantillas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/marketplace-plantillas.png', 0, 'pimg_pm2k97yqsd' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 69900, 999, 'marketplace-plantillas-diy', 0, 1, 'var_mqny4714ne' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 129900, 999, 'marketplace-plantillas-pro', 1, 1, 'var_ypwryv54c1' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Portal de clientes para agencias y freelancers', 'Tus clientes entran con su usuario y ven proyectos, archivos, facturas y avances.

### Qué recibes
- Portal con tu marca
- Proyectos y tareas
- Archivos compartidos
- Facturas y presupuestos

### Campos que rellenas
- Logo y colores
- Clientes y proyectos iniciales
- Servicios que facturas

### Ejemplo
> Estudio de diseño: el cliente ve «Logo – fase 2 de 3» y descarga las propuestas.

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **299 €** | **599 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [directus-labs/agency-os](https://github.com/directus-labs/agency-os) — MIT: libre para uso comercial · [demo](https://agencyos.dev)
- [Vibra-Labs/Atrium](https://github.com/Vibra-Labs/Atrium) — sin licencia clara: solo referencia de diseño · [demo](https://atrium.vibralabs.co)
- [onlineprfoundation/pr-agency-platform](https://github.com/onlineprfoundation/pr-agency-platform) — sin licencia clara: solo referencia de diseño · [demo](https://online.pr/opensource/pr-agency-platform)
', 29900, 'eur', 999, 1, 'portal-cliente', 'Modalidad', 0, 'prod_67y441kvfp');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portal-cliente' AND c.slug='portales';
UPDATE products SET image_key='productos/portal-cliente.png' WHERE slug='portal-cliente';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/portal-cliente.png', 0, 'pimg_04f7xfzcvj' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'portal-cliente-diy', 0, 1, 'var_rd68k8przs' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'portal-cliente-pro', 1, 1, 'var_azha7297s8' FROM products WHERE slug='portal-cliente';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web que editas arrastrando bloques', 'Web con editor visual: cambias textos, imágenes y secciones arrastrando, como en Wix, pero tuya.

### Qué recibes
- Web con editor visual
- Bloques prediseñados
- Formación de 30 min
- Alojamiento propio

### Campos que rellenas
- Secciones que necesitas
- Contenido inicial
- Quién la editará

### Ejemplo
> Asociación cultural: la junta cambia la agenda de actividades cada semana sin depender de nadie.

### Demo en vivo
- [Meridian (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/meridian/)
- [Northstar (Bootstrap)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/northstar/)

**Plazo:** 7 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **399 €** | **799 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 7 días | 7 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) — sin licencia clara: solo referencia de diseño · [demo](https://grapesjs.com)
- [puckeditor/puck](https://github.com/puckeditor/puck) — MIT: libre para uso comercial · [demo](https://puckeditor.com)
- [givanz/VvvebJs](https://github.com/givanz/VvvebJs) — Apache-2.0: libre para uso comercial · [demo](https://www.vvveb.com/vvvebjs/editor.html)
- [webstudio-is/webstudio](https://github.com/webstudio-is/webstudio) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://webstudio.is)
', 39900, 'eur', 999, 1, 'web-editable-visual', 'Modalidad', 0, 'prod_e74v9xssnx');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-editable-visual' AND c.slug='portales';
UPDATE products SET image_key='productos/web-editable-visual.png' WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-editable-visual.png', 0, 'pimg_084kbtgfd3' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/meridian.png', 1, 'pimg_9ycwbad4bv' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/northstar.png', 2, 'pimg_nfh7c7jkcp' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 39900, 999, 'web-editable-visual-diy', 0, 1, 'var_03w9zc6261' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 79900, 999, 'web-editable-visual-pro', 1, 1, 'var_n6zt55damn' FROM products WHERE slug='web-editable-visual';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Mantenimiento web (mes)', 'Nos ocupamos de que tu web siga funcionando: copias, actualizaciones y pequeños cambios.

### Qué recibes
- Copias de seguridad
- Actualizaciones de seguridad
- 30 min de cambios al mes
- Vigilancia de caídas

### Campos que rellenas
- Web a mantener
- Accesos (te guiamos)

### Ejemplo
> Cambiar el horario de verano o subir la nueva carta: nos lo mandas y está hecho.

**Plazo:** Mensual
', 1900, 'eur', 999, 1, 'plan-mantenimiento-web', NULL, 0, 'prod_9xz74ryg7b');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-mantenimiento-web' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-mantenimiento-web.png' WHERE slug='plan-mantenimiento-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-mantenimiento-web.png', 0, 'pimg_3d0g908pvk' FROM products WHERE slug='plan-mantenimiento-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Alojamiento + dominio gestionado (mes)', 'Tu web publicada en Cloudflare con SSL y tu dominio, sin preocuparte de renovaciones.

### Qué recibes
- Alojamiento rápido con SSL
- Gestión del dominio
- Email de reenvío

### Campos que rellenas
- Dominio deseado
- Web a alojar

### Ejemplo
> tunegocio.es apuntando a tu web, renovado cada año sin que tengas que hacer nada.

**Plazo:** Mensual

### Base técnica (código abierto)
- [coollabsio/coolify](https://github.com/coollabsio/coolify) — Apache-2.0: libre para uso comercial · [demo](https://coolify.io)
', 900, 'eur', 999, 1, 'plan-hosting-dominio', NULL, 0, 'prod_rbm7tbkcqn');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-hosting-dominio' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-hosting-dominio.png' WHERE slug='plan-hosting-dominio';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-hosting-dominio.png', 0, 'pimg_m9tay6ejcq' FROM products WHERE slug='plan-hosting-dominio';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Automatizaciones vigiladas (mes)', 'Mantenemos tus automatizaciones en marcha: si una falla, la arreglamos antes de que lo notes.

### Qué recibes
- Servidor n8n/Activepieces gestionado
- Vigilancia de errores
- 1 flujo nuevo pequeño al mes

### Campos que rellenas
- Automatizaciones actuales
- Canal de aviso

### Ejemplo
> El token de Google caduca un viernes por la noche: lo renovamos y el flujo sigue.

**Plazo:** Mensual

### Base técnica (código abierto)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
- [activepieces/activepieces](https://github.com/activepieces/activepieces) — sin licencia clara: solo referencia de diseño · [demo](https://www.activepieces.com)
', 3900, 'eur', 999, 1, 'plan-automatizaciones', NULL, 0, 'prod_bxd7fyassm');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-automatizaciones' AND c.slug='planes';
UPDATE products SET image_key='productos/plan-automatizaciones.png' WHERE slug='plan-automatizaciones';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plan-automatizaciones.png', 0, 'pimg_bd6gjcgy78' FROM products WHERE slug='plan-automatizaciones';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Auditoría web exprés', 'Informe claro de velocidad, SEO, móvil y accesibilidad de tu web, con lo que hay que arreglar primero.

### Qué recibes
- Informe PDF de 5–8 páginas
- Lista priorizada de mejoras
- Presupuesto cerrado para arreglarlo

### Campos que rellenas
- URL de la web
- Objetivo (más ventas, más llamadas…)

### Ejemplo
> «Tu web tarda 6 s en móvil por 3 imágenes de 4 MB: arreglarlo sube las llamadas».

**Plazo:** 48 h

### Base técnica (código abierto)
- [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) — Apache-2.0: libre para uso comercial · [demo](https://developer.chrome.com/docs/lighthouse/overview/)
', 4900, 'eur', 999, 1, 'auditoria-web', NULL, 0, 'prod_2m0m7g1xva');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auditoria-web' AND c.slug='planes';
UPDATE products SET image_key='productos/auditoria-web.png' WHERE slug='auditoria-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/auditoria-web.png', 0, 'pimg_e8hpks9wan' FROM products WHERE slug='auditoria-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Aviso si tu web se cae + página de estado', 'Comprobamos tu web cada minuto y te avisamos al móvil si deja de funcionar, con una página pública de estado.

### Qué recibes
- Vigilancia cada 60 s de webs, tiendas o reservas
- Aviso por Telegram o email
- Página de estado con tu logo
- Informe mensual de disponibilidad

### Campos que rellenas
- Webs a vigilar (URLs)
- Canal de aviso (Telegram / email)
- Logo

### Ejemplo
> La tienda de Ana cae un sábado a las 23:10; a las 23:11 le llega «tienda caída» al Telegram y lo arreglamos.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) — MIT: libre para uso comercial · [demo](https://uptime.kuma.pet)
', 3900, 'eur', 999, 1, 'vigilancia-caidas', 'Modalidad', 0, 'prod_sfectb1za4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-caidas' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-caidas.png' WHERE slug='vigilancia-caidas';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-caidas.png', 0, 'pimg_062x3p2wgd' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'vigilancia-caidas-diy', 0, 1, 'var_16h6c6sf54' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'vigilancia-caidas-pro', 1, 1, 'var_1rqqxstmst' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Generador de facturas y presupuestos con tu marca', 'Rellenas cliente y conceptos, y sale una factura o presupuesto en PDF con tu logo, IVA calculado y numeración.

### Qué recibes
- Generador web propio (tuyo, sin cuotas)
- Plantilla con tu logo y datos fiscales
- Descarga en PDF y envío por email
- Guía de uso de 1 página

### Campos que rellenas
- Razón social y NIF
- Logo y colores
- Tipos de IVA / IRPF que usas
- Formato de numeración

### Ejemplo
> Electricista autónomo: «Presupuesto P-2026-014 · cambio de cuadro · 380 € + IVA» enviado al cliente en 2 minutos desde el móvil.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **79 €** | **179 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [al1abb/invoify](https://github.com/al1abb/invoify) — MIT: libre para uso comercial · [demo](https://invoify.vercel.app)
', 7900, 'eur', 999, 1, 'facturas-presupuestos', 'Modalidad', 0, 'prod_0csgat1pdp');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='facturas-presupuestos' AND c.slug='documentos';
UPDATE products SET image_key='productos/facturas-presupuestos.png' WHERE slug='facturas-presupuestos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/facturas-presupuestos.png', 0, 'pimg_0235y7why6' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'facturas-presupuestos-diy', 0, 1, 'var_6g0dcxqvv6' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'facturas-presupuestos-pro', 1, 1, 'var_zw3g2ndzgb' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Diplomas y certificados en PDF automáticos', 'Para academias, cursos y eventos: subes la lista de alumnos y cada uno recibe su certificado personalizado.

### Qué recibes
- Plantilla de diploma con tu diseño
- Generación masiva desde una hoja de cálculo
- Envío automático por email
- Código QR de verificación

### Campos que rellenas
- Logo y firma
- Texto del certificado
- Hoja con nombres, emails y horas
- Email remitente

### Ejemplo
> Academia de inglés: 120 alumnos terminan el curso y en 5 minutos cada uno tiene su diploma con QR en el correo.

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **229 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [pdfme/pdfme](https://github.com/pdfme/pdfme) — MIT: libre para uso comercial · [demo](http://pdfme.com/)
', 9900, 'eur', 999, 1, 'certificados-automaticos', 'Modalidad', 0, 'prod_xhj0z79grs');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='certificados-automaticos' AND c.slug='documentos';
UPDATE products SET image_key='productos/certificados-automaticos.png' WHERE slug='certificados-automaticos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/certificados-automaticos.png', 0, 'pimg_5ckbpaf2kn' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'certificados-automaticos-diy', 0, 1, 'var_a7zk1h06pn' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 22900, 999, 'certificados-automaticos-pro', 1, 1, 'var_9pyaa8qs26' FROM products WHERE slug='certificados-automaticos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Transcripción automática de audios y reuniones', 'Mandas un audio o una grabación y recibes el texto y un resumen con tareas. Funciona con audios de WhatsApp.

### Qué recibes
- Carpeta o bot donde dejar los audios
- Texto completo en español
- Resumen con puntos y tareas
- Copia en Google Docs o email

### Campos que rellenas
- Dónde te llegan los audios (WhatsApp, Telegram, carpeta)
- Dónde quieres el texto
- Idioma principal

### Ejemplo
> Gestoría: reenvía al bot la nota de voz del cliente y recibe «Pide cita para la renta, trae 3 nóminas».

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **149 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [openai/whisper](https://github.com/openai/whisper) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'transcripcion-audios', 'Modalidad', 0, 'prod_8dd687d84x');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='transcripcion-audios' AND c.slug='documentos';
UPDATE products SET image_key='productos/transcripcion-audios.png' WHERE slug='transcripcion-audios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/transcripcion-audios.png', 0, 'pimg_5mqxqeh7j9' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'transcripcion-audios-diy', 0, 1, 'var_mm1tdexkpr' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'transcripcion-audios-pro', 1, 1, 'var_tb88bv1a7r' FROM products WHERE slug='transcripcion-audios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Chat con IA en tu web que responde con tus datos', 'Un asistente en tu web que contesta horarios, precios y dudas frecuentes usando tu información, y te pasa los contactos.

### Qué recibes
- Chat en tu web o en una página propia
- Entrenado con tus textos, PDFs y preguntas frecuentes
- Aviso cuando alguien deja sus datos
- Panel para revisar conversaciones

### Campos que rellenas
- Web donde va el chat
- Documentos o FAQ
- Tono (cercano / formal)
- Email o Telegram para avisos

### Ejemplo
> Clínica dental: «¿Abrís el sábado?» → «Sí, de 10 a 14. ¿Te reservo una revisión?» y llega el contacto al móvil.

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) — MIT: libre para uso comercial
', 19900, 'eur', 999, 1, 'chat-ia-web', 'Modalidad', 0, 'prod_ctzenm0era');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='chat-ia-web' AND c.slug='bots';
UPDATE products SET image_key='productos/chat-ia-web.png' WHERE slug='chat-ia-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/chat-ia-web.png', 0, 'pimg_pvqw711vce' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'chat-ia-web-diy', 0, 1, 'var_77rxtkbs3a' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'chat-ia-web-pro', 1, 1, 'var_9e41dy9g71' FROM products WHERE slug='chat-ia-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Centro de ayuda o manual para tus clientes', 'Una web de ayuda con buscador para que tus clientes resuelvan dudas solos: guías, preguntas frecuentes y tutoriales.

### Qué recibes
- Web de documentación con buscador
- Menú lateral por temas
- Modo claro/oscuro y versión móvil
- Fácil de ampliar escribiendo textos

### Campos que rellenas
- Nombre del producto o servicio
- Temas y preguntas
- Capturas o vídeos
- Logo y colores

### Ejemplo
> Software de reservas para gimnasios: «Cómo cancelar una clase», «Cómo cambiar la tarifa»… y bajan los emails de soporte.

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **349 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [withastro/starlight](https://github.com/withastro/starlight) — MIT: libre para uso comercial · [demo](https://starlight.astro.build)
', 14900, 'eur', 999, 1, 'centro-ayuda', 'Modalidad', 0, 'prod_rsyfgzjeh5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='centro-ayuda' AND c.slug='portales';
UPDATE products SET image_key='productos/centro-ayuda.png' WHERE slug='centro-ayuda';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/centro-ayuda.png', 0, 'pimg_m9zgr48ewr' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'centro-ayuda-diy', 0, 1, 'var_y0h61tr7e2' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'centro-ayuda-pro', 1, 1, 'var_avkct438hc' FROM products WHERE slug='centro-ayuda';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Boletín de email propio sin cuotas por contacto', 'Tu propio sistema de newsletter: formulario de alta, plantillas y envíos programados, sin pagar por cada suscriptor.

### Qué recibes
- Servidor de newsletter configurado
- Formulario de alta para tu web
- Plantilla de email con tu marca
- Doble confirmación y baja (RGPD)

### Campos que rellenas
- Nombre del boletín
- Logo y colores
- Contactos actuales (si tienes)
- Frecuencia de envío

### Ejemplo
> Librería de barrio: cada lunes «Novedades de la semana» a 2.300 suscriptores sin cuota mensual por contactos.

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **149 €** | **299 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [knadh/listmonk](https://github.com/knadh/listmonk) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://listmonk.app)
', 14900, 'eur', 999, 1, 'newsletter-propia', 'Modalidad', 0, 'prod_hn2j5knbaz');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='newsletter-propia' AND c.slug='captacion';
UPDATE products SET image_key='productos/newsletter-propia.png' WHERE slug='newsletter-propia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/newsletter-propia.png', 0, 'pimg_nd2vjwn6s7' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'newsletter-propia-diy', 0, 1, 'var_m1tbh7y163' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'newsletter-propia-pro', 1, 1, 'var_xeev4tnsrw' FROM products WHERE slug='newsletter-propia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Banner de cookies legal y textos RGPD', 'Pon tu web en regla: banner de cookies que bloquea de verdad hasta que el usuario acepta, y textos legales base.

### Qué recibes
- Banner de cookies con aceptar / rechazar / configurar
- Bloqueo real de analítica y píxeles
- Plantillas de aviso legal, privacidad y cookies
- Instalado en tu web (modalidad «Te lo montamos»)

### Campos que rellenas
- URL de la web
- Datos del titular
- Herramientas que usas (Analytics, Meta…)

### Ejemplo
> Tienda con píxel de Meta: el píxel ya no se carga hasta que el cliente pulsa «Aceptar».

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) — MIT: libre para uso comercial · [demo](https://playground.cookieconsent.orestbida.com/)
', 2900, 'eur', 999, 1, 'banner-cookies-rgpd', 'Modalidad', 0, 'prod_q3ybrg1n0y');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='banner-cookies-rgpd' AND c.slug='webs';
UPDATE products SET image_key='productos/banner-cookies-rgpd.png' WHERE slug='banner-cookies-rgpd';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/banner-cookies-rgpd.png', 0, 'pimg_g0rz8qbebb' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'banner-cookies-rgpd-diy', 0, 1, 'var_dx0a1tn5e7' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'banner-cookies-rgpd-pro', 1, 1, 'var_p56c0q1tje' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tu web en inglés (u otro idioma)', 'Añadimos un segundo idioma a tu web con selector, URLs propias y SEO para que te encuentren turistas y clientes de fuera.

### Qué recibes
- Versión completa en el idioma elegido
- Selector de idioma
- Etiquetas hreflang para Google
- Revisión humana de textos clave

### Campos que rellenas
- URL de la web
- Idioma
- Textos que no se traducen (marcas, platos…)

### Ejemplo
> Restaurante en Sevilla con carta y reservas en inglés: el turista que busca «tapas Seville» llega a una web que entiende y reserva.

### Demo en vivo
- [Hotel](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/hotel-resort/)
- [Guía turístico](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/real-estate-travel/tour-guide/)

**Plazo:** 4 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **99 €** | **249 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 4 días | 4 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |
', 9900, 'eur', 999, 1, 'web-multidioma', 'Modalidad', 0, 'prod_62qwpzsn3n');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-multidioma' AND c.slug='webs';
UPDATE products SET image_key='productos/web-multidioma.png' WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-multidioma.png', 0, 'pimg_s7gpwvqkzw' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/hotel-resort.png', 1, 'pimg_c76xkbcvmz' FROM products WHERE slug='web-multidioma';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/tour-guide.png', 2, 'pimg_56y5k7bqdm' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'web-multidioma-diy', 0, 1, 'var_msyt8stqpk' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-multidioma-pro', 1, 1, 'var_deynvz5xxj' FROM products WHERE slug='web-multidioma';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Ficha de Google de tu negocio optimizada', 'Que te encuentren en Google Maps: ficha completa, categorías correctas, fotos, horarios y enlace de reseñas.

### Qué recibes
- Ficha revisada y completada
- Categorías y servicios optimizados
- Enlace y QR para pedir reseñas
- Checklist mensual de publicaciones

### Campos que rellenas
- Nombre y dirección del negocio
- Servicios principales
- 5–10 fotos
- Acceso a la ficha (te guiamos)

### Ejemplo
> Fisioterapeuta en Valencia: aparece en «fisio cerca de mí» con 40 fotos, horario y botón de cita.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |
', 4900, 'eur', 999, 1, 'ficha-google', 'Modalidad', 0, 'prod_tbbnare2eb');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='ficha-google' AND c.slug='captacion';
UPDATE products SET image_key='productos/ficha-google.png' WHERE slug='ficha-google';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/ficha-google.png', 0, 'pimg_j9cbwmfayw' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'ficha-google-diy', 0, 1, 'var_0m68dk25db' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'ficha-google-pro', 1, 1, 'var_rr8qvg69zf' FROM products WHERE slug='ficha-google';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Fotos de producto con fondo blanco automático', 'Subes las fotos hechas con el móvil y te devolvemos las imágenes recortadas, con fondo blanco y tamaño para tu tienda.

### Qué recibes
- Hasta 50 fotos recortadas (ampliable)
- Fondo blanco o de color
- Tamaños para web, Amazon e Instagram
- Carpeta compartida para nuevas tandas

### Campos que rellenas
- Fotos (carpeta o zip)
- Color de fondo
- Medidas que necesitas

### Ejemplo
> Tienda de cerámica: 36 fotos hechas en la mesa de la cocina, listas para la web en una tarde.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [danielgatis/rembg](https://github.com/danielgatis/rembg) — MIT: libre para uso comercial
', 2900, 'eur', 999, 1, 'fotos-producto-fondo', 'Modalidad', 0, 'prod_epc4v614rw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='fotos-producto-fondo' AND c.slug='tiendas';
UPDATE products SET image_key='productos/fotos-producto-fondo.png' WHERE slug='fotos-producto-fondo';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/fotos-producto-fondo.png', 0, 'pimg_y1xe1vv21w' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'fotos-producto-fondo-diy', 0, 1, 'var_q89jkf7yna' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'fotos-producto-fondo-pro', 1, 1, 'var_7vc450hskh' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Firma de email profesional', 'Firma con tu foto o logo, cargo, teléfono, redes y aviso legal, que se ve bien en Gmail, Outlook y móvil.

### Qué recibes
- Firma HTML probada en Gmail y Outlook
- Versión para todo tu equipo
- Guía de instalación en 2 minutos

### Campos que rellenas
- Nombre y cargo de cada persona
- Logo o foto
- Teléfono y web
- Redes sociales

### Ejemplo
> Despacho de 6 abogados: misma firma para todos, con logo, teléfono directo y enlace de cita.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |
', 1900, 'eur', 999, 1, 'firma-email', 'Modalidad', 0, 'prod_tz5fcdqefg');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='firma-email' AND c.slug='identidad';
UPDATE products SET image_key='productos/firma-email.png' WHERE slug='firma-email';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/firma-email.png', 0, 'pimg_rpaj775z1h' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'firma-email-diy', 0, 1, 'var_nxg1tj999z' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'firma-email-pro', 1, 1, 'var_0xyq9yw7ex' FROM products WHERE slug='firma-email';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Pizarra online privada para tu equipo', 'Una pizarra colaborativa propia para esquemas, planos de local o diagramas, con tu dominio y sin cuentas de terceros.

### Qué recibes
- Pizarra colaborativa publicada en tu dominio
- Bibliotecas de iconos para tu sector
- Exportación a PNG y PDF

### Campos que rellenas
- Subdominio deseado
- Uso principal (planos, esquemas, clases)
- Logo

### Ejemplo
> Reformas López dibuja con el cliente la cocina nueva en la tablet y le manda el PDF al terminar.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **49 €** | **129 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) — MIT: libre para uso comercial · [demo](https://excalidraw.com)
', 4900, 'eur', 999, 1, 'pizarra-planos', 'Modalidad', 0, 'prod_fhwjjd9a5x');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pizarra-planos' AND c.slug='documentos';
UPDATE products SET image_key='productos/pizarra-planos.png' WHERE slug='pizarra-planos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/pizarra-planos.png', 0, 'pimg_xxm2jq5jzr' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'pizarra-planos-diy', 0, 1, 'var_5jqe412zny' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'pizarra-planos-pro', 1, 1, 'var_fsgmjze022' FROM products WHERE slug='pizarra-planos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Vigilancia de precios de la competencia (mes)', 'Te avisamos por email o Telegram cuando un competidor cambia el precio, se queda sin stock o vuelve a tenerlo.

### Qué recibes
- Hasta 25 productos vigilados
- Aviso por email o Telegram
- Historial de precios de cada producto
- Cambio de la lista cuando quieras

### Campos que rellenas
- Enlaces de los productos
- Precio a partir del cual avisar
- Frecuencia (diaria, cada hora)
- Email o Telegram

### Ejemplo
> Tienda de bicis: «La Orbea X de la competencia ha bajado de 1.299 € a 1.149 €» llega al móvil a las 9:00.

**Plazo:** Mensual

### Base técnica (código abierto)
- [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) — Apache-2.0: libre para uso comercial · [demo](https://changedetection.io)
', 1200, 'eur', 999, 1, 'vigilancia-precios', NULL, 0, 'prod_g9a23wx7ja');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-precios' AND c.slug='planes';
UPDATE products SET image_key='productos/vigilancia-precios.png' WHERE slug='vigilancia-precios';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/vigilancia-precios.png', 0, 'pimg_xryhcnm247' FROM products WHERE slug='vigilancia-precios';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Aviso de cambios en webs que te interesan (mes)', 'Vigilamos boletines oficiales, licitaciones, convocatorias o webs de proveedores y te avisamos cuando cambian.

### Qué recibes
- Hasta 15 páginas vigiladas
- Solo te avisa si cambia la parte que te importa
- Resumen del cambio en el aviso

### Campos que rellenas
- Páginas a vigilar
- Qué parte vigilar (p. ej. «tabla de convocatorias»)
- Frecuencia
- Email o Telegram

### Ejemplo
> Gestoría: aviso cada vez que el ayuntamiento publica una nueva ayuda para autónomos.

**Plazo:** Mensual

### Base técnica (código abierto)
- [dgtlmoon/changedetection.io](https://github.com/dgtlmoon/changedetection.io) — Apache-2.0: libre para uso comercial · [demo](https://changedetection.io)
', 900, 'eur', 999, 1, 'aviso-cambios-web', NULL, 0, 'prod_z16s3ex485');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='aviso-cambios-web' AND c.slug='planes';
UPDATE products SET image_key='productos/aviso-cambios-web.png' WHERE slug='aviso-cambios-web';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/aviso-cambios-web.png', 0, 'pimg_c3hzm9qxhx' FROM products WHERE slug='aviso-cambios-web';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Etiquetas con código de barras listas para imprimir', 'Nos pasas tu lista de productos y recibes un PDF con las etiquetas (código de barras, nombre y precio) al tamaño de tu papel.

### Qué recibes
- PDF con hasta 100 etiquetas (ampliable)
- Códigos CODE128 o EAN-13
- Tamaño adaptado a tu hoja o impresora
- Plantilla para volver a generarlas tú

### Campos que rellenas
- Lista de referencias (Excel o CSV)
- Nombre y precio de cada producto
- Tamaño de etiqueta / hoja
- Unidades por referencia

### Ejemplo
> Artesana de jabones: 40 referencias con código, nombre y PVP en hojas A4 de 24 etiquetas.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [lindell/JsBarcode](https://github.com/lindell/JsBarcode) — MIT: libre para uso comercial · [demo](http://lindell.me/JsBarcode)
- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) — MIT: libre para uso comercial · [demo](https://pdf-lib.js.org)
', 1900, 'eur', 999, 1, 'etiquetas-codigo-barras', 'Modalidad', 0, 'prod_mtba3stybc');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='etiquetas-codigo-barras' AND c.slug='tiendas';
UPDATE products SET image_key='productos/etiquetas-codigo-barras.png' WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/etiquetas-codigo-barras.png', 0, 'pimg_2varx668mg' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'etiquetas-codigo-barras-diy', 0, 1, 'var_h1vn834xeh' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'etiquetas-codigo-barras-pro', 1, 1, 'var_2xb200jp1r' FROM products WHERE slug='etiquetas-codigo-barras';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Optimización de imágenes para tu web', 'Tus fotos pesadas, convertidas a WebP o AVIF con el tamaño justo: la web carga más rápido sin perder calidad visible.

### Qué recibes
- Hasta 100 imágenes optimizadas
- Formato WebP o AVIF + copia JPG
- Nombres de archivo amigables para SEO
- Informe de peso antes / después

### Campos que rellenas
- Imágenes (carpeta o zip)
- Formato deseado
- Ancho máximo
- Calidad (alta / equilibrada)

### Ejemplo
> Casa rural: 60 fotos de 5 MB sacadas con la cámara, convertidas a WebP de 1600 px listas para la galería.

**Plazo:** 24 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **14 €** | **39 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 24 h | 24 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [lovell/sharp](https://github.com/lovell/sharp) — Apache-2.0: libre para uso comercial · [demo](https://sharp.pixelplumbing.com)
', 1400, 'eur', 999, 1, 'optimizar-imagenes', 'Modalidad', 0, 'prod_0j86yqyp3g');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='optimizar-imagenes' AND c.slug='webs';
UPDATE products SET image_key='productos/optimizar-imagenes.png' WHERE slug='optimizar-imagenes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/optimizar-imagenes.png', 0, 'pimg_qdt89ny7tj' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1400, 999, 'optimizar-imagenes-diy', 0, 1, 'var_1xh5zjz564' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 3900, 999, 'optimizar-imagenes-pro', 1, 1, 'var_sp6wrvj8vs' FROM products WHERE slug='optimizar-imagenes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Tu logo en vectorial y en todos los tamaños', 'Tu logo limpio en SVG y en todos los formatos que te pedirán: web, redes, favicon, imprenta y fondo oscuro.

### Qué recibes
- SVG optimizado
- PNG en 6 tamaños
- Favicon e icono de app
- Versión en blanco para fondos oscuros

### Campos que rellenas
- Logo actual (el mejor archivo que tengas)
- Colores corporativos
- Dónde lo vas a usar

### Ejemplo
> Peluquería con el logo solo en una foto del cartel: recibe el SVG, el favicon y la versión blanca para Instagram.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **19 €** | **49 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [svg/svgo](https://github.com/svg/svgo) — MIT: libre para uso comercial · [demo](https://svgo.dev/)
', 1900, 'eur', 999, 1, 'logo-vectorial', 'Modalidad', 0, 'prod_zzm6757g3b');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='logo-vectorial' AND c.slug='identidad';
UPDATE products SET image_key='productos/logo-vectorial.png' WHERE slug='logo-vectorial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/logo-vectorial.png', 0, 'pimg_zmw8f7xfny' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'logo-vectorial-diy', 0, 1, 'var_7vsj6w093g' FROM products WHERE slug='logo-vectorial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'logo-vectorial-pro', 1, 1, 'var_vvas7v1c2d' FROM products WHERE slug='logo-vectorial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Limpieza de listados de clientes y productos', 'Ese Excel lleno de duplicados, mayúsculas mezcladas y teléfonos con formatos distintos, ordenado y listo para importar.

### Qué recibes
- Archivo limpio sin duplicados exactos
- Columnas unificadas (nombres, teléfonos, emails)
- Informe de lo que se ha corregido
- Formato listo para tu CRM o tienda

### Campos que rellenas
- Archivo (Excel o CSV)
- Columna que identifica cada registro
- Columnas que quieres conservar
- Programa al que lo vas a importar

### Ejemplo
> Autoescuela: 3 hojas de alumnos de distintos años unidas en una sola, sin repetidos, lista para el email de bienvenida.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [mholt/PapaParse](https://github.com/mholt/PapaParse) — MIT: libre para uso comercial · [demo](http://PapaParse.com)
', 2900, 'eur', 999, 1, 'limpieza-csv', 'Modalidad', 0, 'prod_8m9ccftf5g');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='limpieza-csv' AND c.slug='documentos';
UPDATE products SET image_key='productos/limpieza-csv.png' WHERE slug='limpieza-csv';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/limpieza-csv.png', 0, 'pimg_cq875br6wc' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'limpieza-csv-diy', 0, 1, 'var_n5hek56b0d' FROM products WHERE slug='limpieza-csv';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'limpieza-csv-pro', 1, 1, 'var_va2690j71q' FROM products WHERE slug='limpieza-csv';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Plantilla de inventario a medida en Excel', 'Un Excel con tus productos y categorías que avisa en rojo cuando algo baja del mínimo y calcula lo que vale tu stock.

### Qué recibes
- Excel con tus productos y categorías
- Alertas de stock mínimo
- Valoración del inventario
- Hoja de entradas y salidas

### Campos que rellenas
- Categorías
- Lista de productos
- Stock mínimo de cada uno
- Coste y precio de venta

### Ejemplo
> Bar de barrio: la hoja marca en rojo «tónica: quedan 6» antes de hacer el pedido del lunes.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [exceljs/exceljs](https://github.com/exceljs/exceljs) — MIT: libre para uso comercial
', 2900, 'eur', 999, 1, 'plantilla-inventario', 'Modalidad', 0, 'prod_ar8mr7x9zd');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plantilla-inventario' AND c.slug='documentos';
UPDATE products SET image_key='productos/plantilla-inventario.png' WHERE slug='plantilla-inventario';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plantilla-inventario.png', 0, 'pimg_t0m8jdvjz6' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'plantilla-inventario-diy', 0, 1, 'var_06x5fv1f85' FROM products WHERE slug='plantilla-inventario';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'plantilla-inventario-pro', 1, 1, 'var_8tpmqactk4' FROM products WHERE slug='plantilla-inventario';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Informe con gráficos a partir de tu Excel', 'Nos mandas tus datos de ventas, socios o visitas y recibes un PDF claro con gráficos listo para presentar.

### Qué recibes
- PDF con hasta 10 gráficos
- Resumen en una página
- Plantilla para repetirlo cada mes

### Campos que rellenas
- Archivo de datos
- Qué quieres medir
- Periodo
- Logo y colores

### Ejemplo
> Asociación de vecinos: informe anual de cuotas y actividades para la asamblea, con logo y 6 gráficos.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **79 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [chartjs/Chart.js](https://github.com/chartjs/Chart.js) — MIT: libre para uso comercial · [demo](https://www.chartjs.org/)
- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) — MIT: libre para uso comercial · [demo](https://pdf-lib.js.org)
', 2900, 'eur', 999, 1, 'informe-graficos', 'Modalidad', 0, 'prod_6h2cr8c6xk');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='informe-graficos' AND c.slug='documentos';
UPDATE products SET image_key='productos/informe-graficos.png' WHERE slug='informe-graficos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/informe-graficos.png', 0, 'pimg_qavd4v4gn5' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'informe-graficos-diy', 0, 1, 'var_dnqn9wks8v' FROM products WHERE slug='informe-graficos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'informe-graficos-pro', 1, 1, 'var_t9bzxhkdgr' FROM products WHERE slug='informe-graficos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Dossier comercial en PDF con tu marca', 'Un PDF de 4 páginas para mandar por email o WhatsApp: quién eres, qué ofreces, por qué tú y cómo contratarte.

### Qué recibes
- PDF de 4 páginas con tu marca
- Versión ligera para WhatsApp
- Archivo editable para actualizar precios

### Campos que rellenas
- Nombre comercial y logo
- Servicios y precios
- Por qué elegirte (3 razones)
- Datos de contacto

### Ejemplo
> Fotógrafo de bodas: dossier con 3 packs, fotos de muestra y botón de WhatsApp para pedir fecha.

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [Hopding/pdf-lib](https://github.com/Hopding/pdf-lib) — MIT: libre para uso comercial · [demo](https://pdf-lib.js.org)
', 3900, 'eur', 999, 1, 'dossier-comercial', 'Modalidad', 0, 'prod_80ykww1g7e');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='dossier-comercial' AND c.slug='documentos';
UPDATE products SET image_key='productos/dossier-comercial.png' WHERE slug='dossier-comercial';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/dossier-comercial.png', 0, 'pimg_f03rergd8y' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'dossier-comercial-diy', 0, 1, 'var_0gmeterhay' FROM products WHERE slug='dossier-comercial';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'dossier-comercial-pro', 1, 1, 'var_v7tp4zpgam' FROM products WHERE slug='dossier-comercial';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Diagramas de procesos y organigramas', 'Nos explicas cómo funciona tu proceso o tu equipo y te devolvemos diagramas claros en SVG, PNG y PDF.

### Qué recibes
- Hasta 5 diagramas
- Formatos SVG, PNG y PDF
- Archivo de texto para editarlos tú

### Campos que rellenas
- Pasos del proceso o personas del equipo
- Decisiones o responsables
- Orientación (horizontal / vertical)
- Colores

### Ejemplo
> Clínica dental: el circuito del paciente, de la llamada a la factura, en un diagrama colgado en recepción.

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) — MIT: libre para uso comercial · [demo](https://mermaid.ai/open-source/)
', 2900, 'eur', 999, 1, 'diagramas-procesos', 'Modalidad', 0, 'prod_8ma7hgrf2e');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='diagramas-procesos' AND c.slug='documentos';
UPDATE products SET image_key='productos/diagramas-procesos.png' WHERE slug='diagramas-procesos';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/diagramas-procesos.png', 0, 'pimg_nm6esxh3gw' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'diagramas-procesos-diy', 0, 1, 'var_rj4r3nr7sr' FROM products WHERE slug='diagramas-procesos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'diagramas-procesos-pro', 1, 1, 'var_k18tehg69c' FROM products WHERE slug='diagramas-procesos';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Descripciones de producto escritas con IA y revisadas', 'Títulos y descripciones de venta para tu tienda, con tus palabras clave, revisados por una persona antes de entregarlos.

### Qué recibes
- 20 títulos y descripciones (ampliable)
- Palabras clave para Google
- Archivo CSV listo para importar
- Guía de tono para las siguientes

### Campos que rellenas
- Catálogo (nombre y características)
- Público al que vendes
- Tono (cercano, técnico, premium)
- Palabras clave

### Ejemplo
> Tienda de té: «Rooibos vainilla 100 g · sin teína, para después de cenar» en lugar de «Té rojo 100g».

**Plazo:** 48 h

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **29 €** | **69 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 48 h | 48 h |
| Ajustes tras la entrega | Dudas por email | Incluidos |
', 2900, 'eur', 999, 1, 'descripciones-producto-ia', 'Modalidad', 0, 'prod_gw8mz2qrz5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='descripciones-producto-ia' AND c.slug='contenido';
UPDATE products SET image_key='productos/descripciones-producto-ia.png' WHERE slug='descripciones-producto-ia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/descripciones-producto-ia.png', 0, 'pimg_r0s3a56zf7' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'descripciones-producto-ia-diy', 0, 1, 'var_25wfg7swgm' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'descripciones-producto-ia-pro', 1, 1, 'var_y9zg1pj4mg' FROM products WHERE slug='descripciones-producto-ia';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Pack de carruseles para Instagram y LinkedIn', 'Diez carruseles con tu marca generados desde tus textos, en PNG listos para subir y con la plantilla para repetir.

### Qué recibes
- 10 carruseles de 5–8 diapositivas
- Plantilla con tus colores y tipografías
- Textos de publicación sugeridos
- Regeneración desde una hoja de cálculo

### Campos que rellenas
- Temas o textos
- Tono
- Colores y logo
- Red principal

### Ejemplo
> Nutricionista: «5 desayunos en 5 minutos», un carrusel por semana durante dos meses y medio.

**Plazo:** 3 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **39 €** | **99 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 3 días | 3 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer) — Apache-2.0: libre para uso comercial · [demo](https://pptr.dev)
', 3900, 'eur', 999, 1, 'carruseles-redes', 'Modalidad', 0, 'prod_4arcmg32a5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carruseles-redes' AND c.slug='contenido';
UPDATE products SET image_key='productos/carruseles-redes.png' WHERE slug='carruseles-redes';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/carruseles-redes.png', 0, 'pimg_h5ddqzz9fy' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'carruseles-redes-diy', 0, 1, 'var_zch4q4xz19' FROM products WHERE slug='carruseles-redes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'carruseles-redes-pro', 1, 1, 'var_2etmrbkpxk' FROM products WHERE slug='carruseles-redes';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web WordPress llave en mano', 'Si prefieres WordPress: instalada, con tema ligero, tus páginas, formulario, copias automáticas y seguridad básica.

### Qué recibes
- WordPress instalado en tu hosting
- 5 páginas con tus textos y fotos
- Formulario de contacto y aviso legal
- Copias de seguridad y actualizaciones automáticas
- Vídeo de 10 minutos para editarla tú

### Campos que rellenas
- Dominio y hosting (o te recomendamos uno)
- Textos de las 5 páginas
- Logo y fotos
- Colores

### Ejemplo
> Academia de música: inicio, profesores, horarios, precios y contacto; la dueña cambia los horarios ella misma.

### Demo en vivo
- [Empresa](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/corporate-company/)
- [Blog personal](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/portfolio/writer-blogger/)

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **249 €** | **549 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [WordPress/wordpress-develop](https://github.com/WordPress/wordpress-develop) — GPL-2.0: uso con condiciones (código abierto si se distribuye) · [demo](https://wordpress.org)
', 24900, 'eur', 999, 1, 'web-wordpress', 'Modalidad', 0, 'prod_w0115h73hn');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-wordpress' AND c.slug='webs';
UPDATE products SET image_key='productos/web-wordpress.png' WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-wordpress.png', 0, 'pimg_qtav9s2htj' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/corporate-company.png', 1, 'pimg_pwsfbtcsm0' FROM products WHERE slug='web-wordpress';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/writer-blogger.png', 2, 'pimg_s5rtgq2yfr' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-wordpress-diy', 0, 1, 'var_9knca9qke3' FROM products WHERE slug='web-wordpress';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 54900, 999, 'web-wordpress-pro', 1, 1, 'var_1n1f5ej62a' FROM products WHERE slug='web-wordpress';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Web que editas arrastrando bloques', 'Tu web en un editor visual de código abierto: cambias textos, fotos y secciones arrastrando, sin tocar código ni pagar cuota.

### Qué recibes
- Editor visual instalado y configurado
- Web inicial de 4 páginas con tus datos
- Bloques de tu sector listos para usar
- Formación de 30 minutos

### Campos que rellenas
- Sector
- Páginas que necesitas
- Logo, colores y fotos
- Dominio

### Ejemplo
> Tienda de muebles: monta ella misma la página de ofertas de enero arrastrando el bloque «producto destacado».

### Demo en vivo
- [Galería de 40 diseños Bootstrap](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)

**Plazo:** 5 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **199 €** | **449 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 5 días | 5 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [microweber/microweber](https://github.com/microweber/microweber) — MIT: libre para uso comercial · [demo](https://microweber.org)
- [frappe/builder](https://github.com/frappe/builder) — MIT: libre para uso comercial · [demo](https://frappe.io/builder)
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) — sin licencia clara: solo referencia de diseño · [demo](https://grapesjs.com)
', 19900, 'eur', 999, 1, 'web-arrastrar-soltar', 'Modalidad', 0, 'prod_fx449n6bcp');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-arrastrar-soltar' AND c.slug='portales';
UPDATE products SET image_key='productos/web-arrastrar-soltar.png' WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/web-arrastrar-soltar.png', 0, 'pimg_mt8qxmfxyc' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/plantillas-bootstrap.png', 1, 'pimg_5ay54fmfm0' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'web-arrastrar-soltar-diy', 0, 1, 'var_y4vwy4sr4v' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-arrastrar-soltar-pro', 1, 1, 'var_sdeqqmeqqt' FROM products WHERE slug='web-arrastrar-soltar';
INSERT INTO products (name, description, price_cents, currency, stock, active, slug, variant_label, requires_shipping, public_id) VALUES ('Plataforma para tu agencia: clientes, webs y CRM', 'Para agencias y freelancers: un panel donde cada cliente tiene su web, su portal y su ficha en el CRM, con cobros automáticos.

### Qué recibes
- Panel multi-cliente propio
- Portal privado para cada cliente
- CRM con fichas y tareas
- Cobros recurrentes con Stripe (con tus claves)

### Campos que rellenas
- Nombre de la agencia y logo
- Servicios que vendes
- Primeros clientes a dar de alta
- Dominio

### Ejemplo
> Diseñadora freelance con 12 clientes: cada uno entra a su portal, ve facturas y pide cambios sin escribir al WhatsApp personal.

### Demo en vivo
- [Agencia de marketing](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/business/digital-marketing-agency/)

**Plazo:** 10 días

### Lo montas tú o te lo montamos
| | Lo montas tú | Te lo montamos |
|---|---|---|
| Precio | **490 €** | **990 €** |
| Plantilla rellenada con tus datos | Sí | Sí |
| Guía paso a paso para publicarla | Sí | No hace falta |
| Publicado y funcionando | Lo publicas tú | Sí, te pasamos el enlace |
| Plazo | 10 días | 10 días |
| Ajustes tras la entrega | Dudas por email | Incluidos |

### Base técnica (código abierto)
- [SimplerDevelopment/SimplerDevelopment](https://github.com/SimplerDevelopment/SimplerDevelopment) — Apache-2.0: libre para uso comercial · [demo](https://simplerdevelopment-workfriends-ai.vercel.app)
- [directus-labs/agency-os](https://github.com/directus-labs/agency-os) — MIT: libre para uso comercial · [demo](https://agencyos.dev)
', 49000, 'eur', 999, 1, 'plataforma-agencia', 'Modalidad', 0, 'prod_jj32hg641p');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plataforma-agencia' AND c.slug='portales';
UPDATE products SET image_key='productos/plataforma-agencia.png' WHERE slug='plataforma-agencia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'productos/plataforma-agencia.png', 0, 'pimg_p3sqpm384j' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_images (product_id, image_key, position, public_id) SELECT id, 'demos/digital-marketing-agency.png', 1, 'pimg_jqak6ewgem' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 49000, 999, 'plataforma-agencia-diy', 0, 1, 'var_f3bj9e24hv' FROM products WHERE slug='plataforma-agencia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99000, 999, 'plataforma-agencia-pro', 1, 1, 'var_vhq0gn71ny' FROM products WHERE slug='plataforma-agencia';
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cómo funciona', 'como-funciona', '## Servicios digitales como barras de pan

Cada servicio es un producto cerrado: **precio fijo, plazo fijo y una lista de campos** que rellenas tú. Nada de reuniones eternas ni presupuestos a medida.

### 1. Eliges
Busca tu servicio por pestaña (webs, hostelería, reservas, bodas, bots, automatizaciones…). Cada ficha te dice qué recibes, un ejemplo real y el plazo.

### 2. Rellenas los campos
Tras el pago te llega un formulario con los datos que necesitamos: nombre, fotos, horarios, textos… Si no tienes algo, lo marcamos y seguimos.

### 3. Lo recibes funcionando
Publicamos el servicio con tus datos y te enviamos el enlace y una guía corta de uso.

## Dos modalidades

| | Lo montas tú | Te lo montamos |
|---|---|---|
| Qué recibes | Plantilla + guía paso a paso | Servicio publicado con tus datos |
| Para quién | Quien quiere ahorrar y se maneja | Quien quiere olvidarse |
| Soporte | Por email | Por email y WhatsApp |

## Sin humo
- Todo se basa en software probado y de código abierto: **es tuyo**, sin cuotas obligatorias.
- Si en 7 días no está como te prometimos, te devolvemos el dinero.
', 1, 'standard', 'page_0rwtar2wg1');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Preguntas frecuentes', 'preguntas-frecuentes', '## ¿De quién es la web o la automatización?
Tuya. Usamos software de código abierto y te entregamos los accesos.

## ¿Hay cuotas mensuales?
No son obligatorias. Muchos servicios funcionan gratis en Cloudflare. Si prefieres que lo mantengamos, tienes los **Planes mensuales**.

## ¿Y si no tengo textos o fotos?
Marca «no lo tengo» en el campo y te proponemos textos e imágenes libres de derechos.

## ¿Puedo pedir cambios?
Sí: cada servicio incluye una ronda de cambios. Después, con el plan de mantenimiento o por horas.

## ¿Cuánto tarda?
El plazo aparece en cada ficha y cuenta desde que recibimos los campos completos.

## ¿Emitís factura?
Sí, cada compra lleva su factura.
', 1, 'standard', 'page_c16sar7mec');
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
- **n8n**: automatizaciones de código abierto; se puede alojar sin cuota.
- **Make**: automatizaciones visuales con plan gratuito.
- **Systeme.io**: embudos de venta, cursos y emails en una sola herramienta, con plan gratuito.

### Diseño y contenido
- **Canva**: imágenes y cartas para redes.
- **Elementor**: maquetador visual si tu web es WordPress.
- **Unsplash / Pexels**: fotos libres de derechos.

### Hosting tradicional (si necesitas WordPress o correo con tu dominio)
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

### Herramientas libres que instalamos sin cuota
- **Uptime Kuma** (vigilancia de caídas), **listmonk** (newsletter), **Invoify** (facturas), **Starlight** (centros de ayuda), **Excalidraw** (pizarra).

_Si quieres que configuremos alguna, está incluido en «Te lo montamos»._
', 1, 'standard', 'page_7589qe7r4p');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Demos en vivo', 'demos', '## Mira lo que recibes antes de comprar

Estas demos son webs reales funcionando. Cambiamos textos, fotos y colores por los tuyos.

- **[Web de boda · estilo Blush](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-blush/)** · servicio: [Web de boda con confirmación de asistencia](/products/web-boda-rsvp)
- **[Web de boda · estilo Midnight Gold](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-midnight/)** · servicio: [Web de boda con confirmación de asistencia](/products/web-boda-rsvp)
- **[Web de boda · estilo Sage Garden](https://automatizasinhumo-demos.davidpd89.workers.dev/boda-sage/)** · servicio: [Invitación digital animada](/products/invitacion-digital)
- **[Tienda de descargas digitales](https://automatizasinhumo-demos.davidpd89.workers.dev/tienda-descargas/)** · servicio: [Tienda de productos digitales](/products/tienda-productos-digitales)
- **[Web inmobiliaria con buscador](https://automatizasinhumo-demos.davidpd89.workers.dev/inmobiliaria/)** · servicio: [Web para inmobiliaria](/products/web-inmobiliaria)
- **[Plantillas: restaurante, negocio, portfolio, RSVP…](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/)** · servicio: [Web de una página para tu negocio](/products/web-una-pagina)
- **[Carta QR con pedido por WhatsApp](https://automatizasinhumo-demos.davidpd89.workers.dev/carta-whatsapp/)** · servicio: [Carta QR con pedidos por WhatsApp](/products/carta-pedidos-whatsapp)
- **[Muro de testimonios](https://automatizasinhumo-demos.davidpd89.workers.dev/testimonios/)** · servicio: [Muro de opiniones de clientes](/products/muro-testimonios)
- **[100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)** · servicio: [Web corporativa de 5 secciones](/products/web-corporativa-5-secciones)
- **[Plantillas Bootstrap (Colorlib)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)** · servicio: [Web corporativa de 5 secciones](/products/web-corporativa-5-secciones)

Todas las bases son de código abierto con licencia MIT: el resultado es tuyo, sin cuotas obligatorias.

¿No ves tu caso? [Cuéntanos qué necesitas](/pages/contacto).
', 1, 'standard', 'page_bnzb270p6a');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Contacto', 'contacto', '## Cuéntanos qué necesitas

Responde en un mensaje a estas cinco preguntas y te decimos qué servicio encaja y su precio cerrado:

1. **Tu negocio**: nombre, sector y ciudad.
2. **Qué quieres conseguir**: más reservas, vender online, ahorrar tiempo, una web para tu evento…
3. **Qué tienes ya**: web, dominio, redes, herramientas.
4. **Para cuándo** lo necesitas.
5. **Presupuesto** aproximado.

### Dónde escribirnos
- Email: [hola@automatizasinhumo.com](mailto:hola@automatizasinhumo.com)
- Respondemos en menos de 24 horas laborables.

_Si ya sabes qué quieres, cómpralo directamente en el catálogo: tras el pago te llega el formulario con los campos._
', 1, 'standard', 'page_q6wr6yv8ds');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Aviso legal', 'aviso-legal', '## Aviso legal

En cumplimiento de la Ley 34/2002 (LSSI-CE):

- **Titular**: David Porto Díaz (persona física)
- **Web**: automatizasinhumo.com
- **Email**: hola@automatizasinhumo.com
- Los datos fiscales completos se facilitan en la factura de cada pedido.

### Objeto
Este sitio ofrece la venta de servicios digitales (webs, automatizaciones y herramientas) a precio cerrado.

### Propiedad intelectual
Los textos y el diseño de este sitio pertenecen al titular. Los servicios se basan en software de código abierto; cada entrega respeta e incluye la licencia original de cada componente.

### Responsabilidad
El titular no se hace responsable del uso que terceros hagan de los servicios entregados ni de los contenidos que el cliente aporte.
', 1, 'standard', 'page_3wth5xa9gj');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Condiciones de contratación', 'condiciones', '## Condiciones de contratación

### Precio y pago
El precio de cada ficha es el precio final, sin recargos. El pago se realiza al contratar y recibes factura del pedido.

### Entrega
El plazo de cada ficha cuenta desde que recibimos los campos completos del formulario. Entregamos por email el enlace, los accesos y una guía de uso.

### Cambios
Cada servicio incluye una ronda de cambios sobre lo entregado. Cambios posteriores, con plan de mantenimiento o por horas.

### Garantía y devoluciones
Si en 7 días desde la entrega el servicio no hace lo que describe su ficha, te devolvemos el importe. Al tratarse de contenido digital personalizado, una vez entregado y aceptado no aplica el derecho de desistimiento (art. 103 TRLGDCU).

### Planes mensuales
Se pueden cancelar en cualquier momento; el servicio sigue activo hasta el final del periodo pagado.
', 1, 'standard', 'page_rd1rh5azs8');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Privacidad', 'privacidad', '## Política de privacidad

- **Responsable**: David Porto Díaz, hola@automatizasinhumo.com
- **Finalidad**: gestionar pedidos, entregar los servicios y responder consultas.
- **Base legal**: ejecución del contrato y consentimiento.
- **Conservación**: el tiempo necesario y los plazos legales de facturación.
- **Destinatarios**: proveedores necesarios para prestar el servicio (alojamiento en Cloudflare, pasarela de pago, email). No vendemos datos.
- **Derechos**: acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@automatizasinhumo.com. Puedes reclamar ante la AEPD (aepd.es).
', 1, 'standard', 'page_bv2570nd6r');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cookies', 'cookies', '## Política de cookies

Este sitio solo usa **cookies técnicas** imprescindibles (carrito y sesión de tu cuenta). No usamos cookies de publicidad ni de seguimiento de terceros, por eso no te mostramos un banner de consentimiento.

Si en el futuro añadimos analítica, será sin cookies o con tu consentimiento previo.
', 1, 'standard', 'page_gqexjgfe2k');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'catalog', NULL, 'Servicios', 0, 'nav_0zs726raz3');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='webs'), 'Webs', 1, 'nav_mkc4q127n2');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='automatizaciones'), 'Automatizaciones', 2, 'nav_2840addsd6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='como-funciona'), 'Cómo funciona', 3, 'nav_2rpws62j8n');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='demos'), 'Demos', 4, 'nav_9nm1cp9mp1');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'home', NULL, 'Inicio', 0, 'nav_azwzf5y5da');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='hosteleria'), 'Restaurantes y bares', 1, 'nav_pp3gt5b6zm');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='reservas'), 'Reservas y citas', 2, 'nav_zy74ag6f7q');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bodas'), 'Bodas y eventos', 3, 'nav_s1cr9s08az');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='identidad'), 'Tarjetas, link-in-bio y CV', 4, 'nav_m5kws739y5');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='captacion'), 'Formularios y captación', 5, 'nav_0rjyyp1gzb');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='bots'), 'Bots e IA', 6, 'nav_tbevdhxag1');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='enlaces'), 'Enlaces, QR y analítica', 7, 'nav_v787924v0s');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='tiendas'), 'Tiendas y productos digitales', 8, 'nav_vpvqbp3q7h');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='portales'), 'Portales y webs editables', 9, 'nav_84q1g2409p');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='documentos'), 'Documentos, PDF e IA', 10, 'nav_tw73m660j2');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='contenido'), 'Contenido y redes', 11, 'nav_yxwre63fw9');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='planes'), 'Planes mensuales', 12, 'nav_v8k47rjdje');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='preguntas-frecuentes'), 'Preguntas frecuentes', 13, 'nav_a49dpybn2k');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='herramientas-recomendadas'), 'Herramientas recomendadas', 14, 'nav_y7hgb5jm2p');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='contacto'), 'Contacto', 15, 'nav_neatjqqgcj');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='aviso-legal'), 'Aviso legal', 16, 'nav_q07wznvy8t');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='condiciones'), 'Condiciones de contratación', 17, 'nav_6mednc46vf');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='privacidad'), 'Privacidad', 18, 'nav_80ddb457q6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='cookies'), 'Cookies', 19, 'nav_6bfw7q2cvz');
INSERT INTO settings (key, value) VALUES ('store_name', 'Automatiza sin humo') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement', 'Webs y automatizaciones a precio cerrado · Eliges, rellenas campos y lo recibes funcionando') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement_href', '/pages/como-funciona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
