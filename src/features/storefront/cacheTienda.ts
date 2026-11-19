/**
 * Ajustes y menús de la tienda guardados unos segundos en la memoria del isolate.
 *
 * El middleware los necesita en cada documento, también en los 404 de los bots y en
 * las páginas que pide la QA. En staging eran unas 29.000 lecturas al día de ~126 filas
 * (el 75 % del cupo gratuito de 5 M de filas leídas de D1: aviso del 19/11/2026).
 * Con la caché, cada isolate lee como mucho una vez por TTL.
 *
 * Coherencia: cualquier petición que no sea GET/HEAD vacía la caché del isolate que
 * la atiende (todas las escrituras del admin y del asistente de configuración pasan
 * por ahí), así que quien guarda ve su cambio en la siguiente página. Los demás
 * isolates lo ven en como mucho `TTL_MS`.
 */
export const TTL_MS = 60_000;

interface Entrada<T> {
  valor: Promise<T>;
  caduca: number;
}

let entrada: Entrada<unknown> | null = null;
/** Sube en cada vaciado: una carga iniciada antes no puede volver a guardar datos viejos. */
let generacion = 0;

/**
 * Devuelve el valor guardado o lo carga. Las peticiones concurrentes comparten la misma
 * promesa (una sola lectura de D1 en ráfagas); si la carga falla, se olvida para reintentar.
 */
export function conCache<T>(cargar: () => Promise<T>, ahora = Date.now()): Promise<T> {
  if (entrada && entrada.caduca > ahora) return entrada.valor as Promise<T>;
  const gen = generacion;
  const nueva: Entrada<T> = { valor: cargar(), caduca: ahora + TTL_MS };
  entrada = nueva;
  nueva.valor.catch(() => {
    if (entrada === nueva && generacion === gen) entrada = null;
  });
  return nueva.valor;
}

/** Vacía la caché (escrituras y tests) e invalida las cargas en curso. */
export function olvidarCacheTienda(): void {
  generacion++;
  entrada = null;
}

/** Métodos que nunca modifican datos y, por tanto, no vacían la caché. */
export function esLectura(metodo: string): boolean {
  return metodo === 'GET' || metodo === 'HEAD';
}
