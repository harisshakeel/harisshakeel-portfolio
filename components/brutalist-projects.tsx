"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { gsap } from "gsap"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PALETTE } from "@/lib/palette"
import { ModelViewer } from "@/components/ui/model-viewer"

const EASE = [0.22, 1, 0.36, 1] as const

interface Project {
  slug: string
  name: string
  description: string
  href?: string
  tags: string[]
  shot: string
  shotLight?: string
  model?: string
  contain?: boolean
  /** Show the brand logo on this background in the hover preview instead of `shot`. */
  hoverLogo?: { src: string; bg: string }
  niche: string
}

const projects: Project[] = [
  {
    slug: "xision",
    name: "Xision",
    niche: "Computer Vision & 3D Simulation",
    description:
      "An AI virtual try-on platform that turns a single phone scan into a measurement-accurate 3D body model, then physically simulates how real garments drape on it, returning a fit score, size recommendation, and pressure map instead of a guess.",
    tags: ["Computer Vision", "3D / Simulation", "Python", "FastAPI"],
    shot: "/images/product-ui.jpeg",
    contain: true,
    // Wordmark captured from xision.ai (it's live type there, not an image file).
    hoverLogo: { src: "/images/projects/xision-logo.png", bg: "#0B0A0C" },
  },
  {
    slug: "mavis",
    name: "MAVIS",
    niche: "Agentic AI & Multi-Tenant SaaS",
    description:
      "A multi-tenant platform where Claude Code agents run real client work end-to-end: spawned per VA on isolated workers, tool-connected through MCP servers and 3,000+ OAuth apps, with humans holding the approval loop.",
    tags: ["Agentic AI", "Multi-Tenant SaaS", "MCP", "Next.js"],
    shot: "/images/projects/mavis-architecture.svg",
    contain: true,
    hoverLogo: { src: "/images/projects/mavis-logo.png", bg: "#F4F6FB" },
  },
  {
    slug: "metamorphix",
    name: "Metamorphix",
    niche: "AI Automation & Multi-Agent",
    description:
      "A Claude-powered AI pipeline that researches B2B prospects end-to-end with automated web scraping, LLM enrichment, and fit scoring, then provisions personalized, CRM-ready outreach into Zoho.",
    tags: ["AI Automation", "Multi-Agent", "Python", "Zoho CRM"],
    shot: "/images/projects/metamorphix.png",
    contain: true,
  },
  {
    slug: "sentinel",
    name: "Sentinel",
    niche: "Real-time Computer Vision",
    description:
      "A real-time CCTV anomaly detection system that runs three trained YOLOv8 models over live RTSP feeds (accident, vandalism, and weapon) and pushes an annotated frame to the operator's phone the moment something fires.",
    tags: ["Computer Vision", "YOLOv8", "Real-time", "Flutter"],
    shot: "/images/projects/sentinel-pipeline.svg",
    contain: true,
  },
  {
    slug: "clusterden",
    name: "Clusterden",
    niche: "Full-Stack CRM Platform",
    description:
      "A MERN-stack CRM workspace featuring advanced Role-Based Access Control and automated WhatsApp integrations, with real-time collaboration over Socket.io.",
    href: "https://www.clusterden.com",
    tags: ["Full-Stack", "CRM", "RBAC", "Integrations"],
    shot: "/images/projects/clusterden/screen-1.jpeg",
    hoverLogo: { src: "/images/projects/clusterden.svg", bg: "#0E1A14" },
  },
  {
    slug: "payback",
    name: "Payback",
    niche: "Loyalty & Payments Platform",
    description:
      "A full-stack loyalty rewards platform with a type-safe React frontend, secure Node.js backend, and real-time points tracking.",
    href: "https://demo.payback.pk",
    tags: ["Frontend", "Backend", "Loyalty", "Real-time"],
    shot: "/images/projects/payback/screen-1.jpeg",
    hoverLogo: { src: "/images/projects/payback.png", bg: "#1C170C" },
  },
]

/** Secondary projects shown as a compact grid below the main list. */
const secondaryProjects: Project[] = [
  {
    slug: "meddo",
    name: "Meddo",
    niche: "Healthcare SaaS",
    description:
      "A US medical management platform with conversion-focused service pages and a clean, trustworthy UI over a secure backend.",
    href: "https://med-do.vercel.app/",
    tags: ["Healthcare", "SaaS", "Service Pages"],
    shot: "/images/projects/meddo.png",
  },
  {
    slug: "comuni",
    name: "Comuni",
    niche: "Events & Marketing",
    description:
      "A Canadian event-planning app with polished marketing pages, interactive maps, and offer-page design for local discovery.",
    href: "https://comuni-delta.vercel.app/",
    tags: ["Web App", "Events", "Marketing"],
    shot: "/images/projects/comuni/screen-1.png",
  },
  {
    slug: "green-n-solar",
    name: "Green N Solar",
    niche: "Solar & Lead Generation",
    description:
      "A solar company website with service pages, trust-building sections, and lead-capture forms engineered to convert.",
    href: "https://greennsolar.com",
    tags: ["Landing Page", "Lead Gen", "Solar"],
    shot: "/images/projects/green-n-solar/screen-1.png",
  },
  {
    slug: "dynasty",
    name: "Dynasty",
    niche: "B2B Marketing",
    description:
      "A B2B marketing site for a UAE-based petroleum trading firm with service showcases, partner highlights, and quote-request flows.",
    href: "https://dynastyfm.com/",
    tags: ["B2B", "Marketing Site", "Lead Gen"],
    shot: "/images/projects/dynasty/screen-1.jpeg",
  },
  {
    slug: "613-guys",
    name: "613 Guys",
    niche: "Home Care & Bookings",
    description:
      "Landing pages for a Canadian home-care brand, optimized for bookings and inquiries with a streamlined contact funnel.",
    href: "https://613-guys.vercel.app/",
    tags: ["Landing Pages", "Home Care", "Bookings"],
    shot: "/images/projects/613-guys/613guys.jpeg",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
}

const scaleUp: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
}

const MODAL_HEIGHT = 350

/** Work surface: deep olive, a step lighter and greener than the obsidian footer below. */
const WORK_BG = "#151B13"
/** Raised card surface for the client-build grid. */
const CARD_BG = "#1D241A"

/**
 * Editorial project thumbnail list — hover over a project name to reveal
 * its unique screenshot in a floating modal that follows the cursor — then
 * a bento grid of client builds.
 *
 * Dark olive section with ivory type and chartreuse accents, so the work
 * reads as the most vivid band on the page rather than a grey-beige pause.
 */
export function BrutalistProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const [modal, setModal] = useState({ active: false, index: 0 })

  // gsap.quickTo gives the preview and the "View" label their own easing, so
  // they glide after the pointer (the label a touch quicker than the image)
  // rather than snapping to it.
  const moveModalX = useRef<gsap.QuickToFunc | null>(null)
  const moveModalY = useRef<gsap.QuickToFunc | null>(null)
  const moveCursorX = useRef<gsap.QuickToFunc | null>(null)
  const moveCursorY = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([modalRef.current, cursorRef.current], {
        left: window.innerWidth / 2,
        top: window.innerHeight / 2,
      })
      moveModalX.current = gsap.quickTo(modalRef.current, "left", { duration: 0.8, ease: "power3" })
      moveModalY.current = gsap.quickTo(modalRef.current, "top", { duration: 0.8, ease: "power3" })
      moveCursorX.current = gsap.quickTo(cursorRef.current, "left", { duration: 0.45, ease: "power3" })
      moveCursorY.current = gsap.quickTo(cursorRef.current, "top", { duration: 0.45, ease: "power3" })
    })
    return () => ctx.revert()
  }, [])

  const moveItems = (x: number, y: number) => {
    moveModalX.current?.(x)
    moveModalY.current?.(y)
    moveCursorX.current?.(x)
    moveCursorY.current?.(y)
  }

  return (
    <section
      id="work"
      className="relative w-full scroll-mt-24 overflow-hidden border-b px-6 py-24 md:px-10 md:py-36"
      style={{ backgroundColor: WORK_BG, color: PALETTE.ivory, borderColor: `${PALETTE.ivory}14` }}
    >
      {/* Soft chartreuse wash behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background: `radial-gradient(60% 70% at 20% 0%, ${PALETTE.chartreuse}1f 0%, transparent 70%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: PALETTE.chartreuse }}
          >
            (Selected Work)
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="overflow-hidden font-display uppercase leading-[0.85] tracking-[-0.01em]"
            style={{ color: PALETTE.ivory }}
          >
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[16vw] md:text-[12vw] lg:text-[11rem]"
            >
              Projects
            </motion.span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: PALETTE.sage }}
          >
            From computer-vision pipelines and multi-tenant agent platforms to
            full-stack client builds, every project here shipped and solved a real problem.
          </motion.p>
        </div>

        {/* Editorial hover-thumbnail list */}
        <div
          ref={containerRef}
          className="relative"
          onPointerMove={({ clientX, clientY }) => moveItems(clientX, clientY)}
        >
          <ul className="group">
            {projects.map((project, index) => (
              <li
                key={project.slug}
                className="transition-all relative last-of-type:border-b hover:!opacity-100 group-hover:opacity-40"
                style={{
                  borderTop: `1px solid ${PALETTE.ivory}1a`,
                  borderBottomColor: `${PALETTE.ivory}1a`,
                  paddingInline: "calc(clamp(1em,3vw,4em) * 2)",
                  paddingBlock: "clamp(1em,3vw,4em)",
                }}
                onPointerEnter={() => setModal({ active: true, index })}
                onPointerLeave={() => setModal({ ...modal, active: false })}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor
                  className="absolute inset-0 z-0"
                  aria-label={`View ${project.name} details`}
                />
                <div
                  className="flex items-center justify-between max-lg:flex-wrap max-lg:gap-3 relative z-10 pointer-events-none"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className="font-mono text-xs tabular-nums md:text-sm"
                      style={{ color: PALETTE.chartreuse }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-display uppercase leading-none tracking-tight"
                      style={{
                        fontSize: "calc(clamp(3.25em, 7vw, 8em) * 0.75)",
                        color: PALETTE.ivory,
                      }}
                    >
                      {project.name}
                    </h3>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name} live`}
                        data-cursor
                        className="pointer-events-auto relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F3EC]/10 text-[#F5F3EC]/70 transition-all duration-300 hover:scale-110 hover:bg-[#C7F36B] hover:text-[#161A15]"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p
                    className="text-base font-medium md:text-lg"
                    style={{ color: PALETTE.sage }}
                  >
                    {project.niche}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Floating image modal — each project gets its own image */}
          <motion.div
            ref={modalRef}
            variants={scaleUp}
            initial="initial"
            animate={modal.active ? "open" : "closed"}
            className="pointer-events-none fixed z-30 overflow-hidden rounded-2xl shadow-2xl"
            style={{ height: MODAL_HEIGHT, width: 400 }}
          >
            <div
              className="relative w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                height: projects.length * MODAL_HEIGHT,
                top: modal.index * -MODAL_HEIGHT,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="relative w-full"
                  style={{
                    height: MODAL_HEIGHT,
                    backgroundColor:
                      project.hoverLogo?.bg ??
                      (project.contain ? PALETTE.smokedOlive : PALETTE.forestCharcoal),
                  }}
                >
                  {project.model ? (
                    <div className="absolute inset-0 z-10">
                      <ModelViewer
                        src={project.model}
                        alt={`${project.name} preview`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : project.hoverLogo ? (
                    <Image
                      src={project.hoverLogo.src}
                      alt={`${project.name} logo`}
                      fill
                      sizes="400px"
                      className="object-contain p-20"
                    />
                  ) : (
                    <Image
                      src={project.shotLight || project.shot}
                      alt={`${project.name} preview`}
                      fill
                      sizes="400px"
                      className={cn(
                        "object-cover",
                        project.contain && "object-contain p-8"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating cursor label */}
          <motion.div
            ref={cursorRef}
            variants={scaleUp}
            initial="initial"
            animate={modal.active ? "open" : "closed"}
            className="pointer-events-none fixed z-30 flex h-20 w-20 items-center justify-center rounded-full text-sm font-semibold"
            style={{ backgroundColor: PALETTE.chartreuse, color: PALETTE.obsidian }}
          >
            View
          </motion.div>
        </div>

        {/* Client builds — bento grid: one wide card, then the rest, with no orphan gaps at 2 or 3 columns */}
        <div className="mt-24 border-t pt-16 md:mt-32" style={{ borderColor: `${PALETTE.ivory}1a` }}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              <p
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]"
                style={{ color: PALETTE.chartreuse }}
              >
                (More work)
              </p>
              <h3
                className="font-display text-4xl uppercase leading-none tracking-tight md:text-6xl"
                style={{ color: PALETTE.ivory }}
              >
                Client builds
              </h3>
            </motion.div>
            <motion.p
              variants={fadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="max-w-sm text-[15px] leading-relaxed"
              style={{ color: PALETTE.sage }}
            >
              Sites, SaaS products, and booking funnels shipped for clients across
              the US, Canada, the UAE, and Pakistan.
            </motion.p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => {
              const featured = i === 0
              return (
                <motion.article
                  key={project.slug}
                  variants={fadeUp}
                  custom={i * 0.06}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-8%" }}
                  className={cn(
                    "group flex flex-col overflow-hidden rounded-2xl border border-[#F5F3EC]/10 transition-colors duration-500 hover:border-[#C7F36B]/45",
                    featured && "md:col-span-2"
                  )}
                  style={{ backgroundColor: CARD_BG }}
                >
                  {/* Thumbnail — muted until hovered on desktop so five different brand palettes don't compete */}
                  <Link href={`/projects/${project.slug}`} data-cursor className="block overflow-hidden">
                    <div className={cn("relative aspect-[16/10] w-full", featured && "lg:aspect-[32/10]")}>
                      <Image
                        src={project.shot}
                        alt={`${project.name} screenshot`}
                        fill
                        sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                        className="object-cover object-top transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.03] md:brightness-[.8] md:saturate-[.55] md:group-hover:brightness-100 md:group-hover:saturate-100"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                        style={{ background: `linear-gradient(to top, ${CARD_BG}, transparent)` }}
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium" style={{ color: PALETTE.chartreuse }}>
                          {project.niche}
                        </p>
                        <Link href={`/projects/${project.slug}`} data-cursor>
                          <h4
                            className="mt-2 font-display text-3xl uppercase leading-none tracking-tight"
                            style={{ color: PALETTE.ivory }}
                          >
                            {project.name}
                          </h4>
                        </Link>
                      </div>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.name}`}
                          data-cursor
                          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#F5F3EC]/20 text-[#F5F3EC] transition-colors duration-300 hover:border-[#C7F36B] hover:bg-[#C7F36B] hover:text-[#161A15]"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#C9CEC3" }}>
                      {project.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${project.name} focus areas`}>
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full px-3 py-1 text-[13px]"
                          style={{ backgroundColor: `${PALETTE.ivory}0f`, color: "#E4E7DF" }}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
