'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/logo.png"
              alt="TwoPixel Logo"
              width={120}
              height={40}
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            We're sorry, but something unexpected happened. Please try again or return to the homepage.
          </p>

          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mb-8 p-4 bg-destructive/5 border border-destructive/20 rounded-lg text-left">
              <p className="text-sm text-destructive font-mono break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            size="lg"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please <Link href="#contact-section" className="text-primary hover:underline">contact our support team</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
