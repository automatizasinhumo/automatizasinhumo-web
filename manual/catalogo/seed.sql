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
INSERT INTO categories (name, slug, public_id) VALUES ('Webs para tu negocio', 'webs', 'cat_7y6g7dvhvt');
INSERT INTO categories (name, slug, public_id) VALUES ('Restaurantes y bares', 'hosteleria', 'cat_0n55tcwzbh');
INSERT INTO categories (name, slug, public_id) VALUES ('Reservas y citas', 'reservas', 'cat_b5ytf9n5m6');
INSERT INTO categories (name, slug, public_id) VALUES ('Bodas y eventos', 'bodas', 'cat_zqyswrber8');
INSERT INTO categories (name, slug, public_id) VALUES ('Tarjetas, link-in-bio y CV', 'identidad', 'cat_99v8806wh7');
INSERT INTO categories (name, slug, public_id) VALUES ('Formularios y captación', 'captacion', 'cat_hsyknd5k8d');
INSERT INTO categories (name, slug, public_id) VALUES ('Bots e IA', 'bots', 'cat_344wtm99y4');
INSERT INTO categories (name, slug, public_id) VALUES ('Automatizaciones', 'automatizaciones', 'cat_9wjehgx4x5');
INSERT INTO categories (name, slug, public_id) VALUES ('Enlaces, QR y analítica', 'enlaces', 'cat_ecq16p38hs');
INSERT INTO categories (name, slug, public_id) VALUES ('Tiendas y productos digitales', 'tiendas', 'cat_4a7g7t62rn');
INSERT INTO categories (name, slug, public_id) VALUES ('Portales y webs editables', 'portales', 'cat_j43eax7ktx');
INSERT INTO categories (name, slug, public_id) VALUES ('Documentos, PDF e IA', 'documentos', 'cat_w6n9za7m3y');
INSERT INTO categories (name, slug, public_id) VALUES ('Planes mensuales', 'planes', 'cat_2yykezztqj');
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

**Plazo:** 48 h

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (349 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [ColorlibHQ/bootstrap-templates](https://github.com/ColorlibHQ/bootstrap-templates) — MIT: libre para uso comercial · [demo](https://uicookies.com/)
- [mmrahmanbappi/100-free-html-templates](https://github.com/mmrahmanbappi/100-free-html-templates) — MIT: libre para uso comercial · [demo](https://mmrahmanbappi.github.io/100-free-html-templates/)
- [micah-masuka/free-website-templates](https://github.com/micah-masuka/free-website-templates) — MIT: libre para uso comercial · [demo](https://micah-masuka.github.io/free-website-templates/)
', 14900, 'eur', 999, 1, 'web-una-pagina', 'Modalidad', 0, 'prod_83sqfj73m6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-una-pagina' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'web-una-pagina-diy', 0, 1, 'var_2935019p3r' FROM products WHERE slug='web-una-pagina';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'web-una-pagina-pro', 1, 1, 'var_9vp6ke6c81' FROM products WHERE slug='web-una-pagina';
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

**Plazo:** 5 días

### Modalidades
- **Lo montas tú** (449 €): plantilla + guía paso a paso.
- **Te lo montamos** (899 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [dawidolko/Website-Templates](https://github.com/dawidolko/Website-Templates) — MIT: libre para uso comercial · [demo](https://templateswebsite.dawidolko.pl)
- [uiuxlabz/uiuxlabz](https://github.com/uiuxlabz/uiuxlabz) — sin licencia clara: solo referencia de diseño · [demo](https://uiuxlabz.github.io/uiuxlabz/)
- [ultimatewebtemplates/free-website-templates](https://github.com/ultimatewebtemplates/free-website-templates) — sin licencia clara: solo referencia de diseño · [demo](https://ultimatewebtemplates.com)
', 44900, 'eur', 999, 1, 'web-corporativa-5-secciones', 'Modalidad', 0, 'prod_xc7nph34j9');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-corporativa-5-secciones' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 44900, 999, 'web-corporativa-5-secciones-diy', 0, 1, 'var_j77w752jw9' FROM products WHERE slug='web-corporativa-5-secciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 89900, 999, 'web-corporativa-5-secciones-pro', 1, 1, 'var_d7a8c7x04v' FROM products WHERE slug='web-corporativa-5-secciones';
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

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [arjoonarora/real-estate-website-template](https://github.com/arjoonarora/real-estate-website-template) — MIT: libre para uso comercial
', 29900, 'eur', 999, 1, 'web-inmobiliaria', 'Modalidad', 0, 'prod_ezqpx7n2sy');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-inmobiliaria' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'web-inmobiliaria-diy', 0, 1, 'var_kda6q7kx1d' FROM products WHERE slug='web-inmobiliaria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'web-inmobiliaria-pro', 1, 1, 'var_r2ce3ycsrc' FROM products WHERE slug='web-inmobiliaria';
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
- [Plantillas · portfolio](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/portfolio-template/)

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (179 €): plantilla + guía paso a paso.
- **Te lo montamos** (349 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [satendragoswamii/portfolio-website-with-admin-panel](https://github.com/satendragoswamii/portfolio-website-with-admin-panel) — MIT: libre para uso comercial · [demo](https://satendragoswami.satendragoshwami.workers.dev)
- [ShadmanArafin/open_portfolio](https://github.com/ShadmanArafin/open_portfolio) — MIT: libre para uso comercial · [demo](https://getopenportfolio.vercel.app)
', 17900, 'eur', 999, 1, 'portfolio-editable', 'Modalidad', 0, 'prod_wzx1drhca8');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portfolio-editable' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 17900, 999, 'portfolio-editable-diy', 0, 1, 'var_6q9k5mc8hm' FROM products WHERE slug='portfolio-editable';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'portfolio-editable-pro', 1, 1, 'var_rcnj50scc1' FROM products WHERE slug='portfolio-editable';
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
', 24900, 'eur', 999, 1, 'web-blog-astro', 'Modalidad', 0, 'prod_ew1apkztq0');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-blog-astro' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-blog-astro-diy', 0, 1, 'var_4h6w5jceyv' FROM products WHERE slug='web-blog-astro';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'web-blog-astro-pro', 1, 1, 'var_bb7p9r6c83' FROM products WHERE slug='web-blog-astro';
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
- [100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (249 €): plantilla + guía paso a paso.
- **Te lo montamos** (449 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [MohamadTaher/mechanic-shop](https://github.com/MohamadTaher/mechanic-shop) — sin licencia clara: solo referencia de diseño
- [CCCrafts/punctual](https://github.com/CCCrafts/punctual) — MIT: libre para uso comercial · [demo](https://punctual.sh)
', 24900, 'eur', 999, 1, 'web-taller', 'Modalidad', 0, 'prod_p2ds7q10y6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-taller' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'web-taller-diy', 0, 1, 'var_5f0s3qw05d' FROM products WHERE slug='web-taller';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'web-taller-pro', 1, 1, 'var_ww9mdwq7dz' FROM products WHERE slug='web-taller';
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
- [Plantillas · restaurant](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/restaurant-template/)

**Plazo:** 24 h

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [dumbuk12/qr-menu-guide](https://github.com/dumbuk12/qr-menu-guide) — MIT: libre para uso comercial
- [investblog/qr-generator](https://github.com/investblog/qr-generator) — MIT: libre para uso comercial
- [kirollosfayezh/tabla-qr-menu-saas](https://github.com/kirollosfayezh/tabla-qr-menu-saas) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'carta-qr', 'Modalidad', 0, 'prod_j6fqeahawq');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-qr' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'carta-qr-diy', 0, 1, 'var_sh4d9tqqxk' FROM products WHERE slug='carta-qr';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'carta-qr-pro', 1, 1, 'var_e1900k0099' FROM products WHERE slug='carta-qr';
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

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Shahabuddin-mahar/whatsapp-restaurant-qr-menu](https://github.com/Shahabuddin-mahar/whatsapp-restaurant-qr-menu) — MIT: libre para uso comercial · [demo](https://shahabuddin-mahar.github.io/whatsapp-restaurant-qr-menu/)
', 9900, 'eur', 999, 1, 'carta-pedidos-whatsapp', 'Modalidad', 0, 'prod_wa24ffggrv');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='carta-pedidos-whatsapp' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'carta-pedidos-whatsapp-diy', 0, 1, 'var_rkpp4fn6z2' FROM products WHERE slug='carta-pedidos-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'carta-pedidos-whatsapp-pro', 1, 1, 'var_s0ydm5k0ew' FROM products WHERE slug='carta-pedidos-whatsapp';
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
', 14900, 'eur', 999, 1, 'reservas-restaurante', 'Modalidad', 0, 'prod_m2jx4fqp07');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-restaurante' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'reservas-restaurante-diy', 0, 1, 'var_nx7ejb6yxz' FROM products WHERE slug='reservas-restaurante';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'reservas-restaurante-pro', 1, 1, 'var_hwxs6se44k' FROM products WHERE slug='reservas-restaurante';
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
', 29900, 'eur', 999, 1, 'asistente-ia-pedidos', 'Modalidad', 0, 'prod_7wb5hx5h90');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='asistente-ia-pedidos' AND c.slug='hosteleria';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'asistente-ia-pedidos-diy', 0, 1, 'var_k1pmc7ktk3' FROM products WHERE slug='asistente-ia-pedidos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'asistente-ia-pedidos-pro', 1, 1, 'var_fd9dvsc8mp' FROM products WHERE slug='asistente-ia-pedidos';
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
', 7900, 'eur', 999, 1, 'pagina-citas', 'Modalidad', 0, 'prod_pdc51ptssg');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pagina-citas' AND c.slug='reservas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'pagina-citas-diy', 0, 1, 'var_ks9gzjwfqe' FROM products WHERE slug='pagina-citas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'pagina-citas-pro', 1, 1, 'var_akpr18bnrc' FROM products WHERE slug='pagina-citas';
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
', 19900, 'eur', 999, 1, 'reservas-salon', 'Modalidad', 0, 'prod_6gn5cztc3j');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='reservas-salon' AND c.slug='reservas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'reservas-salon-diy', 0, 1, 'var_yn8ee1b5f1' FROM products WHERE slug='reservas-salon';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'reservas-salon-pro', 1, 1, 'var_fxanq3yp7x' FROM products WHERE slug='reservas-salon';
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

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (249 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Holojerm/nuxt-wedding-template](https://github.com/Holojerm/nuxt-wedding-template) — MIT: libre para uso comercial · [demo](https://nuxt-wedding-template.jeremy-ettlinger.workers.dev)
- [kbichave/wedding-invite](https://github.com/kbichave/wedding-invite) — ISC: libre para uso comercial
- [zachspiel/wedding-rsvp](https://github.com/zachspiel/wedding-rsvp) — MIT: libre para uso comercial · [demo](https://zachandsedona.com)
- [sotomaque/wedding-website](https://github.com/sotomaque/wedding-website) — sin licencia clara: solo referencia de diseño · [demo](https://theceremony.app)
', 9900, 'eur', 999, 1, 'web-boda-rsvp', 'Modalidad', 0, 'prod_ee3m4kp6zt');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-boda-rsvp' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'web-boda-rsvp-diy', 0, 1, 'var_q9p8wytw4v' FROM products WHERE slug='web-boda-rsvp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-boda-rsvp-pro', 1, 1, 'var_enpr9swsd2' FROM products WHERE slug='web-boda-rsvp';
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

**Plazo:** 24 h

### Modalidades
- **Lo montas tú** (39 €): plantilla + guía paso a paso.
- **Te lo montamos** (89 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [Poison675/free-wedding-website-templates](https://github.com/Poison675/free-wedding-website-templates) — sin licencia clara: solo referencia de diseño
- [clentebanks/wedding-invitation](https://github.com/clentebanks/wedding-invitation) — sin licencia clara: solo referencia de diseño
', 3900, 'eur', 999, 1, 'invitacion-digital', 'Modalidad', 0, 'prod_pa0ytvygt5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='invitacion-digital' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'invitacion-digital-diy', 0, 1, 'var_0vr107996e' FROM products WHERE slug='invitacion-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'invitacion-digital-pro', 1, 1, 'var_rafqh242ca' FROM products WHERE slug='invitacion-digital';
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
', 6900, 'eur', 999, 1, 'galeria-privada-evento', 'Modalidad', 0, 'prod_vzyvyqyz09');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='galeria-privada-evento' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 6900, 999, 'galeria-privada-evento-diy', 0, 1, 'var_bk4q4ae685' FROM products WHERE slug='galeria-privada-evento';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'galeria-privada-evento-pro', 1, 1, 'var_4e7xd41vrr' FROM products WHERE slug='galeria-privada-evento';
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
- [Plantillas · rsvp only](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-eventos/rsvp-only/)

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (79 €): plantilla + guía paso a paso.
- **Te lo montamos** (179 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [inonalfa/wedding-rsvp-seating](https://github.com/inonalfa/wedding-rsvp-seating) — MIT: libre para uso comercial
- [JacobStephens2/wedding-platform](https://github.com/JacobStephens2/wedding-platform) — MIT: libre para uso comercial · [demo](https://wedding.stephens.page)
', 7900, 'eur', 999, 1, 'gestion-invitados-mesas', 'Modalidad', 0, 'prod_fwvygskg1q');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='gestion-invitados-mesas' AND c.slug='bodas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'gestion-invitados-mesas-diy', 0, 1, 'var_q1x0hcvhwb' FROM products WHERE slug='gestion-invitados-mesas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'gestion-invitados-mesas-pro', 1, 1, 'var_s9twqf5drd' FROM products WHERE slug='gestion-invitados-mesas';
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
', 2900, 'eur', 999, 1, 'tarjeta-digital', 'Modalidad', 0, 'prod_zyt20ddfnz');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tarjeta-digital' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'tarjeta-digital-diy', 0, 1, 'var_vr2mvy0jap' FROM products WHERE slug='tarjeta-digital';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 6900, 999, 'tarjeta-digital-pro', 1, 1, 'var_9tvzqej9a3' FROM products WHERE slug='tarjeta-digital';
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
', 3900, 'eur', 999, 1, 'link-in-bio', 'Modalidad', 0, 'prod_rdz1sz6wv6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='link-in-bio' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'link-in-bio-diy', 0, 1, 'var_q1kd3xbadw' FROM products WHERE slug='link-in-bio';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'link-in-bio-pro', 1, 1, 'var_51mczew1f6' FROM products WHERE slug='link-in-bio';
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
', 2900, 'eur', 999, 1, 'cv-profesional', 'Modalidad', 0, 'prod_hnc6d85ev6');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='cv-profesional' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'cv-profesional-diy', 0, 1, 'var_hd56qhjnz7' FROM products WHERE slug='cv-profesional';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'cv-profesional-pro', 1, 1, 'var_7xkjnb1b23' FROM products WHERE slug='cv-profesional';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (119 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [jhodges3401-code/kudoshelf-lite](https://github.com/jhodges3401-code/kudoshelf-lite) — MIT: libre para uso comercial · [demo](https://jhodges3401-code.github.io/kudoshelf-demo/)
- [AnandSundar/Kindwords](https://github.com/AnandSundar/Kindwords) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'muro-testimonios', 'Modalidad', 0, 'prod_8fswxfcrh4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='muro-testimonios' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'muro-testimonios-diy', 0, 1, 'var_mb8pfq362h' FROM products WHERE slug='muro-testimonios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 11900, 999, 'muro-testimonios-pro', 1, 1, 'var_kbxvh5yp36' FROM products WHERE slug='muro-testimonios';
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
', 3900, 'eur', 999, 1, 'formulario-aviso-telegram', 'Modalidad', 0, 'prod_xzb1ftjy0v');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='formulario-aviso-telegram' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'formulario-aviso-telegram-diy', 0, 1, 'var_ehg6t9xyyd' FROM products WHERE slug='formulario-aviso-telegram';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 8900, 999, 'formulario-aviso-telegram-pro', 1, 1, 'var_jh0pjw3w71' FROM products WHERE slug='formulario-aviso-telegram';
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
', 7900, 'eur', 999, 1, 'lista-espera', 'Modalidad', 0, 'prod_jnv41pk5tt');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='lista-espera' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'lista-espera-diy', 0, 1, 'var_sn3k7b1z9e' FROM products WHERE slug='lista-espera';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'lista-espera-pro', 1, 1, 'var_py55cchtbt' FROM products WHERE slug='lista-espera';
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
', 5900, 'eur', 999, 1, 'avisos-multicanal', 'Modalidad', 0, 'prod_qc47yjez38');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='avisos-multicanal' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 5900, 999, 'avisos-multicanal-diy', 0, 1, 'var_bnzgrbpdsp' FROM products WHERE slug='avisos-multicanal';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'avisos-multicanal-pro', 1, 1, 'var_f01t7wt9h7' FROM products WHERE slug='avisos-multicanal';
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
', 9900, 'eur', 999, 1, 'bot-telegram-chatgpt', 'Modalidad', 0, 'prod_bp3tcw2xmd');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-chatgpt' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'bot-telegram-chatgpt-diy', 0, 1, 'var_3z0xpty4ms' FROM products WHERE slug='bot-telegram-chatgpt';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'bot-telegram-chatgpt-pro', 1, 1, 'var_cps20yrygv' FROM products WHERE slug='bot-telegram-chatgpt';
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
', 24900, 'eur', 999, 1, 'bot-telegram-medida', 'Modalidad', 0, 'prod_e38w777cxx');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='bot-telegram-medida' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 24900, 999, 'bot-telegram-medida-diy', 0, 1, 'var_qxwxr0e3nh' FROM products WHERE slug='bot-telegram-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 49900, 999, 'bot-telegram-medida-pro', 1, 1, 'var_pekq8a0he5' FROM products WHERE slug='bot-telegram-medida';
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
', 29900, 'eur', 999, 1, 'crm-whatsapp', 'Modalidad', 0, 'prod_xhsd5aw0ff');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='crm-whatsapp' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'crm-whatsapp-diy', 0, 1, 'var_gevt9311a3' FROM products WHERE slug='crm-whatsapp';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 69900, 999, 'crm-whatsapp-pro', 1, 1, 'var_arx71tccaq' FROM products WHERE slug='crm-whatsapp';
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
', 14900, 'eur', 999, 1, 'auto-captacion-leads', 'Modalidad', 0, 'prod_rpx625hfdv');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-captacion-leads' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-captacion-leads-diy', 0, 1, 'var_xshsyntc2j' FROM products WHERE slug='auto-captacion-leads';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-captacion-leads-pro', 1, 1, 'var_gejvsjwb1s' FROM products WHERE slug='auto-captacion-leads';
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
', 14900, 'eur', 999, 1, 'auto-facturas', 'Modalidad', 0, 'prod_km2mzxycs8');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-facturas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'auto-facturas-diy', 0, 1, 'var_974nt34mez' FROM products WHERE slug='auto-facturas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'auto-facturas-pro', 1, 1, 'var_ytvfy1h5zj' FROM products WHERE slug='auto-facturas';
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

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [vixonoffice/n8n-automation-templates](https://github.com/vixonoffice/n8n-automation-templates) — sin licencia clara: solo referencia de diseño
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
', 9900, 'eur', 999, 1, 'auto-resenas', 'Modalidad', 0, 'prod_mrq14fca5e');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-resenas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-resenas-diy', 0, 1, 'var_7qnm00p32c' FROM products WHERE slug='auto-resenas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-resenas-pro', 1, 1, 'var_1rwk71s4ea' FROM products WHERE slug='auto-resenas';
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
- [100 plantillas por sector](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-negocio/)

**Plazo:** 3 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (199 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.partnerlinks.io/h1pwwf5m4toe)
- [n8n-io/n8n](https://github.com/n8n-io/n8n) — sin licencia clara: solo referencia de diseño · [demo](https://n8n.io)
- [activepieces/activepieces](https://github.com/activepieces/activepieces) — sin licencia clara: solo referencia de diseño · [demo](https://www.activepieces.com)
- [automatisch/automatisch](https://github.com/automatisch/automatisch) — sin licencia clara: solo referencia de diseño · [demo](https://automatisch.io)
', 9900, 'eur', 999, 1, 'auto-plantilla-medida', 'Modalidad', 0, 'prod_2c08219gs2');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-plantilla-medida' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'auto-plantilla-medida-diy', 0, 1, 'var_badrbbzbwh' FROM products WHERE slug='auto-plantilla-medida';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 19900, 999, 'auto-plantilla-medida-pro', 1, 1, 'var_d1wacnhgv8' FROM products WHERE slug='auto-plantilla-medida';
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
', 19900, 'eur', 999, 1, 'auto-tareas-programadas', 'Modalidad', 0, 'prod_b2wz5rjt2z');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auto-tareas-programadas' AND c.slug='automatizaciones';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'auto-tareas-programadas-diy', 0, 1, 'var_bxyxwq28zg' FROM products WHERE slug='auto-tareas-programadas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 39900, 999, 'auto-tareas-programadas-pro', 1, 1, 'var_hqbfatwwge' FROM products WHERE slug='auto-tareas-programadas';
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
', 4900, 'eur', 999, 1, 'acortador-enlaces', 'Modalidad', 0, 'prod_yqb0787zve');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='acortador-enlaces' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'acortador-enlaces-diy', 0, 1, 'var_64er788shg' FROM products WHERE slug='acortador-enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'acortador-enlaces-pro', 1, 1, 'var_6b34s2q2d9' FROM products WHERE slug='acortador-enlaces';
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
', 1900, 'eur', 999, 1, 'qr-campanas', 'Modalidad', 0, 'prod_cvwfew69sx');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='qr-campanas' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'qr-campanas-diy', 0, 1, 'var_k7bf7hdqq3' FROM products WHERE slug='qr-campanas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'qr-campanas-pro', 1, 1, 'var_natmy10wwt' FROM products WHERE slug='qr-campanas';
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
', 4900, 'eur', 999, 1, 'analitica-sin-cookies', 'Modalidad', 0, 'prod_0t022cb88e');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='analitica-sin-cookies' AND c.slug='enlaces';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'analitica-sin-cookies-diy', 0, 1, 'var_b021ts7ghm' FROM products WHERE slug='analitica-sin-cookies';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'analitica-sin-cookies-pro', 1, 1, 'var_b79vryy1vg' FROM products WHERE slug='analitica-sin-cookies';
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

**Plazo:** 5 días

### Modalidades
- **Lo montas tú** (299 €): plantilla + guía paso a paso.
- **Te lo montamos** (599 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [ddyy/minshop](https://github.com/ddyy/minshop) — sin licencia clara: solo referencia de diseño
- [Vojislav77/digital-downloads-website](https://github.com/Vojislav77/digital-downloads-website) — MIT: libre para uso comercial · [demo](https://vojislav77.github.io/digital-downloads-website/)
- [fengyiqicoder/astro-ai-shop](https://github.com/fengyiqicoder/astro-ai-shop) — MIT: libre para uso comercial · [demo](https://fengyiqicoder.github.io/astro-ai-shop/)
- [Paymug/paymug](https://github.com/Paymug/paymug) — sin licencia clara: solo referencia de diseño · [demo](https://paymug.co)
', 29900, 'eur', 999, 1, 'tienda-productos-digitales', 'Modalidad', 0, 'prod_3brw9j1hjh');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-productos-digitales' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'tienda-productos-digitales-diy', 0, 1, 'var_zqq1f66cjn' FROM products WHERE slug='tienda-productos-digitales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'tienda-productos-digitales-pro', 1, 1, 'var_ev35m50p7b' FROM products WHERE slug='tienda-productos-digitales';
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
', 49900, 'eur', 999, 1, 'tienda-online', 'Modalidad', 0, 'prod_9cz558dwjc');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='tienda-online' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 49900, 999, 'tienda-online-diy', 0, 1, 'var_79shb5y03n' FROM products WHERE slug='tienda-online';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 99900, 999, 'tienda-online-pro', 1, 1, 'var_jhe8av6dy8' FROM products WHERE slug='tienda-online';
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
', 69900, 'eur', 999, 1, 'marketplace-plantillas', 'Modalidad', 0, 'prod_gja84hdd7b');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='marketplace-plantillas' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 69900, 999, 'marketplace-plantillas-diy', 0, 1, 'var_5ay7q0td82' FROM products WHERE slug='marketplace-plantillas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 129900, 999, 'marketplace-plantillas-pro', 1, 1, 'var_m3effj1efz' FROM products WHERE slug='marketplace-plantillas';
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
', 29900, 'eur', 999, 1, 'portal-cliente', 'Modalidad', 0, 'prod_72kq4yre8k');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='portal-cliente' AND c.slug='portales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 29900, 999, 'portal-cliente-diy', 0, 1, 'var_asvg6r8j77' FROM products WHERE slug='portal-cliente';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 59900, 999, 'portal-cliente-pro', 1, 1, 'var_35faa4tv2f' FROM products WHERE slug='portal-cliente';
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
- [Plantillas Bootstrap (Colorlib)](https://automatizasinhumo-demos.davidpd89.workers.dev/plantillas-bootstrap/)

**Plazo:** 7 días

### Modalidades
- **Lo montas tú** (399 €): plantilla + guía paso a paso.
- **Te lo montamos** (799 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) — sin licencia clara: solo referencia de diseño · [demo](https://grapesjs.com)
- [puckeditor/puck](https://github.com/puckeditor/puck) — MIT: libre para uso comercial · [demo](https://puckeditor.com)
- [givanz/VvvebJs](https://github.com/givanz/VvvebJs) — Apache-2.0: libre para uso comercial · [demo](https://www.vvveb.com/vvvebjs/editor.html)
- [webstudio-is/webstudio](https://github.com/webstudio-is/webstudio) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://webstudio.is)
', 39900, 'eur', 999, 1, 'web-editable-visual', 'Modalidad', 0, 'prod_rtzv9dzh7s');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-editable-visual' AND c.slug='portales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 39900, 999, 'web-editable-visual-diy', 0, 1, 'var_s2w80nkf3k' FROM products WHERE slug='web-editable-visual';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 79900, 999, 'web-editable-visual-pro', 1, 1, 'var_7gaqmyct89' FROM products WHERE slug='web-editable-visual';
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
', 1900, 'eur', 999, 1, 'plan-mantenimiento-web', NULL, 0, 'prod_1k33bgddpc');
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
', 900, 'eur', 999, 1, 'plan-hosting-dominio', NULL, 0, 'prod_n3jkzthj15');
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
', 3900, 'eur', 999, 1, 'plan-automatizaciones', NULL, 0, 'prod_5yhc536hxa');
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
', 4900, 'eur', 999, 1, 'auditoria-web', NULL, 0, 'prod_81s7gxh49s');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='auditoria-web' AND c.slug='planes';
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

### Modalidades
- **Lo montas tú** (39 €): plantilla + guía paso a paso.
- **Te lo montamos** (99 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) — MIT: libre para uso comercial · [demo](https://uptime.kuma.pet)
', 3900, 'eur', 999, 1, 'vigilancia-caidas', 'Modalidad', 0, 'prod_y94kfhk4ft');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='vigilancia-caidas' AND c.slug='planes';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 3900, 999, 'vigilancia-caidas-diy', 0, 1, 'var_k16j5822ys' FROM products WHERE slug='vigilancia-caidas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 9900, 999, 'vigilancia-caidas-pro', 1, 1, 'var_dgjdzs8vje' FROM products WHERE slug='vigilancia-caidas';
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

### Modalidades
- **Lo montas tú** (79 €): plantilla + guía paso a paso.
- **Te lo montamos** (179 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [al1abb/invoify](https://github.com/al1abb/invoify) — MIT: libre para uso comercial · [demo](https://invoify.vercel.app)
', 7900, 'eur', 999, 1, 'facturas-presupuestos', 'Modalidad', 0, 'prod_h7baq87cry');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='facturas-presupuestos' AND c.slug='documentos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 7900, 999, 'facturas-presupuestos-diy', 0, 1, 'var_9wm9zh46eq' FROM products WHERE slug='facturas-presupuestos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 17900, 999, 'facturas-presupuestos-pro', 1, 1, 'var_z4afv1gzrh' FROM products WHERE slug='facturas-presupuestos';
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

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (229 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [pdfme/pdfme](https://github.com/pdfme/pdfme) — MIT: libre para uso comercial · [demo](http://pdfme.com/)
', 9900, 'eur', 999, 1, 'certificados-automaticos', 'Modalidad', 0, 'prod_xgpj80q2q9');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='certificados-automaticos' AND c.slug='documentos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'certificados-automaticos-diy', 0, 1, 'var_d9jfd1shs7' FROM products WHERE slug='certificados-automaticos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 22900, 999, 'certificados-automaticos-pro', 1, 1, 'var_ssgtphbw6t' FROM products WHERE slug='certificados-automaticos';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (149 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [openai/whisper](https://github.com/openai/whisper) — MIT: libre para uso comercial
', 4900, 'eur', 999, 1, 'transcripcion-audios', 'Modalidad', 0, 'prod_t4akhzkdex');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='transcripcion-audios' AND c.slug='documentos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'transcripcion-audios-diy', 0, 1, 'var_8kwstmjh97' FROM products WHERE slug='transcripcion-audios';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 14900, 999, 'transcripcion-audios-pro', 1, 1, 'var_s48s39cfjy' FROM products WHERE slug='transcripcion-audios';
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

### Modalidades
- **Lo montas tú** (199 €): plantilla + guía paso a paso.
- **Te lo montamos** (449 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui) — MIT: libre para uso comercial
', 19900, 'eur', 999, 1, 'chat-ia-web', 'Modalidad', 0, 'prod_vz7y90w18d');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='chat-ia-web' AND c.slug='bots';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 19900, 999, 'chat-ia-web-diy', 0, 1, 'var_qbt568vskz' FROM products WHERE slug='chat-ia-web';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 44900, 999, 'chat-ia-web-pro', 1, 1, 'var_na4p0eg9pf' FROM products WHERE slug='chat-ia-web';
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

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (349 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [withastro/starlight](https://github.com/withastro/starlight) — MIT: libre para uso comercial · [demo](https://starlight.astro.build)
', 14900, 'eur', 999, 1, 'centro-ayuda', 'Modalidad', 0, 'prod_q2affs8sky');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='centro-ayuda' AND c.slug='portales';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'centro-ayuda-diy', 0, 1, 'var_zmqnndm16b' FROM products WHERE slug='centro-ayuda';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 34900, 999, 'centro-ayuda-pro', 1, 1, 'var_xtjftrqfsh' FROM products WHERE slug='centro-ayuda';
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

### Modalidades
- **Lo montas tú** (149 €): plantilla + guía paso a paso.
- **Te lo montamos** (299 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [knadh/listmonk](https://github.com/knadh/listmonk) — AGPL-3.0: uso con condiciones (código abierto si se distribuye) · [demo](https://listmonk.app)
', 14900, 'eur', 999, 1, 'newsletter-propia', 'Modalidad', 0, 'prod_qsbj4zpk00');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='newsletter-propia' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 14900, 999, 'newsletter-propia-diy', 0, 1, 'var_wzkvp1g5dr' FROM products WHERE slug='newsletter-propia';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 29900, 999, 'newsletter-propia-pro', 1, 1, 'var_pvj73majm7' FROM products WHERE slug='newsletter-propia';
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

### Modalidades
- **Lo montas tú** (29 €): plantilla + guía paso a paso.
- **Te lo montamos** (79 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) — MIT: libre para uso comercial · [demo](https://playground.cookieconsent.orestbida.com/)
', 2900, 'eur', 999, 1, 'banner-cookies-rgpd', 'Modalidad', 0, 'prod_wpv5y3aeac');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='banner-cookies-rgpd' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'banner-cookies-rgpd-diy', 0, 1, 'var_ean05pnsd4' FROM products WHERE slug='banner-cookies-rgpd';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'banner-cookies-rgpd-pro', 1, 1, 'var_aws1cnqvjd' FROM products WHERE slug='banner-cookies-rgpd';
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

**Plazo:** 4 días

### Modalidades
- **Lo montas tú** (99 €): plantilla + guía paso a paso.
- **Te lo montamos** (249 €): lo publicamos con tus datos.
', 9900, 'eur', 999, 1, 'web-multidioma', 'Modalidad', 0, 'prod_w4sn0e5897');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='web-multidioma' AND c.slug='webs';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 9900, 999, 'web-multidioma-diy', 0, 1, 'var_n2dhezgbt9' FROM products WHERE slug='web-multidioma';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 24900, 999, 'web-multidioma-pro', 1, 1, 'var_ycq0swrwys' FROM products WHERE slug='web-multidioma';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.
', 4900, 'eur', 999, 1, 'ficha-google', 'Modalidad', 0, 'prod_c4rp9qaes5');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='ficha-google' AND c.slug='captacion';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'ficha-google-diy', 0, 1, 'var_9rkq9gg44h' FROM products WHERE slug='ficha-google';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'ficha-google-pro', 1, 1, 'var_c0n47xe920' FROM products WHERE slug='ficha-google';
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

### Modalidades
- **Lo montas tú** (29 €): plantilla + guía paso a paso.
- **Te lo montamos** (79 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [danielgatis/rembg](https://github.com/danielgatis/rembg) — MIT: libre para uso comercial
', 2900, 'eur', 999, 1, 'fotos-producto-fondo', 'Modalidad', 0, 'prod_708cmptpnq');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='fotos-producto-fondo' AND c.slug='tiendas';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 2900, 999, 'fotos-producto-fondo-diy', 0, 1, 'var_js1w58de6s' FROM products WHERE slug='fotos-producto-fondo';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 7900, 999, 'fotos-producto-fondo-pro', 1, 1, 'var_djxbvvtr9t' FROM products WHERE slug='fotos-producto-fondo';
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

### Modalidades
- **Lo montas tú** (19 €): plantilla + guía paso a paso.
- **Te lo montamos** (49 €): lo publicamos con tus datos.
', 1900, 'eur', 999, 1, 'firma-email', 'Modalidad', 0, 'prod_6xn4cq93x4');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='firma-email' AND c.slug='identidad';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 1900, 999, 'firma-email-diy', 0, 1, 'var_44hs4df9zc' FROM products WHERE slug='firma-email';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 4900, 999, 'firma-email-pro', 1, 1, 'var_y60843jrpc' FROM products WHERE slug='firma-email';
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

### Modalidades
- **Lo montas tú** (49 €): plantilla + guía paso a paso.
- **Te lo montamos** (129 €): lo publicamos con tus datos.

### Base técnica (código abierto)
- [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) — MIT: libre para uso comercial · [demo](https://excalidraw.com)
', 4900, 'eur', 999, 1, 'pizarra-planos', 'Modalidad', 0, 'prod_hmtem23y0j');
INSERT INTO product_categories (product_id, category_id) SELECT p.id, c.id FROM products p, categories c WHERE p.slug='pizarra-planos' AND c.slug='documentos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Lo montas tú (plantilla + guía)', 4900, 999, 'pizarra-planos-diy', 0, 1, 'var_kxp6g4qprh' FROM products WHERE slug='pizarra-planos';
INSERT INTO product_variants (product_id, label, price_cents, stock, sku, position, active, public_id) SELECT id, 'Te lo montamos', 12900, 999, 'pizarra-planos-pro', 1, 1, 'var_3egznehq72' FROM products WHERE slug='pizarra-planos';
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
', 1, 'standard', 'page_h8w1yrm9qw');
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
', 1, 'standard', 'page_xzxccg9dhj');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Herramientas recomendadas', 'herramientas-recomendadas', '## Herramientas que usamos y recomendamos

Lo que montamos funciona con estas herramientas. Algunas tienen plan gratuito y otras son de pago; te decimos cuál conviene en cada caso. Algunos enlaces pueden ser de afiliado: a ti no te cuesta más y nos ayuda a mantener precios bajos.

### Alojamiento y dominios
- **Cloudflare**: hosting gratuito de webs estáticas, DNS, SSL y protección. Es donde publicamos casi todo.
- **Registro de dominios**: Cloudflare Registrar (a precio de coste) u otro registrador que prefieras.

### Email y avisos
- **Brevo** o **MailerLite**: boletines y emails automáticos con plan gratuito.
- **Telegram**: avisos instantáneos gratis desde formularios, reservas y pedidos.

### Automatización
- **n8n**: automatizaciones de código abierto; se puede alojar sin cuota.
- **Make**: automatizaciones visuales con plan gratuito.

### Diseño y contenido
- **Canva**: imágenes y cartas para redes.
- **Unsplash / Pexels**: fotos libres de derechos.

### Hosting tradicional (si necesitas WordPress o correo con tu dominio)
- **Raiola Networks** y **Webempresa**: hosting en España con soporte en español.
- **Hostinger**: hosting y correo económicos.

### Facturación y gestión
- **Holded** o **Quipu**: facturación, gastos e impuestos para autónomos y pymes.

### Pagos
- **Stripe**: cobros con tarjeta, Bizum vía TPV de tu banco si lo prefieres.

### Herramientas libres que instalamos sin cuota
- **Uptime Kuma** (vigilancia de caídas), **listmonk** (newsletter), **Invoify** (facturas), **Starlight** (centros de ayuda), **Excalidraw** (pizarra).

_Si quieres que configuremos alguna, está incluido en «Te lo montamos»._
', 1, 'standard', 'page_t47x299wbj');
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
', 1, 'standard', 'page_sbwh3tzxsz');
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
', 1, 'standard', 'page_sv7getr145');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Aviso legal', 'aviso-legal', '## Aviso legal

En cumplimiento de la Ley 34/2002 (LSSI-CE):

- **Titular**: [NOMBRE O RAZÓN SOCIAL]
- **NIF**: [NIF]
- **Domicilio**: [DIRECCIÓN]
- **Email**: hola@automatizasinhumo.com

### Objeto
Este sitio ofrece la venta de servicios digitales (webs, automatizaciones y herramientas) a precio cerrado.

### Propiedad intelectual
Los textos y el diseño de este sitio pertenecen al titular. Los servicios se basan en software de código abierto; cada entrega respeta e incluye la licencia original de cada componente.

### Responsabilidad
El titular no se hace responsable del uso que terceros hagan de los servicios entregados ni de los contenidos que el cliente aporte.
', 1, 'standard', 'page_71hmz0cvna');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Condiciones de contratación', 'condiciones', '## Condiciones de contratación

### Precio y pago
Los precios incluyen IVA salvo que se indique lo contrario. El pago se realiza al contratar.

### Entrega
El plazo de cada ficha cuenta desde que recibimos los campos completos del formulario. Entregamos por email el enlace, los accesos y una guía de uso.

### Cambios
Cada servicio incluye una ronda de cambios sobre lo entregado. Cambios posteriores, con plan de mantenimiento o por horas.

### Garantía y devoluciones
Si en 7 días desde la entrega el servicio no hace lo que describe su ficha, te devolvemos el importe. Al tratarse de contenido digital personalizado, una vez entregado y aceptado no aplica el derecho de desistimiento (art. 103 TRLGDCU).

### Planes mensuales
Se pueden cancelar en cualquier momento; el servicio sigue activo hasta el final del periodo pagado.
', 1, 'standard', 'page_8s0bpbb6pz');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Privacidad', 'privacidad', '## Política de privacidad

- **Responsable**: [NOMBRE O RAZÓN SOCIAL], hola@automatizasinhumo.com
- **Finalidad**: gestionar pedidos, entregar los servicios y responder consultas.
- **Base legal**: ejecución del contrato y consentimiento.
- **Conservación**: el tiempo necesario y los plazos legales de facturación.
- **Destinatarios**: proveedores necesarios para prestar el servicio (alojamiento en Cloudflare, pasarela de pago, email). No vendemos datos.
- **Derechos**: acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@automatizasinhumo.com. Puedes reclamar ante la AEPD (aepd.es).
', 1, 'standard', 'page_sq2618wmkx');
INSERT INTO pages (title, slug, body_markdown, published, layout, public_id) VALUES ('Cookies', 'cookies', '## Política de cookies

Este sitio solo usa **cookies técnicas** imprescindibles (carrito y sesión de tu cuenta). No usamos cookies de publicidad ni de seguimiento de terceros, por eso no te mostramos un banner de consentimiento.

Si en el futuro añadimos analítica, será sin cookies o con tu consentimiento previo.
', 1, 'standard', 'page_43apsny8z1');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'catalog', NULL, 'Todos los servicios', 0, 'nav_5j735y41br');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='webs'), 'Webs para tu negocio', 1, 'nav_tc9sy6vh89');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='hosteleria'), 'Restaurantes y bares', 2, 'nav_4aeshadt99');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='reservas'), 'Reservas y citas', 3, 'nav_3187vqh8yr');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='bodas'), 'Bodas y eventos', 4, 'nav_33dkz9thby');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='identidad'), 'Tarjetas, link-in-bio y CV', 5, 'nav_5nzcje84mm');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='captacion'), 'Formularios y captación', 6, 'nav_hmqfahjg3b');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='bots'), 'Bots e IA', 7, 'nav_m7ft6zgz94');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='automatizaciones'), 'Automatizaciones', 8, 'nav_msjgzsfp5x');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='documentos'), 'Documentos, PDF e IA', 9, 'nav_ba9cjghn57');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'category', (SELECT id FROM categories WHERE slug='planes'), 'Planes mensuales', 10, 'nav_gsme82vpf7');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='como-funciona'), 'Cómo funciona', 11, 'nav_baqea4d03r');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='demos'), 'Demos en vivo', 12, 'nav_g0wxqsj6va');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('header', 'page', (SELECT id FROM pages WHERE slug='contacto'), 'Contacto', 13, 'nav_tw8jer0v1t');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'home', NULL, 'Inicio', 0, 'nav_r1cjkp5r13');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='enlaces'), 'Enlaces, QR y analítica', 1, 'nav_f7d93znnbb');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='tiendas'), 'Tiendas y productos digitales', 2, 'nav_nrs9twst46');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'category', (SELECT id FROM categories WHERE slug='portales'), 'Portales y webs editables', 3, 'nav_h12d9v252p');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='preguntas-frecuentes'), 'Preguntas frecuentes', 4, 'nav_25yq6aqrm6');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='herramientas-recomendadas'), 'Herramientas recomendadas', 5, 'nav_r6cbp2mvs2');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='aviso-legal'), 'Aviso legal', 6, 'nav_s9z88wq6sm');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='condiciones'), 'Condiciones de contratación', 7, 'nav_vd83phbamc');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='privacidad'), 'Privacidad', 8, 'nav_mscsjtwcg0');
INSERT INTO menu_items (location, target_type, target_id, label, position, public_id) VALUES ('footer', 'page', (SELECT id FROM pages WHERE slug='cookies'), 'Cookies', 9, 'nav_6h1j3hd3v3');
INSERT INTO settings (key, value) VALUES ('store_name', 'Automatiza sin humo') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement', 'Webs y automatizaciones a precio cerrado · Eliges, rellenas campos y lo recibes funcionando') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
INSERT INTO settings (key, value) VALUES ('announcement_href', '/pages/como-funciona') ON CONFLICT(key) DO UPDATE SET value=excluded.value;
