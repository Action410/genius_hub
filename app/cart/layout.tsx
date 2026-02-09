import DashboardLayout from '@/components/DashboardLayout'
import { ThemeProvider } from '@/context/ThemeContext'

export default function CartLayout({
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

