'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useTheme } from '@/context/ThemeContext'
import Logo from './Logo'
import { motion } from 'framer-motion'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { getTotalItems } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Orders', href: '/dashboard/orders', icon: '📦', badge: null },
    { name: 'Store', href: '/', icon: '🛍️' },
    { name: 'Cart', href: '/cart', icon: '🛒', badge: getTotalItems() },
    { name: 'Transactions', href: '/dashboard/transactions', icon: '💳' },
    { name: 'Agent', href: '/dashboard/agent', icon: '👤' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ]

  // Only one menu item is active: the most specific route that matches the current pathname.
  const activeHref = (() => {
    const current = pathname ?? ''
    // Sort by href length descending so we match the most specific first.
    const sorted = [...menuItems].sort((a, b) => b.href.length - a.href.length)
    const match = sorted.find((item) => {
      if (item.href === '/') return current === '/'
      return current === item.href || current.startsWith(item.href + '/')
    })
    return match?.href ?? null
  })()

  const isActive = (href: string) => activeHref === href

  return (
    <div className="h-full min-h-0 flex bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - fixed so it stays in place when scrolling */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/dashboard" className="flex items-center gap-3">
              <Logo size={56} />
              <span className="text-lg font-bold text-black dark:text-white leading-tight">
                Genius Data Hub
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-genius-red text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span className="ml-auto bg-genius-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content - left margin on desktop so it doesn't sit under fixed sidebar */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-64 h-full overflow-hidden">
        {/* Top Header - stays fixed when scrolling main content */}
        <header className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
              title="Toggle menu"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Right side - Theme toggle and Profile */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 bg-genius-red rounded-full flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:block">
                    User
                  </span>
                  <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <span>👤</span>
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <span>⚙️</span>
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false)
                        router.push('/landing')
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                    >
                      <span>🚪</span>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - only this part scrolls */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

