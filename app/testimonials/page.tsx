import type { Metadata } from "next"
import Image from "next/image"
import { Quote, Star } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { Reveal } from "@/components/ui/reveal"
import { CallToAction1 } from "@/components/ui/call-to-action-1"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, aggregateRatingSchema } from "@/lib/schema"

import { cn } from "@/lib/utils"

export const metadata: Metadata = buildPageMetadata({
  title: "Client Testimonials, What Our Clients Say About TwoPixel",
  description:
    "Read real testimonials from TwoPixel clients across web development, mobile apps, AI automations, and SaaS projects. 5-star rated on Upwork with 30+ projects delivered.",
  path: "/testimonials",
})

interface Testimonial {
  quote: string
  name: string
  role?: string
  company: string
  image: string
  /** Optional gradient accent on the card */
  accent?: "purple" | "fuchsia" | "amber" | "emerald" | "cyan"
}

const testimonials: Testimonial[] = [
  {
    quote:
      "They managed the project carefully, delivering every milestone on time and keeping us updated throughout. The platform works flawlessly, and it's clear they really care about quality. From start to finish, the team was professional and made sure everything met our expectations, we couldn't have asked for a smoother collaboration.",
    name: "Muhammad Usama",
    role: "CEO",
    company: "Payback",
    image: "/images/avatars/usama.jpg",
    accent: "purple",
  },
  {
    quote:
      "TwoPixel completely transformed how we manage our business. WhatsApp automation used to take a long time, but now messages go instantly, what used to take 30 seconds now takes just 3. Everything feels organized and easy to use.",
    name: "Fatim Naveed",
    role: "CTO",
    company: "ClusterDen",
    image: "/images/avatars/fatim.jpg",
    accent: "purple",
  },
  {
    quote:
      "TwoPixel turned our site into something professional and eye-catching. It loads quickly, looks great on all devices, and our clients love it. We're proud to show it off.",
    name: "Shozib Haroon",
    role: "Founder",
    company: "613 Guys",
    image: "/images/avatars/shozib.jpg",
    accent: "amber",
  },
  {
    quote:
      "The website TwoPixel created is beautiful and simple to navigate. Finding local events and connecting with people has never been easier. The design really makes using the platform enjoyable.",
    name: "Thomas Vettese",
    role: "CMO",
    company: "Comuni",
    image: "/images/avatars/thomas.jpg",
    accent: "cyan",
  },
  {
    quote:
      "The website looks modern, loads fast, and makes our services easy to understand. TwoPixel really focused on the design and user experience, and it shows.",
    name: "Kh Wahab",
    company: "Green N Solar",
    image: "/images/avatars/wahab.webp",
    accent: "emerald",
  },
  {
    quote:
      "TwoPixel delivered exactly what we needed at a very reasonable price. The product is high quality and makes managing contracts, inventory, and users so much easier. We couldn't be happier.",
    name: "Rashid Khan",
    company: "Meddo (Canada)",
    image: "/images/avatars/rashid.jpg",
    accent: "fuchsia",
  },
  {
    quote:
      "TwoPixel did an excellent job on our website. The design, structure, and overall feel are exactly what we envisioned, clean, professional, and intuitive. They made the entire process smooth and efficient, and we're thrilled with the final result.",
    name: "Haroon Qayoum",
    role: "Executive Director",
    company: "Dynasty FZC",
    image: "/images/avatars/haroon.jpg",
    accent: "purple",
  },
]

const companies = [
  "Payback",
  "ClusterDen",
  "Meddo",
  "Comuni",
  "613 Guys",
  "Green N Solar",
  "Dynasty FZC",
]

export default function TestimonialsPage() {
  const totalReviews = testimonials.length
  const crumbs = [{ name: "Testimonials", href: "/testimonials" }]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    aggregateRatingSchema({ ratingValue: 5, reviewCount: totalReviews }),
  ]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.09] blur-[140px]"
        />
        <div className="relative mx-auto max-w-[1320px] px-6 pt-20 pb-12 md:px-10 md:pt-28 md:pb-20">
          <Reveal trigger="mount">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Testimonials
            </p>
          </Reveal>
          <Reveal trigger="mount" delay={0.08}>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl lg:text-[88px] lg:leading-[0.96]">
              Words from people
              <br />
              <span className="text-foreground/55">we&apos;ve shipped with.</span>
            </h1>
          </Reveal>
          <Reveal trigger="mount" delay={0.18}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Real reviews from founders, CTOs, and execs who chose TwoPixel
              to build, ship, and stay running long after launch.
            </p>
          </Reveal>
        </div>
      </section>

      <Hairline />

      {/* ── Bento grid ────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
              More stories
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {String(testimonials.length).padStart(2, "0")} /{" "}
              {String(totalReviews).padStart(2, "0")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </section>
      </Reveal>

      <Hairline />

      {/* ── Trusted by, marquee ──────────────────────────────── */}
      <Reveal>
        <section className="py-16 md:py-24">
          <p className="mx-auto mb-10 max-w-[1320px] px-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-14 md:px-10">
            Trusted by
          </p>
          <div className="relative overflow-hidden">
            {/* Edge fades */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent md:w-40"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent md:w-40"
            />

            {/* Track, duplicated content slides -50% so the loop is seamless */}
            <div className="marquee-track flex w-max items-center gap-12 md:gap-20">
              {[...companies, ...companies].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className={cn(
                    "shrink-0 text-2xl font-medium tracking-[-0.01em] transition-colors md:text-3xl lg:text-4xl",
                    i % 2 === 0
                      ? "text-foreground/80"
                      : "text-foreground/40",
                  )}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Hairline />

      {/* ── CTA ───────────────────────────────────────────────── */}
      <Reveal>
        <section className="mx-auto w-full max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <CallToAction1
            eyebrow="Join 30+ founders we've shipped with"
            heading="Ready to become our next happy client?"
            ctaLabel="Start a project"
            ctaHref="/contact"
          />
        </section>
      </Reveal>
    </PageLayout>
  )
}

function Hairline() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="h-px w-full bg-foreground/[0.06]" />
    </div>
  )
}

/* ── Testimonial card ─────────────────────────────────────── */

const accentMap: Record<NonNullable<Testimonial["accent"]>, string> = {
  purple:
    "from-primary/[0.06] via-transparent to-transparent group-hover:from-primary/[0.14]",
  fuchsia:
    "from-fuchsia-500/[0.06] via-transparent to-transparent group-hover:from-fuchsia-500/[0.12]",
  amber:
    "from-amber-500/[0.05] via-transparent to-transparent group-hover:from-amber-500/[0.12]",
  emerald:
    "from-emerald-500/[0.05] via-transparent to-transparent group-hover:from-emerald-500/[0.12]",
  cyan:
    "from-cyan-500/[0.05] via-transparent to-transparent group-hover:from-cyan-500/[0.12]",
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  // 12-col bento layout: alternate emphasis to vary card sizes nicely.
  // Pattern: 7 / 5  |  5 / 7  |  6 / 6
  const spans = [
    "md:col-span-12",
    "md:col-span-7",
    "md:col-span-5",
    "md:col-span-5",
    "md:col-span-7",
    "md:col-span-6",
    "md:col-span-6",
  ]

  // Featured-ish cards (7-col) get bigger typography
  const isWide = spans[index]?.includes("col-span-7")

  return (
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border border-foreground/[0.06] bg-foreground/[0.015] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/[0.12] hover:bg-foreground/[0.025] md:p-9",
        spans[index],
      )}
    >
      {/* Accent gradient wash */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br transition-opacity duration-500",
          accentMap[testimonial.accent ?? "purple"],
        )}
      />
      {/* Top hairline accent on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:inset-x-9"
      />

      <div className="flex h-full flex-col">
        {/* Quote mark */}
        <Quote
          className="h-7 w-7 shrink-0 text-primary/70"
          strokeWidth={1.25}
        />

        {/* Quote text */}
        <blockquote
          className={cn(
            "mt-5 text-balance font-medium leading-[1.45] tracking-[-0.005em] text-foreground/90",
            isWide
              ? "text-lg md:text-xl lg:text-[22px]"
              : "text-base md:text-[17px]",
          )}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="mt-auto flex items-center gap-3 pt-7">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10 transition-all duration-300 group-hover:ring-foreground/25">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              sizes="40px"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {testimonial.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {testimonial.role && `${testimonial.role} · `}
              {testimonial.company}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-0.5 text-amber-400/85">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-2.5 w-2.5 fill-amber-400/85" />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
