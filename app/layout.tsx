import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { ToastContainer } from '@/components/toast'

export const metadata: Metadata = {
  title: 'TechFlow - Work Order Management',
  description: 'Professional work order management system for technicians',
  keywords: ['work orders', 'management', 'technicians', 'dashboard'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-background">
        <div className="flex h-screen flex-col md:flex-row">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden md:ml-0 pt-16 md:pt-0">
            {/* <Navbar /> */}
            <Navbar showSearch={false} />
            <main className="flex-1 overflow-auto bg-background">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
        <ToastContainer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
