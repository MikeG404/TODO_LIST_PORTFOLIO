import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

export async function middleware(request: NextRequest) {
    // Routes protégées (seul l'utilisateur connecté peut y accéder)
    const protectedRoutes = ['/']

    // Routes publiques (l'utilisateur connecté ne doit PAS y accéder)
    const publicRoutes = ['/login', '/sign-up']

    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // On récupère le cookie 'session' directement depuis la requête
    const cookie = request.cookies.get('session')?.value
    const session = await decrypt(cookie)

    // 1. Si route protégée et pas de session valide -> Redirection Login
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // 2. Si route publique (Login/Signup) et session valide -> Redirection Accueil
    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next()
}

// Configuration pour ignorer les fichiers statiques et images
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
