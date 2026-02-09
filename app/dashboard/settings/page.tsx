'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function SettingsPage() {
  const { theme, toggleTheme, setTheme } = useTheme()
  const [profileData, setProfileData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: '+233 XX XXX XXXX',
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // TODO: Implement profile save functionality
    alert('Profile saved! (This is a demo - implement your save logic)')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
        Settings
      </h1>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
          Profile Settings
        </h2>

        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-tesla-red flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profileData.name.charAt(0).toUpperCase()
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 bg-tesla-red rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
              title="Upload profile picture"
            >
              📷
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click the camera icon to upload a new profile picture
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Recommended: Square image, max 2MB
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-tesla-red"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-tesla-red"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-tesla-red"
            />
          </div>

          <button
            onClick={handleSaveProfile}
            className="bg-tesla-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
          >
            Save Profile
          </button>
        </div>
      </motion.div>

      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
          Theme Settings
        </h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-black dark:text-white">
              Appearance
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Choose between light and dark mode
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                theme === 'light'
                  ? 'bg-tesla-red text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                theme === 'dark'
                  ? 'bg-tesla-red text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🌙 Dark
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="w-5 h-5 text-tesla-red rounded focus:ring-tesla-red"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Use dark mode
            </span>
          </label>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
          Account Actions
        </h2>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors">
            Download My Data
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  )
}

