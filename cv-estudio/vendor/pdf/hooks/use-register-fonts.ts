// Adapted from Reactive Resume (MIT). Local-only font registration for automatizasinhumo:
// solo las familias de src/catalogo-formato.ts, servidas desde el propio motor (@fontsource, OFL-1.1).
// react-pdf descarga cada fichero la primera vez que se usa, así que registrar varias no pesa.
import type { ResumeData, Typography } from '@reactive-resume/schema/resume/data';
import { Font } from '#react-pdf-renderer';
import { FAMILIAS_FUENTE, type FamiliaFuente } from '../../../src/catalogo-formato';
import lato400 from '@fontsource/lato/files/lato-latin-400-normal.woff?url';
import lato700 from '@fontsource/lato/files/lato-latin-700-normal.woff?url';
import lato400i from '@fontsource/lato/files/lato-latin-400-italic.woff?url';
import lato700i from '@fontsource/lato/files/lato-latin-700-italic.woff?url';
import openSans400 from '@fontsource/open-sans/files/open-sans-latin-400-normal.woff?url';
import openSans700 from '@fontsource/open-sans/files/open-sans-latin-700-normal.woff?url';
import openSans400i from '@fontsource/open-sans/files/open-sans-latin-400-italic.woff?url';
import openSans700i from '@fontsource/open-sans/files/open-sans-latin-700-italic.woff?url';
import roboto400 from '@fontsource/roboto/files/roboto-latin-400-normal.woff?url';
import roboto700 from '@fontsource/roboto/files/roboto-latin-700-normal.woff?url';
import roboto400i from '@fontsource/roboto/files/roboto-latin-400-italic.woff?url';
import roboto700i from '@fontsource/roboto/files/roboto-latin-700-italic.woff?url';
import montserrat400 from '@fontsource/montserrat/files/montserrat-latin-400-normal.woff?url';
import montserrat700 from '@fontsource/montserrat/files/montserrat-latin-700-normal.woff?url';
import montserrat400i from '@fontsource/montserrat/files/montserrat-latin-400-italic.woff?url';
import montserrat700i from '@fontsource/montserrat/files/montserrat-latin-700-italic.woff?url';
import merriweather400 from '@fontsource/merriweather/files/merriweather-latin-400-normal.woff?url';
import merriweather700 from '@fontsource/merriweather/files/merriweather-latin-700-normal.woff?url';
import merriweather400i from '@fontsource/merriweather/files/merriweather-latin-400-italic.woff?url';
import merriweather700i from '@fontsource/merriweather/files/merriweather-latin-700-italic.woff?url';
import lora400 from '@fontsource/lora/files/lora-latin-400-normal.woff?url';
import lora700 from '@fontsource/lora/files/lora-latin-700-normal.woff?url';
import lora400i from '@fontsource/lora/files/lora-latin-400-italic.woff?url';
import lora700i from '@fontsource/lora/files/lora-latin-700-italic.woff?url';

const ARCHIVOS: Record<FamiliaFuente, [string, string, string, string]> = {
  Lato: [lato400, lato700, lato400i, lato700i],
  'Open Sans': [openSans400, openSans700, openSans400i, openSans700i],
  Roboto: [roboto400, roboto700, roboto400i, roboto700i],
  Montserrat: [montserrat400, montserrat700, montserrat400i, montserrat700i],
  Merriweather: [merriweather400, merriweather700, merriweather400i, merriweather700i],
  Lora: [lora400, lora700, lora400i, lora700i],
};

let registered = false;
export const resumeContentContainsCJK = (_data: ResumeData) => false;
export const resumeContentScripts = (_data: ResumeData) => new Set<never>();
export const registerFonts = (typography: Typography, ..._args: unknown[]): Typography => {
  if (!registered) {
    for (const family of FAMILIAS_FUENTE) {
      const [regular, bold, italic, boldItalic] = ARCHIVOS[family];
      Font.register({family, fonts:[{src:regular,fontWeight:400},{src:bold,fontWeight:700},{src:italic,fontWeight:400,fontStyle:'italic'},{src:boldItalic,fontWeight:700,fontStyle:'italic'}]});
    }
    registered = true;
  }
  const safeFamily=(family:string)=>(FAMILIAS_FUENTE as readonly string[]).includes(family)?family:'Lato';
  return {...typography,body:{...typography.body,fontFamily:safeFamily(typography.body.fontFamily)},heading:{...typography.heading,fontFamily:safeFamily(typography.heading.fontFamily)}};
};
