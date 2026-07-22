"use client"

import type React from "react"

const UIDesignIllustration: React.FC = () => {
  const themeVars = {
    "--ui-primary": "hsl(var(--primary))",
    "--ui-bg": "hsl(var(--background))",
    "--ui-fg": "hsl(var(--foreground))",
    "--ui-border": "hsl(var(--border))",
    "--ui-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  const swatches = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"]
  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="UI/UX design style guide mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "320px",
          height: "200px",
          background: "linear-gradient(180deg, var(--ui-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--ui-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: "14px", height: "100%", display: "flex", gap: "12px" }}>
          {/* Left: color swatches + type */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "72px", flexShrink: 0 }}>
            <div style={{ fontSize: "9px", color: "var(--ui-muted)", fontWeight: 600 }}>Colors</div>
            {swatches.map((c, i) => (
              <div
                key={i}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: c,
                  border: "1px solid var(--ui-border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              />
            ))}
            <div style={{ marginTop: "4px", fontSize: "8px", color: "var(--ui-muted)" }}>Type</div>
            <div style={{ width: "100%", height: "8px", background: "var(--ui-primary)", opacity: 0.4, borderRadius: "4px" }} />
            <div style={{ width: "80%", height: "6px", background: "var(--ui-fg)", opacity: 0.25, borderRadius: "3px" }} />
          </div>
          {/* Right: canvas / frame */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
            <div style={{ fontSize: "9px", color: "var(--ui-muted)", fontWeight: 600 }}>Frame</div>
            <div
              style={{
                flex: 1,
                borderRadius: "10px",
                border: "1px dashed var(--ui-border)",
                background: "linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--ui-primary)", opacity: 0.35 }} />
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ flex: 1, height: "6px", background: "var(--ui-primary)", opacity: 0.3, borderRadius: "3px" }} />
              <div style={{ flex: 1, height: "6px", background: "var(--ui-primary)", opacity: 0.2, borderRadius: "3px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UIDesignIllustration
