'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import CategoryCard from '@/components/CategoryCard'

interface Category {
  network: string
  slug: string
  label: string
  badge: string
  icon: string
}

export default function StoreHome() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load categories')
        return res.json()
      })
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-red mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-genius-red text-white font-semibold"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              Choose a network
            </h1>
            <p className="text-gray-600">
              Select a category to view data bundles. All bundles come with no expiry.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-genius-red font-semibold hover:underline flex items-center"
          >
            ← Back to Dashboard
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <CategoryCard
                slug={cat.slug}
                title={cat.label}
                badge={cat.badge}
                icon={cat.icon}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/landing"
            className="inline-block text-genius-red font-semibold hover:underline"
          >
            MORE SERVICES
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
