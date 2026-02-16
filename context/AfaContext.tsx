 'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AFA_PHONE_KEY = 'genius_afa_phone'

interface AfaContextType {
  isAfaRegistered: boolean
  afaPhone: string | null
  isLoading: boolean
  checkError: string | null
  checkStatus: (phone: string) => Promise<{ registered: boolean }>
  register: (phone: string, name?: string) => Promise<{ success: boolean; alreadyRegistered?: boolean }>
  setAfaPhoneAndStatus: (phone: string | null, registered: boolean) => void
  clearAfaSession: () => void
}

const AfaContext = createContext<AfaContextType | undefined>(undefined)

export function AfaProvider({ children }: { children: React.ReactNode }) {
  const [isAfaRegistered, setIsAfaRegistered] = useState(false)
  const [afaPhone, setAfaPhoneState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [checkError, setCheckError] = useState<string | null>(null)

  const setAfaPhoneAndStatus = useCallback((phone: string | null, registered: boolean) => {
    setAfaPhoneState(phone)
    setIsAfaRegistered(registered)
    setCheckError(null)
    if (typeof window !== 'undefined') {
      if (phone) window.localStorage.setItem(AFA_PHONE_KEY, phone)
      else window.localStorage.removeItem(AFA_PHONE_KEY)
    }
  }, [])

  const clearAfaSession = useCallback(() => {
    setAfaPhoneState(null)
    setIsAfaRegistered(false)
    setCheckError(null)
    if (typeof window !== 'undefined') window.localStorage.removeItem(AFA_PHONE_KEY)
  }, [])

  const checkStatus = useCallback(async (phone: string): Promise<{ registered: boolean }> => {
    const res = await fetch(`/api/afa?phone=${encodeURIComponent(phone)}`)
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to check status')
    return { registered: !!data.registered }
  }, [])

  const register = useCallback(
    async (
      phone: string,
      name?: string
    ): Promise<{ success: boolean; alreadyRegistered?: boolean }> => {
      const res = await fetch('/api/afa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to register')
      if (data.success && data.phone) {
        setAfaPhoneAndStatus(data.phone, true)
      }
      return {
        success: data.success,
        alreadyRegistered: data.alreadyRegistered,
      }
    },
    [setAfaPhoneAndStatus]
  )

  // On mount, restore persisted phone and re-fetch status so it persists across refresh/navigation
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(AFA_PHONE_KEY)
    if (!stored) {
      setIsLoading(false)
      return
    }
    setAfaPhoneState(stored)
    setIsLoading(true)
    setCheckError(null)
    fetch(`/api/afa?phone=${encodeURIComponent(stored)}`)
      .then((r) => r.json())
      .then((data) => {
        setIsAfaRegistered(!!data.registered)
      })
      .catch(() => {
        setIsAfaRegistered(false)
        setCheckError('Could not verify AFA status')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <AfaContext.Provider
      value={{
        isAfaRegistered,
        afaPhone,
        isLoading,
        checkError,
        checkStatus,
        register,
        setAfaPhoneAndStatus,
        clearAfaSession,
      }}
    >
      {children}
    </AfaContext.Provider>
  )
}

export function useAfa() {
  const ctx = useContext(AfaContext)
  if (ctx === undefined) throw new Error('useAfa must be used within AfaProvider')
  return ctx
}

