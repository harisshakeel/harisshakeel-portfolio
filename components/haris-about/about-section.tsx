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
const STACK: { label: string; items: string[] }[] = [
  {
    label: "ML & Computer Vision",
    items: ["PyTorch", "TensorFlow", "Deep Learning", "CNNs", "Transfer Learning", "Model Training & Evaluation", "YOLOv8", "Ultralytics", "OpenCV", "ONNX Runtime", "MediaPipe", "SMPL-X", "Pose Estimation", "Monocular Depth Estimation", "3D Body Modelling", "Cloth-Physics Simulation", "scikit-learn", "SciPy", "NumPy", "Pandas", "Roboflow"],
  },
  {
    label: "LLMs & Agentic AI",
    items: ["Claude Agent SDK", "MCP (Model Context Protocol)", "Multi-Agent Orchestration", "LangChain", "LangGraph", "RAG", "GraphRAG", "Embeddings", "Vector Databases", "Function Calling", "Structured Output", "Prompt Engineering", "Human-in-the-Loop", "GPT-5", "Claude", "Gemini", "Llama", "DeepSeek"],
  },
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "C# / .NET Core", "Dart"],
  },
  {
    label: "Backend & Data",
    items: ["FastAPI", "Node.js", "Express", "REST APIs", "WebSockets", "OAuth 2.0", "PostgreSQL", "Row-Level Security", "Prisma", "BullMQ", "Redis", "MongoDB", "MySQL", "Supabase", "Pydantic", "pytest", "Slack Bolt", "n8n"],
  },
  {
    label: "Frontend & Mobile",
    items: ["React", "Next.js", "MERN Stack", "React Native", "Flutter", "Tailwind CSS", "Redux"],
  },
  {
    label: "Cloud, DevOps & AI Tools",
    items: ["Claude Code", "Cursor", "Codex", "Google Cloud (GCP)", "AWS", "Docker", "Sentry", "Railway", "Vercel", "Git", "GitHub", "JIRA"],
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
 * - Smoother chip hover gradients with champagne accent
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

        {/* Tech stack — interactive chips with premium hover */}
        <div
          className="mt-16 grid gap-x-12 gap-y-12 border-t pt-14 sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: `${PALETTE.inkOlive}1a` }}
        >
          {STACK.map((group, gi) => (
            <motion.div
              key={group.label}
              variants={chipContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
            >
              <motion.div variants={chipVariant} className="mb-4 flex items-baseline gap-3">
                <span
                  className="font-hero-sub text-xs tabular-nums"
                  style={{ color: `${PALETTE.warmGrey}99` }}
                >
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-hero-display text-lg uppercase tracking-wide"
                  style={{ color: PALETTE.inkOlive }}
                >
                  {group.label}
                </h3>
              </motion.div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={chipVariant}
                    className="group/chip font-hero-sub relative cursor-default overflow-hidden rounded-full border px-3.5 py-1.5 text-[13.5px] font-medium transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.07]"
                    style={{ borderColor: `${PALETTE.inkOlive}26` }}
                  >
                    {/* Premium dark fill on hover with champagne shimmer */}
                    <span
                      className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100"
                      style={{
                        background: `radial-gradient(130% 130% at 50% 0%, ${PALETTE.smokedOlive} 0%, ${PALETTE.obsidian} 70%)`,
                      }}
                    />
                    {/* Glossy champagne shine sweep */}
                    <span
                      className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/2 -translate-x-[220%] -skew-x-[20deg] transition-transform duration-700 ease-out group-hover/chip:translate-x-[320%]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${PALETTE.champagne}50, transparent)`,
                      }}
                    />
                    <span className="relative z-10 transition-colors duration-300 text-[#161A15cc] group-hover/chip:text-[#F5F3EC]">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
