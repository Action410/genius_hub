import DashboardLayout from '@/components/DashboardLayout'
import { ThemeProvider } from '@/context/ThemeContext'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ThemeProvider>
  )
}

