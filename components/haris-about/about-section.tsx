"use client"

import { useRef } from "react"
import { motion, type Variants } from "framer-motion"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

import { ActionButton } from "@/components/ui/action-button"
import { PALETTE } from "@/lib/palette"

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
}

const EASE = [0.22, 1, 0.36, 1] as const

// Giant statement, one clause per line (revealed line-by-line).
const HEADLINE = ["I build agents,", "train models,", "ship real systems."]

// One plain-language lead, then what that means in practice, a line each.
// Deliberately doesn't open with "I": the headline above already does.
const INTRO_LEAD =
  "Agentic AI engineer and Computer Science graduate, building the agents that carry real work, the automations behind them, and the SaaS they run inside."

// Ordered by positioning, not by what is technically hardest: agents first,
// the platforms around them second, vision third. Accents stay in place so
// the visual rhythm of the row is unchanged.
const FOCUS = [
  {
    label: "Agentic AI",
    accent: PALETTE.chartreuse,
    text: "Agents that carry real work on their own, with a person signing off on anything that reaches a customer.",
  },
  {
    label: "SaaS & automation",
    accent: "#F2B84B",
    text: "Multi-tenant platforms and the pipelines underneath them, taking work off people's hands and running without them.",
  },
  {
    label: "Computer vision",
    accent: "#7CC6B4",
    text: "Reading a real body off an ordinary phone photo, accurately enough to tell someone what size to buy.",
  },
]

// Roles live in <BrutalistExperience /> — see components/brutalist-experience.tsx.

/**
 * Toolkit panel surface: deep petrol. The page already uses ivory (About),
 * olive (Work) and obsidian (hero, footer), so this needs its own hue; petrol
 * sits well against the citron band that follows.
 */
const TOOLKIT_BG = "#0F2B2E"

// Deliberately NOT a mirror of the resume's skills section. A resume lists
// keywords because a parser matches strings; a visitor here learns nothing
// from a wall of pills. So each group names only the tools that are actually
// load-bearing, and `built` says what they produced — the tool list is the
// claim, the `built` line is the evidence. `accent` colours the index badge.
type StackGroup = { label: string; accent: string; tools: string[]; built?: string }

const STACK: StackGroup[] = [
  {
    label: "Seeing",
    accent: PALETTE.chartreuse,
    tools: ["PyTorch", "ONNX Runtime", "OpenCV", "MediaPipe", "SMPL-X", "YOLOv8"],
    built: "Xision's pipeline, which reads a body's real measurements off an ordinary phone scan, and Sentinel's three detectors watching live CCTV.",
  },
  {
    label: "Reasoning",
    accent: "#F2B84B",
    tools: ["Claude Agent SDK", "MCP", "Pydantic"],
    built: "MAVIS, where agents do client work across 3,000+ connected apps with a person approving every output, and the research pipeline behind Metamorphix.",
  },
  {
    label: "Serving",
    accent: "#7CC6B4",
    tools: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"],
    built: "The services underneath all of it: job queues that survive a bad asset, tenant isolation enforced by the database, and APIs that fail loudly rather than guess.",
  },
  {
    label: "Interfaces",
    accent: "#8FB3F0",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
    built: "Client portals, this site, and the mobile app that puts a flagged CCTV frame in an operator's hand.",
  },
  {
    label: "Shipping",
    accent: "#F08F6E",
    tools: ["Docker", "GCP", "AWS", "GitHub Actions", "pytest", "Playwright"],
    built: "Deployments that hold up, and test suites that catch a regression before a reviewer has to.",
  },
]

const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: (d: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: d },
  }),
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: d },
  }),
}

/** A toolkit row: badge, label, then each keyword line in turn. */
const toolkitRow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/** A line of keywords that flow in from the left, one after another. */
const keywordLine: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
}

const keywordItem: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

const chipVariant: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

/**
 * About — editorial light section after the dark hero. Premium polish applied:
 * - GSAP word-by-word illumination on intro paragraphs
 * - Decorative rule + "Introduction" eyebrow
 * - Refined warm-ivory palette with richer tones
 * - Toolkit rows (tools, then methods) with colour-coded group badges
 *
 * All content/data is preserved exactly from the previous version.
 */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const enter = { trigger: sectionRef.current, start: "top 80%", once: true }

        // Eyebrow rule wipe
        gsap.fromTo(
          "[data-about-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "expo.out", scrollTrigger: enter }
        )

        gsap.fromTo(
          "[data-about-eyebrow]",
          { opacity: 0, x: -8 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: 0.15,
            scrollTrigger: enter,
          }
        )

        // Word-by-word illumination on the lead only, scrubbed against scroll.
        // Starts legible and finishes before the lead reaches mid-screen.
        // aria "none": the default adds aria-label to the <p>, which isn't allowed on a paragraph.
        const split = new SplitText("[data-illuminate]", { type: "words", aria: "none" })

        gsap.fromTo(
          split.words,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: "[data-about-copy]",
              start: "top 90%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        )

        return () => split.revert()
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  return (
    <>
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full scroll-mt-24 overflow-hidden px-6 py-24 md:px-10 md:py-36"
      style={{ backgroundColor: PALETTE.warmIvory, color: PALETTE.inkOlive }}
    >
      {/* Faint dot grid — texture, not decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(${PALETTE.inkOlive}1a 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Eyebrow with decorative rule + availability badge */}
        <div className="mb-10 flex items-center gap-4 text-xs uppercase tracking-[0.22em]" style={{ color: `${PALETTE.warmGrey}99` }}>
          <span
            data-about-rule
            aria-hidden="true"
            className="h-px w-10 origin-left"
            style={{ backgroundColor: `${PALETTE.inkOlive}40` }}
          />
          <span data-about-eyebrow>Introduction</span>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <span
            className="font-hero-sub font-semibold text-[11px] uppercase tracking-[0.3em]"
            style={{ color: PALETTE.warmGrey }}
          >
            (About)
          </span>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ borderColor: `${PALETTE.inkOlive}26`, color: PALETTE.inkOlive }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
                style={{ backgroundColor: PALETTE.mineralSage }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: PALETTE.mineralSage }}
              />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Giant statement */}
        <h2 className="font-hero-display uppercase leading-[0.9] tracking-tight">
          {HEADLINE.map((line, i) => (
            <motion.span
              key={line}
              className="block overflow-hidden py-[0.05em]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
            >
              <motion.span
                variants={lineReveal}
                custom={i * 0.12}
                className="block text-[12vw] md:text-[7.5vw] lg:text-[6rem]"
              >
                {i === HEADLINE.length - 1 ? (
                  // Underline only the last word: a whole-line inline-block goes full
                  // width once the line wraps, dragging the underline past the text.
                  <>
                  {line.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="relative inline-block">
                    {line.split(" ").at(-1)}
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                      className="absolute -bottom-1 left-0 h-[6px] w-full origin-left md:h-[8px]"
                      style={{ backgroundColor: PALETTE.chartreuse }}
                    />
                  </span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </motion.span>
          ))}
        </h2>

        {/* Intro — a readable lead (lightly illuminated), then three short focus areas */}
        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            data-about-copy
            data-illuminate
            className="max-w-[34ch] font-hero-sub text-[22px] font-medium leading-[1.45] md:col-span-6 md:text-[28px]"
            style={{ color: PALETTE.inkOlive }}
          >
            {INTRO_LEAD}
          </motion.p>

          <ul className="space-y-7 md:col-span-6 md:pt-2">
            {FOCUS.map((item, i) => (
              <motion.li
                key={item.label}
                variants={fadeUp}
                custom={0.1 + i * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                className="border-l-[3px] pl-5"
                style={{ borderColor: item.accent }}
              >
                <p
                  className="font-hero-sub text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: PALETTE.inkOlive }}
                >
                  {item.label}
                </p>
                <p
                  className="mt-1.5 max-w-[52ch] font-hero-sub text-base leading-relaxed md:text-[17px]"
                  style={{ color: PALETTE.warmGrey }}
                >
                  {item.text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Next steps — pill CTAs with a sweep fill */}
        <motion.div
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <ActionButton href="#work">View my work</ActionButton>
          <ActionButton href="https://calendly.com/harisshakeel/haris" variant="outline">
            Book a call
          </ActionButton>
        </motion.div>

      </div>
    </section>

    {/* Toolkit — its own dark panel: one row per group, the tools, then the methods they're used for */}
    <section
      aria-labelledby="toolkit-heading"
      className="relative w-full overflow-hidden px-6 py-24 md:px-10 md:py-32"
      style={{ backgroundColor: TOOLKIT_BG, color: PALETTE.ivory }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{ background: `radial-gradient(55% 70% at 85% 0%, ${PALETTE.chartreuse}17 0%, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="mb-10 md:mb-14"
          >
            <p
              className="mb-4 font-hero-sub text-[11px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: PALETTE.chartreuse }}
            >
              (Toolkit)
            </p>
            <h2
              id="toolkit-heading"
              className="font-hero-display text-[9vw] uppercase leading-[0.95] tracking-tight md:text-6xl"
              style={{ color: PALETTE.ivory }}
            >
              Tools &amp; methods
            </h2>
          </motion.div>
          {/* Each row animates as it scrolls in, so the keywords flow in from the left where you're reading */}
          <dl className="border-t" style={{ borderColor: `${PALETTE.ivory}1a` }}>
            {STACK.map((group, gi) => (
              <motion.div
                key={group.label}
                variants={toolkitRow}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                className="grid gap-5 border-b py-7 md:grid-cols-12 md:gap-10 md:py-9"
                style={{ borderColor: `${PALETTE.ivory}14` }}
              >
                <dt className="flex items-start gap-4 md:col-span-4">
                  <motion.span
                    variants={chipVariant}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full font-hero-sub text-xs font-semibold tabular-nums"
                    style={{ backgroundColor: group.accent, color: PALETTE.inkOlive }}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.span
                    variants={keywordItem}
                    className="pt-1.5 font-hero-display text-base uppercase leading-snug tracking-wide md:text-lg"
                    style={{ color: PALETTE.ivory }}
                  >
                    {group.label}
                  </motion.span>
                </dt>
                <dd className="space-y-3 md:col-span-8">
                  {[
                    { label: "Tools", items: group.tools, strong: true },
                    ...(group.built ? [{ label: "Built", items: [group.built], strong: false }] : []),
                  ].map((line) => (
                    <div key={line.label} className="grid grid-cols-[4.75rem_1fr] gap-3 md:grid-cols-[5.5rem_1fr]">
                      <span
                        className="pt-[0.35em] font-hero-sub text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: PALETTE.sage }}
                      >
                        {line.label}
                      </span>
                      <motion.p
                        variants={keywordLine}
                        className={`font-hero-sub leading-[1.8] ${line.strong ? "text-[16px] font-medium md:text-[17px]" : "text-[15px] md:text-base"}`}
                        style={{ color: line.strong ? PALETTE.ivory : PALETTE.sage }}
                      >
                        {line.items.map((item, i) => (
                          <motion.span
                            key={item}
                            variants={keywordItem}
                            /* Keywords stay unbroken so a two-word tool never splits across
                               lines; the `built` sentence is prose and has to wrap normally. */
                            className={line.strong ? "inline-block whitespace-nowrap" : "inline"}
                          >
                            {i > 0 && (
                              <>
                                <span className="sr-only">, </span>
                                <span aria-hidden className="mx-2" style={{ color: `${PALETTE.ivory}40` }}>
                                  ·
                                </span>
                              </>
                            )}
                            {item}
                          </motion.span>
                        ))}
                      </motion.p>
                    </div>
                  ))}
                </dd>
              </motion.div>
            ))}
          </dl>
      </div>
    </section>
    </>
  )
}
