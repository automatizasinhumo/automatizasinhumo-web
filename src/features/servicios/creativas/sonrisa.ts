import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Smile» de Freeframe (licencia MIT, (c) sus autores): violeta y rosa
 * chicle, formas redondeadas, mascota diente en una burbuja y tarjetas flotantes sobre la portada.
 * Reescrito para el contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript).
 */

/** Sin foto: un diente sonriente con su cepillo, dentro de una burbuja con destellos. */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 480 400" aria-hidden="true" focusable="false">
<circle cx="240" cy="205" r="168" class="burbuja"/>
<circle cx="372" cy="88" r="26" class="gota"/><circle cx="96" cy="320" r="16" class="gota"/>
<g class="brillo"><path d="M104 104l7 17 17 7-17 7-7 17-7-17-17-7 17-7z"/><path d="M386 292l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/></g>
<path class="diente" d="M240 110c-26-20-74-24-96 6-20 27-12 66-2 98 9 29 14 64 22 96 4 16 22 18 28 2 8-22 12-52 26-66 8-8 36-8 44 0 14 14 18 44 26 66 6 16 24 14 28-2 8-32 13-67 22-96 10-32 18-71-2-98-22-30-70-26-96-6z"/>
<g class="cara"><circle cx="208" cy="190" r="9"/><circle cx="272" cy="190" r="9"/></g>
<path class="boca" d="M214 222c14 16 38 16 52 0"/>
<g class="mejilla"><circle cx="190" cy="216" r="11"/><circle cx="290" cy="216" r="11"/></g>
<g class="cepillo"><rect x="334" y="170" width="18" height="150" rx="9" transform="rotate(18 343 245)"/><rect x="318" y="140" width="40" height="34" rx="8" transform="rotate(18 338 157)" class="cerdas"/></g>
</svg>`;

export const sonrisa: Diseno = {
  id: 'sonrisa',
  nombre: 'Sonrisa',
  descripcion: 'Violeta y rosa, formas redondas y una mascota diente que tranquiliza. Para clínicas dentales, ortodoncia y odontopediatría.',
  color: '#5146d4',
  fondoClaro: '#efedff',
  fondoOscuro: '#1a1747',
  fuentes: ['ash-outfit', 'ash-manrope'],
  titulo: "'ash-outfit', ui-rounded, system-ui, sans-serif",
  texto: "'ash-manrope', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'opiniones', 'horario', 'preguntas', 'galeria', 'sobre', 'zonas', 'contacto'],
  sectores: ['dental'],
  palabras: ['dentist', 'ortodonc'],
  titulos: { servicios: 'Tratamientos', horario: 'Cuándo venir', galeria: 'La clínica', sobre: 'Quiénes somos', opiniones: 'Sonrisas que lo cuentan', preguntas: 'Antes de tu cita' },
  muestra: {
    negocio: 'Clínica Dental Alba',
    sector: 'Clínica dental',
    lema: 'Revisiones sin miedo, para toda la familia.',
    servicios: [
      { nombre: 'Revisión y limpieza', precio: '', texto: 'Exploración, limpieza y consejos para casa.' },
      { nombre: 'Ortodoncia invisible', precio: '', texto: 'Alineadores transparentes con seguimiento mensual.' },
      { nombre: 'Odontopediatría', precio: '', texto: 'Primeras visitas tranquilas para los peques.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const insignia = d.sector ? `<p class="w-sector w-insignia"><span class="w-insignia-ico" aria-hidden="true">♥</span>${esc(d.sector)}</p>` : '';
    const primera = c.horario[0];
    const flotantes = primera || c.tel
      ? `<dl class="w-flota">${primera ? `<div class="w-flota-a"><dt>${c.icono('reloj')}${esc(primera[0] || 'Horario')}</dt><dd>${esc(primera[1])}</dd></div>` : ''}${c.tel ? `<div class="w-flota-b"><dt>${c.icono('tel')}Pide cita</dt><dd>${c.grande}</dd></div>` : ''}</dl>`
      : '';
    return `<header class="w-cab w-cab-sonrisa${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${insignia}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis">${fotoO(c, ILUSTRACION)}${flotantes}</div></div></header>`;
  },
  tras: () => '<div class="w-ola" aria-hidden="true"></div>',
  css: `
.w-d-sonrisa{--w-fondo:#fbfaff;--w-tinta:#1a1747;--w-suave:#4a4870;--w-borde:#dcd9fb;--w-panel:#efedff;--w-chicle:#ef4a7b;--w-chicle-claro:#ffe2eb;--w-r:28px;--w-esp:24px;counter-reset:w-srv}
.w-d-sonrisa .w-nav{background:#fff;border-bottom:1px solid var(--w-borde)}
.w-d-sonrisa .w-nav-marca{font-weight:700;letter-spacing:-.01em}
.w-d-sonrisa .w-boton{border-radius:999px;font-weight:700}
.w-d-sonrisa .w-cab{position:relative;overflow:hidden;background:radial-gradient(60% 70% at 100% 0,var(--w-chicle-claro),transparent 70%),radial-gradient(50% 60% at 0 100%,#e6e4ff,transparent 70%),var(--w-fondo);padding-block:clamp(34px,6cqw,84px) clamp(30px,5cqw,64px)}
.w-d-sonrisa .w-cab-in{display:grid;gap:clamp(28px,5cqw,56px);align-items:center}
.w-d-sonrisa .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-sonrisa .w-insignia{display:inline-flex;align-items:center;gap:10px;padding:7px 16px 7px 7px;border-radius:999px;background:#fff;color:var(--w-tinta);box-shadow:0 6px 20px #352d8f14;font-weight:700;font-size:.95rem}
.w-d-sonrisa .w-insignia-ico{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--w-chicle-claro);color:#b01f50;font-size:.9rem}
.w-d-sonrisa .w-cab h1{--w-em-letra:.9;margin-bottom:.25em;font-size:min(clamp(2.5rem,7.4cqw,5.4rem),var(--w-h1-tope,99em));font-weight:700;line-height:1;letter-spacing:-.025em;overflow-wrap:break-word;text-wrap:balance}
.w-d-sonrisa .w-cab .w-lema-bloque{font-size:clamp(1.1rem,2.3cqw,1.4rem);line-height:1.5;color:var(--w-suave);max-width:34ch}
.w-d-sonrisa .w-cab .w-boton{min-height:54px;padding-inline:26px}
.w-d-sonrisa .w-cab .w-boton-lleno{box-shadow:0 10px 24px #5146d433}
.w-d-sonrisa .w-cab-vis{position:relative;min-width:0}
.w-d-sonrisa .w-ilus{display:block;width:100%;height:auto}
.w-d-sonrisa .w-ilus .burbuja{fill:#e6e4ff}
.w-d-sonrisa .w-ilus .gota{fill:var(--w-chicle-claro)}
.w-d-sonrisa .w-ilus .brillo{fill:var(--w-chicle)}
.w-d-sonrisa .w-ilus .diente{fill:#fff;stroke:#1a1747;stroke-width:6;stroke-linejoin:round}
.w-d-sonrisa .w-ilus .cara{fill:#1a1747}
.w-d-sonrisa .w-ilus .boca{fill:none;stroke:#1a1747;stroke-width:6;stroke-linecap:round}
.w-d-sonrisa .w-ilus .mejilla{fill:#ffc6d7}
.w-d-sonrisa .w-ilus .cepillo rect{fill:var(--w-c);stroke:#1a1747;stroke-width:5}
.w-d-sonrisa .w-ilus .cepillo .cerdas{fill:#fff}
.w-d-sonrisa .w-cab-foto{margin:0;border-radius:42% 58% 52% 48%/48% 42% 58% 52%;overflow:hidden;box-shadow:0 24px 50px #352d8f26}
.w-d-sonrisa .w-cab-foto img{width:100%;aspect-ratio:1;object-fit:cover}
.w-d-sonrisa .w-flota{display:grid;gap:12px;margin:16px 0 0}
.w-d-sonrisa .w-flota>div{padding:14px 18px;border-radius:20px;background:#fff;box-shadow:0 14px 34px #352d8f1f}
.w-d-sonrisa .w-flota dt{display:flex;align-items:center;gap:8px;color:var(--w-suave);font-size:.85rem;font-weight:700}
.w-d-sonrisa .w-flota dt .w-ico{color:var(--w-c)}
.w-d-sonrisa .w-flota-b dt .w-ico{color:#b01f50}
.w-d-sonrisa .w-flota dd{margin:4px 0 0;font:700 1.15rem var(--w-ft-titulo);color:var(--w-tinta)}
.w-d-sonrisa .w-flota dd a{color:inherit;text-decoration:none}
.w-d-sonrisa .w-ola{height:28px;background:radial-gradient(14px 14px at 50% 0,var(--w-fondo) 98%,transparent) 0 0/28px 28px repeat-x,var(--w-panel)}
.w-d-sonrisa .w-sec h2{font-weight:700;font-size:clamp(1.9rem,5cqw,3.1rem);line-height:1.05;letter-spacing:-.02em}
.w-d-sonrisa .w-sec:nth-of-type(odd){background:var(--w-panel)}
.w-d-sonrisa .w-s-1>li{counter-increment:w-srv;position:relative;background:#fff;border:0;border-radius:var(--w-r);box-shadow:0 10px 30px #352d8f12}
.w-d-sonrisa .w-s-1>li::before{content:counter(w-srv);display:grid;place-items:center;width:44px;height:44px;margin-bottom:14px;border-radius:50%;background:var(--w-chicle-claro);color:#b01f50;font:700 1.1rem var(--w-ft-titulo)}
.w-d-sonrisa .w-s-1>li:nth-child(3n+2)::before{background:#e6e4ff;color:var(--w-tinta)}
.w-d-sonrisa .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:700;font-size:1.3rem}
.w-d-sonrisa .w-galeria img{border-radius:var(--w-r)}
.w-d-sonrisa .w-zonas>li{border:0;border-radius:999px;background:#fff;box-shadow:0 4px 14px #352d8f12;font-weight:700}
.w-d-sonrisa .w-opinion{background:#fff;border:0;border-radius:var(--w-r);box-shadow:0 10px 30px #352d8f12}
.w-d-sonrisa .w-c-2 .w-contacto-cta{background:var(--w-tinta);color:#fff;border-radius:calc(var(--w-r) + 8px)}
.w-d-sonrisa .w-c-2 .w-contacto-grande a{color:var(--w-ct-oscuro);text-decoration:none}
.w-d-sonrisa .w-c-2 .w-contacto-cta .w-boton{color:#fff;border-color:#fff}
.w-d-sonrisa .w-c-2 .w-contacto-cta .w-boton-lleno{background:#fff;color:var(--w-tinta);border-color:#fff}
@container (min-width:760px){
  .w-d-sonrisa .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
  .w-d-sonrisa .w-flota{position:absolute;inset:auto 0 0;margin:0}
  .w-d-sonrisa .w-flota-a{justify-self:start;transform:translate(-14%,-120%)}
  .w-d-sonrisa .w-flota-b{justify-self:end;transform:translate(6%,10%)}
}
`,
};
