// AI Bot research API disabled

/*
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
})

interface SearchResult {
  title: string
  url: string
  content: string
  score: number
}

interface ResearchStep {
  step: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  data?: any
}

export async function POST(req: NextRequest) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: 'GROQ_API_KEY not configured.' },
      { status: 500 }
    )
  }

  let requestBody: { query?: string; messages?: any[] }
  try {
    requestBody = await req.json()
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }

  const { query, messages = [] } = requestBody

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'Valid research query is required' },
      { status: 400 }
    )
  }

  const sanitizedQuery = query.trim().slice(0, 500)
  const encoder = new TextEncoder()
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const sendUpdate = async (data: any) => {
    try {
      const json = JSON.stringify(data) + '\n'
      await writer.write(encoder.encode(`data: ${json}\n\n`))
    } catch (error) {
      console.error('Error sending update:', error)
    }
  }

  ;(async () => {
    try {
      // Step 1-5: Full research pipeline with Groq + web search
      // ... all research steps were here ...
      await writer.close()
    } catch (error: any) {
      console.error('Research API Error:', error)
      try {
        await sendUpdate({ type: 'error', error: 'Research failed.' })
        await writer.close()
      } catch (closeError) {
        console.error('Error closing writer:', closeError)
      }
    }
  })()

  return new NextResponse(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
*/

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ error: 'AI Bot is disabled' }, { status: 410 })
}
