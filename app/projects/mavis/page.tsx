import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "MAVIS Case Study, Multi-Tenant Claude Code Agent Platform",
  description:
    "How MAVIS runs Claude Code agents on real client work: per-VA workers, MCP tool servers wired to 3,000+ OAuth apps, Postgres row-level security as the tenant boundary, and humans holding the approval loop.",
  path: "/projects/mavis",
})

const data: CaseStudyData = {
  slug: "mavis",
  client: "MAVIS",
  logo: "/images/projects/mavis-architecture.svg",
  category: "Agentic AI / Multi-Tenant Platform",
  industry: "Virtual assistant services",
  partnership: "2026 — Present",
  headline:
    "How MAVIS puts Claude Code agents on real client work, with humans holding the approval loop.",
  summary:
    "A multi-tenant platform where virtual assistants brief Claude Code agents, watch them work, and approve what ships. Agents run on per-VA workers, reach the client's own tools through MCP servers and per-user OAuth, and every client's data is sealed off by Postgres row-level security.",
  sections: [
    {
      heading: "Overview",
      body:
        "A virtual-assistant agency wanted its VAs to run client work through Claude Code agents rather than by hand — drafting posts, ads, emails, and reports from the client's own connected tools. Three things make that hard, and none of them are the model. Isolation: an agent session scoped to one client has to be structurally incapable of reading another's data, not merely prompted not to. Tools: an agent is only useful with access to the client's actual Gmail, HubSpot, Slack, and ad accounts, which means per-user OAuth and a tool surface that changes per user. Trust: nothing an agent produces reaches a real client without a human seeing it, so review has to be fast or the humans become the bottleneck and the automation is worthless.",
    },
    {
      heading: "The platform",
      bullets: [
        "Next.js 15 / React 19 dashboard serving three audiences in one app — VA workspace, admin console, and a client-facing portal — across 199 API route handlers",
        "Per-VA workers on Railway: an Express and WebSocket service that spawns claude -p sessions per job, streams events to the browser, and enforces guardrail timers, loop detection, and per-turn token accounting",
        "Five MCP servers giving agents path-scoped S3, client-scoped database access, Pipedream Connect, registry-driven proxy operations, and image generation",
        "Supabase Postgres with 126 migrations and row-level security as the tenant boundary",
      ],
    },
    {
      heading: "What I built",
      bullets: [
        "The client portal end to end — task boards, threaded conversations with agents, an asset gallery with in-app PDF, CSV, and audio preview over presigned URLs, and a mobile-responsive pass across every client-facing page",
        "The task detail and Work Studio surface VAs live in: sticky action bars, slide-in drawers, @mention fan-out in task threads, rich-text composers, screenshot-paste attachment, and status filter chips",
        "A cmd+k command palette backed by a trigram-indexed search API, and a notifications system with per-user opt-out by type, browser alerts, priority toasts, and deep linking",
        "The integration layer: threading a Pipedream external-user resolver through every Pipedream-facing path so OAuth grants resolve to the right end user rather than a shared project identity — the fix that makes per-client tool access genuinely per-client",
        "The integrations hub — catalog browsing with pagination, connection state, custom credentials with a live connection probe, and account-health surfacing",
        "Both LLM feature modules: turning a handful of promoted chat messages into an actionable agenda, and generating task titles, using schema-constrained structured output rather than parsing prose",
        "The tenant-isolation audit of the client-facing surface, client deactivation with a 90-day data wipe, and the consolidation of ad-hoc per-route auth checks into a shared typed access predicate",
      ],
    },
    {
      heading: "Engineering judgment",
      bullets: [
        "Model tier as a decision, not a default — summarization runs on Haiku 4.5 at roughly $0.001 per call, where a larger model would be overkill, and it fails open: if the call throws, task creation still succeeds with a raw-quote description. Picking the cheap tier and designing the degradation path is the engineering; calling the API is not",
        "Summaries are additive — the original messages stay in the thread beside the generated agenda, so a VA who distrusts the summary can always read what was actually said. An LLM feature that silently replaces its input is one people learn to switch off",
        "Auth as a typed predicate rather than a convention — ten routes each carrying an inline tenant check is ten places to get it wrong. One predicate returning a discriminated union writes the access matrix once and makes the compiler force every caller to handle the failure branch",
      ],
    },
  ],
  technologies: [
    "TypeScript",
    "Next.js 15",
    "React 19",
    "Tailwind CSS",
    "shadcn/ui",
    "Node.js",
    "Express",
    "WebSockets",
    "Supabase",
    "PostgreSQL (RLS)",
    "AWS S3",
    "Claude Agent SDK",
    "MCP",
    "Vercel AI SDK",
    "Amazon Bedrock",
    "Pipedream Connect",
    "Zod",
    "Vitest",
    "Railway",
    "Vercel",
    "Sentry",
  ],
}

export default function MavisPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "MAVIS", href: "/projects/mavis" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "MAVIS Multi-Tenant Claude Code Agent Platform",
      description:
        "Multi-tenant platform running Claude Code agents on real client work, with MCP tool servers, per-user OAuth, and row-level-security tenant isolation",
      url: "/projects/mavis",
      clientName: "MAVIS",
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
