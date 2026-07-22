// AI Bot functionality disabled
// All bot chat functionality has been commented out

/*
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { logout } from '@/lib/features/auth/authSlice'
import { Button } from '@/components/ui/button'
import { Send, LogOut, Home, Search, MessageSquare, ExternalLink, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Source {
  title: string
  url: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: Source[]
  followUpQuestions?: string[]
  isResearch?: boolean
}

interface ResearchProgress {
  step: number
  total: number
  status: string
  message: string
  data?: any
}

export default function BotPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [researchMode, setResearchMode] = useState(false)
  const [researchProgress, setResearchProgress] = useState<ResearchProgress | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const isProcessingRef = useRef(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isLoading || isProcessingRef.current) return
    if (message.length > 2000) {
      alert('Message is too long. Please keep it under 2000 characters.')
      return
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    const userMessage: Message = { role: 'user', content: message.trim() }
    const currentMessages = [...messages, userMessage]
    setMessages(currentMessages)
    setMessage('')
    setIsLoading(true)
    setResearchProgress(null)
    isProcessingRef.current = true
    abortControllerRef.current = new AbortController()
    const { signal } = abortControllerRef.current
    try {
      if (researchMode) {
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: userMessage.content, messages: currentMessages }),
          signal,
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Request failed with status ${response.status}`)
        }
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) {
          throw new Error('No response stream available')
        }
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.type === 'complete') {
                  setMessages(prevMessages => {
                    if (prevMessages[prevMessages.length - 1]?.role === 'user' &&
                        prevMessages[prevMessages.length - 1]?.content === userMessage.content) {
                      return [...prevMessages, {
                        role: 'assistant',
                        content: data.result.answer || 'No answer generated.',
                        sources: data.result.sources || [],
                        followUpQuestions: data.result.followUpQuestions || [],
                        isResearch: true
                      }]
                    }
                    return prevMessages
                  })
                  setResearchProgress(null)
                } else if (data.type === 'error') {
                  setMessages(prevMessages => {
                    if (prevMessages[prevMessages.length - 1]?.role === 'user' &&
                        prevMessages[prevMessages.length - 1]?.content === userMessage.content) {
                      return [...prevMessages, {
                        role: 'assistant',
                        content: `Research error: ${data.error}`
                      }]
                    }
                    return prevMessages
                  })
                  setResearchProgress(null)
                } else if (data.step) {
                  setResearchProgress(data)
                } else if (data.error) {
                  setMessages(prevMessages => [...prevMessages, {
                    role: 'assistant',
                    content: `${data.error}`
                  }])
                }
              } catch (e) {
                console.error('Failed to parse SSE data:', e, line)
              }
            }
          }
        }
      } else {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: currentMessages }),
          signal,
        })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: data.error
            ? `Error: ${data.error}.`
            : (data.reply || 'No response generated.')
        }])
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled')
        return
      }
      console.error('Send message error:', error)
      setMessages(prevMessages => {
        if (prevMessages[prevMessages.length - 1]?.role === 'user') {
          return [...prevMessages, {
            role: 'assistant',
            content: `${error.message || 'Something went wrong. Please try again.'}`
          }]
        }
        return prevMessages
      })
      setResearchProgress(null)
    } finally {
      setIsLoading(false)
      isProcessingRef.current = false
      abortControllerRef.current = null
    }
  }

  const handleNewChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setMessages([])
    setMessage('')
    setResearchProgress(null)
    setIsLoading(false)
    isProcessingRef.current = false
  }

  const handleFollowUpClick = (question: string) => {
    if (!isLoading && !isProcessingRef.current) {
      setMessage(question)
    }
  }

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      ...
    </div>
  )
}
*/

export default function BotPage() {
  return null
}
