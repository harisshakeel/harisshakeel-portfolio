"use client"

import Image from "next/image"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The outreach emails are fantastic, and the single-task review is wonderful. Thanks for the continuous refinements — you've done a phenomenal job on this project. Please don't hesitate to use me as a reference for prospective customers.",
    name: "Naren Balasubramaniam",
    role: "CEO · Metamorphix",
    avatar: "/images/avatars/naren.jpg",
  },
  {
    quote:
      "They managed every milestone on time and kept us updated throughout. The platform works flawlessly — it's clear they really care about quality.",
    name: "Muhammad Usama",
    role: "CEO · Payback",
    avatar: "/images/avatars/usama.jpg",
  },
  {
    quote:
      "Haris transformed how we manage our business. WhatsApp automation that used to take 30 seconds now takes 3. Everything feels organized and easy.",
    name: "Fatim Naveed",
    role: "CTO · ClusterDen",
    avatar: "/images/avatars/fatim.jpg",
  },
  {
    quote:
      "Turned our site into something professional and eye-catching. Loads quickly, looks great on every device, and our clients love it.",
    name: "Shozib Haroon",
    role: "Founder · 613 Guys",
    avatar: "/images/avatars/shozib.jpg",
  },
  {
    quote:
      "Beautiful and simple to navigate. Finding local events and connecting with people has never been easier — the design really makes the platform enjoyable.",
    name: "Thomas Vettese",
    role: "CMO · Comuni",
    avatar: "/images/avatars/thomas.jpg",
  },
  {
    quote:
      "Modern, fast, and easy to understand. They focused on the design and user experience, and it shows everywhere.",
    name: "Kh Wahab",
    role: "Founder · Green N Solar",
    avatar: "/images/avatars/wahab.webp",
  },
  {
    quote:
      "Delivered exactly what we needed at a reasonable price. The product makes managing contracts, inventory, and users so much easier.",
    name: "Rashid Khan",
    role: "Founder · Meddo",
    avatar: "/images/avatars/rashid.jpg",
  },
  {
    quote:
      "Excellent work — the design, structure, and overall feel are exactly what we envisioned. Clean, professional, intuitive, and a smooth process throughout.",
    name: "Haroon Qayoum",
    role: "Executive Director · Dynasty FZC",
    avatar: "/images/avatars/haroon.jpg",
  },
]

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
}

function Card({ t, featured }: { t: Testimonial; featured?: boolean }) {
  return (
    <motion.figure
      variants={cardVariant}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[22px] border border-foreground/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_35px_90px_-35px_rgba(24,44,130,0.7)] md:p-8",
        featured && "lg:col-span-2",
      )}
    >
      {/* Hover navy wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 100% at 0% 0%, rgba(34,49,122,0.22), transparent 62%)",
        }}
      />

      <span className="relative font-mono text-xs tracking-[0.3em] text-foreground/25">
        //////
      </span>

      <blockquote
        className={cn(
          "relative mt-5 flex-1 text-pretty leading-relaxed text-foreground/85",
          featured ? "text-lg md:text-xl" : "text-[15px] md:text-base",
        )}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <figcaption className="relative mt-7 flex items-center gap-3 border-t border-foreground/10 pt-5">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-foreground/15">
          <Image
            src={t.avatar}
            alt={t.name}
            fill
            sizes="44px"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="font-display text-base uppercase leading-tight tracking-wide text-foreground">
            {t.name}
          </span>
          <span className="truncate text-[13px] text-foreground/50">{t.role}</span>
        </span>
      </figcaption>
    </motion.figure>
  )
}

export function BrutalistTestimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full scroll-mt-24 bg-background px-6 py-24 text-foreground md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/40"
          >
            (Testimonials)
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="overflow-hidden font-display uppercase leading-[0.85] tracking-[-0.01em] text-foreground"
          >
            <motion.span
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
              }}
              className="block text-[14vw] md:text-[10vw] lg:text-[9.5rem]"
            >
              Testimonials
            </motion.span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/65 md:text-lg"
          >
            Real stories from clients and collaborators who&apos;ve experienced my
            work firsthand.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <Card key={t.name} t={t} featured={i === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
