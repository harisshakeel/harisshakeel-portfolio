"use client"

export function WhoAreWeSection() {
  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
              About me
            </p>
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              Hi, I'm Haris
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              An Agentic AI &amp; full-stack developer who also designs
              high-converting landing pages and funnels.
            </p>
          </div>
        </div>

        <div className="self-stretch flex flex-col md:flex-row justify-center items-center gap-8 md:gap-14 z-10">
          {/* Portrait */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            <div className="w-56 h-56 md:w-72 md:h-72 relative flex items-center justify-center rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-primary/15 rounded-full blur-xl" />
              <div className="relative w-full h-full flex items-center justify-center rounded-full overflow-hidden">
                <img
                  src="/images/owners/harus.png"
                  alt="Haris Shakeel"
                  className="w-full h-full object-contain object-bottom rounded-full"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' }}
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-soft-light pointer-events-none rounded-full" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold text-lg">Haris Shakeel</p>
              <p className="text-muted-foreground text-sm">Agentic AI &amp; Full-Stack Developer</p>
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center items-start gap-5 max-w-xl">
            <p className="text-foreground/85 text-base md:text-lg leading-relaxed">
              I'm a Computer Science graduate specializing in Agentic AI and
              full-stack development. I architect autonomous AI systems with the
              Claude Agent SDK and Gemini, and build scalable MERN platforms end
              to end, from databases and APIs to polished, accessible interfaces.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              I also spend a good part of my work designing high-converting landing
              pages and sales funnels in Figma and Shopify for D2C and
              e-commerce brands, applying CRO and trust-building UX. Building and
              designing both means I see the full picture, from first click to
              checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
