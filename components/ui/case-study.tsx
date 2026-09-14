"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { TransitionLink } from "@/components/ui/transition-link"
import { ModelViewer } from "@/components/ui/model-viewer"
import { PALETTE } from "@/lib/palette"

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

  /** Optional interactive 3D model (.glb) shown between the meta grid and body */
  model?: {
    src: string
    alt: string
    caption?: string
  }

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
    <article className="relative" style={{ backgroundColor: PALETTE.obsidian, color: PALETTE.ivory }}>
      {/* Soft ambient chartreuse glow — matches the hero/nav accent, not the old purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ backgroundColor: `${PALETTE.chartreuse}14` }}
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
            className="font-hero-sub group inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: PALETTE.sage }}
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
            style={{ viewTransitionName: `project-${data.slug}-chip`, borderColor: PALETTE.borderIvory, backgroundColor: `${PALETTE.ivory}0a` }}
            className="flex h-28 w-28 items-center justify-center rounded-2xl border backdrop-blur-sm md:h-32 md:w-32"
          >
            <Image
              src={data.logo}
              alt={`${data.client} logo`}
              width={128}
              height={128}
              className="h-16 w-16 object-contain md:h-20 md:w-20"
            />
          </div>

          <span
            className="font-hero-sub mt-8 inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset"
            style={{
              backgroundColor: `${PALETTE.chartreuse}26`,
              color: PALETTE.chartreuse,
              boxShadow: `inset 0 0 0 1px ${PALETTE.chartreuse}33`,
            }}
          >
            {data.category}
          </span>

          <h1
            className="font-hero-display mt-5 text-4xl uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
            style={{ color: PALETTE.ivory }}
          >
            {data.headline}
          </h1>
          <p className="font-hero-sub mt-6 text-lg leading-relaxed md:text-xl" style={{ color: PALETTE.sage }}>
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
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-y py-8 md:mt-20 md:grid-cols-4"
            style={{ borderColor: PALETTE.borderIvory }}
          >
            {data.industry && <MetaItem label="Industry" value={data.industry} />}
            {data.founded && <MetaItem label="Founded" value={data.founded} />}
            {data.partnership && <MetaItem label="Partnership" value={data.partnership} />}
            {data.website && (
              <div className="flex flex-col gap-1.5">
                <span
                  className="font-hero-sub text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: PALETTE.sage }}
                >
                  Website
                </span>
                <a
                  href={data.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="font-hero-sub group inline-flex w-fit items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: PALETTE.ivory }}
                >
                  {data.website.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            )}
          </motion.div>
        )}

        {/* 3D model */}
        {data.model && (
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="mt-14 md:mt-20"
          >
            <div
              className="relative overflow-hidden rounded-2xl border"
              style={{ borderColor: PALETTE.borderIvory, backgroundColor: `${PALETTE.ivory}08` }}
            >
              <ModelViewer
                src={data.model.src}
                alt={data.model.alt}
                className="h-[440px] w-full md:h-[560px]"
              />
              <span
                className="font-hero-sub pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm"
                style={{ borderColor: PALETTE.borderIvory, backgroundColor: `${PALETTE.obsidian}b3`, color: PALETTE.sage }}
              >
                Drag to rotate
              </span>
            </div>
            {data.model.caption && (
              <figcaption className="font-hero-sub mt-4 text-sm leading-relaxed" style={{ color: PALETTE.sage }}>
                {data.model.caption}
              </figcaption>
            )}
          </motion.figure>
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
              <h2 className="font-hero-display text-2xl uppercase tracking-tight md:text-3xl" style={{ color: PALETTE.ivory }}>
                {section.heading}
              </h2>
              {section.body && (
                <p className="font-hero-sub mt-5 text-base leading-[1.75] md:text-lg" style={{ color: PALETTE.sage }}>
                  {section.body}
                </p>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="mt-5 flex flex-col gap-3">
                  {section.bullets.map((b) => (
                    <li
                      key={b}
                      className="font-hero-sub flex items-start gap-3 text-base leading-relaxed md:text-lg"
                      style={{ color: PALETTE.sage }}
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: PALETTE.chartreuse }}
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
            className="my-16 border-l-2 pl-6 md:my-20 md:pl-8"
            style={{ borderColor: `${PALETTE.chartreuse}99` }}
          >
            <blockquote
              className="font-hero-display text-2xl leading-snug tracking-tight md:text-3xl"
              style={{ color: PALETTE.ivory }}
            >
              <span style={{ color: PALETTE.chartreuse }}>&ldquo;</span>
              {data.quote.text}
              <span style={{ color: PALETTE.chartreuse }}>&rdquo;</span>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="font-hero-sub flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ring-1"
                style={{ backgroundColor: `${PALETTE.chartreuse}26`, color: PALETTE.chartreuse, boxShadow: `inset 0 0 0 1px ${PALETTE.chartreuse}33` }}
              >
                {data.quote.author
                  .split(" ")
                  .map((s) => s[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
              <div className="flex flex-col">
                <span className="font-hero-sub text-sm font-medium" style={{ color: PALETTE.ivory }}>
                  {data.quote.author}
                </span>
                <span className="font-hero-sub text-xs" style={{ color: PALETTE.sage }}>
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
            className="mt-16 border-t pt-10 md:mt-20"
            style={{ borderColor: PALETTE.borderIvory }}
          >
            <h3 className="font-hero-sub text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: PALETTE.sage }}>
              Tech stack
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-hero-sub rounded-full border px-3.5 py-1.5 text-xs font-medium"
                  style={{ borderColor: PALETTE.borderIvory, backgroundColor: `${PALETTE.ivory}08`, color: `${PALETTE.ivory}cc` }}
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
            className="mt-20 flex border-t pt-10 md:mt-28"
            style={{ borderColor: PALETTE.borderIvory }}
          >
            <a
              href={data.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="font-hero-sub inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: PALETTE.chartreuse, color: PALETTE.obsidian }}
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
      <span className="font-hero-sub text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: PALETTE.sage }}>
        {label}
      </span>
      <span className="font-hero-sub text-sm font-medium" style={{ color: PALETTE.ivory }}>{value}</span>
    </div>
  )
}
