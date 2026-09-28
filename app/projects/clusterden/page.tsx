import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "ClusterDen Case Study, MERN CRM with WhatsApp Automation",
  description:
    "How Haris Shakeel built ClusterDen at Advance Resources: a MERN WhatsApp CRM with an action and trigger workflow engine, role-based access, real-time team chat, and message delivery cut from 20 seconds to 3.",
  path: "/projects/clusterden",
})

const data: CaseStudyData = {
  slug: "clusterden",
  client: "ClusterDen",
  logo: "/images/projects/clusterden.svg",
  category: "CRM / SaaS",
  industry: "B2B SaaS",
  partnership: "Built at Advance Resources",
  website: { url: "https://www.clusterden.com", label: "clusterden.com" },
  liveUrl: "https://www.clusterden.com",
  liveLabel: "View live",
  headline: "How ClusterDen turns a WhatsApp trigger into a sent message in 3 seconds.",
  summary:
    "A WhatsApp CRM in the spirit of BotSpace, built on the MERN stack at Advance Resources. Teams share one workspace with role-based access, chat live with each other, and automate customer messaging through an action and trigger engine on the WhatsApp Business API. Redis caching and a simpler workflow cut automated message delivery from 20 seconds to 3.",
  sections: [
    {
      heading: "Overview",
      body:
        "Businesses running customer conversations on WhatsApp needed one place for the whole team: shared records, clear permissions, and messages that go out on their own when something happens. I built ClusterDen as that workspace. Admins, managers and agents each see what their role allows, the team chats live on the same records, and automations fire WhatsApp messages from triggers without anyone pressing send.",
    },
    {
      heading: "What I built",
      bullets: [
        "An action and trigger workflow engine built around triggers, revisions and runs",
        "WhatsApp Business API integration through webhooks, handled asynchronously and event by event, to automate messaging, reports and customer interactions in real time",
        "Multi-team CRM with role-based access: Admin, Manager, and Agent roles with granular permissions",
        "Real-time team collaboration using Socket.io for live updates on customer interactions",
        "Redis caching and a simplified workflow path that cut automated message delivery from 20 seconds to 3",
        "Clear module boundaries for auth, messaging, analytics and billing, with webhook failure logging so a dropped event is visible instead of silently lost",
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
