import type { Metadata } from "next"
import { PageLayout } from "@/components/page-layout"
import { Breadcrumb } from "@/components/breadcrumb"
import { buildPageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "TwoPixel's Privacy Policy explains how we collect, use, share, and protect your information when you use our website and services.",
  path: "/privacy",
})

export default function PrivacyPage() {
  const crumbs = [{ name: "Privacy Policy", href: "/privacy" }]
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
            <h1 className="text-4xl md:text-6xl font-semibold text-foreground mb-4 leading-tight">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: May 4, 2026</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1320px] mx-auto px-6 pb-16 md:pb-24">
        <div className="max-w-3xl">

          <div className="prose dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <p>
                This Privacy Policy outlines how TwoPixel collects, uses, and discloses information when you use our
                Service, and explains the privacy rights available to you and how the law protects them.
              </p>
              <p>
                We use your personal data to operate and improve the Service. By using the Service, you consent to
                the collection and use of information in line with this Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Interpretation and Definitions</h2>

              <h3 className="text-lg font-semibold text-foreground">Interpretation</h3>
              <p>
                Words with capitalized initial letters carry the meanings defined below. These definitions apply
                regardless of whether the term appears in singular or plural form.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Definitions</h3>
              <p>For the purposes of this Privacy Policy:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong className="text-foreground">Account</strong>, a unique account created so that you can access the Service or specific features of it.</li>
                <li><strong className="text-foreground">Company</strong> (referred to as &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;) refers to TwoPixel.</li>
                <li><strong className="text-foreground">Cookies</strong> are small files placed on your computer, mobile device, or other device by a website. They store browsing-related details and serve various purposes.</li>
                <li><strong className="text-foreground">Country</strong> refers to the jurisdiction in which the Company operates and processes your data.</li>
                <li><strong className="text-foreground">Device</strong> means any device capable of accessing the Service, for example, a computer, mobile phone, or tablet.</li>
                <li><strong className="text-foreground">Personal Data</strong> means any information that identifies, or can be used to identify, an individual.</li>
                <li><strong className="text-foreground">Service</strong> refers to the Website.</li>
                <li><strong className="text-foreground">Service Provider</strong> means any natural or legal person who processes data on behalf of the Company, including third-party companies or individuals engaged to support, deliver, or analyze the Service.</li>
                <li><strong className="text-foreground">Usage Data</strong> means data collected automatically through your use of the Service or generated by the Service infrastructure (for example, the duration of a page visit).</li>
                <li><strong className="text-foreground">Website</strong> refers to TwoPixel, accessible from <a href="https://twopixel.org" className="text-primary hover:underline">https://twopixel.org</a>.</li>
                <li><strong className="text-foreground">You</strong> means the individual using the Service, or the company or other legal entity on whose behalf such individual is using the Service.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Collecting and Using Your Personal Data</h2>

              <h3 className="text-lg font-semibold text-foreground">Types of Data Collected</h3>

              <h4 className="text-base font-semibold text-foreground">Personal Data</h4>
              <p>
                While using our Service, we may ask you to provide certain personally identifiable information that
                can be used to contact or identify you. This may include, but is not limited to: your name, email
                address, phone number, company name, project details you choose to share, and any other information
                relevant to a quote or engagement.
              </p>

              <h4 className="text-base font-semibold text-foreground">Usage Data</h4>
              <p>
                Usage Data is collected automatically when you use the Service. It may include information such as
                your device&apos;s IP address, browser type and version, the pages of our Service that you visit, the
                date and time of your visit, the time spent on those pages, unique device identifiers, and other
                diagnostic data.
              </p>
              <p>
                When you access the Service through a mobile device, we may automatically collect information
                including, but not limited to, the type of mobile device, your mobile device unique ID, your mobile
                device IP address, your mobile operating system, the type of mobile browser you use, unique device
                identifiers, and other diagnostic data.
              </p>
              <p>
                We may also collect information that your browser sends whenever you visit our Service or access it
                through a mobile device.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Tracking Technologies and Cookies</h3>
              <p>
                We use Cookies and similar tracking technologies to monitor activity on our Service and store
                certain information. Tracking technologies we may use include beacons, tags, and scripts to collect
                and track information and improve and analyze our Service. These may include:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong className="text-foreground">Cookies or Browser Cookies.</strong> A cookie is a small file
                  placed on your device. You can set your browser to refuse all cookies or to alert you when a
                  cookie is being sent. If you do not accept cookies, however, some parts of our Service may not be
                  available to you. Unless you have configured your browser to refuse cookies, our Service may use
                  them.
                </li>
                <li>
                  <strong className="text-foreground">Web Beacons.</strong> Some sections of our Service and our
                  emails may contain small electronic files known as web beacons (also called clear gifs, pixel
                  tags, or single-pixel gifs) that allow the Company to, for example, count users who have visited
                  certain pages or opened an email, and to gather other related statistics (such as recording the
                  popularity of a section and verifying system and server integrity).
                </li>
              </ul>
              <p>
                Cookies can be either &quot;Persistent&quot; or &quot;Session&quot; cookies. Persistent cookies remain on your
                device when you go offline, while session cookies are deleted as soon as you close your browser.
                We use both types for the purposes set out below.
              </p>

              <div className="space-y-4 border-l border-border/40 pl-6">
                <div>
                  <h4 className="text-base font-semibold text-foreground">Necessary / Essential Cookies</h4>
                  <p><strong className="text-foreground">Type:</strong> Session Cookies</p>
                  <p><strong className="text-foreground">Administered by:</strong> Us</p>
                  <p>
                    <strong className="text-foreground">Purpose:</strong> These Cookies are essential to provide
                    you with services available through the Website and to enable you to use some of its features.
                    They help authenticate users and prevent fraudulent use of accounts. Without them, the services
                    you have requested cannot be delivered, and we only use them to provide those services.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-foreground">Cookies Policy / Notice Acceptance Cookies</h4>
                  <p><strong className="text-foreground">Type:</strong> Persistent Cookies</p>
                  <p><strong className="text-foreground">Administered by:</strong> Us</p>
                  <p>
                    <strong className="text-foreground">Purpose:</strong> These Cookies record whether users have
                    accepted the use of cookies on the Website.
                  </p>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-foreground">Functionality Cookies</h4>
                  <p><strong className="text-foreground">Type:</strong> Persistent Cookies</p>
                  <p><strong className="text-foreground">Administered by:</strong> Us</p>
                  <p>
                    <strong className="text-foreground">Purpose:</strong> These Cookies allow us to remember the
                    choices you make when using the Website, such as login details or language preference, so
                    you don&apos;t need to re-enter your preferences on every visit.
                  </p>
                </div>
              </div>

              <p>
                For more details about the cookies we use and your choices regarding them, please review the
                Cookies section of this Privacy Policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Use of Your Personal Data</h2>
              <p>The Company may use Personal Data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong className="text-foreground">To provide and maintain our Service</strong>, including monitoring its usage.</li>
                <li><strong className="text-foreground">To manage your Account:</strong> to manage your registration as a user of the Service. The Personal Data you provide can give you access to features available to registered users.</li>
                <li><strong className="text-foreground">For the performance of a contract:</strong> the development, compliance, and undertaking of the contract for the products, items, or services you have purchased, or any other agreement with us through the Service.</li>
                <li><strong className="text-foreground">To contact you:</strong> by email, phone calls, SMS, or other equivalent forms of electronic communication, including push notifications, regarding updates or informative communications related to functionalities, products, or contracted services, including security updates when necessary.</li>
                <li><strong className="text-foreground">To send you news, special offers, and general information</strong> about other goods, services, and events we offer that are similar to those you have already purchased or asked about, unless you have opted out.</li>
                <li><strong className="text-foreground">To manage your requests:</strong> to attend and respond to requests you make to us.</li>
                <li><strong className="text-foreground">For business transfers:</strong> to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by us is among the assets transferred.</li>
                <li><strong className="text-foreground">For other purposes:</strong> such as data analysis, identifying usage trends, evaluating the effectiveness of our promotional campaigns, and improving our Service, products, marketing, and your experience.</li>
              </ul>

              <p>We may share your personal information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong className="text-foreground">With Service Providers:</strong> to monitor and analyze use of our Service, and to contact you.</li>
                <li><strong className="text-foreground">For business transfers:</strong> in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or part of our business by another company.</li>
                <li><strong className="text-foreground">With Affiliates:</strong> in which case we will require those affiliates to honor this Privacy Policy. Affiliates include any parent company, subsidiaries, joint-venture partners, or other companies under common control with us.</li>
                <li><strong className="text-foreground">With business partners:</strong> to offer you certain products, services, or promotions.</li>
                <li><strong className="text-foreground">With other users:</strong> when you share information or interact in public areas, such information may be viewed by other users and distributed publicly.</li>
                <li><strong className="text-foreground">With your consent:</strong> for any other purpose with your explicit consent.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Retention of Your Personal Data</h2>
              <p>
                The Company will retain your Personal Data only for as long as is necessary for the purposes set
                out in this Privacy Policy. We will retain and use your Personal Data to the extent required to
                comply with our legal obligations (for example, to comply with applicable laws), resolve disputes,
                and enforce our legal agreements and policies.
              </p>
              <p>
                The Company will also retain Usage Data for internal analysis. Usage Data is generally retained for
                a shorter period, except where it is used to strengthen security, improve functionality, or where
                we are legally obligated to retain it for longer.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Transfer of Your Personal Data</h2>
              <p>
                Your information, including Personal Data, is processed at the Company&apos;s operating offices and in
                any other places where the parties involved in processing are located. This means your information
                may be transferred to, and maintained on, computers located outside your state, province,
                country, or other governmental jurisdiction, where data protection laws may differ from those in
                your jurisdiction.
              </p>
              <p>
                Your consent to this Privacy Policy, followed by your submission of such information, represents
                your agreement to that transfer.
              </p>
              <p>
                The Company will take all reasonably necessary steps to ensure your data is treated securely and in
                accordance with this Privacy Policy. No transfer of your Personal Data will take place to an
                organization or country unless adequate controls are in place, including the security of your
                data and other personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Delete Your Personal Data</h2>
              <p>
                You have the right to delete, or to request that we help you delete, the Personal Data we have
                collected about you.
              </p>
              <p>
                Our Service may give you the ability to delete certain information about yourself from within the
                Service.
              </p>
              <p>
                You may update, amend, or delete your information at any time by signing in to your Account (if
                you have one) and visiting the account settings section that allows you to manage your personal
                information. You may also contact us to request access to, correction of, or deletion of any
                personal information you have provided to us.
              </p>
              <p>
                Please note, however, that we may need to retain certain information when we have a legal
                obligation or lawful basis to do so.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Disclosure of Your Personal Data</h2>

              <h3 className="text-lg font-semibold text-foreground">Business Transactions</h3>
              <p>
                If the Company is involved in a merger, acquisition, or asset sale, your Personal Data may be
                transferred. We will provide notice before your Personal Data is transferred and becomes subject
                to a different Privacy Policy.
              </p>

              <h3 className="text-lg font-semibold text-foreground">Law enforcement</h3>
              <p>
                Under certain circumstances, the Company may be required to disclose your Personal Data if
                required to do so by law or in response to valid requests by public authorities (for example, a
                court or a government agency).
              </p>

              <h3 className="text-lg font-semibold text-foreground">Other legal requirements</h3>
              <p>
                The Company may disclose your Personal Data in the good-faith belief that such action is necessary
                to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with a legal obligation</li>
                <li>Protect and defend the rights or property of the Company</li>
                <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>Protect the personal safety of users of the Service or the public</li>
                <li>Protect against legal liability</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Security of Your Personal Data</h2>
              <p>
                The security of your Personal Data is important to us, but remember that no method of transmission
                over the Internet, and no method of electronic storage, is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Children&apos;s Privacy</h2>
              <p>
                Our Service is not directed at anyone under the age of 13, and we do not knowingly collect
                personally identifiable information from anyone under 13. If you are a parent or guardian and you
                are aware that your child has provided us with Personal Data, please contact us. If we learn that
                we have collected Personal Data from anyone under 13 without verified parental consent, we take
                steps to remove that information from our servers.
              </p>
              <p>
                If we need to rely on consent as a legal basis for processing your information, and your country
                requires consent from a parent, we may require your parent&apos;s consent before we collect and use
                that information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Links to Other Websites</h2>
              <p>
                Our Service may contain links to other websites that are not operated by us. If you click a
                third-party link, you will be directed to that third party&apos;s site. We strongly advise you to
                review the privacy policy of every site you visit.
              </p>
              <p>
                We have no control over, and assume no responsibility for, the content, privacy policies, or
                practices of any third-party sites or services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Changes to this Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                the updated Privacy Policy on this page.
              </p>
              <p>
                We will let you know via email and/or a prominent notice on our Service prior to the change
                becoming effective, and we will update the &quot;Last updated&quot; date at the top of this Privacy
                Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes are effective
                when posted on this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, you can contact us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  By email:{" "}
                  <a href="mailto:contact@twopixel.org" className="text-primary hover:underline">
                    contact@twopixel.org
                  </a>
                </li>
                <li>
                  By phone:{" "}
                  <a href="tel:+14707214027" className="text-primary hover:underline">
                    (470) 721-4027
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
