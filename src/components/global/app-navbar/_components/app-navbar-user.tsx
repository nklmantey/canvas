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
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/providers/auth'
import { CaretUpDown, CreditCard, Gear, PlusCircle, SignOut, Spinner } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { deleteCookie } from 'cookies-next'

export function AppNavbarUser() {
  const { user } = useAuth()
  const { replace } = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const supabase = createClient()

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      replace('/auth/login')
      deleteCookie('USER')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('error logging out')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className='w-full flex items-center justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='hover:cursor-pointer'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-8 w-8 rounded-full border border-border'>
                <AvatarImage src='' alt={user?.name} />
                <AvatarFallback className='rounded-full'>
                  {user?.name[0] || user?.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className='truncate text-sm font-medium'>personal</span>
            </div>
            <CaretUpDown weight='duotone' className='ml-auto size-4' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='min-w-56 rounded-lg'
          side='bottom'
          align='start'
          sideOffset={4}
        >
          {/* <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer'>
            <Gear weight='duotone' />
            settings
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer'>
            <CreditCard />
            billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
          <DropdownMenuItem className='cursor-pointer'>
            <PlusCircle weight='duotone' color='green' />
            create team
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className='hover:cursor-pointer'>
          <Avatar className='h-8 w-8 rounded-full border border-border'>
            <AvatarImage src='' alt={user?.name} />
            <AvatarFallback className='rounded-full'>
              {user?.name[0] || user?.email?.[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='min-w-56 rounded-lg'
          side='bottom'
          align='end'
          sideOffset={4}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className='flex flex-col gap-1 items-start'>
              <p className='font-semibold text-sm'>{user?.name}</p>
              <p className='text-xs text-muted-foreground'>{user?.email}</p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
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
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={handleLogout}
            disabled={isLoggingOut}
            onSelect={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {isLoggingOut ? (
              <Spinner weight='duotone' color='crimson' className='animate-spin' />
            ) : (
              <SignOut weight='duotone' color='crimson' />
            )}
            {isLoggingOut ? 'signing out...' : 'sign out'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
