'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/context/CartContext'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'

// Filter tab options: value matches bundle.network (or 'All' / display name for AT and AFA)
const FILTER_TABS = [
  { id: 'All', label: 'All' },
  { id: 'MTN', label: 'MTN' },
  { id: 'Telecel', label: 'Telecel' },
  { id: 'AT', label: 'AirtelTigo' },
  { id: 'AFA', label: 'AFA Bundle' },
] as const

type FilterId = (typeof FILTER_TABS)[number]['id']

function bundleToProduct(b: { id: string; network: string; title: string; price: number; description?: string; badge?: string; expires?: boolean; expiry_note?: string; sizeMB?: number }): Product {
  return {
    id: b.id,
    name: b.title,
    price: Number(b.price),
    image: DEFAULT_IMAGE,
    description: b.description,
    network: b.network,
    badge: b.badge,
    expires: b.expires,
    expiry_note: b.expiry_note,
    sizeMB: b.sizeMB,
  }
}

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('All')
  const [bundles, setBundles] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/bundles')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bundles')
        return res.json()
      })
      .then((data: { id: string; network: string; title: string; price: number; description?: string; badge?: string; expires?: boolean; expiry_note?: string; sizeMB?: number }[]) => {
        setBundles(data.map(bundleToProduct))
      })
      .catch((err) => setError(err?.message || 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return bundles
    return bundles.filter((p) => p.network === activeFilter)
  }, [bundles, activeFilter])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-6 md:p-8 rounded-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to <span className="text-genius-red">Genius Data Hub</span>
        </h1>
        <p className="text-lg text-gray-300">
          Fast. Secure. Delivered.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: '0', icon: '📦' },
          { label: 'Wallet Balance', value: '₵0.00', icon: '💰' },
          { label: 'Recent Orders', value: '0', icon: '🛒' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-black dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Packages Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            Data Packages
          </h2>
        </div>

        {/* Network filter tabs – one active at a time, instant filtering */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeFilter === tab.id
                  ? 'bg-genius-red text-white ring-2 ring-genius-red ring-offset-2 dark:ring-offset-gray-800'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-red" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No data packages found for this network.
          </p>
        )}
      </div>
    </div>
  )
}

