import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CallToAction1Props {
  eyebrow?: string
  heading: string
  ctaLabel: string
  ctaHref: string
  avatars?: { src: string; alt: string }[]
  className?: string
}

const defaultAvatars = [
  { src: "/images/avatars/usama.jpg", alt: "Muhammad Usama" },
  { src: "/images/avatars/fatim.jpg", alt: "Fatim Naveed" },
  { src: "/images/avatars/thomas.jpg", alt: "Thomas Vettese" },
]

export function CallToAction1({
  eyebrow = "Join 30+ founders we've shipped with",
  heading,
  ctaLabel,
  ctaHref,
  avatars = defaultAvatars,
  className,
}: CallToAction1Props) {
  return (
    <div
      className={cn(
        "relative isolate mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center md:py-24",
        className,
      )}
    >
      {/* Soft purple glow, sits behind the content, fades into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[860px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(168,85,247,0.22),rgba(168,85,247,0.06)_45%,transparent_75%)]"
      />

      {/* Eyebrow pill */}
      <div className="flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/[0.03] py-1 pl-1 pr-4 text-xs font-medium tracking-tight text-foreground/85 backdrop-blur">
        <div className="flex items-center">
          {avatars.map((a, i) => (
            <div
              key={a.src}
              className={cn(
                "relative size-6 overflow-hidden rounded-full ring-2 ring-background",
                i > 0 && "-ml-2",
              )}
            >
              <Image
                src={a.src}
                alt={a.alt}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
          ))}
        </div>
        <span>{eyebrow}</span>
      </div>

      {/* Heading */}
      <h2 className="mt-7 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.03em] text-foreground md:text-5xl md:leading-[1.05] lg:text-[56px]">
        {heading}
      </h2>

      {/* CTA */}
      <Link
        href={ctaHref}
        className="group mt-9 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold tracking-tight text-background transition-all hover:bg-foreground/90"
      >
        {ctaLabel}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}

export default CallToAction1
