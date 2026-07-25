import Image from "next/image"

import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar: string
  /** Optional client logo / wordmark shown on the card's right side */
  logo?: string
  /** Set true when the logo is a full-color image with its own background
   * (e.g. a wordmark on a solid block), skips the brightness/invert filter
   * that's applied to dark-on-transparent raster logos. */
  logoOpaque?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote:
      "They managed every milestone on time and kept us updated throughout. The platform works flawlessly, it's clear they really care about quality.",
    name: "Muhammad Usama",
    role: "CEO",
    company: "Payback",
    avatar: "/images/avatars/usama.jpg",
    logo: "/images/projects/payback.png",
  },
  {
    quote:
      "Haris transformed how we manage our business. WhatsApp automation that used to take 30 seconds now takes 3. Everything feels organized and easy.",
    name: "Fatim Naveed",
    role: "CTO",
    company: "ClusterDen",
    avatar: "/images/avatars/fatim.jpg",
    logo: "/images/projects/clusterden.svg",
  },
  {
    quote:
      "Turned our site into something professional and eye-catching. Loads quickly, looks great on every device, and our clients love it.",
    name: "Shozib Haroon",
    role: "Founder",
    company: "613 Guys",
    avatar: "/images/avatars/shozib.jpg",
    logo: "/images/projects/613guys.png",
  },
  {
    quote:
      "Beautiful and simple to navigate. Finding local events and connecting with people has never been easier. The design really makes the platform enjoyable.",
    name: "Thomas Vettese",
    role: "CMO",
    company: "Comuni",
    avatar: "/images/avatars/thomas.jpg",
    logo: "/images/projects/comuni.png",
  },
  {
    quote:
      "Modern, fast, and easy to understand. They focused on the design and user experience, and it shows everywhere.",
    name: "Kh Wahab",
    role: "Founder",
    company: "Green N Solar",
    avatar: "/images/avatars/wahab.webp",
    logo: "/images/projects/gns.png",
  },
  {
    quote:
      "Delivered exactly what we needed at a reasonable price. The product makes managing contracts, inventory, and users so much easier.",
    name: "Rashid Khan",
    role: "Founder",
    company: "Meddo",
    avatar: "/images/avatars/rashid.jpg",
    logo: "/images/projects/meddo.png",
    logoOpaque: true,
  },
  {
    quote:
      "Excellent work, the design, structure, and overall feel are exactly what we envisioned. Clean, professional, intuitive. Smooth process throughout.",
    name: "Haroon Qayoum",
    role: "Executive Director",
    company: "Dynasty FZC",
    avatar: "/images/avatars/haroon.jpg",
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative flex h-full w-[420px] shrink-0 flex-col overflow-hidden rounded-2xl border border-foreground/[0.07] bg-gradient-to-b from-foreground/[0.025] to-foreground/[0.005] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_hsl(var(--glow)/0.04)] backdrop-blur sm:w-[520px]">
      {/* Hover wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_0%_0%,rgba(168,85,247,0.10),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Top hairline accent on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Quote */}
      <p className="px-7 pt-7 pb-6 text-balance text-[19px] font-light leading-[1.4] tracking-[-0.012em] text-foreground/90 sm:text-[22px] sm:leading-[1.35]">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Footer */}
      <div className="mt-auto flex border-t border-foreground/[0.06]">
        {/* Avatar + identity */}
        <div className="flex flex-1 items-center gap-3 px-5 py-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/10">
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              sizes="40px"
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[14.5px] font-medium leading-tight text-foreground">
              {t.name}
            </span>
            <span className="truncate text-[12.5px] leading-tight text-foreground/50">
              {t.role} · {t.company}
            </span>
          </div>
        </div>

        {/* Divider + logo */}
        <div className="w-px bg-foreground/[0.06]" />
        <div className="flex w-[140px] shrink-0 items-center justify-center px-4">
          {t.logo ? (
            <Image
              src={t.logo}
              alt={`${t.company} logo`}
              width={120}
              height={28}
              className={cn(
                "max-h-7 w-auto transition-all duration-500",
                // SVG logos carry their own brand colors, start desaturated,
                // restore on hover. Raster logos are dark-on-white: in light
                // mode show them as-is (dark ink), in dark mode invert to white.
                // Opaque logos (own background) keep their colors but start
                // desaturated like SVGs, restore on hover.
                t.logoOpaque
                  ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                  : t.logo.endsWith(".svg")
                    ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                    : "brightness-0 opacity-70 dark:invert group-hover:opacity-100",
              )}
            />
          ) : (
            <span className="text-[13px] font-medium tracking-tight text-foreground/55">
              {t.company}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function TestimonialGridSection({ limit }: { limit?: number } = {}) {
  // The marquee always shows everything (limit is kept for API compat but
  // ignored, a sliding strip with only 3 cards looks empty).
  void limit
  const doubled = [...testimonials, ...testimonials]

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Section header */}
      <div className="mx-auto mb-12 max-w-3xl px-6 text-center md:mb-16">
        <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
          What clients say
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
          Trusted by founders
          <br />
          <span className="italic font-normal text-foreground/55">
            shipping at speed.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-foreground/70 md:text-base">
          Real reviews from CEOs, CTOs, and execs who chose Haris to build,
          ship, and stay running long after launch.
        </p>
      </div>

      {/* Sliding marquee */}
      <div
        className="relative flex shrink-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to left, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div className="animate-x-slider flex w-max gap-5">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
