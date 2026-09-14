import { MetadataRoute } from 'next'

const BASE = 'https://www.harisshakeel.site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  // Keep in sync with the live entries in `components/brutalist-projects.tsx`.
  // `destiny` is retired and intentionally omitted.
  const projectPages: MetadataRoute.Sitemap = [
    'xision',
    'mavis',
    'metamorphix',
    'sentinel',
    'clusterden',
    'payback',
    'meddo',
    'comuni',
    'green-n-solar',
    'dynasty',
    '613-guys',
  ].map((slug) => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages]
}
