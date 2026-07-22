"use client"

import type React from "react"

const SaaSMVPIllustration: React.FC = () => {
  const themeVars = {
    "--saas-primary": "hsl(var(--primary))",
    "--saas-bg": "hsl(var(--background))",
    "--saas-fg": "hsl(var(--foreground))",
    "--saas-border": "hsl(var(--border))",
    "--saas-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="SaaS dashboard mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "320px",
          height: "200px",
          background: "linear-gradient(180deg, var(--saas-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--saas-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", height: "100%", minHeight: 0 }}>
          {/* Sidebar */}
          <div style={{ width: "48px", padding: "10px 0", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", borderRight: "1px solid var(--saas-border)", background: "hsl(var(--card) / 0.5)" }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: "24px", height: "24px", borderRadius: "6px", background: i === 1 ? "var(--saas-primary)" : "var(--saas-fg)", opacity: i === 1 ? 0.6 : 0.2 }} />
            ))}
          </div>
          {/* Main */}
          <div style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "10px", minWidth: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
              {["1.2k", "98%", "24"].map((val, i) => (
                <div key={i} style={{ padding: "8px", borderRadius: "8px", background: "linear-gradient(180deg, hsl(var(--primary) / 0.12) 0%, transparent 100%)", border: "1px solid var(--saas-border)" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--saas-primary)", opacity: 0.9 }}>{val}</div>
                  <div style={{ fontSize: "8px", color: "var(--saas-muted)", marginTop: "2px" }}>{["Users", "Retention", "Apps"][i]}</div>
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minHeight: "60px", borderRadius: "8px", background: "linear-gradient(180deg, var(--saas-fg) 0%, transparent 100%)", opacity: 0.08, border: "1px solid var(--saas-border)", display: "flex", alignItems: "flex-end", padding: "8px" }}>
              {[40, 65, 45, 80, 55, 90].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, maxHeight: "100%", background: "var(--saas-primary)", opacity: 0.4, borderRadius: "4px 4px 0 0", marginRight: i < 5 ? "4px" : 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaaSMVPIllustration
