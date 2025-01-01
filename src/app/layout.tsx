import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/utils'
import { Toaster } from 'sonner'
import {
  CheckCircle,
  WarningCircle,
  Info,
} from '@phosphor-icons/react/dist/ssr'
import TanstackProvider from '@/providers/tanstack'
import { AuthProvider } from '@/providers/auth'

const geistSans = localFont({
  src: './assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
})

const recoletaBold = localFont({
  src: './assets/fonts/Recoleta-Bold.ttf',
  variable: '--font-recoleta-bold',
})

export const metadata: Metadata = {
  title: 'canvas',
  description: 'whiteboard collaboration tool',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          `${geistSans.variable} ${recoletaBold.variable} antialiased`,
          'h-screen relative overflow-hidden'
        )}
      >
        <AuthProvider>
          <TanstackProvider>
            <Toaster
              richColors
              icons={{
                success: (
                  <CheckCircle weight='duotone' color='green' size={20} />
                ),
                error: (
                  <WarningCircle weight='duotone' color='crimson' size={20} />
                ),
                info: (
                  <Info weight='duotone' color='cornflowerblue' size={20} />
                ),
              }}
              className='font-geist-sans'
            />
            {children}
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
