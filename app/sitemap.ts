// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://rotfall.xyz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}