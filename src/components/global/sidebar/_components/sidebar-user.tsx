'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/providers/auth'
import { CaretUpDown, CreditCard, Gear, SignOut, Spinner } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function SidebarUser() {
  const { user } = useAuth()

  const { isMobile } = useSidebar()
  const { replace } = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const supabase = createClient()

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Only navigate after successful logout
      replace('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('error logging out')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-full'>
                  <AvatarImage src='' alt={user?.name} />
                  <AvatarFallback className='rounded-full'>{user?.email?.[0]}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate text-sm font-medium'>{user.name}</span>
                  <span className='text-xs'>{user?.email}</span>
                </div>
                <CaretUpDown weight='duotone' className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer'>
                  <Gear weight='duotone' />
                  settings
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <CreditCard />
                  billing
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer' onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? (
                  <Spinner weight='duotone' color='crimson' className='animate-spin' />
                ) : (
                  <SignOut weight='duotone' color='crimson' />
                )}
                {isLoggingOut ? 'signing out...' : 'sign out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
