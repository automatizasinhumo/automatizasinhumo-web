declare module 'snowball-stemmers' {
  interface Stemmer {
    stem(term: string): string;
  }

  export function newStemmer(language: string): Stemmer;
}
