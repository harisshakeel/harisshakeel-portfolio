import { Variants } from "framer-motion";

// Slide with a transform, not `top`: animating `top` on a full-screen fixed
// element registers a layout shift every frame (~0.8 CLS per page load).
export const slideUp: Variants = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export const fade: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 1, delay: 0.2 },
  },
};
