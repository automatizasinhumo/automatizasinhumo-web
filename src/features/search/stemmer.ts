import { newStemmer } from 'snowball-stemmers';

const spanish = newStemmer('spanish');

export function stemSpanishTerm(term: string): string {
  return spanish.stem(term.toLowerCase().normalize('NFC'));
}

export function tokenizeSearchTerms(value: string): string[] {
  // NFC antes de partir: «invitación» (tilde combinada) sería «invitacio» + «n».
  return value.normalize('NFC').toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}
