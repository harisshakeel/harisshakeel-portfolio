"use client";

import { useEffect, useRef, useState } from "react";

import { COMPACT_THRESHOLD, DEFAULT_STYLE, SECTION_STYLES, type NavStyle } from "./config";

type NavScrollState = {
  compact: boolean;
  hidden: boolean;
  style: NavStyle;
};

/**
 * Three independent scroll-driven states for the nav, tracked together so
 * they share one scroll listener and one IntersectionObserver:
 *
 * 1. `compact` — past the 80px open→capsule threshold.
 * 2. `hidden` — scrolling down, but only once past the hero. The brief is
 *    explicit that the nav must stay put through the whole pinned hero
 *    (~280vh of scroll) rather than hiding and reappearing as the visitor
 *    scrubs the frame sequence — hiding only starts once there's a "real"
 *    page below to hide from. It also returns on its own ~600ms after
 *    scrolling stops, not only on a scroll-up reversal: a visitor who
 *    scrolls straight down to read, without ever reversing, would
 *    otherwise lose the nav for good until they did.
 * 3. `style` — which section is centred in the viewport right now, via the
 *    standard scrollspy trick: a 1px-tall IntersectionObserver root band
 *    pinned to the viewport's vertical centre, so exactly one section is
 *    ever "intersecting" at a time.
 *
 * Disabled entirely on subpages (no `#hero` on the page) — the nav falls
 * back to `DEFAULT_STYLE` there via the caller.
 */
export function useNavScrollState(isHome: boolean): NavScrollState {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [style, setStyle] = useState<NavStyle>(SECTION_STYLES[0] ?? DEFAULT_STYLE);

  const lastY = useRef(0);
  const heroBottom = useRef(Infinity);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const hero = document.getElementById("hero");
    const computeHeroBottom = () => {
      heroBottom.current = hero ? hero.getBoundingClientRect().height : 0;
    };
    computeHeroBottom();
    window.addEventListener("resize", computeHeroBottom);

    let raf = 0;
    const onScroll = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 600);

      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setCompact(y > COMPACT_THRESHOLD);

        if (y <= heroBottom.current) {
          setHidden(false); // never hide inside the hero's own scroll range
        } else {
          const delta = y - lastY.current;
          if (delta > 4) setHidden(true);
          else if (delta < -4) setHidden(false);
        }
        lastY.current = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", computeHeroBottom);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    const byId = new Map(SECTION_STYLES.map((s) => [s.id, s]));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const next = byId.get(hit.target.id);
        if (next) setStyle(next);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    const elements = SECTION_STYLES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isHome]);

  return { compact, hidden, style: isHome ? style : DEFAULT_STYLE };
}
