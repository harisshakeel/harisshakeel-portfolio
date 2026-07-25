import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Breadcrumb } from "@/components/breadcrumb"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Read TwoPixel's terms of service governing the use of our website and the provision of our digital development services.",
  path: "/terms",
})

export default function TermsPage() {
  const crumbs = [{ name: "Terms of Service", href: "/terms" }]
  const schema = breadcrumbSchema([{ name: "Home", href: "/" }, ...crumbs])

  return (
    <PageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero with aurora backdrop */}
      <section className="relative w-full overflow-hidden">
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
          <div className="absolute inset-x-[10%] -bottom-24 h-48 rounded-[100%] bg-[radial-gradient(closest-side,rgba(168,85,247,0.20),rgba(168,85,247,0.05)_45%,transparent_75%)] blur-2xl" />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-6 py-16 md:py-24">
          <Breadcrumb items={crumbs} />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4 leading-tight">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: May 4, 2026</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 pb-16 md:pb-24">
        <div className="max-w-3xl">
          <div className="prose dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Acceptance of Terms</h2>
              <p>
                By accessing and using the TwoPixel website (www.twopixel.org) or engaging our services, you
                agree to be bound by these Terms of Service. If you do not agree, please do not use our website
                or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Services</h2>
              <p>
                TwoPixel provides digital development services including web development, mobile app development,
                AI automations, SaaS product development, UI/UX design, ecommerce solutions, and related
                consulting. The specific scope, timeline, and pricing for each project are agreed upon in a
                separate project agreement or statement of work.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Payment</h2>
              <p>
                Payment terms are defined per project. Unless otherwise agreed, a deposit is required before
                work begins. Final payment is due upon project completion and delivery. All payments are
                non-refundable unless explicitly stated in the project agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Intellectual Property</h2>
              <p>
                Upon receipt of full payment, the client receives full ownership of the custom code and
                deliverables produced for their project. TwoPixel retains the right to display the work in its
                portfolio unless the client explicitly requests otherwise in writing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary business information shared during the
                engagement. TwoPixel will not share your project details, codebase, or business data with third
                parties without your consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Limitation of Liability</h2>
              <p>
                TwoPixel&apos;s liability for any claim arising out of or relating to the services shall not exceed
                the total fees paid by the client for the specific project. We are not liable for indirect,
                incidental, or consequential damages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Governing Law</h2>
              <p>
                These Terms are governed by the laws of the United States. Any disputes shall be resolved
                through good-faith negotiation. If unresolved, disputes shall be subject to binding arbitration.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p>If you have any questions about these Terms of Service, you can contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  By email:{" "}
                  <a href="mailto:contact@twopixel.org" className="text-primary hover:underline">
                    contact@twopixel.org
                  </a>
                </li>
                <li>
                  By phone:{" "}
                  <a href="tel:+923224778575" className="text-primary hover:underline">
                    +92 322 4778575
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
