"use client"

import { motion, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

// Giant statement, one clause per line (revealed line-by-line).
const HEADLINE = ["I build agents,", "ship platforms,", "design what converts."]

const INTRO = [
  "I'm a Computer Science graduate specializing in Agentic AI and full-stack development. I architect autonomous AI systems with the Claude Agent SDK and Gemini, and build scalable MERN platforms end to end, from databases and APIs to polished, accessible interfaces.",
  "I also design high-converting landing pages and sales funnels in Figma and Shopify for D2C and e-commerce brands, applying CRO and trust-building UX. Building and designing both means I see the full picture, from first click to checkout.",
  "I'm currently open to new opportunities and collaborations, and always up for building something ambitious.",
]

// Roles live in <BrutalistExperience /> — see components/brutalist-experience.tsx.

const STACK: { label: string; items: string[] }[] = [
  {
    label: "Programming",
    items: ["Python", "TypeScript", "JavaScript", "Go", "Java", "C++", "C#", "SQL", "Dart", "PHP"],
  },
  {
    label: "Frontend",
    items: ["HTML5", "CSS3", "Tailwind CSS", "Material UI", "Shadcn/UI", "Bootstrap", "React", "Next.js", "Vue.js", "Vite", "Redux", "Zustand", "Framer Motion"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "NestJS", "FastAPI", "Django", "Flask", "ASP.NET Core (.NET)", "Laravel", "REST APIs", "GraphQL", "WebSockets"],
  },
  {
    label: "Mobile",
    items: ["Flutter", "React Native", "Expo"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Firebase", "Elasticsearch", "Pinecone", "ChromaDB"],
  },
  {
    label: "AI / LLMs",
    items: ["OpenAI API", "GPT-5", "Claude SDK", "Gemini", "Llama", "DeepSeek", "LangChain", "LangGraph", "MCP (Model Context Protocol)", "AI Agents", "RAG", "Embeddings", "Prompt Engineering", "Function Calling", "Vector Databases"],
  },
  {
    label: "Machine Learning",
    items: ["TensorFlow", "PyTorch", "Hugging Face", "OpenCV", "YOLOv8", "Ultralytics", "NumPy", "Pandas", "Scikit-learn", "Roboflow"],
  },
  {
    label: "Automation",
    items: ["n8n", "Zapier", "Make", "Cron Jobs"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Kubernetes", "AWS", "Google Cloud (GCP)", "Microsoft Azure", "Cloudflare", "Vercel", "Railway", "Render", "GitHub Actions"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Jira", "Figma", "Slack", "Slack Bolt", "Postman", "Prisma", "Drizzle ORM"],
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

export function BrutalistAbout() {
  return (
    <section
      id="about"
      className="relative w-full scroll-mt-24 overflow-hidden bg-background px-6 py-24 text-foreground md:px-10 md:py-36"
    >
      {/* Animated grid + drifting glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)",
          }}
        />
        <div className="hero-blob absolute right-[10%] top-[20%] h-[30rem] w-[30rem] rounded-full bg-[#22317a]/20 blur-[150px] [animation:hero-drift-b_34s_ease-in-out_infinite_alternate]" />
        <div className="hero-blob absolute left-[6%] bottom-[8%] h-[26rem] w-[26rem] rounded-full bg-white/[0.03] blur-[130px] [animation:hero-drift-a_28s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Eyebrow + availability */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="mb-8 flex flex-wrap items-center gap-4"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/40">
            (About)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Giant statement */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-foreground"
        >
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden py-[0.05em]">
              <motion.span
                variants={lineReveal}
                custom={i * 0.12}
                className="block text-[13vw] md:text-[9vw] lg:text-[7.5rem]"
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
                      className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-[linear-gradient(90deg,#33448f,#7c6cf0)] md:h-[10px]"
                    />
                  </span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        {/* Intro */}
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-3 md:gap-12">
          {INTRO.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              custom={0.1 + i * 0.08}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="text-base leading-relaxed text-foreground/75 md:text-[17px]"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Tech stack — interactive chips */}
        <div className="mt-16 grid gap-x-12 gap-y-12 border-t border-foreground/10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, gi) => (
            <motion.div
              key={group.label}
              variants={chipContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-8%" }}
            >
              <motion.div
                variants={chipVariant}
                className="mb-4 flex items-baseline gap-3"
              >
                <span className="font-mono text-xs tabular-nums text-foreground/30">
                  {String(gi + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg uppercase tracking-wide text-foreground">
                  {group.label}
                </h3>
              </motion.div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={chipVariant}
                    data-cursor
                    className="group/chip relative cursor-default select-none overflow-hidden rounded-full border border-foreground/15 bg-foreground/[0.03] px-3.5 py-1.5 text-[13.5px] font-medium text-foreground/80 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.07] hover:border-[#5b6cff]/50 hover:text-white hover:shadow-[0_18px_44px_-10px_rgba(24,44,130,0.95),0_0_22px_-4px_rgba(90,110,255,0.55)]"
                  >
                    {/* deep navy fill */}
                    <span className="absolute inset-0 z-0 bg-[radial-gradient(130%_130%_at_50%_0%,#22326f_0%,#0b1330_55%,#05070f_100%)] opacity-0 transition-opacity duration-300 group-hover/chip:opacity-100" />
                    {/* glossy shine sweep */}
                    <span className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/2 -translate-x-[220%] -skew-x-[20deg] bg-[linear-gradient(90deg,transparent,rgba(160,180,255,0.55),transparent)] transition-transform duration-700 ease-out group-hover/chip:translate-x-[320%]" />
                    <span className="relative z-10">{item}</span>
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
