"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

interface Role {
  company: string
  /** Omit to fall back to a typographic wordmark tile. */
  logo?: string
  /**
   * Ink of the logo artwork, not the brand.
   * "dark" = dark marks on transparent/white — sits on a paper tile.
   * "light" = white/light marks — sits on a near-black tile so it stays visible.
   */
  logoTone: "dark" | "light"
  role?: string
  location?: string
  summary?: string
  tags?: string[]
  /** Renders the live "Current" pulse. No exact dates anywhere by design. */
  current?: boolean
}

// Reverse-chronological — most recent first.
const ROLES: Role[] = [
  {
    company: "Xision",
    logoTone: "light",
    role: "AI/ML Engineer",
    location: "Remote",
    current: true,
    summary:
      "Building the applied computer-vision and simulation pipeline behind virtual try-on: pose estimation, monocular depth, parametric body modelling, and cloth-physics fit derivation that turn a single phone scan into a measurement-accurate 3D body. The through-line is making model output something a product can actually act on — typed, validated, and reviewable rather than prose a human has to re-check.",
    tags: ["Computer Vision", "3D / Simulation", "PyTorch", "FastAPI"],
  },
  {
    company: "Naxtech",
    logo: "/images/companies/naxtech.png",
    logoTone: "light",
    location: "Remote",
    summary:
      "Built the agent infrastructure behind a multi-tenant platform that puts Claude Code agents on real client work — MCP tool integrations, per-user OAuth identity across thousands of third-party apps, and model-backed product features, with humans holding the approval loop.",
    tags: ["Agentic AI", "MCP", "Multi-Tenant SaaS", "Next.js"],
  },
  {
    company: "Devsinc",
    logo: "/images/companies/devsinc.webp",
    logoTone: "dark",
    role: "Associate Software Engineer",
  },
  {
    company: "Payback",
    logo: "/images/companies/payback.png",
    logoTone: "dark",
  },
  {
    company: "Advance Resources",
    logo: "/images/companies/advance-resources.png",
    logoTone: "dark",
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="group relative overflow-hidden rounded-[22px] border border-foreground/10 bg-card p-6 transition-colors duration-500 hover:border-foreground/20 md:p-9"
    >
      {/* Hover navy wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 90% at 100% 0%, rgba(34,49,122,0.18), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-9">
        {/* Logo tile */}
        <div
          className={cn(
            "relative h-16 w-40 shrink-0 overflow-hidden rounded-2xl border border-foreground/10 transition-transform duration-500 ease-out group-hover:-translate-y-1 md:h-20 md:w-48",
            role.logoTone === "dark" ? "bg-white" : "bg-[#0b1020]",
          )}
        >
          {role.logo ? (
            <Image
              src={role.logo}
              alt={`${role.company} logo`}
              fill
              sizes="192px"
              className="object-contain p-3.5 md:p-4"
            />
          ) : (
            <span
              className={cn(
                "flex h-full w-full items-center justify-center px-3 text-center font-display text-2xl uppercase leading-none tracking-tight md:text-3xl",
                role.logoTone === "dark" ? "text-[#0b1020]" : "text-white",
              )}
            >
              {role.company}
            </span>
          )}
        </div>

        {/* Copy */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
            <div className="min-w-0">
              <span className="mb-2 block font-mono text-xs tabular-nums text-foreground/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-foreground md:text-4xl">
                {role.company}
              </h3>
              {(role.role || role.location) && (
                <p className="mt-2 text-[15px] text-foreground/60">
                  {[role.role, role.location].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>

            {role.current && (
              <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/45">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Current
              </span>
            )}
          </div>

          {role.summary && (
            <p className="mt-6 max-w-4xl text-[15px] leading-relaxed text-foreground/75 md:text-base">
              {role.summary}
            </p>
          )}

          {role.tags && role.tags.length > 0 && (
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {role.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/55"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function BrutalistExperience() {
  return (
    <section
      id="experience"
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
            (Experience)
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
              className="block text-[15vw] md:text-[11vw] lg:text-[10rem]"
            >
              Experience
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
            The teams I&apos;ve built with — from agency delivery work to the AI
            systems I&apos;m shipping today.
          </motion.p>
        </div>

        {/* Roles */}
        <div className="flex flex-col gap-6 md:gap-8">
          {ROLES.map((role, i) => (
            <RoleCard key={role.company} role={role} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
