'use client'

import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  size?: number
}

export default function Logo({ className = '', size = 60 }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Black background circle for visibility */}
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="black"
      />
      {/* White circular outline */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      
      {/* 3D Box - Top face */}
      <path
        d="M 30 35 L 50 25 L 70 35 L 50 45 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      
      {/* 3D Box - Top face lines (tape/flaps) */}
      <line
        x1="40"
        y1="30"
        x2="40"
        y2="40"
        stroke="white"
        strokeWidth="1"
      />
      <line
        x1="60"
        y1="30"
        x2="60"
        y2="40"
        stroke="white"
        strokeWidth="1"
      />
      
      {/* 3D Box - Front face */}
      <path
        d="M 30 35 L 30 60 L 50 70 L 50 45 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      
      {/* 3D Box - Right face */}
      <path
        d="M 50 45 L 70 35 L 70 60 L 50 70 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />
      
      {/* Red Lightning Bolt across front face */}
      <path
        d="M 32 40 L 38 48 L 35 48 L 40 56 L 47 48 L 38 48 Z"
        fill="#DC143C"
        stroke="#DC143C"
        strokeWidth="0.8"
      />
      
      {/* Text: Ts.⚡H */}
      <text
        x="50"
        y="85"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        letterSpacing="1"
      >
        <tspan fill="white">Ts.</tspan>
        <tspan fill="#DC143C">⚡</tspan>
        <tspan fill="white">H</tspan>
      </text>
    </motion.svg>
  )
}

