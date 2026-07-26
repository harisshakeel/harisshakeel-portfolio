import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema"
import { CaseStudy, type CaseStudyData } from "@/components/ui/case-study"

export const metadata: Metadata = buildPageMetadata({
  title: "Sentinel Case Study, Real-Time CCTV Anomaly Detection",
  description:
    "How Sentinel runs three trained YOLOv8 detectors over live RTSP camera feeds, arbitrates and de-duplicates detections, and pushes an annotated frame to the operator's phone the moment an anomaly fires.",
  path: "/projects/sentinel",
})

const data: CaseStudyData = {
  slug: "sentinel",
  client: "Sentinel",
  logo: "/images/projects/sentinel-pipeline.svg",
  category: "Computer Vision / Real-Time Video Analytics",
  industry: "Physical security",
  headline:
    "How Sentinel turned ordinary CCTV from a recording system into an alerting one.",
  summary:
    "Three trained YOLOv8 detectors run continuously over live RTSP feeds. When one fires, the event is written to Postgres, the frame is annotated and stored, and a push notification reaches the operator's phone with the flagged image attached — so an incident surfaces while it is happening rather than after someone thinks to go looking for it.",
  sections: [
    {
      heading: "Overview",
      body:
        "CCTV is retrospective. Cameras record continuously, but footage is only ever watched after an incident is already known about, which makes it evidence rather than prevention. Nobody is watching the wall of monitors in real time, so an accident, an act of vandalism, or a drawn weapon sits unseen in a live feed. Closing that gap meant running detection continuously on every feed — and, the part that actually decides whether the system is usable, being quiet enough that operators do not mute it. A detector that fires on every frame of a five-second event produces a flood of alerts and gets ignored.",
    },
    {
      heading: "Detection and inference",
      bullets: [
        "Trained three YOLOv8 detectors — accident, vandalism, and weapon — and built the multi-model inference service around them",
        "Per-model confidence thresholds (0.80 / 0.65 / 0.70) rather than one global cutoff, because each model was trained separately and their confidence distributions do not line up; overrides are applied as max(model_default, override), so a per-camera sensitivity setting can tighten detection but can never drag a model below its calibrated floor",
        "All three models run on each frame and the service returns only the single highest-confidence result, so overlapping models cannot raise competing alerts for one event",
        "A class-name to anomaly-type mapper with explicit negative-class filtering — the models emit background classes and ordinary object classes that must never become alerts, and unrecognised classes fall back to the emitting model's intended type rather than being dropped",
        "Frames preprocessed to 640×640 with bounding boxes rescaled back to source coordinates, so annotations line up regardless of camera resolution; weights load on a background thread at startup so the API serves immediately instead of blocking on deserialisation",
      ],
    },
    {
      heading: "Real-time stream pipeline",
      bullets: [
        "A thread-per-camera processor ingesting RTSP through OpenCV with a single-frame buffer to keep latency down, and a bounded retry policy when a camera drops",
        "Frame decimation to the training frame rate — the processor detects the stream's actual FPS and computes a skip interval, matching the rate the models were trained at and cutting false positives from near-identical consecutive frames",
        "Duplicate suppression by bounding-box IoU rather than a cooldown timer: a detection of the same type with over 70% box overlap is treated as the same ongoing event, so redundant frames are suppressed while a genuinely new incident stays free to fire",
        "A supervisor that reconciles running processors against the database on a fixed interval — starting, restarting, and stopping threads as cameras change — with start and stop calls made outside the manager's lock to avoid a lock-ordering deadlock against the processor's own locking",
        "Server-side annotation with OpenCV: box colour keyed to anomaly type, line thickness and font scale derived from frame dimensions, and label placement that flips above or below the box near frame edges",
      ],
    },
    {
      heading: "Streaming to mobile, and the app",
      bullets: [
        "Neither ExoPlayer nor video_player handles RTSP, so the backend transcodes RTSP to MJPEG behind an authenticated proxy endpoint, dispatching every blocking OpenCV call through a thread pool so the event loop is never blocked by frame I/O, with output throttled for mobile bandwidth",
        "A hand-written MJPEG multipart parser in Dart — incremental boundary scanning across chunk boundaries, JPEG extraction by SOI/EOI marker, and a buffer ceiling that resets to the last boundary rather than growing unbounded when frames arrive faster than they render",
        "FastAPI service over Supabase Postgres — five tables with row-level security enabled on every one, and JWT auth",
        "Push alerting with per-platform payloads and the detection frame attached as the notification image; a Flutter client on a feature-first structure with Provider, dependency injection, a typed API layer, secure token storage, and charts for anomaly trends and type breakdown",
      ],
    },
    {
      heading: "Engineering judgment",
      bullets: [
        "IoU suppression over a cooldown timer — the obvious way to stop alert spam is to stay silent for N seconds, but that also suppresses a second real incident inside the window. Keying on spatial overlap suppresses the redundant frames of one event and nothing else",
        "Decimating to the training frame rate — running inference on every frame would have been more compute for worse results, since consecutive near-identical frames mostly generate correlated false positives. Throwing frames away was the accuracy fix, not just the performance one",
        "Degrading rather than dropping on a foreign-key violation — if a detection references a session row that no longer exists, the service recreates it and retries, and failing that writes the anomaly with a null session. For a security system an orphaned alert is strictly better than a silent one",
      ],
    },
  ],
  technologies: [
    "Python",
    "FastAPI",
    "YOLOv8",
    "Ultralytics",
    "PyTorch",
    "OpenCV",
    "NumPy",
    "Pydantic",
    "Flutter",
    "Dart",
    "Supabase",
    "PostgreSQL",
    "Firebase Cloud Messaging",
    "Dio / Retrofit",
    "Provider",
    "fl_chart",
    "RTSP",
    "MJPEG",
  ],
}

export default function SentinelPage() {
  const crumbs = [
    { name: "Projects", href: "/projects" },
    { name: "Sentinel", href: "/projects/sentinel" },
  ]
  const schemas = [
    breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs]),
    caseStudySchema({
      name: "Sentinel Real-Time CCTV Anomaly Detection",
      description:
        "Three trained YOLOv8 detectors over live RTSP feeds with confidence arbitration, IoU duplicate suppression, and push alerting to a Flutter operator app",
      url: "/projects/sentinel",
      clientName: "Sentinel",
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
