import { Header } from "@/components/header"
import { BrutalistFooter } from "@/components/brutalist-footer"
import { PALETTE } from "@/lib/palette"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: PALETTE.obsidian }}>
      <Header />
      <main id="main-content" className="pt-24 md:pt-28">{children}</main>
      <BrutalistFooter />
    </div>
  )
}
