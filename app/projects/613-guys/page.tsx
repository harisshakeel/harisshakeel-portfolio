import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "613 Guys Case Study, Commercial Service Website & Booking Funnel",
  description:
    "How TwoPixel built 613 Guys: a professional commercial service website with optimized image loading, brand identity design, and a client booking conversion funnel.",
  path: "/projects/613-guys",
})

const data: CaseStudyData = {
  slug: "613-guys",
  client: "613 Guys",
  logo: "/images/projects/613guys.png",
  category: "Commercial Website",
  industry: "Local Services",
  website: { url: "https://613-guys.vercel.app/", label: "613-guys.vercel.app" },
  liveUrl: "https://613-guys.vercel.app/",
  liveLabel: "View live project",
  headline: "How 613 Guys turned local visitors into booked clients.",
  summary:
    "A high-performance commercial service website built to convert local visitors into booked clients, complete with brand identity design, image optimization, and a streamlined contact/booking funnel.",
  sections: [
    {
      heading: "Overview",
      body:
        "613 Guys came to us before they had a logo. We built the brand and the site as a single project, every typographic and color decision tested in the layout where it mattered most: the booking page. The result is a website that loads fast on a parking-lot phone signal and turns a glance into a lead.",
    },
    {
      heading: "What we built",
      bullets: [
        "Full brand identity design including logo, color palette, and typography system",
        "High-performance Next.js website with automatic image optimization via next/image",
        "Service pages with clear value propositions and visual before/after showcases",
        "Streamlined booking inquiry funnel with contact form and WhatsApp CTA integration",
        "Fully responsive mobile-first design for local customers browsing on phones",
      ],
    },
  ],
  technologies: [
    "Next.js",
    "Tailwind CSS",
    "Next/Image optimization",
    "Logo Design",
    "Figma",
    "Vercel",
  ],
}

export default function SixThirteenGuysPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "613 Guys", href: "/projects/613-guys" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "613 Guys Commercial Website",
      description: "Professional commercial website with booking funnel and brand identity",
      url: "/projects/613-guys",
      clientName: "613 Guys",
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
