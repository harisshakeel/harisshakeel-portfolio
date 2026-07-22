import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Destiny.pk Case Study, Online Jewelry Store for Designer's Destiny",
  description:
    "How TwoPixel built Destiny.pk: an online jewelry store for Designer's Destiny with a curated catalog of AD silver necklace sets, bangles, earrings, and rings, plus cart, wishlist, and WhatsApp ordering.",
  path: "/projects/destiny",
})

const data: CaseStudyData = {
  slug: "destiny",
  client: "Designer's Destiny",
  logo: "/images/projects/destiny/screen-1.png",
  category: "Ecommerce / Jewelry",
  industry: "Jewelry Retail",
  website: { url: "https://destiny.pk", label: "destiny.pk" },
  liveUrl: "https://destiny.pk",
  liveLabel: "Visit store",
  headline: "An online jewelry store built to turn browsers into buyers.",
  summary:
    "A fast, mobile-first ecommerce storefront for Designer's Destiny, showcasing AD silver necklace sets, bangles, earrings, rings, and bracelets with a frictionless path from product page to checkout and WhatsApp order.",
  sections: [
    {
      heading: "Overview",
      body:
        "Designer's Destiny needed an online jewelry store that did justice to their pieces, where high-detail product photography of AD silver and pearl sets loads instantly, collections are easy to browse, and ordering feels effortless on a phone. We built a storefront that puts the jewelry first, with clean category navigation, rich product pages, and a checkout flow tuned for conversion and trust.",
    },
    {
      heading: "What we built",
      bullets: [
        "Curated product catalog organized by collection: bangles, sets, locket sets, earrings, rings, bracelets, and a men's collection",
        "Detailed product pages with image zoom, multiple angles, pricing, SKU, availability, and social proof badges",
        "Shopping cart, wishlist, and a one-tap \"Buy it now\" flow for quick checkout",
        "WhatsApp ordering integration so customers can confirm and place orders in a single tap",
        "Featured products, new arrivals, and customer testimonials to drive discovery and build trust",
        "Mobile-first responsive design with optimized jewelry imagery for fast loads on every device",
      ],
    },
    {
      heading: "Results",
      body:
        "The store gives Designer's Destiny a polished, scalable home for their catalog, from seasonal Eid gifting sets to everyday silver, with a shopping experience that holds up under traffic and converts on mobile where most of their customers shop.",
    },
  ],
  technologies: [
    "Shopify",
    "Storefront",
    "Product",
    "Cart & Wishlist",
    "Product Catalog",
    "WhatsApp Ordering",
    "CRO",
    "Responsive Design",
    "SEO",
  ],
}

export default function DestinyPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Destiny.pk", href: "/projects/destiny" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Destiny.pk Jewelry Store",
      description: "Online jewelry store for Designer's Destiny with catalog, cart, wishlist, and WhatsApp ordering",
      url: "/projects/destiny",
      clientName: "Designer's Destiny",
    }),
  ]

  return (
    <PageLayout>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <CaseStudy data={data} />
    </PageLayout>
  )
}
