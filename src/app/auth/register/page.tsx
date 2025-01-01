import { SignupForm } from '@/components/forms'
import Logo from '@/components/global/logo'
import { DotPattern } from '@/components/ui/dot-pattern'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'register - canvas',
  description: 'create a canvas account',
}

export default function Signup() {
  return (
    <div className='relative w-full h-full'>
      <DotPattern />

      <div className=' space-y-12 flex items-center justify-center h-full flex-col'>
        <Logo />

        <div className='flex flex-col space-y-2 max-w-sm'>
          <p className='text-2xl font-semibold font-recoleta-bold'>
            create an account
          </p>

          <p className='text-lg'>
            enter your information below to create an account.
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}
