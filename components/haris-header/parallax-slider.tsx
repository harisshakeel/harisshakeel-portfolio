"use client";

import { useRef } from "react";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

interface ParallaxSliderProps {
  children: React.ReactNode;
  baseVelocity?: number;
  repeat?: number;
}

/**
 * Velocity-sensitive parallax text slider — the text scrolls continuously,
 * and accelerates in the scroll direction when the user scrolls.
 *
 * Modelled on the pattern used in the AsmaPortfolio header for the large
 * name marquee.
 */
export function ParallaxSlider({
  children,
  baseVelocity = 2,
  repeat = 4,
}: ParallaxSliderProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div className="inline-flex" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="inline-block">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
