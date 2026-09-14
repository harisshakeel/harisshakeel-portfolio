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

      // Arriving on /#about, /#work, etc. from another page: the reset above
      // would otherwise undo the anchor. Wait a beat for the preloader to
      // unmount and layout to settle, then jump, clearing the fixed nav.
      const { hash } = window.location;
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (target) {
        window.setTimeout(() => {
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90 });
        }, 150);
      }
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
