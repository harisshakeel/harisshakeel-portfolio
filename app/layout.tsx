import type { Metadata } from 'next'
import { Anton, Space_Grotesk, Geist_Mono, Press_Start_2P } from 'next/font/google'
import StoreProvider from '@/components/store-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { FloatingContactWidgetLazy } from '@/components/floating-contact-widget-lazy'
import { CursorDot } from '@/components/ui/cursor-dot'
import { defaultMetadata, personSchema, websiteSchema } from '@/lib/seo'
import './globals.css'

// Brutalist editorial type system: Anton for giant display headings,
// Space Grotesk for body/UI, Geist Mono for code + eyebrow labels.
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const pressStart = Press_Start_2P({ subsets: ["latin"], weight: "400", variable: "--font-pixel", display: "swap" });

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${anton.variable} ${geistMono.variable} ${pressStart.variable}`} suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StoreProvider>
            {children}
            <FloatingContactWidgetLazy />
            <CursorDot />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
