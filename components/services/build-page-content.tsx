"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { useRef } from "react"
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Code2,
  Wallet,
  Cog,
  Star,
  Sparkles,
  Rocket,
  Gauge,
  Shield,
  RefreshCw,
  Globe,
  MessageCircle,
  Zap,
  Palette,
  Brush,
  Type,
  ListTodo,
  LifeBuoy,
  ChevronDown,
} from "lucide-react"
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiStripe,
  SiVercel,
  SiFigma,
  SiShopify,
  SiWordpress,
  SiOpenai,
} from "react-icons/si"

import { Reveal } from "@/components/ui/reveal"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema"

const pricingTiers = [
  { label: "Landing page", price: "$800", time: "1–2 weeks" },
  { label: "Marketing site", price: "$1.5k", time: "2–4 weeks" },
  { label: "Web app / SaaS", price: "$3k", time: "4–8 weeks" },
  { label: "Mobile app", price: "$5k", time: "6–12 weeks" },
]

const benefits = [
  { icon: Rocket, title: "Faster time to market.", body: "One team that designs, builds, deploys, and maintains. No handoffs, no waiting on a partner studio, no surprises in week 6." },
  { icon: Sparkles, title: "Design that ships intact.", body: "Because the people designing it are the people building it, the polish you saw in Figma is what your users actually get." },
  { icon: RefreshCw, title: "Flexible scope.", body: "Priorities shift mid-project. We restructure scope, not retainers, change direction without renegotiating a contract." },
  { icon: Wallet, title: "Cost-effective management.", body: "One invoice, one point of contact, one shared workspace. No agency overhead, no PM tax on every change." },
]

const stack = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Postgres", Icon: SiPostgresql },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Stripe", Icon: SiStripe },
  { name: "Vercel", Icon: SiVercel },
  { name: "Figma", Icon: SiFigma },
  { name: "Shopify", Icon: SiShopify },
  { name: "WordPress", Icon: SiWordpress },
  { name: "OpenAI", Icon: SiOpenai },
]

const offers: Array<{ icon: typeof Code2; title: string; body: string; href?: string }> = [
  { icon: Code2, title: "Web development", body: "Full stack builds in Next.js, React, and TypeScript with a clean, scalable implementation." },
  { icon: Cog, title: "Custom development", body: "Advanced features, API integrations, and bespoke JavaScript work tailored to your stack." },
  { icon: Sparkles, title: "Animations & interactions", body: "Smooth motion and engaging micro-interactions that bring the product to life." },
  { icon: Palette, title: "UX/UI design", body: "User-focused web and product design aligned with your brand and business goals." },
  { icon: Brush, title: "Illustration & graphics", body: "Custom visuals, icons, and graphics that enhance clarity and elevate the design." },
  { icon: Type, title: "Copywriting", body: "SEO-ready copy that informs, converts, and fits the tone of your brand." },
  { icon: ListTodo, title: "Project management", body: "A dedicated point of contact to guide scope, priorities, timeline, and delivery." },
  { icon: LifeBuoy, title: "Training & support", body: "Guidance, docs, and walkthroughs so your team stays in control after launch." },
]

const projects = [
  { slug: "clusterden", name: "ClusterDen", tags: ["DEVELOPMENT", "DESIGN"], image: "/images/projects/clusterden/screen-1.jpeg" },
  { slug: "payback", name: "Payback", tags: ["DEVELOPMENT", "DESIGN"], image: "/images/projects/payback/screen-1.jpeg" },
  { slug: "dynasty", name: "Dynasty", tags: ["DEVELOPMENT", "BRAND"], image: "/images/projects/dynasty/screen-1.jpeg" },
  { slug: "613-guys", name: "613 Guys", tags: ["DEVELOPMENT", "DESIGN"], image: "/images/projects/613-guys/613guys.jpeg" },
]

const howItWorks = [
  { step: "Quick intro call", body: "A 30-min call to understand your business, the goal, and the metric that matters most." },
  { step: "Written scope & quote", body: "A clear scope and fixed quote within 48 hours. No surprises mid-project." },
  { step: "Build in the open", body: "Weekly demos, a shared Slack/WhatsApp channel, and a staging URL that's always live." },
  { step: "Launch & support", body: "Go-live, monitoring, post-launch tuning, and a maintenance plan if you want one." },
]

const whyUs = [
  { icon: Shield, title: "Senior on every project.", body: "No juniors learning on your dime. Both founders touch every line of code." },
  { icon: Gauge, title: "Performance by default.", body: "Sub-second loads, perfect Lighthouse scores, Core Web Vitals in the green." },
  { icon: MessageCircle, title: "One-on-one support.", body: "A direct Slack/WhatsApp line that responds, not a ticket queue." },
  { icon: Globe, title: "SEO-ready foundations.", body: "Semantic HTML, structured data, sitemaps, optimized images, from commit one." },
  { icon: RefreshCw, title: "No vendor lock-in.", body: "You own the code, the infra, the domain. We hand over the keys at launch." },
  { icon: Sparkles, title: "Built to outlast trends.", body: "Most sites we shipped 3+ years ago still run on the same stack, untouched." },
]

const testimonials = [
  { quote: "They managed every milestone on time and kept us updated throughout. The platform works flawlessly, it's clear they really care about quality.", name: "Muhammad Usama", role: "CEO, Payback", logo: "/images/projects/payback.png" },
  { quote: "TwoPixel transformed how we manage our business. WhatsApp automation that used to take 30 seconds now takes 3. Everything feels organized and easy.", name: "Fatim Naveed", role: "CTO, ClusterDen", logo: "/images/projects/clusterden.svg" },
  { quote: "Turned our site into something professional and eye-catching. Loads quickly, looks great on every device, and our clients love it.", name: "Shozib Haroon", role: "Founder, 613 Guys", logo: "/images/projects/613guys.png" },
  { quote: "Beautiful and simple to navigate. The design really makes the platform enjoyable.", name: "Thomas Vettese", role: "CMO, Comuni", logo: "/images/projects/comuni.png" },
  { quote: "Modern, fast, and easy to understand. They focused on the design and user experience, and it shows everywhere.", name: "Kh Wahab", role: "Founder, Green N Solar", logo: "/images/projects/gns.png" },
  { quote: "Excellent work, the design, structure, and overall feel are exactly what we envisioned. Clean, professional, intuitive.", name: "Haroon Qayoum", role: "Director, Dynasty FZC" },
]

const faqs = [
  { question: "What technologies do you use?", answer: "Next.js, React, TypeScript, and Tailwind for web. React Native + Expo for mobile. Node.js, Postgres, and Supabase or Prisma for back-end. We pick the right stack for your specific needs." },
  { question: "How long does a project take?", answer: "Landing pages: 1–2 weeks. Marketing sites: 2–4 weeks. Full web apps: 4–8 weeks. Mobile apps: 6–12 weeks. Quick services and bug fixes: same week." },
  { question: "Do you handle hosting and deployment?", answer: "Yes. We deploy to Vercel, AWS, or your preferred provider, and set up CI/CD, monitoring, and post-launch maintenance plans." },
  { question: "What does a project cost?", answer: "Landing pages start from $800. Business websites from $1,500. Web apps from $3,000. Mobile apps from $5,000. We quote after understanding your specific needs." },
  { question: "Can you work with our existing team?", answer: "Yes. We embed with internal teams regularly, designing alongside your designers, shipping into your codebase, and joining your stand-ups when useful." },
  { question: "Do you offer maintenance after launch?", answer: "Yes. Monthly retainers cover security patches, performance monitoring, feature additions, and on-call support. You can cancel anytime." },
]

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
}

/* ─── Benefit illustrations ─────────────────────────────────── */

function IllustrationFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-foreground/[0.05] bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-primary/[0.18] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-primary/[0.08] blur-3xl" />
      {children}
    </div>
  )
}

/** Illustration 1: timeline → ship */
function TimelineIllustration() {
  return (
    <IllustrationFrame>
      <div className="absolute inset-0 flex flex-col items-stretch justify-center gap-6 px-7 md:gap-7 md:px-10">
        {/* Progress bar */}
        <div className="relative flex h-1.5 w-full items-center rounded-full bg-foreground/[0.08]">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-primary/70 to-primary shadow-[0_0_18px_-2px_rgba(168,85,247,0.85)]" />
          {/* Milestones */}
          {[0, 26, 52, 78].map((left) => (
            <span
              key={left}
              className="absolute h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_12px_-1px_rgba(168,85,247,0.8)]"
              style={{ left: `${left}%` }}
            />
          ))}
          {/* Live pill at end */}
          <div className="absolute -right-1 -top-7 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_8px_24px_-4px_rgba(168,85,247,0.7)]">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
            Live
          </div>
        </div>
        {/* Labels */}
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
          <span>Day 1</span>
          <span>Week 2</span>
          <span>Week 4</span>
          <span className="text-primary">Launch</span>
        </div>
      </div>
    </IllustrationFrame>
  )
}

/** Illustration 2: Figma → Browser, design ships intact */
function DesignShipsIllustration() {
  return (
    <IllustrationFrame>
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-6 md:gap-5 md:px-8">
        {/* Figma frame */}
        <div className="relative w-[42%] overflow-hidden rounded-xl border border-foreground/[0.08] bg-foreground/[0.04] shadow-[0_18px_45px_-15px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-foreground/[0.06] px-2.5 py-1.5">
            <span className="font-mono text-[9px] font-semibold text-primary">Figma</span>
            <span className="font-mono text-[8px] text-muted-foreground/60">100%</span>
          </div>
          <div className="space-y-1.5 p-2.5">
            <div className="h-2 w-12 rounded-full bg-primary/60" />
            <div className="h-1.5 w-full rounded-full bg-foreground/[0.10]" />
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/[0.08]" />
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div className="h-5 rounded-md bg-foreground/[0.06]" />
              <div className="h-5 rounded-md bg-foreground/[0.06]" />
            </div>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-inset ring-primary/30">
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        {/* Browser frame */}
        <div className="relative w-[42%] overflow-hidden rounded-xl border border-foreground/[0.08] bg-foreground/[0.04] shadow-[0_18px_45px_-15px_rgba(168,85,247,0.4)] ring-1 ring-primary/20">
          <div className="flex items-center gap-1 border-b border-foreground/[0.06] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/[0.15]" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/[0.15]" />
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/[0.15]" />
          </div>
          <div className="space-y-1.5 p-2.5">
            <div className="h-2 w-12 rounded-full bg-primary/60" />
            <div className="h-1.5 w-full rounded-full bg-foreground/[0.10]" />
            <div className="h-1.5 w-3/4 rounded-full bg-foreground/[0.08]" />
            <div className="mt-2 grid grid-cols-2 gap-1">
              <div className="h-5 rounded-md bg-foreground/[0.06]" />
              <div className="h-5 rounded-md bg-foreground/[0.06]" />
            </div>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  )
}

/** Illustration 3: scope cards rearranging */
function FlexibleScopeIllustration() {
  return (
    <IllustrationFrame>
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5 px-7 md:px-10">
        {[
          { width: "w-3/4", offset: "translate-x-0" },
          { width: "w-2/3", offset: "translate-x-2", highlight: true },
          { width: "w-4/5", offset: "translate-x-0" },
          { width: "w-1/2", offset: "translate-x-0" },
        ].map((row, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 rounded-lg border ${row.highlight ? "border-primary/40 bg-primary/[0.10] shadow-[0_8px_24px_-8px_rgba(168,85,247,0.45)]" : "border-foreground/[0.07] bg-foreground/[0.03]"} px-2.5 py-2 ${row.offset}`}
          >
            <span className={`h-2 w-2 rounded-full ${row.highlight ? "bg-primary" : "bg-foreground/30"}`} />
            <span className={`h-1.5 rounded-full ${row.highlight ? "bg-primary/60" : "bg-foreground/[0.12]"} ${row.width}`} />
            {row.highlight && (
              <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary">
                <RefreshCw className="h-3 w-3" strokeWidth={2.5} />
              </div>
            )}
          </div>
        ))}
      </div>
    </IllustrationFrame>
  )
}

/** Illustration 4: one hub, many services */
function OneHubIllustration() {
  return (
    <IllustrationFrame>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 220" preserveAspectRatio="none">
        {/* Connector lines */}
        {[
          { x: 70, y: 60 },
          { x: 330, y: 60 },
          { x: 70, y: 160 },
          { x: 330, y: 160 },
        ].map((p, i) => (
          <line
            key={i}
            x1="200"
            y1="110"
            x2={p.x}
            y2={p.y}
            stroke="rgba(168,85,247,0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
      </svg>
      {/* Satellite chips */}
      <div className="absolute left-[14%] top-[22%] rounded-md border border-foreground/[0.07] bg-foreground/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/85">
        Design
      </div>
      <div className="absolute right-[14%] top-[22%] rounded-md border border-foreground/[0.07] bg-foreground/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/85">
        Build
      </div>
      <div className="absolute bottom-[18%] left-[14%] rounded-md border border-foreground/[0.07] bg-foreground/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/85">
        Deploy
      </div>
      <div className="absolute bottom-[18%] right-[14%] rounded-md border border-foreground/[0.07] bg-foreground/[0.04] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/85">
        Support
      </div>
      {/* Central hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative rounded-xl border border-primary/30 bg-primary/15 px-3 py-2 shadow-[0_0_24px_-4px_rgba(168,85,247,0.5)] backdrop-blur">
          <div className="flex items-center gap-2">
            <Wallet className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
              1 invoice
            </span>
          </div>
        </div>
      </div>
    </IllustrationFrame>
  )
}

const benefitIllustrations = [
  TimelineIllustration,
  DesignShipsIllustration,
  FlexibleScopeIllustration,
  OneHubIllustration,
]

/* ─── Hero visual ───────────────────────────────────────────── */

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [10, -60])
  const y3 = useTransform(scrollYProgress, [0, 1], [-20, -80])

  return (
    <div ref={ref} className="relative h-[480px] md:h-[520px]">
      {/* Floating screen 1 */}
      <motion.div
        style={{ y: y1 }}
        className="absolute left-0 top-6 w-[80%] overflow-hidden rounded-2xl border border-foreground/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="aspect-[16/10] relative">
          <Image src="/images/projects/clusterden/screen-1.jpeg" alt="" fill sizes="500px" className="object-cover object-top" />
        </div>
      </motion.div>
      {/* Floating screen 2 */}
      <motion.div
        style={{ y: y2 }}
        className="absolute right-0 top-[42%] w-[68%] overflow-hidden rounded-2xl border border-foreground/[0.08] shadow-[0_30px_80px_-20px_rgba(168,85,247,0.35)]"
      >
        <div className="aspect-[16/10] relative">
          <Image src="/images/projects/payback/screen-1.jpeg" alt="" fill sizes="400px" className="object-cover object-top" />
        </div>
      </motion.div>
      {/* Floating badge: Lighthouse */}
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-6 left-6 rounded-2xl border border-foreground/[0.08] bg-background/95 px-4 py-3 shadow-2xl shadow-primary/15 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Gauge className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Lighthouse</p>
            <p className="text-sm font-semibold text-foreground">99 / 100</p>
          </div>
        </div>
      </motion.div>
      {/* Floating badge: Deployed */}
      <motion.div
        style={{ y: y2 }}
        className="absolute right-4 top-4 rounded-2xl border border-foreground/[0.08] bg-background/95 px-4 py-3 shadow-2xl shadow-primary/15 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Deployed</p>
            <p className="text-sm font-semibold text-foreground">2.1s</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function BuildPageContent() {
  const crumbs = [
    { name: "Services", href: "/services" },
    { name: "Build", href: "/services/build" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    serviceSchema({ name: "Build", description: "Web apps, mobile apps, and storefronts engineered to ship.", url: "/services/build" }),
    faqSchema(faqs),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.5) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
            }}
          />
          <div className="absolute -left-[10%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse" style={{ background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)" }} />
          <div className="absolute -right-[12%] top-[25%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b" style={{ background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1320px] px-6 pt-20 pb-16 md:px-10 md:pt-28 md:pb-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="lg:col-span-7">
              <motion.p variants={fadeUp} className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Build</motion.p>
              <motion.h1 variants={fadeUp} className="text-balance text-4xl font-semibold tracking-[-0.035em] text-foreground md:text-6xl lg:text-[68px] lg:leading-[1.02]">
                Get web, mobile & SaaS development tailored to your business.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Your own senior team of designers and engineers, shipping marketing sites, web apps,
                mobile apps, and storefronts that move the metric that matters.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-8px_rgba(168,85,247,0.85)] hover:brightness-110">
                  Schedule a call
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-6 py-3 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.07]">
                  See pricing
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: easeOut, delay: 0.3 }} className="lg:col-span-5">
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Pricing tiers ────────────────────────────────────────── */}
      <section id="pricing" className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Pricing</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              Clear pricing. Fixed scope. No surprises.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every project gets a written scope and fixed quote up front. Starting points below, your final
              quote depends on the actual brief.
            </p>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-px overflow-hidden rounded-3xl border border-foreground/[0.07] bg-foreground/[0.06] md:grid-cols-4">
          {pricingTiers.map((tier) => (
            <motion.div key={tier.label} variants={fadeUp} className="group relative flex flex-col justify-between gap-8 bg-background p-7 transition-all duration-500 hover:bg-foreground/[0.025] md:p-8 md:min-h-[260px]">
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent transition-all duration-500 group-hover:via-primary/60" />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{tier.label}</p>
                <p className="text-3xl font-semibold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary md:text-4xl">
                  From {tier.price}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{tier.time}</p>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-8px_rgba(168,85,247,0.85)] hover:brightness-110">
              Get a custom quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-6 py-3 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.07]">
              Schedule a call
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── Value prop ──────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Why TwoPixel</p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
                A high-quality build that stands out.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                <p>
                  We&apos;ve worked with founders raising their first round, SaaS teams scaling past Series B,
                  and ecommerce brands shipping seasonal launches, the through-line is always speed, polish,
                  and the kind of detail that compounds over months.
                </p>
                <p>
                  Every TwoPixel project is run directly by both founders. You get senior-level engineering,
                  design, and product thinking on every call, not a junior team learning on your dime.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Senior on every project",
                  "Direct Slack/WhatsApp line",
                  "Fixed scope & quote",
                  "You own the code & infra",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-foreground/[0.07] bg-gradient-to-br from-primary/[0.15] via-foreground/[0.03] to-transparent p-8 shadow-[0_30px_80px_-30px_rgba(168,85,247,0.45)] md:p-10">
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/[0.18] blur-3xl" />
                <div className="relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">★ Featured</div>
                  <p className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.015em] text-foreground md:text-[28px]">
                    &ldquo;The platform works flawlessly, it&apos;s clear they really care about quality.&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-foreground/[0.06] pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.05]">
                      <Image src="/images/projects/payback.png" alt="Payback" width={28} height={28} className="opacity-90" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Muhammad Usama</p>
                      <p className="text-xs text-muted-foreground">CEO, Payback</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Benefits 2x2 ────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-3xl md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Why combine design and development?</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              One team. One workflow. One outcome.
            </h2>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-6 md:grid-cols-2">
          {benefits.map((b, i) => {
            const step = String(i + 1).padStart(2, "0")
            const Illustration = benefitIllustrations[i] ?? TimelineIllustration
            return (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-foreground/[0.03] hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.45)] md:p-7"
              >
                {/* Step badge */}
                <span className="inline-flex w-fit items-center rounded-full bg-primary/15 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Step {step}
                </span>

                {/* Illustration */}
                <div className="mt-5">
                  <Illustration />
                </div>

                {/* Heading + body */}
                <div className="mt-6">
                  <h3 className="mb-2 text-xl font-semibold tracking-[-0.01em] text-foreground md:text-2xl">
                    {b.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── Stack & Integrations ────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">The stack</p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl">
                Integrations with any software you want.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                We pick the right tool for the job, from cutting-edge frameworks to battle-tested platforms.
                If your business runs on it, we can build with it or wire into it.
              </p>
            </div>
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-foreground/[0.07] bg-foreground/[0.06] sm:grid-cols-4">
                {stack.map(({ name, Icon }) => (
                  <motion.div key={name} variants={fadeUp} className="group flex aspect-square flex-col items-center justify-center gap-2 bg-background p-4 transition-all duration-300 hover:bg-foreground/[0.04]">
                    <Icon className="h-7 w-7 text-foreground/75 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
                    <span className="text-[11px] font-medium text-muted-foreground">{name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── Testimonials auto-marquee ───────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden py-20 md:py-28">
          <div className="mx-auto mb-10 max-w-[1320px] px-6 md:mb-14 md:px-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Reviews</p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
                What they say about us.
              </h2>
              <Link href="/testimonials" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/85 transition-colors hover:text-primary">
                <span className="border-b border-foreground/15 pb-0.5 transition-colors group-hover:border-primary">View all reviews</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <InfiniteSlider speed={55} speedOnHover={20} gap={20}>
              {testimonials.map((t, i) => (
                <div key={i} className="group relative flex w-[340px] shrink-0 flex-col gap-5 rounded-2xl border border-foreground/[0.07] bg-gradient-to-b from-foreground/[0.025] to-foreground/[0.005] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_hsl(var(--glow)/0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 md:w-[400px] md:p-8">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-foreground/90 md:text-[17px]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-foreground/[0.06] pt-5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    {t.logo && (
                      <Image src={t.logo} alt="" width={36} height={36} className="opacity-80" />
                    )}
                  </div>
                </div>
              ))}
            </InfiniteSlider>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />
          </div>
        </section>
      </Reveal>

      {/* ── Selected work 2x2 with parallax hover ───────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Selected work</p>
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
                Products we&apos;ve shipped.
              </h2>
            </div>
            <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/85 transition-colors hover:text-primary">
              <span className="border-b border-foreground/15 pb-0.5 transition-colors group-hover:border-primary">All projects</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/[0.07] bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.01] transition-all duration-500 hover:border-primary/30 hover:shadow-[0_30px_80px_-30px_rgba(168,85,247,0.5)]"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top opacity-65 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent transition-opacity duration-500 group-hover:from-background/95" />
                <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-4">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-foreground transition-transform duration-500 group-hover:-translate-y-0.5 md:text-3xl">{p.name}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-foreground/60 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Full package includes ──────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">What&apos;s included</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              Full package build service includes.
            </h2>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => {
            const Icon = o.icon
            const cardClass = "group relative block overflow-hidden rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-foreground/[0.04] hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.4)]"
            const inner = (
              <>
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(168,85,247,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.02] text-primary ring-1 ring-inset ring-foreground/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:ring-primary/30">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  {o.href && (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground">{o.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{o.body}</p>
              </>
            )
            return (
              <motion.div key={o.title} variants={fadeUp}>
                {o.href ? (
                  <Link href={o.href} className={cardClass}>{inner}</Link>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </section>


      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-3xl md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">How it works</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              Four steps from idea to live.
            </h2>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="relative grid gap-5 md:grid-cols-4">
          {/* Connector line */}
          <div aria-hidden className="pointer-events-none absolute left-7 right-7 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block" />
          {howItWorks.map((p, i) => (
            <motion.div key={p.step} variants={fadeUp} className="group relative flex flex-col gap-5 rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-foreground/[0.04] md:p-7 md:min-h-[260px]">
              <div className="flex items-center justify-between">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-semibold text-primary ring-4 ring-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <div className="mt-auto">
                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground">{p.step}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Why TwoPixel ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <div className="mb-12 max-w-3xl md:mb-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">Why TwoPixel?</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-6xl">
              Six reasons teams stay with us.
            </h2>
          </div>
        </Reveal>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => {
            const Icon = w.icon
            return (
              <motion.div key={w.title} variants={fadeUp} className="group relative overflow-hidden rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-foreground/[0.04] hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.4)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(168,85,247,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/[0.08] to-foreground/[0.02] text-primary ring-1 ring-inset ring-foreground/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:ring-primary/30">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em] text-foreground">{w.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">FAQ</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl">
              Frequently asked questions.
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => {
                const value = `item-${i + 1}`
                return (
                  <AccordionItem
                    key={value}
                    value={value}
                    className="group overflow-hidden rounded-2xl border border-foreground/[0.07] bg-foreground/[0.015] transition-all duration-300 data-[state=open]:border-primary/25 data-[state=open]:bg-foreground/[0.03]"
                  >
                    <AccordionTrigger className="gap-5 px-6 py-5 hover:no-underline md:px-8 md:py-6 [&>svg]:hidden">
                      <div className="flex flex-1 items-center gap-4 md:gap-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_14px_-4px_rgba(168,85,247,0.6)] transition-transform duration-300 group-data-[state=open]:rotate-180">
                          <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                        <span className="text-left text-base font-semibold tracking-[-0.01em] text-foreground md:text-lg">
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pl-[3.75rem] text-[15px] leading-relaxed text-muted-foreground md:px-8 md:pb-7 md:pl-[4.25rem]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-foreground/[0.07] bg-gradient-to-br from-primary/[0.18] via-foreground/[0.02] to-transparent p-10 shadow-[0_30px_80px_-30px_rgba(168,85,247,0.45)] md:p-16">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-primary/[0.18] blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-primary/[0.10] blur-3xl" />
            <div className="relative grid items-center gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-primary/85">Ready to ship?</p>
                <h2 className="text-balance text-4xl font-semibold tracking-[-0.025em] text-foreground md:text-5xl lg:text-[56px] lg:leading-[1.05]">
                  The team that makes your roadmap unstoppable.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  Trusted by founders, SaaS teams, and agencies who needed senior craft on a tight timeline.
                </p>
              </div>
              <div className="md:col-span-5">
                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_rgba(168,85,247,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-8px_rgba(168,85,247,0.85)] hover:brightness-110">
                    Schedule a call
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-6 py-3 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.07]">
                    See pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  )
}
