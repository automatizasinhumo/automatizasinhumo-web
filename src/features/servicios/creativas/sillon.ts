import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Clinic» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): clínica tranquila en verde agua, titular con remate
 * (Fraunces), cinta de urgencias, gabinete ilustrado con el sillón, ventana en arco y plantas, y
 * dos tarjetas flotantes con lo que más se pregunta. Reescrito para el contrato de diseños de autor
 * (HTML + CSS con ámbito, sin JavaScript); la ilustración es la de la plantilla, con los id prefijados.
 */

/** Sin foto: el gabinete con el sillón dental, la ventana en arco y las plantas (de «Clinic»). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 640 560" aria-hidden="true" focusable="false"><defs><linearGradient id="sillon-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe9f7"/><stop offset="1" stop-color="#eef8f6"/></linearGradient><linearGradient id="sillon-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4faf9"/><stop offset="1" stop-color="#e3f1ee"/></linearGradient><linearGradient id="sillon-chair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#48b3a6"/><stop offset="1" stop-color="#1f7a71"/></linearGradient></defs><rect width="640" height="560" rx="40" fill="url(#sillon-wall)"/><rect x="0" y="430" width="640" height="130" fill="#d7ebe7"/><rect x="0" y="430" width="640" height="6" fill="#c5e0db"/><g transform="translate(330 70)"><rect width="240" height="250" rx="120" fill="url(#sillon-sky)"/><circle cx="170" cy="80" r="30" fill="#f6c76b"/><path d="M0 200c40-40 80-50 120-30s80 10 120-20v100H0Z" fill="#a9d8cd"/><path d="M0 225c50-30 100-30 150-10s70 10 90 0v35H0Z" fill="#7bcfc2"/><rect width="240" height="250" rx="120" fill="none" stroke="#fff" stroke-width="12"/><path d="M120 0v250M0 130h240" stroke="#fff" stroke-width="8"/></g><g transform="translate(60 120)"><path d="M60 300c-20-60-50-80-60-140 30 10 50 40 60 80 0-60 10-110 40-150 10 60-10 110-20 160 20-40 50-60 80-60-20 40-50 70-70 110Z" fill="#2a978b"/><path d="M70 300c0-70 10-140 30-200" stroke="#1b625b" stroke-width="4" fill="none"/><path d="M20 300h110l-14 80H34Z" fill="#f08a6c"/><rect x="14" y="290" width="122" height="18" rx="9" fill="#f4a588"/></g><g transform="translate(210 230)"><rect x="150" y="190" width="40" height="40" rx="6" fill="#c5d8dd"/><rect x="90" y="226" width="160" height="16" rx="8" fill="#b3c9cf"/><path d="M40 120c0-20 16-36 36-36h170c26 0 40 14 54 36l40 64c8 12 0 26-14 26H76c-20 0-36-16-36-36Z" fill="url(#sillon-chair)"/><path d="M20 40c0-22 18-40 40-40h20c22 0 40 18 40 40v80H60c-22 0-40-18-40-40Z" fill="url(#sillon-chair)"/><rect x="34" y="-34" width="60" height="38" rx="19" fill="#48b3a6"/><path d="M120 150h170" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/><path d="M330 120V-40" stroke="#b3c9cf" stroke-width="10" stroke-linecap="round"/><path d="M330 -40h-110" stroke="#b3c9cf" stroke-width="10" stroke-linecap="round"/><circle cx="210" cy="-40" r="34" fill="#fff" stroke="#b3c9cf" stroke-width="8"/><circle cx="210" cy="-40" r="16" fill="#fdf3d0"/></g><g transform="translate(88 70)" opacity=".9"><rect width="120" height="84" rx="16" fill="#fff"/><path d="M20 26h80M20 46h60M20 66h44" stroke="#d5f2ec" stroke-width="8" stroke-linecap="round"/></g><g transform="translate(520 380)"><ellipse cx="40" cy="84" rx="44" ry="10" fill="#c5e0db"/><path d="M10 30h60l-8 54H18Z" fill="#fff"/><path d="M40 30c-6-20 4-34 20-40-2 18-8 30-20 40Zm0 0c-14-14-30-14-40-8 12 12 24 12 40 8Z" fill="#48b3a6"/></g></svg>`;

export const sillon: Diseno = {
  id: 'sillon',
  nombre: 'Sillón',
  descripcion: 'Clínica luminosa en verde agua, titular con remate, gabinete ilustrado y tarjetas flotantes con la próxima cita. Para dentistas, ortodoncia y clínicas.',
  color: '#1f6f64',
  fondoClaro: '#e2f3ef',
  fondoOscuro: '#12302c',
  fuentes: ['ash-fraunces', 'ash-dm-sans'],
  titulo: "'ash-fraunces', Georgia, 'Times New Roman', serif",
  texto: "'ash-dm-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'sobre', 'galeria', 'opiniones', 'horario', 'preguntas', 'zonas', 'contacto'],
  sectores: ['dental', 'salud'],
  palabras: ['dent', 'ortodonc', 'odontolog', 'implant', 'clínica', 'higiene bucal'],
  titulos: { servicios: 'Tratamientos', sobre: 'El equipo', galeria: 'La clínica', opiniones: 'Pacientes', horario: 'Horario de consulta', preguntas: 'Tu primera visita', contacto: 'Pide tu cita' },
  muestra: {
    negocio: 'Clínica Dental Alameda',
    sector: 'Clínica dental',
    lema: 'Odontología general, ortodoncia invisible e implantes en una clínica luminosa, sin prisas y con presupuesto cerrado antes de empezar.',
    servicios: [
      { nombre: 'Primera visita y revisión', precio: 'Gratis', texto: 'Exploración, radiografía si hace falta y plan de tratamiento por escrito.' },
      { nombre: 'Limpieza dental', precio: '45 €', texto: 'Con ultrasonidos y pulido, en unos cuarenta minutos.' },
      { nombre: 'Ortodoncia invisible', precio: 'desde 2.400 €', texto: 'Alineadores transparentes con revisiones incluidas.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const h = c.horario[0];
    const cinta = c.tel || h
      ? `<div class="w-cinta"><div class="w-in w-cinta-in">${c.tel ? `<p>${c.icono('tel')}<span>Urgencias: ${c.grande}</span></p>` : ''}${h ? `<p>${c.icono('reloj')}<span>${esc(h[0] || 'Consulta')}: ${esc(h[1])}</span></p>` : ''}</div></div>`
      : '';
    const ante = d.sector ? `<p class="w-sector"><span aria-hidden="true"></span>${esc(d.sector)}</p>` : '';
    const s = d.servicios?.[0];
    const t1 = s ? `<div class="w-flota w-flota-1"><p class="w-flota-t">${esc(s.nombre)}</p>${s.precio ? `<p>${esc(s.precio)}</p>` : ''}</div>` : '';
    const t2 = h ? `<div class="w-flota w-flota-2"><span class="w-flota-punto" aria-hidden="true"></span><div><p class="w-flota-t">Próxima cita libre</p><p>${esc(h[0] || 'Esta semana')}</p></div></div>` : '';
    return `<header class="w-cab w-cab-sillon${c.foto ? '' : ' w-sin-foto'}">${cinta}<div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1>${esc(d.negocio)}</h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}
</div><div class="w-cab-vis"><div class="w-gabinete">${fotoO(c, ILUSTRACION)}</div>${t1}${t2}</div></div></header>`;
  },
  css: `
.w-d-sillon{--w-fondo:#f0faf8;--w-papel:#fff;--w-tinta:#12302c;--w-suave:#4a605c;--w-borde:#cfe5e0;--w-panel:#e2f3ef;--w-hoja:#1b4d47;--w-sol:#f6c76b;--w-r:22px;--w-esp:24px}
.w-d-sillon .w-nav{background:var(--w-papel);border-bottom:1px solid var(--w-borde)}
.w-d-sillon .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:600}
.w-d-sillon .w-boton{border-radius:999px;font-weight:600;border-width:2px}
.w-d-sillon .w-cinta{background:var(--w-hoja);color:#eaf6f3;font-size:.9rem}
.w-d-sillon .w-cinta-in{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 22px;padding-block:9px}
.w-d-sillon .w-cinta p{display:inline-flex;align-items:center;gap:8px;margin:0}
.w-d-sillon .w-cinta .w-ico{color:var(--w-sol)}
.w-d-sillon .w-cinta a{color:inherit;font-weight:600}
.w-d-sillon .w-cab{background:radial-gradient(120% 90% at 90% 0,#dff2ee 0,#0000 60%),var(--w-fondo);padding-top:0;padding-bottom:clamp(34px,6cqw,84px)}
.w-d-sillon .w-cab-in{display:grid;gap:clamp(30px,5cqw,64px);align-items:center;padding-top:clamp(30px,6cqw,80px)}
.w-d-sillon .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-sillon .w-sector{display:inline-flex;align-items:center;gap:10px;margin:0;padding:7px 16px;border:1px solid var(--w-borde);border-radius:999px;background:var(--w-papel);font:600 .86rem/1.2 var(--w-ft-texto);color:var(--w-tinta)}
.w-d-sillon .w-sector span{width:8px;height:8px;border-radius:50%;background:#2fae7d}
.w-d-sillon .w-cab h1{font-size:min(clamp(2.6rem,7cqw,4.8rem),var(--w-h1-tope,99em));font-weight:500;line-height:1.04;letter-spacing:-.02em;overflow-wrap:break-word;text-wrap:balance;color:var(--w-tinta);text-decoration:underline;text-decoration-color:var(--w-sol);text-decoration-thickness:.12em;text-underline-offset:.12em;text-decoration-skip-ink:none}
.w-d-sillon .w-cab .w-lema-bloque{font-size:clamp(1.05rem,2.1cqw,1.24rem);line-height:1.65;color:var(--w-suave);max-width:44ch}
.w-d-sillon .w-cab .w-boton{min-height:52px;padding-inline:26px}
.w-d-sillon .w-cab-vis{position:relative;min-width:0;width:100%;max-width:36rem;justify-self:center;padding:0 0 30px}
.w-d-sillon .w-gabinete{border-radius:32px;overflow:hidden;background:var(--w-papel);box-shadow:0 30px 60px -34px #12302c80}
.w-d-sillon .w-gabinete .w-ilus{display:block;width:100%;height:auto;aspect-ratio:8/7}
.w-d-sillon .w-cab-foto{margin:0}
.w-d-sillon .w-cab-foto img{width:100%;aspect-ratio:8/7;object-fit:cover}
.w-d-sillon .w-flota{position:absolute;display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:16px;background:var(--w-papel);box-shadow:0 18px 40px -18px #12302c66;max-width:70%}
.w-d-sillon .w-flota p{margin:0;font-size:.9rem;color:var(--w-suave)}
.w-d-sillon .w-flota .w-flota-t{font-weight:700;color:var(--w-tinta)}
.w-d-sillon .w-flota-1{top:18px;right:-10px;flex-direction:column;align-items:flex-start;gap:2px}
.w-d-sillon .w-flota-2{left:-12px;bottom:0}
.w-d-sillon .w-flota-punto{flex:none;width:10px;height:10px;border-radius:50%;background:#2fae7d;box-shadow:0 0 0 5px #2fae7d2e}
.w-d-sillon .w-sec h2{font-weight:500;font-size:clamp(1.9rem,5cqw,3rem);line-height:1.08;letter-spacing:-.01em}
.w-d-sillon .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-sillon .w-s-1>li{background:var(--w-papel);border:1px solid var(--w-borde);border-radius:var(--w-r);box-shadow:0 16px 36px -28px #12302c80}
.w-d-sillon .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:600;font-size:1.25rem}
.w-d-sillon .w-galeria img{border-radius:var(--w-r)}
.w-d-sillon .w-opinion{background:var(--w-papel);border:1px solid var(--w-borde);border-radius:var(--w-r)}
.w-d-sillon .w-zonas>li{border:1px solid var(--w-borde);border-radius:999px;background:var(--w-papel);font-weight:600}
.w-d-sillon .w-c-2 .w-contacto-cta{background:var(--w-hoja);color:#eaf6f3;border-radius:28px}
.w-d-sillon .w-c-2 .w-contacto-grande a{color:var(--w-ct-oscuro);text-decoration:none}
.w-d-sillon .w-c-2 .w-contacto-cta .w-boton{color:#eaf6f3;border-color:#eaf6f3}
.w-d-sillon .w-c-2 .w-contacto-cta .w-boton-lleno{background:#eaf6f3;color:var(--w-hoja);border-color:#eaf6f3}
@media (prefers-reduced-motion:no-preference){
  .w-d-sillon .w-flota-punto{animation:w-latido 2.4s ease-in-out infinite}
  @keyframes w-latido{50%{box-shadow:0 0 0 9px #2fae7d00}}
}
@container (min-width:760px){
  .w-d-sillon .w-cab-in{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
  .w-d-sillon .w-cab-vis{justify-self:end}
}
`,
};
