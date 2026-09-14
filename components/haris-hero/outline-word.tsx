"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { PALETTE } from "./config";

type OutlineWordProps = {
  children: string;
  className?: string;
  /**
   * "hover" — SYSTEMS/AGENTS-style: outlined at rest, fills on pointer
   * hover, letters ease apart slightly, a soft chartreuse sweep crosses it.
   * Framer Motion owns this — it's React state reacting to a pointer event,
   * exactly the "small React state transition" Motion is for.
   *
   * "progress" — MODEL-style: filled by scroll progress within its own
   * beat, not hover. The fill span renders plain (no Motion `animate`) with
   * a `data-fill-target` hook — `use-haris-timeline.ts` drives its
   * `clipPath` directly via `gsap.set` on every scroll tick, the same rule
   * every other scroll-scrubbed value in this hero follows: never React
   * state on the scroll path, since that would re-render on every tick.
   */
  fillOn: "hover" | "progress";
  fillColor?: string;
};

/**
 * A large word that reads as an outline (`-webkit-text-stroke`, transparent
 * fill) until it's "filled" — either by hover or by scroll progress. The
 * fill is a second, solid copy of the same text revealed via a left-to-right
 * `clip-path`, not a literal cursor-origin radial (that would need per-word
 * pointer-relative gradient math for a effect that reads almost identically
 * at this type size) — a deliberate simplification of the brief's "outline
 * fills from the cursor position."
 */
export function OutlineWord({ children, className = "", fillOn, fillColor }: OutlineWordProps) {
  const [hover, setHover] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onPointerEnter={fillOn === "hover" ? () => setHover(true) : undefined}
      onPointerLeave={fillOn === "hover" ? () => setHover(false) : undefined}
      data-cursor="explore"
    >
      <motion.span
        aria-hidden
        className="block"
        style={{ WebkitTextStroke: `1px ${fillColor ?? PALETTE.ivory}`, color: "transparent" }}
        animate={{ letterSpacing: fillOn === "hover" && hover ? "0.04em" : "0em" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.span>

      {fillOn === "hover" ? (
        <motion.span
          className="absolute inset-0 block"
          style={{ color: fillColor ?? PALETTE.ivory, clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: hover ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        >
          {children}
        </motion.span>
      ) : (
        <span
          data-fill-target
          className="absolute inset-0 block"
          style={{ color: fillColor ?? PALETTE.ivory, clipPath: "inset(0 100% 0 0)" }}
        >
          {children}
        </span>
      )}

      {fillOn === "hover" && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 block"
          style={{
            background: `linear-gradient(100deg, transparent 30%, ${PALETTE.chartreuse}55 50%, transparent 70%)`,
            backgroundSize: "250% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          animate={{ backgroundPosition: hover ? "-30% 0%" : "130% 0%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}
