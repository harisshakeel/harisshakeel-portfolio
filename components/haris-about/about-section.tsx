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

const INTRO = [
  "I'm a Computer Science graduate and AI/ML engineer working in applied computer vision, physics-based simulation, and agentic AI. I build the pipelines that turn raw input into something a product can act on: pose estimation, monocular depth, parametric body modelling, and cloth-physics fit derivation, typed and validated end to end.",
  "I also architect autonomous agent systems on the Claude Agent SDK and MCP, and build the full-stack platforms around them in Python, FastAPI, and the MERN stack, from databases and APIs to polished, accessible interfaces.",
  "I'm currently open to new opportunities and collaborations, and always up for building something ambitious.",
]

// Roles live in <BrutalistExperience /> — see components/brutalist-experience.tsx.

// Mirrors the Skills section of the current resume — keep the two in sync.
// Each group separates the tools themselves from the methods they're used
// for, so it scans as "what I work with / what I do with it" instead of one
// undifferentiated wall of pills. `accent` colours the group's index badge.
type StackGroup = { label: string; accent: string; tools: string[]; methods?: string[] }

const STACK: StackGroup[] = [
  {
    label: "ML & Computer Vision",
    accent: PALETTE.chartreuse,
    tools: ["PyTorch", "TensorFlow", "OpenCV", "MediaPipe", "ONNX Runtime", "YOLOv8", "Ultralytics", "SMPL-X", "scikit-learn", "SciPy", "NumPy", "Pandas", "Roboflow"],
    methods: ["Pose estimation", "Monocular depth estimation", "3D body modelling", "Cloth-physics simulation", "Deep learning & CNNs", "Transfer learning", "Model training & evaluation"],
  },
  {
    label: "LLMs & Agentic AI",
    accent: "#F2B84B",
    tools: ["Claude Agent SDK", "MCP", "LangChain", "LangGraph", "Vector databases", "Claude", "GPT-5", "Gemini", "Llama", "DeepSeek"],
    methods: ["Multi-agent orchestration", "RAG & GraphRAG", "Embeddings", "Function calling", "Structured output", "Prompt engineering", "Human-in-the-loop design"],
  },
  {
    label: "Backend & Data",
    accent: "#7CC6B4",
    tools: ["FastAPI", "Node.js", "Express", "PostgreSQL", "Supabase", "Prisma", "Redis", "BullMQ", "MongoDB", "MySQL", "Pydantic", "pytest", "Slack Bolt", "n8n"],
    methods: ["REST APIs", "WebSockets", "OAuth 2.0", "Row-level security"],
  },
  {
    label: "Frontend & Mobile",
    accent: "#8FB3F0",
    tools: ["React", "Next.js", "React Native", "Flutter", "Tailwind CSS", "Redux"],
    methods: ["MERN stack"],
  },
  {
    label: "Cloud, DevOps & AI Tools",
    accent: "#F08F6E",
    tools: ["Google Cloud (GCP)", "AWS", "Docker", "Railway", "Vercel", "Sentry", "Git", "GitHub", "JIRA", "Claude Code", "Cursor", "Codex"],
  },
  {
    label: "Languages",
    accent: PALETTE.champagne,
    tools: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "C# / .NET Core", "Dart"],
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

const chipContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.05 } },
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

        // Word-by-word illumination scrubbed against scroll
        const split = new SplitText("[data-illuminate]", { type: "words" })

        gsap.fromTo(
          split.words,
          { opacity: 0.12 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: "[data-about-copy]",
              start: "top 85%",
              end: "bottom 68%",
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
                  <span className="relative inline-block">
                    {line}
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
                ) : (
                  line
                )}
              </motion.span>
            </motion.span>
          ))}
        </h2>

        {/* Intro — word-by-word illumination */}
        <div data-about-copy className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-12">
          {INTRO.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={0.1 + i * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              data-illuminate
              className="font-hero-sub text-base leading-relaxed md:text-[17px]"
              style={{ color: PALETTE.warmGrey }}
            >
              {p}
            </motion.p>
          ))}
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

        {/* Toolkit — one row per group: the tools, then the methods they're used for */}
        <div className="mt-20 border-t pt-12 md:mt-24" style={{ borderColor: `${PALETTE.inkOlive}1a` }}>
          <p
            className="mb-4 font-hero-sub text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: PALETTE.warmGrey }}
          >
            (Toolkit)
          </p>
          <motion.dl
            variants={chipContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
          >
            {STACK.map((group, gi) => (
              <motion.div
                key={group.label}
                variants={fadeUp}
                className="grid gap-5 border-b py-7 md:grid-cols-12 md:gap-10 md:py-9"
                style={{ borderColor: `${PALETTE.inkOlive}14` }}
              >
                <dt className="flex items-start gap-4 md:col-span-4">
                  <motion.span
                    variants={chipVariant}
                    className="flex size-9 shrink-0 items-center justify-center rounded-full font-hero-sub text-xs font-semibold tabular-nums"
                    style={{ backgroundColor: group.accent, color: PALETTE.inkOlive }}
                  >
                    {String(gi + 1).padStart(2, "0")}
                  </motion.span>
                  <span
                    className="pt-1.5 font-hero-display text-base uppercase leading-snug tracking-wide md:text-lg"
                    style={{ color: PALETTE.inkOlive }}
                  >
                    {group.label}
                  </span>
                </dt>
                <dd className="space-y-3 md:col-span-8">
                  {[
                    { label: "Tools", items: group.tools, strong: true },
                    ...(group.methods ? [{ label: "Methods", items: group.methods, strong: false }] : []),
                  ].map((line) => (
                    <div key={line.label} className="grid grid-cols-[4.75rem_1fr] gap-3 md:grid-cols-[5.5rem_1fr]">
                      <span
                        className="pt-[0.35em] font-hero-sub text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: `${PALETTE.warmGrey}b3` }}
                      >
                        {line.label}
                      </span>
                      <p
                        className={`font-hero-sub leading-[1.8] ${line.strong ? "text-[16px] font-medium md:text-[17px]" : "text-[15px] md:text-base"}`}
                        style={{ color: line.strong ? PALETTE.inkOlive : PALETTE.warmGrey }}
                      >
                        {line.items.map((item, i) => (
                          <span key={item}>
                            {i > 0 && (
                              <>
                                <span className="sr-only">, </span>
                                <span aria-hidden className="mx-2" style={{ color: `${PALETTE.inkOlive}40` }}>
                                  ·
                                </span>
                              </>
                            )}
                            <span className="whitespace-nowrap">{item}</span>
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
