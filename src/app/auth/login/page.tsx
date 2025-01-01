import { LoginForm } from '@/components/forms'
import Logo from '@/components/global/logo'
import { DotPattern } from '@/components/ui/dot-pattern'

export default function Login() {
  return (
    <div className='relative w-full h-full'>
      <DotPattern />

      <div className=' space-y-12 flex items-center justify-center h-full flex-col'>
        <Logo />

        <div className='flex flex-col space-y-2 max-w-sm'>
          <p className='text-2xl font-semibold font-recoleta-bold'>welcome back</p>

          <p className='text-lg'>enter your credentials below to log in to your account.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
