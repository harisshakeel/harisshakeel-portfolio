// AI Bot login page disabled
// All login functionality has been commented out

/*
'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { login } from '@/lib/features/auth/authSlice'
import { Button } from '@/components/ui/button'
import { Bot, Lock, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/bot')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    const validUsername = process.env.NEXT_PUBLIC_BOT_USERNAME
    const validPassword = process.env.NEXT_PUBLIC_BOT_PASSWORD
    if (username === validUsername && password === validPassword) {
      dispatch(login(username))
      router.push('/bot')
    } else {
      setError('Invalid username or password')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      ...
    </div>
  )
}
*/

export default function LoginPage() {
  return null
}
