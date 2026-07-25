import { MetadataRoute } from 'next'

const BASE = 'https://www.twopixel.org'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = [
    'automate',
    'build',
    'brand-and-design',
    'grow',
  ].map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectPages: MetadataRoute.Sitemap = [
    'clusterden',
    'payback',
    'meddo',
    'comuni',
    '613-guys',
    'green-n-solar',
    'dynasty',
  ].map((slug) => ({
    url: `${BASE}/projects/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...projectPages]
}
