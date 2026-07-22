"use client"

import type React from "react"

const QuickServicesIllustration: React.FC = () => {
  const themeVars = {
    "--quick-primary": "hsl(var(--primary))",
    "--quick-bg": "hsl(var(--background))",
    "--quick-fg": "hsl(var(--foreground))",
    "--quick-border": "hsl(var(--border))",
    "--quick-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  const tasks = [
    { label: "Fix UI bug", done: true },
    { label: "Speed up website", done: true },
    { label: "Add new feature", done: false },
    { label: "Update content", done: false },
  ]
  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="Quick tasks checklist mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "290px",
          height: "200px",
          background: "linear-gradient(180deg, var(--quick-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--quick-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "var(--quick-primary)", opacity: 0.5 }} />
            <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--quick-fg)", opacity: 0.9 }}>Today</div>
          </div>
          {tasks.map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 8px", borderRadius: "8px", background: t.done ? "hsl(var(--primary) / 0.06)" : "transparent", border: "1px solid var(--quick-border)" }}>
              <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "2px solid var(--quick-primary)", background: t.done ? "var(--quick-primary)" : "transparent", opacity: t.done ? 0.7 : 0.4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {t.done && <span style={{ color: "white", fontSize: "10px", lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ fontSize: "10px", color: "var(--quick-muted)", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.8 : 1 }}>{t.label}</div>
            </div>
          ))}
          <div style={{ marginTop: "auto", height: "28px", borderRadius: "8px", background: "var(--quick-primary)", opacity: 0.25, border: "1px solid var(--quick-primary)" }} />
        </div>
      </div>
    </div>
  )
}

export default QuickServicesIllustration
