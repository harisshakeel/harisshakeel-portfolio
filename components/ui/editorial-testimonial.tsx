"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface EditorialTestimonial {
  quote: string
  name: string
  role?: string
  company: string
  image: string
}

interface Props {
  testimonials: EditorialTestimonial[]
}

export default function EditorialTestimonialBlock({ testimonials }: Props) {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  if (testimonials.length === 0) return null

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {/* Large index number + quote */}
      <div className="flex items-start gap-6 md:gap-10">
        <span
          className="select-none text-[96px] font-light leading-none text-foreground/[0.08] transition-all duration-500 md:text-[140px]"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-4 md:pt-8">
          {/* Quote */}
          <blockquote
            className={`text-2xl font-light leading-relaxed tracking-[-0.01em] text-foreground transition-all duration-300 md:text-3xl ${
              isTransitioning
                ? "translate-x-4 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div
            className={`group mt-10 cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-foreground/10 transition-all duration-300 group-hover:ring-foreground/30">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-medium text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role && (
                    <>
                      {current.role}
                      <span className="mx-2 text-foreground/20">/</span>
                    </>
                  )}
                  <span className="transition-colors duration-300 group-hover:text-foreground">
                    {current.company}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation: line selector + counter + chevrons */}
      <div className="mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleChange(index)}
                aria-label={`Show testimonial ${index + 1}`}
                className="group relative py-4"
              >
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-foreground"
                      : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="rounded-full p-2 text-foreground/40 transition-all duration-300 hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="rounded-full p-2 text-foreground/40 transition-all duration-300 hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
