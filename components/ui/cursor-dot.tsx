"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type CursorState = "default" | "hover" | "cta" | "explore" | "view"

const LABEL: Partial<Record<CursorState, string>> = {
  explore: "EXPLORE",
  view: "VIEW",
  cta: "LET'S TALK",
}

/**
 * Custom cursor — a small ivory dot that trails the pointer, expands over
 * nav links (`data-cursor`) and the hero's large outlined words
 * (`data-cursor="explore"`) or orbiting role labels (`data-cursor="view"`)
 * with a text label inside the expanded circle, and shrinks to a small
 * dark dot over the chartreuse CTA (`data-cursor="cta"`, label shown
 * beside it instead — full-size ivory would be nearly invisible against
 * that fill, since mix-blend-difference against a light accent colour
 * barely shifts it). Disabled on touch/coarse pointers and when the user
 * prefers reduced motion, in which case the native cursor is used.
 */
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<CursorState>("default")

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
      const cursorTarget = el?.closest("[data-cursor]") as HTMLElement | null
      const kind = cursorTarget?.dataset.cursor
      if (kind === "cta" || kind === "explore" || kind === "view") setState(kind)
      else if (cursorTarget || el?.closest("a, button, input, textarea, [role='button']")) setState("hover")
      else setState("default")
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

  const label = LABEL[state]
  const big = state === "hover" || state === "explore" || state === "view"

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full transition-[width,height,background-color] duration-200 ease-out",
        state === "cta"
          ? "h-2 w-2 bg-[#161A15]"
          : big
            ? "h-16 w-16 bg-[#f2efe6] mix-blend-difference"
            : "h-2 w-2 bg-[#f2efe6] mix-blend-difference",
      )}
    >
      {label && big && (
        <span className="font-mono text-[9px] tracking-[0.15em] text-[#10120F] uppercase">{label}</span>
      )}
      {label && state === "cta" && (
        <span className="absolute left-4 font-mono text-[9px] tracking-[0.15em] whitespace-nowrap text-[#f2efe6] uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
