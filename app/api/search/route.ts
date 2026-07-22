// AI Bot search API disabled

/*
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    let requestBody
    try {
      requestBody = await req.json()
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { query, maxResults = 5 } = requestBody

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Valid search query is required' },
        { status: 400 }
      )
    }

    const sanitizedQuery = query.trim().slice(0, 500)
    const validMaxResults = Math.min(Math.max(parseInt(maxResults) || 5, 1), 10)

    // Tavily API, SerpAPI, DuckDuckGo fallbacks were here
    // ...
  } catch (error: any) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Search failed' },
      { status: 500 }
    )
  }
}
*/

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ error: 'AI Bot is disabled' }, { status: 410 })
}
