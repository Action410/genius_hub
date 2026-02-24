'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Bundle } from './BundleCard'
import { isValidGhanaNumber } from '@/context/PurchaseFlowContext'

interface BundleSelectionModalProps {
  open: boolean
  bundle: Bundle | null
  recipientNumber: string
  onRecipientChange: (value: string) => void
  onProceed: () => void
  onClose: () => void
}

export default function BundleSelectionModal({
  open,
  bundle,
  recipientNumber,
  onRecipientChange,
  onProceed,
  onClose,
}: BundleSelectionModalProps) {
  const validNumber = isValidGhanaNumber(recipientNumber)
  const canProceed = validNumber

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [open])

  if (!bundle) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            aria-hidden
          />
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
            role="presentation"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="bundle-selection-title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="w-full max-w-md max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-xl my-auto"
            >
              <div className="flex-1 min-h-0 overflow-y-auto p-6">
                <h2 id="bundle-selection-title" className="text-xl font-bold text-black mb-4">
                  Confirm bundle
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Bundle</p>
                    <p className="font-semibold text-black">{bundle.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-genius-red">
                      GHS {bundle.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="recipient-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Number <span className="text-genius-red">*</span>
                    </label>
                    <input
                      id="recipient-number"
                      type="tel"
                      inputMode="numeric"
                      placeholder="0XXXXXXXXX"
                      value={recipientNumber}
                      onChange={(e) => onRecipientChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-genius-red ${
                        recipientNumber && !validNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                {recipientNumber && !validNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    Enter a valid Ghana number 10 ( digits starting with 0) 
                  </p>
                )}
              </div>
            </div>
              </div>
              <div className="flex gap-3 p-4 pt-0 flex-shrink-0 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onProceed}
                  disabled={!canProceed}
                  className="flex-1 py-3 rounded-xl bg-genius-red text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
