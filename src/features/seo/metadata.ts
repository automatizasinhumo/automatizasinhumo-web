// Adaptado de mearashadowfax/ScrewFast (MIT)
export type PageKind =
  | { type: 'WebPage' }
  | {
      type: 'BlogPosting';
      image: string;
      datePublished: Date;
      author: string;
    }
  | { type: 'Article'; image: string };

export interface PageMetadataInput {
  title: string;
  description: string;
  canonical: string;
  kind?: PageKind;
}

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  jsonLd: Record<string, unknown>;
}

export function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).href;
}

export function buildPageMetadata(input: PageMetadataInput): PageMetadata {
  const kind = input.kind ?? { type: 'WebPage' };
  let jsonLd: Record<string, unknown>;

  if (kind.type === 'BlogPosting') {
    jsonLd = {
      '@type': 'BlogPosting',
      headline: input.title,
      description: input.description,
      image: absoluteUrl(kind.image, new URL(input.canonical).origin),
      datePublished: kind.datePublished.toISOString(),
      author: { '@type': 'Person', name: kind.author },
      mainEntityOfPage: { '@type': 'WebPage', '@id': input.canonical },
    };
  } else if (kind.type === 'Article') {
    jsonLd = {
      '@type': 'Article',
      headline: input.title,
      description: input.description,
      image: absoluteUrl(kind.image, new URL(input.canonical).origin),
      mainEntityOfPage: { '@type': 'WebPage', '@id': input.canonical },
    };
  } else {
    jsonLd = {
      '@type': 'WebPage',
      '@id': input.canonical,
      url: input.canonical,
      name: input.title,
      description: input.description,
    };
  }

  return {
    title: input.title,
    description: input.description,
    canonical: input.canonical,
    jsonLd: {
      '@context': 'https://schema.org',
      ...jsonLd,
      inLanguage: 'es-ES',
    },
  };
}
