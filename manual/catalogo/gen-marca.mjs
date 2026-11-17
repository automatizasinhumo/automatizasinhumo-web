// node manual/catalogo/gen-marca.mjs
// Genera favicon.svg/.ico, apple-touch-icon y og-default.png con la marca.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const pub = new URL('../../public/', import.meta.url);
const B = { bg: '#F5F7F4', ink: '#172D2D', brand: '#176B5A', acc: '#B34A28', line: '#D5DDD8' };
const FONT = "'Space Grotesk', 'Segoe UI', Arial, sans-serif";

// Símbolo: A de dos trazos con travesaño en flecha (mismo trazo que Logo.astro).
const simbolo = (stroke = 2.6, a = B.brand, f = B.acc) => `
  <path d="M3.5 25 L12 3.5 L17 16" stroke="${a}" stroke-width="${stroke}" fill="none" stroke-linecap="square"/>
  <path d="M7.4 17 H24.5" stroke="${a}" stroke-width="${stroke}" fill="none" stroke-linecap="square"/>
  <path d="M20.5 12.8 L25 17 L20.5 21.2" stroke="${f}" stroke-width="${stroke}" fill="none" stroke-linecap="square"/>`;

const icono = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${B.bg}"/>
  <g transform="translate(2 2)">${simbolo(3)}</g>
</svg>`;
writeFileSync(new URL('favicon.svg', pub), icono + '\n');

const png = (size, pad = 0) =>
  sharp(Buffer.from(icono.replace('viewBox="0 0 32 32"', `viewBox="0 0 32 32" width="${size}" height="${size}"`)), { density: 384 })
    .resize(size, size).png().toBuffer();

const apple = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="${B.bg}"/>
  <g transform="translate(30 30) scale(4.3)">${simbolo(2.8)}</g></svg>`)).png().toBuffer();
writeFileSync(new URL('apple-touch-icon.png', pub), apple);
writeFileSync(new URL('apple-touch-icon-precomposed.png', pub), apple);

// ICO con PNG embebidos (16, 32, 48).
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => png(s)));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let off = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e); head.writeUInt8(s, e + 1); head.writeUInt8(0, e + 2); head.writeUInt8(0, e + 3);
  head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(imgs[i].length, e + 8); head.writeUInt32LE(off, e + 12);
  off += imgs[i].length;
});
writeFileSync(new URL('favicon.ico', pub), Buffer.concat([head, ...imgs]));

// Imagen para compartir en redes (1200x630).
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><pattern id="d" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="1.3" fill="#81938C" opacity="0.45"/></pattern></defs>
  <rect width="1200" height="630" fill="${B.bg}"/><rect width="1200" height="630" fill="url(#d)"/>
  <g transform="translate(80 78) scale(2.6)">${simbolo(2.6)}</g>
  <text x="170" y="132" font-family="${FONT}" font-size="46" fill="${B.ink}"><tspan font-weight="700">Automatiza</tspan><tspan fill="${B.brand}" font-weight="500" dx="14">sin humo</tspan></text>
  <text font-family="${FONT}" font-weight="700" font-size="74" fill="${B.ink}">
    <tspan x="80" y="300">Tu web y tus tareas</tspan>
    <tspan x="80" y="390">repetitivas, <tspan fill="${B.brand}">resueltas.</tspan></tspan>
  </text>
  <rect x="80" y="468" width="520" height="70" rx="35" fill="${B.brand}"/>
  <text x="340" y="514" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="30" fill="#fff">Precio cerrado · Sin humo</text>
  <path d="M1040 503 H1120 M1095 478 L1120 503 L1095 528" stroke="${B.acc}" stroke-width="8" fill="none" stroke-linecap="square"/>
</svg>`;
writeFileSync(new URL('og-default.png', pub), await sharp(Buffer.from(og)).png().toBuffer());
console.log('marca: favicon.svg/.ico, apple-touch-icon, og-default.png');
