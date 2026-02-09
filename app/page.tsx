'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirect to landing page - Landing page is now the default entry point
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/landing')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}

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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Promotional Banner Background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-black via-gray-900 to-black py-16 md:py-24 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-tesla-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tesla-red rounded-full blur-3xl"></div>
        </div>
        
        {/* Wave pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <path
              d="M0,200 Q300,100 600,200 T1200,200 L1200,400 L0,400 Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DC143C" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <Logo size={120} />
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="text-white">FAST</span>
            <span className="text-tesla-red">.</span>
            <span className="text-white"> SECURE</span>
            <span className="text-tesla-red">.</span>
            <span className="text-white"> DELIVERED</span>
            <span className="text-tesla-red">.</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-3xl text-white font-semibold mb-8"
          >
            Internet Data Bundles - Fast & Reliable Delivery
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4 text-white mb-6"
          >
            <span className="text-lg">• RELIABLE</span>
            <span className="text-lg">• RESPONSIVE</span>
            <span className="text-lg">• 24/7 SERVICE</span>
          </motion.div>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-tesla-red text-white px-8 py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-red-700 transition-colors duration-200 shadow-lg"
          >
            SHOP NOW
          </motion.button>
        </div>
      </motion.section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-black">FAST &</span>{' '}
            <span className="text-tesla-red">RELIABLE</span>
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-tesla-red mb-6">
            DELIVERY
          </h3>
          <p className="text-lg text-gray-700 mb-4">QUALITY PRODUCTS • 24/7 SERVICE • DIRECT TO YOUR DOOR</p>
        </motion.div>

        {/* MTN Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-transparent"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-600 whitespace-nowrap">MTN Data</h3>
            <div className="w-full h-1 bg-gradient-to-l from-yellow-500 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.filter(p => p.name.toLowerCase().includes('mtn')).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Telecel Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 whitespace-nowrap">Telecel Data</h3>
            <div className="w-full h-1 bg-gradient-to-l from-red-500 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {products.filter(p => p.name.toLowerCase().includes('telecel')).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AirtelTigo Data Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 whitespace-nowrap">AirtelTigo Data</h3>
            <div className="w-full h-1 bg-gradient-to-l from-blue-500 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.filter(p => p.name.toLowerCase().includes('airteltigo')).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 md:py-20 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-tesla-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-tesla-red rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-tesla-red">Tesla Hub</span>?
            </h2>
            <p className="text-xl text-gray-300">Fast. Secure. Delivered.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-2 text-tesla-red">FAST DELIVERY</h3>
              <p className="text-gray-300">Instant data bundle delivery to your phone number. No waiting, no delays.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-2 text-tesla-red">SECURE</h3>
              <p className="text-gray-300">Safe and secure payment processing. Your data is protected.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-2 text-tesla-red">DELIVERED</h3>
              <p className="text-gray-300">Direct to your door. 24/7 service available for all your data needs.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-tesla-red/20 border-2 border-tesla-red rounded-lg px-8 py-4">
              <p className="text-2xl font-bold text-white">
                <span className="text-tesla-red">24/7</span> SERVICE AVAILABLE
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12"
          >
            Available <span className="text-tesla-red">Providers</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['MTN', 'Telecel', 'AirtelTigo', 'AFA Bundle'].map((provider, index) => (
              <motion.div
                key={provider}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border-2 border-gray-200 hover:border-tesla-red transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3">📱</div>
                <h3 className="text-xl font-bold text-gray-900">{provider}</h3>
                <p className="text-sm text-gray-600 mt-2">Data Bundles Available</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

