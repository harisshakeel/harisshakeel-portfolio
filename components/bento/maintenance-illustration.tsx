"use client"

import type React from "react"

const MaintenanceIllustration: React.FC = () => {
  const themeVars = {
    "--maint-primary": "hsl(var(--primary))",
    "--maint-bg": "hsl(var(--background))",
    "--maint-fg": "hsl(var(--foreground))",
    "--maint-border": "hsl(var(--border))",
    "--maint-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  const statuses = [
    { label: "Backup completed", ok: true },
    { label: "Security scan passed", ok: true },
    { label: "Uptime 99.9%", ok: true },
    { label: "SSL valid", ok: true },
  ]
  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="Maintenance status panel mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "280px",
          height: "200px",
          background: "linear-gradient(180deg, var(--maint-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--maint-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--maint-primary)", boxShadow: "0 0 10px var(--maint-primary)" }} />
            <div style={{ fontSize: "10px", fontWeight: 600, color: "var(--maint-fg)", opacity: 0.9 }}>System Status</div>
          </div>
          <div style={{ height: "1px", background: "var(--maint-border)", opacity: 0.5 }} />
          {statuses.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: s.ok ? "var(--maint-primary)" : "var(--maint-fg)", opacity: s.ok ? 0.8 : 0.3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.ok && <span style={{ color: "white", fontSize: "10px", lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ fontSize: "10px", color: "var(--maint-muted)" }}>{s.label}</div>
            </div>
          ))}
          <div style={{ marginTop: "auto" }}>
            <div style={{ fontSize: "9px", color: "var(--maint-muted)", marginBottom: "4px" }}>Storage</div>
            <div style={{ height: "8px", borderRadius: "4px", background: "var(--maint-fg)", opacity: 0.1, overflow: "hidden" }}>
              <div style={{ width: "65%", height: "100%", borderRadius: "4px", background: "var(--maint-primary)", opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceIllustration
