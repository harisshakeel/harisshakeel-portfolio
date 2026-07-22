"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface ParallaxFeatureItem {
  id: string | number
  number: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  secondImageUrl?: string
  secondImageAlt?: string
}

interface ParallaxScrollFeatureSectionProps {
  eyebrow?: string
  heading?: string
  features: ParallaxFeatureItem[]
  className?: string
}

function ParallaxFeature({
  feature,
  reverse,
}: {
  feature: ParallaxFeatureItem
  reverse: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  )
  const translateY = useTransform(scrollYProgress, [0, 1], [-50, 0])

  return (
    <div
      ref={ref}
      className={cn(
        "min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 py-16",
        reverse && "md:flex-row-reverse",
      )}
    >
      <motion.div style={{ y: translateY }} className="max-w-md">
        <p className="text-primary text-sm font-mono mb-4">{feature.number}</p>
        <h3 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 leading-tight">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
          {feature.description}
        </p>
      </motion.div>
      <motion.div
        style={{ opacity, clipPath }}
        className={cn("relative shrink-0", feature.secondImageUrl && "flex gap-4")}
      >
        <img
          src={feature.imageUrl}
          alt={feature.imageAlt}
          className={cn(
            "object-cover rounded-2xl",
            feature.secondImageUrl
              ? "w-40 h-52 md:w-52 md:h-72 object-top"
              : "w-72 h-72 md:w-96 md:h-96",
          )}
        />
        {feature.secondImageUrl && (
          <img
            src={feature.secondImageUrl}
            alt={feature.secondImageAlt ?? ""}
            className="w-40 h-52 md:w-52 md:h-72 object-cover object-top rounded-2xl self-end"
          />
        )}
      </motion.div>
    </div>
  )
}

export function ParallaxScrollFeatureSection({
  eyebrow,
  heading,
  features,
  className,
}: ParallaxScrollFeatureSectionProps) {
  return (
    <section className={cn("w-full", className)}>
      {(eyebrow || heading) && (
        <div className="max-w-[1320px] mx-auto px-6 pt-16 md:pt-24 pb-8 text-center">
          {eyebrow && (
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-4">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-4xl md:text-6xl font-semibold text-foreground leading-tight">
              {heading}
            </h2>
          )}
        </div>
      )}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {features.map((feature, i) => (
          <ParallaxFeature
            key={feature.id}
            feature={feature}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  )
}
