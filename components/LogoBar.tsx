'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'

export default function LogoBar() {
  const { getTotalItems } = useCart()
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-genius-red focus:ring-offset-2 rounded-lg">
          <img
            src="/assets/genius-data-hub-logo.png"
            alt="Genius Data Hub"
            width={200}
            height={80}
            className="h-14 md:h-20 w-auto object-contain drop-shadow-xl"
          />
        </Link>
        {!isLandingPage && (
          <Link
            href="/cart"
            className="relative p-2 rounded-full text-black hover:bg-gray-100 transition-colors"
            aria-label="Cart"
          >
            <span className="text-xl">🛒</span>
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-genius-red text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1"
              >
                {getTotalItems()}
              </motion.span>
            )}
          </Link>
        )}
      </div>
    </header>
  )
}
