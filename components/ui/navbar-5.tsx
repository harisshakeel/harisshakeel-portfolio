"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
]

export const Navbar5 = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-6">
      <nav
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between rounded-2xl",
          // pure frosted glass, no border, no ring, no inner edge highlight
          "bg-background/60 backdrop-blur-2xl",
          // soft ambient lift only
          "shadow-[0_10px_40px_-12px_rgba(0,0,0,0.55)]",
          "transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "max-w-3xl py-1.5 pl-3 pr-1.5 md:pl-4 md:pr-2"
            : "max-w-4xl py-2 pl-4 pr-2 md:pl-6 md:pr-3",
        )}
      >
        {/* Logo */}
        <Link href="#top" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logos/logo.png"
            alt="TwoPixel"
            width={32}
            height={32}
            className={cn(
              "h-7 w-auto object-contain transition-all duration-500",
              scrolled ? "md:h-7" : "md:h-8",
            )}
            priority
          />
          <span
            className={cn(
              "font-semibold tracking-tighter transition-all duration-500",
              scrolled ? "text-base" : "text-base md:text-lg",
            )}
          >
            TwoPixel
          </span>
        </Link>

        {/* Center nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden items-center gap-2 lg:flex shrink-0">
          <ThemeToggle className={cn(scrolled ? "h-8 w-8" : "h-9 w-9")} />
          <Link
            href="#contact"
            aria-label="Let's talk"
            className={cn(
              "inline-flex items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_rgba(168,85,247,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/90",
              scrolled ? "h-9 w-9 gap-0 px-0" : "h-10 gap-1.5 px-4",
            )}
          >
            <span
              className={cn(
                "whitespace-nowrap text-sm font-medium transition-all duration-300",
                scrolled ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100",
              )}
            >
              Let's talk
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle className="h-9 w-9" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          <SheetContent side="top" className="max-h-screen overflow-auto">
            <SheetHeader>
              <SheetTitle>
                <Link href="#top" className="flex items-center gap-2">
                  <Image
                    src="/logos/logo.png"
                    alt="Haris Shakeel"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-lg font-semibold tracking-tighter">Haris Shakeel</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link href={link.href} className="rounded-lg px-2 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted/70 hover:text-foreground">
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild className="mt-4 gap-1.5">
                  <Link href="#contact">
                    Let's talk
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}
