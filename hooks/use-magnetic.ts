"use client";

import { useCallback, useState, type PointerEvent, type RefObject } from "react";

/**
 * Pulls an element toward the pointer while it hovers (mouse only) and lets it
 * spring back on leave. `strength` is the fraction of the pointer's offset from
 * the element's centre that the element follows.
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.35) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerMove = useCallback(
    (event: PointerEvent<T>) => {
      if (event.pointerType !== "mouse" || !ref.current) return;
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      setPosition({
        x: (event.clientX - (left + width / 2)) * strength,
        y: (event.clientY - (top + height / 2)) * strength,
      });
    },
    [ref, strength],
  );

  const onPointerLeave = useCallback(() => setPosition({ x: 0, y: 0 }), []);

  return { position, onPointerMove, onPointerLeave };
}
