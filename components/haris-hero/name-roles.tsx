"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { NAME_ROLES, PALETTE } from "./config";

/**
 * Hovering the name cycles through Haris's roles via a vertical rolling
 * label beneath it — never a typing effect, per the brief. Cycles once
 * through the full list on hover-in and stops on the last one; moving away
 * and back restarts from the top.
 */
export function NameRoles() {
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!hover) {
      setIndex(0);
      return;
    }
    interval.current = setInterval(() => {
      setIndex((i) => (i + 1 < NAME_ROLES.length ? i + 1 : i));
    }, 550);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [hover]);

  return (
    <span
      className="relative inline-block"
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <span data-cursor="explore" className="hero-heading opacity-0">
        Haris Shakeel
      </span>
      <span className="relative mt-1 block h-[1.4em] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={hover ? index : "static"}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-x-0 block font-hero-sub font-semibold text-[10px] tracking-[0.25em] uppercase"
            style={{ color: PALETTE.chartreuse }}
          >
            {hover ? NAME_ROLES[index] : "AI/ML Engineer · Full-Stack Builder"}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
