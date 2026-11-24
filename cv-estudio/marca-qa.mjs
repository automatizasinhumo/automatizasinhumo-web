// QA de la marca de agua: pinta cada plantilla con datos de cliente (con marca) para revisar
// que la marca no pisa texto ni cabeceras de color. Uso: npm run construir && node marca-qa.mjs [carpeta]
// PLANTILLAS=a,b limita las plantillas; PDF=1 guarda también el PDF (para contar la marca con pypdf).
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { conMotor } from './motor-local.mjs';

const salida = process.argv[2] ?? path.join(process.cwd(), 'marca-qa');

await conMotor(async (p, errores) => {
  mkdirSync(salida, { recursive: true });
  const ids = process.env.PLANTILLAS?.split(',') ?? (await p.evaluate(() => window.CvEstudio.plantillas.map((t) => t.id)));
  for (const plantilla of ids) {
    const pdf = await p.evaluate(
      async ({ plantilla, ancho }) => {
        const E = window.CvEstudio;
        const datos = E.crearDatos(E.formEjemplo, plantilla);
        const blob = await E.crearPdf({ datos, plantilla, marcaAgua: 'VISTA PREVIA' });
        await E.pintarPdf(blob, document.getElementById('v'), { ancho, maxPaginas: 1 });
        const b = new Uint8Array(await blob.arrayBuffer());
        let s = '';
        for (const x of b) s += String.fromCharCode(x);
        return btoa(s);
      },
      { plantilla, ancho: 700 },
    );
    if (process.env.PDF) writeFileSync(path.join(salida, `${plantilla}.pdf`), Buffer.from(pdf, 'base64'));
    await p.locator('#v canvas').first().screenshot({ path: path.join(salida, `${plantilla}.png`) });
  }
  if (errores.length) throw new Error(`Errores en el navegador: ${errores.join(' | ')}`);
  console.log(`${ids.length} vistas con marca en ${salida}`);
});
