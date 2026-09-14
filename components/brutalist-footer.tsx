"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDownLeft } from "lucide-react"

import { Magnetic } from "@/components/ui/magnetic"
import { PALETTE } from "@/lib/palette"

const EMAIL = "harisshakeel061@gmail.com"
const CALENDLY = "https://calendly.com/harisshakeel/haris"
const LINKEDIN = "https://www.linkedin.com/in/haris-shakeel-5559852b9"
const GITHUB = "https://github.com/harisshakeel"

/** Outline pill whose ivory fill sweeps up on hover, flipping the text dark. */
function ContactPill({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <Magnetic>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor
        className="group relative inline-flex h-12 items-center justify-center overflow-hidden whitespace-nowrap rounded-full border px-8 text-base font-light md:h-16 md:px-10 md:text-lg"
        style={{ borderColor: `${PALETTE.sage}4d` }}
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 bg-[#F5F3EC] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.84,0)] group-hover:scale-y-100"
        />
        <span className="relative text-[#F5F3EC] transition-colors duration-500 group-hover:text-[#10120F]">
          {children}
        </span>
      </a>
    </Magnetic>
  )
}

/**
 * Dark inverted contact footer — Haris palette edition.
 * Large "Let's work / together" heading with headshot,
 * "Get in touch" button (chartreuse accent, not blue),
 * email + calendly pills, socials, version/local-time strip.
 *
 * Motion (from the AsmaPortfolio contact section): as the footer scrolls in,
 * its content drifts up into place and the "Get in touch" button slides along
 * the divider; both settle exactly at the end of the page. Buttons, pills and
 * socials are magnetic.
 *
 * All contact data preserved: email, Calendly, LinkedIn, GitHub.
 */
export function BrutalistFooter() {
  const year = new Date().getFullYear()
  const [timeString, setTimeString] = useState("")
  const footerRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  // From the footer's top entering the viewport to the last scroll position.
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] })
  const contentY = useTransform(scrollYProgress, [0, 1], [-60, 0])
  const buttonX = useTransform(scrollYProgress, [0, 1], [-120, 0])

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
      ref={footerRef}
      className="relative scroll-mt-24 overflow-hidden"
      style={{
        backgroundColor: PALETTE.obsidian,
        color: PALETTE.ivory,
      }}
    >
      <motion.div style={{ paddingTop: "clamp(5em, 21vh, 12em)", y: reduceMotion ? 0 : contentY }}>
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
              <motion.div style={{ x: reduceMotion ? 0 : buttonX }}>
                <Magnetic>
                  <a
                    href={CALENDLY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex size-36 items-center justify-center rounded-full text-base font-semibold transition-transform duration-300 hover:scale-105 md:size-44 md:text-lg"
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
                </Magnetic>
              </motion.div>
            </div>
          </div>

          {/* Contact pills */}
          <div className="flex w-full flex-wrap items-center gap-4 pt-12 md:gap-6">
            <ContactPill href={`mailto:${EMAIL}`}>{EMAIL}</ContactPill>
            <ContactPill href={CALENDLY} external>
              Book a call
            </ContactPill>
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
                    <Magnetic>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor
                        className="inline-block py-1 text-sm font-normal transition-opacity duration-300 hover:opacity-100 md:text-base"
                        style={{ color: PALETTE.ivory, opacity: 0.8 }}
                      >
                        {label}
                      </a>
                    </Magnetic>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
