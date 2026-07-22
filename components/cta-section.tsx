"use client"

import { useRouter } from "next/navigation"
import { AnimatedLayerButton } from "@/components/ui/animated-layer-button"

export function CTASection() {
  const router = useRouter()

  return (
    <section className="relative w-full overflow-hidden px-6 py-32 md:py-44">
      {/* Animated aurora backdrop, pure CSS, GPU-friendly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
      >
        {/* Faint grid texture with radial mask so it fades at edges */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 50%, black 30%, transparent 75%)",
          }}
        />

        {/* Drifting blob A, purple, top-left */}
        <div
          className="absolute -left-[10%] top-[12%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.45) 0%, rgba(168,85,247,0.18) 40%, transparent 70%)",
          }}
        />

        {/* Drifting blob B, deeper violet, bottom-right */}
        <div
          className="absolute -right-[8%] bottom-[5%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.40) 0%, rgba(139,92,246,0.14) 45%, transparent 72%)",
          }}
        />

        {/* Subtle cool accent, center, slow pulse for depth */}
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-aurora-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--glow)/0.06) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-foreground md:text-6xl lg:text-[72px]">
          Ready to ship.
          <br />
          <span className="italic font-normal text-foreground/55">
            Built to last.
          </span>
        </h2>

        <div className="mt-12 flex items-center justify-center">
          <AnimatedLayerButton onClick={() => router.push("/contact")}>
            Start a project
          </AnimatedLayerButton>
        </div>
      </div>
    </section>
  )
}
