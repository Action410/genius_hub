'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <Link href="/auth/signin" className="mb-8">
        <Logo size={64} />
      </Link>
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-center text-black dark:text-white mb-2">
          Forgot password?
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </p>
        {sent ? (
          <p className="text-center text-gray-700 dark:text-gray-300 py-4">
            If an account exists for that email, you&apos;ll receive a password reset link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-genius-red focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-genius-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Send reset link
            </button>
          </form>
        )}
        <p className="mt-6 text-center">
          <Link href="/auth/signin" className="text-genius-red font-medium hover:underline text-sm">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
