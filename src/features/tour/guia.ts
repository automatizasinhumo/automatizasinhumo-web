/**
 * Guías con ventanitas para toda la web (Driver.js, MIT). Salen solas: cada pantalla o paso
 * enseña su guía la primera vez (localStorage), corta (≤ MAX_AUTO pasos) y nunca encima de
 * alguien que ya está escribiendo. Una guía cerrada no se repite sola (24/11, datos de tours
 * 2025-2026: 1-2 pasos acaban el 73 %, 6-8 el 25 %); la completa sigue en el botón «Guía».
 * Cada ventanita trae la X y «No volver a mostrar», que las apaga en todas las páginas
 * (localStorage). El botón «Guía» de cada página la abre siempre y vuelve a encenderlas.
 */
import type { DriveStep } from 'driver.js';
import './guia.css';
import { CLAVE_GUIAS as APAGADAS, MAX_AUTO_GUIA, VISTA_GUIA as VISTA } from '../../data/tour';

export interface PasoGuia {
  /** Valor del atributo `data-guia` (o el que diga `atributo`) del bloque que explica. */
  guia: string;
  titulo: string;
  texto: string;
}

const leer = (s: Storage | undefined, k: string) => {
  try {
    return s?.getItem(k) ?? null;
  } catch {
    return null;
  }
};
const escribir = (s: Storage | undefined, k: string, v: string | null) => {
  try {
    if (v === null) s?.removeItem(k);
    else s?.setItem(k, v);
  } catch {
    /* modo privado: la guía volverá a salir, que es lo seguro */
  }
};
// Con el almacenamiento bloqueado, solo leer localStorage ya lanza SecurityError.
const almacen = (k: 'localStorage' | 'sessionStorage'): Storage | undefined => {
  try {
    return typeof globalThis[k] === 'undefined' ? undefined : globalThis[k];
  } catch {
    return undefined;
  }
};
const local = () => almacen('localStorage');
const sesion = () => almacen('sessionStorage');

/** Pasos que salen solos; el resto, con el botón «Guía». */
export const MAX_AUTO = MAX_AUTO_GUIA;

/**
 * Qué pasos enseñar. Sola (`auto`): ninguno si las guías están apagadas, si esa pantalla ya la
 * enseñó o si el usuario está escribiendo; si no, los MAX_AUTO primeros. Pedida: todos.
 */
export function pasosAMostrar<T>(pasos: readonly T[], { auto, apagadas, vista, escribiendo }: { auto: boolean; apagadas: boolean; vista: boolean; escribiendo: boolean }): readonly T[] {
  if (!auto) return pasos;
  if (apagadas || vista || escribiendo) return [];
  return pasos.slice(0, MAX_AUTO);
}

const escribiendo = () => {
  const el = typeof document === 'undefined' ? null : document.activeElement;
  return !!el && (el.matches('input:not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]), textarea, select') || (el as HTMLElement).isContentEditable);
};

export const guiasApagadas = () => leer(local(), APAGADAS) === 'no';
export const apagarGuias = () => escribir(local(), APAGADAS, 'no');
export const encenderGuias = () => escribir(local(), APAGADAS, null);

const visible = (el: Element | null): el is HTMLElement =>
  el instanceof HTMLElement && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

let abierta: { destroy(): void } | null = null;
/** Sube con cada apertura: si el usuario cambia de paso mientras carga Driver.js, la vieja se descarta. */
let turno = 0;

/**
 * Abre la guía. `clave` identifica la pantalla o paso: con `auto`, solo sale si las guías no
 * están apagadas y esa clave no se ha enseñado ya en esta visita.
 */
export async function guiar(
  pasos: readonly PasoGuia[],
  { raiz, atributo = 'data-guia', clave, auto = false }: { raiz?: Document | HTMLElement | null; atributo?: string; clave: string; auto?: boolean },
): Promise<boolean> {
  // Las ya vistas de antes (sessionStorage) también cuentan: nadie la ve dos veces por el cambio.
  const antigua = !leer(local(), VISTA + clave) && !!leer(sesion(), VISTA + clave);
  if (antigua) escribir(local(), VISTA + clave, '1'); // la marca de antes pasa a ser permanente
  const vista = antigua || !!leer(local(), VISTA + clave);
  const elegidos = pasosAMostrar(pasos, { auto, apagadas: guiasApagadas(), vista, escribiendo: escribiendo() });
  if (!elegidos.length) return false;
  if (!auto) encenderGuias();
  const seleccion: DriveStep[] = elegidos.flatMap((p) => {
    const el = (raiz ?? document).querySelector(`[${atributo}="${p.guia}"]`);
    return visible(el) ? [{ element: el, popover: { title: p.titulo, description: p.texto } }] : [];
  });
  if (!seleccion.length) return false;
  const mio = ++turno;
  const { driver } = await import('driver.js');
  await import('driver.js/dist/driver.css');
  // Otra guía se pidió mientras cargaba, o el paso ya no está a la vista: esta llega tarde.
  // Sola, tampoco si mientras cargaba se puso a escribir, otra pestaña ya la enseñó o las apagaron.
  const yaNo = () => escribiendo() || !!leer(local(), VISTA + clave) || guiasApagadas();
  if (mio !== turno || (auto && yaNo()) || !seleccion.every((s) => visible(s.element as Element))) return false;
  abierta?.destroy();
  const previo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const d = driver({
    steps: seleccion,
    showProgress: seleccion.length > 1,
    progressText: '{{current}} de {{total}}',
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Entendido',
    closeBtnLabel: 'Cerrar la guía',
    popoverClass: 'tour-ash',
    animate: !quieto,
    smoothScroll: !quieto,
    allowKeyboardControl: true,
    onPopoverRender: (popover) => {
      const no = document.createElement('button');
      no.type = 'button';
      no.className = 'guia-no-mostrar';
      no.textContent = 'No volver a mostrar';
      no.addEventListener('click', () => {
        apagarGuias();
        d.destroy();
      });
      // insertBefore y no prepend: los tipos de Workers redefinen Element.prepend.
      popover.footer.insertBefore(no, popover.footer.firstChild);
    },
    onDestroyed: () => {
      abierta = null;
      (previo && previo.isConnected ? previo : null)?.focus({ preventScroll: true });
    },
  });
  abierta = d;
  d.drive();
  escribir(local(), VISTA + clave, '1'); // solo cuenta como vista si de verdad se abrió
  return true;
}
