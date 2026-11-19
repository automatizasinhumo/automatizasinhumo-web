/**
 * Parte de la descripción que describe la ficha y que, por tanto, se busca.
 *
 * Las fichas del catálogo comparten plantilla: después de «Qué recibes» vienen
 * «No incluye» («Tienda online», «Sistema de reservas»), «Ejemplo» («Pide cita…»),
 * los campos, el plazo y «Cómo funciona» («pagas…»). Indexar eso hacía que «tienda
 * online» o «que me paguen» casaran con fichas que dicen justo lo contrario. Se
 * corta en el primer «## No incluye». La migración 0047 aplica el mismo corte al
 * índice FTS: si cambia el marcador, hay que cambiar los dos.
 * Una descripción sin el marcador (fichas escritas a mano) se busca entera.
 */
export const MARCA_FIN_BUSCABLE = '\n## No incluye';

export function textoBuscable(description: string | null | undefined): string {
  if (!description) return '';
  const fin = description.indexOf(MARCA_FIN_BUSCABLE);
  return fin === -1 ? description : description.slice(0, fin);
}
