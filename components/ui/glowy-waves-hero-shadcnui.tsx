"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

type Point = { x: number; y: number }

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  color: string
  opacity: number
}

const highlightPills = ["Web Apps", "Mobile", "AI Automations", "UI/UX"] as const

const heroStats: { label: string; value: string }[] = [
  { label: "Businesses served", value: "50+" },
  { label: "Projects shipped", value: "80+" },
  { label: "Years of craft", value: "5+" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 } },
}

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const wavePalette: WaveConfig[] = [
      { offset: 0,              amplitude: 70, frequency: 0.003,  color: "rgba(168,85,247,0.8)",  opacity: 0.45 },
      { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: "rgba(124,58,237,0.7)",  opacity: 0.35 },
      { offset: Math.PI,       amplitude: 60, frequency: 0.0034, color: "rgba(192,132,252,0.65)", opacity: 0.3  },
      { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: "rgba(139,92,246,0.5)",  opacity: 0.25 },
      { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: "rgba(216,180,254,0.3)",  opacity: 0.2  },
    ]

    const bgTop    = "hsl(210,11%,7%)"
    const bgBottom = "hsl(210,11%,5%)"

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mouseInfluence  = prefersReducedMotion ? 10 : 70
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing       = prefersReducedMotion ? 0.04 : 0.1

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    const recenterMouse = () => {
      const c = { x: canvas.width / 2, y: canvas.height / 2 }
      mouseRef.current = c; targetMouseRef.current = c
    }
    const handleResize = () => { resizeCanvas(); recenterMouse() }
    const handleMouseMove = (e: MouseEvent) => { targetMouseRef.current = { x: e.clientX, y: e.clientY } }
    const handleMouseLeave = () => recenterMouse()

    resizeCanvas(); recenterMouse()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const drawWave = (wave: WaveConfig) => {
      ctx.save(); ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x
        const dy = canvas.height / 2 - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / influenceRadius)
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset)
        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) +
          mouseEffect
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.lineWidth = 2.5; ctx.strokeStyle = wave.color; ctx.globalAlpha = wave.opacity
      ctx.shadowBlur = 35; ctx.shadowColor = wave.color; ctx.stroke(); ctx.restore()
    }

    const animate = () => {
      time += 1
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, bgTop); grad.addColorStop(1, bgBottom)
      ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1; ctx.shadowBlur = 0
      wavePalette.forEach(drawWave)
      animationId = window.requestAnimationFrame(animate)
    }

    animationId = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Glow overlays */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl leading-[1.06]"
          >
            Digital products{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-foreground/80 bg-clip-text text-transparent">
              built to perform
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Two founders. One studio. We design and engineer websites, mobile apps,
            and AI automations that scale from day one.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="group gap-2 rounded-full px-8 text-sm font-semibold uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 text-primary-foreground"
              asChild
            >
              <a href="/contact">
                Start a Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border/40 bg-background/60 px-8 text-sm text-muted-foreground backdrop-blur hover:border-border hover:text-foreground"
              asChild
            >
              <a href="/projects">View Our Work</a>
            </Button>
          </motion.div>

          {/* Pills */}
          <motion.ul
            variants={itemVariants}
            className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {highlightPills.map((pill) => (
              <li
                key={pill}
                className="rounded-full border border-border/40 bg-background/60 px-4 py-2 backdrop-blur"
              >
                {pill}
              </li>
            ))}
          </motion.ul>

          {/* Stats */}
          <motion.div
            variants={statsVariants}
            className="grid gap-4 rounded-2xl border border-border/30 bg-background/60 p-6 backdrop-blur-sm sm:grid-cols-3"
          >
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="space-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">{stat.label}</div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
