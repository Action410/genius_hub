'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export interface CategoryCardProps {
  slug: string
  title: string
  badge?: string
  icon?: string
}

export default function CategoryCard({ slug, title, badge, icon = '📱' }: CategoryCardProps) {
  const href = slug === 'afa' ? '/dashboard/afa' : `/bundles/${slug}`

  return (
    <Link href={href}>
      <motion.article
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-xl shadow-md border-2 border-gray-200 hover:border-genius-red transition-all duration-300 p-6 flex items-center gap-4 w-full text-left"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl md:text-3xl flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg md:text-xl font-bold text-black truncate">
            {title}
          </h2>
          {badge && (
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-genius-red/10 text-genius-red border border-genius-red/30">
              {badge}
            </span>
          )}
        </div>
        <span className="text-gray-400 text-xl">→</span>
      </motion.article>
    </Link>
  )
}
