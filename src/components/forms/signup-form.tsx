'use client'

import { Google } from '@/app/assets/logos'
import { SignupInput, signupSchema } from '@/app/schemas'
import { signupUser, authWithOAuth } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export default function SignupForm() {
  const router = useRouter()

  const { mutate: handleSignup, isPending: isSigningUp } = useMutation({
    mutationKey: signupUser.key,
    mutationFn: signupUser.fn,
    onSuccess: () => {
      toast.success('account created successfully!')
      router.replace('/dashboard')
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message.toLowerCase() : 'failed to create account')
    },
  })

  // const { mutate: handleSignupWithOAuth, isPending: isSigningUpWithOAuth } = useMutation({
  //   mutationKey: authWithOAuth.key,
  //   mutationFn: authWithOAuth.fn,
  //   onSuccess: () => {
  //     toast.success('account created successfully!')
  //   },
  //   onError: (error) => {
  //     toast.error(error instanceof Error ? error.message.toLowerCase() : 'failed to authorize')
  //   },
  // })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  })

  async function onSubmit(data: SignupInput) {
    try {
      handleSignup(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'failed to create account')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-[400px]'>
      <div className='w-full space-y-2'>
        <Input placeholder='enter your name' {...register('name')} error={errors.name?.message} />
        <Input placeholder='enter your email' type='email' {...register('email')} error={errors.email?.message} />
        <Input
          placeholder='enter your password'
          type='password'
          {...register('password')}
          error={errors.password?.message}
        />

        <Button size='lg' className='w-full' isLoading={isSigningUp} disabled={isSigningUp}>
          create account
        </Button>
      </div>

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
        already have an account?{' '}
        <Link href='/auth/login' className='underline'>
          log in
        </Link>
      </p>
    </form>
  )
}
