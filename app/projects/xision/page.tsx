import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Xision Case Study, AI Virtual Try-On and Fit Simulation",
  description:
    "How Xision turns a single phone scan into a measurement-accurate 3D body model and physically simulates garment drape on it, returning a fit score, size recommendation, and per-zone pressure map.",
  path: "/projects/xision",
})

const data: CaseStudyData = {
  slug: "xision",
  client: "Xision",
  logo: "/images/projects/xision-pipeline.svg",
  category: "Computer Vision / 3D Fit Simulation",
  industry: "Fashion technology",
  partnership: "Ongoing",
  headline:
    "How Xision predicts whether a garment will actually fit you, before you buy it.",
  summary:
    "A single smartphone scan becomes a measurement-accurate 3D digital body model. Real garments are then run through a cloth-physics engine on that exact body, so instead of a size chart the shopper gets a simulated try-on: how the garment drapes, where it pulls, a fit score, a recommended size, and a pressure map per body zone.",
  model: {
    src: "/models/xision-avatar.glb",
    alt: "Interactive 3D avatar produced by the Xision pipeline, wearing a garment draped by the cloth solver",
    caption:
      "Actual pipeline output: a measurement-accurate avatar with the garment physically draped on it by the cloth solver. This is what the shopper sees instead of a size chart.",
  },
  sections: [
    {
      heading: "Overview",
      body:
        "Online fashion returns are dominated by fit. Size charts are guesses, and a 'medium' means something different in every store, so shoppers over-order, return most of it, and the brand and the landfill absorb the waste. Xision replaces the size chart with a simulation: extract real measurements from an ordinary phone scan, build a body model from them, and physically drape the actual garment on it. The output is not a recommendation pulled from a lookup table. It is derived from geometry produced by a cloth solver running on that specific body.",
    },
    {
      heading: "Body measurement extraction",
      bullets: [
        "A FastAPI service that fuses MediaPipe pose landmarks and segmentation masks with a MiDaS monocular depth map running under ONNX Runtime",
        "Silhouette widths give one axis and depth gives the other; Ramanujan's ellipse approximation converts the pair into true circumferences for chest, waist, and hip rather than width-only estimates",
        "Multi-view fusion across three capture angles, with SMPL-X parametric body fitting for the full measurement set",
      ],
    },
    {
      heading: "Measurements to a simulation-ready avatar",
      body:
        "The obvious approach, importing the raw scan mesh, breaks the cloth solver, because a scanned mesh has no clean skeleton or skinning. I made the pipeline measurement-driven rather than mesh-driven: morph a simulation-safe parametric base avatar to the person's real measurements and export that as the drape body. That meant reverse-engineering the engine's undocumented measurement-parameter table and building a mapping layer to bridge girth-versus-width semantics, unit normalization, and aliases across three upstream schemas, with deterministic builds cached per body-model version so one build is reused across every subsequent garment.",
    },
    {
      heading: "Drape and fit derivation",
      bullets: [
        "A job runner that loads a garment asset, drapes it on the user's avatar, and extracts every output (rendered views, 3D mesh, and pressure maps) with typed failure classification, so a missing or bad asset fails loudly instead of silently returning a default mannequin",
        "The physics engine emits geometry, not answers: I wrote the pure, unit-tested model that turns measurements plus a garment size chart into a fit score, size recommendation, confidence percentage, and per-zone verdicts",
        "Category-aware zone weighting (tops judged on chest and waist, bottoms on waist, hip, and inseam) with a robust Geman–McClure loss so a single bad measurement cannot dominate the score",
        "A validation harness that regenerates the full output set across a matrix of garments and body types and asserts fit, size, and zone expectations per cell, so simulation quality is a test that fails rather than a vibe",
      ],
    },
    {
      heading: "Engineering judgment",
      body:
        "Most of the pipeline was gated on a licensed, Windows-only simulation engine that was unavailable for stretches of the build. Rather than wait, I split every stage into engine-dependent and pure-derivable halves and built the pure halves (measurement mapping, fit scoring, asset resolution, output classification) against real data with real unit tests. When the engine came online, integration was a switch-flip rather than a start. I also led the research spike for generating simulation-ready garments directly from ordinary store listings: an LLM emits a canonical tech-pack spec, a parametric pattern program is driven from it, and the result is converted into a real garment file through the engine's API, with both load-bearing assumptions proven end-to-end on the live engine before any production code was written.",
    },
  ],
  technologies: [
    "Python",
    "FastAPI",
    "MediaPipe",
    "MiDaS",
    "ONNX Runtime",
    "SMPL-X",
    "PyTorch",
    "NumPy",
    "SciPy",
    "scikit-learn",
    "Node.js",
    "Express",
    "BullMQ",
    "Redis",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Docker",
    "Google Cloud Run",
    "Google Compute Engine",
    "Cloud Storage",
  ],
}

export default function XisionPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Xision", href: "/projects/xision" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Xision AI Virtual Try-On and Fit Simulation",
      description:
        "Computer-vision pipeline converting a phone scan into a measurement-accurate 3D body model, with cloth-physics garment drape producing fit scores, size recommendations, and pressure maps",
      url: "/projects/xision",
      clientName: "Xision",
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
