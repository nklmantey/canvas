'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/providers/auth'
import { useState } from 'react'

export default function NavbarUser() {
  const { user } = useAuth()
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
    <div className='flex items-center space-x-2'>
      {user ? (
        <>
          <Avatar className='w-8 h-8'>
            <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button variant='destructive' onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'signing out...' : 'sign out'}
          </Button>
        </>
      ) : (
        <>
          <Link href='/auth/login'>
            <Button variant='secondary'>sign in</Button>
          </Link>
          <Link href='/auth/register'>
            <Button>get started</Button>
          </Link>
        </>
      )}
    </div>
  )
}
