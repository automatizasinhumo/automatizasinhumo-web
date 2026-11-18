import { newStemmer } from 'snowball-stemmers';

const spanish = newStemmer('spanish');

// Snowball solo reconoce los sufijos con tilde («facturación»); quien escribe sin
// tildes («facturacion») se queda sin lema y no casa con «facturas».
const SIN_TILDE: [RegExp, string][] = [
  [/cion(es)?$/, 'ción'],
  [/sion(es)?$/, 'sión'],
  [/logia(s)?$/, 'logía'],
];

export function stemSpanishTerm(term: string): string {
  const word = term.toLowerCase().normalize('NFC');
  const rule = SIN_TILDE.find(([pattern]) => pattern.test(word));
  return spanish.stem(rule ? word.replace(rule[0], rule[1]) : word);
}

export function tokenizeSearchTerms(value: string): string[] {
  // NFC antes de partir: «invitación» (tilde combinada) sería «invitacio» + «n».
  return value.normalize('NFC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}
