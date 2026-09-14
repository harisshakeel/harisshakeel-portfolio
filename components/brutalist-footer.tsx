"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import { ArrowDownLeft } from "lucide-react"

import { PALETTE } from "@/lib/palette"

const EASE = [0.22, 1, 0.36, 1] as const

const EMAIL = "harisshakeel061@gmail.com"
const CALENDLY = "https://calendly.com/harisshakeel/haris"
const LINKEDIN = "https://www.linkedin.com/in/haris-shakeel-5559852b9"
const GITHUB = "https://github.com/harisshakeel"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
}

/**
 * Dark inverted contact footer — Haris palette edition.
 * Large "Let's work / together" heading with headshot,
 * "Get in touch" button (chartreuse accent, not blue),
 * email + calendly pills, socials, version/local-time strip.
 *
 * All contact data preserved: email, Calendly, LinkedIn, GitHub.
 */
export function BrutalistFooter() {
  const year = new Date().getFullYear()
  const [timeString, setTimeString] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
      setTimeString(`${now.toLocaleTimeString("en-US", options)} GMT+5`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      id="contact"
      className="relative scroll-mt-24 overflow-hidden"
      style={{
        backgroundColor: PALETTE.obsidian,
        color: PALETTE.ivory,
      }}
    >
      <div style={{ paddingTop: "clamp(5em, 21vh, 12em)" }}>
        {/* Main heading area */}
        <div className="mx-auto w-full max-w-[1600px] px-8 md:px-16">
          {/* Row 1 — "Let's work" with headshot */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-8">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full md:size-28">
                <Image
                  src="/images/haris-portrait.webp"
                  className="object-cover object-top"
                  fill={true}
                  alt="Haris Shakeel"
                  sizes="112px"
                />
              </div>
              <h2
                className="text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em]"
                style={{ color: PALETTE.ivory }}
              >
                Let&apos;s work
              </h2>
            </div>
            <div className="flex items-center justify-between">
              <h2
                className="text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em]"
                style={{ color: PALETTE.ivory }}
              >
                together
              </h2>
              <div className="me-8 md:me-16">
                <ArrowDownLeft
                  size={36}
                  strokeWidth={1.25}
                  style={{ color: PALETTE.sage }}
                />
              </div>
            </div>
          </div>

          {/* Divider with "Get in touch" button — chartreuse accent */}
          <div className="relative mt-12 w-full">
            <div
              className="h-px"
              style={{ backgroundColor: `${PALETTE.sage}4d` }}
            />
            <div className="absolute right-12 top-0 z-20 -translate-y-1/2 md:right-28">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex size-36 items-center justify-center rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 md:size-44 md:text-lg"
                style={{
                  backgroundColor: PALETTE.chartreuse,
                  color: PALETTE.obsidian,
                }}
                data-cursor
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  Get in touch
                </span>
              </a>
            </div>
          </div>

          {/* Contact pills */}
          <div className="flex w-full flex-wrap items-center gap-4 pt-12 md:gap-6">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border px-8 text-base font-light transition-all duration-300 hover:border-current md:h-16 md:px-10 md:text-lg"
              style={{
                borderColor: `${PALETTE.sage}4d`,
                color: PALETTE.ivory,
              }}
            >
              {EMAIL}
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border px-8 text-base font-light transition-all duration-300 hover:border-current md:h-16 md:px-10 md:text-lg"
              style={{
                borderColor: `${PALETTE.sage}4d`,
                color: PALETTE.ivory,
              }}
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Bottom bar — version, time, socials */}
        <div className="mx-auto mt-20 w-full max-w-[1600px] px-8 pb-10 md:px-16 md:pb-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex gap-12 md:gap-16">
              <div>
                <span
                  className="block text-xs uppercase tracking-wider"
                  style={{ color: PALETTE.sage }}
                >
                  Version
                </span>
                <p
                  className="mt-4 text-sm font-normal md:text-base"
                  style={{ color: PALETTE.ivory }}
                >
                  {year} © Edition
                </p>
              </div>
              <div>
                <span
                  className="block text-xs uppercase tracking-wider"
                  style={{ color: PALETTE.sage }}
                >
                  Local time
                </span>
                <p
                  className="mt-4 text-sm font-normal md:text-base"
                  style={{ color: PALETTE.ivory }}
                >
                  <time>{timeString || "04:20 PM GMT+5"}</time>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span
                className="block text-xs uppercase tracking-wider"
                style={{ color: PALETTE.sage }}
              >
                Socials
              </span>
              <ul className="flex gap-6 md:gap-8">
                {[
                  { href: LINKEDIN, label: "LinkedIn" },
                  { href: GITHUB, label: "Github" },
                  { href: CALENDLY, label: "Book a Call" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="text-sm font-normal transition-opacity duration-300 hover:opacity-100 md:text-base"
                      style={{ color: PALETTE.ivory, opacity: 0.8 }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
