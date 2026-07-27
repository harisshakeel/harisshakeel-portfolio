"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

interface Role {
  company: string
  /** Omit to fall back to a typographic wordmark tile. */
  logo?: string
  /** Intrinsic pixel size of the logo file — required by next/image, and lets the tile size itself to the logo's real proportions instead of stretching/letterboxing it. */
  logoDims?: { width: number; height: number }
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
      "Building the applied computer-vision and simulation pipeline behind virtual try-on: pose estimation, monocular depth, parametric body modelling, and cloth-physics fit derivation that turn a single phone scan into a measurement-accurate 3D body. The through-line is making model output something a product can actually act on: typed, validated, and reviewable rather than prose a human has to re-check.",
    tags: ["Computer Vision", "3D / Simulation", "PyTorch", "FastAPI"],
  },
  {
    company: "Naxtech",
    logo: "/images/companies/naxtech.png",
    logoDims: { width: 792, height: 150 },
    logoTone: "light",
    role: "Agentic AI Developer",
    location: "Remote",
    summary:
      "Engineered a multi-tenant agentic AI platform with a dual-pass validation framework, automating research across 13,000+ entities at 95%+ factual accuracy. Ran large-scale competitor research over websites, landing pages, and sales funnels to surface design trends, conversion strategies, and outbound campaign opportunities.",
    tags: ["Agentic AI", "Multi-Tenant SaaS", "Validation", "Research Automation"],
  },
  {
    company: "Devsinc",
    logo: "/images/companies/devsinc.webp",
    logoDims: { width: 256, height: 256 },
    logoTone: "dark",
    role: "Associate Software Engineer",
    location: "Lahore",
    summary:
      "Built full-stack MERN applications end to end, with React front-ends against Node and Express APIs and the MongoDB schema and query design sitting behind them. Day to day meant REST integrations, authentication and role-based access control, and responsive component work, shipping features into client production codebases alongside a delivery team.",
    tags: ["MERN", "React", "Node.js", "MongoDB"],
  },
  {
    company: "Payback",
    logo: "/images/companies/payback.png",
    logoDims: { width: 182, height: 50 },
    logoTone: "dark",
    role: "Associate Technical Lead",
    location: "Lahore",
    summary:
      "Led the end-to-end design and build of payback.pk, a live cashback platform with offer pages, onboarding funnels, and mobile-first responsive layouts, while managing a team of four to five designers and interns. Designed conversion-focused landing pages, offer pages, and checkout flows, applying CRO best practices, trust-building UX, and customer journey mapping to cut friction and improve clarity.",
    tags: ["CRO", "Landing Pages", "Team Lead", "Responsive Design"],
  },
  {
    company: "Advance Resources",
    logo: "/images/companies/advance-resources.png",
    logoDims: { width: 200, height: 80 },
    logoTone: "dark",
    role: "Website Designer & Front-End Developer",
    location: "Lahore",
    summary:
      "Designed high-converting landing pages, sales funnels, advertorials, listicles, product pages, and offer pages in Figma for D2C, e-commerce, SaaS, and service brands, then built and optimised them in Replo, Shopify, React, Next.js, and Tailwind. Competitor research across rival sites and funnels fed the direct-response techniques behind each build: CTA placement, social proof, trust badges, FAQs, friction reduction. Shipped work included payback.pk, clusterden.com, greennsolar.com, dynastyfm.com, 613 Guys, Meddo, DevPlob, and Comuni.",
    tags: ["Figma", "Replo / Shopify", "CRO", "Next.js"],
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
        {/* Logo tile — sized to each logo's own proportions at a shared height, so a square mark and a wide banner don't get forced into the same box */}
        <div
          className={cn(
            "flex h-16 md:h-20 w-fit min-w-[7rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-foreground/10 px-5 transition-transform duration-500 ease-out group-hover:-translate-y-1",
            role.logoTone === "dark" ? "bg-white" : "bg-[#0b1020]",
          )}
        >
          {role.logo && role.logoDims ? (
            <Image
              src={role.logo}
              alt={`${role.company} logo`}
              width={role.logoDims.width}
              height={role.logoDims.height}
              className="h-9 w-auto max-w-[9rem] object-contain md:h-11 md:max-w-[11rem]"
            />
          ) : (
            <span
              className={cn(
                "text-center font-display text-2xl uppercase leading-none tracking-tight md:text-3xl",
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
            The teams I&apos;ve built with, from agency delivery work to the AI
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
