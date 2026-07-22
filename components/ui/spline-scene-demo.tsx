'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-background border-border/60 relative overflow-hidden rounded-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(270 85% 60%)"
      />

      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Interactive Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-primary-light leading-tight">
            Built in 3D.{" "}
            <br />
            Designed for you.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-sm text-base leading-relaxed">
            We craft immersive digital experiences that go beyond the screen, bringing your brand to life with depth, motion, and precision.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live interactive scene
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
