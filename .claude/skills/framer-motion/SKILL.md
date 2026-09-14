---
name: framer-motion
description: Motion for React (formerly Framer Motion) — the `motion` / `framer-motion` package. Use when the user asks for React animation with Motion or Framer Motion, `motion.div`, variants, `AnimatePresence`, enter/exit transitions, layout animations, shared-element / `layoutId` transitions, drag, gestures (`whileHover`, `whileTap`, `whileInView`), or the motion-value hooks (`useScroll`, `useTransform`, `useSpring`, `useMotionValue`). Also use for Next.js App Router animation questions and for choosing between Motion and GSAP.
---

# Motion for React (Framer Motion)

Framer Motion was renamed **Motion**. The package is now `motion`, importing from
`motion/react`; the old `framer-motion` package still publishes and works with
identical APIs. Match whatever is already in `package.json` — do not mix both in
one project.

```bash
npm i motion          # current
# import { motion, AnimatePresence } from "motion/react"

npm i framer-motion   # legacy name, same API
# import { motion, AnimatePresence } from "framer-motion"
```

## When to use Motion vs GSAP

- **Motion** — animation that belongs to React state: mount/unmount transitions,
  layout changes, gestures, `whileInView` reveals, shared-element route
  transitions. It is declarative, so the animation follows the component tree.
- **GSAP** — long imperative sequences, precise timeline choreography,
  scroll-scrubbed pinning, SVG morphing, or anything non-React. See
  **gsap-core** / **gsap-scrolltrigger**.

Both in one project is fine, but split ownership explicitly and write the split
down where the animation code lives:

```
Lenis   — scroll position only (one instance, ticker-synced)
GSAP    — pinning, scrubbing, timelines
Motion  — navigation and component state transitions
```

Nothing animates a property another library is already touching. In practice:
Motion never sets transforms on an element GSAP pins, and GSAP never touches
opacity on a Motion-driven nav. Violating this means two libraries writing the
same style attribute every frame, and the symptom is jitter that looks like a
performance problem but is not.

## Next.js App Router

Every file using `motion` needs `"use client"`. Motion components cannot be
Server Components. Keep the client boundary small: wrap the animated leaf, not
the whole page.

```tsx
"use client"
import { motion } from "motion/react"
```

## Core: the `motion` component

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -12 }}
  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
/>
```

`initial={false}` skips the mount animation and snaps to `animate` — use it when
a component remounts on data changes and you do not want a replay.

Transitions default to a spring for physical properties (`x`, `scale`) and a
tween for others (`opacity`, `color`). Specify explicitly when it matters:

```tsx
transition={{ type: "spring", stiffness: 300, damping: 30 }}
transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
transition={{ opacity: { duration: 0.2 }, y: { type: "spring", bounce: 0.3 } }}
```

## Variants — the idiomatic way to orchestrate

Variants let a parent drive children by name, and give you stagger for free:

```tsx
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

<motion.ul variants={list} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>{i.label}</motion.li>
  ))}
</motion.ul>
```

Children inherit the variant name from the parent — do **not** repeat
`initial`/`animate` on them. Prefer this over hand-rolled `delay: index * 0.08`.

## AnimatePresence — exit animations

Elements removed from the tree animate out only inside `AnimatePresence`:

```tsx
<AnimatePresence mode="wait">
  {open && (
    <motion.div key="panel" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
  )}
</AnimatePresence>
```

Rules that cause most bugs:

- The child needs a **stable, unique `key`**. Changing content without changing
  the key means no exit animation fires.
- `AnimatePresence` must not itself unmount — it has to outlive its children.
- `mode="wait"` waits for exit before entering (tab/route swaps); `"popLayout"`
  pops the exiting element out of flow so siblings reflow immediately;
  default `"sync"` overlaps them.

## Gestures and viewport

```tsx
<motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} />

<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}   // amount = fraction visible
/>
```

`whileInView` uses IntersectionObserver and is the cheap way to do reveal-on-
scroll. Reach for ScrollTrigger only when you need scrubbing or pinning.

## Layout animations

`layout` animates position/size changes caused by *anything* — flex reflow, list
reorder, text change:

```tsx
<motion.div layout />
<motion.div layout="position" />   // position only, no size distortion
```

Shared-element transitions use a matching `layoutId` across two components:

```tsx
{tabs.map((t) => (
  <button key={t} onClick={() => setActive(t)}>
    {t}
    {active === t && <motion.div layoutId="underline" className="h-px bg-white" />}
  </button>
))}
```

Pitfalls: layout animation distorts children with border-radius or text unless
the child is also `layout`; wrap scaling containers' contents in `<motion.div layout>`.
Use `<LayoutGroup>` when independent siblings must measure together.

## Motion values — animation outside React render

Motion values change without re-rendering the component. This is the performance
tool.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

<motion.div ref={ref} style={{ y: smoothY }} />
```

- `useMotionValue(0)` — a raw value you can `.set()` from an event handler.
- `useTransform(mv, input, output)` — map one range to another.
- `useSpring(mv, config)` — smooth a value; the standard fix for jumpy parallax.
- `useMotionValueEvent(mv, "change", cb)` — side effects; never `useEffect` on a
  motion value, it does not trigger renders.

Pass motion values through `style`, not `animate`.

## Reduced motion

```tsx
import { MotionConfig, useReducedMotion } from "motion/react"

<MotionConfig reducedMotion="user">{children}</MotionConfig>
```

`reducedMotion="user"` disables transform/layout animations globally while
keeping opacity — the right default for a whole app. For per-component control,
`const shouldReduce = useReducedMotion()` and drop `y`/`scale` from the variant.

When the same project also runs GSAP, gate there too rather than relying on one
library's setting. Keep the queries in one shared module so both agree:

```ts
export const MOTION = {
  ok: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  pointer: "(pointer: fine) and (prefers-reduced-motion: no-preference)",
}
// GSAP side: gsap.matchMedia().add(MOTION.ok, () => { ... })
```

## Performance

- Animate **`transform` and `opacity`** only (`x`, `y`, `scale`, `rotate`).
  Animating `width`, `height`, `top`, `left`, or `filter` triggers layout/paint
  each frame — use `layout` or `scale` instead.
- Use `LazyMotion` to cut ~20kb when you only need basic features:

  ```tsx
  import { LazyMotion, domAnimation, m } from "motion/react"
  <LazyMotion features={domAnimation}>
    <m.div animate={{ opacity: 1 }} />   {/* note: `m`, not `motion` */}
  </LazyMotion>
  ```
  `domMax` adds layout + drag. Mixing `motion` and `m` defeats the point.
- Long lists: animate a wrapper, not 200 individual `motion.li`.
- `will-change` is managed for you — do not set it by hand.

## Pitfalls

- Animating a component that remounts every render (defined inline inside the
  parent) restarts the animation constantly. Define components at module scope.
- `exit` does nothing outside `AnimatePresence`.
- Conditional `key` changes on a `layoutId` element break the shared transition.
- Tailwind class changes are not animated — Motion animates style props, not
  classes. Animate the value, or use `variants`.
- With **Lenis** driving scroll, `useScroll` still works (Lenis syncs native
  scroll position). See **lenis-smooth-scroll**.
