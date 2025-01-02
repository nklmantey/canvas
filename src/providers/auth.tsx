'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Loader from '@/components/global/loader'
import { useRouter } from 'next/navigation'
import { getCookie, setCookie } from 'cookies-next'

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

  const sessionUser = getCookie('USER')

  const fetchDbUser = async (authUserId: string) => {
    if (sessionUser) return

    setIsFetchingDbUser(true)

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', authUserId)
      .single()

    if (error) {
      setIsFetchingDbUser(false)
      return null
    }

    if (data) {
      setUser(data)
      setCookie('USER', JSON.stringify(data))
      setIsFetchingDbUser(false)
    }
  }

  useEffect(() => {
    // Only run initialization if there's no user
    if (sessionUser) return

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
  }, [router, user])

  if ((isAuthenticating || isFetchingDbUser) && !sessionUser)
    return <Loader message='checking authentication...' />

  return (
    <AuthContext.Provider
      value={{
        user: sessionUser ? JSON.parse(sessionUser as string) : null,
        isLoading: isAuthenticating || isFetchingDbUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
