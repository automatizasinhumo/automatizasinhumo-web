import type { Diseno } from './tipos';
import { sector, lema, fotoO } from './piezas';

/** Sin foto: perro y gato asomados a una viñeta, con huellas y bocadillo. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 420 360" aria-hidden="true" focusable="false">
<rect x="0" y="0" width="420" height="360" class="cielo"/>
<circle cx="340" cy="70" r="36" class="sol"/>
<g class="trazo">
<path d="M70 360v-120q0-70 70-70h20q70 0 70 70v120z" class="perro"/>
<path d="M78 210q-40 10-40 60 30 0 44-30zM222 210q40 10 40 60-30 0-44-30z" class="oreja"/>
<circle cx="125" cy="238" r="8" class="ojo"/><circle cx="175" cy="238" r="8" class="ojo"/>
<path d="M140 268q10 10 20 0" fill="none"/><ellipse cx="150" cy="258" rx="14" ry="10" class="ojo"/>
<path d="M260 360v-90q0-50 50-50h10q50 0 50 50v90z" class="gato"/>
<path d="M266 236l6-56 40 36zM364 236l-6-56-40 36z" class="gato"/>
<circle cx="296" cy="270" r="6" class="ojo"/><circle cx="334" cy="270" r="6" class="ojo"/>
<path d="M306 292l9 6 9-6M280 290h-34M280 298l-30 8M350 290h34M350 298l30 8" fill="none"/>
</g>
<g class="huella"><circle cx="40" cy="60" r="9"/><circle cx="24" cy="44" r="5"/><circle cx="40" cy="36" r="5"/><circle cx="56" cy="44" r="5"/>
<circle cx="110" cy="100" r="9"/><circle cx="94" cy="84" r="5"/><circle cx="110" cy="76" r="5"/><circle cx="126" cy="84" r="5"/></g>
</svg>`;

export const vinetas: Diseno = {
  id: 'vinetas',
  nombre: 'Viñetas',
  descripcion: 'Cómic alegre: viñetas con trazo grueso, bocadillos y pegatinas. Para peluquería canina, veterinarios, guarderías de mascotas y negocios familiares.',
  color: '#3257b8',
  fondoClaro: '#ffd6ba',
  fondoOscuro: '#1d1d2b',
  fuentes: ['ash-bricolage', 'ash-outfit'],
  titulo: "'ash-bricolage', 'Trebuchet MS', sans-serif",
  texto: "'ash-outfit', system-ui, sans-serif",
  servicios: 1,
  galeria: 4,
  opiniones: 3,
  contacto: 2,
  orden: ['servicios', 'opiniones', 'galeria', 'sobre', 'horario', 'preguntas', 'contacto'],
  titulos: { servicios: 'Lo que hacemos', galeria: 'Clientes peludos', opiniones: 'Dicen sus humanos', sobre: 'Quiénes somos', contacto: '¿Nos vemos?' },
  muestra: {
    negocio: 'Pelusa & Co',
    sector: 'Peluquería canina y felina',
    lema: 'Baños sin prisa, cortes de raza y premios al final. Sin jaulas ni sedantes.',
    servicios: [
      { nombre: 'Baño completo', precio: 'desde 25 €', texto: 'Champú según su piel, secado a mano y perfume suave.' },
      { nombre: 'Corte de raza', precio: 'desde 35 €', texto: 'Tijera y máquina con el estándar de su raza o a tu gusto.' },
      { nombre: 'Uñas y oídos', precio: '10 €', texto: 'Sin cita, en 15 minutos.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    return `<header class="w-cab w-cab-vinetas"><div class="w-in w-cab-in"><div class="w-cab-txt w-panel-comic">
${sector(c)}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-bocadillo')}${c.bloqueAcciones}
</div><div class="w-cab-vis w-panel-comic">${fotoO(c, ILUSTRACION)}${c.principal ? `<span class="w-pegatina" aria-hidden="true">¡Hola!</span>` : ''}</div></div></header>`;
  },
  css: `
.w-d-vinetas{--w-fondo:#fff9e9;--w-tinta:#1d1d2b;--w-suave:#45455a;--w-borde:#1d1d2b;--w-panel:#ffffff;--w-melocoton:#ffd6ba;--w-r:18px;--w-esp:22px;--w-sombra:5px 5px 0 #1d1d2b}
.w-d-vinetas .w-cuerpo{background:radial-gradient(color-mix(in srgb,var(--w-c) 16%,transparent) 1.4px,transparent 1.6px) 0 0/16px 16px,var(--w-fondo)}
.w-d-vinetas .w-nav{background:var(--w-fondo);border-bottom:3px solid var(--w-tinta)}
.w-d-vinetas .w-nav-marca{font-weight:800}
.w-d-vinetas .w-cab{background:transparent;padding-block:clamp(26px,5cqw,64px)}
.w-d-vinetas .w-cab-in{display:grid;gap:18px;align-items:stretch}
.w-d-vinetas .w-panel-comic{position:relative;border:3px solid var(--w-tinta);border-radius:var(--w-r);background:var(--w-panel);box-shadow:var(--w-sombra);overflow:visible}
.w-d-vinetas .w-cab-txt{padding:clamp(22px,4cqw,44px)}
.w-d-vinetas .w-cab-txt>*+*{margin-top:clamp(12px,2cqw,20px)}
.w-d-vinetas .w-sector{display:inline-block;padding:6px 14px;border:2px solid var(--w-tinta);border-radius:999px;background:var(--w-melocoton);color:var(--w-tinta);letter-spacing:.08em;transform:rotate(-2deg)}
.w-d-vinetas .w-cab h1{font-weight:800;font-size:clamp(2.8rem,9cqw,6.4rem);line-height:.95;letter-spacing:-.03em;color:var(--w-tinta);-webkit-text-stroke:0}
.w-d-vinetas .w-bocadillo{position:relative;max-width:40ch;padding:16px 20px;border:3px solid var(--w-tinta);border-radius:22px;background:var(--w-fondo);color:var(--w-tinta)}
.w-d-vinetas .w-bocadillo::after{content:"";position:absolute;left:34px;bottom:-16px;width:24px;height:24px;background:var(--w-fondo);border-right:3px solid var(--w-tinta);border-bottom:3px solid var(--w-tinta);transform:skewX(-30deg) rotate(45deg)}
.w-d-vinetas .w-cab .w-acciones{margin-top:30px}
.w-d-vinetas .w-boton{border:3px solid var(--w-tinta);box-shadow:3px 3px 0 var(--w-tinta);font-weight:700;transition:transform .15s,box-shadow .15s}
.w-d-vinetas .w-boton:hover{transform:translate(-2px,-2px);box-shadow:5px 5px 0 var(--w-tinta)}
.w-d-vinetas .w-cab-vis{overflow:hidden;min-height:260px;background:var(--w-melocoton)}
.w-d-vinetas .w-cab-foto{height:100%;border-radius:0}
.w-d-vinetas .w-cab-foto img{height:100%;aspect-ratio:auto}
.w-d-vinetas .w-ilus{height:100%}
.w-d-vinetas .w-ilus .cielo{fill:var(--w-melocoton)}
.w-d-vinetas .w-ilus .sol{fill:#ffe27a;stroke:var(--w-tinta);stroke-width:4}
.w-d-vinetas .w-ilus .trazo{stroke:var(--w-tinta);stroke-width:5;stroke-linejoin:round;stroke-linecap:round}
.w-d-vinetas .w-ilus .perro{fill:#e9a46a}
.w-d-vinetas .w-ilus .oreja{fill:#8b5a3c}
.w-d-vinetas .w-ilus .gato{fill:var(--w-c)}
.w-d-vinetas .w-ilus .ojo{fill:var(--w-tinta)}
.w-d-vinetas .w-ilus .huella{fill:color-mix(in srgb,var(--w-c) 55%,var(--w-melocoton))}
.w-d-vinetas .w-pegatina{position:absolute;right:-10px;top:-14px;display:grid;place-items:center;width:84px;aspect-ratio:1;border:3px solid var(--w-tinta);border-radius:50%;background:var(--w-c);color:var(--w-s);font:800 1.15rem var(--w-ft-titulo);transform:rotate(12deg)}
.w-d-vinetas .w-sec h2{display:inline-block;padding:8px 18px;border:3px solid var(--w-tinta);border-radius:12px;background:var(--w-melocoton);color:var(--w-tinta);box-shadow:4px 4px 0 var(--w-tinta);font-weight:800;font-size:clamp(1.7rem,4.6cqw,2.8rem);transform:rotate(-1.5deg)}
.w-d-vinetas .w-sec h2::after{display:none}
.w-d-vinetas .w-s-1>li{border:3px solid var(--w-tinta);box-shadow:var(--w-sombra)}
.w-d-vinetas .w-s-1>li:nth-child(3n+2){background:var(--w-melocoton)}
.w-d-vinetas .w-servicio h3{font-weight:800;font-size:1.4rem}
.w-d-vinetas .w-precio{display:inline-block;padding:2px 10px;border:2px solid var(--w-tinta);border-radius:999px;background:var(--w-fondo)}
.w-d-vinetas .w-galeria>li{border:3px solid var(--w-tinta);box-shadow:var(--w-sombra)}
.w-d-vinetas .w-galeria>li:nth-child(odd){transform:rotate(-1.5deg)}
.w-d-vinetas .w-galeria>li:nth-child(even){transform:rotate(1.5deg)}
.w-d-vinetas .w-opinion{position:relative;border:3px solid var(--w-tinta);border-radius:26px;background:var(--w-panel);margin-bottom:22px}
.w-d-vinetas .w-opinion::after{content:"";position:absolute;left:40px;bottom:-15px;width:22px;height:22px;background:var(--w-panel);border-right:3px solid var(--w-tinta);border-bottom:3px solid var(--w-tinta);transform:skewX(-30deg) rotate(45deg)}
.w-d-vinetas .w-opinion blockquote::before{display:none}
.w-d-vinetas .w-autor{position:absolute;left:84px;bottom:-34px;margin:0}
.w-d-vinetas .w-pregunta{border:3px solid var(--w-tinta)}
.w-d-vinetas .w-horario{border:3px solid var(--w-tinta);border-radius:var(--w-r);overflow:hidden;background:var(--w-panel);border-collapse:separate}
.w-d-vinetas .w-c-2 .w-contacto-cta{border:3px solid var(--w-tinta);box-shadow:var(--w-sombra)}
.w-d-vinetas .w-pie{background:var(--w-tinta);color:#fff9e9;border:0}
@container (min-width:760px){
  .w-d-vinetas .w-cab-in{grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:22px}
  .w-d-vinetas .w-s-1{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
  .w-d-vinetas .w-s-1>li:nth-child(even){transform:translateY(18px)}
}
`,
};
