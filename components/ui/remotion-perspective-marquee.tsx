"use client"

export interface PerspectiveMarqueeProps {
  items?: string[]
  fontSize?: number
  color?: string
  fontWeight?: number
  rotateY?: number
  rotateX?: number
  perspective?: number
  fadeColor?: string
  background?: string
  durationSeconds?: number
  className?: string
}

const DEFAULT_ITEMS = [
  "Figma",
  "Notion",
  "Vercel",
  "Wise",
  "OpenAI",
  "Loom",
  "Cursor",
  "GitHub",
]

export function PerspectiveMarquee({
  items = DEFAULT_ITEMS,
  fontSize = 84,
  color = "#fafafa",
  fontWeight = 700,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = "#050505",
  background = "transparent",
  durationSeconds = 30,
  className,
}: PerspectiveMarqueeProps) {
  const itemPadding = fontSize * 0.9
  const doubled = [...items, ...items]

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="tp-marquee-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: `tp-marquee-scroll ${durationSeconds}s linear infinite`,
            // @ts-expect-error CSS custom property
            "--tp-marquee-padding": `${itemPadding}px`,
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                fontSize,
                fontWeight,
                color,
                letterSpacing: "-0.03em",
                paddingRight: itemPadding,
                lineHeight: 1,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 18%, transparent 82%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
        }}
      />

      <style jsx>{`
        @keyframes tp-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
