"use client"

import { cn } from "@/lib/utils"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  category: string
  imageUrl: string
  href: string
  views: number
  readTime?: number
  rating?: number
  className?: string
}

interface GridSectionProps {
  title: string
  description?: string
  backgroundLabel?: string
  backgroundPosition?: "left" | "right"
  posts?: BlogPost[]
  className?: string
  onPostClick?: (post: BlogPost) => void
}

/* ─── Animated letter ──────────────────────────────────── */

const letterVariants: Variants = {
  hover: { y: "-50%" },
}

function AnimatedLetter({ letter }: { letter: string }) {
  return (
    <div className="inline-block h-[1.15em] overflow-hidden">
      <motion.span
        className="flex min-w-[4px] flex-col font-semibold"
        style={{ y: "0%" }}
        variants={letterVariants}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <span>{letter}</span>
        <span>{letter}</span>
      </motion.span>
    </div>
  )
}

/* ─── BlogPostsGrid ────────────────────────────────────── */

export function BlogPostsGrid({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  onPostClick,
}: GridSectionProps) {
  return (
    <section className={cn("container relative my-20 py-10 mx-auto px-4", className)}>
      <h1 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2">
        {title}
      </h1>

      {backgroundLabel && (
        <span
          className={cn(
            "absolute -top-10 -z-50 select-none text-[180px] font-extrabold leading-[1] text-foreground/[0.025] md:text-[250px] lg:text-[400px]",
            backgroundPosition === "left" ? "-left-[18%]" : "-right-[28%]",
          )}
        >
          {backgroundLabel}
        </span>
      )}

      {description && (
        <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-foreground/50 md:text-2xl mb-8">
          {description}
        </p>
      )}

      <div className="grid h-auto grid-cols-1 gap-5 md:h-[650px] md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]">
        {posts.map((post, index) => {
          const { id, title: postTitle, category, imageUrl, views, readTime, rating = 4, href } = post
          const isPrimary = index === 0

          return (
            <motion.a
              key={id}
              href={href}
              whileHover="hover"
              transition={{ staggerChildren: 0.03 }}
              style={{ backgroundImage: `url(${imageUrl})` }}
              className={cn(
                "group relative row-span-1 flex size-full cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-5 text-white max-md:h-[300px]",
                isPrimary && "col-span-1 row-span-1 md:col-span-2 md:row-span-2 lg:col-span-1",
              )}
              onClick={() => onPostClick?.(post)}
            >
              {/* B&W → colour layer */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 saturate-0 group-hover:saturate-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />

              {/* Content */}
              <article className="relative z-10 flex items-end">
                <div className="flex flex-1 flex-col gap-3">
                  {/* Animated title */}
                  <h2
                    className={cn(
                      "font-semibold leading-tight",
                      isPrimary ? "text-3xl md:text-4xl" : "text-xl md:text-2xl",
                    )}
                  >
                    {postTitle.split("").map((letter, i) => (
                      <AnimatedLetter key={i} letter={letter === " " ? "\u00A0" : letter} />
                    ))}
                  </h2>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm capitalize py-px px-2 rounded-md bg-white/40 w-fit text-white backdrop-blur-md">
                      {category}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            width={14}
                            height={14}
                            stroke={idx < rating ? "#ffa534" : "#B9B8B8aa"}
                            fill={idx < rating ? "#ffa534" : "#B9B8B8aa"}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-thin">({views} views)</span>
                    </div>
                    {readTime && <div className="text-sm font-semibold">{readTime} min read</div>}
                  </div>
                </div>

                {/* Rotating arrow */}
                <ArrowRight
                  className="shrink-0 transition-transform duration-500 group-hover:-rotate-45"
                  color="white"
                  width={32}
                  height={32}
                  strokeWidth={1.25}
                />
              </article>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
