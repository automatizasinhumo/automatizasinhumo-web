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
INSERT INTO categories (name, slug, public_id) VALUES ('Webs para tu negocio', 'webs', 'cat_0f74cbhatz');
INSERT INTO categories (name, slug, public_id) VALUES ('Restaurantes y bares', 'hosteleria', 'cat_1gcqh8f0ec');
INSERT INTO categories (name, slug, public_id) VALUES ('Reservas y citas', 'reservas', 'cat_jany52jf92');
INSERT INTO categories (name, slug, public_id) VALUES ('Bodas y eventos', 'bodas', 'cat_9wp1w9hcf3');
INSERT INTO categories (name, slug, public_id) VALUES ('Tarjetas, link-in-bio y CV', 'identidad', 'cat_mgbx3hb1sk');
INSERT INTO categories (name, slug, public_id) VALUES ('Formularios y captación', 'captacion', 'cat_rbmxc9rx2t');
INSERT INTO categories (name, slug, public_id) VALUES ('Bots e IA', 'bots', 'cat_hbjs11b86n');
INSERT INTO categories (name, slug, public_id) VALUES ('Automatizaciones', 'automatizaciones', 'cat_9axcxzmk58');
INSERT INTO categories (name, slug, public_id) VALUES ('Enlaces, QR y analítica', 'enlaces', 'cat_arv0q2b6cp');
INSERT INTO categories (name, slug, public_id) VALUES ('Tiendas y productos digitales', 'tiendas', 'cat_kmt1782vy6');
INSERT INTO categories (name, slug, public_id) VALUES ('Portales y webs editables', 'portales', 'cat_8zx7ppkzgs');
INSERT INTO categories (name, slug, public_id) VALUES ('Planes mensuales', 'planes', 'cat_rbyr7nmbaf');
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (349 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [ColorlibHQ/bootstrap-templates](https://github.com/ColorlibHQ/bootstrap-templates) — MIT: libre para uso comercial · [demo](https://uicookies.com/)
- [mmrahmanbappi/100-free-html-templates](https://github.com/mmrahmanbappi/100-free-html-templates) — MIT: libre para uso comercial · [demo](https://mmrahmanbappi.github.io/100-free-html-templates/)
- [micah-masuka/free-website-templates](https://github.com/micah-masuka/free-website-templates) — MIT: libre para uso comercial · [demo](https://micah-masuka.github.io/free-website-templates/)
', 14900, 'eur', 999, 1, 'web-una-pagina', 'Modalidad', 0, 'prod_4z73bjrhr9');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-una-pagina' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'web-una-pagina-diy', 0, 1, 'var_0e5rdsrwda' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'web-una-pagina-pro', 1, 1, 'var_h4w9b8j89v' FROM products WHERE slug='web-una-pagina';
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

**Plazo:** 5 días

### Modalidades
- **Lo montas tú** (449 €): plantilla + guía paso a paso.
- **Te lo montamos** (899 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [dawidolko/Website-Templates](https://github.com/dawidolko/Website-Templates) — MIT: libre para uso comercial · [demo](https://templateswebsite.dawidolko.pl)
- [uiuxlabz/uiuxlabz](https://github.com/uiuxlabz/uiuxlabz) — sin licencia clara: solo referencia de diseño · [demo](https://uiuxlabz.github.io/uiuxlabz/)
- [ultimatewebtemplates/free-website-templates](https://github.com/ultimatewebtemplates/free-website-templates) — sin licencia clara: solo referencia de diseño · [demo](https://ultimatewebtemplates.com)
', 44900, 'eur', 999, 1, 'web-corporativa-5-secciones', 'Modalidad', 0, 'prod_01a4pbb5a2');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-corporativa-5-secciones' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 44900, 999, 'web-corporativa-5-secciones-diy', 0, 1, 'var_gs4y3cwe53' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 89900, 999, 'web-corporativa-5-secciones-pro', 1, 1, 'var_9c9ttqyxnw' FROM products WHERE slug='web-corporativa-5-secciones';
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

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [arjoonarora/real-estate-website-template](https://github.com/arjoonarora/real-estate-website-template) — MIT: libre para uso comercial
', 29900, 'eur', 999, 1, 'web-inmobiliaria', 'Modalidad', 0, 'prod_ty74p8h1h2');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-inmobiliaria' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'web-inmobiliaria-diy', 0, 1, 'var_59qebmvp54' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'web-inmobiliaria-pro', 1, 1, 'var_2jez40vszp' FROM products WHERE slug='web-inmobiliaria';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (179 €): plantilla + guía paso a paso.
- **Te lo montamos** (349 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [satendragoswamii/portfolio-website-with-admin-panel](https://github.com/satendragoswamii/portfolio-website-with-admin-panel) — MIT: libre para uso comercial · [demo](https://satendragoswami.satendragoshwami.workers.dev)
- [ShadmanArafin/open_portfolio](https://github.com/ShadmanArafin/open_portfolio) — MIT: libre para uso comercial · [demo](https://getopenportfolio.vercel.app)
', 17900, 'eur', 999, 1, 'portfolio-editable', 'Modalidad', 0, 'prod_vm7se75jer');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portfolio-editable' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 17900, 999, 'portfolio-editable-diy', 0, 1, 'var_vvbnnx8wdd' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'portfolio-editable-pro', 1, 1, 'var_qtx9x0t6xx' FROM products WHERE slug='portfolio-editable';
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

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (249 €): plantilla + guía paso a paso.
- **Te lo montamos** (499 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [lonestone/astro-template](https://github.com/lonestone/astro-template) — MIT: libre para uso comercial
', 24900, 'eur', 999, 1, 'web-blog-astro', 'Modalidad', 0, 'prod_5apye1t8bv');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-blog-astro' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-blog-astro-diy', 0, 1, 'var_m4bsthk7q7' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'web-blog-astro-pro', 1, 1, 'var_ffx3gnrtkr' FROM products WHERE slug='web-blog-astro';
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

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (249 €): plantilla + guía paso a paso.
- **Te lo montamos** (449 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [MohamadTaher/mechanic-shop](https://github.com/MohamadTaher/mechanic-shop) — sin licencia clara: solo referencia de diseño
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) — MIT: libre para uso comercial · [demo](https://punctual.sh)
', 24900, 'eur', 999, 1, 'web-taller', 'Modalidad', 0, 'prod_29xjbe098x');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-taller' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-taller-diy', 0, 1, 'var_qq7q6a44mw' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-taller-pro', 1, 1, 'var_5fxk5r6e14' FROM products WHERE slug='web-taller';
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

**Plazo:** 24 h

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [dumbuk12/qr-menu-guide](https://github.com/dumbuk12/qr-menu-guide) — MIT: libre para uso comercial
- [investblog/qr-generator](https://github.com/investblog/qr-generator) — MIT: libre para uso comercial
- [kirollosfayezh/tabla-qr-menu-saas](https://github.com/kirollosfayezh/tabla-qr-menu-saas) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'carta-qr', 'Modalidad', 0, 'prod_ren70j706m');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-qr' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'carta-qr-diy', 0, 1, 'var_7zaqpzn833' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'carta-qr-pro', 1, 1, 'var_b9wbtckp3c' FROM products WHERE slug='carta-qr';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Shahabuddin-mahar/whatsapp-restaurant-qr-menu](https://github.com/Shahabuddin-mahar/whatsapp-restaurant-qr-menu) — MIT: libre para uso comercial · [demo](https://shahabuddin-mahar.github.io/whatsapp-restaurant-qr-menu/)
', 9900, 'eur', 999, 1, 'carta-pedidos-whatsapp', 'Modalidad', 0, 'prod_f6x6k2vy4m');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-pedidos-whatsapp' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'carta-pedidos-whatsapp-diy', 0, 1, 'var_1zzs9mxg0a' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'carta-pedidos-whatsapp-pro', 1, 1, 'var_swdqkj8wkc' FROM products WHERE slug='carta-pedidos-whatsapp';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (299 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [RamtinBabaei/quickdine-platform](https://github.com/RamtinBabaei/quickdine-platform) — MIT: libre para uso comercial
', 14900, 'eur', 999, 1, 'reservas-restaurante', 'Modalidad', 0, 'prod_n0jzce5ghr');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-restaurante' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'reservas-restaurante-diy', 0, 1, 'var_acdjc8q4m4' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'reservas-restaurante-pro', 1, 1, 'var_smxphysrgg' FROM products WHERE slug='reservas-restaurante';
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

**Plazo:** 7 días

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [thisyourei/fastfood-ai-assistant](https://github.com/thisyourei/fastfood-ai-assistant) — sin licencia clara: solo referencia de diseño
- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) — MIT: libre para uso comercial · [demo](https://chatgpt-telegram-workers.tbxark.workers.dev)
', 29900, 'eur', 999, 1, 'asistente-ia-pedidos', 'Modalidad', 0, 'prod_yr8jmy27vh');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='asistente-ia-pedidos' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'asistente-ia-pedidos-diy', 0, 1, 'var_dgt297zffv' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'asistente-ia-pedidos-pro', 1, 1, 'var_0vy01h0f6c' FROM products WHERE slug='asistente-ia-pedidos';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (79 €): plantilla + guía paso a paso.
- **Te lo montamos** (179 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) — MIT: libre para uso comercial · [demo](https://punctual.sh)
', 7900, 'eur', 999, 1, 'pagina-citas', 'Modalidad', 0, 'prod_qjb8vyyphn');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pagina-citas' AND c.slug='reservas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'pagina-citas-diy', 0, 1, 'var_c5bq55r79m' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'pagina-citas-pro', 1, 1, 'var_sedvh50my6' FROM products WHERE slug='pagina-citas';
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

**Plazo:** 5 días

### Modalidades
- **Lo montas tú** (199 €): plantilla + guía paso a paso.
- **Te lo montamos** (399 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Salora-Software/Salora](https://github.com/Salora-Software/Salora) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://docs.salora.app/docs)
- [nabinbabuuranw/palo](https://github.com/nabinbabuuranw/palo) — MIT: libre para uso comercial · [demo](https://palo.sites.tab.bot/)
', 19900, 'eur', 999, 1, 'reservas-salon', 'Modalidad', 0, 'prod_fhpeeh3bnq');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-salon' AND c.slug='reservas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'reservas-salon-diy', 0, 1, 'var_hbz1peknww' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'reservas-salon-pro', 1, 1, 'var_60792g5t4e' FROM products WHERE slug='reservas-salon';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (249 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Holojerm/nuxt-wedding-template](https://github.com/Holojerm/nuxt-wedding-template) — MIT: libre para uso comercial · [demo](https://nuxt-wedding-template.jeremy-ettlinger.workers.dev)
- [kbichave/wedding-invite](https://github.com/kbichave/wedding-invite) — ISC: libre para uso comercial
- [zachspiel/wedding-rsvp](https://github.com/zachspiel/wedding-rsvp) — MIT: libre para uso comercial · [demo](https://zachandsedona.com)
- [sotomaque/wedding-website](https://github.com/sotomaque/wedding-website) — sin licencia clara: solo referencia de diseño · [demo](https://theceremony.app)
', 9900, 'eur', 999, 1, 'web-boda-rsvp', 'Modalidad', 0, 'prod_2vmnfpsjf4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-boda-rsvp' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'web-boda-rsvp-diy', 0, 1, 'var_0p1nf100fe' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-boda-rsvp-pro', 1, 1, 'var_vwpnm63d2e' FROM products WHERE slug='web-boda-rsvp';
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

**Plazo:** 24 h

### Modalidades
- **Lo montas tú** (39 €): plantilla + guía paso a paso.
- **Te lo montamos** (89 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Poison675/free-wedding-website-templates](https://github.com/Poison675/free-wedding-website-templates) — sin licencia clara: solo referencia de diseño
- [clentebanks/wedding-invitation](https://github.com/clentebanks/wedding-invitation) — sin licencia clara: solo referencia de diseño
', 3900, 'eur', 999, 1, 'invitacion-digital', 'Modalidad', 0, 'prod_9vq9w67fx1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='invitacion-digital' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'invitacion-digital-diy', 0, 1, 'var_t547jhe7m2' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'invitacion-digital-pro', 1, 1, 'var_7zw0fphc16' FROM products WHERE slug='invitacion-digital';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (69 €): plantilla + guía paso a paso.
- **Te lo montamos** (149 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [t0ma5/tinygallery](https://github.com/t0ma5/tinygallery) — MIT: libre para uso comercial · [demo](https://tinygallery.pages.dev)
- [BartekBis/wedding-website](https://github.com/BartekBis/wedding-website) — sin licencia clara: solo referencia de diseño
', 6900, 'eur', 999, 1, 'galeria-privada-evento', 'Modalidad', 0, 'prod_gge4v3n8h1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='galeria-privada-evento' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 6900, 999, 'galeria-privada-evento-diy', 0, 1, 'var_kq48x5y8mm' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'galeria-privada-evento-pro', 1, 1, 'var_tm0xkpqb7w' FROM products WHERE slug='galeria-privada-evento';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (79 €): plantilla + guía paso a paso.
- **Te lo montamos** (179 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [inonalfa/wedding-rsvp-seating](https://github.com/inonalfa/wedding-rsvp-seating) — MIT: libre para uso comercial
- [JacobStephens2/wedding-platform](https://github.com/JacobStephens2/wedding-platform) — MIT: libre para uso comercial · [demo](https://wedding.stephens.page)
', 7900, 'eur', 999, 1, 'gestion-invitados-mesas', 'Modalidad', 0, 'prod_vazwans9q4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='gestion-invitados-mesas' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'gestion-invitados-mesas-diy', 0, 1, 'var_wb31h9yp0v' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'gestion-invitados-mesas-pro', 1, 1, 'var_8b59c9n8ag' FROM products WHERE slug='gestion-invitados-mesas';
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

### Modalidades
- **Lo montas tú** (29 €): plantilla + guía paso a paso.
- **Te lo montamos** (69 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Kahaan83/digital-cards](https://github.com/Kahaan83/digital-cards) — MIT: libre para uso comercial · [demo](https://digital-cards-lemon.vercel.app)
', 2900, 'eur', 999, 1, 'tarjeta-digital', 'Modalidad', 0, 'prod_3ztmtdjay0');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tarjeta-digital' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'tarjeta-digital-diy', 0, 1, 'var_g982th6p74' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'tarjeta-digital-pro', 1, 1, 'var_yd2azys2v0' FROM products WHERE slug='tarjeta-digital';
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

**Plazo:** 24 h

### Modalidades
- **Lo montas tú** (39 €): plantilla + guía paso a paso.
- **Te lo montamos** (99 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [MrDemonWolf/linkden](https://github.com/MrDemonWolf/linkden) — MIT: libre para uso comercial · [demo](https://mrdemonwolf.github.io/linkden/)
- [Mrbarnx/Open-Link-Hub](https://github.com/Mrbarnx/Open-Link-Hub) — MIT: libre para uso comercial
- [dimasmong/MoBio](https://github.com/dimasmong/MoBio) — MIT: libre para uso comercial · [demo](https://github.com/dimasmong/MoBio)
', 3900, 'eur', 999, 1, 'link-in-bio', 'Modalidad', 0, 'prod_ewp8ncjrdr');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='link-in-bio' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'link-in-bio-diy', 0, 1, 'var_jaa84tnqpr' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'link-in-bio-pro', 1, 1, 'var_b15pcdb4r5' FROM products WHERE slug='link-in-bio';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (29 €): plantilla + guía paso a paso.
- **Te lo montamos** (79 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [gianfrancodemarco/resume-builder](https://github.com/gianfrancodemarco/resume-builder) — MIT: libre para uso comercial · [demo](https://resume-builder.gianfrancodemarco.dev/)
- [samuelbelo/cvfree](https://github.com/samuelbelo/cvfree) — MIT: libre para uso comercial
- [akhil-dara/CVAurum](https://github.com/akhil-dara/CVAurum) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://cvaurum.com)
', 2900, 'eur', 999, 1, 'cv-profesional', 'Modalidad', 0, 'prod_j9npy4nn4c');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='cv-profesional' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'cv-profesional-diy', 0, 1, 'var_vr6w1jkpp7' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'cv-profesional-pro', 1, 1, 'var_tb8g9qds3a' FROM products WHERE slug='cv-profesional';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (119 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [jhodges3401-code/kudoshelf-lite](https://github.com/jhodges3401-code/kudoshelf-lite) — MIT: libre para uso comercial · [demo](https://jhodges3401-code.github.io/kudoshelf-demo/)
- [AnandSundar/Kindwords](https://github.com/AnandSundar/Kindwords) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'muro-testimonios', 'Modalidad', 0, 'prod_bd7a7ssfjz');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='muro-testimonios' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'muro-testimonios-diy', 0, 1, 'var_e33xq8b4s0' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 11900, 999, 'muro-testimonios-pro', 1, 1, 'var_1dfn30q11h' FROM products WHERE slug='muro-testimonios';
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

### Modalidades
- **Lo montas tú** (39 €): plantilla + guía paso a paso.
- **Te lo montamos** (89 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [investblog/contact-relay](https://github.com/investblog/contact-relay) — MIT: libre para uso comercial · [demo](https://301.st)
- [BohdanPetryshyn/formzero](https://github.com/BohdanPetryshyn/formzero) — MIT: libre para uso comercial
', 3900, 'eur', 999, 1, 'formulario-aviso-telegram', 'Modalidad', 0, 'prod_d9tacf8ajd');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='formulario-aviso-telegram' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'formulario-aviso-telegram-diy', 0, 1, 'var_2rehtf88tj' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'formulario-aviso-telegram-pro', 1, 1, 'var_mfs51wjjj0' FROM products WHERE slug='formulario-aviso-telegram';
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (79 €): plantilla + guía paso a paso.
- **Te lo montamos** (179 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [d4mr/0list](https://github.com/d4mr/0list) — MIT: libre para uso comercial · [demo](https://0list.d4mr.com)
- [Metareignity/waitlist-cloudflare](https://github.com/Metareignity/waitlist-cloudflare) — MIT: libre para uso comercial · [demo](https://waitlist.metareignity.com)
', 7900, 'eur', 999, 1, 'lista-espera', 'Modalidad', 0, 'prod_da6vzy9j1t');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='lista-espera' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'lista-espera-diy', 0, 1, 'var_eqhnyk3ap6' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'lista-espera-pro', 1, 1, 'var_dve1r62te2' FROM products WHERE slug='lista-espera';
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

### Modalidades
- **Lo montas tú** (59 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [bts-io/hookforms-cloud](https://github.com/bts-io/hookforms-cloud) — MIT: libre para uso comercial · [demo](https://oss.hookforms.com)
', 5900, 'eur', 999, 1, 'avisos-multicanal', 'Modalidad', 0, 'prod_krwvgyqqtf');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='avisos-multicanal' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 5900, 999, 'avisos-multicanal-diy', 0, 1, 'var_rbaehy8cj8' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'avisos-multicanal-pro', 1, 1, 'var_tmhv6csczy' FROM products WHERE slug='avisos-multicanal';
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

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (249 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [tbxark/ChatGPT-Telegram-Workers](https://github.com/tbxark/ChatGPT-Telegram-Workers) — MIT: libre para uso comercial · [demo](https://chatgpt-telegram-workers.tbxark.workers.dev)
', 9900, 'eur', 999, 1, 'bot-telegram-chatgpt', 'Modalidad', 0, 'prod_j8pvf5v1t1');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-chatgpt' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'bot-telegram-chatgpt-diy', 0, 1, 'var_8z9je93k4j' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'bot-telegram-chatgpt-pro', 1, 1, 'var_08xsh7by8e' FROM products WHERE slug='bot-telegram-chatgpt';
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

### Modalidades
- **Lo montas tú** (249 €): plantilla + guía paso a paso.
- **Te lo montamos** (499 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [aiogram/aiogram](https://github.com/aiogram/aiogram) — MIT: libre para uso comercial · [demo](https://aiogram.dev)
', 24900, 'eur', 999, 1, 'bot-telegram-medida', 'Modalidad', 0, 'prod_gxqtjnwd3a');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-medida' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'bot-telegram-medida-diy', 0, 1, 'var_bhsgh3cm6b' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'bot-telegram-medida-pro', 1, 1, 'var_b3b8sjabvj' FROM products WHERE slug='bot-telegram-medida';
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

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (699 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [thareekanvar/replyloom](https://github.com/thareekanvar/replyloom) — MIT: libre para uso comercial
', 29900, 'eur', 999, 1, 'crm-whatsapp', 'Modalidad', 0, 'prod_6qavsy54ra');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='crm-whatsapp' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'crm-whatsapp-diy', 0, 1, 'var_prjrb98ac1' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 69900, 999, 'crm-whatsapp-pro', 1, 1, 'var_xk5hardp4n' FROM products WHERE slug='crm-whatsapp';
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

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (299 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [yusizer/n8n-lead-automation](https://github.com/yusizer/n8n-lead-automation) — sin licencia clara: solo referencia de diseño · [demo](https://portfolio-site-jade-beta.vercel.app/projects/n8n-lead-automation.html)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
', 14900, 'eur', 999, 1, 'auto-captacion-leads', 'Modalidad', 0, 'prod_p4w7s05vj5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-captacion-leads' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-captacion-leads-diy', 0, 1, 'var_per0keyfa8' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-captacion-leads-pro', 1, 1, 'var_6qppzgam0y' FROM products WHERE slug='auto-captacion-leads';
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

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (299 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) — sin licencia clara: solo referencia de diseño
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
', 14900, 'eur', 999, 1, 'auto-facturas', 'Modalidad', 0, 'prod_zptd719p9b');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-facturas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-facturas-diy', 0, 1, 'var_terwmya7kv' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-facturas-pro', 1, 1, 'var_dqb0n4vc82' FROM products WHERE slug='auto-facturas';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) — sin licencia clara: solo referencia de diseño
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
', 9900, 'eur', 999, 1, 'auto-resenas', 'Modalidad', 0, 'prod_d4scb6ac4m');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-resenas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-resenas-diy', 0, 1, 'var_tzeaskd21z' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-resenas-pro', 1, 1, 'var_yghnewpxdt' FROM products WHERE slug='auto-resenas';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
- [activepieces/activepieces](https://github.com/activepieces/activepieces) — sin licencia clara: solo referencia de diseño · [demo](https://www.activepieces.com)
- [automatisch/automatisch](https://github.com/automatisch/automatisch) — sin licencia clara: solo referencia de diseño · [demo](https://automatisch.io)
', 9900, 'eur', 999, 1, 'auto-plantilla-medida', 'Modalidad', 0, 'prod_kfrbqvkqq3');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-plantilla-medida' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-plantilla-medida-diy', 0, 1, 'var_w1y459awkw' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-plantilla-medida-pro', 1, 1, 'var_fvgqd4j23m' FROM products WHERE slug='auto-plantilla-medida';
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

### Modalidades
- **Lo montas tú** (199 €): plantilla + guía paso a paso.
- **Te lo montamos** (399 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [cloudflare/workflows-starter](https://github.com/cloudflare/workflows-starter) — Apache-2.0: libre para uso comercial · [demo](https://developers.cloudflare.com/workflows/)
', 19900, 'eur', 999, 1, 'auto-tareas-programadas', 'Modalidad', 0, 'prod_ppmh47t556');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-tareas-programadas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'auto-tareas-programadas-diy', 0, 1, 'var_81j2vzg5q5' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'auto-tareas-programadas-pro', 1, 1, 'var_hz7qd49gh0' FROM products WHERE slug='auto-tareas-programadas';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [miantiao-me/Sink](https://github.com/miantiao-me/Sink) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://Sink.Cool)
- [botnick/shortlink](https://github.com/botnick/shortlink) — sin licencia clara: solo referencia de diseño
', 4900, 'eur', 999, 1, 'acortador-enlaces', 'Modalidad', 0, 'prod_snnnwx6d9d');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='acortador-enlaces' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'acortador-enlaces-diy', 0, 1, 'var_6n08tbwysn' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'acortador-enlaces-pro', 1, 1, 'var_swhbkd10tx' FROM products WHERE slug='acortador-enlaces';
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

### Modalidades
- **Lo montas tú** (19 €): plantilla + guía paso a paso.
- **Te lo montamos** (49 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [investblog/qr-generator](https://github.com/investblog/qr-generator) — MIT: libre para uso comercial
', 1900, 'eur', 999, 1, 'qr-campanas', 'Modalidad', 0, 'prod_wmbx41wp06');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='qr-campanas' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'qr-campanas-diy', 0, 1, 'var_q6damq41vv' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'qr-campanas-pro', 1, 1, 'var_2ftzw4bzdm' FROM products WHERE slug='qr-campanas';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (99 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [umami-software/umami](https://github.com/umami-software/umami) — MIT: libre para uso comercial · [demo](https://umami.is)
', 4900, 'eur', 999, 1, 'analitica-sin-cookies', 'Modalidad', 0, 'prod_dvddkexb60');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='analitica-sin-cookies' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'analitica-sin-cookies-diy', 0, 1, 'var_jr9zc9dhe7' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'analitica-sin-cookies-pro', 1, 1, 'var_qxx40905yh' FROM products WHERE slug='analitica-sin-cookies';
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

**Plazo:** 5 días

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [ddyy/minshop](https://github.com/ddyy/minshop) — sin licencia clara: solo referencia de diseño
- [Vojislav77/digital-downloads-website](https://github.com/Vojislav77/digital-downloads-website) — MIT: libre para uso comercial · [demo](https://vojislav77.github.io/digital-downloads-website/)
- [fengyiqicoder/astro-ai-shop](https://github.com/fengyiqicoder/astro-ai-shop) — MIT: libre para uso comercial · [demo](https://fengyiqicoder.github.io/astro-ai-shop/)
- [Paymug/paymug](https://github.com/Paymug/paymug) — sin licencia clara: solo referencia de diseño · [demo](https://paymug.co)
', 29900, 'eur', 999, 1, 'tienda-productos-digitales', 'Modalidad', 0, 'prod_nvfzndwvhw');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-productos-digitales' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'tienda-productos-digitales-diy', 0, 1, 'var_15hepg2ws5' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'tienda-productos-digitales-pro', 1, 1, 'var_a8mkk1aqdj' FROM products WHERE slug='tienda-productos-digitales';
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

**Plazo:** 7 días

### Modalidades
- **Lo montas tú** (499 €): plantilla + guía paso a paso.
- **Te lo montamos** (999 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [ddyy/minshop](https://github.com/ddyy/minshop) — sin licencia clara: solo referencia de diseño
- [russellkmoore/mercora](https://github.com/russellkmoore/mercora) — MIT: libre para uso comercial · [demo](https://voltique.russellkmoore.me)
', 49900, 'eur', 999, 1, 'tienda-online', 'Modalidad', 0, 'prod_3z1cg1wmf4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-online' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 49900, 999, 'tienda-online-diy', 0, 1, 'var_m0s08x57sh' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99900, 999, 'tienda-online-pro', 1, 1, 'var_kk6k99z2e3' FROM products WHERE slug='tienda-online';
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

### Modalidades
- **Lo montas tú** (699 €): plantilla + guía paso a paso.
- **Te lo montamos** (1299 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Kylelau339/digital-sales-platform](https://github.com/Kylelau339/digital-sales-platform) — MIT: libre para uso comercial
- [w4seemdev/Templix](https://github.com/w4seemdev/Templix) — sin licencia clara: solo referencia de diseño · [demo](https://templix-peach.vercel.app)
- [playlikeboy/scriptly.store](https://github.com/playlikeboy/scriptly.store) — sin licencia clara: solo referencia de diseño · [demo](https://scriptly.store)
- [vignesh-gupta/digibee-marketplace](https://github.com/vignesh-gupta/digibee-marketplace) — MIT: libre para uso comercial · [demo](https://digibee.vigneshgupta.tech/)
', 69900, 'eur', 999, 1, 'marketplace-plantillas', 'Modalidad', 0, 'prod_mqt672t9nz');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='marketplace-plantillas' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 69900, 999, 'marketplace-plantillas-diy', 0, 1, 'var_6wyw5vb6va' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 129900, 999, 'marketplace-plantillas-pro', 1, 1, 'var_2p3dk54z2k' FROM products WHERE slug='marketplace-plantillas';
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

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [directus-labs/agency-os](https://github.com/directus-labs/agency-os) — MIT: libre para uso comercial · [demo](https://agencyos.dev)
- [Vibra-Labs/Atrium](https://github.com/Vibra-Labs/Atrium) — sin licencia clara: solo referencia de diseño · [demo](https://atrium.vibralabs.co)
- [onlineprfoundation/pr-agency-platform](https://github.com/onlineprfoundation/pr-agency-platform) — sin licencia clara: solo referencia de diseño · [demo](https://online.pr/opensource/pr-agency-platform)
', 29900, 'eur', 999, 1, 'portal-cliente', 'Modalidad', 0, 'prod_t8zs46zwf6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portal-cliente' AND c.slug='portales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'portal-cliente-diy', 0, 1, 'var_76x6gexyvq' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'portal-cliente-pro', 1, 1, 'var_zykn8mcqw1' FROM products WHERE slug='portal-cliente';
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

**Plazo:** 7 días

### Modalidades
- **Lo montas tú** (399 €): plantilla + guía paso a paso.
- **Te lo montamos** (799 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) — sin licencia clara: solo referencia de diseño · [demo](https://grapesjs.com)
- [puckeditor/puck](https://github.com/puckeditor/puck) — MIT: libre para uso comercial · [demo](https://puckeditor.com)
- [givanz/VvvebJs](https://github.com/givanz/VvvebJs) — Apache-2.0: libre para uso comercial · [demo](https://www.vvveb.com/vvvebjs/editor.html)
- [webstudio-is/webstudio](https://github.com/webstudio-is/webstudio) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://webstudio.is)
', 39900, 'eur', 999, 1, 'web-editable-visual', 'Modalidad', 0, 'prod_513k7ey3v9');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-editable-visual' AND c.slug='portales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 39900, 999, 'web-editable-visual-diy', 0, 1, 'var_6xspf3vtf2' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 79900, 999, 'web-editable-visual-pro', 1, 1, 'var_325sz4gwgr' FROM products WHERE slug='web-editable-visual';
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
', 1900, 'eur', 999, 1, 'plan-mantenimiento-web', NULL, 0, 'prod_vhrww9zz7a');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-mantenimiento-web' AND c.slug='planes';
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
', 900, 'eur', 999, 1, 'plan-hosting-dominio', NULL, 0, 'prod_hd6bmcm9sx');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-hosting-dominio' AND c.slug='planes';
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
', 3900, 'eur', 999, 1, 'plan-automatizaciones', NULL, 0, 'prod_d63fcz7khr');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='plan-automatizaciones' AND c.slug='planes';
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
', 4900, 'eur', 999, 1, 'auditoria-web', NULL, 0, 'prod_gtseta9hj6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auditoria-web' AND c.slug='planes';
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
', 1, 'standard', 'page_b4xbd06712');
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
Sí, factura con IVA en cada compra.
', 1, 'standard', 'page_p5bn4aejss');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Herramientas recomendadas', 'herramientas-recomendadas', '## Herramientas que usamos y recomendamos

Esta página se completa con los programas de afiliación seleccionados (hosting, dominios, email marketing, IA…).

_Pendiente de rellenar con el listado revisado._
', 1, 'standard', 'page_f1a00s4fct');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Aviso legal y privacidad', 'aviso-legal', '## Aviso legal

_Pendiente: datos del titular (nombre, NIF, domicilio, email de contacto), condiciones de contratación, política de devoluciones y de privacidad._
', 1, 'standard', 'page_q1tdexptbb');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'catalog', NULL, 'Todos los servicios', 0, 'nav_fx76b7cw79');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='webs'), 'Webs para tu negocio', 1, 'nav_0q3gpm2836');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='hosteleria'), 'Restaurantes y bares', 2, 'nav_07d8kgpxp5');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='reservas'), 'Reservas y citas', 3, 'nav_621c9dqqe8');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='bodas'), 'Bodas y eventos', 4, 'nav_tk1tf6pvma');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='identidad'), 'Tarjetas, link-in-bio y CV', 5, 'nav_jy6ej4ge45');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='captacion'), 'Formularios y captación', 6, 'nav_79v8962yy1');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='bots'), 'Bots e IA', 7, 'nav_h04j72rzs4');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='automatizaciones'), 'Automatizaciones', 8, 'nav_jddkxx1cqy');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='planes'), 'Planes mensuales', 9, 'nav_w35cgpadqr');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='como-funciona'), 'Cómo funciona', 10, 'nav_prrvdvjwn7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'home', NULL, 'Inicio', 0, 'nav_02d9py6045');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='enlaces'), 'Enlaces, QR y analítica', 1, 'nav_fqq76f9w9v');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='tiendas'), 'Tiendas y productos digitales', 2, 'nav_0xkk5fbwm5');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='portales'), 'Portales y webs editables', 3, 'nav_39fyna32ta');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='preguntas-frecuentes'), 'Preguntas frecuentes', 4, 'nav_v07kqqmnyt');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='herramientas-recomendadas'), 'Herramientas recomendadas', 5, 'nav_rmjrne13z6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='aviso-legal'), 'Aviso legal y privacidad', 6, 'nav_ztq9syencm');
INSERT INTO settings (key, value) VALUES ('store_name', 'Automatiza sin humo') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement', 'Webs y automatizaciones a precio cerrado · Eliges, rellenas campos y lo recibes funcionando') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement_href', '/pages/como-funciona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
