"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Brutalist custom cursor — a small cream dot that trails the pointer and
 * swells when hovering interactive elements (links, buttons, or anything
 * tagged with data-cursor). Disabled on touch/coarse pointers and when the
 * user prefers reduced motion, in which case the native cursor is used.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.classList.add("has-cursor-dot")

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { ...pos }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = e.target as HTMLElement | null
      setHovering(!!el?.closest("a, button, [data-cursor], input, textarea, [role='button']"))
    }

    const loop = () => {
      // Ease toward the pointer for a soft trailing feel.
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.body.classList.remove("has-cursor-dot")
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-[#f2efe6] mix-blend-difference",
        "transition-[width,height] duration-200 ease-out",
        hovering ? "h-10 w-10" : "h-3.5 w-3.5",
      )}
    />
  )
}
