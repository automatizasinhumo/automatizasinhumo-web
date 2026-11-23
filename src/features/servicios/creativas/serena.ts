import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: formas orgánicas superpuestas con una silueta en calma (sin texto). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
<path class="b1" d="M318 92c48 46 60 128 20 190s-132 96-206 66S16 236 34 160 108 32 184 28s86 18 134 64z"/>
<path class="b2" d="M300 230c22 54-6 112-62 128s-120-6-140-58 18-96 70-112 110-12 132 42z"/>
<g class="fig" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
<circle cx="200" cy="138" r="24"/><path d="M200 166v70M200 186c-30 10-54 4-74-14M200 186c30 10 54 4 74-14M200 236c-26 22-58 30-88 26M200 236c26 22 58 30 88 26"/>
</g>
<circle cx="96" cy="96" r="10" class="p"/><circle cx="318" cy="304" r="14" class="p"/><circle cx="332" cy="120" r="6" class="p"/>
</svg>`;

export const serena: Diseno = {
  id: 'serena',
  nombre: 'Serena',
  descripcion: 'Suave y de confianza: formas orgánicas, panel de cita en portada y tratamientos en tarjetas. Para fisioterapia, salud, psicología y bienestar.',
  color: '#3a8c7a',
  fondoClaro: '#d9eee7',
  fondoOscuro: '#264a56',
  fuentes: ['ash-outfit', 'ash-dm-sans'],
  titulo: "'ash-outfit', system-ui, sans-serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 4,
  orden: ['servicios', 'sobre', 'opiniones', 'horario', 'galeria', 'preguntas', 'contacto'],
  titulos: { servicios: 'Tratamientos', sobre: 'Cómo trabajamos', opiniones: 'Pacientes', galeria: 'El centro', preguntas: 'Dudas habituales', contacto: 'Pide cita' },
  muestra: {
    negocio: 'Fisio Alameda',
    sector: 'Fisioterapia y osteopatía',
    lema: 'Te escuchamos, te tratamos y te enseñamos a no recaer.',
    servicios: [
      { nombre: 'Fisioterapia deportiva', precio: '40 €', texto: 'Lesiones, sobrecargas y vuelta al deporte.' },
      { nombre: 'Suelo pélvico', precio: '45 €', texto: 'Valoración y tratamiento individual.' },
      { nombre: 'Osteopatía', precio: '50 €', texto: 'Dolor de espalda, cuello y cefaleas.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const lista = d.servicios.slice(0, 4).map((s) => `<li>${esc(s.nombre)}</li>`).join('');
    const panel =
      c.principal || lista
        ? `<div class="w-cita">${c.principal ? `<p class="w-cita-tit">${c.icono('cita')}<span>Reserva tu primera visita</span></p>` : ''}${lista ? `<ul class="w-cita-lista">${lista}</ul>` : ''}${c.bloqueAcciones}</div>`
        : '';
    return `<header class="w-cab w-cab-serena"><div class="w-in w-cab-in"><div class="w-cab-txt">
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c)}${panel}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}</div></div></header>`;
  },
  css: `
.w-d-serena{--w-fondo:#fbfdfc;--w-tinta:#264a56;--w-suave:#4f6b74;--w-borde:#d3e6df;--w-panel:#eef7f3;--w-menta:#d9eee7;--w-r:22px;--w-esp:24px}
.w-d-serena .w-cab{position:relative;overflow:hidden;padding-block:clamp(36px,6cqw,90px);background:linear-gradient(160deg,var(--w-menta),var(--w-fondo) 70%)}
.w-d-serena .w-cab-in{display:grid;gap:clamp(26px,5cqw,56px);align-items:center}
.w-d-serena .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-serena .w-sector{display:inline-block;padding:6px 14px;border-radius:999px;background:#fff;color:var(--w-ct);font-weight:600;font-size:.85rem;letter-spacing:.04em;text-transform:none}
.w-d-serena .w-cab h1{font-size:clamp(2.6rem,8.5cqw,5.6rem);font-weight:600;line-height:1;letter-spacing:-.035em;text-wrap:balance}
.w-d-serena .w-cab .w-lema{font-size:clamp(1.08rem,2.1cqw,1.32rem);color:var(--w-suave);max-width:34ch}
.w-d-serena .w-cita{background:#fff;border-radius:24px;padding:clamp(18px,3cqw,26px);box-shadow:0 24px 50px -30px #264a5666;display:grid;gap:14px;max-width:480px}
.w-d-serena .w-cita-tit{display:flex;gap:10px;align-items:center;font-family:var(--w-ft-titulo);font-weight:600;font-size:1.1rem}
.w-d-serena .w-cita-tit .w-ico{color:var(--w-ct)}
.w-d-serena .w-cita-lista{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
.w-d-serena .w-cita-lista li{padding:6px 12px;border-radius:999px;background:var(--w-panel);font-size:.9rem;border:1px solid var(--w-borde)}
.w-d-serena .w-boton{border-radius:999px}
.w-d-serena .w-cab-vis{min-width:0}
.w-d-serena .w-ilus{width:100%}
.w-d-serena .w-ilus .b1{fill:color-mix(in srgb,var(--w-c) 22%,#fff)}
.w-d-serena .w-ilus .b2{fill:color-mix(in srgb,var(--w-c) 45%,#fff)}
.w-d-serena .w-ilus .fig{stroke:var(--w-tinta)}
.w-d-serena .w-ilus .p{fill:var(--w-c)}
.w-d-serena .w-cab-foto{margin:0;border-radius:46% 54% 42% 58%/55% 45% 55% 45%;overflow:hidden;box-shadow:0 30px 60px -30px #264a5680}
.w-d-serena .w-cab-foto img{width:100%;aspect-ratio:1;object-fit:cover}
.w-d-serena .w-sec h2{font-size:clamp(2rem,5.5cqw,3.2rem);font-weight:600;letter-spacing:-.03em}
.w-d-serena .w-sec h2::after{width:48px;height:6px;border-radius:999px}
.w-d-serena .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-serena .w-s-1>li{background:#fff;border:1px solid var(--w-borde);border-radius:22px;box-shadow:0 14px 30px -24px #264a5666}
.w-d-serena .w-s-1>li::before{content:"";display:block;width:46px;height:46px;margin-bottom:14px;border-radius:50%;background:color-mix(in srgb,var(--w-c) 18%,#fff) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23264a56' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z'/%3E%3C/svg%3E") center/22px no-repeat}
.w-d-serena .w-servicio h3{font-weight:600}
.w-d-serena .w-precio{border-radius:999px}
.w-d-serena .w-opinion{background:#fff;border-radius:22px;border:1px solid var(--w-borde)}
.w-d-serena .w-galeria>li{border-radius:22px}
.w-d-serena .w-horario{border-radius:18px;overflow:hidden}
.w-d-serena .w-contacto-cta{border-radius:24px}
@container (min-width:760px){
  .w-d-serena .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr)}
}
`,
};
