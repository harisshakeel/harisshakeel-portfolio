"use client"

import Link from "next/link"

import { Header } from "./header"
import { VSCodeLive } from "@/components/ui/vscode-live"
import { AnimatedGroup } from "@/components/ui/animated-group"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)" as const,
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)" as const,
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export function HeroSection() {
  return (
    <>
      {/* Site header on top */}
      <div className="relative z-30">
        <Header />
      </div>

      <main className="overflow-hidden bg-background">
        {/* ── Ambient diagonal light beams (left + mirrored right) ─── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate z-[2] hidden opacity-50 contain-strict lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(168,85,247,0.14)_0,rgba(168,85,247,0.04)_50%,transparent_80%)]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--glow)/0.06)_0,hsl(var(--glow)/0.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="absolute left-0 top-0 h-[80rem] w-56 -translate-y-[350px] -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--glow)/0.04)_0,hsl(var(--glow)/0.02)_80%,transparent_100%)]" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate z-[2] hidden opacity-40 contain-strict lg:block"
        >
          <div className="absolute right-0 top-0 h-[80rem] w-[35rem] -translate-y-[350px] rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(168,85,247,0.10)_0,rgba(168,85,247,0.03)_50%,transparent_80%)]" />
        </div>

        <section>
          <div className="relative pt-24 md:pt-36">
            {/* Soft radial fade into the page */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            {/* ── Headline + CTAs ─────────────────────────────── */}
            <div className="mx-auto max-w-[1440px] px-6 md:px-10">
              <div className="text-center">
                <AnimatedGroup variants={transitionVariants}>
                  <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/75">
                    Haris Shakeel — Agentic AI &amp; Full-Stack Developer
                  </p>
                  <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground md:text-7xl lg:text-[84px]">
                    I build AI agents
                    <br />
                    <span className="italic font-normal text-foreground/55">
                      &amp; design what converts.
                    </span>
                  </h1>
                  <p className="mx-auto mt-7 max-w-4xl text-balance text-[15px] leading-relaxed text-foreground/70 md:text-lg">
                    I architect autonomous AI systems with the Claude Agent SDK
                    and build scalable MERN platforms, and I design high-converting
                    landing pages and sales funnels in Figma, shipped in React,
                    Next.js, Shopify, and WordPress. I build what I design.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  {/* Primary in a tinted bordered well, matches the template's framed CTA */}
                  <div
                    key={1}
                    className="rounded-[14px] border border-foreground/10 bg-foreground/[0.04] p-0.5"
                  >
                    <Link
                      href="#work"
                      className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_8px_28px_-8px_rgba(168,85,247,0.55),inset_0_1px_0_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:shadow-[0_12px_36px_-8px_rgba(168,85,247,0.7),inset_0_1px_0_0_rgba(255,255,255,0.22)] hover:brightness-110"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent"
                      />
                      <span className="text-nowrap">View my work</span>
                    </Link>
                  </div>

                  <Link
                    key={2}
                    href="#contact"
                    className="inline-flex h-11 items-center rounded-xl px-5 text-base font-medium text-foreground/85 transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
                  >
                    <span className="text-nowrap">Get in touch</span>
                  </Link>
                </AnimatedGroup>
              </div>
            </div>

            {/* ── VS Code editor in framed device frame ───────── */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-6 sm:mr-0 sm:mt-12 md:mt-20 md:px-10">
                {/* Bottom fade so the editor dissolves into the page */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-background"
                />

                <div className="relative mx-auto max-w-[1360px] overflow-hidden rounded-2xl border border-foreground/[0.08] bg-background p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3),inset_0_1px_0_0_hsl(var(--foreground)/0.04)] ring-1 ring-foreground/[0.04]">
                  {/* Soft purple glow under the editor */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-12 -bottom-12 h-44 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(168,85,247,0.35),transparent_70%)] blur-2xl"
                  />
                  <div className="relative">
                    <VSCodeLive />
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>

          {/* ── Linear-style horizon halo at the bottom edge ────── */}
          <div
            aria-hidden
            className="pointer-events-none relative -mt-32 h-48 w-full overflow-hidden"
          >
            {/* Wide soft spotlight rising from below the viewport */}
            <div className="absolute left-1/2 top-full h-[420px] w-[140%] -translate-x-1/2 -translate-y-[55%] rounded-[100%] bg-[radial-gradient(closest-side,hsl(var(--glow)/0.18),hsl(var(--glow)/0.06)_45%,transparent_75%)] blur-2xl" />
            {/* Tighter inner core for a brighter focal point */}
            <div className="absolute left-1/2 top-full h-[260px] w-[80%] -translate-x-1/2 -translate-y-[60%] rounded-[100%] bg-[radial-gradient(closest-side,hsl(var(--glow)/0.28),hsl(var(--glow)/0.06)_50%,transparent_80%)] blur-xl" />
            {/* Fine hairline along the horizon */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/25 to-transparent" />
          </div>
        </section>
      </main>
    </>
  )
}
