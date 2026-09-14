"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

import { FOCAL_X, FRAME_HEIGHT, FRAME_WIDTH } from "./config";

export type FrameSequenceHandle = {
  /** Paint one preloaded frame. Coalesced to one draw per animation frame. */
  drawFrame: (index: number, image: HTMLImageElement) => void;
};

type FrameSequenceProps = {
  className?: string;
};

/**
 * A cover-cropped canvas that paints whichever frame it is told to.
 *
 * No animation loop lives here — the scroll timeline decides which frame is
 * current and calls `drawFrame`, so nothing redraws while the hero is out of
 * view or the scroll is idle. Multiple calls within one tick collapse to a
 * single `drawImage`.
 */
export const FrameSequence = forwardRef<FrameSequenceHandle, FrameSequenceProps>(
  function FrameSequence({ className = "" }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pendingRef = useRef<{ index: number; image: HTMLImageElement } | null>(null);
    const paintedRef = useRef<{ index: number; image: HTMLImageElement } | null>(null);
    const rafRef = useRef<number | null>(null);

    const paint = useCallback((index: number, image: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (cssWidth === 0 || cssHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.round(cssWidth * dpr);
      const pixelHeight = Math.round(cssHeight * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      const scale = Math.max(pixelWidth / FRAME_WIDTH, pixelHeight / FRAME_HEIGHT);
      const drawWidth = FRAME_WIDTH * scale;
      const drawHeight = FRAME_HEIGHT * scale;
      const offsetX = -(drawWidth - pixelWidth) * FOCAL_X;
      const offsetY = -(drawHeight - pixelHeight) / 2;

      ctx.clearRect(0, 0, pixelWidth, pixelHeight);
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      paintedRef.current = { index, image };
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        drawFrame(index, image) {
          pendingRef.current = { index, image };
          if (rafRef.current !== null) return;
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;
            const pending = pendingRef.current;
            if (pending) paint(pending.index, pending.image);
          });
        },
      }),
      [paint],
    );

    //? Repaints the last frame at the new canvas size — orientation changes
    //? and window resizes don't otherwise trigger a redraw.
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || typeof ResizeObserver === "undefined") return;

      const ro = new ResizeObserver(() => {
        const painted = paintedRef.current;
        if (painted) paint(painted.index, painted.image);
      });
      ro.observe(canvas);
      return () => ro.disconnect();
    }, [paint]);

    useEffect(() => {
      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  },
);
