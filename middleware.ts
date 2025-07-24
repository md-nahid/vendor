// import { NextRequest, NextResponse } from 'next/server'
// import { getSessionCookie } from 'better-auth/cookies'
// // import { headers } from 'next/headers'

// export async function middleware(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request)

//   // THIS IS NOT SECURE!
//   // This is the recommended approach to optimistically redirect users
//   // We recommend handling auth checks in each page/route
//   if (!sessionCookie) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/dashboard'], // Specify the routes the middleware applies to
// }

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/dashboard'], // Apply middleware to specific routes
}
