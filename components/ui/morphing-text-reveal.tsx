"use client"

import { useState, useEffect, useCallback } from "react"

import { cn } from "@/lib/utils"

interface MorphingTextRevealProps {
  texts: string[]
  className?: string
  interval?: number
  glitchOnHover?: boolean
}

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

export function MorphingTextReveal({
  texts,
  className,
  interval = 3000,
  glitchOnHover = true,
}: MorphingTextRevealProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const morphToNext = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const currentText = texts[currentIndex]
    const nextIndex = (currentIndex + 1) % texts.length
    const nextText = texts[nextIndex]
    const maxLength = Math.max(currentText.length, nextText.length)

    let step = 0
    const animateStep = () => {
      if (step <= maxLength) {
        let newText = ""
        for (let i = 0; i < maxLength; i++) {
          if (i < step) {
            newText += nextText[i] || ""
          } else if (i < currentText.length) {
            const shouldGlitch = Math.random() > 0.7
            newText += shouldGlitch
              ? RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)]
              : currentText[i]
          }
        }
        setDisplayText(newText)
        step++
        setTimeout(animateStep, 80)
      } else {
        setDisplayText(nextText)
        setCurrentIndex(nextIndex)
        setIsAnimating(false)
      }
    }

    animateStep()
  }, [currentIndex, texts, isAnimating])

  useEffect(() => {
    if (texts.length === 0) return
    setDisplayText(texts[0])
  }, [texts])

  useEffect(() => {
    if (texts.length <= 1) return
    const timer = setInterval(morphToNext, interval)
    return () => clearInterval(timer)
  }, [morphToNext, interval, texts.length])

  const handleMouseEnter = () => {
    if (glitchOnHover) {
      setIsHovered(true)
      setTimeout(() => setIsHovered(false), 300)
    }
  }

  if (texts.length === 0) return null

  return (
    <div
      className={cn("relative inline-block cursor-pointer select-none", className)}
      onMouseEnter={handleMouseEnter}
    >
      <span
        className={cn(
          "text-foreground transition-all duration-300",
          isHovered && glitchOnHover && "glitch-effect",
          "hover:text-primary",
        )}
        style={{
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "0.02em",
        }}
      >
        {displayText.split("").map((char, index) => (
          <span
            key={`${currentIndex}-${index}`}
            className={cn("inline-block", isAnimating && "morph-char")}
            style={{ animationDelay: `${index * 35}ms` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
      <span
        className={cn(
          "inline-block w-1 h-[0.9em] bg-primary ml-2 align-middle transition-opacity duration-500",
          isAnimating ? "opacity-100" : "opacity-30",
        )}
        style={{ animation: "pulse 2s ease-in-out infinite" }}
      />
    </div>
  )
}
