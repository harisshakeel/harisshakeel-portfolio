"use client";

import type { RefObject } from "react";

import { PALETTE } from "./config";

type CircleRevealProps = {
  scaleRef: RefObject<HTMLDivElement | null>;
};

/**
 * A solid obsidian circle that irises out from near the bottom-right corner
 * to fully cover the viewport as the "ship" beat finishes, driven by the
 * timeline hook (never React state) via `clipPath` — not a scaled-up dot.
 *
 * Must be a direct child of the full-bleed `ship` beat container (itself
 * `absolute inset-0`), not nested inside the small "SHIP" text box: its
 * `at <x> <y>` origin is a percentage of *this* element's own box, so
 * anywhere smaller than the full viewport anchors the wipe to the wrong
 * point and the circle stalls short of full coverage.
 *
 * A literal see-through hole revealing the About section stacked beneath
 * the sticky hero would need the DOM restructured so About renders behind
 * the hero at the same viewport position while it's pinned — a bigger,
 * riskier change for what reads the same either way. This instead wipes
 * a solid obsidian circle over the whole viewport; once it fully covers
 * the screen, the pinned section's scroll range ends and About is simply
 * what's next in the document, arriving the moment the wipe completes.
 */
export function CircleReveal({ scaleRef }: CircleRevealProps) {
  return (
    <div
      ref={scaleRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundColor: PALETTE.obsidian, clipPath: "circle(0% at 90% 84%)" }}
    />
  );
}
