"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTimeOut } from "@/hooks/use-time-out";
import { Preloader } from "@/components/preloader/preloader";

/**
 * Route-level transition. `template.tsx` re-mounts on every navigation.
 * The page renders directly under a curtain preloader; the curtain sliding up
 * is the reveal, so the page itself isn't faded in as well.
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
      {children}
    </div>
  );
}
