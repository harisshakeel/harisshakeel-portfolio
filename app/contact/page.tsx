import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { ContactFloatingHero } from "@/components/ui/contact-floating-hero"
import { FullScreenSignup } from "@/components/ui/full-screen-signup"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Contact & Hire",
  description:
    "Contact Haris Shakeel about AI/ML roles, freelance projects, and collaborations in computer vision, machine learning, and agentic AI. Email or book a call.",
  path: "/contact",
})

export default function ContactPage() {
  const crumbs = [{ name: "Contact", href: "/contact" }]
  const schema = breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs])

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactFloatingHero />
      <FullScreenSignup />
    </PageLayout>
  )
}
