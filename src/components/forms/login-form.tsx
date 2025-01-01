'use client'

import { Google } from '@/app/assets/logos'
import { LoginInput, loginSchema } from '@/app/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  authWithOAuth,
  loginUserWithMagicLink,
  loginUserWithPassword,
} from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState, useEffect } from 'react'

export default function LoginForm() {
  const router = useRouter()
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false)
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isMagicLinkSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isMagicLinkSent, countdown])

  const {
    register,
    handleSubmit: handleSubmitWithPassword,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const {
    register: registerWithMagicLink,
    handleSubmit: handleSubmitWithMagicLink,
    formState: { errors: errorsWithMagicLink },
  } = useForm<Omit<LoginInput, 'password'>>({
    resolver: zodResolver(loginSchema.omit({ password: true })),
  })

  // PASSWORD LOGIN
  const { mutate: handleLoginWithPassword, isPending: isLoggingIn } =
    useMutation({
      mutationFn: loginUserWithPassword.fn,
      onSuccess: () => {
        toast.success('logged in successfully!')
        router.replace('/dashboard')
      },
      onError: (error) => {
        console.log('ERROR', JSON.stringify(error, null, 2))
        toast.error(
          error instanceof Error
            ? error.message.toLowerCase()
            : 'failed to log in'
        )
      },
    })

  // MAGICLINK LOGIN
  const {
    mutate: handleLoginWithMagicLink,
    isPending: isLoggingInWithMagicLink,
  } = useMutation({
    mutationKey: loginUserWithMagicLink.key,
    mutationFn: loginUserWithMagicLink.fn,
    onSuccess: () => {
      toast.success('magic link sent, check your email')
      setIsMagicLinkSent(true)
      setCountdown(60)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message.toLowerCase()
          : 'failed to log in'
      )
    },
  })

  // OAUTH LOGIN
  const { mutate: handleLoginWithOAuth, isPending: isLoggingInWithOAuth } =
    useMutation({
      mutationKey: authWithOAuth.key,
      mutationFn: authWithOAuth.fn,
      onSuccess: () => {
        toast.success('logged in successfully!')
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message.toLowerCase()
            : 'failed to authorize'
        )
      },
    })

  async function onSubmitWithPassword(data: LoginInput) {
    try {
      handleLoginWithPassword(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'failed to log in')
    }
  }

  async function onSubmitWithMagicLink(data: Omit<LoginInput, 'password'>) {
    try {
      handleLoginWithMagicLink({ email: data.email })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'failed to log in')
    }
  }

  return (
    <Tabs defaultValue='magiclink' className='w-[400px]'>
      <TabsList>
        <TabsTrigger value='magiclink'>magic link</TabsTrigger>
        <TabsTrigger value='password'>password</TabsTrigger>
      </TabsList>
      <TabsContent value='magiclink'>
        <form
          onSubmit={handleSubmitWithMagicLink(onSubmitWithMagicLink)}
          className='w-[400px]'
        >
          <div className='w-full mt-4 space-y-2'>
            <Input
              className='text-[#404040]'
              placeholder='enter your email'
              type='email'
              {...registerWithMagicLink('email')}
              error={errorsWithMagicLink.email?.message}
            />
            <Button
              size='lg'
              className='w-full'
              isLoading={isLoggingInWithMagicLink}
              disabled={isLoggingInWithMagicLink || isMagicLinkSent}
            >
              {isMagicLinkSent ? 'sent' : 'send magic link'}
            </Button>
            {isMagicLinkSent && (
              <p className='text-center text-sm text-[#404040]'>
                {countdown > 0 ? (
                  `resend available in ${countdown}s`
                ) : (
                  <>
                    not seeing an email?{' '}
                    <span
                      className='underline cursor-pointer'
                      onClick={handleSubmitWithMagicLink(onSubmitWithMagicLink)}
                    >
                      resend
                    </span>
                  </>
                )}
              </p>
            )}
          </div>
        </form>
      </TabsContent>
      <TabsContent value='password'>
        <form
          onSubmit={handleSubmitWithPassword(onSubmitWithPassword)}
          className='w-[400px]'
        >
          <div className='w-full mt-4 space-y-2'>
            <Input
              placeholder='enter your email'
              type='email'
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              placeholder='enter your password'
              type='password'
              {...register('password')}
              error={errors.password?.message}
            />
            <Button
              size='lg'
              className='w-full'
              isLoading={isLoggingIn}
              disabled={isLoggingIn}
            >
              log in
            </Button>
          </div>
        </form>
      </TabsContent>

      <div className='my-4 space-y-2 w-[400px]'>
        <div className='flex items-center '>
          <Separator className='flex-1' />
          <p className='px-4'>or</p>
          <Separator className='flex-1' />
        </div>
        <div className='flex items-center justify-center space-x-2'>
          <Button disabled size='lg' className='w-full'>
            <Google />
            google
          </Button>
        </div>
      </div>

      <p className='text-center my-4'>
        don't have an account?{' '}
        <Link href='/auth/register' className='text-[#404040] underline'>
          sign up
        </Link>
      </p>
    </Tabs>
  )
}
