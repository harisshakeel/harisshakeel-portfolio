"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

interface Project {
  id: string
  /** Internal case-study route slug, i.e. /projects/<slug>. */
  slug: string
  name: string
  description: string
  /** Live site URL. Omit if the project has no public link. */
  href?: string
  tags: string[]
  location: string
  /** Brand color used as the row background when expanded (any valid CSS color) */
  color: string
  /** Text color used over the brand color */
  textColor: string
  /** Up to 3 screenshots shown when the row expands */
  screens?: string[]
  /** Brand logo shown (contained) when no screenshots exist */
  logo?: string
}

const projects: Project[] = [
  {
    id: "clusterden",
    slug: "clusterden",
    name: "Clusterden",
    description:
      "A MERN-stack CRM workspace featuring advanced Role-Based Access Control and automated WhatsApp integrations.",
    href: "https://www.clusterden.com",
    tags: ["WEB DESIGN", "FULL-STACK", "CRM", "INTEGRATIONS"],
    location: "PAKISTAN",
    color: "#1F6FEB",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/clusterden/screen-1.jpeg",
      "/images/projects/clusterden/screen-2.jpeg",
      "/images/projects/clusterden/screen-3.jpeg",
    ],
  },
  {
    id: "payback",
    slug: "payback",
    name: "Payback",
    description:
      "A full-stack loyalty rewards platform with a type-safe React frontend, secure Node.js backend, and real-time tracking.",
    href: "https://demo.payback.pk",
    tags: ["WEB DESIGN", "FRONTEND", "BACKEND", "LOYALTY"],
    location: "PAKISTAN",
    color: "#0EA5A4",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/payback/screen-1.jpeg",
      "/images/projects/payback/screen-2.jpeg",
      "/images/projects/payback/screen-3.jpeg",
    ],
  },
  {
    id: "destiny",
    slug: "destiny",
    name: "Destiny.pk",
    description:
      "An online jewelry store for Designer's Destiny, AD silver necklace sets, bangles, earrings, and rings with a fast product catalog, cart, wishlist, and WhatsApp ordering.",
    href: "https://destiny.pk",
    tags: ["ECOMMERCE", "SHOPIFY", "JEWELRY STORE", "PRODUCT", "STOREFRONT", "CRO"],
    location: "PAKISTAN",
    color: "#9D174D",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/destiny/screen-1.png",
      "/images/projects/destiny/screen-2.png",
      "/images/projects/destiny/screen-3.png",
    ],
  },
  {
    id: "dynasty",
    slug: "dynasty",
    name: "Dynasty",
    description:
      "A B2B marketing site for a UAE-based petroleum trading firm with service showcases and quote request flows.",
    href: "https://dynastyfm.com/",
    tags: ["WEB DESIGN", "B2B", "MARKETING SITE", "LEAD GEN"],
    location: "UAE",
    color: "#B45309",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/dynasty/screen-1.jpeg",
      "/images/projects/dynasty/screen-2.jpeg",
      "/images/projects/dynasty/screen-3.jpeg",
    ],
  },
  {
    id: "greennsolar",
    slug: "green-n-solar",
    name: "Green N Solar",
    description:
      "A solar company website with service pages, trust-building sections, and lead-capture forms designed to convert.",
    href: "https://greennsolar.com",
    tags: ["WEB DESIGN", "LANDING PAGE", "LEAD GEN", "SOLAR"],
    location: "PAKISTAN",
    color: "#16A34A",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/green-n-solar/screen-1.png",
      "/images/projects/green-n-solar/screen-2.png",
      "/images/projects/green-n-solar/screen-3.png",
    ],

  },
  {
    id: "meddo",
    slug: "meddo",
    name: "Meddo",
    description:
      "A US medical management platform with conversion-focused service pages and a clean, trustworthy UI.",
    href: "https://med-do.vercel.app/",
    tags: ["WEB DESIGN", "HEALTHCARE", "SERVICE PAGES", "SAAS"],
    location: "USA",
    color: "#0891B2",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/meddo.png",
      "/images/projects/meddo/screen-2.png",
      "/images/projects/meddo/screen-3.png",
    ],
  },
  {
    id: "comuni",
    slug: "comuni",
    name: "Comuni",
    description:
      "A Canadian event-planning app with polished marketing pages and offer-page design.",
    href: "https://comuni-delta.vercel.app/",
    tags: ["WEB DESIGN", "EVENTS", "MARKETING", "OFFER PAGES"],
    location: "CANADA",
    color: "#7C3AED",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/comuni/screen-1.png",
      "/images/projects/comuni/screen-2.png",
      "/images/projects/comuni/screen-3.png",
    ],
  },
  {
    id: "613-guys",
    slug: "613-guys",
    name: "613 Guys",
    description:
      "Landing pages for a Canadian home-care brand, optimized for bookings and inquiries.",
    href: "https://613-guys.vercel.app/",
    tags: ["WEB DESIGN", "LANDING PAGES", "HOME CARE", "BOOKINGS"],
    location: "CANADA",
    color: "#1D4ED8",
    textColor: "#FFFFFF",
    screens: [
      "/images/projects/613-guys/613guys.jpeg",
      "/images/projects/613-guys/screen-2.png",
      "/images/projects/613-guys/screen-3.png",
    ],
  },
]

const DEFAULT_VISIBLE = 3

function ProjectRow({
  project,
  isExpanded,
  registerRef,
}: {
  project: Project
  isExpanded: boolean
  registerRef: (el: HTMLElement | null) => void
}) {
  const isExternal = !!project.href && project.href.startsWith("http")
  const screens = project.screens ?? []
  const count = screens.length
  const screenSpan =
    count === 1
      ? "md:col-span-8 md:col-start-3"
      : count === 2
        ? "md:col-span-6"
        : "md:col-span-4"

  return (
    <li
      className="group relative border-t border-foreground/[0.08] last:border-b"
      style={
        {
          ["--brand"]: project.color,
          ["--on-brand"]: project.textColor,
        } as React.CSSProperties
      }
    >
      {/* Brand color wash, full on expand, faint on hover, GPU-cheap */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out",
          isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-[0.05]",
        )}
        style={{ backgroundColor: "var(--brand)" }}
      />

      {/* Clickable header, navigates to the project's case-study subpage.
          The panel below still auto-expands on scroll to preview screenshots. */}
      <Link
        href={`/projects/${project.slug}`}
        ref={registerRef as (el: HTMLAnchorElement | null) => void}
        data-project-id={project.id}
        aria-label={`View ${project.name} case study`}
        className="relative block w-full cursor-pointer px-6 py-10 text-left md:px-10 md:py-14"
      >
        <div className="grid grid-cols-12 items-start gap-6 md:gap-10">
          {/* Left, name + expand indicator */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3">
              <h3
                className="text-3xl font-medium tracking-[-0.02em] text-foreground transition-colors duration-300 md:text-5xl"
                style={isExpanded ? { color: "var(--on-brand)" } : undefined}
              >
                {project.name}
              </h3>
              <ArrowUpRight
                className={cn(
                  "h-6 w-6 shrink-0 text-foreground/50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                )}
                style={isExpanded ? { color: "var(--on-brand)" } : undefined}
              />
            </div>
          </div>

          {/* Middle, description */}
          <div className="col-span-12 md:col-span-5">
            <p
              className={cn(
                "max-w-md text-base leading-relaxed md:text-lg",
                "transition-colors duration-300 ease-out",
                isExpanded ? "" : "text-foreground/65",
              )}
              style={isExpanded ? { color: "var(--on-brand)" } : undefined}
            >
              {project.description}
            </p>
          </div>

          {/* Right, tags */}
          <div className="col-span-12 md:col-span-3">
            <ul
              className={cn(
                "space-y-1 text-xs font-medium uppercase tracking-[0.16em] md:text-right",
                "transition-colors duration-300 ease-out",
                isExpanded ? "" : "text-foreground/65",
              )}
              style={isExpanded ? { color: "var(--on-brand)" } : undefined}
            >
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
      </Link>

      {/* Expanded panel, grid-template-rows trick (composited, no layout thrash) */}
      <div
        className={cn(
          "relative grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="px-6 pb-12 md:px-10 md:pb-16">
            {count > 0 ? (
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                {screens.slice(0, 3).map((src, i) => (
                  <div
                    key={`${project.id}-screen-${i}`}
                    className={cn(
                      "relative col-span-12 aspect-video overflow-hidden rounded-xl bg-black/20 ring-1 ring-foreground/15",
                      screenSpan,
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${project.name} screen ${i + 1}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            ) : project.logo ? (
              <div className="flex justify-center">
                <div className="relative aspect-[16/9] w-full max-w-xl overflow-hidden rounded-xl bg-white ring-1 ring-foreground/15">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    fill
                    sizes="(min-width: 768px) 36rem, 100vw"
                    className="object-contain p-10"
                  />
                </div>
              </div>
            ) : null}

            {isExternal && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-[6px] decoration-1"
                style={{ color: "var(--on-brand)" }}
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const rowRefs = useRef<Map<string, HTMLElement>>(new Map())

  const visible = showAll ? projects : projects.slice(0, DEFAULT_VISIBLE)
  const hiddenCount = projects.length - DEFAULT_VISIBLE

  // Expand whichever project reaches the vertical middle of the viewport, and
  // keep it open until the next project takes over, so it stays expanded across
  // a long scroll range instead of snapping shut on a small scroll.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Of the entries entering the center band, pick the one closest to the
        // exact viewport center and make it active. Never collapse on leave.
        const mid = window.innerHeight / 2
        let best: { id: string; dist: number } | null = null
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = (entry.target as HTMLElement).dataset.projectId
          if (!id) continue
          const r = entry.boundingClientRect
          const dist = Math.abs(r.top + r.height / 2 - mid)
          if (!best || dist < best.dist) best = { id, dist }
        }
        if (best) setActiveId(best.id)
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    )
    rowRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [showAll])

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    if (el) rowRefs.current.set(id, el)
    else rowRefs.current.delete(id)
  }

  return (
    <div>
      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center md:mb-16">
        <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
          Selected work
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
          Built for founders,
          <br />
          <span className="italic font-normal text-foreground/55">
            shipped to production.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-foreground/70 md:text-base">
          A look at the products, platforms, and AI workflows I&apos;ve built
          for clients across SaaS, ecommerce, and industry. As you scroll, the
          project in the middle previews automatically, tap any to open its
          case study.
        </p>
      </div>

      {/* Scroll-driven expand list, stays on the page */}
      <ul className="mx-auto max-w-[1400px]">
        {visible.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isExpanded={activeId === project.id}
            registerRef={registerRef(project.id)}
          />
        ))}
      </ul>

      {/* Show all / show less */}
      {hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/[0.12] bg-foreground/[0.03] px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
          >
            {showAll ? "Show less" : `Show all projects (${hiddenCount} more)`}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                showAll ? "rotate-180" : "",
              )}
            />
          </button>
        </div>
      )}
    </div>
  )
}
