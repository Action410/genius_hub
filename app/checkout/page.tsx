'use client'

import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { usePaystackPayment } from 'react-paystack'

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // TODO: Replace with your Paystack public key
  // Get your public key from: https://dashboard.paystack.com/#/settings/developer
  const PAYSTACK_PUBLIC_KEY = 'YOUR_PAYSTACK_PUBLIC_KEY'

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: getTotalPrice() * 100, // Paystack expects amount in kobo (smallest currency unit)
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'GHS', // Ghana Cedis
    metadata: {
      custom_fields: [
        {
          display_name: 'First Name',
          variable_name: 'first_name',
          value: formData.firstName,
        },
        {
          display_name: 'Last Name',
          variable_name: 'last_name',
          value: formData.lastName,
        },
        {
          display_name: 'Phone',
          variable_name: 'phone',
          value: formData.phone,
        },
        {
          display_name: 'Address',
          variable_name: 'address',
          value: formData.address,
        },
        {
          display_name: 'City',
          variable_name: 'city',
          value: formData.city,
        },
      ],
    },
  }

  const initializePayment = usePaystackPayment(config)

  const onSuccess = (reference: any) => {
    // Clear cart after successful payment
    clearCart()
    // Redirect to success page
    router.push(`/success?reference=${reference.reference}`)
  }

  const onClose = () => {
    // Handle payment modal close
    console.log('Payment modal closed')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      if (PAYSTACK_PUBLIC_KEY === 'YOUR_PAYSTACK_PUBLIC_KEY') {
        alert(
          'Please configure your Paystack public key in app/checkout/page.tsx'
        )
        return
      }
      initializePayment({ onSuccess, onClose })
    }
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
              className="inline-block bg-tesla-red text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Continue Shopping
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+233 XX XXX XXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Street address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-tesla-red ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Accra"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-tesla-red text-white py-4 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200 text-lg"
                >
                  Pay ₵{getTotalPrice().toFixed(2)}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-gray-700"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₵{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-black">
                      <span>Total</span>
                      <span className="text-tesla-red">
                        ₵{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

