"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react"

interface InvertedCursorProps {
  /** Element that scopes the cursor effect, only active while mouse is inside */
  containerRef: RefObject<HTMLElement | null>
  size?: number
  /** Optional small label rendered inside the cursor (uppercase) */
  label?: string
}

/**
 * Large white circle with `mix-blend-difference` that follows the cursor
 * inside a scoped container. Uses requestAnimationFrame + lerp for the
 * signature trailing motion. Skips itself on touch / hover-less devices.
 */
export function InvertedCursor({
  containerRef,
  size = 80,
  label,
}: InvertedCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const posRef = useRef({ x: -size * 2, y: -size * 2 })
  const targetRef = useRef({ x: -size * 2, y: -size * 2 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      return
    }

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    const onEnter = (e: MouseEvent) => {
      // Snap the cursor to the entry point so it doesn't slide in from
      // wherever it was last positioned.
      targetRef.current = { x: e.clientX, y: e.clientY }
      posRef.current = { x: e.clientX - size / 2, y: e.clientY - size / 2 }
      setVisible(true)
    }
    const onLeave = () => {
      setVisible(false)
    }

    container.addEventListener("mousemove", onMove)
    container.addEventListener("mouseenter", onEnter)
    container.addEventListener("mouseleave", onLeave)

    const tick = () => {
      const targetX = targetRef.current.x - size / 2
      const targetY = targetRef.current.y - size / 2
      posRef.current = {
        x: posRef.current.x + (targetX - posRef.current.x) * 0.18,
        y: posRef.current.y + (targetY - posRef.current.y) * 0.18,
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener("mousemove", onMove)
      container.removeEventListener("mouseenter", onEnter)
      container.removeEventListener("mouseleave", onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [containerRef, size])

  const style: CSSProperties = {
    width: size,
    height: size,
    opacity: visible ? 1 : 0,
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full bg-white mix-blend-difference transition-opacity duration-300"
      style={style}
    >
      {label ? (
        <span className="select-none font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-black">
          {label}
        </span>
      ) : null}
    </div>
  )
}
