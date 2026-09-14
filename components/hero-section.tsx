"use client"

import { Header } from "./header"
import { HarisHeader } from "@/components/haris-header/haris-header"

// The previous scroll-scrubbed 45-frame hero is preserved at:
//   import { HarisHero } from "@/components/haris-hero/haris-hero"
// Swap HarisHeader → HarisHero below to revert to the video hero.

export function HeroSection() {
  return (
    <>
      {/* Existing site navbar (kept as-is) floats over the hero */}
      <div className="relative z-40">
        <Header />
      </div>

      <HarisHeader />
    </>
  )
}
