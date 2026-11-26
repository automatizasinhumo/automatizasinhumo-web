/** Piezas de portada que comparten los diseños de autor (ya escapadas). */
import type { ContextoDiseno } from './tipos';

/** Sector del negocio como antetítulo, o nada. */
export const sector = (c: ContextoDiseno) => (c.d.sector ? `<p class="w-sector">${c.esc(c.d.sector)}</p>` : '');

/** Lema bajo el título, o nada; `clase` añade clases propias del diseño. */
export const lema = (c: ContextoDiseno, clase = '') => (c.d.lema ? `<p class="w-lema${clase ? ` ${clase}` : ''}">${c.esc(c.d.lema)}</p>` : '');

/** La foto principal en su figura o, sin foto, lo que el diseño dibuja en su lugar. */
export const fotoO = (c: ContextoDiseno, sinFoto = '') => (c.foto ? `<figure class="w-cab-foto">${c.foto}</figure>` : c.ilustracion(sinFoto));
