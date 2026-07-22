"use client"

import {
  Globe,
  Bot,
  Palette,
  Megaphone,
  Webhook,
  Filter as FilterIcon,
  Database,
  MessageSquare,
  Zap,
  type LucideIcon,
} from "lucide-react"
import {
  SiAnthropic,
  SiVercel,
  SiNextdotjs,
} from "react-icons/si"
import Image from "next/image"
import type { JSX } from "react"

import { cn } from "@/lib/utils"

interface Category {
  icon: LucideIcon
  title: string
  description: string
  subServices: string[]
  visual: () => JSX.Element
}

const categories: Category[] = [
  {
    icon: Bot,
    title: "Agentic AI",
    description:
      "Autonomous AI agents and pipelines built on the Claude Agent SDK, MCP tool servers, and Gemini, plus n8n workflow automation that runs 24/7 so your team can focus on what matters.",
    subServices: [
      "Multi-tenant AI Agents",
      "Claude Agent SDK & MCP",
      "Workflow Automation (n8n)",
      "Computer Vision (YOLOv8)",
    ],
    visual: AiVisual,
  },
  {
    icon: Globe,
    title: "Full-Stack Build",
    description:
      "Scalable web and mobile apps engineered end to end, MERN and Next.js on the front, Node and FastAPI on the back, built for speed and the kind of polish your team won't outgrow.",
    subServices: [
      "Web Apps (MERN / Next.js)",
      "Mobile Apps (Flutter / React Native)",
      "SaaS MVP",
      "REST & FastAPI Backends",
    ],
    visual: BuildVisual,
  },
  {
    icon: Megaphone,
    title: "Landing Pages & Funnels",
    description:
      "High-converting landing pages and sales funnels for D2C and e-commerce brands, advertorials, listicles, product pages, and offer pages designed in Figma with CRO and trust-building UX.",
    subServices: [
      "High-Converting Landing Pages",
      "Sales Funnel Design",
      "Advertorials & Listicles",
      "Product & Offer Pages",
    ],
    visual: GrowVisual,
  },
  {
    icon: Palette,
    title: "Brand & Design",
    description:
      "Brand identity, UI, and design systems crafted to make your product look as good as it works, including Shopify storefronts, pixel-perfect and responsive across every screen.",
    subServices: [
      "UI/UX Design",
      "Design Systems",
      "Figma to Production",
      "Shopify Storefronts",
    ],
    visual: BrandVisual,
  },
]

export function BentoSection() {
  return (
    <section className="relative w-full px-6 pt-24 pb-8 md:pt-32 md:pb-12">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
        <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
          What I do
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
          From AI agents
          <br />
          <span className="italic font-normal text-foreground/55">to high-converting pages.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-foreground/70 md:text-lg">
          I design and build across the stack, autonomous AI systems,
          full-stack apps, and conversion-focused landing pages.
        </p>
      </div>

      {/* Category rows */}
      <div className="mx-auto max-w-[1180px]">
        {categories.map((category, i) => (
          <CategoryRow key={category.title} category={category} index={i} />
        ))}
      </div>

    </section>
  )
}

function CategoryRow({ category, index }: { category: Category; index: number }) {
  const Icon = category.icon
  const Visual = category.visual
  const flip = index % 2 === 1

  return (
    <div
      className={cn(
        "grid items-center gap-10 border-t border-foreground/[0.06] py-16 first:border-t-0 first:pt-0 md:gap-16 md:py-24 lg:grid-cols-12",
      )}
    >
      {/* Text */}
      <div className={cn("lg:col-span-5", flip ? "lg:order-2" : "lg:order-1")}>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/[0.08] bg-gradient-to-br from-foreground/[0.06] to-foreground/[0.01] text-primary shadow-[inset_0_1px_0_0_hsl(var(--glow)/0.05)]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>

        <h3 className="mt-6 text-3xl font-semibold tracking-[-0.025em] text-foreground md:text-4xl">
          {category.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">
          {category.description}
        </p>

        <ul className="mt-8 space-y-2.5">
          {category.subServices.map((sub) => (
            <li
              key={`${category.title}-${sub}`}
              className="flex items-center gap-2.5 text-base font-semibold tracking-[-0.005em] text-foreground/90"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              {sub}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div className={cn("lg:col-span-7", flip ? "lg:order-1" : "lg:order-2")}>
        <Visual />
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────
 * Visuals, abstract premium graphics per category
 * ────────────────────────────────────────────────────────────── */

function VisualFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-foreground/[0.08] bg-gradient-to-b from-foreground/[0.025] to-foreground/[0.005] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {children}
    </div>
  )
}

function BrandVisual() {
  // Animated brand exploration: palette swatches morph through palettes,
  // typography sample cycles weight/size, design tokens pulse.
  const swatches = [
    ["#a855f7", "#7c3aed", "#c084fc", "#ddd6fe", "#fafafa"], // violet
    ["#0EA5A4", "#0891b2", "#22d3ee", "#a5f3fc", "#fafafa"], // teal
    ["#F59E0B", "#D97706", "#fbbf24", "#fde68a", "#fafafa"], // amber
    ["#E11D48", "#be123c", "#fb7185", "#fecdd3", "#fafafa"], // rose
  ]

  return (
    <VisualFrame>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 30%, rgba(168,85,247,0.18), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-8 top-10 bottom-10 flex flex-col gap-4">
        {/* Palette row, each swatch cycles through palettes */}
        <div className="flex gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="brand-swatch relative h-12 w-12 overflow-hidden rounded-xl ring-1 ring-foreground/10"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            >
              {swatches.map((set, p) => (
                <span
                  key={p}
                  className="brand-swatch-layer absolute inset-0"
                  style={{
                    backgroundColor: set[i],
                    animationDelay: `${p * 2.5 + i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Brand style tile, logo + type hierarchy + components */}
        <div className="mt-2 flex-1 rounded-xl border border-foreground/[0.08] bg-foreground/[0.025] p-5">
          <div className="grid h-full grid-cols-[1fr_auto] items-start gap-5">
            {/* Left: typography hierarchy */}
            <div className="flex h-full flex-col justify-between min-w-0">
              {/* Logo lockup */}
              <div className="flex items-center gap-2">
                <span className="brand-mark-pulse flex h-7 w-7 items-center justify-center">
                  <Image
                    src="/logos/logo.png"
                    alt="TwoPixel"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                  TwoPixel
                </span>
              </div>

              {/* Type hierarchy */}
              <div className="space-y-1.5">
                <h4 className="brand-h1 text-[28px] font-semibold leading-[0.95] tracking-[-0.035em] text-foreground">
                  Built to ship.
                </h4>
                <p className="text-[11px] leading-relaxed text-foreground/70">
                  Inter · 28/600 · -3.5%
                </p>
              </div>

              {/* Components */}
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 items-center rounded-full bg-primary px-3 text-[10.5px] font-medium text-primary-foreground brand-button">
                  Get started
                </span>
                <span className="inline-flex h-7 items-center rounded-full border border-foreground/15 bg-foreground/[0.04] px-3 text-[10.5px] font-medium text-foreground/85">
                  Learn more
                </span>
              </div>
            </div>

            {/* Right: type spec mini grid */}
            <div className="flex h-full w-[110px] flex-col justify-between border-l border-foreground/[0.06] pl-4 font-mono text-[9px]">
              <div>
                <div className="mb-1 uppercase tracking-[0.18em] text-foreground/40">
                  Display
                </div>
                <div className="text-foreground/85">Aa 600</div>
              </div>
              <div>
                <div className="mb-1 uppercase tracking-[0.18em] text-foreground/40">
                  Body
                </div>
                <div className="text-foreground/85">Aa 400</div>
              </div>
              <div>
                <div className="mb-1 uppercase tracking-[0.18em] text-foreground/40">
                  Mono
                </div>
                <div className="text-foreground/85">Aa 500</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.brand-swatch-layer) {
          opacity: 0;
          animation: brand-swatch-cycle 10s ease-in-out infinite;
        }
        :global(.brand-mark-pulse) {
          animation: brand-mark-pulse 4s ease-in-out infinite;
        }
        :global(.brand-button) {
          animation: brand-button-pulse 4s ease-in-out infinite;
          box-shadow: 0 4px 18px -6px rgba(168,85,247,0.6);
        }
        :global(.brand-h1) {
          animation: brand-type-shift 6s ease-in-out infinite;
          transform-origin: left center;
        }
        @keyframes brand-swatch-cycle {
          0%, 22% { opacity: 1; }
          25%, 100% { opacity: 0; }
        }
        @keyframes brand-mark-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes brand-button-pulse {
          0%, 100% { box-shadow: 0 4px 18px -6px rgba(168,85,247,0.6); }
          50% { box-shadow: 0 6px 24px -4px rgba(168,85,247,0.85); }
        }
        @keyframes brand-type-shift {
          0%, 100% { letter-spacing: -0.035em; }
          50% { letter-spacing: -0.045em; }
        }
      `}</style>
    </VisualFrame>
  )
}

function BuildVisual() {
  // Vercel-style deployment dashboard with streaming build logs.
  const logs = [
    { delay: 0.4, status: "done", label: "Cloning github.com/twopixel/site", time: "2.1s" },
    { delay: 0.9, status: "done", label: "Installing dependencies (pnpm i)", time: "18.2s" },
    { delay: 1.4, status: "done", label: "Running checks · TypeScript strict", time: "3.4s" },
    { delay: 1.9, status: "done", label: "Building Next.js · 24 routes", time: "12.1s" },
    { delay: 2.4, status: "done", label: "Optimizing assets · 1.8MB gzipped", time: "4.6s" },
    { delay: 2.9, status: "active", label: "Deploying to twopixel.studio", time: "" },
  ]

  return (
    <VisualFrame>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 40%, rgba(168,85,247,0.16), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-8 top-8 bottom-8 overflow-hidden rounded-xl border border-foreground/[0.10] bg-screen/90 backdrop-blur-sm">
        {/* Vercel header */}
        <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-4 py-2.5">
          <SiVercel className="h-3.5 w-3.5 text-foreground" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/65">
            Production Deployment
          </span>
          <span className="ml-2 inline-flex items-center gap-1 rounded-sm bg-foreground/[0.05] px-1.5 py-0.5 font-mono text-[9px] text-foreground/55">
            <SiNextdotjs className="h-2.5 w-2.5" /> Next.js 15.5
          </span>
          <span className="ml-auto build-deployed inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300/95">
            <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(16,185,129,0.8)]" />
            ready
          </span>
        </div>

        {/* Branch / commit row */}
        <div className="flex items-center gap-3 border-b border-foreground/[0.05] px-4 py-2 font-mono text-[10px] text-foreground/50">
          <span className="text-foreground/70">main</span>
          <span className="text-foreground/30">·</span>
          <span className="rounded bg-foreground/[0.05] px-1.5 py-0.5">a3f8d12</span>
          <span className="text-foreground/30">·</span>
          <span>fix: tighten hero spacing</span>
          <span className="ml-auto text-foreground/30">2s ago</span>
        </div>

        {/* Build log */}
        <div className="space-y-1.5 p-4 font-mono text-[10.5px]">
          {logs.map((l, i) => (
            <div
              key={i}
              className="build-log flex items-center gap-2.5"
              style={{ animationDelay: `${l.delay}s` }}
            >
              <span
                className={cn(
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center text-[10px]",
                  l.status === "done" && "text-emerald-400",
                  l.status === "active" && "text-primary",
                )}
              >
                {l.status === "done" ? "✓" : (
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_1px_rgba(168,85,247,0.7)]" />
                )}
              </span>
              <span
                className={cn(
                  "flex-1 truncate",
                  l.status === "active" ? "text-foreground" : "text-foreground/65",
                )}
              >
                {l.label}
              </span>
              {l.time && (
                <span className="text-foreground/35 tabular-nums">{l.time}</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer URL bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-foreground/[0.06] bg-foreground/[0.015] px-4 py-2 font-mono text-[10px]">
          <span className="text-emerald-600 dark:text-emerald-300/85">●</span>
          <span className="text-foreground/75">https://twopixel.studio</span>
          <span className="ml-auto text-foreground/40">edge · iad1</span>
        </div>
      </div>

      <style jsx>{`
        :global(.build-log) {
          opacity: 0;
          transform: translateX(-6px);
          animation: build-log-in 6s ease-out infinite;
        }
        :global(.build-deployed) {
          opacity: 0;
          transform: scale(0.85);
          animation: build-deployed 6s ease-out infinite;
        }
        @keyframes build-log-in {
          0%, 5% { opacity: 0; transform: translateX(-6px); }
          15%, 88% { opacity: 1; transform: translateX(0); }
          95%, 100% { opacity: 0; transform: translateX(0); }
        }
        @keyframes build-deployed {
          0%, 60% { opacity: 0; transform: scale(0.85); }
          70%, 88% { opacity: 1; transform: scale(1); }
          95%, 100% { opacity: 0; }
        }
      `}</style>
    </VisualFrame>
  )
}

function AiVisual() {
  // Each node: { x%, y%, icon, label, accent, delay (s) }
  const nodes = [
    { x: 14, y: 50, Icon: Webhook, label: "Webhook", accent: "emerald", delay: 0.4 },
    { x: 34, y: 50, Icon: Globe, label: "HTTP Request", accent: "sky", delay: 1.2 },
    { x: 54, y: 50, Icon: SiAnthropic, label: "Anthropic", accent: "primary", delay: 2.0 },
    { x: 72, y: 50, Icon: FilterIcon, label: "Filter", accent: "amber", delay: 2.8 },
    { x: 88, y: 22, Icon: MessageSquare, label: "Slack", accent: "emerald", delay: 3.6 },
    { x: 88, y: 78, Icon: Database, label: "Postgres", accent: "sky", delay: 3.6 },
  ]

  // SVG paths between nodes (viewBox 100 x 100, preserveAspectRatio none)
  const paths = [
    { d: "M 19 50 L 29 50", delay: 0.8 },
    { d: "M 39 50 L 49 50", delay: 1.6 },
    { d: "M 59 50 L 67 50", delay: 2.4 },
    { d: "M 77 50 C 83 50, 85 22, 85 22", delay: 3.2 },
    { d: "M 77 50 C 83 50, 85 78, 85 78", delay: 3.2 },
  ]

  const accentMap: Record<string, { bg: string; text: string; ring: string }> = {
    emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600 dark:text-emerald-300", ring: "ring-emerald-400/30" },
    sky:     { bg: "bg-sky-500/15",     text: "text-sky-600 dark:text-sky-300",     ring: "ring-sky-400/30" },
    primary: { bg: "bg-primary/15",      text: "text-primary",     ring: "ring-primary/40" },
    amber:   { bg: "bg-amber-500/15",   text: "text-amber-600 dark:text-amber-300",   ring: "ring-amber-400/30" },
  }

  return (
    <VisualFrame>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 70% at 50% 50%, rgba(168,85,247,0.18), transparent 70%)",
        }}
      />

      {/* Top status bar, like n8n's editor chrome */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-2 border-b border-foreground/[0.06] px-4 py-2">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(16,185,129,0.8)] animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/55">
            Workflow · Live
          </span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-foreground/[0.05] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/45">
          <Zap className="h-2.5 w-2.5 text-primary" /> 6 nodes
        </span>
      </div>

      {/* Connector layer (SVG) */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ai-flow-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(168,85,247,0.55)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.15)" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="url(#ai-flow-line)"
            strokeWidth="0.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="ai-flow-path"
            style={{
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Data dot traveling along each path once flow is built */}
        {paths.map((p, i) => (
          <circle
            key={`dot-${i}`}
            r="0.7"
            fill="hsl(270, 85%, 75%)"
            className="ai-flow-dot"
            style={{
              animationDelay: `${p.delay + 0.6}s`,
              offsetPath: `path('${p.d}')`,
              WebkitOffsetPath: `path('${p.d}')`,
            } as React.CSSProperties}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((n, i) => {
        const a = accentMap[n.accent]
        const Icon = n.Icon
        return (
          <div
            key={i}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 ai-node",
              "flex items-center gap-1.5 rounded-lg border border-foreground/[0.10] bg-screen/90 px-2 py-1.5 backdrop-blur-sm",
              "shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]",
            )}
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              animationDelay: `${n.delay}s`,
            }}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded ring-1",
                a.bg,
                a.ring,
              )}
            >
              <Icon className={cn("h-3 w-3", a.text)} strokeWidth={2} />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/75">
              {n.label}
            </span>
          </div>
        )
      })}

      <style jsx>{`
        :global(.ai-node) {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.8);
          animation: ai-node-in 8s ease-in-out infinite;
        }
        :global(.ai-flow-path) {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: ai-flow-draw 8s ease-in-out infinite;
        }
        :global(.ai-flow-dot) {
          opacity: 0;
          animation: ai-flow-travel 8s ease-in-out infinite;
        }
        @keyframes ai-node-in {
          0%, 5% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          12%, 88% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          95%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
        }
        @keyframes ai-flow-draw {
          0%, 5% {
            stroke-dashoffset: 100;
            opacity: 0;
          }
          15%, 88% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          95%, 100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }
        @keyframes ai-flow-travel {
          0%, 18% {
            opacity: 0;
            offset-distance: 0%;
          }
          22% {
            opacity: 1;
          }
          85% {
            opacity: 1;
            offset-distance: 100%;
          }
          90%, 100% {
            opacity: 0;
            offset-distance: 100%;
          }
        }
      `}</style>
    </VisualFrame>
  )
}

function GrowVisual() {
  // Multi-chart analytics dashboard, area chart hero + bar chart + sparkline tiles.
  const area = [22, 28, 24, 35, 31, 44, 41, 52, 58, 51, 67, 73, 80, 78, 92, 96]
  const bars = [40, 55, 38, 62, 70, 58, 78, 84, 72, 90, 96, 100]

  // Build smooth area path
  const areaLine =
    "M " +
    area
      .map((v, i) => {
        const x = (i / (area.length - 1)) * 100
        const y = 100 - v * 0.92
        return `${x} ${y}`
      })
      .join(" L ")
  const areaFill = `${areaLine} L 100 100 L 0 100 Z`

  // Mini sparkline for stat tiles
  const sparkPath = (data: number[]) =>
    "M " +
    data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * 100
        const y = 100 - v
        return `${x} ${y}`
      })
      .join(" L ")

  return (
    <VisualFrame>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(16,185,129,0.14), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-8 top-8 bottom-8 overflow-hidden rounded-xl border border-foreground/[0.10] bg-screen/90 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-4 py-2.5">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/65">
              Analytics · 30 days
            </span>
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300/95">
            ↑ <span className="grow-counter">+142%</span>
          </span>
        </div>

        {/* Hero metric + area chart */}
        <div className="border-b border-foreground/[0.05] p-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45">
                Total Visitors
              </div>
              <div className="mt-0.5 text-2xl font-semibold tabular-nums tracking-[-0.02em] text-foreground">
                48,231
              </div>
            </div>
            <span className="font-mono text-[10px] tabular-nums text-emerald-600 dark:text-emerald-300/90">
              +12,847 this month
            </span>
          </div>

          <div className="relative mt-3 h-16 w-full">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <linearGradient id="grow-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(168,85,247,0.4)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0)" />
                </linearGradient>
              </defs>
              <path d={areaFill} fill="url(#grow-area-fill)" className="grow-area-fill" />
              <path
                d={areaLine}
                fill="none"
                stroke="hsl(270, 85%, 75%)"
                strokeWidth="0.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="grow-area-line"
              />
              <circle
                r="1.2"
                fill="hsl(270, 85%, 75%)"
                stroke="#0a0b0e"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                className="grow-area-dot"
                style={{
                  offsetPath: `path('${areaLine}')`,
                  WebkitOffsetPath: `path('${areaLine}')`,
                } as React.CSSProperties}
              />
            </svg>
          </div>
        </div>

        {/* Bar chart */}
        <div className="border-b border-foreground/[0.05] px-4 py-3">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground/45">
              Conversions / week
            </span>
            <span className="font-mono text-[10px] tabular-nums text-foreground/70">
              1,284
            </span>
          </div>
          <div className="flex h-12 items-end gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="grow-bar flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary/15"
                style={{
                  height: `${h}%`,
                  animationDelay: `${0.3 + i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Mini stat tiles with sparklines */}
        <div className="grid grid-cols-3 gap-2 p-3">
          {[
            { label: "Signups", value: "892", delta: "+24%", spark: [40, 55, 48, 62, 58, 72, 88], color: "emerald" },
            { label: "MRR",     value: "$24k", delta: "+18%", spark: [25, 40, 38, 55, 60, 72, 85], color: "primary" },
            { label: "CTR",     value: "6.2%", delta: "+9%",  spark: [30, 28, 42, 48, 55, 62, 70], color: "sky" },
          ].map((s, i) => (
            <div
              key={i}
              className="grow-tile rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] p-2"
              style={{ animationDelay: `${1.4 + i * 0.18}s` }}
            >
              <div className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-foreground/45">
                {s.label}
              </div>
              <div className="mt-0.5 flex items-baseline justify-between">
                <span className="text-[13px] font-semibold tabular-nums text-foreground">
                  {s.value}
                </span>
                <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-300/90">
                  {s.delta}
                </span>
              </div>
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="mt-1 h-5 w-full"
              >
                <path
                  d={sparkPath(s.spark)}
                  fill="none"
                  stroke={
                    s.color === "emerald"
                      ? "rgb(110, 231, 183)"
                      : s.color === "primary"
                      ? "hsl(270, 85%, 75%)"
                      : "rgb(125, 211, 252)"
                  }
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  className="grow-spark"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        :global(.grow-bar) {
          transform-origin: bottom;
          transform: scaleY(0);
          animation: grow-bar-rise 8s ease-out infinite;
        }
        :global(.grow-area-line) {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: grow-line-draw 8s ease-out infinite;
        }
        :global(.grow-area-fill) {
          opacity: 0;
          animation: grow-fill-in 8s ease-out infinite;
        }
        :global(.grow-area-dot) {
          opacity: 0;
          animation: grow-dot-travel 8s ease-out infinite;
        }
        :global(.grow-tile) {
          opacity: 0;
          transform: translateY(6px);
          animation: grow-tile-in 8s ease-out infinite;
        }
        :global(.grow-spark) {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: grow-spark-draw 8s ease-out infinite;
          animation-delay: inherit;
        }
        :global(.grow-counter) {
          display: inline-block;
          animation: grow-counter-pulse 8s ease-out infinite;
        }
        @keyframes grow-bar-rise {
          0%, 5% { transform: scaleY(0); }
          25%, 88% { transform: scaleY(1); }
          95%, 100% { transform: scaleY(0); }
        }
        @keyframes grow-line-draw {
          0%, 5% { stroke-dashoffset: 200; opacity: 0; }
          18%, 88% { stroke-dashoffset: 0; opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes grow-fill-in {
          0%, 18% { opacity: 0; }
          30%, 88% { opacity: 1; }
          95%, 100% { opacity: 0; }
        }
        @keyframes grow-dot-travel {
          0%, 18% { opacity: 0; offset-distance: 0%; }
          22% { opacity: 1; }
          75% { opacity: 1; offset-distance: 100%; }
          85%, 100% { opacity: 0; offset-distance: 100%; }
        }
        @keyframes grow-tile-in {
          0%, 12% { opacity: 0; transform: translateY(6px); }
          22%, 88% { opacity: 1; transform: translateY(0); }
          95%, 100% { opacity: 0; }
        }
        @keyframes grow-spark-draw {
          0%, 18% { stroke-dashoffset: 120; }
          35%, 88% { stroke-dashoffset: 0; }
          95%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes grow-counter-pulse {
          0%, 50% { transform: scale(1); }
          55% { transform: scale(1.18); color: rgb(110, 231, 183); }
          70%, 100% { transform: scale(1); }
        }
      `}</style>
    </VisualFrame>
  )
}
