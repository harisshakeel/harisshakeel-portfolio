"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

const EMAIL = "harisshakeel061@gmail.com"
const CALENDLY = "https://calendly.com/harisshakeel/haris"
const LINKEDIN = "https://www.linkedin.com/in/haris-shakeel-5559852b9"
const GITHUB = "https://github.com/harisshakeel"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group inline-flex items-center gap-1.5 text-lg font-semibold text-foreground/70 transition-colors hover:text-foreground md:text-xl"
    >
      {label}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

export function BrutalistFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative w-full scroll-mt-24 overflow-hidden bg-background px-6 pb-8 pt-24 text-foreground md:px-10 md:pt-32"
    >
      {/* Ambient glow rising from the bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="hero-blob absolute -bottom-40 left-1/2 h-[36rem] w-[80%] -translate-x-1/2 rounded-[100%] bg-[#22317a]/20 blur-[150px] [animation:hero-drift-c_30s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Giant statement */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="overflow-hidden font-display uppercase leading-[0.82] tracking-[-0.02em] text-foreground"
        >
          <motion.span
            variants={{
              hidden: { y: "110%" },
              visible: { y: "0%", transition: { duration: 1, ease: EASE } },
            }}
            className="block text-[20vw] md:text-[16vw] lg:text-[14rem]"
          >
            Let&apos;s talk
          </motion.span>
        </motion.h2>

        {/* Contact row */}
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <p className="max-w-md font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
              Got a question, proposal, project, or want to work together on
              something?
            </p>
            <p className="mt-5 text-2xl font-medium text-foreground md:text-3xl">
              <a
                href={`mailto:${EMAIL}`}
                data-cursor
                className="hl-marker underline decoration-1 underline-offset-[6px]"
              >
                Send me an email
              </a>
              <span className="text-foreground/40"> or </span>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="hl-marker underline decoration-1 underline-offset-[6px]"
              >
                book a call
              </a>
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="flex gap-8 md:justify-end"
          >
            <SocialLink href={LINKEDIN} label="LinkedIn" />
            <SocialLink href={GITHUB} label="GitHub" />
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col gap-3 border-t border-foreground/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Haris Shakeel</span>
          <span>Agentic AI &amp; Full-Stack Developer · Available for work</span>
        </div>
      </div>
    </footer>
  )
}
