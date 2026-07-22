"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface RailwayStation {
  /** Element id to scroll to and observe */
  id: string
  /** Short label (kept for a11y / future use) */
  label: string
}

interface ScrollRailwayProps {
  stations: RailwayStation[]
  /** Hide the rail until scroll has moved at least N pixels (avoids flash on hero) */
  showAfterPx?: number
}

/**
 * Vertical "railway" spine inspired by railway.com.
 *
 * - A thin vertical track sits inside the gutter alongside the content.
 * - A detailed SVG train carriage (windows, tapered nose) rides the track,
 *   sliding down as the user scrolls.
 * - The track behind the carriage glows in primary; ahead of it stays dim.
 * - Subtle station markers indicate each major section; click to jump.
 * - Hidden under `xl:` to keep narrower screens uncluttered.
 */
export function ScrollRailway({ stations, showAfterPx = 240 }: ScrollRailwayProps) {
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    mass: 0.5,
  })

  const [stationFractions, setStationFractions] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const compute = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const fractions = stations.map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return 0
        const absoluteTop = el.getBoundingClientRect().top + window.scrollY
        const target = absoluteTop - window.innerHeight * 0.4
        return Math.max(0, Math.min(1, target / scrollable))
      })
      setStationFractions(fractions)
    }

    compute()
    const timers = [setTimeout(compute, 300), setTimeout(compute, 1200)]
    window.addEventListener("resize", compute)
    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("resize", compute)
    }
  }, [stations])

  useEffect(() => {
    const updateActive = (v: number) => {
      let idx = -1
      for (let i = 0; i < stationFractions.length; i++) {
        if (v >= stationFractions[i] - 0.005) idx = i
      }
      setActiveIndex(idx)
    }
    updateActive(smooth.get())
    return smooth.on("change", updateActive)
  }, [smooth, stationFractions])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfterPx)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [showAfterPx])

  const fillHeight = useTransform(smooth, [0, 1], ["0%", "100%"])
  const carriageTop = useTransform(smooth, [0, 1], ["0%", "100%"])

  return (
    <motion.aside
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed top-0 z-30 hidden h-screen items-center xl:flex"
      style={{
        // Sit just outside the 1320px content max-width
        left: "max(2rem, calc((100vw - 1320px) / 2 - 60px))",
      }}
    >
      <div className="relative h-[68vh] w-12">
        {/* ── Base track ───────────────────────────────────────── */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-white/[0.02] via-white/[0.10] to-white/[0.02]" />

        {/* ── Progress fill ────────────────────────────────────── */}
        <motion.div
          style={{ height: fillHeight }}
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/0 via-primary/45 to-primary"
        />
        {/* Trail bloom */}
        <motion.div
          style={{ height: fillHeight }}
          className="absolute left-1/2 top-0 w-[3px] -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent_0%,rgba(168,85,247,0.4)_70%,rgba(168,85,247,0.85)_100%)] blur-[5px]"
        />

        {/* ── Stations ─────────────────────────────────────────── */}
        {stations.map((station, i) => {
          const fraction = stationFractions[i] ?? 0
          const isActive = i === activeIndex
          const isPassed = i < activeIndex

          return (
            <button
              type="button"
              key={station.id}
              onClick={() =>
                document
                  .getElementById(station.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              aria-label={`Jump to ${station.label}`}
              className="pointer-events-auto group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${fraction * 100}%` }}
            >
              <span className="absolute -inset-3" />
              <span
                className={cn(
                  "relative block h-1.5 w-1.5 rounded-full ring-1 transition-all duration-500",
                  isActive
                    ? "scale-[1.6] bg-white ring-primary/70 shadow-[0_0_10px_2px_rgba(168,85,247,0.55)]"
                    : isPassed
                      ? "bg-primary ring-primary/60"
                      : "bg-background ring-white/25 group-hover:ring-white/55",
                )}
              />
            </button>
          )
        })}

        {/* ── Train carriage ───────────────────────────────────── */}
        <motion.div
          style={{ top: carriageTop }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <TrainCarriage />
        </motion.div>
      </div>
    </motion.aside>
  )
}

/* ─────────────────────────────────────────────────────────────
 * Stylized vertical train carriage, outlined, illustration feel.
 * Top coupler → body with portholes → tapered shinkansen nose.
 * ───────────────────────────────────────────────────────────── */
function TrainCarriage() {
  return (
    <div className="relative">
      {/* Soft halo behind the carriage */}
      <div className="absolute left-1/2 top-1/2 h-32 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />

      <svg
        width="34"
        height="118"
        viewBox="0 0 34 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
      >
        {/* Top coupler, small bar above carriage */}
        <line
          x1="17"
          y1="0"
          x2="17"
          y2="6"
          stroke="rgba(168,85,247,0.7)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="13"
          y="6"
          width="8"
          height="3"
          rx="1.5"
          fill="rgba(168,85,247,0.85)"
        />

        {/* Roof, slightly rounded top */}
        <path
          d="M5 18 Q 5 11, 12 11 L 22 11 Q 29 11, 29 18 L 29 22 L 5 22 Z"
          fill="rgba(12,13,16,0.95)"
          stroke="rgba(168,85,247,0.85)"
          strokeWidth="1.3"
        />
        {/* Roof highlight */}
        <line
          x1="9"
          y1="14"
          x2="25"
          y2="14"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* Carriage body */}
        <path
          d="M5 22 L 5 88 Q 5 96, 11 102 L 17 108 L 23 102 Q 29 96, 29 88 L 29 22 Z"
          fill="rgba(12,13,16,0.98)"
          stroke="rgba(168,85,247,0.85)"
          strokeWidth="1.3"
        />

        {/* Window strip background */}
        <rect
          x="9"
          y="28"
          width="16"
          height="50"
          rx="2"
          fill="rgba(168,85,247,0.08)"
        />

        {/* Portholes, windows running down */}
        {[34, 44, 54, 64, 74].map((cy) => (
          <g key={cy}>
            <circle cx="17" cy={cy} r="3" fill="rgba(168,85,247,0.25)" />
            <circle
              cx="17"
              cy={cy}
              r="3"
              fill="none"
              stroke="rgba(168,85,247,0.9)"
              strokeWidth="1"
            />
            {/* Window glint */}
            <circle cx="15.8" cy={cy - 1} r="0.7" fill="rgba(255,255,255,0.55)" />
          </g>
        ))}

        {/* Lower body detail line */}
        <line
          x1="7"
          y1="84"
          x2="27"
          y2="84"
          stroke="rgba(168,85,247,0.55)"
          strokeWidth="0.8"
        />

        {/* Headlight at the tapered nose */}
        <ellipse
          cx="17"
          cy="100"
          rx="3"
          ry="2"
          fill="rgba(255,255,255,0.95)"
        />
        <ellipse
          cx="17"
          cy="100"
          rx="5"
          ry="3"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.6"
        />
      </svg>

      {/* Headlight bloom */}
      <div className="absolute left-1/2 top-[100px] h-3 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-md" />
    </div>
  )
}

export default ScrollRailway
