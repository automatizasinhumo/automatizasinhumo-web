import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { franc } from 'franc-min';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ASTRO_CLI = join(ROOT, 'node_modules', 'astro', 'bin', 'astro.mjs');
const WRANGLER_CLI = join(ROOT, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const LANGUAGE_EXCEPTIONS = [
  /^(?:MinShop|Stripe|OpenNode|Lightning|Bitcoin|Visa|Mastercard|Apple Pay|LNbits|phoenixd|CVC)$/i,
  /^(?:https?:\/\/\S+|[A-Z0-9_./:@+-]+)$/i,
];
const LANGUAGE_BRANDS = /\b(?:MinShop|Stripe|OpenNode|Lightning|Bitcoin|Visa|Mastercard|Apple Pay|LNbits|phoenixd|CVC)\b/gi;
const ENGLISH_UI_WORDS =
  /\b(?:Buy|Checkout|Qty|Back|Pay|Cart|Total|Remove|Continue|Submit|Skip\s+to\s+content)\b/i;
const ENGLISH_CONTENT_WORDS =
  /\b(?:Buy|Checkout|Qty|Back|Pay|Cart|Remove|Continue|Submit|Skip\s+to\s+content)\b/i;
const LANGUAGE_BLOCKS = /<(p|ul|ol|details|blockquote|td|th|h1)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
const SHORT_TEXT_ELEMENTS =
  /<(a|button|label|option|th|title|h[1-6]|p|summary)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
const ENTITY_MAP: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  hellip: '…',
  larr: '←',
  lt: '<',
  mdash: '—',
  middot: '·',
  nbsp: ' ',
  ndash: '–',
  quot: '"',
  rarr: '→',
  times: '×',
};

let worker: ChildProcess | undefined;
let workerExit: Promise<{ code: number | null; signal: NodeJS.Signals | null }> | undefined;
let workerLog = '';
let stateDir: string | undefined;
let origin = '';

function runNodeScript(script: string, args: string[] = []): void {
  const result = spawnSync(process.execPath, [script, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 180_000,
  });
  if (result.error || result.status !== 0) {
    throw new Error(
      `${script} ${args.join(' ')} failed.\n${result.stdout ?? ''}\n${result.stderr ?? ''}\n${result.error ?? ''}`,
    );
  }
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, decimal: string) => String.fromCodePoint(Number(decimal)))
    .replace(/&#x([\da-f]+);/gi, (_, hexadecimal: string) =>
      String.fromCodePoint(Number.parseInt(hexadecimal, 16)),
    )
    .replace(/&([a-z]+);/gi, (entity, name: string) => ENTITY_MAP[name.toLowerCase()] ?? entity);
}

function normalizeText(value: string): string {
  return decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/[\s\u200b]+/g, ' ')
    .trim();
}

function withoutBrands(value: string): string {
  return value
    .replace(LANGUAGE_BRANDS, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function visibleTextBlocks(html: string): string[] {
  const withoutNonText = html.replace(
    /<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    ' ',
  );
  return [...withoutNonText.matchAll(LANGUAGE_BLOCKS)]
    .map((match) => normalizeText(match[2]))
    .filter(Boolean);
}

function languageIssues(html: string, path: string): string[] {
  const issues: string[] = [];
  for (const block of visibleTextBlocks(html)) {
    const languageText = withoutBrands(block);
    if (Array.from(languageText).length <= 20) continue;
    if (LANGUAGE_EXCEPTIONS.some((exception) => exception.test(languageText))) continue;
    const language = franc(languageText);
    if (language !== 'spa') issues.push(`${path} [${language}]: ${block}`);
  }

  const visibleHtml = html.replace(
    /<(script|style|svg|noscript|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    ' ',
  );
  const uiText = [...visibleHtml.matchAll(SHORT_TEXT_ELEMENTS)].map((match) => ({
    tag: match[1].toLowerCase(),
    text: normalizeText(match[2]),
  }));
  for (const text of uiText) {
    const isControl = ['button', 'label', 'option', 'th', 'title'].includes(text.tag);
    const languageText = withoutBrands(text.text);
    if (
      ENGLISH_CONTENT_WORDS.test(languageText) ||
      (isControl && ENGLISH_UI_WORDS.test(languageText))
    ) {
      issues.push(`${path} [control]: ${text.text}`);
    }
  }
  for (const tag of html.matchAll(/<[a-z][^>]*>/gi)) {
    for (const attribute of tag[0].matchAll(/\b(?:title|aria-label)\s*=\s*(["'])(.*?)\1/gi)) {
      const text = withoutBrands(decodeEntities(attribute[2]).trim());
      if (ENGLISH_UI_WORDS.test(text)) issues.push(`${path} [control]: ${text}`);
    }
  }
  return issues;
}

async function unusedPort(): Promise<number> {
  const server = createServer();
  await new Promise<void>((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No se pudo reservar un puerto local.');
  await new Promise<void>((resolveClose, reject) => {
    server.close((error) => (error ? reject(error) : resolveClose()));
  });
  return address.port;
}

async function cartCookie(): Promise<string> {
  const catalog = await fetch(new URL('/api/products?limit=50', origin), {
    signal: AbortSignal.timeout(10_000),
  });
  if (!catalog.ok) throw new Error(`El catálogo de prueba respondió ${catalog.status}.`);
  const data = (await catalog.json()) as {
    products?: { id: string; variant_label: string | null; in_stock: boolean }[];
  };
  const productId = data.products?.find((product) => product.variant_label === null && product.in_stock)?.id;
  if (!productId) throw new Error('No hay un producto disponible sin variantes para probar el carrito.');

  const response = await fetch(new URL('/api/cart', origin), {
    method: 'POST',
    redirect: 'manual',
    signal: AbortSignal.timeout(10_000),
    headers: { origin },
    body: new URLSearchParams({ _action: 'add', product_id: productId, qty: '1' }),
  });
  const cookie = response.headers.get('set-cookie')?.split(';')[0];
  if (!cookie?.startsWith('cart=')) {
    throw new Error(`No se pudo crear el carrito de prueba (HTTP ${response.status}).`);
  }
  return cookie;
}

async function waitForWorker(): Promise<void> {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (worker?.exitCode !== null && worker?.exitCode !== undefined) {
      throw new Error(`Wrangler terminó antes de responder.\n${workerLog}`);
    }
    try {
      const response = await fetch(new URL('/sitemap.xml', origin), {
        signal: AbortSignal.timeout(2_000),
      });
      if (response.ok) return;
    } catch {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
    }
  }
  throw new Error(`Wrangler no respondió a tiempo.\n${workerLog}`);
}

describe('idioma del escaparate', () => {
  beforeAll(
    async () => {
      runNodeScript(ASTRO_CLI, ['build']);
      const persistenceDir = mkdtempSync(join(tmpdir(), 'minshop-idioma-'));
      stateDir = persistenceDir;
      runNodeScript(WRANGLER_CLI, [
        'd1',
        'migrations',
        'apply',
        'DB',
        '--local',
        '--persist-to',
        persistenceDir,
      ]);
      runNodeScript(WRANGLER_CLI, [
        'd1',
        'execute',
        'DB',
        '--local',
        '--persist-to',
        persistenceDir,
        '--file',
        './seed.sql',
      ]);
      runNodeScript(WRANGLER_CLI, [
        'd1',
        'execute',
        'DB',
        '--local',
        '--persist-to',
        persistenceDir,
        '--file',
        './test/fixtures/storefront-states.sql',
      ]);
      const fixtureSql = join(persistenceDir, 'idioma-fixture.sql');
      writeFileSync(
        fixtureSql,
        `UPDATE products SET name = 'Camiseta de muestra', description = 'Camiseta de algodón de muestra para comprobar el catálogo.' WHERE slug = 'sample-tee';
UPDATE products SET name = 'Taza de muestra', description = 'Taza de muestra para comprobar el catálogo.' WHERE slug = 'sample-mug';
UPDATE products SET name = 'Producto de prueba para revisar el listado número ' || substr(slug, 17), description = 'Producto de muestra para comprobar el catálogo.' WHERE slug LIKE 'pagination-item-%';
UPDATE categories SET name = 'Ropa' WHERE slug = 'apparel';
UPDATE product_variants SET label = CASE label WHEN 'Small' THEN 'Pequeña' WHEN 'Large' THEN 'Grande' ELSE label END;
UPDATE product_extras SET label = CASE label WHEN 'Gift wrap' THEN 'Envoltorio para regalo' WHEN 'Rush delivery' THEN 'Entrega urgente' ELSE label END;
UPDATE pages SET title = 'Sobre nosotros', body_markdown = '# Sobre nosotros' || char(10) || char(10) || 'Esta página de prueba incluye un [enlace](/products) y una lista:' || char(10) || char(10) || '- primero' || char(10) || '- segundo' WHERE slug = 'about';
UPDATE menu_items SET label = CASE label WHEN 'Shop' THEN 'Tienda' WHEN 'Apparel' THEN 'Ropa' WHEN 'About' THEN 'Sobre nosotros' WHEN 'Featured: Sample Tee' THEN 'Destacado: Camiseta de muestra' ELSE label END;
INSERT INTO pending_payments (public_id, payment_hash, backend, amount_total_cents, currency, email, items)
VALUES ('00000000-0000-4000-8000-000000000019', 'idioma-test-pending', 'demo', 1000, 'EUR', 'cliente@example.com', '[]');`,
      );
      runNodeScript(WRANGLER_CLI, [
        'd1',
        'execute',
        'DB',
        '--local',
        '--persist-to',
        persistenceDir,
        '--file',
        fixtureSql,
      ]);

      const port = await unusedPort();
      origin = `http://127.0.0.1:${port}`;
      worker = spawn(
        process.execPath,
        [
          WRANGLER_CLI,
          'dev',
          '--config',
          'dist/server/wrangler.json',
          '--persist-to',
          persistenceDir,
          '--var',
          'CANONICAL_ORIGIN:https://canonical.example',
          '--var',
          'AUTH_SECRET:integration-auth-secret',
          '--var',
          'STORE_NAME:MinShop',
          '--ip',
          '127.0.0.1',
          '--port',
          String(port),
        ],
        { cwd: ROOT, stdio: ['ignore', 'pipe', 'pipe'] },
      );
      workerExit = new Promise((resolveExit) => {
        worker?.once('exit', (code, signal) => resolveExit({ code, signal }));
      });
      worker.stdout?.on('data', (chunk: Buffer) => {
        workerLog = (workerLog + chunk.toString()).slice(-8_000);
      });
      worker.stderr?.on('data', (chunk: Buffer) => {
        workerLog = (workerLog + chunk.toString()).slice(-8_000);
      });
      await waitForWorker();
    },
    240_000,
  );

  afterAll(async () => {
    const waitForExit = async (timeoutMs: number): Promise<boolean> => {
      if (!worker || worker.exitCode !== null) return true;
      return new Promise((resolveExit) => {
        const timer = setTimeout(() => resolveExit(false), timeoutMs);
        workerExit?.then(() => {
          clearTimeout(timer);
          resolveExit(true);
        });
      });
    };
    if (worker && worker.exitCode === null) {
      worker.kill('SIGTERM');
      if (!(await waitForExit(5_000)) && worker.exitCode === null) {
        worker.kill('SIGKILL');
        if (!(await waitForExit(5_000))) {
          throw new Error(`No se pudo cerrar Wrangler.\n${workerLog}`);
        }
      }
    }
    if (stateDir) {
      await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
      await rm(stateDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
    }
  });

  it(
    'detecta inglés en el HTML público y excluye las rutas de administración',
    async () => {
      const sitemap = await fetch(new URL('/sitemap.xml', origin), {
        signal: AbortSignal.timeout(10_000),
      });
      expect(sitemap.ok).toBe(true);
      const xml = await sitemap.text();
      const sitemapPaths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
        const url = new URL(match[1]);
        return `${url.pathname}${url.search}`;
      });
      const publicRoutes = new Set([
        ...sitemapPaths.filter((path) => !path.startsWith('/admin')),
        '/cart',
        '/express',
        '/checkout?method=demo',
        '/payment-setup',
        '/payment-setup?method=stripe',
        '/payment-setup?method=lightning',
        '/payment-setup?method=opennode',
        '/pay/00000000-0000-4000-8000-000000000019',
      ]);
      const cookie = await cartCookie();
      const issues: string[] = [];

      for (const path of publicRoutes) {
        const response = await fetch(new URL(path, origin), {
          headers: ['/cart', '/express', '/checkout?method=demo'].includes(path)
            ? { cookie }
            : undefined,
          signal: AbortSignal.timeout(30_000),
        });
        const html = await response.text();
        if (!response.ok) {
          issues.push(`${path} [HTTP ${response.status}]: no se pudo revisar el HTML.`);
          continue;
        }
        issues.push(...languageIssues(html, path));
      }

      const invalidAddress = await fetch(new URL('/checkout', origin), {
        method: 'POST',
        headers: {
          cookie,
          origin,
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ method: 'demo' }),
        signal: AbortSignal.timeout(30_000),
      });
      const checkoutHtml = await invalidAddress.text();
      if (!invalidAddress.ok) {
        issues.push(`/checkout [HTTP ${invalidAddress.status}]: no se pudo revisar el HTML.`);
      } else {
        issues.push(...languageIssues(checkoutHtml, '/checkout (formulario)'));
      }

      if (issues.length > 0) {
        throw new Error(`Se han encontrado ${issues.length} textos que no pasan la comprobación:\n${issues.slice(0, 60).join('\n')}`);
      }
    },
    120_000,
  );
});
