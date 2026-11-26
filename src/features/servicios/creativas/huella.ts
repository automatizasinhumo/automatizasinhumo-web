import type { Diseno } from './tipos';
import { lema, fotoO } from './piezas';

/*
 * Adaptado de la plantilla «Paws» de Freeframe (licencia MIT, (c) 2026 Freeframe; ver
 * licencias/freeframe-templates.txt): clínica veterinaria alegre en caqui y caléndula sobre avena,
 * titular redondo (Calistoga) con subrayado ondulado, huellas de fondo, botones de píldora con
 * base «pulsada», tarjetas flotantes con borde de tinta y la ilustración del perro, el gato y el
 * conejo. Reescrito para el contrato de diseños de autor (HTML + CSS con ámbito, sin JavaScript);
 * la ilustración es la de la plantilla.
 */

/** Sin foto: el perro, el gato y el conejo sobre un círculo amarillo (de «Paws»). */
const ILUSTRACION = `<svg class="w-ilus" viewBox="0 0 600 500" aria-hidden="true" focusable="false"><path d="M300 34c118-6 236 54 250 170 14 112-58 222-196 246-130 22-262-26-298-142C20 194 120 44 300 34Z" fill="#ffcd4d"/><path d="M92 104c6-14 22-12 24 0 2-12 18-14 24 0 8 18-24 34-24 34s-32-16-24-34Z" fill="#ec6331" stroke="#2d2219" stroke-width="3" stroke-linejoin="round"/><g fill="none" stroke="#2d2219" stroke-width="3" stroke-linecap="round"><path d="M506 112v22M495 123h22M470 66v14M463 73h14"/></g><ellipse cx="300" cy="438" rx="250" ry="40" fill="#84c8ea" stroke="#2d2219" stroke-width="3.5"/><path d="M86 432c60 12 150 16 214 16s160-4 214-16" fill="none" stroke="#1f78a8" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M362 392c40-6 66-34 58-62" fill="none" stroke-width="9"/><path d="M362 392c40-6 66-34 58-62" fill="none" stroke="#e8a25a" stroke-width="3"/><path d="M246 252c-34 40-46 104-36 176h180c10-72-2-136-36-176Z" fill="#e8a25a"/><path d="M300 286c-22 0-34 30-34 62 0 34 14 70 34 80 20-10 34-46 34-80 0-32-12-62-34-62Z" fill="#fff4e3"/><path d="M268 340c-4 30-2 64 2 88M332 340c4 30 2 64-2 88" fill="none"/><ellipse cx="258" cy="430" rx="22" ry="12" fill="#e8a25a"/><ellipse cx="342" cy="430" rx="22" ry="12" fill="#e8a25a"/><path d="M252 424v8M262 424v8M336 424v8M346 424v8" fill="none" stroke-width="2.5"/><path d="M250 262c30 14 70 14 100 0l-4 18c-30 12-62 12-92 0Z" fill="#c2441a"/></g><circle cx="300" cy="292" r="12" fill="#ffcd4d" stroke="#2d2219" stroke-width="3"/><g transform="translate(204 104) scale(1.6)"><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M34 34C18 33 9 52 12 70c2 12 12 16 20 9 5-5 7-16 8-30" fill="#9a5a2e"/><path d="M86 34c16-1 25 18 22 36-2 12-12 16-20 9-5-5-7-16-8-30" fill="#9a5a2e"/><path d="M60 22c22 0 33 15 33 37 0 26-15 41-33 41S27 85 27 59c0-22 11-37 33-37Z" fill="#e8a25a"/><path d="M70 31c10 2 17 10 17 21-7 2-15-1-19-7-3-5-2-11 2-14Z" fill="#9a5a2e" stroke="none"/><ellipse cx="60" cy="78" rx="19" ry="15" fill="#fff4e3"/><path d="M55 87c0 9 10 9 10 0" fill="#ef7c8e"/><path d="M52 69c0-5 16-5 16 0 0 4-5 7-8 8-3-1-8-4-8-8Z" fill="#2d2219"/><path d="M60 77v5m0 0c-2 5-9 5-11 1m11-1c2 5 9 5 11 1" fill="none"/></g><circle cx="47" cy="55" r="4.6" fill="#2d2219"/><circle cx="73" cy="55" r="4.6" fill="#2d2219"/><circle cx="48.6" cy="53.4" r="1.5" fill="#fff"/><circle cx="74.6" cy="53.4" r="1.5" fill="#fff"/><ellipse cx="38" cy="68" rx="5" ry="3" fill="#f2836f" opacity=".45"/><ellipse cx="82" cy="68" rx="5" ry="3" fill="#f2836f" opacity=".45"/></g><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M98 334c-22 26-28 64-22 96h120c6-32 0-70-22-96Z" fill="#a3adbf"/><path d="M110 360c-6 20-4 46 2 70M162 360c6 20 4 46-2 70" fill="none" stroke="#6b768b" stroke-width="3"/><path d="M136 352c-14 0-20 22-20 44 0 18 8 34 20 34s20-16 20-34c0-22-6-44-20-44Z" fill="#fff"/><path d="M196 426c26 2 44-10 40-30-3-14-18-18-26-10" fill="none" stroke-width="10"/><path d="M196 426c26 2 44-10 40-30-3-14-18-18-26-10" fill="none" stroke="#a3adbf" stroke-width="3.5"/><ellipse cx="114" cy="432" rx="16" ry="9" fill="#fff"/><ellipse cx="158" cy="432" rx="16" ry="9" fill="#fff"/></g><g transform="translate(67 228) scale(1.15)"><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M30 54 25 17l29 17" fill="#a3adbf"/><path d="M90 54l5-37-29 17" fill="#a3adbf"/><path d="M33 41 31 27l12 8" fill="#f4b6b0" stroke="none"/><path d="M87 41l2-14-12 8" fill="#f4b6b0" stroke="none"/><path d="M60 30c25 0 38 16 38 37 0 20-17 33-38 33S22 87 22 67c0-21 13-37 38-37Z" fill="#a3adbf"/><path d="M60 33v9M51 35l2 7M69 35l-2 7M24 63h8M25 71l7-2M96 63h-8M95 71l-7-2" fill="none" stroke="#6b768b" stroke-width="3"/><path d="M60 68c-10 0-17 6-17 13 0 7 8 11 17 11s17-4 17-11c0-7-7-13-17-13Z" fill="#fff"/><path d="M55 72h10l-5 5.5Z" fill="#e8838f" stroke-width="2.5"/><path d="M60 78v3c-2 4-7 4-9 1m9-1c2 4 7 4 9 1M40 80l-21-4M40 85l-19 4M80 80l21-4M80 85l19 4" fill="none" stroke-width="2.5"/></g><ellipse cx="45" cy="59" rx="5.6" ry="6.4" fill="#c7dc63" stroke="#2d2219" stroke-width="2.5"/><ellipse cx="75" cy="59" rx="5.6" ry="6.4" fill="#c7dc63" stroke="#2d2219" stroke-width="2.5"/><ellipse cx="45" cy="59" rx="1.9" ry="4.6" fill="#2d2219"/><ellipse cx="75" cy="59" rx="1.9" ry="4.6" fill="#2d2219"/></g><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M410 432c-14-34 4-78 52-80 46-2 74 30 66 80Z" fill="#f3e3c8"/><path d="M488 362c18 8 34 30 36 60" fill="none" stroke="#c98b56" stroke-width="10" stroke-linecap="butt" opacity="0"/><circle cx="530" cy="414" r="13" fill="#fff"/><ellipse cx="438" cy="434" rx="18" ry="9" fill="#f3e3c8"/></g><g transform="translate(392 262) scale(1.08)"><g stroke="#2d2219" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M45 50C34 31 33 9 43 6c10-3 15 21 13 44" fill="#f3e3c8"/><path d="M46 42c-6-13-6-27-2-29 5-2 7 15 6 29" fill="#f6b3ab" stroke="none"/><path d="M67 50c4-20 15-41 25-37 9 4 0 28-12 42" fill="#c98b56"/><path d="M72 44c4-14 11-26 16-24 5 2-1 16-9 27" fill="#f6b3ab" stroke="none"/><path d="M60 41c22 0 34 16 34 35 0 18-15 28-34 28S26 94 26 76c0-19 12-35 34-35Z" fill="#f3e3c8"/><path d="M72 45c12 3 20 13 21 26-9 0-17-5-20-12-2-5-3-9-1-14Z" fill="#c98b56" stroke="none"/><path d="M57 89h6v6h-6Z" fill="#fff" stroke-width="2.5"/><path d="M56 80h8l-4 4.5Z" fill="#e8838f" stroke-width="2.5"/><path d="M60 84.5v3c-2 3-5 3-7 1m7-1c2 3 5 3 7 1M44 84l-16-2M44 88l-14 4M76 84l16-2M76 88l14 4" fill="none" stroke-width="2.5"/></g><circle cx="46" cy="71" r="4.6" fill="#2d2219"/><circle cx="74" cy="71" r="4.6" fill="#2d2219"/><circle cx="47.5" cy="69.5" r="1.5" fill="#fff"/><circle cx="75.5" cy="69.5" r="1.5" fill="#fff"/><ellipse cx="38" cy="82" rx="4.5" ry="2.8" fill="#f2836f" opacity=".45"/><ellipse cx="82" cy="82" rx="4.5" ry="2.8" fill="#f2836f" opacity=".45"/></g><g fill="#2f7d32" stroke="#2d2219" stroke-width="3" stroke-linejoin="round"><path d="M532 300c-26-6-40 10-38 30 24 4 38-10 38-30Z"/><path d="M500 330c8-10 18-18 30-28" fill="none" stroke-linecap="round"/></g></svg>`;

const HUELLA = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cellipse cx='12' cy='16' rx='5.2' ry='4.4'/%3E%3Cellipse cx='5' cy='10.5' rx='2.2' ry='2.8'/%3E%3Cellipse cx='9.3' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='14.7' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='19' cy='10.5' rx='2.2' ry='2.8'/%3E%3C/svg%3E\") center/contain no-repeat";
const HUELLAS = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23ead9c4' opacity='.55'%3E%3Cg transform='translate(14 18) rotate(-18 12 12)'%3E%3Cellipse cx='12' cy='16' rx='5.2' ry='4.4'/%3E%3Cellipse cx='5' cy='10.5' rx='2.2' ry='2.8'/%3E%3Cellipse cx='9.3' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='14.7' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='19' cy='10.5' rx='2.2' ry='2.8'/%3E%3C/g%3E%3Cg transform='translate(72 70) rotate(22 12 12)'%3E%3Cellipse cx='12' cy='16' rx='5.2' ry='4.4'/%3E%3Cellipse cx='5' cy='10.5' rx='2.2' ry='2.8'/%3E%3Cellipse cx='9.3' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='14.7' cy='5.6' rx='2.2' ry='2.9'/%3E%3Cellipse cx='19' cy='10.5' rx='2.2' ry='2.8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";
const ONDA = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 12'%3E%3Cpath d='M2 7c10-6 18 4 28 0s18-6 28 0 18 4 28 0 18-6 32-1' fill='none' stroke='%23ffb81c' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E\") bottom/100% .42em no-repeat";

export const huella: Diseno = {
  id: 'huella',
  nombre: 'Huella',
  descripcion: 'Veterinaria alegre en caqui y caléndula, titular redondo con subrayado ondulado, huellas de fondo y tarjetas flotantes. Para clínicas veterinarias, peluquerías caninas y tiendas de mascotas.',
  color: '#c2441a',
  fondoClaro: '#f4e9d6',
  fondoOscuro: '#2d2219',
  fuentes: ['ash-calistoga', 'ash-work-sans'],
  titulo: "'ash-calistoga', 'Cooper Black', Georgia, serif",
  texto: "'ash-work-sans', system-ui, sans-serif",
  servicios: 1,
  galeria: 2,
  opiniones: 2,
  contacto: 2,
  orden: ['servicios', 'sobre', 'galeria', 'opiniones', 'horario', 'preguntas', 'zonas', 'contacto'],
  sectores: ['mascotas'],
  palabras: ['veterinari', 'mascota', 'canin', 'felin', 'perro', 'gato', 'peluquería canina'],
  titulos: { servicios: 'Cuidamos de toda la familia', sobre: 'El equipo', galeria: 'La clínica', opiniones: 'Lo que dicen sus dueños', horario: 'Horario', preguntas: 'Antes de la primera visita', zonas: 'Atendemos en', contacto: 'Pide cita' },
  muestra: {
    negocio: 'Clínica Veterinaria Trébol',
    sector: 'Clínica veterinaria',
    lema: 'Perros, gatos y conejos atendidos sin prisas, con citas que se respetan y el presupuesto claro antes de cada tratamiento.',
    servicios: [
      { nombre: 'Consulta y revisión anual', precio: '35 €', texto: 'Exploración completa, peso, dientes y plan de vacunas.' },
      { nombre: 'Vacunas y desparasitación', precio: 'desde 25 €', texto: 'Calendario para cachorros y recuerdos anuales, con cartilla al día.' },
      { nombre: 'Peluquería e higiene', precio: 'desde 30 €', texto: 'Baño, corte, uñas y oídos, con cita y sin jaulas.' },
    ],
  },
  cabecera: (c) => {
    const { d, esc } = c;
    const h = c.horario[0];
    const ante = d.sector ? `<p class="w-sector">${esc(d.sector)}</p>` : '';
    const abierto = h ? `<p class="w-abierto"><span aria-hidden="true"></span>${esc(h[0] ? `${h[0]}: ${h[1]}` : h[1])}</p>` : '';
    const s = d.servicios?.[0];
    const t1 = s ? `<div class="w-flota w-flota-1"><p class="w-flota-t">${esc(s.nombre)}</p>${s.precio ? `<p class="w-flota-p">${esc(s.precio)}</p>` : ''}</div>` : '';
    const z = c.zonas[0];
    const t2 = z ? `<div class="w-flota w-flota-2"><span class="w-flota-h" aria-hidden="true"></span><p><strong>Atendemos en</strong>${esc(z)}</p></div>` : '';
    return `<header class="w-cab w-cab-huella${c.foto ? '' : ' w-sin-foto'}"><div class="w-in w-cab-in"><div class="w-cab-txt">
${ante}<h1><span>${esc(d.negocio)}</span></h1>
${lema(c, 'w-lema-bloque')}${c.bloqueAcciones}${abierto}
</div><div class="w-cab-vis"><div class="w-mascotas">${fotoO(c, ILUSTRACION)}</div>${t1}${t2}</div></div></header>`;
  },
  css: `
.w-d-huella{--w-fondo:#fbf5ea;--w-papel:#fffdf8;--w-tinta:#2d2219;--w-suave:#4a3d32;--w-borde:#ead9c4;--w-panel:#f4e9d6;--w-caqui:#c2441a;--w-caqui-h:#862f17;--w-calendula:#ffb81c;--w-hoja:#256628;--w-r:28px;--w-esp:24px}
.w-d-huella .w-nav{background:var(--w-papel);border-bottom:2px solid var(--w-borde)}
.w-d-huella .w-nav-marca{font-family:var(--w-ft-titulo);font-weight:400}
.w-d-huella .w-boton{border-radius:999px;border-width:2px;font-weight:700;border-color:var(--w-tinta);color:var(--w-tinta);background:var(--w-papel)}
.w-d-huella .w-boton-lleno{background:var(--w-caqui);color:#fff;border-color:var(--w-caqui);box-shadow:0 4px 0 var(--w-caqui-h)}
.w-d-huella .w-boton:active{transform:translateY(2px)}
.w-d-huella .w-cab{background:${HUELLAS},var(--w-fondo);padding-block:clamp(32px,6cqw,84px)}
.w-d-huella .w-cab-in{display:grid;gap:clamp(30px,5cqw,60px);align-items:center}
.w-d-huella .w-cab-txt>*+*{margin-top:clamp(14px,2cqw,22px)}
.w-d-huella .w-sector{display:inline-flex;align-items:center;gap:.5rem;margin:0;font:700 .82rem/1.2 var(--w-ft-texto);letter-spacing:.12em;text-transform:uppercase;color:#a53816}
.w-d-huella .w-sector::before{content:"";flex:none;width:.95rem;height:.95rem;background:currentColor;-webkit-mask:${HUELLA};mask:${HUELLA}}
.w-d-huella .w-cab h1{font-size:min(clamp(2.7rem,7.4cqw,5rem),var(--w-h1-tope,99em));font-weight:400;line-height:1.06;letter-spacing:-.01em;overflow-wrap:break-word;text-wrap:balance;color:var(--w-tinta)}
.w-d-huella .w-cab h1 span{background:${ONDA};padding-bottom:.14em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.w-d-huella .w-cab .w-lema-bloque{font-size:clamp(1.06rem,2.1cqw,1.24rem);line-height:1.65;color:var(--w-suave);max-width:44ch}
.w-d-huella .w-cab .w-boton{min-height:52px;padding-inline:26px}
.w-d-huella .w-abierto{display:inline-flex;align-items:center;gap:.55rem;padding:.35rem .9rem;border-radius:999px;background:#dcf2d8;color:var(--w-hoja);font-weight:700;font-size:.92rem}
.w-d-huella .w-abierto span{width:.58rem;height:.58rem;border-radius:50%;background:currentColor}
.w-d-huella .w-cab-vis{position:relative;min-width:0;width:100%;max-width:36rem;justify-self:center;padding:24px 0 34px}
.w-d-huella .w-mascotas .w-ilus{display:block;width:100%;height:auto;aspect-ratio:6/5}
.w-d-huella .w-cab-foto{margin:0;border:2px solid var(--w-tinta);border-radius:32px;overflow:hidden;box-shadow:0 6px 0 var(--w-tinta)}
.w-d-huella .w-cab-foto img{width:100%;aspect-ratio:6/5;object-fit:cover}
.w-d-huella .w-flota{position:absolute;display:flex;align-items:center;gap:12px;max-width:62%;padding:12px 16px;border:2px solid var(--w-tinta);border-radius:1.4rem;background:var(--w-papel);box-shadow:0 5px 0 var(--w-tinta)}
.w-d-huella .w-flota p{margin:0;font-size:.92rem;line-height:1.35;color:var(--w-suave)}
.w-d-huella .w-flota strong{display:block;color:var(--w-tinta)}
.w-d-huella .w-flota-1{left:0;bottom:0;flex-direction:column;align-items:flex-start;gap:2px}
.w-d-huella .w-flota-t{font-family:var(--w-ft-titulo);font-size:1.08rem!important;color:var(--w-tinta)!important}
.w-d-huella .w-flota-p{font-weight:700;color:#a53816!important}
.w-d-huella .w-flota-2{right:0;top:0}
.w-d-huella .w-flota-h{flex:none;display:grid;width:42px;height:42px;border-radius:14px;background:#ffe6d8;position:relative}
.w-d-huella .w-flota-h::after{content:"";position:absolute;inset:9px;background:var(--w-caqui);-webkit-mask:${HUELLA};mask:${HUELLA}}
.w-d-huella .w-sec h2{font-weight:400;font-size:clamp(2rem,5cqw,2.9rem);line-height:1.1;letter-spacing:-.01em}
.w-d-huella .w-sec:nth-of-type(even){background:var(--w-panel)}
.w-d-huella .w-s-1>li{background:var(--w-papel);border:2px solid var(--w-borde);border-radius:var(--w-r)}
.w-d-huella .w-servicio h3{font-family:var(--w-ft-titulo);font-weight:400;font-size:1.35rem}
.w-d-huella .w-galeria img{border:2px solid var(--w-tinta);border-radius:var(--w-r)}
.w-d-huella .w-opinion{background:var(--w-papel);border:2px solid var(--w-tinta);border-radius:1.4rem;box-shadow:0 5px 0 var(--w-tinta)}
.w-d-huella .w-zonas>li{border:2px solid var(--w-borde);border-radius:999px;background:var(--w-papel);font-weight:600}
.w-d-huella .w-c-2 .w-contacto-cta{background:${HUELLAS},var(--w-calendula);color:var(--w-tinta);border:2px solid var(--w-tinta);border-radius:32px;box-shadow:0 6px 0 var(--w-tinta)}
.w-d-huella .w-c-2 .w-contacto-grande a{color:var(--w-tinta)}
.w-d-huella .w-c-2 .w-contacto-cta .w-boton{background:var(--w-papel)}
.w-d-huella .w-c-2 .w-contacto-cta .w-boton-lleno{background:var(--w-tinta);color:#fff;border-color:var(--w-tinta);box-shadow:none}
@media (prefers-reduced-motion:no-preference){
  .w-d-huella .w-flota-1{animation:w-flota 5s ease-in-out infinite}
  .w-d-huella .w-flota-2{animation:w-flota 6.5s ease-in-out -2s infinite}
  .w-d-huella .w-abierto span{animation:w-pulso 2s ease-in-out infinite}
  @keyframes w-flota{50%{transform:translateY(-6px)}}
  @keyframes w-pulso{50%{opacity:.35}}
}
@container (max-width:479px){
  .w-d-huella .w-flota-2{display:none}
}
@container (min-width:780px){
  .w-d-huella .w-cab-in{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
  .w-d-huella .w-cab-vis{justify-self:end}
}
`,
};
