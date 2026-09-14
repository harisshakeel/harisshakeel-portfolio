"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { PALETTE } from "@/lib/palette";
import { MOBILE_LINKS } from "./config";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  isHome: boolean;
};

const EASE_POWER4 = [0.77, 0, 0.175, 1] as const;

/**
 * The full-screen mobile menu — an editorial index rather than a stock
 * hamburger drawer: large muted numbers, one link per line, contact/social
 * held back to enter last. Expands via a `clipPath` inset that starts as a
 * small rounded rect (echoing the capsule it grew from) and opens to fill
 * the screen, rather than a plain fade or slide.
 */
export function MobileMenu({ open, onClose, onNavigate, isHome }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col justify-center px-8"
          style={{ backgroundColor: PALETTE.obsidian }}
          initial={{ clipPath: "inset(0% 0% 100% 0% round 32px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0% round 32px)" }}
          transition={{ duration: 0.65, ease: EASE_POWER4 }}
        >
          <nav className="flex flex-col gap-1">
            {MOBILE_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: EASE_POWER4 }}
              >
                {isHome ? (
                  <a
                    href={link.href}
                    className="group flex items-baseline gap-5 py-3"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      onNavigate(link.href);
                    }}
                  >
                    <span
                      className="font-mono text-sm tabular-nums"
                      style={{ color: PALETTE.sage }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display text-4xl font-medium tracking-tight transition-colors duration-200 group-hover:opacity-80"
                      style={{ color: PALETTE.ivory }}
                    >
                      {link.label}
                    </span>
                  </a>
                ) : (
                  <Link href={`/${link.href}`} className="group flex items-baseline gap-5 py-3" onClick={onClose}>
                    <span className="font-mono text-sm tabular-nums" style={{ color: PALETTE.sage }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display text-4xl font-medium tracking-tight transition-colors duration-200 group-hover:opacity-80"
                      style={{ color: PALETTE.ivory }}
                    >
                      {link.label}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="mt-12 flex flex-col gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + MOBILE_LINKS.length * 0.06 + 0.05, ease: EASE_POWER4 }}
          >
            <a
              href="mailto:harisshakeel061@gmail.com"
              className="font-mono text-xs tracking-[0.15em] uppercase"
              style={{ color: PALETTE.chartreuse }}
            >
              harisshakeel061@gmail.com
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/haris-shakeel-5559852b9"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: PALETTE.sage }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/harisshakeel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: PALETTE.sage }}
              >
                GitHub
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
