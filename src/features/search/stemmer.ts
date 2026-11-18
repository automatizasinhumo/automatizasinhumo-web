import { newStemmer } from 'snowball-stemmers';

const spanish = newStemmer('spanish');

export function stemSpanishTerm(term: string): string {
  return spanish.stem(term.toLowerCase().normalize('NFC'));
}

export function tokenizeSearchTerms(value: string): string[] {
  return value.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
}
