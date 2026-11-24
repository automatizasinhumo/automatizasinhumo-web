// Contrato de diseño: lo que el sistema promete en TODAS las páginas, medido en un navegador.
// Una página nueva no se revisa a mano: si cumple esto, hereda el diseño bien.
//  1. Sin desborde horizontal a 320, 390, 768, 1366 y 1920 px.
//  2. El h1 de cada página (menos la portada, .h1-portada) mide lo mismo que en las demás.
//  3. El contenido de cada página empieza en la misma columna (alineación entre páginas).
//  4. Ningún enlace o botón fuera de un párrafo mide menos de 24 px (WCAG 2.5.8) y los
//     controles de la cabecera y el pie llegan a 40 px.
// uso: node qa/contrato-diseno.mjs <base> [ruta ...]
import { chromium } from 'playwright';

const [base, ...rutasArg] = process.argv.slice(2);
if (!base) {
  console.error('uso: node qa/contrato-diseno.mjs <base> [ruta ...]');
  process.exit(2);
}
const RUTAS = rutasArg.length ? rutasArg : ['/', '/servicios', '/elige', '/products', '/blog', '/servicios/web'];
const ANCHOS = [320, 390, 768, 1366, 1920];
const TOLERANCIA = 2; // px

const fallos = [];
const h1PorAncho = new Map(); // ancho -> Map(ruta -> tamaño)
const columnaPorAncho = new Map();

const br = await chromium.launch();
try {
  for (const ancho of ANCHOS) {
    const pg = await br.newPage({ viewport: { width: ancho, height: 900 }, locale: 'es-ES', reducedMotion: 'reduce' });
    // La guía Driver.js es un popover fijo que no mide el diseño; se apaga como haría el visitante.
    await pg.addInitScript(() => localStorage.setItem('ash:guias', 'no'));
    for (const ruta of RUTAS) {
      const res = await pg.goto(base + ruta, { waitUntil: 'load', timeout: 45000 }).catch(() => null);
      if (!res || res.status() >= 400) {
        fallos.push(`${ruta} @${ancho}: no carga (${res ? res.status() : 'sin respuesta'})`);
        continue;
      }
      const m = await pg.evaluate(() => {
        const visible = (e) => {
          const r = e.getBoundingClientRect();
          const s = getComputedStyle(e);
          return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none';
        };
        const h1 = document.querySelector('main h1');
        // Contenedor centrado de la página: el primer descendiente de main (siguiendo al primer hijo)
        // más estrecho que la ventana. Su borde izquierdo es la columna de contenido.
        const contenedor = () => {
          if (!h1 || h1.classList.contains('h1-portada')) return null;
          const interior = (e) => Math.round(e.getBoundingClientRect().left + parseFloat(getComputedStyle(e).paddingLeft));
          let e = document.querySelector('main');
          for (let i = 0; i < 6 && e; i++) {
            const r = e.getBoundingClientRect();
            if (r.width < innerWidth - 1 || getComputedStyle(e).paddingLeft !== '0px') return interior(e);
            e = e.firstElementChild;
          }
          return 0;
        };
        const pequenos = [...document.querySelectorAll('a[href], button, summary')]
          .filter(visible)
          .filter((e) => !e.closest('p, li > p, [data-permite-pequeno]') || e.matches('button, summary'))
          .filter((e) => !e.closest('.sr-only, [aria-hidden="true"]'))
          // Enlace «estirado»: su ::after cubre la tarjeta entera, que es la zona que se pulsa.
          .filter((e) => { const a = getComputedStyle(e, '::after'); return !(a.position === 'absolute' && parseFloat(a.height) >= 40); })
          .map((e) => ({ t: (e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30), h: Math.round(e.getBoundingClientRect().height), w: Math.round(e.getBoundingClientRect().width), pie: !!e.closest('footer, header') }))
          .filter((x) => x.h < 24 || x.w < 24 || (x.pie && x.h < 40));
        return {
          desborde: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          h1: h1 && !h1.classList.contains('h1-portada') ? parseFloat(getComputedStyle(h1).fontSize) : null,
          columna: contenedor(),
          pequenos: pequenos.slice(0, 6),
        };
      });
      if (m.desborde > TOLERANCIA) fallos.push(`${ruta} @${ancho}: desborde horizontal de ${m.desborde}px`);
      for (const p of m.pequenos) fallos.push(`${ruta} @${ancho}: control pequeño «${p.t}» ${p.w}×${p.h}px`);
      if (m.h1 != null) {
        if (!h1PorAncho.has(ancho)) h1PorAncho.set(ancho, new Map());
        h1PorAncho.get(ancho).set(ruta, m.h1);
      }
      if (m.columna != null) {
        if (!columnaPorAncho.has(ancho)) columnaPorAncho.set(ancho, new Map());
        columnaPorAncho.get(ancho).set(ruta, m.columna);
      }
    }
    await pg.close();
  }
} finally {
  await br.close();
}

function dispersion(mapa, nombre) {
  for (const [ancho, porRuta] of mapa) {
    const vals = [...porRuta.values()];
    if (vals.length < 2) continue;
    if (Math.max(...vals) - Math.min(...vals) > TOLERANCIA) {
      fallos.push(`${nombre} @${ancho}: no coincide entre páginas → ${[...porRuta].map(([r, v]) => `${r}=${v}`).join(' ')}`);
    }
  }
}
dispersion(h1PorAncho, 'tamaño del h1');
dispersion(columnaPorAncho, 'columna de contenido');

if (fallos.length) {
  console.error(`contrato-diseno: ${fallos.length} fallo(s)\n- ` + [...new Set(fallos)].join('\n- '));
  process.exit(1);
}
console.log(`contrato-diseno: ok (${RUTAS.length} páginas × ${ANCHOS.length} anchos)`);
