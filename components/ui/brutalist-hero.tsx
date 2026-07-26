"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

interface BrutalistHeroProps {
  /** Set as the cover masthead — stacked Didone lines. */
  firstName: string
  lastName: string
  imageSrc: string
  imageAlt: string
  /** Clicking the portrait opens this URL (e.g. a booking link). */
  bookingHref: string
  /** Tooltip shown when hovering the portrait. */
  availabilityText: string
  /** The two cover lines. */
  leftLine: React.ReactNode
  rightLine: React.ReactNode
}

const EASE = [0.22, 1, 0.36, 1] as const

/*
 * Two layouts from one DOM:
 *   mobile  — portrait fashion cover: masthead top, subject rising full-bleed
 *             from the bottom edge, cover lines set over the photo.
 *   desktop — editorial split: masthead and cover lines in the left column,
 *             subject anchored bottom-right.
 *
 * Portrait sizing uses both axes at exactly 0.75 to match the source PNG. The
 * <img> is position:absolute under `fill`, so it contributes no height — if the
 * anchor ever loses its h-/w- rule it collapses to 0x0 and the subject vanishes
 * with no other symptom. Turbopack can serve a stale stylesheet after an edit,
 * which looks identical; clear .next and restart before suspecting the markup.
 */
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

  const coverLines = (
    <>
      <div className="border-t border-foreground/20 pt-3">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[4px] text-foreground/50">
          01 — Agentic AI
        </span>
        <p className="text-[15px] leading-relaxed text-foreground/80 md:text-lg">
          {leftLine}
        </p>
      </div>
      <div className="border-t border-foreground/20 pt-3">
        <span className="mb-2 block font-mono text-[10px] uppercase tracking-[4px] text-foreground/50">
          02 — Platforms
        </span>
        {/* pr clears the floating contact buttons pinned bottom-right on mobile */}
        <p className="pr-14 text-[15px] leading-relaxed text-foreground/80 md:pr-0 md:text-lg">
          {rightLine}
        </p>
      </div>
    </>
  )

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-background pt-24 text-foreground md:pt-28">
      {/* Ambient drifting glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,hsl(var(--glow)/0.09),transparent_65%)]" />
        <div className="hero-blob absolute left-[6%] top-1/3 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-[hsl(var(--glow)/0.05)] blur-[130px] [animation:hero-drift-a_26s_ease-in-out_infinite_alternate]" />
        <div className="hero-blob absolute right-[4%] bottom-[6%] h-[34rem] w-[34rem] rounded-full bg-[#22317a]/25 blur-[140px] [animation:hero-drift-b_32s_ease-in-out_infinite_alternate]" />
        <div className="hero-blob absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--glow)/0.035)] blur-[120px] [animation:hero-drift-c_22s_ease-in-out_infinite_alternate]" />
      </div>

      {/* Issue strip — the masthead furniture every cover carries. Same
          container as every other section (px-6 md:px-10 + max-w-7xl) so the
          hairlines align with the site grid. */}
      <div className="relative z-30 px-6 md:px-10">
        <motion.div
          variants={rise}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-y border-foreground/15 py-2 font-mono text-[9px] uppercase tracking-[2px] text-foreground/55 md:text-[10px] md:tracking-[4px]"
        >
          <span className="whitespace-nowrap">Portfolio</span>
          <span className="hidden sm:inline">Lahore · Pakistan</span>
          <span className="whitespace-nowrap">Available for work</span>
        </motion.div>
      </div>

      {/* Stage. No `relative` here or on the columns below — the mobile cover
          lines position against the section itself. Outer div carries the
          site's section padding, inner div the centered max-w-7xl container. */}
      <div className="flex flex-1 flex-col md:px-10">
        <div className="flex w-full flex-1 flex-col md:mx-auto md:grid md:max-w-7xl md:grid-cols-12 md:items-center md:gap-8">
          <div className="px-6 pt-6 text-center md:col-span-6 md:px-0 md:pt-0 md:text-left">
          {/* Masthead — Anton, the site's display face, stacked and sized in vw
              so it scales with its column. */}
          <motion.h1
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.25}
            className="relative z-30 select-none font-display uppercase leading-[0.84] tracking-tight text-foreground"
          >
            <span className="block text-[22vw] md:text-[min(12vw,9.6rem)]">{firstName}</span>
            <span className="block text-[22vw] md:text-[min(12vw,9.6rem)]">{lastName}</span>
          </motion.h1>

          {/* Cover lines: over the photo on mobile, in the column on desktop */}
          <motion.div
            variants={rise}
            initial="hidden"
            animate="visible"
            custom={0.7}
            className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-1 gap-5 px-6 pb-8 text-left md:static md:mt-10 md:max-w-lg md:gap-7 md:px-0 md:pb-0"
          >
            {coverLines}
          </motion.div>
          </div>
        </div>
      </div>

      {/* Subject — bottom-centre on mobile, bottom-right on desktop. Cropped by
          the page edge rather than faded, the way a cover subject is. */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 -translate-x-1/2 md:left-auto md:right-[max(4vw,calc((100vw-80rem)/2))] md:translate-x-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
          className="group pointer-events-auto relative"
          data-cursor
        >
          {/* Soft halo so the cutout separates from the masthead. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-16%] bg-[radial-gradient(46%_42%_at_50%_44%,rgba(5,7,15,0.6),transparent_72%)] opacity-70 blur-xl transition-opacity duration-700 group-hover:opacity-90"
          />
          <a
            ref={cardRef}
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a call with Haris"
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            /* Both axes in svh, at exactly 0.75, to match the source PNG so
               there is never any letterboxing to reveal. */
            className="relative block h-[68svh] w-[51svh] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.02] md:h-[76svh] md:w-[57svh]"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 57vh, 39vh"
              className="object-contain object-bottom drop-shadow-[0_34px_70px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out md:grayscale md:group-hover:grayscale-0"
            />
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

      {/* Mobile-only scrim so the cover lines stay legible over the photo.
          Same layer as the subject, later in the DOM, so it sits over him. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-80 bg-gradient-to-t from-background via-background/85 to-transparent md:hidden"
      />
    </section>
  )
}
