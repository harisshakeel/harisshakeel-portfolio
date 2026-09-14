"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import { Magnetic } from "@/components/ui/magnetic";
import { PALETTE } from "@/lib/palette";

const EASE_IN_EXPO = [0.7, 0, 0.84, 0] as const;

type OffcanvasToggleProps = {
  open: boolean;
  onToggle: () => void;
};

/**
 * Round burger toggle, fixed top-right. It grows in over the first 500px of
 * scroll — by then the top nav has usually slid away — so the menu stays one
 * tap away anywhere on the page. Hovering rises a chartreuse fill.
 */
export function OffcanvasToggle({ open, onToggle }: OffcanvasToggleProps) {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [0, 1]);

  return (
    <motion.div className="fixed right-0 top-0 z-[70] m-4 md:m-6" style={{ scale }}>
      <Magnetic>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="offcanvas-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor
          className="group relative flex size-16 items-center justify-center overflow-hidden rounded-full border md:size-20"
          style={{ backgroundColor: PALETTE.obsidian, borderColor: PALETTE.borderIvory }}
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-full transition-transform duration-300 ease-[cubic-bezier(0.7,0,0.84,0)] group-hover:translate-y-0"
            style={{ backgroundColor: PALETTE.chartreuse }}
          />
          <span aria-hidden className="relative block h-3 w-7">
            <motion.span
              className="absolute left-0 top-0 block h-0.5 w-full bg-[#F5F3EC] transition-colors duration-300 group-hover:bg-[#161A15]"
              animate={open ? { y: 5, rotate: -45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: EASE_IN_EXPO }}
            />
            <motion.span
              className="absolute bottom-0 left-0 block h-0.5 w-full bg-[#F5F3EC] transition-colors duration-300 group-hover:bg-[#161A15]"
              animate={open ? { y: -5, rotate: 45 } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: EASE_IN_EXPO }}
            />
          </span>
        </button>
      </Magnetic>
    </motion.div>
  );
}
