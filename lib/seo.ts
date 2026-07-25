import { Metadata } from 'next'

export const siteConfig = {
  name: 'Haris Shakeel',
  url: 'https://www.twopixel.org',
  description:
    "Haris Shakeel is an Agentic AI and full-stack developer. He architects AI systems with the Claude Agent SDK and builds scalable MERN platforms, and also designs high-converting landing pages and funnels for D2C and e-commerce brands.",
  location: 'Lahore, Pakistan',
  email: 'harisshakeel061@gmail.com',
  author: 'Haris Shakeel',
  links: {
    linkedin: 'https://www.linkedin.com/in/haris-shakeel-5559852b9',
    github: 'https://github.com/harisshakeel',
    upwork: 'https://www.upwork.com/freelancers/~014b01aba5c97396c6?viewMode=1',
  },
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Haris Shakeel | Agentic AI & Full-Stack Developer',
    template: '%s | Haris Shakeel',
  },
  description: siteConfig.description,
  keywords: [
    'Agentic AI developer',
    'Claude Agent SDK',
    'full-stack developer',
    'MERN stack',
    'Next.js developer',
    'React developer',
    'Python',
    'landing page design',
    'sales funnels',
    'Figma',
    'Shopify',
    'CRO',
    'Haris Shakeel',
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Haris Shakeel | Agentic AI & Full-Stack Developer',
    description: siteConfig.description,
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Haris Shakeel — Agentic AI & Full-Stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haris Shakeel | Agentic AI & Full-Stack Developer',
    description: siteConfig.description,
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/icon.svg', shortcut: '/icon.svg' },
  manifest: '/manifest.json',
  alternates: { canonical: siteConfig.url },
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Haris Shakeel',
  alternateName: 'Muhammad Haris',
  url: siteConfig.url,
  image: `${siteConfig.url}/images/owners/harus.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  jobTitle: 'Agentic AI & Full-Stack Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'FAST NUCES Lahore',
  },
  knowsAbout: [
    'Agentic AI',
    'Claude Agent SDK',
    'Model Context Protocol (MCP)',
    'Full-Stack Development',
    'MERN Stack',
    'Next.js',
    'React',
    'Python',
    'Landing Page Design',
    'Sales Funnel Design',
    'Conversion Rate Optimization',
    'Figma',
    'Shopify',
  ],
  sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.upwork],
}

// Backwards-compatible alias so existing imports keep working.
export const organizationSchema = personSchema

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { '@type': 'Person', name: 'Haris Shakeel' },
}

export function buildPageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteConfig.url}${path}`
  const ogImage = image ?? '/images/og-image.png'
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
      siteName: 'TwoPixel',
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
