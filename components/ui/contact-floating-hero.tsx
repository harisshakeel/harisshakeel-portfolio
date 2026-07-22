"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/image-crop"
import { Slider } from "@/components/ui/slider"

export function ContactFloatingHero() {
  const [zoom, setZoom] = useState(1)

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Animated aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)/0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.5) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          }}
        />
        <div
          className="absolute -left-[12%] top-[5%] h-[520px] w-[520px] rounded-full blur-3xl animate-drift-a animate-aurora-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.40) 0%, rgba(168,85,247,0.14) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full blur-3xl animate-drift-b"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="absolute inset-x-[10%] -bottom-24 h-48 rounded-[100%] bg-[radial-gradient(closest-side,rgba(168,85,247,0.20),rgba(168,85,247,0.05)_45%,transparent_75%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-24">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left, text + actions */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground"
            >
              Contact
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-[clamp(2.75rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-foreground"
            >
              Let&apos;s <span className="text-primary">Talk</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              We&apos;d love to learn more about you and what we can design and
              build together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32 }}
              className="mt-12 md:mt-16"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Become a Client
              </p>
              <Link
                href="mailto:contact@twopixel.org"
                className="group inline-block border-b border-foreground/20 pb-1 text-xl font-medium tracking-[-0.01em] text-foreground transition-colors hover:border-primary hover:text-primary md:text-2xl"
              >
                contact@twopixel.org
              </Link>
            </motion.div>
          </div>

          {/* Right, interactive cropper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-6"
          >
            <div className="flex h-full flex-col gap-4">
              <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-foreground/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)] md:h-[440px]">
                <Cropper
                  className="h-full w-full"
                  image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85"
                  zoom={zoom}
                  onZoomChange={setZoom}
                >
                  <CropperDescription />
                  <CropperImage />
                  <CropperCropArea />
                </Cropper>

                {/* Soft purple ambient on top-right (pointer-events-none so cropper still works) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 80% 20%, rgba(168,85,247,0.18), transparent 70%)",
                  }}
                />

                {/* Inner top hairline */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </div>

              {/* Zoom slider */}
              <div className="mx-auto flex w-full max-w-80 items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Zoom
                </span>
                <Slider
                  defaultValue={[1]}
                  value={[zoom]}
                  min={1}
                  max={3}
                  step={0.1}
                  onValueChange={(v) => setZoom(v[0])}
                  aria-label="Zoom slider"
                />
                <output className="block w-10 shrink-0 text-right font-mono text-xs font-medium tabular-nums text-foreground/70">
                  {parseFloat(zoom.toFixed(1))}x
                </output>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
