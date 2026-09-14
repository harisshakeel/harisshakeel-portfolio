import { Metadata } from 'next'

export const siteConfig = {
  name: 'Haris Shakeel',
  url: 'https://www.harisshakeel.site',
  description:
    "Haris Shakeel is an AI/ML engineer building applied computer vision, physics-based simulation, and agentic AI systems, from production CV pipelines to multi-tenant platforms on the Claude Agent SDK and MCP.",
  location: 'Lahore, Pakistan',
  email: 'harisshakeel061@gmail.com',
  author: 'Haris Shakeel',
  links: {
    linkedin: 'https://www.linkedin.com/in/haris-shakeel-5559852b9',
    github: 'https://github.com/harisshakeel',
    upwork: 'https://www.upwork.com/freelancers/~014b01aba5c97396c6?viewMode=1',
  },
}

const defaultTitle = 'Haris Shakeel | AI/ML Engineer, Computer Vision & Agentic AI'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: '%s | Haris Shakeel',
  },
  description: siteConfig.description,
  // Mirrors the current resume.
  keywords: [
    'Haris Shakeel',
    'AI/ML engineer',
    'computer vision engineer',
    'agentic AI developer',
    'Claude Agent SDK',
    'Model Context Protocol',
    'virtual try-on',
    '3D body modelling',
    'MediaPipe',
    'SMPL-X',
    'PyTorch',
    'FastAPI',
    'Python',
    'Next.js',
    'MERN stack',
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
    title: defaultTitle,
    description: siteConfig.description,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: defaultTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: siteConfig.description,
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  manifest: '/manifest.json',
  alternates: { canonical: siteConfig.url },
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Haris Shakeel',
  alternateName: 'Muhammad Haris',
  url: siteConfig.url,
  image: `${siteConfig.url}/images/haris-portrait.webp`,
  description: siteConfig.description,
  email: siteConfig.email,
  jobTitle: 'AI/ML Engineer',
  worksFor: { '@type': 'Organization', name: 'Xision' },
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
    'Computer Vision',
    'Pose Estimation',
    'Monocular Depth Estimation',
    '3D Body Modelling',
    'Cloth-Physics Simulation',
    'Agentic AI',
    'Claude Agent SDK',
    'Model Context Protocol (MCP)',
    'Multi-Agent Orchestration',
    'PyTorch',
    'FastAPI',
    'Python',
    'TypeScript',
    'Next.js',
    'MERN Stack',
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
  const ogImage = image ?? '/images/og-image.jpg'
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
      siteName: 'Haris Shakeel',
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
