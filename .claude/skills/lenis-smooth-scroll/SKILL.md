---
name: lenis-smooth-scroll
description: Use when working with smooth scrolling, scroll-driven animation, or scroll position in this repo — mentions of "lenis", "smooth scroll", "scroll jank", "parallax", "scroll-triggered", "pin a section", "scroll to section", or anchor-link behaviour. Covers the Lenis + GSAP ScrollTrigger wiring already installed here, and the pitfalls specific to that pairing.
---

# Lenis smooth scroll (this repo)

Lenis (`lenis@1.3.x`) owns page scrolling site-wide. It is already installed and
wired — **do not add a second Lenis instance, and do not re-register it per page.**

## How it is wired

- `components/smooth-scroll.tsx` — the only Lenis provider. Client component.
- `app/layout.tsx` — wraps `{children}` inside `StoreProvider`; also imports
  `lenis/dist/lenis.css` before `./globals.css`.
- `app/globals.css` — deliberately has **no** `html { scroll-behavior: smooth }`.

The provider runs `<ReactLenis root>` with `options={{ autoRaf: false, anchors: true }}`.

## The one rule that matters: a single RAF loop

Lenis and GSAP must not each run their own requestAnimationFrame loop, or
ScrollTrigger reads stale scroll positions and animations lag a frame behind the
page. This repo resolves it by turning Lenis's loop off and driving it from
`gsap.ticker`:

```tsx
const lenis = lenisRef.current?.lenis
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000)) // ticker is seconds, Lenis wants ms
gsap.ticker.lagSmoothing(0)
```

`lagSmoothing(0)` is required — with it on, the ticker skips frames after a stall
and Lenis desyncs from the real scroll position.

If you ever set `autoRaf: true`, you must remove the `gsap.ticker` driver, and
vice versa. Having both is the most common way to break this setup.

## Reduced motion

`SmoothScroll` watches `(prefers-reduced-motion: reduce)` and renders children
without the Lenis wrapper when it matches, handing scroll back to the browser.
Any new scroll-driven animation must degrade gracefully when Lenis is absent —
never assume `useLenis()` returns an instance.

## Reading scroll state in a component

```tsx
"use client"
import { useLenis } from "lenis/react"

useLenis((lenis) => {
  // runs on every Lenis scroll frame
  console.log(lenis.scroll, lenis.progress)
})
```

`useLenis` returns `undefined` when Lenis is not mounted (reduced motion). Guard it.

## Scrolling programmatically

```tsx
const lenis = useLenis()
lenis?.scrollTo("#work", { offset: -80, duration: 1.2 })
lenis?.scrollTo(0, { immediate: true })
```

Prefer this over `window.scrollTo` / `element.scrollIntoView`, which bypass Lenis
and produce a visible jump. Plain `<a href="#id">` anchors already work — the
provider sets `anchors: true`.

## Opting an element out

Add `data-lenis-prevent` to any independently scrollable element (modal body,
code block, overflow list) so wheel/touch events scroll it instead of the page:

```tsx
<div className="max-h-80 overflow-y-auto" data-lenis-prevent>
```

Variants: `data-lenis-prevent-wheel`, `data-lenis-prevent-touch`.

## Pitfalls

- **`position: fixed` is fine; `position: sticky` is fine.** Lenis wraps native
  scroll, so both still work. If sticky breaks, something set `overflow` on an
  ancestor — that is the real cause.
- **Never set `overflow: hidden` on `html`/`body` to lock scroll.** Use
  `lenis.stop()` / `lenis.start()`.
- **ScrollTrigger `pin` + Lenis**: call `ScrollTrigger.refresh()` after layout
  changes (font swap, image load, route transition), or pinned sections land at
  the wrong offset.
- **Next.js route changes**: Lenis persists across App Router navigations because
  the provider sits in the root layout. Reset with `lenis?.scrollTo(0, { immediate: true })`
  in the destination page if you need top-of-page on navigate.
- This project also ships `framer-motion`. `useScroll` from framer-motion reads
  native scroll values, which Lenis keeps in sync — it works, but prefer GSAP
  ScrollTrigger for new scroll-driven work here so everything shares one ticker.

## Versions in this repo

`lenis@1.3.26`, `gsap@3.15.0`, `@gsap/react@2.1.2`, Next.js 16 App Router, React 19.
