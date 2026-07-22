"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Activity,
  CheckCircle2,
  Circle,
  GitBranch,
  Loader2,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
 * Tab data
 * ───────────────────────────────────────────────────────────── */

interface Tab {
  pill: string
  title: string
  desc: string
  Screen: React.FC
}

const tabs: Tab[] = [
  {
    pill: "Velocity",
    title: "Brief to browser in weeks.",
    desc: "Lean async sprints, daily builds pushed to a staging URL, weekly walkthroughs. We don't sit on work.",
    Screen: DeployPipelineScreen,
  },
  {
    pill: "Full stack",
    title: "Every layer of your product.",
    desc: "Design, frontend, backend, infra, and AI, all under one roof. No agency hand-offs, no finger-pointing.",
    Screen: CodeDiffScreen,
  },
  {
    pill: "Production-grade",
    title: "Code that holds up after launch.",
    desc: "TypeScript end-to-end, green Core Web Vitals, accessibility baked in. Quality isn't a phase, it's the default.",
    Screen: LighthouseScreen,
  },
]

/* ─────────────────────────────────────────────────────────────
 * Section
 * ───────────────────────────────────────────────────────────── */

export function FeatureHighlights() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const cardRefs = useRef<Array<HTMLLIElement | null>>([])

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActive((i) => Math.min(tabs.length - 1, i + 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActive((i) => Math.max(0, i - 1))
      } else if (e.key === "Home") {
        e.preventDefault()
        setActive(0)
      } else if (e.key === "End") {
        e.preventDefault()
        setActive(tabs.length - 1)
      }
    },
    [],
  )

  // Scroll-driven activation: whichever card crosses the viewport midpoint becomes active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the viewport center among those intersecting.
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const winner = visible.reduce((best, curr) =>
          Math.abs(curr.intersectionRatio) > Math.abs(best.intersectionRatio)
            ? curr
            : best,
        )
        const idx = Number((winner.target as HTMLElement).dataset.index)
        if (!Number.isNaN(idx)) setActive(idx)
      },
      {
        // Fire when a card crosses the viewport's vertical middle band.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ActiveScreen = tabs[active].Screen

  return (
    <section className="relative w-full px-6 py-24 md:py-32">
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-24 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.10),transparent_70%)] blur-3xl" />
      </div>

      {/* Heading */}
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
          How we ship
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
          Full control,
          <br />
          <span className="italic text-foreground/55 font-normal">
            from brief to production.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-foreground/70 md:text-base">
          Three things we obsess over on every build, and what each one looks
          like in practice.
        </p>
      </div>

      {/* Two-column rail + screen */}
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
        {/* ── Left rail ─────────────────────────────────────── */}
        <div className="relative lg:col-span-5">
          {/* Vertical track behind the tabs */}
          <div
            aria-hidden
            className="absolute left-3 top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-foreground/[0.10] via-foreground/[0.04] to-transparent"
          />

          <ul
            ref={listRef}
            role="tablist"
            aria-label="How we ship"
            onKeyDown={onKey}
            className="space-y-3 pl-7 lg:space-y-[40vh]"
          >
            {tabs.map((tab, i) => {
              const isActive = i === active
              return (
                <li
                  key={tab.pill}
                  ref={(el) => {
                    cardRefs.current[i] = el
                  }}
                  data-index={i}
                  className="relative"
                >
                  {/* Station orb on the rail */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-7 top-5 flex h-6 w-6 items-center justify-center transition-all duration-500",
                      isActive ? "scale-110" : "",
                    )}
                  >
                    <span
                      className={cn(
                        "relative h-2 w-2 rounded-full ring-1 transition-all duration-500",
                        isActive
                          ? "bg-foreground ring-primary/70 shadow-[0_0_10px_2px_rgba(168,85,247,0.55)]"
                          : "bg-background ring-foreground/20 group-hover:ring-foreground/45",
                      )}
                    />
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-primary/25 blur-md" />
                    )}
                  </span>

                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500",
                      isActive
                        ? "border-foreground/[0.10] bg-gradient-to-b from-foreground/[0.04] to-foreground/[0.01] shadow-[0_0_0_1px_rgba(168,85,247,0.18)_inset,0_24px_60px_-30px_rgba(168,85,247,0.35)]"
                        : "border-foreground/[0.05] bg-foreground/[0.012] hover:border-foreground/[0.10] hover:bg-foreground/[0.025]",
                    )}
                  >
                    {/* Active layered backdrop */}
                    {isActive && (
                      <motion.span
                        layoutId="howWeShipActive"
                        className="absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(120%_100%_at_0%_0%,rgba(168,85,247,0.10),transparent_60%)]"
                        transition={{
                          type: "spring",
                          bounce: 0.22,
                          duration: 0.55,
                        }}
                      />
                    )}

                    <div className="flex items-center gap-2 text-[11px] font-medium tracking-tight">
                      <span className="h-1 w-1 rounded-full bg-primary shadow-[0_0_6px_1px_rgba(168,85,247,0.8)]" />
                      <span
                        className={cn(
                          "uppercase tracking-[0.2em]",
                          isActive ? "text-primary/85" : "text-foreground/45",
                        )}
                      >
                        {tab.pill}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "mt-3 text-xl font-semibold tracking-[-0.02em] md:text-[22px]",
                        isActive ? "text-foreground" : "text-foreground/85",
                      )}
                    >
                      {tab.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-[13.5px] leading-relaxed transition-opacity duration-500",
                        isActive ? "text-foreground/65" : "text-foreground/45",
                      )}
                    >
                      {tab.desc}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── Right screen ─────────────────────────────────── */}
        <div
          role="tabpanel"
          aria-live="polite"
          aria-label={`Preview: ${tabs[active].title}`}
          className="relative lg:col-span-7 lg:sticky lg:top-32 lg:self-start"
        >
          {/* Glow halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(168,85,247,0.12),transparent_70%)]"
          />

          <div className="relative overflow-hidden rounded-3xl border border-foreground/[0.08] bg-gradient-to-b from-foreground/[0.025] to-foreground/[0.005] p-1 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_hsl(var(--glow)/0.04)]">
            <div className="rounded-[22px] bg-screen/70 p-5 md:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.985 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ActiveScreen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═════════════════════════════════════════════════════════════
 * Screen 1, Deploy pipeline
 * ═════════════════════════════════════════════════════════════ */

function DeployPipelineScreen() {
  const steps = useMemo(
    () => [
      { label: "Lint · 0 errors", time: "0.8s" },
      { label: "Type check · strict", time: "1.2s" },
      { label: "Tests · 247 passed", time: "3.4s" },
      { label: "Build · 1.8MB gzipped", time: "12.1s" },
      { label: "Deploy · clusterden.com", time: "8.2s" },
    ],
    [],
  )
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % (steps.length + 1))
    }, 1400)
    return () => clearInterval(interval)
  }, [steps.length])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/[0.06] pb-3">
        <div className="flex items-center gap-2 text-[11px]">
          <GitBranch className="h-3.5 w-3.5 text-primary/85" />
          <span className="font-mono uppercase tracking-[0.18em] text-foreground/55">
            main · #2147
          </span>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300/90">
          Live
        </span>
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const isActive = i === stepIdx
          const isDone = i < stepIdx
          return (
            <motion.div
              key={step.label}
              initial={false}
              animate={{
                scale: isActive ? 1.005 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500",
                isDone &&
                  "border-emerald-400/20 bg-emerald-500/[0.04]",
                isActive &&
                  "border-primary/30 bg-primary/[0.06] shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]",
                !isActive &&
                  !isDone &&
                  "border-foreground/[0.06] bg-foreground/[0.012]",
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400/95" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-foreground/25" />
                )}
              </span>
              <span
                className={cn(
                  "flex-1 text-[13.5px]",
                  isActive && "text-foreground",
                  isDone && "text-foreground/60",
                  !isActive && !isDone && "text-foreground/45",
                )}
              >
                {step.label}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/40">
                {step.time}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-foreground/[0.06] pt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/45">
        <span className="flex items-center gap-1.5">
          <Activity className="h-3 w-3 text-primary/85" />
          Pipeline · sub-30s avg
        </span>
        <span>14:32 · pushed by claude</span>
      </div>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════
 * Screen 2, Code diff
 * ═════════════════════════════════════════════════════════════ */

type DiffKind = "normal" | "added" | "removed" | "comment" | "gap"

interface DiffLine {
  ln?: number | null
  text: string
  kind?: DiffKind
}

const diff: DiffLine[] = [
  { ln: 1, text: "// app/api/agent/route.ts", kind: "comment" },
  { ln: 2, text: "import { NextRequest } from 'next/server'", kind: "normal" },
  { ln: 3, text: "import { Anthropic } from '@anthropic-ai/sdk'", kind: "added" },
  { ln: 4, text: "import { z } from 'zod'", kind: "added" },
  { ln: null, text: "/* … */", kind: "comment" },
  { ln: 12, text: "export async function POST(req) {", kind: "removed" },
  { ln: 12, text: "export async function POST(req: NextRequest) {", kind: "added" },
  { ln: 13, text: "  const body = await req.json()", kind: "removed" },
  { ln: 13, text: "  const body = AgentInput.parse(await req.json())", kind: "added" },
  { ln: 14, text: "  const result = await callAgent(body)", kind: "normal" },
  { ln: 15, text: "  return Response.json(result)", kind: "removed" },
  { ln: 15, text: "  return Response.json({ ok: true, ...result })", kind: "added" },
  { ln: 16, text: "}", kind: "normal" },
]

function CodeDiffScreen() {
  const styles: Record<DiffKind, string> = {
    normal: "",
    added: "bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-200/95",
    removed: "bg-rose-500/[0.08] text-rose-700 dark:text-rose-200/85",
    comment: "text-foreground/35 italic",
    gap: "opacity-0 select-none h-3",
  }
  const prefix: Record<DiffKind, string> = {
    normal: "  ",
    added: "+ ",
    removed: "- ",
    comment: "  ",
    gap: "  ",
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/[0.06] bg-screen-panel">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-foreground/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-md bg-foreground/[0.04] px-2 py-0.5 font-mono text-[10.5px] tracking-tight text-foreground/80">
            1/2 app/api/agent/route.ts
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10.5px] text-emerald-600 dark:text-emerald-300/95">
            +6
          </span>
          <span className="rounded-full border border-rose-400/25 bg-rose-400/10 px-2 py-0.5 font-mono text-[10.5px] text-rose-600 dark:text-rose-300/95">
            -3
          </span>
        </div>
      </div>

      {/* Body */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
        }}
        className="grid grid-cols-[44px_1fr] py-2 font-mono text-[12px] leading-[1.65] text-foreground/85"
      >
        {diff.map((l, i) => (
          <React.Fragment key={i}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 4 },
                show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
              }}
              className="select-none px-3 text-right text-foreground/30"
            >
              {l.ln ?? ""}
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 4 },
                show: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } },
              }}
              className={cn(
                "whitespace-pre px-3",
                l.kind ? styles[l.kind] : "",
              )}
            >
              <span className="select-none text-foreground/30">
                {l.kind ? prefix[l.kind] : "  "}
              </span>
              {l.text}
            </motion.div>
          </React.Fragment>
        ))}
      </motion.div>

      {/* Footer hint bar */}
      <div className="flex items-center justify-between border-t border-foreground/[0.06] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/45">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-primary/80" />
          <span>Refactor · type-safe handler</span>
        </div>
        <div className="hidden md:block">
          <span className="text-foreground/65">a</span> keep ·{" "}
          <span className="text-foreground/65">z</span> undo ·{" "}
          <span className="text-foreground/65">←</span>{" "}
          <span className="text-foreground/65">→</span> switch
        </div>
      </div>
    </div>
  )
}

/* ═════════════════════════════════════════════════════════════
 * Screen 3, Lighthouse audit
 * ═════════════════════════════════════════════════════════════ */

function LighthouseScreen() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-foreground/[0.06] pb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400/55" />
          <span className="h-2 w-2 rounded-full bg-amber-400/55" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/55" />
          <span className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/45">
            Lighthouse · production
          </span>
        </div>
        <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10.5px] text-emerald-600 dark:text-emerald-300/95">
          PASS
        </span>
      </div>

      {/* Score grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <ScoreRing label="Performance" target={98} />
        <ScoreRing label="Accessibility" target={100} />
        <ScoreRing label="Best Practices" target={100} />
        <ScoreRing label="SEO" target={100} />
      </div>

      {/* Web vitals */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "LCP", value: "1.1s", note: "Good" },
          { label: "CLS", value: "0.02", note: "Good" },
          { label: "TTI", value: "1.8s", note: "Good" },
        ].map((m) => (
          <div
            key={m.label}
            className="flex flex-col rounded-xl border border-foreground/[0.06] bg-foreground/[0.012] p-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
              {m.label}
            </span>
            <span className="mt-1.5 text-xl font-semibold tracking-[-0.02em] tabular-nums text-foreground">
              {m.value}
            </span>
            <span className="mt-0.5 text-[11px] text-emerald-600 dark:text-emerald-300/85">
              {m.note}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-foreground/[0.06] pt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-foreground/45">
        <span>Audited 14:32 · clusterden.com</span>
        <span className="text-emerald-600 dark:text-emerald-300/85">All thresholds green</span>
      </div>
    </div>
  )
}

function ScoreRing({ label, target }: { label: string; target: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const dur = 1100
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target])

  const r = 26
  const c = 2 * Math.PI * r
  const offset = c * (1 - value / 100)

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-foreground/[0.06] bg-foreground/[0.012] py-4">
      <div className="relative h-[72px] w-[72px]">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          className="-rotate-90"
        >
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="hsl(var(--foreground) / 0.07)"
            strokeWidth="4"
          />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="rgb(110, 231, 183)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 60ms linear" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold leading-none tracking-[-0.02em] tabular-nums text-emerald-600 dark:text-emerald-300/95">
          {value}
        </span>
      </div>
      <span className="mt-3 text-[11px] uppercase tracking-[0.18em] text-foreground/45">
        {label}
      </span>
    </div>
  )
}
