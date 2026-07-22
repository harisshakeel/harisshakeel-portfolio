"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Animated light/dark toggle. A single icon button whose sun morphs into a
 * moon (and back) on click. Honors prefers-reduced-motion (instant swap) and
 * guards against hydration mismatch by rendering a neutral placeholder until
 * mounted. Theme persistence is handled by next-themes.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  const base = cn(
    "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
    "text-foreground/85 transition-colors hover:bg-foreground/[0.06] hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  )

  // Pre-hydration placeholder keeps layout stable and avoids a theme flash.
  if (!mounted) {
    return (
      <button type="button" aria-hidden tabIndex={-1} className={base}>
        <span className="h-[18px] w-[18px]" />
      </button>
    )
  }

  const duration = reduceMotion ? 0 : 0.5
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={base}
    >
      <span className="relative h-[18px] w-[18px]">
        {/* Sun: rays + core. Hidden (rotated/scaled out) in dark mode. */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-[18px] w-[18px]"
          initial={false}
          animate={{
            rotate: isDark ? -90 : 0,
            scale: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration, ease }}
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </motion.svg>

        {/* Moon crescent. Hidden (rotated/scaled out) in light mode. */}
        <motion.svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute inset-0 h-[18px] w-[18px]"
          initial={false}
          animate={{
            rotate: isDark ? 0 : 90,
            scale: isDark ? 1 : 0,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration, ease }}
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </motion.svg>
      </span>
    </button>
  )
}
