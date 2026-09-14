/**
 * Single source of truth for the premium nav: link lists, per-section
 * styling, and the exact dimensions/timings from the brief.
 */

export type NavStyle = {
  /** Section id this style applies to when it is the active/intersecting one. */
  id: string;
  textTone: "ivory" | "ink-olive";
  glass: "dark" | "warm-ivory" | "smoked-olive";
};

/** Right-aligned links — desktop only. Contact is reached via the CTA, not a nav link. */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
] as const;

/** The mobile full-screen menu gets a fourth entry the desktop center row doesn't. */
export const MOBILE_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * One entry per homepage section, in document order — also the order
 * `use-active-section` walks when picking the "most in view" section.
 *
 * About and Experience are specified here as ink-olive-on-warm-ivory
 * per the brief, even though those sections themselves haven't been
 * redesigned to the new light palette yet (they're still the original
 * brutalist dark theme) — this is the *nav capsule's own* background
 * tint, not the page's, so it reads as a deliberate accent rather than
 * depending on that redesign landing first.
 */
export const SECTION_STYLES: readonly NavStyle[] = [
  { id: "hero", textTone: "ivory", glass: "dark" },
  { id: "about", textTone: "ink-olive", glass: "warm-ivory" },
  { id: "experience", textTone: "ivory", glass: "dark" },
  { id: "work", textTone: "ivory", glass: "dark" },
  { id: "contact", textTone: "ivory", glass: "smoked-olive" },
] as const;

export const DEFAULT_STYLE: NavStyle = { id: "default", textTone: "ivory", glass: "dark" };

/** Scroll distance (px) at which the nav switches from open to compact-capsule state. */
export const COMPACT_THRESHOLD = 80;

/** Open (hero) state dimensions. */
export const OPEN = {
  top: 16,
  height: 72,
  inset: 40, // width: calc(100% - 80px) → 40px each side
} as const;

/** Compact floating-capsule state dimensions. */
export const COMPACT = {
  top: 12,
  height: 58,
  inset: 56, // 32px narrower each side than OPEN
} as const;

/** Lenis scroll-to-section tuning. */
export const SCROLL_DURATION = 1.2;
export const SCROLL_OFFSET = -90; // leaves 90px of clearance under the fixed nav
