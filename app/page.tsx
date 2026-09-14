import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/haris-about/about-section"
import { BrutalistExperience } from "@/components/brutalist-experience"
import { BrutalistProjects } from "@/components/brutalist-projects"
import { BrutalistFooter } from "@/components/brutalist-footer"

export default function PortfolioPage() {
  return (
    <div id="top" className="min-h-[100dvh] bg-background">
      {/* Hero, includes header internally */}
      <HeroSection />

      {/* About me — giant statement + intro + tech stack */}
      <div id="main-content">
        <AboutSection />
      </div>

      {/* Experience — company logos, roles, timeline */}
      <BrutalistExperience />

      {/* Selected work — alternating project cards */}
      <BrutalistProjects />

      {/* Contact / footer — "Let's talk" */}
      <BrutalistFooter />
    </div>
  )
}
