'use client'

import { useCart } from '@/context/CartContext'
import { useAfa } from '@/context/AfaContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const RECIPIENT_REGEX = /^05\d{8}$/
function isValidGhanaNumber(value: string): boolean {
  return RECIPIENT_REGEX.test(value.replace(/\s/g, ''))
}

const STORE_EMAIL = process.env.NEXT_PUBLIC_STORE_EMAIL || 'receipt@geniusdatahub.com'

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { isAfaRegistered, isLoading: afaLoading } = useAfa()
  const router = useRouter()
  const [recipientNumber, setRecipientNumber] = useState('')
  const [recipientError, setRecipientError] = useState('')
  const [isPaystackReady, setIsPaystackReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''

  const hasAfaItems = cart.some((item) => item.network?.toUpperCase() === 'AFA')

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

  // Redirect unregistered users with AFA items to AFA registration
  useEffect(() => {
    if (afaLoading) return
    if (hasAfaItems && !isAfaRegistered) {
      router.replace('/dashboard/afa')
    }
  }, [hasAfaItems, isAfaRegistered, afaLoading, router])

  const validRecipient = isValidGhanaNumber(recipientNumber)

  const handleRecipientBlur = () => {
    if (recipientNumber && !validRecipient) {
      setRecipientError('Enter a valid Ghana number (05 followed by 8 digits)')
    } else {
      setRecipientError('')
    }
  }

  const handleProceedToPayment = () => {
    if (!validRecipient) {
      setRecipientError('Enter a valid Ghana number (05 followed by 8 digits)')
      return
    }
    setRecipientError('')
    setShowPayment(true)
  }

  const payWithPaystack = () => {
    if (typeof window === 'undefined') return
    if (!PAYSTACK_PUBLIC_KEY) {
      alert('Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in your environment to accept payments.')
      return
    }
    if (!(window as any).PaystackPop) {
      alert('Payment system is still loading. Please wait a moment.')
      return
    }
    setIsProcessing(true)
    const amountInKobo = Math.round(getTotalPrice() * 100)
    const ref = `cart_${Date.now()}`

    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: STORE_EMAIL,
      amount: amountInKobo,
      currency: 'GHS',
      ref,
      metadata: {
        custom_fields: [
          { display_name: 'Recipient Number', variable_name: 'recipient_number', value: recipientNumber },
        ],
      },
      callback: async (response: { reference: string }) => {
        const orderPayload = {
          reference: response.reference,
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            network: item.network,
          })),
          email: STORE_EMAIL,
          firstName: '',
          lastName: '',
          phone: recipientNumber,
          recipient_number: recipientNumber,
        }
        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload),
          })
        } catch (err) {
          console.error('Order API error:', err)
        }
        setIsProcessing(false)
        clearCart()
        router.push(`/success?reference=${response.reference}&recipient=${encodeURIComponent(recipientNumber)}`)
      },
      onClose: () => {
        setIsProcessing(false)
      },
    })
    handler.openIframe()
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some products to checkout!
            </p>
            <a
              href="/"
              className="inline-block bg-genius-red text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Continue Shopping
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  if (hasAfaItems && !isAfaRegistered && !afaLoading) {
    return (
      <div className="min-h-screen bg-white py-12 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-red mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to AFA registration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Checkout
          </h1>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-gray-700"
                >
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold text-black">
              <span>Total</span>
              <span className="text-genius-red">₵{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>

          {!showPayment ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="checkout-recipient"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Recipient Number <span className="text-genius-red">*</span>
                </label>
                <input
                  id="checkout-recipient"
                  type="tel"
                  inputMode="numeric"
                  placeholder="05XXXXXXXX"
                  value={recipientNumber}
                  onChange={(e) => setRecipientNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onBlur={handleRecipientBlur}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-genius-red ${
                    recipientError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {recipientError && (
                  <p className="text-red-500 text-sm mt-1">{recipientError}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={!validRecipient}
                className="w-full py-4 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
              >
                Proceed to Payment
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl bg-gray-100 p-4 flex justify-between items-center">
                <span className="text-gray-600">Recipient</span>
                <span className="font-bold text-genius-red">{recipientNumber}</span>
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="text-sm text-genius-red hover:underline"
                >
                  Change
                </button>
              </div>
              <p className="text-sm text-gray-600">Select payment method</p>
              <button
                type="button"
                onClick={payWithPaystack}
                disabled={!isPaystackReady || isProcessing}
                className="w-full py-4 rounded-xl border-2 border-genius-red bg-genius-red/5 text-black font-semibold hover:bg-genius-red/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-genius-red border-t-transparent" />
                    Processing…
                  </>
                ) : (
                  <>Paystack – Mobile Money (₵{getTotalPrice().toFixed(2)})</>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

