// Genera las miniaturas de la galería del estudio de CV (public/cv/estudio/miniaturas/)
// con el propio motor y el CV de ejemplo: así la galería pinta al momento sin cargar el
// motor y las miniaturas son exactamente lo que el cliente va a obtener.
// Uso: npm run construir && npm run miniaturas
import { mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { ANCHO, PERSONALIZABLE, conMotor, publico } from './motor-local.mjs';

const salida = path.join(publico, 'cv/estudio/miniaturas');

await conMotor(async (p, errores) => {
  rmSync(salida, { recursive: true, force: true });
  mkdirSync(salida, { recursive: true });

  const ids = await p.evaluate(() => window.CvEstudio.plantillas.map((t) => t.id));
  const trabajos = [...ids.map((id) => ({ nombre: id, plantilla: id })), { nombre: 'personalizable', ...PERSONALIZABLE }];
  for (const t of trabajos) {
    await p.evaluate(
      async ({ plantilla, color, decoracion, ancho }) => {
        const E = window.CvEstudio;
        const blob = await E.crearPdf({ datos: null, muestra: true, plantilla, color, decoracion });
        await E.pintarPdf(blob, document.getElementById('v'), { ancho, maxPaginas: 1 });
      },
      { ...t, ancho: ANCHO },
    );
    await p.locator('#v canvas').first().screenshot({ path: path.join(salida, `${t.nombre}.jpg`), type: 'jpeg', quality: 80 });
  }
  if (errores.length) throw new Error(`Errores en el navegador:\n${errores.join('\n')}`);
  console.log(`${trabajos.length} miniaturas en public/cv/estudio/miniaturas/`);
});
