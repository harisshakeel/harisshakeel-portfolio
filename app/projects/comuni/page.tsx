import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Comuni Case Study, Local Social Platform with Event Discovery",
  description:
    "How TwoPixel built Comuni: a Next.js social platform connecting communities through local event discovery, interactive maps, and neighborhood networking.",
  path: "/projects/comuni",
})

const data: CaseStudyData = {
  slug: "comuni",
  client: "Comuni",
  logo: "/images/projects/comuni.png",
  category: "Social Platform",
  industry: "Consumer / Community",
  website: { url: "https://comuni-delta.vercel.app/", label: "comuni-delta.vercel.app" },
  liveUrl: "https://comuni-delta.vercel.app/",
  liveLabel: "View live project",
  headline: "How Comuni connects neighborhoods through events and an interactive map.",
  summary:
    "A Next.js community platform that bridges digital and physical connections, letting users discover local events, connect with neighbors, and participate in community discussions through an interactive map-based interface.",
  sections: [
    {
      heading: "Overview",
      body:
        "Comuni is built on a simple bet: people want to know what's happening on their street, not their feed. We made the map the homepage, every event, every group, every conversation lives somewhere, and tuned the rest of the product around that single idea.",
    },
    {
      heading: "What we built",
      bullets: [
        "Interactive map interface for discovering local events and community points of interest",
        "Event creation and RSVP system with user profiles and community groups",
        "Neighborhood feed with posts, comments, and local news aggregation",
        "Server-side rendering with Next.js for fast initial load and strong SEO",
        "Mobile-responsive design with Material UI component library",
      ],
    },
  ],
  technologies: [
    "Next.js",
    "Material UI",
    "JavaScript",
    "Google Maps API",
    "Responsive Design",
    "UX/UI Design",
  ],
}

export default function ComuniPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Comuni", href: "/projects/comuni" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Comuni Social Platform",
      description: "Next.js social platform with local event discovery and interactive maps",
      url: "/projects/comuni",
      clientName: "Comuni",
    }),
  ]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CaseStudy data={data} />
    </PageLayout>
  )
}
