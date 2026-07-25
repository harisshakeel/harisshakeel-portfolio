"use client"

import { motion } from "framer-motion"

/**
 * Route-level transition. `template.tsx` re-mounts on every navigation, so this
 * fades each page in — giving smooth page-to-page transitions across the whole
 * portfolio. Opacity-only (no transform) so the fixed navbar stays fixed.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
