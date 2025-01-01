import { LoginInput, SignupInput } from '@/app/schemas'
import { createClient } from '../supabase/client'
import { Provider } from '@supabase/supabase-js'
import { formatFileName } from '@/utils'

const supabase = createClient()

export const signupUser = {
  key: ['signupUser'],
  fn: async (input: SignupInput) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp(input)
      if (authError) throw authError

      const { error: userError } = await supabase.from('users').insert([
        {
          email: authData.user?.email,
          auth_id: authData.user?.id,
          name: input.name,
        },
      ])

      if (userError) throw userError

      return authData
    } catch (e) {
      throw e
    }
  },
}

export const loginUserWithPassword = {
  key: ['loginUserWithPassword'],
  fn: async (input: LoginInput) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(input)

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  },
}

export const loginUserWithMagicLink = {
  key: ['loginUserWithMagicLink'],
  fn: async ({ email }: { email: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: 'http://localhost:3000/dashboard/',
        },
      })

      if (error) {
        const errorMessage = error.code === 'otp_disabled' ? "account with this email doesn't exist" : error.message
        throw new Error(errorMessage)
      }

      return data
    } catch (e) {
      throw e
    }
  },
}

export const authWithOAuth = {
  key: ['authWithOAuth'],
  fn: async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'http://localhost:3000/dashboard/',
        },
      })

      if (error) throw error
    } catch (e) {
      throw e
    }
  },
}

export const createUserSpace = {
  key: ['createUserSpace'],
  fn: async ({ name, userId, spaceId }: { name: string; userId: string; spaceId: number }) => {
    try {
      if (!userId) throw new Error('User not found')

      const { data: space, error } = await supabase
        .from('spaces')
        .insert([{ id: spaceId, name, created_by: userId }])
        .select('id')
        .single()

      if (error) throw error

      return space
    } catch (e) {
      throw e
    }
  },
}

export const uploadFileToBucket = {
  key: ['uploadFileToBucket'],
  fn: async ({ file, spaceId }: { file: File; spaceId: string }) => {
    try {
      const formattedFileName = formatFileName(file.name)
      const { data, error } = await supabase.storage.from('files').upload(`${spaceId}/${formattedFileName}`, file)

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  },
}

export const getUserSpaces = {
  key: ['getUserSpaces'],
  fn: async (userId: string) => {
    const { data, error } = await supabase.from('spaces').select('*').eq('created_by', userId)

    if (error) throw error

    return data
  },
}
