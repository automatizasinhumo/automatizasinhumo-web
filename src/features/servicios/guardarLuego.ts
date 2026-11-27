/**
 * «Guardar y seguir luego» del estudio web (ronda GPT 39): tras unos campos y un rato, la vista
 * previa ofrece guardar el borrador con el correo. Sin cuenta y sin frenar: el formulario no
 * tapa nada y se puede cerrar. Una vez guardado, los cambios se suben solos al mismo borrador
 * (PUT con el token del enlace), así el enlace del correo abre siempre lo último.
 */
import type { DatosWeb } from './webs';

export const CLAVE_SEGUIR = 'servicios:web:seguir';
const CLAVE_CERRADO = 'servicios:web:guardar-cerrado';
export const MIN_CAMPOS = 3;
export const MIN_MS = 60_000;
const RELLENABLES = ['negocio', 'sector', 'lema', 'sobre', 'foto', 'telefono', 'whatsapp', 'email', 'direccion', 'horario', 'zonas'] as const;

export function camposRellenos(d: Partial<DatosWeb>): number {
  const r = d as Record<string, unknown>;
  return RELLENABLES.filter((k) => typeof r[k] === 'string' && (r[k] as string).trim()).length;
}

/** Cuándo se ofrece: con algo que ya merece guardarse, tras un rato y si no se ha guardado ni cerrado. */
export function debeOfrecer(rellenos: number, msDesdeInicio: number, guardado: boolean, cerrado: boolean, pagado: boolean): boolean {
  return !guardado && !cerrado && !pagado && rellenos >= MIN_CAMPOS && msDesdeInicio >= MIN_MS;
}

const leerLocal = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const escribirLocal = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* sin almacenamiento: el enlace del correo sigue valiendo */
  }
};

export interface GuardarLuego {
  /** Llamar tras cada cambio guardado en el dispositivo. */
  cambio(): void;
  /** Token del enlace (al restaurar desde el correo, para seguir subiendo los cambios). */
  usar(token: string): void;
}

export function iniciarGuardarLuego(caja: HTMLFormElement | null, datos: () => DatosWeb, pagado: () => boolean): GuardarLuego {
  const inicio = Date.now();
  let token = leerLocal(CLAVE_SEGUIR);
  let temporizador = 0;
  let reloj = 0;
  const estado = caja?.querySelector<HTMLElement>('[data-guardar-estado]');

  // Una subida cada vez: si hay cambios mientras va una, se manda otra al acabar (lo último gana).
  let enCurso = false;
  let pendiente = false;
  let fallos = 0;
  const programarSubida = (ms: number) => {
    window.clearTimeout(temporizador);
    temporizador = window.setTimeout(subir, ms);
  };
  function subir(): void {
    if (!token || pagado()) return;
    if (enCurso) return void (pendiente = true);
    const t = token;
    enCurso = true;
    pendiente = false;
    void fetch('/api/web/borrador', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token: t, datos: datos() }), keepalive: true })
      .then((r) => {
        // Enlace caducado o borrador borrado: se deja de subir y se puede volver a guardar.
        // Solo si sigue siendo el token de esta subida (no uno restaurado entre medias).
        if (r.status === 404 && token === t) {
          token = null;
          try {
            localStorage.removeItem(CLAVE_SEGUIR);
          } catch {
            /* nada */
          }
        }
        if (r.status >= 500 || r.status === 429) throw new Error('reintentar');
        fallos = 0;
      })
      .catch(() => {
        // Fallo pasajero: se reintenta con espera creciente (los cambios siguen en el dispositivo).
        if (fallos < 5) pendiente = true;
        fallos++;
      })
      .finally(() => {
        enCurso = false;
        if (pendiente) programarSubida(fallos ? 5000 * fallos : 0);
      });
  }

  const quizaOfrecer = () => {
    if (!caja || !caja.hidden) return;
    const ms = Date.now() - inicio;
    if (debeOfrecer(camposRellenos(datos()), ms, !!token, leerLocal(CLAVE_CERRADO) === '1', pagado())) {
      caja.hidden = false;
      return;
    }
    // Aún no ha pasado el minuto: se vuelve a mirar cuando toque, aunque no escriba más.
    if (!token && ms < MIN_MS && !reloj) reloj = window.setTimeout(() => ((reloj = 0), quizaOfrecer()), MIN_MS - ms + 50);
  };

  caja?.querySelector('[data-guardar-cerrar]')?.addEventListener('click', () => {
    caja.hidden = true;
    escribirLocal(CLAVE_CERRADO, '1');
  });

  caja?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const boton = caja.querySelector<HTMLButtonElement>('button[type="submit"]');
    const email = caja.querySelector<HTMLInputElement>('input[name="guardar-email"]');
    const avisos = caja.querySelector<HTMLInputElement>('input[name="guardar-avisos"]');
    if (!email?.checkValidity()) return void email?.reportValidity();
    if (boton) boton.disabled = true;
    if (estado) estado.textContent = 'Guardando…';
    try {
      const enviado = JSON.stringify(datos());
      const r = await fetch('/api/web/borrador', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ datos: JSON.parse(enviado), email: email.value, avisos: !!avisos?.checked }),
      });
      const j = (await r.json().catch(() => null)) as { ok?: boolean; token?: string; error?: string } | null;
      if (!r.ok || !j?.ok || !j.token) {
        if (estado)
          estado.textContent =
            j?.error === 'email' ? 'Revisa el correo.' : j?.error === 'grande' ? 'Las fotos pesan demasiado: quita alguna y vuelve a probar.' : j?.error === 'limite' ? 'Ya has guardado varias hoy con este correo: usa el último enlace que te mandamos.' : j?.error === 'negocio' ? 'Escribe primero el nombre del negocio.' : 'No hemos podido guardarla. Inténtalo en un momento.';
        return;
      }
      token = j.token;
      escribirLocal(CLAVE_SEGUIR, j.token);
      // Lo que se escribió mientras se guardaba también sube.
      if (JSON.stringify(datos()) !== enviado) programarSubida(0);
      caja.replaceChildren(Object.assign(document.createElement('p'), { className: 'guardar-hecho', textContent: `Guardada. Te hemos mandado el enlace a ${email.value} para seguir desde cualquier dispositivo.` }));
    } catch {
      if (estado) estado.textContent = 'No hemos podido guardarla. Inténtalo en un momento.';
    } finally {
      if (boton) boton.disabled = false;
    }
  });

  return {
    cambio() {
      quizaOfrecer();
      if (!token) return;
      fallos = 0; // una edición nueva vuelve a tener sus reintentos
      programarSubida(4000);
    },
    usar(t: string) {
      token = t;
      escribirLocal(CLAVE_SEGUIR, t);
      if (caja) caja.hidden = true;
    },
  };
}

/** Datos del borrador del enlace «Sigue donde lo dejaste», o null si caducó. */
export async function leerBorradorDelEnlace(token: string): Promise<DatosWeb | null> {
  try {
    const r = await fetch(`/api/web/borrador?t=${encodeURIComponent(token)}`, { headers: { accept: 'application/json' } });
    const j = (await r.json().catch(() => null)) as { ok?: boolean; datos?: DatosWeb } | null;
    return r.ok && j?.ok && j.datos ? j.datos : null;
  } catch {
    return null;
  }
}
