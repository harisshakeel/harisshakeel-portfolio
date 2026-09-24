import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, CalendarDays } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { ProjectsFeed, type Project } from "@/components/ui/projects-feed"
import { ProjectsMetrics } from "@/components/ui/projects-metrics"

export const metadata: Metadata = buildPageMetadata({
  title: "Projects & Case Studies",
  description:
    "Case studies by Haris Shakeel in computer vision, machine learning, agentic AI, and full-stack engineering, from production CV pipelines to client builds.",
  path: "/projects",
})

const projects: Project[] = [
  // Temporarily hidden — kept in sync with the Selected Work list on the home page.
  // {
  //   slug: "destiny",
  //   title: "Destiny.pk",
  //   category: "Ecommerce / Jewelry",
  //   tag: "Ecommerce",
  //   description:
  //     "An online jewelry store for Designer's Destiny with a curated catalog of AD silver necklace sets, bangles, earrings, and rings, plus cart, wishlist, and WhatsApp ordering.",
  //   technologies: ["Shopify", "Storefront", "Product", "Cart & Wishlist", "WhatsApp Ordering", "CRO", "SEO"],
  //   logo: "/images/projects/destiny/screen-1.png",
  //   url: "https://destiny.pk",
  // },
  // The four deep builds lead the page. They were previously missing entirely,
  // so a page titled "Projects & Case Studies" showed only client marketing
  // sites while the actual case studies sat unlinked at /projects/<slug>.
  {
    slug: "xision",
    title: "Xision",
    category: "Computer Vision / 3D Simulation",
    tag: "AI / ML",
    description:
      "Online fashion returns are mostly a fit problem. A phone scan becomes a body model with real measurements, then a physics engine drapes the actual garment on it and reports where it pulls.",
    technologies: ["Python", "FastAPI", "MediaPipe", "SMPL-X", "ONNX Runtime", "Cloth physics"],
    logo: "/images/projects/xision-logo.png",
    url: "https://www.xision.ai",
  },
  {
    slug: "mavis",
    title: "MAVIS",
    category: "Agentic AI / Multi-Tenant SaaS",
    tag: "AI / ML",
    description:
      "Virtual assistants hand work to Claude Code agents instead of doing it by hand. Each VA gets an isolated worker, agents reach 3,000+ connected apps, and a person signs off before anything reaches a client.",
    technologies: ["TypeScript", "Next.js", "Claude Agent SDK", "MCP", "PostgreSQL RLS"],
    logo: "/images/projects/mavis-logo.png",
    url: "https://app.thevagroup.com",
  },
  {
    slug: "metamorphix",
    title: "Metamorphix",
    category: "AI Automation / Multi-Agent",
    tag: "AI / ML",
    description:
      "Prospect research used to take an analyst most of a day. Agents scrape each company, pull out the buying signals, verify who the decision-maker actually is, then write the outreach into Zoho ready for a human to send.",
    technologies: ["Python", "Claude", "Pydantic", "Apollo", "Zoho CRM"],
    logo: "/images/projects/metamorphix.png",
  },
  {
    slug: "sentinel",
    title: "Sentinel",
    category: "Machine Learning / Real-time Detection",
    tag: "AI / ML",
    description:
      "A control room can't watch every feed at once. Three trained detectors watch instead — accidents, vandalism, weapons — and the annotated frame reaches the operator's phone the moment one fires.",
    technologies: ["Python", "YOLOv8", "PyTorch", "OpenCV", "Flutter"],
    logo: "/images/projects/sentinel-camera.svg",
  },
  {
    slug: "clusterden",
    title: "ClusterDen",
    category: "CRM / SaaS",
    tag: "SaaS",
    description:
      "A CRM built around WhatsApp: a trigger fires a campaign, the team works the same records live, and automated messages go out in 3 seconds instead of 20.",
    technologies: ["React", "Node.js", "Socket Programming", "Redis", "WhatsApp Webhooks"],
    logo: "/images/projects/clusterden.svg",
    url: "https://www.clusterden.com",
  },
  {
    slug: "payback",
    title: "Payback",
    category: "Loyalty Rewards",
    tag: "SaaS",
    description:
      "Cashback at the counter. A customer scans a QR, the POS confirms the sale, and the points land in their account before they've left the shop.",
    technologies: ["React", "ExpressJS", "PostgreSQL", "Sequelize", "QR & Barcode Scanner", "Redux"],
    logo: "/images/projects/payback.png",
    url: "https://demo.payback.pk",
  },
  {
    slug: "meddo",
    title: "Meddo",
    category: "Business Management",
    tag: "Internal Tools",
    description:
      "One workspace for contracts, inventory and user admin. Sign a contract, track where it stands, and get warned before it expires.",
    technologies: ["MongoDB", "Express", "React", "Node.js", "MySQL"],
    logo: "/images/projects/meddo.png",
    url: "https://med-do.vercel.app/",
  },
  {
    slug: "comuni",
    title: "Comuni",
    category: "Social Platform",
    tag: "Web App",
    description:
      "Event planning for a Canadian audience: browse what's on nearby, see it on a map, and open the offer without leaving the page.",
    technologies: ["Next.js", "Material UI", "JavaScript", "UX & UI Design"],
    logo: "/images/projects/comuni.png",
    url: "https://comuni-delta.vercel.app/",
  },
  {
    slug: "613-guys",
    title: "613 Guys",
    category: "Commercial Website",
    tag: "Marketing",
    description:
      "Home care for a Canadian brand. One page per service, with the enquiry form where the reader already is rather than three clicks away.",
    technologies: ["Next.js", "Tailwind CSS", "Logo Design", "Responsive Design"],
    logo: "/images/projects/613guys.png",
    url: "https://613-guys.vercel.app/",
  },
  {
    slug: "green-n-solar",
    title: "Green N Solar",
    category: "Sustainable Energy",
    tag: "Marketing",
    description:
      "Marketing site for a Pakistani solar installer, built so someone comparing quotes can find the service and ask for one in the same visit.",
    technologies: ["React", "CSS 3", "Responsive Design", "Domain Migration"],
    logo: "/images/projects/gns.png",
    url: "https://green-n-solar-haris-shakeels-projects.vercel.app/",
  },
  {
    slug: "dynasty",
    title: "Dynasty Petroleum",
    category: "Energy Trading",
    tag: "Marketing",
    description:
      "B2B site for a petroleum trading firm in the UAE, where a buyer can see what's traded, who they work with, and request a quote in one step.",
    technologies: ["Next.js", "Tailwind CSS", "Responsive Design", "SEO"],
    logo: "/images/projects/dynasty.png",
    url: "https://dynastyfm.com/",
  },
]

const tabs = ["AI / ML", "SaaS", "Marketing"]

export default function ProjectsPage() {
  const crumbs = [{ name: "Projects", href: "/projects" }]
  const schema = breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs])

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-20">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Projects
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl lg:text-7xl">
            Built with teams who ship.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A selection of products, platforms, and marketing sites we&apos;ve
            shipped, the kind of work where good design and fast delivery
            actually move the business.
          </p>
        </div>
      </section>

      {/* ── Projects feed ──────────────────────────────────────── */}
      <ProjectsFeed projects={projects} tags={tabs} />

      {/* ── Metrics ────────────────────────────────────────────── */}
      <ProjectsMetrics />

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground lg:text-5xl">
              Want to be our next case study?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-foreground/60">
              Bring us the brief, we&apos;ll come back with a plan, a timeline,
              and the team to ship it.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {/* Primary, soft glow pill */}
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_28px_-8px_rgba(210,231,106,0.35)] ring-1 ring-inset ring-foreground/15 transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(210,231,106,0.5)] hover:brightness-110"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary, ghost pill with hairline */}
              <Link
                href="https://calendly.com/harisshakeel/haris"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.02] px-7 py-3 text-sm font-medium text-foreground/85 backdrop-blur transition-all duration-300 hover:border-foreground/25 hover:bg-foreground/[0.05] hover:text-foreground"
              >
                <CalendarDays className="h-4 w-4 text-foreground/55 transition-colors duration-300 group-hover:text-foreground/85" />
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
