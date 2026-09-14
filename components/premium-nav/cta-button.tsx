"use client";

import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { PALETTE } from "@/lib/palette";

type CtaButtonProps = {
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * The compact chartreuse "Let's talk" pill. Hover rises a darker olive
 * layer from the bottom (clipped by `overflow-hidden`, driven by height
 * rather than translateY so it reads as filling up, not sliding over) and
 * flips the text/arrow to ivory; deliberately no glow beyond a faint one
 * from the chartreuse fill itself.
 */
export function CtaButton({ onClick }: CtaButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <motion.a
      href="https://calendly.com/harisshakeel/haris"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="cta"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      whileTap={{ scale: 0.97 }}
      animate={{ scale: hover ? 1.025 : 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-[18px] py-[11px] font-sans text-[13px] font-medium"
      style={{ backgroundColor: PALETTE.chartreuse, color: PALETTE.inkOlive }}
    >
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 rounded-t-full"
        style={{ backgroundColor: "#5C6B45" }}
        animate={{ height: hover ? "140%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
      <span className="relative z-10 transition-colors duration-200" style={{ color: hover ? PALETTE.ivory : PALETTE.inkOlive }}>
        Let&rsquo;s talk
      </span>
      <motion.span
        className="relative z-10"
        animate={{ x: hover ? 3 : 0, y: hover ? -3 : 0, color: hover ? PALETTE.ivory : PALETTE.inkOlive }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
      </motion.span>
    </motion.a>
  );
}
