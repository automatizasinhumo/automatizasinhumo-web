import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

const articleFiles = [
  'cuanto-cuesta-una-web-local.md',
  'web-o-redes-sociales.md',
  'web-para-salir-en-google.md',
];

function frontmatterValue(source, key) {
  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*$/m)?.[1];
  if (!frontmatter) throw new Error('Falta el bloque YAML de metadatos del artículo.');
  const value = parse(frontmatter)?.[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Falta «${key}» en los metadatos YAML del artículo.`);
  }
  return value;
}

describe('blog article metadata', () => {
  it('provides unique titles and descriptions for all three articles', () => {
    const metadata = articleFiles.map((file) => {
      const source = readFileSync(new URL(`../../src/content/blog/${file}`, import.meta.url), 'utf8');
      return {
        title: frontmatterValue(source, 'title'),
        description: frontmatterValue(source, 'description'),
      };
    });

    expect(metadata.map((entry) => entry.title)).toEqual([
      'Cuánto cuesta una web para un negocio local',
      'Web o solo redes sociales',
      'Qué necesita una web para salir en Google',
    ]);
    expect(new Set(metadata.map((entry) => entry.title)).size).toBe(3);
    expect(new Set(metadata.map((entry) => entry.description)).size).toBe(3);
  });
});
