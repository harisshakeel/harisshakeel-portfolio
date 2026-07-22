import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "ClusterDen Case Study, MERN CRM with WhatsApp Automation",
  description:
    "How TwoPixel built ClusterDen: a MERN-stack CRM workspace with Role-Based Access Control (RBAC), real-time collaboration, and automated WhatsApp integrations.",
  path: "/projects/clusterden",
})

const data: CaseStudyData = {
  slug: "clusterden",
  client: "ClusterDen",
  logo: "/images/projects/clusterden.svg",
  category: "CRM / SaaS",
  industry: "B2B SaaS",
  website: { url: "https://www.clusterden.com", label: "clusterden.com" },
  liveUrl: "https://www.clusterden.com",
  liveLabel: "View live",
  headline: "How ClusterDen runs a multi-tenant CRM with built-in WhatsApp automation.",
  summary:
    "A MERN-stack CRM workspace with advanced Role-Based Access Control (RBAC), real-time team collaboration via Socket.io, and automated WhatsApp integrations for customer communication.",
  sections: [
    {
      heading: "Overview",
      body:
        "ClusterDen needed a CRM that could host multiple teams under a single roof, each with their own pipelines, agents, and permissions, without the operational tax of running separate apps. We built a workspace where role boundaries are enforced at every layer of the stack, and where the path from a new lead to a sent WhatsApp message is measured in seconds.",
    },
    {
      heading: "What we built",
      bullets: [
        "Multi-tenant CRM with role-based access: Admin, Manager, and Agent roles with granular permissions",
        "Real-time team collaboration using Socket.io for live updates on customer interactions",
        "Automated WhatsApp messaging via WhatsApp Business API webhooks for lead nurturing",
        "Redis-powered job queues for high-throughput message scheduling",
        "Custom analytics dashboard with interaction history, conversion funnels, and team performance",
      ],
    },
  ],
  technologies: [
    "React",
    "Node.js",
    "MongoDB",
    "Socket.io",
    "Redis",
    "WhatsApp Business API",
    "JWT Auth",
    "REST API",
  ],
}

export default function ClusterdenPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "ClusterDen", href: "/projects/clusterden" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "ClusterDen CRM",
      description: "MERN-stack CRM with RBAC and WhatsApp automation",
      url: "/projects/clusterden",
      clientName: "ClusterDen",
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
