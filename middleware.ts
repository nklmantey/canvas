// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getUser } from '@/utils/auth'

// const protectedPaths = ['/dashboard', '/spaces']

// const authPaths = ['/auth/login', '/auth/register', '/']

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next()

//   try {
//     const user = await getUser()

//     const path = new URL(request.url).pathname

//     const isProtectedPath = protectedPaths.some((prefix) => path.startsWith(prefix))
//     const isAuthPath = authPaths.some((prefix) => path.startsWith(prefix))

//     // redirect logic
//     if (isProtectedPath && !user) {
//       return NextResponse.redirect(new URL('/auth/login', request.url))
//     }

//     if (isAuthPath && user) {
//       return NextResponse.redirect(new URL(request.url))
//     }

//     return response
//   } catch (e) {
//     return response
//   }
// }

// // configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public folder
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }

import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
