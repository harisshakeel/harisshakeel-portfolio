"use client";

import { PALETTE } from "./config";

type HeroLoaderProps = {
  /** 0–100. */
  progress: number;
  ready: boolean;
};

/**
 * Minimal preload state: obsidian ground, a thin chartreuse progress line.
 *
 * Stays mounted (rather than unmounting at `ready`) so the opacity
 * transition can fade it out instead of popping.
 */
export function HeroLoader({ progress, ready }: HeroLoaderProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ease-out"
      style={{
        backgroundColor: PALETTE.obsidian,
        opacity: ready ? 0 : 1,
        pointerEvents: ready ? "none" : "auto",
      }}
    >
      <div
        className="h-px w-40 overflow-hidden md:w-56"
        style={{ backgroundColor: `${PALETTE.sage}33` }}
      >
        <div
          className="h-full origin-left transition-transform duration-200 ease-out"
          style={{ backgroundColor: PALETTE.chartreuse, transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </div>
  );
}
