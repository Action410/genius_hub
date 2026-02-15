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
        src="/assets/genius-data-hub-logo.svg"
        alt="Genius Data Hub"
        width={size}
        height={Math.round((size * 120) / 400)}
        style={{ display: 'block', width: size, height: 'auto' }}
      />
    </motion.div>
  )
}

