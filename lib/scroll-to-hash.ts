import type { MouseEvent } from "react"

/**
 * Smoothly scrolls to an in-page anchor (e.g. "#contact").
 *
 * Next.js's <Link> intercepts hash clicks and performs an instant
 * `window.scrollTo`, which ignores the CSS `scroll-behavior: smooth` on
 * <html>. This handler takes over: it prevents that jump, scrolls with
 * native smooth behavior (honoring `prefers-reduced-motion`), and keeps the
 * URL hash in sync so the anchor stays shareable/back-button friendly.
 *
 * Attach to any hash <Link> via `onClick={(e) => scrollToHash(e, href)}`.
 */
export function scrollToHash(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return

  const id = href.slice(1)
  const target = id === "top" ? document.body : document.getElementById(id)
  if (!target) return

  e.preventDefault()

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  } else {
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  // Keep the URL hash in sync without triggering another (instant) jump.
  history.pushState(null, "", href)
}
