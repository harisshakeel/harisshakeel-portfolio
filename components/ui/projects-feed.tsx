"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { TransitionLink } from "@/components/ui/transition-link"

export interface Project {
  slug: string
  title: string
  category: string
  description: string
  technologies: string[]
  logo: string
  url?: string
  /** Broader filter tag, e.g. SaaS / Web App / Marketing */
  tag: string
}

interface ProjectsFeedProps {
  projects: Project[]
  tags?: string[]
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]
const ALL = "Featured"

export function ProjectsFeed({ projects, tags }: ProjectsFeedProps) {
  const tabs = useMemo(() => {
    if (tags?.length) return [ALL, ...tags]
    const unique = Array.from(new Set(projects.map((p) => p.tag)))
    return [ALL, ...unique]
  }, [projects, tags])

  const [active, setActive] = useState(ALL)

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.tag === active)),
    [projects, active],
  )

  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-32 md:px-10">
      {/* Category filter row */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-foreground/[0.07] md:mb-16"
        aria-label="Filter projects"
      >
        {tabs.map((tab) => {
          const isActive = active === tab
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "relative pb-4 text-base font-medium transition-colors md:text-lg",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="projects-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-primary"
                  transition={{ duration: 0.4, ease: easeOut }}
                />
              )}
            </button>
          )
        })}
      </motion.nav>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}

      {/* Uniform 2-column grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

/* ── Standard card (image-on-top text-below) ────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: Math.min(index * 0.06, 0.24) }}
    >
      <TransitionLink href={`/projects/${project.slug}`} className="group block">
        <HeroBlock project={project} />

        <div className="mt-6">
          <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary ring-1 ring-inset ring-primary/20">
            {project.category}
          </span>
          <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors group-hover:text-foreground md:text-[28px] md:leading-[1.2]">
            {project.title}
          </h2>
          <p className="mt-3 line-clamp-2 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-primary">
            <span className="border-b border-foreground/15 pb-0.5 transition-colors group-hover:border-primary">
              Read case study
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </TransitionLink>
    </motion.article>
  )
}

/* ── Hero block (logo centered on tinted gradient) ─────────── */

function HeroBlock({
  project,
  className,
  featured,
}: {
  project: Project
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-foreground/[0.06] bg-gradient-to-br from-foreground/[0.04] via-primary/[0.04] to-foreground/[0.02]",
        featured ? "aspect-[16/10] md:aspect-auto md:min-h-[420px]" : "aspect-[16/10] rounded-2xl",
        className,
      )}
    >
      {/* Radial purple glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(168,85,247,0.18),transparent_70%)]"
      />
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Logo */}
      <div className="relative flex h-full w-full items-center justify-center p-10">
        <div
          style={{ viewTransitionName: `project-${project.slug}-chip` }}
          className={cn(
            "relative flex items-center justify-center rounded-2xl border border-foreground/[0.08] bg-foreground/[0.04] backdrop-blur-sm transition-transform duration-700 group-hover:scale-[1.04]",
            featured ? "h-28 w-28 md:h-36 md:w-36" : "h-20 w-20 md:h-24 md:w-24",
          )}
        >
          <Image
            src={project.logo}
            alt={`${project.title} logo`}
            width={144}
            height={144}
            className={cn(
              "object-contain p-3",
              featured ? "h-24 w-24 md:h-28 md:w-28" : "h-16 w-16 md:h-20 md:w-20",
            )}
          />
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent"
      />
    </div>
  )
}
