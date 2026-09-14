"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { ORBIT_LABELS, PALETTE } from "./config";

/**
 * Four labels slowly orbiting the "agentic" beat's heading, like a small
 * interface reading out the agent loop. Hovering one shows its description
 * as a caption beneath the ring, rather than a tooltip that follows the
 * cursor — simpler, and avoids a floating element racing the pointer
 * directly beside four others doing the same.
 */
export function OrbitLabels() {
  const [active, setActive] = useState<number | null>(null);
  const radius = 46; // percent of the container's half-width/height

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        {ORBIT_LABELS.map((label, i) => {
          const angle = (i / ORBIT_LABELS.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          return (
            <motion.button
              key={label.code}
              type="button"
              data-cursor="view"
              className="pointer-events-auto absolute font-hero-sub font-semibold text-[10px] tracking-[0.22em] uppercase"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%) rotate(0deg)",
                color: active === i ? PALETTE.chartreuse : PALETTE.stoneBeige,
              }}
              // Counter-rotate against the parent's spin so the label text
              // itself always reads upright, only its position orbits.
              animate={{ rotate: -360 }}
              transition={{ duration: 90, ease: "linear", repeat: Infinity }}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive((v) => (v === i ? null : v))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((v) => (v === i ? null : v))}
            >
              {label.code}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="absolute -bottom-10 left-1/2 w-max -translate-x-1/2 text-center">
        <motion.p
          className="font-hero-sub font-medium text-[11px]"
          style={{ color: PALETTE.ivory }}
          animate={{ opacity: active !== null ? 1 : 0, y: active !== null ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          {active !== null ? ORBIT_LABELS[active].description : ""}
        </motion.p>
      </div>
    </div>
  );
}
