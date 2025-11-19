import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('__session')?.value;
  const { pathname } = request.nextUrl;

  // Redirect from root to dashboard if logged in, otherwise to login
  if (pathname === '/') {
    const url = sessionToken ? '/dashboard' : '/login';
    return NextResponse.redirect(new URL(url, request.url));
  }

  // If user is logged in
  if (sessionToken) {
    // and tries to access an auth route, redirect to dashboard
    if (authRoutes.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not logged in
  else {
    // and tries to access a protected route, redirect to login
    if (protectedRoutes.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
