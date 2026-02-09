'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Header() {
  const { getTotalItems } = useCart()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Logo size={45} />
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold text-white hidden sm:block"
            >
              Tesla Hub
            </motion.h1>
          </Link>

          <nav className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="text-white hover:text-tesla-red transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/cart"
              className="relative text-white hover:text-tesla-red transition-colors duration-200"
            >
              Cart
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-tesla-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

