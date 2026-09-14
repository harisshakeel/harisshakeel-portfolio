"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { FRAME_COUNT, FRAME_SRCS, HERO_DESCRIPTION, PALETTE, SCROLL_LENGTH_VH } from "./config";
import { FrameSequence, type FrameSequenceHandle } from "./frame-sequence";
import { HeroLoader } from "./hero-loader";
import { HeroStory, type BeatRefs, PRODUCT_SLICE_COUNT } from "./hero-story";
import { useHarisTimeline } from "./use-haris-timeline";

const vignette = { backgroundColor: PALETTE.obsidian };
const bottomGradient = {
  background: `linear-gradient(to top, ${PALETTE.obsidian}85, ${PALETTE.obsidian}00)`,
};
const topGradient = {
  background: `linear-gradient(to bottom, ${PALETTE.obsidian}40, ${PALETTE.obsidian}00)`,
};

/**
 * The hero — a scroll-scrubbed 45-frame sequence pinned for ~400vh,
 * carrying five typographic beats (identity → capability → agentic AI →
 * full-stack range → shipping) rather than one static statement.
 *
 * Same canvas technique throughout: it paints one preloaded frame per
 * scroll tick, never a CSS transition between images. Reduced motion gets
 * a single static frame and a condensed, non-animated version of the same
 * five-beat narrative in normal document flow — no pin, no scroll-jacked
 * height.
 */
export function HarisHero() {
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameSeqRef = useRef<FrameSequenceHandle>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(FRAME_COUNT).fill(null));

  const beatRefs: BeatRefs = {
    identity: useRef<HTMLDivElement>(null),
    capability: useRef<HTMLDivElement>(null),
    agentic: useRef<HTMLDivElement>(null),
    fullstack: useRef<HTMLDivElement>(null),
    ship: useRef<HTMLDivElement>(null),
    modelFill: useRef<HTMLDivElement>(null),
    productSlices: useRef<(HTMLSpanElement | null)[]>(Array(PRODUCT_SLICE_COUNT).fill(null)),
    travelLine: useRef<HTMLDivElement>(null),
    circleScale: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  //? Reduced-motion visitors get the static fallback below and never scrub
  //? the sequence, so there's no reason to spend their bandwidth on it.
  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let loaded = 0;

    FRAME_SRCS.forEach((src, i) => {
      const img = new window.Image();
      img.decoding = "async";
      const onDone = () => {
        if (cancelled) return;
        loaded += 1;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) setReady(true);
      };
      img.onload = onDone;
      img.onerror = onDone; //? one bad frame shouldn't block the whole sequence
      img.src = src;
      imagesRef.current[i] = img;
    });

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  useHarisTimeline({
    outerRef,
    stageRef,
    frameSeqRef,
    beatRefs,
    images: imagesRef,
    ready,
  });

  if (reduced) {
    return (
      <section
        id="hero"
        aria-label={HERO_DESCRIPTION}
        className="relative h-[100svh] w-full overflow-hidden"
        style={vignette}
      >
        <Image src={FRAME_SRCS[FRAME_SRCS.length - 1]} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={topGradient} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3" style={bottomGradient} />

        {/* No top row here — the premium nav already carries the wordmark
            and availability dot in this strip. A condensed, static version
            of all five beats — the scroll story compressed to one screen. */}
        <div className="relative flex h-full flex-col justify-end p-6 md:p-14">
          <p className="mb-4 font-hero-sub font-semibold text-[10px] tracking-[0.3em] uppercase" style={{ color: PALETTE.chartreuse }}>
            AI/ML Engineer · Full-Stack Builder
          </p>
          <h1
            className="font-hero-display max-w-[20ch] text-[clamp(1.9rem,6vw,4.5rem)] leading-[1.05] font-bold tracking-tight"
            style={{ color: PALETTE.ivory }}
          >
            Haris Shakeel — I build systems that think.
          </h1>
          <p className="font-hero-sub mt-4 max-w-[52ch] text-sm leading-relaxed font-medium" style={{ color: PALETTE.stoneBeige }}>
            Not just AI — agents that act. From model to product, built to
            ship: architecting autonomous systems with the Claude Agent SDK
            and Gemini, and the full-stack platforms around them.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      id="hero"
      aria-label={HERO_DESCRIPTION}
      className="relative"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden" style={vignette}>
        <div ref={stageRef} className="absolute inset-0">
          <Image src={FRAME_SRCS[0]} alt="" fill priority sizes="100vw" className="object-cover" />
          <FrameSequence ref={frameSeqRef} />
        </div>

        {/* Cinematic overlays — fixed to the viewport, not the scaled stage. */}
        <div className="hh-vignette pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={topGradient} aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3" style={bottomGradient} aria-hidden />
        <div className="hh-grain pointer-events-none absolute inset-0" aria-hidden />

        <HeroStory refs={beatRefs} />

        <HeroLoader progress={loadProgress} ready={ready} />
      </div>
    </section>
  );
}
