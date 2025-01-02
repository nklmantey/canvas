'use client'

import CanvasTemplates from '@/components/global/canvas-templates'
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
    <div className='relative w-full min-h-screen py-16 px-8'>
      <CanvasTemplates />
    </div>
  )
}
