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

const dividerVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0.6 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.9, ease: easeOut },
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
            01, Work with us
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl lg:text-6xl"
          >
            Become a Client.
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Tell us about your project, a website, an app, an automation, or
            something we haven&apos;t thought of yet. We&apos;ll get back within
            24 hours.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="mailto:contact@twopixel.org"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
          >
            <span className="border-b border-foreground/20 pb-0.5 transition-colors group-hover:border-primary">
              contact@twopixel.org
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <motion.div variants={itemVariants} className="md:col-span-7">
          <ContactFormSection variant="embedded" />
        </motion.div>
      </motion.section>

      <motion.div
        variants={dividerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="h-px w-full origin-center bg-foreground/[0.06]"
      />

      {/* ── Join Us ────────────────────────────────────────────────── */}
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
            02, Careers
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-semibold tracking-[-0.02em] text-foreground md:text-5xl lg:text-6xl"
          >
            Join Us.
          </motion.h2>
        </div>

        <div className="md:col-span-7">
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Work from anywhere. Be part of a small, ambitious team shipping
            world-class digital products for global clients. We&apos;re always
            open to talented designers, engineers, and operators.
          </motion.p>
          <motion.a
            variants={itemVariants}
            href="mailto:contact@twopixel.org?subject=Careers"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/90 transition-colors hover:text-primary"
          >
            <span className="border-b border-foreground/20 pb-0.5 transition-colors group-hover:border-primary">
              View open positions
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </motion.section>

    </div>
  )
}
