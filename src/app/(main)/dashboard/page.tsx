'use client'

import { useAuth } from '@/providers/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const params = useSearchParams()
  const router = useRouter()
  const { user, isLoading } = useAuth()

  const isMagicLinkRedirect = params.get('redirect')

  if (isMagicLinkRedirect) return window.close()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/login')
    }
  }, [user, isLoading])

  return (
    <div className='relative w-full min-h-screen p-28 flex flex-col items-center justify-center gap-4'>
      <div className='flex flex-col gap-4 items-center justify-center'>
        <p className='text-center font-recoleta-bold text-2xl text-muted-foreground'>
          welcome to canvas
        </p>
      </div>
    </div>
  )
}
