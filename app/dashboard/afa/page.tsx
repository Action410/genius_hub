 'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAfa } from '@/context/AfaContext'
import { isValidGhanaNumber } from '@/context/PurchaseFlowContext'

type Step = 'enter_number' | 'already_registered' | 'registration_form' | 'success'

export default function AfaRegistrationPage() {
  const { checkStatus, register, setAfaPhoneAndStatus } = useAfa()
  const [step, setStep] = useState<Step>('enter_number')
  const [mtnNumber, setMtnNumber] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const normalizedNumber = mtnNumber.replace(/\D/g, '').slice(0, 10)
  const validNumber = isValidGhanaNumber(normalizedNumber)

  const handleCheck = async () => {
    if (!validNumber) {
      setError('Enter a valid Ghana MTN number (05 followed by 8 digits)')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const { registered } = await checkStatus(normalizedNumber)
      if (registered) {
        setAfaPhoneAndStatus(normalizedNumber, true)
        setStep('already_registered')
      } else {
        setStep('registration_form')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not check registration status')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!validNumber) {
      setError('Enter a valid Ghana MTN number')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const result = await register(normalizedNumber, name || undefined)
      if (result.success && !result.alreadyRegistered) {
        setStep('success')
      }
      if (result.alreadyRegistered) {
        setStep('already_registered')
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const resetFlow = () => {
    setStep('enter_number')
    setMtnNumber('')
    setName('')
    setError(null)
  }

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
          MTN AFA Registration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Register your MTN number for AFA bundles. One-time registration per number.
        </p>
      </motion.div>

      {/* Step 1: Enter MTN number and check */}
      {step === 'enter_number' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6"
        >
          <label htmlFor="afa-mtn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            MTN Number <span className="text-genius-red">*</span>
          </label>
          <input
            id="afa-mtn"
            type="tel"
            inputMode="numeric"
            placeholder="05XXXXXXXX"
            value={mtnNumber}
            onChange={(e) => setMtnNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-genius-red dark:bg-gray-700 dark:border-gray-600 ${
              mtnNumber && !validNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {mtnNumber && !validNumber && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              Enter a valid Ghana number (05 followed by 8 digits)
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
          )}
          <button
            type="button"
            onClick={handleCheck}
            disabled={!validNumber || loading}
            className="mt-4 w-full py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Checking...' : 'Check registration'}
          </button>
        </motion.div>
      )}

      {/* Already registered */}
      {step === 'already_registered' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
        >
          <p className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            You are already registered for MTN AFA.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            This number is registered. You can purchase AFA bundles.
          </p>
          <Link
            href="/bundles/afa"
            className="inline-block w-full text-center py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Go to AFA Packages
          </Link>
          <button
            type="button"
            onClick={resetFlow}
            className="mt-3 w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            Check another number
          </button>
        </motion.div>
      )}

      {/* Registration form (not registered) */}
      {step === 'registration_form' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This number is not yet registered. Complete registration below.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                MTN Number <span className="text-genius-red">*</span>
              </label>
              <input
                type="tel"
                value={normalizedNumber}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label htmlFor="afa-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your name (optional)
              </label>
              <input
                id="afa-name"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-genius-red dark:bg-gray-700"
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
          )}
          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="mt-4 w-full py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Registering...' : 'Complete registration'}
          </button>
          <button
            type="button"
            onClick={() => setStep('enter_number')}
            className="mt-3 w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
          >
            Use another number
          </button>
        </motion.div>
      )}

      {/* Success */}
      {step === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
        >
          <p className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
            Registration successful
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            You can now purchase AFA bundles.
          </p>
          <Link
            href="/bundles/afa"
            className="inline-block w-full text-center py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Go to AFA Packages
          </Link>
        </motion.div>
      )}

      <p className="mt-6 text-center">
        <Link
          href="/dashboard"
          className="text-genius-red font-semibold hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </p>
    </div>
  )
}

