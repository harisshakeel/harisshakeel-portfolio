"use client"

import { Header } from "./header"
import { BrutalistHero } from "@/components/ui/brutalist-hero"

export function HeroSection() {
  return (
    <>
      {/* Existing site navbar (kept as-is) floats over the hero */}
      <div className="relative z-40">
        <Header />
      </div>

      <BrutalistHero
        firstName="Haris"
        lastName="Shakeel"
        imageSrc="/images/owners/harus.png"
        imageAlt="Haris Shakeel"
        bookingHref="https://calendly.com/harisshakeel/haris"
        availabilityText="DM or book a call now"
        leftLine={
          <>
            Agentic AI &amp; full-stack developer, architecting autonomous
            systems with the{" "}
            <span className="hl-marker font-medium text-foreground">
              Claude Agent SDK
            </span>{" "}
            and Gemini.
          </>
        }
        rightLine={
          <>
            Building scalable MERN platforms end to end — from databases and
            APIs to polished, accessible interfaces.
          </>
        }
      />
    </>
  )
}
