import type { Metadata } from 'next'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/global/sidebar'
import { SidebarSimple } from '@phosphor-icons/react/dist/ssr'
import AppNavbar from '@/components/global/app-navbar'

export const metadata: Metadata = {
  title: 'canvas',
  description: 'whiteboard collaboration tool',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='h-screen relative overflow-hidden'>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-full h-full relative'>
          <SidebarTrigger className='absolute top-20 left-2 z-50'>
            <SidebarSimple />
          </SidebarTrigger>
          <div>
            <AppNavbar />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  )
}
