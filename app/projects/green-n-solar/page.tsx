import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Green N Solar Case Study, Sustainable Energy Company Website",
  description:
    "How TwoPixel built Green N Solar: a fast-loading, responsive React website for a sustainable energy company with dynamic UI and seamless domain migration.",
  path: "/projects/green-n-solar",
})

const data: CaseStudyData = {
  slug: "green-n-solar",
  client: "Green N Solar",
  logo: "/images/projects/gns.png",
  category: "Sustainable Energy",
  industry: "Cleantech",
  website: {
    url: "https://green-n-solar-haris-shakeels-projects.vercel.app/",
    label: "green-n-solar.vercel.app",
  },
  liveUrl: "https://green-n-solar-haris-shakeels-projects.vercel.app/",
  liveLabel: "View live project",
  headline: "How Green N Solar shipped a fast, modern frontend with zero downtime.",
  summary:
    "A modern, fast-loading frontend for a sustainable energy solutions company, built with React and custom CSS, featuring dynamic UI rendering, an interactive service showcase, and a smooth domain migration with zero downtime.",
  sections: [
    {
      heading: "Overview",
      body:
        "Green N Solar's old site was slow, dated, and on a domain they were ready to leave behind. We rebuilt the front end from scratch, planned the DNS cutover around their lowest-traffic window, and shipped without a single broken inbound link. The new site loads instantly and finally looks like the brand they sell.",
    },
    {
      heading: "What we built",
      bullets: [
        "Full website redesign with a modern, clean aesthetic aligned to the sustainability brand",
        "Dynamic UI components with scroll-triggered animations for service showcases",
        "Solar savings calculator widget to help visitors estimate ROI",
        "Fully responsive mobile design for the key residential customer audience",
        "Zero-downtime domain migration with DNS configuration and SSL setup",
      ],
    },
  ],
  technologies: [
    "React",
    "CSS3",
    "Responsive Design",
    "Domain Migration",
    "Vercel",
    "Performance Optimization",
  ],
}

export default function GreenNSolarPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Green N Solar", href: "/projects/green-n-solar" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Green N Solar Website",
      description: "Fast-loading React website for a sustainable energy company",
      url: "/projects/green-n-solar",
      clientName: "Green N Solar",
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
