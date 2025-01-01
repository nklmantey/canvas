import Link from 'next/link'
import Logo from '@/components/global/logo'
import NavbarUser from './_components/user'

export default async function Navbar() {
  return (
    <div className='w-full border-b border-border/50 shadow-sm px-4 md:px-24 lg:px-28 py-4 h-16 flex items-center justify-between bg-[#fff] sticky top-0 z-50'>
      <Link href='/'>
        <Logo />
      </Link>

      {/* USER CONTAINER */}
      <NavbarUser />
    </div>
  )
}
