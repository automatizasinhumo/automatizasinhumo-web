/**
 * Catálogo de diseños de autor. Cada uno vive en su fichero (portada, ilustración y CSS propios);
 * aquí se reúnen y se añade lo común a todos: barra de navegación fija y aparición al hacer scroll.
 */
import { agenda } from './agenda';
import { bistro } from './bistro';
import { brillo } from './brillo';
import { petalo } from './petalo';
import { carta } from './carta';
import { cuaderno } from './cuaderno';
import { escaparate } from './escaparate';
import { fotograma } from './fotograma';
import { herbario } from './herbario';
import { lamina } from './lamina';
import { matricula } from './matricula';
import { sonrisa } from './sonrisa';
import { hornada } from './hornada';
import { posada } from './posada';
import { causa } from './causa';
import { charla } from './charla';
import { plano } from './plano';
import { sillon } from './sillon';
import { grua } from './grua';
import { indice } from './indice';
import { expediente } from './expediente';
import { navaja } from './navaja';
import { postal } from './postal';
import { pulso } from './pulso';
import { serena } from './serena';
import type { Diseno } from './tipos';
import { urgente } from './urgente';
import { vinetas } from './vinetas';

export type { ContextoDiseno, Diseno, IconoWeb } from './tipos';
export { cssFuentes, FUENTES_WEB } from './fuentes';
export { ilustracionSector } from './sectorIlus';

export const DISENOS: readonly Diseno[] = [agenda, urgente, bistro, serena, pulso, indice, navaja, expediente, vinetas, postal, carta, cuaderno, fotograma, escaparate, herbario, lamina, matricula, sonrisa, hornada, brillo, petalo, posada, causa, charla, plano, sillon, grua];

export const disenoWeb = (id: string): Diseno | undefined => DISENOS.find((x) => x.id === id);

/**
 * Común: barra superior fija con la marca, anclas y la acción principal; aparición suave de las
 * secciones (solo transform, nunca opacidad: así las capturas y el contraste no dependen del scroll)
 * y nada de movimiento si el usuario lo pide.
 */
const COMUN = `
.w-d .w-nav{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--w-fondo) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--w-borde)}
.w-d .w-nav-in{display:flex;align-items:center;gap:18px;min-height:60px}
.w-d .w-nav-marca{font:inherit;font-family:var(--w-ft-titulo);font-size:1.15rem;font-weight:600;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.w-d .w-nav ul{display:none;list-style:none;margin:0 0 0 auto;padding:0;gap:22px}
.w-d .w-nav ul a{text-decoration:none;font-size:.92rem;font-weight:500;opacity:.85}
.w-d .w-nav ul a:hover{opacity:1;text-decoration:underline;text-underline-offset:5px}
.w-d .w-nav .w-boton{margin-left:auto;min-height:40px;padding:6px 16px;font-size:.9rem}
.w-d .w-nav ul+.w-boton{margin-left:0}
.w-d .w-cab h1{hyphens:auto}
.w-d .w-ilus{display:block;width:100%;height:auto}
.w-d .w-cab-foto img{display:block}
@container (min-width:760px){.w-d .w-nav ul{display:flex}}
@container (max-width:640px){.w-d .w-nav .w-boton{display:none}}
`;

export const CSS_DISENOS_COMUN = COMUN.replace(/\n\s*/g, '');
export const CSS_DISENOS = (COMUN + DISENOS.map((x) => x.css).join('')).replace(/\n\s*/g, '');
