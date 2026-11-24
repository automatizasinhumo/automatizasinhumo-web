/**
 * Deshacer / rehacer del estudio. Guarda instantáneas (no diferencias) porque el formulario ya sabe
 * volcarse entero desde un estado. Los cambios seguidos en menos de `agrupar` ms se funden en uno:
 * escribir una frase es un solo paso atrás, no uno por letra.
 * La clave decide si dos instantáneas son iguales; el valor se guarda tal cual (las fotos en data URL
 * se comparten por referencia entre instantáneas, no se copian).
 */
export class Historial<T> {
  private pila: { clave: string; valor: T; t: number }[] = [];
  private i = -1;

  constructor(
    private readonly clave: (v: T) => string,
    private readonly max = 40,
    private readonly agrupar = 1000,
  ) {}

  /** Anota el estado actual. Devuelve true si es un paso nuevo (o fundido con el anterior). */
  registrar(valor: T, ahora = Date.now()): boolean {
    const clave = this.clave(valor);
    const tope = this.pila[this.i];
    if (tope?.clave === clave) return false;
    // Lo que quedaba por rehacer deja de existir en cuanto se cambia algo.
    this.pila.length = this.i + 1;
    if (tope && this.i > 0 && ahora - tope.t < this.agrupar) this.pila[this.i] = { clave, valor, t: ahora };
    else {
      this.pila.push({ clave, valor, t: ahora });
      if (this.pila.length > this.max) this.pila.shift();
      this.i = this.pila.length - 1;
    }
    return true;
  }

  get puedeDeshacer() {
    return this.i > 0;
  }
  get puedeRehacer() {
    return this.i < this.pila.length - 1;
  }

  deshacer(): T | undefined {
    if (!this.puedeDeshacer) return undefined;
    return this.cerrar(--this.i);
  }
  rehacer(): T | undefined {
    if (!this.puedeRehacer) return undefined;
    return this.cerrar(++this.i);
  }
  /** Tras saltar en la pila, el siguiente cambio abre paso propio: no se funde con el destino. */
  private cerrar(i: number): T {
    const e = this.pila[i]!;
    e.t = -Infinity;
    return e.valor;
  }
}
