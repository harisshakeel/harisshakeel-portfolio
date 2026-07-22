"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface BlogPost {
  id: number | string
  title: string
  excerpt: string
  category: string
  imageUrl: string
  href: string
  author: { name: string; avatarUrl?: string }
  date: string
  readTime?: number
}

interface BlogFeedProps {
  posts: BlogPost[]
  categories?: string[]
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ALL = "Everything"

export function BlogFeed({ posts, categories }: BlogFeedProps) {
  const tabs = useMemo(() => {
    if (categories?.length) return [ALL, ...categories]
    const unique = Array.from(new Set(posts.map((p) => p.category)))
    return [ALL, ...unique]
  }, [posts, categories])

  const [active, setActive] = useState(ALL)

  const filtered = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  )

  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-32 pt-12 md:px-10 md:pt-16">
      {/* Category filter row */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-foreground/[0.07] md:mb-20"
        aria-label="Filter posts"
      >
        {tabs.map((tab) => {
          const isActive = active === tab
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "relative pb-4 text-base font-medium transition-colors md:text-lg",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/80",
              )}
            >
              {tab}
              {isActive && (
                <motion.span
                  layoutId="blog-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-primary"
                  transition={{ duration: 0.4, ease: easeOut }}
                />
              )}
            </button>
          )
        })}
      </motion.nav>

      {/* Posts grid */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-20">
        {filtered.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No posts in this category yet.
        </p>
      )}
    </section>
  )
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: Math.min(index * 0.06, 0.24) }}
    >
      <a href={post.href} className="group block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover saturate-0 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:saturate-100"
            loading="lazy"
          />
        </div>

        {/* Body */}
        <div className="mt-6">
          {/* Category pill */}
          <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary ring-1 ring-inset ring-primary/20">
            {post.category}
          </span>

          {/* Title */}
          <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors group-hover:text-foreground md:text-[28px] md:leading-[1.2]">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-6 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2.5">
              <Avatar author={post.author} />
              <span className="font-medium text-foreground/90">{post.author.name}</span>
            </div>
            <span aria-hidden className="h-4 w-px bg-foreground/15" />
            <time className="text-muted-foreground">{post.date}</time>
            {post.readTime ? (
              <>
                <span aria-hidden className="h-4 w-px bg-foreground/15" />
                <span className="text-muted-foreground">{post.readTime} min read</span>
              </>
            ) : null}
          </div>
        </div>
      </a>
    </motion.article>
  )
}

function Avatar({ author }: { author: BlogPost["author"] }) {
  if (author.avatarUrl) {
    return (
      <img
        src={author.avatarUrl}
        alt={author.name}
        className="h-7 w-7 rounded-full object-cover ring-1 ring-foreground/10"
        loading="lazy"
      />
    )
  }
  const initials = author.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary ring-1 ring-primary/20">
      {initials}
    </span>
  )
}
