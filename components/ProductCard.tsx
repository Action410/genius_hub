'use client'

import { Product } from '@/context/CartContext'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
}

// Get provider color and icon
const getProviderInfo = (name: string) => {
  if (name.toLowerCase().includes('mtn')) {
    return { color: 'bg-yellow-500', textColor: 'text-yellow-600', label: 'MTN' }
  }
  if (name.toLowerCase().includes('telecel')) {
    return { color: 'bg-blue-500', textColor: 'text-blue-600', label: 'Telecel' }
  }
  if (name.toLowerCase().includes('airteltigo')) {
    return { color: 'bg-red-500', textColor: 'text-red-600', label: 'AirtelTigo' }
  }
  if (name.toLowerCase().includes('afa')) {
    return { color: 'bg-green-500', textColor: 'text-green-600', label: 'AFA Bundle' }
  }
  return { color: 'bg-gray-500', textColor: 'text-gray-600', label: 'Data' }
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const providerInfo = getProviderInfo(product.name)
  
  // Extract data size from name (e.g., "1GB", "2GB", "5GB", "10GB")
  const dataSize = product.name.match(/\d+GB/i)?.[0] || ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:border-tesla-red hover:shadow-xl transition-all duration-300"
    >
      {/* Header with provider badge */}
      <div className={`${providerInfo.color} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{providerInfo.label}</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            📱
          </motion.div>
        </div>
      </div>

      {/* Data size display */}
      <div className="bg-gradient-to-br from-gray-50 to-white p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-4"
        >
          <div className="text-5xl md:text-6xl font-bold text-tesla-red mb-2">
            {dataSize}
          </div>
          <div className="text-sm text-gray-600 font-semibold">DATA BUNDLE</div>
        </motion.div>
      </div>

      {/* Product details */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-4">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-1">Price</p>
            <p className="text-2xl md:text-3xl font-bold text-tesla-red">
              ₵{product.price.toFixed(2)}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="bg-tesla-red text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors duration-200 shadow-md"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

