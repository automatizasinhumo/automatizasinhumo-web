#!/usr/bin/env node
/**
 * Demo: an agent shops the store over the public catalog API.
 *
 *   node scripts/agent-demo.mjs <base-url> "<query>" [maxPrice]
 *   node scripts/agent-demo.mjs https://your-store.example.com "warm hat" 40
 *
 * Browses GET /api/products?q=…, picks the most relevant in-stock match within
 * the budget (search already ranks by relevance), then POST /api/checkout with
 * the product's prod_… public ID from the catalog (variant_id/extra_ids would
 * be var_/xtra_ public IDs from the detail route) — printing the FULL
 * Lightning invoice and polling its machine-readable status URL. Submit the
 * invoice to a wallet while this process runs; a paid digital item is saved in
 * the current directory.
 */
import { writeFile } from 'node:fs/promises';
import { safeLog } from './agent-demo-logging.mjs';
const [base, query = 'warm hat', maxPrice] = process.argv.slice(2);
if (!base) {
  console.error('Uso: node scripts/agent-demo.mjs <base-url> "<query>" [maxPrice]');
  process.exit(1);
}
const budget = maxPrice ? Number(maxPrice) : Infinity;
const allowedHosts = new Set(
  (process.env.AGENT_DEMO_ALLOWED_HOSTS ?? '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);
if (allowedHosts.size === 0) {
  console.error('Define AGENT_DEMO_ALLOWED_HOSTS con una lista separada por comas de nombres de host de confianza.');
  process.exit(1);
}

const checkedUrl = (value, relativeTo) => {
  let url;
  try {
    url = new URL(value, relativeTo);
  } catch {
    throw new Error('La URL no es válida.');
  }
  if (
    url.protocol !== 'https:' ||
    !allowedHosts.has(url.hostname.toLowerCase()) ||
    (url.port !== '' && url.port !== '443') ||
    url.username !== '' ||
    url.password !== ''
  ) {
    throw new Error('Se ha rechazado una URL ajena a la lista de hosts HTTPS permitidos.');
  }
  return url;
};

let baseUrl;
try {
  baseUrl = checkedUrl(base.endsWith('/') ? base : `${base}/`);
} catch {
  console.error('La URL base debe usar HTTPS y un host incluido en AGENT_DEMO_ALLOWED_HOSTS.');
  process.exit(1);
}
const fetchAllowed = (url, options) =>
  fetch(checkedUrl(url, baseUrl), { ...options, redirect: 'error' });

// 1. Browse the catalog (semantic/keyword search).
const productsUrl = new URL('api/products', baseUrl);
productsUrl.searchParams.set('q', query);
productsUrl.searchParams.set('limit', '20');
const { products = [] } = await fetchAllowed(productsUrl).then((r) => r.json());

// 2. Pick: most relevant in-stock product within budget (keep search ranking).
const candidates = products.filter((p) => p.in_stock && p.price.amount <= budget);

console.log(
  `Buscar "${safeLog(query)}"${Number.isFinite(budget) ? ` por debajo de ${budget}` : ''}: ${candidates.length} producto(s) con stock`,
);
for (const p of candidates.slice(0, 5)) {
  console.log(`  ${safeLog(p.price.currency)} ${safeLog(p.price.amount)}  ${safeLog(p.name)}  [${safeLog(p.slug)}]`);
}
const pick = candidates[0];
if (!pick) {
  console.log('\nNo hay productos que cumplan el presupuesto.');
  process.exit(0);
}
console.log(`\nSeleccionado: ${safeLog(pick.name)} — ${safeLog(pick.price.currency)} ${safeLog(pick.price.amount)}`);

// 3. Start a checkout for one, by the catalog's prod_… public ID (numeric row
//    IDs are rejected; slug also works as a documented convenience selector).
const res = await fetchAllowed(new URL('api/checkout', baseUrl), {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ items: [{ product_id: pick.id, quantity: 1 }], method: 'lightning' }),
});
const order = await res.json();
if (!res.ok) {
  console.error('Error en el checkout:', safeLog(order.error));
  process.exit(1);
}
if (!order.lightning?.invoice || !order.order_status_url) {
  console.error('Esta demo requiere Lightning y la API de estado del pedido legible por máquina.');
  process.exit(1);
}
let statusUrl;
try {
  statusUrl = checkedUrl(order.order_status_url, baseUrl);
} catch (error) {
  console.error('La URL de estado del pedido no está en los hosts permitidos; no pagues esta factura:', safeLog(error.message));
  process.exit(1);
}
console.log('\nPaga esta factura BOLT11:');
console.log(safeLog(order.lightning.invoice));
console.log(`Alternativa en el navegador: ${safeLog(order.checkout_url)}`);
console.log('Consultando el estado tras enviar el pago; una liquidación tardía aún puede aparecer como expired.');

for (;;) {
  const response = await fetchAllowed(statusUrl);
  if (response.status === 410) {
    console.error('El plazo de consulta del pago terminó antes de confirmar la liquidación.');
    process.exit(2);
  }
  if (!response.ok) throw new Error(`Error al consultar el estado: ${response.status}`);
  const status = await response.json();
  console.log(`Estado: ${safeLog(status.status)}`);
  if (status.status === 'paid' || status.status === 'refunded') {
    const downloads = (status.items ?? []).filter((item) => item.download_url);
    for (const [index, item] of downloads.entries()) {
      const fileResponse = await fetchAllowed(item.download_url);
      if (!fileResponse.ok) throw new Error(`Error al descargar el archivo: ${fileResponse.status}`);
      const disposition = fileResponse.headers.get('content-disposition') ?? '';
      const encoded = /filename\*=UTF-8''([^;]+)/i.exec(disposition)?.[1];
      const suggested = encoded ? decodeURIComponent(encoded) : `download-${index + 1}`;
      const filename = suggested.replace(/[^A-Za-z0-9._-]+/g, '-') || `download-${index + 1}`;
      await writeFile(filename, Buffer.from(await fileResponse.arrayBuffer()));
      console.log(`Archivo guardado: ${filename}`);
    }
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
