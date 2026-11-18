import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const articleFiles = [
  'cuanto-cuesta-una-web-local.md',
  'web-o-redes-sociales.md',
  'web-para-salir-en-google.md',
];

function frontmatterValue(source, key) {
  const frontmatter = source.split(/^---\s*$/m)[1];
  const value = frontmatter?.match(new RegExp(`^${key}:\\s*"([^"]+)"$`, 'm'))?.[1];
  if (!value) throw new Error(`Missing "${key}" in blog article frontmatter.`);
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
