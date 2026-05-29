import { MetadataRoute } from 'next';
import { SERVICES } from '@/lib/constants';
import { NEIGHBORHOOD_DATA } from '@/lib/neighborhoods';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://houstonhandypros.com';
  const now = new Date().toISOString();

  const staticPages = [
    '', '/services', '/pricing', '/book', '/about', '/portfolio',
    '/reviews', '/blog', '/service-area', '/contact',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${base}/services/${s.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const neighborhoodPages = NEIGHBORHOOD_DATA.map((n) => ({
    url: `${base}/handyman/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...neighborhoodPages];
}
