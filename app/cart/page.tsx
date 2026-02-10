'use client'

import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart()
  const [isClearing, setIsClearing] = useState(false)

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 300)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Add some data bundles to get started!
            </p>
            <Link
              href="/"
              className="inline-block bg-tesla-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              ORDER NOW
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Shopping Cart
            </h1>
            <button
              onClick={handleClearCart}
              className="text-gray-600 hover:text-tesla-red transition-colors duration-200 text-sm md:text-base"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => {
                const dataSize = item.name.match(/\d+GB/i)?.[0] || ''
                const getProviderColor = (name: string) => {
                  if (name.toLowerCase().includes('mtn')) return 'bg-yellow-500'
                  if (name.toLowerCase().includes('telecel')) return 'bg-blue-500'
                  if (name.toLowerCase().includes('airteltigo')) return 'bg-red-500'
                  if (name.toLowerCase().includes('afa')) return 'bg-green-500'
                  return 'bg-gray-500'
                }
                return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 shadow-sm hover:shadow-md hover:border-tesla-red transition-all duration-300"
                >
                  <div className={`relative w-full md:w-24 h-32 md:h-24 ${getProviderColor(item.name)} rounded-lg flex-shrink-0 flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <div className="text-3xl mb-1">📱</div>
                      <div className="text-lg font-bold">{dataSize}</div>
                    </div>
                  </div>
                  <div className="flex-grow w-full md:w-auto">
                    <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-tesla-red mb-4">
                      ₵{item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold text-sm md:text-base"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              )})}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-black mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ₵{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">₵0.00</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-black">
                      <span>Total</span>
                      <span className="text-tesla-red">
                        ₵{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="block w-full bg-tesla-red text-white text-center py-4 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Proceed to Checkout
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

