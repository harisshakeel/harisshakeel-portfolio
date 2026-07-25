"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

interface Project {
  slug: string
  name: string
  description: string
  /** Live site URL. Omit for projects with no public site (e.g. automations). */
  href?: string
  tags: string[]
  shot: string
  /** Show the image contained on a navy panel (for logos) instead of cover. */
  contain?: boolean
}

const projects: Project[] = [
  {
    slug: "metamorphix",
    name: "Metamorphix",
    description:
      "A multi-agent AI pipeline that researches B2B prospects end-to-end — automated web scraping, LLM enrichment, and fit scoring — then provisions personalized, CRM-ready outreach into Zoho.",
    tags: ["AI Automation", "Multi-Agent", "Python", "Zoho CRM"],
    shot: "/images/projects/metamorphix.png",
    contain: true,
  },
  {
    slug: "clusterden",
    name: "Clusterden",
    description:
      "A MERN-stack CRM workspace featuring advanced Role-Based Access Control and automated WhatsApp integrations, with real-time collaboration over Socket.io.",
    href: "https://www.clusterden.com",
    tags: ["Full-Stack", "CRM", "RBAC", "Integrations"],
    shot: "/images/projects/clusterden/screen-1.jpeg",
  },
  {
    slug: "payback",
    name: "Payback",
    description:
      "A full-stack loyalty rewards platform with a type-safe React frontend, secure Node.js backend, and real-time points tracking.",
    href: "https://demo.payback.pk",
    tags: ["Frontend", "Backend", "Loyalty", "Real-time"],
    shot: "/images/projects/payback/screen-1.jpeg",
  },
  {
    slug: "destiny",
    name: "Destiny.pk",
    description:
      "An online jewelry store for Designer's Destiny — a fast product catalog, cart, wishlist, and WhatsApp ordering, tuned for conversion.",
    href: "https://destiny.pk",
    tags: ["Ecommerce", "Shopify", "Storefront", "CRO"],
    shot: "/images/projects/destiny/screen-1.png",
  },
  {
    slug: "meddo",
    name: "Meddo",
    description:
      "A US medical management platform with conversion-focused service pages and a clean, trustworthy UI over a secure backend.",
    href: "https://med-do.vercel.app/",
    tags: ["Healthcare", "SaaS", "Service Pages"],
    shot: "/images/projects/meddo.png",
  },
  {
    slug: "comuni",
    name: "Comuni",
    description:
      "A Canadian event-planning app with polished marketing pages, interactive maps, and offer-page design for local discovery.",
    href: "https://comuni-delta.vercel.app/",
    tags: ["Web App", "Events", "Marketing"],
    shot: "/images/projects/comuni/screen-1.png",
  },
  {
    slug: "green-n-solar",
    name: "Green N Solar",
    description:
      "A solar company website with service pages, trust-building sections, and lead-capture forms engineered to convert.",
    href: "https://greennsolar.com",
    tags: ["Landing Page", "Lead Gen", "Solar"],
    shot: "/images/projects/green-n-solar/screen-1.png",
  },
  {
    slug: "dynasty",
    name: "Dynasty",
    description:
      "A B2B marketing site for a UAE-based petroleum trading firm with service showcases, partner highlights, and quote-request flows.",
    href: "https://dynastyfm.com/",
    tags: ["B2B", "Marketing Site", "Lead Gen"],
    shot: "/images/projects/dynasty/screen-1.jpeg",
  },
  {
    slug: "613-guys",
    name: "613 Guys",
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

function IconButton({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor
      onClick={(e) => e.stopPropagation()}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_30px_-8px_rgba(255,255,255,0.35)]"
    >
      {children}
    </a>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      className="group relative grid gap-8 overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-6 transition-colors duration-500 hover:border-foreground/20 md:grid-cols-2 md:items-center md:gap-12 md:p-10"
    >
      {/* Hover navy wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 0%, rgba(34,49,122,0.20), transparent 60%)",
        }}
      />

      {/* Text */}
      <div className={cn("relative z-10 flex flex-col", reversed && "md:order-2")}>
        {project.href && (
          <div className="mb-6 flex items-center gap-3">
            <IconButton href={project.href} label={`Visit ${project.name} live`}>
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </IconButton>
          </div>
        )}

        <Link href={`/projects/${project.slug}`} data-cursor className="w-fit">
          <h3 className="font-display text-5xl uppercase leading-[0.95] tracking-tight text-foreground transition-colors md:text-6xl">
            {project.name}
          </h3>
        </Link>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/70 md:text-base">
          {project.description}
        </p>

        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/55"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={`/projects/${project.slug}`}
          data-cursor
          className="group/cta mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-foreground"
        >
          View case study
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </div>

      {/* Browser mockup */}
      <Link
        href={`/projects/${project.slug}`}
        data-cursor
        className={cn(
          "relative z-10 block overflow-hidden rounded-2xl border border-foreground/10 bg-[#0d0f16] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_45px_110px_-30px_rgba(24,44,130,0.7)]",
          reversed && "md:order-1",
        )}
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-[11px] text-white/40">
            {project.href
              ? project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : `${project.slug} · case study`}
          </span>
        </div>
        {/* Screenshot / logo */}
        <div
          className={cn(
            "relative aspect-[16/10] w-full overflow-hidden",
            project.contain &&
              "bg-[radial-gradient(circle_at_50%_-10%,#14244f,#070b18)]",
          )}
        >
          <Image
            src={project.shot}
            alt={`${project.name} ${project.contain ? "logo" : "screenshot"}`}
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            className={cn(
              "transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]",
              project.contain
                ? "object-contain p-14"
                : "object-cover object-top",
            )}
          />
        </div>
      </Link>
    </motion.article>
  )
}

export function BrutalistProjects() {
  return (
    <section
      id="work"
      className="relative w-full scroll-mt-24 bg-background px-6 py-24 text-foreground md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/40"
          >
            (Selected Work)
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="overflow-hidden font-display uppercase leading-[0.85] tracking-[-0.01em] text-foreground"
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
            className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg"
          >
            From full-stack platforms and AI systems to high-converting funnels —
            every build here solves a real-world problem with speed and craft.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8 md:gap-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
