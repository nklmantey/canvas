'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Loader from '@/components/global/loader'
import { useRouter } from 'next/navigation'

type DbUser = {
  email: string
  auth_id: string
  name: string
  updated_at: string
  created_at: string
}

type AuthContextType = {
  user: DbUser | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
})

const supabase = createClient()

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DbUser | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isFetchingDbUser, setIsFetchingDbUser] = useState(true)
  const router = useRouter()

  const fetchDbUser = async (authUserId: string) => {
    setIsFetchingDbUser(true)

    const { data, error } = await supabase.from('users').select('*').eq('auth_id', authUserId).single()

    if (error) {
      setIsFetchingDbUser(false)
      return null
    }

    if (data) {
      setUser(data)
      setIsFetchingDbUser(false)
    }
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        fetchDbUser(session?.user?.id ?? '')
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        router.replace('/auth/login')
      } else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        fetchDbUser(session?.user?.id ?? '')
      }
      setIsAuthenticating(false)
    })

    // Handle initial session check
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) {
          if (error.message.includes('Refresh Token Not Found')) {
            await supabase.auth.signOut()
            router.replace('/auth/login')
          }
          throw error
        }
        fetchDbUser(session?.user?.id ?? '')
      } catch (error) {
        console.error('Auth initialization error:', error)
        setUser(null)
      } finally {
        setIsAuthenticating(false)
      }
    }

    initializeAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  if ((isAuthenticating || isFetchingDbUser) && !user) return <Loader />

  return (
    <AuthContext.Provider value={{ user, isLoading: isAuthenticating || isFetchingDbUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
