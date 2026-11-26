/**
 * Tipografías de los diseños de autor, autoalojadas en /fonts/web/ (subconjunto latino, woff2,
 * de @fontsource; todas con licencia SIL Open Font License). Se declaran con el prefijo `ash-`
 * para no chocar con una fuente instalada del mismo nombre. El navegador solo descarga las que
 * la página usa de verdad.
 */
export const FUENTES_WEB: Readonly<Record<string, { archivo: string; peso: string }>> = {
  'ash-fraunces': { archivo: 'fraunces.woff2', peso: '100 900' },
  'ash-dm-sans': { archivo: 'dm-sans.woff2', peso: '100 1000' },
  'ash-archivo-black': { archivo: 'archivo-black.woff2', peso: '400' },
  'ash-archivo': { archivo: 'archivo.woff2', peso: '100 900' },
  'ash-cormorant': { archivo: 'cormorant-garamond.woff2', peso: '300 700' },
  'ash-outfit': { archivo: 'outfit.woff2', peso: '100 900' },
  'ash-anton': { archivo: 'anton.woff2', peso: '400' },
  'ash-manrope': { archivo: 'manrope.woff2', peso: '200 800' },
  'ash-dm-serif': { archivo: 'dm-serif-display.woff2', peso: '400' },
  'ash-instrument-sans': { archivo: 'instrument-sans.woff2', peso: '400 700' },
  'ash-bebas': { archivo: 'bebas-neue.woff2', peso: '400' },
  'ash-big-shoulders': { archivo: 'big-shoulders-display.woff2', peso: '100 900' },
  'ash-bricolage': { archivo: 'bricolage-grotesque.woff2', peso: '200 800' },
  'ash-playfair': { archivo: 'playfair-display.woff2', peso: '400 900' },
  'ash-space-grotesk': { archivo: 'space-grotesk.woff2', peso: '300 700' },
  'ash-syne': { archivo: 'syne.woff2', peso: '400 800' },
  'ash-plex-mono': { archivo: 'ibm-plex-mono.woff2', peso: '500' },
  'ash-dm-mono': { archivo: 'dm-mono.woff2', peso: '500' },
  'ash-zilla-slab': { archivo: 'zilla-slab.woff2', peso: '600' },
  'ash-young-serif': { archivo: 'young-serif.woff2', peso: '400' },
  'ash-lexend': { archivo: 'lexend.woff2', peso: '100 900' },
  'ash-saira-extra-condensed': { archivo: 'saira-extra-condensed.woff2', peso: '800' },
  'ash-chakra-petch': { archivo: 'chakra-petch.woff2', peso: '600' },
  'ash-calistoga': { archivo: 'calistoga.woff2', peso: '400' },
  'ash-work-sans': { archivo: 'work-sans.woff2', peso: '100 900' },
  'ash-public-sans': { archivo: 'public-sans.woff2', peso: '100 900' },
  'ash-bodoni-moda': { archivo: 'bodoni-moda.woff2', peso: '400 900' },
  'ash-hanken-grotesk': { archivo: 'hanken-grotesk.woff2', peso: '100 900' },
};

/**
 * `@font-face` de las familias pedidas (todas si no se dice), con los ficheros bajo `prefijo`
 * (p. ej. «/fonts/web/» o «https://tienda/fonts/web/» cuando la web se sirve en otro dominio).
 */
export function cssFuentes(prefijo: string, familias: readonly string[] = Object.keys(FUENTES_WEB)): string {
  return familias
    .filter((f) => Object.hasOwn(FUENTES_WEB, f))
    .map((f) => {
      const { archivo, peso } = FUENTES_WEB[f]!;
      return `@font-face{font-family:'${f}';font-style:normal;font-display:swap;font-weight:${peso};src:url('${prefijo}${archivo}') format('woff2')}`;
    })
    .join('');
}
