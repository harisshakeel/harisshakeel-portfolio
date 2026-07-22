"use client"

import dynamic from "next/dynamic"

const FloatingContactWidget = dynamic(
  () => import("./floating-contact-widget").then((m) => ({ default: m.FloatingContactWidget })),
  { ssr: false }
)

export function FloatingContactWidgetLazy() {
  return <FloatingContactWidget />
}
