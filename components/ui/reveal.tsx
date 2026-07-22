"use client"

import { motion } from "framer-motion"
import { type ReactNode } from "react"

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface RevealProps {
  children: ReactNode
  delay?: number
  /** Y-axis offset before entering. Default 28px. */
  y?: number
  /** Animation duration in seconds. Default 0.9. */
  duration?: number
  className?: string
  /**
   * Use `mount` for elements that are always in the initial viewport
   * (e.g. hero), fires immediately. Use `viewport` (default) for
   * scroll-triggered reveals.
   */
  trigger?: "viewport" | "mount"
}

/**
 * Section-level fade + slide-up + soft blur reveal for premium loading transitions.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.9,
  className,
  trigger = "viewport",
}: RevealProps) {
  const initial = { opacity: 0, y, scale: 0.985, filter: "blur(6px)" }
  const target = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
  const transition = { duration, ease: easeOut, delay }

  if (trigger === "mount") {
    return (
      <motion.div
        initial={initial}
        animate={target}
        transition={transition}
        style={{ willChange: "transform, opacity, filter" }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      style={{ willChange: "transform, opacity, filter" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
