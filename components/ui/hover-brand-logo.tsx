"use client"

import { useState, type ComponentType, type SVGProps } from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface BrandItem {
  id: string
  name: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

interface Props {
  /** Small label shown above the animated brand name */
  eyebrow?: string
  /** Default text shown when nothing is hovered */
  defaultLabel?: string
  brands: BrandItem[]
}

export default function HoverBrandLogo({
  eyebrow = "Built with",
  defaultLabel = "modern tooling",
  brands,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeBrand = brands.find((b) => b.id === hoveredId)

  // Use the longest brand name as the invisible spacer so the layout
  // doesn't jitter as different brands swap in.
  const longest = [defaultLabel, ...brands.map((b) => b.name)].reduce(
    (a, b) => (b.length > a.length ? b : a),
    "",
  )

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-8 lg:gap-16">
      {/* Left: text */}
      <div className="w-full flex-shrink-0 text-center sm:w-auto sm:text-left">
        <p className="mb-1 text-sm font-medium tracking-tight text-muted-foreground sm:text-base">
          {eyebrow}
        </p>
        <div className="relative">
          {/* Invisible spacer pinned to the longest possible label */}
          <p
            aria-hidden
            className="pointer-events-none select-none whitespace-nowrap text-2xl font-semibold leading-none tracking-[-0.02em] opacity-0 sm:leading-tight md:text-3xl lg:text-4xl"
          >
            {longest}
          </p>
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredId ?? "default"}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="whitespace-nowrap text-2xl font-semibold leading-none tracking-[-0.02em] text-primary sm:leading-tight md:text-3xl lg:text-4xl"
              >
                {activeBrand?.name ?? defaultLabel}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: icon grid */}
      <div className="grid w-full grid-cols-4 items-center justify-center gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-end sm:gap-2">
        {brands.map(({ id, name, Icon }) => {
          const isActive = hoveredId === id
          const isDimmed = hoveredId !== null && !isActive
          return (
            <button
              key={id}
              type="button"
              aria-label={name}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className={[
                "flex items-center justify-center rounded-lg border p-2.5 transition-all duration-200 sm:p-3 lg:p-3.5",
                isActive
                  ? "border-foreground/30 bg-foreground/5 text-foreground"
                  : "border-transparent text-foreground/30 hover:text-foreground/50",
                isDimmed ? "opacity-40" : "",
              ].join(" ")}
            >
              <Icon className="h-7 w-7 sm:h-6 sm:w-6" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
