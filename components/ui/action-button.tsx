"use client";

import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const EASE_IN_EXPO = "ease-[cubic-bezier(0.7,0,0.84,0)]";

const VARIANTS = {
  solid: {
    base: "border-[#161A15] bg-[#161A15] text-[#F5F3EC]",
    fill: "bg-[#D2E76A]",
    hoverText: "group-hover:text-[#161A15]",
  },
  outline: {
    base: "border-[#161A15]/20 text-[#161A15]",
    fill: "bg-[#161A15]",
    hoverText: "group-hover:text-[#F5F3EC]",
  },
} as const;

type ActionButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
};

/**
 * Pill CTA, ported from the AsmaPortfolio: a fill sweeps up from the floor on
 * hover and the arrow steps the way it points (diagonal for external links).
 * Routes render a Next `Link`; hashes and external URLs a plain anchor, so
 * Lenis's anchor handling and new-tab links keep working.
 */
export function ActionButton({ href, children, variant = "solid", className }: ActionButtonProps) {
  const external = /^https?:\/\//.test(href);
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const v = VARIANTS[variant];

  const classes = cn(
    "group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full border px-7 font-sans text-sm tracking-tight md:h-14 md:px-8 md:text-base",
    v.base,
    className,
  );

  const content = (
    <>
      <span
        aria-hidden
        className={cn("absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100", EASE_IN_EXPO, v.fill)}
      />
      <span className={cn("relative whitespace-nowrap transition-colors duration-500", v.hoverText)}>{children}</span>
      <Arrow
        strokeWidth={1.5}
        className={cn(
          "relative size-4 transition-[transform,color] duration-500",
          EASE_IN_EXPO,
          v.hoverText,
          external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
        )}
      />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} data-cursor className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-cursor
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
