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
  Building2,
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
  // Every figure here has to be traceable to a specific build. The previous set
  // ("100% on-time delivery", "4.9/5 client satisfaction") was agency boilerplate
  // that nothing on this site backs up — unsourced numbers read as invented, and
  // one of them undoes the credibility of the work they sit next to.
  {
    label: "Message delivery",
    value: 3,
    suffix: "s",
    description: "Down from 20 seconds, after the send path was rebuilt. (Clusterden)",
    icon: Timer,
  },
  {
    label: "Apps reachable",
    value: 3000,
    suffix: "+",
    description: "What a single agent can act on through MCP, scoped per user. (MAVIS)",
    icon: Boxes,
  },
  {
    label: "Companies researched",
    value: 13000,
    suffix: "+",
    description: "Profiled and contact-verified without a human in the loop. (Metamorphix)",
    icon: Building2,
  },
  {
    label: "Factual accuracy",
    value: 95,
    suffix: "%",
    description: "On that research, held up by a second independent validation pass.",
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
            A snapshot of how we ship.
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
          className="font-hero-display text-[34px] leading-none tracking-tight [font-feature-settings:'tnum'] [font-variant-numeric:tabular-nums] md:text-[40px]"
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
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString(),
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
    <motion.span ref={ref} aria-label={String(to)}>
      {display}
    </motion.span>
  )
}
