import { HeroSection } from "@/components/hero-section"
import { BrutalistAbout } from "@/components/brutalist-about"
import { BrutalistProjects } from "@/components/brutalist-projects"
import { BrutalistTestimonials } from "@/components/brutalist-testimonials"
import { BrutalistFooter } from "@/components/brutalist-footer"

export default function PortfolioPage() {
  return (
    <div id="top" className="min-h-[100dvh] bg-background">
      {/* Hero, includes header internally */}
      <HeroSection />

      {/* About me — giant statement + intro + tech stack */}
      <BrutalistAbout />

      {/* Selected work — alternating project cards */}
      <BrutalistProjects />

      {/* Testimonials — brutalist quote cards */}
      <BrutalistTestimonials />

      {/* Contact / footer — "Let's talk" */}
      <BrutalistFooter />
    </div>
  )
}
