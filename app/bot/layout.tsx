// AI Bot layout disabled

/*
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Chat Assistant | TwoPixel',
  description: 'Chat with our AI-powered assistant for instant help and support. Get answers to your questions using advanced Groq AI technology.',
  openGraph: {
    title: 'AI Chat Assistant | TwoPixel',
    description: 'Chat with our AI-powered assistant for instant help and support. Get answers to your questions using advanced Groq AI technology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chat Assistant | TwoPixel',
    description: 'Chat with our AI-powered assistant for instant help and support.',
  },
}
*/

export default function BotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
