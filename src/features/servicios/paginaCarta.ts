/**
 * Página pública de la carta (/w/<slug>/carta) y cartel A5 con su QR para las mesas. HTML
 * propio, sin JavaScript ni recursos externos, que se imprime bien. Base: ronda 37 de GPT.
 */
import { renderSVG } from 'uqr';
import { ALERGENOS, DIETAS, precioNumero, seccionesCarta, type IdAlergeno } from './cartaWeb';
import { acentoSobre, esc, sobreAcento, type DatosWeb } from './webs';

/** Iconos propios (trazo 24×24) para los 14 alérgenos: van junto al nombre, nunca solos. */
const ICONOS: Record<IdAlergeno, string> = {
  gluten: '<path d="M12 22V3M12 8C8 8 7 5 7 4c3 0 5 2 5 4ZM12 13c4 0 5-3 5-4-3 0-5 2-5 4ZM12 18c-4 0-5-3-5-4 3 0 5 2 5 4Z"/>',
  crustaceos: '<path d="M4 13c3-6 13-7 16-1-2 6-13 7-16 1ZM6 12 3 8m5 3 1-5m4 5 3-5m3 6 3-3M7 16l-3 4m8-3-1 4m6-4 2 3"/>',
  huevos: '<ellipse cx="12" cy="13" rx="7" ry="9"/><path d="m12 4 2 5-3 2 3 3-2 7"/>',
  pescado: '<path d="M3 12c4-6 12-6 16 0-4 6-12 6-16 0Zm16 0 3-5v10l-3-5Z"/><circle cx="9" cy="11" r=".7"/>',
  cacahuetes: '<path d="M12 3c-3-2-7 2-5 6-4 3-2 9 2 10 2 2 4-1 5-2 4 2 7-3 4-7 2-4-2-9-6-7Z"/><path d="M9 8c3 0 4 3 2 5m2 2c-2-1-3 1-3 3"/>',
  soja: '<path d="M4 15c0-5 5-10 10-10 2 5-1 11-6 13-2 1-4-1-4-3Z"/><path d="M10 19c0-5 5-9 10-8 0 5-3 10-8 10-1 0-2-1-2-2Z"/>',
  leche: '<path d="M7 3h10v4l2 3v11H5V10l2-3V3Z"/><path d="M7 7h10M5 11h14M10 3v4"/>',
  frutos_cascara: '<path d="M12 3c-5 1-9 6-7 12 2 6 12 7 14 0 2-6-2-11-7-12Z"/><path d="m12 3 0 18M8 8l8 9m0-9-8 9"/>',
  apio: '<path d="M12 22V7M12 14C7 14 4 10 4 7c5 0 8 3 8 7Zm0-3c0-5 3-8 8-8 0 4-3 8-8 9ZM7 22l5-8 5 8"/>',
  mostaza: '<path d="M8 3h8v4l2 3v11H6V10l2-3V3Z"/><path d="M8 7h8M6 12h12M9 16h6"/>',
  sesamo: '<path d="M6 5c2-2 4 1 2 4S4 12 3 10s1-4 3-5Zm8 2c2-2 4 1 2 4s-4 3-5 1 1-4 3-5Zm2 9c2-2 4 1 2 4s-4 3-5 1 1-4 3-5Z"/>',
  sulfitos: '<path d="M6 3h12l-2 9a4 4 0 0 1-8 0L6 3Zm6 13v5m-4 0h8M9 9h6"/>',
  altramuces: '<path d="M6 4c7-2 13 3 12 11-1 5-8 7-12 4-4-3-4-11 0-15Z"/><path d="M7 7c4 0 7 3 10 7M7 12c3 0 5 2 7 5"/>',
  moluscos: '<path d="M3 19a9 9 0 0 1 18 0H3Z"/><path d="M12 10v9M7 12l3 7m7-7-3 7M4 16l6 3m10-3-6 3"/>',
};
const NOMBRE = new Map<string, string>([...ALERGENOS, ...DIETAS].map((a) => [a.id, a.nombre]));
const icono = (id: IdAlergeno) =>
  `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONOS[id]}</svg>`;

/** JSON dentro de <script>: sin «</script>» ni separadores de línea que lo rompan. */
const jsonEnScript = (x: unknown) =>
  JSON.stringify(x).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

/** Datos estructurados Menu → MenuSection → MenuItem; oferta solo con precio claro, dieta solo si se declaró. */
export function menuSchema(d: Pick<DatosWeb, 'negocio' | 'carta'>, url: string) {
  const schema = new Map<string, string>(DIETAS.map((x) => [x.id, x.schema]));
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Carta de ${d.negocio}`,
    url,
    inLanguage: 'es-ES',
    hasMenuSection: seccionesCarta(d.carta).map((s) => ({
      '@type': 'MenuSection',
      name: s.nombre,
      hasMenuItem: s.platos.map((p) => {
        const precio = precioNumero(p.precio);
        return {
          '@type': 'MenuItem',
          name: p.nombre,
          ...(p.texto ? { description: p.texto } : {}),
          ...(precio ? { offers: { '@type': 'Offer', price: precio, priceCurrency: 'EUR' } } : {}),
          ...(p.dietas.length ? { suitableForDiet: p.dietas.map((x) => `https://schema.org/${schema.get(x)}`) } : {}),
        };
      }),
    })),
  };
}

/** La carta publicada. `volver` es la web del negocio; '' en el dominio propio sin tienda. */
export function paginaCarta(d: DatosWeb, url: string, volver = ''): string {
  const secciones = seccionesCarta(d.carta);
  const acento = acentoSobre(d.color, '#ffffff');
  const usados = new Set(d.carta.flatMap((p) => p.alergenos));
  const nav = secciones.length > 1 ? `<nav class="nav" aria-label="Secciones de la carta">${secciones.map((s) => `<a href="#${s.id}">${esc(s.nombre)}</a>`).join('')}</nav>` : '';
  const cuerpo = secciones
    .map(
      (s) =>
        `<section class="sec" id="${s.id}" aria-labelledby="t-${s.id}"><h2 id="t-${s.id}">${esc(s.nombre)}</h2><ul class="platos">${s.platos
          .map(
            (p) =>
              `<li class="plato"><div class="cab"><h3>${esc(p.nombre)}</h3>${p.precio ? `<span class="precio">${esc(p.precio)}</span>` : ''}</div>` +
              (p.texto ? `<p class="desc">${esc(p.texto)}</p>` : '') +
              (p.dietas.length ? `<p class="dietas">${p.dietas.map((x) => `<span class="dieta">${esc(NOMBRE.get(x)!)}</span>`).join('')}</p>` : '') +
              (p.alergenos.length
                ? `<p class="alergenos"><span class="sr">Alérgenos: </span>${p.alergenos.map((a) => `<span class="al">${icono(a)}${esc(NOMBRE.get(a)!)}</span>`).join('')}</p>`
                : '') +
              '</li>',
          )
          .join('')}</ul></section>`,
    )
    .join('');
  const leyenda = ALERGENOS.filter((a) => usados.has(a.id))
    .map((a) => `<li>${icono(a.id)}<span><strong>${esc(a.nombre)}</strong> <small>${esc(a.descripcion)}</small></span></li>`)
    .join('');
  const tel = d.telefono.replace(/[^\d+]/g, '');
  const contacto = [
    d.direccion && `<span>${esc(d.direccion)}</span>`,
    d.telefono && `<a href="tel:${esc(tel)}">${esc(d.telefono).replace(/ /g, "&nbsp;")}</a>`,
  ].filter(Boolean);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Carta · ${esc(d.negocio)}</title>
<meta name="description" content="${esc(`Carta de ${d.negocio}: platos, precios y alérgenos.`)}">
<link rel="canonical" href="${esc(url)}">
<meta name="theme-color" content="${esc(d.color)}">
<script type="application/ld+json">${jsonEnScript(menuSchema(d, url))}</script>
<style>
:root{--c:${d.color};--cs:${sobreAcento(d.color)};--ct:${acento};--tinta:#222;--gris:#5c5c57;--linea:#e4e2dc;--fondo:#f7f6f2}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--fondo);color:var(--tinta);font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif}
a{color:inherit}a:focus-visible{outline:3px solid var(--ct);outline-offset:3px}
.in{width:min(100% - 32px,760px);margin-inline:auto}
header{background:var(--c);color:var(--cs);padding:28px 0 22px}
header p{margin:0;font-size:.8rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
h1{margin:6px 0 0;font-size:clamp(1.9rem,7vw,3rem);line-height:1.1;overflow-wrap:anywhere}
.volver{display:inline-block;margin-top:12px;font-size:.9rem}.volver:focus-visible{outline-color:currentColor}
.nav{position:sticky;top:0;z-index:1;display:flex;gap:8px;overflow-x:auto;padding:12px 0;background:var(--fondo)}
.nav a{flex:none;display:inline-flex;align-items:center;min-height:44px;padding:8px 15px;background:#fff;border:1px solid var(--linea);border-radius:999px;text-decoration:none;font-weight:600;font-size:.92rem}
.sec{scroll-margin-top:72px;padding:8px 0 18px}
h2{font-size:1.45rem;margin:14px 0 10px;padding-bottom:8px;border-bottom:2px solid var(--c)}
.platos{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.plato{background:#fff;border:1px solid var(--linea);border-radius:12px;padding:14px 16px}
.cab{display:flex;justify-content:space-between;align-items:baseline;gap:14px}
h3{margin:0;font-size:1.06rem}
.precio{color:var(--ct);font-weight:800;white-space:nowrap}
.desc{color:var(--gris);margin:6px 0 0}
.dietas,.alergenos{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0;font-size:.82rem}
.dieta{color:var(--ct);font-weight:700;border:1px solid currentColor;border-radius:6px;padding:3px 8px}
.al{display:inline-flex;align-items:center;gap:4px;background:var(--fondo);border:1px solid var(--linea);border-radius:6px;padding:3px 8px}
.ic{width:20px;height:20px;flex:none}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.leyenda{background:#fff;border:1px solid var(--linea);border-radius:12px;padding:18px;margin:26px 0}
.leyenda h2{margin-top:0}
.leyenda ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
.leyenda li{display:flex;gap:10px;align-items:flex-start}
.leyenda small{display:block;color:var(--gris);line-height:1.4}
.aviso{color:var(--gris);font-size:.88rem}
footer{border-top:1px solid var(--linea);background:#fff;padding:20px 0;margin-top:26px}
footer address{display:flex;flex-wrap:wrap;gap:8px 20px;font-style:normal;font-size:.92rem}
@media print{body{background:#fff}header{background:none;color:#000;padding:0 0 8px}.nav,.volver{display:none}.plato{break-inside:avoid;border-color:#ccc}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style>
</head>
<body>
<header><div class="in"><p>Carta</p><h1>${esc(d.negocio)}</h1>${volver ? `<a class="volver" href="${esc(volver)}">← Volver a la web</a>` : ''}</div></header>
<div class="in">
${nav}
<main>
${cuerpo}
<aside class="leyenda" aria-labelledby="ley-t"><h2 id="ley-t">Alérgenos</h2>${leyenda ? `<ul>${leyenda}</ul>` : ''}<p class="aviso">Si tienes alguna alergia o intolerancia, pregúntanos antes de pedir: te informamos de cada plato.</p></aside>
</main>
</div>
${contacto.length ? `<footer><div class="in"><address>${contacto.join('')}</address></div></footer>` : ''}
</body>
</html>
`;
}

/** Cartel A5 para imprimir y poner en las mesas: nombre y QR (SVG dentro, nítido a cualquier tamaño) que abre la carta. */
export function cartelCarta(d: Pick<DatosWeb, 'negocio' | 'color'>, urlCarta: string): string {
  const qr = renderSVG(urlCarta, { ecc: 'H', border: 2, pixelSize: 8, blackColor: '#111111', whiteColor: '#ffffff' });
  const visible = urlCarta.replace(/^https?:\/\//, '');
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cartel de la carta · ${esc(d.negocio)}</title>
<meta name="robots" content="noindex">
<style>
@page{size:A5 portrait;margin:0}
*{box-sizing:border-box}
body{margin:0;background:#e9e8e4;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#222}
.hoja{width:148mm;height:210mm;margin:0 auto;padding:14mm;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-top:8mm solid ${esc(d.color)}}
.mini{margin:0;font-size:11pt;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:${esc(acentoSobre(d.color, '#ffffff'))}}
h1{margin:6mm 0 3mm;font-size:28pt;line-height:1.15;overflow-wrap:anywhere}
.qr{width:80mm;height:80mm;margin:8mm auto 5mm}
.qr svg{display:block;width:100%;height:100%}
.escanea{margin:0;font-size:16pt;font-weight:800}
.url{margin:3mm 0 0;font-size:9pt;color:#555;overflow-wrap:anywhere}
.imprimir{margin:16px auto;display:block;font:600 15px system-ui,sans-serif;text-align:center}
@media print{body{background:#fff}.imprimir{display:none}.hoja{margin:0}}
</style>
</head>
<body>
<main class="hoja">
<p class="mini">Nuestra carta</p>
<h1>${esc(d.negocio)}</h1>
<div class="qr" role="img" aria-label="${esc(`Código QR de la carta de ${d.negocio}`)}">${qr}</div>
<p class="escanea">Escanea para ver la carta y los alérgenos</p>
<p class="url">${esc(visible)}</p>
</main>
<p class="imprimir">Imprímelo en A5 desde el menú del navegador (Ctrl+P / Compartir → Imprimir).</p>
</body>
</html>
`;
}
