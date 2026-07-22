"use client"

import Link from "next/link"
import { ReactNode, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface VerticalMarqueeProps {
  children: ReactNode
  pauseOnHover?: boolean
  reverse?: boolean
  className?: string
  speed?: number
}

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
}: VerticalMarqueeProps) {
  return (
    <div
      className={cn("group flex flex-col overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

interface CtaWithTextMarqueeProps {
  eyebrow?: string
  title: string
  description: string
  primary: { label: string; href: string; external?: boolean }
  secondary?: { label: string; href: string; external?: boolean }
  marqueeItems: string[]
  speed?: number
}

export function CtaWithTextMarquee({
  title,
  description,
  primary,
  secondary,
  marqueeItems,
  speed = 22,
}: CtaWithTextMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = marqueeRef.current
    if (!container) return

    let frame = 0
    const update = () => {
      const items = container.querySelectorAll(".marquee-item")
      const containerRect = container.getBoundingClientRect()
      const centerY = containerRect.top + containerRect.height / 2
      items.forEach((item) => {
        const rect = item.getBoundingClientRect()
        const itemCenter = rect.top + rect.height / 2
        const distance = Math.abs(centerY - itemCenter)
        const max = containerRect.height / 2
        const normalized = Math.min(distance / max, 1)
        ;(item as HTMLElement).style.opacity = (1 - normalized * 0.75).toString()
      })
      frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left content */}
          <div className="space-y-8 max-w-xl animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <PrimaryAction action={primary} />
              {secondary && <SecondaryAction action={secondary} />}
            </div>
          </div>

          {/* Right marquee */}
          <div
            ref={marqueeRef}
            className="relative h-[480px] lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <VerticalMarquee speed={speed} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight py-6 marquee-item text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>

              <div className="pointer-events-none absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background via-background/60 to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrimaryAction({
  action,
}: {
  action: { label: string; href: string; external?: boolean }
}) {
  const className =
    "group relative px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-primary/30"
  const inner = (
    <>
      <span className="relative z-10">{action.label}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    </>
  )
  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={action.href} className={className}>
      {inner}
    </Link>
  )
}

function SecondaryAction({
  action,
}: {
  action: { label: string; href: string; external?: boolean }
}) {
  const className =
    "group relative px-6 py-3 bg-secondary text-secondary-foreground rounded-md font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border"
  const inner = (
    <>
      <span className="relative z-10">{action.label}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
    </>
  )
  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={action.href} className={className}>
      {inner}
    </Link>
  )
}
