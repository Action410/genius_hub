 'use client'

import { useEffect, useState } from 'react'
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
  const [isPaystackReady, setIsPaystackReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const normalizedNumber = mtnNumber.replace(/\D/g, '').slice(0, 10)
  const validNumber = isValidGhanaNumber(normalizedNumber)

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''
  const STORE_EMAIL = process.env.NEXT_PUBLIC_STORE_EMAIL || 'receipt@geniusdatahub.com'

  // Load Paystack script (same pattern as checkout)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const scriptUrl = 'https://js.paystack.co/v1/inline.js'
    const existing = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement | null
    if (existing) {
      if ((window as any).PaystackPop) setIsPaystackReady(true)
      else existing.addEventListener('load', () => setIsPaystackReady(true))
      return
    }
    const script = document.createElement('script')
    script.src = scriptUrl
    script.async = true
    script.onload = () => setIsPaystackReady(true)
    script.onerror = () => setIsPaystackReady(false)
    document.body.appendChild(script)
  }, [])

  const handleCheck = async () => {
    if (!validNumber) {
      setError('Enter a valid Ghana MTN number')
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

  const handlePayAndRegister = () => {
    if (!validNumber) {
      setError('Enter a valid Ghana MTN number')
      return
    }
    if (!PAYSTACK_PUBLIC_KEY) {
      setError('Payment configuration missing. Please contact support.')
      return
    }
    if (typeof window === 'undefined' || !(window as any).PaystackPop) {
      setError('Payment system is still loading. Please try again in a moment.')
      return
    }

    setError(null)
    setIsProcessing(true)

    const amountInKobo = Math.round(20 * 100) // GHS 20
    const ref = `afa_${normalizedNumber}_${Date.now()}`

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: STORE_EMAIL,
      amount: amountInKobo,
      currency: 'GHS',
      ref,
      metadata: {
        custom_fields: [
          { display_name: 'MTN Number', variable_name: 'afa_mtn', value: normalizedNumber },
          { display_name: 'Full Name', variable_name: 'afa_name', value: name },
        ],
      },
      callback: async () => {
        try {
          const result = await register(normalizedNumber, name || undefined)
          if (result.success || result.alreadyRegistered) {
            setStep(result.alreadyRegistered ? 'already_registered' : 'success')
          } else {
            setError('Registration failed after payment. Please contact support.')
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Registration failed after payment')
        } finally {
          setIsProcessing(false)
        }
      },
      onClose: () => {
        setIsProcessing(false)
      },
    })

    handler.openIframe()
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
          AFA Registration
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Register your MTN number to unlock AFA packages on Genius Data Hub.
        </p>
      </motion.div>

      {/* Step 1: Enter MTN number and check */}
      {step === 'enter_number' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Info card styled similar to reference but with Genius colors */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-genius-red/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <h2 className="font-semibold text-black dark:text-white">
                MTN AFA is a special plan
              </h2>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                Registered users can call each other for free. No talktime is included at
                registration. Dial <span className="font-semibold">*1848#</span> to buy
                packages after registering.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Enter your details
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Full Name as shown on ID card
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-genius-red"
                />
              </div>
              <div>
                <label htmlFor="afa-mtn" className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Mobile Number (MTN Only)
                </label>
                <input
                  id="afa-mtn"
                  type="tel"
                  inputMode="numeric"
                  placeholder="05XXXXXXXX"
                  value={mtnNumber}
                  onChange={(e) => setMtnNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-genius-red ${
                    mtnNumber && !validNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  disabled={loading}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-genius-red"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-genius-red"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Ghana Card (GHA-)
                </label>
                <input
                  type="text"
                  placeholder="GHA-XXXXXXXXX-X"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-genius-red"
                />
              </div>
            </div>
            {mtnNumber && !validNumber && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Enter a valid Ghana MTN number (05 followed by 8 digits)
              </p>
            )}
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">{error}</p>
            )}
            <button
              type="button"
              onClick={handleCheck}
              disabled={!validNumber || loading}
              className="mt-5 w-full py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Checking...' : 'Proceed'}
            </button>
          </div>
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow border border-gray-200 dark:border-gray-700 p-6"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
            This MTN number is not yet registered for AFA. To complete registration on Genius Data Hub,
            pay a one-time fee of <span className="font-semibold text-black dark:text-white">GHS 20</span>.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            AFA bundles are <span className="font-semibold">only available for MTN Ghana numbers</span>{' '}
            registered on this plan. Make sure the mobile number you entered is your active MTN line.
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
          {!PAYSTACK_PUBLIC_KEY && (
            <p className="text-xs text-red-500 mt-2">
              Payment is not yet configured. Please contact the store administrator.
            </p>
          )}
          <button
            type="button"
            onClick={handlePayAndRegister}
            disabled={loading || !isPaystackReady || isProcessing}
            className="mt-4 w-full py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing payment...' : 'Pay GHS 20 to Register'}
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

