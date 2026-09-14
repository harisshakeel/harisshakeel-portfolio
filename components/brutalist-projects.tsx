"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
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
    model: "/models/xision.glb",
    contain: true,
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

/**
 * Editorial project thumbnail list — hover over a project name to reveal
 * its unique screenshot in a floating modal that follows the cursor.
 *
 * Uses the Haris dark olive palette — stone beige background, obsidian text.
 */
export function BrutalistProjects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const [modal, setModal] = useState({ active: false, index: 0 })

  const moveItems = (x: number, y: number) => {
    if (modalRef.current) {
      modalRef.current.style.left = `${x}px`
      modalRef.current.style.top = `${y}px`
    }
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`
      cursorRef.current.style.top = `${y}px`
    }
  }

  return (
    <section
      id="work"
      className="relative w-full scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
      style={{ backgroundColor: PALETTE.stoneBeige, color: PALETTE.inkOlive }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: PALETTE.warmGrey }}
          >
            (Selected Work)
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="overflow-hidden font-display uppercase leading-[0.85] tracking-[-0.01em]"
            style={{ color: PALETTE.inkOlive }}
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
            style={{ color: PALETTE.warmGrey }}
          >
            From full-stack platforms and AI systems to high-converting funnels,
            every build here solves a real-world problem with speed and craft.
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
                className="transition-all relative last-of-type:border-b hover:!opacity-100 group-hover:opacity-50"
                style={{
                  borderTop: `1px solid ${PALETTE.inkOlive}1a`,
                  borderBottomColor: `${PALETTE.inkOlive}1a`,
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
                  <div className="flex items-center gap-4">
                    <h3
                      className="font-display uppercase leading-none tracking-tight"
                      style={{
                        fontSize: "calc(clamp(3.25em, 7vw, 8em) * 0.75)",
                        color: PALETTE.inkOlive,
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
                        className="pointer-events-auto relative z-20 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                        style={{
                          backgroundColor: `${PALETTE.inkOlive}15`,
                          color: PALETTE.warmGrey,
                        }}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <p
                    className="text-base font-medium md:text-lg"
                    style={{ color: PALETTE.warmGrey }}
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
                    backgroundColor: project.contain
                      ? PALETTE.smokedOlive
                      : PALETTE.forestCharcoal,
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

        {/* Secondary projects — compact card grid */}
        <div
          className="mt-20 border-t pt-16"
          style={{ borderColor: `${PALETTE.inkOlive}1a` }}
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{ color: PALETTE.warmGrey }}
          >
            (More work)
          </motion.p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <motion.article
                key={project.slug}
                variants={fadeUp}
                custom={i * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-8%" }}
                className="group overflow-hidden rounded-2xl border transition-colors duration-500"
                style={{
                  borderColor: `${PALETTE.inkOlive}15`,
                  backgroundColor: PALETTE.warmIvory,
                }}
              >
                {/* Thumbnail */}
                <Link href={`/projects/${project.slug}`} data-cursor>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.shot}
                      alt={`${project.name} screenshot`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/projects/${project.slug}`} data-cursor>
                      <h3
                        className="font-display text-2xl uppercase leading-none tracking-tight"
                        style={{ color: PALETTE.inkOlive }}
                      >
                        {project.name}
                      </h3>
                    </Link>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                        data-cursor
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
                        style={{
                          backgroundColor: PALETTE.obsidian,
                          color: PALETTE.ivory,
                        }}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: PALETTE.warmGrey }}
                  >
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: `${PALETTE.warmGrey}99` }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
