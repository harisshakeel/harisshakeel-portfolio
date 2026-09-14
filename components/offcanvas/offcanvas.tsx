"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";

import { OffcanvasBody } from "./offcanvas-body";
import { OffcanvasToggle } from "./offcanvas-toggle";

/** Scroll distance (px) that counts as the visitor scrolling away from the open panel. */
const CLOSE_ON_SCROLL_PX = 40;

/**
 * Site-wide side panel, ported from the AsmaPortfolio offcanvas: a magnetic
 * burger that scales in as the page scrolls, opening a panel that slides in
 * from the right with a curved leading edge. Closes on route change, Escape,
 * a click outside, or scrolling the page.
 */
export function Offcanvas() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const openedAt = useRef(0);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Measured from where the panel opened, so leftover Lenis momentum from the
  // scroll that revealed the toggle doesn't immediately close it again.
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (open && Math.abs(latest - openedAt.current) > CLOSE_ON_SCROLL_PX) setOpen(false);
  });

  const toggle = () => {
    openedAt.current = scrollY.get();
    setOpen((value) => !value);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {open ? <OffcanvasBody onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
      <OffcanvasToggle open={open} onToggle={toggle} />
    </>
  );
}
