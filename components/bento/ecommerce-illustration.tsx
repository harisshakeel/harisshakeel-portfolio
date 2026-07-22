"use client"

import type React from "react"

const EcommerceIllustration: React.FC = () => {
  const themeVars = {
    "--ecom-primary": "hsl(var(--primary))",
    "--ecom-bg": "hsl(var(--background))",
    "--ecom-fg": "hsl(var(--foreground))",
    "--ecom-border": "hsl(var(--border))",
    "--ecom-muted": "hsl(var(--muted-foreground))",
  } as React.CSSProperties

  const products = [
    { price: "$29" },
    { price: "$49" },
    { price: "$19" },
    { price: "$79" },
  ]
  return (
    <div
      className="w-full h-full flex items-center justify-center p-3 relative"
      style={{ ...themeVars, position: "relative", background: "transparent" }}
      role="img"
      aria-label="Ecommerce product grid mock"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.92)",
          width: "300px",
          height: "200px",
          background: "linear-gradient(180deg, var(--ecom-bg) 0%, transparent 100%)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          border: "1px solid var(--ecom-border)",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ padding: "12px", height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "var(--ecom-primary)", opacity: 0.5 }} />
            <div style={{ flex: 1, height: "10px", background: "var(--ecom-fg)", opacity: 0.2, borderRadius: "4px", maxWidth: "120px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", flex: 1, minHeight: 0 }}>
            {products.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "8px",
                  background: "linear-gradient(180deg, hsl(var(--card)) 0%, transparent 100%)",
                  borderRadius: "8px",
                  border: "1px solid var(--ecom-border)",
                }}
              >
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: "6px", background: "var(--ecom-primary)", opacity: 0.25 }} />
                <div style={{ height: "6px", width: "70%", background: "var(--ecom-fg)", opacity: 0.3, borderRadius: "3px" }} />
                <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--ecom-primary)", opacity: 0.9 }}>{p.price}</div>
                <div style={{ height: "20px", borderRadius: "6px", background: "var(--ecom-primary)", opacity: 0.35, marginTop: "2px" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcommerceIllustration
