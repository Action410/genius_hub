'use client'

import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-black text-white py-8 mt-auto"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <Logo size={64} />
        <p className="text-sm md:text-base">
          © Genius Data Hub. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}

