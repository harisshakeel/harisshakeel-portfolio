import dynamic from "next/dynamic"
import { HeroSection } from "@/components/hero-section"
import { BentoSection } from "@/components/bento-section"

const AnimatedSection = dynamic(() => import("@/components/animated-section").then((m) => ({ default: m.AnimatedSection })), { ssr: true })
const SocialProof = dynamic(() => import("@/components/social-proof").then((m) => ({ default: m.SocialProof })), { ssr: true })
const WhoAreWeSection = dynamic(() => import("@/components/who-are-we-section").then((m) => ({ default: m.WhoAreWeSection })), { ssr: true })
const ProjectsSection = dynamic(() => import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection })), { ssr: true })
const FooterSection = dynamic(() => import("@/components/footer-section").then((m) => ({ default: m.FooterSection })), { ssr: true })

export default function PortfolioPage() {
  return (
    <div id="top" className="min-h-[100dvh] bg-background">
      {/* Hero, includes header internally */}
      <HeroSection />

      {/* About me */}
      <AnimatedSection id="about" className="max-w-[1320px] mx-auto scroll-mt-24" delay={0.1}>
        <WhoAreWeSection />
      </AnimatedSection>

      {/* Tools strip */}
      <AnimatedSection className="max-w-[1320px] mx-auto px-6 py-4 scroll-mt-24" delay={0.05}>
        <SocialProof />
      </AnimatedSection>

      {/* Skills / what I do */}
      <AnimatedSection id="skills" className="max-w-[1320px] mx-auto scroll-mt-24" delay={0.1}>
        <BentoSection />
      </AnimatedSection>

      {/* Selected work */}
      <AnimatedSection id="work" className="mt-8 md:mt-16 scroll-mt-24" delay={0.15}>
        <ProjectsSection />
      </AnimatedSection>

      {/* Footer (also the Contact target) */}
      <AnimatedSection id="contact" className="max-w-[1320px] mx-auto mt-8 md:mt-16 scroll-mt-24" delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  )
}
