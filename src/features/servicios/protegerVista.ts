/**
 * Protección disuasoria de las vistas previas de pago (CV y, después, webs).
 * No es infalible —nada en el navegador lo es—: el PDF o la web sin marca de agua solo se
 * entregan tras la compra. Esto encarece el pantallazo para que no compense:
 *  - la vista es un canvas (sin texto que copiar) con marca de agua en cintas por los bordes (no tapa el texto), a resolución de pantalla;
 *  - sin menú contextual ni arrastrar para «guardar imagen»;
 *  - se desenfoca cuando la pestaña o la ventana pierden el foco (Win+Mayús+S, recortes, cambio de app)
 *    y al pulsar Impr Pant; al imprimir no sale (CSS `@media print` del tema).
 * El estado vive en `data-protegida` para que el CSS del tema decida cómo se ve.
 */
export const ANCHO_MAX_VISTA = 900;

export function protegerVista(el: HTMLElement): () => void {
  const ocultar = () => el.setAttribute('data-protegida', 'oculta');
  const mostrar = () => el.setAttribute('data-protegida', '');
  // Solo se vuelve a ver con la pestaña visible y la ventana con foco: si tras Impr Pant
  // el usuario cambia de app, sigue desenfocada hasta que vuelva (evento `focus`).
  const restaurar = () => (!document.hidden && document.hasFocus() ? mostrar() : ocultar());
  const bloquear = (ev: Event) => ev.preventDefault();
  const tecla = (ev: KeyboardEvent) => {
    if (ev.key === 'PrintScreen' || (ev.key.toLowerCase() === 's' && ev.shiftKey && (ev.metaKey || ev.ctrlKey))) {
      ocultar();
      window.setTimeout(restaurar, 1500);
    }
  };
  const visibilidad = () => (document.hidden ? ocultar() : restaurar());

  mostrar();
  el.addEventListener('contextmenu', bloquear);
  el.addEventListener('dragstart', bloquear);
  window.addEventListener('blur', ocultar);
  window.addEventListener('focus', mostrar);
  document.addEventListener('visibilitychange', visibilidad);
  document.addEventListener('keyup', tecla);
  document.addEventListener('keydown', tecla);
  return () => {
    el.removeEventListener('contextmenu', bloquear);
    el.removeEventListener('dragstart', bloquear);
    window.removeEventListener('blur', ocultar);
    window.removeEventListener('focus', mostrar);
    document.removeEventListener('visibilitychange', visibilidad);
    document.removeEventListener('keyup', tecla);
    document.removeEventListener('keydown', tecla);
  };
}
