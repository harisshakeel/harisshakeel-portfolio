import Script from 'next/script'

// Umami Cloud (cookieless, no consent banner). The website ID is public; it
// ships in the page HTML either way. data-domains keeps localhost and Vercel
// preview deploys out of the numbers.
const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || 'a30db22e-1bba-4bd1-8396-022282865fb6'

export function Analytics() {
  return (
    <Script
      src="/stats/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      data-host-url="/stats"
      data-domains="www.harisshakeel.site,harisshakeel.site"
      data-exclude-hash="true"
      strategy="afterInteractive"
    />
  )
}
