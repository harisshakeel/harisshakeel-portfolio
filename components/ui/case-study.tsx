"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { TransitionLink } from "@/components/ui/transition-link"

export interface CaseStudyData {
  /** Slug used to drive the shared-element view transition from the listing */
  slug: string
  client: string
  logo: string
  category: string

  /** Optional metadata fields (shown in the meta grid) */
  industry?: string
  founded?: string
  partnership?: string
  website?: { url: string; label: string }

  /** Editorial headline, e.g. "How X built Y at scale." */
  headline: string
  /** Short lead paragraph below the headline */
  summary: string

  sections: Array<{
    heading: string
    body?: string
    bullets?: string[]
  }>

  /** Optional pull quote */
  quote?: {
    text: string
    author: string
    role: string
  }

  /** Technologies as chips */
  technologies: string[]

  /** Outbound link to the live project */
  liveUrl?: string
  liveLabel?: string
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function CaseStudy({ data }: { data: CaseStudyData }) {
  return (
    <article className="relative">
      {/* Soft ambient purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-32 pt-12 md:pt-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <TransitionLink
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to home
          </TransitionLink>
        </motion.div>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.05 }}
          className="mt-12 md:mt-16"
        >
          <div
            style={{ viewTransitionName: `project-${data.slug}-chip` }}
            className="flex h-28 w-28 items-center justify-center rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] backdrop-blur-sm md:h-32 md:w-32"
          >
            <Image
              src={data.logo}
              alt={`${data.client} logo`}
              width={128}
              height={128}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
            />
          </div>

          <span className="mt-8 inline-flex w-fit items-center rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary ring-1 ring-inset ring-primary/20">
            {data.category}
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-foreground md:text-5xl lg:text-[56px]">
            {data.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {data.summary}
          </p>
        </motion.header>

        {/* Meta grid */}
        {(data.industry || data.founded || data.partnership || data.website) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-foreground/[0.07] py-8 md:mt-20 md:grid-cols-4"
          >
            {data.industry && <MetaItem label="Industry" value={data.industry} />}
            {data.founded && <MetaItem label="Founded" value={data.founded} />}
            {data.partnership && <MetaItem label="Partnership" value={data.partnership} />}
            {data.website && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Website
                </span>
                <a
                  href={data.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {data.website.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </motion.div>
        )}

        {/* Body sections */}
        <div className="mt-16 flex flex-col gap-14 md:mt-20">
          {data.sections.map((section, i) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: easeOut, delay: Math.min(i * 0.05, 0.2) }}
            >
              <h2 className="text-2xl font-semibold tracking-[-0.015em] text-foreground md:text-3xl">
                {section.heading}
              </h2>
              {section.body && (
                <p className="mt-5 text-base leading-[1.75] text-muted-foreground md:text-lg">
                  {section.body}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 flex flex-col gap-3">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Pull quote */}
        {data.quote && (
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="my-16 border-l-2 border-primary/60 pl-6 md:my-20 md:pl-8"
          >
            <blockquote className="text-2xl font-medium leading-snug tracking-[-0.01em] text-foreground md:text-3xl">
              <span className="text-primary">&ldquo;</span>
              {data.quote.text}
              <span className="text-primary">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary ring-1 ring-primary/20">
                {data.quote.author
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {data.quote.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {data.quote.role}
                </span>
              </div>
            </figcaption>
          </motion.figure>
        )}

        {/* Tech stack */}
        {data.technologies.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mt-16 border-t border-foreground/[0.07] pt-10 md:mt-20"
          >
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Tech stack
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3.5 py-1.5 text-xs font-medium text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Closing — link back to live site only (no internal cross-links) */}
        {data.liveUrl && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-20 flex border-t border-foreground/[0.07] pt-10 md:mt-28"
          >
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/[0.03] px-5 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06]"
            >
              {data.liveLabel ?? "View live site"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.section>
        )}
      </div>
    </article>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
