import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Lumos Case Study, Voice AI Accessibility Assistant in Urdu",
  description:
    "Lumos is an accessibility assistant for visually impaired people, built in about two hours at the Replit x Uplift AI Voice AI Hackathon at LUMS. It sees through the camera, answers questions about the user's surroundings, and works in Urdu.",
  path: "/projects/lumos",
})

// Everything here comes from Haris's own LinkedIn post about the hackathon.
// The post names no tech stack, so none is listed; the case study template
// hides the stack section when `technologies` is empty.
const data: CaseStudyData = {
  slug: "lumos",
  client: "Lumos",
  logo: "/images/projects/lumos-icon.png",
  category: "Accessibility / Voice AI",
  industry: "Accessibility",
  partnership: "Hackathon build",
  headline: "How Lumos tells a visually impaired person what is around them, in Urdu.",
  summary:
    "An accessibility assistant for visually impaired people, built in about two hours at the Replit x Uplift AI Voice AI Hackathon at LUMS. It watches through a camera, answers questions about the user's surroundings, helps find objects, notices changes, and remembers what it saw earlier.",
  sections: [
    {
      heading: "Overview",
      body:
        "Someone who can't see well depends on the people around them to read a board, find something they put down, or tell them what just changed in the room. Not everyone has that support. At the Replit x Uplift AI Voice AI Hackathon at Lahore University of Management Sciences, I built Lumos with Shumail Hassan, Rohan Javed and Sikander Raheem to fill that gap: an assistant that sees for the user and talks to them about it.",
    },
    {
      heading: "What it does",
      bullets: [
        "Understands what is happening around the user through the camera",
        "Answers spoken questions about their surroundings",
        "Helps locate objects",
        "Notices when something around the user changes",
        "Remembers things from earlier, so the user can ask about them later",
      ],
    },
    {
      heading: "Built for Urdu speakers",
      body:
        "Accessibility only matters if the people it's for can actually use it. Lumos works in Urdu, so it is useful for people across Pakistan who are more comfortable speaking Urdu and may not always have someone around to help.",
    },
    {
      heading: "Where it could go",
      body:
        "With the right hardware and more development, Lumos could become a pair of intelligent eyes for a visually impaired person: always understanding their surroundings and telling them what they can't see.",
    },
  ],
  technologies: [],
}

export default function LumosPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Lumos", href: "/projects/lumos" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Lumos Voice AI Accessibility Assistant",
      description:
        "Accessibility assistant for visually impaired people that describes their surroundings through a camera and works in Urdu",
      url: "/projects/lumos",
      clientName: "Lumos",
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
