"use client";

import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import { motion, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Globe, MoveDownRight } from "lucide-react";
import Image from "next/image";

import { PALETTE } from "@/lib/palette";

import { ParallaxSlider } from "./parallax-slider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

/**
 * Single source of truth for the role lines displayed in the hero.
 * Drives the intro scramble, hover re-scramble, and server-rendered markup.
 */
const LINES = [
  "AI/ML Engineer",
  "Agentic AI, Automation &",
  "Systems Engineering",
];

/** Longer, more staggered on load; quicker on a hover replay. */
const INTRO = { durations: [1.2, 1.4, 1.6], revealDelays: [0.2, 0.3, 0.4] };
const REPLAY = { durations: [1, 1.1, 1.2], revealDelays: [0.1, 0.15, 0.2] };

const fadeIn: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// The portrait is a light studio photo, so the ivory type needs a scrim:
// a short fade under the nav and a taller one under the marquee/role text.
const TOP_SCRIM = `linear-gradient(to bottom, rgba(16, 18, 15, 0.55) 0%, rgba(16, 18, 15, 0) 100%)`;
const BOTTOM_SCRIM = `linear-gradient(to top, rgba(16, 18, 15, 0.82) 0%, rgba(16, 18, 15, 0.45) 35%, rgba(16, 18, 15, 0) 70%)`;

/**
 * AsmaPortfolio-style hero — full-viewport dark section with:
 * - Haris's professional portrait centered with parallax
 * - Huge scrolling name marquee ("Haris Shakeel")
 * - GSAP ScrambleText role description lines
 * - "Open to work" capsule badge
 * - Fade-in entrance animation
 *
 * The previous scroll-scrubbed 45-frame hero (components/haris-hero/)
 * is kept in the codebase for potential future use — this component
 * replaces it on the homepage only.
 *
 * `short:` (tailwind.config.ts) targets landscape phones, where the
 * desktop layout otherwise runs out of height and collides with the nav.
 */
export function HarisHeader() {
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const scramble = ({
    durations,
    revealDelays,
  }: {
    durations: number[];
    revealDelays: number[];
  }) => {
    LINES.forEach((text, index) => {
      const element = lineRefs.current[index];
      if (!element) return;

      gsap.to(element, {
        duration: durations[index],
        scrambleText: { text, revealDelay: revealDelays[index], speed: 0.4 },
      });
    });
  };

  useGSAP(() => scramble(INTRO), []);

  const handleScramble = () => scramble(REPLAY);

  return (
    <motion.header
      // 100svh where supported: iOS Safari's `100vh` is the toolbar-hidden
      // height, which would tuck the bottom-anchored role text under it.
      className="relative h-screen overflow-hidden supports-[height:100svh]:h-[100svh]"
      style={{ backgroundColor: PALETTE.obsidian, color: PALETTE.ivory }}
      variants={fadeIn}
      initial="initial"
      animate="enter"
    >
      {/* Left Capsule Badge — "Open to work" */}
      <div
        className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-4 rounded-r-full py-3.5 pl-8 pr-3.5 shadow-2xl transition-transform duration-300 hover:scale-105 md:flex short:!hidden"
        style={{ backgroundColor: PALETTE.forestCharcoal }}
      >
        <span
          className="whitespace-nowrap text-sm font-light tracking-wide"
          style={{ color: `${PALETTE.ivory}e6` }}
        >
          Open to work
        </span>
        <div
          className="flex size-14 items-center justify-center rounded-full"
          style={{ backgroundColor: PALETTE.smokedOlive }}
        >
          <Globe
            size={24}
            className="animate-[spin_12s_linear_infinite]"
            style={{ color: PALETTE.ivory }}
          />
        </div>
      </div>

      {/* Center portrait — positioned behind the text layers */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/haris-portrait-hero.webp"
          quality={75}
          className="object-cover object-center"
          fill={true}
          priority={true}
          // NOT 100vw. `object-cover` in a 100vh box scales a 16:9 image to
          // match the *height* whenever the viewport is narrower than 16:9,
          // so the image is rendered far wider than the viewport and the
          // sides are cropped away. On a 390x844 phone it paints 1500px wide
          // (4500 device px at DPR 3) while `100vw` asked Next for 390 — a
          // 3.75x upscale, which is why phones stayed blurry however large
          // the source got. 16/9 = 1.778, so the rendered width is 177.8vh.
          sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
          alt="Haris Shakeel professional portrait"
        />
      </div>

      {/* Readability scrims over the photo, under the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: TOP_SCRIM }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: BOTTOM_SCRIM }}
      />

      {/* Content layout — name marquee at bottom, role text above it (reversed on md) */}
      <div className="relative flex h-full flex-col justify-end gap-2 md:flex-col-reverse md:justify-normal">
        {/* Name marquee — sized by width and height so short (landscape)
            screens don't get a marquee taller than the space it has. */}
        {/* Decorative: the marquee repeats the name four times, so it isn't the
            page heading. The h1 below carries the name and role instead. */}
        <div className="select-none" aria-hidden="true">
          <div
            style={{
              color: PALETTE.ivory,
              fontSize: "clamp(2.75rem, min(15vw, 18vh), 14rem)",
            }}
          >
            <ParallaxSlider repeat={4} baseVelocity={2}>
              <span className="pe-12">
                Haris Shakeel
                <span className="px-4 opacity-30">—</span>
              </span>
            </ParallaxSlider>
          </div>
        </div>

        {/* Role description — scramble text block */}
        <div className="z-10 md:ml-auto md:-translate-y-8">
          <div
            className="mx-6 cursor-pointer max-md:my-12 md:mr-12 lg:mr-24 xl:mr-32"
            onMouseEnter={handleScramble}
          >
            <div className="mb-6 md:mb-12 md:-translate-y-8 short:hidden">
              <MoveDownRight
                size={30}
                strokeWidth={1.25}
                style={{ color: PALETTE.ivory }}
              />
            </div>

            <h1
              className="text-[clamp(1.35em,2.1vw,2.4em)] font-light leading-snug short:text-[1.05em]"
              style={{
                fontFamily: "var(--font-hero-sub)",
                textShadow: "0 1px 14px rgba(16, 18, 15, 0.45)",
              }}
            >
              <span className="sr-only">Haris Shakeel, </span>
              {LINES.map((text, index) => (
                <span
                  key={text}
                  ref={(element) => {
                    lineRefs.current[index] = element;
                  }}
                  className="block"
                >
                  {text}
                </span>
              ))}
            </h1>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
