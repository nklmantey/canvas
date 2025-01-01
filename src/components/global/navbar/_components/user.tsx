'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth'

export default function NavbarUser() {
  const { user } = useAuth()

  return (
    <div className='flex items-center space-x-2'>
      {user ? (
        <>
          <Link href='/dashboard'>
            <Button>go to dashboard</Button>
          </Link>
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
