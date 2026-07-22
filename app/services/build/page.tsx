import type { Metadata } from "next"

import { PageLayout } from "@/components/page-layout"
import { BuildPageContent } from "@/components/services/build-page-content"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Build, Web Apps, Mobile Apps & SaaS MVPs",
  description:
    "Marketing sites, web apps, mobile apps, and storefronts engineered for speed, conversion, and the kind of polish your team won't outgrow.",
  path: "/services/build",
})

export default function BuildPage() {
  return (
    <PageLayout>
      <BuildPageContent />
    </PageLayout>
  )
}
