"use client"

import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react"

type TransitionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode
  }

/**
 * Wraps next/link with the View Transitions API. When the browser supports
 * `document.startViewTransition`, navigations are wrapped so any DOM elements
 * sharing a `viewTransitionName` morph smoothly between pages. Falls back to
 * a normal Next.js client-side navigation everywhere else.
 */
export function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented) return

    // Modifier or middle-click → let the browser open in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return

    if (typeof href !== "string") return
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return
    }

    const doc = document as Document & {
      startViewTransition?: (callback: () => void | Promise<void>) => unknown
    }
    if (typeof doc.startViewTransition !== "function") return

    e.preventDefault()

    // Synchronous handoff to next/router. The browser holds the old snapshot
    // and grabs the new one on the next paint after router.push commits.
    doc.startViewTransition(() => {
      router.push(href)
    })
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
