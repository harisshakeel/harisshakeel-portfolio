"use client";

import { motion, type Variants } from "framer-motion";
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDimensions } from "@/hooks/use-dimensions";
import { fade, slideUp } from "./variants";

const getPageTitle = (path: string | null) => {
  if (!path || path === "/") return "Home";
  const segments = path.split("/").filter(Boolean);
  const segment = segments[segments.length - 1];
  if (!segment) return "Home";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

export function Preloader() {
  const pathname = usePathname();
  const { width, height } = useDimensions();
  const title = getPageTitle(pathname);

  const initialPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height + 300} 0 ${height}  L0 0`;
  const targetPath = `M0 0 L${width} 0 L${width} ${height} Q${width / 2} ${height} 0 ${height}  L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      // Sized with top/left + h-screen/w-screen. The exit slides it up with a
      // `y` transform (see variants.ts), which doesn't count as a layout shift.
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center cursor-wait bg-background text-foreground"
      variants={slideUp}
      initial="initial"
      exit="exit"
    >
      {width > 0 ? (
        <>
          <motion.div
            className="text-3xl md:text-4xl flex items-center"
            variants={fade}
            initial="initial"
            animate="enter"
          >
            <Dot size={48} className="me-3" />
            <p>{title}</p>
          </motion.div>
          <motion.svg className="absolute top-0 -z-10 h-[calc(100%+300px)] w-full">
            <motion.path
              className="fill-background"
              variants={curve}
              initial="initial"
              exit="exit"
            />
          </motion.svg>
        </>
      ) : null}
    </motion.div>
  );
}
