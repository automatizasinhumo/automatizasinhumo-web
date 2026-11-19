// Reglas de negocio para cada PR con Danger JS (MIT, https://github.com/danger/danger-js).
// Avisan de la evidencia que falta; solo `fail` bloquea. Se ejecuta en .github/workflows/danger.yml.
// `danger`, `warn`, `fail` y `message` son globales que inyecta Danger.

const pr = (danger.github && danger.github.pr) || {}; // vacío con `danger local`
const cambiados = [...danger.git.modified_files, ...danger.git.created_files];
const tocados = [...cambiados, ...danger.git.deleted_files];

const esPrueba = (f) => /(^|\/)(tests?|qa)\//.test(f) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(f);
const pruebas = tocados.filter(esPrueba);

// 1. Dinero: pagos, carrito, checkout, pedidos, reembolsos y envíos piden prueba.
const DINERO = [
  /^src\/features\/(payments|cart|orders|refunds|shipping|digitalDelivery)\//,
  /^src\/pages\/(checkout\.astro|cart\.astro|pay\/|order\/|payment-setup\.astro|api\/(checkout|cart|pay|orders?|refunds?|webhooks?)\b)/,
];
const dinero = tocados.filter((f) => !esPrueba(f) && DINERO.some((r) => r.test(f)));
if (dinero.length && !pruebas.length) {
  warn(
    `Cambia el flujo de compra (${dinero.slice(0, 5).map((f) => '`' + f + '`').join(', ')}) sin ninguna prueba nueva o tocada. ` +
      'Añade o ajusta una prueba de compra que cubra el cambio.',
  );
}

// 2. Precios del catálogo: líneas añadidas con precio piden prueba o explicación en la PR.
const CATALOGO = /^(manual\/catalogo\/|src\/data\/|seed[^/]*\.sql$)/;
const RE_PRECIO = /\b(price|precio|price_cents|amount)\b|€/i;

// 3. Contacto: David no publica su número; el soporte es email, formulario y Telegram.
const RE_WHATSAPP_CONTACTO = /whatsapp/i;
const RE_ENLACE_WHATSAPP = /\b(wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)\//i; // enlace = canal público aunque no diga «WhatsApp»
const RE_CONTEXTO_CONTACTO = /soporte|contacto|cont[aá]ctanos|escr[ií]benos|ll[aá]manos/i;

async function revisarLineas() {
  const precios = [];
  const whatsapp = [];
  for (const f of cambiados) {
    if (/\.(png|jpe?g|webp|avif|gif|ico|woff2?|pdf|zip)$/i.test(f) || f === 'package-lock.json') continue;
    const diff = await danger.git.diffForFile(f);
    if (!diff) continue;
    const añadidas = diff.added.split('\n').filter((l) => l.startsWith('+'));
    if (CATALOGO.test(f) && añadidas.some((l) => RE_PRECIO.test(l))) precios.push(f);
    if (
      f.startsWith('src/') || f.startsWith('manual/catalogo/') || f.startsWith('public/')
    ) {
      if (
        añadidas.some(
          (l) => RE_ENLACE_WHATSAPP.test(l) || (RE_WHATSAPP_CONTACTO.test(l) && RE_CONTEXTO_CONTACTO.test(l)),
        )
      ) {
        whatsapp.push(f);
      }
    }
  }
  if (precios.length && !pruebas.length && !/precio/i.test(pr.body || '')) {
    warn(
      `Hay líneas de precio nuevas en ${precios.map((f) => '`' + f + '`').join(', ')}. ` +
        'Acompáñalas de una prueba o explica el cambio de precio en la descripción.',
    );
  }
  if (whatsapp.length) {
    warn(
      `Aparece WhatsApp como vía de contacto en ${whatsapp.map((f) => '`' + f + '`').join(', ')}. ` +
        'El contacto público es email, formulario y Telegram; WhatsApp solo si el cliente deja su teléfono.',
    );
  }
}

// 4. Dependencias: package.json sin su lockfile rompe `npm ci`.
async function revisarLockfiles() {
  for (const dir of ['', 'mcp/', 'qa/navegador/']) {
    if (cambiados.includes(`${dir}package.json`) && !cambiados.includes(`${dir}package-lock.json`)) {
      const diff = await danger.git.JSONDiffForFile(`${dir}package.json`);
      if (diff.dependencies || diff.devDependencies || diff.optionalDependencies) {
        fail(`\`${dir}package.json\` cambia dependencias pero \`${dir}package-lock.json\` no se ha actualizado.`);
      }
    }
  }
}

// 5. Tamaño y descripción.
const lineas = (pr.additions || 0) + (pr.deletions || 0);
if (lineas > 1500) {
  warn(`La PR cambia ${lineas} líneas. Si mezcla varias cosas, divídela para que la revisión sea útil.`);
}
if ((pr.body || '').trim().length < 40) {
  warn('La descripción es muy corta: explica el porqué, qué cambia y cómo se ha probado.');
}

// 6. Migraciones de D1: se aplican solas en remoto al desplegar el staging.
const migraciones = danger.git.created_files.filter((f) => /^migrations\/\d+_.*\.sql$/.test(f));
if (migraciones.length) {
  message(
    `Migración nueva (${migraciones.join(', ')}): «Desplegar staging» la aplica en remoto al fusionar. ` +
      'Debe ser aditiva (lo comprueba `migrations-remote-safe.test.mjs`).',
  );
}

// `schedule` hace que Danger espere a las comprobaciones asíncronas antes de comentar.
schedule(revisarLockfiles);
schedule(revisarLineas);
