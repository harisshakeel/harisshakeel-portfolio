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
  title: "About, Software Engineer",
  description:
    "Haris Shakeel is a software engineer in Lahore who builds multi-tenant SaaS, AI agent systems and computer-vision pipelines in Python and TypeScript.",
  path: "/about",
})

const aboutHaris: ParallaxFeatureItem[] = [
  {
    id: 1,
    number: "01",
    title: "The whole stack",
    description:
      "I work on every layer: the database, the API, the job queue and the interface.\n\nOn MAVIS that meant a multi-tenant platform where Postgres row-level security keeps each client's data separate, and agents can reach 10,000+ tools across 3,000+ apps.",
    imageUrl: "/images/haris-portrait.webp",
    imageAlt: "Haris Shakeel",
  },
  {
    id: 2,
    number: "02",
    title: "AI and computer vision",
    description:
      "On Xision I built the pipeline that turns a phone scan into a body model and drapes real garments on it, and cut the try-on simulation from 5 minutes to 30 seconds.\n\nI've also trained YOLOv8 models that watch live CCTV for accidents, vandalism and weapons.",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Technical architecture diagramming",
  },
  {
    id: 3,
    number: "03",
    title: "Tested before it ships",
    description:
      "I write tests for the parts that matter, like a harness that runs every garment on every body type, so a drop in quality shows up as a failing test.\n\nCode goes through pull requests, review and CI before it reaches anyone.",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Developer focused on engineering work",
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
          {/* Drifting blob A, chartreuse, top-left */}
          <div
            className="absolute -left-[12%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(210,231,106,0.22) 0%, rgba(210,231,106,0.08) 40%, transparent 70%)",
            }}
          />
          {/* Drifting blob B, mineral sage, mid-right */}
          <div
            className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(145,168,131,0.30) 0%, rgba(145,168,131,0.10) 45%, transparent 72%)",
            }}
          />
          {/* Horizon glow at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
          <div className="absolute inset-x-[10%] -bottom-24 h-48 rounded-[100%] bg-[radial-gradient(closest-side,rgba(210,231,106,0.16),rgba(210,231,106,0.04)_45%,transparent_75%)] blur-2xl" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 py-16 md:py-24">
          <Breadcrumb items={crumbs} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Hi, I&apos;m Haris.<br />I build{" "}
              <AnimatedTextCycle
                words={["SaaS platforms.", "AI agents.", "vision pipelines.", "automations."]}
                interval={2800}
                className="text-primary"
              />
            </h1>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative overflow-hidden border-y border-foreground/[0.06]">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[140px]"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Haris Shakeel
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
                  {`I'm a software engineer in Lahore. `}
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
                  {`I build SaaS platforms, AI agents and computer-vision pipelines, `}
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
                  {`from the database to the screen.`}
                </VerticalCutReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Haris Shakeel, parallax */}
      <ParallaxScrollFeatureSection features={aboutHaris} />

      {/* CTA */}
      <CtaWithTextMarquee
        title="Want to work together?"
        description="I'm open to software engineering roles and freelance projects."
        primary={{ label: "GET IN TOUCH", href: "/#contact" }}
        marqueeItems={[
          "Agentic AI",
          "Computer Vision",
          "Full-Stack SaaS",
          "Claude Agent SDK",
          "Automation",
          "AWS / GCP",
        ]}
      />
    </PageLayout>
  )
}
