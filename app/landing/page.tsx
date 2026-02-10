'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Logo size={45} />
              <span className="text-2xl md:text-3xl font-bold text-white">
                Tesla Hub
              </span>
            </Link>
            <div className="flex items-center space-x-4 md:space-x-6">
              <Link
                href="/dashboard"
                className="text-white hover:text-tesla-red transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="bg-tesla-red text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner 1: Fast Delivery Now Ongoing */}
      <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Background with diagonal split - black left, red/white right */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black w-1/2"></div>
          <div className="absolute inset-0 right-0 w-1/2 bg-gradient-to-br from-tesla-red via-red-600 to-white"></div>
          {/* Confetti effect - using gradient instead of inline styles */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white via-transparent to-tesla-red"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-tesla-red">FAST</span>{' '}
                  <span className="text-white">DELIVERY</span>
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  NOW ONGOING
                </h2>
                <div className="space-y-3 text-xl md:text-2xl">
                  <p className="flex items-center">
                    <span className="text-tesla-red mr-3">•</span> RELIABLE
                  </p>
                  <p className="flex items-center">
                    <span className="text-tesla-red mr-3">•</span> RESPONSIVE
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-block bg-tesla-red text-white px-8 py-4 rounded-lg font-bold text-lg md:text-xl hover:bg-red-700 transition-colors duration-200 shadow-xl mt-6"
                >
                  ORDER NOW
                </Link>
              </motion.div>

              {/* Right Side - Image Placeholder for Delivery Character */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[400px] md:h-[500px]"
              >
                {/* TODO: Replace with your promotional banner image 1 */}
                {/* Upload your image to public/banner-1.jpg and uncomment below */}
                {/* <Image
                  src="/banner-1.jpg"
                  alt="Fast Delivery - Delivery Person"
                  fill
                  className="object-contain"
                  priority
                /> */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center border-4 border-tesla-red">
                  <p className="text-white text-center px-4">
                    Banner 1: Fast Delivery Now Ongoing
                    <br />
                    <span className="text-sm text-gray-400">
                      Upload banner-1.jpg to public folder
                    </span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Logo in top right */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <Logo size={60} />
        </div>
      </section>

      {/* Banner 2: Fast & Reliable Delivery with Scooter */}
      <section className="relative w-full bg-gradient-to-r from-black via-gray-900 to-gray-100 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="text-white">FAST &</span>{' '}
                <span className="text-tesla-red">RELIABLE</span>
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-tesla-red">
                DELIVERY
              </h3>
              <div className="space-y-3 text-lg md:text-xl">
                <p className="flex items-center">
                  <span className="text-tesla-red mr-3">•</span> QUALITY PRODUCTS
                </p>
                <p className="flex items-center">
                  <span className="text-tesla-red mr-3">•</span> 24/7 SERVICE
                </p>
                <p className="flex items-center">
                  <span className="text-tesla-red mr-3">•</span> DIRECT TO YOUR DOOR
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-block bg-tesla-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-xl mt-6"
              >
                ORDER NOW
              </Link>
            </motion.div>

            {/* Right Side - Scooter Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px]"
            >
              {/* TODO: Replace with your promotional banner image 2 */}
              {/* Upload your image to public/banner-2.jpg and uncomment below */}
              {/* <Image
                src="/banner-2.jpg"
                alt="Fast & Reliable Delivery - Scooter"
                fill
                className="object-contain"
              /> */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center border-4 border-tesla-red">
                <p className="text-white text-center px-4">
                  Banner 2: Fast & Reliable Delivery
                  <br />
                  <span className="text-sm text-gray-400">
                    Upload banner-2.jpg to public folder
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banner 3: Fast. Secure. Delivered. (Vertical Style) */}
      <section className="relative w-full min-h-[800px] bg-white overflow-hidden">
        {/* Background with wave effect */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-black via-gray-900 to-tesla-red"></div>
          {/* Wave separator */}
          <svg
            className="absolute bottom-1/2 left-0 w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                <span className="text-black">FAST</span>
                <span className="text-tesla-red">.</span>
                <br />
                <span className="text-tesla-red">SECURE</span>
                <span className="text-black">.</span>
                <br />
                <span className="text-black">DELIVERED</span>
                <span className="text-tesla-red">.</span>
              </h1>
              <div className="flex items-center space-x-4 mt-8">
                <div className="bg-black text-white px-6 py-3 rounded-full font-bold">
                  24/7 SERVICE
                </div>
              </div>
              <Link
                href="/dashboard"
                className="inline-block bg-tesla-red text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-200 shadow-xl mt-6"
              >
                ORDER NOW
              </Link>
            </motion.div>

            {/* Right Side - Delivery Drivers Image */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] md:h-[600px]"
            >
              {/* TODO: Replace with your promotional banner image 3 */}
              {/* Upload your image to public/banner-3.jpg and uncomment below */}
              {/* <Image
                src="/banner-3.jpg"
                alt="Fast Secure Delivered - Delivery Drivers"
                fill
                className="object-contain"
              /> */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center border-4 border-tesla-red">
                <p className="text-white text-center px-4">
                  Banner 3: Fast. Secure. Delivered.
                  <br />
                  <span className="text-sm text-gray-400">
                    Upload banner-3.jpg to public folder
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Banner 4: Global Delivery */}
      <section className="relative w-full bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-black">
                Delivering to Customers
              </h2>
              <h3 className="text-5xl md:text-7xl font-bold text-tesla-red">
                Across the Globe
              </h3>
              <div className="bg-tesla-red text-white px-6 py-3 rounded-lg inline-block">
                <p className="text-xl font-bold">At Affordable Prices</p>
              </div>
              <div className="mt-8">
                <p className="text-3xl md:text-4xl font-bold">
                  <span className="text-white bg-black px-4 py-2 rounded">FAST.</span>{' '}
                  <span className="text-white bg-black px-4 py-2 rounded">SECURE.</span>{' '}
                  <span className="text-tesla-red bg-black px-4 py-2 rounded">DELIVERED.</span>
                </p>
              </div>
            </motion.div>

            {/* Right Side - Airplane Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px]"
            >
              {/* TODO: Replace with your promotional banner image 4 */}
              {/* Upload your image to public/banner-4.jpg and uncomment below */}
              {/* <Image
                src="/banner-4.jpg"
                alt="Global Delivery - Airplane"
                fill
                className="object-contain"
              /> */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center border-4 border-tesla-red">
                <p className="text-white text-center px-4">
                  Banner 4: Global Delivery
                  <br />
                  <span className="text-sm text-gray-400">
                    Upload banner-4.jpg to public folder
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services / Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            Our <span className="text-tesla-red">Services</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Fast Delivery',
                description: 'Instant data bundle delivery to your phone number. No waiting, no delays.',
              },
              {
                icon: '🔒',
                title: 'Secure Payments',
                description: 'Safe and secure payment processing with Paystack. Your data is protected.',
              },
              {
                icon: '💰',
                title: 'Affordable Prices',
                description: 'Competitive pricing on all data bundles. Best value for your money.',
              },
              {
                icon: '🕐',
                title: '24/7 Service',
                description: 'Round-the-clock service available for all your data needs.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-200 hover:border-tesla-red transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            How It <span className="text-tesla-red">Works</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Browse Products', description: 'Explore our wide range of data bundles' },
              { step: '2', title: 'Add to Cart', description: 'Select your preferred data packages' },
              { step: '3', title: 'Pay with Paystack', description: 'Secure payment via Paystack gateway' },
              { step: '4', title: 'We Deliver to You', description: 'Instant delivery to your phone number' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-tesla-red rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-tesla-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers. Get your data bundles delivered instantly.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-tesla-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Logo size={60} />
          </div>
          <p className="text-sm md:text-base">
            © Tesla Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
