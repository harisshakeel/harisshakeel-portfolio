// AI Bot chat API disabled

/*
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      )
    }

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2048,
    })

    const reply = completion.choices[0]?.message?.content || 'No response'

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get response' },
      { status: 500 }
    )
  }
}
*/

import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ error: 'AI Bot is disabled' }, { status: 410 })
}
