// Cómo se entrega cada producto. Lo usa gen-entregas.mjs para escribir
// manual/entregas/<slug>.md y para imprimir el prompt de un pedido.
//
// n:   nivel. A = un prompt, sin cuentas del cliente. B = prompt + algún acceso
//      del cliente. C = proyecto por fases.
// run: dónde vive lo entregado (siempre en opciones gratuitas).
// acc: accesos o cuentas que hay que pedir al cliente (además de sus campos).
// base: repo o demo de partida recomendado (si no, se usa el primero con licencia libre).
// nota: aviso específico para quien entrega.

const ESTATICA = 'Web estática en un Worker propio de Cloudflare (gratis)';
const D1 = 'Worker de Cloudflare + base de datos D1 (gratis hasta 5 GB)';
const N8N = 'Flujo de n8n o Worker programado (cron) en Cloudflare (gratis)';
const FICHERO = 'Archivo entregado por email o enlace de descarga (sin servidor)';
const TG = 'Bot de Telegram (token del cliente con @BotFather)';
const IA = 'Clave de IA del cliente (OpenAI, Gemini o Groq; Groq y Gemini tienen capa gratuita)';
const DOM = 'Acceso al DNS de su dominio, o usar el subdominio gratuito *.workers.dev';
const STRIPE = 'Cuenta de Stripe del cliente (la conecta él desde el panel)';
const GOOGLE = 'Acceso de editor a su Hoja de Google o Drive (comparte con tu email)';

export const ENTREGA = {
  // Webs
  'web-una-pagina': { n: 'A', run: ESTATICA, acc: [DOM], base: 'demo plantillas-eventos/landing-page-template o plantillas-negocio del sector' },
  'web-corporativa-5-secciones': { n: 'B', run: ESTATICA, acc: [DOM, 'Email donde llegan los contactos (formulario con aviso)'] },
  'web-inmobiliaria': { n: 'B', run: ESTATICA, acc: [DOM], base: 'arjoonarora/real-estate-website-template (demo inmobiliaria)' },
  'portfolio-editable': { n: 'A', run: 'Web estática + panel de edición (Pages CMS o Decap, gratis con GitHub)', acc: ['Cuenta gratuita de GitHub del cliente si quiere editar él'] },
  'web-blog-astro': { n: 'B', run: ESTATICA, acc: [DOM, 'Cuenta gratuita de GitHub para publicar artículos'] },
  'web-taller': { n: 'B', run: D1, acc: [DOM, 'Email donde recibir las citas'] },
  // Hostelería
  'carta-qr': { n: 'A', run: ESTATICA, acc: [], base: 'demo carta-whatsapp sin carrito, o plantillas-negocio/restaurant' },
  'carta-pedidos-whatsapp': { n: 'B', run: ESTATICA, acc: ['Número de WhatsApp que recibirá los pedidos'], base: 'Shahabuddin-mahar/whatsapp-restaurant-qr-menu (demo carta-whatsapp)' },
  'reservas-restaurante': { n: 'B', run: D1, acc: ['Email o Telegram para avisos de reserva'] },
  'asistente-ia-pedidos': { n: 'C', run: 'Worker de Cloudflare con bot de Telegram o chat web', acc: [IA, TG], base: 'tbxark/ChatGPT-Telegram-Workers' },
  // Reservas
  'pagina-citas': { n: 'B', run: D1, acc: ['Email de avisos', 'Opcional: Google Calendar para sincronizar'], base: 'CCCrafts/punctual' },
  'reservas-salon': { n: 'C', run: D1, acc: ['Email de avisos', 'Lista de profesionales con su horario'] },
  // Bodas y eventos
  'web-boda-rsvp': { n: 'A', run: ESTATICA, acc: ['Opcional: Telegram para recibir cada confirmación al momento'], base: 'demos boda-blush / boda-midnight / boda-sage (Poison675, MIT)' },
  'invitacion-digital': { n: 'A', run: ESTATICA, acc: [], base: 'demo boda-sage (Poison675, MIT)' },
  'galeria-privada-evento': { n: 'A', run: 'Galería estática con contraseña en un Worker; las fotos de invitados se suben a una carpeta de Google Drive del cliente', acc: ['Carpeta compartida (Drive) donde subir fotos'] },
  'gestion-invitados-mesas': {
    n: 'B', run: D1, acc: ['Excel o Google Sheet con la lista de invitados'],
    base: 'inonalfa/wedding-rsvp-seating (MIT, ya hecho para Cloudflare Workers + D1)',
    nota: 'El repo base está en hebreo y RTL: el prompt incluye traducir textos al español y cambiar la dirección a LTR. El plano de mesas sale en PDF desde el propio panel.',
  },
  // Identidad
  'tarjeta-digital': { n: 'A', run: ESTATICA, acc: [], base: 'plantilla propia (vCard + QR con investblog/qr-generator)', nota: 'No usar Kahaan83/digital-cards: está excluido.' },
  'link-in-bio': { n: 'A', run: ESTATICA, acc: [], base: 'demo plantillas-negocio/landing-pages/link-in-bio' },
  'cv-profesional': { n: 'A', run: ESTATICA, acc: [], base: 'demo plantillas-negocio/portfolio/resume-cv' },
  // Captación
  'muro-testimonios': { n: 'A', run: ESTATICA, acc: [], base: 'jhodges3401-code/kudoshelf-lite (demo testimonios)' },
  'formulario-aviso-telegram': { n: 'B', run: 'Worker de Cloudflare que reenvía el formulario', acc: [TG], base: 'investblog/contact-relay' },
  'lista-espera': { n: 'B', run: D1, acc: [DOM], base: 'Metareignity/waitlist-cloudflare' },
  'avisos-multicanal': { n: 'B', run: 'Worker de Cloudflare (webhooks)', acc: [TG, 'Accesos a las herramientas que mandan eventos'] },
  // Bots e IA
  'bot-telegram-chatgpt': { n: 'B', run: 'Worker de Cloudflare', acc: [TG, IA], base: 'tbxark/ChatGPT-Telegram-Workers' },
  'bot-telegram-medida': { n: 'C', run: 'Worker de Cloudflare (o aiogram en un servidor gratuito)', acc: [TG] },
  'crm-whatsapp': { n: 'C', run: 'Servidor del cliente o Worker + D1', acc: ['WhatsApp Business API (Meta) del cliente'] },
  'chat-ia-web': { n: 'B', run: 'Worker de Cloudflare + widget en su web', acc: [IA, 'Acceso para pegar el widget en su web'] },
  'transcripcion-audios': { n: 'B', run: 'Worker con Whisper de Workers AI (capa gratuita) o Groq', acc: [TG, 'Opcional: carpeta de Drive'] },
  // Automatizaciones
  'auto-captacion-leads': { n: 'B', run: N8N, acc: [GOOGLE, 'Email remitente (SMTP o Brevo gratis)', TG] },
  'auto-facturas': { n: 'B', run: N8N, acc: ['Acceso al buzón donde llegan las facturas (Gmail con OAuth)', GOOGLE, IA] },
  'auto-resenas': { n: 'B', run: N8N, acc: ['Ficha de Google Business (gestor)', TG] },
  'auto-plantilla-medida': { n: 'B', run: N8N, acc: ['Accesos a las herramientas implicadas (se guía al cliente)'] },
  'auto-tareas-programadas': { n: 'B', run: 'Cloudflare Workflows o Cron Trigger (gratis)', acc: ['Accesos al origen y destino de los datos'] },
  'certificados-automaticos': { n: 'B', run: 'Worker que genera PDF (pdfme) y los envía', acc: [GOOGLE, 'Email remitente (Brevo gratis)'] },
  // Enlaces, QR, analítica
  'acortador-enlaces': { n: 'B', run: 'Worker de Cloudflare + KV (Sink)', acc: [DOM], base: 'miantiao-me/Sink' },
  'qr-campanas': { n: 'A', run: FICHERO, acc: [], base: 'investblog/qr-generator' },
  'analitica-sin-cookies': { n: 'B', run: 'Cloudflare Web Analytics (gratis, sin cookies)', acc: ['Acceso para pegar un script en su web'] },
  'vigilancia-caidas': { n: 'B', run: 'Worker con Cron Trigger que comprueba las URLs', acc: [TG] },
  'vigilancia-precios': { n: 'B', run: 'Worker con Cron Trigger', acc: [TG] },
  'aviso-cambios-web': { n: 'B', run: 'Worker con Cron Trigger', acc: [TG] },
  // Tiendas
  'tienda-productos-digitales': { n: 'B', run: 'Minshop (esta misma tienda) en Workers + D1', acc: [STRIPE, DOM], base: 'ddyy/minshop' },
  'tienda-online': { n: 'C', run: 'Minshop (esta misma tienda) en Workers + D1', acc: [STRIPE, DOM, 'Datos legales del cliente'], base: 'ddyy/minshop' },
  'marketplace-plantillas': { n: 'C', run: 'Workers + D1', acc: [STRIPE, DOM] },
  // Portales
  'portal-cliente': { n: 'C', run: 'Directus o Worker + D1', acc: [DOM] },
  'web-editable-visual': { n: 'C', run: 'Editor GrapesJS/Puck sobre Workers', acc: [DOM] },
  'web-arrastrar-soltar': { n: 'C', run: 'Editor visual sobre Workers', acc: [DOM] },
  'web-wordpress': { n: 'C', run: 'Hosting del cliente (WordPress necesita PHP)', acc: ['Hosting y dominio del cliente'] },
  'plataforma-agencia': { n: 'C', run: 'Directus o Worker + D1', acc: [DOM] },
  'centro-ayuda': { n: 'B', run: 'Starlight (Astro) estático en Workers', acc: [DOM], base: 'withastro/starlight' },
  'pizarra-planos': { n: 'B', run: 'Excalidraw estático en Workers', acc: [DOM], base: 'excalidraw/excalidraw' },
  'web-multidioma': { n: 'B', run: 'Copia traducida de su web en Workers', acc: ['Acceso a su web o al código'] },
  // Documentos
  'facturas-presupuestos': { n: 'A', run: 'Invoify estático en Workers', acc: [], base: 'al1abb/invoify' },
  'etiquetas-codigo-barras': { n: 'A', run: FICHERO, acc: [] },
  'optimizar-imagenes': { n: 'A', run: FICHERO, acc: [] },
  'logo-vectorial': { n: 'A', run: FICHERO, acc: [] },
  'fotos-producto-fondo': { n: 'A', run: FICHERO, acc: [] },
  'limpieza-csv': { n: 'A', run: FICHERO, acc: [] },
  'plantilla-inventario': { n: 'A', run: FICHERO, acc: [] },
  'informe-graficos': { n: 'A', run: FICHERO, acc: [] },
  'dossier-comercial': { n: 'A', run: FICHERO, acc: [] },
  'diagramas-procesos': { n: 'A', run: FICHERO, acc: [] },
  'descripciones-producto-ia': { n: 'A', run: FICHERO, acc: [] },
  'firma-email': { n: 'A', run: FICHERO, acc: [] },
  'banner-cookies-rgpd': { n: 'A', run: 'Script de orestbida/cookieconsent para pegar en su web', acc: ['Acceso para pegar el script en su web'] },
  'auditoria-web': { n: 'A', run: 'Informe PDF con Lighthouse', acc: [] },
  // Contenido
  'carruseles-redes': { n: 'A', run: FICHERO, acc: [] },
  'newsletter-propia': { n: 'B', run: 'Brevo o MailerLite (capa gratuita) con formulario en su web', acc: ['Cuenta gratuita de Brevo o MailerLite del cliente', DOM] },
  'ficha-google': { n: 'B', run: 'Google Business Profile', acc: ['Acceso de gestor a su ficha de Google'] },
  // Planes mensuales
  'plan-mantenimiento-web': { n: 'B', run: 'Lo que ya tenga + revisión mensual de los empleados QA', acc: ['Accesos a su web'] },
  'plan-hosting-dominio': { n: 'B', run: 'Cloudflare Workers (gratis) + dominio a nombre del cliente', acc: [DOM] },
  'plan-automatizaciones': { n: 'B', run: N8N, acc: ['Accesos a sus herramientas'] },
};

export const NIVELES = {
  A: { nombre: 'Un prompt', tiempo: '5–15 min de tu tiempo; se entrega el mismo día' },
  B: { nombre: 'Prompt + accesos del cliente', tiempo: '30–90 min de tu tiempo, casi todo esperando al cliente' },
  C: { nombre: 'Proyecto por fases', tiempo: '1–3 días de trabajo' },
};
