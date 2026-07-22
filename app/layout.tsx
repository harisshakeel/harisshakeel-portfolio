import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import StoreProvider from '@/components/store-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { FloatingContactWidgetLazy } from '@/components/floating-contact-widget-lazy'
import { defaultMetadata, personSchema, websiteSchema } from '@/lib/seo'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = defaultMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
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
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
