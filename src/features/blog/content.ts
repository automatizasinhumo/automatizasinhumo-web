// Adaptado de mearashadowfax/ScrewFast (MIT)
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type BlogEntry = CollectionEntry<'blog'>;

export async function entriesFor(): Promise<BlogEntry[]> {
  const entries = await getCollection('blog');
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function entryBySlug(slug: string): Promise<BlogEntry | undefined> {
  return getEntry('blog', slug);
}

export function pathFor(entry: BlogEntry): string {
  return `/blog/${entry.id}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}
