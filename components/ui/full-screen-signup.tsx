"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { ContactFormSection } from "@/components/contact-form-section"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
}

const viewport = { once: true, margin: "-80px" } as const

export function FullScreenSignup() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      {/* ── Become a Client ────────────────────────────────────────── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="grid gap-10 py-20 md:grid-cols-12 md:gap-16 md:py-28"
      >
        <div className="md:col-span-5">
          <motion.p
            variants={itemVariants}
            className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
          >
            Work with me
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl lg:text-6xl"
          >
            Get in touch.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            A role, a platform, an app or an automation. Tell me what it is and I&apos;ll reply within 24 hours.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="mailto:harisshakeel061@gmail.com"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
          >
            <span className="border-b border-foreground/20 pb-0.5 transition-colors group-hover:border-primary">
              harisshakeel061@gmail.com
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <motion.div variants={itemVariants} className="md:col-span-7">
          <ContactFormSection variant="embedded" />
        </motion.div>
      </motion.section>


    </div>
  )
}
