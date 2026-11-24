// Id público estable: sale del tipo y de una clave única (slug…), no del azar. Así
// regenerar el seed solo cambia lo que cambia en catalogo.mjs y los ids no bailan.
// Lo comparten gen-sql.mjs y gen-update.mjs.
import { createHash } from 'node:crypto';

const ALPHA = '0123456789abcdefghjkmnpqrstvwxyz';
export const pid = (p, clave) => {
  const h = createHash('sha256').update(`${p}:${clave}`).digest();
  return `${p}_${Array.from({ length: 10 }, (_, i) => ALPHA[h[i] % 32]).join('')}`;
};
