"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { TransitionLink } from "@/components/ui/transition-link"

export interface ShowcaseProject {
  slug: string
  title: string
  description: string
  year: string
  logo: string
}

interface Props {
  projects: ShowcaseProject[]
  /** Section eyebrow shown above the list. Pass null to hide. */
  label?: string | null
}

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor

export function ProjectShowcase({ projects, label = "Selected work" }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  function handleMouseMove(e: ReactMouseEvent) {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
  }

  function handleMouseEnter(index: number) {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  function handleMouseLeave() {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  const containerLeft = containerRef.current?.getBoundingClientRect().left ?? 0
  const containerTop = containerRef.current?.getBoundingClientRect().top ?? 0

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full"
    >
      {label ? (
        <p className="mb-10 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </p>
      ) : null}

      {/* Cursor-following preview */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-primary/10 md:block"
        style={{
          left: containerLeft,
          top: containerTop,
          transform: `translate3d(${smoothPosition.x + 24}px, ${smoothPosition.y - 110}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? "1" : "0.85",
          transition:
            "opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), scale 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="relative h-[200px] w-[300px] overflow-hidden bg-gradient-to-br from-white/[0.04] via-primary/[0.05] to-white/[0.02] backdrop-blur-sm">
          {/* Radial purple glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(168,85,247,0.22),transparent_70%)]"
          />
          {/* Faint grid pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]"
          />

          {/* Stack of logos, only the hovered one is visible */}
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? "scale(1)" : "scale(1.08)",
                filter: hoveredIndex === index ? "none" : "blur(8px)",
              }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm">
                <Image
                  src={project.logo}
                  alt={`${project.title} logo`}
                  width={80}
                  height={80}
                  className="h-12 w-12 object-contain p-1"
                />
              </div>
            </div>
          ))}

          {/* Bottom hairline */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <TransitionLink
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative border-t border-white/[0.07] py-6 transition-all duration-300 ease-out">
              {/* Hover wash */}
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-white/[0.025] transition-opacity duration-300 ease-out",
                  hoveredIndex === index ? "opacity-100" : "opacity-0",
                )}
              />

              <div className="relative mx-auto flex max-w-[1320px] items-start justify-between gap-4 px-6 md:px-10">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-foreground md:text-xl">
                      <span className="relative">
                        {project.title}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out",
                            hoveredIndex === index ? "w-full" : "w-0",
                          )}
                        />
                      </span>
                    </h3>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-all duration-300 ease-out",
                        hoveredIndex === index
                          ? "translate-x-0 translate-y-0 opacity-100"
                          : "-translate-x-2 translate-y-2 opacity-0",
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed transition-colors duration-300 ease-out md:text-[15px]",
                      hoveredIndex === index
                        ? "text-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {project.description}
                  </p>
                </div>

                <span
                  className={cn(
                    "font-mono text-xs tabular-nums transition-colors duration-300 ease-out",
                    hoveredIndex === index
                      ? "text-foreground/60"
                      : "text-muted-foreground",
                  )}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </TransitionLink>
        ))}
        <div className="border-t border-white/[0.07]" />
      </div>
    </section>
  )
}
