import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Bot,
  Workflow,
  MessageSquare,
  Database,
  Filter,
  Sparkles,
  Cog,
  Clock,
  Code2,
  Search,
  Wallet,
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
  title: "Automate, AI Chatbots, Agents & Workflow Automations",
  description:
    "Chatbots, agents, and AI workflows that work 24/7, saving your team hours on the repetitive stuff so you can focus on growth. Built with OpenAI, Anthropic, LangChain, n8n.",
  path: "/services/automate",
})

const offers = [
  { icon: MessageSquare, title: "AI Chatbots", body: "Custom chatbots trained on your data for support, sales, or internal team use." },
  { icon: Workflow, title: "Workflow Automation", body: "Connect tools across your stack and automate repetitive multi-step processes end-to-end." },
  { icon: Bot, title: "Custom GPTs & Agents", body: "Purpose-built agents that handle research, drafting, scheduling, or domain-specific tasks." },
  { icon: Database, title: "Document Processing", body: "Extract, summarize, and classify information from PDFs, emails, and forms automatically." },
  { icon: Filter, title: "LLM Search & RAG", body: "Smart semantic search over your documents, knowledge base, or database." },
  { icon: Sparkles, title: "CRM & Lead AI", body: "Automatic lead scoring, email drafting, and CRM enrichment running in the background." },
]

const approach = [
  { n: "01", title: "Start with the boring stuff.", body: "We map the most time-consuming, repetitive tasks first, the ones that drain hours but get ignored. That's where AI compounds the fastest." },
  { n: "02", title: "Reliable beats clever.", body: "We pick the simplest tool that does the job, n8n over custom code when it fits, GPT-4o over a fine-tuned model when prompts will do. Robust over flashy, every time." },
  { n: "03", title: "Humans stay in the loop.", body: "Every automation has a clear fallback and a place where a human can review, override, or intervene. AI augments your team, it doesn't replace judgment." },
  { n: "04", title: "Cost-aware by design.", body: "We benchmark token usage, batch where possible, and cache aggressively. Your AI bill stays predictable, even as usage scales." },
]

const stack = {
  Models: ["OpenAI GPT-4o", "Anthropic Claude", "Mistral", "Open-source LLMs"],
  Orchestration: ["LangChain", "LlamaIndex", "n8n", "Make", "Zapier"],
  Data: ["Pinecone", "Supabase pgvector", "Postgres", "Redis"],
  Voice: ["Whisper", "ElevenLabs", "Deepgram"],
}

const process = [
  { step: "Discovery", body: "30-min call to map your repetitive workflows, current tools, and the outcome that matters most." },
  { step: "Pilot scope", body: "We pick one high-value workflow, write a clear spec, and quote it as a fixed scope." },
  { step: "Build & test", body: "Daily progress in a shared Slack channel. We test against real data and tune until it's reliable." },
  { step: "Handoff & monitor", body: "Documentation, dashboards, and a 30-day check-in to refine prompts as your data evolves." },
]

const faqs = [
  { question: "What kind of AI automations do you build?", answer: "AI chatbots, document processing pipelines, workflow automations (n8n, Zapier, Make), LLM-powered search, lead qualification bots, and custom AI integrations with your existing systems." },
  { question: "Which AI models and platforms do you work with?", answer: "OpenAI (GPT-4o, o1), Anthropic Claude, Mistral, and open-source LLMs. For orchestration we use LangChain and LlamaIndex. For no-code automations, we use n8n, Make, and Zapier." },
  { question: "Can you integrate AI into my existing product?", answer: "Yes. We can add AI features to any existing web app, CRM, or business tool via API, chatbot widgets, smart search, automated document processors, you name it." },
  { question: "How much does it cost?", answer: "Simple chatbots and workflow automations start from $1,500. Custom LLM pipelines and full AI feature integrations typically start from $3,000. We quote after understanding your specific use case." },
]

const faqIcons = [Code2, Clock, Search, Wallet]

export default function AutomatePage() {
  const crumbs = [
    { name: "Services", href: "/services" },
    { name: "Automate", href: "/services/automate" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    serviceSchema({ name: "Automate", description: "AI chatbots, agents, and workflow automations.", url: "/services/automate" }),
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
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Automate</p>
          </Reveal>
          <Reveal trigger="mount" delay={0.08}>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.035em] text-foreground md:text-6xl lg:text-[72px] lg:leading-[1]">
              Stop doing manually what AI can do instantly.
            </h1>
          </Reveal>
          <Reveal trigger="mount" delay={0.2}>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Chatbots, agents, and AI workflows that work 24/7, saving your team hours on the repetitive
                stuff so you can focus on growth.
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
                Our take on automation
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl font-medium leading-snug tracking-[-0.015em] text-foreground md:text-[32px] md:leading-[1.25]">
                AI shouldn&apos;t be a demo. It should be the quiet thing in the background that ships
                tickets, drafts emails, and qualifies leads while your team does the work only humans can do.
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
              What we build.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              From a single chatbot to an entire automation backbone.
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
              Four principles that shape every automation we ship.
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
              Let&apos;s automate something boring.
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
