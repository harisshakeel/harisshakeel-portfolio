import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  Mail,
  BarChart3,
  Sparkles,
  Gauge,
  Clock,
  Code2,
  Wallet,
  Cog,
} from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { Reveal } from "@/components/ui/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Grow, SEO, GEO, Lead Gen & Performance",
  description:
    "Lead generation, deliverability, SEO, and AI search visibility, the work that compounds and keeps customers coming long after launch.",
  path: "/services/grow",
})

const offers = [
  { icon: TrendingUp, title: "Lead Generation", body: "High-converting landing pages and funnels designed to turn visitors into qualified leads." },
  { icon: Mail, title: "Email Deliverability", body: "SPF/DKIM/DMARC setup, domain warming, and inbox-placement tuning so cold campaigns land." },
  { icon: Search, title: "SEO", body: "Technical SEO, on-page optimization, schema, and content strategy to rank higher on Google." },
  { icon: Sparkles, title: "GEO (AI Search)", body: "Generative Engine Optimization, get cited by Perplexity, ChatGPT, Claude, and Google AI Overviews." },
  { icon: Gauge, title: "Performance", body: "Core Web Vitals, page-speed optimization, and conversion-friendly performance tuning." },
  { icon: BarChart3, title: "Analytics & Reporting", body: "Clean dashboards, event tracking, and clear monthly reports, growth measurable, not vibes." },
]

const approach = [
  { n: "01", title: "Compound, don't sprint.", body: "We pick the channels that pay back for years, SEO, GEO, deliverability, not the ones that need constant feeding. Short-term tricks lose to durable systems every time." },
  { n: "02", title: "Search is shifting fast.", body: "Half the answers your buyers used to Google now come from AI. We optimize for both, traditional SERPs and the generative engines that cite you in the answer." },
  { n: "03", title: "Land in the inbox.", body: "A cold campaign that lands in spam costs the same as one that lands in the inbox. We treat deliverability as infrastructure, not a setting." },
  { n: "04", title: "Measure what matters.", body: "Vanity metrics don't pay the bills. We instrument for pipeline, MQLs, and revenue, and we'll tell you which channels actually moved the needle." },
]

const stack = {
  SEO: ["Ahrefs", "Semrush", "Search Console", "Schema.org"],
  Email: ["Instantly", "Smartlead", "Apollo", "Clay"],
  Analytics: ["GA4", "Plausible", "Hotjar", "PostHog"],
  Performance: ["Lighthouse", "WebPageTest", "Core Web Vitals", "Cloudflare"],
}

const process = [
  { step: "Audit", body: "We benchmark your current rankings, inbox placement, page speed, and conversion paths against industry baselines." },
  { step: "Strategy", body: "A focused 90-day plan with clear targets, not a 50-page deck of generic ideas." },
  { step: "Execute", body: "We ship the technical fixes, content, infra, and tracking, and update you weekly on what moved." },
  { step: "Compound", body: "Monthly reporting, quarterly retros, and the systems handed off so growth keeps coming after we're done." },
]

const faqs = [
  { question: "What's GEO and why does it matter?", answer: "Generative Engine Optimization, getting your business cited by Perplexity, ChatGPT, Claude, and Google AI Overviews. Search behavior is shifting fast, and being the answer (not just a result) is the new game." },
  { question: "Can you fix our cold email deliverability?", answer: "Yes. We set up SPF/DKIM/DMARC properly, warm new domains, configure tools like Instantly or Smartlead, and tune content so your campaigns land in the inbox, not the spam folder." },
  { question: "How long until I see SEO results?", answer: "Technical SEO and on-page wins compound over 1–3 months. Content + backlinks usually show meaningful traffic gains in 3–6 months. We focus on durable strategies, not short-lived tricks." },
  { question: "Do you handle paid ads too?", answer: "We focus on organic growth, lead-gen infrastructure, and conversion. For paid media, we partner with vetted media buyers if you need it." },
]

const faqIcons = [Code2, Clock, Search, Wallet]

export default function GrowPage() {
  const crumbs = [
    { name: "Services", href: "/services" },
    { name: "Grow", href: "/services/grow" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    serviceSchema({ name: "Grow", description: "Lead generation, deliverability, SEO, and AI search visibility.", url: "/services/grow" }),
    faqSchema(faqs),
  ]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
            }}
          />
          <div
            className="absolute -left-[12%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)" }}
          />
          <div
            className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
            style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-6 pt-20 pb-24 md:px-10 md:pt-32 md:pb-32">
          <Reveal trigger="mount">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Grow</p>
          </Reveal>
          <Reveal trigger="mount" delay={0.08}>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-foreground md:text-6xl lg:text-[72px] lg:leading-[1]">
              The work that compounds long after launch.
            </h1>
          </Reveal>
          <Reveal trigger="mount" delay={0.2}>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Lead generation, deliverability, SEO, and AI search visibility, the work that keeps customers
                coming for months and years after launch.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:brightness-110"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vision ─────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Our take on growth
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl font-medium leading-snug tracking-[-0.015em] text-foreground md:text-[32px] md:leading-[1.25]">
                The best growth channel is the one you own. We build systems, content, search, deliverability,
                conversion, that keep returning leads after the retainer ends, not before.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── What we build ──────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              What we do.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              The full stack of organic growth, from search to inbox.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => {
              const Icon = o.icon
              return (
                <div
                  key={o.title}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 transition-all duration-500 hover:border-primary/30 hover:bg-foreground/[0.04]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(168,85,247,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.02] text-primary ring-1 ring-inset ring-foreground/[0.08] transition-all duration-500 group-hover:ring-primary/30">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground">{o.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{o.body}</p>
                </div>
              )
            })}
          </div>
        </section>
      </Reveal>

      {/* ── Approach ───────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              Our approach.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Four principles that shape how we drive growth.
            </p>
          </div>
          <Accordion type="single" collapsible defaultValue={approach[0].n}>
            {approach.map((a) => (
              <AccordionItem key={a.n} value={a.n} className="group border-b border-foreground/[0.06]">
                <AccordionTrigger className="py-8 text-left hover:no-underline md:py-10">
                  <div className="flex flex-1 items-baseline gap-6 pr-6 md:gap-12">
                    <span className="font-mono text-sm tracking-tight text-primary md:text-base">{a.n}</span>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-2xl lg:text-3xl">
                      {a.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-6 pb-10 pr-6 md:gap-12">
                    <span aria-hidden className="invisible font-mono text-sm tracking-tight md:text-base">{a.n}</span>
                    <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{a.body}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </Reveal>

      {/* ── Stack ──────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <h2 className="mb-12 text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:mb-16 md:text-5xl lg:text-6xl">
            The stack.
          </h2>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(stack).map(([category, items]) => (
              <div key={category}>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">{category}</p>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-foreground/[0.08] bg-foreground/[0.02] px-3.5 py-1.5 text-sm text-foreground/85 transition-colors hover:border-primary/30 hover:bg-primary/[0.08] hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Process ────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <h2 className="mb-12 text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:mb-16 md:text-5xl lg:text-6xl">
            How we work.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-foreground/[0.07] bg-foreground/[0.06] md:grid-cols-4">
            {process.map((p, i) => (
              <div key={p.step} className="relative bg-background p-6 md:p-8">
                <p className="mb-3 font-mono text-xs tracking-tight text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground">{p.step}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl">
                Questions, answered.
              </h2>
            </div>
            <div className="md:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => {
                  const Icon = faqIcons[i] ?? Cog
                  const value = `item-${i + 1}`
                  const number = String(i + 1).padStart(2, "0")
                  return (
                    <AccordionItem
                      key={value}
                      value={value}
                      className="group overflow-hidden rounded-xl border border-foreground/[0.07] bg-foreground/[0.01] transition-all duration-300 data-[state=open]:bg-foreground/[0.03]"
                    >
                      <AccordionTrigger className="px-5 py-4 hover:no-underline data-[state=open]:bg-foreground/[0.02] [&>svg]:hidden">
                        <div className="flex flex-1 items-center gap-4">
                          <Icon className="h-5 w-5 shrink-0 text-foreground/55 transition-colors duration-300 group-data-[state=open]:text-primary" strokeWidth={1.75} />
                          <span className="text-left text-base font-medium tracking-[-0.01em] text-foreground md:text-[17px]">{faq.question}</span>
                        </div>
                        <span className="ml-4 font-mono text-xs tabular-nums tracking-tight text-muted-foreground transition-colors duration-300 group-data-[state=open]:text-primary">{number}</span>
                      </AccordionTrigger>
                      <AccordionContent className="relative border-t border-foreground/[0.06] px-5 py-4 text-[15px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary before:opacity-0 before:transition-opacity before:duration-300 group-data-[state=open]:before:opacity-100">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ────────────────────────────────────────── */}
      <Reveal>
        <section className="relative mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl">
              Let&apos;s compound your growth.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-7 py-3 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.07] hover:text-foreground"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </Reveal>
    </PageLayout>
  )
}
