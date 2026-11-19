// Buscador en móvil (C18): a 390 px la lupa se ve, al pulsarla el campo recibe
// el foco y Enter lleva a /search?q=. Falla con código 1 si algo no se cumple.
// uso: node qa/buscador-movil.mjs <base>
import { chromium } from 'playwright';

const [base] = process.argv.slice(2);
if (!base) {
  console.error('uso: node qa/buscador-movil.mjs <base>');
  process.exit(2);
}

const fallos = [];
const br = await chromium.launch();
try {
  const pg = await br.newPage({ viewport: { width: 390, height: 844 }, locale: 'es-ES' });
  await pg.goto(base + '/', { waitUntil: 'load', timeout: 45000 });
  const lupa = pg.locator('header [data-search-disclosure] summary').first();
  if (!(await lupa.isVisible())) fallos.push('la lupa no se ve a 390 px');
  else {
    await lupa.click();
    const campo = pg.locator('header [data-search-disclosure] input[name="q"]').first();
    await campo.waitFor({ state: 'visible', timeout: 5000 }).catch(() => fallos.push('el campo no aparece al pulsar la lupa'));
    // El foco llega en el evento «toggle» del <details>, que es asíncrono: se espera, no se lee al instante.
    const conFoco = await pg.waitForFunction(() => document.activeElement?.closest('[data-search-disclosure]') != null && document.activeElement?.getAttribute('name') === 'q', null, { timeout: 3000 }).then(() => true, () => false);
    if (!conFoco) fallos.push('el campo no recibe el foco al pulsar la lupa');
    await pg.keyboard.type('boda');
    await Promise.all([pg.waitForURL(/\/search\?q=boda/, { timeout: 15000 }).catch(() => fallos.push(`Enter no lleva a /search?q= (está en ${pg.url()})`)), pg.keyboard.press('Enter')]);
  }
} finally {
  await br.close();
}

if (fallos.length) {
  for (const f of fallos) console.error('✗ ' + f);
  process.exit(1);
}
console.log('✓ buscador en móvil: lupa visible, foco en el campo y Enter a /search?q=');
