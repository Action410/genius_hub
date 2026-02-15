'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className = '', size = 60 }: LogoProps) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.15 }} className={className}>
      <img
        src="/assets/genius-data-hub-logo.png"
        alt="Genius Data Hub"
        width={size}
        style={{ display: 'block', width: size, height: 'auto', objectFit: 'contain' }}
        className="drop-shadow-lg"
      />
    </motion.div>
  )
}

