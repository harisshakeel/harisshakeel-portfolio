import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Breadcrumb } from "@/components/breadcrumb"
import AnimatedTextCycle from "@/components/ui/animated-text-cycle"
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal"
import { CtaWithTextMarquee } from "@/components/ui/cta-with-text-marquee"
import {
  ParallaxScrollFeatureSection,
  type ParallaxFeatureItem,
} from "@/components/ui/parallax-scroll-feature-section"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "About TwoPixel, Indie Digital Studio",
  description:
    "TwoPixel is a two-person indie digital studio founded by Haris Shakeel and Asma Zahid. We build websites, mobile apps, and AI automations for modern businesses, fast, clean, and built to last.",
  path: "/about",
})

const whyTwoPixel: ParallaxFeatureItem[] = [
  {
    id: 1,
    number: "01",
    title: "Built and Run by the Founders",
    description:
      "Unlike large agencies where junior talent does most of the work and senior leaders are out of reach, every TwoPixel project is run directly by Haris and Asma, the people who designed and shipped it.\n\nYou get senior-level engineering, design, and product thinking on every call, every commit, every pixel.",
    imageUrl: "/images/owners/harus.png",
    imageAlt: "Haris Shakeel, CEO & Co-founder",
    secondImageUrl: "/images/owners/asmeow.png",
    secondImageAlt: "Asma Zahid, Co-founder & Designer",
  },
  {
    id: 2,
    number: "02",
    title: "Collaboration Beats Process",
    description:
      "We treat communication and transparency as the product. You get shared notion boards, async Loom updates, and a Slack/WhatsApp line that actually responds, not a ticket queue.\n\nWorking with both early-stage startups and established companies has made us fast where speed matters and structured where stakes are high.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Team collaborating around a whiteboard",
  },
  {
    id: 3,
    number: "03",
    title: "Built to Outlast the Trend Cycle",
    description:
      "We design and engineer for years, not launch day. Clean architecture, sensible defaults, and Core Web Vitals that hold up months later, even after we've handed the keys over.\n\nMost of the sites and products we shipped 3+ years ago are still running on the same stack, untouched.",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Developer focused on a laptop with a coffee nearby",
  },
]

export default function AboutPage() {
  const crumbs = [{ name: "About", href: "/about" }]
  const schemas = [breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs])]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        {/* Animated aurora backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
          {/* Faint masked grid */}
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
          {/* Drifting blob A, purple, top-left */}
          <div
            className="absolute -left-[12%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)",
            }}
          />
          {/* Drifting blob B, deeper violet, mid-right */}
          <div
            className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)",
            }}
          />
          {/* Horizon glow at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
          <div className="absolute inset-x-[10%] -bottom-24 h-48 rounded-[100%] bg-[radial-gradient(closest-side,rgba(168,85,247,0.20),rgba(168,85,247,0.05)_45%,transparent_75%)] blur-2xl" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 py-16 md:py-24">
          <Breadcrumb items={crumbs} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Two founders.<br />One shared{" "}
              <AnimatedTextCycle
                words={["mission.", "vision.", "standard.", "obsession.", "promise."]}
                interval={2800}
                className="text-primary"
              />
            </h1>
          </div>
        </div>
      </section>

      {/* Studio manifesto */}
      <section className="relative overflow-hidden border-y border-foreground/[0.06]">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[140px]"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Studio · est. 2025
              </p>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap text-balance text-2xl font-medium leading-snug tracking-[-0.015em] text-foreground md:text-[34px] md:leading-[1.2]">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.045}
                  staggerFrom="first"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                    delay: 0.1,
                  }}
                >
                  {`We're a two-person studio with one rule: ship work we'd be proud to put our names on. `}
                </VerticalCutReveal>
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.045}
                  staggerFrom="first"
                  containerClassName="text-primary"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                    delay: 0.95,
                  }}
                >
                  {`No middle management. `}
                </VerticalCutReveal>
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.045}
                  staggerFrom="first"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 24,
                    delay: 1.15,
                  }}
                >
                  {`No template-shop output. No silent weeks.`}
                </VerticalCutReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why TwoPixel, parallax */}
      <ParallaxScrollFeatureSection features={whyTwoPixel} />

      {/* CTA */}
      <CtaWithTextMarquee
        title="Ready to build something great?"
        description="Tell us about your project. We respond within 24 hours and start most engagements within a week."
        primary={{ label: "START A PROJECT", href: "/contact" }}
        marqueeItems={[
          "Founders & Execs",
          "Startup Teams",
          "SaaS Builders",
          "Indie Makers",
          "Ecommerce Brands",
          "Growth Teams",
        ]}
      />
    </PageLayout>
  )
}
