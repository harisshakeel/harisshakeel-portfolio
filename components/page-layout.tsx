import { Header } from "@/components/header"
import { FooterSection } from "@/components/footer-section"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">{children}</main>
      <div className="max-w-[1320px] mx-auto">
        <FooterSection />
      </div>
    </div>
  )
}
