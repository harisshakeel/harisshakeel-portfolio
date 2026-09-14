"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTimeOut } from "@/hooks/use-time-out";
import { Preloader } from "@/components/preloader/preloader";

/**
 * Route-level transition. `template.tsx` re-mounts on every navigation.
 * Uses a curtain animation preloader and fades the page in.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();

  useTimeOut({
    callback: () => {
      setLoading(false);
      window.scrollTo(0, 0);
    },
    duration: 1000,
    deps: [],
  });

  return (
    <div key={pathname} className="overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? <Preloader /> : null}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: isLoading ? 0 : 0.45 } }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
