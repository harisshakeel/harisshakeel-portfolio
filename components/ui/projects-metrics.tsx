"use client"

import { useEffect, useRef } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion"
import {
  Boxes,
  CheckCircle2,
  Timer,
  type LucideIcon,
} from "lucide-react"

import { PALETTE } from "@/lib/palette"

interface Metric {
  label: string
  /** Numeric target the counter animates to */
  value: number
  /** Decimal places (e.g. 1 for "4.9") */
  decimals?: number
  /** Prefix shown before the number (e.g. "$") */
  prefix?: string
  /** Suffix shown after the number (e.g. "+", "h", "%", "/5") */
  suffix?: string
  description: string
  icon: LucideIcon
}

const metrics: Metric[] = [
  // Every figure has to be one Haris has confirmed and can explain in an
  // interview, each tagged with the build it came from.
  {
    label: "Message delivery",
    value: 3,
    suffix: "s",
    description: "Down from 20 seconds after the send path was rebuilt. (Clusterden)",
    icon: Timer,
  },
  {
    label: "Agent tools",
    // 10K rather than 10,000: this display face cannot fit "10,000+" in a
    // half-width cell on a phone.
    value: 10,
    suffix: "K+",
    description: "Tools across 3,000+ apps that MAVIS agents can use, through MCP. (MAVIS)",
    icon: Boxes,
  },
  {
    label: "Try-on simulation",
    value: 30,
    suffix: "s",
    description: "Down from 5 minutes per simulation. (Xision)",
    icon: Timer,
  },
  {
    label: "Garment accuracy",
    value: 90,
    suffix: "%",
    description: "3D garments matched to the real ones on colour, measurements and design. (Xision)",
    icon: CheckCircle2,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function ProjectsMetrics() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24" style={{ backgroundColor: PALETTE.obsidian }}>
      {/* Ambient chartreuse glows — matches the hero/nav accent, not the old --primary */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ backgroundColor: `${PALETTE.chartreuse}12` }}
        />
        <div
          className="absolute right-0 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full blur-[160px]"
          style={{ backgroundColor: `${PALETTE.chartreuse}0d` }}
        />
      </div>

      {/* Faint grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, ${PALETTE.ivory} 1px, transparent 1px), linear-gradient(to bottom, ${PALETTE.ivory} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-6xl space-y-10 md:space-y-14">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-hero-display text-3xl uppercase tracking-tight md:text-4xl" style={{ color: PALETTE.ivory }}>
            Numbers from the work.
          </h2>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 border-y md:grid-cols-4"
          style={{ borderColor: PALETTE.borderIvory }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className={[
                // Row 2 (mobile): top border separating from row 1
                i >= 2 ? "border-t md:border-t-0" : "",
                // Right column on mobile: left border to split the two cols
                i % 2 === 1 ? "border-l md:border-l-0" : "",
                // Desktop: vertical dividers between all but the first column
                i > 0 ? "md:border-l" : "",
              ].filter(Boolean).join(" ")}
              style={{ borderColor: PALETTE.borderIvory }}
            >
              <MetricCard metric={metric} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Metric card ────────────────────────────────────────────── */

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon
  return (
    <div className="group flex h-full flex-col px-5 py-7 md:px-6 md:py-8">
      {/* Label row */}
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} style={{ color: PALETTE.chartreuse }} />
        <span className="font-hero-sub text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: `${PALETTE.ivory}80` }}>
          {metric.label}
        </span>
      </div>

      {/* Value */}
      <div className="mt-5 flex items-baseline gap-0.5">
        <span
          className="font-hero-display text-[28px] leading-none tracking-tight [font-feature-settings:'tnum'] [font-variant-numeric:tabular-nums] sm:text-[34px] md:text-[40px]"
          style={{ color: PALETTE.ivory }}
        >
          {metric.prefix}
          <Counter to={metric.value} decimals={metric.decimals ?? 0} />
        </span>
        {metric.suffix && (
          <span className="font-hero-display text-lg leading-none tracking-tight md:text-xl" style={{ color: PALETTE.chartreuse }}>
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="font-hero-sub mt-4 text-[12.5px] leading-relaxed" style={{ color: PALETTE.sage }}>
        {metric.description}
      </p>
    </div>
  )
}

/* ── Counter that counts up when scrolled into view ──────────── */

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  // Bottom edge only. A bare "-80px" shrinks the root on all four sides, and
  // on a phone the left column sits ~44px from the viewport edge, so its
  // counters never intersected the shrunken box and stayed stuck at 0.
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString("en-US"),
  )

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [inView, to, count])

  return (
    <motion.span ref={ref} aria-label={to.toLocaleString("en-US")}>
      {display}
    </motion.span>
  )
}
