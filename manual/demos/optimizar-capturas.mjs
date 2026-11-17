// Recomprime las capturas de public/images/demos/*.png (PNG con paleta, máx. 1280 px
// de ancho). Mantiene los nombres, así no hay que tocar enlaces ni la base de datos.
// Uso: node manual/demos/optimizar-capturas.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../../public/images/demos/', import.meta.url));
let antes = 0, despues = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith('.png'))) {
  const ruta = dir + f;
  const orig = readFileSync(ruta);
  const nuevo = await sharp(orig)
    .resize({ width: 1280, withoutEnlargement: true })
    .png({ palette: true, quality: 82, effort: 10, compressionLevel: 9 })
    .toBuffer();
  antes += orig.length;
  if (nuevo.length < orig.length * 0.9) {
    writeFileSync(ruta, nuevo);
    despues += nuevo.length;
  } else despues += orig.length;
}
console.log(`Capturas: ${(antes / 1e6).toFixed(1)} MB → ${(despues / 1e6).toFixed(1)} MB`);
