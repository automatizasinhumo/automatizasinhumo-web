// Traducciones al español de las demos (las plantillas MIT vienen en inglés).
// build-demos.mjs aplica cada par [original, español] a los .html y .js de la demo,
// y copia encima los ficheros de manual/demos/es/<slug>/ (p. ej. la carta en euros).
// Si una plantilla cambia y un texto ya no aparece, build-demos lo avisa.

const BODA = [
  ['lang="en"', 'lang="es"'],
  ['Alex &amp; Jordan · June 20, 2027', 'Lucía &amp; Marcos · 20 de junio de 2027'],
  ['Alex &amp; Jordan', 'Lucía &amp; Marcos'],
  ['>Our Story<', '>Nuestra historia<'],
  ['>Schedule<', '>Programa<'],
  ['>Travel<', '>Cómo llegar<'],
  ['>Registry<', '>Lista de bodas<'],
  ['View Registry', 'Ver lista de bodas'],
  ['>FAQ<', '>Preguntas<'],
  ['>RSVP<', '>Confirmar asistencia<'],
  ['Saturday, June 20, 2027 · Asheville, North Carolina', 'Sábado, 20 de junio de 2027 · Toledo'],
  ['4:30 PM', '17:30'], ['5:00 PM', '18:30'], ['6:00 PM', '20:00'],
  ['>Ceremony<', '>Ceremonia<'],
  ['>Cocktail Hour<', '>Cóctel<'],
  ['>Dinner &amp; Dancing<', '>Cena y baile<'],
  ['Kindly reply by May 1, 2027.', 'Por favor, confirma antes del 1 de mayo de 2027.'],
  ['Full name', 'Nombre y apellidos'],
  ['Will you attend?', '¿Vendrás?'],
  ['Joyfully accepts', '¡Allí estaré!'],
  ['Regretfully declines', 'No podré ir'],
  ['Number of guests', 'Número de personas'],
  ['Dietary needs', 'Alergias o dieta especial'],
  ['Send RSVP', 'Enviar confirmación'],
  ["We're getting married", 'Nos casamos'],
  ["We met on a rainy Tuesday at a used bookstore, both reaching for the last copy of the same novel. Five years, two apartments and one very spoiled dog later, we're saying yes.", 'Nos conocimos un martes de lluvia en una librería de viejo, los dos a por el último ejemplar de la misma novela. Cinco años, dos pisos y un perro muy mimado después, nos decimos que sí.'],
  ["Replace this text with your own story: how you met, the proposal, and what you're most excited to celebrate with everyone.", 'Aquí va vuestra historia: cómo os conocisteis, la pedida y lo que más ganas tenéis de celebrar con todos.'],
  ['The Schedule', 'El programa'],
  ['The Garden Terrace', 'Los jardines del cigarral'],
  ['123 Example Lane', 'Camino de ejemplo, 1'],
  ['Drinks and lawn games on the patio.', 'Bebidas y aperitivos en la terraza.'],
  ['The Main Hall. Send-off at 10:00 PM.', 'Salón principal. Fiesta hasta las 2:00.'],
  ['Hotel Block', 'Hotel con descuento'],
  ['Getting There', 'Cómo llegar'],
  ['The nearest airport is about 20 minutes away. A shuttle runs from the hotel at 4:00 PM.', 'Hay autobús desde la estación del AVE y desde el hotel a las 16:30.'],
  ['Example Inn. Mention "Lucía &amp; Marcos Wedding" for our group rate by May 20.', 'Hotel de ejemplo. Di «Boda Lucía y Marcos» para la tarifa de grupo antes del 20 de mayo.'],
  ["Your presence is the greatest gift. If you'd like to give something more, our registry is here.", 'Vuestra presencia es el mejor regalo. Si queréis tener un detalle, aquí está nuestra lista.'],
  ['>Questions<', '>Preguntas frecuentes<'],
  ['What should I wear?', '¿Cómo voy vestido?'],
  ['Garden formal. The ceremony is outdoors on grass, so skip the stilettos.', 'Formal de jardín. La ceremonia es al aire libre sobre césped: mejor sin tacón fino.'],
  ['Can I bring a plus-one?', '¿Puedo ir acompañado?'],
  ['If your invitation includes a guest, their name will be on it.', 'Si tu invitación incluye acompañante, verás su nombre en ella.'],
  ['Are kids welcome?', '¿Pueden venir niños?'],
  ['We love your little ones, but this will be an adults-only celebration.', 'Queremos mucho a vuestros peques, pero la celebración será solo para adultos.'],
  // Un sitio estático no recibe POST: en la demo la confirmación responde en la propia página.
  ['<form action="#" method="post">', `<form action="#rsvp" method="get" onsubmit="event.preventDefault();this.innerHTML='<p><b>¡Gracias!</b> En tu web real, esta respuesta llega a tu lista de invitados.</p>'">`],
];
// El crédito de la plantilla se mantiene (licencia MIT) pero sin el anuncio de terceros.
const credito = (n) => [[new RegExp(`Template: ${n} \\(free, MIT license\\)\\.[^<]*`), `Plantilla ${n} (licencia MIT), adaptada por Automatiza sin humo.`]];

export const TRADUCCIONES = {
  'boda-blush': [...BODA, ...credito('Blush Modern')],
  'boda-midnight': [...BODA, ...credito('Midnight Gold')],
  'boda-sage': [...BODA, ...credito('Sage Garden')],
  'carta-whatsapp': [
    ['lang="en"', 'lang="es"'],
    ['QuickMenu - Restaurant QR Menu & WhatsApp Order', 'Carta QR con pedido por WhatsApp'],
    ['Open For Orders', 'Abierto: pide ya'],
    ['Search burgers, pizzas, drinks...', 'Busca hamburguesas, pizzas, bebidas…'],
    ['Total Amount', 'Total'],
    ['0 PKR', '0 €'],
    ['View Basket', 'Ver pedido'],
    ['Your Food Basket', 'Tu pedido'],
    ['Your Full Name', 'Tu nombre'],
    ['e.g. Ali Ahmed', 'Ej.: Laura'],
    ['e.g. Table 4 OR House 12, Street 5, DHA Phase 6', 'Ej.: Mesa 4 o calle Mayor 12, 2.º B'],
    ['e.g. Extra spicy, no onions please', 'Ej.: sin cebolla, poco hecha'],
    ['Special Instructions (Optional)', 'Indicaciones (opcional)'],
    ['Items Subtotal', 'Subtotal'],
    ['Delivery Fee', 'Envío'],
    ['Grand Total', 'Total'],
    ['Digital QR Menu', 'Carta digital'],
    ['No dishes found matching your search.', 'No hay platos con esa búsqueda.'],
    ['<span>Add</span>', '<span>Añadir</span>'],
    ['POPULAR', 'MÁS PEDIDO'],
    ['Your basket is currently empty.', 'Aún no has añadido nada.'],
    ['Please add items to your basket first.', 'Añade algún plato antes de enviar el pedido.'],
    ['Please enter your Name and Address / Table Number before confirming.', 'Escribe tu nombre y la mesa o dirección antes de enviar.'],
    ['NEW ORDER', 'NUEVO PEDIDO'],
    ['Customer', 'Cliente'],
    ['Delivery / Table', 'Mesa / entrega'],
    ['Instructions', 'Indicaciones'],
    ['ORDER ITEMS', 'PEDIDO'],
    ['Ordered at', 'Hora del pedido'],
    ['Please confirm my order. Thank you!', '¿Me confirmáis el pedido? ¡Gracias!'],
  ],
};

// Aplica las traducciones de una demo a un texto; devuelve [texto, pares sin coincidencia].
export function traducir(slug, texto) {
  const pares = TRADUCCIONES[slug] ?? [];
  const usados = new Set();
  for (const [i, [de, a]] of pares.entries()) {
    const re = de instanceof RegExp ? new RegExp(de.source, 'g') : null;
    const antes = texto;
    texto = re ? texto.replace(re, a) : texto.split(de).join(a);
    if (texto !== antes) usados.add(i);
  }
  return [texto, usados];
}
