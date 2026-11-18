// Catálogo "barras de pan" de Automatiza sin humo.
// Fuente única: categorías (pestañas del menú), productos con campos que rellena
// el cliente, ejemplo tangible y repos base. gen-sql.mjs lo convierte en SQL
// para D1 (staging) y cruza cada repo con repos_meta.csv (licencia y demo).
//
// Precios en EUR. Cada producto tiene dos modalidades (variantes):
//   - "Plantilla + guía": plantilla rellenada + guía paso a paso (la publica el cliente).
//   - "Te lo montamos": nosotros lo publicamos con tus datos.

export const categorias = [
  { slug: 'webs', nombre: 'Webs para tu negocio', corto: 'Webs', menu: 'header' },
  { slug: 'hosteleria', nombre: 'Restaurantes y bares', menu: 'footer' },
  { slug: 'reservas', nombre: 'Reservas y citas', menu: 'footer' },
  { slug: 'bodas', nombre: 'Bodas y eventos', menu: 'footer' },
  { slug: 'identidad', nombre: 'Tarjetas, página de enlaces y CV', menu: 'footer' },
  { slug: 'captacion', nombre: 'Formularios y captación', menu: 'footer' },
  { slug: 'bots', nombre: 'Bots e IA', menu: 'footer' },
  { slug: 'automatizaciones', nombre: 'Automatizaciones', menu: 'header' },
  { slug: 'enlaces', nombre: 'Enlaces, QR y analítica', menu: 'footer' },
  { slug: 'tiendas', nombre: 'Tiendas y productos digitales', menu: 'footer' },
  { slug: 'portales', nombre: 'Portales y webs editables', menu: 'footer' },
  { slug: 'documentos', nombre: 'Documentos, PDF e IA', menu: 'footer' },
  { slug: 'contenido', nombre: 'Contenido y redes', menu: 'footer' },
  { slug: 'planes', nombre: 'Planes mensuales', menu: 'footer' },
];

// p = [precio "Plantilla + guía", precio "Te lo montamos"] en euros.
// Si p tiene un solo valor, el producto no tiene modalidades.
export const productos = [
  // ── Webs ───────────────────────────────────────────────
  {
    slug: 'web-una-pagina', cat: 'webs', nombre: 'Web de una página para tu negocio', p: [149, 349], plazo: '48 h',
    resumen: 'Tu negocio en internet con una sola página clara: quién eres, qué ofreces y cómo contactarte.',
    recibes: ['Web de una página adaptada a móvil', 'Hasta 6 servicios', 'Botones de llamada y WhatsApp', 'Horario, dirección y mapa', 'Espacio para tus fotos', 'En «Te lo montamos»: publicada en una dirección gratuita o en tu dominio si ya lo tienes'],
    campos: ['Nombre del negocio', 'Sector', 'Hasta 6 servicios (con precio, si quieres mostrarlo)', 'Teléfono y WhatsApp', 'Dirección y horario', '¿Tienes logo y fotos? (hasta 8; te diremos cómo enviarlas)'],
    noIncluye: ['Compra del dominio', 'Correo corporativo', 'Sistema de reservas', 'Tienda online', 'Textos legales', 'Mantenimiento continuo'],
    ejemplo: 'Peluquería Lola: portada con foto, lista de servicios con precios, botón «Pide cita por WhatsApp» y mapa.',
    repos: ['ColorlibHQ/bootstrap-templates', 'mmrahmanbappi/100-free-html-templates', 'micah-masuka/free-website-templates'],
  },
  {
    slug: 'web-corporativa-5-secciones', cat: 'webs', nombre: 'Web corporativa de hasta 5 páginas', p: [249, 449], plazo: '5 días',
    resumen: 'Inicio, servicios, sobre nosotros, opiniones y contacto. Para empresas que necesitan algo más que una tarjeta.',
    recibes: ['Hasta 5 páginas con un diseño adaptado a tu marca', 'Formulario de contacto conectado a tu correo', 'SEO básico: títulos, descripciones y sitemap', 'En «Te lo montamos»: publicada con certificado SSL'],
    campos: ['Datos de la empresa', 'Páginas que quieres (hasta 5)', 'Textos de cada página (te ayudamos a ordenarlos)', '¿Tienes logo, colores y fotos? (te diremos cómo enviarlos)', 'Correo donde recibir los contactos'],
    noIncluye: ['Redacción completa de los textos desde cero', 'Garantía de posición en Google', 'Compra del dominio', 'Tienda online', 'Mantenimiento continuo'],
    ejemplo: 'Asesoría García: página por servicio (fiscal, laboral, contable), equipo, testimonios y formulario.',
    repos: ['dawidolko/Website-Templates', 'uiuxlabz/uiuxlabz', 'ultimatewebtemplates/free-website-templates'],
  },
  {
    slug: 'web-inmobiliaria', cat: 'webs', nombre: 'Web para inmobiliaria', p: [299, 599], plazo: '4 días',
    resumen: 'Escaparate de inmuebles con fichas, fotos y contacto directo con el agente.',
    recibes: ['Hasta 12 inmuebles con filtros básicos (precio, zona, habitaciones)', 'Ficha por inmueble con hasta 10 fotos', 'Página de hasta 2 agentes', 'Formulario para pedir información o una visita'],
    campos: ['Nombre de la agencia', 'Inmuebles (hasta 12: precio, m², habitaciones)', 'Agentes (hasta 2)', 'Zona de trabajo', '¿Tienes las fotos de los inmuebles? (te diremos cómo enviarlas)'],
    noIncluye: ['Panel para dar de alta inmuebles después de la entrega', 'Sincronización con portales inmobiliarios', 'Reserva automática de visitas (el formulario solicita la visita, no la confirma)', 'Compra del dominio'],
    ejemplo: 'Inmobiliaria Costa: 12 pisos en venta con fotos, botón «Quiero visitarlo» y WhatsApp del agente.',
    repos: ['arjoonarora/real-estate-website-template'],
  },
  {
    slug: 'portfolio-editable', cat: 'webs', nombre: 'Portfolio editable para profesionales', p: [249, 499], plazo: '3 días',
    resumen: 'Para fotógrafos, diseñadores, arquitectos o autónomos: cambias textos y fotos desde un panel privado, sin tocar código.',
    recibes: ['Portfolio con hasta 8 proyectos y galería', 'Panel privado para editar textos y fotos', 'Formulario de contacto', 'Alojamiento en un plan gratuito, siempre que sus condiciones lo permitan'],
    campos: ['Nombre y profesión', 'Proyectos (hasta 8: título y descripción)', 'Biografía', 'Redes sociales', '¿Tienes las fotos de los proyectos? (te diremos cómo enviarlas)'],
    noIncluye: ['Tienda o venta de fotos', 'Compra del dominio', 'Edición o retoque de fotografías', 'Mantenimiento continuo'],
    ejemplo: 'Marta, fotógrafa: 8 reportajes, sobre mí, tarifas y contacto. Ella sube los nuevos trabajos desde el móvil.',
    repos: ['satendragoswamii/portfolio-website-with-admin-panel', 'ShadmanArafin/open_portfolio'],
  },
  {
    slug: 'web-blog-astro', cat: 'webs', nombre: 'Web rápida con blog', p: [249, 499], plazo: '4 días',
    resumen: 'Web ligera con blog para publicar artículos fácilmente y dar a conocer lo que haces.',
    recibes: ['Web + blog con categorías', 'Diseño ligero y rápido de cargar', 'Sitemap y RSS', 'Guía para añadir artículos tú mismo', 'En «Te lo montamos»: hasta 3 artículos que nos facilites, ya publicados'],
    campos: ['Temática', 'Logo y colores', 'Primeros temas del blog', 'Artículos que ya tengas escritos (hasta 3)'],
    noIncluye: ['Redacción de artículos', 'Garantía de posición en Google', 'Compra del dominio', 'Mantenimiento continuo'],
    ejemplo: 'Clínica de fisioterapia con blog «Ejercicios para la espalda» que sus pacientes consultan y comparten.',
    repos: ['lonestone/astro-template'],
  },
  {
    slug: 'web-taller', cat: 'webs', nombre: 'Web para taller con reserva de citas', p: [249, 449], plazo: '4 días',
    resumen: 'Taller mecánico, de bicis o de reparación: servicios, precios orientativos y reserva de cita online.',
    recibes: ['Web con hasta 6 servicios y precios orientativos', 'Calendario de citas (1 taller, 1 calendario, 1 profesional)', 'Aviso de cada cita por correo', 'Mapa y horario'],
    campos: ['Nombre del taller', 'Servicios y duración (hasta 6)', 'Horario y huecos disponibles', 'Días festivos o de cierre', 'Con cuánta antelación se puede reservar', '¿Tienes fotos del taller? (te diremos cómo enviarlas)'],
    noIncluye: ['Agenda para varios empleados', 'Cobro de la cita por adelantado', 'Avisos por SMS', 'Compra del dominio'],
    ejemplo: 'Talleres Pérez: «Cambio de aceite – 45 min – desde 59 €» y el cliente reserva el hueco del jueves.',
    repos: ['MohamadTaher/mechanic-shop', 'CCCrafts/punctual'],
  },

  // ── Hostelería ──────────────────────────────────────────
  {
    slug: 'carta-qr', cat: 'hosteleria', nombre: 'Carta digital con código QR', p: [49, 129], plazo: '24 h',
    resumen: 'Tu carta en el móvil del cliente con un QR en la mesa. Cambias tú los precios cuando quieras desde el móvil, sin coste y sin reimprimir.',
    recibes: ['Carta digital por secciones', 'QR listo para imprimir', 'Alérgenos e idiomas', 'Cambios ilimitados de precios'],
    campos: ['Nombre del local', 'Platos (nombre, precio, alérgenos)', 'Fotos (opcional)', 'Idiomas'],
    ejemplo: 'Bar La Esquina: QR en cada mesa → carta con tapas, raciones y bebidas, en español e inglés.',
    repos: ['dumbuk12/qr-menu-guide', 'investblog/qr-generator', 'kirollosfayezh/tabla-qr-menu-saas'],
  },
  {
    slug: 'carta-pedidos-whatsapp', cat: 'hosteleria', nombre: 'Carta QR con pedidos por WhatsApp', p: [99, 199], plazo: '48 h',
    resumen: 'El cliente elige en la carta, añade al carrito y el pedido te llega por WhatsApp ya escrito.',
    recibes: ['Carta con carrito', 'Pedido enviado a tu WhatsApp', 'Opción recoger / a domicilio', 'Sin comisiones por pedido'],
    campos: ['Carta y precios', 'Número de WhatsApp', 'Zona y coste de envío', 'Horario de pedidos'],
    ejemplo: 'Pizzería Nápoles: el cliente pide 2 pizzas y te llega «2× Margarita, recoger 21:00» al WhatsApp.',
    repos: ['Shahabuddin-mahar/whatsapp-restaurant-qr-menu'],
  },
  {
    slug: 'reservas-restaurante', cat: 'hosteleria', nombre: 'Reservas de mesa online', p: [149, 299], plazo: '3 días',
    resumen: 'Sistema propio de reservas sin pagar comisión por comensal a plataformas.',
    recibes: ['Página de reservas', 'Panel para ver y confirmar reservas', 'Avisos al cliente', 'Control de aforo por turno'],
    campos: ['Turnos y aforo', 'Mesas', 'Días de cierre', 'Correo o teléfono de avisos'],
    ejemplo: 'Restaurante El Puerto: el cliente reserva para 4 el sábado a las 14:30 y tú lo ves en el panel.',
    repos: ['RamtinBabaei/quickdine-platform'],
  },
  {
    slug: 'asistente-ia-pedidos', cat: 'hosteleria', nombre: 'Asistente IA que toma pedidos', p: [299, 599], plazo: '7 días',
    resumen: 'Un asistente que contesta dudas de la carta y toma pedidos por chat, 24 horas.',
    recibes: ['Asistente entrenado con tu carta', 'Respuestas sobre alérgenos y horarios', 'Pedido resumido para cocina', 'Informe de preguntas frecuentes'],
    campos: ['Carta completa', 'Preguntas frecuentes', 'Horarios y zonas', 'Canal (web, Telegram o WhatsApp)'],
    ejemplo: '«¿Tenéis algo sin gluten?» → el asistente recomienda 3 platos y apunta el pedido.',
    repos: ['thisyourei/fastfood-ai-assistant', 'tbxark/ChatGPT-Telegram-Workers'],
  },

  // ── Reservas ────────────────────────────────────────────
  {
    slug: 'pagina-citas', cat: 'reservas', nombre: 'Página de citas tipo Calendly', p: [79, 179], plazo: '48 h',
    resumen: 'Comparte un enlace y tus clientes reservan hueco en tu agenda. Sin cuotas por usuario.',
    recibes: ['Página de reserva con tus huecos', 'Tipos de cita (15, 30, 60 min…)', 'Confirmación y recordatorio por email', 'Enlace para tu web, Instagram o firma'],
    campos: ['Tipos de cita y duración', 'Horario disponible', 'Correo de avisos', 'Preguntas previas al cliente'],
    ejemplo: 'Coach Ana: enlace «Reserva tu sesión de 30 min» en su Instagram; las citas caen solas en su agenda.',
    repos: ['CCCrafts/punctual'],
  },
  {
    slug: 'reservas-salon', cat: 'reservas', nombre: 'Reservas para peluquería, estética o clínica', p: [199, 399], plazo: '5 días',
    resumen: 'Motor de reservas por servicio y profesional, con ficha de cliente.',
    recibes: ['Reserva por servicio y profesional', 'Ficha e historial de clientes', 'Recordatorios', 'Widget para tu web'],
    campos: ['Servicios, duración y precio', 'Profesionales y horarios', 'Política de cancelación'],
    ejemplo: 'Centro Bella: «Manicura con Laura – martes 17:00 – 25 €», con recordatorio el día antes.',
    repos: ['Salora-Software/Salora', 'nabinbabuuranw/palo'],
  },

  // ── Bodas y eventos ─────────────────────────────────────
  {
    slug: 'web-boda-rsvp', cat: 'bodas', nombre: 'Web de boda con confirmación de asistencia', p: [99, 249], plazo: '3 días',
    resumen: 'Toda la información de la boda en una web y los invitados confirman asistencia y menú.',
    recibes: ['Web con historia, programa, cómo llegar y alojamiento', 'Formulario de confirmación de asistencia con menú y alergias', 'Lista de confirmados descargable', 'Preguntas frecuentes'],
    campos: ['Nombres y fecha', 'Lugar de ceremonia y banquete', 'Programa del día', 'Fotos', 'Opciones de menú'],
    ejemplo: 'Lucía & Pablo: 140 invitados confirman desde el móvil y descargáis el Excel para el catering.',
    repos: ['Holojerm/nuxt-wedding-template', 'kbichave/wedding-invite', 'zachspiel/wedding-rsvp', 'sotomaque/wedding-website', '1molehayo/wedding-website-builder'],
  },
  {
    slug: 'invitacion-digital', cat: 'bodas', nombre: 'Invitación digital animada', p: [39, 89], plazo: '24 h',
    resumen: 'Invitación para enviar por WhatsApp: cuenta atrás, ubicación y botón para confirmar.',
    recibes: ['Invitación web animada', 'Cuenta atrás', 'Botón de mapa y confirmación', 'Enlace para compartir'],
    campos: ['Tipo de evento', 'Nombres', 'Fecha, hora y lugar', 'Foto o estilo'],
    ejemplo: 'Bautizo de Hugo: enlace por WhatsApp con foto, cuenta atrás y «Confirmo asistencia».',
    repos: ['Poison675/free-wedding-website-templates', 'clentebanks/wedding-invitation'],
  },
  {
    slug: 'galeria-privada-evento', cat: 'bodas', nombre: 'Galería privada de fotos del evento', p: [69, 149], plazo: '48 h',
    resumen: 'Álbum privado con enlace: los invitados ven y suben sus fotos, tú las descargas todas.',
    recibes: ['Galería privada con enlace', 'Subida de fotos de invitados', 'Favoritas y descarga', 'Panel de administración'],
    campos: ['Nombre del evento', 'Fotos iniciales', 'Contraseña o enlace privado'],
    ejemplo: 'Tras la boda, 300 fotos de invitados reunidas en un solo álbum privado.',
    repos: ['t0ma5/tinygallery', 'BartekBis/wedding-website'],
  },
  {
    slug: 'gestion-invitados-mesas', cat: 'bodas', nombre: 'Gestión de invitados y plano de mesas', p: [79, 179], plazo: '3 días',
    resumen: 'Lista de invitados, confirmaciones, llamadas pendientes y plano de mesas en PDF.',
    recibes: ['Panel de invitados', 'Seguimiento de confirmaciones', 'Plano de mesas imprimible', 'Exportación a Excel'],
    campos: ['Lista de invitados', 'Número de mesas y capacidad', 'Restricciones (quién no con quién)'],
    ejemplo: 'Plano de 15 mesas generado en PDF para el restaurante a partir de las confirmaciones.',
    repos: ['inonalfa/wedding-rsvp-seating', 'JacobStephens2/wedding-platform'],
  },

  // ── Identidad ──────────────────────────────────────────
  {
    slug: 'tarjeta-digital', cat: 'identidad', nombre: 'Tarjeta de visita digital con QR', p: [29, 69], plazo: '24 h',
    resumen: 'Tu tarjeta en el móvil: un QR y el cliente guarda tu contacto con un toque.',
    recibes: ['Tarjeta web personal', 'Botón «Guardar contacto» (vCard)', 'QR para imprimir', 'Enlaces a redes y WhatsApp'],
    campos: ['Nombre y cargo', 'Foto', 'Teléfono, email y web', 'Redes sociales'],
    ejemplo: 'Javier, comercial: enseña el QR en una feria y el contacto queda guardado en el móvil del cliente.',
    repos: ['Kahaan83/digital-cards'],
  },
  {
    slug: 'link-in-bio', cat: 'identidad', nombre: 'Página de enlaces para tu bio con estadísticas', p: [39, 99], plazo: '24 h',
    resumen: 'Tu alternativa a Linktree, en tu dominio y sin cuota mensual, con clics medidos.',
    recibes: ['Página de enlaces con tu marca', 'Estadísticas de clics', 'Bloques de vídeo, formulario y productos', 'Panel para editar'],
    campos: ['Nombre o marca', 'Foto / logo', 'Enlaces con su texto', 'Colores'],
    ejemplo: 'Creadora de recetas: enlace en Instagram con su libro, YouTube y newsletter, y sabe cuál funciona.',
    repos: ['MrDemonWolf/linkden', 'Mrbarnx/Open-Link-Hub', 'dimasmong/MoBio'],
  },
  {
    slug: 'cv-profesional', cat: 'identidad', nombre: 'Currículum profesional en PDF que pasa los filtros de empresas', p: [29, 79], plazo: '48 h',
    resumen: 'CV preparado para pasar los filtros automáticos de selección, en PDF y Word.',
    recibes: ['CV en PDF y Word', 'Plantilla a elegir', 'Palabras clave para pasar los filtros automáticos de selección', 'Versión web opcional'],
    campos: ['Experiencia', 'Formación', 'Habilidades', 'Puesto al que aspiras'],
    ejemplo: 'Elena, enfermera: CV de 1 página con las palabras clave de la oferta del hospital.',
    repos: ['gianfrancodemarco/resume-builder', 'samuelbelo/cvfree', 'akhil-dara/CVAurum'],
  },
  {
    slug: 'muro-testimonios', cat: 'identidad', nombre: 'Muro de opiniones de clientes', p: [49, 119], plazo: '48 h',
    resumen: 'Recoge opiniones con un enlace, apruébalas y muéstralas en tu web.',
    recibes: ['Formulario para dejar opinión', 'Panel para aprobar', 'Muro/widget para tu web', 'Opiniones con foto y estrellas'],
    campos: ['Nombre del negocio', 'Preguntas para el cliente', 'Web donde insertarlo'],
    ejemplo: 'Academia de inglés: tras cada curso envía el enlace y las mejores opiniones salen en su portada.',
    repos: ['jhodges3401-code/kudoshelf-lite', 'AnandSundar/Kindwords'],
  },

  // ── Captación ──────────────────────────────────────────
  {
    slug: 'formulario-aviso-telegram', cat: 'captacion', nombre: 'Formulario de contacto con aviso al móvil', p: [39, 89], plazo: '24 h',
    resumen: 'Cada mensaje de tu web te llega al instante por Telegram o email, con antispam.',
    recibes: ['Formulario listo para tu web', 'Aviso por Telegram y/o email', 'Protección antispam', 'Histórico de mensajes'],
    campos: ['Campos del formulario', 'Canal de aviso', 'Web donde va'],
    ejemplo: 'Fontanero: «Nueva consulta: fuga en cocina, Calle Mayor 3» le llega al Telegram en 2 segundos.',
    repos: ['investblog/contact-relay', 'BohdanPetryshyn/formzero'],
  },
  {
    slug: 'lista-espera', cat: 'captacion', nombre: 'Lista de espera con referidos', p: [79, 179], plazo: '48 h',
    resumen: 'Para lanzamientos: la gente se apunta, comparte su enlace y sube puestos en la lista.',
    recibes: ['Página de lista de espera', 'Enlace de referido por persona', 'Ranking y exportación', 'Correo de bienvenida'],
    campos: ['Nombre del producto', 'Fecha de lanzamiento', 'Premio por referidos'],
    ejemplo: 'Nueva app de recetas: 1.200 apuntados antes de abrir, 40 % llegados por referidos.',
    repos: ['d4mr/0list', 'Metareignity/waitlist-cloudflare'],
  },
  {
    slug: 'avisos-multicanal', cat: 'captacion', nombre: 'Avisos automáticos por varios canales', p: [59, 129], plazo: '48 h',
    resumen: 'Cualquier evento de tus herramientas (pago, formulario, pedido) avisa a Slack, Telegram, Discord o email.',
    recibes: ['Bandeja de eventos', 'Reglas de aviso por canal', 'Histórico consultable'],
    campos: ['Herramientas que envían eventos', 'Canales de aviso', 'Qué eventos interesan'],
    ejemplo: 'Cada venta de la tienda manda «🎉 Nueva venta 49 €» al grupo de Telegram del equipo.',
    repos: ['bts-io/hookforms-cloud'],
  },

  // ── Bots ───────────────────────────────────────────────
  {
    slug: 'bot-telegram-chatgpt', cat: 'bots', nombre: 'Bot de Telegram con IA', p: [99, 249], plazo: '48 h',
    resumen: 'Un asistente con IA en Telegram para tu negocio o comunidad, con tus instrucciones.',
    recibes: ['Bot de Telegram publicado', 'Personalidad e instrucciones a medida', 'Control de quién puede usarlo', 'Alojamiento sin servidor'],
    campos: ['Nombre del bot', 'Para qué sirve', 'Instrucciones/tono', 'Usuarios permitidos'],
    ejemplo: 'Gimnasio: bot que responde horarios, tarifas y ejercicios a los socios a cualquier hora.',
    repos: ['tbxark/ChatGPT-Telegram-Workers'],
  },
  {
    slug: 'bot-telegram-medida', cat: 'bots', nombre: 'Bot de Telegram con menús y pedidos', p: [249, 499], plazo: '7 días',
    resumen: 'Bot con botones: catálogo, reservas, avisos y pedidos, conectado a tu hoja de cálculo.',
    recibes: ['Bot con menús de botones', 'Conexión con Google Sheets', 'Avisos programados', 'Panel de mensajes'],
    campos: ['Opciones del menú', 'Datos (productos, horarios)', 'Quién recibe los pedidos'],
    ejemplo: 'Panadería: el cliente pulsa «Encargar», elige pan y hora, y el pedido cae en la hoja del obrador.',
    repos: ['aiogram/aiogram'],
  },
  {
    slug: 'crm-whatsapp', cat: 'bots', nombre: 'CRM de WhatsApp para tu equipo', p: [299, 699], plazo: '7 días',
    resumen: 'Bandeja compartida de WhatsApp: varios agentes, contactos, embudo de ventas y envíos masivos.',
    recibes: ['Bandeja compartida', 'Contactos y etiquetas', 'Embudo de oportunidades', 'Difusiones'],
    campos: ['Números de WhatsApp Business', 'Agentes', 'Etapas de venta'],
    ejemplo: 'Autoescuela: 3 personas atienden el mismo WhatsApp y nadie responde dos veces al mismo alumno.',
    repos: ['thareekanvar/replyloom'],
  },

  // ── Automatizaciones ───────────────────────────────────
  {
    slug: 'auto-captacion-leads', cat: 'automatizaciones', nombre: 'Captación de clientes automática', p: [149, 299], plazo: '3 días',
    resumen: 'Formulario → hoja de cálculo → email de bienvenida → aviso a tu móvil. Sin copiar y pegar.',
    recibes: ['Flujo n8n importado y probado', 'Registro en Google Sheets', 'Correo automático al cliente', 'Aviso a Telegram'],
    campos: ['Formulario de origen', 'Hoja de destino', 'Texto del email', 'Canal de aviso'],
    ejemplo: 'Academia: cada interesado queda en la hoja, recibe el temario y tú te enteras al momento.',
    repos: ['yusizer/n8n-lead-automation', 'n8n-io/n8n'],
  },
  {
    slug: 'auto-facturas', cat: 'automatizaciones', nombre: 'Facturas recibidas a hoja de cálculo', p: [149, 299], plazo: '4 días',
    resumen: 'Las facturas que llegan al email se leen solas y se apuntan en tu hoja: proveedor, fecha, importe, IVA.',
    recibes: ['Flujo que vigila tu email', 'Extracción automática de datos', 'Hoja de cálculo ordenada', 'Copia del PDF en tu nube'],
    campos: ['Correo donde llegan las facturas', 'Hoja de destino', 'Campos a extraer'],
    ejemplo: 'Autónomo: a final de trimestre tiene todas las facturas apuntadas para la gestoría.',
    repos: ['vixonoffice/n8n-automation-templates', 'enescingoz/awesome-n8n-templates'],
  },
  {
    slug: 'auto-resenas', cat: 'automatizaciones', nombre: 'Resumen semanal de reseñas', p: [99, 199], plazo: '3 días',
    resumen: 'Cada lunes recibes un resumen con IA de lo que dicen tus clientes: lo bueno, lo malo y qué responder.',
    recibes: ['Flujo semanal programado', 'Resumen con IA', 'Borradores de respuesta', 'Envío por email o Telegram'],
    campos: ['Dónde están tus reseñas', 'Correo o Telegram de destino'],
    ejemplo: 'Hotel rural: «Esta semana 12 reseñas, 2 quejas por el wifi», con respuesta sugerida.',
    repos: ['vixonoffice/n8n-automation-templates', 'enescingoz/awesome-n8n-templates'],
  },
  {
    slug: 'auto-plantilla-medida', cat: 'automatizaciones', nombre: 'Una automatización a elegir del catálogo', p: [99, 199], plazo: '3 días',
    resumen: 'Elige entre más de 280 flujos probados (Gmail, WhatsApp, Notion, Drive, IA…) y lo dejamos funcionando con tus cuentas.',
    recibes: ['Flujo instalado y conectado', 'Prueba con datos reales', 'Guía de uso de 1 página'],
    campos: ['Qué tarea repetitiva quieres quitarte', 'Herramientas que usas', 'Accesos (te guiamos)'],
    ejemplo: 'Guardar adjuntos de Gmail en Drive por cliente, o publicar en redes lo que subes al blog.',
    repos: ['enescingoz/awesome-n8n-templates', 'n8n-io/n8n', 'activepieces/activepieces', 'automatisch/automatisch'],
  },
  {
    slug: 'auto-tareas-programadas', cat: 'automatizaciones', nombre: 'Tareas programadas en la nube', p: [199, 399], plazo: '5 días',
    resumen: 'Procesos que se ejecutan solos cada hora/día: copias, informes, sincronizaciones, recordatorios.',
    recibes: ['Proceso en la nube con reintentos', 'Registro de ejecuciones', 'Aviso si algo falla'],
    campos: ['Qué hay que hacer', 'Cada cuánto', 'Origen y destino de los datos'],
    ejemplo: 'Cada noche se copian los pedidos del día a la hoja de contabilidad y se envía el total por email.',
    repos: ['cloudflare/workflows-starter'],
  },

  // ── Enlaces, QR y analítica ────────────────────────────
  {
    slug: 'acortador-enlaces', cat: 'enlaces', nombre: 'Acortador de enlaces con tu dominio', p: [49, 129], plazo: '48 h',
    resumen: 'Enlaces cortos de marca (tunegocio.es/oferta) con estadísticas de clics y QR.',
    recibes: ['Acortador en tu dominio', 'Estadísticas por enlace', 'QR por enlace', 'Panel de gestión'],
    campos: ['Dominio o subdominio', 'Primeros enlaces'],
    ejemplo: 'Campaña de flyers con tunegocio.es/verano: sabes cuántos escanearon el QR y desde dónde.',
    repos: ['miantiao-me/Sink', 'botnick/shortlink'],
  },
  {
    slug: 'qr-campanas', cat: 'enlaces', nombre: 'Pack de códigos QR para campañas', p: [19, 49], plazo: '24 h',
    resumen: 'QR en vector listos para imprenta, con enlace editable y medición.',
    recibes: ['Hasta 10 QR en SVG/PNG', 'Enlaces editables después de imprimir', 'Medición de escaneos'],
    campos: ['Destinos de cada QR', 'Colores / logo'],
    ejemplo: 'QR en escaparate, carta y tarjetas, cada uno medido por separado.',
    repos: ['investblog/qr-generator'],
  },
  {
    slug: 'analitica-sin-cookies', cat: 'enlaces', nombre: 'Analítica web sin cookies', p: [49, 99], plazo: '24 h',
    resumen: 'Sabe cuántas visitas tienes y de dónde vienen, sin banner de cookies molesto.',
    recibes: ['Panel de analítica privado', 'Instalación en tu web', 'Informe mensual por email (con plan)'],
    campos: ['Web(s) a medir', 'Correo para informes'],
    ejemplo: 'Tienda local: «este mes 2.300 visitas, 40 % desde Instagram, la página más vista es Ofertas».',
    repos: ['umami-software/umami'],
  },

  // ── Tiendas ────────────────────────────────────────────
  {
    slug: 'tienda-productos-digitales', cat: 'tiendas', nombre: 'Tienda de productos digitales', p: [299, 599], plazo: '5 días',
    resumen: 'Vende ebooks, plantillas, cursos o presets: el cliente paga y descarga al momento.',
    recibes: ['Tienda con pago online', 'Entrega automática del archivo', 'Panel de pedidos', 'Correos de compra'],
    campos: ['Productos y precios', 'Archivos a entregar', 'Cuenta de cobro (Stripe)'],
    ejemplo: 'Diseñadora vende packs de plantillas de Canva a 9 € con descarga instantánea.',
    repos: ['ddyy/minshop', 'Vojislav77/digital-downloads-website', 'fengyiqicoder/astro-ai-shop', 'Paymug/paymug'],
  },
  {
    slug: 'tienda-online', cat: 'tiendas', nombre: 'Tienda online completa', p: [499, 999], plazo: '7 días',
    resumen: 'Catálogo, variantes, carrito, pagos, envíos y panel de pedidos. Sin comisiones de plataforma.',
    recibes: ['Tienda con tu marca', 'Pagos con tarjeta', 'Gestión de stock y envíos', 'Panel de administración'],
    campos: ['Productos, variantes y fotos', 'Tarifas de envío', 'Datos legales', 'Cuenta de cobro'],
    ejemplo: 'Tienda de cerámica artesana con 40 productos, envío a península y aviso de cada venta.',
    repos: ['ddyy/minshop', 'russellkmoore/mercora'],
  },
  {
    slug: 'marketplace-plantillas', cat: 'tiendas', nombre: 'Marketplace de productos digitales', p: [699, 1299], plazo: '10 días',
    resumen: 'Plataforma donde varios creadores venden plantillas, presets o cursos y tú cobras comisión.',
    recibes: ['Marketplace multivendedor', 'Previsualizaciones', 'Pagos y descargas protegidas', 'Panel de vendedores'],
    campos: ['Nombre y nicho', 'Comisión', 'Categorías', 'Primeros vendedores'],
    ejemplo: 'Marketplace de plantillas de Notion para estudiantes con 15 creadores.',
    repos: ['Kylelau339/digital-sales-platform', 'w4seemdev/Templix', 'playlikeboy/scriptly.store', 'vignesh-gupta/digibee-marketplace'],
  },

  // ── Portales ───────────────────────────────────────────
  {
    slug: 'portal-cliente', cat: 'portales', nombre: 'Portal de clientes para agencias y autónomos', p: [299, 599], plazo: '7 días',
    resumen: 'Tus clientes entran con su usuario y ven proyectos, archivos, facturas y avances.',
    recibes: ['Portal con tu marca', 'Proyectos y tareas', 'Archivos compartidos', 'Facturas y presupuestos'],
    campos: ['Logo y colores', 'Clientes y proyectos iniciales', 'Servicios que facturas'],
    ejemplo: 'Estudio de diseño: el cliente ve «Logo – fase 2 de 3» y descarga las propuestas.',
    repos: ['directus-labs/agency-os', 'Vibra-Labs/Atrium', 'onlineprfoundation/pr-agency-platform'],
  },
  {
    slug: 'web-editable-visual', cat: 'portales', nombre: 'Web a medida con editor visual completo', p: [399, 799], plazo: '7 días',
    resumen: 'Web con editor visual: cambias textos, imágenes y secciones arrastrando, como en Wix, pero tuya.',
    recibes: ['Web con editor visual', 'Bloques prediseñados', 'Formación de 30 min', 'Alojamiento propio'],
    campos: ['Secciones que necesitas', 'Contenido inicial', 'Quién la editará'],
    ejemplo: 'Asociación cultural: la junta cambia la agenda de actividades cada semana sin depender de nadie.',
    repos: ['GrapesJS/grapesjs', 'puckeditor/puck', 'givanz/VvvebJs', 'webstudio-is/webstudio'],
  },

  // ── Planes mensuales ───────────────────────────────────
  {
    slug: 'plan-mantenimiento-web', cat: 'planes', nombre: 'Mantenimiento web (mes)', p: [19], plazo: 'Mensual',
    resumen: 'Nos ocupamos de que tu web siga funcionando: copias, actualizaciones y pequeños cambios.',
    recibes: ['Copias de seguridad', 'Actualizaciones de seguridad', '30 min de cambios al mes', 'Vigilancia de caídas'],
    campos: ['Web a mantener', 'Accesos (te guiamos)'],
    ejemplo: 'Cambiar el horario de verano o subir la nueva carta: nos lo mandas y está hecho.',
    repos: [],
  },
  {
    slug: 'plan-hosting-dominio', cat: 'planes', nombre: 'Alojamiento + dominio gestionado (mes)', p: [9], plazo: 'Mensual',
    resumen: 'Tu web publicada con candado de seguridad (https) y tu dominio, sin preocuparte de renovaciones.',
    recibes: ['Alojamiento rápido con SSL', 'Gestión del dominio', 'Correo de reenvío'],
    campos: ['Dominio deseado', 'Web a alojar'],
    ejemplo: 'tunegocio.es apuntando a tu web, renovado cada año sin que tengas que hacer nada.',
    repos: ['coollabsio/coolify'],
  },
  {
    slug: 'plan-automatizaciones', cat: 'planes', nombre: 'Automatizaciones vigiladas (mes)', p: [39], plazo: 'Mensual',
    resumen: 'Mantenemos tus automatizaciones en marcha: si una falla, la arreglamos antes de que lo notes.',
    recibes: ['Servidor n8n/Activepieces gestionado', 'Vigilancia de errores', '1 flujo nuevo pequeño al mes'],
    campos: ['Automatizaciones actuales', 'Canal de aviso'],
    ejemplo: 'El token de Google caduca un viernes por la noche: lo renovamos y el flujo sigue.',
    repos: ['n8n-io/n8n', 'activepieces/activepieces'],
  },
  {
    slug: 'auditoria-web', cat: 'planes', nombre: 'Auditoría web exprés', p: [49], plazo: '48 h',
    resumen: 'Informe claro de velocidad, SEO, móvil y accesibilidad de tu web, con lo que hay que arreglar primero.',
    recibes: ['Informe PDF de 5–8 páginas', 'Lista priorizada de mejoras', 'Presupuesto cerrado para arreglarlo'],
    campos: ['URL de la web', 'Objetivo (más ventas, más llamadas…)'],
    ejemplo: '«Tu web tarda 6 s en móvil por 3 imágenes de 4 MB: arreglarlo sube las llamadas».',
    repos: ['GoogleChrome/lighthouse'],
  },
  {
    slug: 'vigilancia-caidas', cat: 'planes', nombre: 'Aviso si tu web se cae + página de estado', p: [39, 99], plazo: '24 h',
    resumen: 'Comprobamos tu web cada minuto y te avisamos al móvil si deja de funcionar, con una página pública de estado.',
    recibes: ['Vigilancia cada 60 s de webs, tiendas o reservas', 'Aviso por Telegram o email', 'Página de estado con tu logo', 'Informe mensual de disponibilidad'],
    campos: ['Webs a vigilar (URLs)', 'Canal de aviso (Telegram / email)', 'Logo'],
    ejemplo: 'La tienda de Ana cae un sábado a las 23:10; a las 23:11 le llega «tienda caída» al Telegram y lo arreglamos.',
    repos: ['louislam/uptime-kuma'],
  },

  // ── Documentos, PDF e IA ───────────────────────────────
  {
    slug: 'facturas-presupuestos', cat: 'documentos', nombre: 'Generador de facturas y presupuestos con tu marca', p: [79, 179], plazo: '48 h',
    resumen: 'Rellenas cliente y conceptos, y sale una factura o presupuesto en PDF con tu logo, IVA calculado y numeración.',
    recibes: ['Generador web propio (tuyo, sin cuotas)', 'Plantilla con tu logo y datos fiscales', 'Descarga en PDF y envío por email', 'Guía de uso de 1 página'],
    campos: ['Razón social y NIF', 'Logo y colores', 'Tipos de IVA / IRPF que usas', 'Formato de numeración'],
    ejemplo: 'Electricista autónomo: «Presupuesto P-2026-014 · cambio de cuadro · 380 € + IVA» enviado al cliente en 2 minutos desde el móvil.',
    repos: ['al1abb/invoify'],
  },
  {
    slug: 'certificados-automaticos', cat: 'documentos', nombre: 'Diplomas y certificados en PDF automáticos', p: [99, 229], plazo: '3 días',
    resumen: 'Para academias, cursos y eventos: subes la lista de alumnos y cada uno recibe su certificado personalizado.',
    recibes: ['Plantilla de diploma con tu diseño', 'Generación masiva desde una hoja de cálculo', 'Envío automático por email', 'Código QR de verificación'],
    campos: ['Logo y firma', 'Texto del certificado', 'Hoja con nombres, correos y horas', 'Correo remitente'],
    ejemplo: 'Academia de inglés: 120 alumnos terminan el curso y en 5 minutos cada uno tiene su diploma con QR en el correo.',
    repos: ['pdfme/pdfme'],
  },
  {
    slug: 'transcripcion-audios', cat: 'documentos', nombre: 'Transcripción automática de audios y reuniones', p: [49, 149], plazo: '48 h',
    resumen: 'Mandas un audio o una grabación y recibes el texto y un resumen con tareas. Funciona con audios de WhatsApp.',
    recibes: ['Carpeta o bot donde dejar los audios', 'Texto completo en español', 'Resumen con puntos y tareas', 'Copia en Google Docs o email'],
    campos: ['Dónde te llegan los audios (WhatsApp, Telegram, carpeta)', 'Dónde quieres el texto', 'Idioma principal'],
    ejemplo: 'Gestoría: reenvía al bot la nota de voz del cliente y recibe «Pide cita para la renta, trae 3 nóminas».',
    repos: ['openai/whisper'],
  },
  {
    slug: 'chat-ia-web', cat: 'bots', nombre: 'Chat con IA en tu web que responde con tus datos', p: [199, 449], plazo: '5 días',
    resumen: 'Un asistente en tu web que contesta horarios, precios y dudas frecuentes usando tu información, y te pasa los contactos.',
    recibes: ['Chat en tu web o en una página propia', 'Entrenado con tus textos, PDFs y preguntas frecuentes', 'Aviso cuando alguien deja sus datos', 'Panel para revisar conversaciones'],
    campos: ['Web donde va el chat', 'Documentos o FAQ', 'Tono (cercano / formal)', 'Correo o Telegram para avisos'],
    ejemplo: 'Clínica dental: «¿Abrís el sábado?» → «Sí, de 10 a 14. ¿Te reservo una revisión?» y llega el contacto al móvil.',
    repos: ['mckaywrigley/chatbot-ui'],
  },
  {
    slug: 'centro-ayuda', cat: 'portales', nombre: 'Centro de ayuda o manual para tus clientes', p: [149, 349], plazo: '4 días',
    resumen: 'Una web de ayuda con buscador para que tus clientes resuelvan dudas solos: guías, preguntas frecuentes y tutoriales.',
    recibes: ['Web de documentación con buscador', 'Menú lateral por temas', 'Modo claro/oscuro y versión móvil', 'Fácil de ampliar escribiendo textos'],
    campos: ['Nombre del producto o servicio', 'Temas y preguntas', 'Capturas o vídeos', 'Logo y colores'],
    ejemplo: 'Software de reservas para gimnasios: «Cómo cancelar una clase», «Cómo cambiar la tarifa»… y bajan los emails de soporte.',
    repos: ['withastro/starlight'],
  },
  {
    slug: 'newsletter-propia', cat: 'captacion', nombre: 'Boletín de email propio sin cuotas por contacto', p: [149, 299], plazo: '4 días',
    resumen: 'Tu propio sistema de newsletter: formulario de alta, plantillas y envíos programados, sin pagar por cada suscriptor.',
    recibes: ['Servidor de newsletter configurado', 'Formulario de alta para tu web', 'Plantilla de email con tu marca', 'Doble confirmación y baja (RGPD)'],
    campos: ['Nombre del boletín', 'Logo y colores', 'Contactos actuales (si tienes)', 'Frecuencia de envío'],
    ejemplo: 'Librería de barrio: cada lunes «Novedades de la semana» a 2.300 suscriptores sin cuota mensual por contactos.',
    repos: ['knadh/listmonk'],
  },
  {
    slug: 'banner-cookies-rgpd', cat: 'webs', nombre: 'Configuración técnica del aviso de cookies', p: [29, 79], plazo: '24 h', activo: false,
    resumen: 'Instalamos un aviso de cookies que no carga la analítica ni los píxeles hasta que el visitante acepta.',
    recibes: ['Aviso de cookies con aceptar, rechazar y configurar', 'Bloqueo técnico de hasta 2 herramientas de seguimiento hasta que se aceptan', 'En «Te lo montamos»: instalado en tu web'],
    campos: ['Dirección de la web', 'Herramientas de seguimiento que usas (hasta 2, por ejemplo Analytics o el píxel de Meta)'],
    noIncluye: ['Asesoramiento jurídico', 'Redacción de textos legales', 'Garantía de cumplimiento normativo'],
    ejemplo: 'Tienda con píxel de Meta: el píxel ya no se carga hasta que el cliente pulsa «Aceptar».',
    repos: ['orestbida/cookieconsent'],
  },
  {
    slug: 'web-multidioma', cat: 'webs', nombre: 'Añade un segundo idioma a tu web', p: [99, 249], plazo: '4 días',
    resumen: 'Añadimos un segundo idioma a tu web, con selector de idioma y direcciones propias para cada versión.',
    recibes: ['Hasta 3 páginas o 1.500 palabras en el idioma elegido', 'Selector de idioma', 'Etiquetas hreflang para los buscadores', 'Revisión humana de los textos clave'],
    campos: ['Dirección de la web', 'Idioma', 'Páginas que quieres traducir (hasta 3)', 'Textos que no se traducen (marcas, platos…)'],
    noIncluye: ['Más de 3 páginas o 1.500 palabras', 'Garantía de posición en buscadores', 'Traducción jurada', 'Traducción de contenidos que publiques después'],
    ejemplo: 'Restaurante en Sevilla con la carta y las reservas también en inglés para los turistas.',
    repos: [],
  },
  {
    slug: 'ficha-google', cat: 'captacion', nombre: 'Ficha de Google de tu negocio optimizada', p: [49, 129], plazo: '48 h',
    resumen: 'Que te encuentren en Google Maps: ficha completa, categorías correctas, fotos, horarios y enlace de reseñas.',
    recibes: ['Ficha revisada y completada', 'Categorías y servicios optimizados', 'Enlace y QR para pedir reseñas', 'Checklist mensual de publicaciones'],
    campos: ['Nombre y dirección del negocio', 'Servicios principales', '5–10 fotos', 'Acceso a la ficha (te guiamos)'],
    ejemplo: 'Fisioterapeuta en Valencia: aparece en «fisio cerca de mí» con 40 fotos, horario y botón de cita.',
    repos: [],
  },
  {
    slug: 'fotos-producto-fondo', cat: 'tiendas', nombre: 'Fotos de producto con fondo blanco automático', p: [29, 79], plazo: '24 h',
    resumen: 'Subes las fotos hechas con el móvil y te devolvemos las imágenes recortadas, con fondo blanco y tamaño para tu tienda.',
    recibes: ['Hasta 50 fotos recortadas (ampliable)', 'Fondo blanco o de color', 'Tamaños para web, Amazon e Instagram', 'Carpeta compartida para nuevas tandas'],
    campos: ['Fotos (carpeta o zip)', 'Color de fondo', 'Medidas que necesitas'],
    ejemplo: 'Tienda de cerámica: 36 fotos hechas en la mesa de la cocina, listas para la web en una tarde.',
    repos: ['danielgatis/rembg'],
  },
  {
    slug: 'firma-email', cat: 'identidad', nombre: 'Firma de email profesional', p: [19, 49], plazo: '24 h',
    resumen: 'Firma con tu foto o logo, cargo, teléfono, redes y aviso legal, que se ve bien en Gmail, Outlook y móvil.',
    recibes: ['Firma HTML probada en Gmail y Outlook', 'Versión para todo tu equipo', 'Guía de instalación en 2 minutos'],
    campos: ['Nombre y cargo de cada persona', 'Logo o foto', 'Teléfono y web', 'Redes sociales'],
    ejemplo: 'Despacho de 6 abogados: misma firma para todos, con logo, teléfono directo y enlace de cita.',
    repos: [],
  },
  {
    slug: 'pizarra-planos', cat: 'documentos', nombre: 'Pizarra online privada para tu equipo', p: [49, 129], plazo: '48 h',
    resumen: 'Una pizarra colaborativa propia para esquemas, planos de local o diagramas, con tu dominio y sin cuentas de terceros.',
    recibes: ['Pizarra colaborativa publicada en tu dominio', 'Bibliotecas de iconos para tu sector', 'Exportación a PNG y PDF'],
    campos: ['Subdominio deseado', 'Uso principal (planos, esquemas, clases)', 'Logo'],
    ejemplo: 'Reformas López dibuja con el cliente la cocina nueva en la tablet y le manda el PDF al terminar.',
    repos: ['excalidraw/excalidraw'],
  },
  // ── Tanda 3: ideas de ChatGPT + repos del Excel ────────
  {
    slug: 'vigilancia-precios', cat: 'planes', nombre: 'Vigilancia de precios de la competencia (mes)', p: [12], plazo: 'Mensual',
    resumen: 'Te avisamos por email o Telegram cuando un competidor cambia el precio, se queda sin stock o vuelve a tenerlo.',
    recibes: ['Hasta 25 productos vigilados', 'Aviso por email o Telegram', 'Historial de precios de cada producto', 'Cambio de la lista cuando quieras'],
    campos: ['Enlaces de los productos', 'Precio a partir del cual avisar', 'Frecuencia (diaria, cada hora)', 'Correo o Telegram'],
    ejemplo: 'Tienda de bicis: «La Orbea X de la competencia ha bajado de 1.299 € a 1.149 €» llega al móvil a las 9:00.',
    repos: ['dgtlmoon/changedetection.io'],
  },
  {
    slug: 'aviso-cambios-web', cat: 'planes', nombre: 'Aviso de cambios en webs que te interesan (mes)', p: [9], plazo: 'Mensual',
    resumen: 'Vigilamos boletines oficiales, licitaciones, convocatorias o webs de proveedores y te avisamos cuando cambian.',
    recibes: ['Hasta 15 páginas vigiladas', 'Solo te avisa si cambia la parte que te importa', 'Resumen del cambio en el aviso'],
    campos: ['Páginas a vigilar', 'Qué parte vigilar (p. ej. «tabla de convocatorias»)', 'Frecuencia', 'Correo o Telegram'],
    ejemplo: 'Gestoría: aviso cada vez que el ayuntamiento publica una nueva ayuda para autónomos.',
    repos: ['dgtlmoon/changedetection.io'],
  },
  {
    slug: 'etiquetas-codigo-barras', cat: 'tiendas', nombre: 'Etiquetas con código de barras listas para imprimir', p: [19, 49], plazo: '24 h',
    resumen: 'Nos pasas tu lista de productos y recibes un PDF con las etiquetas (código de barras, nombre y precio) al tamaño de tu papel.',
    recibes: ['PDF con hasta 100 etiquetas (ampliable)', 'Códigos CODE128 o EAN-13', 'Tamaño adaptado a tu hoja o impresora', 'Plantilla para volver a generarlas tú'],
    campos: ['Lista de referencias (Excel o CSV)', 'Nombre y precio de cada producto', 'Tamaño de etiqueta / hoja', 'Unidades por referencia'],
    ejemplo: 'Artesana de jabones: 40 referencias con código, nombre y PVP en hojas A4 de 24 etiquetas.',
    repos: ['lindell/JsBarcode', 'Hopding/pdf-lib'],
  },
  {
    slug: 'optimizar-imagenes', cat: 'webs', nombre: 'Reduce el peso de las imágenes de tu web', p: [14, 39], plazo: '24 h',
    resumen: 'Tus fotos pesadas, convertidas a WebP o AVIF con el tamaño justo, para que pesen menos sin perder calidad visible.',
    recibes: ['Hasta 100 imágenes optimizadas', 'Formato WebP o AVIF + copia JPG', 'Nombres de archivo descriptivos', 'Informe de peso antes y después', 'En «Te lo montamos»: sustituimos hasta 10 imágenes en tu web'],
    campos: ['Cuántas imágenes son, más o menos', 'Formato deseado', 'Ancho máximo', 'Calidad (alta o equilibrada)'],
    noIncluye: ['Garantía de velocidad de carga', 'Retoque o edición de fotos', 'Sustituir más de 10 imágenes en la web'],
    muestra: 'optimizamos 2 de tus imágenes para que veas el resultado',
    ejemplo: 'Casa rural: 60 fotos de 5 MB sacadas con la cámara, convertidas a WebP de 1600 px listas para la galería.',
    repos: ['lovell/sharp'],
  },
  {
    slug: 'logo-vectorial', cat: 'identidad', nombre: 'Tu logo en vectorial y en todos los tamaños', p: [19, 49], plazo: '48 h',
    resumen: 'Tu logo limpio en SVG y en todos los formatos que te pedirán: web, redes, favicon, imprenta y fondo oscuro.',
    recibes: ['SVG optimizado', 'PNG en 6 tamaños', 'Favicon e icono de app', 'Versión en blanco para fondos oscuros'],
    campos: ['Logo actual (el mejor archivo que tengas)', 'Colores corporativos', 'Dónde lo vas a usar'],
    ejemplo: 'Peluquería con el logo solo en una foto del cartel: recibe el SVG, el favicon y la versión blanca para Instagram.',
    repos: ['svg/svgo'],
  },
  {
    slug: 'limpieza-csv', cat: 'documentos', nombre: 'Limpieza de listados de clientes y productos', p: [29, 69], plazo: '48 h',
    resumen: 'Ese Excel lleno de duplicados, mayúsculas mezcladas y teléfonos con formatos distintos, ordenado y listo para importar.',
    recibes: ['Archivo limpio sin duplicados exactos', 'Columnas unificadas (nombres, teléfonos, emails)', 'Informe de lo que se ha corregido', 'Formato listo para tu CRM o tienda'],
    campos: ['Archivo (Excel o CSV)', 'Columna que identifica cada registro', 'Columnas que quieres conservar', 'Programa al que lo vas a importar'],
    ejemplo: 'Autoescuela: 3 hojas de alumnos de distintos años unidas en una sola, sin repetidos, lista para el email de bienvenida.',
    repos: ['mholt/PapaParse'],
  },
  {
    slug: 'plantilla-inventario', cat: 'documentos', nombre: 'Plantilla de inventario a medida en Excel', p: [29, 69], plazo: '48 h',
    resumen: 'Un Excel con tus productos y categorías que avisa en rojo cuando algo baja del mínimo y calcula lo que vale tu stock.',
    recibes: ['Excel con tus productos y categorías', 'Alertas de stock mínimo', 'Valoración del inventario', 'Hoja de entradas y salidas'],
    campos: ['Categorías', 'Lista de productos', 'Stock mínimo de cada uno', 'Coste y precio de venta'],
    ejemplo: 'Bar de barrio: la hoja marca en rojo «tónica: quedan 6» antes de hacer el pedido del lunes.',
    repos: ['exceljs/exceljs'],
  },
  {
    slug: 'informe-graficos', cat: 'documentos', nombre: 'Informe con gráficos a partir de tu Excel', p: [29, 79], plazo: '48 h',
    resumen: 'Nos mandas tus datos de ventas, socios o visitas y recibes un PDF claro con gráficos listo para presentar.',
    recibes: ['PDF con hasta 10 gráficos', 'Resumen en una página', 'Plantilla para repetirlo cada mes'],
    campos: ['Archivo de datos', 'Qué quieres medir', 'Periodo', 'Logo y colores'],
    ejemplo: 'Asociación de vecinos: informe anual de cuotas y actividades para la asamblea, con logo y 6 gráficos.',
    repos: ['chartjs/Chart.js', 'Hopding/pdf-lib'],
  },
  {
    slug: 'dossier-comercial', cat: 'documentos', nombre: 'Dossier comercial en PDF con tu marca', p: [39, 99], plazo: '3 días',
    resumen: 'Un PDF de 4 páginas para mandar por email o WhatsApp: quién eres, qué ofreces, por qué tú y cómo contratarte.',
    recibes: ['PDF de 4 páginas con tu marca', 'Versión ligera para WhatsApp', 'Archivo editable para actualizar precios'],
    campos: ['Nombre comercial y logo', 'Servicios y precios', 'Por qué elegirte (3 razones)', 'Datos de contacto'],
    ejemplo: 'Fotógrafo de bodas: dossier con 3 packs, fotos de muestra y botón de WhatsApp para pedir fecha.',
    repos: ['Hopding/pdf-lib'],
  },
  {
    slug: 'diagramas-procesos', cat: 'documentos', nombre: 'Diagramas de procesos y organigramas', p: [29, 69], plazo: '48 h',
    resumen: 'Nos explicas cómo funciona tu proceso o tu equipo y te devolvemos diagramas claros en SVG, PNG y PDF.',
    recibes: ['Hasta 5 diagramas', 'Formatos SVG, PNG y PDF', 'Archivo de texto para editarlos tú'],
    campos: ['Pasos del proceso o personas del equipo', 'Decisiones o responsables', 'Orientación (horizontal / vertical)', 'Colores'],
    ejemplo: 'Clínica dental: el circuito del paciente, de la llamada a la factura, en un diagrama colgado en recepción.',
    repos: ['mermaid-js/mermaid'],
  },
  {
    slug: 'descripciones-producto-ia', cat: 'contenido', nombre: 'Descripciones de producto escritas con IA y revisadas', p: [29, 69], plazo: '48 h',
    resumen: 'Títulos y descripciones de venta para tu tienda, con tus palabras clave, revisados por una persona antes de entregarlos.',
    recibes: ['20 títulos y descripciones (ampliable)', 'Palabras clave para Google', 'Archivo CSV listo para importar', 'Guía de tono para las siguientes'],
    campos: ['Catálogo (nombre y características)', 'Público al que vendes', 'Tono (cercano, técnico, premium)', 'Palabras clave'],
    ejemplo: 'Tienda de té: «Rooibos vainilla 100 g · sin teína, para después de cenar» en lugar de «Té rojo 100g».',
    repos: [],
  },
  {
    slug: 'carruseles-redes', cat: 'contenido', nombre: 'Pack de carruseles para Instagram y LinkedIn', p: [39, 99], plazo: '3 días',
    resumen: 'Diez carruseles con tu marca generados desde tus textos, en PNG listos para subir y con la plantilla para repetir.',
    recibes: ['10 carruseles de 5–8 diapositivas', 'Plantilla con tus colores y tipografías', 'Textos de publicación sugeridos', 'Regeneración desde una hoja de cálculo'],
    campos: ['Temas o textos', 'Tono', 'Colores y logo', 'Red principal'],
    ejemplo: 'Nutricionista: «5 desayunos en 5 minutos», un carrusel por semana durante dos meses y medio.',
    repos: ['puppeteer/puppeteer'],
  },
  {
    slug: 'web-wordpress', cat: 'webs', nombre: 'Web WordPress de hasta 5 páginas', p: [249, 549], plazo: '5 días',
    resumen: 'Si prefieres WordPress: instalada en tu alojamiento, con tema ligero, tus páginas y formulario de contacto.',
    recibes: ['WordPress instalado en tu alojamiento web', 'Hasta 5 páginas con tus textos y fotos', 'Formulario de contacto', 'Copias de seguridad según lo que ofrezca tu alojamiento', 'Vídeo de 10 minutos para editarla tú'],
    campos: ['¿Tienes dominio y alojamiento? (si no, te recomendamos uno)', 'Textos de las páginas (hasta 5)', 'Textos legales (los aportas tú)', '¿Tienes logo y fotos? (te diremos cómo enviarlos)', 'Colores'],
    noIncluye: ['Dominio ni alojamiento (se contratan aparte)', 'Mantenimiento continuo', 'Blog', 'Redacción de textos legales'],
    extra: '**¿WordPress o la web corporativa?** La corporativa no necesita alojamiento de pago ni actualizaciones; WordPress te conviene si ya lo conoces o quieres editarla con su panel.',
    ejemplo: 'Academia de música: inicio, profesores, horarios, precios y contacto; la dueña cambia los horarios ella misma.',
    repos: ['WordPress/wordpress-develop'],
  },
  {
    slug: 'web-arrastrar-soltar', cat: 'portales', nombre: 'Web de 4 páginas que editas arrastrando bloques', p: [199, 449], plazo: '5 días',
    resumen: 'Tu web en un editor visual muy sencillo: cambias textos, fotos y secciones arrastrando, sin tocar código ni pagar cuota.',
    recibes: ['Editor visual instalado y configurado', 'Web inicial de 4 páginas con tus datos', 'Bloques de tu sector listos para usar', 'Formación de 30 minutos'],
    campos: ['Sector', 'Páginas que necesitas', 'Logo, colores y fotos', 'Dominio'],
    ejemplo: 'Tienda de muebles: monta ella misma la página de ofertas de enero arrastrando el bloque «producto destacado».',
    repos: ['microweber/microweber', 'frappe/builder', 'GrapesJS/grapesjs'],
  },
  {
    slug: 'plataforma-agencia', cat: 'portales', nombre: 'Plataforma para tu agencia: clientes, webs y CRM', p: [490, 990], plazo: '10 días',
    resumen: 'Para agencias y autónomos: un panel donde cada cliente tiene su web, su portal y su ficha en el CRM, con cobros automáticos.',
    recibes: ['Panel multi-cliente propio', 'Portal privado para cada cliente', 'CRM con fichas y tareas', 'Cobros recurrentes con Stripe (con tus claves)'],
    campos: ['Nombre de la agencia y logo', 'Servicios que vendes', 'Primeros clientes a dar de alta', 'Dominio'],
    ejemplo: 'Diseñadora freelance con 12 clientes: cada uno entra a su portal, ve facturas y pide cambios sin escribir al WhatsApp personal.',
    repos: ['SimplerDevelopment/SimplerDevelopment', 'directus-labs/agency-os'],
  },
];

export const paginas = [
  {
    slug: 'como-funciona', titulo: 'Cómo funciona', menu: 'header',
    md: `## Servicios digitales como barras de pan

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
`,
  },
  {
    slug: 'preguntas-frecuentes', titulo: 'Preguntas frecuentes', menu: 'footer',
    md: `## ¿De quién es la web o la automatización?
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
`,
  },
  {
    slug: 'herramientas-recomendadas', titulo: 'Herramientas recomendadas', menu: 'footer',
    md: `## Herramientas que usamos y recomendamos

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
`,
  },
  {
    slug: 'demos', titulo: 'Demos en vivo', corto: 'Demos', menu: 'header',
    md: `## Mira lo que recibes antes de comprar

Hay dos tipos. Las **demos interactivas** se pueden usar ya (editar una web, pedir de una carta…) con datos de ejemplo. Los **diseños de ejemplo** enseñan estilos: tu versión lleva tus textos, fotos y colores, en español.

DEMOS_LISTA

Con tus textos, fotos y colores queda así en 2-10 días. Contrátalo directamente o pruébalo gratis y paga solo si te gusta.

¿No ves tu caso? [Cuéntanos qué necesitas](/pages/contacto).
`,
  },
  {
    slug: 'contacto', titulo: 'Contacto', menu: 'footer',
    md: `## Habla con una persona

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
`,
  },
  {
    slug: 'aviso-legal', titulo: 'Aviso legal', menu: 'footer',
    md: `## Aviso legal

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
`,
  },
  {
    slug: 'condiciones', titulo: 'Condiciones de contratación', menu: 'footer',
    md: `## Condiciones de contratación

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
`,
  },
  {
    slug: 'privacidad', titulo: 'Privacidad', menu: 'footer',
    md: `## Política de privacidad

- **Responsable**: David Porto Díaz, hola@automatizasinhumo.com
- **Finalidad**: gestionar pedidos, entregar los servicios y responder consultas.
- **Base legal**: ejecución del contrato y consentimiento.
- **Conservación**: el tiempo necesario y los plazos legales de facturación.
- **Destinatarios**: proveedores necesarios para prestar el servicio (alojamiento en Cloudflare, pasarela de pago, email). No vendemos datos.
- **Derechos**: acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@automatizasinhumo.com. Puedes reclamar ante la AEPD (aepd.es).
`,
  },
  {
    slug: 'cookies', titulo: 'Cookies', menu: 'footer',
    md: `## Política de cookies

Este sitio solo usa **cookies técnicas** imprescindibles (carrito y sesión de tu cuenta). No usamos cookies de publicidad ni de seguimiento de terceros, por eso no te mostramos un banner de consentimiento.

Si en el futuro añadimos analítica, será sin cookies o con tu consentimiento previo.
`,
  },
];
