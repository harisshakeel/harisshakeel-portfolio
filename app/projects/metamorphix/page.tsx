import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Metamorphix Case Study, Multi-Agent AI Sales Intelligence Pipeline",
  description:
    "How TwoPixel built Metamorphix: a Python multi-agent pipeline that researches B2B prospects end-to-end, scores fit with LLMs, and provisions personalized, CRM-ready outreach in Zoho.",
  path: "/projects/metamorphix",
})

const data: CaseStudyData = {
  slug: "metamorphix",
  client: "Metamorphix",
  logo: "/images/projects/metamorphix.png",
  category: "AI Automation / Sales Intelligence",
  industry: "EdTech (K-12)",
  headline:
    "How Metamorphix turns a raw prospect list into research-backed, CRM-ready outreach, automatically.",
  summary:
    "A Python automation that discovers and scrapes each prospect's web presence, extracts intelligence and verified decision-maker contacts with LLMs, scores fit, and drafts personalized multi-touch email sequences, then provisions accounts, contacts, scheduled sends, and follow-up tasks in Zoho CRM.",
  sections: [
    {
      heading: "Overview",
      body:
        "Metamorphix's team was researching prospects by hand, hunting for the right decision-makers, and writing outreach one message at a time, a process that didn't scale. We built an autonomous pipeline that takes a list of target organizations and, for each one, assembles a complete research profile, identifies and verifies the key contacts, scores how well the prospect fits the product, and drafts a personalized outreach sequence, then loads it all into Zoho CRM, ready for a final human review before sending. Work that took an analyst most of a day now runs unattended at scale.",
    },
    {
      heading: "What we built",
      bullets: [
        "End-to-end prospect research: automated website discovery, tiered web scraping with PDF mining, and public-data enrichment for every account",
        "LLM extraction of structured intelligence and buying signals from unstructured public web content",
        "Decision-maker contact discovery with a verification waterfall (Apollo → Hunter → web search) and CRM-aware deduplication",
        "Fit scoring that tiers each prospect and surfaces the most relevant, best-timed outreach angle",
        "Personalized, guardrailed multi-touch email sequences provisioned into Zoho CRM as accounts, contacts, scheduled sends, tasks, and PDF briefings",
      ],
    },
  ],
  technologies: [
    "Python",
    "Anthropic Claude",
    "DeepSeek",
    "Google Sheets API",
    "Zoho CRM API",
    "Hunter.io",
    "Apollo",
    "Apify",
    "Firecrawl",
    "Pydantic",
    "pytest",
  ],
}

export default function MetamorphixPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Metamorphix", href: "/projects/metamorphix" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Metamorphix AI Sales Intelligence Pipeline",
      description:
        "Claude-powered Python pipeline that researches B2B prospects, scores fit with LLMs, and provisions CRM-ready outreach in Zoho",
      url: "/projects/metamorphix",
      clientName: "Metamorphix",
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
