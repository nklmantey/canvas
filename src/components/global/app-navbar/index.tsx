import { AppNavbarUser } from './_components/app-navbar-user'

export default async function AppNavbar() {
  return (
    <div className='w-full bg-sidebar border-b flex justify-between items-center px-6 py-4 z-50'>
      <AppNavbarUser />
    </div>
  )
}
