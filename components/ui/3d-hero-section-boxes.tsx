"use client"

import { Suspense, lazy } from "react"

import { ContactFormSection } from "@/components/contact-form-section"

const Spline = lazy(() => import("@splinetool/react-spline"))

const SPLINE_SCENE = "https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"

function HeroSplineBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden pointer-events-auto">
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Spline
          style={{ width: "100%", height: "100vh", pointerEvents: "auto" }}
          scene={SPLINE_SCENE}
        />
      </Suspense>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(0,0,0,0.8), transparent 30%, transparent 70%, rgba(0,0,0,0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.9))
          `,
        }}
      />
    </div>
  )
}

function HeroContent() {
  return (
    <div className="text-white px-6 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16 gap-12">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
          Let&apos;s build<br />something great.
        </h1>
        <div className="text-sm text-gray-300 opacity-90 mt-4 tracking-widest">
          WEB \ MOBILE \ AI \ SAAS \ DESIGN
        </div>
      </div>

      <div className="w-full lg:w-1/2 pointer-events-auto">
        <div className="relative group">
          {/* Outer purple glow */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-primary/10 to-transparent opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-90"
          />
          {/* Gradient border */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-3xl bg-gradient-to-br from-white/20 via-white/5 to-primary/30"
          />
          {/* Glass surface */}
          <div className="relative rounded-3xl bg-black/60 backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(168,85,247,0.35)]">
            {/* Top sheen */}
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            {/* Inner radial accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            />
            <ContactFormSection variant="embedded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroSplineBackground />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-screen flex justify-center items-center z-10 pointer-events-none"
      >
        <HeroContent />
      </div>
    </div>
  )
}
