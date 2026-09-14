"use client";

import { motion } from "framer-motion";

import { PALETTE } from "@/lib/palette";

type AvailabilityDotProps = {
  color: string;
};

/**
 * "● AVAILABLE" — a solid dot that never fully disappears, with a soft
 * outward pulse ring on a slow 2.5s cycle. The label hides below `lg`
 * (narrower screens keep the dot alone), per the brief.
 */
export function AvailabilityDot({ color }: AvailabilityDotProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-1.5 w-1.5 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inline-block h-full w-full rounded-full"
          style={{ backgroundColor: PALETTE.chartreuse }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span
          className="relative h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: PALETTE.chartreuse }}
        />
      </span>
      <span
        className="hidden font-mono text-[10px] tracking-[0.22em] uppercase lg:inline"
        style={{ color }}
      >
        Available
      </span>
    </div>
  );
}
