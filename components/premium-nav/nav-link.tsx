"use client";

import { useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";

import { PALETTE } from "@/lib/palette";

type NavLinkProps = {
  label: string;
  href: string;
  active: boolean;
  color: string;
  onNavigate: (href: string) => void;
};

/**
 * One centre nav link: label swaps upward on hover (current label exits,
 * a duplicate enters from below — `overflow-hidden` on the wrapper is what
 * makes that read as a swap rather than two overlapping words), a small
 * magnetic pull toward the cursor (mouse only, ≤3px), and a shared
 * `layoutId` indicator that glides to whichever link is active rather than
 * each link owning its own static underline.
 */
export function NavLink({ label, href, active, color, onNavigate }: NavLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const [pull, setPull] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPull({ x: Math.max(-3, Math.min(3, relX * 0.2)), y: Math.max(-3, Math.min(3, relY * 0.2)) });
  };

  const reset = () => {
    setHover(false);
    setPull({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor
      onClick={(e) => {
        e.preventDefault();
        onNavigate(href);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      animate={{ x: pull.x, y: pull.y }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      aria-label={label}
      className="relative flex flex-col items-center px-1 py-1 font-sans text-[13px] font-medium"
      style={{ color }}
    >
      {/*
        Only one real text node (the first span) — the link's accessible
        name and the only thing a mouse-drag or Cmd+A selection can ever
        pick up. The incoming duplicate for the hover swap is a CSS
        `::after` pseudo-element (`.nav-link-duplicate`, globals.css)
        driven by `data-label`, not a second copy of the text: pseudo-
        element content was never selectable/copyable by any method, which
        `aria-hidden` + `select-none` on a second real span turned out not
        to be — `Range.selectNodeContents` (and a real Cmd+A) still walks
        past both regardless of either attribute.
      */}
      {/* Box and line-height match at 1.3em so descenders ("p" in
          Experience) fit inside the overflow-hidden swap window. */}
      <span className="relative block h-[1.3em] overflow-hidden leading-[1.3em]">
        <motion.span
          className="block"
          animate={{ y: hover ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
        >
          {label}
        </motion.span>
        <motion.span
          aria-hidden
          data-label={label}
          className="nav-link-duplicate absolute inset-0 block"
          animate={{ y: hover ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>

      {active && (
        <motion.span
          layoutId="nav-active-indicator"
          className="absolute -bottom-1.5 rounded-full"
          style={{ backgroundColor: PALETTE.chartreuse, height: 2, width: 12 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}

      {!active && (
        <motion.span
          aria-hidden
          className="absolute -bottom-1.5 rounded-full"
          style={{ backgroundColor: PALETTE.chartreuse }}
          animate={hover ? { width: 18, height: 2, opacity: 1 } : { width: 4, height: 4, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </motion.a>
  );
}
