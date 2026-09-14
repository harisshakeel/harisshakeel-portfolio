/**
 * Single source of truth for the frame sequence and the five-beat scroll
 * story. The palette lives in `@/lib/palette` — shared with the premium nav.
 */
export { PALETTE } from "@/lib/palette";

export const FRAME_COUNT = 45;
/**
 * The source stills are 1280x720. Stored here at 3840x2160 (true 4K, a 3x
 * Lanczos3 upscale with a mild sharpen pass) — done once at build time
 * rather than by the canvas on every paint. At 1920x1080 the browser was
 * still *upscaling* live on any display wider than that (most laptops,
 * doubly so on retina), which is what was still reading as soft; at 4K the
 * canvas is downscaling on every realistic display instead, which always
 * looks sharp regardless of algorithm. This is resampling, not new detail —
 * it cannot fully replace higher-resolution source frames if those become
 * available, but it is the ceiling of what's achievable from the originals.
 */
export const FRAME_WIDTH = 3840;
export const FRAME_HEIGHT = 2160;

/** `public/images/haris-hero/frame_001.webp` … `frame_045.webp`. */
export const FRAME_SRCS: readonly string[] = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/haris-hero/frame_${String(i + 1).padStart(3, "0")}.webp`,
);

/** Haris sits dead centre through the entire sequence — no focal overrides needed. */
export const FOCAL_X = 0.5;

/**
 * How long the pinned journey runs, in viewport heights — five typographic
 * beats over the same frame sequence, so this is longer than the previous
 * single-statement hero's 280vh.
 */
export const SCROLL_LENGTH_VH = 400;

/** Total scale drift across the whole journey — restrained, same ceiling as before. */
export const MAX_DRIFT_SCALE = 1.05;

export type Beat = {
  id: "identity" | "capability" | "agentic" | "fullstack" | "ship";
  /** Normalized scroll progress, 0–1. */
  start: number;
  end: number;
};

/**
 * The five beats, in the order they play: identity → capability →
 * specialisation → range → execution. Each beat's own markup lives in
 * `hero-story.tsx` — this only times when it's visible, since the visual
 * treatment differs too much beat to beat for one shared template.
 */
export const BEATS: readonly Beat[] = [
  { id: "identity", start: 0, end: 0.17 },
  { id: "capability", start: 0.17, end: 0.38 },
  { id: "agentic", start: 0.38, end: 0.58 },
  { id: "fullstack", start: 0.58, end: 0.78 },
  { id: "ship", start: 0.78, end: 1 },
] as const;

/** Portion of a beat's own width spent fading in/out, each side. */
export const BEAT_FADE_FRACTION = 0.22;

export type OrbitLabel = {
  code: string;
  description: string;
};

/** The four labels orbiting the "agentic" beat's heading. */
export const ORBIT_LABELS: readonly OrbitLabel[] = [
  { code: "REASON", description: "Decompose complex problems" },
  { code: "PLAN", description: "Choose tools and actions" },
  { code: "EXECUTE", description: "Perform real work" },
  { code: "VALIDATE", description: "Check before delivery" },
] as const;

/** Roles cycled on hover over the name in the identity beat. */
export const NAME_ROLES: readonly string[] = [
  "AI/ML Engineer",
  "Agentic AI Developer",
  "Full-Stack Builder",
  "Product Thinker",
] as const;

export const HERO_DESCRIPTION =
  "Haris Shakeel, portrait build: a network of agentic-AI motifs — connection paths, circuit diagrams, a halo of light — assembles progressively around a still portrait as the section is scrolled, while five typographic statements introduce his identity, capability, specialisation, range and how he ships.";
