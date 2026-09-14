"use client";

import type { RefObject } from "react";

import { PALETTE } from "./config";
import { CircleReveal } from "./circle-reveal";
import { NameRoles } from "./name-roles";
import { OrbitLabels } from "./orbit-labels";
import { OutlineWord } from "./outline-word";

export type BeatRefs = {
  identity: RefObject<HTMLDivElement | null>;
  capability: RefObject<HTMLDivElement | null>;
  agentic: RefObject<HTMLDivElement | null>;
  fullstack: RefObject<HTMLDivElement | null>;
  ship: RefObject<HTMLDivElement | null>;
  modelFill: RefObject<HTMLDivElement | null>;
  productSlices: RefObject<(HTMLSpanElement | null)[]>;
  travelLine: RefObject<HTMLDivElement | null>;
  circleScale: RefObject<HTMLDivElement | null>;
};

const PRODUCT_SLICE_COUNT = 6;

/**
 * The five-beat typographic story, stacked in the same full-bleed slot.
 * Each beat's container starts `opacity-0` in its className (the CSS-start-
 * state convention this project already uses) — the timeline hook drives
 * opacity/y on all five via refs, never React state, since this repaints
 * every scroll tick.
 *
 * Big display type sits in front of the portrait canvas rather than behind
 * it: the frame sequence is an opaque photograph with no alpha matte around
 * Haris, so true "text passes behind his body" occlusion isn't available
 * without rotoscoped source frames. Depth is faked instead — the giant
 * split name in the identity beat runs at low opacity so it reads as
 * background texture, and every beat's readable copy is positioned in the
 * frame's margins rather than across his face or torso.
 */
export function HeroStory({ refs }: { refs: BeatRefs }) {
  return (
    <div className="absolute inset-0">
      {/* Beat 1 — Identity */}
      <div ref={refs.identity} data-beat="identity" className="absolute inset-0 opacity-0">
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-14">
          <p
            className="font-hero-display text-[clamp(1.6rem,4vw,3rem)] leading-[1.05] font-medium"
            style={{ color: PALETTE.ivory }}
          >
            <NameRoles />
          </p>
        </div>
      </div>

      {/* Beat 2 — Capability */}
      <div ref={refs.capability} data-beat="capability" className="absolute inset-0 flex items-end opacity-0">
        <div className="p-6 md:p-14">
          <p
            className="font-hero-display text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.98] font-semibold"
            style={{ color: PALETTE.ivory }}
          >
            I BUILD
          </p>
          <p className="font-hero-display flex items-baseline gap-3 text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.98] font-semibold">
            <OutlineWord fillOn="hover">SYSTEMS</OutlineWord>
            <span
              className="font-hero-serif text-[clamp(1.3rem,3.5vw,2.5rem)] italic"
              style={{ color: PALETTE.stoneBeige }}
            >
              that
            </span>
          </p>
          <p
            className="font-hero-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.98] font-bold"
            style={{ color: PALETTE.chartreuse }}
          >
            THINK.
          </p>
        </div>
      </div>

      {/* Beat 3 — Agentic AI */}
      <div ref={refs.agentic} data-beat="agentic" className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <p
          className="font-hero-sub font-semibold text-[clamp(0.75rem,1.6vw,1rem)] tracking-[0.3em] uppercase"
          style={{ color: PALETTE.stoneBeige }}
        >
          Not just AI.
        </p>
        <p className="font-hero-display mt-2 text-[clamp(2.6rem,9vw,7rem)] leading-[0.95] font-bold tracking-tight">
          <OutlineWord fillOn="hover" fillColor={PALETTE.ivory}>
            AGENTS
          </OutlineWord>{" "}
          <span style={{ color: PALETTE.stoneBeige }}>that act.</span>
        </p>

        <div className="relative mt-16 h-56 w-56 md:h-72 md:w-72">
          <OrbitLabels />
        </div>
      </div>

      {/* Beat 4 — Full-stack capability */}
      <div
        ref={refs.fullstack}
        data-beat="fullstack"
        className="absolute inset-0 flex flex-col items-start justify-center gap-2 p-6 opacity-0 md:p-14"
      >
        <p className="font-hero-sub font-semibold text-[11px] tracking-[0.3em] uppercase" style={{ color: PALETTE.stoneBeige }}>
          From
        </p>
        <div ref={refs.modelFill} className="font-hero-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.95] font-bold">
          <OutlineWord fillOn="progress">MODEL</OutlineWord>
        </div>

        <div className="relative my-3 h-px w-40 overflow-hidden md:w-64" style={{ backgroundColor: PALETTE.borderIvory }}>
          <div
            ref={refs.travelLine}
            className="h-full"
            style={{ width: "0%", backgroundColor: PALETTE.chartreuse }}
          />
        </div>

        <p className="font-hero-sub font-semibold text-[11px] tracking-[0.3em] uppercase" style={{ color: PALETTE.stoneBeige }}>
          To
        </p>
        <div className="flex" style={{ color: PALETTE.ivory }}>
          {"PRODUCT.".split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                refs.productSlices.current[i] = el;
              }}
              className="font-hero-display inline-block text-[clamp(2.4rem,8vw,6rem)] leading-[0.95] font-bold"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Beat 5 — Ship */}
      <div ref={refs.ship} data-beat="ship" className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
        <p className="font-hero-sub font-semibold text-[11px] tracking-[0.3em] uppercase" style={{ color: PALETTE.stoneBeige }}>
          Built to
        </p>
        <div
          className="font-hero-display relative text-[clamp(4rem,16vw,13rem)] leading-[0.9] font-bold"
          style={{ color: PALETTE.ivory }}
        >
          SHIP
        </div>
        <CircleReveal scaleRef={refs.circleScale} />
      </div>
    </div>
  );
}

export { PRODUCT_SLICE_COUNT };
