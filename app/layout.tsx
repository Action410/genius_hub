import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { PurchaseFlowProvider } from '@/context/PurchaseFlowContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AfaProvider } from '@/context/AfaContext'
import LogoBar from '@/components/LogoBar'
import Footer from '@/components/Footer'
import FloatingSupportButton from '@/components/FloatingSupportButton'
import PurchaseFlowModals from '@/components/PurchaseFlowModals'

export const metadata: Metadata = {
  title: 'Genius Data Hub - Fast, Secure, Reliable Digital Services',
  description: 'Fast & Reliable Data Services. No expiry bundles.',
  icons: {
    icon: '/assets/genius-data-hub-logo.png',
    shortcut: '/assets/genius-data-hub-logo.png',
    apple: '/assets/genius-data-hub-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
        <ThemeProvider>
          <AfaProvider>
            <CartProvider>
              <PurchaseFlowProvider>
                <LogoBar />
                <main className="flex-1 pt-[4.5rem] md:pt-24">{children}</main>
                <Footer />
                <FloatingSupportButton />
                <PurchaseFlowModals />
              </PurchaseFlowProvider>
            </CartProvider>
          </AfaProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

