'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BundleCard from '@/components/BundleCard'
import { useAfa } from '@/context/AfaContext'
import type { Bundle } from '@/components/BundleCard'

const SLUG_TO_NETWORK: Record<string, string> = {
  mtn: 'MTN',
  telecel: 'Telecel',
  at: 'AT',
  afa: 'AFA',
}

export default function BundleListPage() {
  const params = useParams()
  const router = useRouter()
  const networkSlug = (params?.network as string) || ''
  const networkName = SLUG_TO_NETWORK[networkSlug] || networkSlug
  const isAfa = networkName.toUpperCase() === 'AFA'
  const { isAfaRegistered, isLoading: afaLoading } = useAfa()
  const [bundles, setBundles] = useState<Bundle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!networkSlug) return
    const network = SLUG_TO_NETWORK[networkSlug] ?? networkSlug
    fetch(`/api/bundles?network=${encodeURIComponent(network)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load bundles')
        return res.json()
      })
      .then(setBundles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [networkSlug])

  // Access control: only registered users can view AFA bundle purchases
  useEffect(() => {
    if (isAfa && !afaLoading && !isAfaRegistered) {
      router.replace('/dashboard/afa')
    }
  }, [isAfa, afaLoading, isAfaRegistered, router])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-red mx-auto mb-4" />
          <p className="text-gray-600">Loading bundles...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-lg bg-genius-red text-white font-semibold"
        >
          Back to store
        </Link>
      </div>
    )
  }

  // Don't render AFA bundles if not registered (redirect will run)
  if (isAfa && !afaLoading && !isAfaRegistered) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-genius-red" />
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="text-genius-red font-semibold hover:underline mb-2 inline-block"
          >
            ← Back to categories
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            {networkName} Bundles
          </h1>
          <p className="text-gray-600 mt-1">
            All bundles below have no expiry. Select and add to cart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle, index) => (
            <motion.div
              key={bundle.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <BundleCard bundle={bundle} />
            </motion.div>
          ))}
        </div>

        {bundles.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No bundles found for this network.
          </p>
        )}
      </section>
    </div>
  )
}
