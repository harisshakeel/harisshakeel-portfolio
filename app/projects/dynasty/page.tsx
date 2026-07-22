import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Dynasty Petroleum Case Study, Energy Trading Website",
  description:
    "How TwoPixel built dynastyfm.com: a B2B marketing site for a UAE-based petroleum trading firm with service showcases, partner highlights, and quote request flows.",
  path: "/projects/dynasty",
})

const data: CaseStudyData = {
  slug: "dynasty",
  client: "Dynasty Petroleum Trading FZC",
  logo: "/images/projects/dynasty.png",
  category: "Energy Trading",
  industry: "Marketing",
  website: { url: "https://dynastyfm.com/", label: "dynastyfm.com" },
  liveUrl: "https://dynastyfm.com/",
  liveLabel: "View live project",
  headline: "How Dynasty Petroleum positioned a UAE trading firm for global buyers.",
  summary:
    "A B2B marketing site for a Dubai-based petroleum trading firm, built to communicate trust, surface services clearly, and turn international buyers into qualified inquiries through a streamlined quote request flow.",
  sections: [
    {
      heading: "Overview",
      body:
        "Dynasty Petroleum needed a public-facing presence that matched the scale of their international operations across West Africa, Europe, and the Middle East. We built a fast, responsive marketing site that frames their services, partner network, and contact channels for serious B2B buyers.",
    },
    {
      heading: "What we built",
      bullets: [
        "Service pages covering oil trading, logistics, and storage with clear value propositions",
        "Partner showcase highlighting established industry relationships",
        "Multi-field contact form for quote requests (name, email, region, message)",
        "Multiple contact paths, email, phone, and Dubai office address, surfaced site-wide",
        "SEO-optimized structure with fast load times for international audiences",
        "Fully responsive across desktop, tablet, and mobile",
      ],
    },
  ],
  technologies: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Responsive Design",
    "SEO",
    "Contact Forms",
  ],
}

export default function DynastyPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Dynasty Petroleum", href: "/projects/dynasty" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Dynasty Petroleum Trading FZC",
      description: "B2B marketing site for a UAE-based petroleum trading firm",
      url: "/projects/dynasty",
      clientName: "Dynasty Petroleum Trading FZC",
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
