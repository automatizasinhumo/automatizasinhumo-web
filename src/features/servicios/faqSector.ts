/** Preguntas frecuentes de las páginas por sector: visibles en la página y como FAQPage (mismo texto). */
export interface PreguntaSector {
  pregunta: string;
  respuesta: string;
}

export function preguntasSector(label: string): PreguntaSector[] {
  const quien = label.toLowerCase();
  return [
    {
      pregunta: `¿Cuánto tarda en estar lista una web para ${quien}?`,
      respuesta: 'La ves al momento: eliges un diseño, cambias nombre, textos y fotos, y la vista previa se actualiza mientras escribes.',
    },
    {
      pregunta: '¿Necesito saber de diseño o programación?',
      respuesta: 'No. Todo se hace desde el estudio rellenando campos o tocando directamente la parte de la web que quieres cambiar.',
    },
    {
      pregunta: '¿Y si no tengo fotos de mi negocio?',
      respuesta: 'Los diseños traen ilustraciones y composiciones pensadas para quedar bien sin fotos. Puedes añadir las tuyas cuando las tengas.',
    },
    {
      pregunta: '¿Puedo cambiar textos, precios y colores más adelante?',
      respuesta: 'Sí. Vuelves al estudio, cambias lo que necesites y la web se actualiza con los datos nuevos.',
    },
    {
      pregunta: '¿Se verá bien en el móvil?',
      respuesta: 'Sí. Todos los diseños se adaptan al móvil, a la tableta y al ordenador, con botones de llamada y contacto a mano.',
    },
    {
      pregunta: '¿Me ayudará a salir en Google?',
      respuesta: 'La web sale preparada con título, descripción y datos de tu negocio para los buscadores. Combinada con tu ficha de Google y tus opiniones, es lo que más ayuda a que te encuentren en tu zona.',
    },
  ];
}

export function faqJsonLd(preguntas: readonly PreguntaSector[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}
