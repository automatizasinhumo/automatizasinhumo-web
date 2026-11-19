/**
 * Fichero de clave de IndexNow (https://www.indexnow.org/documentation): el buscador
 * descarga https://<dominio>/<clave>.txt y comprueba que contiene la clave. El aviso lo
 * manda .github/workflows/indexnow.yml con bojieyang/indexnow-action; aquí solo se sirve
 * el fichero. La clave vive en el secreto INDEXNOW_KEY del Worker, no en el repositorio.
 */
const CLAVE_VALIDA = /^[A-Za-z0-9-]{8,128}$/; // formato que admite el protocolo

/** Contenido del fichero si `nombre` es exactamente la clave configurada; si no, null. */
export function ficheroClave(nombre: string | undefined, clave: string | undefined): string | null {
  if (!clave || !CLAVE_VALIDA.test(clave) || nombre !== clave) return null;
  return clave;
}
