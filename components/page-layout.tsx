import { Header } from "@/components/header"
import { BrutalistFooter } from "@/components/brutalist-footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">{children}</main>
      <BrutalistFooter />
    </div>
  )
}
