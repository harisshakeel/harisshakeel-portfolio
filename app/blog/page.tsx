import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { BlogFeed, type BlogPost } from "@/components/ui/blog-feed"

export const metadata: Metadata = buildPageMetadata({
  title: "Blog, Web Development, AI & Digital Business Insights",
  description:
    "The TwoPixel blog covers web development, AI automations, SaaS product building, and digital business growth. Practical insights from two founders who build for a living.",
  path: "/blog",
})

const posts: BlogPost[] = [
  {
    id: 1,
    title: "How to Build a SaaS MVP in 4 Weeks",
    excerpt:
      "A practical playbook for taking a SaaS idea from sketch to a paying-customer-ready MVP in four weeks, what to ship, what to skip, and the stack we keep reaching for.",
    category: "SaaS",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&h=1000&fit=crop&auto=format",
    href: "/blog",
    author: { name: "TwoPixel Team" },
    date: "Apr 22, 2026",
    readTime: 8,
  },
  {
    id: 2,
    title: "AI Automations That Actually Save Time",
    excerpt:
      "Most AI automations are demos that quietly break in production. Here are the patterns we use with clients that are boring, durable, and pay for themselves within a quarter.",
    category: "AI & Automation",
    imageUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&h=1000&fit=crop&auto=format",
    href: "/blog",
    author: { name: "TwoPixel Team" },
    date: "Apr 9, 2026",
    readTime: 6,
  },
  {
    id: 3,
    title: "Why We Use Next.js for Every Web Project",
    excerpt:
      "After shipping dozens of marketing sites, dashboards, and portals, Next.js keeps winning the bake-off. Here's what we love, what we work around, and where it doesn't fit.",
    category: "Web Development",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&h=1000&fit=crop&auto=format",
    href: "/blog",
    author: { name: "TwoPixel Team" },
    date: "Mar 28, 2026",
    readTime: 5,
  },
]

export default function BlogPage() {
  const crumbs = [{ name: "Blog", href: "/blog" }]
  const schema = breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs])

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogFeed posts={posts} />
    </PageLayout>
  )
}
