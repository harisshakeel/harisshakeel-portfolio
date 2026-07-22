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
  Star,
  Timer,
  type LucideIcon,
} from "lucide-react"

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
  {
    label: "Projects shipped",
    value: 30,
    suffix: "+",
    description: "Across SaaS, internal tools, and marketing sites, and counting.",
    icon: Boxes,
  },
  {
    label: "Average response",
    value: 24,
    suffix: "h",
    description: "First reply on every new brief, weekdays or weekends.",
    icon: Timer,
  },
  {
    label: "On-time delivery",
    value: 100,
    suffix: "%",
    description: "Every milestone, every release. We don't move dates quietly.",
    icon: CheckCircle2,
  },
  {
    label: "Client satisfaction",
    value: 4.9,
    decimals: 1,
    suffix: "/5",
    description: "Across testimonials, reviews, and repeat-engagement signals.",
    icon: Star,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export function ProjectsMetrics() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
      {/* Ambient glows */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-primary/[0.07] blur-[140px]" />
        <div className="absolute right-0 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-primary/[0.05] blur-[160px]" />
      </div>

      {/* Faint grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
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
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-4xl">
            A snapshot of how we ship.
          </h2>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-2 border-y border-foreground/[0.06] md:grid-cols-4"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className={[
                // Row 2 (mobile): top border separating from row 1
                i >= 2 ? "border-t border-foreground/[0.06] md:border-t-0" : "",
                // Right column on mobile: left border to split the two cols
                i % 2 === 1 ? "border-l border-foreground/[0.06] md:border-l-0" : "",
                // Desktop: vertical dividers between all but the first column
                i > 0 ? "md:border-l md:border-foreground/[0.06]" : "",
              ].filter(Boolean).join(" ")}
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
        <Icon className="h-3.5 w-3.5 text-primary/80" strokeWidth={1.75} />
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground/50">
          {metric.label}
        </span>
      </div>

      {/* Value */}
      <div className="mt-5 flex items-baseline gap-0.5">
        <span className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-foreground [font-feature-settings:'tnum'] [font-variant-numeric:tabular-nums] md:text-[40px]">
          {metric.prefix}
          <Counter to={metric.value} decimals={metric.decimals ?? 0} />
        </span>
        {metric.suffix && (
          <span className="text-lg font-medium leading-none tracking-tight text-primary/85 md:text-xl">
            {metric.suffix}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-[12.5px] leading-relaxed text-foreground/70">
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
