import type { Metadata } from "next"
import Link from "next/link"
import {
  Rocket,
  Layers,
  Users,
  Building2,
  ShoppingBag,
  HeartPulse,
  Home,
  Landmark,
  GraduationCap,
  Plane,
  Briefcase,
  Sparkles,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { Breadcrumb } from "@/components/breadcrumb"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, faqSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Solutions, Built for Every Audience & Industry",
  description:
    "TwoPixel builds tailored web, mobile, and AI solutions for startups, SaaS companies, agencies, enterprises, and across ecommerce, healthcare, fintech, real estate, education, and more.",
  path: "/solutions",
})

const audiences = [
  {
    icon: Rocket,
    title: "Startups & Founders",
    description: "Go from idea to launched MVP in weeks. We move fast, ship clean, and stay close while you raise.",
  },
  {
    icon: Layers,
    title: "SaaS Companies",
    description: "Marketing sites, dashboards, AI features, and onboarding flows engineered to convert and retain.",
  },
  {
    icon: Users,
    title: "Agencies (White-Label)",
    description: "Senior dev and design capacity you can resell. Quiet handoff, your brand on the deliverable.",
  },
  {
    icon: Building2,
    title: "Enterprise Teams",
    description: "Internal tools, integrations, and AI automations that ship without the usual enterprise drag.",
  },
]

const industries = [
  { icon: ShoppingBag, title: "Ecommerce & Retail", description: "Storefronts, checkout, and conversion-tuned landing pages." },
  { icon: HeartPulse, title: "Healthcare & Wellness", description: "Patient portals, booking, and HIPAA-aware product builds." },
  { icon: Home, title: "Real Estate & Proptech", description: "Listing portals, dashboards, and lead-gen funnels." },
  { icon: Landmark, title: "Fintech & Finance", description: "Dashboards, billing flows, and secure data integrations." },
  { icon: GraduationCap, title: "Education & EdTech", description: "Learning platforms, course delivery, and student dashboards." },
  { icon: Plane, title: "Hospitality & Travel", description: "Booking flows, loyalty programs, and brand-rich marketing sites." },
  { icon: Briefcase, title: "Professional Services", description: "High-trust marketing sites, lead capture, and client portals." },
  { icon: Sparkles, title: "Media & Creator Brands", description: "Editorial sites, membership flows, and audience tools." },
]

const faqs = [
  {
    question: "Do you only work with certain industries?",
    answer:
      "No, these are the verticals we have the most reps in, but we work across most industries. If your space isn't listed and the work fits our craft (web, mobile, AI, design, growth), we'd still love to talk.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "Most engagements start with a 30-min discovery call, followed by a written scope and quote. Projects run 2–12 weeks depending on size, with weekly demos and an async Slack/WhatsApp line.",
  },
  {
    question: "Can you white-label for our agency?",
    answer:
      "Yes. We work behind the scenes for several agencies, your client sees only your brand. NDAs, ghost handoffs, and your tooling are all standard.",
  },
]

export default function SolutionsPage() {
  const crumbs = [{ name: "Solutions", href: "/solutions" }]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    faqSchema(faqs),
  ]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero with aurora backdrop */}
      <section className="relative w-full overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
            }}
          />
          <div
            className="absolute -left-[12%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)",
            }}
          />
          <div className="absolute inset-x-[10%] -bottom-24 h-48 rounded-[100%] bg-[radial-gradient(closest-side,rgba(168,85,247,0.20),rgba(168,85,247,0.05)_45%,transparent_75%)] blur-2xl" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 py-16 md:py-24">
          <Breadcrumb items={crumbs} />
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">Solutions</p>
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Built for the team you are. Tuned for the industry you&apos;re in.
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We&apos;ve shipped products with founders raising their first round, SaaS teams scaling past Series B,
              agencies needing trusted dev capacity, and enterprises moving faster than their org chart allows.
            </p>
          </div>
        </div>
      </section>

      {/* By Audience */}
      <section className="max-w-[1320px] mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75 mb-3">By Audience</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Who we build for
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((a) => {
            const Icon = a.icon
            return (
              <div key={a.title} className="bg-muted/20 border border-border/40 rounded-2xl p-6 md:p-8">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-foreground font-semibold text-xl mb-2">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* By Industry */}
      <section className="max-w-[1320px] mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75 mb-3">By Industry</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            Verticals we know well
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {industries.map((i) => {
            const Icon = i.icon
            return (
              <div key={i.title} className="bg-muted/20 border border-border/40 rounded-xl p-5 hover:border-primary/40 transition-colors">
                <div className="w-9 h-9 bg-primary/10 rounded-md flex items-center justify-center text-primary mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-foreground font-semibold mb-1.5">{i.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{i.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[1320px] mx-auto px-6 py-12 md:py-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Common Questions</h2>
        <div className="max-w-2xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="border border-border/40 rounded-xl p-5">
              <h3 className="text-foreground font-medium mb-2">{faq.question}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1320px] mx-auto px-6 py-12 md:py-20">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Don&apos;t see your fit?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Tell us about your team and your space. If it&apos;s a fit, we&apos;ll send back a clear plan and quote.
          </p>
          <div className="flex justify-center">
            <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
