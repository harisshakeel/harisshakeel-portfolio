import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Meddo Case Study, Business Management System",
  description:
    "How TwoPixel built Meddo: a comprehensive business management system for contracts, inventory, and user admin with secure authentication and dual-database architecture.",
  path: "/projects/meddo",
})

const data: CaseStudyData = {
  slug: "meddo",
  client: "Meddo",
  logo: "/images/projects/meddo.png",
  category: "Business Management",
  industry: "Internal Tools",
  website: { url: "https://med-do.vercel.app/", label: "med-do.vercel.app" },
  liveUrl: "https://med-do.vercel.app/",
  liveLabel: "View live project",
  headline: "How Meddo unified contracts, inventory, and admin in one workspace.",
  summary:
    "A comprehensive business management platform that centralizes contract management, inventory tracking, and multi-user administration, built on a dual-database architecture (MongoDB + MySQL) for flexibility and performance.",
  sections: [
    {
      heading: "Overview",
      body:
        "Meddo replaced four spreadsheets, two legacy tools, and an over-loaded admin assistant. Each module, contracts, inventory, users, had different shapes of data, so we picked the right database for each job rather than forcing a single-store compromise.",
    },
    {
      heading: "What we built",
      bullets: [
        "Contract management module with digital signing, status tracking, and expiry alerts",
        "Inventory system with stock levels, reorder notifications, and audit trails",
        "Multi-user admin with role-based permissions (Admin, Manager, Staff)",
        "Dual-database design: MongoDB for flexible document storage, MySQL for relational data",
        "Secure JWT authentication with refresh token rotation and session management",
      ],
    },
  ],
  technologies: [
    "MongoDB",
    "Express",
    "React",
    "Node.js",
    "MySQL",
    "CSS3",
    "JWT Auth",
    "Responsive Design",
  ],
}

export default function MeddoPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Meddo", href: "/projects/meddo" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Meddo Business Management System",
      description: "Comprehensive business management system for contracts, inventory, and user admin",
      url: "/projects/meddo",
      clientName: "Meddo",
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
