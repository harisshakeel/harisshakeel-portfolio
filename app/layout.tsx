import type { Metadata } from 'next'
import { Anton, Space_Grotesk, Geist_Mono, Press_Start_2P, Montserrat, Michroma } from 'next/font/google'
import StoreProvider from '@/components/store-provider'
import { FloatingContactWidgetLazy } from '@/components/floating-contact-widget-lazy'
import { CursorDot } from '@/components/ui/cursor-dot'
import SmoothScroll from '@/components/smooth-scroll'
import { defaultMetadata, personSchema, websiteSchema } from '@/lib/seo'
import 'lenis/dist/lenis.css'
import './globals.css'

// Brutalist editorial type system: Anton for giant display headings,
// Space Grotesk for body/UI, Geist Mono for code + eyebrow labels.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

// Hero-only pairing (components/haris-hero/) — Michroma, a wide geometric
// display face (its only weight is 400; Tailwind's `font-bold` etc. on it
// just triggers the browser's own synthetic-bold, which is fine for a face
// this wide already), for the big cinematic headlines; Montserrat for the
// smaller supporting copy. The italic accent word still uses Apple's
// system serif "New York" (--font-hero-serif, declared as a plain CSS font
// stack in globals.css since it isn't a Google font).
const heroDisplay = Michroma({ subsets: ["latin"], weight: "400", variable: "--font-hero-display", display: "swap" });
const heroSub = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-hero-sub", display: "swap" });

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${anton.variable} ${geistMono.variable} ${pressStart.variable} ${heroDisplay.variable} ${heroSub.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
          <StoreProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <FloatingContactWidgetLazy />
            <CursorDot />
          </StoreProvider>
      </body>
    </html>
  )
}
