"use client"

import type React from "react"

const PerformanceIllustration: React.FC = () => {
  const themeVars = {
    "--perf-primary": "hsl(var(--primary))",
    "--perf-bg": "hsl(var(--background))",
    "--perf-fg": "hsl(var(--foreground))",
    "--perf-border": "hsl(var(--border))",
    "--perf-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  const metrics = [
    { label: "LCP", score: 98, width: 98 },
    { label: "FID", score: 100, width: 100 },
    { label: "CLS", score: 95, width: 95 },
  ]
  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="Performance metrics mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "300px",
          height: "200px",
          background: "linear-gradient(180deg, var(--perf-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--perf-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "10px", color: "var(--perf-muted)", fontWeight: 600 }}>Core Web Vitals</div>
            <div style={{ display: "flex", gap: "6px" }}>
              {[98, 100, 95].map((s, i) => (
                <div key={i} style={{ width: "28px", height: "20px", borderRadius: "6px", background: "var(--perf-primary)", opacity: 0.5, fontSize: "10px", fontWeight: 700, color: "var(--perf-fg)", display: "flex", alignItems: "center", justifyContent: "center" }}>{s}</div>
              ))}
            </div>
          </div>
          {metrics.map((m, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "var(--perf-muted)" }}>
                <span>{m.label}</span>
                <span style={{ fontWeight: 600, color: "var(--perf-primary)", opacity: 0.9 }}>{m.score}</span>
              </div>
              <div style={{ height: "10px", borderRadius: "6px", background: "var(--perf-fg)", opacity: 0.1, overflow: "hidden" }}>
                <div style={{ width: `${m.width}%`, height: "100%", borderRadius: "6px", background: "var(--perf-primary)", opacity: 0.6, transition: "width 0.3s ease" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--perf-primary)", opacity: 0.8, boxShadow: "0 0 8px var(--perf-primary)" }} />
            <div style={{ fontSize: "9px", color: "var(--perf-muted)" }}>All systems optimal</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceIllustration
