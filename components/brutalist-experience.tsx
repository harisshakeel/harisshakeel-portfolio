"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { cn } from "@/lib/utils"
import { PALETTE } from "@/lib/palette"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
}

const EASE = [0.16, 1, 0.3, 1] as const
const VIEWPORT = { once: true, margin: "-10% 0px -10% 0px" as const }

interface Role {
  company: string
  logo?: string
  logoDims?: { width: number; height: number }
  logoTone: "dark" | "light"
  role?: string
  location?: string
  summary?: string
  tags?: string[]
  current?: boolean
  theme: {
    surface: string
    text: string
    rule: string
  }
}

// Reverse-chronological — most recent first.
// Each role now carries its own panel theme for the stacking-panel design.
const ROLES: Role[] = [
  {
    company: "Naxtech",
    logo: "/images/companies/naxtech.png",
    logoDims: { width: 792, height: 150 },
    logoTone: "light",
    role: "AI/ML Engineer",
    location: "Remote",
    current: true,
    summary:
      "Building the applied computer-vision and simulation pipeline behind xision.ai: pose estimation, monocular depth, parametric body modelling, and cloth-physics fit derivation that turn a single phone scan into a measurement-accurate 3D body and a physically simulated garment fit. Also engineered MAVIS, a multi-tenant platform putting Claude Code agents on real client work, with per-user OAuth across 3,000+ connected apps, Postgres row-level security as the tenant boundary, and humans holding the approval loop on everything an agent produces. The through-line is making model output something a product can actually act on: typed, validated, and reviewable rather than prose a human has to re-check.",
    tags: ["Computer Vision", "3D / Simulation", "Agentic AI", "FastAPI", "Multi-Tenant SaaS"],
    // Midnight navy: lets the white wordmark and sky-blue arc of the logo carry.
    theme: {
      surface: "#0A1C30",
      text: "#EAF4FB",
      rule: "#EAF4FB33",
    },
  },
  {
    company: "Payback",
    logo: "/images/companies/payback.png",
    logoDims: { width: 182, height: 50 },
    logoTone: "dark",
    role: "Technical Lead",
    location: "Lahore",
    summary:
      "Led the end-to-end build of payback.pk, a live cashback platform with QR-based transactions, POS integration, and TOTP-based authentication behind its financial operations. Managed a team of four to five interns while acting as the primary technical contributor across backend, infrastructure, and core product decisions, and deployed it on AWS as a live platform with active business onboarding and real user transactions.",
    tags: ["Team Lead", "AWS", "Payments / POS", "Full-Stack"],
    // Butter cream: warm enough to echo the amber mark, light enough for the black wordmark.
    theme: {
      surface: "#FFF1CC",
      text: "#1E1A12",
      rule: "#1E1A1233",
    },
  },
  {
    company: "Advance Resources",
    logo: "/images/companies/advance-resources.png",
    logoDims: { width: 200, height: 80 },
    logoTone: "dark",
    role: "Associate Full-Stack Developer",
    location: "Lahore",
    summary:
      "Designed and implemented clusterden.com, a CRM platform with scalable WhatsApp automation built on an action-trigger workflow engine of triggers, revisions, and runs, wired to the WhatsApp Business API through webhooks for real-time responsiveness. Cut automated message delivery from 20 seconds to 3, shipping weekly demos to consistent stakeholder sign-off. Also built and optimised client sites including greennsolar.com, dynastyfm.com, 613 Guys, Meddo, DevPlob, and Comuni.",
    tags: ["MERN", "WhatsApp API", "Workflow Automation", "CRM"],
    // Icy blue-grey: cool enough to sit with the logo's blue, light enough for its grey type and red mark.
    theme: {
      surface: "#E9EEF6",
      text: "#15233F",
      rule: "#15233F33",
    },
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

/**
 * Full-viewport panel. `relative` matters: a pinned panel goes `position:
 * fixed`, and a *positioned* sibling later in the DOM is what lets the next
 * panel paint over it rather than slide underneath.
 */
function Panel({
  theme,
  children,
}: {
  theme: { surface: string; text: string }
  children: React.ReactNode
}) {
  return (
    <div
      data-exp-panel
      className="relative w-full md:h-screen"
      style={{ backgroundColor: theme.surface, color: theme.text }}
    >
      {children}
    </div>
  )
}

function RolePanel({ role, index }: { role: Role; index: number }) {
  return (
    <Panel theme={role.theme}>
      <div className="mx-auto flex size-full max-w-[1600px] flex-col px-8 py-24 md:px-16 md:py-28">
        {/* Number */}
        <span className="block text-sm tabular-nums opacity-50">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="mt-12 grid flex-1 grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-16">
          {/* Left column: blurb + logo + company name */}
          <div className="relative flex flex-col md:col-span-7">
            {/* Logo tile */}
            <div className="mb-6 flex items-center gap-4">
              {role.logo && role.logoDims ? (
                <div className="flex w-fit min-w-[6rem] shrink-0 items-center justify-start">
                  <Image
                    src={role.logo}
                    alt={`${role.company} logo`}
                    width={role.logoDims.width}
                    height={role.logoDims.height}
                    className="w-32 object-contain md:w-40"
                  />
                </div>
              ) : null}

              {role.current && (
                <span className="mt-1 flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.18em] opacity-60">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Current
                </span>
              )}
            </div>

            {/* Summary */}
            <p className="max-w-[38ch] text-base leading-[1.7] opacity-60 md:text-lg">
              {role.role}
              {role.location ? ` · ${role.location}` : ""}
            </p>

            {/* Decorative giant number */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 select-none text-[16vw] font-medium leading-none -tracking-wider opacity-[0.07] md:block"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Company name — large editorial */}
            <h3 className="mt-auto max-w-[13ch] text-[clamp(2.1rem,4.8vw,4.8rem)] leading-[1.04] tracking-[-0.035em]">
              {role.company}
            </h3>
          </div>

          {/* Right column: tags + summary as list items */}
          <div className="flex flex-col md:col-span-5 md:col-start-8">
            {role.summary && (
              <p className="text-[15px] leading-relaxed opacity-70 md:text-base">
                {role.summary}
              </p>
            )}

            {role.tags && role.tags.length > 0 && (
              <ul className="mt-8 flex flex-col md:mt-auto">
                {role.tags.map((tag) => (
                  <li
                    key={tag}
                    style={{ borderTopColor: role.theme.rule }}
                    className="flex items-center border-t py-3 text-sm opacity-80 md:py-4 md:text-base"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Panel>
  )
}

export function BrutalistExperience() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop only — on mobile, panels stack normally.
      mm.add("(min-width: 768px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-exp-panel]",
          rootRef.current!
        )

        // Pin every panel except the last so they stack on scroll.
        panels.slice(0, -1).forEach((panel) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
          })
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return (
    <section id="experience" ref={rootRef} className="relative z-10 scroll-mt-24">
      {/* Section intro panel */}
      <div
        className="relative w-full py-24 md:py-32"
        style={{ backgroundColor: PALETTE.stoneBeige, color: PALETTE.inkOlive }}
      >
        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-16">
          <motion.h2
            initial="initial"
            whileInView="open"
            viewport={VIEWPORT}
            className="text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.035em]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={{
                  initial: { y: "110%" },
                  open: { y: "0%", transition: { duration: 1.05, ease: EASE } },
                }}
                className="block"
              >
                Where I&apos;ve built
                <span className="ms-4 inline-flex items-baseline gap-1.5">
                  <span className="inline-block size-2 rounded-full bg-current md:size-2.5" />
                  <span className="inline-block size-2 animate-pulse rounded-full bg-current opacity-45 md:size-2.5" />
                </span>
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="mt-10 max-w-md text-base leading-[1.8] opacity-60 md:mt-14"
          >
            The teams I&apos;ve built with, from full-stack product work to the AI systems I&apos;m shipping today.
          </motion.p>
        </div>
      </div>

      {/* Stacking role panels */}
      {ROLES.map((role, i) => (
        <RolePanel key={role.company} role={role} index={i} />
      ))}
    </section>
  )
}
