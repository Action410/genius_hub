'use client'

import { motion } from 'framer-motion'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
        Orders
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-12 text-center"
      >
        <div className="text-6xl mb-4">📦</div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No recent orders
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Your order history will appear here
        </p>
      </motion.div>
    </div>
  )
}

