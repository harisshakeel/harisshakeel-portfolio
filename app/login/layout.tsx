// AI Bot login layout disabled. The route still resolves, so keep it out of search indexes.

import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Login',
  description: 'Private login area on the Haris Shakeel portfolio. This page is not intended for search results.',
  path: '/login',
  noIndex: true,
})

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
