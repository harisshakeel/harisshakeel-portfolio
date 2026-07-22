"use client"

import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const TECHNOLOGIES = [
  "Next.js",
  "React",
  "Figma",
  "Claude SDK",
  "Tailwind CSS",
  "Shopify",
  "Python",
  "MongoDB",
  "n8n",
]

export function SocialProof() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      <div className="relative">
        <InfiniteSlider speed={45} speedOnHover={22} gap={80}>
          {TECHNOLOGIES.map((tool) => (
            <span
              key={tool}
              className="whitespace-nowrap text-xl font-medium tracking-[-0.01em] text-foreground/55 transition-colors hover:text-foreground/90 md:text-2xl"
            >
              {tool}
            </span>
          ))}
        </InfiniteSlider>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent md:w-40" />
        <ProgressiveBlur
          className="pointer-events-none absolute left-0 top-0 h-full w-20"
          direction="left"
          blurIntensity={0.8}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute right-0 top-0 h-full w-20"
          direction="right"
          blurIntensity={0.8}
        />
      </div>
    </section>
  )
}
