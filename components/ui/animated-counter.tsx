"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  /** Numeric target. Use 0 if value is non-numeric (e.g. "99+"). */
  to: number
  /** Optional prefix (e.g. "$"). */
  prefix?: string
  /** Optional suffix (e.g. "+", "k", "★"). */
  suffix?: string
  /** Duration in milliseconds. Default 1600. */
  duration?: number
  /** Decimal places. Default 0. */
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(to * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
