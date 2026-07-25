import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { ContactFloatingHero } from "@/components/ui/contact-floating-hero"
import { FullScreenSignup } from "@/components/ui/full-screen-signup"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Contact TwoPixel, Start Your Project",
  description:
    "Get in touch with TwoPixel to discuss your web development, mobile app, AI automation, or design project. We respond within 24 hours. WhatsApp: +92 322 4778575.",
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
