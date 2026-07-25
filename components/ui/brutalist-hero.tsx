"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

interface BrutalistHeroProps {
  /** Rendered as two stacked lines of giant display type. */
  firstName: string
  lastName: string
  imageSrc: string
  imageAlt: string
  /** Clicking the portrait opens this URL (e.g. a booking link). */
  bookingHref: string
  /** Tooltip shown when hovering the portrait card. */
  availabilityText: string
  /** Bottom-left and bottom-right one-liners. */
  leftLine: React.ReactNode
  rightLine: React.ReactNode
}

const EASE = [0.22, 1, 0.36, 1] as const

export function BrutalistHero({
  firstName,
  lastName,
  imageSrc,
  imageAlt,
  bookingHref,
  availabilityText,
  leftLine,
  rightLine,
}: BrutalistHeroProps) {
  const rise: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: (d: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: EASE, delay: d },
    }),
  }

  // The availability label follows the cursor across the portrait.
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [tip, setTip] = useState({ x: 0, y: 0, show: false })

  const onCardMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, show: true })
  }
  const onCardLeave = () => setTip((t) => ({ ...t, show: false }))

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background pt-24 text-foreground md:pt-28">
      {/* Ambient drifting glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Fixed top spotlight for anchoring (theme-aware) */}
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,hsl(var(--glow)/0.09),transparent_65%)]" />
        {/* Slow-drifting glow, upper-left */}
        <div className="hero-blob absolute left-[6%] top-1/3 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[hsl(var(--glow)/0.05)] blur-[130px] [animation:hero-drift-a_26s_ease-in-out_infinite_alternate]" />
        {/* Slow-drifting navy glow, lower-right (ties to the card hover) */}
        <div className="hero-blob absolute right-[4%] bottom-[6%] h-[34rem] w-[34rem] rounded-full bg-[#22317a]/25 blur-[140px] [animation:hero-drift-b_32s_ease-in-out_infinite_alternate]" />
        {/* Faint pulsing core behind the name */}
        <div className="hero-blob absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--glow)/0.035)] blur-[120px] [animation:hero-drift-c_22s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Center stage — giant name behind, portrait card in front */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        {/* The name wrapper is sized to the name itself, so the card overlay
            below centers on the name — not on a wider container. */}
        <div className="relative">
          <motion.h1
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="select-none text-center font-display uppercase leading-[0.82] tracking-[-0.01em] text-foreground"
          >
            <span className="block text-[22vw] md:text-[16vw] lg:text-[13rem]">
              {firstName}
            </span>
            <span className="block text-[22vw] md:text-[16vw] lg:text-[13rem]">
              {lastName}
            </span>
          </motion.h1>

          {/* Portrait card — centered on the name, offset down to overlap the
              second line; grayscale → color + tooltip on hover */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {/* Static downward offset lives on this wrapper — framer-motion
                writes its own inline transform on the motion element, which
                would otherwise cancel a Tailwind translate here. */}
            <div className="translate-y-[58%] md:translate-y-[64%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
              className="group pointer-events-auto"
              data-cursor
            >
              <a
                ref={cardRef}
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a call with Haris"
                onMouseMove={onCardMove}
                onMouseLeave={onCardLeave}
                className="relative block h-[184px] w-[158px] overflow-hidden rounded-[24px] bg-neutral-700/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:shadow-[0_50px_130px_-25px_rgba(14,22,60,0.9)] group-hover:ring-white/20 md:h-[250px] md:w-[214px]"
              >
                {/* Deep midnight-navy gradient revealed on hover */}
                <div className="absolute inset-0 bg-[radial-gradient(135%_115%_at_50%_-15%,#1c2c5e_0%,#0c1330_45%,#05070f_100%)] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
                {/* Vignette to push depth toward the edges */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_35%,transparent_45%,rgba(0,0,0,0.55)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="258px"
                  className="object-contain object-bottom grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                />
                {/* Fine top sheen + inner edge highlight for a glossy finish */}
                <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_30%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),inset_0_0_0_1px_rgba(120,150,255,0.12)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </a>

              {/* Availability label — follows the cursor across the portrait */}
              <div
                style={{ left: tip.x, top: tip.y }}
                className={cn(
                  "pointer-events-none absolute z-30 w-max -translate-x-1/2 -translate-y-[135%] whitespace-nowrap rounded-2xl bg-[#05070f]/95 px-5 py-3 text-center text-sm font-medium text-[#f2efe6] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur transition-opacity duration-200 ease-out md:text-base",
                  tip.show ? "opacity-100" : "opacity-0",
                )}
              >
                I&apos;m open to work —{" "}
                <span className="bg-[linear-gradient(180deg,#243a86,#111b45)] px-1.5 py-0.5 font-semibold text-[#f2efe6] ring-1 ring-white/10">
                  {availabilityText}
                </span>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom one-liners */}
      <div className="relative z-30 grid grid-cols-1 gap-6 px-6 pb-8 md:grid-cols-2 md:px-10 md:pb-12">
        <motion.p
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="max-w-md text-[15px] leading-relaxed text-foreground/80 md:text-lg"
        >
          {leftLine}
        </motion.p>
        <motion.p
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="max-w-md text-[15px] leading-relaxed text-foreground/80 md:justify-self-end md:text-right md:text-lg"
        >
          {rightLine}
        </motion.p>
      </div>
    </section>
  )
}
