// AI Bot login layout disabled

/*
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login to AI Assistant | Haris Shakeel',
  description: 'Sign in to access your Haris Shakeel AI assistant. Secure login portal for authorized users to chat with our Groq-powered AI chatbot.',
  openGraph: {
    title: 'Login to AI Assistant | Haris Shakeel',
    description: 'Sign in to access your Haris Shakeel AI assistant. Secure login portal for authorized users.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Login to AI Assistant | Haris Shakeel',
    description: 'Sign in to access your Haris Shakeel AI assistant.',
  },
}
*/

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
