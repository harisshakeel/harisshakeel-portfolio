"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the pointer's offset the content follows (0–1). */
  strength?: number;
};

/**
 * Wraps any control so it drifts toward the mouse and springs back on leave —
 * the magnetic-button feel from the AsmaPortfolio, as a wrapper rather than a
 * button so links stay links.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { position, onPointerMove, onPointerLeave } = useMagnetic(ref, strength);

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      animate={position}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
