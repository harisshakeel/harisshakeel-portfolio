"use client"

import React, { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

interface InfiniteGridHeroProps {
  eyebrow?: string
  title?: React.ReactNode
  description?: React.ReactNode
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

const GRID_SIZE = 48

const GridPattern = ({
  offsetX,
  offsetY,
  size,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
  size: number
}) => {
  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id="infinite-grid-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-grid-pattern)" />
    </svg>
  )
}

export function InfiniteGridHero({
  eyebrow = "Two-founder studio",
  title = (
    <>
      We design <span className="text-primary">and deploy</span>.
    </>
  ),
  description = (
    <>
      Web, mobile, AI, and SaaS products, shipped end-to-end by a small team
      that builds for a living.
    </>
  ),
  primaryCta = { label: "Get Started", href: "/contact" },
  secondaryCta = { label: "View Projects", href: "/projects" },
  className,
}: InfiniteGridHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-1000)
    mouseY.set(-1000)
  }

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % GRID_SIZE)
    gridOffsetY.set((gridOffsetY.get() + 0.5) % GRID_SIZE)
  })

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} size={GRID_SIZE} />
      </div>

      <motion.div
        className="absolute inset-0 z-0 opacity-50"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} size={GRID_SIZE} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[-20%] top-[-20%] h-[40%] w-[40%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] h-[20%] w-[20%] rounded-full bg-primary/40 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] h-[40%] w-[40%] rounded-full bg-blue-500/30 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-6 px-4 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {eyebrow}
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground drop-shadow-sm md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
          <Link
            href={primaryCta.href}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:shadow-primary/40"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryCta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-8 py-3 font-medium text-foreground backdrop-blur-md transition-all hover:scale-[1.03] hover:bg-muted/40"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InfiniteGridHero
