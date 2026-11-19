// Versiones WebP de las capturas de public/images/demos/*.png (1280 y 640 px de ancho).
// Se generan al cargar astro.config (dev y build) y no se suben al repositorio:
// siempre salen de la PNG actual. Solo rehace las que faltan o son más viejas que la PNG.
// Las sirve src/features/storefront/Captura.astro con <picture> y la PNG de respaldo.
import { readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ANCHOS = [640, 1280];
const dir = fileURLToPath(new URL('../public/images/demos/', import.meta.url));

export const rutaWebp = (base, ancho) => `${base}${ancho === 1280 ? '' : `-${ancho}`}.webp`;

export async function generarWebpCapturas() {
  if (!existsSync(dir)) return 0;
  const { default: sharp } = await import('sharp');
  let hechas = 0;
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.png'))) {
    const png = dir + f;
    const t = statSync(png).mtimeMs;
    for (const ancho of ANCHOS) {
      const out = rutaWebp(dir + f.slice(0, -4), ancho);
      if (existsSync(out) && statSync(out).mtimeMs >= t) continue;
      await sharp(png).resize({ width: ancho, withoutEnlargement: true }).webp({ quality: 75 }).toFile(out);
      hechas++;
    }
  }
  return hechas;
}
