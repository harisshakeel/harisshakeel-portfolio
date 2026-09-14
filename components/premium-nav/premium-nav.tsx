"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

import { PALETTE } from "@/lib/palette";
import { AvailabilityDot } from "./availability-dot";
import {
  COMPACT,
  COMPACT_THRESHOLD,
  NAV_LINKS,
  OPEN,
  SCROLL_DURATION,
  SCROLL_OFFSET,
} from "./config";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { useNavScrollState } from "./use-nav-scroll-state";

const GLASS: Record<"dark" | "warm-ivory" | "smoked-olive", string> = {
  dark: "rgba(16, 18, 15, 0.72)",
  "warm-ivory": "rgba(241, 239, 232, 0.82)",
  "smoked-olive": "rgba(35, 40, 32, 0.78)",
};

const TEXT_COLOR: Record<"ivory" | "ink-olive", string> = {
  ivory: PALETTE.ivory,
  "ink-olive": PALETTE.inkOlive,
};

/**
 * The premium floating nav — replaces the previous full-width navbar
 * (`ui/navbar-5.tsx`) as the site's one `Header`.
 *
 * State that drives its appearance:
 * - `compact` (past 80px): transparent open bar → floating glass capsule.
 * - `hidden`: translated off-screen on scroll-down, but only once past the
 *   hero — see `useNavScrollState` for why.
 * - `style`: which section is centred in the viewport (homepage only),
 *   picking the glass tint and text colour from `SECTION_STYLES`.
 *
 * Entrance (wordmark, links, dot, CTA) is a one-off mount animation, kept
 * separate from the scroll-driven transform below so the two never fight
 * over the same transform/opacity properties.
 */
export function PremiumNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const { compact, hidden, style } = useNavScrollState(isHome);
  const lenis = useLenis();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Menu open state stops Lenis (and the hero's own scroll-driven paint
  // with it) rather than just locking body overflow, so the frame sequence
  // genuinely pauses behind the panel instead of continuing to redraw.
  useEffect(() => {
    if (!lenis) return;
    if (mobileOpen) lenis.stop();
    else lenis.start();
  }, [mobileOpen, lenis]);

  const glassColor = GLASS[style.glass];
  const textColor = TEXT_COLOR[style.textTone];

  const dims = compact ? COMPACT : OPEN;

  const handleNavigate = (href: string, e?: MouseEvent) => {
    e?.preventDefault();
    if (!isHome) return; // plain <Link> below handles off-home navigation
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: SCROLL_OFFSET, duration: SCROLL_DURATION });
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  };

  const entranceTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        style={{ backgroundColor: PALETTE.ivory, color: PALETTE.inkOlive }}
      >
        Skip to content
      </a>

      <motion.header
        role="banner"
        animate={{
          top: dims.top,
          height: dims.height,
          left: dims.inset,
          right: dims.inset,
          y: hidden ? "-120%" : "0%",
        }}
        transition={
          hidden
            ? { duration: 0.35, ease: "easeInOut" }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
        }
        // Brand on the left, links + dot + CTA grouped on the right
        // (the AsmaPortfolio navbar layout).
        className="fixed z-50 flex items-center justify-between rounded-[18px] px-6"
        style={{
          backgroundColor: compact ? glassColor : "transparent",
          border: compact ? `1px solid ${PALETTE.borderIvory}` : "1px solid transparent",
          backdropFilter: compact ? "blur(18px)" : "none",
          boxShadow: compact ? "0 12px 40px rgba(0, 0, 0, 0.18)" : "none",
          transitionProperty: "background-color, border-color, box-shadow",
          transitionDuration: "0.3s",
        }}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={entranceTransition}
        >
          <Link
            href="/"
            data-cursor
            onClick={(e) => {
              if (!isHome) return;
              e.preventDefault();
              lenis ? lenis.scrollTo(0, { duration: SCROLL_DURATION }) : window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display shrink-0 text-lg font-medium tracking-tight transition-[font-size] duration-300"
            style={{ color: textColor, fontSize: compact ? "1.05rem" : "1.15rem" }}
          >
            HARIS.
          </Link>
        </motion.div>

        <div className="flex items-center gap-4">
          <nav className="mr-4 hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...entranceTransition, delay: 0.1 + i * 0.06 }}
              >
                {isHome ? (
                  <NavLink
                    label={link.label}
                    href={link.href}
                    active={style.id === link.href.slice(1)}
                    color={textColor}
                    onNavigate={(href) => handleNavigate(href)}
                  />
                ) : (
                  <Link href={`/${link.href}`} className="text-[13px] font-medium" style={{ color: textColor }}>
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...entranceTransition, delay: 0.3 }}
          >
            <AvailabilityDot color={textColor} />
          </motion.div>

          <button
            type="button"
            data-cursor
            onClick={() => setMobileOpen((v) => !v)}
            className="font-mono text-[11px] tracking-[0.15em] uppercase md:hidden"
            style={{ color: textColor }}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={(href) => handleNavigate(href)}
        isHome={isHome}
      />
    </>
  );
}

// Re-exported for callers that only need the compact-state threshold.
export { COMPACT_THRESHOLD };
