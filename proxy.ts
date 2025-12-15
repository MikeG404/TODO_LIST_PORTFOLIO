import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function proxy(request: NextRequest) {
    const protectedRoutes = ['/']

    const publicRoutes = ['/login', '/sign-up']

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = request.cookies.get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
