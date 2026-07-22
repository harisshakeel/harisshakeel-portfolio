import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Payback Case Study, Full-Stack Loyalty Rewards Platform",
  description:
    "How TwoPixel built Payback: a full-stack loyalty rewards platform with React, PostgreSQL, QR/barcode scanning, and real-time points tracking.",
  path: "/projects/payback",
})

const data: CaseStudyData = {
  slug: "payback",
  client: "Payback",
  logo: "/images/projects/payback.png",
  category: "Loyalty Rewards",
  industry: "Retail / Loyalty",
  website: { url: "https://demo.payback.pk", label: "demo.payback.pk" },
  liveUrl: "https://demo.payback.pk",
  liveLabel: "View live demo",
  headline: "How Payback turned scan-to-earn into a real loyalty platform.",
  summary:
    "A full-stack loyalty rewards platform that lets businesses reward customers with points for purchases, scanned via QR and barcode readers, with real-time balance tracking and redemption management.",
  sections: [
    {
      heading: "Overview",
      body:
        "Payback wanted a loyalty system that worked the way customers actually shop, at the counter, on a phone, in seconds. We designed the experience around the scanner: every interaction starts with a QR or barcode, and every screen exists to make that moment fast for the cashier and obvious for the customer.",
    },
    {
      heading: "What we built",
      bullets: [
        "Customer-facing mobile-optimized web app for checking balances and redeeming rewards",
        "Business admin panel for managing reward rules, promotions, and customer tiers",
        "QR code and barcode scanning for instant point assignment at point of sale",
        "PostgreSQL database with Sequelize ORM for complex reward calculation logic",
        "Redux state management for seamless real-time balance updates without page refresh",
      ],
    },
  ],
  technologies: [
    "React",
    "ExpressJS",
    "PostgreSQL",
    "Sequelize ORM",
    "Redux",
    "QR Scanner",
    "Barcode Scanner",
    "JWT Auth",
  ],
}

export default function PaybackPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Payback", href: "/projects/payback" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Payback Loyalty Platform",
      description: "Full-stack loyalty rewards platform with real-time points tracking",
      url: "/projects/payback",
      clientName: "Payback",
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
