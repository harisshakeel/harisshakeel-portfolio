"use client";

import { useState, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SCROLL_DURATION, SCROLL_OFFSET } from "@/components/premium-nav/config";
import { Magnetic } from "@/components/ui/magnetic";
import { PALETTE } from "@/lib/palette";
import { siteConfig } from "@/lib/seo";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Homepage sections; off the homepage they route to `/#section`. */
const LINKS = [
  { label: "Home", hash: "#top" },
  { label: "About", hash: "#about" },
  { label: "Experience", hash: "#experience" },
  { label: "Work", hash: "#work" },
  { label: "Contact", hash: "#contact" },
] as const;

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, external: false },
  { label: "Book a call", href: "https://calendly.com/harisshakeel/haris", external: true },
] as const;

const slidePanel: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: EASE } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: EASE } },
};

const slideLink: Variants = {
  initial: { x: 80 },
  enter: (i: number) => ({ x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.05 * i } }),
  exit: (i: number) => ({ x: 80, transition: { duration: 0.8, ease: EASE, delay: 0.05 * i } }),
};

type OffcanvasBodyProps = {
  onClose: () => void;
};

export function OffcanvasBody({ onClose }: OffcanvasBodyProps) {
  const isHome = usePathname() === "/";
  const lenis = useLenis();
  const [hovered, setHovered] = useState<string | null>(null);

  // The panel's leading edge: a bulge that flattens as the panel lands.
  // Only rendered after a click, so `window` is always available here.
  const height = window.innerHeight;
  const bulged = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const flat = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;
  const curve: Variants = {
    initial: { d: bulged },
    enter: { d: flat, transition: { duration: 1, ease: EASE, delay: 0.1 } },
    exit: { d: bulged, transition: { duration: 0.8, ease: EASE } },
  };

  // Close first, then scroll: the panel covers the page, so scrolling under
  // it while it is still open would show nothing.
  const handleLink = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    onClose();
    if (!isHome) return;
    const target = document.querySelector<HTMLElement>(hash);
    if (!target) return;
    event.preventDefault();
    window.setTimeout(() => {
      if (lenis) lenis.scrollTo(target, { offset: hash === "#top" ? 0 : SCROLL_OFFSET, duration: SCROLL_DURATION });
      else target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-0 z-[55] bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
        onClick={onClose}
      />

      <motion.div
        id="offcanvas-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-y-0 right-0 z-[60] w-full sm:w-[520px]"
        style={{ backgroundColor: PALETTE.obsidian, color: PALETTE.ivory }}
        variants={slidePanel}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <svg aria-hidden className="pointer-events-none absolute right-full top-0 h-full w-24" style={{ fill: PALETTE.obsidian }}>
          <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
        </svg>

        <div className="flex h-full flex-col justify-between px-10 pb-12 pt-28 sm:px-20">
          <div>
            <p
              className="mb-8 border-b pb-3 font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: PALETTE.sage, borderColor: PALETTE.borderIvory }}
            >
              Navigation
            </p>
            <ul onPointerLeave={() => setHovered(null)}>
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.hash}
                  className="relative my-3 flex items-center"
                  custom={i}
                  variants={slideLink}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  onPointerEnter={() => setHovered(link.hash)}
                >
                  <motion.span
                    aria-hidden
                    className="absolute -left-7 size-2.5 rounded-full"
                    style={{ backgroundColor: PALETTE.chartreuse }}
                    initial={false}
                    animate={{ scale: hovered === link.hash ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Link
                    href={isHome ? link.hash : link.hash === "#top" ? "/" : `/${link.hash}`}
                    onClick={(event) => handleLink(event, link.hash)}
                    data-cursor
                    className="font-hero-sub text-4xl sm:text-6xl"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <Magnetic>
                  <a
                    href={social.href}
                    {...(social.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    data-cursor
                    className="inline-block py-2 font-sans text-sm text-[#A7ADA1] transition-colors duration-200 hover:text-[#F5F3EC]"
                  >
                    {social.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}
