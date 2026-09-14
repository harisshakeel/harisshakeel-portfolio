"use client";

import type { RefObject } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { BEATS, BEAT_FADE_FRACTION, FRAME_COUNT, MAX_DRIFT_SCALE } from "./config";
import type { BeatRefs } from "./hero-story";
import type { FrameSequenceHandle } from "./frame-sequence";

gsap.registerPlugin(ScrollTrigger, SplitText);

type UseHarisTimelineArgs = {
  outerRef: RefObject<HTMLDivElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  frameSeqRef: RefObject<FrameSequenceHandle | null>;
  beatRefs: BeatRefs;
  images: RefObject<(HTMLImageElement | null)[]>;
  /** Gates setup until every frame has preloaded, so scrubbing never meets a blank frame. */
  ready: boolean;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * Restrained envelope: fade in, hold, fade out — never more than one beat
 * visible. `holdAtStart` is for the identity beat only: at the very top of
 * the page, scroll progress is exactly 0, which is also that beat's own
 * `start` — without this it would compute as fully faded *out*, leaving
 * the hero blank until the visitor scrolls even slightly.
 */
function beatOpacityAndY(
  progress: number,
  start: number,
  end: number,
  holdAtStart: boolean,
  holdAtEnd: boolean,
) {
  const width = end - start;
  const fade = width * BEAT_FADE_FRACTION;
  const fadeInEnd = start + fade;
  const fadeOutStart = end - fade;

  if (progress < start || progress > end) return { opacity: 0, y: 20 };
  if (!holdAtStart && progress < fadeInEnd) {
    const t = fade > 0 ? clamp01((progress - start) / fade) : 1;
    return { opacity: t, y: 20 * (1 - t) };
  }
  if (!holdAtEnd && progress > fadeOutStart) {
    const t = fade > 0 ? clamp01((end - progress) / fade) : 1;
    return { opacity: t, y: 0 };
  }
  return { opacity: 1, y: 0 };
}

/**
 * Drives the whole pinned hero — five beats, the MODEL outline-to-fill, the
 * travel line, the PRODUCT letter reveal, and the final circle wipe — from
 * one scrubbed ScrollTrigger, plus a one-off load-in reveal for the
 * identity beat's name.
 *
 * Everything here is `gsap.set`, never React state: this repaints on every
 * scroll tick, and ScrollTrigger already reads Lenis's smoothed position
 * via this repo's `ScrollTriggerSync` (in `smooth-scroll.tsx`).
 */
export function useHarisTimeline({
  outerRef,
  stageRef,
  frameSeqRef,
  beatRefs,
  images,
  ready,
}: UseHarisTimelineArgs) {
  const lastFrameRef = useRef(-1);

  const fullstack = BEATS.find((b) => b.id === "fullstack")!;
  const ship = BEATS.find((b) => b.id === "ship")!;

  //? Load-in reveal for the identity beat's name — independent of scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let split: SplitText | undefined;

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          const nameEl = beatRefs.identity.current?.querySelector(".hero-heading");
          if (!nameEl) return;

          split = SplitText.create(nameEl, { type: "lines", mask: "lines" });
          gsap.set(nameEl, { opacity: 1 });

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(split.lines, { yPercent: 115, stagger: 0.1, duration: 1.2 });
        });

        return () => split?.revert();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const nameEl = beatRefs.identity.current?.querySelector(".hero-heading");
        if (nameEl) gsap.set(nameEl, { opacity: 1 });
      });

      return () => mm.revert();
    },
    { scope: outerRef },
  );

  //? Scroll-scrubbed frame painting + the five beats + sub-beat details.
  useGSAP(
    () => {
      if (!ready) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paintFrame = (progress: number) => {
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.round(progress * (FRAME_COUNT - 1)));
          if (frameIndex === lastFrameRef.current) return;
          const image = images.current[frameIndex];
          if (image) {
            frameSeqRef.current?.drawFrame(frameIndex, image);
            lastFrameRef.current = frameIndex;
          }
        };

        const onProgress = (progress: number) => {
          paintFrame(progress);

          if (stageRef.current) {
            gsap.set(stageRef.current, { scale: 1 + progress * (MAX_DRIFT_SCALE - 1) });
          }

          BEATS.forEach((beat, i) => {
            const el = beatRefs[beat.id].current;
            if (!el) return;
            const holdAtStart = i === 0;
            const holdAtEnd = i === BEATS.length - 1;
            const { opacity, y } = beatOpacityAndY(progress, beat.start, beat.end, holdAtStart, holdAtEnd);
            gsap.set(el, { opacity, y });
          });

          // MODEL fill + travel line — both local to the "fullstack" beat.
          const fsLocal = clamp01((progress - fullstack.start) / (fullstack.end - fullstack.start));
          const modelFill = clamp01((fsLocal - 0.15) / 0.5);
          const modelTarget = beatRefs.modelFill.current?.querySelector<HTMLElement>("[data-fill-target]");
          if (modelTarget) {
            gsap.set(modelTarget, { clipPath: `inset(0 ${100 - modelFill * 100}% 0 0)` });
          }
          const lineWidth = clamp01((fsLocal - 0.5) / 0.25) * 100;
          if (beatRefs.travelLine.current) {
            gsap.set(beatRefs.travelLine.current, { width: `${lineWidth}%` });
          }
          beatRefs.productSlices.current.forEach((slice, i) => {
            if (!slice) return;
            const sliceProgress = clamp01((fsLocal - (0.6 + i * 0.035)) / 0.08);
            gsap.set(slice, { clipPath: `inset(0 ${100 - sliceProgress * 100}% 0 0)` });
          });

          // Final circle wipe — local to the "ship" beat's back half. 150%
          // comfortably exceeds the corner-to-corner distance from the
          // circle's near-corner origin, so it fully covers the viewport
          // well before circleAmount reaches 1, at any aspect ratio.
          const shipLocal = clamp01((progress - ship.start) / (ship.end - ship.start));
          const circleAmount = clamp01((shipLocal - 0.5) / 0.5);
          if (beatRefs.circleScale.current) {
            gsap.set(beatRefs.circleScale.current, { clipPath: `circle(${circleAmount * 150}% at 90% 84%)` });
          }
        };

        const st = ScrollTrigger.create({
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => onProgress(self.progress),
          onRefresh: (self) => onProgress(self.progress),
          onEnter: () => gsap.set(stageRef.current, { willChange: "transform" }),
          onEnterBack: () => gsap.set(stageRef.current, { willChange: "transform" }),
          onLeave: () => gsap.set(stageRef.current, { willChange: "auto" }),
          onLeaveBack: () => gsap.set(stageRef.current, { willChange: "auto" }),
        });

        onProgress(st.progress);

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: outerRef, dependencies: [ready] },
  );
}
