import { siteConfig } from '@/lib/seo'

const BASE = siteConfig.url

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
    })),
  }
}

export function serviceSchema({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE}${url}`,
    image: image ? `${BASE}${image}` : undefined,
    provider: {
      '@type': 'Organization',
      name: 'TwoPixel',
      url: BASE,
    },
    areaServed: 'Worldwide',
    serviceType: name,
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  image?: string
  authorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE}${url}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    image: image ? `${BASE}${image}` : `${BASE}/images/og-image.png`,
    author: {
      '@type': 'Person',
      name: authorName ?? 'TwoPixel Team',
      url: `${BASE}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TwoPixel',
      logo: { '@type': 'ImageObject', url: `${BASE}/logos/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}${url}` },
  }
}

export function caseStudySchema({
  name,
  description,
  url,
  clientName,
  result,
}: {
  name: string
  description: string
  url: string
  clientName: string
  result?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${BASE}${url}`,
    creator: { '@type': 'Organization', name: 'TwoPixel', url: BASE },
    about: { '@type': 'Organization', name: clientName },
    ...(result ? { abstract: result } : {}),
  }
}

export function personSchema({
  name,
  jobTitle,
  email,
  description,
}: {
  name: string
  jobTitle: string
  email: string
  description?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    email,
    description,
    worksFor: { '@type': 'Organization', name: 'TwoPixel', url: BASE },
    url: BASE + '/about',
  }
}

export function reviewSchema({
  authorName,
  reviewBody,
  ratingValue,
  datePublished,
}: {
  authorName: string
  reviewBody: string
  ratingValue: number
  datePublished?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: authorName },
    reviewBody,
    datePublished: datePublished ?? new Date().toISOString().split('T')[0],
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: { '@type': 'Organization', name: 'TwoPixel', url: BASE },
  }
}

export function aggregateRatingSchema({
  ratingValue,
  reviewCount,
}: {
  ratingValue: number
  reviewCount: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TwoPixel',
    url: BASE,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}
