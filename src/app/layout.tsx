import type { Metadata } from 'next'
import '@/styles/reset.css'
import '@/styles/colors.css'
import '@/styles/typography.css'
import '@/styles/globals.css'
import Header from '@/presentation/components/Header/Header'
import { CartProvider } from '@/presentation/context/CartContext'
import { DependencyProvider } from '@/presentation/providers/DependencyProvider'

export const metadata: Metadata = {
  title: 'Zara Challenge',
  description: 'Mobile phone catalog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <DependencyProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </DependencyProvider>
      </body>
    </html>
  )
}
