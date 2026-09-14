"use client"

import { useEffect, useRef, useState } from "react"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Keeps ScrollTrigger in step with Lenis. Lives inside <ReactLenis> so the hook
// can reach the instance through context.
function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update())
  return null
}

// Lenis drives page scroll; GSAP's ticker drives Lenis. Running both RAF loops
// separately makes ScrollTrigger read stale positions, so `autoRaf` is off and
// the single gsap.ticker loop advances Lenis instead.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<LenisRef>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    // ReactLenis builds its instance in an effect, so the ref is still empty on
    // the first pass. Read it per frame rather than capturing it once, or the
    // ticker never gets attached and — with autoRaf off — scrolling dies.
    function update(time: number) {
      // gsap.ticker reports seconds, Lenis expects milliseconds.
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    // Lag smoothing would let the ticker skip frames and desync Lenis.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      gsap.ticker.lagSmoothing(500, 33)
    }
  }, [reducedMotion])

  // Hand scrolling back to the browser when the visitor asks for less motion.
  if (reducedMotion) return <>{children}</>

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, anchors: true }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
