// AI Bot layout disabled. The route still resolves, so keep it out of search indexes.

import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Assistant',
  description: 'Private assistant area on the Haris Shakeel portfolio. This page is not intended for search results.',
  path: '/bot',
  noIndex: true,
})

export default function BotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
