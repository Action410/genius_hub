'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/context/CartContext'
import Link from 'next/link'

// Internet Data Bundles - MTN, Telecel, AirtelTigo, AFA Bundle
const products: Product[] = [
  {
    id: 'mtn-1gb',
    name: 'MTN 1GB Data',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '1GB data bundle - Valid for 7 days',
  },
  {
    id: 'mtn-2gb',
    name: 'MTN 2GB Data',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '2GB data bundle - Valid for 7 days',
  },
  {
    id: 'mtn-5gb',
    name: 'MTN 5GB Data',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '5GB data bundle - Valid for 30 days',
  },
  {
    id: 'mtn-10gb',
    name: 'MTN 10GB Data',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '10GB data bundle - Valid for 30 days',
  },
  {
    id: 'telecel-1gb',
    name: 'Telecel 1GB Data',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '1GB data bundle - Valid for 7 days',
  },
  {
    id: 'telecel-2gb',
    name: 'Telecel 2GB Data',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '2GB data bundle - Valid for 7 days',
  },
  {
    id: 'telecel-5gb',
    name: 'Telecel 5GB Data',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '5GB data bundle - Valid for 30 days',
  },
  {
    id: 'airteltigo-1gb',
    name: 'AirtelTigo 1GB Data',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '1GB data bundle - Valid for 7 days',
  },
  {
    id: 'airteltigo-2gb',
    name: 'AirtelTigo 2GB Data',
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '2GB data bundle - Valid for 7 days',
  },
  {
    id: 'airteltigo-5gb',
    name: 'AirtelTigo 5GB Data',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '5GB data bundle - Valid for 30 days',
  },
  {
    id: 'afa-1gb',
    name: 'AFA Bundle 1GB Data',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '1GB data bundle - Valid for 7 days',
  },
  {
    id: 'afa-2gb',
    name: 'AFA Bundle 2GB Data',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '2GB data bundle - Valid for 7 days',
  },
  {
    id: 'afa-5gb',
    name: 'AFA Bundle 5GB Data',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    description: '5GB data bundle - Valid for 30 days',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-6 md:p-8 rounded-lg"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome to <span className="text-tesla-red">Tesla Hub</span>
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

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
            Data Packages
          </h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search packages..."
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-tesla-red"
            />
          </div>
        </div>

        {/* Network Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All Networks', 'MTN', 'Telecel', 'AirtelTigo', 'AFA Bundle'].map((network) => (
            <button
              key={network}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                network === 'All Networks'
                  ? 'bg-tesla-red text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {network}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

